# GUÍA DE ACTIVIDAD PRÁCTICA

**Programación y Diseño Orientado a Objetos · Semana 2 · Clases, objetos y el modelo de referencias**

| Programa | Ingeniería de Sistemas | Asignatura | Programación y Diseño Orientado a Objetos |
|---|---|---|---|
| Unidad | Unidad 1 · Fundamentos de la POO | Semana / Corte | 2 · Corte 1 |
| Modalidad | Individual o en parejas | Periodo | 2026-B |
| Tipo | Formativa (opcional, sin nota) | Entrega | Repositorio en GitHub |

## Objetivos

- Declarar una clase con atributos y métodos, usando this.
- Instanciar varios objetos con estado independiente.
- Evidenciar y explicar el aliasing de referencias.

## 1. Enunciado

1. Crea la clase `Libro` con atributos `titulo`, `autor`, `paginas` y métodos:
   - `describir()` — imprime los datos.
   - `esLargo()` — devuelve `true` si `paginas > 300`.
2. En `Main`, crea **tres** libros distintos, descríbelos e indica cuáles son largos (evidencia el estado independiente de cada objeto).
3. **Demostración de aliasing:** asigna uno de los libros a una segunda variable (`Libro otro = libro1;`), modifica el título **por la segunda variable** y muestra que el primero "ve" el cambio. Explica en el README **por qué** ocurre.
4. Provoca (y luego previene con `if != null`) un `NullPointerException` con una referencia `Libro` en `null`. Documenta ambos casos.

## 2. Requisitos

- Uso correcto de `this` y de convenciones de nombres.
- Tres objetos con estado propio.
- Aliasing demostrado y explicado.
- Manejo del caso `null`.

## 3. Cómo entregar

Entrega **por GitHub**. Repositorio: `poo-s02-clases`.

```
poo-s02-clases/
  README.md   -> salida + explicacion del aliasing y del null
  src/         -> Libro.java, Main.java
```

1. Crea el repositorio público con ese nombre.
2. Sube el código y el README.
3. Comparte el enlace por el canal indicado por el docente.

## 4. Rúbrica de evaluación

| Criterio | Excelente (100%) | Aceptable (60%) | Por mejorar (0%) | Pts |
|---|---|---|---|---|
| Clase Libro (atributos, métodos, this) | Correcta y clara | Con detalles | Falla | 25 |
| Tres objetos con estado propio | Correcto y evidenciado | Parcial | Falla | 20 |
| Aliasing demostrado y explicado | Claro y correcto | Parcial | Ausente | 30 |
| Manejo de null (provocar + prevenir) | Ambos casos | Uno | Ausente | 15 |
| README y repositorio | Ordenado | Aceptable | Deficiente | 10 |

> Nota: actividad formativa y opcional (sin nota en Moodle). La guía unificada para entregar todas las actividades opcionales, válida para todas las materias, estará en el Manual de Entrega de Actividades Opcionales (próximamente).

