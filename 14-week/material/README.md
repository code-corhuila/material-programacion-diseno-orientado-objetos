# Week 14 — Reading & Resource Material (Download Area)

> **Subject:** Object-Oriented Programming and Design · **Unit 3** · **Week 14** · **Corte 3**
> **RAA:** `90_82759`
> **Topic:** Good programming practices in Java and refactoring with static analysis tools

---

## How to use this area

This folder is a **download area** for the week's consolidated **PDF** and a
**curated index of readings**. It is **not** a Moodle submission box — nothing is
turned in here. Download the PDF, read the sources below, and bring your notes to
Sessions 1 and 2. The graded evidence for the week is the **Corte 3 quiz**; the
[optional activity](../optional-activity/README.md) is submitted via **GitHub**.

> **PDF placement:** put the compiled week PDF in this folder as
> `week14-good-practices-refactoring.pdf`. Once present, link it here:
> `./week14-good-practices-refactoring.pdf`.

---

## 1. Core readings (required)

| # | Source | What to read | Why it matters |
|---|--------|--------------|----------------|
| 1 | **Google Java Style Guide** (online) | §2 Source file basics, §4 Formatting, §5 Naming | The concrete, automatable style rules Checkstyle enforces. |
| 2 | **Oracle — Code Conventions for the Java Programming Language** | Naming conventions, file organization, statements | The classic reference behind most Java house styles. |
| 3 | **Martin Fowler — *Refactoring* (2nd ed.)** | Ch. 1 (worked example), Ch. 2 ("Principles in Refactoring"), Ch. 3 ("Bad Smells in Code") | The canonical definition, catalog, and philosophy of refactoring. |
| 4 | **Robert C. Martin — *Clean Code*** | Ch. 2 "Meaningful Names", Ch. 3 "Functions" | Practical rules for names and small, single-purpose methods. |
| 5 | **Checkstyle documentation** (`checkstyle.org`) | "Getting Started", "Standard Checks", `google_checks.xml` | How to configure and run convention checks. |
| 6 | **SonarLint / SonarSource rules** (`rules.sonarsource.com`) | Filter by **Java → Code Smell**; read `java:S3776` (Cognitive Complexity), `java:S1172` (unused params), `java:S109` (magic numbers) | How in-IDE analysis explains and prioritizes issues. |

## 2. Supplementary readings (recommended)

| # | Source | Focus |
|---|--------|-------|
| 7 | **Kent Beck & Martin Fowler — "Bad Smells in Code"** (chapter/essay) | The original smell taxonomy in depth. |
| 8 | **refactoring.guru — Refactoring & Code Smells catalog** | Visual, example-driven catalog; great quick reference. |
| 9 | **Joshua Bloch — *Effective Java* (3rd ed.)** | Items on naming, minimizing scope, and API design quality. |
| 10 | **Ward Cunningham — "The WyCash Portfolio Management System" / Technical Debt metaphor** | Origin and correct meaning of technical debt. |

---

## 3. Short summary notes

### 3.1 Naming at a glance
- Types (class/interface/enum): `UpperCamelCase`, nouns — `PaymentService`.
- Methods: `lowerCamelCase`, verbs — `calculateTotal()`.
- Variables/fields/params: `lowerCamelCase`, nouns — `retryCount`.
- Constants (`static final`): `UPPER_SNAKE_CASE` — `MAX_RETRIES`.
- Packages: lowercase dotted reverse-domain — `co.corhuila.billing`.
- Booleans read as questions — `isValid()`, `hasNext()`.

### 3.2 Code smells cheat-sheet
- **Bloaters:** Long Method, Large Class, Long Parameter List, Primitive Obsession.
- **Dispensables:** Duplicated Code, Dead Code, needless Comments.
- **OO abusers:** type-checking Switch Statements, refused bequest.
- **Couplers:** Feature Envy, Inappropriate Intimacy, Message Chains.
- **Everyday flags:** Magic Numbers, poor names, deep nesting, boolean `== true`.

### 3.3 Refactoring safety loop
```
confirm GREEN test → one small refactoring → run test
     └────────── still GREEN? keep going / else undo ──────────┘
```
Behavior must be identical before and after. If behavior changes, it is a
feature or a bug fix — not a refactoring.

### 3.4 Tooling in one line each
- **Checkstyle** — enforces *style/convention* uniformity via `checkstyle.xml`.
- **SonarLint** — flags *bugs, vulnerabilities, and code smells* inside the IDE,
  with severities (`Blocker`→`Info`) and rule explanations.
- Static analysis reads structure, **not intent** — it complements, never
  replaces, tests and human review.

### 3.5 The three-way distinction (memorize for the quiz)
| Action | Behavior changes? |
|--------|-------------------|
| Refactoring | **No** |
| Bug fix | Yes (wrong → right) |
| New feature | Yes (adds capability) |

---

## 4. Practice code (used in Sessions 1 & 2)

Copy these into a Java project to follow along and to complete the guided
practice. They are the exact samples referenced in the session guides.

**`Order.java` (smelly — the starting point):**
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

**`OrderTest.java` (the safety net to write first):**
```java
import static org.junit.jupiter.api.Assertions.assertEquals;
import org.junit.jupiter.api.Test;

class OrderTest {
    private static final double EPS = 0.0001;

    @Test
    void vipBulkOrderTotalIsPreserved() {
        Order order = new Order();
        double total = order.calculateTotal("Ana", 600000, 2, 500000, 1, true);
        assertEquals(1_729_665.0, total, EPS); // golden value from original code
    }
}
```

> The clean, refactored `Order` is shown in
> [Session 2 §4.3](../02-session/README.md). Try to reach it yourself before
> looking.

**Minimal `checkstyle` run (CLI):**
```bash
java -jar checkstyle-all.jar -c /google_checks.xml Order.java
```

---

## 5. Glossary (quick reference)

| Term | One-line meaning |
|------|------------------|
| Static analysis | Finding problems by reading code, not running it. |
| Checkstyle | Style/convention rule checker for Java. |
| SonarLint | In-IDE bug & code-smell detector. |
| Code smell | A symptom hinting at a deeper design problem. |
| Refactoring | Behavior-preserving structural improvement. |
| Technical debt | Future cost of a quick-and-dirty solution. |
| Magic number | Unexplained numeric literal that should be a constant. |
| Cyclomatic/Cognitive complexity | How tangled/branchy a method is. |
| Guard clause | Early return/throw to reduce nesting. |
| Characterization test | A test that pins down current behavior before refactoring. |

---

## 6. Downloads index

| File | Description | Status |
|------|-------------|--------|
| `week14-good-practices-refactoring.pdf` | Consolidated week reading (theory + examples). | Place in this folder. |
| `Order.java` | Smelly starter class for the guided practice. | Code shown above (§4). |
| `OrderTest.java` | Characterization test. | Code shown above (§4). |
| `google_checks.xml` | Reference Checkstyle rule set. | Ships with Checkstyle. |

---

### Attribution note
Sources above are named for study. Respect each work's license and copyright;
consult originals for full text. These notes are summaries for classroom use,
not substitutes for the primary sources.
