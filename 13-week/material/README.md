# Week 13 · Course Material — Reading and writing files in Java (.txt and .csv)

**Course:** Object-Oriented Programming and Design · **Term:** 2026-B · **Corte 3**
**Unit 3:** Practical application of OOP in Java · **RAA:** 90_82759

> 📥 **This is a DOWNLOAD area.** The consolidated reading for this week is provided
> here as a PDF for offline study. This is **not** a submission box — you do not
> upload anything here. (Graded work for this week is the optional activity, which is
> submitted via **GitHub** — see [`../optional-activity/README.md`](../optional-activity/README.md).)

---

## 1. How to use this material

1. **Download** the week's PDF (link/file below) and read it *before* Session 1.
2. Keep it open while you work through the two session guides — the PDF, the
   sessions, and the code examples reinforce the same content.
3. Use the **curated references** in §4 when you want the authoritative source or a
   deeper dive.
4. Finish with the **self-check** in §5 to confirm you are ready for the assessment.

---

## 2. Downloadable PDF

| File | Description | Suggested name |
|------|-------------|----------------|
| Week 13 consolidated reading | Full theory + worked examples for `.txt`/`.csv` I/O, exceptions, and the Repository pattern, formatted for print/offline reading. | `week13-file-io-java.pdf` |

> Instructor note: place the exported PDF in this folder alongside this README so
> students can download it directly from the course repository/LMS file view.
> The PDF content mirrors this week's `README.md` and both session guides.

---

## 3. What this week covers (executive summary)

Reading and writing files is how a Java program achieves **persistence** — keeping
object state after the JVM exits. This week you learn to:

- Use Java's **character streams** (`Reader`/`Writer`) and their **buffered**
  variants for text, and the modern **NIO.2 `Files`/`Path`** helpers.
- **Read** `.txt` and `.csv` files line by line and **parse** each line into objects.
- **Write/append** object state to `.txt` and `.csv` files.
- Handle **checked I/O exceptions** (`IOException`, `FileNotFoundException`) and
  always release resources with **try-with-resources**.
- Understand the **CSV format**: delimiters, header rows, and the quoting/escaping
  rule for commas inside fields (RFC 4180).
- Architect persistence cleanly with the **Repository / DAO** pattern, keeping I/O
  out of the domain model.

---

## 4. Curated references (with short summary notes)

### Primary / official
- **Oracle — The Java Tutorials: Basic I/O.**
  Canonical introduction to byte vs. character streams, buffered streams, and the
  `java.io` classes. *Read the "Character Streams" and "Buffered Streams" pages.*
- **Oracle — The Java Tutorials: File I/O (Featuring NIO.2).**
  The modern `java.nio.file` API: `Path`, `Paths`, and the `Files` utility methods
  (`readAllLines`, `write`, `newBufferedReader`, `exists`/`notExists`). *This is the
  API style used in our examples.*
- **Oracle — API docs: `java.io.BufferedReader`, `java.io.BufferedWriter`,
  `java.io.PrintWriter`, `java.nio.file.Files`.**
  Method-level reference. *Bookmark `Files` — it is the fastest way to do common I/O.*
- **The Java Language Specification / Oracle Tutorial — try-with-resources &
  `AutoCloseable`.**
  Explains automatic resource management: why the resource closes even on exception,
  and the reverse-order closing rule.

### CSV format
- **RFC 4180 — Common Format and MIME Type for CSV Files.**
  The short, readable de-facto specification. *Focus on the quoting rules: fields
  containing commas, quotes, or newlines are wrapped in double quotes, and internal
  quotes are doubled.*

### Libraries for production CSV (beyond hand-rolled parsing)
- **OpenCSV.**
  Popular library that reads/writes CSV robustly, including bean ⇄ row mapping.
  *Use when data may contain commas/quotes/newlines you must not mis-parse.*
- **Apache Commons CSV.**
  Well-maintained alternative with configurable formats (Excel, RFC 4180, TDF) and
  header handling. *Great for reading files exported by spreadsheets.*

### Practical tutorials (free)
- **Baeldung — "Reading a File in Java" / "Java Write to File" / "Java CSV".**
  Concise, example-driven articles that parallel this week's material. *Good for a
  quick second explanation of the same APIs.*
- **Jenkov — "Java IO Tutorial".**
  Clear diagrams of the stream class hierarchy and buffering. *Useful visual mental
  model.*

---

## 5. Pre-class checklist

Before Session 1, make sure you can already:

- [ ] Create a class with fields, a constructor, and getters.
- [ ] Use an `ArrayList<T>` and iterate with a `for-each` loop.
- [ ] Use `String` methods: `split`, `trim`, `join`, `isBlank`.
- [ ] Recall what an exception is and the shape of a `try/catch` block.
- [ ] Have a JDK (17+) and your IDE (IntelliJ IDEA / VS Code / Eclipse) working.

After the week, confirm you can:

- [ ] Read a text/CSV file line by line and build objects from it.
- [ ] Write/append object state to a text/CSV file.
- [ ] Skip a header row and handle blank/malformed lines.
- [ ] Wrap every file resource in try-with-resources.
- [ ] Explain the CSV quoting rule for embedded commas.
- [ ] Separate persistence into a Repository class.

---

## 6. Companion files in this week's folder

- [`../README.md`](../README.md) — Week overview, objectives, glossary, agenda.
- [`../01-session/README.md`](../01-session/README.md) — Session 1: Java I/O foundations + `.txt`.
- [`../02-session/README.md`](../02-session/README.md) — Session 2: CSV, object mapping, Repository, workshop.
- [`../optional-activity/README.md`](../optional-activity/README.md) — Optional graded practice (submit via GitHub).
