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
lead: El polimorfismo es el cuarto pilar de la POO y el que más potencia el diseño: permite tratar objetos de distintas subclases de forma uniforme y que cada uno responda a su manera, decidido en tiempo de ejecución. Es la clave del código extensible, abierto a nuevos tipos sin modificar el existente.
objectives:
  - Explicar el polimorfismo de subtipo con referencias de superclase.
  - Describir el enlace dinámico (dynamic dispatch).
  - Aplicar upcasting/downcasting e instanceof con seguridad.
  - Justificar el beneficio de "abierto a extensión".
---

## 1. Una referencia, muchas formas

> info: **Polimorfismo de subtipo.** Una referencia de tipo **superclase** puede apuntar a objetos de cualquier **subclase**, y al invocar un método sobrescrito se ejecuta el de su **tipo real**.

```java
// tab: Referencia polimórfica
Animal a1 = new Perro();   // referencia Animal -> objeto Perro (upcasting implícito)
Animal a2 = new Gato();
System.out.println(a1.sonido());   // "Guau"
System.out.println(a2.sonido());   // "Miau"
```

Aunque ambas variables son de tipo `Animal`, cada objeto responde según su **clase real**.

## 2. Enlace dinámico (dynamic dispatch)

> info: **Enlace dinámico.** Java decide **en tiempo de ejecución** qué versión de un método sobrescrito ejecutar, según el **objeto real**, no según el tipo de la variable.

```ascii
Animal a = new Perro();
a.sonido()  →  la JVM mira el OBJETO real (Perro)  →  ejecuta Perro.sonido()  →  "Guau"
```

Por eso el polimorfismo requiere **herencia + sobrescritura** (S7-S1): la subclase redefine el método y el enlace dinámico elige esa versión.

## 3. Upcasting y downcasting

- **Upcasting** (subclase → superclase): **implícito** y seguro. `Animal a = new Perro();`
- **Downcasting** (superclase → subclase): **explícito** y riesgoso; verifica con `instanceof`.

```java
// tab: instanceof + downcasting
for (Animal a : animales) {
    if (a instanceof Perro) {          // ¿es realmente un Perro?
        Perro p = (Perro) a;           // downcasting seguro
        p.ladrar();                    // método propio de Perro
    }
}
```

> warn: Un downcasting a un tipo que el objeto **no es** (`(Gato) unPerro`) lanza `ClassCastException`. Verifica siempre con `instanceof` antes de convertir.

## 4. El poder: código uniforme y extensible

Puedes procesar muchos tipos con **el mismo código**:

```java
// tab: Colección polimórfica
Animal[] animales = { new Perro(), new Gato(), new Perro() };
for (Animal a : animales) {
    System.out.println(a.sonido());   // cada uno responde distinto
}
```

> info: **Principio abierto/cerrado.** Si mañana agregas `Vaca extends Animal` con su `sonido()`, **este bucle no cambia**: funciona con el tipo nuevo automáticamente. El código queda *abierto a extensión* (nuevos tipos) y *cerrado a modificación* (no tocas lo existente).

## 5. Ejemplo trabajado: áreas de figuras

```java
// tab: Figura (base)
public abstract class Figura {           // (abstracta: ver S8)
    public abstract double area();
}
```
```java
// tab: Subclases + uso polimórfico
public class Circulo extends Figura {
    private double r; public Circulo(double r){this.r=r;}
    @Override public double area(){ return Math.PI*r*r; }
}
public class Rectangulo extends Figura {
    private double b,h; public Rectangulo(double b,double h){this.b=b;this.h=h;}
    @Override public double area(){ return b*h; }
}
// ...
Figura[] figs = { new Circulo(2), new Rectangulo(3,4) };
double total = 0;
for (Figura f : figs) total += f.area();   // polimorfismo: cada figura su fórmula
```

## 6. Errores comunes

- Creer que el método ejecutado depende del **tipo de la variable** (depende del **objeto real**).
- Hacer downcasting sin `instanceof` → `ClassCastException`.
- Llamar, desde una referencia de superclase, un método **propio** de la subclase sin castear (no compila).
- Abusar de `instanceof` + casting donde bastaría un método polimórfico (rediseñar).

## Autoevaluación

```quiz
Q: ¿Qué permite el polimorfismo de subtipo?
* Que una referencia de superclase trate objetos de subclases, cada uno respondiendo a su manera
- Que todas las subclases hagan lo mismo
- Eliminar la herencia
E: Una referencia superclase, muchos comportamientos según el objeto real.

Q: El enlace dinámico decide qué método ejecutar según...
* El tipo real del objeto, en tiempo de ejecución
- El tipo de la variable, en compilación
- El orden de declaración
E: Dynamic dispatch elige la versión del objeto real (no del tipo de la variable).

Q: ¿Cuál conversión es implícita y segura?
* Upcasting (subclase → superclase)
- Downcasting (superclase → subclase)
- Ninguna es segura
E: El upcasting es implícito y seguro; el downcasting requiere verificación.

Q: Antes de un downcasting conviene...
* Verificar con instanceof para evitar ClassCastException
- Nada, siempre es seguro
- Convertir a String primero
E: instanceof confirma el tipo real antes de convertir.

Q: Agregar Vaca extends Animal sin tocar el bucle que recorre Animal[] ilustra...
* El principio abierto/cerrado (abierto a extensión, cerrado a modificación)
- Sobrecarga de métodos
- Encapsulamiento
E: El polimorfismo permite extender con nuevos tipos sin modificar el código existente.

Q: ¿Qué necesita el polimorfismo para funcionar?
* Herencia + sobrescritura del método
- Solo sobrecarga
- Atributos públicos
E: La subclase sobrescribe el método y el enlace dinámico elige esa versión.
```

## Actividad de la semana (formativa)

Opcional y no evaluable. Versión ampliada con rúbrica en **optional-activity** (entrega por GitHub).

- Crea `Figura` con `area()` y 3 subclases; recorre un `Figura[]` sumando áreas (polimorfismo) y usa `instanceof` para invocar un método propio de una de ellas.
