# Week 10 — Session 2: Feedback and Guided Remediation

**Course:** Object-Oriented Programming and Design — CORHUILA, 2026-B
**Unit:** Unit 2 — Design principles and modularity
**Session:** 2 of 2 · Duration: 120 minutes · Modality: In-class, collaborative
**RAA:** `90_82759`

---

## 1. Session objective

Students will **interpret rubric-based feedback** on their partial exam, **diagnose concrete design flaws** in a class model, and **refactor** a flawed hierarchy into a corrected version using named refactoring moves — then reflect on the improvement and its trade-off. This session is formative: its value is in closing the loop between critique and correction.

By the end, each student will have (a) mapped at least three flaws to the principles they violate, (b) applied at least one refactoring, and (c) written a short remediation reflection (the graded formative deliverable of the week).

---

## 2. Timed agenda (120 minutes)

| Time | Segment | Activity |
|---|---|---|
| 0:00 – 0:10 | Return & orient | Exams returned with rubric annotations; explain the feedback legend |
| 0:10 – 0:35 | Theory: reading critique + the smell catalogue | Design smells and the refactoring toolkit (below) |
| 0:35 – 1:00 | Worked example | Instructor diagnoses and refactors a flawed model live |
| 1:00 – 1:40 | Guided practice | Students remediate their own (or a provided) flawed model |
| 1:40 – 1:55 | Peer review | Pairs exchange refactors, apply the diagnostic checklist |
| 1:55 – 2:10 | Wrap-up & exit ticket | Remediation reflection submitted; close Corte 2 |

> The agenda runs to 130 minutes on paper to give a 10-minute buffer; the instructor compresses peer review if the exam return runs long.

---

## 3. Theory notes — turning feedback into design improvement

### 3.1 A rubric is a diagnostic instrument, not a verdict

A grade tells you *how much*; a rubric tells you *what* and *where*. Read each rubric line as a pointer to a specific principle. The productive question is never "why did I lose points?" but "**which principle does this line say I violated, and what is the canonical fix?**"

The feedback legend used on returned exams:

```
[LSP]  Substitutability broken — a subtype surprises callers.
[SRP]  This class has more than one reason to change.
[DIP]  Depends on a concrete type where it should depend on an abstraction.
[C>I]  Inheritance used where composition was the honest relationship.
[RB]   Refused bequest — inherited member is unwanted/empty.
[GOD]  God class — too many responsibilities collected in one type.
```

### 3.2 The design-smell catalogue

A *design smell* is a surface symptom of a deeper structural problem. Learn to name them; naming is the first step of remediation.

| Smell | Symptom | Underlying violation | Canonical fix |
|---|---|---|---|
| **Refused bequest** | Subclass overrides an inherited method to throw `UnsupportedOperationException` or leaves it empty | LSP, misused inheritance | Replace inheritance with delegation; extract a narrower interface |
| **God class** | One class with dozens of fields/methods and mixed concerns | SRP | Extract classes by responsibility |
| **Yo-yo problem** | Understanding one behavior requires jumping up/down many inheritance levels | Over-deep hierarchy | Flatten hierarchy; favor composition |
| **Tight coupling to concretes** | `new ConcreteThing()` scattered through high-level code | DIP | Depend on an interface; inject the dependency |
| **Inappropriate intimacy** | A class reaches into another's private-ish internals | Encapsulation | Move method / hide delegate |
| **Duplicated abstraction** | The same capability re-declared across unrelated subclasses | Missing interface | Extract interface |
| **Speculative generality** | Abstract classes and hooks nobody uses | YAGNI | Collapse to the concrete need |

### 3.3 The refactoring toolkit (named moves)

Refactoring is behavior-preserving restructuring. Under exam-remediation conditions, these four moves cover most cases:

**1. Extract Interface.** When several classes share a capability but should not share an implementation line, pull the capability into an interface.

```
BEFORE                                AFTER
abstract Report                       interface Exportable { export(): void }
 ├ export()                           class PdfReport implements Exportable
 ├ PdfReport                          class CsvReport implements Exportable
 └ CsvReport                          (no forced shared base)
```

**2. Replace Inheritance with Delegation.** When a subclass fails Liskov or refuses part of its bequest, make the relationship has-a and forward the calls you actually want.

