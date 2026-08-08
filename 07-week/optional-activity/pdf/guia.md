# GUÍA DE ACTIVIDAD PRÁCTICA

**Programación y Diseño Orientado a Objetos · Semana 7 · Polimorfismo en acción**

| Programa | Ingeniería de Sistemas | Asignatura | Programación y Diseño Orientado a Objetos |
|---|---|---|---|
| Unidad | Unidad 2 · Herencia y polimorfismo | Semana / Corte | 7 · Corte 2 |
| Modalidad | Individual o en parejas | Periodo | 2026-B |
| Tipo | Formativa (opcional, sin nota) | Entrega | Repositorio en GitHub |

## Objetivos

- Sobrescribir un método en varias subclases.
- Usar referencias de superclase de forma polimórfica.
- Recorrer una colección heterogénea con un mismo bucle.

## 1. Enunciado

1. Crea la superclase `Figura` con un método `area()` que devuelva 0.
2. Crea subclases `Circulo`, `Rectangulo` y `Triangulo` que **sobrescriban** `area()`.
3. Crea un arreglo `Figura[]` con objetos de las tres subclases.
4. Recorre el arreglo con un solo bucle e imprime el área de cada figura (polimorfismo).

## 2. Requisitos

- `@Override` en cada subclase.
- Arreglo de tipo `Figura` con distintas subclases.
- Un único bucle que use polimorfismo.

## 3. Cómo entregar

Entrega **por GitHub**. Repositorio: `poo-s07-polimorfismo`.

```
poo-s07-polimorfismo/
  README.md   -> salida de ejemplo (areas)
  src/         -> Figura.java, subclases, Main.java
```

1. Crea el repo público con ese nombre.
2. Sube el código y el README.
3. Comparte el enlace por el canal indicado.

## 4. Rúbrica de evaluación

| Criterio | Excelente | Aceptable | Por mejorar | Pts |
|---|---|---|---|---|
| Sobrescritura de area() | En las 3 subclases | 2 de 3 | Falla | 35 |
| Arreglo polimórfico | Correcto | Parcial | Falla | 30 |
| Bucle único con polimorfismo | Correcto | Con detalles | Ausente | 20 |
| README y repositorio | Ordenado | Aceptable | Deficiente | 15 |

> Nota: actividad formativa y opcional (sin nota en Moodle). La guía unificada de entrega estará en el Manual de Entrega de Actividades Opcionales (próximamente).

