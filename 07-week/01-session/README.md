# Week 07 - Session 1

## Method Overriding and the Mechanics of Dynamic Dispatch

**Unit 2 - Design principles and modularity | Corte 2 | RAA 90_82759**

---

## 1. Session objective

By the end of this session the student will be able to **override an inherited method**
correctly, **invoke it through a parent-type reference**, and **explain how dynamic
dispatch chooses the implementation at run time** by distinguishing the *static
(declared)* type from the *dynamic (actual)* type of a reference.

---

## 2. Timed agenda (110 minutes)

| Time | Activity |
|------|----------|
| 0:00 - 0:10 | Warm-up: "guess the output" of a short overriding snippet; surface intuitions. |
| 0:10 - 0:35 | Theory block 1: overriding rules, `@Override`, `super`. |
| 0:35 - 0:55 | Theory block 2: static vs. dynamic type; dynamic dispatch and the vtable model. |
| 0:55 - 1:20 | Worked example: the `Payment` hierarchy (live coding + tracing). |
| 1:20 - 1:45 | Guided in-class practice: `Notification` hierarchy. |
| 1:45 - 1:50 | Wrap-up and exit ticket. |

---

## 3. Theory notes

### 3.1 Recap: what inheritance gave us

In previous weeks a subclass could **inherit** members from a superclass and **add**
new ones. But inheritance alone does not let a subclass *change* inherited behavior in a
way the rest of the program automatically respects. That is what **overriding** plus
**dynamic dispatch** add.

### 3.2 Method overriding

**Overriding** means a subclass declares an instance method with the **same signature**
(name + parameter types) as a method it inherited, and supplies a **new body**. From then
on, for objects of that subclass, the subclass version is the one that counts.

Rules for a valid override in Java (very similar in C#, C++, Kotlin):

1. **Same name and parameter list.** Different parameters would be *overloading*, not overriding.
2. **Return type** must be the same or a **subtype** (covariant return).
3. **Access modifier** may not be *more restrictive* (a `public` method cannot become `protected`).
4. The method must be an **instance** method (not `static`) and not `final` or `private` in the parent.
5. The override may throw **fewer or narrower** checked exceptions, not broader ones.

```java
class Animal {
    String speak() {          // inherited method
        return "...";
    }
}

class Dog extends Animal {
    @Override
    String speak() {          // OVERRIDE: same signature, new body
        return "Woof";
    }
}
```

#### The `@Override` annotation

`@Override` is not decoration. It tells the compiler *"I intend this to override a
supertype method — verify it."* If you misspell the name or get a parameter type wrong,
you have accidentally created a **new, unrelated method**, and dynamic dispatch will never
call it. With `@Override`, that mistake becomes a compile error instead of a silent bug.

```java
class Cat extends Animal {
    @Override
    String speaks() { return "Meow"; }   // COMPILE ERROR: nothing named speaks() to override
}
```

> **Rule of thumb:** Always annotate overrides. It costs one line and prevents a whole
> class of hard-to-find defects. C# uses the `override` keyword (mandatory, with `virtual`
> on the base method); C++ uses the `override` specifier; Kotlin requires `override` too.

#### Extending vs. replacing: `super`

Sometimes you do not want to *discard* the inherited behavior — you want to *build on it*.
Call the superclass version with `super`:

```java
class LoggingList extends ArrayList<String> {
    @Override
    public boolean add(String s) {
        System.out.println("adding: " + s);
        return super.add(s);      // reuse the inherited behavior, then add logging
    }
}
```

This is the essence of the *Template Method* / *decoration* style you will meet later.

### 3.3 Static type vs. dynamic type

Every reference variable has **two** types:

- **Static type (declared type):** the type written in the declaration. Fixed at compile
  time. It controls **which methods the compiler will let you call**.
- **Dynamic type (run-time type):** the class of the object the reference *actually points
  to* right now. It controls **which overriding implementation executes**.

```java
Animal a = new Dog();
//    ^^^^^^         static type  = Animal   -> compiler checks calls against Animal
//            ^^^^^  dynamic type = Dog      -> runtime picks Dog's overrides

a.speak();   // compiles because Animal has speak(); runs Dog.speak() -> "Woof"
```

