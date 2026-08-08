# Week 15 - Assessment Corte 3: partial exam, incremental-project delivery and feedback

> **Course:** Object-Oriented Programming and Design
> **Program period:** 2026-B
> **Unit:** Unit 3 - Practical application of OOP in Java
> **Corte (assessment period):** Corte 3 (final grading period of the term)
> **Learning outcome (RAA):** `90_82759`
> **Week focus:** Consolidating and demonstrating applied OOP competencies through a partial exam, the delivery and defense of the cumulative incremental project, and structured feedback.

---

## 1. Overview

Week 15 is an **assessment and consolidation week**. It is the point in the term where everything built during Unit 3 - exceptions, collections, and file persistence layered on top of the OOP foundations from Units 1 and 2 - is brought together, measured, and defended.

Two graded moments anchor the week:

1. **Partial exam (Corte 3)** - an individual, timed assessment that checks whether each student can *reason about* and *write* OOP-based Java code that integrates exception handling, the Collections Framework, and file persistence.
2. **Incremental-project delivery and defense** - a team (or individual) submission of the cumulative application that has grown across the term, followed by a short oral defense and a structured feedback cycle.

The week closes the loop: students receive **feedback** they can act on, and they self-assess against explicit quality, integration, and maintainability criteria. The goal is not only a grade, but *evidence of transferable competence* - the ability to design, build, and justify a maintainable object-oriented application end to end.

> **Note on scope.** This is a summative week. There is no new major theoretical content introduced; instead, the theory notes in each session **synthesize** the term's concepts into review frameworks, checklists, and worked exam-style problems.

---

## 2. RAA and competencies addressed

### Learning outcome (RAA) `90_82759`

> *The student integrates exceptions, collections, and file persistence into a working, maintainable object-oriented application, and defends the design decisions applying OOP principles end to end.*

### Competencies

| Type | Competency |
|------|-----------|
| **Cognitive (know)** | Explain how encapsulation, inheritance, polymorphism, and abstraction interact with exception handling, collections, and persistence in a layered application. |
| **Procedural (do)** | Design and implement a Java application that reads/writes files, uses generic collections, and handles error conditions with a coherent exception strategy. |
| **Attitudinal (be)** | Deliver on commitments, defend design decisions professionally, receive critical feedback constructively, and act on it to improve the codebase. |

### Mapping to weekly objectives

| Objective | RAA element | Assessed in |
|-----------|-------------|-------------|
| Integrate exceptions, collections, and file persistence into a working application | Integration | Partial exam + project code |
| Deliver and defend the cumulative incremental project applying OOP principles end to end | End-to-end OOP | Project delivery + oral defense |
| Demonstrate quality, integration, and maintainability criteria in the final code | Maintainability | Project rubric |
| Interpret feedback to consolidate applied OOP competencies | Consolidation | Feedback cycle + self-check |

---

## 3. Weekly objectives (measurable)

By the end of Week 15, the student will be able to:

1. **Integrate** exceptions, generic collections, and file persistence into a single working Java application, demonstrated by a running build that passes the acceptance checklist.
2. **Solve** at least 4 of 5 exam items that require reading, debugging, and writing OOP Java code involving `try`/`catch`/`finally`, `try`-with-resources, the Collections Framework, and file I/O.
3. **Deliver and orally defend** the cumulative incremental project, justifying at least three design decisions in terms of OOP principles (encapsulation, inheritance, polymorphism, abstraction) and the SOLID guideline they support.
4. **Evaluate** their own code against explicit quality, integration, and maintainability criteria, producing a self-assessment that agrees with the instructor rubric within one performance band.
5. **Interpret and act on** written and oral feedback by producing a concrete, prioritized improvement plan (at least three actionable items) for the final code.

---

## 4. Contents outline

- **Review synthesis of Unit 3**
  - Exception handling: checked vs. unchecked, `try`-with-resources, custom exceptions, exception translation, fail-fast vs. fail-safe.
  - Collections Framework: `List`, `Set`, `Map`, `Queue`; choosing the right implementation; generics; iteration and the Streams bridge.
  - File persistence: text I/O, buffered streams, serialization vs. human-readable formats (CSV/JSON), the Data Access Object (DAO) pattern, resource lifecycle.
- **Integration architecture**
  - Layered design: model / persistence (repository/DAO) / service / UI.
  - Where each concern lives and how exceptions cross layer boundaries.
- **Quality, integration, and maintainability**
  - Readability, cohesion, coupling, naming, SOLID, code smells, and the maintainability rubric.
- **Assessment mechanics**
  - Partial-exam structure and strategy.
  - Delivery packaging, defense format, and the feedback protocol.

---

## 5. Session-by-session agenda

### Session 1 - Consolidation review and partial exam (Corte 3)

| Time | Activity |
|------|----------|
| 0:00-0:15 | Warm-up: rapid-fire review of Unit 3 concepts; expectations and exam rules. |
| 0:15-0:55 | Guided review synthesis: integration architecture, exceptions, collections, persistence (worked example). |
| 0:55-1:05 | Break / exam setup. |
| 1:05-2:05 | **Partial exam (Corte 3)** - individual, timed. |
| 2:05-2:20 | Wrap-up, exit ticket, and briefing on the project defense format. |

