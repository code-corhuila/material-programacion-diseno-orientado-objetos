# Week 09 - Session 2: Inheritance vs. composition & refactoring

**Subject:** Object-Oriented Programming and Design (2026-B)
**Unit 2 - Design principles and modularity | Corte 2**
**RAA:** 90_82759

---

## 1. Session objective

Compare **inheritance** and **composition**, apply the guideline *"favor composition over
inheritance"*, detect when inheritance is misused (Liskov Substitution Principle violations and
the fragile base class problem), and **refactor** an inappropriate inheritance hierarchy into a
flexible, composition-based design that still passes its tests.

---

## 2. Timed agenda (110 minutes)

| Time | Activity |
|------|----------|
| 0:00 – 0:10 | Recap of Session 1 (has-a, delegation, injection); collect exit-ticket doubts. |
| 0:10 – 0:35 | Theory: what inheritance costs; fragile base class; the LSP litmus test. |
| 0:35 – 0:50 | Theory: the "favor composition over inheritance" guideline and when inheritance is still right. |
| 0:50 – 1:20 | Worked refactoring: `Stack extends ArrayList` → composition; `Penguin extends Bird` LSP break → strategy-by-composition. |
| 1:20 – 1:45 | Guided practice: refactor the `AdminUser extends User` / `Robot` payroll smell. |
| 1:45 – 1:55 | Wrap-up, decision checklist, exit ticket. |

---

## 3. Theory notes

### 3.1 A quick recap of inheritance

Inheritance models an **"is-a"** relationship: a subclass *is a kind of* its superclass and
inherits its fields and methods, optionally overriding some.

```java
class Animal {
    void breathe() { /* ... */ }
}
class Dog extends Animal {   // a Dog IS-A Animal
    void bark() { /* ... */ }
}
```

Inheritance is attractive because it looks like free reuse. But it comes with hidden costs.

### 3.2 What inheritance costs

1. **Tight coupling to the superclass.** A subclass depends on the *implementation details* of
   its parent, not just its public contract. Overriding one method may silently depend on how
   another parent method calls it.

2. **The fragile base class problem.** A change in the superclass can break subclasses that were
   working perfectly, even though the subclass code was never touched. The base class is
   "fragile" because you cannot evolve it safely.

3. **White-box reuse breaks encapsulation.** Inheritance exposes the parent's internals to the
   child. Composition, by contrast, is *black-box reuse*: you only see the collaborator's public
   interface.

4. **Rigidity — it is fixed at compile time.** A `Dog` is an `Animal` forever. You cannot change
   an object's inherited behavior at runtime. Composition lets you swap parts dynamically.

5. **The "gorilla/banana/jungle" problem.** When you inherit to reuse one method, you also drag
   in *everything else* the superclass exposes — "you wanted a banana but got a gorilla holding
   the banana, and the entire jungle." Composition lets you take only the part you need.

6. **Single inheritance limits.** In Java/C# a class can extend only one class. If behavior must
   come from several sources, inheritance cannot express it — composition can hold many
   collaborators.

### 3.3 The Liskov Substitution Principle (LSP) — the litmus test

> **LSP:** Objects of a subclass must be substitutable for objects of the superclass **without
> breaking the correctness** of the program.

If code written against the superclass breaks when you hand it a subclass instance, the
"is-a" relationship is *false in practice*, and inheritance is the wrong tool.

**Classic LSP violation — the Penguin problem:**

```java
class Bird {
    void fly() { System.out.println("Flying high."); }
}
class Penguin extends Bird {
    @Override
    void fly() {
        throw new UnsupportedOperationException("Penguins can't fly!");   // LSP VIOLATION
    }
}

// Client written against Bird:
void migrate(List<Bird> flock) {
    for (Bird b : flock) b.fly();   // explodes when a Penguin is in the list
}
```

A `Penguin` *is a* bird in biology, but it is **not substitutable** for the `Bird` abstraction
this code assumed ("all birds fly"). The abstraction was wrong. LSP tells us to stop inheriting
and re-model.

**Rectangle/Square** is the other textbook example: making `Square extends Rectangle` breaks any
code that sets width and height independently.

### 3.4 The guideline: *favor composition over inheritance*

This is one of the most cited principles from the "Gang of Four" (GoF) *Design Patterns* book:

> **Favor object composition over class inheritance.**

It does **not** say "never inherit". It says: **default to composition**; reach for inheritance
only when the "is-a" relationship is *genuine and substitutable* (passes LSP), stable, and you
actually want the subclass to be usable everywhere the superclass is.

**How to decide — a practical test:**

| Ask... | If yes → | If no → |
|--------|----------|---------|
| Is it a true, permanent "is-a"? | consider inheritance | use composition ("has-a") |
| Can the subclass be substituted everywhere the parent is used (LSP)? | inheritance is safe | do NOT inherit |
| Do you need only *some* of the parent's behavior? | compose (take only what you need) | — |
| Might the behavior need to change at runtime or be combined from several sources? | compose | — |
| Are you inheriting just to reuse code (not to model a type)? | compose | — |

