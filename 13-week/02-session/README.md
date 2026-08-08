# Week 13 · Session 2 — CSV Persistence and the Repository Pattern

**Object-Oriented Programming and Design** · CORHUILA · Mechatronics Engineering
**Unit 3 — Practical application of OOP in Java** · Corte 3 · Week 13, Session 2 of 2

> Prerequisite: Session 1 (paths, streams, buffering, `IOException`, `try-with-resources`). This session turns those skills into an object persistence layer.

---

## 1. Session objective

By the end of this 3-hour session, the student will be able to **serialize a collection of Java objects to a `.csv` file and deserialize it back into objects**, defining a clean object↔text mapping (`toCsv()` / `fromCsv()`), isolating all file access in a **repository (DAO)** class, handling malformed data and I/O exceptions, and verifying a full **round-trip** (save → load → equal).

This serves weekly objectives **1, 2, 4, and 5** (read/write, design the persistence layer, build a save/load application).

---

## 2. Timed agenda (180 minutes)

| Time | Block | Activity |
|---|---|---|
| 0:00 – 0:10 | Recap | Quick review of Session 1; check practice Tasks A–D. |
| 0:10 – 0:35 | Theory I | The CSV format: header, records, delimiters; `split` / `join`; the naive-`split` traps. |
| 0:35 – 1:00 | Theory II | Object ↔ CSV mapping: `toCsv()` / `fromCsv()`; parsing and type conversion; validation. |
| 1:00 – 1:25 | Theory III | Separation of concerns: the **repository/DAO** pattern; why domain classes stay I/O-free. |
| 1:25 – 1:35 | — | Short break. |
| 1:35 – 2:15 | Worked example | Live-code `Product`, `ProductRepository.saveAll` / `loadAll`, and a round-trip in `main`. |
| 2:15 – 2:55 | Guided practice | Students add `Student` persistence + robust parsing + append-one + round-trip test. |
| 2:55 – 3:00 | Wrap-up | Exit ticket + bridge to the Corte 3 workshop and the optional GitHub activity. |

---

## 3. Theory notes

### 3.1 The CSV format

**CSV (Comma-Separated Values)** is the simplest widely-used tabular text format. It represents a table as lines of text:

- One **record** (row) per line.
- **Fields** (columns) separated by a **delimiter** — classically a comma, but semicolons are common in locales where the comma is the decimal separator.
- An optional **header** line naming the columns.

```
id,name,price,stock          ← header (column names)
1,Keyboard,79900.0,15        ← record 1
2,Mouse,45000.0,40           ← record 2
3,Monitor,899000.0,7         ← record 3
```

Each record maps one-to-one to an object of our domain class, and each field maps to an attribute. That correspondence is the whole idea of CSV persistence:

```
   CSV line                      Java object
   "2,Mouse,45000.0,40"   <──>   Product{id=2, name="Mouse",
                                          price=45000.0, stock=40}
        ▲   ▲     ▲   ▲                    ▲     ▲       ▲      ▲
       id name  price stock                └─────┴───────┴──────┘
      split(",")  →  fields                fields → constructor
```

### 3.2 The two primitive operations: `split` and `join`

Java strings give us exactly the two operations CSV needs:

```java
// Writing a record: join fields with the delimiter.
String line = String.join(",", "2", "Mouse", "45000.0", "40");   // "2,Mouse,45000.0,40"

// Reading a record: split a line into fields.
String[] fields = "2,Mouse,45000.0,40".split(",");                // ["2","Mouse","45000.0","40"]
int id       = Integer.parseInt(fields[0].strip());               // convert text → number
String name  = fields[1].strip();
double price = Double.parseDouble(fields[2].strip());
int stock    = Integer.parseInt(fields[3].strip());
```

Note the **type conversion**: everything in a file is text. Reading means *parsing* text into `int`, `double`, `LocalDate`, etc. — and parsing can fail (`NumberFormatException`), which we must anticipate.

### 3.3 The limits of naive `split(",")` — know them

A plain `split(",")` is fine for clean, controlled data (which is what we generate in this course), but it **breaks** on real-world CSV in two classic ways. You must be able to name them:

