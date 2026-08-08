# Week 12 — Optional Activity: "Mini-Store Inventory with Collections"

**Course:** Object-Oriented Programming and Design (2026-B) · **Unit 3** · **Corte 3**
**Topic:** Collections and data structures — `List`, `Map`, `Set`
**RAA:** 90_82759
**Type:** Optional graded enrichment · **Individual** · **Estimated time:** 3–4 hours
**Submission channel:** **GitHub repository** (NOT Moodle)

> This activity is **optional** but **graded**. It lets you consolidate the week's outcomes
> by building a slightly larger program than the in-class demo and by submitting it the way
> professional developers do — through a public Git repository.

---

## 1. Problem statement

You will build a **command-oriented mini-store inventory** in Java that manages a catalog of
products. The program must use **all three** collection families intentionally, each where it
genuinely fits:

- a **`Map`** to store and retrieve products by their unique code,
- a **`Set`** to enforce/track uniqueness (e.g., the set of distinct categories),
- a **`List`** where order or duplicates are meaningful (e.g., a chronological sale log).

The point is not size — it is **choosing the right structure for each job** and justifying
that choice.

---

## 2. Domain model (required)

Create at least these classes:

### `Product`
- Fields: `String code` (unique, immutable identity), `String name`, `String category`,
  `double price`, `int quantity`.
- Override `equals` and `hashCode` based on `code`.
- Override `toString` for readable output.

### `Inventory`
Encapsulates a **`private final Map<String, Product>`** and exposes:

| Method | Behavior |
|---|---|
| `boolean add(Product p)` | add; reject a duplicate code (return `false`) |
| `Product findByCode(String code)` | return the product or `null` |
| `boolean restock(String code, int amount)` | increase quantity; validate `amount > 0` |
| `boolean sell(String code, int amount)` | decrease quantity; reject if insufficient stock |
| `boolean remove(String code)` | remove a product |
| `List<Product> lowStock(int threshold)` | products with `quantity <= threshold` |
| `Set<String> categories()` | the **distinct** categories present |
| `double totalInventoryValue()` | sum of `price * quantity` over all products |
| `List<Product> sortedByName()` | all products, sorted alphabetically by name |

### `SaleLog` (uses a `List`)
- Keeps a **chronological `List`** of sale records (code + amount + timestamp string).
  Duplicates are allowed and order matters — hence a `List`, not a `Set`.
- Method `List<String> history()` returns the log lines in order.

### `StoreApp` (driver)
- A `main` method that demonstrates every operation above with printed output.
  A menu/console loop is welcome but not required — a scripted `main` is acceptable.

---

## 3. Functional requirements

1. Seed the inventory with **at least 6 products across at least 3 categories**.
2. Demonstrate a **rejected duplicate** `add` (same code).
3. Perform at least **two sales** (one that succeeds, one rejected for insufficient stock)
   and record the successful ones in the `SaleLog`.
4. Perform at least **one restock**.
5. Print: the full catalog **sorted by name**, the **distinct categories** (`Set`), a
   **low-stock report**, the **total inventory value**, and the **sale history**.
6. **No raw types** — every collection must be generic (`Map<String, Product>`, etc.).
7. **No crashes** on missing keys — guard with `getOrDefault`/`containsKey` as needed.

---

## 4. Non-functional / quality requirements

- Meaningful names; each method does one thing.
- The `Map`/`List`/`Set` fields are `private`; callers use domain methods, not raw
  collection calls.
- Consistent formatting; no compiler warnings.
- A short `README.md` in your repo (see deliverable) explaining **why** you chose each
  collection type.

---

## 5. Expected deliverable

A **public GitHub repository** containing:

```
mini-store-inventory/
├── src/
│   ├── Product.java
│   ├── Inventory.java
│   ├── SaleLog.java
│   └── StoreApp.java
├── README.md          <- see required content below
└── .gitignore         <- ignore /out, /bin, *.class, IDE folders
```

**Repository `README.md` must include:**
1. Your full name and the course/week.
2. How to compile and run (`javac`/`java` commands, or IDE steps).
3. A **"Design decisions"** section: for each of `List`, `Set`, and `Map`, one or two
   sentences on *why* you used it where you did.
4. A short sample of the program's console output (paste it in a code block).

---

## 6. How to submit via GitHub (step by step)

> **Do NOT submit on Moodle.** Submission is the **URL of your public repository**, pasted
> in the space the instructor indicates (or emailed if instructed).

1. Create a **free GitHub account** if you don't have one (github.com).
2. Create a **new public repository** named `mini-store-inventory`.
3. On your machine, initialize and push:

   ```bash
   git init
   git add .
   git commit -m "Week 12: mini-store inventory with List, Set, Map"
   git branch -M main
   git remote add origin https://github.com/<your-username>/mini-store-inventory.git
   git push -u origin main
   ```

4. Make **at least 3 meaningful commits** as you build (not one giant commit) — this shows
   your work progressing.
5. Verify the repo is **public** and that the code is visible in the browser.
6. **Submit the repository URL** (e.g., `https://github.com/<your-username>/mini-store-inventory`).

**Deadline:** end of Week 12 (Corte 3). Late submissions per the course's general late policy.

---

## 7. Assessment criteria / rubric (100 points)

| Criterion | Excellent (full) | Acceptable (partial) | Missing (0) | Weight |
|---|---|---|---|---|
| **Correct use of `Map`** (store/retrieve by key, guards) | Encapsulated `HashMap`, all ops correct, no null crashes | Works but exposes the map or misses a guard | Not used / incorrect | 20 |
| **Correct use of `Set`** (distinct categories) | Distinct categories via a `Set`, justified | Present but with a duplicate-handling flaw | Not used | 15 |
| **Correct use of `List`** (ordered sale log) | Ordered log, duplicates allowed, iterated correctly | Present but order/semantics unclear | Not used | 15 |
| **`equals`/`hashCode`** on `Product` | Both overridden on `code`, consistent | Only one overridden / inconsistent | Neither | 15 |
| **Encapsulation & API design** | Private fields, domain methods, invariants protected | Some leakage of internal collections | Public raw collections | 10 |
| **Functional completeness** (all §3 requirements) | All demonstrated with output | Most demonstrated | Few/none | 10 |
| **Code quality** (naming, no raw types, no warnings) | Clean, generic, warning-free | Minor issues | Raw types / messy | 5 |
| **Repo README & design rationale** | Clear run steps + justified choices + sample output | Partial | Missing | 5 |
| **Git usage** (public repo, ≥3 meaningful commits) | Public, clear history | Public, single commit | Not accessible | 5 |

**Total: 100 points.**

---

## 8. Starter hints

- Reuse the `Product` and `Inventory` skeletons from
  [`../02-session/README.md`](../02-session/README.md) and extend them.
- For `categories()`, build a `Set<String>` and add each product's category — duplicates
  collapse automatically.
- For `sortedByName()`, copy the values into a `List` and sort with a comparator:

  ```java
  List<Product> list = new ArrayList<>(products.values());
  list.sort(Comparator.comparing(Product::getName));
  return list;
  ```

- For `totalInventoryValue()`, iterate `values()` and accumulate `price * quantity`.
- Test each method from `StoreApp` right after you write it — small, frequent checks beat
  one big debugging session at the end.

---

## 9. Academic integrity

Write your own code. You may consult the official Java documentation and the course
materials. Do **not** copy another student's repository. Cite any external snippet you adapt
in your repo `README.md`. Identical submissions will be treated per the institution's
academic integrity policy.
