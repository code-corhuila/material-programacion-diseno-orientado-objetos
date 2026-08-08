---
course: Programación y Diseño Orientado a Objetos
program: Ingeniería de Sistemas
term: 2026-B
week: 4
session: 1
corte: 1
unit: Unidad 1 · Fundamentos de la POO
topic: Constructores en Java
eyebrow: Unidad 1 · Fundamentos · Corte 1
lead: Crear un objeto y luego asignar sus datos uno por uno es tedioso y propenso a errores. Los constructores permiten crear objetos ya inicializados y válidos desde el primer momento.
objectives:
  - Explicar qué es un constructor y cuándo se ejecuta.
  - Definir constructores parametrizados.
  - Sobrecargar constructores y usar this().
---

## 1. ¿Qué es un constructor?

Un **constructor** es un método especial que se ejecuta **al crear el objeto** (con `new`). Sirve para inicializar su estado.

- Tiene **el mismo nombre que la clase**.
- **No** declara tipo de retorno (ni `void`).

```java
// tab: Constructor
public class Persona {
    private String nombre;
    private int edad;

    public Persona(String nombre, int edad) {  // constructor
        this.nombre = nombre;
        this.edad = edad;
    }
}
// uso:
Persona p = new Persona("Ana", 20);   // objeto ya inicializado
```

## 2. Constructor por defecto

Si no defines ninguno, Java crea uno **vacío** implícito. Pero si defines uno parametrizado, el vacío **desaparece** (a menos que lo declares tú).

```java
// tab: Por defecto explícito
public Persona() {          // constructor sin parámetros
    this.nombre = "Sin nombre";
    this.edad = 0;
}
```

> warn: Error típico: defines `Persona(String, int)` y luego intentas `new Persona()` — no compila, porque el constructor vacío ya no existe. Decláralo si lo necesitas.

## 3. Sobrecarga de constructores

Puedes tener **varios constructores** con distintos parámetros (sobrecarga). `this(...)` llama a otro constructor de la misma clase para no repetir código.

```java
// tab: Sobrecarga + this()
public Persona() {
    this("Sin nombre", 0);          // reutiliza el otro constructor
}
public Persona(String nombre, int edad) {
    this.nombre = nombre;
    this.edad = edad;
}
```

> tip: Sobrecargar constructores da flexibilidad: crear el objeto con todos los datos, con algunos, o con valores por defecto.

## Autoevaluación

```quiz
Q: ¿Cuándo se ejecuta un constructor?
* Al crear el objeto con new
- Cada vez que se llama un método
- Al finalizar el programa
E: El constructor se ejecuta una vez, al instanciar el objeto con new.

Q: ¿Qué caracteriza a un constructor?
* Tiene el nombre de la clase y no declara tipo de retorno
- Se llama siempre main
- Devuelve void
E: El constructor lleva el nombre de la clase y no tiene tipo de retorno.

Q: Si defines un constructor parametrizado y no el vacío, ¿qué pasa con new Clase()?
* No compila (el vacío implícito ya no existe)
- Funciona igual
- Crea el objeto con null
E: Al definir un constructor, Java deja de generar el vacío implícito.
```

## Actividad de la semana (formativa)

Opcional y no evaluable. Versión ampliada con rúbrica en **optional-activity** (entrega por GitHub).

- Agrega a tu clase `Libro` un constructor parametrizado y crea objetos en una sola línea.
