# Week 13 - Reading and writing files in Java (.txt and .csv)

**Program:** Object-Oriented Programming and Design
**Academic term:** 2026-B
**Unit:** Unit 3 - Practical application of OOP in Java
**Assessment period:** Corte 3 (third grading cut)
**Learning outcome (RAA):** 90_82759

---

## 1. Overview

Until now our programs have lived entirely in memory. The moment the Java Virtual
Machine (JVM) stops, every object we created disappears. This week we cross an
important threshold in software engineering: **persistence**. We learn how to make
the *state* of our objects survive beyond a single run of the program by writing
it to files, and how to reconstruct objects later by reading those files back.

We focus on two of the most common, human-readable text formats:

- **`.txt`** — free-form or line-oriented plain text. Ideal for logs, notes, and
  simple records.
- **`.csv`** (Comma-Separated Values) — a lightweight tabular format understood by
  spreadsheets (Excel, Google Sheets, LibreOffice Calc), databases, and virtually
  every data tool. It is the workhorse of small-to-medium data exchange.

We connect file I/O to everything you already know about OOP: a *record* in a file
is the serialized state of an *object*; reading a file is really a *factory* that
manufactures objects from text; writing is *mapping* an object's fields to a line.
Along the way we make peace with Java's checked exceptions and learn the discipline
of always releasing operating-system resources.

> **Big idea of the week:** A file is just the persistent shadow of your objects.
> Good OOP design keeps the *translation* between object and text in one place
> (a repository / DAO), so the rest of your program never has to think about commas,
> newlines, or file handles.

---

## 2. Learning outcome and competencies

### Learning outcome (RAA 90_82759)
> The student applies object-oriented principles in Java to build applications that
> **persist and recover the state of their objects using text and CSV files**,
> managing input/output exceptions and system resources responsibly.

### Competencies addressed this week

| Type | Competency |
|------|------------|
| **Cognitive** | Explains the Java I/O model (streams vs. readers/writers, buffering) and the structure of `.txt` and `.csv` files. |
| **Procedural** | Implements read/write routines that map between objects and text/CSV lines using `BufferedReader`, `BufferedWriter`, `PrintWriter`, and NIO `Files`. |
| **Attitudinal** | Adopts safe resource-handling habits (try-with-resources), validates external data, and documents assumptions about file formats. |

---

## 3. Objectives (measurable)

By the end of Week 13, the student will be able to:

1. **Read** structured data from `.txt` and `.csv` files and **parse** each line into
   fully-formed Java objects, correctly handling headers and empty lines.
2. **Write** the state of a collection of objects to `.txt` and `.csv` files so the
   data persists between program executions.
3. **Handle** I/O exceptions (`IOException`, `FileNotFoundException`) with meaningful
   recovery or reporting, and **guarantee** that every file resource is closed using
   *try-with-resources*.
4. **Design and build** a small workshop application (a mini catalog/registry) that
   *saves* a list of objects to a CSV file and *loads* them back on the next run,
   separating persistence logic into a dedicated repository class.
5. **Evaluate** the robustness of file-handling code by testing edge cases (missing
   file, empty file, malformed line, special characters in a field).

---

## 4. Contents outline

1. **Why persistence matters** — the memory/disk boundary; the object ↔ record analogy.
2. **The Java I/O landscape**
   - Byte streams vs. character streams (`InputStream`/`OutputStream` vs. `Reader`/`Writer`).
   - Why buffering matters: `BufferedReader` / `BufferedWriter`.
   - The modern NIO.2 API: `java.nio.file.Path`, `Files`, `Paths`.
3. **Reading text files**
   - Line-by-line with `BufferedReader.readLine()`.
   - Bulk read with `Files.readAllLines()` and `Files.lines()` (streams).
4. **Writing text files**
   - `PrintWriter` / `BufferedWriter`, append vs. overwrite.
   - `Files.write()`.
5. **The CSV format in depth**
   - Delimiters, headers, quoting, escaping, and the classic "comma inside a field" trap.
   - Mapping an object to a CSV row (serialize) and a CSV row to an object (parse).
6. **Exception handling & resource management**
   - Checked exceptions and the `throws` clause.
   - `try / catch / finally` vs. **try-with-resources** and `AutoCloseable`.
7. **Designing a persistence layer**
   - The Repository / DAO pattern; keeping I/O out of your domain model.
8. **Workshop:** a save-and-load application built end to end.

---

## 5. Session-by-session agenda

### Session 1 — Foundations of Java I/O and reading/writing `.txt`
- Recap of the memory/disk boundary and the object ↔ record idea.
- The stream vs. reader/writer model; buffering.
- Reading a text file line by line; writing/appending text.
- try-with-resources and exception basics.
- Worked example: a `Note`-keeping app persisted to `notes.txt`.
- Guided practice + exit ticket.

