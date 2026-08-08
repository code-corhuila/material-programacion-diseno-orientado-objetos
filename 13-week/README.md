# Week 13 — Reading and Writing Files in Java (.txt and .csv)

**Object-Oriented Programming and Design** · Corporación Universitaria del Huila (CORHUILA)
**Program:** Mechatronics Engineering · **Course code:** 82759 · **Semester:** 2026-B

| Field | Detail |
|---|---|
| **Unit** | Unit 3 — Practical application of OOP in Java |
| **Week** | 13 of 16 |
| **Assessment period** | **Corte 3** (weeks 11–16) — applied OOP, robustness, persistence, and code quality |
| **Weekly topic** | Reading and writing files in Java (`.txt` and `.csv`) |
| **Modality** | On-campus, theoretical-practical |
| **Accompanied hours this week** | 6 h (two 3-hour sessions) |
| **Autonomous hours this week** | 12 h |

---

## 1. Overview

Up to this point in the course, every object our programs create has lived only in **RAM**: the moment the JVM stops, the state is gone. A real application must remember things between runs — an inventory system must recall its products, a grades application must recall its students. **Persistence** is the property of keeping data beyond the lifetime of a single execution, and the simplest, most universal form of persistence is the **file**.

This week we learn how to move object state **out of memory and into files**, and how to read it back to rebuild objects. We focus on the two most common human-readable text formats: plain text (`.txt`) and comma-separated values (`.csv`). Along the way we treat the two hard parts that separate a toy example from production-quality code: **exception handling** for I/O failures and **deterministic release of file resources** using `try-with-resources`.

This is a natural continuation of the exceptions and collections work from earlier in Corte 3: we read many lines into a `List`, transform each line into an object, and write a collection of objects back out. By the end of the week you will have built a small application that **saves and loads its objects from disk** — the persistence layer of the incremental project.

> Key idea of the week: **A file is just a sequence of bytes. Our job is to design a clean, reversible mapping between an object and its textual representation — and to do the reading and writing safely.**

---

## 2. Learning outcome (RAA) and competencies addressed

| Code | Statement |
|---|---|
| **90_82759** | The student builds software solutions applying the principles of OOP, using contemporary techniques, tools, and good practices, with criteria of quality, integration, and maintainability. |
| **90_82759_01 (Corte 3 instance)** | Practical application, robustness, **persistence**, and code quality. |

**Competencies developed this week**

- **Technical (specific):** design and implement a persistence layer that serializes and deserializes objects to/from `.txt` and `.csv` files; handle checked I/O exceptions; release file resources deterministically.
- **Design:** apply *separation of concerns* by isolating persistence logic in dedicated classes (a repository / DAO), keeping domain classes free of I/O code.
- **Transversal:** engineering rigor (validate inputs, anticipate failure), autonomy, and clear technical communication.

---

## 3. Weekly objectives (measurable)

By the end of Week 13 the student will be able to:

1. **Read** data from `.txt` and `.csv` files and **parse** each line into fully-formed Java objects, using `BufferedReader` and the NIO.2 `Files`/`Path` API.
2. **Write** the state of one or many objects to `.txt` and `.csv` files for persistence, producing output that can be read back without loss (a round-trip).
3. **Handle** I/O exceptions (`IOException` and subclasses) with appropriate `try`/`catch` blocks, and **release** file resources deterministically using **`try-with-resources`**.
4. **Design** a clean persistence layer that separates file-access code (a repository/DAO class) from domain classes, respecting the single-responsibility principle.
5. **Build** a small workshop application that saves a collection of objects to a file and loads it back on the next run, verifying the round-trip.

Each objective is directly observable in the session practices and in the optional GitHub activity, and each maps to a criterion in the workshop rubric (see §9 and the `optional-activity`).

---

## 4. Contents outline

1. **Foundations of file I/O**
   - What a file is: bytes, encoding (UTF-8), lines, and line separators.
   - Absolute vs. relative paths; the working directory; portability with `Path`.
   - The stream model: byte streams vs. character streams; the role of buffering.
2. **Two APIs, one goal**
   - Classic I/O: `FileReader`/`FileWriter` wrapped in `BufferedReader`/`BufferedWriter`.
   - Modern NIO.2: `Path`, `Paths`, and `Files` convenience methods (`readAllLines`, `write`, `newBufferedReader`).
3. **Reading and writing plain text (`.txt`)**
   - Reading line by line; writing line by line; appending vs. overwriting.
4. **Reading and writing CSV (`.csv`)**
   - The CSV shape: header, records, delimiters; `String.split` and `String.join`.
   - The naive limits of `split` (quoting, embedded commas) and how to reason about them.
5. **Robustness and resource management**
   - Checked exceptions in I/O; `try`/`catch`/`finally`; **`try-with-resources`** and `AutoCloseable`.
6. **Object ↔ text mapping and persistence design**
   - `toCsv()` / `fromCsv()` conventions; a `Repository`/DAO to isolate persistence.
   - Round-trip testing: save → load → compare.

---

## 5. Session-by-session agenda

| Session | Focus | Core deliverable |
|---|---|---|
| **Session 1** | Foundations + reading & writing **plain text** safely (paths, streams, buffering, `try-with-resources`) | A `NoteBook` app that appends notes to a `.txt` and lists them back |
| **Session 2** | **CSV** persistence + designing a **repository** to save/load a collection of objects (object ↔ CSV round-trip) | A `ProductRepository` that saves/loads `Product` objects to `products.csv` |

