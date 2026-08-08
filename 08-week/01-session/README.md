# Week 08 - Session 1: Abstract Classes and Abstract Methods

**Course:** Object-Oriented Programming and Design (2026-B)
**Unit 2:** Design principles and modularity
**Session focus:** Abstraction, abstract classes, and abstract methods
**Reference language:** Java

---

## 1. Session objective

By the end of this session the student will be able to **define abstract methods in a
parent class and implement them correctly in two or more concrete subclasses**, and to
**explain why an abstract class exists and why it cannot be instantiated**. The student
will produce a small, compiling `Shape` hierarchy that demonstrates polymorphism through
an abstract supertype.

---

## 2. Timed agenda (110 minutes)

| Time | Segment | Activity |
|---|---|---|
| 0:00 - 0:10 | Warm-up | Recap of inheritance and polymorphism from Week 7; framing question. |
| 0:10 - 0:40 | Theory | Abstraction, abstract classes, abstract methods, shared state, why no instantiation. |
| 0:40 - 1:05 | Worked example | Building the `Shape` hierarchy step by step (live coding). |
| 1:05 - 1:35 | Guided practice | Students extend the hierarchy with new shapes and a client loop. |
| 1:35 - 1:45 | Wrap-up | Common mistakes, summary, exit ticket. |

---

## 3. Warm-up (framing question)

> Last week we wrote a `Shape` superclass with an `area()` method that simply returned
> `0`, and every subclass overrode it. That "return 0" was a lie: a generic shape has no
> meaningful area. **What if the language let us say "every shape has an area, but the
> base class refuses to guess it"?**

Hold that thought. That is exactly what an *abstract method* does.

---

## 4. Theory notes

### 4.1 Abstraction: the idea before the keyword

