# Week 07 - Optional Activity

## Media Library: Polymorphic Catalog Processing

**Course:** Object-Oriented Programming and Design (2026-B)
**Unit 2:** Design principles and modularity
**Assessment period:** Corte 2 · **RAA:** 90_82759
**Type:** Optional practice (formative) · **Submission:** **GitHub** (not Moodle)

> **Why optional?** This activity is not required to pass the corte, but it is the
> fastest way to convert this week's theory into muscle memory. It is designed to
> take **2-4 hours** and produces a small, portfolio-worthy program. Feedback is
> given on your GitHub repository.

---

## 1. Learning goals

This activity exercises **all five** weekly objectives:

1. Override inherited methods to specialize subclass behavior.
2. Invoke methods polymorphically through parent-type references.
3. Explain (in your README) how dynamic dispatch selects the implementation.
4. Implement a routine that processes a **heterogeneous collection**
   polymorphically.
5. Differentiate overriding from overloading/hiding and preserve substitutability.

---

## 2. Problem statement

You will build a small **Media Library** application. A library holds many kinds
of media items — **books, movies, and podcasts** — that are all catalogued and
reported through the **same** code path, even though each computes its details
differently.

Every media item can answer three questions uniformly:

- *"How long does it take to consume you?"* -> `estimatedMinutes()`
- *"Give me a one-line catalog entry."* -> `catalogEntry()`
- *"What category are you?"* -> `category()`

...but each **type** answers `estimatedMinutes()` in its own way:

| Type | `estimatedMinutes()` rule |
|------|---------------------------|
| **Book** | `pages x 1.5` minutes (average reader). |
| **Movie** | its `runtimeMinutes` directly. |
| **Podcast** | `episodes x avgEpisodeMinutes`. |

A single **catalog report routine** must iterate over a mixed collection of
media items and produce a report — with **no `instanceof`** and **no type-switch**
in the reporting logic.

---

## 3. Functional requirements

### R1 - Type hierarchy

- An **abstract** base class `MediaItem` with at least:
  - common fields `title` and `author` (or `creator`), set via constructor;
  - an **abstract** method `estimatedMinutes()`;
  - an **abstract** method `category()` returning a `String` (e.g. `"Book"`);
  - a **concrete** method `catalogEntry()` that builds a one-line string using
    the polymorphic calls above (reuse, do not duplicate).
- Three subclasses — `Book`, `Movie`, `Podcast` — each:
  - adds its own fields (see §2 table);
  - **overrides** `estimatedMinutes()` and `category()` with `@Override`;
  - at least **one** subclass must also **override** `catalogEntry()` and call
    `super.catalogEntry()` (demonstrate *extension*, not just replacement).

### R2 - Polymorphic catalog routine

Implement a class `Library` (or equivalent) that holds a
`List<MediaItem>` and provides:

- `void addItem(MediaItem item)`
- `void printCatalog()` — prints each item's `catalogEntry()` (one per line).
- `int totalEstimatedMinutes()` — sums `estimatedMinutes()` across all items.
- `MediaItem longest()` — returns the item with the greatest
  `estimatedMinutes()`.
- `List<MediaItem> byCategory(String category)` — filters by `category()`.

**Constraint:** none of these methods may use `instanceof`, `getClass()`
comparisons, casts to a subtype, or a `switch` on type. All behavior must come
through polymorphic dispatch.

### R3 - Demonstration (`main`)

- Build a library with **at least 6 items** covering **all three** types.
- Call `printCatalog()`, print `totalEstimatedMinutes()`, print `longest()`, and
  print the result of `byCategory("Podcast")`.

### R4 - Open-Closed proof

- Add a **fourth** media type (your choice, e.g. `AudioBook` or `Article`) in a
  **separate commit** whose message explicitly states that you did **not** modify
  `Library` or the existing subclasses. This is the graded evidence that your
  design is open-closed.

### R5 - Tests (recommended, not mandatory but rewarded)

- At least three unit tests (JUnit, `pytest`, or plain assertions) verifying
  `estimatedMinutes()` for each type and that `longest()` picks the right item.

---

## 4. Non-functional requirements

- **Language:** Java is recommended (matches the course examples), but Python or
  C# are accepted if you keep the polymorphic design intact.
- **Style:** meaningful names, no dead code, consistent formatting.
- **No God methods:** the reporting logic must not "know" about concrete types.
- **Encapsulation:** fields private/protected with accessors as needed.

---

## 5. Expected deliverable

A **public GitHub repository** containing:

```
media-library/
├── src/                     # source code
│   ├── MediaItem.java
│   ├── Book.java
│   ├── Movie.java
│   ├── Podcast.java
│   ├── Library.java
│   └── Main.java
├── test/                    # optional tests
├── README.md                # see required content below
└── .gitignore
```

### Required `README.md` content

