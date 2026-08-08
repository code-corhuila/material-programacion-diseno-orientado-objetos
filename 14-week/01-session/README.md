# Week 14 — Session 1: Good programming practices in Java (naming, style, and code smells)

> **Subject:** Object-Oriented Programming and Design · **Unit 3** · **Week 14** · **Corte 3**
> **RAA:** `90_82759`
> **Duration:** 2 hours (120 min)

---

## 1. Session objective

Apply Java naming conventions and code-style guidelines to real code, and
**identify code smells** — the surface symptoms of poor internal quality —
so that in Session 2 we can remove them through refactoring backed by static
analysis tools.

**Success criterion:** given a badly written class, you can list its naming/
style violations and name at least five code smells, explaining *why* each one
harms readability or maintainability.

---

## 2. Timed agenda

| Time | Activity |
|------|----------|
| 0:00 – 0:10 | Warm-up: read two versions of the same method, vote on which is "better" and *why*. |
| 0:10 – 0:30 | Theory: why internal quality matters (cost of reading, technical debt). |
| 0:30 – 0:55 | Theory: Java naming conventions & style guides. |
| 0:55 – 1:20 | Theory: code smells catalog with examples. |
| 1:20 – 1:45 | **Worked example**: cleaning up a badly named/styled class. |
| 1:45 – 2:05 | **Guided practice**: smell hunt on a provided class. |
| 2:05 – 2:20 | Wrap-up + exit ticket. |

---

## 3. Theory notes

### 3.1 Why internal quality matters

Software is read far more often than it is written. Studies and practitioner
experience converge on a ratio of roughly **10 reads per 1 write**: every line
you type will be *re-read* by teammates, reviewers, and your future self many
times. Optimizing for the reader is therefore not a courtesy — it is the
cheapest way to reduce the total cost of a system.

**External vs. internal quality**

```
                 Does it work?          Is it well-built?
                 (EXTERNAL quality)     (INTERNAL quality)
                 ------------------      ------------------
 Visible to:     users, testers         developers, maintainers
 Measured by:    features, correctness  readability, structure,
                 performance            low coupling, low duplication
 Ignoring it:    bugs, angry users      slow changes, fear of touching
                                        code, "technical debt interest"
```

A program can pass every test (great external quality) and still be a nightmare
to change (terrible internal quality). This week is entirely about the second
column.

**Technical debt.** Ward Cunningham's metaphor: taking a shortcut is like
borrowing money — it lets you ship faster *now*, but you pay **interest** every
time you touch that code later, until you "repay the principal" by cleaning it
up. Good practices and refactoring are how we keep the interest payments low.

```
  Effort to add a feature
     ^
     |                                   ___----  high-debt codebase
     |                          ___----
     |                 ___----
     |         ___----
     |____----______________________  clean codebase (stays cheap)
     +-------------------------------------> time / features added
```

### 3.2 Java naming conventions

Names are the most frequent form of documentation in a codebase. Java has
strong, widely shared conventions:

| Element | Convention | Example |
|---------|-----------|---------|
| **Class / Interface / Enum** | `UpperCamelCase`, noun phrase | `InvoiceService`, `PaymentStatus` |
| **Method** | `lowerCamelCase`, verb phrase | `calculateTotal()`, `isValid()` |
| **Variable / field / parameter** | `lowerCamelCase`, noun | `customerName`, `retryCount` |
| **Constant** (`static final`) | `UPPER_SNAKE_CASE` | `MAX_RETRIES`, `PI` |
| **Package** | all lowercase, dotted, reverse-domain | `co.corhuila.billing` |
| **Type parameter (generics)** | single uppercase letter | `T`, `E`, `K`, `V` |
| **Boolean method/field** | question form | `isEmpty()`, `hasNext()`, `enabled` |

**Quality guidelines for names (beyond casing):**
- Prefer **intention-revealing** names: `elapsedTimeInDays`, not `d`.
- Avoid disinformation and noise words: not `theList`, `dataInfo`, `theManager`.
- Make names **searchable**: a one-letter loop index is fine in a 3-line loop,
  but a domain value deserves a real name.
- Class names are **nouns**; method names are **verbs**. Keep them at the right
  level of abstraction (a `Customer` should not have a method named
  `saveToMySqlDatabase`).

### 3.3 Style guides and formatting

Two references dominate Java practice:

- **Oracle "Code Conventions for the Java Programming Language"** — the classic
  reference.
