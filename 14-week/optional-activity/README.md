# Week 14 — Optional Activity: "Refactor the Legacy Class" (submitted via GitHub)

> **Subject:** Object-Oriented Programming and Design · **Unit 3** · **Week 14** · **Corte 3**
> **RAA:** `90_82759`
> **Modality:** Individual · **Optional** (formative + bonus evidence)
> **Submission:** **GitHub repository** — **not** Moodle.

---

## 1. Purpose

Consolidate the week's skills on a piece of code larger than the in-class
samples: run static-analysis tools, remove code smells, and **refactor without
changing behavior**, all proven by an automated test. This mirrors what happens
on a real team when you inherit a "legacy" class nobody wants to touch.

---

## 2. Problem statement

You inherit `LibraryFineCalculator`, a class that computes late-return fines for
a small library. It works — the numbers are correct — but it is painful to read
and change. Your job is to **make it clean and maintainable without altering a
single computed result.**

**Starter code** (create it as `LibraryFineCalculator.java`):

```java
public class libraryfinecalc {
    public double f(int d,String t,boolean s,int age){
        double fine=0;
        if(d>0){
            if(t.equals("BOOK")){ fine=d*500; }
            else if(t.equals("DVD")){ fine=d*1000; }
            else if(t.equals("MAGAZINE")){ fine=d*300; }
            else{ fine=d*500; }
            if(d>30){ fine=fine+10000; }
            if(s==true){ fine=fine-fine*0.5; }
            if(age>=60){ fine=fine-fine*0.2; }
            if(fine>50000){ fine=50000; }
        }
        return fine;
    }
}
```

Behavior to preserve (read carefully — these are the rules the code already
implements):
- Fine accrues only when days late `d > 0`.
- Daily rate depends on item type: `BOOK` 500, `DVD` 1000, `MAGAZINE` 300,
  anything else 500 (default).
- More than 30 days late adds a flat 10,000 surcharge.
- Students (`s == true`) get 50% off; patrons aged 60+ get an extra 20% off.
  (Discounts are applied in that order: student first, then senior.)
- The fine is capped at 50,000.

---

## 3. Requirements

You **must**:

1. **Set up tooling.** Add or configure **Checkstyle** (`google_checks.xml`) and
   **SonarLint** on the project. Capture a **"before" report** (violation count
   and/or screenshot).
2. **Write characterization tests first.** Before refactoring, write **JUnit 5**
   tests that pin down the current behavior across the branches (at minimum:
   a book, a DVD, a magazine, an unknown type, `d = 0`, `d > 30`, a student, a
   senior, and a case that hits the 50,000 cap). All tests must be **green
   against the original code** (rename the method if needed but do not change
   its logic).
3. **Refactor** applying **at least five distinct techniques** from the catalog,
   for example:
   - Rename (class, method, parameters, locals).
   - Replace Magic Numbers with named constants.
   - Extract Method (e.g., `baseRateFor(type)`, `applyDiscounts(...)`,
     `capFine(...)`).
   - Guard Clause (return early when `d <= 0`).
   - Replace the type `if/else` chain with a cleaner construct (e.g., a
     `switch` expression or an enum + map). *(Judgement call — justify it.)*
   - Simplify booleans (`s == true` → `isStudent`).
4. **Keep every test green** after each step. Behavior must be identical.
5. **Capture an "after" report** showing reduced violations.
6. **Document** the work in the repository `README.md` (see deliverable).

You **must NOT**:
- Change any computed fine for any input (no behavior change).
- Suppress warnings (`// NOSONAR`, `@SuppressWarnings`) to fake a clean score.
- Squash everything into one giant commit (small, reviewable steps expected).

---

## 4. Expected deliverable

A **public (or instructor-invited) GitHub repository** named
`ooad-week14-refactoring-<yourname>` containing:

