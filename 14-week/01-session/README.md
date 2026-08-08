# Week 14 · Session 1 — Java Style, Naming Conventions, and Detecting Code Smells

**Course:** Object-Oriented Programming and Design (2026-B)
**Unit 3 — Practical application of OOP in Java · Corte 3**
**Duration:** 2 academic hours (~120 min)
**RAA:** `90_82759`

---

## 1. Session objective

Apply Java naming conventions and code-style guidelines to real code, and use a
static-analysis tool (Checkstyle / SonarLint) to **detect** code smells and
style issues, correctly interpreting each reported violation.

By the end of the session the student will produce a **style-corrected version**
of a sample class and an **annotated list of detected smells** with their
severity and location.

---

## 2. Timed agenda

| Time | Activity |
|------|----------|
| 0:00 – 0:10 | Warm-up: "Which of these two classes would you rather maintain?" (side-by-side comparison) |
| 0:10 – 0:35 | Theory: why code quality matters; naming conventions and code style |
| 0:35 – 0:55 | Theory: code smells — catalog and how to recognize them |
| 0:55 – 1:10 | Theory + demo: static analysis, Checkstyle and SonarLint; reading a report |
| 1:10 – 1:20 | Worked example walkthrough (instructor-led) |
| 1:20 – 1:50 | Guided in-class practice (pairs): find and annotate the violations |
| 1:50 – 2:00 | Wrap-up, exit ticket, preview of Session 2 |

---

## 3. Theory notes

### 3.1 Why code quality matters

A famous observation in software engineering is that **code is read far more
often than it is written**. A line you write once may be read dozens of times
during debugging, code review, onboarding, and future changes. Optimizing for
the *reader* is therefore an economic decision, not a matter of taste.

Two ideas frame the week:

- **Technical debt.** When you take a shortcut ("I'll clean it up later"), you
  borrow time now and pay interest later in the form of slower changes and more
  bugs. Like financial debt, a little is manageable; unmanaged, it compounds
  until change becomes painfully expensive.
- **The boy-scout rule.** *"Always leave the code cleaner than you found it."*
  Small, continuous improvements keep debt under control without needing a big,
  risky rewrite.

```
Cost of a change over a project's life
^
| poor quality  ...........****
|                     ****
|                 ****
|              ***
|           ***                     good quality
|        ***                ____________________
|     ***      ____________/
|  ***________/
+----------------------------------------------> time
The gap between the curves IS the technical debt you pay for.
```

### 3.2 Java naming conventions

Names are the primary user interface of your code. Java has strong, widely
shared conventions. Learn them once; apply them everywhere.

| Element | Convention | Example |
|---------|-----------|---------|
| **Class / interface / enum** | `PascalCase` (UpperCamelCase), a noun | `InvoiceService`, `PaymentGateway` |
| **Method** | `camelCase`, a verb phrase | `calculateTotal()`, `isEligible()` |
| **Variable / field / parameter** | `camelCase`, a noun | `customerName`, `totalAmount` |
| **Constant** (`static final`) | `UPPER_SNAKE_CASE` | `MAX_RETRIES`, `PI` |
| **Package** | all lowercase, dotted, reverse-domain | `co.edu.corhuila.billing` |
| **Type parameter (generics)** | single uppercase letter | `T`, `E`, `K`, `V` |
| **Boolean accessor** | `is`/`has`/`can` prefix | `isActive()`, `hasPermission()` |
| **Getter / setter** | `getX()` / `setX()` | `getName()`, `setName(...)` |

**Naming quality rules of thumb**

- Use **intention-revealing** names: `elapsedTimeInDays` beats `d`.
- Avoid **noise words** and abbreviations: `theCustomer`, `custData`, `mgr`.
- Make names **searchable**: a constant `MAX_RETRIES` is easy to grep; the
  literal `3` scattered around the code is not.
- One concept, one word: don't mix `fetch`, `retrieve`, and `get` for the same
  idea.
- The length of a name should roughly match the size of its scope: loop counter
  `i` is fine; a field that lives for the whole object's life deserves a full
  name.

### 3.3 Code style / formatting

Style is about *layout*, not naming. It has no effect on what the program does,
but a consistent layout dramatically lowers reading effort and eliminates noise
in code reviews and diffs.

Common Java style rules (as codified by the **Google Java Style Guide** and the
older **Oracle Code Conventions**):

