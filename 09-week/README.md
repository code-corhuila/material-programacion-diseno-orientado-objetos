# Week 09 - Composition and code modularization (component-oriented design)

**Subject:** Object-Oriented Programming and Design
**Program period:** 2026-B
**Unit:** Unit 2 - Design principles and modularity
**Weekly topic:** Composition and code modularization (component-oriented design)
**Assessment period:** Corte 2 (second grading period)
**Learning outcome (RAA):** 90_82759

---

## 1. Overview

Weeks 5 through 8 focused on inheritance as the primary tool for reusing behavior and expressing relationships between types. This week we deliberately step back and examine the *other* — and, in modern practice, more frequently recommended — mechanism for reuse: **composition**.

Composition is the technique of building complex objects out of simpler ones, so that an object *owns* or *uses* other objects and delegates part of its work to them. Where inheritance answers the question **"is-a?"** (a `SavingsAccount` **is an** `Account`), composition answers the question **"has-a?"** (a `Car` **has an** `Engine`) and **"uses-a?"** (an `OrderService` **uses a** `PaymentGateway`).

The industry guideline **"favor composition over inheritance"** (popularized by the *Gang of Four*, 1994) is not a ban on inheritance. It is a design heuristic: when both mechanisms could technically solve a problem, composition usually produces designs that are more flexible, easier to change at runtime, and less prone to the fragilities of deep inheritance hierarchies. By the end of the week you will be able to justify, in concrete terms, *when* and *why* to choose one over the other.

This is a **corte 2** week: the concepts, the worked refactoring, and the quiz all contribute to the second grading period.

---

## 2. Learning outcome and competencies

### Learning outcome (RAA 90_82759)

> The student designs modular software solutions by correctly applying object-relationship mechanisms — inheritance and composition — selecting the appropriate mechanism for each modeling situation and justifying the decision using recognized design principles.

### Competencies addressed this week

| Competency type | Description |
|---|---|
| **Cognitive** | Distinguishes "is-a", "has-a", and "uses-a" relationships and maps each to the correct language mechanism. |
| **Procedural** | Implements composition (with delegation) in code and refactors an inheritance-based design into a composition-based one. |
| **Attitudinal / professional** | Argues design trade-offs responsibly, values maintainability, and recognizes that "clever" reuse is not always good reuse. |

---

## 3. Objectives (measurable)

By the end of Week 09 the student will be able to:

1. **Model** at least one "has-a" relationship between objects using composition (and distinguish it from aggregation) in a UML class diagram and in code.
2. **Compare** inheritance and composition across at least four criteria (coupling, flexibility, runtime behavior change, encapsulation) and state the "favor composition" guideline in his/her own words.
3. **Refactor** a given design that misuses inheritance so that it uses composition + delegation, preserving external behavior.
4. **Apply** delegation to forward responsibilities from a container object to its component objects without exposing the components' internals.
5. **Complete** the end-of-corte quiz, correctly classifying scenarios as inheritance vs. composition with at least 80% accuracy.

Each objective is measurable: objectives 1, 3, and 4 are evidenced by code/diagrams; objective 2 by a written comparison; objective 5 by the quiz score.

---

## 4. Contents outline

1. **Relationships between objects**
   - "is-a" (generalization) vs. "has-a" (composition/aggregation) vs. "uses-a" (dependency)
   - UML notation: filled diamond (composition), hollow diamond (aggregation), plain arrow (dependency)
2. **Composition in depth**
   - Whole-part relationships, lifetime ownership, and encapsulation
   - Composition vs. aggregation: who controls the lifecycle?
3. **Delegation**
   - Forwarding calls from container to component
   - Delegation as the runtime engine that makes composition useful
4. **Inheritance vs. composition**
   - The fragile base class problem
   - Tight coupling to a superclass; the "gorilla/banana/jungle" problem
   - Runtime flexibility: swapping behavior via composed objects vs. fixed-at-compile-time inheritance
5. **The "favor composition over inheritance" guideline**
   - What it means, what it does *not* mean
   - Signs of inheritance misuse (subclass overrides most of parent; "is-a" is really "has-a"; explosion of subclasses)
6. **Refactoring toward composition**
   - Replace inheritance with delegation (strategy-style extraction)
   - Component-oriented design: small, replaceable parts

---

