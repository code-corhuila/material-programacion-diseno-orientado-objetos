# Week 14 — Session 2: Refactoring with static analysis tools (Checkstyle & SonarLint)

> **Subject:** Object-Oriented Programming and Design · **Unit 3** · **Week 14** · **Corte 3**
> **RAA:** `90_82759`
> **Duration:** 2 hours (120 min)

---

## 1. Session objective

Use **static-analysis tools** (Checkstyle and SonarLint) to detect style issues
and code smells, and **refactor** the smelly code found in Session 1 to improve
readability and maintainability **without changing its behavior** — proving
behavior preservation with a passing test.

**Success criterion:** you can run a static-analysis tool on a class, interpret
its report, apply at least four distinct refactorings, and show a green test
that confirms the behavior did not change.

---

## 2. Timed agenda

| Time | Activity |
|------|----------|
| 0:00 – 0:10 | Recap of Session 1 smells; define refactoring precisely. |
| 0:10 – 0:30 | Theory: what static analysis is; Checkstyle vs. SonarLint. |
| 0:30 – 0:50 | Theory: the refactoring catalog + the "tests-first" safety net. |
| 0:50 – 1:25 | **Worked example**: from smelly to clean, one refactoring at a time, with a test as safety net. |
| 1:25 – 1:55 | **Guided practice**: run a tool, read the report, fix the top issues. |
| 1:55 – 2:20 | Wrap-up + exit ticket + preview of the Corte 3 quiz. |

---

## 3. Theory notes

### 3.1 Refactoring, precisely

> **Refactoring** (noun): a change made to the internal structure of software to
> make it easier to understand and cheaper to modify **without changing its
> observable behavior**. — Martin Fowler

Two consequences of that definition:

1. **Behavior is preserved.** Same inputs → same outputs, same side effects. If
   behavior changes, it is *not* a refactoring — it is a feature change or a bug
   fix.
2. **It is done in small steps.** Each step is tiny and verifiable, so you can
   stop at any time with working code.

**Fowler's "two hats":** at any moment you wear exactly one hat.

```
   [ Refactoring hat ]              [ Feature hat ]
   Improve structure.              Add/alter behavior.
   Tests stay green the            Tests change because
   whole time (no new              behavior changed
   behavior).                      (new tests appear).
   -------------------------------------------------------
   Rule: never wear both at once. Switch deliberately.
```

**Refactoring vs. bug fix vs. feature — the distinction the quiz tests:**

| Action | Behavior changes? | Example |
|--------|-------------------|---------|
| **Refactoring** | **No** | Rename `d()` to `computeInterest()`. |
| **Bug fix** | Yes (wrong → right) | Correct `>` to `>=` in a threshold. |
| **New feature** | Yes (adds capability) | Add a loyalty-points calculation. |

### 3.2 The safety net: tests before you refactor

You cannot claim "behavior is unchanged" unless you can *check* it. So the
golden rule is:

> **Have a passing test before you refactor. Keep it green after every step.**

If the code has no tests, write **characterization tests** first: tests that
capture what the code *currently* does (even if imperfect), so any accidental
behavior change turns the test red.

```
  Write/confirm test  →  test GREEN
        │
        ▼
  Make ONE small refactoring
        │
        ▼
  Run tests  →  GREEN? ── yes ──► keep going / commit
        │
        └─ RED ──► undo that step, try again smaller
```

### 3.3 What static analysis is

**Static analysis** inspects source code **without running it**. It parses the
code into a model (tokens/AST) and applies rules. It is fast, repeatable, and
catches whole categories of problems automatically.

**What it CAN find:** style violations, naming issues, unused code, magic
numbers, overly complex methods, likely null-dereferences, empty `catch`
blocks, common bug patterns.

**What it CANNOT know:** whether your program does the *right thing* for the
business. It sees structure, not intent. (That is why we still need tests and
human review.)

### 3.4 Checkstyle vs. SonarLint

| | **Checkstyle** | **SonarLint** |
|---|----------------|---------------|
| **Primary focus** | Style & convention compliance | Bugs, vulnerabilities, code smells |
| **Runs from** | IDE plugin, Maven/Gradle, CLI | IDE plugin (as you type) |
| **Configuration** | `checkstyle.xml` rule set (e.g., `google_checks.xml`, `sun_checks.xml`) | Quality profile (rule set), configurable in IDE / SonarQube |
| **Typical output** | List of `[WARN]`/`[ERROR]` with rule name + line | Inline squiggles + issue list with severity & rule explanation |
| **Great at** | Enforcing "everyone writes the same style" | Explaining *why* a pattern is risky, with fix guidance |

They are complementary: Checkstyle keeps the codebase *uniform*; SonarLint keeps
it *sane*. Real teams run both, often in CI.

