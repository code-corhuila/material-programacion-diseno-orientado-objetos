# Week 07 - Reading & Resource Materials (Download Area)

## Polymorphism and Method Overriding (Dynamic Dispatch)

**Course:** Object-Oriented Programming and Design (2026-B)
**Unit 2:** Design principles and modularity
**Assessment period:** Corte 2 · **RAA:** 90_82759

> **What this folder is.** This is a **download area**. The consolidated reading
> for the week is provided as a **PDF** you can download and read offline. This
> is **not** a submission box — you do not upload anything here. (Graded work for
> the optional practice is submitted via **GitHub**; see
> [`../optional-activity/README.md`](../optional-activity/README.md).)

---

## 1. How to use this material

1. **Download** the week's PDF (see §2) and read it *before* or *alongside* the
   two sessions.
2. Use the **summary notes** in §3 as a fast reference while you code.
3. Work through the **guided readings** in §4 for depth on specific points.
4. Test yourself with the **practice questions** in §6; solutions are in the PDF.

Estimated reading + practice time: **90-120 minutes**.

---

## 2. Primary download (PDF)

| Item | Suggested file name | Notes |
|------|--------------------|-------|
| Week 07 reading pack | `week07-polymorphism-dynamic-dispatch.pdf` | Consolidated theory, all worked examples, diagrams, and self-test solutions. |

> The PDF mirrors and expands the two session READMEs, adds fully solved
> versions of the practice questions in §6, and includes larger diagrams of the
> vtable / MRO mechanics. Place the PDF in this folder for students to download.

---

## 3. Summary notes (quick reference)

### 3.1 The one-paragraph summary

Polymorphism lets a single call written against a **supertype** run
type-specific behavior chosen by each object's **actual class** at runtime. You
enable it by **overriding** inherited methods in subclasses and calling them
through **parent-type references**. The runtime uses **dynamic dispatch** (a
vtable lookup in Java/C++, an MRO walk in Python) to pick the right
implementation. Well-designed polymorphic code names only the supertype, so new
subtypes extend the system without modifying existing code (Open-Closed),
provided each subtype honors its parent's contract (Liskov).

### 3.2 Decision table - overriding vs. overloading vs. hiding

| Question | Overriding | Overloading | Hiding |
|----------|-----------|-------------|--------|
| Same name? | Yes | Yes | Yes |
| Same parameters? | Yes | No | Yes |
| Member kind | instance method | any | `static` / field |
| Bound | runtime | compile time | compile time |
| Driven by | actual type | argument types | declared type |

### 3.3 "Which type wins?" cheat sheet

| Expression | Winner | Why |
|-----------|--------|-----|
| overridden instance method | **actual** type | dynamic dispatch |
| field access | declared type | fields are hidden |
| `static` method | declared type | statically bound |
| `private` / `final` method | defining class | not virtual |
| overload selection | declared arg types | compile-time |

### 3.4 Minimal template to imitate

```java
abstract class Base {                 // 1. general type
    abstract Result operate();        // 2. abstract = force specialization
    void common() { ... operate() ... }   // 3. reuse via polymorphic call
}
class Special extends Base {
    @Override Result operate() { ... }     // 4. specialize
}
// 5. process uniformly
for (Base b : items) b.operate();     // dynamic dispatch per element
```

---

## 4. Guided readings (curated)

Each entry lists *why* it matters and *what to focus on*.

1. **Oracle Java Tutorials — "Polymorphism"**
   *Focus:* the `Bicycle`/`MountainBike` example; how one reference type calls
   overridden methods. *Why:* canonical, minimal, official.

2. **Oracle Java Tutorials — "Overriding and Hiding Methods"**
   *Focus:* the explicit contrast between overriding (instance) and hiding
   (`static`). *Why:* nails the single most-confused distinction of the week.

3. **Bloch, J. — *Effective Java*, 3rd ed.**
   - *Item 40:* "Consistently use the `@Override` annotation." *Why:* explains
     the real bugs the annotation prevents.
   - *Item 52:* "Use overloading judiciously." *Why:* shows how overloading
     (compile-time) trips people who expect polymorphism.
   - *Items 19-20:* designing for inheritance and preferring interfaces. *Why:*
     how to make types that are *safe* to override.

