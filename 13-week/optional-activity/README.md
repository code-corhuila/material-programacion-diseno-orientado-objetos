# Week 13 — Optional Activity: A File-Backed Contact Manager

**Object-Oriented Programming and Design** · CORHUILA · Mechatronics Engineering
**Unit 3 · Corte 3 · Week 13 — Reading and writing files in Java (`.txt` and `.csv`)**

> **Optional and formative.** This activity is **not** graded in the gradebook and is **not** submitted through Moodle. It is deliberate extra practice to consolidate the week's skills. You submit it via **GitHub** (see §5) so you also practice version-control discipline — a Corte 3 good-practice objective. The rubric in §6 is for **self- and peer-assessment**.

---

## 1. Context and goal

You have learned to read and write `.txt` and `.csv` files, to handle I/O exceptions, to close resources with `try-with-resources`, and to isolate persistence in a repository. This activity asks you to combine all of it into one small, complete, **object-oriented application that remembers its data between runs**.

You will build a **command-line Contact Manager**: it loads contacts from a CSV file at startup, lets the user add and list contacts, and saves them back so the next run remembers everything. The point is not the menu — it is a **correct, robust persistence layer** wrapped around clean domain objects.

---

## 2. Problem statement

Build a Java console application named **`ContactManager`** that persists a list of contacts to a CSV file (`contacts.csv`) and reloads them on the next launch.

A **contact** has:

| Field | Type | Rules |
|---|---|---|
| `id` | `int` | Unique, positive; auto-assigned as max existing id + 1. |
| `name` | `String` | Non-blank; must not contain the CSV delimiter. |
| `email` | `String` | Non-blank; must contain `@`. |
| `phone` | `String` | Digits only, 7–15 characters. |

The program starts by **loading** existing contacts from `contacts.csv` (or starting empty if the file does not exist), presents a menu, and **saves** on exit.

```
Contact Manager
  1) List contacts
  2) Add contact
  3) Search by name
  4) Save and exit
Choose an option:
```

---

## 3. Requirements

**Functional**

1. **Load on start.** Read `contacts.csv` into a `List<Contact>`. A missing file is normal on the first run — start with an empty list, do not crash.
2. **Add.** Validate every field per §2; reject invalid input with a clear message and re-prompt (do not store bad data).
3. **List.** Print all contacts in a readable, aligned format; show a friendly message when empty.
4. **Search.** Find contacts whose name contains a keyword (case-insensitive).
5. **Save on exit.** Write the whole list back to `contacts.csv` with a header row, overwriting the old file.
6. **Round-trip integrity.** After save→exit→relaunch, every previously added contact must reappear unchanged.

**Technical (these are what the rubric checks)**

7. **Separation of concerns.** A `Contact` domain class (with `toCsv()` and `static fromCsv(String)`) and a separate `ContactRepository` (a DAO) that owns **all** file access. No file code in `Contact`; no business logic in the repository.
8. **Encoding.** Every read and write uses `StandardCharsets.UTF_8` explicitly.
9. **Resource management.** Every file resource is released via `try-with-resources` or a one-shot `Files` helper.
10. **Exception handling.** Catch `IOException`; on read, skip and **report** malformed lines instead of crashing; validate parsed numbers.
11. **No external CSV library** — implement the parsing yourself (this is the learning objective). You may, as a stretch, add a second branch using a library and compare.

**Constraints**

- Java 17 or newer; standard library only for the required part.
- The app must compile and run from the command line (`javac` / `java`) or from any IDE without modification.
- The data file path is relative (`contacts.csv`) so the project is portable.

---

## 4. Expected deliverable

A GitHub repository containing:

```
contact-manager/
├── README.md                 # how to compile & run; a screenshot or sample session
├── src/
│   ├── Contact.java          # domain object + toCsv()/fromCsv()
│   ├── ContactRepository.java# all file access (load/save/append)
│   └── ContactManager.java   # menu / application entry point (main)
├── sample-data/
│   └── contacts.sample.csv   # a few example records to demo loading
└── .gitignore                # ignores compiled *.class and the live contacts.csv
```

Your `README.md` must include: a one-paragraph description, exact **compile and run** commands, and a short **sample session** (paste of the console interaction) that demonstrates a successful **round-trip** (add contacts, exit, relaunch, list shows them). Optionally include the stretch goals you attempted.

---

## 5. How to submit — via GitHub (not Moodle)

