---
course: Programación y Diseño Orientado a Objetos
program: Ingeniería de Sistemas
term: 2026-B
week: 16
session: 1
corte: 3
unit: Unidad 3 · Robustez y bibliotecas
topic: Síntesis integradora del curso
eyebrow: Unidad 3 · Cierre del curso
lead: Cierre del semestre. Esta sesión reúne todo el recorrido —de los conceptos de objeto y clase a la robustez y las bibliotecas— en un mapa coherente. El objetivo es que veas la POO como un todo conectado, no como temas sueltos, y que reconozcas cómo cada pieza se apoya en las anteriores.
objectives:
  - Conectar los cuatro pilares de la POO en una visión integrada.
  - Repasar el recorrido de los tres cortes.
  - Reconocer cómo las decisiones de diseño se refuerzan entre sí.
---

## 1. Los cuatro pilares, juntos

Toda la POO se sostiene sobre cuatro pilares que **trabajan en conjunto**:

| Pilar | Idea central | Visto en |
|---|---|---|
| **Abstracción** | Modelar lo esencial, ocultar el detalle | Clases abstractas / interfaces (S8) |
| **Encapsulamiento** | Proteger el estado tras una interfaz + invariantes | Corte 1 (S3–S4) |
| **Herencia** | Reutilizar y especializar (es-un) | Corte 2 (S6) |
| **Polimorfismo** | Un mismo mensaje, distintos comportamientos | Corte 2 (S7) |

> info: Los pilares no son independientes: **encapsular** define contratos; la **abstracción** (interfaces) los formaliza; la **herencia** los especializa; el **polimorfismo** los aprovecha. Un buen diseño usa los cuatro de forma coordinada.

## 2. El recorrido del semestre

```ascii
CORTE 1  Fundamentos
  Objetos y clases -> encapsulamiento -> constructores -> identidad (equals/hashCode)

CORTE 2  Relaciones entre clases
  Herencia -> sobrescritura/polimorfismo -> abstractas/interfaces -> composicion/SRP

CORTE 3  Robustez y bibliotecas
  Excepciones -> colecciones -> archivos/persistencia -> buenas practicas/SOLID -> proyecto
```

## 3. Cómo se refuerzan las decisiones

Un ejemplo integra casi todo el curso:

- Defines una **interfaz** `Repositorio<T>` (abstracción, S8).
- Sus implementaciones **encapsulan** el acceso a archivos (S3, S13).
- El servicio usa el repositorio **polimórficamente** (S7): no sabe si guarda en memoria o en CSV.
- Los datos viven en **colecciones** (S12) y las operaciones validan con **excepciones** (S11).
- Todo respeta **SRP** y buenas prácticas (S9, S14).

> tip: Cuando un diseño "encaja", es porque las piezas hablan por **contratos** (interfaces) y cada clase tiene **una responsabilidad**. Esa es la meta de la POO: sistemas que se pueden **entender, extender y mantener**.

## 4. Errores conceptuales que ya sabes evitar

- Exponer atributos públicos (rompe encapsulamiento e invariantes).
- Usar herencia donde correspondía composición (S9).
- Sobrescribir `equals` sin `hashCode` (S4).
- Atrapar excepciones y silenciarlas (S11).
- Elegir la colección equivocada para la operación dominante (S12).
- Métodos largos con números mágicos y `switch` por tipo (S14).

## Autoevaluación integradora

```quiz
Q: ¿Cuáles son los cuatro pilares de la POO?
* Abstracción, encapsulamiento, herencia y polimorfismo
- Variables, bucles, funciones y clases
- Consola, archivos, red y memoria
E: Son los cuatro pilares que estructuran el paradigma orientado a objetos.

Q: ¿Qué formaliza los "contratos" entre clases?
* Las interfaces (abstracción)
- Los números mágicos
- Los atributos públicos
E: Las interfaces definen contratos que las clases implementan.

Q: Un servicio que usa un Repositorio sin saber si guarda en memoria o CSV aplica...
* Polimorfismo (depende de la abstracción, no de la implementación)
- Herencia múltiple de estado
- Números mágicos
E: Programar contra la interfaz permite intercambiar implementaciones (polimorfismo).

Q: Sobrescribir equals obliga a...
* Sobrescribir también hashCode (por el contrato)
- Nada más
- Eliminar el constructor
E: equals y hashCode deben ser coherentes; se sobrescriben juntos.

Q: Para "un producto contiene varios ítems" se usa...
* Composición (tiene-un), no herencia
- Herencia (es-un)
- Una excepción
E: La relación tiene-un se modela con composición.

Q: La meta última de un buen diseño OO es lograr sistemas que se puedan...
* Entender, extender y mantener
- Ejecutar más rápido siempre
- Escribir en menos líneas
E: La POO busca calidad estructural: comprensión, extensión y mantenimiento.
```

## Actividad de la semana

Elabora un **mapa conceptual** propio que conecte los cuatro pilares con las semanas del curso (ver optional-activity).
