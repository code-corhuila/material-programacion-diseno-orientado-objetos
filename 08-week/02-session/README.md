# Week 08 - Session 2: Interfaces and combined design

**Subject:** Object-Oriented Programming and Design | **Unit 2** | **Corte 2**
**Duration:** 120 minutes | **Reference language:** Java (JDK 11+)

---

## 1. Session objective

By the end of this session the student will be able to **design and implement an interface as a
contract, provide two independent implementations of it, decide between an abstract class and an
interface for a given scenario, and model a small hierarchy that combines an abstract class, one or
more interfaces, and concrete classes**.

This maps to Week 08 objectives 1, 3, 4, and 5.

---

## 2. Timed agenda

| Time | Segment | Activity |
|---|---|---|
| 0:00 - 0:15 | Recap & bridge | Abstract-class recap; the "several capabilities" problem interfaces solve. |
| 0:15 - 0:50 | Theory | Interfaces, multiple implementation, default/static methods, constants, abstract-vs-interface decision rule. |
| 0:50 - 1:15 | Worked example | `Payable` + `Printable` payment processing across unrelated types. |
| 1:15 - 1:50 | Workshop | Notification system combining abstract class + interfaces + concrete classes. |
| 1:50 - 2:00 | Wrap-up | Decision-rule summary + exit ticket. |

---

## 3. Recap and bridge (15 min)

### Recap of Session 1

- An **abstract class** captures an "is-a" family with shared state and behavior plus abstract
  methods subclasses must implement. It cannot be instantiated.

### The limitation

