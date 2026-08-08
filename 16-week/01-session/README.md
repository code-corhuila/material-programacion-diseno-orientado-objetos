# Week 16 - Session 1: Consolidation and project presentations

> **Subject:** Object-Oriented Programming and Design - 2026-B
> **Unit 3:** Practical application of OOP in Java
> **Assessment period:** Corte 3
> **RAA:** 90_82759

---

## 1. Session objective

Consolidate the whole course into a single mental model (the four OOP pillars + good practices as an **assessment lens**), and run the **final project defenses** so that each student presents working Java code, justifies design decisions, and receives **structured peer feedback (co-evaluation)**.

By the end of the session the student will be able to:
- Locate, in their own code, concrete evidence of abstraction, encapsulation, inheritance and polymorphism.
- Deliver a 10-12 minute technical defense with a live demo.
- Score a peer's project with the co-evaluation rubric, producing specific, actionable comments.

---

## 2. Timed agenda (110 minutes)

| Time | Activity |
|---|---|
| 0:00-0:10 | Welcome, goals of the closing week, how corte 3 is scored. |
| 0:10-0:30 | **Consolidation:** course synthesis map (Units 1-3) and the four pillars as an assessment lens. |
| 0:30-0:45 | The good-practices checklist and what "good evidence" looks like in code. |
| 0:45-0:55 | How the defense works; the co-evaluation rubric walk-through. |
| 0:55-1:40 | **Project presentations / defenses** (rotating; ~12 min each incl. Q&A). |
| 1:40-1:48 | Guided practice: everyone completes a co-evaluation form for the presentations seen. |
| 1:48-1:50 | Wrap-up and exit ticket. |

*(Presentation slots continue in the scheduled block; if the cohort is large, defenses span both sessions with reflection interleaved.)*

---

## 3. Theory notes

### 3.1 Consolidation: the course as one story

The three units form a progression from *ideas* to *working software*:

```
UNIT 1                     UNIT 2                        UNIT 3
Fundamentals of OOP   -->  Design with classes      -->  Practical application
- objects & classes        - relationships (assoc.,      in Java
- the four pillars           aggregation, composition)   - full programs
- Java syntax basics       - abstraction & interfaces    - exceptions, collections
                           - UML class diagrams          - testing, packaging
                           - responsibility assignment   - version control (Git)

        \___________________________|___________________________/
                                     |
                          FINAL PROJECT (defended in Week 16)
                                     |
                              RAA 90_82759
```

The final project is where all of this converges. Your defense should tell that same story: *"here is the problem, here is the design, here is the code that realizes it, and here is why it is good."*

### 3.2 The four pillars as an assessment lens

During the defense you are not asked to *define* the pillars — you are asked to **show them in your code**. This table describes what strong evidence looks like.

| Pillar | The idea | Strong evidence in code | Weak / missing |
|---|---|---|---|
| **Abstraction** | Expose *what*, hide *how*. | An `interface` or `abstract class` with a clear contract that clients depend on. | Everything concrete; no contracts; clients reach into internals. |
| **Encapsulation** | Protect state; control access. | `private` fields, validated setters/constructors, invariants enforced inside the class. | Public mutable fields; no validation; broken invariants. |
| **Inheritance** | Reuse and specialize a genuine "is-a". | A subclass that overrides/extends behavior meaningfully; base class not instantiated directly when abstract. | Inheritance used only to share code that has no "is-a" relationship (should be composition). |
| **Polymorphism** | One reference, many behaviors. | Client code calls a method on a supertype/interface and the correct override runs (dynamic dispatch). | `if (obj instanceof X) ... else if (obj instanceof Y)` chains that a polymorphic call would remove. |

### 3.3 Good-practices checklist (defense-ready)

```
[ ] Naming        Classes are nouns; methods are verbs; names reveal intent.
[ ] Cohesion      Each class has one clear responsibility.
[ ] Coupling      Classes depend on abstractions, not on each other's internals.
[ ] Encapsulation Fields private; access controlled; invariants protected.
[ ] Exceptions    Invalid states raise exceptions; no silent failures.
[ ] Testing       At least the core logic has unit tests that pass.
[ ] Docs          A README explains how to build/run; key classes are commented.
[ ] Version ctrl  Git history shows incremental, meaningful commits.
```

### 3.4 Anatomy of a 10-12 minute defense

```
1. Problem & scope          (1 min)  What does the app do and for whom?
2. Design overview          (2 min)  Class diagram; key relationships.
3. Pillars walk-through     (4 min)  Show the FOUR pillars in real code.
4. Good practices           (2 min)  Point to tests, exceptions, naming, Git.
5. Live demo                (2 min)  Run it; show the happy path + one error case.
6. Reflection & Q&A         (1-2 min) One trade-off you'd revisit; answer questions.
```

---

## 4. Fully worked example

Below is a compact but complete example that a student could use as a **model** of how to *show* all four pillars and good practices in a defense. Domain: a tiny **payroll** module.

### 4.1 The code (evidence of all four pillars)

