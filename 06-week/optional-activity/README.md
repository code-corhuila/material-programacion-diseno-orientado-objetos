# Week 06 · Optional Activity — Modeling a hierarchy with inheritance and `super()`

> **Course:** Object-Oriented Programming and Design · **Term:** 2026-B
> **Unit 2:** Design principles and modularity · **Topic:** Inheritance and `super()`
> **Assessment period:** Corte 2 · **RAA:** `90_82759`
> **Type:** Optional (bonus credit) · **Submission channel:** **GitHub** (NOT Moodle)

---

## 1. Purpose

This optional activity lets you practice, end to end, the two skills of the week: **modeling an "is-a"
hierarchy with single inheritance** and **wiring constructors with `super(...)`** so behavior is reused
instead of duplicated. It also asks you to reflect on the *limits* of inheritance — the same theme you
discuss in the forum.

Completing it well earns **bonus credit toward Corte 2** under the rubric in §7.

---

## 2. Problem statement

You are building the domain model for a small **library management system**. The library lends
different kinds of **items**, and every item shares common data (a title and a catalog id) and a common
behavior (producing a one-line catalog label). Specific item types add their own data and specialize
the label.

Model the following "is-a" family using **single inheritance**:

```
                 LibraryItem            (id, title)  — the base class
                /     |      \
           Book    Magazine   DVD
```

- A **Book** *is a* `LibraryItem` that also has an `author` and a number of `pages`.
- A **Magazine** *is a* `LibraryItem` that also has an `issueNumber` and a `month`.
- A **DVD** *is a* `LibraryItem` that also has a `director` and a `durationMinutes`.

Then create **one deeper level** to demonstrate a multi-step `super(...)` chain:

- A **Textbook** *is a* `Book` (a specialized book) that also has an `edition` and a `subject`.

```
        LibraryItem
             ▲
           Book
             ▲
         Textbook       ← three-level chain: Textbook → Book → LibraryItem
```

---

## 3. Requirements

Your solution **must**:

1. **Base class `LibraryItem`**
   - `protected` fields `String id;` and `String title;`.
   - A constructor `LibraryItem(String id, String title)` that initializes both.
   - A method `String label()` returning `"[" + id + "] " + title`.

2. **Single inheritance with `extends`**
   - `Book`, `Magazine`, and `DVD` each `extends LibraryItem`.
   - `Textbook extends Book`.
   - No field declared in a parent may be **redeclared** in a child.

3. **Constructor chaining with `super(...)`**
   - Every subclass constructor must call `super(...)` as its **first statement**.
   - The `Textbook` constructor must chain through `Book` (which itself chains through `LibraryItem`),
     demonstrating a **three-level** `super(...)` chain.

4. **Specialization without duplication**
   - Each subclass overrides `label()` and must call `super.label()` to reuse the parent's text, then
     append its own detail. **Do not** re-type the parent's formatting logic anywhere.
   - Example expected labels:
     - Book → `[B-01] Clean Code — by Robert C. Martin, 464 p.`
     - Textbook → `[T-09] Calculus — by James Stewart, 1368 p. — 8th ed., subject: Mathematics`
     - Magazine → `[M-14] Nature — issue 42 (March)`
     - DVD → `[D-07] Interstellar — dir. Christopher Nolan, 169 min`

5. **A runnable demo (`Library` class with `main`)**
   - Create at least one instance of **each** of the five classes.
   - Store them in a `LibraryItem[]` (or `List<LibraryItem>`), loop once, and print `label()` for each,
     showing that a single base-typed collection holds the whole family.

6. **Zero duplicated logic**
   - No method body may be copy-pasted between classes. The base formatting appears **once**, in
     `LibraryItem.label()`, and is reused via `super.label()` everywhere else.

**Constraints:** Plain Java (JDK 17+), no external libraries. Standard naming conventions
(`PascalCase` classes, `camelCase` members). Code must compile with `javac` and run with `java`.

---

## 4. Expected deliverable

A **public GitHub repository** named `oop-week06-inheritance-<yoursurname>` containing:

```
oop-week06-inheritance-<surname>/
├── src/
│   ├── LibraryItem.java
│   ├── Book.java
│   ├── Magazine.java
│   ├── DVD.java
│   ├── Textbook.java
│   └── Library.java        // contains main()
├── README.md               // see §5
└── .gitignore              // ignore /out, *.class, IDE files
```

