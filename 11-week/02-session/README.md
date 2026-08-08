# Week 11 - Session 2: Propagation and Design (`throw`, `throws`, Custom Exceptions)

**Course:** Object-Oriented Programming and Design (2026-B)
**Unit 3 - Practical application of OOP in Java**
**Session:** 2 of 2 | **Duration:** 120 minutes | **Corte 3**

---

## 1. Session Objective

By the end of this session the student will be able to **distinguish checked from unchecked
exceptions, propagate checked exceptions with `throws`, raise exceptions deliberately with
`throw`, translate low-level exceptions into meaningful domain exceptions, and design and
use a small custom exception hierarchy**.

This session maps to weekly Objectives 2, 3, and 5 (the forum argument is launched here).

---

## 2. Timed Agenda (120 min)

| Time | Segment | Activity |
|---|---|---|
| 0:00 - 0:10 | Recap & bridge | Review Session 1; connect "handling" to "designing" errors. |
| 0:10 - 0:35 | Theory I | Checked vs. unchecked; the handle-or-declare rule; `throws` & propagation. |
| 0:35 - 1:00 | Theory II | `throw`, fail fast, exception translation, custom exception design. |
| 1:00 - 1:25 | Worked example | Instructor builds a `BankAccount` + custom exceptions live. |
| 1:25 - 1:55 | Guided practice | Students build a `UserRegistrationService` validator. |
| 1:55 - 2:00 | Wrap-up | Exit ticket + forum-argument launch. |

---

## 3. Recap and Bridge (10 min)

In Session 1 we *reacted* to exceptions with `try`/`catch`/`finally`. But where do
exceptions come from, and who decides their type? Two roles exist in every program:

- **The detector** — the code that notices something is wrong and *raises* an exception
  (`throw`), or *declares* that it might let one propagate (`throws`).
- **The handler** — the code that *catches* and responds.

Today we focus on the detector's job: choosing the right kind of exception, propagating it
correctly, and — when the built-in types are not expressive enough — designing our own.

---

## 4. Theory I — Checked vs. Unchecked & Propagation (25 min)

### 4.1 The two families, revisited

```
Exception
├── RuntimeException        ← UNCHECKED (compiler does not force handling)
│   ├── NullPointerException
│   ├── IllegalArgumentException
│   ├── IllegalStateException
│   └── ArithmeticException
└── (everything else)       ← CHECKED (compiler forces handle-or-declare)
    ├── IOException
    │   └── FileNotFoundException
    └── SQLException
```

| | **Checked** | **Unchecked (`RuntimeException`)** |
|---|---|---|
| Compiler enforces handling? | **Yes** — handle or declare | No |
| Typical meaning | A foreseeable, recoverable condition outside your control (missing file, dropped connection) | A programming bug / broken contract (null passed, illegal argument, bad index) |
| Caller's expectation | "This *can* fail; plan for it." | "If this fires, fix the code." |
| Examples | `IOException`, `SQLException` | `NullPointerException`, `IllegalArgumentException` |

### 4.2 The handle-or-declare rule

If your code can produce a **checked** exception, the compiler gives you exactly two legal
options:

1. **Handle** it locally with `try`/`catch`, or
2. **Declare** it in your method signature with `throws`, pushing the responsibility to
   your caller.

```java
// Option 1: handle it here
void loadConfig() {
    try {
        readFile("config.txt");
    } catch (IOException e) {
        useDefaults();
    }
}

// Option 2: declare it and let the caller decide
void loadConfig() throws IOException {
    readFile("config.txt");   // IOException flows up to whoever calls loadConfig()
}
```

Unchecked exceptions need neither — but you *may* still catch them when it makes sense.

### 4.3 `throws` and propagation up the call stack

When a method declares `throws`, an uncaught exception does not stop there — it
**propagates** to the caller, then the caller's caller, and so on, until some frame catches
it or the thread ends:

```
main()  ── calls ──▶  service()  ── calls ──▶  repository()
                                                    │  throws IOException
                                                    ▼
  repository() declares "throws IOException"  →  propagates up
  service()    declares "throws IOException"  →  propagates up
  main()       has a try/catch                →  HANDLED here
```

