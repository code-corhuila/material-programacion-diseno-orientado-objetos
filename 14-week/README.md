# Week 14 - Good programming practices in Java and refactoring with static analysis tools

> **Subject:** Object-Oriented Programming and Design
> **Program period:** 2026-B
> **Unit:** Unit 3 — Practical application of OOP in Java
> **Week:** 14 (Assessment period: **Corte 3**)
> **Learning outcome (RAA):** `90_82759`

---

## 1. Overview

By Week 14 you can already design classes, model relationships, and build small
object-oriented programs in Java. Working code, however, is only *half* of
professional software. The other half is code that other people (and your
future self) can **read, understand, extend, and maintain safely**.

This week focuses on **software quality from the inside**: naming conventions,
style guidelines, *code smells*, and **refactoring** — the disciplined art of
improving the internal structure of code **without changing its external
behavior**. We will not just talk about quality in the abstract; we will
*measure* it using two industry-standard **static analysis tools**:
**Checkstyle** (style/convention enforcement) and **SonarLint** (bug and
code-smell detection inside the IDE).

The core professional idea for the week:

> "Any fool can write code that a computer can understand. Good programmers
> write code that humans can understand." — Martin Fowler

---

## 2. RAA and competencies addressed

### Learning outcome (RAA `90_82759`)
The student applies good programming practices and refactoring techniques in
Java, supported by static analysis tools, to produce readable, maintainable,
behavior-preserving code that complies with recognized style conventions.

### Competencies developed this week

| Type | Competency |
|------|-----------|
| **Disciplinary** | Applies Java naming and style conventions (Google Java Style / Oracle conventions) consistently across a codebase. |
| **Disciplinary** | Detects *code smells* and structural weaknesses using automated static analysis. |
| **Procedural** | Executes safe, incremental refactorings that preserve behavior. |
| **Instrumental** | Configures and runs professional tooling (Checkstyle, SonarLint) in a real IDE workflow. |
| **Attitudinal** | Values readability, maintainability, and team conventions as first-class engineering goals. |

---

## 3. Weekly objectives (measurable)

By the end of Week 14, the student will be able to:

1. **Apply** Java naming conventions and code-style guidelines (classes,
   methods, variables, constants, packages) to a given code sample, correcting
   at least 90% of style violations.
2. **Use** static-analysis tools (Checkstyle and SonarLint) to detect code
   smells and style issues, and **interpret** each reported rule (severity,
   category, rationale).
3. **Refactor** a provided "smelly" Java class applying at least four distinct
   refactoring techniques (e.g., *Rename*, *Extract Method*, *Replace Magic
   Number with Constant*, *Guard Clauses*) **without changing its behavior**,
   proven by a passing test.
4. **Distinguish** behavior-preserving refactoring from feature changes and
   bug fixes, and justify why each falls in a different category.
5. **Complete** the Corte 3 quiz identifying common style errors and selecting
   the appropriate refactoring for a given code smell, scoring the passing
   threshold.

---

## 4. Contents outline

1. **Why code quality matters**
   - Total cost of ownership: reading vs. writing code (~10:1 ratio)
   - Technical debt: the metaphor and its real interest payments
   - External quality (works) vs. internal quality (well-built)
2. **Java naming conventions and code style**
   - `UpperCamelCase`, `lowerCamelCase`, `UPPER_SNAKE_CASE`, `lower.dot.case`
   - Oracle Code Conventions and Google Java Style Guide
   - Formatting: indentation, braces, line length, imports, whitespace
   - Comments and Javadoc: when to write them and when not to
3. **Code smells**
   - Bloaters: Long Method, Large Class, Long Parameter List
   - Object-orientation abusers, change preventers, dispensables, couplers
   - Magic numbers, dead code, duplicated code
4. **Refactoring**
   - Definition and the two-hats rule (Fowler)
   - The safety net: tests before you refactor
   - Catalog: Rename, Extract Method/Variable/Constant, Inline, Guard Clauses,
     Replace Magic Number, Decompose Conditional, Introduce Parameter Object
5. **Static analysis tooling**
   - What static analysis is (and what it cannot see)
   - Checkstyle: rule sets, `checkstyle.xml`, running from IDE / Maven / CLI
   - SonarLint: in-IDE feedback, issue severities, quality profiles
   - Reading a report and prioritizing fixes

---

## 5. Session-by-session agenda