```
BEFORE:  class Stack extends ArrayList { ... }      // exposes insert(i, x) — LIFO broken
AFTER:   class Stack {
             private final List<T> items = new ArrayList<>();  // has-a
             void push(T x) { items.add(x); }
             T pop()        { return items.remove(items.size() - 1); }
         }                                                     // only LIFO is exposed
```

**3. Pull Up Member.** When two sibling subclasses duplicate the same field or method, move it up into the shared superclass.

**4. Push Down Member.** When a member in the superclass is only relevant to one subclass (a sign the base is doing too much), move it down to that subclass.

### 3.4 How to structure a remediation

```
1. LOCATE   — quote the rubric line and the offending code/edge.
2. NAME     — which smell? which principle does it violate?
3. CHOOSE   — which refactoring move applies?
4. APPLY    — perform the move; keep behavior the same.
5. REFLECT  — what improved? what trade-off did the move introduce?
```

Step 5 matters: every refactoring buys something and costs something. Composition, for instance, gains flexibility but adds forwarding boilerplate. A mature designer states the cost, not just the win.

---

## 4. Fully worked example (instructor-led diagnosis and refactor)

### 4.1 The flawed model (as submitted on a hypothetical exam)

A student modeled a payroll system like this:

```java
// FLAWED — do not imitate
class Employee {
    String name;
    double baseSalary;
    String[] menuPermissions;          // UI concern in a domain class
    void computePay() { /* ... */ }
    void renderPayslipHtml() { /* ... */ }   // presentation concern
    void saveToDatabase() { /* ... */ }      // persistence concern
}

class Manager extends Employee {
    void computePay() { /* base + bonus */ }
}

class Contractor extends Employee {
    // Contractors have no base salary and no menu permissions.
    @Override
    void computePay() { /* hourly only */ }
    // Inherited baseSalary and menuPermissions are meaningless here.
}

class Intern extends Contractor {
    // Interns are unpaid.
    @Override
    void computePay() {
        throw new UnsupportedOperationException("Interns are not paid");
    }
}
```

### 4.2 Diagnosis (apply §3.4 steps 1–2)

| # | Location | Smell | Principle | Legend |
|---|---|---|---|---|
| 1 | `Employee` holds pay logic **and** HTML rendering **and** DB saving | God class | SRP | `[GOD]` `[SRP]` |
| 2 | `Contractor` inherits `baseSalary` and `menuPermissions` it never uses | Refused bequest | LSP / misused inheritance | `[RB]` `[C>I]` |
| 3 | `Intern extends Contractor` but throws on `computePay()` | Refused bequest / broken substitutability | LSP | `[LSP]` `[RB]` |
| 4 | Deep chain `Intern → Contractor → Employee` to understand pay | Yo-yo problem | over-deep hierarchy | `[LSP]` |

### 4.3 The refactor (apply §3.4 steps 3–4)

**Move 1 — Extract responsibilities out of the God class (SRP).** Presentation and persistence leave the domain model.

**Move 2 — Replace the inheritance chain with an interface for the varying behavior (C>I, LSP).** "How pay is computed" is the thing that varies, so make it a strategy the employee *has*, not a subclass it *is*.

```java
// CORRECTED

// The domain type: one responsibility — represent an employee and its pay policy.
class Employee {
    private final String name;
    private final PayPolicy payPolicy;      // composition: has-a strategy

    Employee(String name, PayPolicy payPolicy) {
        this.name = name;
        this.payPolicy = payPolicy;
    }

    double computePay() { return payPolicy.computePay(); }   // delegation
    String getName()    { return name; }
}

// The varying behavior, as an abstraction (DIP): high-level Employee
// depends on this interface, not on concrete pay rules.
interface PayPolicy {
    double computePay();
}

class SalariedPolicy implements PayPolicy {
    private final double baseSalary, bonus;
    SalariedPolicy(double baseSalary, double bonus) {
        this.baseSalary = baseSalary; this.bonus = bonus;
    }
    public double computePay() { return baseSalary + bonus; }
}

class HourlyPolicy implements PayPolicy {
    private final double rate, hours;
    HourlyPolicy(double rate, double hours) { this.rate = rate; this.hours = hours; }
    public double computePay() { return rate * hours; }
}

class UnpaidPolicy implements PayPolicy {
    public double computePay() { return 0.0; }   // honest, not an exception
}

// Presentation and persistence become separate, single-responsibility types.
class PayslipRenderer { String toHtml(Employee e) { /* ... */ return ""; } }
class EmployeeRepository { void save(Employee e) { /* ... */ } }
```