Detailed timed agendas, theory, worked examples, guided practice, and exit tickets are inside each session folder:

- [`01-session/README.md`](01-session/README.md) — Foundations and text-file I/O.
- [`02-session/README.md`](02-session/README.md) — CSV persistence and the repository pattern.

---

## 6. Key-concepts glossary

| Term | Definition |
|---|---|
| **Persistence** | Keeping data beyond the lifetime of a single program execution (typically on disk). |
| **File** | A named, ordered sequence of bytes stored by the operating system. |
| **Encoding** | The rule that maps characters to bytes; we use **UTF-8** explicitly to avoid platform surprises. |
| **Path (absolute / relative)** | The location of a file. *Absolute* starts at a root (`C:\...`, `/home/...`); *relative* is resolved against the program's current working directory. |
| **Stream** | An abstraction for a flow of data. *Byte streams* (`InputStream`/`OutputStream`) move raw bytes; *character streams* (`Reader`/`Writer`) move text. |
| **Buffer / buffering** | An in-memory holding area that batches small reads/writes into few large ones, improving performance. `BufferedReader`/`BufferedWriter` provide it. |
| **`Path` / `Paths` / `Files`** | The NIO.2 API (`java.nio.file`): `Path` models a location, `Paths`/`Path.of` build one, `Files` offers high-level read/write/copy/exists operations. |
| **Checked exception** | An exception the compiler forces you to handle or declare; `IOException` is the central one for file I/O. |
| **`try-with-resources`** | A `try (Resource r = ...) { }` form that automatically calls `close()` on the resource when the block ends, even on exception. |
| **`AutoCloseable`** | The interface implemented by resources (readers, writers, streams) so `try-with-resources` can close them. |
| **CSV (Comma-Separated Values)** | A plain-text tabular format: one record per line, fields separated by a delimiter (usually a comma), often with a header row. |
| **Delimiter** | The character that separates fields in a record (comma, semicolon, tab, `|`). |
| **Serialization (textual)** | Converting an object into a textual representation (here, a CSV line via `toCsv()`). |
| **Deserialization (parsing)** | Rebuilding an object from its textual representation (here, `fromCsv()` splitting a line). |
| **Round-trip** | Saving objects and loading them back so that the result equals the original — the definitive test of a persistence layer. |
| **Repository / DAO** | A class whose single responsibility is data access (save/load), isolating I/O from domain logic. |

---

## 7. Achievement / self-check checklist

Mark each item once you can do it **without looking at notes**:

- [ ] I can explain the difference between an absolute and a relative path, and predict where a relative file will be created.
- [ ] I can read a `.txt` file line by line with `BufferedReader` and with `Files.readAllLines`, specifying UTF-8.
- [ ] I can write to a `.txt` file, choosing correctly between **overwrite** and **append**.
- [ ] I can explain why `IOException` is a checked exception and handle it with a meaningful message.
- [ ] I can write a `try-with-resources` block and explain exactly when `close()` is called.
- [ ] I can convert an object to a CSV line (`toCsv()`) and rebuild it from a CSV line (`fromCsv()`).
- [ ] I can save a `List` of objects to a `.csv` file (with a header) and load it back into a new `List`.
- [ ] I can demonstrate a successful **round-trip**: the loaded objects equal the saved ones.
- [ ] I can justify why persistence code belongs in a repository/DAO rather than in the domain class.
- [ ] I can name at least two failure modes of parsing CSV with a plain `split(",")` and how to detect them.

If any box is unchecked, revisit the corresponding section in the session READMEs or the `material` folder before the Corte 3 workshop.

---

## 8. Resources index

| Resource | Location | Purpose |
|---|---|---|
| Session 1 guide | [`01-session/README.md`](01-session/README.md) | Foundations + text-file I/O, worked example, guided practice, exit ticket. |
| Session 2 guide | [`02-session/README.md`](02-session/README.md) | CSV persistence + repository pattern, worked example, guided practice, exit ticket. |
| Interactive OVA (SCORM) | [`01-session/index.html`](01-session/index.html) | Self-paced learning object covering the week (Spanish). |
| Reading & resources index | [`material/README.md`](material/README.md) | Curated readings, official docs, and download area for the week's PDF. |
| Optional activity | [`optional-activity/README.md`](optional-activity/README.md) | Extra practice submitted via **GitHub** (not Moodle), with rubric. |

---

## 9. How this week is assessed (within Corte 3)

Week 13 does **not** carry a standalone grade; it feeds the Corte 3 evidences (persistence workshop, applied-concepts quiz, and the incremental-project delivery). The **`optional-activity`** in this folder is a formative, non-graded practice submitted through GitHub. The rubric criteria that this week emphasizes — **correctness of the round-trip, robustness of I/O error handling, and clean separation of persistence** — are the same criteria used in the Corte 3 practical rubric defined in the [course overview](../../00-course/README.md).

---

*Prepared for the 2026-B semester, aligned to the official CORHUILA syllabus (code 82759). Weekly topic, RAA (90_82759), and objectives derive directly from that syllabus.*
