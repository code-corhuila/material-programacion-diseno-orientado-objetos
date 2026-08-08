# Optional activity - Design a well-encapsulated class

**Subject:** Object-Oriented Programming and Design | **Week:** 03 | **Unit:** 1 | **Corte:** 1
**Topic:** Attributes, methods, and encapsulation with access modifiers, getters and setters
**RAA:** 90_82759
**Type:** Optional practice (graded if submitted) | **Submission:** via **GitHub** (not Moodle)

---

## 1. Purpose

This activity lets you demonstrate the full week's learning outcome: designing a class that **hides its data**, **exposes a controlled interface**, and **protects its invariants through validation**. It is optional, but completing it is the strongest preparation for Corte 1.

---

## 2. Problem statement

You will design and implement a single, well-encapsulated class: **`StudentEnrollment`**, which models a student's enrollment in one academic term.

A `StudentEnrollment` must track:

- The **student ID** (assigned once when the enrollment is created; never changes afterward).
- The **student name**.
- The **number of enrolled credits** (an integer).
- The **GPA** (grade point average, a decimal on a 0.0-5.0 scale — the Colombian scale).
- Whether the enrollment is **active**.

The class must guarantee, at all times, that an enrollment can never enter an invalid state — no matter what the calling code tries to do.

---

## 3. Invariants your class must protect

Your class must **always** keep these true:

1. **I1 — Student ID:** non-null, non-blank, and **immutable** after construction (read-only).
2. **I2 — Name:** non-null and non-blank.
3. **I3 — Credits:** between **0 and 24** inclusive. Never negative, never above the term cap of 24.
4. **I4 — GPA:** between **0.0 and 5.0** inclusive.
5. **I5 — Active state:** an enrollment starts **active**; it can be deactivated (withdrawn), and a **withdrawn enrollment cannot have credits added** to it.

---

## 4. Functional requirements

Implement the class so that:

