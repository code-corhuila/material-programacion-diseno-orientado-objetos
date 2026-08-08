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
lead: Refactorizar es mejorar la estructura interna del código sin cambiar lo que hace. Aprenderás a detectar "malos olores" y a aplicar refactorizaciones seguras que dejan el código más limpio.
objectives:
  - Definir qué es refactorizar (y qué no).
  - Reconocer "code smells" comunes.
  - Aplicar refactorizaciones básicas.
---

## 1. ¿Qué es refactorizar?

**Refactorizar** = mejorar la estructura del código **sin cambiar su comportamiento externo**. Mismo resultado, mejor diseño: más legible, más fácil de mantener.

> warn: Refactorizar NO es agregar funciones ni corregir bugs. Es reordenar. Idealmente, con pruebas que confirmen que el comportamiento no cambió.

## 2. Malos olores (code smells)

Señales de que el código necesita refactor:

| Olor | Síntoma | Refactor |
|---|---|---|
| Código duplicado | La misma lógica repetida | Extraer método |
| Método largo | Decenas de líneas | Dividir en métodos |
| Nombres pobres | `x`, `data2`, `temp` | Renombrar |
| Clase que hace de todo | Baja cohesión | Separar responsabilidades |
| Números mágicos | Literales sin nombre | Introducir constante |

## 3. Refactor: extraer método

```java
// tab: Antes
void procesar() {
    // ... 20 líneas de validación
    // ... 20 líneas de cálculo
    // ... 20 líneas de impresión
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

Cada parte es ahora un método corto con nombre claro.

## 4. Refactor: renombrar y constantes

```java
// tab: Antes / Después
double p = b * 0.19;              // ¿qué es b? ¿0.19?
// -->
double impuesto = base * TASA_IVA;
```

> tip: Los IDE modernos refactorizan seguro: "Rename" (renombrar en todo el proyecto) y "Extract Method" con un par de teclas. Úsalos.

## Autoevaluación

```quiz
Q: ¿Qué es refactorizar?
* Mejorar la estructura del código sin cambiar su comportamiento
- Agregar nuevas funciones
- Corregir errores de lógica
E: Refactorizar reordena el código manteniendo el mismo comportamiento externo.

Q: Ver la misma lógica repetida es un "olor" que se corrige con...
* Extraer método
- Dejarlo igual
- Agregar comentarios
E: El código duplicado se extrae a un método reutilizable.

Q: ¿Qué conviene tener antes de refactorizar a fondo?
* Pruebas que confirmen que el comportamiento no cambió
- Nada, se hace de memoria
- Más números mágicos
E: Las pruebas dan seguridad de que el refactor no rompió el comportamiento.
```

## Actividad de la semana (formativa)

Opcional y no evaluable. Versión ampliada con rúbrica en **optional-activity** (entrega por GitHub).

- Refactoriza un método largo dividiéndolo en métodos cortos con nombres claros.
