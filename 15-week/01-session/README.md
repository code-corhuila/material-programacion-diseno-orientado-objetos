# Week 15 - Session 1: Consolidation Review and Partial Exam (Corte 3)

> **Unit 3 - Practical application of OOP in Java**
> **RAA:** `90_82759`
> **Session type:** Review synthesis + summative individual assessment.

---

## 1. Session objective

Consolidate the integration of **exceptions, collections, and file persistence** on top of OOP foundations, and **demonstrate** that competence individually under exam conditions. By the end of the session the student will have reviewed the integration architecture through a worked example and completed the Corte 3 partial exam.

**Measurable targets for this session**

1. Correctly classify and explain exception, collection, and persistence choices in a review scenario.
2. Trace and predict the output of a small integrated program.
3. Score at least 60% on the partial exam (passing), with the class target being 4 of 5 items substantially correct.

---

## 2. Timed agenda

| Time | Block | What happens |
|------|-------|--------------|
| 0:00-0:15 | Warm-up | Rapid review Q&A; exam rules and integrity reminder. |
| 0:15-0:55 | Guided review | Integration architecture + worked example (below). |
| 0:55-1:05 | Break / setup | Environment check, clear desks, distribute exam. |
| 1:05-2:05 | **Partial exam** | Individual, timed, closed-notes (or one-page cheat sheet if allowed). |
| 2:05-2:20 | Wrap-up | Exit ticket + briefing on Session 2 defense format. |

---

## 3. Theory notes (review synthesis)

This is not new material; it is a **map** that shows how the term's pieces fit into one application. The mental model for Unit 3 is a **layered architecture** where each concern has a home.

### 3.1 The integration picture

```
              +-------------------------------------------+
              |                  UI layer                 |
              |  (console menu / input parsing / output)  |
              +---------------------+---------------------+
                                    | calls, catches domain exceptions
                                    v
              +-------------------------------------------+
              |               Service layer               |
              |  (use cases, validation, orchestration)   |
              +---------------------+---------------------+
                                    | uses collections in memory
                                    v
              +-------------------------------------------+
              |         Persistence layer (DAO)           |
              |  (read/write files, translate IO errors)  |
              +---------------------+---------------------+
                                    | reads/writes
                                    v
              +-------------------------------------------+
              |            Files on disk (data)           |
              +-------------------------------------------+

   Model (domain classes) flows through ALL layers:
   Student, Course, Enrollment ... encapsulated, polymorphic.
```

**Reading the diagram:**
- **Model** classes (plain domain objects) travel through every layer.
- **Collections** live mostly in the service layer and in the DAO's in-memory cache.
- **File I/O** is confined to the persistence layer.
- **Exceptions** are *born* low (an `IOException` in the DAO), *translated* into domain terms (a `RepositoryException`), and *handled* high (the UI shows a friendly message).

### 3.2 Exceptions - the review essentials

**Taxonomy.**

```
Throwable
 |-- Error                (do not catch: JVM-level, e.g. OutOfMemoryError)
 |-- Exception
      |-- RuntimeException (UNCHECKED: bugs -> NullPointer, IllegalArgument...)
      |-- (others)        (CHECKED: recoverable -> IOException, SQLException...)
```

- **Checked** = the compiler forces `throws` or `catch`. Use for conditions the caller can reasonably recover from (a file might be missing).
- **Unchecked** = programming errors. Do not catch to "hide" a bug; fix the bug.
- **`try`-with-resources** closes anything `AutoCloseable` automatically, in reverse order, even if an exception is thrown. Prefer it over `finally { close(); }`.
- **Exception translation** keeps layers decoupled: catch the low-level cause, throw a domain exception, and always **chain the cause** so the stack trace is preserved.

```java
// Exception translation with cause chaining
public List<Student> loadAll() throws RepositoryException {
    try (BufferedReader r = Files.newBufferedReader(path)) {
        // ... parse lines ...
    } catch (IOException e) {
        // Translate low-level IO into a domain-level failure, keep the cause.
        throw new RepositoryException("Could not load students from " + path, e);
    }
}
```

**Rules of thumb**
- Never write an empty `catch`. At minimum log or rethrow.
- Catch the most specific exception first; never `catch (Exception e)` just to silence the compiler.
- Validate arguments early and throw `IllegalArgumentException` (fail-fast).

### 3.3 Collections - choosing well

| Need | Interface | Common implementation | Why |
|------|-----------|-----------------------|-----|
| Ordered list, index access, duplicates OK | `List` | `ArrayList` | Fast random access. |
| Frequent insert/remove at ends | `List`/`Deque` | `LinkedList`/`ArrayDeque` | Cheap end operations. |
| Unique elements | `Set` | `HashSet` | O(1) membership, no order. |
| Unique + insertion order | `Set` | `LinkedHashSet` | Predictable iteration. |
| Unique + sorted | `Set` | `TreeSet` | Sorted by comparator. |
| Key -> value lookup | `Map` | `HashMap` | O(1) average lookup. |
| Key -> value, sorted keys | `Map` | `TreeMap` | Range queries, ordering. |