- **Google Java Style Guide** — modern, precise, and the basis for many
  automated rule sets (we will lean on this in Session 2).

Common formatting rules both endorse:

- **Indentation:** consistent (Google uses 2 spaces; many teams use 4). Never
  mix tabs and spaces.
- **Braces:** K&R "Egyptian" style — opening brace on the same line.
- **Line length:** keep lines reasonably short (80–120 columns).
- **One statement per line**, one variable declaration per line.
- **Imports:** no wildcard imports (`import java.util.*;`); no unused imports.
- **Whitespace:** a space after keywords and around binary operators
  (`if (a && b)`, `x = y + 1`).

```java
// Non-conforming style              // Conforming style
if(x>0){doIt();}                     if (x > 0) {
                                         doIt();
                                     }
```

### 3.4 Comments and Javadoc

Good code needs *fewer* comments, not more — a well-named method often
documents itself. Use comments to explain **why**, not **what**.

```java
// BAD: restates the obvious
i = i + 1; // add one to i

// GOOD: explains a non-obvious reason
// The vendor API rejects more than 50 items per call, so we page.
```

Use **Javadoc** (`/** ... */`) on public APIs (classes, public methods) to
describe purpose, parameters (`@param`), return value (`@return`), and thrown
exceptions (`@throws`).

### 3.5 Code smells

A **code smell** is a *symptom*, not a bug. The code runs, but its shape warns
of a deeper problem. Fowler and Beck cataloged them; the most common families:

| Family | Smell | What you see |
|--------|-------|--------------|
| **Bloaters** | Long Method | A method that does too much / is too long to grasp. |
| | Large Class | A class with too many fields/responsibilities. |
| | Long Parameter List | Methods taking 4+ parameters. |
| | Primitive Obsession | Using primitives/strings instead of small types. |
| **Dispensables** | Duplicated Code | The same logic copied in several places. |
| | Dead Code | Unused variables, methods, or unreachable branches. |
| | Comments (as deodorant) | Comments compensating for unclear code. |
| **Object-orientation abusers** | Switch Statements | Type-checking switches that polymorphism could replace. |
| **Couplers** | Feature Envy | A method more interested in another class's data than its own. |
| **Others** | Magic Numbers | Unexplained literals like `if (age > 18)`. |
| | Poor Names | `data`, `temp`, `x2`, `doStuff()`. |
| | Deep Nesting | Arrow-shaped code from stacked `if`s. |

> Smells are heuristics, not laws. A short method with three parameters is fine.
> The point is to *notice* and *ask whether* there is a cleaner design.

---

## 4. Worked example — cleaning up a badly named/styled class

### 4.1 The starting point (smelly)

```java
public class calc {
    public double d(double p,double t,int n){
        double r;
        if(n==1){r=p+(p*t/100);}
        else{r=p*Math.pow(1+t/100,n);}
        return r;
    }
    public double d2(double p){
        return p*0.19;   // ???
    }
}
```

**What is wrong here?** Let's annotate:

| Issue | Category | Explanation |
|-------|----------|-------------|
| `calc` | Naming / style | Class name must be `UpperCamelCase` and a noun: e.g., `InterestCalculator`. |
| `d`, `d2` | Naming | Method names must be intention-revealing verbs. |
| `p`, `t`, `n`, `r` | Naming | Cryptic single letters; should reveal intent. |
| `if(n==1){...}` | Style | Missing spaces, one-line blocks, cramped braces. |
| `0.19` | Magic Number | Unexplained literal (the Colombian IVA/VAT rate). |
| `100` | Magic Number | Repeated literal for "percent to fraction". |
| `d`/`d2` unrelated | Large-ish / cohesion | `d2` computes tax, not interest — mixed responsibility. |

### 4.2 The cleaned-up version (behavior preserved)

```java
/**
 * Financial helper computing simple/compound interest and VAT.
 */
public class InterestCalculator {

    /** Percent-to-fraction divisor (e.g., 19% -> 0.19). */
    private static final double PERCENT_DIVISOR = 100.0;

    /** Colombian standard VAT (IVA) rate as a fraction. */
    private static final double STANDARD_VAT_RATE = 0.19;

    /**
     * Computes the final amount after applying interest.
     *
     * @param principal    the initial amount
     * @param ratePercent  the interest rate expressed as a percentage
     * @param periods      the number of periods; 1 means simple interest
     * @return the amount including interest
     */
    public double computeInterest(double principal, double ratePercent, int periods) {
        double rateFraction = ratePercent / PERCENT_DIVISOR;
        if (periods == 1) {
            return principal + (principal * rateFraction);
        }
        return principal * Math.pow(1 + rateFraction, periods);
    }

    /**
     * Computes the VAT (IVA) owed on a taxable amount.
     *
     * @param taxableAmount the amount subject to VAT
     * @return the VAT owed
     */
    public double computeVat(double taxableAmount) {
        return taxableAmount * STANDARD_VAT_RATE;
    }
}
```

