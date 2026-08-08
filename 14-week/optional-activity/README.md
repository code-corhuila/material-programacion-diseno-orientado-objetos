# Week 14 — Optional Activity: Refactor a Smelly Java Project

**Course:** Object-Oriented Programming and Design (2026-B)
**Unit 3 — Practical application of OOP in Java · Corte 3**
**Topic:** Good programming practices and refactoring with static analysis tools
**RAA:** `90_82759`
**Type:** Optional (bonus) · Individual or pairs
**Submission channel:** **GitHub repository** (NOT Moodle)

> This activity is **optional** and deepens the week's skills. It is submitted by
> **sharing a GitHub repository link**, not through a Moodle submission box.

---

## 1. Problem statement

You have inherited a small, working Java program called **`GradeBook`** that
compiles and produces correct results but is a maintenance nightmare: cryptic
names, a giant method, magic numbers everywhere, duplicated logic, deep nesting,
and inconsistent formatting.

Your job as a professional is to **refactor it into clean, standards-compliant
code without changing its behavior**, guided and verified by static analysis
tools and a test suite.

### Starting code (`GradeBook.java`)

```java
package MyApp;
import java.util.*;

public class gradebook {
  public double PASS = 3.0;

  public String process(List<Double> g){
    double s=0; int c=0;
    for(int i=0;i<g.size();i++){ s=s+g.get(i); c=c+1; }
    double avg=s/c;
    String res;
    if(avg>=4.5){ res="EXCELLENT"; }
    else{
      if(avg>=3.0){ res="PASS"; }
      else{ res="FAIL"; }
    }
    return "AVG="+avg+" ("+res+")";
  }
}
```

### Behavior you must preserve

- The average is the arithmetic mean of the grades.
- Classification: `avg >= 4.5` → `EXCELLENT`; `avg >= 3.0` → `PASS`; otherwise
  `FAIL`.
- The returned string format is `AVG=<average> (<classification>)`.

---

## 2. Requirements

1. **Write a test safety net first.** Create JUnit 5 tests that lock down the
   current behavior for at least these cases:
   - a passing average (e.g., `[3.0, 4.0]` → contains `PASS`),
   - an excellent average (e.g., `[5.0, 4.5]` → contains `EXCELLENT`),
   - a failing average (e.g., `[2.0, 2.5]` → contains `FAIL`).
   These tests must be **green before you refactor**.

2. **Run static analysis.** Run **Checkstyle** (with `google_checks.xml`) and/or
   **SonarLint** on the starting code. Save the initial report/screenshot as
   evidence of the *before* state.

3. **Refactor** the code applying **at least five named refactorings**, which
   must include:
   - **Rename** (class, method, variables → intention-revealing names),
   - **Replace Magic Number with Constant** (`4.5`, `3.0`),
   - **Extract Method** (e.g., `average(...)` and `classify(...)`),
   - **Guard Clauses / Decompose Conditional** (flatten the nested `if`),
   - fix **package/class naming and formatting** to comply with the style guide.

4. **Preserve behavior.** All tests must remain **green** after refactoring. Do
   **not** add new features.

5. **Re-run static analysis.** Save the *after* report and confirm the violation
   count dropped (ideally to zero style violations for the class).

6. **Document your work** in the repository `README.md` (see deliverables).

---

## 3. Expected deliverable

A **GitHub repository** containing:

```
gradebook-refactor/
├── README.md                # your report (see below)
├── src/
│   ├── main/java/...        # the refactored GradeBook
│   └── test/java/...        # your JUnit 5 tests
├── analysis/
│   ├── before.txt (or .png) # static-analysis report BEFORE
│   └── after.txt  (or .png) # static-analysis report AFTER
└── (optional) pom.xml or build.gradle with Checkstyle configured
```

Your repository `README.md` must include:

- A **refactoring log**: a table mapping each smell → refactoring applied →
  tests result (green).
- The **before/after** violation counts.
- A short paragraph (4–6 sentences) explaining **why** the refactored version is
  more readable and maintainable, and an explicit statement that **behavior was
  preserved** (evidenced by the passing tests).

---

## 4. How to submit (via GitHub, not Moodle)

1. Create a **public** GitHub repository named `gradebook-refactor`.
2. Commit in **small, meaningful steps** — each commit ideally one refactoring
   (e.g., `refactor: extract average() method`). A clean commit history is part
   of the grade.
3. Make sure the repo includes the source, the tests, and the `analysis/`
   evidence.
4. **Submit the repository URL** to the instructor through the agreed channel
   (course roster / GitHub Classroom link / email as directed in class).
   **Do not** upload a ZIP to Moodle — the deliverable is the **repository
   link**.

> **Tip:** Add a `.gitignore` for Java (ignore `target/`, `build/`, `*.class`,
> IDE files). Commit the *code and evidence*, not build artifacts.

---

## 5. Assessment criteria / rubric (100 points)

| Criterion | Excellent (full) | Acceptable (partial) | Insufficient (0) | Weight |
|-----------|------------------|----------------------|------------------|--------|
| **Behavior preserved (tests)** | ≥3 characterization tests, all green before & after; behavior provably unchanged | Tests exist but incomplete or added after refactoring | No tests / behavior changed | **30** |
| **Refactorings applied** | ≥5 correct, well-named refactorings including all required ones | 3–4 refactorings, some required ones missing | ≤2 or misapplied | **25** |
| **Standards & static analysis** | Style/naming fully compliant; before/after reports show violations removed | Partial compliance; some evidence | No tool use / no compliance | **20** |
| **Readability & justification** | Clear names, small methods, no smells; convincing written justification | Mostly readable; weak justification | Still smelly / no justification | **15** |
| **Git hygiene & documentation** | Small meaningful commits; complete README with refactoring log | Few large commits; partial README | Single dump commit / no README | **10** |

**Bonus (+5):** wire Checkstyle into the build (`mvn checkstyle:check` or the
Gradle equivalent) so quality is enforced automatically.

---

## 6. Reference solution shape (do not copy — for self-check only)

After refactoring, your code should read roughly like this in *structure*
(names and details will vary):

```java
package myapp;

import java.util.List;

/** Computes and classifies a student's grade average. */
public class GradeBook {

    private static final double EXCELLENT_THRESHOLD = 4.5;
    private static final double PASS_THRESHOLD = 3.0;

    public String process(List<Double> grades) {
        double average = average(grades);
        return String.format("AVG=%s (%s)", average, classify(average));
    }

    private double average(List<Double> grades) {
        double sum = 0.0;
        for (double grade : grades) {
            sum += grade;
        }
        return sum / grades.size();
    }

    private String classify(double average) {
        if (average >= EXCELLENT_THRESHOLD) return "EXCELLENT";
        if (average >= PASS_THRESHOLD) return "PASS";
        return "FAIL";
    }
}
```

Notice: same behavior, but named constants, extracted methods, guard clauses,
proper casing, and no magic numbers. **Your tests should pass against both the
old and the new version** — that is the whole point.

---

## 7. Objectives reinforced

- Apply Java naming conventions and style guidelines.
- Use Checkstyle / SonarLint to detect and then confirm removal of issues.
- Refactor to improve readability/maintainability **without changing behavior**.
- Practice professional Git workflow and clear technical documentation.