**Reading a Checkstyle report (example lines):**

```
[WARN]  Order.java:1:14: Name 'order' must match pattern '^[A-Z][a-zA-Z0-9]*$'. [TypeName]
[WARN]  Order.java:2:9:  Name 'S' must match pattern '^[a-z][a-zA-Z0-9]*$'.    [MemberName]
[WARN]  Order.java:3:1:  Line is longer than 100 characters.                    [LineLength]
[ERROR] Order.java:8:12: '==' should be surrounded by whitespace.               [WhitespaceAround]
```

Each line tells you **file:line:column**, a **message**, and the **rule name**
in brackets (so you can look it up or suppress it deliberately).

**Reading a SonarLint issue (example):**

```
Order.java  process(...)
  Code Smell · Major · java:S3776
  "Refactor this method to reduce its Cognitive Complexity from 17 to the 15 allowed."
```

Severity ladder (typical): `Blocker > Critical > Major > Minor > Info`. Fix
Blockers/Criticals first.

### 3.5 The refactoring catalog (the ones you will use)

| Refactoring | When | What you do |
|-------------|------|-------------|
| **Rename** | Name is unclear/misleading | Give the class/method/variable an intention-revealing name. |
| **Extract Method** | A code block does one identifiable thing | Move it into a well-named method. |
| **Extract Variable** | A complex expression is hard to read | Assign it to an explaining local variable. |
| **Replace Magic Number with Symbolic Constant** | Unexplained literal | Introduce a `static final` constant. |
| **Decompose Conditional** | A tangled `if/else` | Extract the condition and branches into named methods. |
| **Guard Clauses** | Deep nesting from edge-case checks | Return/throw early to flatten the code. |
| **Introduce Parameter Object** | Long Parameter List | Group related params into a small class. |
| **Inline** | An indirection adds no value | Replace a call with its body (opposite of Extract). |

---

## 4. Worked example — from smelly to clean, step by step

We refactor the `Order` class from Session 1. **First, the safety net.**

### 4.0 A characterization test (write this FIRST)

```java
import static org.junit.jupiter.api.Assertions.assertEquals;
import org.junit.jupiter.api.Test;

class OrderTest {

    private static final double EPS = 0.0001;

    @Test
    void vipBulkOrderTotalIsPreserved() {
        Order order = new Order();
        // 2 x 600000 + 1 x 500000 = 1,700,000 (a VIP, bulk order)
        double total = order.calculateTotal("Ana", 600000, 2, 500000, 1, true);

        // Golden value captured from the ORIGINAL code:
        // subtotal 1,700,000 -> VIP -10% = 1,530,000
        //  -> bulk -5% = 1,453,500 -> +19% VAT = 1,729,665
        assertEquals(1_729_665.0, total, EPS);
    }
}
```

We run it against the original method (renamed `calculateTotal`) and confirm it
is **GREEN**. Now every refactoring must keep it green.

### 4.1 Starting code (from Session 1)

```java
public class order {
    int S=0;
    public double process(String c,double p1,int q1,double p2,int q2,boolean vip){
        double total=0;
        total=total+p1*q1;
        total=total+p2*q2;
        if(vip==true){ total=total-total*0.1; }
        if(total>1000000){ total=total-total*0.05; }
        total=total+total*0.19;   // apply tax
        S=S+1;
        System.out.println("order for "+c+" = "+total);
        return total;
    }
    public void x(){ /* TODO */ }
}
```

### 4.2 Step-by-step refactoring

**Step 1 — Rename (class, method, field, params, remove dead code).**
Fixes: `TypeName`, `MemberName`, poor names, Dead Code smell.

**Step 2 — Replace Magic Numbers with constants.**
`0.1 → VIP_DISCOUNT_RATE`, `1000000 → BULK_THRESHOLD`,
`0.05 → BULK_DISCOUNT_RATE`, `0.19 → VAT_RATE`.

**Step 3 — Simplify the boolean.** `if (vip == true)` → `if (isVip)`.

**Step 4 — Extract Method.** Pull subtotal, discounts, and tax into small,
named methods so `calculateTotal` reads like a summary.

**Step 5 — Remove the side effect** (`System.out.println`) from a calculation
method: printing is a *different responsibility*. (Here we keep counting as a
deliberate, documented behavior; logging moves to the caller.)

> After **each** step we re-run `OrderTest`. It stays **GREEN** throughout.

### 4.3 Result (behavior preserved, test still green)

