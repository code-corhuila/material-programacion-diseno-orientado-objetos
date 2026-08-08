---
course: Programación y Diseño Orientado a Objetos
program: Ingeniería de Sistemas
term: 2026-B
week: 6
corte: 2
unit: Unidad 2 · Herencia y polimorfismo
topic: Jerarquía de clases con herencia
eyebrow: Actividad opcional · Formativa · Entrega por GitHub
lead: Construye una jerarquía de clases usando herencia y super. Actividad opcional para afianzar el tercer pilar de la POO.
objectives:
  - Diseñar una superclase y subclases con extends.
  - Reutilizar el constructor del padre con super.
  - Ampliar métodos con super.metodo().
---

## 1. Enunciado

1. Crea la superclase `Empleado` con `nombre`, `salario` y método `datos()`.
2. Crea dos subclases: `Gerente` (agrega `bono`) y `Desarrollador` (agrega `lenguaje`).
3. Usa `super(...)` en los constructores y `super.datos()` para ampliar la información.
4. En `main`, crea un objeto de cada subclase e imprime sus datos.

## 2. Requisitos

- Uso de `extends` y `super(...)`.
- Al menos un método que use `super.metodo()`.
- Objetos de ambas subclases.

## 3. Cómo entregar

Entrega **por GitHub**. Repositorio: `poo-s06-herencia`.

```
poo-s06-herencia/
  README.md   -> jerarquia + salida de ejemplo
  src/         -> Empleado.java, Gerente.java, Desarrollador.java, Main.java
```

1. Crea el repo público con ese nombre.
2. Sube el código y el README.
3. Comparte el enlace por el canal indicado.

## 4. Rúbrica de evaluación

| Criterio | Excelente | Aceptable | Por mejorar | Pts |
|---|---|---|---|---|
| Herencia con extends | Correcta | Con detalles | Falla | 30 |
| Uso de super(...) | Correcto | Parcial | Ausente | 30 |
| super.metodo() (ampliar) | Correcto | Parcial | Ausente | 25 |
| README y repositorio | Ordenado | Aceptable | Deficiente | 15 |

> Nota: actividad formativa y opcional (sin nota en Moodle). La guía unificada de entrega estará en el Manual de Entrega de Actividades Opcionales (próximamente).

## Descargar

[⬇ Descargar la guía en PDF (membrete oficial CORHUILA)](pdf/Actividad-Semana06.pdf)
