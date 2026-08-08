# Week 08 - Session 1: Abstract classes and abstract methods

**Subject:** Object-Oriented Programming and Design | **Unit 2** | **Corte 2**
**Duration:** 120 minutes | **Reference language:** Java (JDK 11+)

---

## 1. Session objective

By the end of this session the student will be able to **declare an abstract class with at least one
abstract method, explain why it cannot be instantiated, and implement the abstract method correctly
in one or more concrete subclasses**, producing compiling code and a short justification of when an
abstract class is the right modeling choice.

This maps to Week 08 objectives 1, 2, and 5.

---

## 2. Timed agenda

| Time | Segment | Activity |
|---|---|---|
| 0:00 - 0:15 | Warm-up & recap | Polymorphism recap; the rigidity problem that motivates abstraction. |
| 0:15 - 0:50 | Theory | Abstract classes, abstract methods, shared state, instantiation rule, Template Method idea. |
| 0:50 - 1:15 | Worked example | `Shape` hierarchy with abstract `area()` and `perimeter()`, walked through live. |
| 1:15 - 1:50 | Guided practice | `Employee` payroll hierarchy built together, students at keyboards. |
| 1:50 - 2:00 | Wrap-up | Key takeaways + exit ticket. |

---

## 3. Warm-up and recap (15 min)

### Where we are

In Unit 1 you built individual classes. Earlier in Unit 2 you saw **inheritance** (`extends`) and
**polymorphism** (a `Dog` and a `Cat` both usable as `Animal`, each responding to `makeSound()`
in its own way).

### The problem abstraction solves

Consider a drawing program that manages many shapes. A first attempt might do this:

```java
class Circle    { double radius; }
class Rectangle { double width, height; }

// Somewhere else, to draw everything:
for (Object s : shapes) {
    if (s instanceof Circle)    { /* compute circle area */ }
    else if (s instanceof Rectangle) { /* compute rectangle area */ }
    // ...a new 'else if' for every new shape, forever
}
```

Every time we add a shape (`Triangle`, `Hexagon`, ...) we must **edit** that loop. This is fragile,
error-prone, and violates the Open/Closed Principle (code should be *open for extension* but
*closed for modification*).

**Discussion prompt (2 min, in pairs):** What do all shapes have in common that the program needs?
*(Expected answer: every shape can report an `area()` and a `perimeter()` — but the formula differs.
That "same operation, different formula" is exactly what abstraction captures.)*

---

## 4. Theory notes (35 min)

### 4.1 What is an abstract class?

An **abstract class** is a class that:

- **Cannot be instantiated directly** — you cannot write `new Shape()`.
- **May declare abstract methods** — methods with a signature but *no body*, which subclasses must
  implement.
- **May also contain concrete methods, fields, and constructors** — real, shared, implemented
  behavior and state.

It sits *between* a fully abstract contract (an interface) and a fully concrete class. It says:
"Here is what all my subclasses share, and here are the gaps each subclass must fill in."

In Java you use the `abstract` keyword:

```java
public abstract class Shape {
    // shared state
    private final String name;

    // constructor (yes, abstract classes have constructors —
    // they run when a subclass object is created)
    protected Shape(String name) {
        this.name = name;
    }

    // concrete method: shared behavior, fully implemented here
    public String getName() {
        return name;
    }

    // abstract methods: NO body. Every concrete subclass MUST implement them.
    public abstract double area();
    public abstract double perimeter();

    // a concrete method that DEPENDS on abstract ones (Template Method flavor)
    public String describe() {
        return String.format("%s -> area=%.2f, perimeter=%.2f",
                             name, area(), perimeter());
    }
}
```

### 4.2 Abstract method

An **abstract method** is declared with the `abstract` modifier and terminated by a semicolon instead
of a body:

```java
public abstract double area();   // no { } — the subclass supplies it
```

Rules:

- If a class has **at least one** abstract method, the class **must** be declared `abstract`.
- A subclass that does **not** implement every inherited abstract method must itself be `abstract`.
- The first concrete (non-abstract) subclass in the chain must implement *all* remaining abstract
  methods.

### 4.3 Why can't we instantiate an abstract class?

Because it is **incomplete**. `Shape.area()` has no formula. If Java allowed `new Shape("x")`, then
calling `.area()` would have nothing to run. The compiler forbids it:

```java
Shape s = new Shape("mystery"); // COMPILE ERROR: Shape is abstract; cannot be instantiated
```

But you *can* declare a variable of the abstract type and point it at a concrete subclass — this is
polymorphism in action:

```java
Shape s = new Circle("c1", 2.0); // OK: Circle is concrete and completes the contract
```

### 4.4 Abstract classes hold *shared state and behavior*

This is the key difference from interfaces (Session 2). An abstract class can carry fields
(`name` above), a constructor to initialize them, and fully written helper methods (`getName`,
`describe`). Subclasses inherit all of that for free and only supply what is genuinely different.

### 4.5 The Template Method idea

Notice `describe()`: it is fully implemented in the abstract class, yet it *calls* the abstract
methods `area()` and `perimeter()`. The abstract class fixes the **skeleton** of the algorithm
("print name, then area, then perimeter") and defers the **variable steps** to subclasses. This is
the **Template Method** design pattern — a natural and very common use of abstract classes.

```
        Shape (abstract)
        ├── fields:   name
        ├── concrete: getName(), describe()   <-- skeleton lives here
        └── abstract: area(), perimeter()     <-- filled by subclasses
                 ▲                 ▲
                 │  extends        │  extends
        ┌────────┴──────┐  ┌───────┴─────────┐
        │   Circle      │  │   Rectangle     │
        │  area()=πr²   │  │ area()=w*h      │
        │  perimeter()  │  │ perimeter()     │
        └───────────────┘  └─────────────────┘
```

### 4.6 When to reach for an abstract class

Use an abstract class when **all** of the following tend to be true:

- The subclasses form a genuine **"is-a"** family (a `Circle` *is a* `Shape`).
- They share **state** (fields) and/or **implemented behavior** you don't want to duplicate.
- You want to **guarantee** certain operations exist while providing default machinery around them.

(The full decision rule, including when an interface is better, is completed in Session 2.)

---

## 5. Worked example: the `Shape` hierarchy (25 min)

We now complete and run the `Shape` design. Follow along in your IDE.

### Step 1 - The abstract base (already shown in 4.1)

Keep the `Shape` class from section 4.1.

### Step 2 - Concrete subclass `Circle`

```java
public class Circle extends Shape {
    private final double radius;

    public Circle(String name, double radius) {
        super(name);                 // call the abstract class constructor
        if (radius <= 0) throw new IllegalArgumentException("radius must be positive");
        this.radius = radius;
    }

    @Override
    public double area() {
        return Math.PI * radius * radius;
    }

    @Override
    public double perimeter() {
        return 2 * Math.PI * radius;
    }
}
```

### Step 3 - Concrete subclass `Rectangle`

```java
public class Rectangle extends Shape {
    private final double width;
    private final double height;

    public Rectangle(String name, double width, double height) {
        super(name);
        if (width <= 0 || height <= 0)
            throw new IllegalArgumentException("dimensions must be positive");
        this.width = width;
        this.height = height;
    }

    @Override
    public double area() {
        return width * height;
    }

    @Override
    public double perimeter() {
        return 2 * (width + height);
    }
}
```

### Step 4 - Using the hierarchy polymorphically

```java
import java.util.List;

public class Drawing {
    public static void main(String[] args) {
        // A list of the ABSTRACT type; each element is a concrete subclass.
        List<Shape> shapes = List.of(
            new Circle("C1", 2.0),
            new Rectangle("R1", 3.0, 4.0),
            new Circle("C2", 1.5)
        );

        double totalArea = 0;
        for (Shape s : shapes) {
            // No 'instanceof', no 'if' ladder. Each object knows its own area().
            System.out.println(s.describe());
            totalArea += s.area();
        }
        System.out.printf("Total area = %.2f%n", totalArea);
    }
}
```

**Expected output:**

```
C1 -> area=12.57, perimeter=12.57
R1 -> area=12.00, perimeter=14.00
C2 -> area=7.07, perimeter=9.42
Total area = 31.63
```

### Why this is better

To add a `Triangle`, you write **one new class** that extends `Shape` and implements `area()` and
`perimeter()`. **You touch no existing code** — not `Shape`, not `Drawing`. That is the Open/Closed
Principle delivered by abstraction. The compiler even *enforces* that your new shape provides `area()`
and `perimeter()`; you cannot forget.

---

## 6. Guided in-class practice (35 min)

**Scenario:** A company needs a payroll module. Every employee has a name and an ID, and every
employee can report their **monthly pay** — but the pay is computed differently per employee type.

- **Salaried employee:** fixed monthly salary.
- **Hourly employee:** hourly rate x hours worked this month.
- **Commissioned employee:** base salary + commission rate x sales this month.

