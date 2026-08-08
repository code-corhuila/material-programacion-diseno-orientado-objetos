# Week 11 - Session 1: Foundations of Exception Handling (`try`, `catch`, `finally`)

**Course:** Object-Oriented Programming and Design (2026-B)
**Unit 3 - Practical application of OOP in Java**
**Session:** 1 of 2 | **Duration:** 120 minutes | **Corte 3**

---

## 1. Session Objective

By the end of this session the student will be able to **isolate risky code inside a
`try` block, respond to specific exception types with ordered `catch` blocks, guarantee
cleanup with `finally`, and manage resources safely with `try`-with-resources**, correctly
reading the resulting stack traces.

This session maps to weekly Objectives 1 and 4.

---

## 2. Timed Agenda (120 min)

| Time | Segment | Activity |
|---|---|---|
| 0:00 - 0:10 | Warm-up | "What breaks?" — students predict how three tiny programs fail. |
| 0:10 - 0:35 | Theory I | The `Throwable` hierarchy; errors vs. exceptions; the failure lifecycle. |
| 0:35 - 1:00 | Theory II | `try`/`catch`/`finally` anatomy, catch ordering, multi-catch, `try`-with-resources. |
| 1:00 - 1:25 | Worked example | Instructor builds `SafeCalculator` live, step by step. |
| 1:25 - 1:55 | Guided practice | Students build `SafeFileWordCounter` in pairs. |
| 1:55 - 2:00 | Wrap-up | Exit ticket + preview of Session 2. |

---

## 3. Warm-up (10 min): "What breaks?"

On screen, without running them, predict the outcome of each snippet:

```java
// A
int[] data = {1, 2, 3};
System.out.println(data[5]);

// B
String name = null;
System.out.println(name.length());

// C
int result = 10 / 0;
```

**Discussion:** All three *compile* but *fail at runtime*. `A` throws
`ArrayIndexOutOfBoundsException`, `B` throws `NullPointerException`, `C` throws
`ArithmeticException`. None of them were caught, so the JVM prints a **stack trace** and
terminates the current thread. Today we learn to take control of what happens next.

---

## 4. Theory I — The Failure Model (25 min)

### 4.1 Normal flow vs. exceptional flow

In normal execution, statements run top to bottom and methods return values. When
something abnormal happens, Java **stops normal flow**, creates an *exception object* that
describes the problem, and looks for code willing to *handle* it. This separation lets you
keep the "happy path" readable and push error handling to dedicated places.

### 4.2 The `Throwable` hierarchy

Everything that can be thrown in Java descends from `java.lang.Throwable`:

```
                    Throwable
                   /         \
              Error           Exception
           (do NOT catch)    /         \
                     RuntimeException   (other checked exceptions)
                     (unchecked)         e.g. IOException, SQLException
                    /       |      \
   NullPointerException  Arithmetic  IllegalArgument
                         Exception   Exception
```

- **`Error`** — Catastrophic JVM-level problems (`OutOfMemoryError`,
  `StackOverflowError`). A normal application is *not* expected to recover from these, so
  you should almost never catch them.
- **`Exception`** — The branch your programs work with. It splits into:
  - **Checked exceptions** — everything under `Exception` *except* `RuntimeException`
    (e.g., `IOException`). The **compiler forces** you to handle or declare them.
  - **Unchecked exceptions** — everything under `RuntimeException` (e.g.,
    `NullPointerException`). The compiler does *not* force handling; these usually signal
    a **bug** in your code.

> We study the checked/unchecked distinction in depth in Session 2. For today, just know
> the three "big" unchecked ones — `NullPointerException`, `ArithmeticException`,
> `ArrayIndexOutOfBoundsException` — because we will provoke and catch them.

### 4.3 The lifecycle of a thrown exception

```
   [ risky statement executes ]
              |
       problem detected
              |
     exception object created  --->  contains: type, message, stack trace, (cause)
              |
   JVM searches the call stack upward for a matching catch
              |
        found? ---- yes ---> run that catch block, then continue after the try
              |
              no
              |
   thread terminates; JVM prints the stack trace
```

### 4.4 Reading a stack trace

```
Exception in thread "main" java.lang.ArithmeticException: / by zero
    at SafeCalculator.divide(SafeCalculator.java:12)
    at SafeCalculator.main(SafeCalculator.java:5)
```

Read it **top-down**: the first line is the exception type and message; each `at` line is a
frame in the call chain, **most recent first**. Here the failure happened in `divide` at
line 12, which was called from `main` at line 5. The stack trace is your primary debugging
tool — never discard it.

---

## 5. Theory II — `try` / `catch` / `finally` (25 min)

### 5.1 Basic anatomy

```java
try {
    // risky code that might throw
} catch (SpecificException e) {
    // handle that specific problem
} finally {
    // ALWAYS runs: cleanup, release resources
}
```

- The **`try`** block brackets the code you are monitoring.
- Each **`catch`** binds to one exception type (and its subtypes) and runs *only* if a
  matching exception is thrown.
