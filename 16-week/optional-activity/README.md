# Week 16 - Optional Activity: "Pillars Portfolio Kata"

**Subject:** Object-Oriented Programming and Design - 2026-B
**Unit 3:** Practical application of OOP in Java · **Corte 3**
**RAA:** 90_82759
**Type:** Optional / enrichment · **Submission:** GitHub (NOT Moodle)

> This activity is **optional**. It is offered for enrichment and, at the instructor's discretion, for grade recovery within Corte 3. It is submitted through **GitHub only** — do not upload anything to Moodle for this task.

---

## 1. Rationale

The final project proves you can build a whole system. This kata proves something complementary and valuable for your portfolio: that you can take a **small, focused problem** and produce a clean, well-tested design that demonstrates all four OOP pillars *deliberately and legibly*. It is the kind of self-contained artefact that makes a strong portfolio entry and a good talking point in an interview.

---

## 2. Problem statement

Build a small **Notification Dispatcher** in Java.

A system needs to send notifications to users through different channels — **email**, **SMS**, and **push** — and possibly new channels later. Each channel formats and "sends" a message differently (for this exercise, "sending" means returning/printing a well-formed confirmation string; no real network calls are required). A dispatcher must be able to send the same message across a mixed list of channels without knowing their concrete types, and must handle failures gracefully (e.g., an invalid recipient) without stopping the whole batch.

You are free to choose a different but comparably-sized domain (e.g., report exporters to PDF/CSV/HTML, or discount strategies at checkout) **as long as it exercises all four pillars**. State your chosen domain in the README.

---

## 3. Requirements

Your solution must **demonstrate each pillar deliberately** and make it easy for a reviewer to locate:

1. **Abstraction** — Define a channel contract as an `interface` (e.g., `NotificationChannel` with `send(Message)` and `name()`), and a `Message` type. Callers depend on the abstraction, never on concrete channels.
2. **Encapsulation** — Model `Message` (and any recipient/config type) with private fields and validation in the constructor so an invalid object cannot exist (e.g., empty body or malformed recipient throws).
3. **Inheritance** — Provide a common `abstract` base (e.g., `AbstractChannel`) that holds shared validation/formatting reused by at least two concrete channels via `extends` and `super(...)`.
4. **Polymorphism** — A `Dispatcher` iterates over a `List<NotificationChannel>` and calls `send(...)` on each, producing channel-specific behaviour at runtime; a failure in one channel must not abort the rest.

**Engineering requirements:**

- At least **three** concrete channels.
- **Meaningful exception handling** (custom exception or documented use of standard exceptions); the dispatcher isolates per-channel failures.
- **Unit tests** (JUnit 5) covering: a successful send per channel, an invalid `Message` rejected at construction, and the dispatcher continuing after one channel fails.
- **Clean design:** small methods, intention-revealing names, one clear responsibility per class, no channel-specific `if/else` chains inside the dispatcher (that is what polymorphism replaces).
- A **`main`** (or a test) that runs a demo over a mixed channel list, including one failing case.

---

## 4. Expected deliverable

A public GitHub repository containing:

```
notification-dispatcher/
├── README.md                 # see required contents below
├── src/main/java/...         # source
├── src/test/java/...         # JUnit 5 tests
└── (build file: pom.xml or build.gradle, or clear compile/run instructions)
```

**The `README.md` must include:**

1. One-paragraph description of the problem and chosen domain.
2. A **"Where are the pillars?"** table: pillar -> file/class/line -> one-sentence justification (same format used in Session 1).
3. Exact commands to **build, test and run** from a clean clone.
4. A short note on your main design decision and one trade-off you considered.
5. A line mapping this artefact to **RAA 90_82759** (why it evidences the outcome).

---

## 5. How to submit (GitHub, not Moodle)

1. Create a **public** repository named `notification-dispatcher` (or your chosen domain) under your GitHub account.
2. Develop with sensible commits (the history is part of the evidence — avoid a single "final" commit).
   ```bash
   git init
   git add .
   git commit -m "feat: message model with validation (encapsulation)"
   # ... continue with focused commits ...
   git branch -M main
   git remote add origin https://github.com/<your-username>/notification-dispatcher.git
   git push -u origin main
   ```
3. **Tag** your submission so the graded state is unambiguous:
   ```bash
   git tag -a v1.0 -m "Optional activity submission - Week 16"
   git push origin v1.0
   ```
4. Paste the **repository URL** where the instructor indicates (e.g., the shared class sheet or by direct message) — **not** in Moodle.
5. Ensure the repo is public and builds from a clean clone; a reviewer must be able to run your tests without contacting you.

> If your final project is private for good reason, the instructor may accept read access instead of a fully public repo — arrange this in advance.

---

## 6. Assessment criteria / rubric

Levels: **4 Excellent · 3 Proficient · 2 Developing · 1 Beginning.** Suggested weights in parentheses.

| Criterion | 4 Excellent | 3 Proficient | 2 Developing | 1 Beginning |
|-----------|-------------|--------------|--------------|-------------|
| **Four pillars (30%)** | All four deliberate, obvious, justified in README table | All four present and locatable | 2-3 present or hard to locate | Pillars claimed but not evidenced |
| **Design quality (20%)** | High cohesion, low coupling, no type-switch in dispatcher | Clean; minor issues | Some coupling / responsibility mixing | Tangled; dispatcher branches on type |
| **Tests (20%)** | All required cases + edge cases, all pass | All required cases pass | Some tests / some failing | Missing or non-running tests |
| **Error handling (10%)** | Isolated per-channel failures; clear exceptions | Handles failures adequately | Partial handling | One failure aborts batch |
| **README & traceability (10%)** | Complete, incl. pillar table + RAA mapping | Mostly complete | Sparse | Missing |
| **Git hygiene (10%)** | Focused commits + tag; builds from clean clone | Reasonable history; builds | Few large commits | Single dump / does not build |

**Passing threshold for enrichment credit:** at least **Proficient (3)** on *Four pillars*, *Tests*, and *README & traceability*.

---

## 7. Extension ideas (for the ambitious)

- Add a **retry policy** as a separate strategy object (more polymorphism, still no `if` chains).
- Introduce a **factory** that builds channels from configuration.
- Add a `CompositeChannel` that fans out to several channels (composite pattern) — a neat demonstration that composition and polymorphism combine cleanly.

> Reminder: cite any external snippets or libraries. Original work only for the portions you claim as evidence of your own learning.
