# Week 04 — Session 2: Constructor overloading, `this(...)` chaining, and `toString()`

> Unit 1: Fundamentals of Object-Oriented Programming · Corte 1
> Duration: **2 academic hours (≈ 90–110 min)**

---

## 1. Session objective

Overload constructors to offer multiple ways of creating an object, remove duplicated initialization
code with **`this(...)` constructor chaining**, and **override `toString()`** to produce a meaningful
textual representation. The session closes with the **graded quiz on class and constructor syntax**.

Each student will finish a `BankAccount` class with overloaded constructors and a readable
`toString()`, and will have submitted the quiz.

---

## 2. Timed agenda

| Time | Activity | Mode |
|:----:|----------|------|
| 0:00–0:10 | Recap Session 1; review exit-ticket answers | Whole class |
| 0:10–0:30 | Theory: overloading rules and signatures; telescoping problem | Lecture + board |
| 0:30–0:45 | Theory: `this(...)` chaining and the "primary constructor" pattern | Live coding |
| 0:45–1:00 | Theory: `toString()` — origin, `@Override`, automatic calls | Lecture + live coding |
| 1:00–1:20 | **Worked example**: `BankAccount` with 3 constructors + `toString()` | Live coding |
| 1:20–1:35 | **Guided practice**: students add chaining and `toString()` to `Rectangle` | Pair programming |
| 1:35–1:50 | **Graded quiz** (class & constructor syntax) + wrap-up / exit ticket | Individual |

---

## 3. Theory notes

### 3.1 Constructor overloading

**Overloading** means declaring several constructors with the **same name** (the class name, always)
but **different parameter lists**. Callers then choose the most convenient one:

```java
BankAccount a = new BankAccount();                     // no args
BankAccount b = new BankAccount("Ana Ruiz");           // owner only
BankAccount c = new BankAccount("Ana Ruiz", 500.0);    // owner + opening balance
```

What makes two constructors different is their **signature** — the ordered list of parameter *types*:

```
BankAccount()                       -> signature: ()
BankAccount(String)                 -> signature: (String)
BankAccount(String, double)         -> signature: (String, double)
```

Rules and non-rules:

- **Counts:** a different **number** of parameters ⇒ different signature. ✔
- **Types:** the same number but different **types** (e.g. `(String)` vs `(double)`) ⇒ different. ✔
- **Order:** `(String, double)` vs `(double, String)` ⇒ different. ✔
- **Names do NOT count:** `(String owner)` and `(String name)` are the **same** signature ⇒ compile
  error ("duplicate method"). ✘
- **Return type does NOT count** — constructors have none anyway.

The compiler picks the matching constructor at **compile time** based on the arguments you pass.

### 3.2 The telescoping problem and `this(...)` chaining

If each constructor repeats the initialization logic, the class becomes fragile — a validation change
must be copied into every constructor:

```java
// ❌ Duplicated logic (hard to maintain)
public BankAccount() {
    this.owner = "Unknown"; this.balance = 0.0;
}
public BankAccount(String owner) {
    this.owner = owner;     this.balance = 0.0;      // repeats balance init
}
public BankAccount(String owner, double balance) {
    this.owner = owner;     this.balance = balance;  // repeats owner init
}
```

**Constructor chaining** fixes this. One **primary constructor** holds all the real logic; the others
delegate to it with **`this(...)`**:

```java
// ✅ One source of truth
public BankAccount() {
    this("Unknown", 0.0);            // delegates to the primary constructor
}
public BankAccount(String owner) {
    this(owner, 0.0);                // delegates
}
public BankAccount(String owner, double balance) {   // primary constructor
    if (owner == null || owner.isBlank())
        throw new IllegalArgumentException("owner must not be empty");
    if (balance < 0)
        throw new IllegalArgumentException("balance must not be negative");
    this.owner   = owner;
    this.balance = balance;
}
```

Key constraints for `this(...)`:

