# GUÍA DE ACTIVIDAD PRÁCTICA

**Programación y Diseño Orientado a Objetos · Semana 4 · Clase con constructores, toString e igualdad**

| Programa | Ingeniería de Sistemas | Asignatura | Programación y Diseño Orientado a Objetos |
|---|---|---|---|
| Unidad | Unidad 1 · Fundamentos de la POO | Semana / Corte | 4 · Corte 1 |
| Modalidad | Individual o en parejas | Periodo | 2026-B |
| Tipo | Formativa (opcional, sin nota) | Entrega | Repositorio en GitHub |

## Objetivos

- Definir constructores (por defecto y parametrizado) con this() y validación.
- Sobrescribir toString.
- Implementar equals y hashCode respetando su contrato.

## 1. Enunciado

1. Crea la clase `Producto` con atributos privados: `codigo` (solo lectura, `final`), `nombre`, `precio`, `stock`.
2. **Constructores:** uno completo (con validación `precio >= 0`, `stock >= 0`) y uno que reciba solo `codigo` y `nombre` y **delegue con `this()`** en el completo (precio y stock en 0).
3. `toString()` con `@Override` para una salida legible.
4. `equals`/`hashCode` **por `codigo`** (dos productos con el mismo código son "iguales").
5. En `Main`: crea productos, imprímelos, compara dos con el mismo código (`equals` → `true`) y agrégalos a un `HashSet<Producto>` para evidenciar que **no se duplican**.

## 2. Requisitos

- Encapsulamiento + `final` en `codigo`.
- `this()` entre constructores + validación.
- `equals` y `hashCode` coherentes (mismos campos), con `@Override`.
- Prueba con `HashSet`.

## 3. Cómo entregar

Entrega **por GitHub**. Repositorio: `poo-s04-constructores`.

```
poo-s04-constructores/
  README.md   -> salida + demostracion de equals/HashSet
  src/         -> Producto.java, Main.java
```

1. Crea el repositorio público con ese nombre.
2. Sube el código y el README.
3. Comparte el enlace por el canal indicado por el docente.

## 4. Rúbrica de evaluación

| Criterio | Excelente (100%) | Aceptable (60%) | Por mejorar (0%) | Pts |
|---|---|---|---|---|
| Constructores (this() + validación) | Correctos | Con detalles | Fallan | 25 |
| Encapsulamiento + codigo final | Correcto | Parcial | Ausente | 20 |
| toString | Claro y con @Override | Con detalles | Ausente | 15 |
| equals + hashCode (contrato) | Coherentes y probados con HashSet | Uno o sin probar | Incorrectos | 30 |
| README y repositorio | Ordenado | Aceptable | Deficiente | 10 |

> Nota: actividad formativa y opcional (sin nota en Moodle). La guía unificada para entregar todas las actividades opcionales, válida para todas las materias, estará en el Manual de Entrega de Actividades Opcionales (próximamente).

