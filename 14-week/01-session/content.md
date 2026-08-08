---
course: Programación y Diseño Orientado a Objetos
program: Ingeniería de Sistemas
term: 2026-B
week: 14
session: 1
corte: 3
unit: Unidad 3 · Robustez y bibliotecas
topic: Buenas prácticas y principios de diseño
eyebrow: Unidad 3 · Calidad · Corte 3
lead: Escribir código que funciona es el mínimo; escribir código que otros —y tú mismo en tres meses— puedan entender y cambiar es lo profesional. Esta sesión reúne las buenas prácticas de código limpio y los principios de diseño (incluidos algunos SOLID) que dan calidad y mantenibilidad a un sistema orientado a objetos.
objectives:
  - Aplicar convenciones y nombres que comunican.
  - Evitar duplicación (DRY) y números mágicos.
  - Escribir métodos cortos con una sola responsabilidad.
  - Reconocer principios de diseño (SRP, OCP) en el código.
---

## 1. Nombres que comunican

El mejor comentario es un buen nombre. Usa nombres **descriptivos** y sigue las convenciones (clases `PascalCase`, métodos/atributos `camelCase`, constantes `MAYUSCULAS`).

```java
// tab: Nombres
// mal
int d; void p(int x) { }
// bien
int diasRestantes;  void procesarPago(int monto) { }
```

- Métodos con **verbo** (`calcularTotal`), clases con **sustantivo** (`Factura`), booleanos con `is/has` (`isActivo`).

## 2. DRY — no te repitas

> info: **DRY (Don't Repeat Yourself).** Cada pieza de conocimiento debe tener **una única representación** en el código. Si copias y pegas lógica, extráela a un método: un cambio se hace en **un solo lugar**.

```java
// tab: Antes / Después
double t1 = p1 * 1.19;  double t2 = p2 * 1.19;   // 1.19 repetido y "mágico"
// -->
static final double IVA = 0.19;
static double conIva(double precio) { return precio * (1 + IVA); }
```

## 3. Sin números mágicos

Un **número mágico** es un literal sin explicación en medio del código. Reemplázalo por una **constante con nombre**.

```java
// mal:  if (edad >= 18)         // ¿qué significa 18?
// bien: static final int MAYORIA_EDAD = 18;  ... if (edad >= MAYORIA_EDAD)
```

## 4. Métodos cortos, una responsabilidad

Un método debe hacer **una cosa**. Si necesita un comentario para explicar un bloque interno, ese bloque probablemente merece **su propio método** con un buen nombre.

> tip: Señal de alarma: un método con muchos `if` anidados, decenas de líneas, o varios "y" en su descripción ("valida **y** calcula **y** imprime"). Divídelo.

## 5. Principios de diseño (SOLID, introducción)

Ya aplicaste dos de los cinco principios **SOLID**:

| Principio | Idea | Visto en |
|---|---|---|
| **S** — Responsabilidad única | Una clase, una razón para cambiar | Semana 9 |
| **O** — Abierto/cerrado | Abierto a extensión, cerrado a modificación | Semana 7 (polimorfismo) |
| **L** — Sustitución de Liskov | La subclase puede sustituir a la superclase | Semana 6 (herencia correcta) |
| **I** — Segregación de interfaces | Interfaces pequeñas y específicas | Semana 8 |
| **D** — Inversión de dependencias | Depender de abstracciones, no de implementaciones | Semanas 8–9 |

> info: No hace falta memorizar SOLID; sí reconocer que las decisiones de diseño del curso (encapsular, polimorfismo, interfaces, composición) **son** buenas prácticas con nombre propio.

## 6. Comentarios y formato

- Comenta el **porqué**, no lo obvio (`i++ // incrementa i` sobra).
- Indenta y formatea de forma **consistente**.
- Prefiere código **autoexplicativo** (buenos nombres) a comentarios que compensan un código confuso.

## Autoevaluación

```quiz
Q: ¿Qué significa el principio DRY?
* No repetir código: una única representación de cada conocimiento
- Escribir todo en una línea
- Documentar cada línea
E: DRY evita duplicar lógica; se extrae a un método reutilizable.

Q: ¿Cómo se corrige un "número mágico"?
* Reemplazándolo por una constante con nombre
- Comentándolo
- Dejándolo si funciona
E: Los literales sin explicación se sustituyen por constantes nombradas.

Q: Un método debería...
* Hacer una sola cosa (una responsabilidad)
- Ser lo más largo posible
- Usar variables de una letra
E: Métodos cortos y con un solo propósito son más legibles y probables.

Q: El principio abierto/cerrado se logró en el curso con...
* Polimorfismo (agregar tipos sin modificar el código existente)
- Números mágicos
- Atributos públicos
E: El polimorfismo permite extender con nuevos tipos sin tocar lo existente (OCP).

Q: ¿Qué conviene comentar?
* El porqué de una decisión, no lo obvio del código
- Cada línea, siempre
- Nada nunca
E: Comenta intención/decisiones; el código autoexplicativo reduce comentarios.

Q: Ver el mismo bloque repetido en varios lugares indica que deberías...
* Extraerlo a un método (DRY)
- Copiarlo también al main
- Dejarlo, si compila
E: El código duplicado se extrae para no repetir la lógica.
```

## Actividad de la semana (formativa)

Opcional y no evaluable. Versión ampliada con rúbrica en **optional-activity** (entrega por GitHub).

- Toma un código con nombres pobres, números mágicos y un método largo, y mejóralo aplicando estas prácticas; explica cada cambio en el README.
