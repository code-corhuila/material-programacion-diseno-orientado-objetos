# Week 08 - Materials and Downloads

**Course:** Object-Oriented Programming and Design (2026-B)
**Topic:** Abstract classes and interfaces
**Purpose of this folder:** a **download area** for the week's consolidated study
material (a PDF) plus a curated, annotated index of readings and resources.

> **Note.** This is a **download area**, not a Moodle submission box. Use the resources
> here to study; there is nothing to *submit* from this folder. The optional practice you
> may hand in lives in [`../optional-activity/README.md`](../optional-activity/README.md)
> and is submitted via **GitHub**, not Moodle.

---

## 1. Downloadable PDF

- **`week08-abstract-classes-and-interfaces.pdf`** *(place the file in this folder)*
  A single consolidated PDF combining the theory notes, worked examples, UML diagrams,
  and the decision framework from both sessions, formatted for offline reading and
  printing. Download it, read before class, and bring your annotations.

  Suggested table of contents for the PDF:
  1. Abstraction: what and why
  2. Abstract classes and abstract methods (Session 1)
  3. Interfaces and contracts (Session 2)
  4. Abstract class vs. interface - decision framework
  5. Combining all three building blocks
  6. Worked examples with expected output
  7. Glossary and self-check checklist

*(If the PDF is not yet present, the two session READMEs contain the full text content
that the PDF is built from.)*

---

## 2. Curated readings (annotated)

### 2.1 Primary references

1. **Oracle - *The Java Tutorials*: "Interfaces and Inheritance".**
   The official, free, and authoritative walkthrough of `abstract`, `interface`,
   `extends`, and `implements`.
   *Why read it:* concise definitions and canonical syntax; the "Abstract Methods and
   Classes" and "Interfaces" pages map one-to-one onto our two sessions.
   *Focus on:* the difference between an abstract class and an interface, and default
   methods.

2. **Bloch, J. - *Effective Java* (3rd ed.), items "Prefer interfaces to abstract
   classes" and "Design interfaces for posterity".**
   The most cited practical advice on this exact decision.
   *Why read it:* it explains *why* interfaces are usually the more flexible default, and
   when a "skeletal implementation" (abstract class implementing an interface) is the best
   of both worlds - exactly our combined pattern.
   *Focus on:* the skeletal-implementation (`Abstract*`) idiom.

3. **Gamma, Helm, Johnson, Vlissides - *Design Patterns*, "Template Method".**
   *Why read it:* our `Shape.describe()` and `AbstractNotifier.send()` are Template
   Methods; this is the classic description of the pattern that abstract classes enable.
   *Focus on:* the idea of a fixed algorithm skeleton with variable steps.

4. **Martin, R. C. - *Agile Software Development, Principles, Patterns, and Practices*,
   chapters on abstraction and the Dependency Inversion Principle (DIP).**
   *Why read it:* connects "program to an interface" to a formal design principle you will
   study later in Unit 2.
   *Focus on:* why high-level code should depend on abstractions, not concretions.

### 2.2 Supporting / cross-language references

5. **Microsoft - *C# documentation*: "Interfaces" and "abstract" keyword.**
   Useful if you also work in C#; the concepts are nearly identical, with `abstract`
   classes and `interface` types behaving like Java's.

6. **Python docs - `abc` module (`ABC`, `abstractmethod`) and `typing.Protocol`.**
   Shows how the same ideas appear in a duck-typed language: `ABC` is the abstract-class
   analogue; `Protocol` is the structural-interface analogue.

7. **TypeScript handbook - "Interfaces" and "Abstract Classes".**
   A clear, modern take for students who also do web development.

---

## 3. Short summary notes (quick reference)

### Abstract class - in three lines
- Partially implemented base type; **cannot be instantiated**.
- Can hold **state (fields), constructors, and concrete methods** plus **abstract methods**.
- Models an **"is-a" family**; a class may extend **only one**.

### Interface - in three lines
- Pure **contract**: method signatures, constants, optional default/static methods; **no
  instance state**.
- Models a **capability ("can-do")**; a class may implement **many**.
- The primary tool for **decoupling** callers from implementations.

### Decision cheat-sheet
| If you need... | Use |
|---|---|
| shared fields / constructor / substantial shared code | abstract class |
| a contract many unrelated classes can fulfil | interface |
| a type to belong to several abstractions | interfaces |
| a public contract **and** a shared skeleton | interface **+** abstract class |

### Keywords at a glance
| Keyword | Meaning |
|---|---|
| `abstract` (class) | class cannot be instantiated; may have abstract methods |
| `abstract` (method) | declared without a body; subclasses must implement |
| `interface` | declares a contract |
| `extends` | inherit from one class (or interface-to-interface) |
| `implements` | a class realizes one or more interfaces |
| `default` | interface method with a body |
| `@Override` | compiler-checked annotation confirming an override |

---

## 4. How to use these materials

1. **Before Session 1:** skim reference 1 (Oracle - Abstract Methods and Classes) and the
   "Abstract class" summary above.
2. **Before Session 2:** skim reference 1 (Oracle - Interfaces) and reference 2 (Bloch)
   and the decision cheat-sheet.
3. **While doing the optional activity:** keep the decision cheat-sheet and the combined
   pattern from Session 2 open as a checklist.
4. **Before the corte 2 assessment:** re-read the summary notes and complete the
   self-check checklist in the [week guide](../README.md#7-achievement--self-check-checklist).

---

## 5. Related course files

- [Week guide](../README.md)
- [Session 1 - Abstract classes](../01-session/README.md)
- [Session 2 - Interfaces and combining abstractions](../02-session/README.md)
- [Optional activity (GitHub submission)](../optional-activity/README.md)
