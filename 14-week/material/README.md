# Week 14 — Material and Resources (Download Area)

**Course:** Object-Oriented Programming and Design (2026-B)
**Unit 3 — Practical application of OOP in Java · Corte 3**
**Topic:** Good programming practices in Java and refactoring with static analysis tools
**RAA:** `90_82759`

> This is a **download area** for the week's PDF summary and curated resources.
> It is **not** a Moodle submission box — nothing is turned in here. Use it to
> study before and after the two sessions.

---

## 1. Downloadable PDF

- **`week14-good-practices-and-refactoring.pdf`** — a printable summary of the
  week: naming/style cheat-sheet, code-smell catalog, static-analysis workflow,
  and the refactoring catalog with examples.

*(Place the generated PDF in this folder. Until then, the equivalent content
lives in the session `README.md` files and the summaries below.)*

---

## 2. In-class sample files

To be used in the Session 1 and Session 2 practices:

- **`LegacySample.java`** — a small, compiling class deliberately full of style
  issues and code smells (Long Method, Magic Numbers, cryptic names, raw types,
  dead code, poor formatting). Used to practice **detection** (S1) and
  **refactoring** (S2).
- **`LegacySampleTest.java`** — a JUnit 5 characterization test that pins down
  the current behavior so refactoring can be proven safe.
- **`session1-findings.md`** — template for the findings table students fill in.

> If these files are not yet placed here, recreate them from the worked example
> in [`../01-session/README.md`](../01-session/README.md) and
> [`../02-session/README.md`](../02-session/README.md).

---

## 3. Curated readings and references (with notes)

### Official style guides

- **Oracle — *Code Conventions for the Java Programming Language*.**
  The classic reference for Java layout and naming. Older but foundational;
  explains *why* conventions exist.
  *Note:* read the naming and formatting sections; some parts are dated.

- **Google — *Google Java Style Guide*.**
  A modern, precise, widely-adopted style specification. Directly maps to the
  `google_checks.xml` Checkstyle configuration.
  *Note:* this is the style guide we align with in class (2-space indent,
  100-column limit, no wildcard imports, braces always).

### Refactoring and clean code

- **Martin Fowler — *Refactoring: Improving the Design of Existing Code* (2nd
  ed., examples in JavaScript but concepts are language-agnostic).**
  The definitive catalog of refactorings and code smells.
  *Note:* study the "Bad Smells in Code" chapter and the entries for Extract
  Function/Method, Rename, and Replace Magic Literal.

- **Robert C. Martin — *Clean Code: A Handbook of Agile Software
  Craftsmanship*.**
  Practical rules for names, functions, comments, and formatting.
  *Note:* chapters 2 (Meaningful Names) and 3 (Functions) match this week
  exactly.

### Tool documentation

- **Checkstyle — official documentation.**
  How to run Checkstyle from the CLI, Maven, Gradle, and IDE plugins; how to
  pick a configuration (`google_checks.xml` / `sun_checks.xml`) and read the
  report.
  *Note:* focus on "Getting Started", "Standard Checks", and "Running
  Checkstyle".

- **SonarLint — official documentation and rule catalog.**
  Installing the IDE plugin (IntelliJ IDEA, Eclipse, VS Code), understanding
  rule types (Bug, Code Smell, Vulnerability), and connected mode.
  *Note:* browse a few Java rule pages (e.g., magic numbers, cognitive
  complexity) to see the "why + how to fix" structure.

---

## 4. Quick-reference summaries

### 4.1 Naming cheat-sheet

| Element | Convention | Example |
|---------|-----------|---------|
| Class / interface / enum | `PascalCase` | `InvoiceService` |
| Method | `camelCase` (verb) | `calculateTotal()` |
| Variable / field / param | `camelCase` (noun) | `totalAmount` |
| Constant | `UPPER_SNAKE_CASE` | `VAT_RATE` |
| Package | lowercase, dotted | `co.edu.corhuila.billing` |
| Boolean accessor | `is/has/can` | `isActive()` |

### 4.2 Code-smell → refactoring map

| Smell | Typical refactoring |
|-------|---------------------|
| Long Method | Extract Method |
| Magic Number | Replace Magic Number with Constant |
| Long Parameter List / Data Clump | Introduce Parameter Object |
| `switch` on a type code | Replace Conditional with Polymorphism |
| Deeply nested conditionals | Guard Clauses / Decompose Conditional |
| Cryptic name | Rename |
| Duplicate Code | Extract Method + reuse |
| Dead Code | Delete it |

### 4.3 Static analysis in one line

> **Static analysis** reads your code **without running it** to flag style
> issues, smells, bugs, and security problems. **Checkstyle** = style;
> **SonarLint** = smells + bugs + security. Tests (dynamic analysis) still
> prove behavior.

### 4.4 The refactoring loop

```
green tests -> one small refactoring -> re-run tests
   ^                                        |
   |__________ green? continue _____________|
              red? revert last step
```

---

## 5. Tooling quick-start (for self-study)

**SonarLint (IDE plugin — recommended first):**
1. Open your IDE's plugin marketplace (IntelliJ IDEA / Eclipse / VS Code).
2. Search "SonarLint", install, restart the IDE.
3. Open the sample project — findings appear inline as you view/edit files.
4. Click a finding to read the rule's rationale and suggested fix.

**Checkstyle (command line with a config):**
1. Download the Checkstyle "all" JAR and the `google_checks.xml` configuration.
2. Run: `java -jar checkstyle-all.jar -c google_checks.xml LegacySample.java`
3. Read each line: `[severity] rule  file:line  message`.
4. (Optional) Wire it into Maven/Gradle so it runs on every build.

> No installation? You can still act as a **human linter** using the cheat-sheets
> above — this is exactly the Session 1 fallback.

---

## 6. How this material maps to the objectives

| Objective | Where to study |
|-----------|----------------|
| Naming & style conventions | §4.1 here; Session 1 §3.2–3.3 |
| Detect smells with tools | §5 here; Session 1 §3.4–3.5 |
| Refactor without changing behavior | §4.4 here; Session 2 §3–4 |
| Choose the right refactoring | §4.2 here; Session 2 §3.3 |
| Quiz preparation | all summaries + both session exit tickets |
