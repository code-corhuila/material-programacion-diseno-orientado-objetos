# Week 15 - Optional Activity: "Harden the Repository" Challenge

> **Course:** Object-Oriented Programming and Design (2026-B)
> **Unit 3 - Practical application of OOP in Java** - Week 15, Corte 3
> **RAA:** `90_82759`
> **Type:** Optional, individual (pairs allowed). **Submission: via GitHub - NOT Moodle.**

This optional activity gives you extra practice integrating **exceptions, collections, and file persistence** with clean OOP design, and rewards the maintainability habits assessed in the project defense. It is designed to be finishable in one focused sitting (2-4 hours) and to sharpen exactly the skills the partial exam checks.

---

## 1. Problem statement

Build a small, robust **Task Manager** command-line application that persists tasks to a human-readable file and survives realistic failure conditions. The emphasis is not on features but on **correct integration and maintainable design**: a clean layered structure, a coherent exception strategy, deliberate collection choices, and safe file handling.

A "task" has: an `id` (unique), a `title`, a `priority` (`LOW`, `MEDIUM`, `HIGH`), and a `done` flag.

The app must let a user (via a simple console menu):
1. Add a task.
2. List tasks sorted by priority (HIGH first), then by title.
3. Mark a task done by id.
4. Delete a task by id.
5. Save to and load from a file, automatically loading on start and saving on exit.

---

## 2. Requirements

### Functional
- **F1.** Tasks persist between runs in a human-readable file (CSV or JSON of your choice) under `data/`.
- **F2.** Loading a **missing** file starts with an empty task list (no crash).
- **F3.** Loading a **corrupt/malformed** file fails with a clear domain message, not a raw stack trace to the user.
- **F4.** Adding a task with a duplicate id is rejected with a domain exception.
- **F5.** Listing uses the required sort order (priority desc, then title asc).

### Technical / design
- **T1.** Layered structure: `model` (Task, Priority), `persistence` (`TaskRepository` interface + one file implementation), `service` (use cases), `ui` (console).
- **T2.** File I/O appears **only** in the persistence layer, inside `try`-with-resources.
- **T3.** Use **at least two** collection types with generics, and justify each in the README.
- **T4.** Define **at least one custom exception** (e.g., `RepositoryException`, `DuplicateTaskException`) and use **cause chaining** when translating I/O errors.
- **T5.** `equals`/`hashCode` implemented consistently for `Task` (by id).
- **T6.** No empty `catch` blocks, no raw types, no dead/commented-out code.
- **T7.** Deliberately apply and name **at least one SOLID principle** (document where in the README).

### Stretch goals (optional, for extra credit)
- **S1.** Add a second `TaskRepository` implementation (e.g., a JSON one) selectable at startup, demonstrating the Open/Closed principle in action.
- **S2.** Add a `Comparator`-based flexible sort chosen from the menu.
- **S3.** Add a minimal unit test for the sort logic and for the duplicate-id rejection.

---

## 3. Expected deliverable

A **public GitHub repository** containing:

```
task-manager/
├── src/                     all source, organized by package/layer
│   ├── model/
│   ├── persistence/
│   ├── service/
│   └── ui/
├── data/
│   └── tasks.sample.csv      sample data the app can load
├── README.md                see required contents below
└── (optional) test/          if you attempt S3
```

**Repository README.md must include:**
- What the app does and how to build and run it in **one documented command**.
- A short **design note**: your layer diagram (ASCII is fine), the collection choices and *why*, where exception translation happens, and the SOLID principle you applied and *where*.
- A "known limitations / what I would improve next" section (this mirrors the project improvement plan).

---

## 4. How to submit (via GitHub - NOT Moodle)

> This activity is **not** submitted through Moodle. Submit by making your work available on GitHub and sharing the link with the instructor as directed in class/course channel.

1. **Create** a new public repository named `oop-week15-task-manager` (or similar) on your GitHub account.
2. **Structure** your commit history meaningfully - small, descriptive commits are part of the maintainability signal (e.g., `feat: add TaskRepository interface`, `fix: handle missing file on load`). Avoid a single giant "final" commit.
3. **Ensure** the repo runs from a clean clone: no IDE files, no build artifacts (add a `.gitignore`), sample data included.
4. **Write** the README described in Section 3.
5. **Tag** a release or note the final commit hash you consider your submission.
6. **Share** the repository URL through the instructor's designated channel (course roster/GitHub Classroom link/email as announced). Do **not** upload a zip to Moodle for this activity.

> Integrity note: the repository must be your own work. If you pair, list both authors in the README and both must be able to defend any part.

---

## 5. Assessment criteria / rubric (100 pts)

| Criterion | Weight | Excellent | Good | Developing | Insufficient |
|-----------|:-----:|-----------|------|------------|--------------|
| **Integration** (runs clean, reads/writes, handles missing & corrupt files) | 30 | All F1-F3 met; one-command run | Minor setup needed | Runs only locally / partial persistence | Does not run |
| **OOP design & layering** (T1, T2, T7) | 25 | Clean layers; I/O isolated; SOLID applied & named | Minor leaks | Weak separation | No structure |
| **Exceptions & collections** (T3, T4) | 20 | Custom exception + chaining; deliberate, justified collections | Present, minor gaps | Raw types / swallowed errors | Absent |
| **Code quality** (T5, T6, naming, cohesion) | 15 | Clean, no smells | A few smells | Several smells | Hard to read |
| **README & git hygiene** (design note, run instr., commit history) | 10 | Thorough note; meaningful history | Adequate | Sparse | Missing |
| **Stretch (extra credit)** | +10 | Any of S1-S3 done well | - | - | - |

**Passing target:** 60/100. **Strong submission:** 80+, with a design note that could stand in for a defense.

### Self-check before you push
- [ ] Fresh `git clone` builds and runs in one command.
- [ ] Missing file -> empty list; corrupt file -> clear domain message (both tested).
- [ ] Duplicate id rejected with a custom exception.
- [ ] List is sorted priority-desc then title-asc.
- [ ] Two+ collections with generics, justified in README.
- [ ] Exception translation with cause chaining present; no empty catches.
- [ ] `.gitignore` excludes IDE/build files; no dead code committed.
- [ ] README design note names one SOLID principle and where it lives.

---

*This optional work is the fastest route to a confident project defense: it is the incremental project in miniature. Return to the [week guide](../README.md).*