```java
class Repository {
    String read() throws IOException { /* ... */ return "data"; }
}
class Service {
    String fetch() throws IOException {      // must declare or handle
        return new Repository().read();
    }
}
class App {
    public static void main(String[] args) {
        try {
            System.out.println(new Service().fetch());
        } catch (IOException e) {              // finally handled at the top
            System.out.println("Load failed: " + e.getMessage());
        }
    }
}
```

**Design insight:** *where* you catch matters. Catch at the level that actually knows how
to recover or how to explain the failure to the user — not necessarily the deepest level.

---

## 5. Theory II — `throw`, Fail Fast, Translation & Custom Exceptions (25 min)

### 5.1 `throw`: raising an exception on purpose

`throws` (in the signature) *declares*; `throw` (a statement) *acts*. Use `throw` to
enforce a method's contract — reject invalid input immediately (**fail fast**) instead of
letting corrupt data spread:

```java
public void setAge(int age) {
    if (age < 0 || age > 150) {
        throw new IllegalArgumentException("Age out of range: " + age);
    }
    this.age = age;
}
```

Failing fast turns a mysterious bug that surfaces far away into a clear error right at the
point of misuse.

### 5.2 Exception translation (wrapping) — preserve the cause

Low-level exceptions often leak implementation details. A good abstraction **catches** the
low-level exception and **throws** a domain-level one, attaching the original as its
**cause** so no debugging information is lost:

```java
public Product findProduct(String id) {
    try {
        return database.query(id);          // may throw SQLException (low level)
    } catch (SQLException e) {
        // Translate to a meaningful domain exception, preserving the cause.
        throw new ProductLookupException("Could not load product " + id, e);
    }
}
```

The second constructor argument (`e`) becomes the *cause*; a printed stack trace shows
`Caused by: java.sql.SQLException: ...`, so you keep both the domain message and the root
technical detail.

> **Anti-pattern:** `throw new ProductLookupException("failed");` — dropping `e` throws
> away the real cause and makes the bug much harder to find.

### 5.3 Designing custom exceptions

Create a custom exception when the built-in types cannot express your **domain** clearly.
A well-named exception (`InsufficientFundsException`) documents intent far better than a
generic `IllegalStateException`.

**Checked or unchecked?** A practical rule:

- Extend **`Exception`** (checked) when callers can *reasonably recover* and you want the
  compiler to *force* them to consider it (e.g., `InsufficientFundsException` — the caller
  can ask the user for a smaller amount).
- Extend **`RuntimeException`** (unchecked) when the exception signals a *programming
  error* or a broken precondition the caller should simply avoid (e.g.,
  `InvalidAccountStateException`).

**Standard constructor set** — mirror `Throwable`'s so your exception plays well with
translation and logging:

```java
public class InsufficientFundsException extends Exception {   // checked

    private final double shortfall;   // domain-specific extra data (optional but useful)

    public InsufficientFundsException(String message) {
        super(message);
        this.shortfall = 0;
    }

    public InsufficientFundsException(String message, double shortfall) {
        super(message);
        this.shortfall = shortfall;
    }

    public InsufficientFundsException(String message, Throwable cause) {
        super(message, cause);        // enables exception translation
        this.shortfall = 0;
    }

    public double getShortfall() {
        return shortfall;
    }
}
```

**Design guidelines:**

- Name it with the `...Exception` suffix and after the *condition*, not the *code*.
- Provide at least the `(String)` and `(String, Throwable)` constructors.
- Add domain data (like `shortfall`) only if a handler can use it.
- Group related domain exceptions under a common **base exception** so callers can catch
  the whole family when appropriate.

---

## 6. Worked Example (25 min): `BankAccount` with a custom exception hierarchy

**Goal:** Model a bank account whose operations refuse invalid states by throwing clear,
domain-specific exceptions.

### Step 1 — A base domain exception

