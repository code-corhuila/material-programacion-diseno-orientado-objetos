# Week 06 - Inheritance in Java: single inheritance and the `super()` reference

> **Course:** Object-Oriented Programming and Design
> **Program:** Mechatronics Engineering — CORHUILA
> **Term:** 2026-B · **Unit 2:** Design principles and modularity
> **Assessment period:** Corte 2 (second cut)
> **Learning outcome (RAA):** `90_82759`

---

## 1. Overview

This week we move from *building single classes* to *building families of classes*. Inheritance is
the mechanism that lets one class (the **subclass** or **child**) acquire the fields and methods of
another (the **superclass** or **parent**), so that shared behavior is written **once** and reused
everywhere it applies.

Java supports **single inheritance for classes**: a class may extend exactly one direct parent. This
constraint keeps the type hierarchy a clean tree rather than a tangled graph, and it forces us to be
deliberate about *what truly is-a something else*. We will also study `super()` — the reference and
constructor call that connects a child to its parent so that inherited state is initialized correctly
and inherited behavior can be reused instead of duplicated.

By the end of the week you should be able to look at two concepts and decide, with justification,
whether an **"is-a"** relationship exists, model it with `extends`, and wire the constructors with
`super(...)` so the whole object is initialized exactly once, top to bottom.

---

## 2. RAA and competencies addressed

**Learning outcome (RAA `90_82759`):** *Design and implement modular object-oriented solutions that
apply inheritance and code-reuse principles to model relationships between entities without
duplicating logic.*

| Competency | How it is developed this week |
|---|---|
| **Abstraction & modeling** | Deciding when a real relationship is genuinely "is-a" and expressing it as a class hierarchy. |
| **Code reuse & DRY** | Factoring shared state and behavior into a base class instead of copy-pasting it into each subclass. |
| **Constructor chaining** | Using `super(...)` to guarantee the parent is fully initialized before the child adds its own state. |
| **Critical judgment** | Recognizing the *limits* of inheritance (fragile base class, tight coupling) and arguing for composition when appropriate. |
| **Technical communication** | Justifying design choices in a forum discussion using precise vocabulary. |

---

## 3. Weekly objectives (measurable)

By the end of Week 06, given a specification, each student will be able to:

1. **Model** an "is-a" relationship using single inheritance between a parent and a child class,
   correctly using the `extends` keyword so the child compiles and inherits at least two members.
2. **Invoke** a parent constructor with `super(...)` as the first statement of a child constructor,
   producing an object whose inherited fields are initialized to the intended values.
3. **Extend** a base class to specialize behavior — adding new fields/methods and reusing inherited
   ones — without duplicating any line of the parent's logic (verified by inspection: zero copied methods).