The compiler sees `a` as an `Animal`, so `a.speak()` is legal (Animal defines `speak`).
But **at run time** the object is a `Dog`, so `Dog.speak()` executes. This split is the
whole idea.

### 3.4 Dynamic dispatch (late binding)

**Dynamic dispatch** is the run-time mechanism that, for an *overridable* method call,
looks at the object's **dynamic type** and calls that class's implementation.

Conceptual model — the **virtual method table (vtable)**. Imagine each class has a small
table mapping each overridable method to the concrete code to run. Every object carries a
hidden pointer to its class's table.

```
   Object a  ── points to ──► [Dog vtable]
                                 speak()  ─► Dog.speak   (returns "Woof")
                                 toString ─► Object.toString

   Object b  ── points to ──► [Cat vtable]
                                 speak()  ─► Cat.speak   (returns "Meow")
                                 toString ─► Object.toString
```

When the program executes `ref.speak()`:

1. The **compiler** verified (using the *static* type) that `speak()` exists and is callable.
2. At **run time**, the runtime follows the object's vtable pointer and calls the entry for
   `speak()` — which is whatever the *dynamic* type installed there.

```
COMPILE TIME                         RUN TIME
------------                         --------
"Is speak() a legal call             "Which speak() body?
 on an Animal?"  -> YES               Look at the actual object's
(checked against static type)          vtable."  -> Dog.speak
                                     (resolved by dynamic type)
```

**What is decided when?**

| Decided at compile time | Decided at run time |
|-------------------------|---------------------|
| Whether the call is legal (method exists on the static type). | Which overriding body actually runs. |
| Overload resolution (which *signature*). | — |
| Field access and `static` method calls (these are **not** dispatched). | — |

> **Key insight:** Fields and `static` methods are bound by the **static type** (this is
> *field hiding* / *method hiding*, not overriding). Only **instance methods** are
> dynamically dispatched. We return to this in Session 2.

### 3.5 Why this matters for design

Because the *caller* only needs the supertype, you can add a brand-new subclass with its
own overrides and every existing loop that iterates over the supertype will "just work"
with the new type — **without editing that loop**. That is the Open/Closed Principle:
*open for extension, closed for modification*. Dynamic dispatch is the engine underneath.

---

## 4. Worked example: a `Payment` hierarchy

**Goal:** model different payment methods that all compute a processing fee differently,
and process them uniformly.

### 4.1 The hierarchy

```java
abstract class Payment {
    protected final double amount;

    protected Payment(double amount) {
        this.amount = amount;
    }

    // Overridable "hook": each payment type computes its own fee.
    double fee() {
        return 0.0;                      // default: no fee
    }

    // Uses fee() polymorphically — subclasses need not touch this.
    final double total() {
        return amount + fee();
    }

    String describe() {
        return String.format("%-14s amount=%.2f fee=%.2f total=%.2f",
                getClass().getSimpleName(), amount, fee(), total());
    }
}

class CashPayment extends Payment {
    CashPayment(double amount) { super(amount); }
    // No override: inherits fee() == 0.0
}

class CreditCardPayment extends Payment {
    CreditCardPayment(double amount) { super(amount); }

    @Override
    double fee() {
        return amount * 0.029 + 0.30;    // 2.9% + 30 cents
    }
}

class WireTransferPayment extends Payment {
    WireTransferPayment(double amount) { super(amount); }

    @Override
    double fee() {
        return 15.0;                     // flat fee
    }
}
```

### 4.2 Using it polymorphically

```java
public class PaymentDemo {
    public static void main(String[] args) {
        Payment[] payments = {
            new CashPayment(100.00),
            new CreditCardPayment(100.00),
            new WireTransferPayment(100.00)
        };

        for (Payment p : payments) {     // static type of p is Payment
            System.out.println(p.describe());
        }
    }
}
```

**Output**

```
CashPayment    amount=100.00 fee=0.00  total=100.00
CreditCardPayment amount=100.00 fee=3.20  total=103.20
WireTransferPayment amount=100.00 fee=15.00 total=115.00
```

### 4.3 Tracing the dispatch

Consider the second iteration, where `p`'s **static type is `Payment`** but its
**dynamic type is `CreditCardPayment`**:

