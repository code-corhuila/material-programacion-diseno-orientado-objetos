# Week 07 - Polymorphism and Method Overriding (Dynamic Dispatch)

**Course:** Object-Oriented Programming and Design
**Program:** 2026-B
**Unit:** Unit 2 - Design principles and modularity
**Weekly topic:** Polymorphism and method overriding (dynamic dispatch)
**Assessment period:** Corte 2
**Learning outcome (RAA):** 90_82759

---

## 1. Overview

This week we study **polymorphism**, one of the four pillars of object-oriented
programming (alongside abstraction, encapsulation, and inheritance) and arguably
the pillar that makes object-oriented *design* worthwhile. Inheritance lets us
say *"a `Circle` is a `Shape`"*; polymorphism is what lets us **write code that
works with any `Shape` and lets each concrete shape decide, at runtime, how it
behaves**.

The central mechanism is **dynamic dispatch** (also called *late binding* or
*virtual method invocation*): when you call a method through a reference of a
parent type, the runtime — not the compiler — selects the implementation that
belongs to the object's *actual* class. This one idea is what allows a single
loop such as

```java
for (Shape s : shapes) {
    total += s.area();
}
```

to correctly compute the area of circles, rectangles, and triangles without a
single `if` or `switch` checking the type. Learning to *design for* this
behavior — rather than fighting it with type checks — is the skill that
separates procedural code dressed up in classes from genuinely object-oriented
code.

By the end of the week you will be able to override inherited methods to
specialize behavior, invoke methods polymorphically through parent-type
references, explain how the runtime resolves which method runs, and build a
routine that processes a heterogeneous collection of objects uniformly.

> **Language note.** Examples are given primarily in **Java** because it makes
> the compile-time type / run-time type distinction explicit and enforces
> `@Override`. Where a concept differs meaningfully in **Python** or **C#** we
> point it out, because the *design idea* is language-independent.

---

## 2. Learning outcome and competencies addressed

### Learning outcome (RAA 90_82759)

> The student designs and implements modular object-oriented solutions that
> apply polymorphism and dynamic dispatch to achieve extensible, loosely
> coupled behavior, and explains how method resolution occurs at runtime.

### Competencies

| Type | Competency |
|------|------------|
| **Disciplinary** | Applies inheritance and polymorphism to model families of related types and to eliminate type-based conditional logic. |
| **Disciplinary** | Distinguishes overriding from overloading and from hiding, and predicts which method executes for a given call. |
| **Cognitive** | Explains the mechanics of dynamic dispatch (virtual method tables / method resolution order) and its cost/benefit trade-offs. |
| **Procedural** | Implements and tests routines that process polymorphic collections. |
| **Attitudinal / transversal** | Values open-closed, extensible design; writes code that new subclasses can extend without modification of existing code. |

---

## 3. Weekly objectives (measurable)

By the end of Week 07 the student will be able to:

1. **Override** at least three inherited methods in subclasses to provide
   specialized behavior, correctly using the language's override mechanism
   (`@Override` in Java) and honoring the parent method's contract.
2. **Invoke** methods **polymorphically** through parent-type references and
   predict, before running the program, which implementation executes.
3. **Explain** in precise terms how **dynamic dispatch** selects the method
   implementation at runtime, including the roles of the *declared
   (compile-time) type* and the *actual (run-time) type*, and contrast this with
   static binding.
4. **Implement** a routine that iterates over a **collection of objects of
   different concrete types** and processes each one polymorphically, with **no
   `instanceof` / type-switch** driving the core logic.
5. **Differentiate** overriding from overloading and field/`static` hiding, and
   justify when substitutability (Liskov) is preserved or broken.

---

## 4. Contents outline

1. **From inheritance to polymorphism**
   - Recap: `is-a`, subtype, and the substitution principle.
   - Subtype polymorphism vs. ad-hoc polymorphism (overloading) vs. parametric
     polymorphism (generics) — naming the landscape.
2. **Method overriding**
   - Rules: same signature, covariant return types, access widening,
     exceptions.
   - `@Override`, calling `super.method()`, and the `final` brake.
   - Overriding vs. overloading vs. hiding (static methods, fields).
3. **Dynamic dispatch (the runtime engine)**
   - Declared type vs. actual type.
   - Virtual method tables (vtables) in Java/C++; Method Resolution Order (MRO)
     in Python.
   - Static binding cases: `static`, `private`, `final`, constructors, fields.
4. **Designing with polymorphism**
   - Replacing `switch`/`instanceof` with polymorphic dispatch.
   - Abstract methods and the "template of behavior" idea.
   - Open-Closed Principle and the Liskov Substitution Principle in practice.
5. **Processing polymorphic collections**
   - Uniform iteration over heterogeneous objects.
   - Pitfalls: casting, `NullPointerException`, broken contracts.

---

## 5. Session-by-session agenda

### Session 1 - Overriding and the mechanics of dynamic dispatch (2 h)

| Time | Activity |
|------|----------|
| 0:00-0:15 | Warm-up: predict-the-output quiz on a small inheritance hierarchy. |
| 0:15-0:55 | Theory: overriding rules, `@Override`, `super`, overriding vs. overloading vs. hiding. |
| 0:55-1:20 | Worked example: `Employee` payroll hierarchy with overridden `monthlySalary()`. |
| 1:20-1:50 | Guided practice: students override methods in a `Notification` hierarchy. |
| 1:50-2:00 | Wrap-up + exit ticket. |

### Session 2 - Polymorphic references and processing collections (2 h)