- It **must be the very first statement** of the constructor (nothing before it).
- It calls **another constructor of the same class** (not a method).
- The chain must eventually reach a constructor that actually initializes the fields; you cannot make
  a constructor call itself in a cycle.

```
new BankAccount("Ana")
        │  this(owner, 0.0)
        ▼
BankAccount(String owner)  ───▶  BankAccount(String owner, double balance)   [primary]
                                        │ validates + assigns fields
                                        ▼
                                   ready object
```

### 3.3 Overriding `toString()`

Every class in Java implicitly extends **`java.lang.Object`**, which defines a `toString()` method.
The inherited default is almost useless:

```java
BankAccount c = new BankAccount("Ana Ruiz", 500.0);
System.out.println(c);   // BankAccount@1b6d3586   ← class name + hashcode, not helpful
```

That `1b6d3586` is the object's hash in hexadecimal — it tells a human nothing. We **override**
`toString()` to return a meaningful string:

```java
@Override
public String toString() {
    return "BankAccount{owner='" + owner + "', balance=" + balance + "}";
}
```

Now:

```java
System.out.println(c);   // BankAccount{owner='Ana Ruiz', balance=500.0}
```

Why this matters:

- **`toString()` is called automatically** by `System.out.println(obj)`, by string concatenation
  (`"acct=" + c`), by `String.valueOf(obj)`, and by most IDE **debuggers** and logging frameworks.
- The **`@Override`** annotation is not decoration: if you mistype the name (`toStrng`) or the
  signature, the compiler raises an error instead of silently creating an unrelated method.

**Good-representation guidelines**

- Include the fields that identify the object; a reader should recognize *which* object it is.
- Keep it **side-effect free** — `toString()` must not modify state or perform I/O.
- Don't dump huge collections or secrets (passwords, full card numbers).
- A common, readable format is `ClassName{field1=..., field2=...}`.

### 3.4 Constructors vs. `toString()` at a glance

| | Constructor | `toString()` |
|--|-------------|--------------|
| Purpose | **Build** an object in a valid state | **Describe** an existing object as text |
| Name | Same as the class | Literally `toString` |
| Return type | None | `String` |
| Called | Automatically by `new` | Automatically by `println`, concatenation, debuggers |
| Overriding? | We *overload* it (many signatures) | We *override* it (one, inherited from `Object`) |

---

## 4. Worked example — the `BankAccount` class

```java
public class BankAccount {
    private String owner;
    private double balance;

    // No-arg constructor: delegates with default values
    public BankAccount() {
        this("Unknown", 0.0);
    }

    // Owner-only constructor: delegates with a zero opening balance
    public BankAccount(String owner) {
        this(owner, 0.0);
    }

    // PRIMARY constructor: the single place where validation + assignment live
    public BankAccount(String owner, double balance) {
        if (owner == null || owner.isBlank())
            throw new IllegalArgumentException("owner must not be empty");
        if (balance < 0)
            throw new IllegalArgumentException("balance must not be negative");
        this.owner   = owner;
        this.balance = balance;
    }

    public void deposit(double amount) {
        if (amount <= 0)
            throw new IllegalArgumentException("deposit must be positive");
        this.balance += amount;
    }

    public String getOwner()  { return owner; }
    public double getBalance() { return balance; }

    // Meaningful textual representation
    @Override
    public String toString() {
        return "BankAccount{owner='" + owner + "', balance=" + balance + "}";
    }
}
```

Driver:

```java
public class Main {
    public static void main(String[] args) {
        BankAccount a = new BankAccount();                  // -> Unknown, 0.0
        BankAccount b = new BankAccount("Ana Ruiz");        // -> Ana Ruiz, 0.0
        BankAccount c = new BankAccount("Luis Vargas", 500.0);

        c.deposit(250.0);

        System.out.println(a);   // toString() called automatically
        System.out.println(b);
        System.out.println(c);
    }
}
```

**Expected console output:**

```
BankAccount{owner='Unknown', balance=0.0}
BankAccount{owner='Ana Ruiz', balance=0.0}
BankAccount{owner='Luis Vargas', balance=750.0}
```

