# Week 04 - Constructors, constructor overloading, and object representation with `toString()`

> Course: **Object-Oriented Programming and Design** · Period **2026-B**
> Unit 1: **Fundamentals of Object-Oriented Programming**
> Assessment period: **Corte 1 (First cut)** · Language of instruction for this material: **English**

---

## 1. Overview

In Weeks 1–3 you learned to model a real-world entity as a **class**, to create **objects**
(instances) from it, and to protect internal data with **encapsulation** (private fields +
accessor methods). This week we answer the next practical question:

> *"How does an object come into existence in a **valid, ready-to-use state**, and how do we
> **read** that state clearly when we print or debug it?"*

The answer is built from three tightly related tools:

1. **Constructors** — special methods that initialize an object's state at the moment of creation.
2. **Constructor overloading** — providing several constructors so callers can create an object
   in more than one convenient way.
3. **`toString()`** — the method every Java object inherits, which we *override* to give an object
   a meaningful, human-readable textual representation.

By the end of the week you will be able to design a class whose objects are **impossible to create
in an invalid state** and **easy to inspect**, and you will validate your understanding with a
graded quiz on class and constructor syntax.

---

## 2. Learning outcome (RAA) and competencies

- **RAA code:** `90_82759`
- **RAA statement (working translation):** *The student implements classes that initialize their
  state through constructors and expose a meaningful representation of their objects, applying the
  syntax and good practices of object-oriented programming.*

### Competencies addressed

| Type | Competency |
|------|------------|
| **Specific / disciplinary** | Designs and codes Java classes whose instances are always created in a consistent, valid state. |
| **Specific / disciplinary** | Applies method (constructor) overloading to offer multiple, unambiguous ways of constructing an object. |
| **Specific / disciplinary** | Overrides inherited behavior (`toString()`) to improve readability, logging, and debugging. |
| **Generic / transversal** | Communicates technical decisions in writing and reads/interprets compiler feedback autonomously. |

---

## 3. Weekly objectives (measurable)

By the end of Week 4 the student will be able to:

1. **Implement** a *default (no-argument)* constructor and at least one *parameterized* constructor
   that fully initialize an object's fields.
2. **Overload** constructors in a single class (two or more signatures) and use `this(...)`
   **constructor chaining** to avoid duplicated initialization code.
3. **Override** `toString()` so that printing an object produces a clear, information-rich string
   instead of the default `ClassName@1b6d3586` form.
4. **Distinguish** the local parameter from the instance field using the `this` keyword, and explain
   when the compiler provides an implicit default constructor and when it does not.
5. **Complete** the Week 4 quiz on class and constructor syntax with a passing result.

> *Verbs are intentionally observable (implement, overload, override, distinguish, complete) so each
> objective maps to a gradable piece of evidence.*

---

## 4. Contents outline

1. **Object lifecycle recap** — declaration, instantiation (`new`), initialization, use.
2. **Constructors**
   - What a constructor is and how it differs from an ordinary method.
   - The implicit default constructor and when the compiler stops providing it.
   - Writing an explicit no-argument constructor.
   - Writing a parameterized constructor; the `this` keyword and field shadowing.
   - Guarding invariants inside the constructor (validation, fail-fast).
3. **Constructor overloading**
   - Overloading rules (different parameter lists = different signatures).
   - `this(...)` constructor chaining and the "one primary constructor" pattern.
   - Common pitfalls (ambiguous overloads, telescoping constructors).
4. **Object representation with `toString()`**
   - Where `toString()` comes from (`java.lang.Object`) and why the default is unhelpful.
   - Overriding `toString()` with `@Override`; automatic invocation by `System.out.println`,
     string concatenation, and debuggers.
   - Good-representation guidelines (include identity-relevant fields, keep it side-effect free).
5. **Putting it together** — a fully worked `Book` / `BankAccount` class using all three tools.
6. **Assessment** — quiz on class and constructor syntax.

---

## 5. Session-by-session agenda

| Session | Focus | Main deliverable |
|:------:|-------|------------------|
| **[Session 1](./01-session/README.md)** | Constructors: default & parameterized; `this`; guarding valid state | An in-class `Book` class with two constructors that reject invalid data |
| **[Session 2](./02-session/README.md)** | Constructor overloading + `this(...)` chaining; overriding `toString()`; quiz | A `BankAccount` class with overloaded constructors and a meaningful `toString()`, plus the completed quiz |

