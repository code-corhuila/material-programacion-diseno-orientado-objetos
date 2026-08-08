# Week 10 — Assessment Corte 2: Partial Exam and Feedback on Design and Modularity

**Course:** Object-Oriented Programming and Design
**Program:** Systems / Software Engineering — CORHUILA
**Academic period:** 2026-B
**Unit:** Unit 2 — Design principles and modularity
**Week:** 10 (Assessment period — Corte 2)
**Learning outcome (RAA):** `90_82759`

---

## 1. Overview

Week 10 closes the second grading period (**Corte 2**) of the course. During Unit 2 you studied how to build software that is not merely *correct* but *well-designed*: hierarchies that model reality faithfully, modules with clear boundaries, and abstractions that hide the right details. This week converts that study into evidence.

The week has two complementary movements:

1. **Session 1 — The partial exam (summative assessment).** A closed, timed evaluation in which you design and implement a small but complete object-oriented model under exam conditions. You will be asked to reason about inheritance vs. composition, to apply polymorphism and abstraction deliberately, and to justify your decisions in writing.
2. **Session 2 — Feedback and remediation (formative assessment).** A structured review of the exam. You interpret a rubric-based critique of your own class model, locate design flaws, and refactor them into a cleaner solution. Learning here comes from *correcting*, not just from being graded.

The pedagogical premise is deliberate: a designer is measured both by what they can produce under pressure and by how intelligently they respond to critique. This week trains both.

> **Assessment period note.** This is a **Corte 2** assessment week. The partial exam carries the largest single weight of the corte. Attendance at both sessions is mandatory: Session 1 is the exam itself, and Session 2 records your remediation, which contributes to the formative component of the grade.

---

## 2. RAA and competencies addressed

### Learning outcome (RAA `90_82759`)

> The student designs and implements coherent object-oriented class hierarchies, applying inheritance, polymorphism, abstraction, interfaces, and composition correctly, and justifies design decisions against explicit quality criteria.

### Competencies exercised this week

| Competency | Type | How it is assessed |
|---|---|---|
| Design a coherent class hierarchy under time constraints | Specific / technical | Exam Part A (design) |
| Apply inheritance, polymorphism, abstraction, interfaces | Specific / technical | Exam Part B (implementation) |
| Choose between inheritance and composition with justification | Specific / analytical | Exam Part C (written rationale) |
| Interpret critique and remediate design flaws | Transversal / metacognitive | Session 2 refactor + reflection |
| Communicate design decisions in precise technical language | Transversal / communicative | Written justifications, exit tickets |

---

## 3. Objectives (measurable)

By the end of Week 10, the student will be able to:

1. **Design** a coherent class hierarchy of at least four related types from a written specification, in under 90 minutes, satisfying an explicit correctness rubric (no cyclic dependencies, respect for the Liskov Substitution Principle, single responsibility per class).
2. **Implement** the designed model in Java (or the course language), correctly using at least one abstract class, one interface, one overridden polymorphic method, and one composition relationship — verified against a provided checklist.
3. **Justify** in writing, in at least three sentences per decision, why inheritance *or* composition was selected for two specific relationships, citing the "is-a" vs. "has-a" test and the fragility of subtyping.
4. **Diagnose** at least three design flaws in a given (or self-produced) class model, mapping each flaw to the specific principle it violates (LSP, SRP, DIP, or favor-composition-over-inheritance).
5. **Refactor** a flawed hierarchy into a corrected version and explain, in a short reflection, what the change improved and what trade-off it introduced.

---

## 4. Contents outline

- **Exam readiness recap**
  - The five pillars in one page: inheritance, polymorphism, abstraction, interfaces, composition
  - The "is-a" vs. "has-a" decision procedure
  - Reading a specification and extracting a domain model
- **The partial exam (Corte 2)**
  - Structure: Part A (design), Part B (implementation), Part C (justification)
  - Time budgeting under exam conditions
  - Common failure modes and how the rubric penalizes them
- **Feedback and remediation**
  - How to read a design rubric as a diagnostic tool
  - Cataloguing design smells: refused bequest, God class, yo-yo problem, tight coupling
  - Refactoring moves: *Extract Interface*, *Replace Inheritance with Delegation*, *Pull Up / Push Down Member*
  - Writing a remediation reflection

---

## 5. Session-by-session agenda

| Session | Focus | Modality | Duration | Deliverable |
|---|---|---|---|---|
| **Session 1** | Exam readiness recap + **Partial Exam (Corte 2)** | In-class, closed | 120 min | Completed exam (Parts A, B, C) |
| **Session 2** | Feedback, error analysis, and guided refactor | In-class, collaborative | 120 min | Corrected model + remediation reflection + exit ticket |

