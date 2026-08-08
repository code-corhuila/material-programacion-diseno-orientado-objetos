# Week 07 - Session 1

## Method Overriding and the Mechanics of Dynamic Dispatch

**Course:** Object-Oriented Programming and Design (2026-B)
**Unit 2:** Design principles and modularity
**Assessment period:** Corte 2 · **RAA:** 90_82759
**Duration:** 2 hours

---

## 1. Session objective

By the end of this session the student will be able to **override inherited
methods** to specialize subclass behavior — using `@Override`, `super`, and the
`final` brake correctly — and will be able to **distinguish overriding from
overloading and from hiding**, predicting which method runs in each case.

This session targets weekly objectives **1, 3, and 5**.

---

## 2. Timed agenda

| Time | Segment | Activity |
|------|---------|----------|
| 0:00-0:15 | Warm-up | Predict-the-output quiz (see §3). |
| 0:15-0:55 | Theory | Overriding rules; `@Override`; `super`; overriding vs. overloading vs. hiding (§4). |
| 0:55-1:20 | Worked example | `Employee` payroll hierarchy (§5). |
| 1:20-1:50 | Guided practice | `Notification` hierarchy (§6). |
| 1:50-2:00 | Wrap-up | Summary + exit ticket (§7). |

---

## 3. Warm-up (15 min) - Predict the output

Before any theory, read this code and **write down what you think it prints**.
Do not run it yet.

```java
class Animal {
    String speak() { return "..."; }
}

class Dog extends Animal {
    String speak() { return "Woof"; }
}

class Puppy extends Dog {
    String speak() { return "Yip"; }
}

public class WarmUp {
    public static void main(String[] args) {
        Animal a = new Dog();     // declared Animal, actual Dog
        Animal b = new Puppy();   // declared Animal, actual Puppy
        Dog    c = new Puppy();   // declared Dog,    actual Puppy

        System.out.println(a.speak());
        System.out.println(b.speak());
        System.out.println(c.speak());
    }
}
```

Keep your prediction. We revisit it in §4.3 — the answer is `Woof`, `Yip`,
`Yip`. If you predicted the output using the *type on the left of the `=`*, you
will be surprised, and that surprise is exactly what this session fixes.

---

## 4. Theory notes (40 min)

### 4.1 What overriding is (and what it is for)

**Method overriding** happens when a subclass declares an instance method with
**the same signature** (name + parameter types) as a method it inherits, in
order to **replace** the inherited behavior for instances of that subclass.

The purpose is **specialization**: the superclass defines *what* an operation
means in general terms; each subclass refines *how* it is carried out.

```
        Account
        + withdraw(amount)   <-- general rule: balance must not go negative
           ^
           |  extends
        SavingsAccount
        + withdraw(amount)   <-- specialized: also enforce a minimum balance
```

The caller does not need to know which subclass it is holding. It calls
`withdraw(...)` on an `Account` reference and the *right* rule is applied. That
is the seed of polymorphism, which Session 2 develops fully.

### 4.2 The rules of a valid override (Java)

For a subclass method to **override** (not accidentally overload or hide) a
superclass method:

1. **Same name and same parameter list.** Different parameters => it is an
   *overload*, a different method.
2. **Return type** must be the same **or covariant** (a subtype of the original
   return type).
3. **Access modifier** may stay the same or become **more visible**, never less.
   (You cannot override a `public` method as `private`.)
4. **Checked exceptions** thrown may be the same, fewer, or narrower — never
   broader.
5. The method must be an **instance method** and **not `final`, `static`, or
   `private`** in the superclass (those cannot be overridden — see §4.4).

Always annotate overrides with `@Override`. It is not decoration: it makes the
**compiler verify** that you really are overriding something. A typo like
`toStrng()` silently becomes a brand-new method without the annotation; with
`@Override` it becomes a compile error.

```java
class Shape {
    Object clone() { /* ... */ return new Shape(); }
}

class Circle extends Shape {
    @Override
    Circle clone() {           // covariant return: Circle is a Shape - OK
        return new Circle();
    }
}
```

### 4.3 Overriding vs. overloading vs. hiding

These three are constantly confused. The table is the single most important
thing to memorize this session.

| Feature | Overriding | Overloading | Hiding |
|---------|-----------|-------------|--------|
| Same method name? | Yes | Yes | Yes |
| Same parameter list? | **Yes** | **No** (differs) | Yes |
| Applies to | instance methods | any methods | `static` methods / fields |
| Resolved | **at runtime** (dynamic) | at compile time (static) | at compile time (static) |
| Uses actual object type? | **Yes** | No | No (uses declared type) |
| Keyword to verify | `@Override` | — | (none; `@Override` is illegal) |

- **Overriding** = same signature, replaces behavior, chosen by the *actual*
  type at runtime. This is the one that gives polymorphism.
- **Overloading** = same name, *different* parameters. The compiler picks one
  based on the *declared/static* argument types. No runtime magic.