- **Indentation:** spaces, consistent width (Google uses 2, many teams use 4).
  Never mix tabs and spaces.
- **Braces:** K&R "Egyptian" style — opening brace on the same line, and braces
  are used **even for single-statement blocks**.
- **Line length:** keep lines within a limit (100 columns in Google style).
- **One statement per line**; one variable declaration per line.
- **Imports:** no wildcard imports (`import java.util.*;`); no unused imports;
  ordered consistently.
- **Whitespace:** a space after keywords and around binary operators
  (`a + b`, not `a+b`); a space after commas.
- **Braces required** even for one-line `if`/`for`/`while` to prevent the
  classic "dangling statement" bug.

```java
// Style-poor
if(x>0)doSomething();          // no spaces, no braces
int a=1,b=2;                   // two declarations, no spaces

// Style-correct
if (x > 0) {
    doSomething();
}
int a = 1;
int b = 2;
```

> A single team choice matters more than which choice: pick one style guide and
> apply it uniformly. That is exactly what a tool like Checkstyle enforces.

### 3.4 Code smells

A **code smell** is a *surface symptom* that usually indicates a deeper problem.
A smell is **not a bug** — the program may work perfectly — but it warns you
that the design will resist change. Fowler and Beck popularized the catalog;
here are the families you must recognize:

**Bloaters** — things that have grown too big:
- *Long Method* — a method that does too much; hard to name, hard to test.
- *Large Class* — a class with too many fields/responsibilities (a "God class").
- *Long Parameter List* — 4+ parameters; hard to call correctly.
- *Primitive Obsession* — using `String`/`int` instead of small domain types
  (e.g., a raw `String` for an email instead of an `Email` type).
- *Data Clumps* — the same group of fields/parameters travel together
  everywhere.

**Object-orientation abusers:**
- *Switch Statements* on a type code that should be polymorphism.
- *Refused Bequest* — a subclass ignores most of what it inherits.

**Change preventers:**
- *Divergent Change* — one class changes for many different reasons.
- *Shotgun Surgery* — one change forces edits in many classes.

**Dispensables** — things that add no value:
- *Dead Code*, *Duplicate Code*, *Comments that apologize for bad code*,
  *Speculative Generality*.

**Couplers:**
- *Feature Envy* — a method more interested in another class's data than its own.
- *Message Chains* — `a.getB().getC().getD().doThing()` (train wreck).

> **Style issue vs. smell.** A *style issue* is cosmetic (wrong brace, bad
> spacing, wrong case) and is fully mechanical to fix. A *code smell* points to a
> **design** weakness and is fixed by **refactoring** (next session). Checkstyle
> mostly finds style issues; SonarLint finds both smells and potential bugs.

### 3.5 Static analysis

**Static analysis** inspects source code **without running it**. It parses the
code into a structure the tool can reason about and checks it against rules.

```
        SOURCE CODE (not executed)
              |
              v
   +----------------------+
   |  Static analyzer     |  parses, builds AST, applies rules
   |  (Checkstyle /       |
   |   SonarLint)         |
   +----------------------+
              |
              v
     REPORT: [severity] rule-id  file:line  message
```

Contrast with **dynamic analysis** (tests, profilers, debuggers), which
observes the program **while it runs**. The two are complementary: static
analysis catches issues everywhere in the codebase cheaply and early; dynamic
analysis proves runtime behavior. Static analysis **cannot** tell you your
business logic is correct — only tests can.

**Checkstyle** — enforces a *style* configuration (e.g., `google_checks.xml` or
`sun_checks.xml`). It flags naming violations, formatting, missing Javadoc,
line length, import order, and similar rules. Runs from the command line, Maven,
Gradle, or as an IDE plugin.

**SonarLint** — an IDE plugin (IntelliJ, Eclipse, VS Code) that flags **bugs,
code smells, and security issues** as you type, using the SonarSource rule set.
Each finding links to a rule page explaining *why* it matters and *how* to fix
it.

**Anatomy of a report line**

```
[WARN] NamingConvention: src/main/java/billing/invoice.java:12
       Name 'Calc_Total' must match pattern '^[a-z][a-zA-Z0-9]*$'.
  ^      ^                 ^                                ^
severity rule/category     location (file:line)            message + expected pattern
```

To act on a finding you read: **severity** (how urgent), **rule** (what
principle), **location** (where), **message** (what to change).

---

## 4. Worked example (instructor-led)