1. **Embedded delimiters.** A field that legitimately contains a comma — `"Mouse, wireless"` — would be split into two fake fields. Proper CSV escapes this by wrapping the field in quotes: `"Mouse, wireless"`. A plain `split` does not understand quotes.
2. **Empty trailing fields.** `"1,Keyboard,,".split(",")` drops trailing empties, giving a shorter array than expected — a lurking `ArrayIndexOutOfBoundsException`. Use `split(",", -1)` to keep them.

**Course policy:** we defend against these by (a) validating the field count on every line, (b) choosing a delimiter our data never contains (or sanitizing input), and (c) skipping/reporting malformed lines instead of crashing. For production, use a dedicated CSV library (e.g., Apache Commons CSV or OpenCSV) that handles quoting correctly — introduced as a reading, not required here.

### 3.4 Object ↔ CSV mapping: `toCsv()` and `fromCsv()`

We formalize the mapping with two symmetric operations on the domain class:

- **`toCsv()`** — an *instance* method that returns this object as one CSV line (serialization).
- **`fromCsv(String line)`** — a *static factory* method that parses a CSV line into a new object (deserialization).

Keeping the two together, side by side, makes the format self-documenting and makes the **round-trip** obvious: `Product.fromCsv(p.toCsv())` must reproduce `p`. This is the contract you will test.

### 3.5 Separation of concerns: the Repository / DAO pattern

A tempting shortcut is to put file code *inside* the `Product` class. Resist it. A domain class should model a product; it should not know about disks, encodings, or `IOException`. Mixing the two violates the **Single Responsibility Principle** and makes both harder to test and change.

The clean design puts all persistence in a dedicated **repository** (also called a **DAO — Data Access Object**):

```
        +-------------------+        uses         +-------------------------+
        |     Product       | <------------------ |    ProductRepository     |
        |-------------------|                     |--------------------------|
        | - id, name, ...   |   toCsv()/fromCsv() | + saveAll(List<Product>) |
        | + getters         | <-----------------> | + loadAll(): List<Product>|
        | + toCsv()         |                     | + append(Product)        |
        | + fromCsv(String) |                     |  (owns the Path & I/O)   |
        +-------------------+                     +-------------------------+
              DOMAIN                                     PERSISTENCE
        (no file code here)                        (all file code here)
```

Benefits: the domain class stays pure and testable; the storage mechanism can change (CSV today, database tomorrow) without touching `Product`; and every place that needs persistence goes through one well-tested class.

---

## 4. Fully worked example — persisting `Product` objects to CSV

Two classes: the domain `Product` (with the mapping methods) and the `ProductRepository` (with all file access). Then a `main` that proves the round-trip.

### 4.1 The domain class

```java
/**
 * Domain object. Knows how to represent itself as a CSV line and how to be
 * rebuilt from one, but contains NO file-access code.
 */
public class Product {
    private final int id;
    private final String name;
    private final double price;
    private final int stock;

    public Product(int id, String name, double price, int stock) {
        this.id = id;
        this.name = name;
        this.price = price;
        this.stock = stock;
    }

    public int getId()       { return id; }
    public String getName()  { return name; }
    public double getPrice() { return price; }
    public int getStock()    { return stock; }

    /** Serialization: this object -> one CSV line. */
    public String toCsv() {
        // Guard: reject a name containing the delimiter to keep parsing simple.
        if (name.contains(",")) {
            throw new IllegalArgumentException("Name must not contain a comma: " + name);
        }
        return String.join(",",
                String.valueOf(id), name,
                String.valueOf(price), String.valueOf(stock));
    }

    /** Deserialization: one CSV line -> a new object (static factory). */
    public static Product fromCsv(String line) {
        String[] f = line.split(",", -1);          // -1 keeps trailing empty fields
        if (f.length != 4) {
            throw new IllegalArgumentException("Expected 4 fields, got " + f.length + ": " + line);
        }
        int id       = Integer.parseInt(f[0].strip());
        String name  = f[1].strip();
        double price = Double.parseDouble(f[2].strip());
        int stock    = Integer.parseInt(f[3].strip());
        return new Product(id, name, price, stock);
    }

    @Override
    public String toString() {
        return "Product{id=%d, name='%s', price=%.2f, stock=%d}"
                .formatted(id, name, price, stock);
    }
}
```