## 5. Session-by-session agenda

| Session | Focus | Main deliverable |
|---|---|---|
| **Session 1** — Modeling "has-a": composition and delegation | Theory of object relationships; composition & aggregation; delegation; a fully worked `Car`/`Engine` + `Playlist`/`Song` example | In-class practice: model and implement a composed system |
| **Session 2** — Inheritance vs. composition & refactoring | The fragile base class problem; "favor composition"; a full before/after refactoring of a misused inheritance hierarchy | In-class practice: refactor a broken hierarchy; exit ticket |

Detailed timed agendas are inside each session's `README.md`.

---

## 6. Key-concepts glossary

| Term | Definition |
|---|---|
| **Composition** | A "has-a" relationship in which a whole object owns its parts and controls their lifecycle; if the whole is destroyed, its parts are destroyed with it. Represented in UML by a filled diamond. |
| **Aggregation** | A weaker "has-a" relationship in which the whole references parts it does *not* own; the parts can outlive the whole. UML: hollow diamond. |
| **Delegation** | The act of an object handing off ("forwarding") a request to one of its component objects to fulfill, rather than doing the work itself. |
| **Inheritance** | An "is-a" relationship in which a subclass derives structure and behavior from a superclass. |
| **Dependency ("uses-a")** | A transient relationship in which one object uses another (e.g., receives it as a method parameter) without owning it. |
| **Coupling** | The degree to which one module depends on the internals of another. Lower coupling is generally better. |
| **Fragile base class problem** | A defect where seemingly safe changes to a superclass break subclasses in unexpected ways, because subclasses depend on the superclass's implementation details. |
| **Favor composition over inheritance** | A design guideline: prefer assembling behavior from composed objects over deriving it through class inheritance, because composition yields lower coupling and greater runtime flexibility. |
| **Component-oriented design** | Designing systems as assemblies of small, self-contained, replaceable parts, each with a clear responsibility and interface. |
| **Refactoring** | Restructuring existing code to improve its internal design without changing its external behavior. |

---

## 7. Achievement / self-check checklist

Use this list before the quiz. Tick each item only when you can do it *without notes*.

- [ ] I can state the difference between "is-a", "has-a", and "uses-a" and give an example of each.
- [ ] I can draw the UML for composition (filled diamond) and aggregation (hollow diamond) and explain the lifecycle difference.
- [ ] I can write a class that composes another class and delegates a method to it.
- [ ] I can explain the fragile base class problem with a concrete example.
- [ ] I can list at least three warning signs that inheritance is being misused.
- [ ] I can state the "favor composition over inheritance" guideline and explain that it is a heuristic, not an absolute rule.
- [ ] I can take an inheritance-based design and refactor it to use composition + delegation while keeping behavior identical.
- [ ] I can decide, for a new scenario, whether inheritance or composition is more appropriate and defend the choice.

---

## 8. Resources index

| Resource | Location | Purpose |
|---|---|---|
| Session 1 notes & worked example | `./01-session/README.md` | Composition, aggregation, delegation |
| Session 2 notes & refactoring | `./02-session/README.md` | Inheritance vs. composition, refactoring |
| Curated readings (PDF download area) | `./material/README.md` | Deeper study, references |
| Optional practice (GitHub submission) | `./optional-activity/README.md` | Extra practice + rubric |

### Core references
- Gamma, Helm, Johnson, Vlissides. *Design Patterns: Elements of Reusable Object-Oriented Software*. Addison-Wesley, 1994 — origin of "favor composition over inheritance".
- Bloch, J. *Effective Java* (3rd ed.), Item 18: "Favor composition over inheritance". Addison-Wesley, 2018.
- Martin, R. C. *Agile Software Development, Principles, Patterns, and Practices*. Prentice Hall, 2002.

---

## 9. How this week is assessed (corte 2)

- **Formative (not graded):** in-class practices and exit tickets in each session.
- **Summative (graded, corte 2):**
  - The end-of-corte **quiz** distinguishing inheritance from composition (objective 5).
  - The **optional activity** (see `./optional-activity/`) can contribute bonus points, submitted via **GitHub** (not Moodle).

> Academic integrity: composition and refactoring exercises must be your own work. You may discuss concepts with peers, but submitted code and diagrams must be individually produced unless the instructor states otherwise.
