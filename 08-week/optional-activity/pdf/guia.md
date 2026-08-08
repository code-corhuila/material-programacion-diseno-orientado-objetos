# GUÍA DE ACTIVIDAD PRÁCTICA

**Programación y Diseño Orientado a Objetos · Semana 8 · Abstracción con clases abstractas e interfaces**

| Programa | Ingeniería de Sistemas | Asignatura | Programación y Diseño Orientado a Objetos |
|---|---|---|---|
| Unidad | Unidad 2 · Herencia y polimorfismo | Semana / Corte | 8 · Corte 2 |
| Modalidad | Individual o en parejas | Periodo | 2026-B |
| Tipo | Formativa (opcional, sin nota) | Entrega | Repositorio en GitHub |

## Objetivos

- Definir una clase abstracta con un método abstracto.
- Definir e implementar una interfaz.
- Usar polimorfismo por superclase y por interfaz.

## 1. Enunciado

1. Crea la clase abstracta `Figura` con `area()` abstracto y `describir()` concreto.
2. Crea `Circulo` y `Rectangulo` que implementen `area()`.
3. Define la interfaz `Dibujable` con `dibujar()` e impleméntala en ambas figuras.
4. En `main`, recorre un `Figura[]` mostrando área; y un `Dibujable[]` invocando `dibujar()`.

## 2. Requisitos

- Clase abstracta + método abstracto implementado en subclases.
- Interfaz implementada por las figuras.
- Uso polimórfico por superclase y por interfaz.

## 3. Cómo entregar

Entrega **por GitHub**. Repositorio: `poo-s08-abstraccion`.

```
poo-s08-abstraccion/
  README.md   -> salida de ejemplo
  src/         -> Figura.java, Dibujable.java, subclases, Main.java
```

1. Crea el repo público con ese nombre.
2. Sube el código y el README.
3. Comparte el enlace por el canal indicado.

## 4. Rúbrica de evaluación

| Criterio | Excelente | Aceptable | Por mejorar | Pts |
|---|---|---|---|---|
| Clase abstracta + abstracto | Correcta | Con detalles | Falla | 30 |
| Interfaz + implements | Correcta | Con detalles | Falla | 30 |
| Polimorfismo (superclase e interfaz) | Correcto | Parcial | Ausente | 25 |
| README y repositorio | Ordenado | Aceptable | Deficiente | 15 |

> Nota: actividad formativa y opcional (sin nota en Moodle). La guía unificada de entrega estará en el Manual de Entrega de Actividades Opcionales (próximamente).

