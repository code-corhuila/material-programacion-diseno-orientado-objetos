# GUÍA DE ACTIVIDAD PRÁCTICA

**Programación y Diseño Orientado a Objetos · Semana 9 · Diseño con composición y paquetes**

| Programa | Ingeniería de Sistemas | Asignatura | Programación y Diseño Orientado a Objetos |
|---|---|---|---|
| Unidad | Unidad 2 · Herencia y polimorfismo | Semana / Corte | 9 · Corte 2 |
| Modalidad | Individual o en parejas | Periodo | 2026-B |
| Tipo | Formativa (opcional, sin nota) | Entrega | Repositorio en GitHub |

## Objetivos

- Modelar una relación "tiene-un" con composición y delegación.
- Organizar las clases en paquetes por responsabilidad.
- Justificar la elección composición vs herencia.

## 1. Enunciado

1. Modela un `Pedido` que **tiene** una lista de `Producto` (composición) en el paquete `modelo`.
2. Implementa `agregar(Producto)` y `total()` **delegando** el precio a cada `Producto`.
3. Crea `PedidoService` (paquete `servicio`) que aplique un descuento y calcule el total final (lógica de negocio separada del modelo).
4. `Main` (paquete `app`) crea un pedido con 3 productos y usa el servicio.
5. En el README: justifica por qué usaste **composición** (no herencia) y dónde lograste **alta cohesión / bajo acoplamiento**.

## 2. Requisitos

- Composición (Pedido contiene Productos) + delegación.
- Organización en paquetes `modelo`, `servicio`, `app`.
- Separación de responsabilidades (modelo vs lógica).
- Justificación de diseño en el README.

## 3. Cómo entregar (por GitHub)

Las entregas se realizan en **tu fork del repositorio de la clase**, dentro de la carpeta de esta semana. Si nunca has usado GitHub, sigue el **[Manual de Entrega por GitHub](https://code-corhuila.github.io/ova-web/manuales/Manual-Entrega-GitHub.pdf)** paso a paso.

1. Haz **fork** del repositorio de la clase (enlace dado por el docente) y **clónalo**.
2. Coloca tu entrega en la carpeta **`09-week/`** correspondiente a esta semana.
3. Sube los cambios: `git add .` · `git commit -m "Entrega semana 09"` · `git push` (abre un *Pull Request* si el docente lo pide).
4. Verifica que tienes tu **repo de perfil** con el bloque **CONFIG** (`FULL_NAME` + `GITHUB_USER`); sin él, tus entregas no se detectan.

## 4. Rúbrica de evaluación

| Criterio | Excelente (100%) | Aceptable (60%) | Por mejorar (0%) | Pts |
|---|---|---|---|---|
| Composición + delegación | Correctas | Con detalles | Fallan | 30 |
| Organización en paquetes | Correcta y coherente | Parcial | Ausente | 25 |
| Cohesión / acoplamiento (separación) | Bien lograda y explicada | Parcial | Ausente | 25 |
| total() con descuento + README | Correcto y claro | Aceptable | Deficiente | 20 |

> Nota: actividad formativa y opcional (sin nota en Moodle). La guía unificada para entregar todas las actividades opcionales, válida para todas las materias, estará en el Manual de Entrega de Actividades Opcionales (próximamente).

