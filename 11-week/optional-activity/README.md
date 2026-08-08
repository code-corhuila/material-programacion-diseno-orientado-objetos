# Week 11 - Optional Activity: "Robust Inventory Manager" (Submitted via GitHub)

**Course:** Object-Oriented Programming and Design (2026-B)
**Unit 3 - Practical application of OOP in Java**
**Topic:** Error and exception handling with `try`, `catch`, `throw`, `throws`, `finally`
**Corte 3** | **Type:** Optional (extra credit toward the RAA)

> **Submission channel:** **GitHub**, *not* Moodle. You will create a public repository,
> push your code, and submit the repository **URL** where the instructor indicates. See
> Section 6 for exact steps.

---

## 1. Purpose

This activity lets you demonstrate all five weekly objectives in a single, self-contained
program. You will build a small console **Inventory Manager** that refuses to crash: it
validates every input, uses `try`/`catch`/`finally` and try-with-resources, propagates
checked exceptions with `throws`, and defines a custom exception hierarchy for the
inventory domain.

---

## 2. Problem Statement

A small shop keeps its products in a plain-text file. Each line has the format:

```
<sku>,<name>,<quantity>,<unitPrice>
```

Example `inventory.csv`:

```
A100,USB Cable,50,3.99
A101,HDMI Cable,20,7.50
A102,Wireless Mouse,-4,12.00
A103,Keyboard,15,not_a_number
A104,Monitor,8
```

Your program must **load** this file, **validate** every record, **skip and report** any
malformed record without crashing, and then support a few operations (add stock, remove
stock, look up a product) that **throw meaningful custom exceptions** when misused.

Note that the sample data is intentionally dirty: line 3 has a negative quantity, line 4
has a non-numeric price, and line 5 is missing a field. A robust program handles all of
these gracefully.

---

## 3. Requirements

### 3.1 Domain model
- A `Product` class with fields `sku` (String), `name` (String), `quantity` (int),
  `unitPrice` (double), with validation in its constructor (quantity ≥ 0, unitPrice ≥ 0,
  non-blank sku/name).

### 3.2 Custom exception hierarchy (Objective 3)
Create a base exception and at least **three** specific subclasses, for example:

```
InventoryException                (base, extends Exception)
├── MalformedRecordException      (a CSV line cannot be parsed into a Product)
├── ProductNotFoundException      (lookup by SKU fails)
└── InsufficientStockException    (removing more units than available)
```

- Each must provide a `(String)` and a `(String, Throwable)` constructor.
- At least one must carry **domain data** (e.g., `InsufficientStockException` exposes the
  requested and available quantities).

### 3.3 Loading & parsing (Objectives 1, 2, 4)
- `List<Product> load(String path) throws IOException` — open the file with
  **try-with-resources** (`BufferedReader`).
- For each line, attempt to parse a `Product`. If a line is malformed (wrong field count,
  non-numeric quantity/price, negative values), **catch** the parsing problem, **translate**
  it into a `MalformedRecordException` (preserving the cause where one exists), report it to
  the console, and **continue** with the next line — one bad line must not abort the load.
- Declare `IOException` with `throws` and let it propagate to `main`, where it is handled.

### 3.4 Operations (Objectives 2, 3)
Implement, in an `InventoryService`:
- `Product findBySku(String sku) throws ProductNotFoundException`
- `void addStock(String sku, int units) throws ProductNotFoundException, IllegalArgumentException`
  (reject `units <= 0` with `IllegalArgumentException` — a programming-error precondition,
  so **unchecked** is appropriate: justify this choice in your README).
- `void removeStock(String sku, int units) throws ProductNotFoundException, InsufficientStockException`

### 3.5 `main` driver (Objective 1)
- Call `load`, print the successfully loaded products and a count of skipped malformed lines.
- Exercise each operation at least once in a **success** path and at least once in a
  **failure** path, handling each exception with a clear message.
- Include a `finally` block somewhere that prints a final status line, demonstrating the
  guarantee.

### 3.6 Documentation & reflection (Objective 5)
Your repository `README.md` must include a short section (150-250 words) arguing **why
correct exception handling was essential** for making *this specific program* robust, citing
at least two concrete problems it prevented (e.g., a single bad CSV line crashing the whole
load).

### 3.7 Constraints
- Standard library only (no external dependencies).
- Java 11+.
- The program must **never** terminate with an unhandled exception on the provided dirty
  sample data.
- No empty `catch` blocks; every caught exception is either handled meaningfully or
  re-thrown with context.

---

## 4. Expected Deliverable

A public GitHub repository containing:

```
robust-inventory-manager/
├── src/
│   ├── Product.java
│   ├── InventoryException.java
│   ├── MalformedRecordException.java
│   ├── ProductNotFoundException.java
│   ├── InsufficientStockException.java
│   ├── InventoryService.java
│   └── InventoryApp.java          (contains main)
├── data/
│   └── inventory.csv              (include the dirty sample above)
└── README.md                      (build/run instructions + the reflection from 3.6)
```