- **Hiding** = a subclass declares a `static` method (or field) with the same
  name as one in the superclass. The superclass member is *hidden*, not
  overridden. Which one you get depends on the **declared type**, decided at
  compile time.

Back to the warm-up (§3): all three variables have overridden **instance**
methods, so the **actual** type wins:

- `a` is actually a `Dog` -> `"Woof"`
- `b` is actually a `Puppy` -> `"Yip"`
- `c` is actually a `Puppy` -> `"Yip"` (the `Dog` reference does not change the
  actual object)

Now contrast with **hiding**:

```java
class Base {
    static String who() { return "Base"; }   // static -> can be hidden, not overridden
}
class Derived extends Base {
    static String who() { return "Derived"; }
}

Base ref = new Derived();
System.out.println(ref.who());   // prints "Base"  <-- declared type wins!
```

Even though the object is a `Derived`, `who()` is `static`, so it is resolved by
the **declared** type `Base`. This is the classic trap. (In good style you
should call `static` methods through the class name, `Base.who()`, precisely to
avoid this confusion.)

### 4.4 What cannot be overridden — and why

Some members are **statically bound**, so dynamic dispatch never applies:

| Member | Why no dynamic dispatch |
|--------|-------------------------|
| `static` methods | Belong to the class, not an instance -> *hidden*, resolved by declared type. |
| `private` methods | Not visible to subclasses -> a same-name subclass method is unrelated. |
| `final` methods | Explicitly sealed against overriding (a design/optimization choice). |
| Fields | Fields are *hidden*, never overridden; access uses the declared type. |
| Constructors | Not inherited; not virtual. (Calling an overridable method *from* a constructor is a known hazard.) |

### 4.5 Extending vs. replacing: `super`

An override can either **fully replace** the parent behavior or **extend** it by
calling `super.method(...)`. Extension is common when the parent already does
something correct and general, and the child only adds to it.

```java
class Logger {
    void log(String msg) {
        System.out.println("[LOG] " + msg);
    }
}

class TimestampLogger extends Logger {
    @Override
    void log(String msg) {
        super.log(java.time.LocalTime.now() + " " + msg);  // reuse + specialize
    }
}
```

### 4.6 Honoring the contract (preview of LSP)

An override must respect the **contract** of the method it replaces: it should
not demand more from callers or promise less than the parent did. An override of
`withdraw` that throws when the amount is *valid* by the parent's rules, or that
silently does nothing, breaks code written against the parent type. We formalize
this as the **Liskov Substitution Principle** in Session 2; for now, the rule of
thumb is: *a subclass should be a drop-in replacement for its parent.*

---

## 5. Worked example (25 min) - Payroll hierarchy

**Problem.** A company pays three kinds of employees differently:

- **Salaried** employees earn a fixed monthly salary.
- **Hourly** employees earn `hours x rate`.
- **Sales** employees earn a base salary plus a commission on their sales.

We want every employee to answer the same question — *"what is your monthly
pay?"* — while each computes it in its own way. This is a textbook case for
overriding.

### 5.1 The base class

```java
abstract class Employee {
    private final String name;
    private final String id;

    protected Employee(String name, String id) {
        this.name = name;
        this.id = id;
    }

    public String getName() { return name; }
    public String getId()   { return id; }

    /** Every employee must be able to state their monthly pay. */
    public abstract double monthlySalary();

    /** A general description that subclasses may extend. */
    public String describe() {
        return String.format("%s (%s): $%.2f/month", name, id, monthlySalary());
    }
}
```

`monthlySalary()` is **abstract**: there is no sensible default, and forcing each
subclass to implement it guarantees the family is complete. Note that
`describe()` already calls `monthlySalary()` polymorphically — even inside the
base class, the call will dispatch to the subclass implementation.

### 5.2 The subclasses (each overrides `monthlySalary`)

```java
class SalariedEmployee extends Employee {
    private final double monthly;

    public SalariedEmployee(String name, String id, double monthly) {
        super(name, id);
        this.monthly = monthly;
    }

    @Override
    public double monthlySalary() {
        return monthly;
    }
}

class HourlyEmployee extends Employee {
    private final double hoursPerMonth;
    private final double rate;

    public HourlyEmployee(String name, String id, double hoursPerMonth, double rate) {
        super(name, id);
        this.hoursPerMonth = hoursPerMonth;
        this.rate = rate;
    }

    @Override
    public double monthlySalary() {
        return hoursPerMonth * rate;
    }
}

class SalesEmployee extends Employee {
    private final double base;
    private final double monthlySales;
    private final double commissionRate;   // e.g. 0.05 = 5%

    public SalesEmployee(String name, String id,
                         double base, double monthlySales, double commissionRate) {
        super(name, id);
        this.base = base;
        this.monthlySales = monthlySales;
        this.commissionRate = commissionRate;
    }

    @Override
    public double monthlySalary() {
        return base + monthlySales * commissionRate;
    }

    @Override
    public String describe() {
        // Extend, don't replace: reuse the base description, add detail.
        return super.describe()
             + String.format("  [base $%.2f + %.0f%% commission]",
                             base, commissionRate * 100);
    }
}
```

