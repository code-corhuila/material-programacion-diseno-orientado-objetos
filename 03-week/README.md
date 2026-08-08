# Week 03 - Attributes, methods, and encapsulation with access modifiers, getters and setters

**Subject:** Object-Oriented Programming and Design
**Program period:** 2026-B
**Unit:** Unit 1 - Fundamentals of Object-Oriented Programming
**Week:** 03
**Assessment period:** Corte 1 (First cut)
**Learning outcome (RAA):** 90_82759

---

## 1. Overview

By Week 03 you already know how to declare a class, instantiate objects, and reason about the difference between *class* (the blueprint) and *object* (the instance). This week we go one level deeper and study **what lives inside a class** and **how we protect it**.

An object bundles together two things:

- **State** — the data it remembers, held in *attributes* (also called fields or instance variables).
- **Behavior** — what it can do, expressed as *methods*.

The central idea of the week is **encapsulation**: the discipline of hiding an object's internal state and forcing all interaction to pass through a controlled, public interface. We achieve this in practice with **access modifiers** (`public`, `private`, `protected`), and we expose state deliberately and safely through **getters and setters** that can *validate* every change.

A well-encapsulated class is like a vending machine: you interact with a small, well-defined set of buttons (its public interface), but you cannot reach inside and rearrange the coins and cans directly (its private state). This protects the machine's **invariants** — the rules that must always be true, such as "the amount of money collected can never be negative."

> **Big idea of the week:** Do not expose your data. Expose *behavior* that guards your data.

---

## 2. Learning outcome (RAA) and competencies addressed

### Learning outcome (RAA 90_82759)
The student designs and implements well-encapsulated classes, applying access modifiers and validated accessor methods to protect the integrity of an object's state and to reduce coupling between components of a software system.

### Competencies addressed this week

| Competency type | Description |
|---|---|
| **Disciplinary / technical** | Correctly declares attributes and methods, and selects the appropriate access modifier (`public`, `private`, `protected`) for each member according to its intended visibility. |
| **Problem-solving** | Identifies the invariants of a domain entity and enforces them through validation logic placed in setters and constructors. |
| **Design & abstraction** | Distinguishes between the *public interface* and the *internal implementation* of a class, and justifies why hiding implementation reduces coupling. |
| **Communication** | Explains and documents design decisions about visibility and data protection using correct technical vocabulary. |

---

## 3. Learning objectives (measurable)

By the end of Week 03, the student will be able to:

1. **Apply** the access modifiers `public`, `private`, and `protected` to class members to control their visibility, correctly predicting whether a given access is legal or produces a compilation error. *(Measured by: code-reading quiz + compilation exercises.)*
2. **Implement** getters and setters that expose object state safely, following standard naming conventions (`getX` / `setX`, `isX` for booleans). *(Measured by: in-class practice and worked exercises.)*
3. **Design** a well-encapsulated class that protects its invariants by placing validation logic in setters and constructors, rejecting invalid state with clear errors. *(Measured by: the optional GitHub activity and its rubric.)*
4. **Justify**, in writing and orally, the principle of encapsulation as a mechanism to reduce coupling and protect data integrity, using at least two concrete examples. *(Measured by: exit tickets and discussion.)*
5. **Refactor** a poorly encapsulated class (public mutable fields) into an encapsulated one, and explain what risk each change removes. *(Measured by: guided in-class refactoring.)*

---

## 4. Contents outline

1. **Attributes (fields / instance variables)**
   - Declaring attributes; instance vs. static attributes.
   - Default values and initialization (declaration, constructor).
2. **Methods**
   - Instance methods, method signatures, parameters, and return values.
   - Accessor (getter) and mutator (setter) methods.
3. **Access modifiers and visibility**
   - `public`, `private`, `protected`, and package/default visibility.
   - The visibility table and how visibility interacts with packages and inheritance.
4. **Encapsulation**
   - Information hiding vs. encapsulation.
   - The public interface vs. the internal implementation.
5. **Getters and setters**
   - Naming conventions and the JavaBeans style.
   - Read-only, write-only, and computed (derived) properties.
6. **Validation and invariants**
   - What an invariant is and why it matters.
   - Guarding invariants in setters and constructors; failing fast.
7. **Design consequences**
   - How encapsulation reduces coupling.
   - Common anti-patterns (anemic getters/setters on everything, public fields, leaking mutable references).

> **Reference language:** Examples are given primarily in **Java** because its four explicit access modifiers make visibility rules concrete. Notes on how the same ideas map to **Python** (convention-based, `_` and `__`) and **C#** (properties) are included where useful, since the *design principles* are language-independent.

---

## 5. Session-by-session agenda