1. **How to compile and run** (exact commands).
2. **Sample output** of your `main` (paste it).
3. A **short reflection (150-250 words)** answering:
   - *Where exactly does dynamic dispatch happen in your code?* (point to the
     line/method)
   - *Which reference is the declared (parent) type and what is the actual type
     at runtime?*
   - *How did requirement R4 demonstrate the Open-Closed Principle?*
   - *One place you could have used `instanceof` but used polymorphism instead.*

---

## 6. How to submit (via GitHub, NOT Moodle)

> Do **not** upload a `.zip` to Moodle. This activity is submitted and reviewed
> on GitHub.

1. **Create a repository** named `oop-week07-media-library` (public).
2. Initialize and make your **first commit** with the base hierarchy:
   ```bash
   git init
   git add .
   git commit -m "feat: base MediaItem hierarchy with polymorphic catalog"
   ```
3. Implement the requirements in **small, meaningful commits**, for example:
   ```bash
   git commit -m "feat: add Book, Movie, Podcast with overridden estimatedMinutes"
   git commit -m "feat: polymorphic Library report routine (no instanceof)"
   git commit -m "feat: add fourth media type without modifying Library (OCP proof)"
   git commit -m "docs: add README with run instructions and reflection"
   ```
4. **Push** to GitHub:
   ```bash
   git branch -M main
   git remote add origin https://github.com/<your-username>/oop-week07-media-library.git
   git push -u origin main
   ```
5. **Submit the link.** Paste your repository URL where the instructor indicates
   (course GitHub Classroom link or the designated channel). Make sure the repo
   is **public** or the instructor is added as a collaborator.

> **Academic integrity.** The work must be yours. You may discuss ideas, but
> copied repositories are easy to detect via commit history. Your **commit
> history itself is part of the evaluation** — incremental, meaningful commits
> score better than a single "final" dump.

---

## 7. Assessment criteria / rubric (100 points)

| # | Criterion | Excellent (full) | Acceptable (~60%) | Insufficient (0) | Pts |
|---|-----------|------------------|-------------------|------------------|-----|
| 1 | **Correct overriding** | All subclasses override with `@Override`; signatures & contracts correct; one uses `super`. | Overrides work but `@Override` missing or `super` not demonstrated. | Methods not actually overriding (overload/hide) or broken. | 20 |
| 2 | **Polymorphic dispatch** | Calls go through the `MediaItem` supertype; behavior clearly selected at runtime. | Mostly polymorphic with minor direct-type coupling. | Relies on concrete types to choose behavior. | 20 |
| 3 | **Polymorphic routine (no type-switch)** | Report routine has zero `instanceof`/cast/`switch`-on-type; handles all types. | One small type check slipped in. | Logic driven by type checks. | 20 |
| 4 | **Open-Closed proof (R4)** | Fourth type added in its own commit with no edits to `Library`/existing subclasses. | Added but required minor edits elsewhere. | Not attempted, or required rewriting the routine. | 15 |
| 5 | **README + reflection** | Run instructions, sample output, and a precise, correct reflection. | Present but shallow or partly incorrect. | Missing or wrong. | 10 |
| 6 | **Code quality & encapsulation** | Clean names, encapsulated fields, no dead code. | Minor style issues. | Poor structure/naming. | 10 |
| 7 | **Git hygiene** | Meaningful, incremental commit history. | Few large commits. | Single dump / no history. | 5 |
| 8 | **Tests (bonus)** | 3+ meaningful tests passing. | 1-2 tests. | None. | +5 (bonus) |

**Passing threshold for full formative credit:** 70/100.

---

## 8. Hints and common pitfalls

- **Pitfall:** overloading instead of overriding. If you change the parameter
  list, you created a *new* method — dispatch will not pick it. `@Override`
  catches this; use it everywhere.
- **Pitfall:** a `static` "helper" that switches on `category()` strings — that
  is the `instanceof` chain in disguise. Push the behavior *into* the subclass.
- **Pitfall:** downcasting inside the report routine to reach a subclass-only
  field. If you need that field for the report, expose it through a polymorphic
  method on `MediaItem` instead.
- **Tip:** start from the Session 2 `Shape` renderer (§5) and the payment
  processor (§6) — this activity is the same shape with a new domain.
- **Tip:** verify OCP by literally checking `git diff` when you add the fourth
  type: only *new* files should appear.

---

## 9. Reference solution skeleton (start here)

```java
import java.util.*;

abstract class MediaItem {
    protected final String title;
    protected final String creator;

    protected MediaItem(String title, String creator) {
        this.title = title;
        this.creator = creator;
    }

    public abstract int estimatedMinutes();
    public abstract String category();

    public String catalogEntry() {
        return String.format("[%-8s] %-25s by %-15s ~%d min",
                             category(), title, creator, estimatedMinutes());
    }
}

// TODO: Book (pages * 1.5), Movie (runtimeMinutes), Podcast (episodes * avg)
// TODO: Library with printCatalog(), totalEstimatedMinutes(), longest(), byCategory()
// TODO: Main with >= 6 items across all types
// TODO: fourth type in its own commit (OCP proof)
```

Good luck — and remember: if you find yourself writing `instanceof`, stop and ask
*"which object should own this decision?"*
