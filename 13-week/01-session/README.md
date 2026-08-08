# Week 13 · Session 1 — Foundations of Java I/O and reading/writing `.txt`

**Course:** Object-Oriented Programming and Design · **Term:** 2026-B · **Corte 3**
**Unit 3:** Practical application of OOP in Java
**RAA:** 90_82759

---

## 1. Session objective

By the end of this session the student will **read** a plain-text file line by line
and **write/append** text to a file in Java, using `BufferedReader`,
`BufferedWriter`/`PrintWriter`, and the NIO.2 `Files` helpers — always inside a
**try-with-resources** block so that file handles are released even when an error
occurs.

---

## 2. Timed agenda (110 minutes)

| Time | Activity |
|------|----------|
| 0:00 – 0:10 | Warm-up: "Where does my data go when the program ends?" discussion. |
| 0:10 – 0:30 | Theory: the memory/disk boundary; streams vs. readers/writers; buffering. |
| 0:30 – 0:45 | Theory: exceptions in I/O and try-with-resources. |
| 0:45 – 1:05 | Live worked example: the `Note` app (`notes.txt`). |
| 1:05 – 1:35 | Guided in-class practice (students code along). |
| 1:35 – 1:45 | Common pitfalls & debugging clinic. |
| 1:45 – 1:50 | Wrap-up and exit ticket. |

---

## 3. Theory notes

### 3.1 The memory/disk boundary

When your program runs, its objects live in **RAM** — fast, but *volatile*: when the
JVM exits, RAM is reclaimed and everything is gone. To keep data we must copy it to
**non-volatile storage** (a disk file). That copy is called **persistence**.

```
   RUNNING PROGRAM (RAM, volatile)          DISK (non-volatile)
  +-----------------------------+          +--------------------+
  |  Note note = new Note(...)  |  write   |  notes.txt         |
  |  ArrayList<Note> notes      | -------> |  2026-08-08|Buy...  |
  |                             | <------- |  2026-08-08|Call... |
  |  (gone when JVM stops)      |  read    |  (survives restart)|
  +-----------------------------+          +--------------------+
```

The core skill of this unit is translating **between these two worlds**: an object
in memory ⇄ a line of text on disk.

### 3.2 Streams vs. readers/writers

Java models I/O as **streams** — ordered sequences of data. There are two families:

```
        java.io families

  BYTE streams (raw bytes, 8-bit)         CHARACTER streams (text, Unicode)
  --------------------------------        --------------------------------
  InputStream   OutputStream              Reader        Writer
      |              |                       |             |
  FileInputStream FileOutputStream       FileReader    FileWriter
                                         BufferedReader BufferedWriter
```

- **Byte streams** (`InputStream`/`OutputStream`) move *raw bytes*. Use them for
  images, audio, `.class` files, ZIPs — any binary content.
- **Character streams** (`Reader`/`Writer`) move *text*, correctly translating bytes
  to characters using a **character encoding**. Use them for `.txt` and `.csv`.

> **Rule of thumb:** text file → use a `Reader`/`Writer`. Binary file → use a
> byte stream. This week is 100% text, so we live in the `Reader`/`Writer` world.

### 3.3 Why buffering matters

Talking to the disk is *slow*. Reading one character at a time means one physical
I/O request per character — catastrophic for performance. A **buffer** is an
in-memory array that lets us read/write in big chunks:

```
  Without buffer:  app  --char--> disk  (thousands of tiny slow trips)
  With buffer:     app  --char--> [ buffer in RAM ] --big chunk--> disk
```

`BufferedReader` adds the handy `readLine()` method; `BufferedWriter` batches writes.
**Always wrap** a raw `FileReader`/`FileWriter` in its buffered counterpart, or use
the `Files` helpers (which buffer for you).

### 3.4 Character encoding — do not skip this

An encoding maps characters ↔ bytes. If you write with one encoding and read with
another, accents and special characters (`á`, `ñ`, `ü`, `€`) turn into garbage
("mojibake"). **Always specify UTF-8 explicitly**:

```java
import java.nio.charset.StandardCharsets;
// ...
Files.readAllLines(path, StandardCharsets.UTF_8);
new BufferedReader(new InputStreamReader(new FileInputStream(f), StandardCharsets.UTF_8));
```

### 3.5 Exceptions in I/O

I/O can always fail — the disk is full, the file is missing, permissions are wrong.
Java forces us to acknowledge this with **checked exceptions**, chiefly
`IOException` (and its subclass `FileNotFoundException`). The compiler makes you
either:

1. **catch** it with `try/catch`, or
2. **declare** it with `throws IOException` and let the caller handle it.

### 3.6 try-with-resources (the modern, safe way)

An open file is an **operating-system resource**. If you forget to close it you
"leak" a handle; enough leaks and the program (or OS) runs out. The old
`try/finally` pattern was verbose and error-prone. Java 7+ gives us
**try-with-resources**: any object implementing `AutoCloseable` declared in the
`try (...)` header is **closed automatically** — in reverse order, even if an
exception is thrown.

```java
// GOOD: file is guaranteed closed, no matter what happens inside.
try (BufferedReader reader = Files.newBufferedReader(path, StandardCharsets.UTF_8)) {
    // ... use reader ...
} catch (IOException e) {
    System.err.println("Could not read file: " + e.getMessage());
}
// No finally block needed — the resource closed itself.
```

Compare with the old style you should now avoid:

```java
// LEGACY (verbose, easy to get wrong):
BufferedReader reader = null;
try {
    reader = Files.newBufferedReader(path);
    // ...
} catch (IOException e) {
    // ...
} finally {
    if (reader != null) {
        try { reader.close(); } catch (IOException ignored) {}
    }
}
```

### 3.7 Two ways to read, two ways to write (cheat sheet)

**Reading:**
```java
// (a) Line by line — great for large files, streaming.
try (BufferedReader br = Files.newBufferedReader(path, StandardCharsets.UTF_8)) {
    String line;
    while ((line = br.readLine()) != null) {  // readLine() returns null at EOF
        System.out.println(line);
    }
}

// (b) All at once — convenient for small files.
List<String> lines = Files.readAllLines(path, StandardCharsets.UTF_8);
```

**Writing:**
```java
// (a) PrintWriter/BufferedWriter — fine-grained control, append flag.
try (PrintWriter pw = new PrintWriter(
        Files.newBufferedWriter(path, StandardCharsets.UTF_8,
            StandardOpenOption.CREATE, StandardOpenOption.APPEND))) {
    pw.println("a new line");
}

// (b) All at once — simplest for a whole list.
Files.write(path, lines, StandardCharsets.UTF_8);
```

> **Overwrite vs. append:** by default writing *truncates* (overwrites) the file.
> Add `StandardOpenOption.APPEND` to add to the end instead. Getting this wrong is
> the #1 beginner bug — accidentally erasing previous data.

---

## 4. Fully worked example — a `Note`-keeping app

We build a tiny app that stores short notes in `notes.txt`, one note per line, using
`|` as a separator between the date and the text. This shows read **and** write end
to end, with proper resource handling.

### 4.1 The domain object

```java
// Note.java
import java.time.LocalDate;

public class Note {
    private final LocalDate date;
    private final String text;

    public Note(LocalDate date, String text) {
        this.date = date;
        this.text = text;
    }

    public LocalDate getDate() { return date; }
    public String getText()    { return text; }

    /** Turn this object into ONE line of text (object -> record). */
    public String toLine() {
        return date + "|" + text;   // e.g. 2026-08-08|Buy coffee
    }

    /** Rebuild a Note from ONE line of text (record -> object). */
    public static Note fromLine(String line) {
        String[] parts = line.split("\\|", 2);   // split on the FIRST '|' only
        LocalDate date = LocalDate.parse(parts[0].trim());
        String text = parts.length > 1 ? parts[1].trim() : "";
        return new Note(date, text);
    }

    @Override
    public String toString() {
        return "[" + date + "] " + text;
    }
}
```

Notice the symmetric pair `toLine()` / `fromLine()`. Keeping the object↔text
translation *inside the class* is a clean, reusable design.

### 4.2 Writing (append a new note)

```java
// NoteWriterDemo.java
import java.io.BufferedWriter;
import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.nio.file.*;
import java.time.LocalDate;

public class NoteWriterDemo {
    public static void main(String[] args) {
        Path file = Paths.get("notes.txt");
        Note note = new Note(LocalDate.now(), "Review file I/O before class");

        try (BufferedWriter bw = Files.newBufferedWriter(
                file, StandardCharsets.UTF_8,
                StandardOpenOption.CREATE,   // create the file if missing
                StandardOpenOption.APPEND)) { // add to the end, don't erase
            bw.write(note.toLine());
            bw.newLine();                    // portable line separator
            System.out.println("Saved: " + note);
        } catch (IOException e) {
            System.err.println("Failed to save note: " + e.getMessage());
        }
    }
}
```

### 4.3 Reading (load all notes back into objects)

