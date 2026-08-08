# Week 09 - Composition and code modularization (component-oriented design)

**Subject:** Object-Oriented Programming and Design
**Program period:** 2026-B
**Unit:** Unit 2 - Design principles and modularity
**Weekly topic:** Composition and code modularization (component-oriented design)
**Assessment period:** Corte 2 (second grading period)
**Learning outcome (RAA):** 90_82759

---

## 1. Overview

Week 09 is the pivot point of Unit 2. In the previous weeks you learned how to model
generalization/specialization with **inheritance**. This week we study the second great
mechanism for building objects out of other objects: **composition**. You will learn to
model *"has-a"* relationships, to decide *rationally* between inheritance and composition
using the classic guideline **"favor composition over inheritance"**, and to **refactor**
a fragile inheritance hierarchy into a flexible, component-oriented design.

The week closes the loop of Unit 2: small, single-responsibility components that are
**assembled** (composed) rather than **extended** (inherited) are the foundation of
modular, testable, and maintainable software.

> Mental model for the week: *a class is not only what it IS; it is also what it HAS.*
> Good design usually comes from wiring together small parts, not from growing tall
> family trees of classes.

---

## 2. RAA and competencies addressed

### Learning outcome (RAA 90_82759)
> The student designs modular object-oriented solutions by correctly applying association,
> aggregation and composition relationships, justifying the choice between inheritance and
> composition, and refactoring designs to improve cohesion, reduce coupling and increase
> reusability.

### Competencies developed this week

| Type | Competency |
|------|------------|
| **Cognitive** | Distinguishes inheritance ("is-a") from composition ("has-a") and explains the trade-offs of each. |
| **Procedural** | Implements composition in code (delegation, dependency injection) and refactors inheritance into composition. |
| **Attitudinal** | Values simplicity, low coupling and high cohesion as professional quality criteria. |
| **Communicative** | Documents design decisions with UML class diagrams and clear technical justifications. |

---

## 3. Learning objectives (measurable)

By the end of Week 09, the student will be able to:

1. **Model** at least one real "has-a" relationship using composition between objects,
   producing a UML class diagram and its corresponding code.
2. **Differentiate** association, aggregation and composition, identifying the correct
   relationship for a given scenario in at least 8 out of 10 cases.
3. **Compare** inheritance and composition, listing at least three concrete trade-offs, and
   **apply** the "favor composition over inheritance" guideline to justify a design choice.
4. **Refactor** a given design that misuses inheritance (e.g., a subclass that breaks the
   Liskov Substitution Principle) into a composition-based solution that compiles and passes
   the provided tests.
5. **Complete** the end-of-unit quiz distinguishing inheritance from composition, achieving
   the passing threshold.

---

## 4. Contents outline

1. **Relationships between objects revisited**
   - Association, aggregation, composition, dependency: definitions and UML notation.
   - Lifetime and ownership: the difference that really matters.
2. **Composition and delegation**
   - The "has-a" relationship in code.
   - Delegation: forwarding work to a contained object.
   - Constructor injection vs. internal instantiation.
3. **Inheritance vs. composition**
   - What inheritance gives you and what it costs (tight coupling, fragile base class,
     the "gorilla/banana/jungle" problem).
   - The Liskov Substitution Principle as a litmus test for inheritance.
   - The guideline: *favor composition over inheritance* (GoF).
4. **Component-oriented design and modularization**
   - Small components with a single responsibility.
   - Assembling behavior at runtime (strategy-like designs).
   - How composition enables testing with test doubles.
5. **Refactoring inheritance into composition**
   - Detecting the smell.
   - Step-by-step transformation (extract component, delegate, inject).

---

## 5. Session-by-session agenda

| Session | Focus | Main deliverable |
|---------|-------|------------------|
| **Session 1** – Modeling "has-a" with composition | Association vs. aggregation vs. composition; delegation; a fully worked `Car`/`Engine` example. | In-class UML + code for a composed object. |
| **Session 2** – Inheritance vs. composition & refactoring | The "favor composition" guideline; LSP violations; refactoring the classic `Stack extends ArrayList` / `Penguin extends Bird` smells. | A refactored design replacing bad inheritance with composition. |

