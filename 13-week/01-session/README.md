# Week 13 · Session 1 — Foundations of File I/O and Reading/Writing Plain Text

**Object-Oriented Programming and Design** · CORHUILA · Mechatronics Engineering
**Unit 3 — Practical application of OOP in Java** · Corte 3 · Week 13, Session 1 of 2

> There is an interactive learning object (OVA/SCORM) accompanying this session in [`index.html`](index.html). This README is the instructor-and-student reference: read it before class and keep it open during the practice.

---

## 1. Session objective

By the end of this 3-hour session, the student will be able to **read a plain-text (`.txt`) file line by line and write text to it safely**, choosing correctly between overwrite and append, specifying UTF-8 encoding, handling `IOException`, and releasing file resources deterministically with **`try-with-resources`** — using both the classic I/O API and the modern NIO.2 (`Files`/`Path`) API.

This directly serves weekly objectives **1, 2, and 3** (read, write, and handle exceptions / close resources).

---

## 2. Timed agenda (180 minutes)

| Time | Block | Activity |
|---|---|---|
| 0:00 – 0:15 | Warm-up & hook | "Where did my data go?" — run a program that creates objects, close it, reopen: state is gone. Motivate persistence. |
| 0:15 – 0:45 | Theory I | Files, bytes, encoding, lines; absolute vs. relative paths; the working directory. |
| 0:45 – 1:15 | Theory II | The stream model; character vs. byte streams; buffering; classic I/O vs. NIO.2. |
| 1:15 – 1:30 | Theory III | Checked exceptions in I/O and **`try-with-resources`**. |
| 1:30 – 1:40 | — | Short break. |
| 1:40 – 2:10 | Worked example | Live-code the `NoteBook`: write notes to `notes.txt` (append) and read them back. |
| 2:10 – 2:55 | Guided practice | Students extend the `NoteBook` (numbered listing, line count, defensive reading). |
| 2:55 – 3:00 | Wrap-up | Exit ticket + preview of Session 2 (CSV & repository). |

---

## 3. Theory notes

### 3.1 What is a file, really?

A **file** is a named, ordered **sequence of bytes** managed by the operating system. Nothing in the file itself says "this is text" or "this is an image" — that meaning is a convention we impose. A `.txt` file is one we *agree* to interpret as text, where certain bytes represent characters and certain bytes represent **line separators**.

Two facts have practical consequences from day one:

1. **Encoding.** The mapping from characters to bytes is the *encoding*. The safe, portable default is **UTF-8**. If you never specify an encoding, Java uses the platform default, which may differ between your machine and the grading machine — a classic source of "it worked on my computer" bugs with accented characters (á, ñ, ü). **Always specify `StandardCharsets.UTF_8`.**

2. **Line separators.** A "line" ends with a separator that differs by platform: Windows uses `\r\n` (CRLF), Linux/macOS use `\n` (LF). Reading APIs hide this from you (they strip the separator); when writing, prefer helpers like `BufferedWriter.newLine()` or `Files.write(...)` that use the platform separator, or commit to `\n` explicitly for cross-platform data files.

```
A text file is bytes on disk:
  +----+----+----+----+----+----+----+----+
  | 48 | 65 | 6C | 6C | 6F | 0A | 48 | 69 |   (hex)
  +----+----+----+----+----+----+----+----+
  |  H |  e |  l |  l |  o | \n |  H |  i |   (UTF-8 → chars)
  +----+----+----+----+----+----+----+----+
                          ^ line separator (LF)
  Interpreted as text  →  Line 1: "Hello"
                          Line 2: "Hi"
```

### 3.2 Paths: absolute vs. relative

A **path** tells the OS where a file lives.

- An **absolute path** starts at a filesystem root and is unambiguous: `C:\Users\student\notes.txt` (Windows) or `/home/student/notes.txt` (Linux).
- A **relative path** is resolved against the program's **current working directory** (CWD) — usually the directory from which the JVM was launched (in an IDE, typically the project root). `notes.txt` and `data/notes.txt` are relative.