- The **`finally`** block runs **no matter what** — normal completion, a caught exception,
  or even an uncaught one on its way up (and, in most cases, even after a `return`).

### 5.2 Catching specific vs. general types

Prefer **specific** types. Catching `Exception` (or worse, `Throwable`) hides bugs and
catches things you did not intend to handle:

```java
// Bad: too broad — hides NullPointerExceptions, typos, everything.
try { risky(); } catch (Exception e) { /* ... */ }

// Good: handle exactly what you expect and know how to recover from.
try { risky(); } catch (IOException e) { /* recover from I/O failure */ }
```

### 5.3 Multiple `catch` blocks and ordering

A `try` may have several `catch` blocks. Java checks them **top to bottom** and runs the
**first** that matches. Therefore, **more specific types must come before more general
ones** — otherwise the general handler shadows the specific one and the code
**does not compile**:

```java
try {
    process();
} catch (FileNotFoundException e) {   // specific subtype first
    System.out.println("File not found: " + e.getMessage());
} catch (IOException e) {             // more general later
    System.out.println("Other I/O error: " + e.getMessage());
}
```

Reversing these two (`IOException` first) is a **compile error**:
`FileNotFoundException` is a subclass of `IOException`, so the second catch would be
unreachable.

### 5.4 Multi-catch

When two unrelated exception types need the *same* handling, combine them with `|`:

```java
try {
    parseAndStore(input);
} catch (NumberFormatException | IllegalStateException e) {
    System.out.println("Rejected input: " + e.getMessage());
}
```

Restriction: the types in a multi-catch must **not** be in a subclass/superclass
relationship (e.g., `IOException | FileNotFoundException` is illegal — the subtype is
redundant).

### 5.5 The guarantees (and traps) of `finally`

`finally` is for **cleanup that must happen regardless of outcome**: closing a file,
releasing a lock, restoring state. Two things to remember:

1. `finally` runs even if the `try` or `catch` executes a `return`.
2. **Never `return` from `finally`** and avoid throwing from it — doing so can *discard*
   the original exception, silently hiding the real failure:

```java
// ANTI-PATTERN: the return in finally swallows any exception from the try block.
try {
    return compute();     // if this throws, ...
} finally {
    return 0;             // ...this return replaces it. The real error vanishes.
}
```

### 5.6 `try`-with-resources (the modern way to clean up)

Any object implementing `AutoCloseable` (all the standard I/O streams, readers, JDBC
connections, etc.) can be declared in a `try`-with-resources header. Java **closes it
automatically** — in reverse order of declaration — even if an exception is thrown, so you
rarely need a manual `finally` for closing:

```java
// Manual, error-prone way
BufferedReader reader = null;
try {
    reader = new BufferedReader(new FileReader("data.txt"));
    System.out.println(reader.readLine());
} catch (IOException e) {
    System.out.println("I/O error: " + e.getMessage());
} finally {
    if (reader != null) {
        try { reader.close(); } catch (IOException ignored) { }
    }
}

// try-with-resources: cleaner, safer, and closes automatically
try (BufferedReader reader = new BufferedReader(new FileReader("data.txt"))) {
    System.out.println(reader.readLine());
} catch (IOException e) {
    System.out.println("I/O error: " + e.getMessage());
}
```

If both the body *and* the `close()` throw, the body's exception is the primary one and the
`close()` exception is attached as a **suppressed exception** (retrievable via
`getSuppressed()`) — no failure is silently lost.

---

## 6. Worked Example (25 min): `SafeCalculator`

**Goal:** Build a small calculator that reads two numbers and an operator from the
command line and never crashes on bad input — it reports the problem and cleans up.

We build it incrementally so students see each concept take effect.

```java
public class SafeCalculator {

    /**
     * Divides a by b.
     * @throws ArithmeticException if b == 0 (thrown by the JVM for integer / by zero)
     */
    public static int divide(int a, int b) {
        return a / b; // may throw ArithmeticException: "/ by zero"
    }

    public static void main(String[] args) {
        System.out.println("=== Safe Calculator ===");

        try {
            // args[0] and args[1] are the operands; args[2] is the operator (+ - * /)
            int a = Integer.parseInt(args[0]);   // may throw NumberFormatException
            int b = Integer.parseInt(args[1]);   // and ArrayIndexOutOfBoundsException
            String op = args[2];

            int result;
            switch (op) {
                case "+": result = a + b; break;
                case "-": result = a - b; break;
                case "*": result = a * b; break;
                case "/": result = divide(a, b); break; // may throw ArithmeticException
                default:
                    // We deliberately raise our own error for an unknown operator.
                    throw new IllegalArgumentException("Unknown operator: " + op);
            }
            System.out.println("Result: " + result);

        } catch (ArrayIndexOutOfBoundsException e) {
            System.out.println("Usage: java SafeCalculator <a> <b> <op>");
        } catch (NumberFormatException e) {
            System.out.println("Operands must be integers. You typed: " + e.getMessage());
        } catch (ArithmeticException e) {
            System.out.println("Math error: " + e.getMessage()); // e.g. "/ by zero"
        } catch (IllegalArgumentException e) {
            System.out.println("Input error: " + e.getMessage());
        } finally {
            System.out.println("Calculation attempt finished. (finally always runs)");
        }
    }
}
```