### Session 2 - Incremental-project delivery, defense, and feedback

| Time | Activity |
|------|----------|
| 0:00-0:10 | Delivery logistics: packaging, submission checklist, defense order. |
| 0:10-0:25 | Quality, integration, and maintainability criteria walkthrough (rubric in plain language). |
| 0:25-1:25 | **Project defenses** - short demos + design-decision Q&A per team. |
| 1:25-1:45 | Peer and instructor **feedback** round (structured protocol). |
| 1:45-2:10 | Self-assessment against the rubric; drafting the improvement plan. |
| 2:10-2:20 | Wrap-up and exit ticket: "what I will change and why." |

> Times are indicative for two ~2h20 sessions and can be compressed or expanded to your calendar.

---

## 6. Key-concepts glossary

| Term | Definition |
|------|-----------|
| **Corte** | An institutional assessment period; Corte 3 is the final grading window of the term. |
| **Incremental project** | An application built and graded in stages across the term, each stage adding capability while keeping earlier work working. |
| **Checked exception** | An exception that the compiler forces the caller to handle or declare (subclass of `Exception`, not `RuntimeException`). |
| **Unchecked exception** | A `RuntimeException` (or `Error`) that the compiler does not force you to catch; usually signals a programming defect. |
| **`try`-with-resources** | A `try` statement that automatically closes resources implementing `AutoCloseable`, eliminating leak-prone `finally` blocks. |
| **Exception translation** | Catching a low-level exception and rethrowing a higher-level, domain-meaningful one (often wrapping the cause). |
| **Collections Framework** | Java's unified set of interfaces and classes for storing groups of objects: `List`, `Set`, `Map`, `Queue`, etc. |
| **Generics** | Type parameters (`List<Student>`) that give compile-time type safety and remove casts. |
| **Persistence** | Saving object state beyond program execution, e.g., to a file or database. |
| **Serialization** | Converting an object graph into a byte stream (and back) for storage or transfer. |
| **DAO / Repository** | A design pattern that isolates data-access logic behind an interface, decoupling the domain from storage details. |
| **Layered architecture** | Organizing code into responsibility layers (model, persistence, service, UI) with controlled dependencies. |
| **Cohesion** | The degree to which the elements of a module belong together; high cohesion is desirable. |
| **Coupling** | The degree of interdependence between modules; low coupling is desirable. |
| **SOLID** | Five design guidelines: Single responsibility, Open/closed, Liskov substitution, Interface segregation, Dependency inversion. |
| **Maintainability** | The ease with which software can be understood, changed, and extended without introducing defects. |
| **Regression** | A defect that reappears or a previously working feature that breaks after a change. |
| **Defense** | A short oral presentation where the author demonstrates and justifies their work under questioning. |

---

## 7. Achievement / self-check checklist

Mark each item honestly before the defense. Aim for all boxes checked.

**Integration**
- [ ] My application compiles and runs from a clean checkout with a single documented command.
- [ ] It reads data from a file and writes data to a file, and survives a missing/corrupt file gracefully.
- [ ] It uses at least two different collection types appropriately, with generics (no raw types).
- [ ] Error conditions are handled with a coherent exception strategy (no empty `catch` blocks).

**OOP end to end**
- [ ] Domain classes encapsulate their state (private fields, controlled access).
- [ ] I use inheritance and/or interfaces where they genuinely reduce duplication or enable polymorphism.
- [ ] At least one polymorphic behavior is exercised at runtime.
- [ ] Responsibilities are separated into layers; the UI does not talk to files directly.

**Quality and maintainability**
- [ ] Names are intention-revealing; methods are short and single-purpose.
- [ ] There is no dead/commented-out code left in the delivery.
- [ ] I can point to at least one SOLID principle I deliberately applied and explain why.
- [ ] I can name at least one code smell I removed and how.

**Assessment readiness**
- [ ] I can explain every design decision in my project in under one minute each.
- [ ] I have completed the self-assessment rubric.
- [ ] I have a prioritized improvement plan with at least three actionable items.

---

## 8. Resources index

| Resource | Location | Purpose |
|----------|----------|---------|
| Session 1 guide | [`01-session/README.md`](01-session/README.md) | Consolidation review + partial exam. |
| Session 2 guide | [`02-session/README.md`](02-session/README.md) | Project delivery, defense, and feedback. |
| Curated readings / download area | [`material/README.md`](material/README.md) | Reference readings and summary notes (PDF download area). |
| Optional activity | [`optional-activity/README.md`](optional-activity/README.md) | Extra practice submitted via GitHub, with rubric. |

### External references (for study)

- Oracle, *The Java Tutorials* - Exceptions, Collections, and Basic I/O trails.
- Bloch, J. *Effective Java* (3rd ed.) - items on exceptions, generics, and design.
- Martin, R. C. *Clean Code* - naming, functions, and code smells.
- Gamma et al. *Design Patterns* - for the DAO/Repository and Strategy discussions.

---

*This week is where the term's work becomes evidence. Deliver something that runs, defend the decisions behind it, and leave with a plan to make it better.*
