# Week 07 - Session 2

## Polymorphic References and Processing Collections

**Course:** Object-Oriented Programming and Design (2026-B)
**Unit 2:** Design principles and modularity
**Assessment period:** Corte 2 · **RAA:** 90_82759
**Duration:** 2 hours

---

## 1. Session objective

By the end of this session the student will be able to **invoke methods
polymorphically through parent-type references**, **explain how dynamic dispatch
selects the implementation at runtime**, and **implement a routine that processes
a collection of heterogeneous objects polymorphically** — with no type-switch
driving the logic.

This session targets weekly objectives **2, 3, and 4**.

---

## 2. Timed agenda

| Time | Segment | Activity |
|------|---------|----------|
| 0:00-0:10 | Recap | Connect Session 1's overriding to today's dispatch internals (§3). |
| 0:10-0:45 | Theory | Declared vs. actual type; vtables & MRO; static-binding exceptions (§4). |
| 0:45-1:15 | Worked example | `Shape` renderer over a `List<Shape>` (§5). |
| 1:15-1:50 | Guided practice | `PaymentMethod` processor; kill an `instanceof` chain (§6). |
| 1:50-2:00 | Wrap-up | Self-check, exit ticket, optional-activity preview (§7). |

---

## 3. Recap (10 min)

In Session 1 we established:

- **Overriding** replaces an inherited instance method.
- The **actual (runtime) type** of the object — not the **declared type** of the
  reference — decides which override runs.
- `static`, `private`, `final`, fields, and constructors are the exceptions
  (statically bound).

Today's question: *how* does the runtime actually find the right method, and how
do we exploit this to write a single routine that handles many types?

---

## 4. Theory notes (35 min)

### 4.1 Two types for every reference

Every reference expression has **two** types that matter:

```
        Shape s = new Circle();
        ^^^^^     ^^^^^^^^^^^^
   declared type    the object whose
   (compile time)   actual type is Circle
                    (run time)
```

- **Declared type (`Shape`)** — decided by the compiler. It answers *"which
  methods am I even allowed to call?"* You can call `s.area()` only because
  `Shape` declares `area()`. You cannot call `s.radius()` even if the object is a
  `Circle`, because `Shape` has no `radius()`.
- **Actual type (`Circle`)** — known only at run time. It answers *"which
  implementation of a callable, overridable method actually executes?"*

> **The master rule:**
> The **declared type** decides *what you may call* (visibility / compile-time
> checking). The **actual type** decides *which overridden version runs*
> (dynamic dispatch).

### 4.2 Upcasting is what makes polymorphism possible

Assigning a subtype instance to a supertype reference is **upcasting**, and it is
always safe and implicit:

```java
Shape s = new Circle(3.0);   // upcast: a Circle IS-A Shape
```

Now `s` can be passed to *any* code that expects a `Shape`. That code calls
`s.area()` and gets the circle's area — without knowing or caring that it is a
circle. **This is the entire point:** we write code once, against the general
type, and it works for every present and future subtype.

Going the other way — **downcasting** — is explicit and can fail:

```java
Shape s = new Circle(3.0);
Circle c = (Circle) s;       // OK at runtime: s really is a Circle
Rectangle r = (Rectangle) s; // compiles, but throws ClassCastException at runtime
```

Frequent downcasting (usually guarded by `instanceof`) is a **design smell**: it
usually means you should have added a polymorphic method instead (see §6).

### 4.3 How dynamic dispatch works: the vtable

Conceptually, dispatch is a table lookup, not a search.

When a class with virtual (overridable) methods is loaded, the runtime builds a
**virtual method table (vtable)**: an array where slot *k* holds a pointer to the
implementation of the *k*-th method for that class. Every object carries a hidden
pointer to its class's vtable.

```
   Shape vtable                Circle vtable              Rectangle vtable
  +----------------+          +--------------------+     +----------------------+
  | area()  -> Shape| slot 0  | area() -> Circle    |    | area() -> Rectangle  |
  | name()  -> Shape| slot 1  | name() -> Shape*    |    | name() -> Shape*     |
  +----------------+          +--------------------+     +----------------------+
                              (*inherited, not overridden -> points to Shape's)

   Object on heap:  [ vptr | radius=3.0 ]
                       |
                       +--> Circle vtable
```