4. **Martin, R. C. — *Agile Software Development: Principles, Patterns, and
   Practices*.**
   *Focus:* the Open-Closed Principle and Liskov Substitution Principle
   chapters, including the Rectangle/Square example. *Why:* the design rationale
   behind *why* we use polymorphism at all.

5. **Gamma, Helm, Johnson, Vlissides — *Design Patterns*.**
   *Focus:* **Strategy** and **Template Method** patterns. *Why:* both are
   polymorphism applied deliberately — the abstract-method-plus-override shape
   you practiced this week is literally Template Method.

6. **Python Docs — "The Python Tutorial: Classes" + `__mro__`.**
   *Focus:* method resolution order and C3 linearization. *Why:* shows the same
   polymorphism achieved without static types or vtables.

---

## 5. Concept map (text form)

```
                         POLYMORPHISM
                              |
      +-----------------------+------------------------+
      |                       |                        |
  enabled by              powered by              constrained by
      |                       |                        |
  OVERRIDING            DYNAMIC DISPATCH          CONTRACTS (LSP)
      |                       |                        |
  @Override,            declared type ->          subtype must be
  super, covariant      "what you may call"       substitutable
  returns               actual type ->                 |
      |                 "which code runs"          enables OCP:
  specializes           via vtable (Java)          extend without
  behavior per          / MRO (Python)             modifying
  subclass                                         existing code
      |
      +--> processed by a POLYMORPHIC ROUTINE
           (loop over List<Supertype>, no instanceof)
```

---

## 6. Self-test questions (solutions in the PDF)

1. **Predict the output.**
   ```java
   class A { String m() { return "A.m"; } String call() { return m(); } }
   class B extends A { @Override String m() { return "B.m"; } }
   A a = new B();
   System.out.println(a.call());
   ```
   *(What does `call()`, defined in `A`, print — and why?)*

2. **Overriding or hiding?** For each, state which and what it prints:
   ```java
   class P { static String s() { return "P.s"; } String i() { return "P.i"; } }
   class C extends P { static String s() { return "C.s"; } @Override String i() { return "C.i"; } }
   P p = new C();
   System.out.println(p.s() + " / " + p.i());
   ```

3. **Refactor.** Rewrite the following as polymorphic code with no `instanceof`:
   ```java
   double tax(Object account) {
       if (account instanceof Savings)  return ...;
       if (account instanceof Checking) return ...;
       return 0;
   }
   ```

4. **Contract reasoning.** Give a concrete `Rectangle`/`Square` sequence of calls
   whose result reveals an LSP violation, and state the wrong value produced.

5. **Covariant returns.** Write a base method returning `Shape` and an override
   returning `Circle`, and explain why the compiler accepts it.

6. **Conceptual.** In three sentences, explain how a vtable makes dynamic
   dispatch roughly constant-time and why that beats an `instanceof` chain in
   both speed and maintainability.

---

## 7. Glossary (condensed)

- **Dynamic dispatch:** runtime selection of a method by the object's actual
  class.
- **Declared vs. actual type:** compiler-visible type vs. real runtime class.
- **vtable / MRO:** the lookup structures that make dispatch fast.
- **Overriding / overloading / hiding:** replace / same-name-diff-params /
  static-shadow.
- **Upcast / downcast:** subtype->supertype (safe) / supertype->subtype (risky).
- **LSP / OCP:** substitutability / extend-without-modify.

*(Full definitions: see the course glossary in
[`../README.md`](../README.md#6-key-concepts-glossary).)*

---

## 8. Checklist before moving on

- [ ] I downloaded and read the week's PDF.
- [ ] I can answer all six self-test questions and checked them against the
  solutions.
- [ ] I reviewed the "which type wins?" cheat sheet until it felt automatic.
- [ ] I am ready to attempt the optional GitHub activity.