**What to notice**

- Three constructors give callers flexibility, but **only one** contains validation logic; the other
  two chain to it with `this(...)`.
- `System.out.println(c)` never mentions `toString()` explicitly — it is invoked automatically.
- Changing the validation rule (say, requiring a minimum opening balance) now means editing **one**
  method, not three.

---

## 5. Guided in-class practice

Work in pairs, starting from your `Rectangle` class from Session 1.

1. **Refactor to chaining.** Make `Rectangle(double width, double height)` the **primary** constructor
   (with validation). Rewrite the no-argument constructor as `this(1.0, 1.0)` and the square
   constructor as `this(side, side)`.
2. **Override `toString()`** to return, e.g.,
   `Rectangle{width=2.0, height=3.0, area=6.0}`.
3. In `main`, create the three rectangles (unit square, `2.0×3.0`, and a `4.0` square) and print each
   with `System.out.println(...)`. Confirm the output matches your hand-calculated areas.
4. **Discuss:** why can you *not* also add a constructor `Rectangle(double side)` **and** keep
   `Rectangle(double height)` at the same time? (Both have signature `(double)` → duplicate.)

**Checkpoint (show the instructor):** your three rectangles print correct, readable lines and your
class has exactly one constructor that performs validation.

---

## 6. Graded quiz — class and constructor syntax

Toward the end of the session you will complete a short quiz in the LMS covering:

- constructor definition and syntax (name, no return type);
- the implicit default constructor rule;
- overloading vs. valid/invalid signatures;
- `this` (field access) vs. `this(...)` (chaining) and its "first statement" rule;
- overriding `toString()` and predicting `println` output.

**Passing criterion:** a correct result as defined in the LMS. Sample self-check items (not the actual
quiz) — try them first, then reveal the answer:

1. *Does `public void Book() {}` declare a constructor?*
   <details><summary>Answer</summary>No. It has a return type (`void`), so it is an ordinary method
   named `Book`, not a constructor.</details>
2. *Are `Point(int x, int y)` and `Point(int a, int b)` valid overloads?*
   <details><summary>Answer</summary>No. Parameter **names** don't matter; both have signature
   `(int, int)`, so this is a duplicate-constructor compile error.</details>
3. *What prints?* `System.out.println(new BankAccount("Ann", 10.0));` with the `toString()` above.
   <details><summary>Answer</summary>`BankAccount{owner='Ann', balance=10.0}`</details>
4. *Where must `this(...)` appear inside a constructor?*
   <details><summary>Answer</summary>As the **first statement**; nothing may precede it.</details>

---

## 7. Wrap-up and exit ticket

Quick recap:
- Overloading = same name, different parameter lists (signatures).
- `this(...)` centralizes initialization in one primary constructor; it must be the first statement.
- Override `toString()` (with `@Override`) for readable, debuggable objects; it is called automatically.

**Common errors table:**

| Symptom / error | Likely cause |
|-----------------|--------------|
| `Duplicate method BankAccount(...)` | Two constructors share the same signature (only names differ). |
| `Constructor call must be the first statement in a constructor` | A statement precedes `this(...)`. |
| `println` still prints `ClassName@hashcode` | `toString()` not overridden, or the name/signature is wrong (add `@Override` to catch it). |
| Infinite recursion / stack overflow at construction | Two constructors delegate to each other in a cycle. |

### Exit ticket (3 minutes)

1. Write the signatures of three valid overloaded constructors for a class `Point`.
2. Rewrite `public Point() { x = 0; y = 0; }` so it uses `this(...)` chaining to a
   `Point(int x, int y)` constructor.
3. In one sentence, why is overriding `toString()` valuable for debugging?

---

**Deliverables due after this session:** working `BankAccount` (chained constructors + `toString()`),
refactored `Rectangle`, and the completed quiz. The optional GitHub challenge is in
[`../optional-activity/README.md`](../optional-activity/README.md).