```java
/** Calculates order totals with VIP and bulk discounts plus VAT. */
public class Order {

    private static final double VIP_DISCOUNT_RATE = 0.10;
    private static final double BULK_DISCOUNT_RATE = 0.05;
    private static final double BULK_THRESHOLD = 1_000_000;
    private static final double VAT_RATE = 0.19;

    private int processedOrderCount = 0;

    /**
     * Calculates the final payable total for a two-line order.
     *
     * @return the total including discounts and VAT
     */
    public double calculateTotal(String customer,
                                 double unitPriceA, int quantityA,
                                 double unitPriceB, int quantityB,
                                 boolean isVip) {
        double subtotal = subtotalOf(unitPriceA, quantityA, unitPriceB, quantityB);
        double discounted = applyDiscounts(subtotal, isVip);
        double total = applyVat(discounted);
        processedOrderCount++;
        return total;
    }

    private double subtotalOf(double priceA, int qtyA, double priceB, int qtyB) {
        return (priceA * qtyA) + (priceB * qtyB);
    }

    private double applyDiscounts(double amount, boolean isVip) {
        double result = amount;
        if (isVip) {
            result -= result * VIP_DISCOUNT_RATE;
        }
        if (result > BULK_THRESHOLD) {
            result -= result * BULK_DISCOUNT_RATE;
        }
        return result;
    }

    private double applyVat(double amount) {
        return amount + (amount * VAT_RATE);
    }

    public int getProcessedOrderCount() {
        return processedOrderCount;
    }
}
```

**Verification:** `OrderTest.vipBulkOrderTotalIsPreserved()` still returns
`1_729_665.0`. Behavior preserved → this was a *true* refactoring.

**Refactorings applied (count them):** Rename, Replace Magic Number with
Constant, Extract Method (×3), simplify boolean, remove dead code, isolate a
side effect. Every fix maps to a Checkstyle/SonarLint issue from §3.4.

> **Note on the discount order:** the original applied VIP *then* bulk *then*
> VAT. We kept that exact order on purpose — reordering would change results and
> would therefore be a **behavior change, not a refactoring**.

---

## 5. Guided in-class practice — run the tools, fix the top issues

### 5.1 Setup (one-time, ~5 min)

- **IntelliJ IDEA:** install **SonarLint** and **CheckStyle-IDEA** from the
  plugin marketplace. Set CheckStyle to use `google_checks.xml`.
- **VS Code:** install the **SonarLint** and **Checkstyle for Java** extensions.
- **CLI alternative (no IDE):**
  ```bash
  # Download the Checkstyle "all" jar, then:
  java -jar checkstyle-all.jar -c /google_checks.xml Order.java
  ```

### 5.2 Task

1. Open the `Order.java` (smelly version) provided in
   [`/material`](../material/README.md).
2. **Run Checkstyle.** Record the total number of violations and copy the three
   most frequent rule names.
3. **Run SonarLint.** Note every issue's **type** (Bug / Vulnerability / Code
   Smell) and **severity**.
4. Write the characterization test (use the one in §4.0 as a template) and
   confirm it is **green**.
5. Apply **at least four** refactorings from §3.5. After each, re-run the test.
6. Re-run Checkstyle and SonarLint. Record the **new** violation count.

### 5.3 Deliverable for this session

A short report (half a page) with:
- Before/after Checkstyle violation counts.
- The list of SonarLint issues you resolved, by rule id/severity.
- Your final refactored class **and** the green test output.
- One sentence per refactoring justifying it in terms of readability or
  maintainability.

### 5.4 Common pitfalls (facilitator notes)
- **Suppressing instead of fixing.** `// NOSONAR` and `@SuppressWarnings` hide
  the warning; use them only with a written justification, never to inflate a
  clean score.
- **Refactoring without a test.** If there's no green test first, you cannot
  claim behavior is preserved.
- **Big-bang rewrite.** Changing everything at once makes a red test impossible
  to localize. Keep steps tiny.
- **Reformatting inside a feature commit.** Mixing style changes with behavior
  changes hides real diffs. Wear one hat at a time.

---

## 6. Wrap-up

**Key takeaways**
- Refactoring = improving structure **without changing behavior**; a test proves
  it.
- Static analysis automates smell/style detection: **Checkstyle** for
  convention uniformity, **SonarLint** for bugs and code smells.
- Read a report as *file:line — message — rule*, prioritize by severity, and fix
  in small, test-verified steps.
- Refactoring, bug fix, and feature are three different things — know which hat
  you are wearing.

### Exit ticket (submit before leaving)
1. A teammate renames a method and changes `>` to `>=` in the same commit. Which
   part is a refactoring and which is not? Why?
2. Give one issue **Checkstyle** would flag and one issue **SonarLint** would
   flag on the smelly `Order` class.
3. Why must a passing test exist *before* you refactor?

### Corte 3 quiz preview
The graded quiz will show you code snippets and ask you to (a) identify the
style error or code smell and (b) choose the correct refactoring. Everything you
need is in Sessions 1–2 and the [readings](../material/README.md).
