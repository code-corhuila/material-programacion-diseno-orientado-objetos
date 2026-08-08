# Week 13 · Session 2 — CSV, object mapping, and the persistence layer (workshop)

**Course:** Object-Oriented Programming and Design · **Term:** 2026-B · **Corte 3**
**Unit 3:** Practical application of OOP in Java
**RAA:** 90_82759

---

## 1. Session objective

By the end of this session the student will **design and build a complete
save-and-load application** that persists a collection of Java objects to a `.csv`
file and reconstructs them on the next run. The student will map objects ↔ CSV rows,
handle the CSV quoting/escaping problem correctly, and isolate all file logic inside
a **Repository (DAO)** class, applying proper exception and resource handling.

---

## 2. Timed agenda (110 minutes)

| Time | Activity |
|------|----------|
| 0:00 – 0:08 | Recap of Session 1; quick exit-ticket review. |
| 0:08 – 0:28 | Theory: anatomy of CSV; delimiters, headers, quoting/escaping. |
| 0:28 – 0:40 | Theory: mapping objects ↔ CSV rows; the Repository/DAO pattern. |
| 0:40 – 1:10 | Worked example / workshop build: `Student` + `StudentRepository`. |
| 1:10 – 1:40 | Guided practice: extend the workshop (search, update, delete-and-save). |
| 1:40 – 1:48 | Robustness testing clinic (missing/empty/malformed files). |
| 1:48 – 1:50 | Wrap-up and exit ticket. |

---

## 3. Theory notes

### 3.1 What is a CSV file, really?

**CSV** (Comma-Separated Values) is the simplest possible tabular format:

- Each **line** is one **record** (≈ one object).
- Within a line, **fields** are separated by a **delimiter** (usually a comma).
- An optional **header row** at the top names the columns.

```
  id,name,program,gpa            <- header row (names the columns)
  1,Ana Torres,Software,4.5      <- record 1  (one Student object)
  2,Luis Gómez,Software,3.9      <- record 2  (another Student object)
  3,María Ruiz,Data,4.8          <- record 3
  ^   ^          ^        ^
  |   |          |        +--- field 4 (gpa)
  |   |          +------------ field 3 (program)
  |   +----------------------- field 2 (name)
  +--------------------------- field 1 (id)
```

CSV is beloved because it is human-readable, tiny, and openable by Excel, Google
Sheets, pandas, databases — practically everything. That universality is exactly
why it is a standard skill.

### 3.2 The mental model: a CSV row IS a serialized object

```
        Student object (RAM)                 CSV row (disk)
    +-------------------------+   toCsv()   +----------------------+
    | id      = 1             | ----------> | 1,Ana Torres,SW,4.5  |
    | name    = "Ana Torres"  |             +----------------------+
    | program = "SW"          | <---------- | 1,Ana Torres,SW,4.5  |
    | gpa     = 4.5           |  fromCsv()  +----------------------+
    +-------------------------+
```

Reading a CSV is a *factory* that manufactures objects; writing is *mapping* each
object's fields to a row. Keep these two methods symmetric and the whole design
stays clean.

### 3.3 The comma-inside-a-field trap (quoting & escaping)

Here is the classic bug. Consider a name field `"Torres, Ana"`. A naive
`line.split(",")` would wrongly split it into two fields and shift every column
after it. The CSV convention (RFC 4180) solves this with **quoting**:

- If a field contains the delimiter, a double quote, or a newline, wrap the whole
  field in **double quotes**: `"Torres, Ana"`.
- A literal double quote *inside* a quoted field is written as **two** double
  quotes: `"She said ""hi"""` represents `She said "hi"`.

```
  Field value              CSV representation
  -----------------------  --------------------------
  Ana Torres               Ana Torres
  Torres, Ana              "Torres, Ana"
  15" monitor              "15"" monitor"
  line1<newline>line2      "line1<newline>line2"
```

> **Teaching decision for this course:** For the workshop we keep data *simple*
> (no commas/quotes inside fields) so a straightforward `split`/`join` is correct
> and easy to read. But you **must** understand the quoting rule, because real-world
> data will eventually contain a comma. We show a minimal quoting-aware helper in
> §4.5 and, in the material folder, point to libraries (OpenCSV, Apache Commons CSV)
> that handle every edge case for production code.

### 3.4 Skipping the header

If your file has a header row, you must **not** parse it as data. Track the line
index and skip index 0, or detect and skip the known header string.

```java
List<String> lines = Files.readAllLines(path, StandardCharsets.UTF_8);
for (int i = 1; i < lines.size(); i++) {   // start at 1 -> skip header
    // parse lines.get(i)
}
```

### 3.5 The Repository (DAO) pattern — where I/O belongs

A cardinal design principle: **keep persistence out of your domain model.** Your
`Student` class should describe *what a student is*, not *how students are stored*.
All the file plumbing goes into a dedicated **Repository** (a.k.a. **DAO** — Data
Access Object).