The repository `README.md` must explain **how to compile and run** the program, for example:

```bash
# from the repository root
javac -d out src/*.java
java -cp out InventoryApp data/inventory.csv
```

### Expected runtime behavior (illustrative)

```
Loaded 3 product(s). Skipped 2 malformed line(s):
  - Line 3 (A102): quantity must be >= 0, was -4
  - Line 4 (A103): unit price is not a number: "not_a_number"
Lookup A101 -> HDMI Cable (qty 20)
Remove 5 from A101 -> ok (qty now 15)
Remove 999 from A101 -> InsufficientStockException: requested 999, available 15
Lookup Z999 -> ProductNotFoundException: no product with SKU Z999
Inventory session finished. (finally)
```

---

## 5. Assessment Criteria / Rubric (100 points)

| Criterion | Excellent (full) | Acceptable (partial) | Missing (0) | Pts |
|---|---|---|---|---|
| **Custom exception hierarchy** (Obj. 3) | Base + 3 specific types, correct super constructors, at least one carries domain data, sensible checked/unchecked choices. | Hierarchy present but shallow or missing domain data / constructors. | No custom exceptions. | 20 |
| **`try`/`catch`/`finally` usage** (Obj. 1) | Specific catches, correct ordering, a meaningful `finally`, no swallowed exceptions. | Works but over-broad catches or trivial `finally`. | Absent or crashes. | 20 |
| **Checked vs. unchecked + `throws`** (Obj. 2) | Correct classification, `throws` used to propagate, choices justified in README. | Mostly correct, weak justification. | Misused or absent. | 15 |
| **`throw` + exception translation** (Obj. 2/3) | Fail-fast throws for preconditions; malformed lines translated with cause preserved. | Throws present but cause dropped or no translation. | Absent. | 15 |
| **Robustness on dirty data** (all) | Never crashes; every malformed line reported and skipped; success + failure paths shown. | Handles most cases; one unhandled edge. | Crashes on sample data. | 15 |
| **`try`-with-resources** (Obj. 4) | Used for file reading; no manual close. | Manual `finally` close that works. | Resource leak / not used. | 5 |
| **Reflection / argument** (Obj. 5) | 150-250 words, ≥2 concrete robustness reasons tied to this program. | Present but generic or too short. | Missing. | 5 |
| **Code quality & README** | Clear names, comments where useful, runnable build/run instructions. | Minor gaps. | Unreadable / won't build. | 5 |

**Passing bar for extra credit:** ≥ 70/100 **and** the program runs without an unhandled
exception on the provided sample data.

---

## 6. How to Submit via GitHub (step by step)

> Reminder: this activity is **not** submitted on Moodle. You submit a **GitHub repository
> URL**.

1. **Create the repository** on GitHub named `robust-inventory-manager` (public).
2. **Clone it** locally:
   ```bash
   git clone https://github.com/<your-username>/robust-inventory-manager.git
   cd robust-inventory-manager
   ```
3. Add your `src/`, `data/`, and `README.md` following the structure in Section 4.
4. **Commit and push:**
   ```bash
   git add .
   git commit -m "Week 11: robust inventory manager with exception handling"
   git push origin main
   ```
5. **Verify** the code is visible on github.com and that the build/run instructions in your
   README actually work from a fresh clone.
6. **Submit the repository URL** where the instructor indicates (course announcement / the
   designated link). Include your full name in the repository README.

### Good-practice tips
- Make **small, meaningful commits** (e.g., "add custom exception hierarchy", "add
  try-with-resources loader") rather than one giant commit — commit history is part of
  showing your process.
- Add a `.gitignore` that excludes the `out/` (compiled classes) directory.
- Do **not** commit secrets or unrelated files.

---

## 7. Academic Integrity

Submit your **own** work. You may discuss ideas and read the course materials, but the code
and the reflection must be yours. Cite any external snippet you adapt (a comment with the
source URL is enough). Presenting copied or AI-generated code as your own violates the
course integrity policy and forfeits the extra credit.

---

## 8. Self-check before you submit

- [ ] Program runs on the dirty sample data **without any unhandled exception**.
- [ ] Base exception + at least three specific subclasses, with proper constructors.
- [ ] At least one custom exception carries domain data and is used by a handler.
- [ ] File reading uses **try-with-resources**.
- [ ] Malformed lines are **translated, reported, and skipped** (cause preserved).
- [ ] `throws` is used to propagate checked exceptions to `main`.
- [ ] A `finally` block demonstrably runs on both success and failure.
- [ ] README has build/run instructions **and** the 150-250 word robustness reflection.
- [ ] Repository is public and the URL has been submitted.
