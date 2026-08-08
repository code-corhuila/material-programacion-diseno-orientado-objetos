# Week 06 - Inheritance in Java: single inheritance and the `super()` reference

**Course:** Object-Oriented Programming and Design
**Program period:** 2026-B
**Unit:** Unit 2 - Design principles and modularity
**Assessment period:** Corte 2 (second grading period)
**Learning outcome (RAA):** `90_82759`

---

## 1. Overview

Last week we learned how to bundle state and behavior inside a single, well-encapsulated class. This week we take the next step in object-oriented design: we let classes **build on top of each other**.

**Inheritance** is the mechanism that lets a new class (the *child* or *subclass*) reuse, extend, and specialize the fields and methods of an existing class (the *parent* or *superclass*). It is the language-level expression of the **"is-a" relationship**: a `SavingsAccount` *is-a* `BankAccount`; a `Manager` *is-a* `Employee`; a `Circle` *is-a* `Shape`.

Java supports **single inheritance of classes**: a class may extend exactly one direct superclass. This is a deliberate design choice that avoids the ambiguity problems of multiple inheritance (the "diamond problem") while still allowing rich hierarchies. To wire a subclass to its parent correctly, Java gives us the `super` reference and the `super(...)` constructor call, which we study in depth this week.

By the end of the week you will be able to model a small class hierarchy, reuse parent behavior instead of copying it, and specialize behavior in a child class without duplicating code.

---

## 2. Competencies and RAA addressed

**Learning outcome (RAA `90_82759`):** The student applies object-oriented design principles to build modular, reusable software, correctly modeling relationships between classes.

This week contributes to the RAA through the following competencies:

| Competency | How it is developed this week |
|---|---|
| **Conceptual** | Distinguishes the "is-a" relationship from the "has-a" relationship and recognizes when inheritance is the right modeling tool. |
| **Procedural** | Implements a parent/child hierarchy in Java using `extends`, constructor chaining with `super(...)`, and method overriding. |
| **Attitudinal** | Argues, in the discussion forum, the trade-offs of inheritance (reuse vs. coupling) and respects code-quality conventions (no duplication, clear naming). |

---

## 3. Learning objectives (measurable)

By the end of Week 06 the student will be able to:

1. **Model** an "is-a" relationship using single inheritance between a parent and a child class, producing a compiling `extends` declaration and a UML-style sketch.
2. **Use** `super(...)` to invoke a parent constructor and `super.method()` to reuse inherited behavior, demonstrated in at least one runnable program.
3. **Extend** a base class to specialize behavior (via method overriding) **without duplicating** the parent's code, verified by removing repetition from a starter snippet.
4. **Differentiate** single inheritance from multiple inheritance and explain why Java restricts classes to a single superclass.
5. **Discuss** in the forum which problems inheritance solves and where its limits lie (fragile base class, tight coupling, "is-a" misuse), citing at least one concrete example.

> Each objective is written so it can be checked: it names an observable action (model, use, extend, differentiate, discuss) and a product (declaration, program, refactor, argument, forum post).

---

## 4. Contents outline

1. **The "is-a" relationship and why we reuse**
   - Code reuse: copy-paste vs. inheritance
   - "is-a" (inheritance) vs. "has-a" (composition)
2. **Declaring a subclass with `extends`**
   - Syntax, the implicit `Object` root, the `final` keyword
   - What a subclass inherits (and what it does not)
3. **Constructors and the `super(...)` call**
   - The constructor chain, the implicit `super()`
   - When the compiler forces you to write `super(...)` explicitly
   - The order of initialization
4. **The `super` reference to reuse behavior**
   - `super.method()` and method overriding (`@Override`)
   - Accessing inherited members
5. **Access modifiers in a hierarchy**
   - `protected`, package-private, and encapsulation across levels
6. **Single vs. multiple inheritance**
   - The diamond problem, why Java forbids multiple class inheritance
   - A first mention of interfaces as the multiple-type answer (studied later)
7. **Limits and good practice**
   - Fragile base class, favoring composition, Liskov intuition

---

## 5. Session-by-session agenda

The week is delivered in two sessions of approximately **2 hours** each.

