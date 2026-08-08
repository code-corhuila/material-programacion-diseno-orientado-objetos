# Week 05 - Assessment Corte 1: partial exam and feedback on OOP foundations

> **Course:** Object-Oriented Programming and Design
> **Program:** CORHUILA - Software / Systems Engineering
> **Term:** 2026-B
> **Unit:** Unit 1 - Fundamentals of Object-Oriented Programming
> **Week:** 05 (Corte 1 - Assessment week)
> **Learning Outcome (RAA):** 90_82759

---

## 1. Overview

Week 05 closes **Corte 1**. Weeks 01-04 introduced the pillars of object-oriented
programming (OOP): the object model, classes and objects, encapsulation and access
control, and constructors and object initialization. This week you **demonstrate**
that knowledge under exam conditions and then **learn from the results** through
structured feedback.

The week has two clearly separated moments:

1. **Session 1 - Partial exam (assessment).** A closed, individually solved
   assessment combining conceptual questions (multiple choice, short answer,
   code reading) and a small applied task: modeling and implementing a single
   class with encapsulation and constructors.
2. **Session 2 - Feedback and error analysis (metacognition).** We review the
   exam item by item, classify the most common mistakes, correct them together,
   and each student self-assesses **prior vs. posterior** knowledge of Corte 1
   using a **Trello** board.

> **Assessment period:** This README belongs to the **Corte 1** grading period.
> The partial exam in Session 1 is the summative instrument that consolidates the
> Corte 1 grade for Unit 1.

---

## 2. Learning outcome and competencies

### 2.1 RAA (Resultado de Aprendizaje) 90_82759

> *The student models and implements a small class-based solution correctly,
> applying the fundamentals of object-oriented programming (classes, objects,
> encapsulation, and constructors), and interprets feedback to identify and
> correct conceptual and implementation errors.*

### 2.2 Competencies addressed this week

| Type | Competency |
|------|-----------|
| **Cognitive** | Recall, distinguish, and explain the four foundational OOP concepts of Corte 1: class, object, encapsulation, constructor. |
| **Procedural** | Translate a short problem statement into a correct single-class design and a working implementation under time pressure. |
| **Metacognitive** | Interpret feedback, classify one's own errors (conceptual vs. implementation), and plan corrective actions. |
| **Attitudinal** | Act with academic integrity during the assessment and give/receive constructive feedback. |

---

## 3. Objectives (measurable)

By the end of Week 05, the student will be able to:

1. **Model and implement** a small class-based solution correctly under exam
   conditions, producing a compilable class with fields, constructors, and methods.
2. **Demonstrate mastery** of classes, objects, encapsulation, and constructors by
   answering conceptual items with at least **70%** accuracy.
3. **Interpret feedback** to identify and correct at least **two** conceptual or
   implementation errors from the graded exam, writing a short justification for
   each correction.
4. **Self-assess** prior and posterior knowledge of Corte 1 topics using a
   **Trello** board, moving each topic card across a KWL-style workflow
   (*Know / Want-to-improve / Learned*).
5. **Distinguish** between a conceptual error (wrong mental model) and an
   implementation error (wrong syntax/logic) and state a concrete strategy to
   avoid each in Corte 2.

---

## 4. Contents outline

```
Unit 1 - Fundamentals of OOP  (recap consolidated for the exam)
│
├── 1. The object model
│     ├── State, behavior, identity
│     └── Objects as instances of classes
│
├── 2. Classes and objects
│     ├── Fields (attributes) and methods (behavior)
│     ├── Class as a blueprint; object as a concrete instance
│     └── The `new` operator and reference semantics
│
├── 3. Encapsulation and access control
│     ├── private / public / protected
│     ├── Getters and setters with validation (invariants)
│     └── Information hiding and why it matters
│
├── 4. Constructors and initialization
│     ├── Default vs. parameterized constructors
│     ├── Constructor overloading
│     ├── `this` reference and field shadowing
│     └── Object lifecycle: creation → use → (garbage collection)
│
└── 5. Metacognition
      ├── Conceptual vs. implementation errors
      └── KWL self-assessment with Trello
```

---

## 5. Session-by-session agenda

