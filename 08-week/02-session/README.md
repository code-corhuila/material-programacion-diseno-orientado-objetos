# Week 08 - Session 2: Interfaces and Combining Abstractions

**Course:** Object-Oriented Programming and Design (2026-B)
**Unit 2:** Design principles and modularity
**Session focus:** Interfaces as contracts; choosing between abstract classes and
interfaces; combining both in one hierarchy
**Reference language:** Java

---

## 1. Session objective

By the end of this session the student will be able to **design an interface that
specifies a contract decoupled from implementation, provide two independent
implementations of it, choose correctly between an abstract class and an interface for a
given scenario, and model a hierarchy that combines an abstract class, an interface, and
concrete classes**.

---

## 2. Timed agenda (110 minutes)

| Time | Segment | Activity |
|---|---|---|
| 0:00 - 0:10 | Warm-up | Recap Session 1; the "capability" question. |
| 0:10 - 0:40 | Theory | Interfaces, contracts, default/static methods, multiple implementation. |
| 0:40 - 0:55 | Decision framework | Abstract class vs. interface comparison and rules of thumb. |
| 0:55 - 1:20 | Worked example | `Payable` interface + notification services with two implementations. |
| 1:20 - 1:40 | Mini-workshop | Combined hierarchy: interface + abstract class + concrete classes. |
| 1:40 - 1:50 | Wrap-up | Summary, common mistakes, exit ticket. |

---

## 3. Warm-up (framing question)

> Session 1 gave us the `Shape` hierarchy: every shape *is a* Shape and shares the field
> `name`. But consider "can be saved to disk", "can be compared for sorting", or "can be
> drawn on screen". These are **capabilities** that unrelated classes might share -
> a `Document`, an `Invoice`, and a `Photo` could all be "savable" without being the same
> kind of thing. **How do we model a shared capability across classes that do not belong
> to the same family?**

That is precisely what an **interface** is for.

---

## 4. Theory notes

### 4.1 The interface: a pure contract

An **interface** declares *what* operations a type offers, with no instance state and
(classically) no implementation. It is a **contract**: any class that `implements` the
interface promises to provide the declared operations.

```java
public interface Drawable {
    void draw();                 // implicitly public and abstract
}
```

A class fulfils (or *realizes*) the contract with `implements`:

```java
public class Circle extends Shape implements Drawable {
    // ... inherited Shape members ...
    @Override
    public void draw() {
        System.out.println("Drawing a circle");
    }
}
```

Key facts about interfaces in modern Java:

- All method declarations are implicitly `public abstract` (unless `default`/`static`).
- Fields are implicitly `public static final` - i.e. **constants**, never instance state.
- A class may implement **many** interfaces: `class C implements A, B, D { ... }`.
- An interface can extend one or more other interfaces.

### 4.2 Multiple implementation: capabilities, not families

Java allows a class to extend **only one** superclass but to implement **any number** of
interfaces. This is the crucial modeling power of interfaces:

```java
public class SmartPhone extends Device
        implements Callable, Camera, GpsLocator {
    // one family (Device), three capabilities
}
```

You read this as: *a SmartPhone is a Device, and it can also make calls, take photos, and
locate itself.* Interfaces model **"can do"** (capabilities); inheritance models
**"is a"** (family/identity).

### 4.3 Default methods

Since Java 8, an interface may provide a **default method** with a body. This lets an
interface evolve without breaking existing implementers, and lets it offer sensible
shared behavior:

```java
public interface Notifier {
    void send(String message);          // must be implemented

    default void sendUrgent(String message) {   // optional, has a body
        send("[URGENT] " + message);
    }
}
```

An implementer gets `sendUrgent` for free but may override it. Note the difference from
an abstract class: a default method still cannot use *instance fields*, because the
interface has none.

### 4.4 Static and constant members

```java
public interface HttpStatus {
    int OK = 200;               // public static final constant
    int NOT_FOUND = 404;

    static boolean isSuccess(int code) {   // utility bound to the interface
        return code >= 200 && code < 300;
    }
}
```

### 4.5 Abstract class vs. interface - the decision framework

| Question | Lean **abstract class** | Lean **interface** |
|---|---|---|
| Do the types share **instance state / fields**? | Yes - abstract class holds fields. | No - interfaces have no instance state. |
| Do the types form **one "is-a" family**? | Yes - single, natural parent. | They are unrelated but share a **capability**. |
| Does a type need to belong to **several** abstractions? | No - only one superclass allowed. | Yes - implement many interfaces. |
| Do you need **constructors** or non-public members? | Yes. | No. |
| Is this mainly a **contract** for callers/plugins? | Secondary. | Primary purpose. |
| Do you want to **share substantial implementation**? | Yes - concrete methods + fields. | Only stateless defaults. |