A call `s.area()` compiles to roughly: *"read the object's vptr, jump to slot 0,
call whatever is there."* Because the object of actual type `Circle` points to
the `Circle` vtable, slot 0 is `Circle.area()`. The declared type `Shape` only
determined *which slot number* (the offset) to use — the object determined *which
table*. This is **O(1)**: one indirection, no type comparisons.

- If a subclass **overrides** a method, its vtable slot points to the new code.
- If it **inherits** unchanged, the slot points to the ancestor's code.
- `static`/`private`/`final` methods are **not** in the virtual dispatch path —
  the compiler emits a direct call, which is why they cannot be overridden.

### 4.4 The same idea in Python: MRO

Python has no vtables but achieves the same result with the **Method Resolution
Order (MRO)** — a linearized list of a class and its ancestors computed by the
**C3 linearization** algorithm. A method call walks the MRO and uses the first
class that defines the attribute.

```python
class Shape:
    def area(self): raise NotImplementedError

class Circle(Shape):
    def __init__(self, r): self.r = r
    def area(self): return 3.14159 * self.r ** 2

c = Circle(3)
print(type(c).__mro__)   # (Circle, Shape, object)
print(c.area())          # 28.27...  -> found in Circle first
```

Python is *dynamically typed*: there is no "declared type" enforced by a
compiler, but the **actual object still decides** which method runs — the same
polymorphic behavior, resolved by MRO instead of a vtable.

### 4.5 Static binding recap (the exceptions)

To predict output correctly, remember what is **NOT** dynamically dispatched:

| Case | Resolved by |
|------|-------------|
| `static` method call | declared type (compile time) — this is *hiding* |
| field access (`obj.field`) | declared type (compile time) |
| `private` method | the class that defines it |
| `final` method | its single implementation |
| overloaded method choice | declared types of the **arguments** (compile time) |

A subtle combined trap:

```java
class A { int x = 1; int get() { return x; } }
class B extends A { int x = 2; int get() { return x; } }

A ref = new B();
System.out.println(ref.x);      // 1  -> field access uses DECLARED type A
System.out.println(ref.get());  // 2  -> method is overridden -> ACTUAL type B
```

Fields are hidden (declared type wins); methods are overridden (actual type
wins). Mixing them is a favorite exam question.

### 4.6 The contract: LSP and OCP made concrete

Polymorphic code trusts that every subtype honors the supertype's promises —
the **Liskov Substitution Principle**. A classic violation:

```java
class Rectangle {
    protected int w, h;
    void setW(int w) { this.w = w; }
    void setH(int h) { this.h = h; }
    int area() { return w * h; }
}
class Square extends Rectangle {   // "a square is-a rectangle"? mathematically yes...
    @Override void setW(int w) { this.w = this.h = w; }  // forces both equal
    @Override void setH(int h) { this.w = this.h = h; }
}
```

Code that reasonably expects `setW(5); setH(4); area() == 20` **breaks** for a
`Square` (it returns 16). The subtype is *not* substitutable, so polymorphic code
becomes unreliable. Lesson: overriding must preserve the *behavioral* contract,
not just the signatures.

When subtypes are well-behaved, you get the **Open-Closed Principle**: the
processing routine (`for (Shape s : shapes) total += s.area();`) is **closed for
modification** yet **open for extension** — new shapes plug in without touching
it.

---

## 5. Worked example (30 min) - A polymorphic shape renderer

**Problem.** Build a drawing report that, given a mixed list of shapes, prints
each shape's description, computes total area, and finds the largest shape —
**without any `instanceof` or type switch**.

### 5.1 The type hierarchy