```
        +------------------+        +----------------------+       +-------------+
        |  Application /    |  uses  |  StudentRepository   | I/O   | students.csv|
        |  main / menu      | -----> |  (save / findAll /   | ----> |  (disk)     |
        |                   |        |   findById / delete) |       |             |
        +------------------+        +----------------------+       +-------------+
                                             |
                                             | maps object <-> row
                                             v
                                        +-----------+
                                        |  Student  |  (pure domain model,
                                        |  (POJO)   |   knows nothing about files)
                                        +-----------+
```

**Why this matters:**
- The rest of your program calls `repo.findAll()` and never sees a comma or a
  file handle.
- If tomorrow you switch from CSV to a database, you rewrite *only* the repository.
- The domain model stays testable and clean (Single Responsibility Principle).

---

## 4. Fully worked example / workshop — a `Student` registry persisted to CSV

We build the whole thing: a domain object, a repository that saves/loads a
`List<Student>` to/from `students.csv`, and a small `main` that proves persistence
across runs.

### 4.1 The domain model — `Student` (a clean POJO)

```java
// Student.java
public class Student {
    private final int id;
    private final String name;
    private final String program;
    private final double gpa;

    public Student(int id, String name, String program, double gpa) {
        this.id = id;
        this.name = name;
        this.program = program;
        this.gpa = gpa;
    }

    public int getId()         { return id; }
    public String getName()    { return name; }
    public String getProgram() { return program; }
    public double getGpa()     { return gpa; }

    @Override
    public String toString() {
        return String.format("#%d %-14s | %-10s | GPA %.2f", id, name, program, gpa);
    }
}
```

The domain model knows **nothing** about files or CSV — exactly as it should.

### 4.2 The repository — `StudentRepository` (all the I/O lives here)

```java
// StudentRepository.java
import java.io.BufferedReader;
import java.io.BufferedWriter;
import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.nio.file.*;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

public class StudentRepository {

    private static final String HEADER = "id,name,program,gpa";
    private final Path file;

    public StudentRepository(String fileName) {
        this.file = Paths.get(fileName);
    }

    // ---------- object <-> CSV row mapping ----------

    /** Student -> one CSV row. */
    private String toCsv(Student s) {
        // Simple data assumption: no commas/quotes inside fields (see §4.5).
        return s.getId() + "," + s.getName() + "," + s.getProgram() + "," + s.getGpa();
    }

    /** One CSV row -> Student. Throws if the row is malformed. */
    private Student fromCsv(String row) {
        String[] f = row.split(",", -1);   // -1 keeps trailing empty fields
        if (f.length != 4) {
            throw new IllegalArgumentException("Expected 4 fields, got " + f.length);
        }
        int id       = Integer.parseInt(f[0].trim());
        String name  = f[1].trim();
        String prog  = f[2].trim();
        double gpa   = Double.parseDouble(f[3].trim());
        return new Student(id, name, prog, gpa);
    }

    // ---------- persistence operations ----------

    /** Overwrite the file with the whole list (header + one row per student). */
    public void saveAll(List<Student> students) {
        try (BufferedWriter bw = Files.newBufferedWriter(
                file, StandardCharsets.UTF_8,
                StandardOpenOption.CREATE,
                StandardOpenOption.TRUNCATE_EXISTING)) {  // full rewrite
            bw.write(HEADER);
            bw.newLine();
            for (Student s : students) {
                bw.write(toCsv(s));
                bw.newLine();
            }
        } catch (IOException e) {
            throw new RuntimeException("Could not save students: " + e.getMessage(), e);
        }
    }

    /** Load all students. Returns an empty list if the file does not exist yet. */
    public List<Student> findAll() {
        List<Student> result = new ArrayList<>();
        if (Files.notExists(file)) {
            return result;                     // first run: nothing saved yet
        }
        try (BufferedReader br = Files.newBufferedReader(file, StandardCharsets.UTF_8)) {
            String row;
            int lineNo = 0;
            while ((row = br.readLine()) != null) {
                lineNo++;
                if (lineNo == 1 && row.startsWith("id,")) continue; // skip header
                if (row.isBlank()) continue;                        // skip blanks
                try {
                    result.add(fromCsv(row));
                } catch (RuntimeException bad) {
                    System.err.println("Skipping bad row " + lineNo
                            + ": \"" + row + "\" (" + bad.getMessage() + ")");
                }
            }
        } catch (IOException e) {
            throw new RuntimeException("Could not load students: " + e.getMessage(), e);
        }
        return result;
    }

    /** Convenience: append a single new student without rewriting everything. */
    public void add(Student s) {
        boolean isNewFile = Files.notExists(file);
        try (BufferedWriter bw = Files.newBufferedWriter(
                file, StandardCharsets.UTF_8,
                StandardOpenOption.CREATE, StandardOpenOption.APPEND)) {
            if (isNewFile) { bw.write(HEADER); bw.newLine(); }
            bw.write(toCsv(s));
            bw.newLine();
        } catch (IOException e) {
            throw new RuntimeException("Could not add student: " + e.getMessage(), e);
        }
    }

    /** Find one student by id (demonstrates using the loaded list). */
    public Optional<Student> findById(int id) {
        return findAll().stream().filter(s -> s.getId() == id).findFirst();
    }
}
```

### 4.3 The application — proving persistence across runs

