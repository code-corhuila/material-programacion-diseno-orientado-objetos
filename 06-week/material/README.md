# Week 06 - Reading & Resource Area

## Inheritance in Java: single inheritance and the `super()` reference

**Course:** Object-Oriented Programming and Design | **Unit 2** - Design principles and modularity
**Assessment period:** Corte 2

---

> **About this area.** This is a **download / reading area**, not a submission box. Here you will find the curated readings and a downloadable PDF that consolidate the week's theory. There is nothing to upload here. Graded practice is submitted through the [optional activity](../optional-activity/README.md) (via GitHub) and through the Corte 2 assessment.

---

## 1. Downloadable material

| File | Format | Description |
|---|---|---|
| `week06-inheritance-super.pdf` | PDF | Consolidated theory handout for Week 06: the "is-a" relationship, `extends`, the constructor chain, `super(...)` and `super.method()`, overriding, access modifiers, and inheritance limits. Place the exported PDF next to this README so students can download it directly. |

> **Instructor note.** Export the two session READMEs (or the week guide) to a single PDF named exactly `week06-inheritance-super.pdf` and drop it in this folder. The table above already links its expected name so the download appears as soon as the file is present.

---

## 2. Curated readings (with summary notes)

Each entry lists what to read and *why*, so you can study efficiently.

### 2.1 Core (read these first)

1. **Oracle - The Java Tutorials: "Inheritance"**
   *Java SE > Learning the Java Language > Interfaces and Inheritance > Inheritance.*
   - **Why:** The authoritative, free explanation of what a subclass inherits, the role of `Object` as the root, and the `extends` keyword.
   - **Summary note:** Confirms our two rules - private members are not directly inherited, and constructors are not inherited. Read the "What You Can Do in a Subclass" section carefully.

2. **Oracle - The Java Tutorials: "Using the Keyword super"**
   *Same chapter, subsection "Using the Keyword super".*
   - **Why:** Directly covers both uses of `super`: the constructor call `super(...)` and the member access `super.method()`.
   - **Summary note:** Pay attention to the rule that `super(...)` must be the first statement, and to the implicit `super()` the compiler inserts.

3. **Oracle - The Java Tutorials: "Overriding and Hiding Methods"**
   - **Why:** Clarifies overriding vs. hiding and the meaning of `@Override`.
   - **Summary note:** Instance methods are **overridden** (dynamic dispatch); static methods are **hidden**. Use `@Override` to let the compiler verify your intent.

### 2.2 Recommended (deepen and challenge)

4. **Bloch, Joshua. *Effective Java*, 3rd ed. - Item 18: "Favor composition over inheritance" and Item 19: "Design and document for inheritance or else prohibit it."**
   - **Why:** The canonical discussion of *when inheritance hurts* and why composition is often safer.
   - **Summary note:** Introduces the fragile base class problem with a concrete `HashSet` example. Strongly reinforces this week's "limits of inheritance" section.

5. **Horstmann, Cay. *Core Java, Volume I - Fundamentals* - Chapter on Inheritance.**
   - **Why:** A textbook-style walkthrough with the classic `Employee` / `Manager` example we used in Session 2.
   - **Summary note:** Good for students who want more worked examples and a slower pace, including the constructor-chaining diagrams.

6. **Liskov, Barbara & Wing, Jeannette - "A Behavioral Notion of Subtyping" (concept only).**
   - **Why:** The origin of the Liskov Substitution Principle - the formal answer to "when is `is-a` really safe?"
   - **Summary note:** You do not need the formal proof; grasp the intuition: a subclass object must be usable anywhere its parent is expected, without surprising the caller. This is the deep reason "is-a" misuse causes bugs.

### 2.3 Quick reference

7. **Java Language Specification (JLS), Section 8.8.7 - "Constructor Body" (skim).**
   - **Why:** The precise rule for the implicit `super()` and constructor chaining, straight from the source.
   - **Summary note:** Reference only - consult when you hit a subtle constructor error.

---

## 3. One-page concept recap

```
INHERITANCE (single) in Java
============================

  "is-a" test           SavingsAccount IS-A Account   -> use inheritance
  "has-a" test          Car HAS-A Engine              -> use composition (a field)

  Declare               class Child extends Parent { ... }
  Root of all           every class extends Object (implicitly)

  Inherited             public / protected members (package-private if same package)
  NOT inherited         private members (indirect access only), constructors

  Constructor chain     Child ctor -> super(...) -> Parent ctor -> ... -> Object
                        parent initialized FIRST, then child
  super(...)            call parent constructor  (FIRST statement of a constructor)
  super.method()        call parent's version of a method (anywhere in the child)

  Overriding            same signature in child, replaces parent behavior; use @Override
  Access                private < package-private < protected < public

  Single inheritance    one superclass only  -> avoids the DIAMOND PROBLEM
  Many interfaces        a class may implements several interfaces (studied later)

  Limits                fragile base class, tight coupling, "is-a" misuse
  Heuristic             favor composition over inheritance when in doubt
```

---

## 4. How to use this area

1. **Before the sessions:** skim readings 1-3 (Section 2.1) so the class discussion makes sense.
2. **After the sessions:** download `week06-inheritance-super.pdf`, then read 4 (Bloch, Item 18) to understand the limits.
3. **For the optional activity:** keep readings 1-2 open as a reference while you code; they answer most "why won't `super` compile?" questions.
4. **For the forum post:** reading 4 and reading 6 give you the vocabulary (fragile base class, Liskov substitution) to argue the limits of inheritance convincingly.

---

## 5. Related course links

- Week guide: [`../README.md`](../README.md)
- Session 1 (extends + `super()`): [`../01-session/README.md`](../01-session/README.md)
- Session 2 (overriding + limits): [`../02-session/README.md`](../02-session/README.md)
- Optional activity (GitHub submission): [`../optional-activity/README.md`](../optional-activity/README.md)