> **Predict before you run.** A frequent beginner surprise is "my file was created, but where?". A relative path lands in the CWD, *not* next to your `.java` source. When in doubt, print `System.getProperty("user.dir")` to see the CWD.

The modern way to represent a path is the NIO.2 `Path` type, which is platform-independent:

```java
import java.nio.file.Path;

Path p1 = Path.of("data", "notes.txt");   // builds data/notes.txt on any OS
Path p2 = Path.of("C:", "temp", "log.txt");
System.out.println(p1.toAbsolutePath());  // resolve against CWD to see the real location
```

### 3.3 The stream model, and why we buffer

Java models I/O as **streams** — a flow of data you read from or write to, one piece at a time.

```
        READING                                WRITING
  file ──> [ FileReader ] ──> chars     chars ──> [ FileWriter ] ──> file
                │                                       │
        wrap for speed                          wrap for speed
                ▼                                       ▼
        [ BufferedReader ]                      [ BufferedWriter ]
         .readLine()                             .write(...) / .newLine()
```

There are two families:

- **Byte streams** (`InputStream`/`OutputStream`) move raw bytes — used for images, audio, binary formats.
- **Character streams** (`Reader`/`Writer`) move text and understand encoding — used for `.txt`, `.csv`, `.json`.

For text files we use **character streams**. But reading one character at a time from disk is slow: each call may touch the operating system. A **buffer** solves this by reading a big chunk into memory once and then serving your small reads from RAM. `BufferedReader` adds the invaluable **`readLine()`** method; `BufferedWriter` adds **`newLine()`** and batches writes. **Rule of thumb: always wrap file readers/writers in a buffered wrapper.**

### 3.4 Two APIs for the same goal

Java offers two overlapping toolkits. You should recognize both.

| | Classic I/O (`java.io`, since Java 1.x) | Modern NIO.2 (`java.nio.file`, since Java 7) |
|---|---|---|
| Read all lines | `BufferedReader` loop | `Files.readAllLines(path, UTF_8)` → `List<String>` |
| Read lazily (large files) | `BufferedReader.readLine()` loop | `Files.lines(path, UTF_8)` → `Stream<String>` |
| Write text | `BufferedWriter.write(...)` | `Files.write(path, lines, UTF_8, options...)` |
| Open a buffered reader | `new BufferedReader(new FileReader(...))` | `Files.newBufferedReader(path, UTF_8)` |
| Exists / delete / size | `File` methods | `Files.exists`, `Files.delete`, `Files.size` |

**Guidance for this course:** prefer **NIO.2** for its concise, safe, UTF-8-aware helpers, but be fluent in the classic `BufferedReader`/`BufferedWriter` loop because it is what you will meet in most examples, exams, and legacy code.

### 3.5 Checked exceptions and closing resources

Anything can go wrong with a file: it may not exist, you may lack permission, the disk may fill up, the path may be a directory. Java forces you to confront this: **`IOException` is a *checked* exception**, so the compiler requires you to either `catch` it or declare it with `throws`.

```java
try {
    List<String> lines = Files.readAllLines(Path.of("notes.txt"), StandardCharsets.UTF_8);
    // ... use lines
} catch (NoSuchFileException e) {          // more specific first
    System.out.println("The file does not exist yet.");
} catch (IOException e) {                   // general I/O failure
    System.out.println("Could not read the file: " + e.getMessage());
}
```

Equally important: **every open file resource must be closed**, or you leak OS handles and may lose buffered data that was never flushed to disk. The wrong old way was a verbose `finally` block. The right modern way is **`try-with-resources`**:

```java
// The resource declared in try(...) is closed automatically at the end
// of the block — even if an exception is thrown. No finally needed.
try (BufferedReader reader = Files.newBufferedReader(path, StandardCharsets.UTF_8)) {
    String line;
    while ((line = reader.readLine()) != null) {
        System.out.println(line);
    }
} catch (IOException e) {
    System.out.println("Read failed: " + e.getMessage());
}
// reader.close() has already run here, guaranteed.
```

Any class that implements **`AutoCloseable`** (all readers, writers, and streams do) can be declared in the `try(...)` header. When the block finishes — normally or by exception — `close()` is called in reverse order of declaration. This is the single most important habit of correct file code.

```
   try (open A; open B) {          Order of close() on exit:
       ... work ...          →         close(B)   ← last opened, first closed
   }                                    close(A)
```

---

## 4. Fully worked example — the `NoteBook`

**Goal:** a tiny app that *appends* a note to `notes.txt` and can *list* all notes back, demonstrating every concept above: UTF-8, relative path, buffering, append vs. overwrite, `IOException` handling, and `try-with-resources`.

```java
import java.io.BufferedReader;
import java.io.BufferedWriter;
import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.nio.file.NoSuchFileException;
import java.nio.file.Path;
import java.nio.file.StandardOpenOption;
import java.util.List;

/**
 * A minimal notebook that persists notes to a plain-text file, one note per line.
 * Demonstrates: UTF-8 encoding, relative paths, buffering, append vs. overwrite,
 * IOException handling, and try-with-resources.
 */
public class NoteBook {

    /** File is created in the current working directory if it does not exist. */
    private static final Path FILE = Path.of("notes.txt");

    /** Appends one note as a new line. Creates the file on first use. */
    public static void addNote(String note) {
        // APPEND + CREATE: keep existing content, create the file if missing.
        try (BufferedWriter writer = Files.newBufferedWriter(
                FILE, StandardCharsets.UTF_8,
                StandardOpenOption.CREATE, StandardOpenOption.APPEND)) {
            writer.write(note);
            writer.newLine();               // platform-correct line separator
            System.out.println("Saved: " + note);
        } catch (IOException e) {
            System.out.println("Could not save the note: " + e.getMessage());
        }
    }

    /** Reads and prints every note, numbered. */
    public static void listNotes() {
        try (BufferedReader reader = Files.newBufferedReader(FILE, StandardCharsets.UTF_8)) {
            String line;
            int n = 1;
            while ((line = reader.readLine()) != null) {   // null == end of file
                System.out.println(n++ + ". " + line);
            }
        } catch (NoSuchFileException e) {
            System.out.println("No notes yet — the notebook is empty.");
        } catch (IOException e) {
            System.out.println("Could not read the notes: " + e.getMessage());
        }
    }

    public static void main(String[] args) {
        addNote("Study try-with-resources");
        addNote("Prepare the CSV example for session 2");
        addNote("Remember: always specify UTF-8");
        System.out.println("--- Current notes ---");
        listNotes();
    }
}
```

**Expected output (first run):**

```
Saved: Study try-with-resources
Saved: Prepare the CSV example for session 2
Saved: Remember: always specify UTF-8
--- Current notes ---
1. Study try-with-resources
2. Prepare the CSV example for session 2
3. Remember: always specify UTF-8
```

**Points to highlight while running it**

- Run `main` **twice**. Because we open with `APPEND`, the second run adds three *more* lines (six total). Change `APPEND` to `TRUNCATE_EXISTING` and re-run to see **overwrite** behavior — a deliberate, observable contrast.
- Delete `notes.txt` and call `listNotes()` first: it hits `NoSuchFileException` and prints a friendly message instead of crashing. This is robustness in action.
- Add `System.out.println(FILE.toAbsolutePath());` to reveal *exactly* where the file was created (the CWD).

**Classic-I/O equivalent (recognize this form too):**

```java
// The same append, using the java.io classes instead of NIO.2:
try (BufferedWriter writer = new BufferedWriter(
        new FileWriter("notes.txt", StandardCharsets.UTF_8, /*append=*/ true))) {
    writer.write("A note");
    writer.newLine();
} catch (IOException e) {
    System.out.println("Write failed: " + e.getMessage());
}
```

