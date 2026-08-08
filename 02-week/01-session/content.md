---
course: Programación y Diseño Orientado a Objetos
program: Ingeniería de Sistemas
term: 2026-B
week: 2
session: 1
corte: 1
unit: Unidad 1 · Fundamentos de la POO
topic: Clases en Java — definición y estructura
eyebrow: Unidad 1 · Fundamentos · Corte 1
lead: La clase es el corazón de la POO: el molde que describe cómo son y qué hacen los objetos. En esta sesión aprendes a declarar una clase en Java con sus atributos y métodos.
objectives:
  - Declarar una clase en Java con atributos y métodos.
  - Diferenciar estado (atributos) de comportamiento (métodos).
  - Usar la referencia this para el objeto actual.
---

## 1. Anatomía de una clase

Una clase agrupa **atributos** (el estado) y **métodos** (el comportamiento) de una entidad.

```java
// tab: Clase Persona
public class Persona {
    // atributos (estado)
    String nombre;
    int edad;

    // método (comportamiento)
    void saludar() {
        System.out.println("Hola, soy " + nombre + " y tengo " + edad + " años.");
    }
}
```

> info: Regla de nombres en Java: las **clases** van en `PascalCase` (`Persona`, `CuentaBancaria`); los atributos y métodos en `camelCase` (`nombre`, `saludar`).

## 2. Atributos: el estado

Los atributos describen **qué sabe** el objeto. Cada objeto tiene su propia copia.

- Se declaran con un **tipo** y un **nombre**: `String nombre;`, `int edad;`.
- Si no se inicializan, toman valores por defecto: `0` para números, `null` para objetos, `false` para boolean.

## 3. Métodos: el comportamiento

Los métodos describen **qué puede hacer** el objeto. Pueden recibir parámetros y devolver valores.

```java
// tab: Métodos con parámetros y retorno
int aniosParaCien() {
    return 100 - edad;          // devuelve un valor
}
void cumplirAnios() {
    edad = edad + 1;            // modifica el estado
}
```

## 4. La referencia this

`this` hace referencia **al objeto actual**. Se usa para distinguir el atributo de un parámetro con el mismo nombre.

```java
// tab: this
void setNombre(String nombre) {
    this.nombre = nombre;   // this.nombre = atributo; nombre = parámetro
}
```

> warn: Sin `this`, si el parámetro se llama igual que el atributo, `nombre = nombre` se asigna a sí mismo y el atributo nunca cambia. `this` resuelve la ambigüedad.

## Autoevaluación

```quiz
Q: ¿Qué agrupa una clase?
* Atributos (estado) y métodos (comportamiento)
- Solo variables globales
- Solo funciones estáticas
E: La clase reúne el estado (atributos) y el comportamiento (métodos) de la entidad.

Q: ¿Cuál es la convención de nombres para clases en Java?
* PascalCase (p. ej. CuentaBancaria)
- camelCase (p. ej. cuentaBancaria)
- MAYÚSCULAS
E: Las clases usan PascalCase; atributos y métodos usan camelCase.

Q: ¿Para qué sirve la referencia this?
* Referirse al objeto actual y distinguir atributo de parámetro
- Crear un nuevo objeto
- Terminar el programa
E: this apunta al objeto actual; resuelve la ambigüedad atributo/parámetro.
```

## Actividad de la semana (formativa)

Opcional y no evaluable. Versión ampliada con rúbrica en **optional-activity** (entrega por GitHub).

- Declara una clase `Libro` con atributos (título, autor, páginas) y un método `describir()`.
