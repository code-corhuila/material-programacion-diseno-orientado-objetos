# Week 13 — Reading Material and Resources

**Object-Oriented Programming and Design** · CORHUILA · Mechatronics Engineering
**Unit 3 · Corte 3 · Week 13 — Reading and writing files in Java (`.txt` and `.csv`)**

> **What this folder is.** This is the **download area** for the week's supporting material. The consolidated PDF for Week 13 is provided here for you to **download and read**. This is *not* a Moodle submission box — nothing is turned in here. Deliverables (when applicable) go through the channels named in each activity (the optional practice is submitted via **GitHub**, see [`../optional-activity/README.md`](../optional-activity/README.md)).

---

## 1. How to use this material

1. **Download** the week's PDF from this folder and read it before Session 2. It condenses the two session guides into a single printable document.
2. Use the **curated resources** below (official documentation first) to go deeper on any concept you found shaky in class.
3. Keep the **quick reference** (§4) open while coding the practices — it is the cheat-sheet for the APIs used this week.
4. Self-check with the **achievement checklist** in the [week README](../README.md#7-achievement--self-check-checklist).

---

## 2. Curated readings and resources

### 2.1 Primary — official Java documentation (authoritative, free)

| # | Resource | Why read it | Focus sections |
|---|---|---|---|
| 1 | **Oracle Java Tutorials — "Basic I/O"** (`java.io`) | The canonical introduction to streams, readers/writers, and buffering. | Character Streams; Buffered Streams. |
| 2 | **Oracle Java Tutorials — "File I/O (Featuring NIO.2)"** | The modern `Path`/`Files` API used throughout this week. | The `Path` Class; Reading, Writing, and Creating Files. |
| 3 | **Java API — `java.nio.file.Files`** | Reference for `readAllLines`, `lines`, `write`, `newBufferedReader/Writer`, `exists`. | Method summary. |
| 4 | **Java API — `java.io.BufferedReader` / `BufferedWriter`** | The classic line-oriented reading/writing you must recognize. | `readLine()`, `newLine()`. |
| 5 | **Java Language Spec / Tutorial — "The try-with-resources Statement"** | Deterministic resource release and `AutoCloseable`. | Whole page. |
| 6 | **Java API — `java.nio.charset.StandardCharsets`** | Why and how to always pass `UTF_8`. | `UTF_8` field. |

### 2.2 Complementary — books (align with the course bibliography)

| Reference | Relevance to this week |
|---|---|
| Sommerville, I. (2011). *Software Engineering* (9th ed.). Pearson. | Situates persistence and data management within software design and quality. |
| Bloch, J. *Effective Java* (3rd ed.). | Item on `try-with-resources` over `try-finally`; input validation; static factory methods (`fromCsv`). |
| Horstmann, C. *Core Java, Vol. II — Advanced Features*. | Detailed treatment of the I/O and NIO.2 streams used here. |

### 2.3 On the CSV format specifically

| Resource | Note |
|---|---|
| **RFC 4180 — "Common Format and MIME Type for CSV Files"** | The de-facto CSV specification: records, delimiters, and the **quoting rules** that a naive `split(",")` ignores. Read to understand *why* embedded commas and quotes are tricky. |
| **Apache Commons CSV** / **OpenCSV** (library docs) | Production-grade CSV parsing/writing that handles quoting correctly. Referenced as the "next step" beyond hand-rolled parsing; not required for the graded work. |

---

## 3. Short summary notes (the week in one page)

- **A file is bytes.** Text meaning comes from an **encoding** — always specify **UTF-8**.
- **Paths:** *absolute* is unambiguous; *relative* resolves against the working directory (`user.dir`). Prefer `Path.of(...)`.
- **Streams:** character streams (`Reader`/`Writer`) for text; wrap them in **buffered** wrappers for speed and for `readLine()`/`newLine()`.
- **Two APIs:** classic `BufferedReader`/`BufferedWriter`, and modern **NIO.2** (`Files.readAllLines`, `Files.lines`, `Files.write`, `Files.newBufferedReader`). Prefer NIO.2; recognize both.
- **Robustness:** `IOException` is **checked** — handle or declare it. Use **`try-with-resources`** so `close()` (and the flush it triggers) always runs.
- **Append vs. overwrite:** `StandardOpenOption.APPEND` keeps data; `Files.write` truncates by default.
- **CSV:** one record per line, fields joined by a delimiter, optional header. `String.join` to write, `split(",", -1)` to read; then **parse** text into typed fields.
- **Naive-`split` traps:** embedded delimiters and dropped trailing empties — validate the field count and guard your data.
- **Object ↔ text mapping:** `toCsv()` (serialize) and `static fromCsv(String)` (deserialize) as a symmetric pair.
- **Design:** put all file access in a **repository/DAO**; keep domain classes I/O-free (Single Responsibility Principle).
- **The definitive test:** a **round-trip** — save a collection, load it back, and confirm equality; ensure malformed lines are reported and skipped, not fatal.

---

## 4. Quick reference (cheat-sheet)

```java
// ---- Paths (NIO.2) ----
Path p = Path.of("data", "products.csv");   // portable relative path
p.toAbsolutePath();                          // see where it really is

// ---- Read all lines (small files) ----
List<String> lines = Files.readAllLines(p, StandardCharsets.UTF_8);

// ---- Read lazily (large files) — MUST close the stream ----
try (Stream<String> s = Files.lines(p, StandardCharsets.UTF_8)) {
    s.filter(l -> !l.isBlank()).forEach(System.out::println);
}

// ---- Read line-by-line (classic) ----
try (BufferedReader r = Files.newBufferedReader(p, StandardCharsets.UTF_8)) {
    String line;
    while ((line = r.readLine()) != null) { /* use line */ }
}

// ---- Write / overwrite all lines ----
Files.write(p, lines, StandardCharsets.UTF_8);   // truncates by default

// ---- Append (create if missing) ----
try (BufferedWriter w = Files.newBufferedWriter(p, StandardCharsets.UTF_8,
        StandardOpenOption.CREATE, StandardOpenOption.APPEND)) {
    w.write("a,b,c"); w.newLine();
}

// ---- CSV field ops ----
String rec = String.join(",", "1", "Mouse", "45000.0", "40");
String[] f = rec.split(",", -1);                 // keep trailing empties
int id = Integer.parseInt(f[0].strip());

// ---- Existence / size / delete ----
Files.exists(p); Files.size(p); Files.deleteIfExists(p);
```

---

## 5. Related material in this week

| Resource | Location |
|---|---|
| Week overview | [`../README.md`](../README.md) |
| Session 1 — foundations & text I/O | [`../01-session/README.md`](../01-session/README.md) |
| Session 2 — CSV & repository pattern | [`../02-session/README.md`](../02-session/README.md) |
| Interactive OVA (SCORM, Spanish) | [`../01-session/index.html`](../01-session/index.html) |
| Optional practice (submitted via GitHub) | [`../optional-activity/README.md`](../optional-activity/README.md) |
| Course overview & rubrics | [`../../00-course/README.md`](../../00-course/README.md) |

---

*Compiled for the 2026-B semester. Official documentation links are stable Oracle/IETF references; consult the JDK version installed in the lab for exact method signatures.*