### 3.5 Side-by-side comparison

| Aspect | Inheritance ("is-a") | Composition ("has-a") |
|--------|----------------------|------------------------|
| Reuse style | White-box (exposes internals) | Black-box (public interface only) |
| Coupling | High (to parent's implementation) | Low (to collaborator's interface) |
| Binding time | Compile time (fixed) | Can be runtime (swap parts) |
| Flexibility | Rigid single hierarchy | Assemble/replace freely |
| Multiple sources of behavior | Not possible (single inheritance) | Easy (hold several collaborators) |
| Testability | Harder to isolate | Easy — inject test doubles |
| Risk | Fragile base class, LSP traps | More classes/wiring to manage |
| Best when | Genuine, stable, substitutable "is-a" | Behavior is a part, optional, or variable |

### 3.6 Composition as the engine of modularity

Because composed parts are injected and behind an interface, composition naturally produces the
**Strategy** style of design: the varying behavior becomes a component you plug in.

```java
interface QuackBehavior { void quack(); }
class LoudQuack   implements QuackBehavior { public void quack(){ System.out.println("QUACK!"); } }
class MuteQuack   implements QuackBehavior { public void quack(){ /* silence */ } }

class Duck {
    private QuackBehavior quack;                 // HAS-A behavior (composition)
    Duck(QuackBehavior quack){ this.quack = quack; }
    void setQuack(QuackBehavior q){ this.quack = q; }   // change behavior at RUNTIME
    void performQuack(){ quack.quack(); }               // delegation
}
```

Now a `Duck` can be loud, mute, or anything else — even switched *while running* — without a
single new subclass. This is exactly what inheritance cannot do.

---

## 4. Fully worked example: refactoring bad inheritance into composition

### 4.1 Smell #1 — `Stack extends ArrayList` (inheriting to reuse)

**Before (broken by inheritance):**

```java
// A Stack should only allow push/pop/peek. But by inheriting ArrayList,
// it accidentally exposes add(index, e), remove(index), get(index)...
class Stack<E> extends ArrayList<E> {
    public void push(E e) { add(e); }
    public E pop()        { return remove(size() - 1); }
    public E peek()       { return get(size() - 1); }
}

Stack<String> s = new Stack<>();
s.push("a");
s.add(0, "SNEAKY");   // LEAK: ArrayList's API breaks the stack invariant!
```

The problem: a `Stack` is **not really an** `ArrayList`; it just wants to *use* one. Inheritance
dragged in the whole `List` API (gorilla/banana), letting callers violate LIFO order.

**After (fixed by composition + delegation):**

```java
class Stack<E> {
    private final List<E> items = new ArrayList<>();   // HAS-A list (hidden)

    public void push(E e) { items.add(e); }
    public E pop()        { return items.remove(items.size() - 1); }
    public E peek()       { return items.get(items.size() - 1); }
    public boolean isEmpty() { return items.isEmpty(); }
    public int size()        { return items.size(); }
}
```

Now the `Stack` exposes **only** stack operations. The `ArrayList` is an encapsulated
implementation detail. This is textbook "favor composition over inheritance".

### 4.2 Smell #2 — `Penguin extends Bird` (false is-a / LSP violation)

**Before (LSP violation, from §3.3):** flying was baked into `Bird`, so `Penguin` had to throw.

**After (make the varying behavior a component):**

```java
// The behavior that varies becomes a plug-in component.
interface MoveBehavior { String move(); }

class FlyMove  implements MoveBehavior { public String move(){ return "Flying."; } }
class WalkMove implements MoveBehavior { public String move(){ return "Walking."; } }
class SwimMove implements MoveBehavior { public String move(){ return "Swimming."; } }

class Bird {
    private final String name;
    private final MoveBehavior moveBehavior;      // HAS-A movement (composition)

    Bird(String name, MoveBehavior moveBehavior) {
        this.name = name;
        this.moveBehavior = moveBehavior;
    }
    String move() { return name + ": " + moveBehavior.move(); }   // delegation
}

// Assembly:
Bird eagle   = new Bird("Eagle",   new FlyMove());    // Eagle: Flying.
Bird penguin = new Bird("Penguin", new SwimMove());   // Penguin: Swimming.  <-- no exception!
```

No subclass ever needs to lie by throwing `UnsupportedOperationException`. Every `Bird` is now
fully substitutable (LSP holds), and we can add `HopMove`, `GlideMove`, etc. without touching
existing classes.

### 4.3 The refactoring recipe (memorize this)

