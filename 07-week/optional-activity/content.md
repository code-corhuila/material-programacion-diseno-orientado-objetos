---
course: Programación y Diseño Orientado a Objetos
program: Ingeniería de Sistemas
term: 2026-B
week: 7
corte: 2
unit: Unidad 2 · Herencia y polimorfismo
topic: Polimorfismo en acción
eyebrow: Actividad opcional · Formativa · Entrega por GitHub
lead: Comprueba el poder del polimorfismo procesando una colección heterogénea con un solo bloque de código, y verifica que el enlace dinámico elige el método correcto de cada objeto. Actividad opcional de refuerzo.
objectives:
  - Sobrescribir un método en varias subclases con @Override.
  - Procesar objetos distintos de forma uniforme (polimorfismo).
  - Aplicar instanceof + downcasting con seguridad.
---

## 1. Enunciado

1. Crea la superclase `Figura` con `area()` (puede ser abstracta) y `nombre()`.
2. Crea `Circulo`, `Rectangulo` y `Triangulo` que **sobrescriban** `area()` con `@Override`.
3. Crea un arreglo `Figura[]` con objetos de las tres subclases.
4. Recorre el arreglo con **un solo bucle** e imprime nombre + área de cada figura (evidencia el enlace dinámico).
5. Usa `instanceof` para, solo en los `Circulo`, invocar un método **propio** (ej. `diametro()`), con downcasting seguro.
6. Demuestra "abierto a extensión": agrega una 4ª figura y muestra que el bucle **no cambia**.

## 2. Requisitos

- `@Override` en cada subclase.
- Arreglo de tipo `Figura` con distintas subclases y bucle único polimórfico.
- `instanceof` + downcasting correctos.
- Evidencia de extensibilidad (4ª figura sin tocar el bucle).

## 3. Cómo entregar

Entrega **por GitHub**. Repositorio: `poo-s07-polimorfismo`.

```
poo-s07-polimorfismo/
  README.md   -> salida (nombre/area) + explicacion del enlace dinamico
  src/         -> Figura.java, subclases, Main.java
```

1. Crea el repositorio público con ese nombre.
2. Sube el código y el README.
3. Comparte el enlace por el canal indicado por el docente.

## 4. Rúbrica de evaluación

| Criterio | Excelente (100%) | Aceptable (60%) | Por mejorar (0%) | Pts |
|---|---|---|---|---|
| Sobrescritura de area() | En las 3 (4) subclases | 2 de 3 | Falla | 30 |
| Bucle único polimórfico | Correcto y claro | Parcial | Falla | 30 |
| instanceof + downcasting | Correcto y seguro | Con detalles | Ausente/erróneo | 20 |
| Extensibilidad (4ª figura) + README | Demostrada y explicada | Parcial | Ausente | 20 |

> Nota: actividad formativa y opcional (sin nota en Moodle). La guía unificada para entregar todas las actividades opcionales, válida para todas las materias, estará en el Manual de Entrega de Actividades Opcionales (próximamente).

## Descargar

[⬇ Descargar la guía en PDF (membrete oficial CORHUILA)](pdf/Actividad-Semana07.pdf)