### 5.3 Using it

```java
public class Payroll {
    public static void main(String[] args) {
        Employee a = new SalariedEmployee("Ana",  "E01", 4_000_000);
        Employee b = new HourlyEmployee ("Beto", "E02", 160, 25_000);
        Employee c = new SalesEmployee  ("Caro", "E03",
                                         1_500_000, 20_000_000, 0.05);

        // A single call site; three different computations chosen at runtime.
        System.out.println(a.describe());
        System.out.println(b.describe());
        System.out.println(c.describe());
    }
}
```

**Output:**

```
Ana (E01): $4000000.00/month
Beto (E02): $4000000.00/month
Caro (E03): $2500000.00/month  [base $1500000.00 + 5% commission]
```

### 5.4 What just happened (dispatch walk-through)

- Each variable is declared `Employee`, but the **actual** objects differ.
- `a.describe()` runs `Employee.describe()`, which calls `monthlySalary()`.
  Because `a` is *actually* a `SalariedEmployee`, dispatch selects
  `SalariedEmployee.monthlySalary()` -> returns `monthly`.
- `c.describe()` runs the **overridden** `SalesEmployee.describe()`, which calls
  `super.describe()` (base version) and appends commission detail.
- Nowhere did we write `if (employee is salaried) ...`. Each object *knows* its
  own rule. Adding a fourth employee type later requires **no change** to
  `Payroll` — that is the Open-Closed Principle in miniature.

---

## 6. Guided in-class practice (30 min) - Notification hierarchy

Work in pairs. You will build a small hierarchy that specializes behavior
through overriding.

### 6.1 Scenario

An application sends notifications through different channels. Every channel can
`send(String message)` and can produce a short `preview()` string, but each does
it differently.

### 6.2 Starter code

```java
abstract class Notification {
    protected final String recipient;

    protected Notification(String recipient) {
        this.recipient = recipient;
    }

    /** Deliver the message. Each channel does this differently. */
    public abstract void send(String message);

    /** A one-line human-readable preview. Default: generic. Override to specialize. */
    public String preview(String message) {
        return "To " + recipient + ": " + message;
    }
}
```

### 6.3 Tasks

1. Create `EmailNotification` (extra field: `subject`).
   - Override `send` to print:
     `Email to <recipient> | Subject: <subject> | Body: <message>`
   - Override `preview` to include the subject.
2. Create `SmsNotification`.
   - Override `send` to print: `SMS to <recipient>: <message>`
   - Override `send` so that if the message is longer than **160 characters** it
     prints a warning and truncates. (Specialized behavior!)
3. Create `PushNotification` (extra field: `deviceId`).
   - Override `send` to print:
     `Push -> device <deviceId>: <message>`
   - Do **not** override `preview` — verify that the inherited generic preview is
     used (this demonstrates the difference between overriding and inheriting).
4. In `main`, create one of each, store them in
   `Notification[] channels = { ... }`, and loop calling `send` and `preview`.
   (This is a first taste of Session 2's polymorphic collection.)

### 6.4 Checkpoints / expected behavior

- Calling `send` on each element runs the **channel-specific** version (dynamic
  dispatch).
- `PushNotification.preview(...)` prints the **generic** format because it was
  *not* overridden.
- Adding a hypothetical `WhatsAppNotification` later must not require editing any
  existing class or the loop.

### 6.5 Stretch goals (if time allows)

- Add `@Override` to every overriding method and deliberately misspell one
  method name; observe the **compile error** the annotation produces.
- Make `SmsNotification.preview` call `super.preview(message)` and append
  `" (SMS)"`.

---

## 7. Wrap-up and exit ticket (10 min)

### 7.1 Key takeaways

- **Overriding** replaces an inherited *instance* method's behavior; it is
  chosen at **runtime** by the object's **actual** type.
- Use **`@Override`** to let the compiler catch mistakes; use **`super`** to
  extend rather than fully replace behavior.
- **Overloading** (different parameters) and **hiding** (`static`/fields) are
  resolved at **compile time** by the **declared** type — they are *not*
  polymorphism.
- `static`, `private`, `final` methods, fields, and constructors are **statically
  bound**.

### 7.2 Exit ticket (submit before leaving)

Answer briefly on paper / LMS:

1. In one sentence, why does `Base ref = new Derived(); ref.who();` print
   `"Base"` when `who()` is `static`, but would print `"Derived"` if `who()`
   were a normal instance method?
2. Give one concrete example (2-3 lines of code) of a valid **covariant return
   type** in an override.
3. True/False, with a one-line justification: *"Adding a new subclass with an
   overridden method forces me to modify the loop that processes the
   collection."*

### 7.3 Bridge to Session 2

You have seen *that* the actual type decides which method runs. Session 2 opens
the hood: **how** the runtime finds the right method (vtables / MRO), the precise
declared-vs-actual rules, and how to build routines that process whole
collections of mixed types uniformly.
