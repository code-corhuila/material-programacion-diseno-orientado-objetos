# Week 07 - Session 2

## Polymorphic Processing of Collections, Overriding vs. Overloading, and Design Pitfalls

**Unit 2 - Design principles and modularity | Corte 2 | RAA 90_82759**

---

## 1. Session objective

By the end of this session the student will be able to **implement a routine that
processes a collection of objects polymorphically** through a common supertype,
**distinguish overriding from overloading and from hiding**, and **recognize and avoid the
most common overriding pitfalls**.

---

## 2. Timed agenda (110 minutes)

| Time | Activity |
|------|----------|
| 0:00 - 0:10 | Recap of Session 1; quick re-check of the exit-ticket answer. |
| 0:10 - 0:30 | Theory block 1: polymorphic processing of collections. |
| 0:30 - 0:50 | Theory block 2: overriding vs. overloading vs. hiding. |
| 0:50 - 1:05 | Theory block 3: overriding pitfalls and good practice. |
| 1:05 - 1:30 | Worked example: a `Shape` renderer over a `List<Shape>`. |
| 1:30 - 1:50 | Guided practice: refactor an `instanceof` ladder into polymorphic code. |
| 1:50 - 1:55 | Wrap-up and exit ticket. |

---

## 3. Theory notes

### 3.1 Polymorphic processing of collections

The everyday payoff of dynamic dispatch: hold a collection typed by the **supertype**, and
call an overridden method on each element. The runtime dispatches every call to the right
subclass automatically.

```java
List<Shape> shapes = List.of(new Circle(2), new Rectangle(3, 4), new Triangle(6, 2));

double totalArea = 0;
for (Shape s : shapes) {      // s is a Shape (static type)
    totalArea += s.area();    // dispatched to Circle/Rectangle/Triangle.area()
}
```