**Review reminders**
- Program to the **interface**: `List<Student> s = new ArrayList<>();`.
- Always parameterize with **generics**; raw types defeat compile-time safety.
- To use `HashSet`/`HashMap` keys correctly, override **both** `equals` and `hashCode` consistently.
- For custom sort order, provide a `Comparator` (or implement `Comparable`).

### 3.4 File persistence - the DAO pattern

The **DAO (Data Access Object)** / repository isolates *how* data is stored from *what* the domain does with it.

```
+------------------+        +--------------------------+
|  StudentService  |  --->  | StudentRepository (iface)|
+------------------+        +------------+-------------+
                                          ^
                                          | implements
                            +-------------+--------------+
                            |  CsvStudentRepository      |
                            |  (file I/O lives HERE only)|
                            +----------------------------+
```

- Human-readable formats (CSV/JSON) are easy to inspect and diff; **Java serialization** is compact but brittle across class changes.
- Use `try`-with-resources for every stream/reader/writer.
- Decide on a clear file lifecycle: what happens if the file is missing (create empty?), corrupt (fail loudly?), or locked?

---

## 4. Fully worked example

**Problem.** Build a tiny slice that integrates all three concerns: a `Student` model, a CSV repository that loads students and translates I/O errors, a service that indexes them in a `Map`, and a caller that handles failure gracefully.

### 4.1 Model

```java
public class Student {
    private final String id;      // encapsulated, immutable identity
    private final String name;
    private double average;

    public Student(String id, String name, double average) {
        if (id == null || id.isBlank())
            throw new IllegalArgumentException("id must not be blank"); // fail-fast
        this.id = id;
        this.name = name;
        this.average = average;
    }

    public String getId()      { return id; }
    public String getName()    { return name; }
    public double getAverage() { return average; }

    // equals/hashCode by identity so Student works as a Map value/Set element
    @Override public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof Student)) return false;
        return id.equals(((Student) o).id);
    }
    @Override public int hashCode() { return id.hashCode(); }

    @Override public String toString() {
        return "%s - %s (avg %.2f)".formatted(id, name, average);
    }
}
```

### 4.2 Domain exception + repository interface

```java
public class RepositoryException extends Exception {          // CHECKED domain error
    public RepositoryException(String message, Throwable cause) {
        super(message, cause);
    }
}

public interface StudentRepository {
    java.util.List<Student> findAll() throws RepositoryException;
}
```

### 4.3 CSV repository (file I/O + exception translation)

```java
import java.io.*;
import java.nio.file.*;
import java.util.*;

public class CsvStudentRepository implements StudentRepository {
    private final Path path;

    public CsvStudentRepository(Path path) { this.path = path; }

    @Override
    public List<Student> findAll() throws RepositoryException {
        List<Student> result = new ArrayList<>();          // program to interface
        try (BufferedReader reader = Files.newBufferedReader(path)) { // auto-close
            String line;
            int lineNo = 0;
            while ((line = reader.readLine()) != null) {
                lineNo++;
                if (line.isBlank()) continue;
                String[] parts = line.split(",");
                if (parts.length != 3)
                    throw new RepositoryException(
                        "Malformed record at line " + lineNo + ": " + line, null);
                result.add(new Student(
                        parts[0].trim(),
                        parts[1].trim(),
                        Double.parseDouble(parts[2].trim())));
            }
        } catch (NoSuchFileException e) {
            // Design choice: a missing file means "no students yet", not a crash.
            return List.of();
        } catch (IOException | NumberFormatException e) {
            throw new RepositoryException("Failed to read " + path, e); // translate + chain
        }
        return result;
    }
}
```

### 4.4 Service (collections in memory)

```java
import java.util.*;

public class StudentService {
    private final StudentRepository repo;

    public StudentService(StudentRepository repo) { this.repo = repo; } // dependency injection

    /** Returns an id -> Student index; enables O(1) lookup by id. */
    public Map<String, Student> indexById() throws RepositoryException {
        Map<String, Student> index = new HashMap<>();
        for (Student s : repo.findAll()) {
            index.put(s.getId(), s);          // last one wins on duplicate id
        }
        return index;
    }

    /** Honor-roll list, sorted by average descending. */
    public List<Student> honorRoll(double threshold) throws RepositoryException {
        List<Student> honors = new ArrayList<>();
        for (Student s : repo.findAll())
            if (s.getAverage() >= threshold) honors.add(s);
        honors.sort(Comparator.comparingDouble(Student::getAverage).reversed());
        return honors;
    }
}
```

### 4.5 Caller (handles failure at the top)

