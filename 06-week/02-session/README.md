# Week 06 - Session 2

## Reusing behavior with `super.method()`, overriding, and the limits of inheritance

**Course:** Object-Oriented Programming and Design | **Unit 2** - Design principles and modularity
**Duration:** ~2 hours | **Assessment period:** Corte 2

---

## 1. Session objective

By the end of this session the student will be able to **override** a parent method to specialize behavior, **reuse the parent's implementation** with `super.method()` instead of copying it, choose the right **access modifier** for members shared with subclasses, and **explain why Java uses single inheritance** and where inheritance stops being the right tool.

---

## 2. Timed agenda

| Time | Activity |
|---|---|
| 0:00 - 0:10 | Warm-up: recall the constructor chain |
| 0:10 - 0:35 | Theory: method overriding and `@Override` |
| 0:35 - 0:55 | Theory: reusing behavior with `super.method()` |
| 0:55 - 1:10 | Theory: access modifiers across a hierarchy |
| 1:10 - 1:30 | Theory: single vs. multiple inheritance, limits |
| 1:30 - 1:55 | Worked example + guided practice |
| 1:55 - 2:00 | Wrap-up, exit ticket, forum launch |

---

## 3. Warm-up (10 min) - Recall the chain

Without running it, predict the output:

```java
class A {
    A() { System.out.println("A built"); }
}
class B extends A {
    B() { System.out.println("B built"); }
}
class C extends B {
    C() { System.out.println("C built"); }
}
// new C();
```

**Answer:**
```
A built
B built
C built
```

The implicit `super()` in each constructor walks **up** to `A` first; construction then completes **downward**. This is the mental model we build on today.

---

## 4. Theory notes

### 4.1 Method overriding

**Overriding** means redefining, in a subclass, a method that already exists in the superclass, using the **same signature** (same name, same parameter list). The subclass version *replaces* the parent version for objects of the subclass. This is how we **specialize behavior**.

```java
class Animal {
    void makeSound() { System.out.println("Some generic sound"); }
}

class Dog extends Animal {
    @Override
    void makeSound() { System.out.println("Woof!"); } // specialized
}
```

Calling `makeSound()` on a `Dog` prints `Woof!`; the parent's generic version is overridden.

**Overriding vs. overloading (do not confuse them):**

| | Overriding | Overloading |
|---|---|---|
| Where | Across parent/child | Within one class (or inherited) |
| Signature | **Same** signature | **Different** parameter list |
| Purpose | Specialize inherited behavior | Offer method variants |

### 4.2 The `@Override` annotation

Placing `@Override` above a method tells the compiler: "I intend this to override a superclass method - verify it." If you misspell the name or get the parameters wrong, you get a **compile error** instead of a silent bug where you accidentally created a brand-new method.

```java
class Dog extends Animal {
    @Override
    void makeSuond() { ... } // COMPILE ERROR: nothing to override -> typo caught
}
```

**Always use `@Override`** when you mean to override. It is free insurance against a whole class of bugs.

### 4.3 Reusing parent behavior with `super.method()`

Overriding does not have to mean *throwing away* the parent's work. Often you want to **extend** it: do what the parent does, **plus** something extra. `super.method()` calls the parent's version from inside the override.

```java
class Employee {
    protected String name;
    protected double baseSalary;

    Employee(String name, double baseSalary) {
        this.name = name;
        this.baseSalary = baseSalary;
    }

    double calculateSalary() {
        return baseSalary;
    }

    void printPayslip() {
        System.out.println(name + " earns " + calculateSalary());
    }
}

class Manager extends Employee {
    private double bonus;

    Manager(String name, double baseSalary, double bonus) {
        super(name, baseSalary);
        this.bonus = bonus;
    }

    @Override
    double calculateSalary() {
        return super.calculateSalary() + bonus; // reuse parent, then add bonus
    }
}
```

`Manager.calculateSalary()` does **not** re-implement the base-salary logic; it calls `super.calculateSalary()` and adds the bonus. If the base-salary rule ever changes, it changes in **one** place - the parent.

> **`super.method()` vs. `super(...)`.** `super(...)` (with parentheses right after `super`) is a **constructor** call, allowed only as the first line of a constructor. `super.method(...)` is a **method** call, allowed anywhere in the subclass, to reach the parent's version of a member.

