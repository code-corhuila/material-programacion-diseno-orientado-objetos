# GUÍA DE ACTIVIDAD PRÁCTICA

**Programación y Diseño Orientado a Objetos · Semana 3 · Clase encapsulada que protege su invariante**

| Programa | Ingeniería de Sistemas | Asignatura | Programación y Diseño Orientado a Objetos |
|---|---|---|---|
| Unidad | Unidad 1 · Fundamentos de la POO | Semana / Corte | 3 · Corte 1 |
| Modalidad | Individual o en parejas | Periodo | 2026-B |
| Tipo | Formativa (opcional, sin nota) | Entrega | Repositorio en GitHub |

## Objetivos

- Encapsular una clase protegiendo una invariante clara.
- Validar en las operaciones que modifican el estado.
- Usar un atributo de solo lectura (final).

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

## 3. Cómo entregar

Entrega **por GitHub**. Repositorio: `poo-s03-encapsulamiento`.

```
poo-s03-encapsulamiento/
  README.md   -> casos de prueba + por que no hay setSaldo
  src/         -> CuentaBancaria.java, Main.java
```

1. Crea el repositorio público con ese nombre.
2. Sube el código y el README.
3. Comparte el enlace por el canal indicado por el docente.

## 4. Rúbrica de evaluación

| Criterio | Excelente (100%) | Aceptable (60%) | Por mejorar (0%) | Pts |
|---|---|---|---|---|
| Atributos privados + id final (solo lectura) | Correcto | Con detalles | Falla | 25 |
| Operaciones de dominio validadas | consignar y retirar robustos | Uno validado | Sin validar | 35 |
| Invariante protegida (demostrada) | Casos válidos e inválidos claros | Parcial | Ausente | 25 |
| README (justifica ausencia de setSaldo) | Claro | Básico | Ausente | 15 |

> Nota: actividad formativa y opcional (sin nota en Moodle). La guía unificada para entregar todas las actividades opcionales, válida para todas las materias, estará en el Manual de Entrega de Actividades Opcionales (próximamente).