**Rules of thumb**
- If you catch yourself wanting a shared field or constructor -> abstract class.
- If unrelated classes need the same capability -> interface.
- If a type must be several things at once -> interfaces (you only get one superclass).
- **Very common and idiomatic:** use *both* - an interface for the public contract and an
  abstract class that implements it to share a skeleton (Section 4.6).

### 4.6 Combining them (the idiomatic pattern)

The strongest designs often layer all three building blocks:

```
        «interface» Notifier            (the CONTRACT: what callers depend on)
                 ▲  (realization, dashed in UML)
                 ┆
     «abstract» AbstractNotifier        (SKELETON: shared logging, formatting, state)
                 ▲  (generalization)
        ┌────────┴─────────┐
   EmailNotifier      SmsNotifier       (CONCRETE: the specific "how")
```

- The **interface** is what client code references (`Notifier n = ...;`).
- The **abstract class** implements the interface once, capturing shared behavior and
  state so concrete classes do not repeat it.
- The **concrete classes** fill in only what is unique to each channel.

This is exactly the mini-workshop you will build in Section 7.

---

## 5. Worked example (fully solved): the `Payable` contract

**Scenario.** A payroll module must total the amount owed to very different things - an
`Employee` and an `Invoice`. They share no family (`Employee` is not an `Invoice`), but
both "can be paid". This is a textbook case for an interface.

### 5.1 The interface (the contract)

```java
// Payable.java
public interface Payable {
    /** @return the amount owed, in the smallest currency unit or as decimal. */
    double amountDue();

    /** Default helper: everyone who is Payable can be described the same way. */
    default String payLabel() {
        return String.format("Amount due: %.2f", amountDue());
    }
}
```

### 5.2 Two independent implementations

```java
// Employee.java
public class Employee implements Payable {
    private final String name;
    private final double monthlySalary;

    public Employee(String name, double monthlySalary) {
        this.name = name;
        this.monthlySalary = monthlySalary;
    }

    @Override
    public double amountDue() {
        return monthlySalary;
    }

    public String getName() { return name; }
}
```

```java
// Invoice.java
public class Invoice implements Payable {
    private final String supplier;
    private final double unitPrice;
    private final int quantity;

    public Invoice(String supplier, double unitPrice, int quantity) {
        this.supplier = supplier;
        this.unitPrice = unitPrice;
        this.quantity = quantity;
    }

    @Override
    public double amountDue() {
        return unitPrice * quantity;
    }

    public String getSupplier() { return supplier; }
}
```

### 5.3 A client that depends only on the contract

```java
// Payroll.java
import java.util.List;

public class Payroll {
    /** Works for ANY Payable - Employee, Invoice, or a type invented tomorrow. */
    public static double totalOwed(List<Payable> items) {
        double total = 0.0;
        for (Payable p : items) {
            System.out.println(p.payLabel());   // default method in action
            total += p.amountDue();
        }
        return total;
    }

    public static void main(String[] args) {
        List<Payable> items = List.of(
            new Employee("Ada", 4200.00),
            new Invoice("Acme Supplies", 15.50, 30),
            new Employee("Linus", 3800.00)
        );
        System.out.printf("TOTAL OWED = %.2f%n", totalOwed(items));
    }
}
```

**Expected output:**

```
Amount due: 4200.00
Amount due: 465.00
Amount due: 3800.00
TOTAL OWED = 8465.00
```

### 5.4 What to notice

1. `Employee` and `Invoice` share **no common superclass**, yet the same method processes
   both. Only an interface can express this cross-family capability.
2. `Payroll.totalOwed` is typed by `Payable`. A new `Payable` type (say, `Subscription`)
   requires **zero** changes to `Payroll` - this is the Open/Closed Principle in miniature.
3. `payLabel()` is a **default method**: shared behavior living in the interface, with no
   instance state.

---

## 6. Second worked comparison: when to switch to an abstract class

Suppose all notification channels must (a) keep a `sentCount`, (b) timestamp every
message, and (c) share formatting logic. That is **instance state and shared
implementation** - the interface alone cannot hold `sentCount`. So we keep the interface
as the contract *and add* an abstract class for the skeleton. That is the mini-workshop.

---

## 7. Mini-workshop (guided, combined hierarchy)

**Goal:** model one hierarchy that uses **all three** building blocks - an interface, an
abstract class, and concrete classes - and drive it with polymorphic client code.

### 7.1 Target design

```
        «interface» Notifier
        + send(msg): void
        + sendUrgent(msg): void   (default)
                 ▲
                 ┆ realizes
     «abstract» AbstractNotifier
        - sentCount : int
        + send(msg): void         (template: logs, then calls deliver)
        + getSentCount(): int
        + deliver(msg): void   *  (abstract - each channel differs)
                 ▲
        ┌────────┴─────────┐
   EmailNotifier      SmsNotifier
   + deliver(msg)     + deliver(msg)
```

### 7.2 Provided starter (interface + abstract skeleton)