### Trace it together

| Invocation | What happens | Output (besides the `finally` line) |
|---|---|---|
| `10 2 /` | Happy path | `Result: 5` |
| `10 0 /` | `divide` throws `ArithmeticException` | `Math error: / by zero` |
| `abc 2 +` | `parseInt` throws `NumberFormatException` | `Operands must be integers...` |
| `10` (missing args) | `args[1]` throws `ArrayIndexOutOfBounds` | `Usage: java SafeCalculator ...` |
| `10 2 %` | our `throw` fires | `Input error: Unknown operator: %` |

**Teaching points to emphasize live:**

1. The `finally` line prints in **every** case — success and every failure.
2. Ordering matters: `NumberFormatException` is a subclass of `IllegalArgumentException`,
   so it must appear **before** the `IllegalArgumentException` catch (swap them and the
   compiler complains about an unreachable catch).
3. We *provoked* an error ourselves with `throw new IllegalArgumentException(...)` — a
   preview of Session 2.

---

## 7. Guided In-Class Practice (30 min): `SafeFileWordCounter`

Work in pairs. Build a program that counts the words in a text file and never crashes.

### Requirements

1. Read the file path from `args[0]`.
2. Open the file using **`try`-with-resources** with a `BufferedReader`.
3. Count words line by line (split on whitespace).
4. Handle these cases distinctly:
   - No argument given → print a usage message.
   - File does not exist → print a friendly "file not found" message
     (`FileNotFoundException`).
   - Any other I/O problem → print a generic I/O message (`IOException`).
5. Print the total word count on success.
6. Add a `catch`-free confirmation... actually, print a final "Done." line **using nothing
   but the automatic close** (i.e., no manual `finally` for closing — that is the point of
   try-with-resources).

### Starter skeleton

```java
import java.io.BufferedReader;
import java.io.FileNotFoundException;
import java.io.FileReader;
import java.io.IOException;

public class SafeFileWordCounter {
    public static void main(String[] args) {
        if (args.length < 1) {
            System.out.println("Usage: java SafeFileWordCounter <path-to-file>");
            return;
        }

        // TODO: try-with-resources with BufferedReader(new FileReader(args[0]))
        //       count words per line, accumulate the total,
        //       catch FileNotFoundException, then IOException (correct order!),
        //       print the total on success.
    }
}
```

### Reference solution (reveal after students attempt it)

```java
import java.io.BufferedReader;
import java.io.FileNotFoundException;
import java.io.FileReader;
import java.io.IOException;

public class SafeFileWordCounter {
    public static void main(String[] args) {
        if (args.length < 1) {
            System.out.println("Usage: java SafeFileWordCounter <path-to-file>");
            return;
        }

        int totalWords = 0;
        try (BufferedReader reader = new BufferedReader(new FileReader(args[0]))) {
            String line;
            while ((line = reader.readLine()) != null) {
                String trimmed = line.trim();
                if (!trimmed.isEmpty()) {
                    totalWords += trimmed.split("\\s+").length;
                }
            }
            System.out.println("Total words: " + totalWords);
        } catch (FileNotFoundException e) {          // specific first
            System.out.println("File not found: " + args[0]);
        } catch (IOException e) {                      // general later
            System.out.println("Could not read the file: " + e.getMessage());
        }
        // No manual close needed: try-with-resources already closed the reader.
    }
}
```

### Checkpoints while circulating

- Did they put `FileNotFoundException` **before** `IOException`? (If reversed, it will not
  compile — a great teachable moment.)
- Did they resist adding a manual `finally { reader.close(); }`? It is unnecessary and, if
  `reader` is scoped inside the try header, not even visible.
- Ask one pair to intentionally pass a directory instead of a file and observe which catch
  fires.

---

## 8. Wrap-up and Exit Ticket (5 min)

### Key takeaways

- Exceptions separate the happy path from error handling.
- `try` monitors, `catch` handles (specific before general), `finally` always cleans up.
- `try`-with-resources closes `AutoCloseable` resources automatically and safely.
- Never swallow exceptions and never `return` from `finally`.

### Exit ticket (submit on a card / chat before leaving)

1. In `SafeCalculator`, in which invocation(s) does the `finally` line **not** print?
   (Answer: none — it always prints.)
2. Why must `FileNotFoundException` be caught before `IOException`?
3. Rewrite this manual cleanup as `try`-with-resources:
   ```java
   Scanner sc = new Scanner(System.in);
   try { /* use sc */ } finally { sc.close(); }
   ```

### Preview of Session 2

Next session we move from *handling* exceptions to *designing* them: checked vs.
unchecked, propagating with `throws`, throwing deliberately with `throw`, translating
low-level exceptions into meaningful domain ones, and building our own exception classes.
