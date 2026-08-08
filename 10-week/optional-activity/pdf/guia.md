# GUÍA DE ACTIVIDAD PRÁCTICA

**Programación y Diseño Orientado a Objetos · Semana 10 · Guía de repaso del Corte 2**

| Programa | Ingeniería de Sistemas | Asignatura | Programación y Diseño Orientado a Objetos |
|---|---|---|---|
| Unidad | Unidad 2 · Herencia y polimorfismo | Semana / Corte | 10 · Corte 2 |
| Modalidad | Individual o en parejas | Periodo | 2026-B |
| Tipo | Formativa (opcional, sin nota) | Entrega | Repositorio en GitHub |

## Objetivos

- Integrar herencia, interfaz y composición en un diseño.
- Aplicar polimorfismo en un caso concreto.
- Autoevaluar la preparación para el parcial.

## 1. Enunciado

Diseña e implementa un mini-sistema de **medios reproducibles**:

1. Clase abstracta `Medio` con `duracion()` abstracto.
2. Subclases `Cancion` y `Video` que implementen `duracion()`.
3. Interfaz `Reproducible` (`reproducir()`, `detener()`) implementada por ambas.
4. Una clase `Playlist` que **tenga** una lista de `Medio` (composición) y calcule la duración total.
5. `main` que use polimorfismo para reproducir todos los medios.

## 2. Requisitos

- Herencia + interfaz + composición, todas presentes.
- Uso polimórfico (lista de `Medio`).
- Cálculo correcto de la duración total.

## 3. Cómo entregar

Entrega **por GitHub**. Repositorio: `poo-s10-repaso`.

```
poo-s10-repaso/
  README.md   -> diseno (relaciones) + salida
  src/         -> Medio.java, Reproducible.java, Cancion.java, Video.java, Playlist.java, Main.java
```

1. Crea el repo público con ese nombre.
2. Sube el código y el README.
3. Comparte el enlace por el canal indicado.

## 4. Rúbrica de evaluación

| Criterio | Excelente | Aceptable | Por mejorar | Pts |
|---|---|---|---|---|
| Herencia + abstracción | Correctas | Con detalles | Fallan | 30 |
| Interfaz implementada | Correcta | Parcial | Ausente | 20 |
| Composición (Playlist) | Correcta | Parcial | Falla | 25 |
| Polimorfismo + README | Correcto y claro | Aceptable | Deficiente | 25 |

> Nota: actividad formativa y opcional (sin nota en Moodle). La guía unificada de entrega estará en el Manual de Entrega de Actividades Opcionales (próximamente).