Java (like C#) allows a class to `extends` **only one** parent. So a hierarchy can express only one
"is-a" line. But real objects often need to advertise **several independent capabilities**:

- A `SavingsAccount` *is an* `Account` (one inheritance line) **and** can be *serialized*, *compared*,
  and *audited* (three unrelated capabilities).
- An `Invoice` and a `TimeSheet` are completely unrelated types, yet both need to be *payable*.

You cannot force `Invoice` and `TimeSheet` into the same "is-a" family just so they share a `pay()`
method — that would be a false hierarchy. What they share is a **capability**, not an identity. That
is exactly what an **interface** models.

**Discussion prompt (2 min):** Name two capabilities your phone's apps share even though the apps are
unrelated (e.g., "can receive a notification", "can be uninstalled"). Capabilities cut *across* type
families — interfaces let us name them.

---

## 4. Theory notes (35 min)

### 4.1 What is an interface?

An **interface** is a **pure contract**: a named set of operations that any implementing class
promises to provide. It declares *what* an object can do, never *how*.

```java
public interface Payable {
    // implicitly public and abstract: a method signature, no body
    double amountDue();
    void markPaid();
}
```

A class fulfills the contract with `implements`:

```java
public class Invoice implements Payable {
    private double total;
    private boolean paid;

    public Invoice(double total) { this.total = total; }

    @Override public double amountDue() { return paid ? 0 : total; }
    @Override public void markPaid()    { this.paid = true; }
}
```

Now any code can accept "anything payable" without knowing the concrete type:

```java
void processPayment(Payable item) {   // depends on the CONTRACT, not on Invoice
    System.out.println("Charging: " + item.amountDue());
    item.markPaid();
}
```

This is **"program to an interface, not an implementation."** `processPayment` works for `Invoice`,
`TimeSheet`, `Subscription`, or any future type — as long as it is `Payable`.

### 4.2 A class can implement many interfaces

This is the escape from single inheritance:

```java
public interface Printable { String render(); }
public interface Auditable { String auditLog(); }

public class Invoice implements Payable, Printable, Auditable {
    // must provide amountDue(), markPaid(), render(), auditLog()
}
```

`Invoice` now belongs to **three** capability types at once. Different callers see it through
different contracts: the payment module sees a `Payable`, the printer sees a `Printable`, the
compliance module sees an `Auditable`. None is coupled to `Invoice` itself.

### 4.3 Default methods (Java 8+)

An interface can provide a **default** implementation for a method, so implementers get it for free
and may override it if needed:

```java
public interface Payable {
    double amountDue();
    void markPaid();

    // default method: shared behavior available to every implementer
    default boolean isFree() {
        return amountDue() == 0.0;
    }
}
```

Default methods let interfaces evolve without breaking existing implementers, and let a contract
carry small, sensible shared behavior. Use them sparingly — an interface is still primarily a
contract, not a code-sharing mechanism (that is what abstract classes are for).

### 4.4 Static methods and constants

Interfaces may also declare `static` helper methods and constants (fields are implicitly
`public static final`):

```java
public interface Currency {
    String CODE = "COP";                 // public static final constant
    static double round(double v) {      // static helper
        return Math.round(v * 100.0) / 100.0;
    }
}
```

A **marker interface** has no methods at all; it exists only to *tag* a type with a capability the
runtime or a framework checks (Java's `Serializable` and `Cloneable` are the classic examples).

### 4.5 Interface vs. abstract class — the decision rule

| Question | Abstract class | Interface |
|---|---|---|
| Relationship modeled | **"is-a"** (identity/family) | **"can-do" / "behaves-as"** (capability) |
| Shared **state** (fields)? | Yes — can hold instance fields | No instance state (only constants) |
| Shared **implemented** code? | Yes, freely | Only via `default`/`static` methods |
| How many can a class have? | **One** (single inheritance) | **Many** |
| Constructors? | Yes | No |
| Typical use | A base type with common machinery and a few gaps | A capability crossing unrelated types |

**Practical heuristic:**

- Different implementations share **real state and behavior** and form one family → **abstract class**.
- Unrelated types need to share a **capability / contract**, or a type needs **several** such roles →
  **interface**.
- When both apply, **combine them**: an abstract base class that *also* implements interfaces
  (the workshop does exactly this).

Modern guidance (Bloch, *Effective Java*, Item 20): **prefer interfaces to abstract classes** for
public contracts because they are more flexible; use an abstract "skeletal implementation" class
alongside the interface when you want to share code. We practice that combination below.

### 4.6 Text diagram: capability vs. family

```
          «interface»            «interface»
           Payable                Printable
          amountDue()             render()
          markPaid()                 ▲
             ▲   ▲                   │ implements
   implements│   │implements         │
   ┌─────────┘   └─────────┐   ┌─────┴──────┐
   │  Invoice   │          │   │ TimeSheet  │
   │ (a doc)    │          │   │ (hours)    │
   └────────────┘          └───┴────────────┘
   Two UNRELATED classes, same CAPABILITY (Payable).
   Invoice ALSO advertises Printable. No shared "is-a" needed.
```

---

## 5. Worked example: payment processing (25 min)

**Goal:** a payment module that charges *anything payable* and a report module that prints *anything
printable*, with zero coupling to concrete types.

### Step 1 - Contracts

```java
public interface Payable {
    double amountDue();
    void markPaid();
    default boolean isFree() { return amountDue() == 0.0; }
}

public interface Printable {
    String render();
}
```

### Step 2 - Two unrelated concrete types, each choosing its capabilities

```java
public class Invoice implements Payable, Printable {
    private final String number;
    private final double total;
    private boolean paid;

    public Invoice(String number, double total) {
        this.number = number;
        this.total = total;
    }
    @Override public double amountDue() { return paid ? 0 : total; }
    @Override public void markPaid()    { paid = true; }
    @Override public String render()    {
        return "INVOICE " + number + " | due: " + amountDue() + (paid ? " (PAID)" : "");
    }
}

public class Subscription implements Payable {   // Payable, but NOT Printable
    private final String plan;
    private final double monthlyFee;
    private boolean paid;

    public Subscription(String plan, double monthlyFee) {
        this.plan = plan;
        this.monthlyFee = monthlyFee;
    }
    @Override public double amountDue() { return paid ? 0 : monthlyFee; }
    @Override public void markPaid()    { paid = true; }
}
```

### Step 3 - Modules that depend only on contracts

```java
import java.util.List;

public class PaymentService {
    // Accepts ANY Payable. Never mentions Invoice or Subscription.
    public double chargeAll(List<Payable> items) {
        double collected = 0;
        for (Payable item : items) {
            if (item.isFree()) continue;      // default method from the interface
            collected += item.amountDue();
            item.markPaid();
        }
        return collected;
    }
}
```

### Step 4 - Wiring it together

```java
import java.util.List;

public class Billing {
    public static void main(String[] args) {
        Invoice inv = new Invoice("F-1001", 250_000);
        Subscription sub = new Subscription("Pro", 39_900);

        // Payment module sees them purely as Payable
        List<Payable> toCharge = List.of(inv, sub);
        double total = new PaymentService().chargeAll(toCharge);
        System.out.printf("Collected: $%.2f%n", total);

        // Report module sees only Printable things.
        // 'inv' is Printable; 'sub' is not, so it is not in this list.
        List<Printable> toPrint = List.of(inv);
        for (Printable p : toPrint) System.out.println(p.render());
    }
}
```

**Expected output:**

```
Collected: $289900.00
INVOICE F-1001 | due: 0.0 (PAID)
```

### Why this matters

`PaymentService` and the report loop are **closed for modification** but **open for extension**: add
a `LatePaymentFee implements Payable` and `chargeAll` handles it with no change. Two unrelated types
(`Invoice`, `Subscription`) share the `Payable` capability without any artificial common base class.

---

## 6. Workshop: combined hierarchy (35 min)

This is the integrative task for RAA 90_82759. It **combines an abstract class, interfaces, and
concrete classes** — the full toolbox of the week.

### Scenario

Build a small **notification system** for a university platform. The system sends notifications to
students through different channels. Requirements:

1. Every notification shares a **title**, a **body**, and a **timestamp** (shared state), and every
   notification can produce a **summary** line (shared behavior). Not every notification is complete
   on its own: how it is **delivered** depends on the channel.
2. Notifications are delivered over different **channels**: `EmailChannel`, `SmsChannel`,
   `PushChannel`. A channel is a **capability/contract**, not an "is-a" family.
3. Some notifications are also **Loggable** (can produce an audit-log entry) — a second, independent
   capability.

### Required design

- An **abstract class** `Notification` with:
  - shared fields `title`, `body`, `timestamp`;
  - a concrete method `summary()` returning `"[timestamp] title"`;
  - an **abstract** method `String format()` (each concrete notification formats its content
    differently).
- An **interface** `Channel` with `void send(String content)` — implemented by `EmailChannel`,
  `SmsChannel`, `PushChannel` (three independent implementations).
- An **interface** `Loggable` with `String toLogEntry()`.
- Concrete notifications: e.g., `GradePostedNotification` (extends `Notification`, implements
  `Loggable`) and `DeadlineReminderNotification` (extends `Notification`).
- A `Notifier` service whose method `notify(Notification n, Channel c)` calls `c.send(n.format())`
  and, **if** the notification is `Loggable`, records `((Loggable) n).toLogEntry()`.

### Text model to sketch first (do this before coding)

```
   «abstract» Notification            «interface» Channel      «interface» Loggable
   - title, body, timestamp            + send(content)          + toLogEntry()
   + summary()   (concrete)                 ▲  ▲  ▲
   + format()    (abstract)                 │  │  │ implements
        ▲                                   │  │  └── PushChannel
        │ extends                           │  └───── SmsChannel
   ┌────┴───────────────────┐              └──────── EmailChannel
   │ GradePostedNotification │  implements Loggable
   ├─────────────────────────┤
   │ DeadlineReminder...      │
   └─────────────────────────┘
```

### Reference solution (guide, then reveal)

```java
import java.time.LocalDateTime;

public abstract class Notification {
    protected final String title;
    protected final String body;
    protected final LocalDateTime timestamp;

    protected Notification(String title, String body) {
        this.title = title;
        this.body = body;
        this.timestamp = LocalDateTime.now();
    }

    public String summary() {                 // shared, concrete
        return "[" + timestamp + "] " + title;
    }

    public abstract String format();          // gap: each type formats differently
}

public interface Channel {
    void send(String content);
}

public interface Loggable {
    String toLogEntry();
}

public class EmailChannel implements Channel {
    @Override public void send(String content) {
        System.out.println("EMAIL >> " + content);
    }
}
public class SmsChannel implements Channel {
    @Override public void send(String content) {
        System.out.println("SMS >> " + content);
    }
}
public class PushChannel implements Channel {
    @Override public void send(String content) {
        System.out.println("PUSH >> " + content);
    }
}

public class GradePostedNotification extends Notification implements Loggable {
    private final String course;
    private final double grade;

    public GradePostedNotification(String course, double grade) {
        super("Grade posted", "Your grade is available.");
        this.course = course;
        this.grade = grade;
    }
    @Override public String format() {
        return title + ": " + course + " = " + grade;
    }
    @Override public String toLogEntry() {
        return "AUDIT|" + timestamp + "|grade_posted|" + course + "|" + grade;
    }
}

public class DeadlineReminderNotification extends Notification {  // not Loggable
    private final String assignment;

    public DeadlineReminderNotification(String assignment) {
        super("Deadline reminder", "An assignment is due soon.");
        this.assignment = assignment;
    }
    @Override public String format() {
        return title + ": " + assignment + " is due soon!";
    }
}

public class Notifier {
    public void notify(Notification n, Channel c) {
        c.send(n.format());                        // uses abstract type + interface
        if (n instanceof Loggable) {               // capability check
            System.out.println(((Loggable) n).toLogEntry());
        }
    }
}

public class Demo {
    public static void main(String[] args) {
        Notifier notifier = new Notifier();

        Notification grade = new GradePostedNotification("OOP Design", 4.6);
        Notification deadline = new DeadlineReminderNotification("Workshop 2");

        notifier.notify(grade, new EmailChannel());   // Loggable -> also audited
        notifier.notify(deadline, new SmsChannel());  // not Loggable -> no audit
        notifier.notify(grade, new PushChannel());    // same notification, other channel
    }
}
```

**Expected output (timestamp will vary):**

```
EMAIL >> Grade posted: OOP Design = 4.6
AUDIT|2026-...|grade_posted|OOP Design|4.6
SMS >> Deadline reminder: Workshop 2 is due soon!
PUSH >> Grade posted: OOP Design = 4.6
AUDIT|2026-...|grade_posted|OOP Design|4.6
```

### What to notice (assessment discussion)

- **Abstract class** `Notification` = shared state + shared `summary()` + the `format()` gap → an
  "is-a" family.
- **Interfaces** `Channel` and `Loggable` = capabilities that cross the design; `Channel` has three
  independent implementations, proving decoupling.
- `Notifier` depends on the **abstract type and the interface**, never on a concrete class — swap
  channels or add notification types freely (Open/Closed Principle, low coupling).

### Workshop deliverable

Working code plus your **before-coding text/UML sketch** and a 3-sentence justification of each
abstract-class-vs-interface choice. This is the evidence collected for corte 2.

---

## 7. Wrap-up and exit ticket (10 min)

### Decision-rule summary (memorize this)

> **Abstract class** = "is-a" + shared state/behavior, only one allowed.
> **Interface** = "can-do" capability/contract, many allowed, no state.
> Need both? A concrete class **extends** one abstract base and **implements** several interfaces.

### Exit ticket (submit before leaving)

1. Give one scenario where an **interface** is clearly better than an abstract class, and say why in
   one sentence.
2. Give one scenario where an **abstract class** is clearly better than an interface, and say why.
3. Why does `Notifier` depending on `Channel` (not on `EmailChannel`) make the system easier to
   change? Answer in terms of coupling and the Open/Closed Principle.

### Bridge to the rest of Unit 2

"Program to an interface, not an implementation" is the seed of **design patterns** (Strategy,
Factory, Observer) and of **dependency injection** and **testability** (you can substitute a fake
`Channel` in a unit test). Every one of those later topics rests on what you built today.