**Abstraction** is the act of separating *what* something does from *how* it does it.
When you press the brake pedal of a car you rely on the *contract* ("the car slows
down") without knowing whether the mechanism is a drum brake, a disc brake, or
regenerative braking. In code, abstraction lets client code depend on a stable idea
("a shape has an area") while concrete types vary freely underneath.

Java gives us two language tools to express abstraction:

- **Abstract classes** - a partially implemented base type (this session).
- **Interfaces** - a pure contract (Session 2).

### 4.2 The abstract method

An **abstract method** is a method declared *without a body*. It states that a behavior
must exist, but refuses to say how:

```java
public abstract double area();   // note: no braces, just a semicolon
```

An abstract method is a *promise the parent forces onto its children*. Any concrete
subclass must provide a real implementation, or it too remains abstract.

### 4.3 The abstract class

A class that contains one or more abstract methods **must** be declared `abstract`. An
abstract class:

- **cannot be instantiated** with `new` - because it is incomplete; and
- **may contain everything a normal class has**: fields (state), constructors, concrete
  methods, and static members.

This last point is the key difference from an interface: an abstract class can carry
*shared state and shared behavior*, not just signatures.

```java
public abstract class Shape {
    private final String name;          // shared STATE

    protected Shape(String name) {      // constructor for subclasses to call
        this.name = name;
    }

    public String getName() {           // shared CONCRETE behavior
        return name;
    }

    public abstract double area();      // REQUIRED behavior, unspecified here

    public String describe() {          // concrete method that USES the abstract one
        return String.format("%s with area %.2f", name, area());
    }
}
```

Notice `describe()`: it calls `area()` even though `Shape` does not know how any area is
computed. At runtime the *actual* subclass supplies `area()`. This is polymorphism, and
the pattern - a concrete method built on top of abstract steps - is called the
**Template Method** pattern.

### 4.4 Why can't we instantiate an abstract class?

Because it has holes. If Java allowed `new Shape("thing")`, what would `thing.area()`
return? There is no sensible answer. Forbidding instantiation is the compiler protecting
you from calling a method that has no body. You *can* still hold an abstract-typed
reference to a concrete object:

```java
Shape s = new Circle(2.0);   // legal: the object is a Circle, the reference is a Shape
// Shape s = new Shape("x"); // COMPILE ERROR: Shape is abstract
```

### 4.5 Text UML of the hierarchy

Abstract members are shown in *italics* in real UML; here we mark them with `«abstract»`
and a trailing `*`.

```
                 ┌───────────────────────────┐
                 │      «abstract» Shape      │
                 ├───────────────────────────┤
                 │ - name : String           │
                 ├───────────────────────────┤
                 │ + getName() : String      │
                 │ + describe() : String     │
                 │ + area() : double   *      │   (* = abstract, no body)
                 └────────────▲──────────────┘
                              │  (generalization / "is-a")
          ┌───────────────────┼────────────────────┐
          │                   │                     │
 ┌────────┴───────┐  ┌────────┴────────┐  ┌─────────┴────────┐
 │     Circle     │  │    Rectangle    │  │     Triangle     │
 ├────────────────┤  ├─────────────────┤  ├──────────────────┤
 │ - radius       │  │ - width         │  │ - base           │
 │                │  │ - height        │  │ - height         │
 ├────────────────┤  ├─────────────────┤  ├──────────────────┤
 │ + area():double│  │ + area():double │  │ + area():double  │
 └────────────────┘  └─────────────────┘  └──────────────────┘
```

The hollow triangle arrow (`▲`) is UML **generalization**: "Circle *is a* Shape".

---

## 5. Worked example (fully solved)

We build the complete `Shape` hierarchy and a client that treats every shape uniformly.

### 5.1 The abstract base

```java
// Shape.java
public abstract class Shape {
    private final String name;

    protected Shape(String name) {
        this.name = name;
    }

    public String getName() {
        return name;
    }

    /** Every concrete shape MUST define how its area is computed. */
    public abstract double area();

    /** Concrete behavior built on top of the abstract step (Template Method). */
    public String describe() {
        return String.format("%s -> area = %.2f", name, area());
    }
}
```

### 5.2 Three concrete subclasses

```java
// Circle.java
public class Circle extends Shape {
    private final double radius;

    public Circle(double radius) {
        super("Circle");
        this.radius = radius;
    }

    @Override
    public double area() {
        return Math.PI * radius * radius;
    }
}
```

```java
// Rectangle.java
public class Rectangle extends Shape {
    private final double width;
    private final double height;

    public Rectangle(double width, double height) {
        super("Rectangle");
        this.width = width;
        this.height = height;
    }

    @Override
    public double area() {
        return width * height;
    }
}
```

```java
// Triangle.java
public class Triangle extends Shape {
    private final double base;
    private final double height;

    public Triangle(double base, double height) {
        super("Triangle");
        this.base = base;
        this.height = height;
    }

    @Override
    public double area() {
        return 0.5 * base * height;
    }
}
```

### 5.3 A polymorphic client

```java
// Main.java
public class Main {
    public static void main(String[] args) {
        // The array is typed by the ABSTRACTION, not by any concrete class.
        Shape[] shapes = {
            new Circle(2.0),
            new Rectangle(3.0, 4.0),
            new Triangle(6.0, 5.0)
        };

        double total = 0.0;
        for (Shape s : shapes) {      // we never ask "what kind of shape is this?"
            System.out.println(s.describe());
            total += s.area();        // the RIGHT area() runs for each object
        }
        System.out.printf("Total area = %.2f%n", total);
    }
}
```

**Expected output:**

```
Circle -> area = 12.57
Rectangle -> area = 12.00
Triangle -> area = 15.00
Total area = 39.57
```

### 5.4 What to notice

1. `Shape` declares `area()` abstract, so `describe()` and `Main` can rely on it existing.
2. `Main` never uses `instanceof` and never switches on a type - the correct `area()` is
   chosen automatically (dynamic dispatch). Adding a new shape does **not** change `Main`.
3. `super("Circle")` shows an abstract class can have a constructor, called by subclasses.

---

## 6. Guided in-class practice

Work in pairs. Start from the worked-example code above.

### Task A - Add a new shape (individual, ~10 min)
Create a `Square` class. Decide honestly: should `Square extends Rectangle`, or
`Square extends Shape`? Write one sentence justifying your choice, then implement it and
add a `Square(4.0)` to the `shapes` array. Confirm the total updates without editing the
loop.

### Task B - Add abstract behavior (pairs, ~10 min)
Add a second abstract method to `Shape`:

```java
public abstract double perimeter();
```

Now the code will not compile until every subclass implements `perimeter()`. Fix each
subclass. This demonstrates the compiler *enforcing* the contract - the whole point of
abstract methods.

### Task C - Use the abstraction in a utility (pairs, ~10 min)
Write a static method that works on *any* shape through the abstraction:

```java
public static Shape largest(Shape[] shapes) {
    Shape biggest = shapes[0];
    for (Shape s : shapes) {
        if (s.area() > biggest.area()) {
            biggest = s;
        }
    }
    return biggest;
}
```

Call it from `main` and print `largest(shapes).describe()`. Discuss: why can this method
accept a `Circle`, a `Triangle`, and a `Square` without any changes?

### Checkpoint questions (discuss with your pair)
1. What happens if you try `new Shape("x")`? Try it and read the compiler error.
2. If you *remove* `area()` from `Rectangle`, what error appears and why?
3. Where does the shared field `name` live - in `Shape` or in each subclass?

---

## 7. Common mistakes to avoid

- **Giving an abstract method a body** (`public abstract double area() { return 0; }`).
  Abstract means *no body*; a body makes it concrete.
- **Forgetting `@Override`.** It is optional but it lets the compiler catch a mistyped
  signature that would otherwise silently create a new, unrelated method.
- **Trying to instantiate the abstract class.** Instantiate a concrete subclass instead.
- **Duplicating shared state in every subclass** instead of lifting it into the abstract
  parent.
- **Making the base method return a fake value** (like `0`) rather than declaring it
  abstract - this hides bugs when a subclass forgets to override.

---

## 8. Wrap-up and exit ticket

### One-paragraph summary
An **abstract class** is an incomplete base type: it can hold shared state and concrete
methods, but it declares **abstract methods** with no body that every concrete subclass
must implement. Because it is incomplete, it **cannot be instantiated**, yet it is a
perfectly good *reference type*, which is what makes polymorphism possible: client code
depends on the abstract type and the correct subclass behavior runs automatically.

### Exit ticket (hand in before leaving - 3 short answers)
1. In one sentence, why can an abstract class not be instantiated?
2. Write the single line of Java that declares an abstract method named `render` that
   returns `void` and takes no parameters.
3. Give one concrete example (not `Shape`) where an abstract class with one abstract
   method would be a good design, and name the abstract method.

### Looking ahead
Session 2 asks: *what if a type only needs to promise behavior and has no shared state
to offer?* That is the job of an **interface** - and we will learn how to combine
interfaces with the abstract classes from today.
