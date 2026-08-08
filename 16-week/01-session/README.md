# Week 16 - Session 1: Final project presentations & co-evaluation

**Subject:** Object-Oriented Programming and Design - 2026-B
**Unit 3:** Practical application of OOP in Java · **Corte 3**
**RAA:** 90_82759
**Duration:** 2 hours (120 min)

---

## 1. Session objective

Students **demonstrate** their final Java project — explicitly locating the four OOP pillars and good design practices in real code — and **conduct structured peer review** of classmates' work using a shared co-evaluation rubric. By the end of the session each student will have presented (as a team) and produced at least two rubric-based peer reviews.

This maps to weekly objectives **1, 2 and 5** and to RAA 90_82759 (implement, communicate and evaluate object-oriented solutions).

---

## 2. Timed agenda

| Time | Block | Activity |
|------|-------|----------|
| 0:00-0:10 | Framing | Ground rules for demos and for giving feedback; how the rubrics work |
| 0:10-0:25 | Consolidation | Mini-review of the four pillars via one worked example (below) |
| 0:25-1:25 | Presentations | Teams present in rotation, ~12 min each (8 present + ~4 Q&A/feedback) |
| 1:25-1:50 | Co-evaluation | Silent, individual rubric-based peer-review writing |
| 1:50-2:00 | Wrap-up | Synthesis + exit ticket |

> Scale the number of presentation slots to class size. With many teams, run two parallel rooms or split presentations across both sessions and move part of the reflection work to homework.

---

## 3. Theory notes: consolidation of OOP for the demo

The purpose of this block is not to teach new material but to give students a **shared checklist and vocabulary** so both presenters and reviewers can point precisely at the pillars in code.

### 3.1 The four pillars, restated for demonstration

- **Abstraction** — *"What does this type promise, ignoring how?"* Look for `abstract class` / `interface`, method names that describe intent, and models that omit irrelevant detail. In a demo, abstraction is visible when the presenter can describe a class by its responsibility in one sentence without mentioning implementation.

- **Encapsulation** — *"Who is allowed to touch this state, and under what rules?"* Look for `private` fields, controlled mutation through methods that protect invariants (not just trivial getters/setters), and validation inside constructors/setters. A telling demo sign: the object cannot be put into an invalid state from outside.

- **Inheritance** — *"Is this an 'is-a' relationship, and is behaviour genuinely reused/specialised?"* Look for `extends`, `super(...)`, and overridden methods (`@Override`). Warning sign to discuss: inheritance used only to share code where composition would be cleaner.

- **Polymorphism** — *"Can I call the same method on different types and get correct, type-specific behaviour?"* Look for a loop or method that operates over a supertype/interface reference while the concrete type varies at runtime.

### 3.2 How the pillars interlock (text diagram)

```
                    +---------------------------+
                    |        ABSTRACTION        |
                    |  (define the contract:    |
                    |   interface / abstract)   |
                    +------------+--------------+
                                 |  enables
                 +---------------+----------------+
                 |                                |
        +--------v---------+            +---------v----------+
        |   INHERITANCE    |            |   POLYMORPHISM     |
        | (specialise the  |  supports  | (one call ->       |
        |  contract via    +----------->|  many runtime      |
        |  extends/@Override|           |  behaviours)       |
        +--------+---------+            +---------+----------+
                 |                                |
                 |  both rely on                  |
        +--------v--------------------------------v----------+
        |                 ENCAPSULATION                      |
        |   (each type guards its own state & invariants)    |
        +----------------------------------------------------+
```

### 3.3 Good-design vocabulary reviewers should use

- **High cohesion / low coupling.** Does each class do one thing? Do classes depend on abstractions rather than concretions?
- **Single Responsibility.** Can you state each class's single reason to change?
- **Clear naming and small methods.** Do names reveal intent? Are methods short enough to read at a glance?
- **Error handling.** Are exceptions used deliberately, not swallowed?

