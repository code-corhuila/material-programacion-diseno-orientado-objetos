# Week 07 - Polymorphism and Method Overriding (Dynamic Dispatch)

**Program:** Object-Oriented Programming and Design
**Term:** 2026-B
**Unit:** Unit 2 - Design principles and modularity
**Assessment period:** Corte 2 (second grading cut)
**Learning outcome (RAA):** 90_82759

---

## 1. Overview

Week 07 is the conceptual center of Unit 2. Having built inheritance hierarchies in
previous weeks, we now study the mechanism that gives those hierarchies their real
power: **polymorphism**. When a program holds a reference of a *parent* type but the
object it points to is actually an *instance of a subclass*, the language must decide,
**at run time**, which version of an overridden method to execute. That decision
mechanism is called **dynamic dispatch** (also *late binding* or *virtual dispatch*).

Mastering this topic changes how you design software. Instead of writing long
`if/else` or `switch` ladders that test an object's type, you write code against an
abstraction and let each subclass supply its own behavior. New behavior is added by
writing a new class, not by editing existing code. This is the foundation of the
Open/Closed Principle and of nearly every design pattern you will meet later.

> Working language of all deliverables and discussion this week: **English**.

---

## 2. RAA and competencies addressed

| Code | Description |
|------|-------------|
| **RAA 90_82759** | The student applies design principles and modularity mechanisms of the object-oriented paradigm to build extensible, maintainable software. |

**Competencies developed this week**

- **Cognitive:** Explains the difference between compile-time type and run-time type, and how dynamic dispatch resolves method calls.
- **Procedural:** Overrides inherited methods correctly and processes heterogeneous collections through a common supertype.
- **Attitudinal:** Values extensibility and low coupling as quality attributes, and justifies design choices with technical arguments.

---

## 3. Learning objectives (measurable)

By the end of Week 07, the student will be able to:

1. **Override** at least one inherited method in a subclass to provide specialized behavior, using the correct syntax and the `@Override` annotation (or the language equivalent).
2. **Invoke** methods polymorphically through a parent-type reference and predict which implementation runs.
3. **Explain**, in writing and with a diagram, how dynamic dispatch selects a method implementation at run time, distinguishing static (declared) type from dynamic (actual) type.
4. **Implement** a routine that iterates over a collection of objects of different subclasses and processes each one uniformly through a common supertype.
5. **Distinguish** overriding from overloading and from field hiding, and identify at least three common overriding pitfalls.

Each objective is written to be observable and assessable through the in-class practices, the exit tickets, and the optional GitHub activity.

---

## 4. Contents outline

1. **From inheritance to polymorphism**
   - Subtype polymorphism ("an object of type S can be used where a T is expected").
   - The "is-a" relationship and the Liskov Substitution intuition.
2. **Method overriding**
   - Rules: same signature, compatible return type (covariance), access not narrowed.
   - The `@Override` annotation and why it prevents silent bugs.
   - `super.method()` to extend rather than replace inherited behavior.
3. **Dynamic dispatch (late binding)**
   - Static type vs. dynamic type.
   - The conceptual virtual method table (vtable).
   - What is resolved at compile time and what is deferred to run time.
4. **Overriding vs. overloading vs. hiding**
   - Overloading = same name, different parameters, resolved at compile time.
   - Hiding of `static` methods and of fields (no polymorphism).
5. **Polymorphic processing of collections**
   - One loop, many behaviors: the canonical `for each shape: shape.area()` pattern.
   - Removing `instanceof`/`switch` type ladders.
6. **Pitfalls and good practice**
   - Calling overridable methods from a constructor.
   - Breaking substitutability; equals/hashCode consistency; covariant returns.

---

## 5. Session-by-session agenda

| Session | Focus | Key deliverable |
|---------|-------|-----------------|
| **Session 1** | Method overriding and the mechanics of dynamic dispatch. Static vs. dynamic type, `@Override`, `super`, the vtable model. Worked example: a `Payment` hierarchy. | Exit ticket: predict-the-output quiz. |
| **Session 2** | Polymorphic processing of collections; overriding vs. overloading vs. hiding; design pitfalls. Worked example: a renderer that draws a `List<Shape>`. | Exit ticket: refactor an `instanceof` ladder into polymorphic code. |