```java
// NoteReaderDemo.java
import java.io.BufferedReader;
import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.nio.file.*;
import java.util.ArrayList;
import java.util.List;

public class NoteReaderDemo {
    public static void main(String[] args) {
        Path file = Paths.get("notes.txt");
        List<Note> notes = new ArrayList<>();

        // Graceful handling of "file not created yet".
        if (Files.notExists(file)) {
            System.out.println("No notes file yet — nothing to load.");
            return;
        }

        try (BufferedReader br = Files.newBufferedReader(file, StandardCharsets.UTF_8)) {
            String line;
            int lineNo = 0;
            while ((line = br.readLine()) != null) {
                lineNo++;
                if (line.isBlank()) continue;          // skip empty lines
                try {
                    notes.add(Note.fromLine(line));
                } catch (RuntimeException parseError) {
                    // One bad line should not kill the whole load.
                    System.err.println("Skipping malformed line " + lineNo
                            + ": \"" + line + "\" (" + parseError.getMessage() + ")");
                }
            }
        } catch (IOException e) {
            System.err.println("Failed to read notes: " + e.getMessage());
            return;
        }

        System.out.println("Loaded " + notes.size() + " note(s):");
        notes.forEach(System.out::println);
    }
}
```

### 4.4 Expected result

Run `NoteWriterDemo` twice, then `NoteReaderDemo`:

```
notes.txt now contains:
2026-08-08|Review file I/O before class
2026-08-08|Review file I/O before class

Console (reader):
Loaded 2 note(s):
[2026-08-08] Review file I/O before class
[2026-08-08] Review file I/O before class
```

**What to notice:**
- The writer used `CREATE + APPEND`, so the second run *added* a line instead of erasing.
- The reader returned early and gracefully when the file didn't exist.
- A malformed line is *reported and skipped*, not fatal — robust reading.
- Both file resources closed themselves via try-with-resources.

---

## 5. Guided in-class practice (30 min)

Work in pairs. Build a **`TaskLog`** application, mirroring the `Note` example.

**Step 1.** Create a `Task` class with fields `int id`, `String title`,
`boolean done`. Add `toLine()` (format: `id|title|done`) and a static `fromLine()`.

**Step 2.** Write `saveTask(Task t)` that *appends* one task to `tasks.txt`
(`CREATE + APPEND`), all inside try-with-resources.

**Step 3.** Write `loadTasks()` that returns a `List<Task>`, reading line by line,
skipping blanks, and reporting (not crashing on) malformed lines.

**Step 4.** In `main`, add three tasks, then load and print them. Run the program
**twice** and confirm the list keeps growing (proof of persistence).

**Stretch goal.** Add a `printSummary()` that reports how many tasks are `done`
vs. pending, computed from the loaded list.

**Checkpoints (instructor circulates):**
- ✅ Does the program still work when `tasks.txt` does not exist yet?
- ✅ Is UTF-8 specified everywhere?
- ✅ Is APPEND used (not accidental overwrite)?
- ✅ Are all resources in try-with-resources (no manual `close()`)?

---

## 6. Common pitfalls & debugging clinic

| Symptom | Likely cause | Fix |
|---------|-------------|-----|
| File is empty / previous data gone | Forgot `APPEND`; default is truncate | Add `StandardOpenOption.APPEND` |
| `NoSuchFileException` on read | File not created yet | Check `Files.notExists()` first |
| Accents show as `Ã±`, `Ã©` | Encoding mismatch | Specify `StandardCharsets.UTF_8` on both ends |
| Nothing written to file | Writer not flushed/closed | Use try-with-resources (auto-close flushes) |
| `readLine()` loops forever | Compared with `""` instead of `null` | Loop condition must be `!= null` |
| Extra blank lines when reading | `println` adds a newline you also add | Use one newline source (`newLine()` or `println`, not both) |

---

## 7. Wrap-up

Today we learned that persistence is just disciplined translation between objects in
memory and lines on disk. We met the `Reader`/`Writer` character-stream family,
learned why buffering matters, insisted on UTF-8, and adopted try-with-resources as
our non-negotiable habit for never leaking a file handle. Next session we upgrade
plain text to **CSV**, tackle the quoting problem, and package all of this into a
clean **repository** class for the workshop app.

### Exit ticket (hand in before leaving)
Answer briefly (3–5 lines total):
1. In one sentence, what does try-with-resources guarantee, and why do we want it?
2. Which single `StandardOpenOption` decides whether writing *adds to* or *erases*
   the previous contents of a file?
3. Why do we compare the result of `readLine()` against `null` in the read loop?