1. **Create a public repository** named `oop-week13-contact-manager` on your own GitHub account.
2. Structure it as in §4. Commit in **small, meaningful steps** with clear messages — e.g., `feat: add Contact domain class with CSV mapping`, `feat: add repository load/save`, `fix: skip malformed lines on load`. History quality is part of the good-practice objective.
3. Ensure a `.gitignore` excludes `*.class` and the runtime `contacts.csv` (commit only `sample-data/contacts.sample.csv`).
4. Confirm the repo builds from a **fresh clone** (test in an empty folder) — a reviewer must reproduce your result.
5. **Share the repository URL** through the channel your instructor indicates for optional practice (e.g., the course forum or peer-review thread). **Do not upload to Moodle** — this activity lives on GitHub.
6. For **peer review (co-evaluation)**, clone a classmate's repo, run it, and leave feedback as a GitHub **Issue** using the rubric criteria in §6.

> This is an optional, formative activity. If you prefer not to publish publicly, a private repo with the instructor and one peer added as collaborators is acceptable.

---

## 6. Assessment criteria / rubric (self- and peer-assessment)

Score each criterion 0–5; the reference weighting mirrors the Corte 3 practical rubric in the [course overview](../../00-course/README.md).

| # | Criterion | Weight | Excellent (5–4.5) | Satisfactory (4.4–3.5) | Minimal (3.4–3.0) | Insufficient (<3.0) |
|---|---|:--:|---|---|---|---|
| 1 | **Round-trip correctness** | 25% | Save→relaunch→load reproduces all contacts exactly; append/list/search all correct. | Round-trip works; minor display issues. | Basic save/load works; some data lost or mis-parsed. | Data not persisted or corrupted on reload. |
| 2 | **I/O robustness & exceptions** | 20% | Missing file, malformed lines, and bad input all handled gracefully with clear messages; never crashes. | Handles the common failures. | Handles some failures; a few crashes. | Crashes on missing file or bad input. |
| 3 | **Resource management** | 15% | Every resource via `try-with-resources`/`Files` helper; UTF-8 everywhere. | Resources closed; UTF-8 mostly specified. | Some resources risk leaking; encoding implicit. | Resources leaked; no encoding control. |
| 4 | **Separation of concerns (design)** | 20% | Clean `Contact` / `ContactRepository` split; `toCsv`/`fromCsv` symmetric; no I/O in domain. | Mostly clean; minor leakage. | Some mixing of concerns. | File code inside the domain class; no repository. |
| 5 | **Input validation** | 10% | All field rules enforced with re-prompting; no bad data stored. | Most rules enforced. | Minimal validation. | No validation. |
| 6 | **Code quality & documentation** | 5% | Clear naming, Javadoc where useful, readable, consistent style. | Generally clean. | Readable but inconsistent. | Hard to read. |
| 7 | **Version-control discipline** | 5% | Meaningful, incremental commits; working `.gitignore`; builds from fresh clone; clear README. | Good history; builds. | Few large commits; builds. | One dump commit or does not build. |

**Passing reference:** a weighted average of **3.0** or above indicates you have met the week's learning outcome. Use any unchecked criterion as a to-do before the Corte 3 workshop.

---

## 7. Stretch goals (optional, for a stronger portfolio)

- **Delete and edit** a contact by id (menu options 5 and 6), then re-verify the round-trip.
- **Export to `.txt`** a human-friendly report (one contact per block, not CSV) alongside the CSV — practice both formats.
- **Configurable delimiter** (comma vs. semicolon) chosen at startup, proving your parser is not hard-coded.
- **Second CSV branch** using a library (Apache Commons CSV or OpenCSV); write a short note in your README comparing hand-rolled vs. library parsing (quoting, embedded commas — see RFC 4180 in [`../material/README.md`](../material/README.md)).
- **Unit tests** (JUnit) for `Contact.fromCsv(Contact.toCsv(c)).equals(c)` — automate the round-trip check.

---

## 8. Hints

- Start from the `ProductRepository` you built in [Session 2](../02-session/README.md); rename and adapt it — the shape is identical.
- Auto-assign `id` as `1 + max(existing ids)` (or `1` when the list is empty) so ids stay unique across runs.
- Read the whole file into a `List` on start, mutate it in memory during the session, and write the whole list back on exit — the simplest correct model for a small dataset.
- Test the failure paths on purpose: delete `contacts.csv`, corrupt a line, type letters where a number is expected. Robustness is graded.

---

*Optional formative activity for the 2026-B semester. Aligned to Week 13 objectives (read/write files, handle I/O exceptions, close resources, build a save/load application) and to the Corte 3 good-practice and version-control objectives.*