**Notice what did NOT change:** the numbers computed are identical. For the same
inputs, `computeInterest` returns exactly what `d` returned, and `computeVat`
returns exactly what `d2` returned. We improved *readability*, not *behavior* —
that is the essence of refactoring, which we formalize in Session 2.

**What improved (mapping fixes to concepts):**
- Class renamed to a noun in `UpperCamelCase`.
- Methods renamed to intention-revealing verbs.
- Parameters and locals now carry meaning.
- `100` and `0.19` promoted to named `static final` constants (magic numbers gone).
- Consistent formatting (spaces, braces, one statement per line).
- Javadoc documents the public API.

---

## 5. Guided in-class practice — "Smell Hunt"

Work in pairs. You are given the class below (also available in the
[`/material`](../material/README.md) download). **Do not fix it yet** — the goal
of Session 1 is to *see* the problems.

```java
public class order {
    int S=0;
    public double process(String c,double p1,int q1,double p2,int q2,boolean vip){
        double total=0;
        total=total+p1*q1;
        total=total+p2*q2;
        if(vip==true){
            total=total-total*0.1;
        }
        if(total>1000000){
            total=total-total*0.05;
        }
        // apply tax
        total=total+total*0.19;
        S=S+1;
        System.out.println("order for "+c+" = "+total);
        return total;
    }
    public void x(){
        // TODO
    }
}
```

**Tasks:**
1. List every **naming** violation and give the corrected name.
2. List every **style/formatting** violation.
3. Identify at least **five distinct code smells** and name each using the
   catalog in §3.5.
4. For each magic number, state what it *means* and propose a constant name.
5. Write one sentence: *what single change would most improve this class?*

**Facilitator answer key (for the instructor):**
- Naming: class `order` → `Order`; field `S` → `processedOrderCount`; method
  `process` params (`c`,`p1`,`q1`,…) cryptic; method `x` meaningless.
- Style: no spaces around operators, `vip==true`, missing indentation
  consistency, one-line blocks.
- Smells: **Long Parameter List** (6 params → introduce an `OrderLine`/`Order`
  object — *Long Parameter List / Primitive Obsession*), **Magic Numbers**
  (`0.1`, `1000000`, `0.05`, `0.19`), **Long Method** (`process` does pricing +
  discount + tax + logging + counting = mixed responsibilities), **Dead Code**
  (`x()` is an empty TODO), **Boolean comparison smell** (`vip==true`),
  **Feature Envy / mixed concern** (printing inside a calculation method).
- Constants: `VIP_DISCOUNT_RATE = 0.10`, `BULK_THRESHOLD = 1_000_000`,
  `BULK_DISCOUNT_RATE = 0.05`, `VAT_RATE = 0.19`.
- Biggest single win: **Extract** the pricing logic and remove side effects
  (printing/counting) from the calculation — sets up Session 2 refactoring.

---

## 6. Wrap-up

**Key takeaways**
- Internal quality (readability, structure) is separate from "does it work".
- Java naming conventions are shared vocabulary: `UpperCamelCase` types,
  `lowerCamelCase` members, `UPPER_SNAKE_CASE` constants.
- Style guides (Oracle, Google) make formatting a solved, automatable problem.
- Code smells are early-warning signs; naming them is the first step to fixing
  them.

**Bridge to Session 2:** We spotted the smells by eye. Next session we let
**Checkstyle** and **SonarLint** find them *automatically*, and then we
**refactor** to remove them — safely, with a test proving behavior is unchanged.

### Exit ticket (submit before leaving)
Answer on one index card / one short message:
1. Rewrite these correctly: class `dataManager`, constant `maxSize`, method
   `GetTotal`.
2. Name **two** code smells you found in the practice class and, for each, one
   sentence on why it hurts maintainability.
3. In one sentence: what is the difference between *external* and *internal*
   quality?
