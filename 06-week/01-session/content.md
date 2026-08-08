---
course: Programación y Diseño Orientado a Objetos
program: Ingeniería de Sistemas
term: 2026-B
week: 6
session: 1
corte: 2
unit: Unidad 2 · Herencia y polimorfismo
topic: Herencia — extends y reutilización
eyebrow: Unidad 2 · Herencia y polimorfismo · Corte 2
lead: La herencia permite crear clases nuevas a partir de otras existentes, reutilizando su código y especializándolo. Es el tercer pilar de la POO y la base para el polimorfismo.
objectives:
  - Explicar la relación "es-un" (is-a) de la herencia.
  - Usar extends para heredar atributos y métodos.
  - Agregar atributos y métodos propios a una subclase.
---

## 1. La relación "es-un"

La **herencia** modela que una clase **es un** tipo de otra. Un `Perro` **es un** `Animal`; un `Estudiante` **es una** `Persona`.

- **Superclase (padre):** la clase general (`Animal`).
- **Subclase (hija):** la especializada (`Perro`), que **hereda** lo del padre y agrega lo suyo.

> info: Pregunta clave para decidir herencia: ¿puedo decir "la subclase **es un** superclase"? Si "Perro es un Animal" tiene sentido, la herencia encaja.

## 2. extends

En Java la herencia se declara con **extends**:

```java
// tab: Superclase
public class Animal {
    protected String nombre;
    public void comer() { System.out.println(nombre + " está comiendo."); }
}
```
```java
// tab: Subclase
public class Perro extends Animal {
    public void ladrar() { System.out.println(nombre + " dice: ¡Guau!"); }
}
```
```java
// tab: Uso
Perro p = new Perro();
p.nombre = "Fido";
p.comer();    // heredado de Animal
p.ladrar();   // propio de Perro
```

## 3. Qué se hereda

La subclase hereda los **atributos y métodos** de la superclase (según su acceso):

| Modificador en el padre | ¿Lo hereda la subclase? |
|---|---|
| `public` / `protected` | Sí, accesible |
| (sin modificar) | Solo si están en el mismo paquete |
| `private` | Existe en el objeto, pero **no accesible** directamente |

> tip: Usa `protected` para atributos que las subclases deban usar directamente; `private` + getters si quieres control total.

## 4. Beneficio: no repetir código

Sin herencia, `Perro`, `Gato` y `Vaca` repetirían `nombre` y `comer()`. Con herencia, eso vive **una sola vez** en `Animal` y todas lo reutilizan.

> warn: No abuses de la herencia. Si la relación no es realmente "es-un" (p. ej. "un Motor es un Carro" — falso), usa **composición** (Semana 9), no herencia.

## Autoevaluación

```quiz
Q: ¿Qué relación modela la herencia?
* "es-un" (la subclase es un tipo de la superclase)
- "tiene-un"
- "usa-un"
E: La herencia modela "es-un"; "tiene-un" es composición.

Q: ¿Con qué palabra clave se hereda en Java?
* extends
- implements
- inherits
E: Una subclase hereda de otra con extends.

Q: Un atributo private de la superclase, en la subclase...
* Existe en el objeto pero no es accesible directamente
- No existe
- Es público
E: Los private se heredan pero no son accesibles directo; se usan vía métodos.
```

## Actividad de la semana (formativa)

Opcional y no evaluable. Versión ampliada con rúbrica en **optional-activity** (entrega por GitHub).

- Crea `Animal` y dos subclases (`Perro`, `Gato`) que hereden `comer()` y agreguen su sonido.
