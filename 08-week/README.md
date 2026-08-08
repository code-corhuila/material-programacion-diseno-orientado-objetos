# Week 08 - Abstract classes and interfaces

**Subject:** Object-Oriented Programming and Design
**Program period:** 2026-B
**Unit:** Unit 2 - Design principles and modularity
**Weekly topic:** Abstract classes and interfaces
**Assessment period:** Corte 2 (second assessment cut)
**Learning outcome (RAA):** 90_82759

---

## 1. Overview

Week 08 is the point in the course where we stop asking *"how do I write one class?"* and start
asking *"how do I design a family of classes that stay flexible as the program grows?"*.

So far you have modeled single objects (encapsulation), reused behavior through inheritance, and
seen the same method behave differently in different subclasses (polymorphism). This week you will
learn the two tools that let you **separate a contract from its implementation**:

- **Abstract classes** — partially implemented base classes that define shared state and behavior,
  but leave one or more operations for subclasses to complete.
- **Interfaces** — pure contracts that declare *what* an object can do without saying *how*.

By the end of the week you should be able to look at a modeling problem and say, with justification,
"this is an abstract class" or "this is an interface" — and know why the difference matters for
maintainability.

All code examples in this material use **Java** as the reference language because it distinguishes
abstract classes and interfaces explicitly and clearly. The concepts transfer directly to C#, Kotlin,
TypeScript, PHP, Python (via `abc`), and most modern OOP languages; language-specific notes appear
where relevant.

---

## 2. RAA and competencies addressed

### Learning outcome (Resultado de Aprendizaje - RAA 90_82759)

> The student designs and implements modular object-oriented solutions that separate contracts from
> implementations, applying abstract classes and interfaces to produce extensible and maintainable
> class hierarchies.

### Competencies developed this week

| Competency type | Description |
|---|---|
| **Cognitive** | Distinguishes conceptually between an abstract class and an interface, and explains the trade-offs of each. |
| **Procedural** | Declares abstract methods, implements them in concrete subclasses, and defines interfaces that decouple callers from implementations. |
| **Attitudinal** | Values modular, low-coupling design as a professional engineering habit and communicates design decisions with technical vocabulary. |

### Contribution to the program profile

Abstraction and contract-based design are foundational to every later topic in the program:
design patterns, dependency injection, unit testing with test doubles, layered architectures, and
framework programming all rest on the "program to an interface, not an implementation" principle
introduced here.

---

## 3. Learning objectives (measurable)

By the end of Week 08 the student will be able to:

1. **Differentiate** abstract classes from interfaces and **select** the appropriate mechanism for a
   given scenario, justifying the choice with at least two technical criteria.
2. **Declare** abstract methods in a base class and **implement** them correctly in one or more
   concrete subclasses so that the program compiles and produces the expected behavior.
3. **Design and implement** an interface that specifies a contract, and provide at least two
   independent classes that implement it, demonstrating decoupling from any single implementation.
4. **Model** a class hierarchy that combines an abstract class, at least one interface, and concrete
   classes to solve a small workshop problem, producing a UML-style sketch plus working code.
5. **Explain** how abstraction supports the Open/Closed Principle and reduces coupling, using the
   week's own examples as evidence.

Each objective is observable and is checked either in the in-class practice, the optional activity,
or the corte 2 assessment.

---

## 4. Contents outline

1. **Recap: polymorphism and the need for abstraction**
   - Why concrete-only hierarchies become rigid.
2. **Abstract classes**
   - Abstract vs. concrete classes; the `abstract` keyword.
   - Abstract methods (declaration without body) and concrete methods living together.
   - Constructors, fields, and shared state in abstract classes.
   - Rule: an abstract class cannot be instantiated directly.
   - Template Method idea: an abstract class fixing an algorithm's skeleton.
3. **Interfaces**
   - Interfaces as pure contracts.
   - Implementing multiple interfaces (a solution to "no multiple inheritance").
   - Default and static methods in modern interfaces (Java 8+).
   - Constants and the marker-interface idea.
4. **Choosing between them**
   - "Is-a" (abstract class) vs. "can-do" / "behaves-as" (interface).
   - Shared state vs. pure capability.
   - Single vs. multiple type membership.
5. **Design principles connection**
   - Program to an interface, not an implementation.
   - Open/Closed Principle and the role of abstraction in extensibility.
   - Low coupling and high cohesion.
6. **Workshop: combined hierarchy**
   - Modeling a scenario with an abstract base + interfaces + concrete classes.

---

## 5. Session-by-session agenda

The week is delivered in **two sessions** of 2 hours each (120 minutes). Detailed plans, worked
examples, and exit tickets are in each session folder.