```java
// RegistryApp.java
import java.util.List;

public class RegistryApp {
    public static void main(String[] args) {
        StudentRepository repo = new StudentRepository("students.csv");

        // 1) Load whatever was saved on a previous run.
        List<Student> students = repo.findAll();
        System.out.println("Loaded " + students.size() + " student(s) from disk.");

        // 2) If the registry is empty, seed it once.
        if (students.isEmpty()) {
            students.add(new Student(1, "Ana Torres", "Software", 4.5));
            students.add(new Student(2, "Luis Gomez", "Software", 3.9));
            students.add(new Student(3, "Maria Ruiz", "Data",     4.8));
            repo.saveAll(students);            // persist the whole list
            System.out.println("Seeded and saved 3 students.");
        }

        // 3) Show the current registry.
        System.out.println("\nCurrent registry:");
        students.forEach(System.out::println);

        // 4) Demonstrate a lookup.
        repo.findById(2).ifPresentOrElse(
            s -> System.out.println("\nLookup id=2 -> " + s),
            () -> System.out.println("\nNo student with id=2"));
    }
}
```

### 4.4 Expected behavior

**First run** (no file yet):
```
Loaded 0 student(s) from disk.
Seeded and saved 3 students.

Current registry:
#1 Ana Torres     | Software   | GPA 4.50
#2 Luis Gomez     | Software   | GPA 3.90
#3 Maria Ruiz     | Data       | GPA 4.80

Lookup id=2 -> #2 Luis Gomez     | Software   | GPA 3.90
```

`students.csv` now contains:
```
id,name,program,gpa
1,Ana Torres,Software,4.5
2,Luis Gomez,Software,3.9
3,Maria Ruiz,Data,4.8
```

**Second run** (file exists): the seed block is skipped — the data was loaded from
disk. That is persistence working.
```
Loaded 3 student(s) from disk.

Current registry:
#1 Ana Torres     | Software   | GPA 4.50
...
```

### 4.5 Optional: a minimal quoting-aware writer (for the curious)

If a field might contain a comma, quote, or newline, wrap and escape it:

```java
/** Quote a field only if it needs it, doubling any internal quotes (RFC 4180). */
private static String csvEscape(String field) {
    boolean mustQuote = field.contains(",") || field.contains("\"") || field.contains("\n");
    if (!mustQuote) return field;
    return "\"" + field.replace("\"", "\"\"") + "\"";
}
```

Parsing quoted CSV correctly is trickier — for production, use **OpenCSV** or
**Apache Commons CSV** (see the material folder). Rolling your own full parser is a
classic source of subtle bugs.

---

## 5. Guided in-class practice (30 min)

Extend the workshop. Work from the `StudentRepository` above.

**Task A — Update.** Add `update(Student updated)` that loads all, replaces the
student with the matching id, and calls `saveAll(...)`. Verify the change survives a
restart.

**Task B — Delete.** Add `deleteById(int id)` that loads all, removes the matching
student, and saves. Confirm the row disappears from `students.csv`.

**Task C — Search.** Add `findByProgram(String program)` returning a filtered list.
Print all Software students.

**Task D — Report.** Add a method that computes and prints the *average GPA* per
program from the loaded list.

**Stretch goal.** Add a tiny text menu (using `Scanner`) so a user can Add / List /
Search / Delete interactively, calling the repository for every persistence action.

**Checkpoints (instructor circulates):**
- ✅ Does all file logic stay inside the repository (none in `Student` or the menu)?
- ✅ Are header and blank lines handled on read?
- ✅ Are all resources in try-with-resources?
- ✅ Does the app correctly show loaded data on the *second* run?

---

## 6. Robustness testing clinic (8 min)

Try to break your own program — good engineers test the unhappy paths:

| Test | How to trigger | Expected robust behavior |
|------|----------------|--------------------------|
| **Missing file** | Delete `students.csv`, run | `findAll()` returns empty; app re-seeds, no crash |
| **Empty file** | Create an empty `students.csv` | Returns empty list, no exception |
| **Header only** | File with just the header row | Returns empty list |
| **Malformed row** | Manually add `99,BadRow` (3 fields) | Row reported and skipped; others still load |
| **Bad number** | Add `x,Name,Prog,4.0` | Row reported and skipped (`NumberFormatException` caught) |
| **Trailing blank line** | Add an empty last line | Skipped via `isBlank()` |

---

## 7. Wrap-up

We turned plain text into a real data format, understood the quoting rule that trips
up nearly everyone, and — most importantly — learned to *architect* persistence by
pushing all file logic into a Repository, leaving the domain model pure. The
save-and-load application you built is the same pattern professional codebases use
before graduating to a database. You now hold the complete skill for the RAA: read
objects from files, write object state to files, handle I/O exceptions, close
resources safely, and keep the design clean.

### Exit ticket (hand in before leaving)
Answer briefly (3–5 lines total):
1. Why does a naive `line.split(",")` fail, and what is the CSV rule that fixes it?
2. State one concrete benefit of putting all file logic in a `Repository` class
   instead of inside `Student`.
3. In `findAll()`, why must we skip the first line, and how does the code do it?
