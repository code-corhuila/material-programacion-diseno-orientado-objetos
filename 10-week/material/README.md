# Week 10 — Curated Readings and Download Area

**Course:** Object-Oriented Programming and Design — CORHUILA, 2026-B
**Unit:** Unit 2 — Design principles and modularity
**Week:** 10 — Assessment Corte 2
**RAA:** `90_82759`

---

## About this area

This is a **download area** for the week's study PDF and a curated index of references. It is **not** a Moodle submission box — nothing is turned in here. Download the study material, use the references to prepare for the partial exam (Session 1) and the remediation session (Session 2), and submit graded work only where each session's guide directs.

> **Download:** the consolidated Week 10 study PDF (exam toolkit + smell/refactoring catalogue) is provided in this folder by the instructor. If it is not yet present, use the summaries below as the equivalent study text.

---

## 1. Curated readings

Each entry lists what to read, why it matters this week, and a focused takeaway. Chapter numbers are indicative; use the edition available in the CORHUILA library or your course platform.

### Core (read before the exam)

1. **Liskov & Wing — "A Behavioral Notion of Subtyping."**
   *Why:* the original, precise statement of the substitution principle you will be graded on.
   *Takeaway:* a subtype must preserve the supertype's provable properties — preconditions no stronger, postconditions no weaker.

2. **Gamma, Helm, Johnson, Vlissides — *Design Patterns*, Introduction ("Favor object composition over class inheritance").**
   *Why:* the canonical justification for the composition-over-inheritance heuristic central to the exam's Part C.
   *Takeaway:* inheritance breaks encapsulation between parent and child; composition keeps each class a black box and is changeable at runtime.

3. **Martin — *Clean Architecture / Agile Software Development*, chapters on SRP, LSP, and DIP.**
   *Why:* these three SOLID principles are exactly the ones the feedback legend uses in Session 2.
   *Takeaway:* one reason to change per class (SRP); subtypes must be substitutable (LSP); depend on abstractions (DIP).

### Supporting (deepen and remediate)

4. **Fowler — *Refactoring*, catalogue entries: Extract Interface, Replace Subclass with Delegate, Pull Up Field/Method, Push Down Method.**
   *Why:* the named moves you will apply in the Session 2 refactor.
   *Takeaway:* refactoring is behavior-preserving; make the smallest move that removes the smell.

5. **Bloch — *Effective Java*, items "Favor composition over inheritance" and "Design and document for inheritance or else prohibit it."**
   *Why:* concrete, language-level guidance and the `Stack`/`InstrumentedHashSet` cautionary tales.
   *Takeaway:* inheritance across package boundaries is fragile; if you do not design for it, forbid it (`final`).

6. **Official language documentation** (Java Language Specification / Oracle tutorials on interfaces, abstract classes, and polymorphism) — or the equivalent for your course language.
   *Why:* authoritative reference for the syntax and dispatch rules you must get exactly right in Part B.
   *Takeaway:* dynamic dispatch resolves overridden instance methods on the runtime type; fields and static methods do not.

---

## 2. Summary notes (study text)

These notes are the exam-portable distillation. If the PDF is unavailable, study from here.

### 2.1 The is-a / has-a decision, compressed

```
Ask "is every B an A?"  -> No  => composition (B has-a A)
                        -> Yes => can B substitute for A everywhere? (Liskov)
                                  -> No  => composition / restructure
                                  -> Yes => inheritance is defensible
```

### 2.2 The five pillars, one line each

- **Inheritance** — subclass *is-a* superclass; reuse + subtype polymorphism, tightest coupling.
- **Polymorphism** — one reference, many runtime forms; call dispatches to the actual object.
- **Abstraction** — expose the essential, hide the incidental; via abstract classes and interfaces.
- **Interface** — a contract of *what*, not *how*; a class may implement many.
- **Composition** — *has-a*; delegate to held objects; flexible, runtime-changeable.

### 2.3 Smell → principle → fix quick table

| Smell | Violates | Fix |
|---|---|---|
| Refused bequest | LSP | Replace Inheritance with Delegation / Extract Interface |
| God class | SRP | Extract Class by responsibility |
| Tight coupling to concretes | DIP | Depend on an interface; inject dependency |
| Duplicated capability across siblings | (missing abstraction) | Extract Interface / Pull Up Member |
| Deep, hard-to-follow hierarchy | over-inheritance | Flatten; favor composition |

### 2.4 Exam self-test (answer without notes)

1. Give one relationship that *looks* is-a but is really has-a, and say why.
2. Write, from memory, an interface with a default method and a class implementing it.
3. Explain why `Square extends Rectangle` can violate LSP.
4. Name the refactoring that fixes a refused bequest.
5. State one benefit and one cost of composition versus inheritance.

*(Model answers: 1 — `Stack`/`List`, because a stack must not allow arbitrary-position insertion; 2 — see Session 1 §4.3 style; 3 — a `Square` that constrains width==height breaks callers who set width and height independently, weakening `Rectangle`'s postcondition; 4 — Replace Inheritance with Delegation, or Extract Interface; 5 — benefit: runtime flexibility and looser coupling, cost: forwarding boilerplate and more types.)*

---

## 3. Resource index (course-internal links)

| Resource | Path | Use |
|---|---|---|
| Week guide | [`../README.md`](../README.md) | Overview, objectives, glossary |
| Session 1 — exam | [`../01-session/README.md`](../01-session/README.md) | Recap, worked example, exam format, rubric |
| Session 2 — remediation | [`../02-session/README.md`](../02-session/README.md) | Smell catalogue, refactoring moves, reflection |
| Optional activity | [`../optional-activity/README.md`](../optional-activity/README.md) | Extra design challenge (GitHub submission) |

---

## 4. How to use this material by role

- **Before Session 1:** read the Core list (1–3), work the exam self-test (§2.4), and memorize the is-a/has-a procedure.
- **Between sessions:** revisit the smell → principle → fix table (§2.3).
- **During Session 2:** keep the Fowler refactoring entries (reading 4) open as a reference for the named moves.
- **For the optional activity:** lean on Bloch (reading 5) for composition-over-inheritance justifications.

---

*Reminder: this folder is for downloading and reference only. Graded submissions go where each session guide specifies; the optional activity is submitted via GitHub.*
