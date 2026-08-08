---
course: Programación y Diseño Orientado a Objetos
program: Ingeniería de Sistemas
term: 2026-B
week: 8
corte: 2
unit: Unidad 2 · Herencia y polimorfismo
topic: Abstracción con clases abstractas e interfaces
eyebrow: Actividad opcional · Formativa · Entrega por GitHub
lead: Combina los dos mecanismos de abstracción de Java —clase abstracta (familia con código común) e interfaz (capacidad)— en un mismo diseño, y úsalos polimórficamente. Actividad opcional de refuerzo.
objectives:
  - Definir una clase abstracta con método abstracto y método concreto.
  - Definir e implementar una interfaz (capacidad).
  - Usar polimorfismo por superclase y por interfaz en el mismo programa.
---

## 1. Enunciado

1. Clase abstracta `Figura` con `area()` **abstracto** y `describir()` **concreto** que use `area()`.
2. Subclases `Circulo`, `Rectangulo`, `Triangulo` que implementen `area()`.
3. Interfaz `Dibujable` con `dibujar()`, implementada por las tres figuras.
4. En `Main`:
   - Recorre un `Figura[]` mostrando `describir()` (polimorfismo por **superclase**).
   - Recorre un `Dibujable[]` invocando `dibujar()` (polimorfismo por **interfaz**).
5. Verifica que `new Figura()` **no compila** (coméntalo y explica por qué).

## 2. Requisitos

- Clase abstracta con método abstracto implementado en subclases.
- Interfaz implementada por las figuras.
- Uso polimórfico por superclase **y** por interfaz.
- Explicación de por qué no se puede instanciar la abstracta.

## 3. Cómo entregar

Entrega **por GitHub**. Repositorio: `poo-s08-abstraccion`.

```
poo-s08-abstraccion/
  README.md   -> salida + por que Figura no se instancia + interfaz vs abstracta
  src/         -> Figura.java, Dibujable.java, subclases, Main.java
```

1. Crea el repositorio público con ese nombre.
2. Sube el código y el README.
3. Comparte el enlace por el canal indicado por el docente.

## 4. Rúbrica de evaluación

| Criterio | Excelente (100%) | Aceptable (60%) | Por mejorar (0%) | Pts |
|---|---|---|---|---|
| Clase abstracta + método abstracto | Correcta | Con detalles | Falla | 25 |
| Interfaz + implements | Correcta | Con detalles | Falla | 25 |
| Polimorfismo (superclase e interfaz) | Ambos correctos | Uno | Ausente | 30 |
| README (abstracta vs interfaz + no-instanciable) | Claro | Básico | Ausente | 20 |

> Nota: actividad formativa y opcional (sin nota en Moodle). La guía unificada para entregar todas las actividades opcionales, válida para todas las materias, estará en el Manual de Entrega de Actividades Opcionales (próximamente).

## Descargar

[⬇ Descargar la guía en PDF (membrete oficial CORHUILA)](pdf/Actividad-Semana08.pdf)
