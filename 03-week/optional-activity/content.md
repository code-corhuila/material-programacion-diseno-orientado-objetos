---
course: Programación y Diseño Orientado a Objetos
program: Ingeniería de Sistemas
term: 2026-B
week: 3
corte: 1
unit: Unidad 1 · Fundamentos de la POO
topic: Clase encapsulada que protege su invariante
eyebrow: Actividad opcional · Formativa · Entrega por GitHub
lead: Diseña una clase que garantice sus reglas por construcción: atributos privados, operaciones de dominio validadas y un identificador de solo lectura. Actividad opcional de refuerzo del encapsulamiento.
objectives:
  - Encapsular una clase protegiendo una invariante clara.
  - Validar en las operaciones que modifican el estado.
  - Usar un atributo de solo lectura (final).
---

## 1. Enunciado

1. Crea la clase `CuentaBancaria` con:
   - `id` de **solo lectura** (`private final`, asignado al crear; solo getter).
   - `saldo` **privado** (invariante: `saldo >= 0`).
2. Implementa **operaciones de dominio** (no un `setSaldo` genérico):
   - `consignar(double monto)` — solo si `monto > 0`.
   - `retirar(double monto)` — solo si `monto > 0` y `monto <= saldo` (devuelve `boolean`).
   - `getSaldo()` y `getId()`.
3. En `Main`, **demuestra que la invariante no se puede violar**: intenta consignar/retirar montos inválidos y muestra que el saldo nunca queda negativo.
4. Explica en el README por qué NO expusiste `setSaldo`.

## 2. Requisitos

- Atributos `private`; `id` con `final` y sin setter.
- Validación en `consignar` y `retirar`.
- Casos de prueba válidos e inválidos que evidencien la protección de la invariante.

## 3. Cómo entregar (por GitHub)

Las entregas se realizan en **tu fork del repositorio de la clase**, dentro de la carpeta de esta semana. Si nunca has usado GitHub, sigue el **[Manual de Entrega por GitHub](https://code-corhuila.github.io/ova-web/manuales/Manual-Entrega-GitHub.pdf)** paso a paso.

1. Haz **fork** del repositorio de la clase (enlace dado por el docente) y **clónalo**.
2. Coloca tu entrega en la carpeta **`03-week/`** correspondiente a esta semana.
3. Sube los cambios: `git add .` · `git commit -m "Entrega semana 03"` · `git push` (abre un *Pull Request* si el docente lo pide).
4. Verifica que tienes tu **repo de perfil** con el bloque **CONFIG** (`FULL_NAME` + `GITHUB_USER`); sin él, tus entregas no se detectan.

## 4. Rúbrica de evaluación

| Criterio | Excelente (100%) | Aceptable (60%) | Por mejorar (0%) | Pts |
|---|---|---|---|---|
| Atributos privados + id final (solo lectura) | Correcto | Con detalles | Falla | 25 |
| Operaciones de dominio validadas | consignar y retirar robustos | Uno validado | Sin validar | 35 |
| Invariante protegida (demostrada) | Casos válidos e inválidos claros | Parcial | Ausente | 25 |
| README (justifica ausencia de setSaldo) | Claro | Básico | Ausente | 15 |

> Nota: actividad formativa y opcional (sin nota en Moodle). La guía unificada para entregar todas las actividades opcionales, válida para todas las materias, estará en el Manual de Entrega de Actividades Opcionales (próximamente).

## Descargar

[⬇ Descargar la guía en PDF (membrete oficial CORHUILA)](pdf/Actividad-Semana03.pdf)
