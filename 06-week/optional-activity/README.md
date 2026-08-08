# Week 06 - Optional Activity

## Build a small class hierarchy with `extends` and `super()`

**Course:** Object-Oriented Programming and Design | **Unit 2** - Design principles and modularity
**Assessment period:** Corte 2 | **Submission channel:** GitHub (NOT Moodle)

---

> **This activity is optional.** It gives you extra practice and bonus recognition toward Corte 2 according to the rubric below. It is **submitted through GitHub**, not through Moodle. If you have never used GitHub, follow Section 5 step by step.

---

## 1. Problem statement

A small library wants to model the items it lends. Every **library item** has a title and a unique catalog code, and can be checked out and returned. The library lends two specialized kinds of items:

- A **Book**, which additionally has an author and a number of pages.
- A **DVD**, which additionally has a duration in minutes and an age rating.

The library also wants a clear, per-item description. Books and DVDs describe themselves slightly differently, but the common part (title + code) must **not** be duplicated.

Your job is to model this with **single inheritance** so that the shared state and behavior live in a parent class and each specialized item reuses the parent through `super(...)` and `super.method()`.

---

## 2. Requirements

Implement the following in Java.

### 2.1 Parent class `LibraryItem`

- `protected` fields: `title` (String), `catalogCode` (String), and `checkedOut` (boolean, starts `false`).
- Constructor `LibraryItem(String title, String catalogCode)` that sets the two fields (leave `checkedOut` as `false`).
- `void checkOut()` - if the item is already checked out, print `"<title> is already out"`; otherwise set `checkedOut = true` and print `"<title> checked out"`.
- `void returnItem()` - if the item is not checked out, print `"<title> was not out"`; otherwise set `checkedOut = false` and print `"<title> returned"`.
- `String describe()` - returns `"[<catalogCode>] <title>"`.

### 2.2 Subclass `Book extends LibraryItem`

- `private` fields: `author` (String), `pages` (int).
- Constructor `Book(String title, String catalogCode, String author, int pages)` that calls `super(title, catalogCode)` **as its first statement**, then sets the new fields.
- **Override** `describe()` so it returns the parent description **plus** ` - Book by <author>, <pages>p`. You **must reuse** `super.describe()` (do not retype the `[code] title` part). Use `@Override`.

### 2.3 Subclass `DVD extends LibraryItem`

- `private` fields: `minutes` (int), `rating` (String).
- Constructor `DVD(String title, String catalogCode, int minutes, String rating)` that calls `super(title, catalogCode)` first, then sets the new fields.
- **Override** `describe()` so it returns the parent description **plus** ` - DVD, <minutes> min, rated <rating>`, reusing `super.describe()`. Use `@Override`.

### 2.4 Driver class `Library` with `main`

- Create at least one `Book` and one `DVD`.
- Print each item's `describe()`.
- Check out an item, try to check it out again (to show the "already out" branch), then return it.

### 2.5 Constraints (these are graded)

- **No duplicated code:** `title`/`catalogCode` must be declared and initialized **only** in `LibraryItem`. The `describe()` prefix must come from `super.describe()`.
- Every override must carry the `@Override` annotation.
- Every subclass constructor's **first statement** must be `super(...)`.
- The program must **compile and run** with no errors.

---

## 3. Expected deliverable

A GitHub repository (or a folder inside your course repository) containing:

```
week06-library/
├── LibraryItem.java
├── Book.java
├── DVD.java
├── Library.java
└── README.md        (short: how to compile & run, plus a sample of the output)
```

### Expected output (yours may differ slightly in the values you choose):

```
[B-001] Clean Code - Book by Robert C. Martin, 464p
[D-014] Interstellar - DVD, 169 min, rated PG-13
Clean Code checked out
Clean Code is already out
Clean Code returned
```

Your `README.md` in the repo should include the exact commands to build and run, for example:

```
javac *.java
java Library
```

---

## 4. Reference UML sketch (for your design)