Below is a small class that *compiles and runs* but is riddled with style
issues and a couple of smells. We will read it as a static analyzer would.

```java
package Billing;                              // (1) package should be lowercase
import java.util.*;                           // (2) wildcard import

public class invoice {                        // (3) class name not PascalCase
  public double TAX = 0.19;                   // (4) mutable "constant"-ish, bad name/case
  private List items;                         // (5) raw type (no generics)

  public double Calc(List<Double> l){         // (6) method name not camelCase / cryptic
    double t=0;                               // (7) cryptic name, no spaces
    for(int i=0;i<l.size();i++){t=t+l.get(i);}// (8) no spaces, cramped, one line
    double r = t + t*0.19;                    // (9) magic number 0.19 duplicated
    return r;
  }
}
```

**How the tools would report it (representative):**

| # | Tool | Severity | Rule | Message (paraphrased) |
|---|------|----------|------|-----------------------|
| 1 | Checkstyle | error | `PackageName` | Package name must be all lowercase. |
| 2 | Checkstyle | warning | `AvoidStarImport` | Wildcard imports are not allowed. |
| 3 | Checkstyle | error | `TypeName` | Class name `invoice` must be UpperCamelCase. |
| 4 | SonarLint | smell | `S1104`/naming | Field is `public`; constants should be `static final` and `UPPER_SNAKE_CASE`. |
| 5 | SonarLint | smell | `S3740` | Raw type `List` used; parameterize it. |
| 6 | Checkstyle | error | `MethodName` | Method `Calc` must be lowerCamelCase; also non-descriptive. |
| 7–8 | Checkstyle | warning | `WhitespaceAround`, formatting | Missing spaces; multiple statements on one line. |
| 9 | SonarLint | smell | `S109` | Magic number `0.19`; extract a named constant. |

**Reading interpretation.** Items 1–3, 6, 7–8 are **style issues** — mechanical
fixes. Items 4, 5, 9 are **smells / potential bugs** — they hint at design and
maintainability problems (a "constant" that can change, unsafe raw types, an
unexplained duplicated number).

*(The corrected/refactored version is the subject of Session 2 — for now we only
**detect and interpret**, we do not yet fix.)*

---

## 5. Guided in-class practice (pairs, ~30 min)

You will be given the file `LegacySample.java` (in the `material/` download
area). Working in pairs:

1. **Run or simulate the analyzer.** If Checkstyle/SonarLint is installed, run
   it. If not, act as a "human linter" using the rules from §3.
2. **Produce a findings table** with columns:
   `# | line | category (style / smell) | rule name | why it matters | suggested fix`.
3. **Classify** each finding as a *style issue* or a *code smell*.
4. **Prioritize:** mark the top 3 findings you would fix first and justify the
   order (impact on readability/maintainability vs. cost).
5. **Do NOT fix anything yet** — detection and interpretation only. Fixing is
   Session 2.

**Sample starter (what your table should look like):**

| # | line | category | rule | why it matters | suggested fix |
|---|------|----------|------|----------------|---------------|
| 1 | 3 | style | TypeName | Inconsistent class casing confuses readers/tools | Rename to `PascalCase` |
| 2 | 9 | smell | S109 Magic Number | Unexplained literal, duplicated | Extract `static final` constant |

**Deliverable of the practice:** the completed findings table (at least 8
findings, correctly classified), saved as `session1-findings.md` and kept for
Session 2 (you will fix these next session).

---

## 6. Wrap-up and exit ticket

**Key takeaways**

- Code is read more than written; conventions and style lower reading cost.
- Naming: `PascalCase` types, `camelCase` methods/vars, `UPPER_SNAKE_CASE`
  constants, lowercase packages.
- A **style issue** is cosmetic and mechanical; a **code smell** signals a
  design weakness.
- **Static analysis** finds issues without running the code; Checkstyle enforces
  style, SonarLint finds smells/bugs/security.
- We *detect and interpret* this session; we *refactor to fix* next session.

**Exit ticket (answer in 3–4 sentences, hand in before you leave):**

1. Give one Java identifier that is written correctly and one that violates a
   naming convention; name the rule broken.
2. In your own words, what is the difference between a *style issue* and a *code
   smell*?
3. Name one thing static analysis **cannot** verify that only tests can.

**Preview of Session 2:** We take the findings you produced today and **fix**
them through disciplined **refactoring**, protected by a test safety net, so
behavior stays identical while quality improves.