| Session | Focus | Duration | Deliverable |
|---------|-------|----------|-------------|
| **01** | **Partial exam (Corte 1).** Warm-up, exam rules, timed assessment (concepts + applied class). | 2 h | Completed exam (individual) |
| **02** | **Feedback & error analysis.** Item-by-item review, error taxonomy, guided correction, Trello self-assessment. | 2 h | Corrections + Trello board screenshot |

Detailed plans:
- [Session 01 - Partial exam](./01-session/README.md)
- [Session 02 - Feedback and error analysis](./02-session/README.md)

Supporting areas:
- [Material (download area / readings)](./material/README.md)
- [Optional activity (GitHub submission)](./optional-activity/README.md)

---

## 6. Key-concepts glossary

| Term | Definition |
|------|-----------|
| **Class** | A blueprint or template that defines the structure (fields) and behavior (methods) shared by a family of objects. |
| **Object** | A concrete instance of a class, occupying memory and holding its own state; has identity, state, and behavior. |
| **Instance** | Another word for an object created from a class via `new`. |
| **Field (attribute)** | A variable declared inside a class that stores part of an object's state. |
| **Method** | A function defined inside a class that expresses behavior and may read/modify state. |
| **Encapsulation** | Bundling data and the methods that operate on it in one unit, while hiding internal details behind a controlled public interface. |
| **Access modifier** | A keyword (`private`, `protected`, `public`) that controls visibility of a member. |
| **Getter / Setter** | Public accessor/mutator methods that expose or update a private field, often enforcing validation. |
| **Invariant** | A condition about an object's state that must always hold true (e.g., `age >= 0`); setters and constructors enforce invariants. |
| **Constructor** | A special method invoked when an object is created; initializes fields and establishes invariants. |
| **Default constructor** | A no-argument constructor (provided automatically only if no other constructor is declared). |
| **Overloading** | Declaring several methods/constructors with the same name but different parameter lists. |
| **`this`** | A reference to the current object; disambiguates fields from parameters and enables constructor chaining. |
| **Reference semantics** | Object variables hold references (addresses), not the object itself; assignment copies the reference. |
| **Conceptual error** | A mistake rooted in a wrong mental model (e.g., confusing a class with an object). |
| **Implementation error** | A mistake in syntax or logic that produces wrong or non-compiling code. |
| **KWL** | A self-assessment technique: what I **K**now, what I **W**ant to learn, what I **L**earned. |

---

## 7. Achievement / self-check checklist

Tick each item honestly before the exam and again after feedback.

**Before the exam (readiness):**
- [ ] I can define *class*, *object*, *encapsulation*, and *constructor* in my own words.
- [ ] I can write a class with private fields and public getters/setters.
- [ ] I can write both a default and a parameterized constructor.
- [ ] I can explain why `this` is needed and use it correctly.
- [ ] I can trace what `new` does and predict reference-aliasing effects.
- [ ] I can enforce a simple invariant inside a setter.

**After feedback (consolidation):**
- [ ] I identified at least two of my own errors and classified each (conceptual / implementation).
- [ ] I rewrote the corrected code and it compiles/runs.
- [ ] I explained *why* each correction is right, not just *what* changed.
- [ ] I updated my Trello board (prior vs. posterior) for every Corte 1 topic.
- [ ] I wrote one concrete study action to carry into Corte 2.

---

## 8. Resources index

| Resource | Location | Purpose |
|----------|----------|---------|
| Session 1 plan (exam) | [`01-session/README.md`](./01-session/README.md) | Exam rules, worked example, practice, exit ticket |
| Session 2 plan (feedback) | [`02-session/README.md`](./02-session/README.md) | Error taxonomy, guided correction, Trello self-assessment |
| Readings & download area | [`material/README.md`](./material/README.md) | Curated readings + summary notes (PDF download) |
| Optional activity | [`optional-activity/README.md`](./optional-activity/README.md) | Extra practice submitted via GitHub + rubric |
| Trello (self-assessment) | https://trello.com | KWL board for prior/posterior knowledge |

---

## 9. Academic integrity note

The partial exam is an **individual** assessment. Sharing answers, using
unauthorized notes or AI assistants during the closed portion, or copying code
constitutes academic dishonesty and is handled under CORHUILA's academic
regulations. The optional GitHub activity, by contrast, is a **learning** task
where consulting documentation and citing sources is expected and encouraged.
