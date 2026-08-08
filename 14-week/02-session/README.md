# Week 14 · Session 2 — Refactoring to Clean Code with a Test Safety Net

**Course:** Object-Oriented Programming and Design (2026-B)
**Unit 3 — Practical application of OOP in Java · Corte 3**
**Duration:** 2 academic hours (~120 min)
**RAA:** `90_82759`

---

## 1. Session objective

Refactor "smelly" Java code to improve readability and maintainability
**without changing its behavior**, applying a named catalog of refactorings and
using a test suite as a safety net, then re-running static analysis to confirm
the smells are gone.

By the end of the session the student will have transformed the detected issues
from Session 1 into a **clean, standards-compliant class whose tests still
pass**.

---

## 2. Timed agenda

| Time | Activity |
|------|----------|
| 0:00 – 0:10 | Recap of Session 1 findings; today's goal: fix without breaking |
| 0:10 – 0:30 | Theory: what refactoring is (and is not); the behavior-preserving contract; the test safety net |
| 0:30 – 0:55 | Theory: the refactoring catalog with micro-examples |
| 0:55 – 1:20 | Worked example: refactor the `Invoice` class step by step, tests green throughout |
| 1:20 – 1:50 | Guided in-class practice (pairs): refactor your Session-1 code |
| 1:50 – 2:00 | Wrap-up, exit ticket, connection to the quiz and optional activity |

---

## 3. Theory notes

### 3.1 What refactoring is — and is not

**Refactoring** (Martin Fowler): *a change made to the internal structure of
software to make it easier to understand and cheaper to modify **without
changing its observable behavior**.*

The load-bearing phrase is **"without changing its observable behavior."** For
the same inputs, the program must produce the same outputs and the same
side-effects after refactoring as before.