```java
import java.nio.file.*;
import java.util.*;

public class App {
    public static void main(String[] args) {
        StudentService service =
            new StudentService(new CsvStudentRepository(Paths.get("students.csv")));
        try {
            List<Student> honors = service.honorRoll(4.0);
            if (honors.isEmpty())
                System.out.println("No students on the honor roll yet.");
            else
                honors.forEach(System.out::println);
        } catch (RepositoryException e) {
            // Friendly message at the UI boundary; details preserved in the cause.
            System.err.println("Could not compute the honor roll: " + e.getMessage());
        }
    }
}
```

**What to notice (this is exactly what the defense will probe):**
- The `IOException` is **born** in the DAO, **translated** to `RepositoryException`, and **handled** in `main`. No layer leaks another layer's concerns.
- The service uses two collections deliberately: a `Map` for lookup, a sorted `List` for ranking.
- A missing file is a *designed* case (`return List.of()`), not an accident.
- Every reader is inside `try`-with-resources - no leaks.

---

## 5. Guided in-class practice (before the exam)

Work these in pairs on paper or in the IDE; instructor reveals answers after 12-15 minutes.

**P1 - Predict the output.** Given `students.csv` containing:

```
A1, Ana,   4.6
A2, Beto,  3.2
A3, Cira,  4.0
```

What does `App.main` print? *(Expected: two lines, Ana then Cira, sorted by average descending.)*

**P2 - Break it safely.** The file now has a bad row `A4, Deni, xx`. Trace what happens and name the exact exception class caught and the class rethrown. *(`NumberFormatException` -> translated to `RepositoryException`; `main` prints the friendly error.)*

**P3 - Refactor for a smell.** `indexById` silently drops duplicate ids ("last one wins"). Propose a change so a duplicate id throws a domain exception instead, and say which SOLID principle your change respects.

**P4 - Choose the collection.** You must guarantee unique students *and* iterate them in the order they were read. Which `Set` implementation and why? *(`LinkedHashSet`.)*

---

## 6. Partial exam - Corte 3 (individual, timed ~60 min)

> **Format:** Closed notes (or a single-page handwritten cheat sheet if the instructor allows). No internet, no AI tools. Points total 100. Passing = 60. Class target = 4 of 5 items substantially correct.
> **Integrity:** Any shared code or communication voids the exam. Cite nothing; this is your own reasoning.

### Item 1 - Conceptual (15 pts)

Explain the difference between **checked** and **unchecked** exceptions. Give one concrete example of each from Unit 3 and state when you would deliberately choose to define a **custom checked** exception versus letting an unchecked one propagate.

### Item 2 - Read and predict (20 pts)

Given a short program (provided on the exam sheet) that reads a file with `try`-with-resources and populates a `TreeMap`, (a) state the printed output, and (b) explain what changes if the input file does not exist and the code catches `NoSuchFileException` returning an empty map.

### Item 3 - Debug and fix (20 pts)

The provided method has three defects: an empty `catch` block, a raw-typed collection, and a resource that is never closed. Rewrite the method to (a) use `try`-with-resources, (b) use generics, and (c) translate the I/O error into a domain exception with cause chaining. Mark each fix with a comment.

### Item 4 - Design a collection strategy (20 pts)

You must store enrollments so that: lookups by student id are fast, each student appears once, and a report lists enrollments sorted by course code. Choose the collection type(s), justify each choice, and write the field declarations and the method signature that produces the sorted report.

### Item 5 - Write it (25 pts)

Write a complete `CsvCourseRepository` class implementing `interface CourseRepository { List<Course> findAll() throws RepositoryException; }`. Requirements: read a CSV of `code,title,credits`; use `try`-with-resources; treat a missing file as an empty result; translate any `IOException`/`NumberFormatException` into `RepositoryException` with the cause chained; skip blank lines; and reject malformed rows with a clear message. Assume a `Course(String code, String title, int credits)` constructor exists.

### Scoring rubric (per item)

| Band | Meaning |
|------|---------|
| Full | Correct, idiomatic, handles edge cases, clear. |
| Partial | Mostly correct; minor gaps (one missed edge case or small syntax slip). |
| Minimal | Right idea, significant gaps (e.g., no cause chaining, raw types). |
| None | Absent or fundamentally incorrect. |

---

## 7. Wrap-up and exit ticket

**Exit ticket (hand in one index card / one line each):**

1. One concept from Unit 3 I now feel confident about.
2. One concept I want to review before the defense.
3. The single design decision in my project I am most/least sure about.

**Briefing for Session 2.** Bring your project ready to run from a clean checkout, a one-command run instruction, and be ready to defend three design decisions in OOP terms. Read the Session 2 guide and the quality/maintainability rubric beforehand.

---

*Next: [Session 2 - Incremental-project delivery, defense, and feedback](../02-session/README.md).*