| Session | Focus | Key deliverable |
|---|---|---|
| **Session 01** | Attributes, methods, and access modifiers: controlling visibility | In-class visibility exercises; students can predict legal/illegal access |
| **Session 02** | Getters, setters, validation, and full encapsulation | A refactored, fully encapsulated `BankAccount` class with validated setters |

- **Session 01 — Attributes, methods & access modifiers** (see `01-session/README.md`)
  Define attributes and methods; introduce the three access modifiers; explore the visibility table; practice reading code and predicting compilation errors.

- **Session 02 — Getters, setters, validation & encapsulation** (see `02-session/README.md`)
  Introduce accessor/mutator methods and their conventions; add validation to protect invariants; refactor a leaky class into a well-encapsulated one; connect encapsulation to coupling.

---

## 6. Key concepts glossary

| Term | Definition |
|---|---|
| **Attribute (field / instance variable)** | A named piece of data that belongs to each object and stores part of its state. |
| **Method** | A named block of behavior defined inside a class; it may read or modify the object's state and may return a value. |
| **Access modifier** | A keyword that controls from where a class member can be accessed: `public`, `private`, `protected`, or (in Java) package-default. |
| **`public`** | Accessible from anywhere. Used for the intended interface of a class. |
| **`private`** | Accessible only from inside the same class. The default choice for attributes. |
| **`protected`** | Accessible within the same package and by subclasses. Used to expose members to descendants without making them fully public. |
| **Encapsulation** | Bundling data and the methods that operate on it into one unit, and restricting direct access to the data so that all interaction goes through a controlled interface. |
| **Information hiding** | The design principle of hiding implementation details behind a stable interface, so clients depend only on the interface. |
| **Getter (accessor)** | A method that returns the value of an attribute, e.g. `getBalance()`. |
| **Setter (mutator)** | A method that changes the value of an attribute, typically after validating the new value, e.g. `setBalance(x)`. |
| **Invariant** | A condition that must always be true for an object to be in a valid state (e.g., "age is never negative"). |
| **Validation** | Checking that a value is acceptable before storing it, rejecting invalid input. |
| **Coupling** | The degree to which one class depends on the internal details of another. Encapsulation reduces coupling. |
| **Public interface** | The set of members (mostly methods) that a class exposes to the outside world. |
| **Derived / computed property** | A value produced from other attributes on demand rather than stored (e.g., `getFullName()` from `firstName` and `lastName`). |
| **Fail fast** | Detecting an invalid state as early as possible and reporting it immediately (e.g., throwing an exception), instead of continuing with bad data. |

---

## 7. Achievement / self-check checklist

Mark each item once you can do it **without looking at notes**:

- [ ] I can declare an attribute and choose an appropriate access modifier for it.
- [ ] I can explain the difference between `public`, `private`, and `protected` in one sentence each.
- [ ] I can read a snippet of code and predict whether a member access compiles or fails.
- [ ] I can write a getter and a setter following standard naming conventions.
- [ ] I can add validation to a setter so that invalid values are rejected.
- [ ] I can identify at least two invariants of a real-world entity (e.g., a bank account, a product, a student).
- [ ] I can refactor a class with public fields into a well-encapsulated class and explain the benefit.
- [ ] I can create a read-only property and explain when it is appropriate.
- [ ] I can explain, with an example, how encapsulation reduces coupling between classes.
- [ ] I can justify why a setter is a better place for validation than the calling code.

---

## 8. Resources index

| # | Resource | Location | Type |
|---|---|---|---|
| 1 | Session 01 notes & practice | `01-session/README.md` | Class notes |
| 2 | Session 02 notes & practice | `02-session/README.md` | Class notes |
| 3 | Curated readings & summaries (PDF download area) | `material/README.md` | Reading list |
| 4 | Optional practice + GitHub submission + rubric | `optional-activity/README.md` | Graded optional activity |

### Recommended external references (see `material/README.md` for summaries)
- Oracle, *The Java Tutorials — Controlling Access to Members of a Class*.
- Bloch, J. *Effective Java* (3rd ed.), Item 15: "Minimize the accessibility of classes and members" and Item 16: "In public classes, use accessor methods, not public fields."
- Martin, R. C. *Clean Code*, Chapter 6: "Objects and Data Structures."

---

## 9. How you will be assessed this week (Corte 1)

- **Formative (not graded):** in-class exercises, exit tickets, self-check checklist.
- **Optional graded activity:** the encapsulation design task in `optional-activity/README.md`, submitted via **GitHub** (not Moodle), evaluated with the rubric provided there.
- The reading material in `material/README.md` is a **download area** for a supporting PDF; it is not a submission box.

> **Academic integrity:** You may discuss ideas with classmates, but code you submit must be your own. Cite any external snippet you adapt.