Now every construction is honest and substitutable:

```java
Employee manager    = new Employee("Ada",  new SalariedPolicy(5000, 800));
Employee contractor = new Employee("Ben",  new HourlyPolicy(40, 160));
Employee intern     = new Employee("Cira", new UnpaidPolicy());
// No refused bequest, no throw, no God class, no deep chain.
```

### 4.4 Reflection (apply §3.4 step 5 — model answer)

> **What improved.** Substitutability is restored: every `Employee` truly computes pay, including the unpaid intern (returns 0 instead of throwing). Responsibilities are separated — the domain class no longer renders HTML or touches the database (SRP), and `Employee` now depends on the `PayPolicy` abstraction rather than concrete rules (DIP). Pay policy is swappable at runtime.
>
> **The trade-off.** The refactor introduces more small types (three policy classes plus a renderer and repository) and a little forwarding indirection. For a two-employee toy this is arguably over-engineered; the design pays off only as pay rules and employee kinds multiply. The honest cost is *more files and one level of indirection* in exchange for flexibility and testability.

---

## 5. Guided in-class practice (1:00–1:40)

Work on **your own returned exam** if it had flaws; otherwise use the provided flawed model below.

> **Provided flawed model (fallback):**
> ```java
> class Bird {
>     void fly() { /* ... */ }
>     void layEgg() { /* ... */ }
> }
> class Penguin extends Bird {
>     @Override void fly() {
>         throw new UnsupportedOperationException("Penguins can't fly");
>     }
> }
> ```

Produce, in writing:
1. A **diagnosis table** (location → smell → principle → legend), at least three rows if using your own model; at least one for the penguin case.
2. A **refactored** version. (For the penguin: separate `fly()` into a `Flying` capability interface that only flying birds implement; `Penguin` implements a `Swimming` capability instead. `layEgg()` stays in `Bird`.)
3. A one-paragraph **reflection** with one improvement and one trade-off.

The instructor circulates, checking that each diagnosis *names the principle*, not just the symptom.

---

## 6. Peer review (1:40–1:55)

Exchange refactors with a partner. Each reviewer applies this checklist to the partner's corrected model:

- [ ] Does every subtype pass the Liskov test (no throws, no empty overrides for expected behavior)?
- [ ] Does each class have a single, stateable responsibility?
- [ ] Is every inheritance edge a true is-a? Any that should be has-a?
- [ ] Do high-level classes depend on abstractions rather than concretes?
- [ ] Is the reflection honest about the trade-off?

Give one concrete strength and one concrete suggestion. Peer feedback is verbal; no grade attached.

---

## 7. Wrap-up, exit ticket, and Corte 2 close (1:55–2:10)

**Submit the remediation reflection** (the graded formative deliverable). It must contain:
1. A diagnosis table with at least three flaw→principle mappings.
2. The refactored code or model.
3. A reflection paragraph naming one improvement and one trade-off.

**Exit ticket (formative, ungraded):**
1. Which refactoring move did you use, and why that one?
2. State one design rule you will apply differently on the next assignment.
3. Rate your confidence (1–5) on choosing inheritance vs. composition now, versus before Week 10.

**Remediation reflection rubric:**

| Criterion | Full | Partial | None |
|---|---|---|---|
| Diagnosis accuracy | 3+ flaws each mapped to the correct principle | Some flaws mislabeled | Symptoms listed without principles |
| Refactoring correctness | Behavior-preserving, resolves the flaw | Partially resolves or introduces a new flaw | No real change |
| Reflection depth | Names a concrete improvement **and** an honest trade-off | Only the improvement | Vague or missing |

> **Corte 2 closes here.** With the partial exam (Session 1) and the remediation reflection (Session 2) submitted, the second grading period's design assessment is complete. Optional extension work is available in [`optional-activity/README.md`](../optional-activity/README.md).

---

*Previous: [Session 1 — Exam readiness recap and the partial exam](../01-session/README.md).*