---

## 4. Fully worked example: locating the four pillars in one small system

Below is a compact, self-contained **payment-processing** example. It is deliberately small so the whole class can read it and rehearse *pointing at the pillars* — the exact skill needed for a good presentation and a good review.

### 4.1 The code

```java
// ---------- ABSTRACTION ----------
// PaymentMethod defines WHAT every payment can do, not HOW.
public interface PaymentMethod {
    // Returns a human-readable confirmation; throws if the payment cannot proceed.
    String pay(double amount);
    String label();
}

// ---------- ABSTRACTION + INHERITANCE (shared base) ----------
public abstract class CardPayment implements PaymentMethod {

    // ---------- ENCAPSULATION ----------
    private final String cardHolder;
    private final String maskedNumber;   // only last 4 digits kept

    protected CardPayment(String cardHolder, String fullNumber) {
        if (cardHolder == null || cardHolder.isBlank())
            throw new IllegalArgumentException("Card holder is required");
        if (fullNumber == null || fullNumber.length() < 4)
            throw new IllegalArgumentException("Invalid card number");
        this.cardHolder = cardHolder;
        this.maskedNumber = "**** **** **** " + fullNumber.substring(fullNumber.length() - 4);
    }

    // Controlled, read-only access to protected state.
    protected String cardHolder() { return cardHolder; }
    public String maskedNumber()  { return maskedNumber; }

    // Common validation reused by every card subtype (inheritance of behaviour).
    protected void validateAmount(double amount) {
        if (amount <= 0) throw new IllegalArgumentException("Amount must be positive");
    }
}

// ---------- INHERITANCE + POLYMORPHISM ----------
public class CreditCardPayment extends CardPayment {
    private final double creditLimit;

    public CreditCardPayment(String holder, String number, double creditLimit) {
        super(holder, number);              // reuse base construction/validation
        this.creditLimit = creditLimit;
    }

    @Override
    public String pay(double amount) {      // specialised behaviour
        validateAmount(amount);
        if (amount > creditLimit)
            throw new IllegalStateException("Amount exceeds credit limit");
        return "Charged " + amount + " to credit card " + maskedNumber();
    }

    @Override
    public String label() { return "Credit card (" + cardHolder() + ")"; }
}

public class DebitCardPayment extends CardPayment {
    private double balance;                  // encapsulated, mutable, guarded

    public DebitCardPayment(String holder, String number, double openingBalance) {
        super(holder, number);
        if (openingBalance < 0) throw new IllegalArgumentException("Balance cannot be negative");
        this.balance = openingBalance;
    }

    @Override
    public String pay(double amount) {      // different specialised behaviour
        validateAmount(amount);
        if (amount > balance)
            throw new IllegalStateException("Insufficient funds");
        balance -= amount;                  // invariant preserved: balance >= 0
        return "Debited " + amount + "; remaining balance " + balance;
    }

    @Override
    public String label() { return "Debit card (" + cardHolder() + ")"; }
}

// ---------- POLYMORPHISM IN USE ----------
public class Checkout {
    // Depends on the ABSTRACTION, not on any concrete card -> low coupling.
    public void process(java.util.List<PaymentMethod> methods, double amount) {
        for (PaymentMethod m : methods) {          // same call...
            try {
                System.out.println(m.label() + " -> " + m.pay(amount)); // ...many behaviours
            } catch (RuntimeException ex) {
                System.out.println(m.label() + " -> FAILED: " + ex.getMessage());
            }
        }
    }
}
```

### 4.2 Reading the pillars out loud (the presentation skill)

