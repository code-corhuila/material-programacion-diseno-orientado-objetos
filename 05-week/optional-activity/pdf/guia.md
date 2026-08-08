# GUÍA DE ACTIVIDAD PRÁCTICA

**Programación y Diseño Orientado a Objetos · Semana 5 · Clase integradora del Corte 1**

| Programa | Ingeniería de Sistemas | Asignatura | Programación y Diseño Orientado a Objetos |
|---|---|---|---|
| Unidad | Unidad 1 · Fundamentos de la POO | Semana / Corte | 5 · Corte 1 |
| Modalidad | Individual o en parejas | Periodo | 2026-B |
| Tipo | Formativa (opcional, sin nota) | Entrega | Repositorio en GitHub |

## Objetivos

- Integrar todos los conceptos del Corte 1 en una clase robusta.
- Proteger una invariante mediante encapsulamiento y validación.
- Implementar representación e igualdad correctas.

## 1. Enunciado

Diseña e implementa **una** clase a tu elección (p. ej. `CuentaBancaria`, `Termostato`, `Producto`, `Reserva`) que cumpla **todo** lo siguiente:

1. **Encapsulamiento con invariante clara** (documenta la invariante en el README).
2. **Atributo de solo lectura** (`private final`, con getter y sin setter) que actúe como identidad.
3. **Dos constructores**: uno completo (con validación) y uno reducido que **delegue con `this()`**.
4. **Operaciones de dominio** validadas (no setters genéricos que rompan la invariante).
5. **`toString()`** legible y **`equals`/`hashCode`** por la identidad.
6. **`main`** que cree objetos, ejecute casos válidos e inválidos (incluidos **límites**) y evidencie que la invariante nunca se viola; incluye una prueba con `HashSet`.

## 2. Requisitos

- Todos los puntos 1–6, integrados y probados.
- Casos límite cubiertos.
- README con: la invariante, decisiones de diseño y la salida de las pruebas.

## 3. Cómo entregar

Entrega **por GitHub**. Repositorio: `poo-s05-integrador`.

```
poo-s05-integrador/
  README.md   -> invariante + decisiones + salida de pruebas
  src/         -> tu clase + Main.java
```

1. Crea el repositorio público con ese nombre.
2. Sube el código y el README.
3. Comparte el enlace por el canal indicado por el docente.

## 4. Rúbrica de evaluación

| Criterio | Excelente (100%) | Aceptable (60%) | Por mejorar (0%) | Pts |
|---|---|---|---|---|
| Encapsulamiento + invariante | Protegida y documentada | Parcial | Ausente/violada | 25 |
| Constructores (this() + validación) | Correctos | Con detalles | Fallan | 20 |
| Atributo final de solo lectura | Correcto | — | Ausente | 10 |
| toString + equals/hashCode | Coherentes y probados | Uno o sin probar | Incorrectos | 25 |
| main con casos límite + README | Completo y claro | Aceptable | Deficiente | 20 |

> Nota: actividad formativa y opcional (sin nota en Moodle). La guía unificada para entregar todas las actividades opcionales, válida para todas las materias, estará en el Manual de Entrega de Actividades Opcionales (próximamente).