---

## 5. Guided in-class practice

Work in pairs (co-evaluation). Start from the `NoteBook` above and complete the tasks in order. Each builds on the previous one.

**Task A — Count the notes.**
Add a method `int countNotes()` that returns how many notes are stored. Use `Files.readAllLines(FILE, StandardCharsets.UTF_8).size()`, and return `0` if the file does not exist. Call it from `main`.

**Task B — Overwrite mode.**
Add a method `replaceAll(List<String> newNotes)` that *replaces* the entire file content with a fresh list of notes. Use `Files.write(FILE, newNotes, StandardCharsets.UTF_8)` (which truncates by default) and observe that the old notes are gone.

**Task C — Defensive reading.**
Modify `listNotes()` so that **blank lines are skipped** (ignore lines where `line.isBlank()`), and each printed note is trimmed with `line.strip()`. Test by manually adding an empty line in the file with a text editor.

**Task D — Search.**
Add `List<String> find(String keyword)` returning every note that contains `keyword` (case-insensitive). Reuse `Files.readAllLines`. Handle the missing-file case by returning an empty list.

**Stretch goal (optional).**
Rewrite `listNotes()` using `Files.lines(FILE, StandardCharsets.UTF_8)` inside a `try-with-resources` and a stream pipeline: `.filter(l -> !l.isBlank()).forEach(System.out::println)`. Discuss why the `Stream<String>` from `Files.lines` **must** be closed (it holds the file open) — hence the `try-with-resources`.

**Acceptance checks (self-verify before you leave):**

- [ ] Running `main` twice with append produces a growing file; switching to truncate resets it.
- [ ] `countNotes()` returns `0` (not a crash) when `notes.txt` is absent.
- [ ] `listNotes()` never prints blank lines.
- [ ] Every file operation is inside a `try-with-resources` or uses a `Files` one-shot helper, and every `catch` prints a clear message.

---

## 6. Common pitfalls (troubleshooting)

| Symptom | Likely cause | Fix |
|---|---|---|
| Accented characters look garbled (`Ã±`) | Encoding mismatch | Specify `StandardCharsets.UTF_8` on **both** read and write. |
| "File not found" but you *did* create it | Relative path resolved against a different CWD | Print `FILE.toAbsolutePath()`; use a known folder. |
| File is empty after writing | Writer never flushed/closed | Use `try-with-resources` so `close()` (which flushes) always runs. |
| Each run wipes previous data | Opened in truncate/overwrite mode | Use `StandardOpenOption.APPEND` (or classic `FileWriter(..., true)`). |
| `NullPointerException` at end of loop | Treated `readLine()`'s `null` as data | Loop condition must be `(line = reader.readLine()) != null`. |
| Compiler error: "unreported IOException" | Forgot to handle the checked exception | Wrap in `try/catch` or declare `throws IOException`. |

---

## 7. Wrap-up and exit ticket

**One-sentence summary:** *Text files are UTF-8 byte sequences read/written through buffered character streams, and correct code always specifies the encoding and closes resources with `try-with-resources`.*

**Exit ticket (submit before leaving — 5 minutes):**

1. In one sentence, explain what `try-with-resources` guarantees and *when* `close()` runs.
2. What is the difference in the file's content after running an **append** write versus a **truncate/overwrite** write?
3. Why must you specify `StandardCharsets.UTF_8` explicitly instead of relying on the default?

**Preview of Session 2:** We move from one note per line to *structured records*. We will encode each object as a **CSV** line, design a **repository** class to save/load a whole `List` of objects, and verify a full **round-trip** (save → load → equal).

**Autonomous work before next session (approx. 2 h):** finish practice Tasks A–D; read the CSV entries in [`../material/README.md`](../material/README.md); skim the `BufferedReader` and `Files` pages of the official Java API.
