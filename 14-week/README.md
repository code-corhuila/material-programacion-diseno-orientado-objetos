# Week 14 — Good Programming Practices in Java and Refactoring with Static Analysis Tools

**Course:** Object-Oriented Programming and Design
**Program:** Systems / Software Engineering — CORHUILA
**Term:** 2026-B
**Unit:** Unit 3 — Practical application of OOP in Java
**Assessment period:** Corte 3 (third grading cut)
**Weekly topic:** Good programming practices in Java and refactoring with static analysis tools
**Learning outcome (RAA):** `90_82759`

---

## 1. Overview

By Week 14 you already know how to model a domain with classes, apply the four
pillars of OOP (encapsulation, inheritance, polymorphism, abstraction) and
organize behavior with interfaces and design principles. Code that *works* is
only half of professional software engineering. The other half is code that
**other people — including your future self — can read, trust, and change
safely**.

This week we shift the question from *"does it run?"* to *"is it clean?"*. You
will learn the naming conventions and style rules that make Java code readable
across an entire team, you will run **static analysis tools** (Checkstyle and
SonarLint) that read your source code without executing it to flag *code smells*
and style violations, and you will practice **refactoring**: improving the
internal structure of code **without changing its external behavior**.

Refactoring is not "rewriting". It is a disciplined, small-step activity backed
by tests, where every step preserves what the program does while making it
easier to understand and cheaper to maintain.

---

## 2. RAA and competencies addressed

**RAA `90_82759`** — *The student applies good programming practices and code
quality tools to produce readable, maintainable, and standards-compliant
object-oriented software in Java.*

| Competency | How it is developed this week |
|------------|-------------------------------|
| **Technical — Code quality** | Applies Java naming conventions and the Google/Oracle style guides to real code. |
| **Technical — Tooling** | Configures and runs Checkstyle and SonarLint; interprets their reports. |
| **Technical — Maintainability** | Performs behavior-preserving refactorings to remove code smells. |
| **Cognitive — Analysis** | Distinguishes style issues from design smells and prioritizes fixes by impact. |
| **Attitudinal — Professional discipline** | Treats readability and standards compliance as a professional responsibility, not an afterthought. |

---

## 3. Learning objectives (measurable)

By the end of Week 14, the student will be able to:

1. **Apply** Java naming conventions and code-style guidelines (Oracle / Google
   Java Style) to a given code sample, correcting at least 90% of the style
   violations.
2. **Use** static-analysis tools (Checkstyle and SonarLint) to detect code
   smells and style issues in a Java project, and **interpret** the resulting
   report (severity, rule, location).
3. **Refactor** a piece of "smelly" code — applying at least three named
   refactorings (e.g., *Rename*, *Extract Method*, *Replace Magic Number with
   Constant*) — **without changing its observable behavior**, verified by a
   passing test suite.
4. **Classify** common style errors and select the appropriate refactoring for
   each, achieving a passing score on the Week 14 quiz.
5. **Justify**, in plain language, *why* a given change improves readability or
   maintainability, connecting it to a concrete quality attribute.

---

## 4. Contents outline

1. **Why code quality matters**
   - Cost of change; the "code is read more than it is written" principle
   - Technical debt and the boy-scout rule
2. **Java naming conventions and code style**
   - Identifiers: classes, methods, variables, constants, packages, generics
   - Formatting: indentation, braces, line length, imports
   - Oracle Code Conventions vs. Google Java Style Guide
3. **Code smells**
   - Bloaters (Long Method, Large Class, Long Parameter List)
   - Object-orientation abusers, change preventers, dispensables, couplers
4. **Static analysis**
   - What "static" means; static vs. dynamic analysis
   - Checkstyle (style enforcement) and SonarLint (smells + bugs + security)
   - Reading a report: rule ID, severity, location, rationale
5. **Refactoring**
   - Definition and the "behavior-preserving" contract
   - The safety net: tests before refactoring
   - Catalog: Rename, Extract Method, Inline, Replace Magic Number with
     Constant, Introduce Parameter Object, Replace Conditional with
     Polymorphism, Guard Clauses
6. **Putting it together**
   - Workflow: analyze → prioritize → refactor in small steps → re-run tools → verify tests

---

## 5. Session-by-session agenda

