# GUÍA DE ACTIVIDAD PRÁCTICA

**Programación y Diseño Orientado a Objetos · Semana 4 · Clase con constructores y toString**

| Programa | Ingeniería de Sistemas | Asignatura | Programación y Diseño Orientado a Objetos |
|---|---|---|---|
| Unidad | Unidad 1 · Fundamentos de la POO | Semana / Corte | 4 · Corte 1 |
| Modalidad | Individual o en parejas | Periodo | 2026-B |
| Tipo | Formativa (opcional, sin nota) | Entrega | Repositorio en GitHub |

## Objetivos

- Definir constructores (por defecto y parametrizado).
- Sobrescribir toString.
- Instanciar objetos en una sola línea y mostrarlos.

## 1. Enunciado

1. Crea la clase `Producto` con atributos privados: `nombre`, `precio`, `stock`.
2. Agrega **dos constructores**: uno vacío y uno con los tres parámetros (usa `this()`).
3. Agrega getters y `setPrecio` con validación (precio ≥ 0).
4. Sobrescribe `toString()` para una salida legible.
5. En `main`, crea 3 productos e imprímelos.

## 2. Requisitos

- Atributos privados + encapsulamiento.
- Dos constructores (uno reutiliza al otro con `this()`).
- `toString()` con `@Override`.

## 3. Cómo entregar

Entrega **por GitHub**. Repositorio: `poo-s04-constructores`.

```
poo-s04-constructores/
  README.md   -> salida de ejemplo
  src/         -> Producto.java, Main.java
```

1. Crea el repo público con ese nombre.
2. Sube el código y el README.
3. Comparte el enlace por el canal indicado.

## 4. Rúbrica de evaluación

| Criterio | Excelente | Aceptable | Por mejorar | Pts |
|---|---|---|---|---|
| Constructores (con this()) | Correctos | Con detalles | Fallan | 30 |
| Encapsulamiento + validación | Correcto | Parcial | Ausente | 30 |
| toString() | Correcto | Con detalles | Ausente | 25 |
| README y repositorio | Ordenado | Aceptable | Deficiente | 15 |

> Nota: actividad formativa y opcional (sin nota en Moodle). La guía unificada de entrega estará en el Manual de Entrega de Actividades Opcionales (próximamente).