```java
/** Base type for all banking-domain errors, so callers can catch the whole family. */
public class BankingException extends Exception {
    public BankingException(String message) { super(message); }
    public BankingException(String message, Throwable cause) { super(message, cause); }
}
```

### Step 2 — Two specific checked exceptions

```java
public class InsufficientFundsException extends BankingException {
    private final double shortfall;
    public InsufficientFundsException(double requested, double balance) {
        super(String.format("Cannot withdraw %.2f; balance is %.2f", requested, balance));
        this.shortfall = requested - balance;
    }
    public double getShortfall() { return shortfall; }
}

public class InvalidAmountException extends BankingException {
    public InvalidAmountException(double amount) {
        super("Amount must be positive, but was: " + amount);
    }
}
```

### Step 3 — The account uses `throw` and declares `throws`

```java
public class BankAccount {
    private double balance;

    public BankAccount(double initialBalance) {
        this.balance = Math.max(0, initialBalance);
    }

    public double getBalance() { return balance; }

    /** @throws InvalidAmountException if amount <= 0 (unchecked-style precondition, but checked here) */
    public void deposit(double amount) throws InvalidAmountException {
        if (amount <= 0) {
            throw new InvalidAmountException(amount);   // fail fast
        }
        balance += amount;
    }

    /**
     * @throws InvalidAmountException      if amount <= 0
     * @throws InsufficientFundsException  if amount > balance
     */
    public void withdraw(double amount)
            throws InvalidAmountException, InsufficientFundsException {
        if (amount <= 0) {
            throw new InvalidAmountException(amount);
        }
        if (amount > balance) {
            throw new InsufficientFundsException(amount, balance);
        }
        balance -= amount;
    }
}
```

### Step 4 — The caller handles the family and the specifics

```java
public class BankDemo {
    public static void main(String[] args) {
        BankAccount account = new BankAccount(100.0);

        try {
            account.deposit(50.0);       // ok -> 150
            account.withdraw(200.0);     // throws InsufficientFundsException
        } catch (InsufficientFundsException e) {
            // Handle the specific case with its extra data.
            System.out.println(e.getMessage());
            System.out.printf("You need %.2f more.%n", e.getShortfall());
        } catch (BankingException e) {
            // Catch the rest of the banking family (e.g., InvalidAmountException).
            System.out.println("Banking error: " + e.getMessage());
        }

        System.out.println("Final balance: " + account.getBalance());
    }
}
```

**Expected output:**

```
Cannot withdraw 200.00; balance is 150.00
You need 50.00 more.
Final balance: 150.00
```

**Teaching points to emphasize live:**

1. `throw` *raises*; `throws` *declares*. `withdraw` does both.
2. Because these are **checked** exceptions, `main` is *forced* by the compiler to catch or
   declare them — the compiler is helping us not forget.
3. Catch order: `InsufficientFundsException` (specific) before `BankingException`
   (its parent) — the same ordering rule from Session 1.
4. The custom exception carries **domain data** (`getShortfall()`), which a generic
   exception could never provide.

---

## 7. Guided In-Class Practice (30 min): `UserRegistrationService`

Work in pairs. Build a validation service that rejects bad registration data with clear,
custom exceptions and demonstrates propagation.

### Requirements

1. Create a base exception `RegistrationException extends Exception`.
2. Create three specific subclasses:
   - `InvalidUsernameException` (username null, shorter than 3, or contains spaces),
   - `WeakPasswordException` (password shorter than 8 characters),
   - `InvalidEmailException` (email does not contain `@`).
3. Write `void register(String username, String password, String email) throws RegistrationException`
   that validates each field and `throw`s the appropriate exception (**fail fast** — throw
   on the first problem found).
4. In `main`, call `register` with several inputs and handle each specific exception with a
   tailored message, plus a final `catch (RegistrationException e)` as a safety net.
5. **Bonus (exception translation):** add a method that reads a raw registration line from
   a `Scanner`/file and, on any `IOException`, wraps it as
   `throw new RegistrationException("Could not read registration input", e);` — preserving
   the cause.

### Starter skeleton