### 4.4 Access modifiers across a hierarchy

Choosing the right visibility is a design decision, not an afterthought.

| Modifier | Same class | Same package | Subclass (any package) | World |
|---|:---:|:---:|:---:|:---:|
| `private` | yes | no | no | no |
| *(package-private)* | yes | yes | no | no |
| `protected` | yes | yes | yes | no |
| `public` | yes | yes | yes | yes |

- Use **`private`** by default; expose through methods. Encapsulation still wins.
- Use **`protected`** for a field or helper method that subclasses genuinely need to reuse or override - like `baseSalary` above.
- Avoid making everything `public` just to make inheritance "easier"; that leaks internal detail and increases coupling.

### 4.5 Single inheritance and the diamond problem

Java allows a class to `extends` **exactly one** direct superclass - **single inheritance**. Some languages (like C++) allow a class to inherit from several classes at once - **multiple inheritance** - which creates the **diamond problem**:

```
        A               If B and C both override greet(),
      /   \             and D inherits from BOTH B and C,
     B     C            which greet() does D get?
      \   /             --> ambiguous. This is the diamond problem.
        D
```

If `D` inherited from both `B` and `C`, and both redefined a member from `A`, the compiler could not decide which version `D` should use, and there could even be two copies of `A`'s state. To avoid this ambiguity and keep the object model simple, **Java forbids multiple inheritance of classes.**

Java still lets a type conform to **many contracts** through **interfaces** (a class can `implements` several interfaces). Interfaces carry no conflicting instance state, so they sidestep the diamond problem. We study interfaces in a later week; for now, remember: **one superclass, many possible interfaces.**

### 4.6 The limits of inheritance

Inheritance is powerful but easily misused. Know its limits:

1. **Tight coupling.** A subclass depends on its superclass's internal behavior; a change upstream can break it - the **fragile base class** problem.
2. **"is-a" misuse.** Extending a class only to reuse a couple of methods, when the relationship is not truly "is-a", produces confusing hierarchies (e.g., `Stack extends Vector` is a classic mistake).
3. **Deep hierarchies are hard to follow.** Behavior scattered across five levels is difficult to reason about and test.
4. **Composition is often better.** "Favor composition over inheritance": when the relationship is "has-a" or when you need flexibility, hold a collaborator as a field instead of extending it.

> **Design heuristic.** Reach for inheritance when there is a genuine, stable "is-a" relationship and real shared behavior. When in doubt, prefer composition.

---

## 5. Worked example (fully solved) - `Employee` -> `Manager`

**Problem.** A company pays every employee a base salary. Managers earn their base salary **plus** a bonus. The payslip format must be identical for everyone and must not be duplicated. When we print a manager's payslip, it must show the *total* (base + bonus).

**Solution.**

```java
public class Employee {
    protected String name;
    protected double baseSalary;

    public Employee(String name, double baseSalary) {
        this.name = name;
        this.baseSalary = baseSalary;
    }

    public double calculateSalary() {
        return baseSalary;
    }

    public void printPayslip() {
        System.out.printf("%s -> total pay: %.2f%n", name, calculateSalary());
    }
}

public class Manager extends Employee {
    private double bonus;

    public Manager(String name, double baseSalary, double bonus) {
        super(name, baseSalary);   // reuse parent construction
        this.bonus = bonus;
    }

    @Override
    public double calculateSalary() {
        return super.calculateSalary() + bonus; // reuse parent logic, then specialize
    }
}

public class Company {
    public static void main(String[] args) {
        Employee e = new Employee("Carlos", 2_000_000);
        Manager  m = new Manager("Diana", 2_000_000, 800_000);

        e.printPayslip();
        m.printPayslip();
    }
}
```

**Expected output:**

```
Carlos -> total pay: 2000000.00
Diana -> total pay: 2800000.00
```

**Why this is good design:**
- `printPayslip()` is written **once** in `Employee` and reused by `Manager`.
- When `printPayslip()` calls `calculateSalary()`, the **manager's overridden version** runs (dynamic dispatch), so Diana's payslip shows `2,800,000` - base plus bonus - even though the print logic lives in the parent.
- `Manager` reused, rather than copied, the base-salary rule via `super.calculateSalary()`.

