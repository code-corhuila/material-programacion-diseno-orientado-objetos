# Week 04 — Session 1: Constructors (default & parameterized) and valid object state

> Unit 1: Fundamentals of Object-Oriented Programming · Corte 1
> Duration: **2 academic hours (≈ 90–110 min)**

---

## 1. Session objective

Implement **default (no-argument)** and **parameterized** constructors that fully initialize an
object's state, use the **`this`** keyword to resolve field/parameter name collisions, and **guard
class invariants** so that an object can never be created in an invalid state.

At the end of the session each student will have coded a `Book` class whose objects are always
created with consistent data.

---

## 2. Timed agenda

| Time | Activity | Mode |
|:----:|----------|------|
| 0:00–0:10 | Warm-up: recap objects & encapsulation; the "half-initialized object" problem | Whole class |
| 0:10–0:30 | Theory: what a constructor is; implicit default vs. explicit; the `new` process | Lecture + board |
| 0:30–0:45 | Theory: parameterized constructors, `this`, field shadowing, validation | Lecture + live coding |
| 0:45–1:05 | **Worked example**: the `Book` class, step by step | Live coding |
| 1:05–1:30 | **Guided practice**: students extend `Book` and write `Rectangle` | Pair programming |
| 1:30–1:40 | Wrap-up, common-error review, and exit ticket | Whole class |

---

## 3. Theory notes

### 3.1 The problem constructors solve

Consider a class written with fields but **no constructor**:

```java
public class Book {
    private String title;
    private String author;
    private int pages;
}
```

To use it we might write:

```java
Book b = new Book();   // object exists, but...
System.out.println(b.getTitle());  // prints: null
System.out.println(b.getPages());  // prints: 0
```

The object exists, but it is **empty and meaningless**: `title` is `null`, `pages` is `0`. Nothing
stopped us from creating a "book" that has no title and negative-looking data later. A **constructor**
lets us guarantee that *the moment an object is born, it already holds sensible values*.

### 3.2 What a constructor is

A **constructor** is a special member of a class that:

- has **exactly the same name as the class** (`Book`),
- has **no return type** — not even `void` (this is how the compiler tells it apart from a method),
- runs **automatically** when you use the `new` keyword,
- exists to **initialize the object's state**.

```
        new Book("1984", "Orwell", 328)
                 │
                 ▼
   ┌─────────────────────────────────┐
   │ 1. JVM allocates memory for a    │
   │    new Book object (fields set   │
   │    to defaults: null / 0)        │
   ├─────────────────────────────────┤
   │ 2. The matching constructor runs │
   │    → assigns title, author, pages│
   ├─────────────────────────────────┤
   │ 3. A reference to the ready      │
   │    object is returned to the     │
   │    variable  b                   │
   └─────────────────────────────────┘
                 │
                 ▼
              Book b  ●───▶ [title="1984", author="Orwell", pages=328]
```

### 3.3 The implicit default constructor (and when it vanishes)

If you write **no constructor at all**, the compiler quietly inserts an empty **default constructor**
for you, equivalent to:

```java
public Book() { }   // inserted automatically ONLY when you declare no constructors
```

That is why `new Book()` compiled in section 3.1. **Important rule:**

> As soon as you declare **any** constructor yourself, the compiler **stops** providing the implicit
> one. If you still want `new Book()` to work, you must write the no-argument constructor explicitly.

This single rule is the source of many "constructor Book() is undefined" compile errors, so commit
it to memory.

### 3.4 Writing an explicit no-argument constructor

A no-argument constructor is useful for supplying **sensible defaults**:

```java
public Book() {
    this.title  = "Untitled";
    this.author = "Unknown";
    this.pages  = 1;
}
```

### 3.5 Parameterized constructors, `this`, and field shadowing

A **parameterized constructor** receives the initial values as arguments:

```java
public Book(String title, String author, int pages) {
    this.title  = title;     // this.title = the field;  title = the parameter
    this.author = author;
    this.pages  = pages;
}
```

Here the parameters are named exactly like the fields. Inside the constructor the **parameter shadows
the field**, so a bare `title` means the parameter. The keyword **`this`** refers to *the object being
constructed*, so `this.title` reaches the field. The line `this.title = title;` therefore reads:
*"store the incoming parameter into this object's field."*

> If you wrote `title = title;` (without `this`) you would just assign the parameter to itself and the
> field would stay `null`. This is a classic silent bug.

### 3.6 Guarding invariants (fail-fast)

A constructor is the perfect place to **reject bad data** so a broken object is never created:

```java
public Book(String title, String author, int pages) {
    if (title == null || title.isBlank())
        throw new IllegalArgumentException("title must not be empty");
    if (pages <= 0)
        throw new IllegalArgumentException("pages must be positive, got " + pages);

    this.title  = title;
    this.author = (author == null) ? "Unknown" : author;
    this.pages  = pages;
}
```