### 4.2 The repository (all file access lives here)

```java
import java.io.BufferedWriter;
import java.io.IOException;
import java.io.UncheckedIOException;
import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.StandardOpenOption;
import java.util.ArrayList;
import java.util.List;

/**
 * Persistence layer for Product. Owns the file location and every I/O detail.
 * The rest of the application never touches files directly.
 */
public class ProductRepository {

    private static final String HEADER = "id,name,price,stock";
    private final Path file;

    public ProductRepository(Path file) {
        this.file = file;
    }

    /** Writes the whole list to disk, overwriting any previous content, with a header. */
    public void saveAll(List<Product> products) {
        List<String> lines = new ArrayList<>();
        lines.add(HEADER);
        for (Product p : products) {
            lines.add(p.toCsv());
        }
        try {
            // Files.write truncates by default (CREATE + TRUNCATE_EXISTING).
            Files.write(file, lines, StandardCharsets.UTF_8);
            System.out.println("Saved " + products.size() + " products to " + file);
        } catch (IOException e) {
            System.out.println("Could not save products: " + e.getMessage());
        }
    }

    /** Reads the whole file back into a list of objects; skips malformed lines. */
    public List<Product> loadAll() {
        List<Product> products = new ArrayList<>();
        try {
            List<String> lines = Files.readAllLines(file, StandardCharsets.UTF_8);
            for (int i = 0; i < lines.size(); i++) {
                String line = lines.get(i);
                if (i == 0 && line.startsWith("id")) continue;   // skip header
                if (line.isBlank()) continue;                    // skip empty lines
                try {
                    products.add(Product.fromCsv(line));
                } catch (IllegalArgumentException | NumberFormatException ex) {
                    // Robustness: report and skip the bad record, do not crash.
                    System.out.println("Skipping malformed line " + (i + 1) + ": " + ex.getMessage());
                }
            }
        } catch (java.nio.file.NoSuchFileException e) {
            System.out.println("No data file yet — returning an empty list.");
        } catch (IOException e) {
            System.out.println("Could not load products: " + e.getMessage());
        }
        return products;
    }

    /** Appends a single product, creating the file with a header if needed. */
    public void append(Product p) {
        try {
            boolean isNew = !Files.exists(file);
            try (BufferedWriter w = Files.newBufferedWriter(file, StandardCharsets.UTF_8,
                    StandardOpenOption.CREATE, StandardOpenOption.APPEND)) {
                if (isNew) { w.write(HEADER); w.newLine(); }
                w.write(p.toCsv());
                w.newLine();
            }
        } catch (IOException e) {
            throw new UncheckedIOException("Append failed for " + p, e);
        }
    }
}
```

### 4.3 The application — proving the round-trip

```java
import java.nio.file.Path;
import java.util.List;

public class InventoryApp {
    public static void main(String[] args) {
        ProductRepository repo = new ProductRepository(Path.of("products.csv"));

        // 1) Build objects in memory.
        List<Product> original = List.of(
                new Product(1, "Keyboard", 79900.0, 15),
                new Product(2, "Mouse", 45000.0, 40),
                new Product(3, "Monitor", 899000.0, 7));

        // 2) SAVE to disk.
        repo.saveAll(original);

        // 3) LOAD back into fresh objects.
        List<Product> loaded = repo.loadAll();

        // 4) VERIFY the round-trip.
        System.out.println("--- Loaded from disk ---");
        loaded.forEach(System.out::println);
        System.out.println("Round-trip count matches: " + (original.size() == loaded.size()));
    }
}
```

**Expected output:**

```
Saved 3 products to products.csv
--- Loaded from disk ---
Product{id=1, name='Keyboard', price=79900.00, stock=15}
Product{id=2, name='Mouse', price=45000.00, stock=40}
Product{id=3, name='Monitor', price=899000.00, stock=7}
Round-trip count matches: true
```

