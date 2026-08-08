# Week 07 - Readings and Resources (Download Area)

## Polymorphism and Method Overriding (Dynamic Dispatch)

**Unit 2 - Design principles and modularity | Corte 2 | RAA 90_82759**

---

> **What this folder is.** This is a **download area**. The consolidated weekly reading is
> distributed here as a **PDF** for offline study. This is **not** a Moodle submission box —
> you do not upload anything here. Graded/optional deliverables for the week are handled in
> [`../optional-activity/README.md`](../optional-activity/README.md) via GitHub.

---

## 1. How to use this material

1. **Download** the weekly PDF (link/attachment provided by the instructor in this folder).
2. **Read** the core sources in the order below *before* Session 2 — Session 1 assumes you
   have at least skimmed items 1 and 2.
3. **Bring questions.** Mark anything about the vtable model or static-vs-dynamic type you
   want clarified; we open Session 2 with a short Q&A.
4. **Practice as you read.** Every code snippet in the sessions is runnable; type it, run it,
   and change one thing to see what breaks.

---

## 2. Core readings (read these)

### 2.1 Language reference — overriding and dispatch

- **Oracle, *The Java Tutorials* — "Overriding and Hiding Methods" and "Polymorphism".**
  The authoritative, concise description of the overriding rules, method hiding, and the
  `@Override` annotation, with small runnable examples.
  *Summary:* Defines when a subclass method overrides vs. hides a superclass method,
  explains that instance methods are dynamically dispatched while `static` methods and
  fields are bound to the declared type, and shows the canonical animal/shape polymorphism
  example. **Read for:** Session 1 §3.2-3.4 and Session 2 §3.2.

### 2.2 Design principle — why polymorphism matters

- **Robert C. Martin, *Agile Software Development, Principles, Patterns, and Practices* — chapters on OCP (Open/Closed) and LSP (Liskov Substitution).**
  Explains why replacing type-based conditionals with polymorphism produces software that is
  open for extension but closed for modification, and what makes a subtype a *safe*
  substitute.
  *Summary:* OCP is achieved in practice through abstraction plus dynamic dispatch; LSP is
  the contract a correct override must respect. **Read for:** Session 1 §3.5 and Session 2
  §3.3 (pitfall 3).

### 2.3 Foundational OO text

- **Bruce Eckel, *Thinking in Java* — chapter "Polymorphism".**
  A teaching-oriented walkthrough of upcasting, late binding, the "shape" example, and the
  constructor-calls-overridable-method pitfall.
  *Summary:* Builds intuition for why late binding is the "twist" that makes OO powerful, and
  demonstrates the constructor pitfall with a traceable example. **Read for:** Session 1 §4
  and Session 2 §3.3 (pitfall 2).

---

## 3. Supplementary readings (recommended, not required)

| Source | What it adds | Maps to |
|--------|--------------|---------|
| Gamma, Helm, Johnson, Vlissides, *Design Patterns* — *Strategy* and *Template Method* | Shows polymorphism as the engine of two foundational patterns. | Session 1 §3.5; Session 2 §3.1 |
| Joshua Bloch, *Effective Java* — items on `equals`/`hashCode` and "Design and document for inheritance or else prohibit it" | Deep, practical rules for correct overriding. | Session 2 §3.3 (pitfalls 2, 4) |
| Barbara Liskov & Jeannette Wing, "A Behavioral Notion of Subtyping" | The original, formal statement of substitutability. | Session 2 §3.3 (pitfall 3) |
| Language docs for **C#** (`virtual`/`override`), **C++** (`virtual`, vtables), **Kotlin** (`open`/`override`), **Python** (duck typing, MRO) | Contrasts how other languages express the same idea. | Cross-language notes in both sessions |

---

## 4. Quick-reference cheat sheet

```
STATIC TYPE   (declared)  -> what you MAY call          -> compile time
DYNAMIC TYPE  (actual)    -> which override RUNS         -> run time

OVERRIDE  : same signature, subclass, @Override  -> DISPATCHED (polymorphic)
OVERLOAD  : same name, different params           -> compile-time pick
HIDE      : static method / field, same name      -> bound to static type (NOT polymorphic)

Dispatched?  instance method, non-final, non-private, non-static -> YES
             fields, static methods, private methods             -> NO

super.m()  -> call the parent's version (extend, don't replace)
```

---

## 5. Glossary (quick recall)

| Term | One-line meaning |
|------|------------------|
| Polymorphism | One call site, many implementations, chosen by the object's actual type. |
| Overriding | New body for an inherited instance method with the same signature. |
| Dynamic dispatch / late binding | Run-time selection of the overriding implementation. |
| Static type | Declared type; governs what the compiler allows. |
| Dynamic type | Actual instantiated class; governs which override runs. |
| vtable | Per-class table the runtime uses to route virtual calls. |
| Overloading | Same name, different parameters; resolved at compile time. |
| Hiding | `static` method / field masking; not polymorphic. |
| Covariant return | An override may return a subtype of the declared return type. |
| LSP | A subtype must be a safe substitute for its supertype. |

---

## 6. Suggested study plan (approx. 90 minutes of self-study)

1. **(20 min)** Read §2.1 (Oracle) and reproduce the `Payment` example from Session 1.
2. **(20 min)** Read §2.3 (Eckel, Polymorphism) and run the constructor pitfall to see the `null`.
3. **(20 min)** Read §2.2 (OCP/LSP) and re-read Session 2 §3.1 on collections.
4. **(20 min)** Do the Session 2 refactor (payroll ladder) on your own.
5. **(10 min)** Fill in the self-check checklist in the week [`README.md`](../README.md).

> All external titles above are references for you to locate through the university library
> or official documentation sites; the consolidated **PDF in this folder** contains the
> instructor's condensed notes and the full worked examples for offline reading.
