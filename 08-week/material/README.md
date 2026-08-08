# Week 08 - Reading & resource area (PDF download)

**Subject:** Object-Oriented Programming and Design | **Unit 2** | **Corte 2**
**Topic:** Abstract classes and interfaces

> This folder is a **download area**. The consolidated Week 08 reading is provided here as a **PDF**
> for you to download and study offline. This is **not** a Moodle submission box — nothing is turned
> in here. Deliverables for the week go to the **optional activity** (GitHub) and the in-class
> workshop, as described in [`../optional-activity/README.md`](../optional-activity/README.md).

---

## 1. How to use this folder

1. Download the Week 08 PDF placed in this folder by the instructor (file name pattern:
   `week08-abstract-classes-and-interfaces.pdf`).
2. Read it **before Session 2** — Sections 1-3 map to Session 1, Sections 4-6 to Session 2.
3. Use the annotated references below to go deeper on any point you found difficult.
4. Bring questions to class; the workshop assumes you have read the core material.

If the PDF is not yet available at the start of the week, the two session `README.md` files contain
the same substantive content and are sufficient to prepare.

---

## 2. Core reading (contents of the PDF)

The downloadable PDF consolidates the two session notes into a single study document with the
following structure:

1. **Motivation** - why concrete-only hierarchies become rigid; the Open/Closed Principle.
2. **Abstract classes** - declaration, abstract methods, shared state, the no-instantiation rule.
3. **Template Method** - abstract classes fixing an algorithm skeleton.
4. **Interfaces** - contracts, multiple implementation, default/static methods, marker interfaces.
5. **Choosing between them** - the "is-a" vs. "can-do" decision rule and a comparison table.
6. **Combined design** - abstract base + interfaces + concrete classes (the notification workshop).
7. **Worked examples with expected output** - `Shape`, `Employee`, `Payable/Printable`, `Notifier`.
8. **Self-check questions and answers.**

---

## 3. Curated external references (annotated)

### Books

- **Bloch, J. (2018). *Effective Java* (3rd ed.). Addison-Wesley.**
  - *Item 20 - Prefer interfaces to abstract classes.* Explains why interfaces are the more flexible
    choice for public contracts and introduces the "skeletal implementation" (`AbstractXxx`) pattern
    that pairs an interface with a helper abstract class. This is the professional-practice
    justification for the combined design in Session 2.
  - *Item 21 - Design interfaces for posterity.* On default methods and evolving interfaces safely.
  - *Item 22 - Use interfaces only to define types.* Warns against the "constant interface" antipattern.

- **Gamma, E., Helm, R., Johnson, R., & Vlissides, J. (1994). *Design Patterns*. Addison-Wesley.**
  - *Template Method* - the pattern behind an abstract class with a fixed algorithm and abstract
    steps (our `Shape.describe()` / `Employee.payslip()` / `Notification`).
  - *Strategy* - the pattern behind selecting behavior through an interface at runtime (our `Channel`).

- **Martin, R. C. (2002). *Agile Software Development: Principles, Patterns, and Practices*. Prentice Hall.**
  - Chapters on the **Open/Closed Principle (OCP)** and **Dependency Inversion Principle (DIP)** -
    the design principles that abstraction serves. "Depend on abstractions, not on concretions" is
    the one-line summary of why interfaces matter.

### Official documentation

- **Oracle. *The Java Tutorials - Abstract Methods and Classes.***
  `https://docs.oracle.com/javase/tutorial/java/IandI/abstract.html`
  Canonical reference for the `abstract` keyword, abstract methods, and instantiation rules.

- **Oracle. *The Java Tutorials - Interfaces.***
  `https://docs.oracle.com/javase/tutorial/java/IandI/createinterface.html`
  Covers interface declaration, `implements`, default methods, and static methods.

- **Oracle. *The Java Language Specification* (JLS), sections 8.1.1.1 (abstract classes), 9 (interfaces).**
  The authoritative rules, for when you need the exact language behavior.

### Cross-language notes

- **C#:** same concepts; `abstract class` / `interface`; since C# 8, interfaces can have default
  implementations, mirroring Java.
- **Kotlin:** `abstract class` and `interface`; interfaces may contain state-free properties and
  default method bodies.
- **TypeScript:** `abstract class` and `interface`; interfaces are structural (duck-typed) contracts.
- **Python:** no `interface` keyword; use `abc.ABC` with `@abstractmethod` for abstract classes, and
  `typing.Protocol` for interface-like structural contracts.
- **PHP:** `abstract class` and `interface`; a class may `implements` several interfaces.

---

## 4. Quick summary notes (one-screen review)

- **Abstract class**: cannot be instantiated; mixes concrete + abstract members; holds shared state;
  models **"is-a"**; a class extends **one**.
- **Abstract method**: signature, no body; concrete subclasses must implement it or stay abstract.
- **Interface**: pure contract of method signatures (+ constants, default/static methods); models
  **"can-do"**; a class implements **many**.
- **Default method**: interface method with a body (Java 8+); lets interfaces share behavior and
  evolve without breaking implementers.
- **Decision rule**: shared state/behavior + single family → abstract class; capability across
  unrelated types or multiple roles → interface; need both → extend one abstract base and implement
  several interfaces.
- **Why it matters**: enables **Open/Closed Principle** (extend without modifying), lowers
  **coupling** (callers depend on contracts), and enables **testability** (substitute fakes).

---

## 5. Practice-before-you-arrive checklist

- [ ] JDK 11+ installed (`java -version` works).
- [ ] IDE ready (IntelliJ IDEA / Eclipse / VS Code + Java extension).
- [ ] Read the PDF sections 1-3 before Session 1, 4-6 before Session 2.
- [ ] Able to compile and run the `Shape` example from Session 1 on your own machine.
