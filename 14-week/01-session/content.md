---
course: Programación y Diseño Orientado a Objetos
program: Ingeniería de Sistemas
term: 2026-B
week: 14
session: 1
corte: 3
unit: Unidad 3 · Robustez y bibliotecas
topic: Buenas prácticas de programación
eyebrow: Unidad 3 · Calidad · Corte 3
lead: Escribir código que funciona es el mínimo; escribir código que otros (y tú mismo en tres meses) puedan entender es lo profesional. Estas buenas prácticas hacen tu código Java claro y mantenible.
objectives:
  - Aplicar convenciones de nombres claras.
  - Evitar la duplicación de código (DRY).
  - Escribir métodos cortos con una sola responsabilidad.
---

## 1. Nombres que comunican

El mejor comentario es un buen nombre. Usa nombres **descriptivos**:

```java
// tab: Nombres
// mal
int d; void p() { }
// bien
int diasRestantes;
void procesarPago() { }
```

- Clases en `PascalCase`, métodos/atributos en `camelCase`, constantes en `MAYUSCULAS`.
- Un método se nombra con un **verbo** (`calcularTotal`), una clase con un **sustantivo** (`Factura`).

## 2. DRY: no te repitas

**DRY = Don't Repeat Yourself.** Si copias y pegas lógica, extráela a un método. Un cambio debe hacerse en **un solo lugar**.

```java
// tab: Antes (repetido)
double t1 = p1 * 1.19;
double t2 = p2 * 1.19;   // el 1.19 repetido y "mágico"
```
```java
// tab: Después (DRY)
static final double IVA = 0.19;
static double conIva(double precio) { return precio * (1 + IVA); }
```

## 3. Métodos cortos y con un propósito

Un método debe hacer **una cosa**. Si tiene decenas de líneas o varios "y" en su descripción, divídelo.

> tip: Regla práctica: si necesitas un comentario para explicar un bloque dentro de un método, ese bloque probablemente merece ser **su propio método** con un buen nombre.

## 4. Otras prácticas clave

- Evita **números mágicos**: usa constantes con nombre.
- Comenta el **porqué**, no lo obvio (`i++ // incrementa i` sobra).
- Encapsula (atributos privados) y valida.
- Indenta y formatea de forma consistente.

## Autoevaluación

```quiz
Q: ¿Qué significa el principio DRY?
* No repetir código (Don't Repeat Yourself)
- Escribir todo en una línea
- Documentar cada línea
E: DRY evita duplicar lógica; se extrae a un método reutilizable.

Q: ¿Cómo debería nombrarse un método que calcula el total?
* Con un verbo, p. ej. calcularTotal()
- Con una sola letra, t()
- Con un sustantivo, Total()
E: Los métodos usan verbos descriptivos; las clases, sustantivos.

Q: Un "número mágico" en el código se corrige...
* Reemplazándolo por una constante con nombre
- Dejándolo, si funciona
- Comentándolo solamente
E: Los valores literales sin explicación se sustituyen por constantes con nombre.
```

## Actividad de la semana (formativa)

Opcional y no evaluable. Versión ampliada con rúbrica en **optional-activity** (entrega por GitHub).

- Toma un código con nombres pobres y números mágicos y mejóralo aplicando estas prácticas.
