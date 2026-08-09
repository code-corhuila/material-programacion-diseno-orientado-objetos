---
course: Programación y Diseño Orientado a Objetos
program: Ingeniería de Sistemas
term: 2026-B
week: 5
corte: 1
unit: Unidad 1 · Fundamentos de la POO
topic: Clase integradora del Corte 1
eyebrow: Actividad opcional · Repaso · Entrega por GitHub
lead: Demuestra que dominas el Corte 1 diseñando una sola clase que integre todos los conceptos: encapsulamiento con invariante, constructores con this() y validación, atributo de solo lectura, y toString/equals/hashCode. Actividad opcional de preparación para el parcial.
objectives:
  - Integrar todos los conceptos del Corte 1 en una clase robusta.
  - Proteger una invariante mediante encapsulamiento y validación.
  - Implementar representación e igualdad correctas.
---

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

## 3. Cómo entregar (por GitHub)

Las entregas se realizan en **tu fork del repositorio de la clase**, dentro de la carpeta de esta semana. Si nunca has usado GitHub, sigue el **[Manual de Entrega por GitHub](https://code-corhuila.github.io/ova-web/manuales/Manual-Entrega-GitHub.pdf)** paso a paso.

1. Haz **fork** del repositorio de la clase (enlace dado por el docente) y **clónalo**.
2. Coloca tu entrega en la carpeta **`05-week/`** correspondiente a esta semana.
3. Sube los cambios: `git add .` · `git commit -m "Entrega semana 05"` · `git push` (abre un *Pull Request* si el docente lo pide).
4. Verifica que tienes tu **repo de perfil** con el bloque **CONFIG** (`FULL_NAME` + `GITHUB_USER`); sin él, tus entregas no se detectan.

## 4. Rúbrica de evaluación

| Criterio | Excelente (100%) | Aceptable (60%) | Por mejorar (0%) | Pts |
|---|---|---|---|---|
| Encapsulamiento + invariante | Protegida y documentada | Parcial | Ausente/violada | 25 |
| Constructores (this() + validación) | Correctos | Con detalles | Fallan | 20 |
| Atributo final de solo lectura | Correcto | — | Ausente | 10 |
| toString + equals/hashCode | Coherentes y probados | Uno o sin probar | Incorrectos | 25 |
| main con casos límite + README | Completo y claro | Aceptable | Deficiente | 20 |

> Nota: actividad formativa y opcional (sin nota en Moodle). La guía unificada para entregar todas las actividades opcionales, válida para todas las materias, estará en el Manual de Entrega de Actividades Opcionales (próximamente).

## Descargar

[⬇ Descargar la guía en PDF (membrete oficial CORHUILA)](pdf/Actividad-Semana05.pdf)
