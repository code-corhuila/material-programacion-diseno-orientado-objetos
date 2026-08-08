# GUÍA DE ACTIVIDAD PRÁCTICA

**Programación y Diseño Orientado a Objetos · Semana 3 · Clase encapsulada con validación**

| Programa | Ingeniería de Sistemas | Asignatura | Programación y Diseño Orientado a Objetos |
|---|---|---|---|
| Unidad | Unidad 1 · Fundamentos de la POO | Semana / Corte | 3 · Corte 1 |
| Modalidad | Individual o en parejas | Periodo | 2026-B |
| Tipo | Formativa (opcional, sin nota) | Entrega | Repositorio en GitHub |

## Objetivos

- Declarar atributos privados.
- Implementar getters y setters con validación.
- Garantizar que el objeto no llegue a estados inválidos.

## 1. Enunciado

1. Crea la clase `CuentaBancaria` con atributo privado `saldo` (inicia en 0).
2. Implementa `getSaldo()`, `consignar(double)` y `retirar(double)`.
3. **Valida:** no consignar montos ≤ 0; no retirar más que el saldo.
4. En `main`, prueba casos válidos e inválidos y muestra el saldo tras cada uno.

## 2. Requisitos

- Atributos `private`.
- Validación en consignar y retirar.
- Casos de prueba válidos e inválidos.

## 3. Cómo entregar

Entrega **por GitHub**. Repositorio: `poo-s03-encapsulamiento`.

```
poo-s03-encapsulamiento/
  README.md   -> casos de prueba + resultados
  src/         -> CuentaBancaria.java, Main.java
```

1. Crea el repo público con ese nombre.
2. Sube el código y el README.
3. Comparte el enlace por el canal indicado.

## 4. Rúbrica de evaluación

| Criterio | Excelente | Aceptable | Por mejorar | Pts |
|---|---|---|---|---|
| Atributos privados | Correcto | — | Públicos | 20 |
| Getters/métodos | Correctos | Con detalles | Fallan | 25 |
| Validación (consignar/retirar) | Robusta | Parcial | Ausente | 35 |
| Casos de prueba y README | Claros | Aceptables | Deficientes | 20 |

> Nota: actividad formativa y opcional (sin nota en Moodle). La guía unificada de entrega estará en el Manual de Entrega de Actividades Opcionales (próximamente).