| Session | Focus | Main deliverable |
|---------|-------|------------------|
| **[Session 1](./01-session/README.md)** | Good programming practices: naming conventions, style guidelines, and code smells. Worked example: cleaning up a badly named class. | Annotated "before/after" of a naming-and-style cleanup. |
| **[Session 2](./02-session/README.md)** | Refactoring with static analysis: running Checkstyle & SonarLint, reading reports, and performing behavior-preserving refactorings backed by a test. | A refactored class + a green test + a short report of fixed issues. |

Supporting resources for both sessions live in **[`/material`](./material/README.md)**
(download area for the week's PDF and curated readings). The **[optional
activity](./optional-activity/README.md)** extends the work and is submitted via
**GitHub** (not Moodle).

---

## 6. Key-concepts glossary

| Term | Definition |
|------|-----------|
| **Static analysis** | Examining source code *without executing it* to find style violations, bugs, and code smells. |
| **Checkstyle** | A static-analysis tool that checks Java source against a configurable set of *style/convention* rules. |
| **SonarLint** | An IDE extension that flags bugs, vulnerabilities, and *code smells* as you type, using SonarSource rules. |
| **Code smell** | A surface symptom in code that usually points to a deeper design problem (not a bug, but a warning sign). |
| **Refactoring** | A behavior-preserving change to the internal structure of code that makes it easier to understand and cheaper to modify. |
| **Technical debt** | The implied future cost of choosing an easy/quick solution now instead of a better one that would take longer. |
| **Naming convention** | An agreed set of rules for how identifiers are written (e.g., `lowerCamelCase` for variables). |
| **Magic number** | An unexplained numeric literal in code that should be a named constant. |
| **Cyclomatic complexity** | A metric counting the number of independent paths through code; high values signal hard-to-test methods. |
| **Guard clause** | An early `return`/`throw` that handles an edge case up front to reduce nesting. |
| **Javadoc** | The standard Java documentation format (`/** ... */`) processed into API docs. |
| **Quality profile** | A named set of active rules a tool applies to a project. |
| **Two-hats rule** | Fowler's principle: at any moment you are *either* adding a feature *or* refactoring — never both at once. |

---

## 7. Achievement / self-check checklist

Mark each item once you can do it **unaided**:

- [ ] I can classify an identifier as a class, method, variable, or constant and write it in the correct Java case style.
- [ ] I can name the two style guides referenced this week and one rule from each.
- [ ] I can identify at least five common code smells in a sample class.
- [ ] I can explain the difference between refactoring, a bug fix, and a new feature.
- [ ] I can state *why tests must exist before refactoring*.
- [ ] I can run Checkstyle on a file and interpret at least three of its warnings.
- [ ] I can run SonarLint in the IDE and describe the difference between a "bug", a "vulnerability", and a "code smell".
- [ ] I applied *Extract Method* and *Replace Magic Number with Constant* on real code and the tests still pass.
- [ ] I can justify a refactoring in terms of readability/maintainability, not personal taste.
- [ ] I completed the Corte 3 style-and-refactoring quiz.

---

## 8. Resources index

| Resource | Location | Purpose |
|----------|----------|---------|
| Session 1 guide | [`01-session/README.md`](./01-session/README.md) | Naming, style, and code smells. |
| Session 2 guide | [`02-session/README.md`](./02-session/README.md) | Refactoring + static analysis tooling. |
| Readings & downloads | [`material/README.md`](./material/README.md) | Curated readings, summaries, PDF download area. |
| Optional activity | [`optional-activity/README.md`](./optional-activity/README.md) | Extended practice, submitted via GitHub. |

### External references (open standards & docs)
- Oracle, *Code Conventions for the Java Programming Language*.
- Google, *Google Java Style Guide*.
- Martin Fowler, *Refactoring: Improving the Design of Existing Code* (2nd ed.).
- Robert C. Martin, *Clean Code: A Handbook of Agile Software Craftsmanship*.
- Checkstyle official documentation — `checkstyle.org`.
- SonarLint / SonarSource rules — `rules.sonarsource.com`.

---

### Assessment note (Corte 3)
This week belongs to **Corte 3**. The graded evidence is the **quiz** on
identifying common style errors and appropriate refactorings, complemented by
the in-class deliverables above. The GitHub-submitted **optional activity**
provides additional formative practice and bonus evidence of the RAA.