| Pillar | Where | One-sentence justification a presenter should give |
|--------|-------|----------------------------------------------------|
| Abstraction | `interface PaymentMethod` | "Callers depend only on `pay`/`label`; they never need to know it is a credit or debit card." |
| Encapsulation | `private` fields + `maskedNumber`, guarded `balance` | "The full card number never leaves the object, and `balance` can never go negative because mutation is controlled." |
| Inheritance | `CardPayment` + `extends` + `super(...)` | "Both card types reuse holder validation and amount checking from a common base." |
| Polymorphism | `Checkout.process` loop over `PaymentMethod` | "The same `m.pay(amount)` call runs credit-limit logic or balance logic depending on the runtime type." |

### 4.3 A design critique to model for reviewers

Even good code invites critique — model it:

- **Strength:** `Checkout` depends on the interface, so adding `WalletPayment` needs no change to `Checkout` (open for extension). 
- **Improvement:** `pay` returning a `String` mixes result and presentation; a richer `PaymentResult` type would separate concerns.
- **Question:** "How would you test `DebitCardPayment` to prove the balance invariant holds after a failed payment?"

This "strength / improvement / question" shape is exactly the structure students must reproduce in co-evaluation.

---

## 5. Guided in-class practice

**Part A — Pillar-spotting drill (during presentations, ~throughout the 60-min block).**
As each team presents, every student fills a quick capture grid for that project:

```
Project: ____________________   Reviewer: ____________________
Abstraction  : evidence -> ______________________________________
Encapsulation: evidence -> ______________________________________
Inheritance  : evidence -> ______________________________________
Polymorphism : evidence -> ______________________________________
Design note  : cohesion/coupling/naming observation -> ___________
```

**Part B — Structured co-evaluation writing (1:25-1:50).**
Each student writes **two** complete peer reviews (choose two teams other than their own) using the rubric in section 6. A complete review contains:

1. **One strength** — specific and tied to observed evidence.
2. **One concrete improvement** — actionable, not "make it better".
3. **One clarifying question** — something you genuinely could not tell from the demo.
4. **Rubric scores** — one level per criterion.

**Facilitation tips for the instructor:**
- Enforce a hard time-box per team so all teams present.
- Require presenters to *name the pillar and point at the line*, not just describe features.
- Keep feedback about the artefact ("the `Order` class has two responsibilities"), never the person.
- Collect capture grids and reviews as evidence for the co-evaluation grade.

---

## 6. Co-evaluation rubric

Reviewers assign one level per criterion. Levels: **4 Excellent · 3 Proficient · 2 Developing · 1 Beginning.**

| Criterion | 4 Excellent | 3 Proficient | 2 Developing | 1 Beginning |
|-----------|-------------|--------------|--------------|-------------|
| **Four pillars demonstrated** | All four shown in real code with clear justification | All four present, justification mostly clear | 2-3 shown or weakly justified | Pillars asserted but not located in code |
| **Design quality** | High cohesion, low coupling, clear responsibilities | Mostly clean; minor issues | Noticeable coupling / mixed responsibilities | Tangled design; unclear responsibilities |
| **Working demo** | Runs cleanly; handles edge cases live | Runs; minor hiccups | Partial run / needs rescue | Does not run |
| **Communication** | Clear narrative, confident Q&A | Clear; some gaps in Q&A | Hard to follow in places | Disorganised |
| **Code readability** | Excellent naming, small methods, comments where useful | Generally readable | Inconsistent naming / long methods | Hard to read |

**Presentation rubric (instructor-graded)** uses the same five criteria; "Proficient (3)" on every row is the pass threshold for weekly objective 1.

---

## 7. Wrap-up & exit ticket

**Synthesis (2-3 min):** The instructor highlights two or three recurring strengths and two or three recurring improvement areas seen across the demos, reinforcing the shared design vocabulary.

**Exit ticket (submit before leaving):**
1. Name one design idea you saw in a classmate's project that you would adopt in your own, and why (2-3 sentences).
2. Of the four pillars, which was *hardest to demonstrate clearly* in projects today, and what would make it clearer?
3. One thing you will change in your own repository before the portfolio is due.

Exit tickets feed directly into Session 2's reflective work.
