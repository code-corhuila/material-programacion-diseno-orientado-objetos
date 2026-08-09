---
course: Programación y Diseño Orientado a Objetos
program: Ingeniería de Sistemas
term: 2026-B
week: 12
corte: 3
unit: Unidad 3 · Robustez y bibliotecas
topic: Gestión de datos con colecciones
eyebrow: Actividad opcional · Formativa · Entrega por GitHub
lead: Aplica List y Map a un pequeño gestor de datos y justifica la colección según la operación dominante. Actividad opcional de refuerzo.
objectives:
  - Usar List y Map con objetos propios.
  - Aplicar agregar, buscar por clave y recorrer.
  - Justificar la elección de la colección.
---

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

## 3. Cómo entregar (por GitHub)

Las entregas se realizan en **tu fork del repositorio de la clase**, dentro de la carpeta de esta semana. Si nunca has usado GitHub, sigue el **[Manual de Entrega por GitHub](https://code-corhuila.github.io/ova-web/manuales/Manual-Entrega-GitHub.pdf)** paso a paso.

1. Haz **fork** del repositorio de la clase (enlace dado por el docente) y **clónalo**.
2. Coloca tu entrega en la carpeta **`12-week/`** correspondiente a esta semana.
3. Sube los cambios: `git add .` · `git commit -m "Entrega semana 12"` · `git push` (abre un *Pull Request* si el docente lo pide).
4. Verifica que tienes tu **repo de perfil** con el bloque **CONFIG** (`FULL_NAME` + `GITHUB_USER`); sin él, tus entregas no se detectan.

## 4. Rúbrica de evaluación

| Criterio | Excelente (100%) | Aceptable (60%) | Por mejorar (0%) | Pts |
|---|---|---|---|---|
| Uso correcto de Map | Correcto | Con detalles | Falla | 30 |
| Uso de Set (lista de honor) | Correcto (sin duplicados) | Parcial | Ausente | 20 |
| equals/hashCode por codigo | Coherentes | Uno | Incorrectos | 20 |
| Operaciones + justificación (README) | Completas y claras | Aceptables | Deficientes | 30 |

> Nota: actividad formativa y opcional (sin nota en Moodle). La guía unificada para entregar todas las actividades opcionales, válida para todas las materias, estará en el Manual de Entrega de Actividades Opcionales (próximamente).

## Descargar

[⬇ Descargar la guía en PDF (membrete oficial CORHUILA)](pdf/Actividad-Semana12.pdf)
