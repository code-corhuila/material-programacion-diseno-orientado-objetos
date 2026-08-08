# Week 04 — Optional Activity: "Design a Well-Constructed Class"

> Object-Oriented Programming and Design · 2026-B · Unit 1 · Corte 1
> Topic: Constructors, constructor overloading, and `toString()`
> **Status: OPTIONAL / non-graded practice** (reinforcement — strongly recommended).
> **Submission channel: GitHub.** Do **not** submit this activity through Moodle.

---

## 1. Problem statement

You will design and implement a small, self-contained Java class that demonstrates **every** concept
of the week: a default constructor, one or more parameterized constructors, constructor **overloading**
with **`this(...)` chaining**, constructor-level **validation**, and an overridden **`toString()`**.

Choose **one** domain (or propose your own of similar scope):

- **`Student`** — fields: `id` (String), `fullName` (String), `gpa` (double, 0.0–5.0), `credits` (int ≥ 0).
- **`Movie`** — fields: `title` (String), `director` (String), `year` (int, 1888–2026), `minutes` (int > 0).
- **`Temperature`** — field: `celsius` (double); add a constructor that accepts a Fahrenheit value and
  converts it, plus a `toString()` that shows both scales.

The class must model a realistic entity whose objects are **always created in a valid state** and are
**easy to read** when printed.

---

## 2. Requirements

Your chosen class **must** include:

1. **Private fields** with appropriate types (encapsulation).
2. **A no-argument constructor** that supplies sensible defaults **via `this(...)` chaining** to the
   primary constructor (no duplicated logic).
3. **At least two additional constructors** with **distinct signatures** (valid overloads), each
   ultimately delegating to a single **primary constructor**.
4. **Validation inside the primary constructor** that throws `IllegalArgumentException` with a clear
   message for every invalid field (fail-fast). No setter may bypass these rules.
5. **Getters** for all fields (setters optional; if present, they must re-validate).
6. **An overridden `toString()`** marked with `@Override`, returning a readable
   `ClassName{...}`-style string.
7. **A `Main` class** with a `main` method that:
   - creates at least **three** objects using **different** constructors,
   - prints each with `System.out.println(...)` (relying on `toString()`),
   - demonstrates a rejected invalid object inside a `try/catch` and prints the caught message.
8. **A short `README.md`** in your repository explaining how to compile and run, and one paragraph on
   *which invariant* your constructors protect and *why*.

Constraints: standard JDK only (no external libraries); code must **compile and run** with
`javac` / `java` (JDK 17+).

---

## 3. Expected deliverable

A public **GitHub repository** containing at minimum:

```
poo-week04-<yourname>/
├── src/
│   ├── <YourClass>.java     # e.g. Student.java
│   └── Main.java
└── README.md                # how to compile/run + the invariant paragraph
```

Include the actual **console output** of your `Main` (paste it into the README or add a
`sample-output.txt`) so the reader can verify behavior without running it.

---

## 4. How to submit (GitHub, not Moodle)

1. Create a **new public repository** named `poo-week04-<yourname>` (e.g. `poo-week04-lvargas`).
2. Initialize it and add your files:
   ```bash
   git init
   git add .
   git commit -m "Week 04: constructors, overloading, and toString()"
   git branch -M main
   git remote add origin https://github.com/<your-user>/poo-week04-<yourname>.git
   git push -u origin main
   ```
3. Verify on github.com that `src/` and `README.md` are visible and that the repo is **public**.
4. **Share the repository URL** with the instructor through the channel announced in class
   (e.g. the course forum or the shared GitHub Classroom link). **Do not upload a ZIP to Moodle** —
   this activity lives entirely on GitHub.

> Reminder: never commit passwords, tokens, or personal data. A public repo is world-readable.

---

## 5. Assessment criteria / rubric

Although the activity is **not graded for a mark**, use this rubric for self-assessment (and the
instructor will give qualitative feedback against it). Total reference weight: **100 points.**

| Criterion | Excellent (full) | Acceptable (partial) | Missing (0) | Weight |
|-----------|------------------|----------------------|-------------|:------:|
| **Constructors & defaults** | No-arg + parameterized constructors present; sensible defaults | Constructors present but defaults weak/absent | No usable constructor | **20** |
| **Overloading & `this(...)` chaining** | ≥3 distinct signatures, all chaining to one primary constructor | Overloads present but logic duplicated (no chaining) | No overloading | **20** |
| **Validation / invariants** | Every invalid field rejected with a clear exception message | Some validation, gaps remain | No validation | **20** |
| **`toString()` override** | `@Override`, readable, includes identifying fields, side-effect free | Overridden but unclear or incomplete | Not overridden | **15** |
| **Demonstration in `Main`** | 3+ objects via different constructors + caught invalid case shown | Runs but incomplete demo | Does not compile/run | **15** |
| **Repository quality (README, clarity, naming)** | Clear README with run steps + invariant paragraph; clean code | README thin or messy code | No README | **10** |

**Suggested grade bands (self-check):** 90–100 outstanding · 75–89 solid · 60–74 needs work ·
< 60 revisit the session guides.

---

## 6. Stretch goals (extra practice, no extra weight)

- Add a **static factory method** (e.g. `Student.of(...)`) and note in your README how it differs
  from a constructor (ties to *Effective Java* Item 1).
- Add a copy-style constructor `new YourClass(existing)` that builds a new object from another.
- Write a tiny manual test method that asserts an invalid input throws, and print `"OK"` when all
  assertions pass.

---

*Need help?* Revisit [`../01-session/README.md`](../01-session/README.md) (constructors) and
[`../02-session/README.md`](../02-session/README.md) (overloading & `toString()`), or the readings in
[`../material/README.md`](../material/README.md).
