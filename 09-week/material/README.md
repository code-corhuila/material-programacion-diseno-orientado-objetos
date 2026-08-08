# Week 09 - Study material and readings (download area)

**Subject:** Object-Oriented Programming and Design (2026-B)
**Unit 2 - Design principles and modularity | Corte 2**
**Topic:** Composition and code modularization (component-oriented design)
**RAA:** 90_82759

---

> **How to use this area.** This folder is a **download area** for the week's reading material
> (a consolidated PDF placed here by your instructor). It is **not** a Moodle submission box — you
> do not upload anything here. Download the PDF, study it alongside the two session guides, and
> use the summaries below to focus your reading. Hands-on submissions go to the
> [optional activity](../optional-activity/README.md) via **GitHub**.

---

## 1. What to download

| Item | File (in this folder) | What it contains |
|------|-----------------------|------------------|
| Week 09 reader (PDF) | `week09-composition-reader.pdf` | Consolidated notes: relationships between objects, composition vs. inheritance, refactoring recipes, and worked examples that mirror the two sessions. |

> If the PDF is not yet present, the same content is fully covered by the two session guides
> ([Session 1](../01-session/README.md), [Session 2](../02-session/README.md)); the PDF is a
> convenience for offline study.

---

## 2. Curated readings index

The following are the canonical references for this week's topic. Use them to go beyond the
lecture notes.

### Core references

1. **Gamma, Helm, Johnson, Vlissides — *Design Patterns: Elements of Reusable Object-Oriented
   Software* (GoF, 1994).**
   *Why:* the original source of the guideline **"favor object composition over class
   inheritance"** and of the Strategy pattern. Read the introduction ("Inheritance versus
   Composition") in Chapter 1.

2. **Robert C. Martin — *Agile Software Development: Principles, Patterns, and Practices*.**
   *Why:* clearest practical treatment of the **Liskov Substitution Principle** (the
   Rectangle/Square example) and how LSP violations reveal bad inheritance.

3. **Freeman & Robson — *Head First Design Patterns* (2nd ed.).**
   *Why:* the `Duck` / `QuackBehavior` example (Strategy via composition) is the most intuitive
   introduction to replacing inheritance with pluggable components. Chapter 1.

4. **Joshua Bloch — *Effective Java* (3rd ed.), Item 18: "Favor composition over inheritance"
   and Item 19: "Design and document for inheritance or else prohibit it".**
   *Why:* explains the fragile base class problem and the `Stack`/`InstrumentedHashSet`
   cautionary tales in production Java.

5. **Barbara Liskov & Jeannette Wing — "A Behavioral Notion of Subtyping" (1994).**
   *Why:* the primary academic source of the substitution principle, for students who want the
   formal definition.

### Supplementary / quick reference

6. **UML relationship notation** — any reliable UML reference for the four relationship arrows
   (dependency, association, aggregation, composition) and the diamond conventions.
7. **Refactoring catalog — "Replace Inheritance with Delegation"** (Martin Fowler,
   *Refactoring*).
   *Why:* the step-by-step mechanics behind the refactoring recipe used in Session 2.

---

## 3. Summary notes (read these first)

### 3.1 The four object relationships in one paragraph
Objects connect through **dependency** (uses transiently), **association** (stores a link to a
peer), **aggregation** (has-a part that can live independently and be shared — hollow diamond),
and **composition** (owns-a part whose lifetime is bound to the whole and is not shared — filled
diamond). The distinguishing question between aggregation and composition is *"if the whole is
destroyed, must the part be destroyed too?"*

### 3.2 Composition and delegation
Composition means an object **holds** other objects as fields and gets work done by
**delegating** — forwarding requests to those contained objects. Providing the collaborators from
outside (**constructor injection / dependency injection**) makes the design flexible and testable
because parts can be swapped, including with test doubles.

### 3.3 Why favor composition over inheritance
Inheritance is white-box reuse: it couples a subclass to the parent's *implementation*, creates
the **fragile base class** problem, is fixed at compile time, and forces you to accept the parent's
*entire* API (the "gorilla/banana/jungle" effect). Composition is black-box reuse: lower coupling,
runtime flexibility, and the ability to combine behavior from several collaborators. The GoF
guideline **"favor composition over inheritance"** says: default to has-a; use inheritance only
for a **genuine, substitutable is-a**.

### 3.4 The Liskov Substitution Principle as a test
**LSP:** a subclass instance must be usable anywhere the superclass is expected without breaking
correctness. If substituting a subclass breaks client code (e.g., `Penguin.fly()` throwing, or a
`Square` breaking independent width/height), the "is-a" is false and inheritance is the wrong tool
— refactor to composition.

### 3.5 Refactoring inheritance to composition (recipe)
Spot the smell → extract the reused/variable behavior into its own class (behind an interface if
it varies) → replace `extends X` with a private field of type `X` → delegate the relevant methods
→ inject the collaborator → re-run tests. Result: unwanted API removed, LSP restored, behavior
preserved, and new variants addable without editing existing classes.

---

## 4. Self-study questions (not graded — check your understanding)

1. Draw the UML for: a `University` that **has** `Faculties` (composition) and **employs**
   `Professors` (association). Justify each diamond/line.
2. Explain, with a code sketch, how injecting a collaborator lets you unit-test a class without
   its real dependencies.
3. Take any hierarchy from an earlier week that used `extends`. Does it pass LSP? If not, refactor
   it to composition.
4. Why can composition combine behavior from several sources while single inheritance cannot?
5. Give one situation where inheritance is *still* the right choice, and explain why it passes the
   Session 2 decision checklist.

---

## 5. Connection to assessment (Corte 2)

- The **end-of-unit quiz** draws directly on §3.3–§3.4 (distinguishing inheritance from
  composition, recognizing LSP violations).
- The **in-class deliverables** from both sessions and the **optional GitHub activity** exercise
  §3.2 and §3.5 (implementing composition and refactoring).

Study order recommendation: **summaries (§3) → session guides → PDF reader → self-study
questions → optional activity → quiz.**