### Session 1 - "is-a", `extends`, and constructor chaining with `super()`
- Warm-up: the cost of duplicated code
- Theory: the "is-a" relationship, `extends`, what is inherited
- Theory: the constructor chain and `super(...)`
- Worked example: `Account` -> `SavingsAccount`
- Guided practice: build a `Vehicle` -> `Car` hierarchy
- Exit ticket

> Full detail: [`01-session/README.md`](01-session/README.md)

### Session 2 - Reusing behavior with `super.method()`, overriding, and the limits of inheritance
- Warm-up: recall the constructor chain
- Theory: method overriding and `super.method()`
- Theory: access modifiers across a hierarchy
- Theory: single vs. multiple inheritance and design limits
- Worked example: `Employee` -> `Manager` with overridden `calculateSalary()`
- Guided practice: refactor duplicated shapes into `Shape` -> `Circle`/`Rectangle`
- Exit ticket + forum launch

> Full detail: [`02-session/README.md`](02-session/README.md)

---

## 6. Key-concepts glossary

| Term | Definition |
|---|---|
| **Inheritance** | Mechanism by which a subclass acquires the fields and methods of a superclass, enabling reuse and specialization. |
| **Superclass (parent / base class)** | The class being extended; it provides the common state and behavior. |
| **Subclass (child / derived class)** | The class that extends another; it inherits members and may add or override them. |
| **`extends`** | Java keyword that declares a subclass-superclass relationship. |
| **"is-a" relationship** | Semantic test for inheritance: a subclass object *is a kind of* the superclass. |
| **"has-a" relationship** | Semantic test for composition: an object *contains* another as a field. |
| **`super()`** | Constructor call that invokes a constructor of the direct superclass; must be the first statement in the subclass constructor. |
| **`super.member`** | Reference used to access a field or method defined in the superclass, especially an overridden method. |
| **Method overriding** | Redefining, in a subclass, a method with the same signature as one in the superclass to specialize its behavior. |
| **`@Override`** | Annotation that asks the compiler to verify that a method really overrides a superclass method. |
| **`protected`** | Access modifier that exposes a member to subclasses (and to the same package) but not to the general public. |
| **Single inheritance** | A class may extend at most one direct superclass (Java's rule for classes). |
| **Multiple inheritance** | Inheriting from more than one class at once; not allowed for Java classes (allowed for interface *types*). |
| **Diamond problem** | Ambiguity that arises when a class inherits the same member through two different paths; the main reason Java forbids multiple class inheritance. |
| **`Object`** | The implicit root superclass of every Java class. |
| **Fragile base class** | The risk that changes to a superclass silently break subclasses that depended on its behavior. |

---

## 7. Achievement / self-check checklist

Mark each item once you can do it **without looking at your notes**:

- [ ] I can state the "is-a" test and use it to decide whether inheritance is appropriate.
- [ ] I can write a subclass with `extends` that compiles.
- [ ] I can explain what a subclass inherits and what it does not (constructors, private members).
- [ ] I can trace the constructor chain from a subclass up to `Object`.
- [ ] I can write `super(...)` to pass arguments to a parent constructor.
- [ ] I can override a method and still reuse the parent's version with `super.method()`.
- [ ] I use `@Override` and understand the error it catches.
- [ ] I can choose `protected` vs. `private` correctly for a member used by subclasses.
- [ ] I can explain why Java allows only single inheritance of classes.
- [ ] I can name at least two limits of inheritance and when composition is a better choice.

---

## 8. Resources index

| Resource | Location | Purpose |
|---|---|---|
| Session 1 plan | [`01-session/README.md`](01-session/README.md) | Theory, worked example, guided practice for `extends` + `super()` |
| Session 2 plan | [`02-session/README.md`](02-session/README.md) | Overriding, `super.method()`, inheritance limits |
| Reading & download area | [`material/README.md`](material/README.md) | Curated readings, summary notes, downloadable PDF |
| Optional activity | [`optional-activity/README.md`](optional-activity/README.md) | Extra practice submitted via GitHub, with rubric |

---

## 9. Assessment note (Corte 2)

This week belongs to the **second grading period (Corte 2)**. Class participation, the in-session exit tickets, and the discussion-forum post are formative. The **optional activity** (submitted via GitHub, not Moodle) offers additional practice and bonus recognition according to the rubric in [`optional-activity/README.md`](optional-activity/README.md). The graded evidence for this topic is consolidated in the Corte 2 assessment as announced in the course syllabus.