```java
public class RegistrationException extends Exception {
    public RegistrationException(String message) { super(message); }
    public RegistrationException(String message, Throwable cause) { super(message, cause); }
}

// TODO: InvalidUsernameException, WeakPasswordException, InvalidEmailException
//       each extends RegistrationException

public class UserRegistrationService {
    public void register(String username, String password, String email)
            throws RegistrationException {
        // TODO: validate username, then password, then email; throw on first failure
    }
}
```

### Reference solution (reveal after students attempt it)

```java
class RegistrationException extends Exception {
    public RegistrationException(String message) { super(message); }
    public RegistrationException(String message, Throwable cause) { super(message, cause); }
}
class InvalidUsernameException extends RegistrationException {
    public InvalidUsernameException(String msg) { super(msg); }
}
class WeakPasswordException extends RegistrationException {
    public WeakPasswordException(String msg) { super(msg); }
}
class InvalidEmailException extends RegistrationException {
    public InvalidEmailException(String msg) { super(msg); }
}

class UserRegistrationService {
    public void register(String username, String password, String email)
            throws RegistrationException {
        if (username == null || username.length() < 3 || username.contains(" ")) {
            throw new InvalidUsernameException("Invalid username: " + username);
        }
        if (password == null || password.length() < 8) {
            throw new WeakPasswordException("Password must be at least 8 characters.");
        }
        if (email == null || !email.contains("@")) {
            throw new InvalidEmailException("Invalid email: " + email);
        }
        System.out.println("User registered: " + username);
    }
}

public class RegistrationDemo {
    public static void main(String[] args) {
        UserRegistrationService service = new UserRegistrationService();
        String[][] attempts = {
            {"ab", "password123", "a@b.com"},        // bad username
            {"alice", "123", "a@b.com"},             // weak password
            {"alice", "password123", "invalid"},     // bad email
            {"alice", "password123", "alice@corhuila.edu.co"} // valid
        };
        for (String[] a : attempts) {
            try {
                service.register(a[0], a[1], a[2]);
            } catch (InvalidUsernameException e) {
                System.out.println("[USERNAME] " + e.getMessage());
            } catch (WeakPasswordException e) {
                System.out.println("[PASSWORD] " + e.getMessage());
            } catch (InvalidEmailException e) {
                System.out.println("[EMAIL] " + e.getMessage());
            } catch (RegistrationException e) {       // safety net for the family
                System.out.println("[REGISTRATION] " + e.getMessage());
            }
        }
    }
}
```

### Checkpoints while circulating

- Is validation ordered and does it **throw on the first failure** (fail fast)?
- Are the specific `catch` blocks **before** the base `RegistrationException` catch?
- In the bonus, did they pass the original `IOException` as the **cause** (second argument)
  rather than dropping it?
- Ask a pair to justify: should `InvalidEmailException` be checked or unchecked? (Either is
  defensible — the point is that they can *argue* the trade-off, which feeds the forum.)

---

## 8. Wrap-up, Exit Ticket, and Forum Launch (5 min)

### Key takeaways

- Checked = compiler-enforced, recoverable; unchecked = programming bugs.
- `throws` declares and propagates; `throw` raises deliberately (fail fast).
- Translate low-level exceptions into domain ones **without losing the cause**.
- Custom exceptions make error conditions self-documenting and carry domain data; group
  them under a common base type.

### Exit ticket

1. Give one example each of a situation deserving a **checked** exception and one deserving
   an **unchecked** exception, and justify.
2. What is wrong with `throw new ServiceException("failed");` inside a `catch (SQLException e)`?
3. Why must the base `RegistrationException` catch come *last*?

### Forum argument (Objective 5 — launch now, due per course calendar)

> **Prompt:** "Why is correct exception handling essential for the robustness of a software
> system?" Post an argument of 150-250 words citing **at least two** concrete technical
> reasons (e.g., resource leaks, data corruption, security exposure, debuggability, user
> trust). Reference at least one anti-pattern from this week and one reading from
> `material/README.md`. Reply substantively to **one** classmate.

The forum is assessed with the argumentation rubric described in the optional activity
folder and contributes to the Corte 3 participation grade.
