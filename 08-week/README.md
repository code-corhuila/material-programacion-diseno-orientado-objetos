# Week 08 - Abstract Classes and Interfaces

**Program:** Object-Oriented Programming and Design
**Term:** 2026-B
**Unit:** Unit 2 - Design principles and modularity
**Weekly topic:** Abstract classes and interfaces
**Assessment period:** Corte 2 (second grading period)
**Learning outcome (RAA):** 90_82759

---

## 1. Overview

Week 8 is a pivotal moment in Unit 2. Up to this point you have learned how to build
concrete classes, encapsulate state, and reuse behavior through inheritance. This week
we introduce the two most important tools for expressing *abstraction* and *contracts*
in object-oriented design: **abstract classes** and **interfaces**.

The central question of the week is deceptively simple: *when a group of types share
behavior, how much of that behavior should live in a common parent, how much should be
left unspecified, and how do we describe a capability without dictating how it is
implemented?* Answering this well is the difference between a rigid hierarchy that
resists change and a modular design that welcomes it.

By the end of the week you should be able to look at a modeling problem and decide,
with justification, whether an abstract class, an interface, a combination of both, or
neither is the right tool. You will also implement a small class hierarchy that combines
all three building blocks (abstract class, interface, concrete class) in a hands-on
workshop.

> **Language note.** All code in this week uses **Java** as the reference language
> because it distinguishes abstract classes and interfaces cleanly at the syntax level.
> The design ideas transfer directly to C#, Kotlin, TypeScript, PHP, and Python
> (via `abc.ABC` and `Protocol`). Where a concept differs across languages, a callout
> points it out.

---

## 2. Learning outcome and competencies addressed

### Learning outcome (RAA 90_82759)
The student designs modular object-oriented solutions by selecting and applying
abstraction mechanisms (abstract classes and interfaces) that separate *what* a type
promises from *how* it delivers on that promise, producing hierarchies that are open to
extension and decoupled from concrete implementations.

### Competencies
- **Disciplinary / technical.** Model class hierarchies using abstract classes and
  interfaces; define and override abstract methods; specify contracts through interfaces;
  apply polymorphism to program against abstractions.
- **Design reasoning.** Choose the appropriate abstraction mechanism for a given
  scenario and justify the trade-offs (single vs. multiple inheritance, shared state,
  default behavior, coupling).
- **Communication.** Read and produce simple UML class diagrams that show abstraction,
  realization, and inheritance relationships.
- **Autonomy and teamwork.** Work through a guided workshop that integrates the week's
  concepts and defend the modeling decisions taken.

---

## 3. Weekly objectives (measurable)

By the end of Week 8, the student will be able to:

1. **Differentiate** abstract classes from interfaces and **select** the appropriate one
   for a given scenario, justifying the choice against at least three criteria (shared
   state, single vs. multiple type membership, default behavior).
2. **Define** abstract methods in a parent type and **implement** them correctly in two
   or more concrete subclasses, verified by a compiling, runnable program.
3. **Design** an interface that specifies a contract decoupled from implementation and
   **provide** at least two independent implementations of it.
4. **Model** a class hierarchy that combines an abstract class, an interface, and
   concrete classes, and **explain** each relationship using correct UML terminology.
5. **Apply** polymorphism by writing client code that depends only on the abstraction
   (abstract class or interface), never on the concrete subtype.

Each objective is written to be observable and gradable: the verb (differentiate,
define, design, model, apply) maps to a task in the sessions and to a criterion in the
optional-activity rubric.

---

## 4. Contents outline

1. **Abstraction as a design concept** - the gap between *interface* and
   *implementation*; why we hide "how".
2. **Abstract classes**
   - Abstract methods vs. concrete methods.
   - Why an abstract class cannot be instantiated.
   - Shared state (fields), constructors, and the template that subclasses complete.
   - The Template Method pattern as a natural use of abstract classes.
3. **Interfaces**
   - Interfaces as pure contracts.
   - Constant members and method signatures.
   - Default and static methods (modern Java) and their design intent.
   - Multiple interface implementation and "capability" modeling.
4. **Abstract class vs. interface** - a decision framework and comparison table.
5. **Combining them** - the idiomatic pattern: an interface for the contract, an
   abstract class for shared skeleton, concrete classes for the specifics.
6. **Polymorphism against abstractions** - programming to an interface, dependency
   direction, and a first glimpse of the Dependency Inversion Principle.

