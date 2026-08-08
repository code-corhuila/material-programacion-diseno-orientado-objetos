# Week 13 · Optional Activity — "PocketLibrary": a CSV-backed book catalog

**Course:** Object-Oriented Programming and Design · **Term:** 2026-B · **Corte 3**
**Unit 3:** Practical application of OOP in Java · **RAA:** 90_82759
**Submission channel:** ⭐ **GitHub** (a public repository link) — **NOT Moodle.**

---

## 1. Purpose

Consolidate this week's learning outcome by building, end to end, a small
object-oriented application that **persists its objects to a `.csv` file** and
**loads them back on the next run**, with clean exception handling, safe resource
management, and a proper persistence layer. This mirrors the Session 2 workshop but
with a different domain so you demonstrate the skill on your own.

This activity is **optional** but strongly recommended: it is the most direct
rehearsal for the Corte 3 assessment and produces a portfolio-worthy GitHub repo.

---

## 2. Problem statement

Build **PocketLibrary**, a console application that manages a personal book catalog.
The catalog must **survive between runs**: when the program starts, it loads all
previously saved books from `books.csv`; when the user adds, edits, or removes a
book, the change is persisted back to the same CSV file.

A `Book` has at least the following fields:

| Field | Type | Notes |
|-------|------|-------|
| `id` | `int` | Unique identifier |
| `title` | `String` | Book title |
| `author` | `String` | Author name |
| `year` | `int` | Publication year |
| `available` | `boolean` | `true` if the book is on the shelf, `false` if lent out |

---

## 3. Functional requirements

Your program must support, through a simple text menu (`Scanner`):

1. **List** all books (loaded from `books.csv`).
2. **Add** a new book; the new book is persisted immediately.
3. **Search** books by title *or* by author (case-insensitive, partial match allowed).
4. **Toggle availability** of a book by `id` (lend / return) and persist the change.
5. **Delete** a book by `id` and persist the change.
6. **Exit** cleanly.

**Persistence rules:**
- On startup, load the catalog from `books.csv`. If the file does not exist, start
  with an empty catalog (no crash) and create the file on first save.
- The CSV must include a **header row**: `id,title,author,year,available`.
- After any mutation (add/toggle/delete), the file must reflect the new state.

---

## 4. Technical / design requirements (these are graded)

- **OOP separation.** At minimum three classes:
  - `Book` — a clean domain model (POJO); **no file logic inside it**.
  - `BookRepository` — **all** CSV read/write logic lives here (the Repository/DAO).
  - `PocketLibraryApp` (with `main`) — the menu/UI, which only *calls* the repository.
- **Object ↔ CSV mapping.** Provide symmetric conversion (e.g. `toCsv(Book)` /
  `fromCsv(String)`), correctly handling the header and blank/malformed lines.
- **Resource safety.** Every file open must use **try-with-resources**. No manual
  `close()` in a `finally`.
- **Exception handling.** Catch `IOException`; report a useful message; a single
  malformed row must be **skipped and reported**, not fatal.
- **Encoding.** Read and write with `StandardCharsets.UTF_8` explicitly.
- **Robustness.** The program must not crash on: missing file, empty file,
  header-only file, or a malformed data row.

**Optional bonus (up to +1.0):** make your CSV mapping quoting-aware (RFC 4180) so a
title containing a comma (e.g. `"Java, A Beginner's Guide"`) round-trips correctly,
**or** integrate OpenCSV / Apache Commons CSV and document why in your README.

---

## 5. Expected deliverable

A **public GitHub repository** containing:

```
pocketlibrary/
├── src/
│   ├── Book.java
│   ├── BookRepository.java
│   └── PocketLibraryApp.java
├── books.csv            (a sample with at least 5 books, including the header)
├── README.md            (see required contents below)
└── .gitignore           (optional; e.g. ignore /out, /target, *.class)
```