**Points to highlight while running it**

- Open `products.csv` in a text editor: it is human-readable, with the header on top — a real, inspectable data file.
- Manually corrupt one line (delete a field) and re-run: `loadAll` **reports and skips** that line instead of crashing. This is the robustness criterion made visible.
- Note that `Product` has zero file code and `ProductRepository` has zero business logic — the separation is clean and each class is independently testable.

---

## 5. Guided in-class practice

Work in pairs. Reuse the structure above.

**Task A — A new domain type.**
Create `Student` with fields `code` (int), `fullName` (String), `average` (double). Implement `toCsv()` and `fromCsv(String)` following the `Product` pattern, including the field-count guard and the no-comma guard on `fullName`.

**Task B — Its repository.**
Create `StudentRepository` with `saveAll`, `loadAll`, and `append`, mirroring `ProductRepository`. Header: `code,fullName,average`.

**Task C — Round-trip test.**
In a `main`, build a `List<Student>` of at least three students, `saveAll`, `loadAll`, print them, and assert the counts match. Then compare the first loaded student's fields to the original.

**Task D — Robust parsing.**
Add a line with a non-numeric average directly in the `.csv` file (e.g., `99,Ana Gómez,abc`) and confirm `loadAll` reports and skips it, returning only the valid students.

**Task E — Append and re-read.**
Call `append(new Student(...))` twice, then `loadAll`, and confirm the new students appear with the header still intact and not duplicated.

**Stretch goal (optional).**
Add `Optional<Student> findByCode(int code)` to the repository (load all, filter, return the first match). Discuss why returning `Optional` is better than returning `null`.

**Acceptance checks (self-verify):**

- [ ] `save → load` reproduces the same number of records, and field values match.
- [ ] Malformed lines are reported and skipped, never crashing `loadAll`.
- [ ] `append` preserves the header and existing records.
- [ ] `Student` contains no file code; `StudentRepository` contains no business logic.
- [ ] Every file operation uses UTF-8 and closes its resources (via `Files` helpers or `try-with-resources`).

---

## 6. Common pitfalls (troubleshooting)

| Symptom | Likely cause | Fix |
|---|---|---|
| `ArrayIndexOutOfBoundsException` while parsing | Trailing empty fields dropped by `split(",")` | Use `split(",", -1)` and validate `fields.length`. |
| `NumberFormatException` | A text field where a number was expected, or stray spaces | `strip()` before parsing; wrap the record in try/catch and skip. |
| A comma inside a name splits into extra fields | Naive CSV can't handle embedded delimiters | Guard against commas in `toCsv()`, or use a CSV library. |
| Header parsed as a data record | Forgot to skip line 0 | Skip the first line when it starts with the header key. |
| Duplicated header after `append` | Wrote the header on every append | Write the header only when the file did not previously exist. |
| Numbers change (`79900.0` vs `79900`) after round-trip | Formatting/locale of `Double.toString` | Acceptable here; for exact control, format explicitly with `Locale.ROOT`. |

---

## 7. Wrap-up and exit ticket

**One-sentence summary:** *A CSV persistence layer maps each object to a line via `toCsv()`/`fromCsv()`, keeps all file access inside a repository so domain classes stay pure, and is proven correct by a save→load round-trip that also survives malformed input.*

**Exit ticket (submit before leaving — 5 minutes):**

1. Why do we place file code in `ProductRepository` instead of inside `Product`? Name the principle.
2. Give one concrete input that breaks a naive `split(",")` and say how you would detect or prevent it.
3. What does a successful "round-trip" prove about your persistence layer?

**Bridge to assessment:** These two sessions are exactly the skills evaluated in the Corte 3 **persistence workshop** and reinforced by the **optional GitHub activity** in [`../optional-activity/README.md`](../optional-activity/README.md). Bring your `ProductRepository`/`StudentRepository` — you will extend them.

**Autonomous work (approx. 4 h):** complete Tasks A–E; attempt the stretch goal; start the optional activity; review the readings in [`../material/README.md`](../material/README.md).