```
                +-----------------------+
                |     LibraryItem       |
                +-----------------------+
                | # title : String      |
                | # catalogCode : String|
                | # checkedOut : boolean |
                +-----------------------+
                | + checkOut()          |
                | + returnItem()        |
                | + describe() : String |
                +-----------------------+
                          ^  extends
              +-----------+-----------+
              |                       |
   +----------------------+  +----------------------+
   |         Book         |  |          DVD         |
   +----------------------+  +----------------------+
   | - author : String    |  | - minutes : int      |
   | - pages : int        |  | - rating : String    |
   +----------------------+  +----------------------+
   | + describe() : String |  | + describe() : String |
   +----------------------+  +----------------------+

   (#) protected   (-) private   (+) public
```

---

## 5. How to submit via GitHub (step by step)

> **Reminder:** submission is on **GitHub**, not Moodle. Do not upload a `.zip` to Moodle for this activity.

1. **Create a repository.** On GitHub, click *New repository*. Name it `oop-week06-library` (or add the code to your existing course repo under a `week06-library/` folder). Make it **public** or add the instructor as a collaborator if it is private.
2. **Clone it locally.**
   ```
   git clone https://github.com/<your-username>/oop-week06-library.git
   cd oop-week06-library
   ```
3. **Add your files** (`LibraryItem.java`, `Book.java`, `DVD.java`, `Library.java`, `README.md`).
4. **Verify it compiles and runs** before committing:
   ```
   javac *.java
   java Library
   ```
5. **Commit with clear messages.**
   ```
   git add .
   git commit -m "Week 06: LibraryItem hierarchy with extends and super()"
   ```
6. **Push.**
   ```
   git push origin main
   ```
7. **Submit the link.** Paste your repository URL where the instructor requested (course channel / assignment link). Make sure the repo is accessible.

**Good practice:** make at least two meaningful commits (e.g., "add parent class", then "add Book and DVD subclasses") so your history shows incremental work. Include a `.gitignore` that ignores compiled `*.class` files.

---

## 6. Assessment criteria / rubric

Total: **100 points** (this optional activity contributes bonus recognition toward Corte 2).

| Criterion | Excellent (full) | Acceptable (partial) | Missing (0) | Points |
|---|---|---|---|:---:|
| **Correct "is-a" modeling** - `Book` and `DVD` extend `LibraryItem`; shared state lives only in the parent | Both subclasses extend the parent; no duplicated fields | One subclass correct, or minor duplication | No inheritance used | 20 |
| **Constructor chaining with `super(...)`** - first statement, correct arguments | Both constructors chain correctly | One correct, or `super` not first | No `super(...)` | 20 |
| **Reuse via `super.method()`** - `describe()` reuses the parent, no retyped prefix | Both overrides call `super.describe()` | One reuses, one retypes | Prefix duplicated in children | 20 |
| **Overriding done right** - `@Override` present, correct signatures | `@Override` on both, correct | Missing on one | No overriding | 15 |
| **Compiles & runs, output matches spec** | Compiles, runs, output as specified | Compiles with warnings / minor output diff | Does not compile | 15 |
| **GitHub delivery quality** - clear commits, README with build/run steps, `.gitignore` | Clean history + complete README | Repo present but thin README/history | Not on GitHub / inaccessible | 10 |

**Bonus (up to +5):** add a third subclass (e.g., `Magazine`) that also reuses `super.describe()`, demonstrating that the parent's behavior scales to new items with no duplication.

### Self-check before you submit

- [ ] `title`/`catalogCode` appear **only** in `LibraryItem`.
- [ ] Each subclass constructor starts with `super(...)`.
- [ ] Each `describe()` override uses `super.describe()` and `@Override`.
- [ ] `javac *.java` produces no errors; `java Library` prints the expected output.
- [ ] The repository is pushed and its URL is submitted (GitHub, not Moodle).

---

## 7. Related links

- Week guide: [`../README.md`](../README.md)
- Session 1 (extends + `super()`): [`../01-session/README.md`](../01-session/README.md)
- Session 2 (overriding + `super.method()`): [`../02-session/README.md`](../02-session/README.md)
- Reading & download area: [`../material/README.md`](../material/README.md)