```java
// ---------- ABSTRACTION: a contract, not an implementation ----------
public interface Payable {
    /** Gross monthly pay in COP. Must never be negative. */
    double monthlyGrossPay();
}

// ---------- ENCAPSULATION + base for INHERITANCE ----------
public abstract class Employee implements Payable {
    private final String name;          // private: state is protected
    private final String documentId;

    protected Employee(String name, String documentId) {
        if (name == null || name.isBlank())
            throw new IllegalArgumentException("name is required"); // invariant
        if (documentId == null || documentId.isBlank())
            throw new IllegalArgumentException("documentId is required");
        this.name = name;
        this.documentId = documentId;
    }

    public String getName() { return name; }          // controlled access
    public String getDocumentId() { return documentId; }

    // Subclasses MUST define how they are paid -> abstraction + polymorphism
    @Override
    public abstract double monthlyGrossPay();
}

// ---------- INHERITANCE + POLYMORPHISM (override) ----------
public class SalariedEmployee extends Employee {
    private final double monthlySalary;

    public SalariedEmployee(String name, String documentId, double monthlySalary) {
        super(name, documentId);
        if (monthlySalary < 0)
            throw new IllegalArgumentException("salary cannot be negative");
        this.monthlySalary = monthlySalary;
    }

    @Override
    public double monthlyGrossPay() { return monthlySalary; }
}

public class HourlyEmployee extends Employee {
    private final double hourlyRate;
    private final double hoursWorked;

    public HourlyEmployee(String name, String documentId,
                          double hourlyRate, double hoursWorked) {
        super(name, documentId);
        if (hourlyRate < 0 || hoursWorked < 0)
            throw new IllegalArgumentException("rate/hours cannot be negative");
        this.hourlyRate = hourlyRate;
        this.hoursWorked = hoursWorked;
    }

    @Override
    public double monthlyGrossPay() { return hourlyRate * hoursWorked; }
}

// ---------- CLIENT uses POLYMORPHISM (no instanceof chains) ----------
import java.util.List;

public class Payroll {
    /** Total gross pay for any mix of employee types. */
    public double totalGrossPay(List<Payable> employees) {
        double total = 0;
        for (Payable p : employees) {     // dynamic dispatch does the work
            total += p.monthlyGrossPay();
        }
        return total;
    }
}
```

### 4.2 How this maps to the assessment lens

| Requirement | Where it is evidenced |
|---|---|
| Abstraction | `Payable` interface + `abstract class Employee` define a contract. |
| Encapsulation | `private final` fields, validation in constructors, getters only. |
| Inheritance | `SalariedEmployee` / `HourlyEmployee` `extends Employee`. |
| Polymorphism | `Payroll.totalGrossPay` calls `monthlyGrossPay()` on `Payable`; the correct override runs. |
| Good practice: exceptions | Invalid arguments throw `IllegalArgumentException`. |
| Good practice: naming | Class = noun, method = verb-phrase revealing intent. |
| Good practice: low coupling | `Payroll` depends on `Payable`, not on concrete classes. |

### 4.3 A minimal test (good practice: testing)

```java
import org.junit.jupiter.api.Test;
import java.util.List;
import static org.junit.jupiter.api.Assertions.*;

class PayrollTest {

    @Test
    void totalMixesSalariedAndHourly() {
        var payroll = new Payroll();
        double total = payroll.totalGrossPay(List.of(
            new SalariedEmployee("Ana", "1001", 3_000_000),
            new HourlyEmployee("Luis", "1002", 20_000, 100) // 2,000,000
        ));
        assertEquals(5_000_000, total, 0.001);
    }

    @Test
    void negativeSalaryIsRejected() {
        assertThrows(IllegalArgumentException.class,
            () -> new SalariedEmployee("X", "9", -1));
    }
}
```

**How you would present this in 30 seconds:** *"`Payroll` never asks what kind of employee it has. It depends on the `Payable` abstraction; encapsulation guarantees no employee can exist in an invalid state; inheritance lets me add a new employee type without touching `Payroll`; and the test proves the polymorphic sum is correct."*

---

## 5. Guided in-class practice

Work in the same rotation as the defenses. Two parts.

### Part A — "Find the pillars" (in pairs, 10 min)
Take the payroll example above (or your own project) and, on paper or a shared doc, write **one sentence per pillar** naming the exact class/method that evidences it. Then identify **one good practice that is missing** and how you would add it (e.g., "add a test for `HourlyEmployee` with zero hours").

### Part B — Live co-evaluation (during each defense)
While each classmate defends, complete the co-evaluation form below. Score each criterion 1-4 and write at least one **specific, actionable** comment.

**Co-evaluation rubric (per project, 1 = Insufficient, 2 = In progress, 3 = Competent, 4 = Excellent)**

| Criterion | 1 | 2 | 3 | 4 | Score | Comment |
|---|---|---|---|---|---|---|
| Four pillars evidenced in code | | | | | | |
| Good practices (naming, exceptions, tests, Git) | | | | | | |
| Design clarity (cohesion, coupling, diagram) | | | | | | |
| Working demo (runs; handles an error case) | | | | | | |
| Communication (clear, justified decisions, Q&A) | | | | | | |

**Rules for good feedback (the "SBI + suggestion" pattern):**
- **Situation:** where you observed it ("in the `Order` class...").
- **Behavior/observation:** what you saw ("...fields are `public`...").
- **Impact:** why it matters ("...so any code can break the total.").
- **Suggestion:** what to try ("make them `private` and validate in the constructor.").

Avoid vague praise ("nice work") and personal remarks; comment on the **artifact**, not the person.

---

## 6. Wrap-up and exit ticket

**Wrap-up (2 min):** Restate the key idea — in a strong OOP project the four pillars are not decorations, they *earn their place* by making the code easier to change and harder to break. Your defense should show exactly that.

**Exit ticket (hand in before leaving):**
1. Name the **one class/method in your project** where polymorphism does the most work, and say what `if/else` chain it removes.
2. Name **one good practice** you will add to your project before final submission.
3. From the co-evaluations you completed, write **one comment you received or gave** that you found most useful, and why.

---

*Next: `02-session/README.md` — reflective assessment and portfolio.*