---

## 5. Session-by-session agenda

| Session | Focus | Main activities |
|---|---|---|
| **Session 1** | Abstract classes and abstract methods | Theory on abstraction; worked example (`Shape` hierarchy); guided practice defining and overriding abstract methods; exit ticket. |
| **Session 2** | Interfaces and combining abstractions | Theory on interfaces and contracts; worked example (`Payable` / notification services); decision framework; combined-hierarchy mini-workshop; exit ticket. |

Detailed timing, theory notes, worked examples, and practices are in each session file:

- [`01-session/README.md`](01-session/README.md) - Abstract classes and abstract methods
- [`02-session/README.md`](02-session/README.md) - Interfaces and combining abstractions

Supporting materials and the optional activity:

- [`material/README.md`](material/README.md) - curated readings and downloadable resources
- [`optional-activity/README.md`](optional-activity/README.md) - optional practice submitted via GitHub

---

## 6. Key-concepts glossary

| Term | Definition |
|---|---|
| **Abstraction** | The design act of exposing *what* a type does while hiding *how* it does it. |
| **Abstract class** | A class that cannot be instantiated on its own and may declare abstract methods that subclasses must implement. It may also contain state and concrete methods. |
| **Abstract method** | A method declared without a body; it defines a required behavior that concrete subclasses must supply. |
| **Concrete class** | A fully implemented class that can be instantiated; it provides bodies for every method it inherits or declares. |
| **Interface** | A reference type that declares a contract: a set of method signatures (and, in modern languages, default/static methods and constants) with no instance state. |
| **Contract** | The promise a type makes to its callers: the set of operations available and their expected meaning, independent of implementation. |
| **Realization / implementation** | The relationship in which a class provides concrete behavior for the methods declared by an interface. |
| **Inheritance (generalization)** | The relationship in which a subclass extends a superclass, reusing and specializing its behavior. |
| **Polymorphism** | The ability to treat objects of different concrete types uniformly through a shared supertype (abstract class or interface). |
| **Default method** | An interface method with a body, allowing an interface to evolve without breaking existing implementers. |
| **Template Method** | A pattern where an abstract class defines the skeleton of an algorithm and leaves specific steps as abstract methods for subclasses. |
| **Coupling** | The degree to which one component depends on the details of another; abstractions are used to reduce it. |
| **Program to an interface** | The design guideline of declaring variables and parameters by their abstract type, not their concrete type. |

---

## 7. Achievement / self-check checklist

Use this list to confirm you have met the week's objectives. Aim to check every box
before the corte 2 assessment.

- [ ] I can state, in one sentence each, what an abstract class is and what an interface is.
- [ ] I can list at least three criteria that push a design toward an interface vs. an abstract class.
- [ ] I can explain why an abstract class cannot be instantiated.
- [ ] I can write an abstract method and implement it in two different subclasses.
- [ ] I can declare an interface and provide two independent implementations of it.
- [ ] I can identify when to use `extends` vs. `implements` and explain the single-inheritance rule.
- [ ] I can read a UML class diagram and name each relationship (generalization, realization).
- [ ] I can write client code that depends only on the abstraction, and explain why that reduces coupling.
- [ ] I can describe the Template Method idea and give one example.
- [ ] I completed the combined-hierarchy mini-workshop with a compiling program.

---

## 8. Resources index

- **In-course materials**
  - [Session 1 notes and worked example](01-session/README.md)
  - [Session 2 notes and worked example](02-session/README.md)
  - [Curated readings and downloads](material/README.md)
  - [Optional activity (GitHub submission)](optional-activity/README.md)
- **Primary external references** (full annotated list in [`material/README.md`](material/README.md))
  - Oracle, *The Java Tutorials* - "Interfaces and Inheritance".
  - Gamma, Helm, Johnson, Vlissides, *Design Patterns* - Template Method chapter.
  - Martin, R. C., *Agile Software Development, Principles, Patterns, and Practices* - abstraction and DIP.
  - Bloch, J., *Effective Java* (3rd ed.) - items on interfaces vs. abstract classes.

---

## 9. How this week connects

- **Looks back to:** Week 7 (inheritance and polymorphism) - abstraction is the
  disciplined next step after basic inheritance.
- **Looks forward to:** the remaining Unit 2 weeks on design principles (SOLID) and
  design patterns, where interfaces and abstract classes are the raw material for nearly
  every pattern you will meet.
