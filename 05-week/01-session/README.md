# Week 05 - Session 01: Partial Exam (Corte 1)

> **Course:** Object-Oriented Programming and Design - 2026-B
> **Unit 1:** Fundamentals of Object-Oriented Programming
> **Session type:** Summative assessment (Corte 1)
> **Duration:** 2 hours (120 min)
> **RAA:** 90_82759

---

## 1. Session objective

Model and implement a small class-based solution correctly under exam conditions,
and demonstrate mastery of classes, objects, encapsulation, and constructors by
answering conceptual items accurately.

This session is the **summative instrument** of Corte 1. It measures Objectives 1
and 2 of the week directly.

---

## 2. Timed agenda

| Time | Segment | Activity |
|------|---------|----------|
| 0:00 - 0:10 | **Warm-up** | Pre-exam recap map (no notes): students sketch the four pillars from memory on scratch paper. Not graded; primes recall. |
| 0:10 - 0:20 | **Exam briefing** | Rules, structure, timing strategy, integrity reminder. Clarifying questions. |
| 0:20 - 1:40 | **Partial exam** | Individual work: Part A (concepts) + Part B (applied class). Closed book. |
| 1:40 - 1:55 | **Buffer & submission** | Final review, naming/format check, submit. |
| 1:55 - 2:00 | **Exit ticket** | 3-line reflection handed in with the exam. |

> **Timing strategy communicated to students:** spend ~35 min on Part A and
> ~45 min on Part B, leaving ~15 min to review. Do not leave the applied class
> half-written; a compiling smaller solution scores better than broken ambition.

---

## 3. Theory notes (consolidated for the exam)

These notes summarize everything Corte 1 has covered. They are the reference the
exam is built from. Read them as the "what you are expected to know" contract.

### 3.1 The object model: state, behavior, identity

Every object has three facets:

- **State** - the data it currently holds (its field values).
- **Behavior** - what it can do (its methods).
- **Identity** - what makes it *this* object and not another, even if two objects
  have identical state.

```
        CLASS  (blueprint)                 OBJECTS (instances)
   ┌─────────────────────────┐        ┌───────────────┐  ┌───────────────┐
   │  BankAccount            │        │ acc1          │  │ acc2          │
   │ ─────────────────────── │        │ owner="Ana"   │  │ owner="Beto"  │
   │ - owner : String        │  new   │ balance=500.0 │  │ balance=0.0   │
   │ - balance : double      │ ─────► │ id=1001       │  │ id=1002       │
   │ ─────────────────────── │        └───────────────┘  └───────────────┘
   │ + deposit(amount)       │           same behavior, different state,
   │ + withdraw(amount)      │           different identity
   └─────────────────────────┘
```

A **class** describes the shape; each **object** is a filled-in copy living in
memory, created with the `new` operator.

### 3.2 Classes and objects

- A **class** groups **fields** (state) and **methods** (behavior).
- An **object** is created from a class: `BankAccount acc1 = new BankAccount("Ana", 500);`
- Object variables hold **references**, not the object itself. This is
  *reference semantics*:

```
   BankAccount a = new BankAccount("Ana", 500);
   BankAccount b = a;          // b points to the SAME object as a
   b.deposit(100);            // a.getBalance() is now 600 too!

     a ───┐
          ▼
        ┌──────────────┐
        │ owner="Ana"  │
        │ balance=600  │
        └──────────────┘
          ▲
     b ───┘
```

This aliasing behavior is a classic exam trap — watch for it.

### 3.3 Encapsulation and access control

**Encapsulation** = keep fields private and expose behavior through a controlled
public interface. Benefits: you can validate input, protect invariants, and
change internals later without breaking callers.

| Modifier | Visible from |
|----------|--------------|
| `private` | Only within the same class |
| `protected` | Same class + subclasses (+ same package in Java) |
| `public` | Everywhere |

A well-encapsulated setter enforces an **invariant**:

```java
public void setBalance(double balance) {
    if (balance < 0) {
        throw new IllegalArgumentException("Balance cannot be negative");
    }
    this.balance = balance;   // invariant: balance >= 0 always holds
}
```

### 3.4 Constructors and initialization

A **constructor** runs when an object is created; its job is to bring the object
into a valid initial state (establish invariants).

- **Default constructor** — no parameters. The compiler supplies one *only if you
  declare no constructor at all*.
- **Parameterized constructor** — accepts initial values.
- **Overloading** — several constructors with different parameter lists.
- **`this`** — refers to the current object; resolves field/parameter name
  clashes and enables constructor chaining via `this(...)`.

```java
public class BankAccount {
    private String owner;
    private double balance;

    public BankAccount() {              // default
        this("Unknown", 0.0);         // chains to the parameterized one
    }

    public BankAccount(String owner, double balance) {  // parameterized
        this.owner = owner;           // this.owner = field; owner = parameter
        setBalance(balance);          // reuse validation to protect invariant
    }
}
```

> **Rule to memorize:** the moment you declare *any* constructor, the free
> default constructor disappears. If you still want a no-arg option, declare it
> explicitly.

---

## 4. Fully worked example (exam-style)

**Problem.** Model a `Student` with a name and a numeric grade in the range
`0.0`-`5.0` (Colombian scale). Grades outside the range are invalid. Provide a
parameterized constructor, encapsulated access, a method `hasPassed()` returning
`true` when the grade is `>= 3.0`, and a readable `describe()` output.

**Step 1 - Identify state and behavior.**

| State (fields) | Behavior (methods) |
|----------------|--------------------|
| `name : String` | `hasPassed() : boolean` |
| `grade : double` (invariant `0.0 <= grade <= 5.0`) | `describe() : String`, getters/setters |

