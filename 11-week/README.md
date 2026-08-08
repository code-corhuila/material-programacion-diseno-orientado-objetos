# Week 11 - Error and Exception Handling with `try`, `catch`, `throw`, `throws`, and `finally`

**Program:** Object-Oriented Programming and Design
**Term:** 2026-B
**Unit:** Unit 3 - Practical application of OOP in Java
**Week:** 11 (Assessment period: **Corte 3**)
**Learning Outcome (RAA):** `90_82759`

---

## 1. Overview

Programs fail. Files disappear, networks drop, users type letters where numbers were
expected, and remote services return nonsense. A robust program is not one that never
encounters problems — it is one that *anticipates* problems and responds to them in a
controlled, predictable way. In Java, the primary mechanism for this control is the
**exception-handling model** built on the keywords `try`, `catch`, `throw`, `throws`,
and `finally`.

This week closes the "make it correct, then make it robust" arc of Unit 3. In earlier
weeks you built classes, encapsulated state, and modeled behavior. Now you learn how
those objects should *behave when something goes wrong*: how to detect an error, how to
signal it upward, how to recover or clean up, and how to design your own exception types
that speak the language of your problem domain.

By the end of the week you should be able to read a stack trace without fear, decide
deliberately between checked and unchecked exceptions, and defend — in the discussion
forum — why disciplined exception handling is a cornerstone of software robustness.

---

## 2. Learning Outcome (RAA) and Competencies

### RAA `90_82759`
> Applies object-oriented programming principles in Java to build robust, maintainable
> solutions, incorporating structured error and exception handling to guarantee correct
> behavior under abnormal conditions.

### Competencies addressed this week

| Competency | How it is developed in Week 11 |
|---|---|
| **Technical / disciplinary** | Uses the Java exception model (`try`/`catch`/`finally`, `throw`/`throws`, custom exceptions) to detect, propagate, and recover from runtime errors. |
| **Problem-solving** | Analyzes failure scenarios and chooses an appropriate handling strategy (recover, translate, propagate, or fail fast). |
| **Design thinking** | Designs a domain-specific exception hierarchy that communicates intent and preserves encapsulation. |
| **Communication / argumentation** | Argues, with technical evidence, why correct exception handling is essential for robustness (forum activity). |
| **Professional ethics** | Recognizes that swallowing or hiding errors is a professional and safety risk, not a convenience. |

---

## 3. Weekly Objectives (measurable)

By the end of Week 11, the student will be able to:

1. **Handle** runtime errors by writing `try`-`catch`-`finally` blocks that isolate risky
   code, respond to specific exception types, and guarantee resource cleanup.
2. **Distinguish** checked exceptions from unchecked exceptions and **propagate** checked
   exceptions correctly using the `throws` clause, justifying the choice in each case.
3. **Create and throw** at least one custom exception class that signals a domain-specific
   error condition, following Java naming and design conventions.
4. **Apply** the `try`-with-resources statement to manage `AutoCloseable` resources safely
   and explain how it improves on a manual `finally` block.
5. **Argue** in the course forum, using at least two concrete technical reasons, why
   correct exception handling is essential for the robustness of a software system.

> *Measurability note:* Objectives 1-4 are evidenced through compilable, running code in
> the in-class practices and the optional GitHub activity; Objective 5 is evidenced through
> a written forum post assessed with the rubric in `optional-activity/`.

---

## 4. Contents Outline

1. **What is an exception?**
   - Errors vs. exceptions vs. normal control flow.
   - The `Throwable` hierarchy: `Error`, `Exception`, `RuntimeException`.
2. **The `try`-`catch`-`finally` construct**
   - Anatomy of a `try` block; catching specific vs. general types.
   - Multi-catch (`catch (A | B e)`) and catch ordering rules.
   - The role and guarantees of `finally`.
3. **Checked vs. unchecked exceptions**
   - The compiler's "handle-or-declare" rule.
   - When to use each; the `throws` clause and exception propagation.
4. **Throwing exceptions**
   - The `throw` statement; re-throwing and exception translation (wrapping).
   - Preserving the cause chain (`initCause` / chained constructors).
5. **Custom (user-defined) exceptions**
   - Extending `Exception` vs. `RuntimeException`.
   - Designing a small domain exception hierarchy.
6. **Resource management**
   - `try`-with-resources and the `AutoCloseable` interface.
   - Suppressed exceptions.
7. **Best practices and anti-patterns**
   - Fail fast, never swallow, catch narrow, clean up always, add context.

---

## 5. Session-by-Session Agenda

| Session | Focus | Key deliverable |
|---|---|---|
| **Session 1** | Foundations: the `Throwable` hierarchy, `try`/`catch`/`finally`, multi-catch, and `try`-with-resources. | A working "safe division / safe file read" program with correct cleanup. |
| **Session 2** | Propagation and design: checked vs. unchecked, `throws`, `throw`, exception translation, and custom exception classes. | A domain exception hierarchy used by a small validation service. |

- **Session 1 detail:** [`01-session/README.md`](01-session/README.md)
- **Session 2 detail:** [`02-session/README.md`](02-session/README.md)
- **Readings / download area:** [`material/README.md`](material/README.md)
- **Optional GitHub activity:** [`optional-activity/README.md`](optional-activity/README.md)

Each session is planned for a **2-hour block** (120 minutes) with an integrated timed
agenda inside its README.