```
p.describe()
   -> Payment.describe() runs (not overridden)  ... calls fee() and total() on 'this'
        fee()   -> DISPATCH on dynamic type CreditCardPayment -> 3.20
        total() -> Payment.total() (final) -> amount + fee()
                       fee() -> DISPATCH again -> CreditCardPayment.fee() -> 3.20
                   -> 103.20
```

Notice that `describe()` and `total()` are written **once**, in `Payment`, yet they
produce correct results for every subclass because their internal call to `fee()` is
dispatched to the actual object's version. **You add a new payment type by writing one new
class — the loop and the base methods never change.**

### 4.4 Contrast: the non-polymorphic way (anti-pattern)

```java
// DON'T DO THIS — a type ladder that must be edited for every new type
double fee(Payment p) {
    if (p instanceof CreditCardPayment) return p.amount * 0.029 + 0.30;
    if (p instanceof WireTransferPayment) return 15.0;
    return 0.0;
}
```

Every new payment method forces you to open and edit this method (and probably several
others like it scattered across the codebase). The polymorphic version localizes each
behavior in its own class. We will refactor exactly this kind of ladder in Session 2.

---

## 5. Guided in-class practice: `Notification` hierarchy

Work in pairs. **Estimated 25 minutes.**

**Scenario:** An app sends notifications through different channels. Each channel formats
and "sends" a message differently, but the rest of the app should not care which channel
it is.

### Step-by-step

1. Create an abstract class `Notification` with:
   - a `protected final String message;` and a constructor.
   - a method `String send();` that returns a string describing what was sent. Give it a
     sensible default (e.g., `"[generic] " + message`).
2. Create three subclasses that **override** `send()` with `@Override`:
   - `EmailNotification` → returns `"[email] " + message`.
   - `SmsNotification` → returns `"[sms] " + message` **truncated to 20 characters**.
   - `PushNotification` → returns `"[push] " + message.toUpperCase()`.
3. In one subclass, use `super.send()` inside the override to reuse part of the parent's
   behavior instead of rewriting it.
4. In `main`, build a `Notification[]` mixing all three subtypes and print `n.send()` for
   each in a single loop. The loop must **not** contain any `instanceof` or `switch`.

### Checkpoints (self-verify)

- [ ] Removing an `@Override` and misspelling a method name produces a compile error (try it, then fix it).
- [ ] The single loop prints three different formats without testing the type.
- [ ] For each object, name its static type and its dynamic type.

### Stretch goals (optional)

- Add a `SlackNotification` **without modifying the loop or the base class**. Prove Open/Closed to yourself.
- Add a `boolean isUrgent()` hook with a default of `false`, override it in `PushNotification`, and have `send()` prepend `"!! "` when urgent — demonstrating one dispatched method calling another.

---

## 6. Wrap-up and exit ticket

### Summary

- **Overriding** = same signature, new body in a subclass; always annotate with `@Override`.
- **Static type** decides *what you may call*; **dynamic type** decides *what actually runs*.
- **Dynamic dispatch** resolves overridable instance-method calls at run time via the vtable.
- Polymorphism lets one piece of code drive many behaviors — the basis of the Open/Closed Principle.

### Exit ticket (hand in before leaving — 5 minutes)

Given:

```java
class A            { String who() { return "A"; } String greet() { return "hi from " + who(); } }
class B extends A  { @Override String who() { return "B"; } }
class C extends B  { @Override String greet() { return "yo from " + who(); } }

A x = new B();
A y = new C();
System.out.println(x.greet());
System.out.println(y.greet());
```

1. What does each `println` print? **Explain each answer in one sentence**, naming the
   dynamic type responsible.
2. In one line: why does `x.greet()` end in `"B"` even though `greet()` is defined in `A`?

*(Answer key for the instructor: Line 1 prints `hi from B` — `greet()` is inherited from A
but its internal call to `who()` is dispatched to the dynamic type B. Line 2 prints
`yo from B` — C overrides `greet()` (so `"yo from ..."` is used) but does **not** override
`who()`, so the inherited-from-B `who()` runs. The teaching point: C overrides `greet` but
not `who`, and each call is dispatched independently on the object's dynamic type.)*