**Step 2 - Implement with encapsulation + constructor.**

```java
public class Student {
    private String name;
    private double grade;                       // invariant: 0.0 <= grade <= 5.0

    // Parameterized constructor establishes a valid initial state
    public Student(String name, double grade) {
        this.name = name;
        setGrade(grade);                        // reuse validation
    }

    public String getName() {
        return name;
    }

    public double getGrade() {
        return grade;
    }

    // Setter enforces the invariant — the single guardian of validity
    public void setGrade(double grade) {
        if (grade < 0.0 || grade > 5.0) {
            throw new IllegalArgumentException(
                "Grade must be between 0.0 and 5.0, got: " + grade);
        }
        this.grade = grade;
    }

    public boolean hasPassed() {
        return grade >= 3.0;
    }

    public String describe() {
        String status = hasPassed() ? "PASSED" : "FAILED";
        return name + " -> " + grade + " (" + status + ")";
    }

    public static void main(String[] args) {
        Student s1 = new Student("Ana Torres", 4.2);
        Student s2 = new Student("Beto Ruiz", 2.5);

        System.out.println(s1.describe());   // Ana Torres -> 4.2 (PASSED)
        System.out.println(s2.describe());   // Beto Ruiz -> 2.5 (FAILED)

        // Invariant protection in action:
        try {
            Student bad = new Student("Invalid", 9.9);
        } catch (IllegalArgumentException e) {
            System.out.println("Rejected: " + e.getMessage());
        }
    }
}
```

**Expected output:**

```
Ana Torres -> 4.2 (PASSED)
Beto Ruiz -> 2.5 (FAILED)
Rejected: Grade must be between 0.0 and 5.0, got: 9.9
```

**Why this scores full marks:**
- Fields are `private` (encapsulation).
- The constructor delegates to `setGrade`, so validation lives in **one** place
  (no duplicated rule).
- The invariant is enforced at construction *and* on every later mutation.
- `hasPassed()` and `describe()` express behavior clearly.

---

## 5. Guided in-class practice (warm-up before the exam)

> Do this on scratch paper in the first 10 minutes. It is **not** graded; it is
> a memory primer. The instructor walks through the answers aloud.

**Task.** On paper, design (no full code needed, just the skeleton) a class
`Rectangle` with:

1. Private fields `width` and `height`, both required to be **strictly positive**.
2. A parameterized constructor that rejects non-positive dimensions.
3. Methods `area()` and `perimeter()`.
4. A getter/setter pair for `width` that keeps the invariant.

**Checklist while you draft:**
- [ ] Are both fields `private`?
- [ ] Does the constructor route through the setter (single validation point)?
- [ ] Does the setter throw on `<= 0`?
- [ ] Does `area()` return `width * height`?

**Reference skeleton (revealed after 10 min):**

```java
public class Rectangle {
    private double width;
    private double height;

    public Rectangle(double width, double height) {
        setWidth(width);
        setHeight(height);
    }

    public void setWidth(double width) {
        if (width <= 0) throw new IllegalArgumentException("width must be > 0");
        this.width = width;
    }
    // setHeight analogous...

    public double area()      { return width * height; }
    public double perimeter() { return 2 * (width + height); }
}
```

---

## 6. The partial exam (structure)

> Distributed on paper / LMS at 0:20. Individual, closed book. **90 points total.**

### Part A - Concepts (45 pts)

**A1. Multiple choice (5 x 3 = 15 pts).** One correct answer each.

> *Example item (representative of the real exam):*
> When you declare a parameterized constructor and **no** no-argument
> constructor, what happens if you write `new MyClass()`?
> a) It compiles and uses a hidden default constructor.
> b) **It fails to compile — no default constructor exists.** ✓
> c) It creates an object with all fields set to null.
> d) It throws a runtime exception.

**A2. Short answer (3 x 5 = 15 pts).** Two-to-three sentences each.
- Define encapsulation and give one concrete benefit.
- Explain the difference between a class and an object.
- What does `this` disambiguate, and give a one-line example.

**A3. Code reading / trace (15 pts).** Given a short snippet using reference
aliasing (like §3.2), predict the printed output and justify in one sentence.

### Part B - Applied class (45 pts)

Write a **complete, compilable** class from a short specification (in the style
of the worked example in §4). Graded with the rubric below.

| Criterion | Points | What earns full marks |
|-----------|-------:|-----------------------|
| Correct fields + encapsulation | 10 | All state private; sensible types |
| Constructor(s) establishing valid state | 10 | Parameterized constructor routes through validation |
| Invariant enforcement | 10 | Setter/constructor reject invalid input |
| Behavior methods correct | 10 | Required methods return correct results |
| Readability & compiles | 5 | Clean names, indentation, no syntax errors |

---

## 7. Wrap-up / exit ticket

Before handing in the exam, complete these **three lines** on the exit slip:

1. **Confidence (1-5):** How confident are you in your applied class answer? ___
2. **Hardest concept today was:** ______________________________________
3. **One thing I will review before Corte 2:** ___________________________

> The exit ticket is not graded but is collected. In Session 2 we compare the
> class-wide confidence distribution against the actual results — an eye-opening
> calibration exercise that feeds directly into the Trello self-assessment.

---

## 8. Preparation for Session 02

- Bring your graded exam (returned at the start of Session 2).
- Have a **Trello** account ready (free) — we will build the KWL self-assessment
  board in class.
- Re-read the four pillars in this session's §3 so the feedback discussion moves
  quickly.
