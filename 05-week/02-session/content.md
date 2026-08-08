---
course: Programación y Diseño Orientado a Objetos
program: Ingeniería de Sistemas
term: 2026-B
week: 5
session: 2
corte: 1
unit: Unidad 1 · Fundamentos de la POO
topic: Práctica guiada tipo parcial (Corte 1)
eyebrow: Unidad 1 · Cierre de Corte 1
lead: Resolvemos, paso a paso y con el formato del parcial, un problema de diseño de clases que integra todo el Corte 1. La meta es que interiorices un método de trabajo: leer, modelar, encapsular, construir y verificar.
objectives:
  - Aplicar un método sistemático para resolver un ejercicio de diseño.
  - Integrar encapsulamiento, constructores y validación en un caso.
  - Reconocer y evitar los errores más penalizados en el parcial.
---

## 1. Método de trabajo (para cualquier ejercicio de POO)

1. **Lee y subraya** los sustantivos (candidatos a clases/atributos) y verbos (candidatos a métodos).
2. **Define la clase**: atributos privados + invariantes.
3. **Escribe el/los constructor(es)** que dejen el objeto válido (valida).
4. **Agrega el comportamiento** (métodos de dominio).
5. **Representa e iguala** si aplica (`toString`, `equals`).
6. **Verifica** con casos límite.

## 2. Enunciado guiado

> **Enunciado.** Modela un `Termostato` con una temperatura objetivo que debe mantenerse entre **15 y 30 °C**. Debe permitir subir/bajar de a 1 °C sin salirse del rango, y reportar su estado.

**Paso 2 — clase + invariante:**

```java
// tab: Paso 2
public class Termostato {
    private int objetivo;              // invariante: 15 <= objetivo <= 30
}
```

**Paso 3 — constructor con validación:**

```java
// tab: Paso 3
public Termostato(int inicial) {
    objetivo = (inicial >= 15 && inicial <= 30) ? inicial : 20;  // valor seguro
}
```

**Paso 4 — comportamiento de dominio (protege la invariante):**

```java
// tab: Paso 4
public void subir() { if (objetivo < 30) objetivo++; }
public void bajar() { if (objetivo > 15) objetivo--; }
public int getObjetivo() { return objetivo; }
```

**Paso 5 — representación:**

```java
// tab: Paso 5
@Override public String toString() { return "Termostato a " + objetivo + "°C"; }
```

**Paso 6 — verificación (casos límite):**

```java
// tab: Paso 6
Termostato t = new Termostato(30);
t.subir();                    // sigue en 30 (no se pasa)
System.out.println(t);        // Termostato a 30°C
Termostato malo = new Termostato(99);  // fuera de rango -> queda en 20
```

## 3. Errores más penalizados en el parcial

- Atributos `public` o setters que permiten violar la invariante (ej. `setObjetivo(99)`).
- Constructor que no valida → objeto en estado inválido.
- Olvidar `this` cuando parámetro y atributo coinciden.
- No probar los **casos límite** (15, 30, y fuera de rango).

> tip: Un diseño limpio (encapsulado + validado + probado en los límites) suele valer más que muchas líneas: demuestra que entiendes el porqué, no solo la sintaxis.

## 4. Lista de verificación del parcial

- [ ] Identifiqué clase, atributos (con invariante) y comportamiento.
- [ ] Atributos privados; sin setters que rompan la invariante.
- [ ] Constructor(es) que validan y dejan el objeto válido.
- [ ] `toString`/`equals` cuando corresponde.
- [ ] Probé casos límite.

## Autoevaluación

```quiz
Q: ¿Cuál es el primer paso recomendado ante un enunciado de diseño?
* Leer y subrayar sustantivos (clases/atributos) y verbos (métodos)
- Escribir el main de una vez
- Copiar una clase anterior
E: Identificar sustantivos y verbos guía el modelado antes de codificar.

Q: En el Termostato, ¿por qué subir() lleva if (objetivo < 30)?
* Para no violar la invariante (máximo 30 °C)
- Para que sea más rápido
- Por estética
E: La guarda protege la invariante 15..30 al subir la temperatura.

Q: Un constructor que NO valida su parámetro puede dejar...
* Un objeto en estado inválido (rompe la invariante desde el nacimiento)
- Un objeto más rápido
- La clase sin compilar
E: Sin validar, el objeto puede nacer inválido; por eso se valida en el constructor.

Q: ¿Qué casos conviene probar en el Termostato?
* Los límites 15 y 30, y un valor fuera de rango
- Solo un valor intermedio
- Ninguno si compila
E: Los casos límite (bordes y fuera de rango) verifican la robustez.

Q: ¿Por qué evitar setObjetivo(int) público en este diseño?
* Permitiría fijar cualquier temperatura y violar la invariante
- Haría el código más corto
- Es obligatorio tenerlo
E: Un setter genérico rompería la regla; se exponen operaciones de dominio (subir/bajar).
```

## Actividad de la semana (formativa)

Opcional y no evaluable. Versión ampliada con rúbrica en **optional-activity** (entrega por GitHub).

- Resuelve el `Termostato` completo aplicando el método de 6 pasos y agrega pruebas de todos los casos límite.