| Refactoring **is** | Refactoring **is not** |
|--------------------|------------------------|
| Small, reversible, behavior-preserving steps | A big rewrite from scratch |
| Improving structure/readability | Adding new features |
| Backed by tests at every step | "I'll fix the tests later" |
| Fixing smells (design) and style | Fixing functional bugs (that's debugging) |

> **Rule:** *Never refactor and add functionality in the same commit.* Wearing
> two hats at once is how regressions sneak in. Refactor (structure), commit;
> then add a feature (behavior), commit — separately.

### 3.2 The test safety net (why tests come first)

Because a refactoring must not change behavior, you need a way to **prove** you
didn't. That proof is a **passing test suite**.

```
        BEFORE refactoring            AFTER each small step
        ------------------            ---------------------
        run tests  -> GREEN   ==>     run tests  -> GREEN
                                      (if RED: undo the last step)
```

The discipline:

1. Make sure a relevant test exists and **passes**. If it doesn't exist, write a
   *characterization test* that pins down the current behavior first.
2. Apply **one** small refactoring.
3. **Re-run the tests.** Green? Keep going. Red? **Revert** the last step — it
   changed behavior.
4. Repeat. Commit in small increments.

This is why modern IDEs' automated refactorings (Rename, Extract Method) are so
valuable: they are mechanical and provably behavior-preserving, so you can move
fast with confidence.

### 3.3 Refactoring catalog (with micro-examples)

**Rename** — give a variable/method/class an intention-revealing name.

```java
// before
double d;          // elapsed time in days
// after
double elapsedTimeInDays;
```

**Extract Method** — turn a fragment into its own well-named method. The single
most useful refactoring against *Long Method*.

```java
// before
void printReport() {
    // ...header...
    double total = 0;
    for (Item it : items) total += it.price();   // <-- a distinct sub-task
    System.out.println("TOTAL: " + total);
}
// after
void printReport() {
    printHeader();
    double total = calculateTotal();
    System.out.println("TOTAL: " + total);
}
private double calculateTotal() {
    double total = 0;
    for (Item it : items) total += it.price();
    return total;
}
```

**Replace Magic Number with Symbolic Constant** — name the unexplained literal.

```java
// before
double gross = net + net * 0.19;
// after
private static final double VAT_RATE = 0.19;
double gross = net + net * VAT_RATE;
```

**Introduce Parameter Object** — bundle a *Data Clump* / *Long Parameter List*
into a small type.

```java
// before
book(String from, String to, LocalDate start, LocalDate end)
// after
book(Route route, DateRange dates)
```

**Replace Conditional with Polymorphism** — replace a `switch` on a type code
with subclass behavior.

```java
// before
double area(Shape s) {
    switch (s.type) {
        case CIRCLE: return Math.PI * s.r * s.r;
        case SQUARE: return s.side * s.side;
    }
}
// after: Circle.area() and Square.area() override an abstract Shape.area()
```

**Decompose Conditional / Guard Clauses** — flatten nested `if`s with early
returns, and extract complex boolean expressions into named methods.

```java
// before
double pay(Employee e) {
    double result;
    if (e.isSeparated()) { result = separatedAmount(); }
    else {
        if (e.isRetired()) { result = retiredAmount(); }
        else { result = normalPay(e); }
    }
    return result;
}
// after
double pay(Employee e) {
    if (e.isSeparated()) return separatedAmount();
    if (e.isRetired())   return retiredAmount();
    return normalPay(e);
}
```

**Inline** (variable/method) — remove needless indirection when a name adds no
value. The inverse of Extract; use it when an intermediate hides more than it
helps.

> **How to choose.** Smell → refactoring:
> Long Method → *Extract Method*; Magic Number → *Replace with Constant*;
> Long Parameter List / Data Clump → *Introduce Parameter Object*;
> `switch` on type → *Replace Conditional with Polymorphism*;
> deep nesting → *Guard Clauses*; cryptic name → *Rename*.

---

## 4. Worked example (instructor-led, step by step)

We refactor the smelly `Invoice` from Session 1. **The test suite exists and is
green before we start.**

### 4.0 The characterization test (our safety net)

```java
import static org.junit.jupiter.api.Assertions.assertEquals;
import java.util.List;
import org.junit.jupiter.api.Test;

class InvoiceTest {
    @Test
    void totalIncludesVat() {
        Invoice invoice = new Invoice();
        // net = 100 + 50 = 150; gross = 150 * 1.19 = 178.5
        double gross = invoice.calculateTotal(List.of(100.0, 50.0));
        assertEquals(178.5, gross, 0.0001);
    }
}
```

### 4.1 Starting point (smelly)

```java
package Billing;
import java.util.*;

public class invoice {
  public double TAX = 0.19;
  private List items;

  public double Calc(List<Double> l){
    double t=0;
    for(int i=0;i<l.size();i++){t=t+l.get(i);}
    double r = t + t*0.19;
    return r;
  }
}
```

### 4.2 Step-by-step transformation (tests green after each step)

1. **Rename package** `Billing` → `billing` (lowercase convention).
2. **Rename class** `invoice` → `Invoice` (PascalCase). *(Run tests → green.)*
3. **Rename method** `Calc` → `calculateTotal`; rename params `l` → `amounts`,
   `t` → `total`, `r` → `gross`. *(Tests green.)*
4. **Replace magic number** `0.19` with a real constant `VAT_RATE`, and remove
   the misleading mutable `public double TAX`. *(Tests green.)*
5. **Fix the raw type / dead field:** the `items` field is unused here — remove
   *dead code*; parameterize any remaining collections. *(Tests green.)*
6. **Modernize the loop** to an enhanced `for` (or a stream) for readability.
   *(Tests green.)*
7. **Fix formatting** (spaces, braces, one statement per line) — Checkstyle
   clean.
8. **Re-run static analysis** — smells and style violations gone.

### 4.3 Result (clean, same behavior)

```java
package billing;

import java.util.List;

/** Computes invoice totals including value-added tax (VAT). */
public class Invoice {

    /** Colombian VAT rate applied to the net amount. */
    private static final double VAT_RATE = 0.19;

    /**
     * Returns the gross total (net + VAT) for the given line-item amounts.
     *
     * @param amounts the net amount of each line item
     * @return the total including VAT
     */
    public double calculateTotal(List<Double> amounts) {
        double net = sum(amounts);
        return net + net * VAT_RATE;
    }

    private double sum(List<Double> amounts) {
        double total = 0.0;
        for (double amount : amounts) {
            total += amount;
        }
        return total;
    }
}
```

**Verification:** `InvoiceTest.totalIncludesVat()` still passes (178.5). Behavior
is identical; readability, naming, and standards compliance are dramatically
better. We applied **Rename**, **Replace Magic Number with Constant**, **Extract
Method** (`sum`), removed **Dead Code**, and fixed **style**.

> **Notice what did NOT change:** the public result of `calculateTotal` for the
> same input. That is the behavior-preserving contract in action.

---

## 5. Guided in-class practice (pairs, ~30 min)

Using the `session1-findings.md` table you produced last session and the
`LegacySample.java` file:

1. **Confirm the safety net.** Make sure the provided tests pass *before* you
   touch anything. (If a behavior is untested, add a characterization test.)
2. **Refactor in small steps.** Apply **at least three named refactorings** from
   the catalog. After each step, **re-run the tests**.
3. **Keep a refactoring log:** for each step record
   `smell → refactoring applied → tests result (green/red)`.
4. **Re-run static analysis** (or your human-linter check). Confirm the count of
   violations dropped.
5. **Prove behavior is preserved:** all tests green at the end; note any test
   you added.

**Acceptance for the in-class exercise**

- [ ] Tests were green before and after (no regressions).
- [ ] At least three distinct, correctly-named refactorings applied.
- [ ] Naming and style now comply with the conventions.
- [ ] No new functionality was added (structure only).
- [ ] The refactoring log clearly maps each smell to its fix.

---

## 6. Wrap-up and exit ticket

**Key takeaways**

- Refactoring improves **internal structure** while **preserving observable
  behavior**.
- Tests are the **safety net** — green before, green after; if red, revert.
- Refactor in **small steps**, one at a time; never mix refactoring with new
  features.
- Match the **smell to the refactoring** (Long Method → Extract Method, Magic
  Number → Constant, etc.).
- Re-running static analysis confirms the smells are actually gone.

**Exit ticket (hand in before leaving):**

1. State the one-sentence definition of refactoring, emphasizing the
   behavior-preserving contract.
2. You applied *Extract Method* and a test turned **red**. What does that tell
   you, and what do you do next?
3. Name one code smell and the specific refactoring you would use to remove it.

**What comes next**

- Take the **Week 14 quiz** (identify style errors and choose the appropriate
  refactoring for each).
- Optional, deeper practice with GitHub submission:
  [`../optional-activity/README.md`](../optional-activity/README.md).
- Download the summary PDF and readings from
  [`../material/README.md`](../material/README.md).
