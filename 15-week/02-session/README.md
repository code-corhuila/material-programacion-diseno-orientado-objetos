# Week 15 - Session 2: Incremental-Project Delivery, Defense, and Feedback

> **Unit 3 - Practical application of OOP in Java**
> **RAA:** `90_82759`
> **Session type:** Summative delivery + oral defense + structured feedback.

---

## 1. Session objective

Deliver and **defend** the cumulative incremental project, demonstrating quality, integration, and maintainability, and then **interpret feedback** to produce a concrete improvement plan. By the end of the session each team has demoed a running application, justified its design in OOP terms, self-assessed against the rubric, and written a prioritized list of improvements.

**Measurable targets for this session**

1. Demonstrate a running build from a clean checkout with a single documented command.
2. Justify at least three design decisions using OOP principles and at least one SOLID guideline.
3. Produce a self-assessment that matches the instructor rubric within one performance band.
4. Write an improvement plan with at least three actionable, prioritized items derived from feedback.

---

## 2. Timed agenda

| Time | Block | What happens |
|------|-------|--------------|
| 0:00-0:10 | Logistics | Submission checklist, defense order, timing rules. |
| 0:10-0:25 | Criteria walkthrough | Quality / integration / maintainability rubric in plain language. |
| 0:25-1:25 | Defenses | Per team: 4-min demo + 4-min design Q&A. |
| 1:25-1:45 | Feedback round | Structured peer + instructor feedback protocol. |
| 1:45-2:10 | Self-assessment | Score against rubric; draft improvement plan. |
| 2:10-2:20 | Wrap-up | Exit ticket: "what I will change and why." |

---

## 3. Theory notes: what "delivery, defense, and feedback" really assess

### 3.1 Delivery is a repeatability test

A delivery is not "the code on my laptop." It is a **package a stranger can run**. The delivery checklist below encodes the professional habit of *reproducibility*.

```
Delivery package
├── src/                 (all source, organized by package/layer)
├── data/                (sample input files the app reads)
├── README.md            (what it is, how to build, how to run, sample commands)
├── run instructions     (ONE command, e.g. `javac ... && java App`)
└── (no build artifacts, no IDE junk, no dead code)
```

If the grader cannot run it in one try from a clean checkout, integration is *unproven* regardless of how good the code looks.

### 3.2 Defense is a reasoning test

The defense checks that the code is **understood**, not just produced. You will be asked to connect concrete lines of code to principles:

```
  Design decision  --->  OOP principle       --->  Benefit you can name
  ---------------        ---------------           -------------------
  private fields   --->  Encapsulation       --->  invariants protected
  Repository iface --->  Abstraction / DIP   --->  swap storage freely
  Shape.area()     --->  Polymorphism        --->  add types w/o edits
  BaseEntity       --->  Inheritance         --->  no duplicated id/audit
```

A strong defense says *"I did X because Y, and the trade-off was Z."* A weak defense describes *what* the code does without *why*.

### 3.3 Feedback is a growth test

Feedback only counts if it changes something. We use a lightweight protocol so feedback is specific and actionable rather than vague praise.

**The feedback protocol (per project):**
1. **Observe** - a concrete, neutral observation ("the `Main` class reads files directly").
2. **Impact** - why it matters ("this couples UI to storage; hard to test or change").
3. **Suggest** - one concrete change ("move file reading behind the repository interface").
4. **Author responds** - the author restates the point in their own words and decides.

This maps to the classic "keep / start / stop" but forces a *reason* and a *next action*.

---

## 4. Quality, integration, and maintainability - the rubric explained

The project is graded on four dimensions. Each dimension has bands: **Excellent / Good / Developing / Insufficient**.

### 4.1 Integration (30%)

| Band | Descriptor |
|------|-----------|
| Excellent | Runs from clean checkout in one command; reads and writes files; handles missing/corrupt input gracefully; uses collections and exceptions cohesively. |
| Good | Runs with minor setup; core integration present; one edge case unhandled. |
| Developing | Runs only in the author's environment; partial integration (e.g., reads but never writes). |
| Insufficient | Does not build/run, or concerns are not integrated. |

### 4.2 OOP design end to end (30%)

| Band | Descriptor |
|------|-----------|
| Excellent | Clear layering; encapsulation enforced; polymorphism and abstraction used where they earn their place; at least one SOLID principle deliberately applied and explained. |
| Good | Solid OOP with minor leaks (e.g., an occasional public field). |
| Developing | Procedural code wearing OOP clothing; classes are data bags with logic elsewhere. |
| Insufficient | No meaningful OOP structure. |

### 4.3 Code quality (20%)

| Band | Descriptor |
|------|-----------|
| Excellent | Intention-revealing names; short single-purpose methods; no dead code; no empty catches; consistent style. |
| Good | Readable with a few smells. |
| Developing | Long methods, unclear names, duplication. |
| Insufficient | Hard to read; pervasive smells. |

### 4.4 Defense and feedback response (20%)

