---
course: Programación y Diseño Orientado a Objetos
program: Ingeniería de Sistemas
term: 2026-B
week: 7
session: 2
corte: 2
unit: Unidad 2 · Herencia y polimorfismo
topic: Polimorfismo y enlace dinámico
eyebrow: Unidad 2 · Herencia y polimorfismo · Corte 2
lead: El polimorfismo —cuarto pilar de la POO— permite tratar objetos distintos de forma uniforme y que cada uno responda a su manera. Es lo que hace flexible y extensible al código orientado a objetos.
objectives:
  - Explicar el polimorfismo con referencias de superclase.
  - Comprender el enlace dinámico (qué método se ejecuta).
  - Recorrer colecciones de objetos polimórficamente.
---

## 1. Una referencia, muchas formas

**Polimorfismo** = "muchas formas". Una variable del tipo **superclase** puede apuntar a objetos de cualquier **subclase**:

```java
// tab: Referencia polimórfica
Animal a1 = new Perro();   // referencia Animal -> objeto Perro
Animal a2 = new Gato();    // referencia Animal -> objeto Gato
System.out.println(a1.sonido());   // "Guau"
System.out.println(a2.sonido());   // "Miau"
```

Aunque ambas son `Animal`, cada una responde según su **tipo real**.

## 2. Enlace dinámico

Java decide **en tiempo de ejecución** qué versión del método ejecutar, según el objeto real (no el tipo de la variable). Eso se llama **enlace dinámico** (dynamic binding).

```ascii
Animal a = new Perro();
a.sonido()  --->  Java mira el objeto REAL (Perro)  --->  "Guau"
```

> info: Por eso el polimorfismo necesita **herencia + sobrescritura**: la subclase redefine el método y el enlace dinámico elige esa versión.

## 3. El poder: código uniforme y extensible

Puedes tratar muchos objetos distintos con el **mismo código**:

```java
// tab: Colección polimórfica
Animal[] animales = { new Perro(), new Gato(), new Perro() };
for (Animal a : animales) {
    System.out.println(a.sonido());   // cada uno responde distinto
}
```

Si mañana agregas `Vaca extends Animal`, **este bucle no cambia**: funciona con la nueva clase automáticamente.

> tip: El polimorfismo es lo que hace el código **abierto a extensión**: agregar tipos nuevos sin tocar el código que los usa.

## 4. instanceof y casting

A veces necesitas saber el tipo real o acceder a métodos propios de la subclase:

```java
// tab: instanceof
for (Animal a : animales) {
    if (a instanceof Perro) {
        Perro p = (Perro) a;   // casting
        p.ladrar();
    }
}
```

> warn: Un casting incorrecto (`(Gato) unPerro`) lanza `ClassCastException`. Verifica con `instanceof` antes de convertir.

## Autoevaluación

```quiz
Q: ¿Qué permite el polimorfismo?
* Que una referencia de superclase trate objetos de distintas subclases, cada uno a su manera
- Que las clases no tengan métodos
- Eliminar la herencia
E: Polimorfismo = una referencia superclase, muchos comportamientos según el objeto real.

Q: El enlace dinámico decide qué método ejecutar según...
* El tipo real del objeto, en tiempo de ejecución
- El tipo de la variable, en compilación
- El orden alfabético
E: Java elige la versión del método por el objeto real (dynamic binding).

Q: Antes de hacer casting a una subclase conviene...
* Verificar con instanceof
- Nada, siempre es seguro
- Borrar el objeto
E: instanceof evita un ClassCastException al convertir.
```

## Actividad de la semana (formativa)

Opcional y no evaluable. Versión ampliada con rúbrica en **optional-activity** (entrega por GitHub).

- Recorre un arreglo de `Animal` con varias subclases y muestra el polimorfismo en acción.
