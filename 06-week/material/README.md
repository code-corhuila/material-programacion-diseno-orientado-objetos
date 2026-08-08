# Week 06 · Reading & Resource Materials (Download Area)

> **Course:** Object-Oriented Programming and Design · **Term:** 2026-B
> **Unit 2:** Design principles and modularity · **Topic:** Inheritance and `super()`
> **Assessment period:** Corte 2 · **RAA:** `90_82759`

---

## How to use this area

This is a **download area**. The consolidated study guide for Week 06 is provided here as a **PDF** for
offline reading and printing.

> **This is NOT a submission box.** Do not upload anything here. Graded and optional deliverables are
> handled elsewhere — see the [optional activity](../optional-activity/README.md), which is submitted
> via **GitHub**, not Moodle.

**Downloadable file:** `week06-inheritance-super.pdf` *(place the exported PDF in this folder; the file
name above is the expected name so links from the LMS resolve correctly).*

The PDF consolidates: the "is-a" test, the `extends` mechanics, the diamond-problem rationale for
single inheritance, constructor chaining with `super(...)`, and the `super.method()` reuse pattern —
i.e., the printable version of both session notes plus the reference list below.

---

## 1. Primary references

| # | Reference | Why read it | Suggested scope |
|:-:|---|---|---|
| 1 | **Oracle — The Java Tutorials: *Inheritance*** (Learning the Java Language → Interfaces and Inheritance) | The canonical, free explanation of `extends`, what is inherited, and the `Object` root. | The "Inheritance" and "Multiple Inheritance of State, Implementation, and Type" pages. |
| 2 | **Oracle — The Java Tutorials: *Using the Keyword `super`*** | Focused, example-driven page on `super(...)` and `super.method()`. | Whole page. |
| 3 | **Bloch, J. — *Effective Java*, 3rd ed. (Addison-Wesley, 2018), Item 18: "Favor composition over inheritance"** | The single best treatment of inheritance's *limits* — essential for the forum discussion. | Item 18 (≈6 pages). |
| 4 | **Horstmann, C. — *Core Java, Volume I: Fundamentals*, 12th ed. (Pearson).** Chapter "Inheritance". | Thorough textbook coverage with the `Employee`/`Manager` running example used in class. | §"Classes, Superclasses, and Subclasses". |
| 5 | **Gamma, Helm, Johnson, Vlissides — *Design Patterns* (1994).** Introduction, principle: *"Favor object composition over class inheritance."* | Historical source of the composition-over-inheritance guideline. | Introduction only. |

> Access note: Items 1–2 are freely available from Oracle's official documentation. Items 3–5 are books
> available through the CORHUILA library and standard academic channels. Consult the librarian for
> licensed digital copies.

---

## 2. Short summary notes (study capsules)

Use these one-paragraph capsules to review quickly before the sessions.

### 2.1 The "is-a" test
Inheritance encodes an **is-a** relationship. Before writing `extends`, verbalize the sentence
("a `Manager` **is an** `Employee`"). If the natural word is "**has a**", model it with a field
(composition) instead. Choosing the wrong relationship is the most common early design mistake.

### 2.2 What `extends` gives you
A subclass automatically receives the parent's non-`private` fields and methods, plus everything
`Object` provides. You write only the *new or specialized* parts. `private` members still exist inside
the object but must be reached through an inherited accessor.

### 2.3 Why single inheritance
A Java class extends exactly one class. If two parents could supply the same method, which one wins
would be ambiguous — the **diamond problem**. Restricting classes to one parent keeps the type
hierarchy an unambiguous tree.

### 2.4 Constructor chaining with `super(...)`
An object is built **parent-first**. `super(arguments)` invokes the parent constructor and **must be
the first statement** of the child constructor. If omitted, the compiler inserts `super()` — which only
compiles when the parent has a no-arg constructor. Once a parent declares a parameterized constructor
and no no-arg one, every child must call `super(...)` explicitly.

### 2.5 Reuse with `super.method()`
Inside an overriding method, `super.method()` calls the parent's version, letting you **extend** its
result instead of copying its code. This is how you specialize behavior while honoring DRY.

### 2.6 The limits of inheritance
Inheritance couples a subclass tightly to its parent's implementation. Changing the base class can
silently break subclasses (the **fragile base class** problem), and deep hierarchies become hard to
follow. When you only want to *reuse code* (not model a true is-a relationship), prefer **composition**.

---

## 3. Quick-reference cheat sheet

```java
// ---- Declaring inheritance ----
class Parent { /* fields, methods, constructors */ }
class Child extends Parent { /* adds/ specializes */ }   // single parent only

// ---- Constructor chaining ----
class Child extends Parent {
    Child(int x) {
        super(x);        // FIRST statement; runs Parent's constructor
        // ...child-specific initialization...
    }
}

// ---- Reusing parent behavior ----
class Child extends Parent {
    @Override
    String describe() {
        return super.describe() + " + extra";   // extend, don't duplicate
    }
}
```

| Symbol | Meaning |
|---|---|
| `extends` | Declares a subclass of exactly one parent. |
| `super(args)` | Parent constructor call; must be first line of a constructor. |
| `super.member` | Access to the parent's field/method from within the child. |
| `@Override` | Compiler check that a method truly overrides a parent method. |

---

## 4. Self-study checklist

- [ ] I downloaded and read `week06-inheritance-super.pdf`.
- [ ] I read Oracle's *Inheritance* and *Using `super`* pages (refs 1–2).
- [ ] I can restate *Effective Java* Item 18's core argument in my own words (ref 3).
- [ ] I can produce the cheat-sheet snippets above from memory.
- [ ] I am ready for the [optional GitHub activity](../optional-activity/README.md).

---

## 5. Where things live (navigation)

- Week guide: [`../README.md`](../README.md)
- Session 01 notes: [`../01-session/README.md`](../01-session/README.md)
- Session 02 notes: [`../02-session/README.md`](../02-session/README.md)
- Optional activity (GitHub): [`../optional-activity/README.md`](../optional-activity/README.md)