Detailed timed agendas live inside each session's README. Supporting readings and the downloadable
PDF are in **[`material/`](./material/README.md)**. The non-graded challenge is in
**[`optional-activity/`](./optional-activity/README.md)**.

---

## 6. Key-concepts glossary

| Term | Definition |
|------|------------|
| **Constructor** | A special member with the **same name as the class** and **no return type** that runs automatically when an object is created with `new`; its job is to initialize the object's state. |
| **Default constructor** | A no-argument constructor. If you write **no** constructor at all, the compiler supplies an implicit empty one; as soon as you write *any* constructor, that gift disappears. |
| **Parameterized constructor** | A constructor that receives arguments used to initialize fields, e.g. `new Book("1984", "Orwell", 328)`. |
| **`this` (keyword)** | A reference to the current object. Used to disambiguate a field from a same-named parameter (`this.title = title;`) and, as `this(...)`, to call another constructor of the same class. |
| **Field shadowing** | When a method/constructor parameter has the same name as a field, the parameter "shadows" the field inside that scope; `this.field` reaches the field. |
| **Overloading** | Declaring multiple members with the **same name** but **different parameter lists** in the same class. Applies to constructors and ordinary methods. |
| **Method signature** | The name plus the ordered list of parameter types. Return type and parameter *names* are **not** part of the signature. |
| **Constructor chaining** | Calling one constructor from another with `this(...)`; the call must be the **first statement**. Centralizes initialization in one "primary" constructor. |
| **Invariant** | A condition that must always hold for an object to be valid (e.g. a bank balance is never negative). Constructors are the first line of defense for invariants. |
| **`toString()`** | A method inherited from `java.lang.Object`; overriding it defines how an object is rendered as text. Called automatically by `println`, string concatenation, and debuggers. |
| **`@Override`** | An annotation that tells the compiler you intend to override an inherited method; it turns a silent typo into a compile error. |
| **Fail-fast** | Rejecting bad input immediately (e.g. throwing `IllegalArgumentException` in the constructor) rather than letting a broken object propagate. |

---

## 7. Achievement / self-check checklist

Tick each item once you can do it **without looking at notes**:

- [ ] I can explain the difference between a constructor and an ordinary method.
- [ ] I can write an explicit no-argument constructor and a parameterized constructor.
- [ ] I can state when the compiler *stops* providing the implicit default constructor.
- [ ] I use `this.field = field;` correctly and can explain field shadowing.
- [ ] I can write two or more overloaded constructors and describe their signatures.
- [ ] I use `this(...)` to chain constructors and avoid duplicated initialization code.
- [ ] I validate arguments in the constructor so an invalid object can never be created.
- [ ] I override `toString()` with `@Override` and produce a readable representation.
- [ ] I can predict what `System.out.println(myObject)` prints before running it.
- [ ] I passed the Week 4 quiz on class and constructor syntax.

---

## 8. Resources index

| Resource | Location | Purpose |
|----------|----------|---------|
| Session 1 guide | [`01-session/README.md`](./01-session/README.md) | Theory + worked example + guided practice on constructors |
| Session 2 guide | [`02-session/README.md`](./02-session/README.md) | Overloading, `toString()`, and the quiz |
| Interactive OVA (SCORM) | `01-session/index.html` / `builds/OVA-SEMANA4-SCORM.zip` | Self-paced multimedia object for the week |
| Readings & PDF download | [`material/README.md`](./material/README.md) | Curated references with summary notes (download area) |
| Optional challenge | [`optional-activity/README.md`](./optional-activity/README.md) | Extra practice submitted via **GitHub** (not Moodle) |

### Prerequisites for this week

- Weeks 1–3: classes, objects, fields, methods, and encapsulation (private fields + getters/setters).
- A working JDK (17 or newer recommended) and an editor/IDE (IntelliJ IDEA, VS Code, or Eclipse).

### External references (full details in `material/`)

- Oracle, *The Java Tutorials* — "Providing Constructors for Your Classes".
- Oracle, *Java API* — `java.lang.Object.toString()`.
- J. Bloch, *Effective Java* (3rd ed.) — Item 12 ("Always override `toString`") and Item 1
  (static factories vs. constructors, for context).