Full timed agendas are inside each session's `README.md`:
- [`01-session/README.md`](01-session/README.md)
- [`02-session/README.md`](02-session/README.md)

---

## 6. Key-concepts glossary

| Term | Definition |
|------|------------|
| **Association** | A general "uses/knows" relationship between two independent objects (e.g., a `Doctor` and a `Patient`). Neither owns the other. |
| **Aggregation** | A "has-a" relationship where the part can exist independently of the whole (e.g., a `Team` has `Players`; players survive if the team dissolves). Hollow diamond in UML. |
| **Composition** | A strong "has-a"/"owns-a" relationship where the part's lifetime is bound to the whole; if the whole is destroyed, so are its parts (e.g., a `House` and its `Rooms`). Filled diamond in UML. |
| **Dependency** | A transient "uses" relationship, typically a method parameter or local variable, not stored as a field. |
| **Delegation** | A technique where an object handles a request by forwarding it to a contained (delegate) object. The mechanical heart of composition. |
| **Inheritance ("is-a")** | A mechanism where a subclass acquires the structure/behavior of a superclass and can specialize it. |
| **Composition ("has-a")** | Building an object's behavior by holding references to other objects and delegating to them. |
| **Coupling** | The degree to which one module depends on the internals of another. Composition tends to produce looser coupling than inheritance. |
| **Cohesion** | The degree to which the elements of a module belong together. Small components favor high cohesion. |
| **Liskov Substitution Principle (LSP)** | Objects of a subclass must be usable anywhere the superclass is expected without breaking correctness. A failed LSP test signals that inheritance is the wrong tool. |
| **Fragile base class** | The problem where a change in a superclass unexpectedly breaks subclasses. |
| **Dependency injection (DI)** | Passing a component's collaborators from the outside (usually via the constructor) instead of creating them internally, enabling substitution and testing. |
| **Favor composition over inheritance** | GoF design guideline: prefer assembling behavior from parts over extending classes, unless a true "is-a" relationship with substitutability exists. |

---

## 7. Achievement / self-check checklist

Mark each item once you can do it *without help*:

- [ ] I can define association, aggregation and composition and draw each in UML.
- [ ] I can explain the difference between "is-a" and "has-a" with my own example.
- [ ] I can implement composition in code using fields and delegation.
- [ ] I can inject a collaborator through a constructor and explain why that helps testing.
- [ ] I can state at least three trade-offs between inheritance and composition.
- [ ] I can recognize a Liskov Substitution Principle violation in a hierarchy.
- [ ] I can refactor a class that misuses inheritance into a composition-based design.
- [ ] I can justify, in writing, when inheritance is still the right choice.
- [ ] I scored the passing threshold on the inheritance-vs-composition quiz.

---

## 8. Resources index

| Resource | Location | Purpose |
|----------|----------|---------|
| Session 1 notes & worked example | [`01-session/README.md`](01-session/README.md) | Modeling "has-a" with composition and delegation. |
| Session 2 notes & refactoring lab | [`02-session/README.md`](02-session/README.md) | Inheritance vs. composition; refactoring practice. |
| Curated readings (PDF download area) | [`material/README.md`](material/README.md) | Reference readings and summary notes for offline study. |
| Optional practice (GitHub submission) | [`optional-activity/README.md`](optional-activity/README.md) | Extra hands-on refactoring challenge with rubric. |

---

## 9. Recommended study path

1. Read this guide and the glossary.
2. Work through **Session 1** (composition/delegation) and complete its exit ticket.
3. Work through **Session 2** (inheritance vs. composition + refactoring).
4. Download and skim the readings in [`material/`](material/README.md).
5. Attempt the **optional activity** to consolidate the skill before the quiz.
6. Take the end-of-unit quiz.

> **Assessment note (Corte 2):** This week feeds directly into the Corte 2 evaluation.
> The in-class deliverables and the quiz are graded; the optional GitHub activity provides
> bonus practice and formative feedback.