Your repository **`README.md`** must include:
- A one-paragraph description of the app.
- **How to compile and run** it (exact commands), e.g.:
  ```
  javac -d out src/*.java
  java -cp out PocketLibraryApp
  ```
- A short section **"How persistence works"** explaining your object↔CSV mapping and
  where the file logic lives (the repository).
- A sample of the `books.csv` format.
- (If you did the bonus) a note on how you handle commas inside fields.

---

## 6. Submission instructions (GitHub — not Moodle)

1. Create a **new public repository** named `pocketlibrary-oop-2026b` (or similar).
2. Commit your source, the sample `books.csv`, and the `README.md`.
   - Use meaningful commit messages (e.g. `feat: add BookRepository CSV load/save`).
   - At least **3 commits** that show incremental progress (not a single dump).
3. Ensure the project **compiles and runs** from a clean clone using the commands in
   your README.
4. **Submit the repository URL** through the channel the instructor designated for
   GitHub links (course GitHub Classroom assignment or the shared submission form).
   **Do not upload a ZIP to Moodle.**

> ⚠️ Verify your repo is **public** (or that the instructor/org has access). A link
> that cannot be opened cannot be graded.

**Suggested deadline:** before the start of Week 14's first session. (Confirm the
exact date with your instructor.)

---

## 7. Assessment criteria / rubric (100 pts)

| Criterion | Excellent (full) | Acceptable (partial) | Missing (0) | Weight |
|-----------|------------------|----------------------|-------------|:------:|
| **Correct persistence** — saves and reloads books across runs; header handled | Loads and saves reliably; state survives restart; header written & skipped | Works but with minor bugs (e.g. header parsed as data occasionally) | Does not persist / cannot reload | **25** |
| **OOP design** — `Book` / `BookRepository` / App separation; no I/O in the model | Clean 3-class separation; repository isolates all I/O | Some mixing of concerns but mostly separated | Everything in one class / no repository | **20** |
| **Object ↔ CSV mapping** — symmetric, correct parsing of all fields incl. boolean/int | Robust `toCsv`/`fromCsv`; all fields round-trip correctly | Minor parsing issues on some fields | Mapping absent or broken | **15** |
| **Exception & resource handling** — try-with-resources, IOException caught, bad rows skipped | All resources auto-closed; useful messages; malformed rows skipped | Handles the happy path; some gaps on errors | No handling; crashes on errors | **15** |
| **Functionality** — list/add/search/toggle/delete all work via the menu | All six menu features work correctly | Most features work | Few/none work | **10** |
| **Robustness** — no crash on missing/empty/header-only/malformed file | Survives all edge cases gracefully | Survives some edge cases | Crashes on common cases | **10** |
| **Repository quality** — README with run instructions, meaningful commits, sample CSV | Clear README, ≥3 meaningful commits, sample data | README/commits present but thin | No README / single commit | **5** |
| **Bonus (optional)** — RFC 4180 quoting or a CSV library, documented | +1.0 point (added to final, capped at 100) | — | — | +1.0 |

**Grading scale:** 90–100 = A · 80–89 = B · 70–79 = C · 60–69 = D · <60 = must revise.

---

## 8. Tips for success

- Start from the Session 2 `StudentRepository` pattern and adapt it to `Book`.
- Test the **empty/missing file** case *first* — it is the most common oversight.
- Remember the `boolean` field: parse with `Boolean.parseBoolean(...)`.
- Keep titles/authors comma-free unless you attempt the bonus.
- Run your program, close it, run it again — if your books are still there, you have
  achieved the learning outcome. 🎉

---

## 9. Related resources

- Week overview & glossary: [`../README.md`](../README.md)
- Session 1 (foundations + `.txt`): [`../01-session/README.md`](../01-session/README.md)
- Session 2 (CSV + Repository + workshop): [`../02-session/README.md`](../02-session/README.md)
- Curated readings & PDF: [`../material/README.md`](../material/README.md)