```java
import java.util.*;

abstract class Shape {
    private final String label;

    protected Shape(String label) { this.label = label; }
    public String label() { return label; }

    public abstract double area();
    public abstract double perimeter();

    /** Uses the two abstract methods polymorphically. */
    public String render() {
        return String.format("%-10s area=%8.2f  perimeter=%8.2f",
                             label, area(), perimeter());
    }
}

class Circle extends Shape {
    private final double r;
    public Circle(double r) { super("Circle"); this.r = r; }
    @Override public double area()      { return Math.PI * r * r; }
    @Override public double perimeter() { return 2 * Math.PI * r; }
}

class Rectangle extends Shape {
    private final double w, h;
    public Rectangle(double w, double h) { super("Rectangle"); this.w = w; this.h = h; }
    @Override public double area()      { return w * h; }
    @Override public double perimeter() { return 2 * (w + h); }
}

class Triangle extends Shape {   // equilateral, side s
    private final double s;
    public Triangle(double s) { super("Triangle"); this.s = s; }
    @Override public double area()      { return (Math.sqrt(3) / 4) * s * s; }
    @Override public double perimeter() { return 3 * s; }
}
```

### 5.2 The polymorphic routine (the heart of the lesson)

```java
public class Drawing {

    /** Processes ANY collection of shapes, uniformly. */
    static void report(List<Shape> shapes) {
        double total = 0;
        Shape largest = null;

        for (Shape s : shapes) {          // s: declared type Shape
            System.out.println(s.render());  // dynamic dispatch per element
            total += s.area();               // dynamic dispatch again

            if (largest == null || s.area() > largest.area()) {
                largest = s;
            }
        }

        System.out.printf("%nTotal area: %.2f%n", total);
        System.out.printf("Largest:    %s (%.2f)%n",
                          largest.label(), largest.area());
    }

    public static void main(String[] args) {
        List<Shape> shapes = List.of(
            new Circle(3),
            new Rectangle(4, 5),
            new Triangle(6),
            new Circle(1.5)
        );
        report(shapes);
    }
}
```

### 5.3 Sample output

```
Circle     area=   28.27  perimeter=   18.85
Rectangle  area=   20.00  perimeter=   18.00
Triangle   area=   15.59  perimeter=   18.00
Circle     area=    7.07  perimeter=    9.42

Total area: 70.93
Largest:    Circle (28.27)
```

### 5.4 Why this is good design

- `report(...)` mentions **only `Shape`**. It never names `Circle`, `Rectangle`,
  or `Triangle`. It cannot go stale.
- Every `s.area()` / `s.render()` is a **vtable dispatch** to the element's
  actual class.
- To support a new `Pentagon`, you write **one class** and add it to the list.
  `report(...)` is untouched — **Open-Closed Principle** in action.
- Compare with the anti-pattern that this replaces:

```java
// ANTI-PATTERN: do NOT do this.
double area(Shape s) {
    if (s instanceof Circle)         return Math.PI * ((Circle) s).r * ((Circle) s).r;
    else if (s instanceof Rectangle) return ((Rectangle) s).w * ((Rectangle) s).h;
    else if (s instanceof Triangle)  return /* ... */ 0;
    throw new IllegalArgumentException("unknown shape");
}
```

Every new shape forces you to **find and edit every such chain** across the
codebase, and forgetting one causes silent bugs. Polymorphism moves the
"which behavior?" decision **into the objects**, where it belongs.

---

## 6. Guided in-class practice (35 min) - Payment processor

Work in pairs. Start from a deliberately bad version and refactor it into
polymorphic code, then process a mixed collection.

### 6.1 The starting point (smelly code)

```java
class Payment {
    String type;    // "CASH", "CARD", "TRANSFER"
    double amount;
    // ... fields for each type mixed together ...
}

// Fee calculation via type-switch - the thing we will eliminate.
double fee(Payment p) {
    if (p.type.equals("CASH"))          return 0;
    else if (p.type.equals("CARD"))     return p.amount * 0.03;   // 3%
    else if (p.type.equals("TRANSFER")) return 1500;              // flat
    throw new IllegalArgumentException("unknown: " + p.type);
}
```

### 6.2 Task A - Design the hierarchy

Create an abstract base and three subclasses:

```java
abstract class PaymentMethod {
    protected final double amount;
    protected PaymentMethod(double amount) { this.amount = amount; }

    public abstract double fee();          // specialized per method
    public double total() { return amount + fee(); }   // reused by all

    public String receipt() {
        return String.format("%-10s amount=%.2f fee=%.2f total=%.2f",
                             getClass().getSimpleName(), amount, fee(), total());
    }
}
```

- `CashPayment` -> `fee()` returns `0`.
- `CardPayment` (extra field: `cardBrand`) -> `fee()` returns `3%` of `amount`.
- `BankTransfer` -> `fee()` returns a flat `1500`.

### 6.3 Task B - Write the polymorphic processor

Implement:

```java
static void checkout(List<PaymentMethod> payments) {
    double grandTotal = 0;
    for (PaymentMethod p : payments) {
        System.out.println(p.receipt());   // dynamic dispatch
        grandTotal += p.total();
    }
    System.out.printf("Grand total (incl. fees): %.2f%n", grandTotal);
}
```

Then in `main`, build a **mixed** list and call `checkout`:

```java
List<PaymentMethod> payments = List.of(
    new CashPayment(50_000),
    new CardPayment(120_000, "VISA"),
    new BankTransfer(200_000),
    new CardPayment(30_000, "MASTERCARD")
);
checkout(payments);
```

### 6.4 Task C - Prove the design is open-closed

Add a **fourth** payment type — `CryptoPayment` with a `fee()` of `1.5%` — and
verify that:

- You **did not modify** `checkout`, `PaymentMethod`, or any existing subclass.
- The new type appears correctly in the report just by adding it to the list.

### 6.5 Expected result (sanity check)

Your output should resemble:

```
CashPayment  amount=50000.00 fee=0.00     total=50000.00
CardPayment  amount=120000.00 fee=3600.00 total=123600.00
BankTransfer amount=200000.00 fee=1500.00 total=201500.00
CardPayment  amount=30000.00 fee=900.00   total=30900.00
Grand total (incl. fees): 406000.00
```

### 6.6 Discussion prompts

- Where did the `if/else` on `type` go? (Into the vtable — each class holds its
  own `fee()`.)
- What would break if `CardPayment.fee()` returned a **negative** number? (LSP:
  it would silently corrupt `total()` for everyone using the base type.)

---

## 7. Wrap-up (10 min)

### 7.1 Key takeaways

- A reference has a **declared type** (what you may call) and an **actual type**
  (which override runs). Dynamic dispatch keys off the **actual type**.
- **Upcasting** enables polymorphism; heavy **downcasting**/`instanceof` is a
  smell that usually should be a polymorphic method.
- Dispatch is a **vtable lookup** (Java/C++) or **MRO walk** (Python) — roughly
  O(1), no type comparisons.
- A polymorphic routine names **only the supertype**, so new subtypes extend the
  system **without modifying** it (Open-Closed), provided subtypes honor the
  contract (Liskov).

### 7.2 Self-check

- [ ] I can explain, for `A ref = new B();`, why `ref.field` and `ref.method()`
  can disagree about which class they come from.
- [ ] I can sketch a vtable and trace a dispatched call through it.
- [ ] I wrote a loop over a `List<Supertype>` that behaves correctly for every
  subtype and needs no edits when a new subtype is added.
- [ ] I can name one LSP violation and explain how it breaks polymorphic code.

### 7.3 Exit ticket (submit before leaving)

1. Predict the output and justify each line:

   ```java
   class A { int id = 1; String tag() { return "A"; } }
   class B extends A { int id = 2; String tag() { return "B"; } }
   A x = new B();
   System.out.println(x.id + " " + x.tag());
   ```

2. In two sentences, explain why replacing an `instanceof` chain with
   polymorphism supports the Open-Closed Principle.
3. Give one situation where a **downcast** is genuinely justified.

*(Answer to Q1: prints `1 B` — field `id` uses the declared type `A`; `tag()` is
overridden, so the actual type `B` wins.)*

### 7.4 Preview of the optional activity

Apply everything to a small **"Media Library"** system: a hierarchy of media
items (`Book`, `Movie`, `Podcast`) processed by a single polymorphic catalog
routine, submitted via **GitHub**. See
[`../optional-activity/README.md`](../optional-activity/README.md).