- The program must **compile and run**. Include the exact commands in your README.
- The repository README must show a **short "is-a" analysis** (one sentence per subclass) and a
  **paste of the actual program output**.

---

## 5. Repository README must include

1. **Title and author** (your full name and student id).
2. **How to compile and run**, e.g.:
   ```bash
   javac -d out src/*.java
   java -cp out Library
   ```
3. **The "is-a" analysis** — one justified sentence per subclass (e.g., "A `Textbook` *is a* `Book`
   because…").
4. **Actual program output** pasted in a code block.
5. **Reflection (4–6 sentences):** name one problem inheritance solved in this design and one situation
   where composition would have been the better choice. Connect this to the week's forum discussion.

---

## 6. Submission instructions (GitHub — NOT Moodle)

1. Create a **new public repository** on GitHub named `oop-week06-inheritance-<yoursurname>`.
2. Initialize, commit, and push your work. Suggested commands:
   ```bash
   git init
   git add .
   git commit -m "Week 06: library inheritance hierarchy with super() chaining"
   git branch -M main
   git remote add origin https://github.com/<your-username>/oop-week06-inheritance-<surname>.git
   git push -u origin main
   ```
3. Make **at least two meaningful commits** (e.g., one for the base + subclasses, one for the demo and
   README) so your progress is visible in the history.
4. **Submit the repository URL** through the channel the instructor announced for GitHub links (course
   GitHub Classroom link or the designated submission form). **Do not upload a ZIP to Moodle** — this
   activity is tracked on GitHub only.
5. Ensure the repository is **public** (or that the instructor's GitHub account has access) before the
   deadline, so it can be cloned and graded.

> **Deadline:** end of Week 06 (Corte 2). Late pushes are visible in the commit timestamps.

---

## 7. Assessment criteria / rubric (100 points)

| Criterion | Excellent (full) | Acceptable (partial) | Insufficient (0) | Pts |
|---|---|---|---|:--:|
| **Correct "is-a" modeling** | All five classes model genuine is-a relationships with `extends`; hierarchy matches the spec. | Minor modeling slip (e.g., one questionable relationship) but compiles. | Uses composition where inheritance was required, or hierarchy wrong. | 20 |
| **`super(...)` constructor chaining** | Every subclass calls `super(...)` first; the `Textbook→Book→LibraryItem` three-level chain works. | `super(...)` used but chain incomplete or one constructor sets fields redundantly. | Missing `super(...)`, or code does not compile due to constructor errors. | 20 |
| **Reuse via `super.label()` (no duplication)** | Base formatting written once; every override reuses it via `super.label()`. | Reuse mostly correct but one method duplicates parent text. | Parent logic copy-pasted across classes. | 20 |
| **Working demo & polymorphic collection** | Compiles, runs, iterates a `LibraryItem[]`/`List` of all five, prints correct labels. | Runs but omits the base-typed collection or one item type. | Does not compile or run. | 15 |
| **Code quality & conventions** | Clean naming, correct access modifiers (`protected`/`private`), readable structure, `.gitignore` present. | Minor style issues. | Poor naming, wrong modifiers, no structure. | 10 |
| **README: is-a analysis & output** | Clear per-subclass is-a justification + pasted real output + compile/run commands. | Partially complete README. | Missing or trivial README. | 10 |
| **Reflection on inheritance limits** | Thoughtful 4–6 sentence reflection naming a real benefit and a real limit/composition case. | Present but shallow. | Missing. | 5 |

**Total: 100.** Bonus credit toward Corte 2 is awarded proportionally to the score obtained.

---

## 8. Self-check before you submit

- [ ] All five classes compile with `javac -d out src/*.java`.
- [ ] `java -cp out Library` prints the expected labels for every item type.
- [ ] Every subclass constructor's **first statement** is `super(...)`.
- [ ] `Textbook` reaches `LibraryItem` through a **three-level** `super(...)` chain.
- [ ] No parent field is redeclared and no parent method body is copy-pasted.
- [ ] README contains commands, is-a analysis, real output, and the reflection.
- [ ] Repository is **public**, has ≥2 commits, and the URL is submitted **via GitHub**, not Moodle.

---

## 9. Navigation

- Week guide: [`../README.md`](../README.md)
- Session 01 notes: [`../01-session/README.md`](../01-session/README.md)
- Session 02 notes: [`../02-session/README.md`](../02-session/README.md)
- Reading & resources (PDF download): [`../material/README.md`](../material/README.md)