The **invariant** here is: *"every Book has a non-empty title and a positive page count."* Because the
check lives in the constructor, **no** code path anywhere in the program can build a Book that breaks it.

---

## 4. Worked example — the `Book` class

Below is the complete class we build live in class. Read the comments; they explain each decision.

```java
public class Book {
    // Fields are private (encapsulation from previous weeks)
    private String title;
    private String author;
    private int pages;

    // (1) Explicit no-argument constructor: provides safe defaults.
    public Book() {
        this.title  = "Untitled";
        this.author = "Unknown";
        this.pages  = 1;
    }

    // (2) Parameterized constructor: validates, then initializes state.
    public Book(String title, String author, int pages) {
        if (title == null || title.isBlank())
            throw new IllegalArgumentException("title must not be empty");
        if (pages <= 0)
            throw new IllegalArgumentException("pages must be positive, got " + pages);

        this.title  = title;
        this.author = (author == null) ? "Unknown" : author;
        this.pages  = pages;
    }

    // Getters (read-only access to the private state)
    public String getTitle()  { return title; }
    public String getAuthor() { return author; }
    public int getPages()     { return pages; }
}
```

Driver / test class:

```java
public class Main {
    public static void main(String[] args) {
        Book b1 = new Book();                          // uses (1)
        Book b2 = new Book("1984", "George Orwell", 328); // uses (2)

        System.out.println(b1.getTitle() + " / " + b1.getPages()); // Untitled / 1
        System.out.println(b2.getTitle() + " / " + b2.getPages()); // 1984 / 328

        // This line throws IllegalArgumentException at construction time:
        // Book bad = new Book("", "Nobody", -5);
    }
}
```

**Expected console output:**

```
Untitled / 1
1984 / 328
```

**What to notice**

- Two constructors coexist (this previews *overloading*, formalized in Session 2).
- The bad object on the last line is impossible to create — the exception fires **before** any broken
  Book reaches the rest of the program.
- Fields stay `private`; construction is the only entry point for their initial values.

---

## 5. Guided in-class practice

Work in pairs. Start from the `Book` class above.

### Part A — Extend `Book`
1. Add a fourth field `int year` (publication year).
2. Update the parameterized constructor to receive and validate `year` (reject years before 1450 —
   the printing press — or after the current year `2026`).
3. Keep the no-argument constructor working by giving `year` a default of `2000`.
4. In `main`, create one valid book and one invalid book (wrapped in a `try/catch`) and print the
   caught message.

### Part B — Write `Rectangle` from scratch
Create a `Rectangle` class with:
- private fields `double width` and `double height`;
- a **no-argument** constructor that builds a unit square (`1.0 × 1.0`);
- a **parameterized** constructor `Rectangle(double width, double height)` that rejects any
  non-positive dimension with `IllegalArgumentException`;
- getters, plus a method `double area()` returning `width * height`.

In `main`, create a `2.0 × 3.0` rectangle and print its area (expected: `6.0`).

**Stretch goal:** add a third constructor `Rectangle(double side)` that builds a square. Discuss with
your partner: how does the compiler tell your three constructors apart? (Answer: by their parameter
lists — this is the topic of Session 2.)

---

## 6. Wrap-up and common errors

Quick recap:
- A constructor initializes state; it has the class's name and **no return type**.
- The implicit default constructor disappears once you write any constructor.
- `this.field = field;` beats field shadowing; forgetting `this` is a silent bug.
- Validate in the constructor to protect invariants (fail-fast).

**Watch out for these mistakes:**

| Symptom / error | Likely cause |
|-----------------|--------------|
| `The constructor Book() is undefined` | You wrote a parameterized constructor, so the implicit `Book()` no longer exists. Add it explicitly. |
| A field is still `null`/`0` after construction | You wrote `field = field;` instead of `this.field = field;`. |
| Giving the constructor a return type like `public void Book() {…}` | That is now an ordinary method, **not** a constructor; `new Book()` won't call it. |
| Object created with nonsense data | You skipped validation; move the checks into the constructor. |

### Exit ticket (hand in before leaving — 3 minutes)

Answer on paper or in the LMS:

1. In one sentence, what is the job of a constructor?
2. Given `public Account(double balance) { balance = balance; }`, what value will the field `balance`
   hold after `new Account(500)` and **why**?
3. You add `public Book(String title){…}` to a class that previously had no constructors. Afterwards
   `new Book()` fails to compile. Explain in one line why, and how to fix it.

---

**Next session:** constructor **overloading** with `this(...)` chaining, and overriding **`toString()`**
for readable objects — plus the graded quiz.