```java
// Notifier.java  (THE CONTRACT)
public interface Notifier {
    void send(String message);

    default void sendUrgent(String message) {
        send("[URGENT] " + message);
    }
}
```

```java
// AbstractNotifier.java  (THE SKELETON: shared STATE + behavior)
public abstract class AbstractNotifier implements Notifier {
    private int sentCount = 0;

    /** Template Method: shared bookkeeping, then a subclass-specific step. */
    @Override
    public final void send(String message) {
        deliver(message);          // the varying step
        sentCount++;               // the shared step
    }

    /** Each concrete channel decides HOW a message physically goes out. */
    protected abstract void deliver(String message);

    public int getSentCount() {
        return sentCount;
    }
}
```

### 7.3 Your tasks

1. **Implement two concrete channels.** Create `EmailNotifier` and `SmsNotifier`, each
   extending `AbstractNotifier` and overriding `deliver` to print a channel-specific line,
   e.g. `EMAIL >> ...` and `SMS >> ...`.
2. **Write a polymorphic client.** In a `Demo` class, build a `List<Notifier>`, send a
   normal message and an urgent one through each, then print each notifier's `getSentCount()`.
3. **Stretch (optional).** Add a third capability interface `Retryable` with a method
   `int maxRetries()` and make `SmsNotifier` implement both `Notifier` (via
   `AbstractNotifier`) and `Retryable`. Observe that `SmsNotifier` now belongs to two
   abstractions - impossible with single inheritance alone.

### 7.4 Reference solution (for the instructor / self-check)

```java
// EmailNotifier.java
public class EmailNotifier extends AbstractNotifier {
    @Override
    protected void deliver(String message) {
        System.out.println("EMAIL >> " + message);
    }
}

// SmsNotifier.java
public class SmsNotifier extends AbstractNotifier {
    @Override
    protected void deliver(String message) {
        System.out.println("SMS   >> " + message);
    }
}

// Demo.java
import java.util.List;

public class Demo {
    public static void main(String[] args) {
        List<Notifier> notifiers = List.of(new EmailNotifier(), new SmsNotifier());
        for (Notifier n : notifiers) {
            n.send("Your order shipped.");
            n.sendUrgent("Server is down!");   // default method -> send() -> deliver()
        }
        for (Notifier n : notifiers) {
            // getSentCount lives on AbstractNotifier; downcast to read it
            System.out.println(((AbstractNotifier) n).getSentCount() + " messages sent");
        }
    }
}
```

**Expected output:**

```
EMAIL >> Your order shipped.
EMAIL >> [URGENT] Server is down!
SMS   >> Your order shipped.
SMS   >> [URGENT] Server is down!
2 messages sent
2 messages sent
```

### 7.5 Discussion prompts
- Why is `send` marked `final` in `AbstractNotifier`? (So subclasses cannot break the
  bookkeeping template - they may only fill in `deliver`.)
- Which member could **not** live in the interface, forcing the abstract class? (`sentCount`,
  because interfaces have no instance state.)
- If a new channel `PushNotifier` is added, which existing files change? (None - only a
  new class is added.)

---

## 8. Common mistakes to avoid

- **Putting instance fields in an interface.** Interface fields are `public static final`
  constants, not per-object state.
- **Trying to extend two classes** (`class C extends A, B`) - illegal. Use interfaces for
  the extra abstractions.
- **Reaching for an interface when you need shared state** - if you need fields or a
  constructor, an abstract class (often *plus* the interface) is the right tool.
- **Overriding a default method by accident** without understanding it - know whether you
  are replacing shared behavior.
- **Referencing the concrete type in client code** (`EmailNotifier n = ...`) instead of
  the abstraction (`Notifier n = ...`) - this reintroduces the coupling interfaces exist
  to remove.

---

## 9. Wrap-up and exit ticket

### One-paragraph summary
An **interface** is a pure contract: method signatures, constants, and optional default/
static methods, but **no instance state**. It models a **capability** ("can do") that
even unrelated classes can share, and a class may implement **many** interfaces. An
**abstract class** models a **family** ("is-a") and can carry **shared state and
behavior** but only one may be a superclass. Choose the interface for contracts and
cross-family capabilities, the abstract class for shared implementation and state, and
very often **combine both**: an interface for the contract, an abstract class for the
skeleton, and concrete classes for the specifics.

### Exit ticket (hand in before leaving - 3 short answers)
1. Give one scenario where an **interface** is clearly better than an abstract class, and
   say why in one sentence.
2. Name one thing an **abstract class** can do that an **interface** cannot.
3. In the mini-workshop, which single member forced us to introduce the abstract class
   instead of putting everything in the interface?

### Looking ahead
The optional activity ([`../optional-activity/README.md`](../optional-activity/README.md))
lets you design your own combined hierarchy from scratch and submit it via GitHub. The
curated readings ([`../material/README.md`](../material/README.md)) deepen every concept
from these two sessions.