A detailed, timed agenda lives inside each session's `README.md`
(`01-session/`, `02-session/`).

---

## 6. Key-concepts glossary

| Term | Definition |
|------|------------|
| **Polymorphism** | The ability of a single interface (a method call on a supertype reference) to invoke different implementations depending on the actual object. |
| **Subtype polymorphism** | The specific form used here: a subclass instance is usable wherever the superclass type is expected. |
| **Method overriding** | Providing, in a subclass, a new implementation of an instance method inherited from a superclass, with the same signature. |
| **Dynamic dispatch / late binding** | The run-time process of selecting which overridden method implementation to execute, based on the object's actual (dynamic) type. |
| **Static type (declared type)** | The type written in the variable declaration; known at compile time; determines *which methods can be called*. |
| **Dynamic type (run-time type)** | The class the object was actually instantiated from; determines *which overriding implementation runs*. |
| **`super`** | Keyword to invoke the superclass version of a method or its constructor, letting a subclass extend rather than fully replace inherited behavior. |
| **`@Override`** | An annotation that asks the compiler to verify a method really overrides a supertype method; catches typos and signature mismatches. |
| **Virtual method table (vtable)** | The conceptual per-class table of function pointers the runtime consults to resolve a virtual call. |
| **Overloading** | Multiple methods with the same name but different parameter lists in the same scope; resolved at compile time (not polymorphism). |
| **Covariant return type** | An override may return a subtype of the type returned by the overridden method. |
| **Upcasting** | Treating a subclass reference as its superclass type; always safe and implicit. |
| **Downcasting** | Treating a superclass reference as a subclass type; must be explicit and can fail at run time. |
| **Liskov Substitution Principle (LSP)** | A subtype must be usable anywhere its supertype is expected without breaking correctness. |

---

## 7. Achievement / self-check checklist

Tick each item once you can do it **without notes**:

- [ ] I can override an inherited method and mark it with `@Override`.
- [ ] I can explain the difference between the static type and the dynamic type of a reference.
- [ ] I can predict which method runs for a given supertype reference pointing to a subclass instance.
- [ ] I can use `super.method()` to reuse and extend inherited behavior.
- [ ] I can write a single loop that processes a collection of mixed subtypes polymorphically.
- [ ] I can explain why dynamic dispatch enables the Open/Closed Principle.
- [ ] I can distinguish overriding from overloading and from field/`static` hiding.
- [ ] I can name at least three overriding pitfalls and how to avoid them.
- [ ] I can refactor an `instanceof`/`switch` type ladder into polymorphic code.

If any box is unchecked, revisit the corresponding section in the session notes or the
readings in `material/README.md`.

---

## 8. Resources index

| Resource | Location | Purpose |
|----------|----------|---------|
| Session 1 notes | [`01-session/README.md`](01-session/README.md) | Theory + worked example + guided practice on overriding & dispatch. |
| Session 2 notes | [`02-session/README.md`](02-session/README.md) | Polymorphic collections + overriding vs. overloading + pitfalls. |
| Readings & downloads | [`material/README.md`](material/README.md) | Curated readings with summaries; PDF download area. |
| Optional activity | [`optional-activity/README.md`](optional-activity/README.md) | Extra practice submitted via GitHub, with rubric. |

---

## 9. How this week connects

- **Looks back to:** Week 05-06 (inheritance, `extends`, `super`, abstract classes) — polymorphism only makes sense on top of an inheritance hierarchy.
- **Looks forward to:** Interfaces and abstract types (Week 08), and design patterns such as *Strategy*, *Template Method*, and *State*, all of which are dynamic dispatch put to work.

> **Code convention this week:** Examples are shown primarily in **Java** because its
> keyword set (`extends`, `@Override`, `super`) makes the mechanics explicit. The same
> ideas transfer directly to C#, C++ (`virtual`), Python, and Kotlin; language notes are
> given where the behavior differs.
