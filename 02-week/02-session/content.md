---
course: Programación y Diseño Orientado a Objetos
program: Ingeniería de Sistemas
term: 2026-B
week: 2
session: 2
corte: 1
unit: Unidad 1 · Fundamentos de la POO
topic: Objetos — instanciación, referencias y memoria
eyebrow: Unidad 1 · Fundamentos · Corte 1
lead: Una clase cobra vida al crear objetos. Pero entender los objetos exige entender las referencias: una variable de tipo objeto no guarda el objeto, sino su dirección. Esa distinción explica el aliasing, el paso de objetos a métodos y el temido NullPointerException. Esta sesión lo formaliza.
objectives:
  - Instanciar objetos con new y acceder a sus miembros.
  - Distinguir tipos primitivos de tipos de referencia y su modelo de memoria.
  - Explicar el aliasing y el paso de objetos como parámetros.
  - Prevenir el NullPointerException.
---

## 1. Crear objetos con new

`new` crea (instancia) un objeto de una clase y devuelve una **referencia** a él.

```java
// tab: Instanciar y usar
Persona p1 = new Persona();
p1.setNombre("Ana");
p1.setEdad(20);
System.out.println(p1.getEdad());
```

Cada objeto tiene **estado propio**, aunque compartan la clase:

```java
// tab: Varios objetos
Persona a = new Persona(); a.setNombre("Ana");
Persona b = new Persona(); b.setNombre("Beto");
// a y b son objetos independientes con identidad y estado propios
```

## 2. Primitivos vs. referencias

Java tiene dos categorías de tipos, con **semántica distinta**:

| | Tipos primitivos | Tipos de referencia |
|---|---|---|
| Ejemplos | `int, double, boolean, char` | `String`, arreglos, objetos |
| La variable guarda... | **el valor** directamente | **la dirección** del objeto |
| Al asignar/copiar | se copia el **valor** | se copia la **referencia** (no el objeto) |
| Valor "vacío" | no aplica | `null` |

```ascii
Primitivo:   int x = 5;        x → [ 5 ]           (el valor está en x)
Referencia:  Persona p = ...;  p → [ ●─────► {nombre:"Ana", edad:20} ]
                                       (p guarda una flecha al objeto)
```

## 3. Aliasing: dos referencias, un objeto

Copiar una referencia **no** copia el objeto: ambas apuntan al **mismo**.

```java
// tab: Aliasing
Persona x = new Persona(); x.setNombre("Zoe");
Persona y = x;             // y apunta AL MISMO objeto que x
y.setNombre("Zia");
System.out.println(x.getNombre());   // "Zia"  (¡es el mismo objeto!)
```

> warn: Esto sorprende a quien viene de pensar en "copias". `y = x` **no** duplica el objeto; crea un segundo nombre (alias) para el mismo. Para una copia real hay que crear un `new` y copiar los datos.

## 4. Objetos como parámetros

Cuando pasas un objeto a un método, se pasa **la referencia**; el método puede **modificar el objeto**.

```java
// tab: Objeto como parámetro
static void cumplir(Persona p) { p.setEdad(p.getEdad() + 1); }
// ...
cumplir(a);   // el objeto 'a' queda modificado (misma referencia)
```

> info: Java es **paso por valor** siempre: lo que se copia es el **valor de la referencia** (la flecha). Por eso el método puede modificar el objeto apuntado, pero **no** puede hacer que la variable original apunte a otro objeto.

## 5. null y el NullPointerException

Una referencia que no apunta a ningún objeto vale `null`. Usar un miembro sobre `null` lanza **`NullPointerException` (NPE)**.

```java
// tab: NPE
Persona p = null;
p.getNombre();     // NullPointerException en tiempo de ejecución
```

> warn: El NPE es el error más frecuente en Java. Prevención: inicializa las referencias, verifica `if (p != null)` antes de usarlas, y evita métodos que devuelvan `null` sin documentarlo.

## 6. Ciclo de vida y recolección de basura

Cuando **ningún** referencia apunta ya a un objeto, este queda **inaccesible** y el **recolector de basura (garbage collector)** de la JVM libera su memoria automáticamente. No hay `free`/`delete` manual como en otros lenguajes.

```ascii
Persona p = new Persona();   // objeto accesible
p = null;                    // el objeto queda sin referencias -> elegible para GC
```

## Autoevaluación

```quiz
Q: ¿Qué devuelve el operador new?
* Una referencia al objeto recién creado
- El valor primitivo del objeto
- El nombre de la clase
E: new crea el objeto y la variable guarda una referencia (su dirección).

Q: Tras Persona y = x; (ambos Persona) y modificar y, ¿qué pasa con x?
* También se ve modificado: apuntan al mismo objeto (aliasing)
- x queda intacto: son copias independientes
- Da error de compilación
E: Copiar la referencia no copia el objeto; x e y son alias del mismo.

Q: ¿Qué guarda una variable de tipo de referencia?
* La dirección (referencia) del objeto, no el objeto en sí
- El objeto completo
- Un valor primitivo
E: Las variables de objeto guardan la referencia al objeto en memoria.

Q: ¿Qué error se produce al invocar un método sobre una referencia null?
* NullPointerException
- ArrayIndexOutOfBoundsException
- ClassCastException
E: Usar un miembro sobre null lanza NullPointerException.

Q: Al pasar un objeto a un método en Java...
* Se copia el valor de la referencia; el método puede modificar el objeto apuntado
- Se copia el objeto completo
- El método no puede tocar el objeto
E: Java es paso por valor de la referencia; el objeto apuntado sí puede cambiar.

Q: ¿Quién libera la memoria de un objeto sin referencias?
* El recolector de basura (garbage collector) de la JVM
- El programador con delete
- Nadie; se queda para siempre
E: La JVM recolecta automáticamente los objetos inaccesibles.
```

## Actividad de la semana (formativa)

Opcional y no evaluable. Versión ampliada con rúbrica en **optional-activity** (entrega por GitHub).

- Demuestra el aliasing: crea un objeto, asígnalo a una segunda variable, modifica por la segunda y evidencia que la primera "ve" el cambio. Explica por qué en el README.
