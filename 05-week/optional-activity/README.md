# Week 05 - Optional Activity: Post-Exam Consolidation Kata

> **Course:** Object-Oriented Programming and Design - 2026-B
> **Unit 1:** Fundamentals of Object-Oriented Programming
> **Week:** 05 - Assessment Corte 1
> **Type:** Optional practice (formative, not graded for Corte 1)
> **Submission channel:** **GitHub** (NOT Moodle)
> **RAA:** 90_82759

---

## 1. Why this activity exists

The partial exam tells you *where* you stand; this activity helps you *improve*.
It is a deliberate-practice "kata" that exercises every Corte 1 pillar in one
small, self-contained program. It is especially valuable if your Session-2
error analysis flagged a **conceptual** gap — building the concept correctly with
your own hands is the fastest repair.

Optional means optional: it does **not** affect your Corte 1 grade. It does earn
you a cleaner mental model, a public GitHub artifact for your portfolio, and a
head start on Corte 2 (inheritance builds directly on this).

---

## 2. Problem statement

> **Build a `Library` domain in a single language of your choice (Java
> recommended; C#, Python, or TypeScript accepted) that demonstrates classes,
> objects, encapsulation, and constructors correctly.**

You will model two collaborating classes:

### 2.1 Class `Book`

Represents one book in the catalog.

- **State (all private):**
  - `title : String` — non-empty.
  - `author : String` — non-empty.
  - `isbn : String` — non-empty, treated as identity.
  - `available : boolean` — starts `true`.
- **Constructors:**
  - Parameterized: `Book(title, author, isbn)` — sets `available = true`,
    rejects empty/blank strings.
  - (Optional) an overloaded constructor that also accepts an initial
    `available` flag, demonstrating **overloading** and `this(...)` chaining.
- **Behavior:**
  - Getters for all fields (no public setters for identity fields — `isbn` must
    be immutable after construction).
  - `borrow()` — marks the book unavailable; throws if already borrowed.
  - `giveBack()` — marks it available; throws if it was not borrowed.
  - `describe()` — a readable one-line summary.

### 2.2 Class `Member`

Represents a library member who can hold books.

- **State (all private):**
  - `name : String` — non-empty.
  - `maxBooks : int` — invariant `>= 1`.
  - `borrowedCount : int` — invariant `0 <= borrowedCount <= maxBooks`.
- **Constructor:** `Member(name, maxBooks)` establishing the invariants.
- **Behavior:**
  - `borrow(Book book)` — if under the limit and the book is available, borrow it
    and increment the count; otherwise throw a clear exception.
  - `giveBack(Book book)` — return the book and decrement the count.
  - `canBorrowMore()` — returns `true` while `borrowedCount < maxBooks`.

### 2.3 A small `main` / demo

Create at least two `Book` objects and one `Member`, then:
1. Borrow a book successfully and print state.
2. Attempt an invalid operation (e.g., borrow past the limit, or return a book
   that was never borrowed) and **catch** the exception, printing a friendly
   message.
3. Demonstrate the reference-aliasing concept explicitly with a short comment or
   printout.

---

## 3. Requirements checklist

Your submission MUST:

- [ ] Keep **all** fields `private` (encapsulation).
- [ ] Establish every invariant in the **constructor**, routed through validation.
- [ ] Reject invalid input with a clear exception message (no silent failure).
- [ ] Keep `isbn` immutable (no setter that changes identity).
- [ ] Include at least one example of **constructor overloading** with `this(...)`
      chaining (in `Book`).
- [ ] Use `this` correctly where a parameter would otherwise shadow a field.
- [ ] Compile / run without errors.
- [ ] Include the demo described in §2.3.
- [ ] Contain a `README.md` (see §5) explaining how to run it and which Corte 1
      concept each class illustrates.

Your submission SHOULD (for a stronger result):

- [ ] Add a brief **self-reflection** in the README linking this kata to the
      error(s) you found in Session 2.
- [ ] Include simple assertions or a couple of test methods.
- [ ] Use meaningful commit messages that tell the story of your work.

---

## 4. Expected deliverable

A **public GitHub repository** containing:

```
oop-corte1-library-kata/
├── README.md              # how to run + concept map + self-reflection
├── src/
│   ├── Book.<ext>
│   ├── Member.<ext>
│   └── Main.<ext>         # the demo from §2.3
└── (optional) tests/
```

---

## 5. How to submit via GitHub (step by step)

> Submission is through **GitHub only**. Do **not** upload to Moodle. You will
> submit the **repository URL** where your instructor asks for links (course
> spreadsheet / forum thread), not a file.

1. **Create a repository** on GitHub named `oop-corte1-library-kata` (public).
2. **Clone it** locally:
   ```bash
   git clone https://github.com/<your-username>/oop-corte1-library-kata.git
   cd oop-corte1-library-kata
   ```
3. **Add your code** under `src/` and write your `README.md`.
4. **Commit in meaningful steps**, for example:
   ```bash
   git add src/Book.java
   git commit -m "Add Book class with encapsulation and validating constructor"

   git add src/Member.java
   git commit -m "Add Member with borrow limit invariant"

   git add src/Main.java README.md
   git commit -m "Add demo and documentation"
   ```
5. **Push** to GitHub:
   ```bash
   git push origin main
   ```
6. **Verify** the repository renders on github.com and the README is readable.
7. **Share the repository URL** where the instructor indicated. Optionally, create
   a **release tag** (`v1.0`) to mark your final version:
   ```bash
   git tag -a v1.0 -m "Corte 1 optional kata - final"
   git push origin v1.0
   ```

> **Tip:** commit history is part of the story. Small, well-labeled commits show
> your thinking far better than one giant "final" commit.

---

## 6. Assessment criteria / rubric

Although this activity does not count toward the Corte 1 grade, use this rubric
to self-evaluate (and it is the same lens your instructor uses when giving
optional feedback). **100 points.**

| Criterion | Excellent (full) | Adequate (half) | Insufficient (0) | Pts |
|-----------|------------------|-----------------|------------------|----:|
| **Encapsulation** | All fields private; identity immutable; controlled access throughout | Mostly private but a leaky field or public identity setter | Public mutable fields | 20 |
| **Constructors & invariants** | All invariants set in constructors via validation; overloading with `this(...)` present | Invariants set but validation partial or overloading missing | No validation; invalid objects possible | 25 |
| **Correct behavior** | `borrow`/`giveBack`/limits all correct, including error paths | Happy path works, error paths weak | Core methods incorrect | 20 |
| **Use of `this` & references** | Correct `this` usage; aliasing demonstrated and explained | Correct `this` but aliasing not shown | Field shadowing bug present | 10 |
| **Runs & demo** | Compiles, demo covers success + caught exception | Compiles, demo incomplete | Does not compile/run | 10 |
| **Documentation & reflection** | Clear README, concept map, self-reflection tied to Session 2 errors | README present but thin | No README | 15 |

**Suggested self-grade bands:** 90-100 mastery · 70-89 solid · 50-69 review the
weak criterion · below 50 revisit [material/README.md](../material/README.md) and
redo.

---

## 7. Starter skeleton (optional scaffold)

You may start from this outline (Java). Fill in the bodies; do not just copy —
the learning is in completing it.

```java
public class Book {
    private final String title;
    private final String author;
    private final String isbn;      // identity — immutable
    private boolean available;

    public Book(String title, String author, String isbn) {
        this(title, author, isbn, true);          // chain to full constructor
    }

    public Book(String title, String author, String isbn, boolean available) {
        this.title  = requireNonBlank(title,  "title");
        this.author = requireNonBlank(author, "author");
        this.isbn   = requireNonBlank(isbn,   "isbn");
        this.available = available;
    }

    private static String requireNonBlank(String value, String field) {
        if (value == null || value.isBlank()) {
            throw new IllegalArgumentException(field + " must not be blank");
        }
        return value;
    }

    public void borrow() {
        if (!available) throw new IllegalStateException("Book already borrowed");
        available = false;
    }

    public void giveBack() {
        if (available) throw new IllegalStateException("Book was not borrowed");
        available = true;
    }

    public boolean isAvailable() { return available; }
    public String  getIsbn()     { return isbn; }
    public String  describe() {
        return "\"" + title + "\" by " + author +
               " [" + (available ? "available" : "borrowed") + "]";
    }
}
```

---

## 8. Related pages

- [Week overview](../README.md)
- [Session 01 - Partial exam](../01-session/README.md)
- [Session 02 - Feedback & error analysis](../02-session/README.md)
- [Material & readings](../material/README.md)

---

## 9. Academic integrity

This is a **learning** activity: consulting the readings, official docs, and
documentation is encouraged, and you should **cite** anything you adapt. Submit
your own work — copying another student's repository defeats the purpose and is
easy to detect in commit histories.
