# Week 11 - Curated Materials & Readings (Download Area)

**Course:** Object-Oriented Programming and Design (2026-B)
**Unit 3 - Practical application of OOP in Java**
**Topic:** Error and exception handling with `try`, `catch`, `throw`, `throws`, `finally`
**Corte 3**

> **What this folder is:** a **download area** and a curated reference index for the week.
> A consolidated PDF of the week's notes lives here for you to **download and read
> offline**. This is *not* a Moodle submission box — you do not upload anything here.
> In-class practice code and the forum are handled in their own spaces; the optional graded
> activity is submitted via **GitHub** (see [`../optional-activity/README.md`](../optional-activity/README.md)).

---

## 1. How to use this material

1. **Download the PDF** (`week11-exception-handling.pdf`, placed in this folder by the
   instructor) and skim the whole thing once before Session 1.
2. Work through the **two primary readings** below — they are short and directly aligned
   with the sessions.
3. Use the **reference documentation** as a lookup while coding the practices.
4. Return to the **summary notes** in Section 4 as a rapid revision sheet before the Corte 3
   assessment.

---

## 2. Primary Readings (do these first)

### 2.1 Oracle — *The Java Tutorials: Lesson "Exceptions"*
- **Where:** `docs.oracle.com/javase/tutorial/essential/exceptions/`
- **Read:** "What Is an Exception?", "Catching and Handling Exceptions" (the `try`,
  `catch`, `finally`, and try-with-resources pages), "Specifying the Exceptions Thrown by a
  Method", "How to Throw Exceptions", and "Creating Exception Classes".
- **Why:** It is the canonical, free, beginner-friendly walkthrough that mirrors this
  week's structure almost one-to-one.
- **Focus questions:**
  1. What is the "catch or specify" (handle-or-declare) requirement, and to which exceptions
     does it apply?
  2. How does try-with-resources differ from a manual `finally` for closing resources?

### 2.2 Joshua Bloch — *Effective Java* (3rd ed.), Chapter 10 "Exceptions"
- **Items most relevant this week:**
  - Item 69: *Use exceptions only for exceptional conditions.*
  - Item 70: *Use checked exceptions for recoverable conditions and runtime exceptions for
    programming errors.*
  - Item 72: *Favor the use of standard exceptions.*
  - Item 73: *Throw exceptions appropriate to the abstraction* (exception translation).
  - Item 75: *Include failure-capture information in detail messages.*
  - Item 77: *Don't ignore exceptions* (the empty-catch anti-pattern).
- **Why:** These items are the professional "rules of the road" and are the strongest
  source material for the forum argument.

---

## 3. Reference Documentation (lookup while coding)

| Resource | Where | Use it for |
|---|---|---|
| `java.lang.Throwable` API | `docs.oracle.com/en/java/javase/API` | The methods every exception has: `getMessage()`, `getCause()`, `printStackTrace()`, `getSuppressed()`. |
| `java.lang.Exception` / `RuntimeException` API | Same site | Confirming which built-in exceptions are checked vs. unchecked. |
| `java.lang.AutoCloseable` API | Same site | Understanding what makes a resource usable in try-with-resources. |
| *Java Language Specification*, Ch. 11 "Exceptions" | `docs.oracle.com/javase/specs` | The precise, authoritative rules (advanced; for the curious). |
| Baeldung — "Exception Handling in Java" | `baeldung.com` | Practical, example-driven articles on multi-catch, custom exceptions, and try-with-resources. |

> **Version note:** Examples target **Java 11+** (LTS). Try-with-resources and multi-catch
> require Java 7+, so all course code compiles on any modern JDK.

---

## 4. Summary Notes (rapid revision sheet)

### 4.1 The five keywords at a glance

| Keyword | Role | Example |
|---|---|---|
| `try` | Monitors a block for exceptions. | `try { risky(); }` |
| `catch` | Handles a matching exception type. | `catch (IOException e) { ... }` |
| `finally` | Always runs; used for cleanup. | `finally { conn.close(); }` |
| `throw` | Raises an exception object now. | `throw new IllegalArgumentException("x");` |
| `throws` | Declares which checked exceptions a method may propagate. | `void read() throws IOException` |

### 4.2 Checked vs. unchecked — decision cue

```
Is the failure caused by a bug / broken precondition in the calling code?
   ├── YES → unchecked (extend RuntimeException). Fix the code.
   └── NO  → Is it a foreseeable, recoverable external condition?
              └── YES → checked (extend Exception). Force the caller to plan for it.
```

### 4.3 The `Throwable` hierarchy (memorize the shape)

```
Throwable
├── Error                (don't catch)
└── Exception
    ├── RuntimeException  (unchecked)
    └── ...others...      (checked)
```

### 4.4 Catch-ordering rule
Most specific type first, most general last. A subtype after its supertype is a **compile
error** (unreachable catch).

### 4.5 The seven habits of robust error handling
1. **Catch narrow** — the most specific type you can actually handle.
2. **Fail fast** — validate inputs and `throw` immediately on bad state.
3. **Never swallow** — no empty `catch` blocks; at minimum log with context.
4. **Clean up always** — prefer try-with-resources over manual `finally`.
5. **Preserve the cause** — when translating, pass the original as the cause.
6. **Add context** — messages should say *what*, *which value*, and *why*.
7. **Don't use exceptions for normal flow** — they are for the *exceptional*.

### 4.6 Anti-patterns to recognize (and avoid)

| Anti-pattern | Why it is harmful |
|---|---|
| Empty `catch { }` | Failures vanish silently; bugs become invisible. |
| `catch (Exception e)` everywhere | Hides unexpected bugs (like `NullPointerException`). |
| `return` inside `finally` | Discards the real exception being propagated. |
| Dropping the cause when re-throwing | Loses the root-cause stack trace. |
| Throwing checked exceptions for programming bugs | Forces meaningless boilerplate on callers. |
| Using exceptions for ordinary control flow | Slow, unreadable, and misleading. |

---

## 5. Contents of this download area

| File | Description |
|---|---|
| `week11-exception-handling.pdf` | Consolidated week notes for offline reading (placed here by the instructor). |
| `README.md` | This index and summary sheet. |

> If the PDF is not yet present, use this README plus the two session READMEs — together
> they contain the full written content of the week.

---

## 6. Connections to other weeks

- **Builds on:** Week 10 (interfaces, polymorphism) — custom exception hierarchies are just
  well-designed classes using inheritance and polymorphism.
- **Feeds into:** Later work on I/O, collections, and unit testing, where you will *assert*
  that the correct exceptions are thrown (`assertThrows`), and any real project where
  robustness is graded.
