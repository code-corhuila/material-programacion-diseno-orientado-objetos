---
course: Programación y Diseño Orientado a Objetos
program: Ingeniería de Sistemas
term: 2026-B
week: 14
session: 2
corte: 3
unit: Unidad 3 · Robustez y bibliotecas
topic: Refactorización
eyebrow: Unidad 3 · Calidad · Corte 3
lead: Refactorizar es mejorar la estructura interna del código sin cambiar lo que hace. Es una disciplina con técnicas concretas para eliminar "malos olores" y dejar el diseño más limpio y flexible, de forma segura. Es lo que mantiene sano un proyecto que evoluciona.
objectives:
  - Definir qué es (y qué no es) refactorizar.
  - Reconocer code smells comunes.
  - Aplicar refactorizaciones seguras.
  - Entender el papel de las pruebas como red de seguridad.
---

## 1. ¿Qué es refactorizar?

> info: **Refactorización.** Cambio en la **estructura interna** del código que **no altera su comportamiento externo**. Mismo resultado, mejor diseño: más legible, más fácil de mantener y extender.

> warn: Refactorizar **no** es agregar funciones ni corregir bugs; es **reordenar**. Idealmente se hace con **pruebas** que confirmen que el comportamiento no cambió, y en **pasos pequeños**.

## 2. Malos olores (code smells)

Señales de que el código pide refactor:

| Olor | Síntoma | Refactor típico |
|---|---|---|
| Código duplicado | La misma lógica repetida | **Extraer método** |
| Método largo | Decenas de líneas / muchos `if` | **Dividir en métodos** |
| Nombres pobres | `x`, `data2`, `tmp` | **Renombrar** |
| Números mágicos | Literales sin nombre | **Introducir constante** |
| Clase que hace de todo | Baja cohesión | **Extraer clase** |
| `switch`/`if` por tipo | Condicional sobre el tipo del objeto | **Reemplazar por polimorfismo** |

## 3. Refactor: extraer método

```java
// tab: Antes
void procesar() {
    // 20 líneas de validación
    // 20 líneas de cálculo
    // 20 líneas de impresión
}
```
```java
// tab: Después
void procesar() {
    validar();
    double total = calcular();
    imprimir(total);
}
```

## 4. Refactor: reemplazar condicional por polimorfismo

Un `switch` sobre el tipo suele ser un olor que el polimorfismo (Semana 7) resuelve:

```java
// tab: Antes (switch por tipo)
double area(Figura f) {
    switch (f.tipo) {
        case "circulo": return Math.PI * f.r * f.r;
        case "rect":    return f.b * f.h;
    }
    return 0;
}
```
```java
// tab: Después (polimorfismo)
// cada figura implementa su area(); el switch desaparece:
double total = 0;
for (Figura f : figuras) total += f.area();
```

## 5. Las pruebas como red de seguridad

Antes de refactorizar a fondo, conviene tener **pruebas** (aunque sean casos en `main`) que verifiquen el comportamiento. Así, si el refactor rompe algo, lo detectas de inmediato. Refactor + pruebas es la base del desarrollo profesional.

> tip: Los IDE modernos automatizan refactorizaciones seguras: **Rename** (renombra en todo el proyecto), **Extract Method**, **Inline**… con un par de teclas y sin romper referencias. Úsalos.

## 6. Errores comunes

- "Refactorizar" y de paso cambiar el comportamiento (eso ya no es refactor).
- Hacer un refactor gigante de una sola vez (mejor pasos pequeños y verificables).
- Refactorizar sin ninguna forma de verificar que nada se rompió.
- Dejar los olores "para después" hasta que el código se vuelve inmantenible.

## Autoevaluación

```quiz
Q: ¿Qué es refactorizar?
* Mejorar la estructura del código sin cambiar su comportamiento externo
- Agregar nuevas funcionalidades
- Corregir errores de lógica
E: Refactorizar reordena manteniendo el mismo comportamiento observable.

Q: Ver la misma lógica repetida es un olor que se corrige con...
* Extraer método
- Dejarlo igual
- Agregar comentarios
E: El código duplicado se extrae a un método reutilizable.

Q: Un switch sobre el "tipo" de un objeto suele resolverse con...
* Polimorfismo (cada tipo implementa su método)
- Más casos en el switch
- Números mágicos
E: Reemplazar el condicional por polimorfismo elimina el switch por tipo.

Q: ¿Qué conviene tener antes de refactorizar a fondo?
* Pruebas que confirmen que el comportamiento no cambió
- Nada; se hace de memoria
- Más duplicación
E: Las pruebas son la red de seguridad del refactor.

Q: ¿Cuál NO es una refactorización?
* Agregar una nueva funcionalidad al programa
- Renombrar una variable para que comunique
- Extraer un método
E: Agregar funcionalidad cambia el comportamiento; no es refactor.

Q: ¿Cómo conviene refactorizar?
* En pasos pequeños y verificables
- Todo de una vez, sin verificar
- Solo al final del proyecto
E: Pasos pequeños y verificados reducen el riesgo de romper algo.
```

## Actividad de la semana (formativa)

Opcional y no evaluable. Versión ampliada con rúbrica en **optional-activity** (entrega por GitHub).

- Toma un método largo con un `switch` por tipo y refactorízalo: extrae métodos, introduce constantes y reemplaza el condicional por polimorfismo. Verifica que la salida no cambió.