Detailed timed agendas live in each session's `README.md`:

- [`01-session/README.md`](./01-session/README.md) — Exam readiness recap and the partial exam
- [`02-session/README.md`](./02-session/README.md) — Feedback and guided remediation

---

## 6. Key-concepts glossary

| Term | Definition |
|---|---|
| **Inheritance** | A mechanism whereby a subclass acquires the fields and behavior of a superclass, establishing an *is-a* relationship. Enables reuse and subtype polymorphism but couples the subclass to the superclass's implementation. |
| **Polymorphism** | The ability of a single reference type to denote objects of different concrete types, so that a method call resolves to the runtime object's implementation (dynamic dispatch). |
| **Abstraction** | The act of exposing only the essential features of a concept while hiding incidental detail; realized in code through abstract classes and interfaces. |
| **Interface** | A contract of method signatures without implementation (or with default methods), declaring *what* a type can do without dictating *how*. Enables multiple, orthogonal capabilities. |
| **Composition** | Building a type by holding references to other objects (*has-a*), delegating work to them. Preferred over inheritance when there is no true subtype relationship. |
| **Liskov Substitution Principle (LSP)** | Objects of a subtype must be substitutable for objects of the supertype without breaking the program's correctness. A subclass must honor the superclass's contract. |
| **Single Responsibility Principle (SRP)** | A class should have one, and only one, reason to change — one coherent responsibility. |
| **Dependency Inversion Principle (DIP)** | High-level modules should depend on abstractions, not on concrete low-level modules. |
| **Refused bequest** | A design smell where a subclass inherits members it does not want or cannot meaningfully implement — a signal that inheritance was misused. |
| **God class** | A class that accumulates too many responsibilities; violates SRP and resists change. |
| **Yo-yo problem** | Difficulty in reading code because control jumps up and down a deep inheritance hierarchy. |
| **Delegation** | Forwarding a request from one object to another (its helper); the runtime mechanism that makes composition work. |
| **Coupling** | The degree to which one module depends on the internals of another; lower coupling is generally better. |
| **Cohesion** | The degree to which the elements of a module belong together; higher cohesion is generally better. |

---

## 7. Achievement / self-check checklist

Use this before Session 1 to confirm you are exam-ready, and after Session 2 to confirm you closed the loop.

**Before the exam — am I ready?**

- [ ] I can state the "is-a" vs. "has-a" test in one sentence and apply it to a new example.
- [ ] I can write an abstract class with at least one abstract and one concrete method from memory.
- [ ] I can declare and implement an interface, including a default method.
- [ ] I can explain why overriding `equals` requires care and give one LSP violation example.
- [ ] I can extract at least four candidate classes from a paragraph-long specification in under 10 minutes.
- [ ] I can budget 120 minutes across a three-part exam.

**After remediation — did I close the loop?**

- [ ] I identified at least three concrete flaws in my exam model.
- [ ] I mapped each flaw to the specific principle it violated.
- [ ] I applied at least one named refactoring (Extract Interface / Replace Inheritance with Delegation / Pull Up Member).
- [ ] My corrected model has no refused bequest and no God class.
- [ ] I wrote a reflection stating one improvement and one trade-off.

---

## 8. Resources index

| Resource | Location | Purpose |
|---|---|---|
| Session 1 guide | [`01-session/README.md`](./01-session/README.md) | Exam recap, worked example, in-class practice, exit ticket |
| Session 2 guide | [`02-session/README.md`](./02-session/README.md) | Feedback framework, refactoring catalogue, remediation |
| Curated readings & download area | [`material/README.md`](./material/README.md) | Reference notes and a downloadable study PDF |
| Optional practice | [`optional-activity/README.md`](./optional-activity/README.md) | Extra design challenge, submitted via GitHub, with rubric |

---

## 9. How this week is graded (transparency)

| Component | Weight within the week's contribution to Corte 2 | Source |
|---|---|---|
| Partial exam — Part A (design) | 35% | Session 1 |
| Partial exam — Part B (implementation) | 35% | Session 1 |
| Partial exam — Part C (justification) | 20% | Session 1 |
| Remediation reflection (formative) | 10% | Session 2 |

The optional activity does not replace the exam; it can earn bonus recognition as described in [`optional-activity/README.md`](./optional-activity/README.md).

---

*Prepared for CORHUILA — Object-Oriented Programming and Design, 2026-B. All material in English by course design.*
