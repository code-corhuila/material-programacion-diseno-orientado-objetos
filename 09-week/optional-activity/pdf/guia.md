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

## 3. Cómo entregar

Entrega **por GitHub**. Repositorio: `poo-s09-composicion`.

```
poo-s09-composicion/
  README.md          -> justificacion (composicion, cohesion, acoplamiento)
  src/modelo/        -> Producto.java, Pedido.java
  src/servicio/      -> PedidoService.java
  src/app/           -> Main.java
```

1. Crea el repositorio público con ese nombre.
2. Sube el código y el README.
3. Comparte el enlace por el canal indicado por el docente.

## 4. Rúbrica de evaluación

| Criterio | Excelente (100%) | Aceptable (60%) | Por mejorar (0%) | Pts |
|---|---|---|---|---|
| Composición + delegación | Correctas | Con detalles | Fallan | 30 |
| Organización en paquetes | Correcta y coherente | Parcial | Ausente | 25 |
| Cohesión / acoplamiento (separación) | Bien lograda y explicada | Parcial | Ausente | 25 |
| total() con descuento + README | Correcto y claro | Aceptable | Deficiente | 20 |

> Nota: actividad formativa y opcional (sin nota en Moodle). La guía unificada para entregar todas las actividades opcionales, válida para todas las materias, estará en el Manual de Entrega de Actividades Opcionales (próximamente).