| Band | Descriptor |
|------|-----------|
| Excellent | Justifies decisions in OOP terms; answers probing questions; self-assessment matches rubric; improvement plan is specific and prioritized. |
| Good | Justifies most decisions; plan present but generic. |
| Developing | Describes code without justifying; plan vague. |
| Insufficient | Cannot explain the code; no plan. |

**Common code smells checklist (used during quality scoring):**
- God class doing everything; UI touching files directly.
- Empty or overly broad `catch (Exception e)`.
- Raw collection types; primitive obsession.
- Long parameter lists; duplicated code blocks.
- Magic numbers/strings; commented-out code.

---

## 5. Fully worked example: a model defense

Below is a *transcript-style* example of a strong two-minute defense excerpt, followed by the design snippet it refers to. Use it as the standard to imitate.

### 5.1 The code under defense

```java
// A polymorphic report generator selected at runtime (Strategy pattern)
public interface ReportFormat {
    String render(List<Student> students);
}

public class CsvReport implements ReportFormat {
    @Override public String render(List<Student> students) {
        StringBuilder sb = new StringBuilder("id,name,average\n");
        for (Student s : students)
            sb.append("%s,%s,%.2f%n".formatted(s.getId(), s.getName(), s.getAverage()));
        return sb.toString();
    }
}

public class TextReport implements ReportFormat {
    @Override public String render(List<Student> students) {
        StringBuilder sb = new StringBuilder("=== Honor Roll ===\n");
        students.forEach(s -> sb.append(s).append('\n'));
        return sb.toString();
    }
}

public class ReportService {
    private final ReportFormat format;                 // dependency inversion
    public ReportService(ReportFormat format) { this.format = format; }
    public String generate(List<Student> students) { return format.render(students); }
}
```

### 5.2 The spoken defense (model answer)

> "I needed to support more than one output format without editing the service each time a new one appears. So `ReportService` depends on the `ReportFormat` **abstraction**, not on a concrete class - that is the **dependency inversion** principle and it makes the service **open for extension, closed for modification**. Adding a JSON report means writing one new class that implements the interface; I change nothing in `ReportService`. The call `format.render(...)` is resolved by **polymorphism** at runtime based on which implementation I injected. The trade-off is a little more indirection and one extra interface, which I judged worthwhile because new formats were a stated requirement."

**Why this scores "Excellent":** it names the *decision*, the *principle*, the *benefit*, and the *trade-off*, and points to the exact line where polymorphism happens.

### 5.3 A weak defense (for contrast)

> "This class makes a report. It has methods that build a string and return it. It works when I run it."

This describes behavior but justifies nothing - it would score "Developing."

---

## 6. Guided in-class activity: run the defense cycle

Each team performs the following; peers use the feedback protocol from 3.3.

**Step 1 - Demo (4 min).** Run from a clean checkout. Show: (a) reading a file, (b) a collection-driven operation, (c) an intentionally triggered error handled gracefully.

**Step 2 - Design Q&A (4 min).** The instructor/peers ask, e.g.:
- "Point to where encapsulation protects an invariant."
- "Where does an exception get translated, and why there?"
- "Which collection did you choose here and what would break with a different one?"
- "Name one SOLID principle you applied and one you knowingly did not."

**Step 3 - Feedback capture (per project).** Each observer writes at least one Observe/Impact/Suggest note. The author records them.

**Step 4 - Self-assessment.** Using the Section 4 rubric, the team assigns itself a band per dimension **with a one-line justification each**.

**Step 5 - Improvement plan.** Convert feedback into a prioritized table:

| Priority | Action | Principle/quality it improves | Effort |
|----------|--------|------------------------------|--------|
| 1 | Move file access from `Main` into `StudentRepository` | Decoupling / SRP | M |
| 2 | Replace `catch (Exception e) {}` with translated `RepositoryException` | Error handling | S |
| 3 | Extract `honorRoll` sorting into a `Comparator` field | Readability / OCP | S |

---

## 7. Wrap-up and exit ticket

**Exit ticket (one short paragraph):**

> "The single most important change I will make to my project is ______, because ______. It improves ______ (name the principle or quality dimension)."

**After the session.** Submit the final delivery package per the course instructions, including your self-assessment and improvement plan. Feedback interpreted here is what closes RAA `90_82759`: it turns a graded artifact into consolidated, transferable competence.

---

## 8. Delivery checklist (print and tick before you present)

- [ ] Clean checkout builds with one documented command.
- [ ] Sample data files are included under `data/`.
- [ ] No IDE/config junk, no build artifacts, no dead/commented-out code.
- [ ] README states purpose, build, run, and one sample interaction.
- [ ] The app reads a file and writes a file.
- [ ] A missing/corrupt file is handled gracefully (demoed).
- [ ] At least two collection types used with generics.
- [ ] Exceptions are translated across layers and never swallowed.
- [ ] Three design decisions prepared, each phrased as decision -> principle -> benefit -> trade-off.
- [ ] Self-assessment rubric completed.
- [ ] Improvement plan with >= 3 prioritized items ready.

---

*Previous: [Session 1 - Consolidation review and partial exam](../01-session/README.md). See also the [download area](../material/README.md) and the [optional activity](../optional-activity/README.md).*
