# GUÍA DE ACTIVIDAD PRÁCTICA

**Programación y Diseño Orientado a Objetos · Semana 12 · Gestión de datos con colecciones**

| Programa | Ingeniería de Sistemas | Asignatura | Programación y Diseño Orientado a Objetos |
|---|---|---|---|
| Unidad | Unidad 3 · Robustez y bibliotecas | Semana / Corte | 12 · Corte 3 |
| Modalidad | Individual o en parejas | Periodo | 2026-B |
| Tipo | Formativa (opcional, sin nota) | Entrega | Repositorio en GitHub |

## Objetivos

- Usar List y Map con objetos propios.
- Aplicar agregar, buscar por clave y recorrer.
- Justificar la elección de la colección.

## 1. Enunciado

1. Crea la clase `Estudiante` (código, nombre, promedio) con `equals`/`hashCode` por `codigo`.
2. Guarda estudiantes en un `Map<String, Estudiante>` (clave = código).
3. Implementa: agregar, **buscar por código**, listar todos y calcular el **promedio general**.
4. Usa un `Set<String>` para registrar los códigos de estudiantes en “lista de honor” (promedio ≥ 4.5), sin duplicados.
5. En el README, explica **por qué** usaste `Map` (búsqueda por código) en lugar de `List`, y por qué `Set` para la lista de honor.

## 2. Requisitos

- Uso correcto de `Map` y `Set` (y `List` si aplica).
- `equals`/`hashCode` coherentes en `Estudiante`.
- Búsqueda por clave y recorrido.
- Justificación de las colecciones elegidas.

## 3. Cómo entregar

Entrega **por GitHub**. Repositorio: `poo-s12-colecciones`.

```
poo-s12-colecciones/
  README.md   -> justificacion de colecciones + salida
  src/         -> Estudiante.java, Main.java
```

1. Crea el repositorio público con ese nombre.
2. Sube el código y el README.
3. Comparte el enlace por el canal indicado por el docente.

## 4. Rúbrica de evaluación

| Criterio | Excelente (100%) | Aceptable (60%) | Por mejorar (0%) | Pts |
|---|---|---|---|---|
| Uso correcto de Map | Correcto | Con detalles | Falla | 30 |
| Uso de Set (lista de honor) | Correcto (sin duplicados) | Parcial | Ausente | 20 |
| equals/hashCode por codigo | Coherentes | Uno | Incorrectos | 20 |
| Operaciones + justificación (README) | Completas y claras | Aceptables | Deficientes | 30 |

> Nota: actividad formativa y opcional (sin nota en Moodle). La guía unificada para entregar todas las actividades opcionales, válida para todas las materias, estará en el Manual de Entrega de Actividades Opcionales (próximamente).