| Time | Activity |
|------|----------|
| 0:00-0:10 | Recap of Session 1; connect to dynamic dispatch internals. |
| 0:10-0:45 | Theory: declared vs. actual type, vtables/MRO, static binding exceptions. |
| 0:45-1:15 | Worked example: `Shape` renderer that processes a `List<Shape>` polymorphically. |
| 1:15-1:50 | Guided practice: `PaymentMethod` processor over a mixed collection; remove an `instanceof` chain. |
| 1:50-2:00 | Wrap-up, self-check, exit ticket, preview of optional activity. |

Detailed plans: [`01-session/README.md`](01-session/README.md) and
[`02-session/README.md`](02-session/README.md).

---

## 6. Key-concepts glossary

| Term | Definition |
|------|------------|
| **Polymorphism** | The ability of a single interface (a method call through a supertype) to operate on values of many types, each responding in its own way. Literally "many forms." |
| **Subtype polymorphism** | Polymorphism achieved through inheritance/interfaces: a variable of type `T` may hold an instance of any subtype of `T`. The focus of this week. |
| **Method overriding** | Providing, in a subclass, a new implementation of a method already defined in a superclass, keeping the same signature so it *replaces* the inherited one for instances of the subclass. |
| **Method overloading** | Defining multiple methods with the *same name but different parameter lists* in the same scope. Resolved by the **compiler** (static). Not polymorphism in the runtime sense. |
| **Dynamic dispatch / late binding** | The runtime mechanism that selects the method implementation based on the **actual** class of the object, not the declared type of the reference. |
| **Static binding / early binding** | Method selection fixed at **compile time**. Applies to `static`, `private`, `final` methods, and field access. |
| **Declared (compile-time) type** | The type written in the variable's declaration. Determines *which methods are callable* and is checked by the compiler. |
| **Actual (run-time) type** | The class of the object the reference actually points to. Determines *which overridden implementation runs*. |
| **Virtual method** | A method eligible for dynamic dispatch. In Java, instance methods are virtual by default; in C++/C# you opt in with `virtual`. |
| **vtable (virtual method table)** | A per-class table of pointers to method implementations; each object carries a pointer to its class's vtable, enabling O(1) dispatch. |
| **MRO (Method Resolution Order)** | Python's linearized ordering of a class and its ancestors (C3 linearization) used to resolve which method runs. |
| **Abstract method** | A method declared without a body; forces subclasses to provide an implementation. Enables designing against behavior that must exist but has no default. |
| **`super`** | Keyword to invoke the superclass's version of a method from within an override (e.g., extend rather than fully replace behavior). |
| **Covariant return type** | An override may return a subtype of the type returned by the overridden method. |
| **Upcasting** | Treating a subclass instance through a superclass reference (always safe, implicit). This is what enables polymorphic calls. |
| **Downcasting** | Converting a supertype reference back to a subtype (explicit, may fail at runtime with `ClassCastException`). A design smell when overused. |
| **Liskov Substitution Principle (LSP)** | Subtypes must be usable anywhere their supertype is expected without breaking correctness. The contract polymorphism relies on. |
| **Open-Closed Principle (OCP)** | Software entities should be open for extension but closed for modification; polymorphism is the primary tool for achieving it. |

---

## 7. Achievement / self-check checklist

Mark each item once you can do it **without looking at notes**:

- [ ] I can state the difference between the **declared type** and the **actual
  type** of a reference and say which one determines the method that runs.
- [ ] I can write a subclass that **overrides** a method and correctly use
  `@Override` and `super`.
- [ ] I can explain **why** overriding a `static` method does *not* give dynamic
  dispatch (it is *hiding*, not overriding).
- [ ] Given a short program, I can **predict the exact output** of polymorphic
  calls before running it.
- [ ] I can rewrite an `if (x instanceof A) ... else if (x instanceof B) ...`
  chain as **polymorphic dispatch**.
- [ ] I can write a loop that processes a **`List` of mixed subtypes**
  uniformly.
- [ ] I can explain what a **vtable** is at a conceptual level and why dispatch
  is roughly constant-time.
- [ ] I can identify an **LSP violation** and explain how it breaks polymorphic
  code.

---

## 8. Resources index

| Resource | Location | Purpose |
|----------|----------|---------|
| Session 1 plan | [`01-session/README.md`](01-session/README.md) | Overriding + dispatch mechanics. |
| Session 2 plan | [`02-session/README.md`](02-session/README.md) | Polymorphic references + collections. |
| Reading & download area | [`material/README.md`](material/README.md) | Curated readings, summaries, PDF download. |
| Optional activity | [`optional-activity/README.md`](optional-activity/README.md) | GitHub-submitted practice + rubric. |

### External references (for the curious)

- Bloch, J. *Effective Java*, 3rd ed. — Items 40 (`@Override`), 52 (overloading
  vs. overriding), 20-22 (interfaces & abstract classes).
- Gamma et al. *Design Patterns* — Strategy and Template Method patterns as
  applied polymorphism.
- Martin, R. C. *Agile Software Development, Principles, Patterns, and
  Practices* — OCP and LSP chapters.
- Oracle Java Tutorials — "Polymorphism" and "Overriding and Hiding Methods."

---

## 9. How this week connects

- **Looks back to** Week 06 (inheritance and abstract classes): polymorphism is
  the *payoff* of inheritance.
- **Looks forward to** design patterns (Strategy, Template Method, State,
  Visitor) and to interface-based design, all of which are polymorphism applied
  systematically.