1. **All attributes are `private`.** No public fields.
2. **Constructor** receives `studentId`, `name`, `credits`, and `gpa`, and **validates every one** — the object is *born valid* or construction fails with a clear exception.
3. **Read-only property:** `studentId` has a getter and **no** setter (enforce I1, e.g. with `final`).
4. **Validated setters:** provide `setName`, and setters/behavior for GPA that enforce I4. A raw `setCredits` is **not allowed**; instead provide meaningful behavior (see #5).
5. **Guarded behavior for credits:**
   - `addCredits(int qty)` — adds credits, keeping I3, rejecting non-positive `qty`, and **refusing if the enrollment is not active** (I5).
   - `dropCredits(int qty)` — removes credits, keeping `credits >= 0`, rejecting non-positive `qty`.
6. **State change:** `withdraw()` sets the enrollment inactive.
7. **Getters** for every attribute that should be readable (`getStudentId`, `getName`, `getCredits`, `getGpa`, `isActive`).
8. **One derived property:** `getAcademicStanding()` returns a `String` computed from the GPA (e.g., `"Excellent"` for GPA >= 4.5, `"Good"` for >= 3.5, `"At risk"` for >= 3.0, `"Probation"` below 3.0). Nothing is stored; it is computed on demand.
9. **Fail fast:** every rejection throws an exception (`IllegalArgumentException` for bad arguments, `IllegalStateException` for illegal operations like adding credits after withdrawal) with a descriptive message.

You may implement in **Java** (recommended, as it enforces the modifiers), or in **C#** or **Python** if you prefer — but if you choose Python you must use the `_`/`__` conventions *and* enforce validation in the accessors/`@property` methods.

---

## 5. Expected deliverable

A GitHub repository containing:

1. **The class source file** — e.g., `StudentEnrollment.java` (or `.cs` / `.py`).
2. **A small driver / demo** — e.g., `Main.java` — that:
   - Creates a valid enrollment and prints its state.
   - Attempts **at least four** invalid operations (e.g., negative credits, GPA of 6.0, adding credits after `withdraw()`, blank name) and shows that each is **rejected** (catch the exception and print the message).
3. **A `README.md`** (in the repo root) that includes:
   - A short description of the class and its purpose.
   - A **table listing each invariant (I1-I5) and exactly where in the code it is enforced** (constructor / which setter / which method).
   - A one-paragraph reflection: *"How does this class reduce coupling, and what internal change could I make later without breaking any client of the public interface?"*
4. *(Optional bonus)* Unit tests (JUnit / NUnit / `pytest`) asserting that invalid operations throw.

---

## 6. Submission instructions (GitHub, NOT Moodle)

> **Do not upload to Moodle.** Submit by sharing your **GitHub repository URL**.

1. **Create a public repository** named `oop-week03-encapsulation-<yourLastName>` (for example, `oop-week03-encapsulation-torres`).
2. **Initialize and commit** your work with clear, incremental commits (not a single "final" commit). Suggested flow:
   ```bash
   git init
   git add .
   git commit -m "feat: StudentEnrollment class with private fields and constructor validation"
   # ... keep working ...
   git add .
   git commit -m "feat: add guarded addCredits/dropCredits and withdraw behavior"
   git commit -m "docs: add README with invariant-enforcement table"
   ```
3. **Create the repository on GitHub** and push:
   ```bash
   git branch -M main
   git remote add origin https://github.com/<your-username>/oop-week03-encapsulation-<yourLastName>.git
   git push -u origin main
   ```
4. **Verify** that the repository is **public** and that the `README.md` renders correctly on the GitHub page.
5. **Submit the repository URL** through the channel the instructor indicates for GitHub links (e.g., the shared course spreadsheet or the designated forum thread) — **not** the Moodle assignment box.

**Deadline:** end of Week 03 (Corte 1). Late submissions follow the general course policy.

**Academic integrity:** the code must be your own. You may consult the readings and the course examples, but copying another student's repository is plagiarism. Cite any snippet you adapt from an external source in your `README.md`.

---

## 7. Assessment criteria / rubric (100 points)

| # | Criterion | Excellent (full) | Acceptable (partial) | Insufficient (low) | Pts |
|---|---|---|---|---|:---:|
| 1 | **Encapsulation** — all fields private; no leaked state | All attributes private; no public fields; no leaking of mutable references (25) | One field too visible, or minor leak (13) | Public fields present / broken encapsulation (0-6) | **25** |
| 2 | **Invariant protection** — I1-I5 enforced in constructor and setters/behavior | All five invariants provably enforced; object cannot become invalid (25) | 3-4 invariants enforced; one gap (14) | Two or more invariants unprotected (0-7) | **25** |
| 3 | **Getters/setters & property design** — correct naming; read-only ID; no raw `setCredits`; derived standing | Conventions correct; read-only ID; derived `getAcademicStanding`; credits only via behavior (20) | Minor naming issues or a raw setter present (11) | Getter/setter on everything, no design intent (0-6) | **20** |
| 4 | **Validation & fail-fast** — descriptive exceptions on every rejection | Correct exception types with clear messages everywhere (15) | Validation present but weak messages / wrong type (8) | Silent failures or missing validation (0-4) | **15** |
| 5 | **Demo / driver** — shows >= 4 invalid operations rejected | Clear demo proving each guard works (10) | Some cases shown (5) | No demonstration of rejection (0-2) | **10** |
| 6 | **Repo & documentation** — public repo, incremental commits, invariant table, reflection on coupling | Clean history; complete README table + coupling reflection (5) | README present but incomplete (3) | No meaningful README / single dump commit (0-1) | **5** |
| | **Total** | | | | **100** |

**Grade mapping (Colombian 0.0-5.0 scale):** `finalGrade = totalPoints / 20`. For example, 90/100 → 4.5.

---

## 8. Self-check before you submit

- [ ] Every attribute is `private`; there are no public fields.
- [ ] The constructor rejects every kind of invalid input (born valid).
- [ ] `studentId` is read-only (getter, no setter, `final`).
- [ ] There is **no** raw `setCredits`; credits change only via `addCredits`/`dropCredits`.
- [ ] `addCredits` refuses to run after `withdraw()` (I5).
- [ ] GPA setter enforces the 0.0-5.0 range (I4).
- [ ] `getAcademicStanding()` computes from GPA and stores nothing.
- [ ] Every rejection throws a clear, typed exception.
- [ ] The demo shows at least four invalid operations being rejected.
- [ ] The repo is **public**, the README has the invariant-enforcement table and the coupling reflection, and commits are incremental.

> Meeting this checklist maps directly onto the four RAA objectives: applying access modifiers, implementing safe getters/setters, designing a class that protects its invariants, and justifying encapsulation as a way to reduce coupling.