One loop, three (or three hundred) behaviors. The loop expresses the *policy* ("sum the
areas"); each class supplies the *mechanism* ("here is how I compute my area"). This is the
canonical shape of polymorphic code:

```
for each element typed as SUPERTYPE:
    element.overriddenMethod()   // runtime picks the right body
```

The same pattern powers rendering pipelines, report generators, event handlers, plugin
systems, and the *Strategy* / *Visitor* / *Composite* patterns you will study later.

#### The mental contrast

```
TYPE-LADDER STYLE                    POLYMORPHIC STYLE
(one method knows all types)         (each type knows itself)

double area(Shape s) {               for (Shape s : shapes)
  if (s instanceof Circle) ...          total += s.area();
  else if (s instanceof Rect) ...
  else if (s instanceof Tri) ...     // add a new Shape subclass:
}                                     //  -> loop unchanged
// add a new shape:                   //  -> ladder untouched
//  -> must edit this method
//  -> and every similar ladder
```

### 3.2 Overriding vs. overloading vs. hiding

These three are constantly confused. Only **overriding** is polymorphic.

| Feature | Overriding | Overloading | Hiding |
|---------|-----------|-------------|--------|
| What varies | Same signature, different class (subclass) | Same name, **different parameters**, same scope | `static` methods / fields with same name in subclass |
| Resolved | **Run time** (dynamic type) | **Compile time** (static types of arguments) | **Compile time** (static type of reference) |
| Polymorphic? | **Yes** | No | No |
| Keyword hint | `@Override` | none | none (accidental!) |

#### Overloading (compile-time, by argument types)

```java
class Printer {
    void print(int i)    { System.out.println("int: " + i); }
    void print(String s) { System.out.println("str: " + s); }
    void print(double d) { System.out.println("dbl: " + d); }
}
```

The compiler picks the method from the **static types of the arguments**. No object's
run-time type is involved. `print(5)` binds to `print(int)` forever, decided when you
compile.

#### Hiding — the trap (no polymorphism)

```java
class Base {
    static String who() { return "Base"; }   // static
    String name = "base-field";               // field
}
class Sub extends Base {
    static String who() { return "Sub"; }     // HIDES, does not override
    String name = "sub-field";                // HIDES the field
}

Base b = new Sub();
System.out.println(b.who());   // "Base"  <- resolved by STATIC type, not dispatched
System.out.println(b.name);    // "base-field" <- fields are NEVER dispatched
System.out.println(((Sub) b).who());  // "Sub" <- different static type -> different pick
```

> **Takeaway:** Only **non-static, non-final, non-private instance methods** participate in
> dynamic dispatch. Fields and `static` methods are bound to the *declared* type. If you
> ever see behavior "not overriding," check for `static`, a field, or a signature mismatch.

### 3.3 Overriding pitfalls and good practice

1. **Silent non-override (signature typo).** Forgetting `@Override` and mistyping the name
   or parameters creates a new method that dispatch never calls. **Fix:** always annotate.

2. **Calling an overridable method from a constructor.** When a superclass constructor runs,
   the subclass part is not initialized yet, but dispatch still calls the *subclass* override
   — which may read `null`/`0` fields.

   ```java
   class Base {
       Base() { init(); }              // calls overridable method during construction
       void init() { }
   }
   class Sub extends Base {
       private String value = "ready";
       @Override void init() {
           System.out.println(value);  // prints null! field not yet assigned
       }
   }
   ```
   **Fix:** don't call overridable methods from constructors; make such methods `final` or
   `private`, or use a factory/`init()` called after construction.

3. **Breaking the Liskov Substitution Principle.** An override that strengthens
   preconditions or weakens postconditions (e.g., throws where the parent promised not to,
   or returns invalid results) makes the subtype an unsafe substitute. **Fix:** honor the
   parent's contract.

4. **Inconsistent `equals`/`hashCode`.** Overriding `equals` without `hashCode` (or vice
   versa) breaks hash-based collections. **Fix:** override both together and keep them
   consistent.

5. **Narrowing access or broadening checked exceptions.** The compiler forbids this, but the
   intent (making a subtype *less* capable) usually signals a design smell.

6. **Overusing inheritance where composition fits.** If you only want to reuse code, not to
   be substitutable, prefer composition. Override to *specialize a type*, not merely to
   borrow methods.

---

## 4. Worked example: a `Shape` renderer over a collection

**Goal:** compute and render a mixed list of shapes with a single polymorphic routine, and
add a new shape without touching that routine.

### 4.1 The hierarchy

```java
abstract class Shape {
    abstract double area();          // no default: every shape must define it
    abstract double perimeter();

    // Template method using the two abstract hooks polymorphically.
    String summary() {
        return String.format("%-10s area=%7.2f perimeter=%7.2f",
                getClass().getSimpleName(), area(), perimeter());
    }
}

class Circle extends Shape {
    private final double r;
    Circle(double r) { this.r = r; }
    @Override double area()      { return Math.PI * r * r; }
    @Override double perimeter() { return 2 * Math.PI * r; }
}

class Rectangle extends Shape {
    private final double w, h;
    Rectangle(double w, double h) { this.w = w; this.h = h; }
    @Override double area()      { return w * h; }
    @Override double perimeter() { return 2 * (w + h); }
}

class Triangle extends Shape {       // right triangle with legs a, b
    private final double a, b;
    Triangle(double a, double b) { this.a = a; this.b = b; }
    @Override double area()      { return 0.5 * a * b; }
    @Override double perimeter() { return a + b + Math.hypot(a, b); }
}
```

### 4.2 The polymorphic routine

```java
import java.util.List;

public class ShapeReport {

    // Processes ANY collection of Shapes uniformly. Knows nothing about subtypes.
    static double totalArea(List<Shape> shapes) {
        double sum = 0;
        for (Shape s : shapes) {     // dispatch on each element
            sum += s.area();
        }
        return sum;
    }

    static void printReport(List<Shape> shapes) {
        for (Shape s : shapes) {
            System.out.println(s.summary());
        }
        System.out.printf("TOTAL AREA = %.2f%n", totalArea(shapes));
    }

    public static void main(String[] args) {
        List<Shape> shapes = List.of(
            new Circle(2),
            new Rectangle(3, 4),
            new Triangle(6, 2)
        );
        printReport(shapes);
    }
}
```

**Output**

```
Circle     area=  12.57 perimeter=  12.57
Rectangle  area=  12.00 perimeter=  14.00
Triangle   area=   6.00 perimeter=  14.32
TOTAL AREA = 30.57
```

### 4.3 Proving Open/Closed

Add a new shape — **no change** to `totalArea`, `printReport`, or `Shape`:

```java
class Square extends Shape {
    private final double side;
    Square(double side) { this.side = side; }
    @Override double area()      { return side * side; }
    @Override double perimeter() { return 4 * side; }
}
// Just add `new Square(5)` to the list. Everything else works unchanged.
```

That is the entire promise of polymorphism made concrete: **new behavior arrives as a new
class, not as edits to existing, tested code.**

---

## 5. Guided in-class practice: refactor an `instanceof` ladder

Work in pairs. **Estimated 20 minutes.**

**Starting code (the smell).** A payroll routine computes monthly pay for a mixed staff
using a type ladder:

```java
class Employee {
    String name;
    double baseSalary;
    Employee(String name, double baseSalary) { this.name = name; this.baseSalary = baseSalary; }
}
class Manager  extends Employee { double bonus;      Manager(String n, double s, double b)  { super(n, s); bonus = b; } }
class Salesperson extends Employee { double commission; Salesperson(String n, double s, double c) { super(n, s); commission = c; } }
class Contractor extends Employee { int hours; double rate; Contractor(String n, int h, double r) { super(n, 0); hours = h; rate = r; } }

class Payroll {
    // SMELL: must be edited every time a new employee type is introduced.
    static double monthlyPay(Employee e) {
        if (e instanceof Manager m)       return e.baseSalary + m.bonus;
        if (e instanceof Salesperson s)   return e.baseSalary + s.commission;
        if (e instanceof Contractor c)    return c.hours * c.rate;
        return e.baseSalary;
    }
}
```

### Your task

1. Add an **overridable** method `double monthlyPay()` to `Employee` with a sensible default
   (`return baseSalary;`).
2. **Override** it in `Manager`, `Salesperson`, and `Contractor`, each moving its own formula
   from the ladder into the class. Use `@Override`.
3. Delete `Payroll.monthlyPay(Employee)` and replace all callers with `e.monthlyPay()`.
4. Write a routine `double totalPayroll(List<Employee> staff)` that sums `monthlyPay()` over
   the list in **one loop with no `instanceof`**.
5. Add a new type `Intern extends Employee` (fixed stipend) and confirm `totalPayroll` needs
   **zero changes**.

### Checkpoints (self-verify)

- [ ] No `instanceof` or `switch` on type remains anywhere.
- [ ] Each pay formula lives in exactly one class.
- [ ] `totalPayroll` compiled and ran unchanged after adding `Intern`.
- [ ] Every override carries `@Override` and the code still compiles (proving the signatures match).

### Discussion prompt

Which SOLID principles did this refactor improve, and how? (Expected: Open/Closed — extend
by adding classes; Single Responsibility — each class owns its own pay rule; and it removes
the shotgun-surgery risk of scattered ladders.)

---

## 6. Wrap-up and exit ticket

### Summary

- Polymorphic processing = hold the **supertype**, call an **overridden** method, let
  dispatch do the routing. One loop, many behaviors.
- **Overriding** (run time) is polymorphic; **overloading** (compile time, by args) and
  **hiding** (`static`/fields, by static type) are not.
- Avoid the classic pitfalls: silent non-overrides, calling overridable methods in
  constructors, breaking substitutability, and inconsistent `equals`/`hashCode`.
- Replacing `instanceof` ladders with polymorphism advances Open/Closed and Single
  Responsibility.

### Exit ticket (hand in before leaving — 5 minutes)

1. **Refactor snippet.** Rewrite the following so the type test disappears; write only the
   changed/added code (the new method(s) and the new loop body):

   ```java
   double sound(Animal a) {
       if (a instanceof Dog)  return 1;   // barks
       if (a instanceof Cat)  return 2;   // meows
       return 0;
   }
   ```

2. **One-liner.** State one concrete reason the polymorphic version is easier to maintain
   than the `instanceof` version.

*(Answer key for the instructor: add an overridable `int sound()` to `Animal` returning `0`,
override it in `Dog` (`return 1;`) and `Cat` (`return 2;`), then call `a.sound()`. Maintenance
reason: a new animal is a new class with its own override — no existing method must be edited,
so there is no risk of forgetting a branch.)*
