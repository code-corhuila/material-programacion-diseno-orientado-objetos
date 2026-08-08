# Week 09 - Material and curated resources (PDF download area)

**Subject:** Object-Oriented Programming and Design (2026-B)
**Unit 2:** Design principles and modularity
**Topic:** Composition and code modularization (component-oriented design)
**Assessment period:** Corte 2

> **About this folder.** This is a **download area**. The consolidated study material for Week 09 is provided here as a **PDF** for you to download and read offline. It is **not** a Moodle submission box — you do not upload anything here. (Graded submissions for the optional activity go to **GitHub**; see `../optional-activity/README.md`.)

---

## 1. What to download

| Item | Format | Use |
|---|---|---|
| Week 09 consolidated notes | PDF | Offline reading of the full week (theory + examples) |
| Session 1 & 2 slides | PDF | Review before the quiz |

> If the PDF is not yet attached to this folder in your course platform, the complete content is fully reproduced in this week's `README.md` files (week guide + both sessions). The PDF is a convenience copy of that same material.

---

## 2. How to study this week (suggested path)

1. Read the **week guide** (`../README.md`) — objectives and glossary first.
2. Work through **Session 1** (`../01-session/README.md`) — composition, aggregation, delegation. Type out the `Car`/`Engine` example yourself.
3. Work through **Session 2** (`../02-session/README.md`) — inheritance vs. composition and the refactorings. Do the `Stack` refactoring by hand.
4. Attempt the **self-check checklist** in the week guide.
5. Do the **optional activity** for extra practice and bonus points.
6. Take the **corte-2 quiz**.

Estimated independent-study time: **3-4 hours**.

---

## 3. Curated readings with short summaries

### Primary (start here)

- **Bloch, J. — *Effective Java* (3rd ed.), Item 18: "Favor composition over inheritance." Addison-Wesley, 2018.**
  *Summary:* The canonical modern treatment. Explains why inheritance across package boundaries is fragile, introduces the "wrapper class" (composition + forwarding) as the fix, and shows the `InstrumentedSet` example that mirrors our `CountingList` case. Read this if you read only one thing.

- **Gamma, Helm, Johnson, Vlissides — *Design Patterns*, Introduction ("Inheritance versus Composition"). Addison-Wesley, 1994.**
  *Summary:* The origin of the guideline "favor object composition over class inheritance." Contrasts white-box reuse (inheritance) with black-box reuse (composition) and explains why composition keeps encapsulation intact.

### Supporting

- **Martin, R. C. — *Agile Software Development, Principles, Patterns, and Practices*. Prentice Hall, 2002.**
  *Summary:* Places composition in the wider context of the SOLID principles; useful for connecting this week to dependency inversion and open/closed, which appear later in Unit 2.

- **Fowler, M. — *Refactoring: Improving the Design of Existing Code* (2nd ed.). Addison-Wesley, 2018. — "Replace Superclass with Delegate" / "Replace Subclass with Delegate."**
  *Summary:* Step-by-step mechanics for exactly the refactoring we practice in Session 2. Excellent as a checklist while you refactor.

### Reference / documentation

- **Oracle Java Tutorials — "Inheritance" and "Interfaces."** *Summary:* Language-level reference for `extends`, method overriding, and interface-based composition; use to check syntax details.
- **UML class-diagram notation reference (composition ◆ vs. aggregation ◇ vs. dependency →).** *Summary:* One-page notation cheat sheet to keep beside you when drawing diagrams.

---

## 4. One-page concept recap (for quick review)

```
RELATIONSHIPS
  is-a   -> inheritance (extends)        Dog is-a Animal
  has-a  -> composition / aggregation    Car has-a Engine
  uses-a -> dependency (parameter)       Printer uses-a Document

COMPOSITION vs AGGREGATION
  composition ◆  : whole OWNS part; part dies with whole; created inside
  aggregation ◇  : whole REFERENCES part; part outlives whole; injected

DELEGATION
  whole.method() forwards work to part.method(); reuse WITHOUT inheritance

INHERITANCE COSTS
  fragile base class | tight coupling | subclass explosion | compile-time only

GUIDELINE
  "Favor composition over inheritance" — a heuristic, not a ban.
  Use inheritance for TRUE, stable is-a hierarchies with polymorphism.

REFACTORING RECIPE
  1) find reused behavior  2) make it a field  3) delegate needed methods
  4) expose only what makes sense  5) verify behavior unchanged
```

---

## 5. Glossary quick links

Full definitions are in the week guide (`../README.md`, section 6): *composition, aggregation, delegation, inheritance, dependency, coupling, fragile base class problem, favor composition over inheritance, component-oriented design, refactoring.*

---

## 6. Before the quiz — make sure you can

- Classify a scenario as inheritance vs. composition and justify it.
- Explain the fragile base class problem with the `CountingList`/`addAll` example.
- Perform the "wrap, don't extend" refactoring on a small class.
- Distinguish composition from aggregation by the lifecycle test.