```
ooad-week14-refactoring-<yourname>/
├─ README.md                     # your report (see below)
├─ src/main/java/.../LibraryFineCalculator.java   # refactored class
├─ src/test/java/.../LibraryFineCalculatorTest.java # characterization tests
├─ config/checkstyle/google_checks.xml            # (or Maven/Gradle config)
├─ docs/before-report.(png|txt)                   # tooling BEFORE
└─ docs/after-report.(png|txt)                    # tooling AFTER
```

Your repository `README.md` must include:
- A short intro (what the class does).
- **Before/after** static-analysis numbers (Checkstyle violations; SonarLint
  issues by severity).
- A **table of refactorings applied**, each with a one-line justification
  (readability/maintainability).
- Evidence the tests are **green** (output snippet or CI badge).
- One paragraph: *what behavior did you deliberately preserve, and how do you
  know it is unchanged?*

---

## 5. How to submit via GitHub (step by step)

> Do **not** submit in Moodle. Submission = your repository link.

```bash
# 1. Create the repo on github.com (e.g., ooad-week14-refactoring-jdoe), then:
git init
git add .
git commit -m "chore: add legacy LibraryFineCalculator + characterization tests"

# 2. Refactor in small steps, committing after EACH green test run, e.g.:
git commit -m "refactor: replace magic numbers with named constants"
git commit -m "refactor: extract baseRateFor(type) and applyDiscounts(...)"
git commit -m "refactor: add guard clause for non-positive days late"

# 3. Connect and push:
git remote add origin https://github.com/<user>/ooad-week14-refactoring-<yourname>.git
git branch -M main
git push -u origin main
```

**What to hand in:** paste the repository **URL** in the channel your instructor
designated (course forum / direct message). Ensure the repo is **public** or that
the instructor's GitHub user has been **invited as a collaborator**.

**Commit-message convention (recommended):** Conventional Commits —
`refactor:`, `test:`, `chore:`, `docs:`. Each commit should keep the tests
green; the history itself is evidence of disciplined, behavior-preserving work.

---

## 6. Assessment criteria / rubric (100 points)

| Criterion | Excellent (full) | Acceptable (partial) | Missing (0) | Pts |
|-----------|------------------|----------------------|-------------|-----|
| **Behavior preserved** | All characterization tests pass; no computed fine changed; edge cases covered. | Tests pass but coverage of branches is thin. | Behavior changed or no tests. | **25** |
| **Refactorings applied** | ≥5 distinct, well-chosen techniques, each justified. | 3–4 techniques, thin justification. | ≤2 or superficial. | **20** |
| **Static analysis used** | Before/after reports for both tools; clear reduction; issues interpreted. | One tool, or before/after without interpretation. | No tool evidence. | **20** |
| **Naming & style** | Fully complies with Java conventions; passes Checkstyle cleanly. | Minor residual violations. | Pervasive violations. | **15** |
| **Git process** | Small, meaningful commits; conventional messages; tests green throughout history. | Few large commits. | Single dump commit / no history. | **10** |
| **Report quality** | README clearly explains before/after, choices, and behavior preservation. | README present but shallow. | No/《placeholder》 README. | **10** |

**Passing threshold:** 60/100. **Bonus** toward Corte 3 at the instructor's
discretion for repositories scoring 85+.

---

## 7. Hints (don't over-think it)

- Write the tests **first** and capture the "golden" outputs from the original
  method — that is your proof of behavior preservation.
- Do **one** refactoring, run tests, commit. Repeat. Small steps make failures
  obvious and easy to undo.
- Introduce an `ItemType` enum (or a `Map<String, Integer>` of rates) to kill the
  `if/else` type chain — but keep the *default = 500* rule intact.
- Watch the **discount order** (student then senior) and the **50,000 cap** —
  reordering or removing the cap changes results and would no longer be a
  refactoring.
- If a change makes a test go red, you changed behavior. Undo and try a smaller
  step.

---

### Reminder
This activity is **optional** and reinforces RAA `90_82759`. The mandatory graded
evidence for Week 14 (Corte 3) remains the **quiz**. Bring questions from this
activity to Session 2.