---

## 6. Key-Concepts Glossary

| Term | Definition |
|---|---|
| **Exception** | An object representing an abnormal condition that disrupts the normal flow of a program. In Java, every exception is an instance of a class descending from `java.lang.Throwable`. |
| **`Throwable`** | The root superclass of everything that can be thrown or caught. Its two main branches are `Error` and `Exception`. |
| **`Error`** | Serious problems that a normal application should *not* try to catch (e.g., `OutOfMemoryError`, `StackOverflowError`). |
| **Checked exception** | A subclass of `Exception` (but not of `RuntimeException`) that the compiler forces you to either catch or declare with `throws`. Represents recoverable, foreseeable conditions (e.g., `IOException`). |
| **Unchecked exception** | A subclass of `RuntimeException`. The compiler does not require handling; usually signals a programming bug (e.g., `NullPointerException`, `IllegalArgumentException`). |
| **`try` block** | The region of code where an exception might occur and be monitored. |
| **`catch` block** | A handler bound to one or more exception types; runs when a matching exception is thrown inside the `try`. |
| **`finally` block** | Code guaranteed to run after the `try`/`catch`, whether or not an exception occurred — used for cleanup. |
| **`throw`** | The statement that actually raises an exception object (`throw new IllegalArgumentException("...")`). |
| **`throws`** | A method-signature clause declaring which checked exceptions the method may propagate to its caller. |
| **Propagation** | The process by which an uncaught exception travels up the call stack until a matching handler is found (or the program terminates). |
| **Stack trace** | The record of the method-call chain at the moment the exception was created; printed by `printStackTrace()` and shown when a program crashes. |
| **Exception translation / wrapping** | Catching a low-level exception and re-throwing a higher-level one that carries the original as its *cause*. |
| **Cause chain** | The linked list of exceptions (`getCause()`) that preserves the original failure through translation layers. |
| **`try`-with-resources** | A `try` form that automatically closes resources implementing `AutoCloseable`, even if an exception occurs. |
| **Suppressed exception** | An exception thrown while closing a resource that would otherwise mask the primary exception; retrievable via `getSuppressed()`. |
| **Fail fast** | The principle of detecting and reporting an invalid state as early as possible instead of continuing with corrupt data. |
| **Swallowing an exception** | The anti-pattern of catching an exception and doing nothing (empty `catch`), hiding failures. |

---

## 7. Achievement / Self-Check Checklist

Use this list before the Corte 3 assessment. Mark each item honestly.

- [ ] I can explain the difference between an `Error`, a checked `Exception`, and a `RuntimeException`, and give an example of each.
- [ ] I can write a `try`-`catch`-`finally` block and predict exactly which lines execute in the success case and in the failure case.
- [ ] I can order multiple `catch` blocks correctly (most specific first) and explain why the reverse fails to compile.
- [ ] I can use multi-catch (`catch (A | B e)`) and know when it is *not* allowed (types in a subtype relationship).
- [ ] I can decide, for a new method, whether it should throw a checked or an unchecked exception and justify the decision.
- [ ] I can add a `throws` clause and explain how the exception propagates up the call stack.
- [ ] I can `throw` an exception deliberately to enforce a precondition (fail fast).
- [ ] I can create a custom exception class, choose the right superclass, and provide the standard constructors (including the cause-accepting one).
- [ ] I can perform exception translation without losing the original cause.
- [ ] I can rewrite a manual `finally`-based cleanup as a `try`-with-resources statement.
- [ ] I can name at least three exception-handling anti-patterns and explain the harm each causes.
- [ ] I can argue, in writing, at least two reasons why correct exception handling improves robustness.

---

## 8. Resources Index

| Resource | Location | Purpose |
|---|---|---|
| Session 1 plan | [`01-session/README.md`](01-session/README.md) | Theory + worked example + guided practice on `try`/`catch`/`finally`. |
| Session 2 plan | [`02-session/README.md`](02-session/README.md) | Theory + worked example + guided practice on propagation & custom exceptions. |
| Curated readings (download area) | [`material/README.md`](material/README.md) | Reference list, summaries, and the downloadable PDF for the week. |
| Optional GitHub activity | [`optional-activity/README.md`](optional-activity/README.md) | Extra practice with a rubric; submitted via GitHub (not Moodle). |

### External references (see `material/README.md` for full summaries)

- Oracle, *The Java Tutorials — Lesson: Exceptions.*
- *Effective Java* (3rd ed.), J. Bloch — Chapter 10, "Exceptions".
- *Java Language Specification (JLS)*, Chapter 11, "Exceptions".
- Oracle Java SE API documentation: `java.lang.Throwable`, `java.lang.AutoCloseable`.

---

## 9. How this week is assessed (Corte 3)

- In-class practices (Sessions 1 and 2) are formative and checked for compilation and
  correct behavior.
- The **forum argument** (Objective 5) is graded with the rubric described in the optional
  activity and contributes to the Corte 3 participation grade.
- The **optional GitHub activity** provides additional evidence toward the RAA and is
  graded with the rubric in [`optional-activity/README.md`](optional-activity/README.md).

> **Academic-integrity note:** All submitted code must be your own. You may discuss ideas
> with classmates, but shared code, AI-generated code presented as your own, or copied
> solutions violate the course integrity policy. Cite any external snippet you adapt.