---

## 6. Guided in-class practice (25 min) - Remove duplication from shapes

Work in pairs. You are given duplicated code; refactor it into a clean hierarchy.

**Starter (do NOT keep this - it duplicates code):**

```java
class Circle {
    double radius;
    String color;
    void describe() { System.out.println("A " + color + " shape"); }
    double area() { return Math.PI * radius * radius; }
}

class Rectangle {
    double width, height;
    String color;
    void describe() { System.out.println("A " + color + " shape"); }
    double area() { return width * height; }
}
```

**Your tasks:**

1. Create a parent `Shape` that owns `color` and the shared `describe()`, plus a method `double area()` returning `0` by default.
2. Make `Circle extends Shape` and `Rectangle extends Shape`. Each **overrides** `area()` with `@Override`.
3. Each subclass constructor uses `super(color)` to set the inherited `color`.
4. In `describe()` of each subclass, reuse the parent message with `super.describe()` and then add the area, e.g. `"...with area 78.54"`.
5. In `main`, create one `Circle` and one `Rectangle` and call `describe()` on both.

**Checkpoints (instructor verifies):**
- [ ] `color` and the base `describe()` message exist **only** in `Shape`.
- [ ] Both subclasses use `@Override` on `area()`.
- [ ] Both subclass constructors start with `super(color)`.
- [ ] The subclass `describe()` calls `super.describe()` instead of retyping the message.

**Reference solution (reveal after attempting):**

```java
public class Shape {
    protected String color;

    public Shape(String color) { this.color = color; }

    public double area() { return 0.0; }

    public void describe() { System.out.println("A " + color + " shape"); }
}

public class Circle extends Shape {
    private double radius;

    public Circle(String color, double radius) {
        super(color);
        this.radius = radius;
    }

    @Override
    public double area() { return Math.PI * radius * radius; }

    @Override
    public void describe() {
        super.describe(); // reuse parent message
        System.out.printf("...with area %.2f%n", area());
    }
}

public class Rectangle extends Shape {
    private double width, height;

    public Rectangle(String color, double width, double height) {
        super(color);
        this.width = width;
        this.height = height;
    }

    @Override
    public double area() { return width * height; }

    @Override
    public void describe() {
        super.describe();
        System.out.printf("...with area %.2f%n", area());
    }

    public static void main(String[] args) {
        Shape c = new Circle("red", 5);
        Shape r = new Rectangle("blue", 4, 3);
        c.describe();
        r.describe();
    }
}
```

**Expected output:**

```
A red shape
...with area 78.54
A blue shape
...with area 12.00
```

---

## 7. Wrap-up, exit ticket, and forum launch

**Summary.** Overriding specializes inherited behavior; `@Override` catches mistakes; `super.method()` reuses the parent's implementation instead of copying it; `protected` shares members with subclasses without going fully public; Java uses single inheritance to avoid the diamond problem, and offers interfaces for multiple *types*; inheritance has real limits, and composition is often the better choice.

**Exit ticket (5 min).** Answer briefly:

1. What does `@Override` protect you from?
2. Inside `Manager.calculateSalary()`, what is the difference between calling `calculateSalary()` and `super.calculateSalary()`? (Hint: one recurses infinitely.)
3. Give one situation where you would choose composition over inheritance.

> Expected: (1) accidentally *not* overriding (typos / wrong signature). (2) `calculateSalary()` calls the manager's own version - infinite recursion; `super.calculateSalary()` calls the `Employee` version. (3) open, e.g. a `Car` that *has* an `Engine`.

### Forum launch (graded discussion - objective 5)

Post a substantive reply (150-250 words) to the Week 06 forum thread:

> **Prompt:** "Which concrete problems does inheritance solve, and where are its limits? Describe one scenario where inheritance clearly helped you avoid duplication, and one scenario where inheritance would be the *wrong* tool (and what you would use instead)."

Requirements: cite at least one concrete example (from class or your own code), name at least one limit of inheritance (fragile base class, tight coupling, or "is-a" misuse), and reply thoughtfully to **one** classmate before the end of the week.