```
1. Spot the smell:
     - a subclass that overrides methods to disable/throw  (LSP break), or
     - inheritance used only to reuse code (gorilla/banana), or
     - a base class you're afraid to change (fragile base).
2. Identify the reused/variable behavior.
3. Extract that behavior into its own class (and, if it varies, behind an interface).
4. In the former subclass, replace 'extends X' with a private FIELD of type X (or the interface).
5. Delegate the relevant methods to that field.
6. Inject the collaborator via the constructor (or setter) so it can be swapped/tested.
7. Re-run the tests: behavior preserved, unwanted API gone, LSP restored.
```

---

## 5. Guided in-class practice: refactor the payroll smell

### 5.1 The starting (smelly) design

A payroll module was written like this:

```java
class User {
    protected String name;
    protected double baseSalary;
    User(String name, double baseSalary) { this.name = name; this.baseSalary = baseSalary; }
    double monthlyPay() { return baseSalary; }
    void login() { System.out.println(name + " logged in."); }
}

// "An admin is a user with a bonus" -> inheritance was used for a small difference.
class AdminUser extends User {
    AdminUser(String name, double baseSalary) { super(name, baseSalary); }
    @Override double monthlyPay() { return baseSalary * 1.20; }   // +20% bonus
}

// Then someone needed to pay ROBOTS, which are NOT users and cannot log in...
class Robot extends User {                 // <-- false is-a!
    Robot(String name, double baseSalary) { super(name, baseSalary); }
    @Override void login() {
        throw new UnsupportedOperationException("Robots don't log in.");  // LSP VIOLATION
    }
}
```

### 5.2 Your tasks (in pairs)

1. **Diagnose.** Name every problem you see: which class violates LSP? Where is inheritance used
   merely for code reuse? Which behavior actually varies?
2. **Design.** Sketch a composition-based UML in which:
   - the *pay calculation* becomes a plug-in component (a `PaymentPolicy` interface with
     `Standard` and `AdminBonus` implementations), and
   - the *ability to log in* is modeled as an optional capability, **not** forced onto everything
     that gets paid.
3. **Refactor.** Implement a `Payee` (has a `name` and a `PaymentPolicy`, delegates `monthlyPay()`)
   and keep `login()` only where it belongs (e.g., a separate `Account`/`LoginCapable` type). A
   `Robot` should be payable *without* ever pretending to log in.
4. **Verify.** Show that (a) admins are paid +20% via an injected policy, (b) robots are paid but
   have no `login()` to violate, and (c) you can add a new policy (e.g., `NightShiftPolicy`)
   without editing existing classes.

**Target skeleton:**
```java
interface PaymentPolicy { double computePay(double base); }
class StandardPolicy   implements PaymentPolicy { public double computePay(double b){ return b; } }
class AdminBonusPolicy implements PaymentPolicy { public double computePay(double b){ return b * 1.20; } }

class Payee {
    private final String name;
    private final double base;
    private final PaymentPolicy policy;                 // HAS-A pay policy (injected)
    Payee(String name, double base, PaymentPolicy policy) { /* ... */ }
    double monthlyPay() { return policy.computePay(base); }   // delegation
}
```

### 5.3 Reflection prompts
- Which of the six inheritance costs (§3.2) did the original design suffer from?
- Why is injecting `PaymentPolicy` better for **testing** than overriding `monthlyPay()`?
- When, if ever, would inheritance have been acceptable here?

---

## 6. Decision checklist (keep this on your desk)

Use inheritance **only** when *all* of these are true:
- [ ] The relationship is a genuine, permanent **"is-a"**.
- [ ] The subclass is **substitutable** everywhere the superclass is used (**LSP holds**).
- [ ] You want to inherit the parent's **entire** public contract, not just a slice.
- [ ] The base class is **stable** (you are not afraid to change it).

Otherwise, **compose**: hold the collaborator as a field, delegate to it, and inject it.

---

## 7. Wrap-up and exit ticket

### Key takeaways
- Inheritance is powerful but costly: tight coupling, fragile base class, rigidity, and LSP traps.
- **"Favor composition over inheritance"**: default to has-a; inherit only for true, substitutable
  is-a relationships.
- The **LSP** is your litmus test — if substituting a subclass breaks callers, don't inherit.
- Refactoring inheritance → composition follows a repeatable recipe: extract behavior, add a
  field, delegate, inject, re-test.

### Exit ticket (hand in before leaving — 5 minutes)
1. State the "favor composition over inheritance" guideline in your own words, and one reason
   behind it.
2. Give one concrete symptom that signals inheritance is being misused.
3. In the `Stack extends ArrayList` case, *what specifically* went wrong, and how did composition
   fix it?
4. Write the LSP in one sentence and give a one-line example of a violation.

> **Next:** consolidate with the [optional GitHub activity](../optional-activity/README.md) and
> review the [readings](../material/README.md) before the end-of-unit quiz (Corte 2).