### Your task (build it together, step by step)

1. Create an **abstract class** `Employee` with:
   - `protected` fields `name` and `id` (shared state),
   - a constructor initializing them,
   - a **concrete** method `getName()`,
   - an **abstract** method `double monthlyPay()`,
   - a **concrete** method `String payslip()` that returns `name + " (" + id + "): $" + monthlyPay()`
     — a Template Method that reuses the abstract operation.

2. Create three **concrete** subclasses that each implement `monthlyPay()`:
   - `SalariedEmployee(name, id, monthlySalary)`
   - `HourlyEmployee(name, id, hourlyRate, hoursWorked)`
   - `CommissionedEmployee(name, id, baseSalary, commissionRate, sales)`

3. In a `Payroll` class, build a `List<Employee>`, print every payslip, and compute the total payroll
   cost using a single loop over the abstract type.

### Reference solution (reveal after students attempt it)

```java
public abstract class Employee {
    protected final String name;
    protected final String id;

    protected Employee(String name, String id) {
        this.name = name;
        this.id = id;
    }

    public String getName() { return name; }

    public abstract double monthlyPay();          // the gap subclasses fill

    public String payslip() {                      // shared skeleton
        return String.format("%s (%s): $%.2f", name, id, monthlyPay());
    }
}

public class SalariedEmployee extends Employee {
    private final double monthlySalary;
    public SalariedEmployee(String name, String id, double monthlySalary) {
        super(name, id);
        this.monthlySalary = monthlySalary;
    }
    @Override public double monthlyPay() { return monthlySalary; }
}

public class HourlyEmployee extends Employee {
    private final double hourlyRate;
    private final double hoursWorked;
    public HourlyEmployee(String name, String id, double hourlyRate, double hoursWorked) {
        super(name, id);
        this.hourlyRate = hourlyRate;
        this.hoursWorked = hoursWorked;
    }
    @Override public double monthlyPay() { return hourlyRate * hoursWorked; }
}

public class CommissionedEmployee extends Employee {
    private final double baseSalary;
    private final double commissionRate;
    private final double sales;
    public CommissionedEmployee(String name, String id, double baseSalary,
                                double commissionRate, double sales) {
        super(name, id);
        this.baseSalary = baseSalary;
        this.commissionRate = commissionRate;
        this.sales = sales;
    }
    @Override public double monthlyPay() { return baseSalary + commissionRate * sales; }
}

import java.util.List;
public class Payroll {
    public static void main(String[] args) {
        List<Employee> staff = List.of(
            new SalariedEmployee("Ana",  "E01", 3_500_000),
            new HourlyEmployee  ("Beto", "E02", 25_000, 160),
            new CommissionedEmployee("Cris", "E03", 1_000_000, 0.05, 40_000_000)
        );
        double total = 0;
        for (Employee e : staff) {
            System.out.println(e.payslip());
            total += e.monthlyPay();
        }
        System.out.printf("Total payroll = $%.2f%n", total);
    }
}
```

### Extension challenges (for fast finishers)

- Add a `BonusEmployee` (salary + fixed year-end bonus averaged monthly) **without editing any
  existing class**. Confirm `Payroll` still works untouched — this *is* the Open/Closed Principle.
- Try to write `new Employee("x", "y")`. Read the compiler error and explain it in one sentence.
- Add validation in the constructors (negative pay throws `IllegalArgumentException`).

---

## 7. Wrap-up and exit ticket (10 min)

### Key takeaways

- An **abstract class** models an incomplete "is-a" family: shared state and behavior plus gaps
  (**abstract methods**) that subclasses must fill.
- It **cannot be instantiated**, but it can be a variable/parameter type used polymorphically.
- Concrete methods can call abstract ones — the **Template Method** pattern.
- Abstraction lets you **add subtypes without modifying existing code** (Open/Closed Principle).

### Exit ticket (submit before leaving — 1-2 sentences each)

1. In your own words, why can't an abstract class be instantiated?
2. Give one real-world example (not `Shape` or `Employee`) that fits an abstract class, and name one
   field and one abstract method it would have.
3. What compiler error do you get if a concrete subclass forgets to implement an inherited abstract
   method? Why is that a *good* thing?

### Looking ahead to Session 2

Abstract classes force a single-inheritance "is-a" line. But what if a class needs to advertise
several unrelated capabilities — e.g., something that can be *saved*, *printed*, **and** *compared*?
For that we need **interfaces**. Bring your `Employee` solution; we will make employees `Payable`
and `Comparable` next session.