| Session | Focus | Main deliverable |
|---------|-------|------------------|
| **Session 1** | Java naming conventions, code style, and code smells. Reading a Checkstyle/SonarLint report. | Annotated style-corrected code + list of detected smells |
| **Session 2** | Refactoring catalog and disciplined refactoring workflow with a test safety net. | A "smelly" class refactored to clean code with tests still green |

Each session is 2 academic hours. Detailed timed agendas are inside each
session's `README.md`:

- [`01-session/README.md`](01-session/README.md)
- [`02-session/README.md`](02-session/README.md)

---

## 6. Key-concepts glossary

| Term | Definition |
|------|------------|
| **Coding convention / style guide** | A shared set of rules for how source code should look (naming, formatting, structure) so a whole team writes in one consistent voice. |
| **Naming convention** | Rules for choosing and formatting identifiers (e.g., `PascalCase` for classes, `camelCase` for methods/variables, `UPPER_SNAKE_CASE` for constants). |
| **Readability** | How easily a human can understand what code does and why. |
| **Maintainability** | How easily code can be changed, extended, or fixed without introducing defects. |
| **Technical debt** | The implied future cost of choosing an easy/quick solution now instead of a better one that would take longer. |
| **Code smell** | A surface symptom in code that usually points to a deeper design problem (not a bug, but a warning sign). |
| **Static analysis** | Examining source code **without executing it** to find style issues, smells, potential bugs, and security problems. |
| **Dynamic analysis** | Examining a program **while it runs** (e.g., tests, profilers, debuggers). |
| **Checkstyle** | A static-analysis tool that enforces coding-style rules against a configuration (e.g., Google or Sun style). |
| **SonarLint** | An IDE static-analysis tool that flags bugs, code smells, and security issues against SonarSource rules as you type. |
| **Refactoring** | A controlled, behavior-preserving change to the internal structure of code to make it easier to understand and cheaper to modify. |
| **Behavior-preserving** | The observable outputs/effects of the program stay the same before and after the change. |
| **Regression** | A defect introduced into previously working functionality. |
| **Extract Method** | Turning a fragment of code into its own well-named method. |
| **Magic number** | An unexplained numeric literal in code; replaced by a named constant. |
| **Guard clause** | An early `return`/`throw` that handles an edge case up front, flattening nested conditionals. |
| **Cyclomatic complexity** | A metric counting the number of independent paths through code; higher means harder to test and understand. |
| **Boy-scout rule** | "Always leave the code cleaner than you found it." |

---

## 7. Achievement / self-check checklist

Mark each item once you can honestly do it **without help**:

- [ ] I can name and correctly apply the Java conventions for classes, methods, variables, constants, and packages.
- [ ] I can explain the difference between a *style issue* and a *design smell*.
- [ ] I can identify at least five common code smells and give an example of each.
- [ ] I can explain what "static analysis" means and how it differs from running tests.
- [ ] I have run Checkstyle (or read its report) and can interpret a violation line: rule, severity, location.
- [ ] I have run SonarLint in the IDE and acted on at least one reported smell.
- [ ] I can define "refactoring" and explain the behavior-preserving contract.
- [ ] I can apply *Rename*, *Extract Method*, and *Replace Magic Number with Constant* by hand.
- [ ] I always run the tests before and after refactoring and understand *why*.
- [ ] I can justify, in one sentence, why a specific change improves readability or maintainability.

---

## 8. Resources index

- **In-class material (download area):** [`material/README.md`](material/README.md)
  — curated readings, official style guides, tool documentation, and a
  downloadable PDF summary.
- **Optional practice (GitHub submission):**
  [`optional-activity/README.md`](optional-activity/README.md) — refactor a
  smelly project and submit via a GitHub repository.
- **Sessions:** [`01-session/`](01-session/README.md) ·
  [`02-session/`](02-session/README.md)

### External references (full list with notes in the material folder)

- Oracle, *Code Conventions for the Java Programming Language*.
- Google, *Google Java Style Guide*.
- Martin Fowler, *Refactoring: Improving the Design of Existing Code* (2nd ed.).
- Robert C. Martin, *Clean Code: A Handbook of Agile Software Craftsmanship*.
- Checkstyle project documentation.
- SonarSource / SonarLint documentation and rule catalog.

---

> **Note on tools.** Checkstyle and SonarLint are free and open to students.
> SonarLint installs as an IDE plugin (IntelliJ IDEA, Eclipse, VS Code).
> Checkstyle runs from the command line, from Maven/Gradle, or as an IDE plugin.
> Installation guidance is in the `material/` folder.
