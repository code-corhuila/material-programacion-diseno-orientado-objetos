# Week 12 - Optional activity: Command-line Inventory Manager

> **Subject:** Object-Oriented Programming and Design (2026-B)
> **Unit 3 - Practical application of OOP in Java · Corte 3**
> **Topic:** Collections and data structures — `List`, `Map`, `Set`
> **Modality:** Optional practice · **Submission channel: GitHub (NOT Moodle)**

---

## 1. Purpose

This optional challenge lets you consolidate the week's learning outcome
(**RAA `90_82759`**) by turning the in-class `Inventory` prototype into a small but complete
**command-line application**. It rewards clean use of collections, correct
`equals()`/`hashCode()`, and good encapsulation. It is optional but strongly recommended:
it is the best possible preparation for the corte-3 practical assessment.

---

## 2. Problem statement

Build a **console-based Inventory Manager** for a small shop. The program keeps an
in-memory catalog of products and lets a user manage stock through a text menu. All product
storage must use the **Java Collections Framework** — specifically a
`HashMap<String, Product>` keyed by product code, with `List` and/or `Set` used where
appropriate for reports.

The application runs in a loop, showing a menu and reacting to the user's choice until they
choose to exit.

---

## 3. Functional requirements

Your program must support **at least** the following operations:

1. **Add product** — read code, name, category, price, quantity; reject a duplicate code.
2. **Remove product** — by code; report whether anything was removed.
3. **Find product** — by code; print its details or a "not found" message.
4. **Update quantity** — restock (+) or record a sale (−); never allow negative stock.
5. **List all products** — printed in a readable, aligned table.
6. **Report: total inventory value** — sum of `price * quantity` across all products.
7. **Report: products by category** — a `Map<String, List<Product>>` or a
   `Map<String, Integer>` count per category.
8. **Report: low stock** — all products below a user-supplied threshold.
9. **Exit** — leave the loop cleanly.

**Data model requirements**

- A `Product` class with `code`, `name`, `category`, `price`, `quantity`; sensible
  constructor, getters, a controlled `setQuantity`, and a `toString()`.
- `Product` must override `equals()` and `hashCode()` based on `code`.
- An `Inventory` class that **encapsulates** a `private Map<String, Product>` and exposes
  the operations above through clean methods. The raw map must never be returned directly
  (return a defensive copy or an unmodifiable view).

**Quality requirements**

- Handle invalid input gracefully (non-numeric price/quantity, unknown code, empty catalog)
  without crashing.
- No `NullPointerException` from `map.get` on a missing key — use `containsKey` /
  `getOrDefault` / `Optional`.
- Meaningful class and method names; no dead code; no `System.out.println` debugging left in.

**Stretch goals (optional, for extra polish — not required to pass)**

- Persist the catalog to a text/CSV file on exit and reload it on start.
- Add a "most valuable product" report using Streams.
- Add simple JUnit tests for `Inventory` (add/remove/update/find).

---

## 4. Expected deliverable

A **public GitHub repository** containing:

```
inventory-manager/
├── src/
│   ├── Product.java
│   ├── Inventory.java
│   └── Main.java          (the menu loop / entry point)
├── README.md              (see required contents below)
└── (optional) tests/ or a /test folder with JUnit tests
```

Your repository `README.md` must include:
- A one-paragraph description of the app.
- **How to compile and run** it (e.g., `javac src/*.java -d out` then `java -cp out Main`).
- A short **sample session** (copy-pasted console interaction).
- A brief **design note**: which collection you used where, and **why** (this is where you
  demonstrate the "select the appropriate collection" objective).

---

## 5. How to submit (GitHub — not Moodle)

> This activity is **not** submitted through Moodle. Follow these steps exactly.

1. Create a **new public repository** named `inventory-manager` (or similar) on your GitHub
   account.
2. Initialize it locally and commit your work in **meaningful commits** (not a single
   "final" commit). Example commit messages: `feat: add Product with equals/hashCode`,
   `feat: HashMap-backed Inventory`, `feat: menu loop and reports`.
3. Push to GitHub:
   ```bash
   git init
   git add .
   git commit -m "feat: initial inventory manager"
   git branch -M main
   git remote add origin https://github.com/<your-username>/inventory-manager.git
   git push -u origin main
   ```
4. Make sure the repository is **public** (or add the instructor as a collaborator if you
   keep it private).
5. **Submit the repository URL** through the channel the instructor announced for GitHub
   links (course forum / shared spreadsheet), **not** through a Moodle assignment box.
6. Include your **full name and student code** in the repository `README.md` so your
   submission can be identified.

> **Academic integrity:** the work must be your own. You may consult the Javadoc and the
> course material, but copying another student's repository is plagiarism. Commit history
> that shows your incremental work is your best evidence of authorship.

---

## 6. Assessment criteria / rubric (100 points)

| Criterion | Excellent | Acceptable | Insufficient | Pts |
|-----------|-----------|------------|--------------|-----|
| **Correct collection choice** — `HashMap` for lookup by code; `List`/`Set` used appropriately for reports, with justification in the README | Right structures everywhere, clearly justified (20) | Mostly right, thin justification (12) | Wrong structure or no rationale (0–6) | 20 |
| **`Product` correctness** — fields, encapsulation, `equals`/`hashCode` on `code`, controlled `setQuantity` | Complete and correct (15) | Minor gaps (9) | Missing `equals`/`hashCode` or broken invariants (0–5) | 15 |
| **`Inventory` encapsulation & API** — map is private, defensive copies/Optional, clean methods | Fully encapsulated, safe API (20) | Mostly encapsulated (12) | Map leaked or unsafe (0–6) | 20 |
| **Functionality** — all 9 menu operations work as specified | All work (20) | 6–8 work (12) | ≤5 work (0–6) | 20 |
| **Robustness** — graceful handling of bad input, missing keys, empty catalog | No crashes, clear messages (10) | Handles most cases (6) | Crashes on common input (0–3) | 10 |
| **Code quality & README** — naming, structure, run instructions, sample session, design note | Professional, complete README (10) | Runs, sparse README (6) | Poor/missing docs (0–3) | 10 |
| **Git hygiene** — meaningful, incremental commits; public repo | Clear history (5) | One or two commits (3) | Single dump / not accessible (0–1) | 5 |
| **TOTAL** | | | | **100** |

**Stretch goals** may earn up to **+5 bonus** at the instructor's discretion, but the score
is capped at 100.

---

## 7. Self-check before you submit

- [ ] `Product` overrides `equals()` and `hashCode()` on `code`.
- [ ] `Inventory` keeps its `Map` private and never returns it directly.
- [ ] All 9 menu operations run without crashing on normal use.
- [ ] Invalid input (bad number, unknown code, empty catalog) is handled with a message.
- [ ] The program compiles from a clean checkout using the README instructions.
- [ ] The README explains *which collection and why* for each use.
- [ ] Commit history shows incremental work; repo is public/accessible.
- [ ] Repository URL submitted through the GitHub channel (not Moodle).

---

*Optional practice designed for CORHUILA — Object-Oriented Programming and Design (2026-B), Unit 3, Week 12, Corte 3.*