📄 See [`01-session/README.md`](01-session/README.md)

### Session 2 — CSV, object mapping, and the persistence layer (workshop)
- Anatomy of a CSV file; the quoting/escaping problem.
- Mapping objects ↔ CSV rows: `toCsv()` and `fromCsv()`.
- The Repository/DAO pattern for clean persistence.
- Full workshop: `Student` registry that saves to and loads from `students.csv`.
- Robustness testing (missing file, empty file, malformed row).
- Guided practice + exit ticket.

📄 See [`02-session/README.md`](02-session/README.md)

---

## 6. Key-concepts glossary

| Term | Definition |
|------|------------|
| **Persistence** | The ability of data (object state) to outlive the process that created it, by storing it on non-volatile media (disk). |
| **Stream** | An ordered sequence of data flowing to/from a source or destination. *Byte streams* carry raw bytes; *character streams* carry text. |
| **`Reader` / `Writer`** | Abstract character-stream classes; the text-oriented counterparts of `InputStream` / `OutputStream`. |
| **Buffering** | Accumulating data in memory to reduce the number of (slow) physical I/O operations. `BufferedReader`/`BufferedWriter` provide it. |
| **`Path` / `Files` (NIO.2)** | Modern `java.nio.file` API. `Path` names a location; `Files` offers static helpers (`readAllLines`, `write`, `exists`, …). |
| **CSV** | Comma-Separated Values: a plain-text tabular format where each line is a record and fields are separated by a delimiter (usually a comma). |
| **Delimiter** | The character that separates fields in a record (comma, semicolon, tab, …). |
| **Header row** | The optional first CSV line naming the columns; must be skipped when parsing data. |
| **Escaping / quoting** | Technique to embed the delimiter, quotes, or newlines inside a field by wrapping it in double quotes and doubling internal quotes. |
| **Serialization (informal)** | Converting an object's state into a storable/transmittable representation — here, a line of text. Not to be confused with Java's binary `Serializable`. |
| **Parsing** | Reading text and converting it into structured data / typed objects. |
| **Checked exception** | An exception (e.g., `IOException`) the compiler forces you to catch or declare with `throws`. |
| **try-with-resources** | A `try (...) {}` form that automatically closes any `AutoCloseable` resource, even if an exception is thrown. |
| **Repository / DAO** | A class that isolates data-access logic (load/save) from the domain model and the rest of the application. |
| **Character encoding** | The mapping between characters and bytes (e.g., **UTF-8**). Always specify it to avoid corrupted accents/special characters. |

---

## 7. Achievement / self-check checklist

Tick each item once you can do it *without looking at notes*:

- [ ] I can explain, in one sentence, the difference between a byte stream and a character stream.
- [ ] I can open a text file and read it line by line with `BufferedReader`.
- [ ] I can write and *append* text to a file, and I know which flag controls each.
- [ ] I can read an entire file with `Files.readAllLines()` and process it with a stream.
- [ ] I can explain why buffering makes I/O faster.
- [ ] I can convert one object into a CSV line and one CSV line back into an object.
- [ ] I correctly skip the header row when parsing a CSV.
- [ ] I know why a naive `split(",")` breaks and can describe the quoting rule.
- [ ] Every file I open is wrapped in **try-with-resources**; nothing leaks.
- [ ] I catch `IOException` and report something useful instead of crashing silently.
- [ ] I keep persistence code in a repository class, away from my domain model.
- [ ] My workshop app saves objects to CSV and reloads them on the next run.
- [ ] I tested the "file does not exist yet" case and it behaves gracefully.

---

## 8. Resources index

- **Course material (download area / PDF):** [`material/README.md`](material/README.md)
- **Session 1 guide:** [`01-session/README.md`](01-session/README.md)
- **Session 2 guide:** [`02-session/README.md`](02-session/README.md)
- **Optional activity (submit via GitHub):** [`optional-activity/README.md`](optional-activity/README.md)

### External references (all free / official)
- Oracle — *Java Tutorials: Basic I/O* (`java.io`) and *File I/O (NIO.2)*.
- Oracle — `java.nio.file.Files` and `java.io.BufferedReader` API documentation.
- RFC 4180 — *Common Format and MIME Type for CSV Files* (the de-facto CSV spec).
- Baeldung — *Reading and Writing Files in Java* / *Java CSV* practical guides.

> **Prerequisites for this week:** classes and objects, constructors, `ArrayList`,
> `for`/`for-each` loops, `String` methods (`split`, `trim`, `join`), and basic
> exception vocabulary from Corte 2.
