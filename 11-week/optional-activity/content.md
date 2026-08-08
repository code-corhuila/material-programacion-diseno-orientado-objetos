---
course: Programación y Diseño Orientado a Objetos
program: Ingeniería de Sistemas
term: 2026-B
week: 11
corte: 3
unit: Unidad 3 · Robustez y bibliotecas
topic: Programa robusto con manejo de errores
eyebrow: Actividad opcional · Formativa · Entrega por GitHub
lead: Haz que tu programa no se caiga ante entradas o situaciones inválidas. Actividad opcional de refuerzo sobre excepciones.
objectives:
  - Manejar errores con try/catch.
  - Lanzar una excepción propia ante una regla violada.
  - Usar finally para un mensaje de cierre.
---

## 1. Enunciado

1. Crea una clase `Cuenta` con `retirar(double)` que lance `SaldoInsuficienteException` (propia) si el monto supera el saldo.
2. En `main`, pide montos al usuario y maneja con try/catch: entrada no numérica y saldo insuficiente.
3. Usa `finally` para imprimir el saldo final siempre.
4. Prueba con casos válidos e inválidos.

## 2. Requisitos

- Excepción personalizada creada y lanzada.
- try/catch para al menos dos tipos de error.
- Bloque finally.

## 3. Cómo entregar

Entrega **por GitHub**. Repositorio: `poo-s11-excepciones`.

```
poo-s11-excepciones/
  README.md   -> casos de prueba + resultados
  src/         -> Cuenta.java, SaldoInsuficienteException.java, Main.java
```

1. Crea el repo público con ese nombre.
2. Sube el código y el README.
3. Comparte el enlace por el canal indicado.

## 4. Rúbrica de evaluación

| Criterio | Excelente | Aceptable | Por mejorar | Pts |
|---|---|---|---|---|
| try/catch (2 tipos) | Correcto | Uno | Ausente | 30 |
| Excepción propia (throw) | Correcta | Con detalles | Ausente | 35 |
| finally | Correcto | — | Ausente | 20 |
| README y repositorio | Ordenado | Aceptable | Deficiente | 15 |

> Nota: actividad formativa y opcional (sin nota en Moodle). La guía unificada de entrega estará en el Manual de Entrega de Actividades Opcionales (próximamente).

## Descargar

[⬇ Descargar la guía en PDF (membrete oficial CORHUILA)](pdf/Actividad-Semana11.pdf)
