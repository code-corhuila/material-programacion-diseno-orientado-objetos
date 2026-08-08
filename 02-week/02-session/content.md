---
course: Programación y Diseño Orientado a Objetos
program: Ingeniería de Sistemas
term: 2026-B
week: 2
session: 2
corte: 1
unit: Unidad 1 · Fundamentos de la POO
topic: Objetos — instanciación y uso
eyebrow: Unidad 1 · Fundamentos · Corte 1
lead: Con la clase lista, toca darle vida: crear objetos. En esta sesión instancias objetos con new, accedes a sus atributos y métodos, y entiendes qué es una referencia.
objectives:
  - Crear objetos con el operador new.
  - Acceder a atributos y métodos con el operador punto.
  - Comprender el concepto de referencia y el valor null.
---

## 1. Crear un objeto con new

Un objeto se crea (instancia) a partir de una clase con **new**:

```java
// tab: Instanciar
Persona p1 = new Persona();   // se crea el objeto
p1.nombre = "Ana";            // se asigna su estado
p1.edad = 20;
p1.saludar();                 // se invoca su comportamiento
```

- `new Persona()` reserva memoria y crea el objeto.
- `p1` es una **referencia**: apunta al objeto en memoria.

## 2. Muchos objetos, una clase

Cada objeto tiene su **propio estado**, aunque compartan la clase:

```java
// tab: Varios objetos
Persona a = new Persona(); a.nombre = "Ana";  a.edad = 20;
Persona b = new Persona(); b.nombre = "Beto"; b.edad = 31;
a.saludar();   // Hola, soy Ana...
b.saludar();   // Hola, soy Beto...
```

```ascii
 a --> [ nombre=Ana,  edad=20 ]
 b --> [ nombre=Beto, edad=31 ]
```

## 3. Referencias y null

Una variable de tipo objeto guarda una **referencia** (la dirección), no el objeto en sí.

```java
// tab: Referencias
Persona x = new Persona();
Persona y = x;        // y apunta AL MISMO objeto que x
y.nombre = "Zoe";
System.out.println(x.nombre);  // "Zoe" (¡es el mismo objeto!)
```

> warn: Si una referencia no apunta a ningún objeto vale `null`. Usarla (`p.saludar()` con `p == null`) lanza `NullPointerException`, el error más común en Java.

## 4. Objetos como parámetros

Puedes pasar objetos a métodos; se pasa la **referencia**, así que el método puede modificar el objeto.

```java
// tab: Objeto como parámetro
static void cumplir(Persona p) { p.edad++; }
// ...
cumplir(a);   // a.edad aumenta en 1
```

## Autoevaluación

```quiz
Q: ¿Qué hace el operador new?
* Crea (instancia) un objeto de la clase
- Borra un objeto
- Declara una clase
E: new reserva memoria y crea un objeto; la variable guarda su referencia.

Q: Si `y = x` (ambos Persona) y cambias y.nombre, ¿qué pasa con x.nombre?
* También cambia, porque apuntan al mismo objeto
- No cambia, son copias independientes
- Da error de compilación
E: Las variables de objeto guardan referencias; y y x apuntan al mismo objeto.

Q: ¿Qué error se produce al usar una referencia null?
* NullPointerException
- ArrayIndexOutOfBoundsException
- StackOverflowError
E: Invocar métodos/atributos sobre null lanza NullPointerException.
```

## Actividad de la semana (formativa)

Opcional y no evaluable. Versión ampliada con rúbrica en **optional-activity** (entrega por GitHub).

- Crea 3 objetos `Libro` distintos y llama a `describir()` en cada uno.