4. **Distinguish** the roles of `super()` (constructor call) and `super.method()` / `super.field`
   (access to the parent's version), applying each correctly in at least one worked scenario.
5. **Argue** in the course forum which problems inheritance solves and where it breaks down, citing at
   least one concrete advantage and one concrete limitation with an example.

---

## 4. Contents outline

1. **The "is-a" relationship**
   - "is-a" vs. "has-a" (inheritance vs. composition)
   - The substitutability intuition (Liskov, informally)
2. **Single inheritance in Java**
   - The `extends` keyword and the implicit `Object` root
   - What is inherited (fields, methods) and what is not (constructors, private access)
   - Why Java forbids multiple class inheritance (the diamond problem)
3. **Constructor chaining and `super(...)`**
   - Order of initialization: parent before child
   - The implicit `super()` and when it fails
   - Passing arguments up the hierarchy
4. **Reusing and specializing behavior**
   - Adding new members in the subclass
   - `super.method()` to extend rather than replace parent behavior
   - Introduction to overriding and `@Override` (foundation for next week)
5. **Design judgment**
   - Advantages: reuse, polymorphic families, expressive modeling
   - Limits: tight coupling, fragile base class, "inheritance for reuse only" anti-pattern
   - The guideline *"favor composition over inheritance"* — when and why

---

## 5. Session-by-session agenda

| Session | Focus | Deliverable at the end |
|:---:|---|---|
| **[01 — Foundations](./01-session/README.md)** | The "is-a" relationship, `extends`, what is inherited, and the diamond problem that motivates single inheritance. | A two-class hierarchy that compiles and reuses inherited members. |
| **[02 — `super()` and specialization](./02-session/README.md)** | Constructor chaining with `super(...)`, `super.member` access, and extending behavior without duplication. | A three-level hierarchy correctly initialized through `super(...)` chains. |

Supporting areas:

- **[Reading & resources (download area)](./material/README.md)** — curated references and a downloadable PDF.
- **[Optional activity (GitHub submission)](./optional-activity/README.md)** — extra practice with a rubric.

---

## 6. Key-concepts glossary

| Term | Definition |
|---|---|
| **Inheritance** | A mechanism by which a class acquires the fields and methods of another class. |
| **Superclass / parent / base class** | The class being extended; provides members to its descendants. |
| **Subclass / child / derived class** | The class that extends another; inherits and may add or specialize members. |
| **`extends`** | The Java keyword that declares a subclass–superclass relationship. |
| **Single inheritance** | The rule that a Java class may have at most **one** direct superclass. |
| **`Object`** | The implicit root of every Java class hierarchy; every class extends it directly or indirectly. |
| **`super(...)`** | A call, valid only as the **first statement** of a constructor, that invokes a parent constructor. |
| **`super.member`** | A reference used inside a subclass to access the parent's version of a field or method. |
| **Constructor chaining** | The guaranteed sequence in which a parent constructor runs before the child constructor body. |
| **"is-a" relationship** | The semantic test for inheritance: *a Car **is a** Vehicle*. |
| **"has-a" relationship** | The semantic test for composition: *a Car **has an** Engine*. |
| **Diamond problem** | The ambiguity that arises if a class could inherit the same member from two parents; the reason Java forbids multiple class inheritance. |
| **Fragile base class** | The risk that changing a superclass silently breaks its subclasses. |
| **DRY** | *Don't Repeat Yourself* — the principle inheritance helps honor by centralizing shared code. |

---

## 7. Achievement / self-check checklist

Mark each item once you can do it **without looking at your notes**:

- [ ] I can state the "is-a" test in one sentence and apply it to a new pair of concepts.
- [ ] I can write a subclass with `extends` that inherits and uses at least two parent members.
- [ ] I can explain what is **not** inherited (constructors, `private` members' direct access).
- [ ] I can explain why Java allows only single class inheritance (the diamond problem).
- [ ] I can place `super(...)` correctly and explain why it must be the first statement.
- [ ] I can predict the exact order in which parent and child constructors run.
- [ ] I can use `super.method()` to extend parent behavior instead of replacing it.
- [ ] I can point to duplicated code and refactor it into a base class.
- [ ] I can give one advantage and one limitation of inheritance with a concrete example.
- [ ] I have posted a substantive contribution to the forum discussion.

---

## 8. Resources index

- **Session 01 notes** — [`./01-session/README.md`](./01-session/README.md)
- **Session 02 notes** — [`./02-session/README.md`](./02-session/README.md)
- **Curated readings + downloadable PDF** — [`./material/README.md`](./material/README.md)
- **Optional activity + rubric (GitHub)** — [`./optional-activity/README.md`](./optional-activity/README.md)

**External references (full details in the material index):**

- Oracle, *The Java Tutorials — Interfaces and Inheritance.*
- Bloch, J. *Effective Java* (3rd ed.), Item 18: *Favor composition over inheritance.*
- Horstmann, C. *Core Java, Volume I — Fundamentals*, chapter on Inheritance.

---

## 9. Assessment note (Corte 2)

Work this week is formative and prepares the graded activities of **Corte 2**. The in-class practices
and the exit tickets are checked for participation and understanding; the **optional activity** on
GitHub can earn bonus credit under its published rubric. Overriding and polymorphism (Week 07) build
directly on the constructor chaining and specialization mastered here, so do not skip the exit tickets.
