# Week 16 - Optional activity: Capstone reflection kata + portfolio repository

> **Subject:** Object-Oriented Programming and Design - 2026-B
> **Unit 3:** Practical application of OOP in Java
> **Week 16:** Course closure
> **RAA:** 90_82759
> **Submission channel:** GitHub (a public repository) — **NOT Moodle**

This activity is **optional** and offered for students who want extra practice consolidating the course. It combines a small **refactoring kata** that forces all four pillars with the assembly of a **portfolio repository** that traces your evidence to the RAA. It is a great way to strengthen your final defense.

---

## 1. Problem statement

You are given a deliberately bad, procedural design of a **library loan** module and asked to redesign it with sound OOP. The starting point (which you will replace) looks like this:

```java
// Anti-pattern starting point - DO NOT keep this design.
public class Library {
    // public mutable state, no encapsulation
    public String[] itemTitles = new String[100];
    public String[] itemTypes  = new String[100]; // "BOOK", "DVD", "MAGAZINE"
    public int[] loanDays      = new int[100];
    public int count = 0;

    // one big method with an instanceof/String-type chain (no polymorphism)
    public double lateFee(int i, int daysLate) {
        if (itemTypes[i].equals("BOOK"))      return daysLate * 500;
        if (itemTypes[i].equals("DVD"))       return daysLate * 1500;
        if (itemTypes[i].equals("MAGAZINE"))  return daysLate * 300;
        return 0;
    }
}
```

Your task: **redesign this into an object-oriented model** in Java that evidences all four pillars and good practices, and that makes adding a new item type easy (no editing of existing fee logic).

---

## 2. Requirements

Functional:
1. Model library items so each type knows its own **loan period** and **late fee per day**.
2. Support **at least three** item types (e.g., `Book`, `Dvd`, `Magazine`) and make it possible to add a fourth **without modifying** existing fee logic (open/closed spirit).
3. Provide a `Library` (or `Catalog`) that can hold many items and compute the **total late fee** for a set of overdue loans.
4. Reject invalid states (negative days, null title) with exceptions.

OOP / design requirements (each must be present and locatable):
- **Abstraction:** an `interface` or `abstract class` defining the item contract (e.g., `lateFeePerDay()`, `loanPeriodDays()`).
- **Encapsulation:** all fields `private`; access controlled; invariants validated in constructors.
- **Inheritance:** item types derive from the abstraction with a genuine "is-a".
- **Polymorphism:** fee/period computed via overridden methods; **no** `instanceof`/type-string chains in the client.

Good-practice requirements (at least three, all recommended):
- Meaningful naming (classes = nouns, methods = verbs).
- Exception handling for invalid input.
- **Unit tests** (JUnit 5) covering the fee calculation and at least one validation.
- A clear `README.md` with build/run instructions.
- A meaningful **Git commit history** (several incremental commits, not one dump).

---

## 3. Expected deliverable

A **public GitHub repository** containing:

```
library-loan-kata/
├── README.md                     # what it does, how to build/run, design notes
├── src/main/java/library/        # your OOP redesign
│   ├── LibraryItem.java          # abstraction (interface or abstract class)
│   ├── Book.java  Dvd.java  Magazine.java
│   └── Library.java              # holds items, totals late fees polymorphically
├── src/test/java/library/        # JUnit 5 tests
│   └── LibraryTest.java
└── docs/
    ├── class-diagram.png         # UML of your design
    └── portfolio.md              # RAA traceability table (see §5)
```

The `README.md` must include a short **"Where are the four pillars?"** section that points to the exact class/method for each pillar (this mirrors your final defense).

---

## 4. How to submit — via GitHub (NOT Moodle)

1. Create a **new public repository** named `library-loan-kata` on your GitHub account.
2. Initialize it, then develop in **small, meaningful commits** (e.g., "add LibraryItem abstraction", "add Book with late fee", "add polymorphic total in Library", "add JUnit tests").
   ```bash
   git init
   git add .
   git commit -m "Add LibraryItem abstraction and Book type"
   # ...continue in increments...
   git branch -M main
   git remote add origin https://github.com/<your-username>/library-loan-kata.git
   git push -u origin main
   ```
3. Ensure the repo is **public** and that a clean clone **compiles and the tests pass**.
4. **Submit the repository URL** where your instructor collects links for the course (e.g., the shared class roster/spreadsheet or the channel your instructor announced). Do **not** upload a ZIP to Moodle — the deliverable is the live GitHub repository and its commit history.

> Deadline: as announced for corte 3. Late submissions follow the general course policy.

---

## 5. Portfolio traceability (`docs/portfolio.md`)

Include a table linking your evidence to the RAA:

| Evidence | Pillar / practice | RAA | Where |
|---|---|---|---|
| `LibraryItem` interface | Abstraction | 90_82759 | `src/main/java/library/LibraryItem.java` |
| `private final` fields + validation | Encapsulation | 90_82759 | each item class |
| `Book/Dvd/Magazine extends/implements` | Inheritance | 90_82759 | item classes |
| `Library.totalLateFees(...)` | Polymorphism | 90_82759 | `Library.java` |
| `LibraryTest` | Testing | 90_82759 | `src/test/java/...` |
| commit history | Version control | 90_82759 | repo log |

---

## 6. Assessment criteria / rubric

Scored 1-4 per criterion (1 = Insufficient, 2 = In progress, 3 = Competent, 4 = Excellent). This activity is optional; when counted, it contributes as extra evidence toward corte 3 per the instructor's policy.

| Criterion | Weight | 1 | 2 | 3 | 4 |
|---|---|---|---|---|---|
| **Abstraction** | 15% | No contract; all concrete. | A contract exists but clients bypass it. | Clear interface/abstract class used by clients. | Clean, minimal contract; easy to extend. |
| **Encapsulation** | 15% | Public mutable fields. | Some fields private, no validation. | Private fields + validated constructors. | Invariants fully protected; no illegal states. |
| **Inheritance** | 15% | None / misused for code sharing only. | "is-a" unclear. | Genuine "is-a"; base not misused. | Well-factored hierarchy, no duplication. |
| **Polymorphism** | 20% | `instanceof`/type-string chains remain. | Overriding present but client still branches. | Client relies on dynamic dispatch. | Adding a new type needs zero client changes. |
| **Good practices** | 20% | None evident. | One (e.g., naming). | Three (e.g., naming + exceptions + tests). | Tests pass + README + clean Git history. |
| **Extensibility demo** | 15% | Cannot add a type without editing fee logic. | Requires edits in several places. | New type added by one new class. | New type added + test, no edits to existing logic. |

**To pass the activity,** achieve at least "Competent" (3) on Polymorphism and on Good practices, since those are the hardest evidence to fake and the most valuable for RAA 90_82759.

---

*Return to the [Week 16 guide](../README.md).*
