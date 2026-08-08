# GUÍA DE ACTIVIDAD PRÁCTICA

**Programación y Diseño Orientado a Objetos · Semana 9 · Diseño con composición y paquetes**

| Programa | Ingeniería de Sistemas | Asignatura | Programación y Diseño Orientado a Objetos |
|---|---|---|---|
| Unidad | Unidad 2 · Herencia y polimorfismo | Semana / Corte | 9 · Corte 2 |
| Modalidad | Individual o en parejas | Periodo | 2026-B |
| Tipo | Formativa (opcional, sin nota) | Entrega | Repositorio en GitHub |

## Objetivos

- Modelar una relación "tiene-un" con composición.
- Organizar las clases en paquetes.
- Delegar comportamiento entre objetos.

## 1. Enunciado

1. Modela un `Pedido` que **tiene** una lista de `Producto` (composición).
2. Implementa `agregar(Producto)` y `total()` (delega en los productos).
3. Organiza las clases en paquetes: `modelo` (Producto, Pedido) y `app` (Main).
4. En `main`, crea un pedido con 3 productos y muestra el total.

## 2. Requisitos

- Composición (Pedido contiene Productos).
- Uso de `package` e `import`.
- Cálculo correcto del total.

## 3. Cómo entregar

Entrega **por GitHub**. Repositorio: `poo-s09-composicion`.

```
poo-s09-composicion/
  README.md   -> estructura de paquetes + salida
  src/modelo/  -> Producto.java, Pedido.java
  src/app/     -> Main.java
```

1. Crea el repo público con ese nombre.
2. Sube el código y el README.
3. Comparte el enlace por el canal indicado.

## 4. Rúbrica de evaluación

| Criterio | Excelente | Aceptable | Por mejorar | Pts |
|---|---|---|---|---|
| Composición (Pedido↔Producto) | Correcta | Con detalles | Falla | 35 |
| Organización en paquetes | Correcta | Parcial | Ausente | 30 |
| total() (delegación) | Correcto | Con detalles | Falla | 20 |
| README y repositorio | Ordenado | Aceptable | Deficiente | 15 |

> Nota: actividad formativa y opcional (sin nota en Moodle). La guía unificada de entrega estará en el Manual de Entrega de Actividades Opcionales (próximamente).