### Session 1 - Abstract classes (`01-session/`)
- Recap of polymorphism and motivation for abstraction (15 min)
- Theory: abstract classes and abstract methods (35 min)
- Worked example: `Shape` hierarchy with an abstract `area()` (25 min)
- Guided in-class practice: `Employee` payroll hierarchy (35 min)
- Wrap-up and exit ticket (10 min)

### Session 2 - Interfaces and combined design (`02-session/`)
- Recap of abstract classes; introduce the "contract" idea (15 min)
- Theory: interfaces, multiple implementation, default methods (35 min)
- Worked example: `Payable` / `Printable` payment processing (25 min)
- Guided in-class practice + workshop: notification system combining abstract class and interfaces (35 min)
- Wrap-up, decision-rule summary, and exit ticket (10 min)

---

## 6. Key-concepts glossary

| Term | Definition |
|---|---|
| **Abstraction** | Modeling only the essential characteristics of a concept while hiding incidental detail. |
| **Abstract class** | A class that cannot be instantiated on its own and may contain both implemented and unimplemented (abstract) methods, plus shared state. |
| **Abstract method** | A method declared without a body; concrete subclasses must provide the implementation. |
| **Concrete class** | A fully implemented class that can be instantiated with `new`. |
| **Interface** | A named contract: a set of method signatures (and possibly constants and default methods) that an implementing class agrees to fulfill. |
| **Contract** | The promise an interface (or abstract type) makes to callers: "any object of this type supports these operations." |
| **Implements** | The relationship where a class fulfills an interface's contract (`class C implements I`). |
| **Extends** | The relationship where a class or abstract class inherits from a base class (`class C extends B`). |
| **Default method** | An interface method with a body (Java 8+), providing a shared implementation that classes may override. |
| **Marker interface** | An interface with no methods, used only to tag a type with a capability (e.g., `Serializable`). |
| **Coupling** | The degree to which one module depends on the internal details of another; abstraction lowers it. |
| **Cohesion** | How focused a module is on a single responsibility; good abstractions raise it. |
| **Open/Closed Principle (OCP)** | Software entities should be open for extension but closed for modification. |
| **Polymorphism** | The ability to treat objects of different concrete types uniformly through a shared supertype. |
| **Template Method** | A design in which an abstract class fixes the steps of an algorithm and defers specific steps to subclasses. |

---

## 7. Achievement / self-check checklist

Tick each item honestly. If you cannot tick it, revisit the referenced session before the assessment.

- [ ] I can define, in my own words, what an abstract class is and why it cannot be instantiated. *(S1)*
- [ ] I can write an abstract method and implement it in a concrete subclass so the code compiles. *(S1)*
- [ ] I can explain why an abstract class may contain concrete methods and shared fields. *(S1)*
- [ ] I can define what an interface is and how it differs from an abstract class. *(S2)*
- [ ] I can make one class implement two or more interfaces and explain why that is useful. *(S2)*
- [ ] I can explain what a default method is and when it is appropriate. *(S2)*
- [ ] Given a scenario, I can decide between an abstract class and an interface and justify it. *(S1+S2)*
- [ ] I can sketch and implement a hierarchy that combines an abstract class, an interface, and concrete classes. *(Workshop)*
- [ ] I can connect abstraction to the Open/Closed Principle and to lower coupling. *(S2)*

---

## 8. Resources index

| Resource | Location | Purpose |
|---|---|---|
| Session 1 plan | [`01-session/README.md`](01-session/README.md) | Abstract classes: theory, worked example, practice, exit ticket. |
| Session 2 plan | [`02-session/README.md`](02-session/README.md) | Interfaces and combined design: theory, worked example, workshop, exit ticket. |
| Reading & download area | [`material/README.md`](material/README.md) | Curated readings, summaries, and the downloadable PDF for the week. |
| Optional activity | [`optional-activity/README.md`](optional-activity/README.md) | Extra practice with GitHub submission and rubric. |

### External references (see `material/` for annotated summaries)

- Bloch, J. *Effective Java* (3rd ed.), Items 20-22 (prefer interfaces to abstract classes).
- Gamma et al. *Design Patterns* - Template Method and Strategy patterns.
- Martin, R. C. *Agile Software Development, Principles, Patterns, and Practices* - OCP and DIP.
- Oracle Java Tutorials: *Abstract Methods and Classes* and *Interfaces*.

---

## 9. Assessment note (Corte 2)

This week's deliverables and concepts contribute to the **corte 2** grade. The workshop from Session 2
and the optional activity are the practical evidence of RAA 90_82759. Bring a laptop with a working
JDK (11 or later) and an IDE (IntelliJ IDEA, Eclipse, or VS Code with the Java extension) to both
sessions.
