# Week 16 - Session 2: Reflective assessment and portfolio

> **Subject:** Object-Oriented Programming and Design - 2026-B
> **Unit 3:** Practical application of OOP in Java
> **Assessment period:** Corte 3
> **RAA:** 90_82759

---

## 1. Session objective

Turn the completed project and the co-evaluation feedback into two closing artifacts: a **reflective self-assessment** and a **traceability portfolio** that maps every deliverable of the course to the learning outcome (RAA 90_82759).

By the end of the session the student will be able to:
- Write a structured reflection (350-500 words) connecting personal learning across the three units to the RAA.
- Turn feedback received into a concrete improvement plan.
- Build a portfolio index table that traces each deliverable to the RAA and to at least one OOP pillar or good practice, with working links.

---

## 2. Timed agenda (110 minutes)

| Time | Activity |
|---|---|
| 0:00-0:08 | Recap of Session 1; remaining defenses (if any). |
| 0:08-0:25 | **Theory:** reflection and metacognition; the reflection framework. |
| 0:25-0:35 | **Theory:** what a traceability portfolio is; the RAA-to-evidence mapping. |
| 0:35-0:55 | **Worked example:** a model reflection + a model portfolio table. |
| 0:55-1:25 | **Guided practice:** each student drafts their reflection and portfolio table. |
| 1:25-1:40 | Consolidate co-evaluation feedback into a 3-point improvement plan. |
| 1:40-1:48 | Course wrap-up; final self-check checklist. |
| 1:48-1:50 | Exit ticket. |

---

## 3. Theory notes

### 3.1 Reflection and metacognition

**Reflection** is structured thinking about your own learning; **metacognition** is "thinking about your thinking." Neither is a diary entry — both are evidence of learning and are graded on *specificity* and *honesty*, not on sounding positive.

A useful, well-known scaffold is Gibbs' reflective cycle, adapted here for a programming course:

```
   Description  ->  what did I build / do?
        |
   Feelings     ->  where was I confident vs. stuck?
        |
   Evaluation   ->  what went well / badly? (use evidence)
        |
   Analysis     ->  WHY? which concept explains it?
        |
   Conclusion   ->  what did I actually learn?
        |
   Action plan  ->  what will I do differently next time?
```

The two most valuable stages for grading are **Analysis** ("*why* did my inheritance design cause duplication? because it was really a 'has-a', not an 'is-a'") and **Action plan** ("*next time I will prefer composition and write the class diagram before coding*").

### 3.2 The traceability portfolio

A **portfolio** here is not a folder of files — it is a **mapping** that makes your achievement of the RAA *visible and checkable*. Each row links one deliverable to:
- the **RAA** it contributes to (always 90_82759 in this course),
- the **pillar(s)/practice(s)** it evidences,
- a **working link/path** to the artifact.

```
   Deliverable  --evidences-->  Pillar / Good practice  --contributes to-->  RAA 90_82759
       |                                                                        ^
       +--------------------------- link / file path --------------------------+
```

Traceability is the same discipline used in professional software (requirements ↔ code ↔ tests). Doing it here trains a habit and, practically, makes your final grade easy to justify.

### 3.3 Turning feedback into action

Feedback only has value if it changes something. Convert the co-evaluation you received into an **improvement plan** using three columns: *what was observed → what I will change → done?* Keep it small (three items) and concrete.

---

## 4. Worked example

### 4.1 Model reflection (excerpt, ~180 words shown)

> **Across the three units I moved from writing procedural code to designing with objects.** In Unit 1 the pillars were abstract to me; I could define encapsulation but still wrote public fields. The turning point was my final project's `Order` class: a co-evaluator pointed out that a public `total` field let any code corrupt the order. I made the field private and computed the total from the items, which enforced the invariant. That single change taught me *why* encapsulation exists — it is not a rule, it protects correctness.
>
> **My weakest area was inheritance.** I first made `PdfReport extends Report` and `CsvReport extends Report` but duplicated formatting logic. Analyzing it, I realized formatting was a "has-a", so I extracted a `Formatter` interface and used composition and polymorphism instead. This removed an `instanceof` chain in my export code.
>
> **Next semester I will** (1) draw the class diagram before coding, (2) write one unit test per class as I go, and (3) commit in smaller steps so my Git history tells the design story.

Why this scores well: it is specific (names classes), analytical (explains *why*), honest about weakness, and ends with a concrete action plan tied to good practices — all traceable to RAA 90_82759.

### 4.2 Model portfolio index

| # | Deliverable | Unit | Evidence of (pillar / practice) | Contributes to RAA | Link / path |
|---|---|---|---|---|---|
| 1 | Classes & objects exercise | 1 | Encapsulation; naming | 90_82759 | `../../08-week/optional-activity/` (repo) |
| 2 | UML class diagram of final project | 2 | Abstraction; low coupling | 90_82759 | `docs/uml/class-diagram.png` |
| 3 | `Payable`/`Employee` hierarchy | 3 | Inheritance; polymorphism | 90_82759 | `src/main/java/payroll/` |
| 4 | Unit test suite | 3 | Testing (good practice) | 90_82759 | `src/test/java/payroll/` |
| 5 | Final project defense slides | 3 | Communication of design | 90_82759 | `docs/defense.pdf` |
| 6 | This reflection | 3 | Metacognition | 90_82759 | `docs/reflection.md` |
| 7 | Git history | 1-3 | Version control (good practice) | 90_82759 | repository commit log |

Every row answers the examiner's implicit question: *"show me where you achieved the outcome."*

---

## 5. Guided in-class practice

**Step 1 — Reflection draft (20 min).** Using the Gibbs scaffold in §3.1, write 350-500 words. Requirements:
- Reference **all three units**.
- Name at least **three concrete learnings** (each anchored to a class/decision in your code).
- State at least **two areas for future improvement** as actions, not wishes.

**Step 2 — Portfolio table (15 min).** Build your own version of the table in §4.2. Requirements:
- One row per graded deliverable of the course.
- Every row cites at least one pillar or good practice and the RAA.
- Every link/path must actually open the artifact (test them).

**Step 3 — Improvement plan (10 min).** From the feedback you received in Session 1:

| Observation received | Change I will make | Done? |
|---|---|---|
| e.g. "public fields in `Order`" | make fields private; validate in constructor | [ ] |
| | | |
| | | |

---

## 6. Course wrap-up and final self-check

**Wrap-up:** You began with syntax and objects; you end able to design, build, test, defend and reflect on an object-oriented system in Java. The four pillars are now tools you reach for because they make software easier to change and harder to break — that is the whole point of RAA 90_82759.

**Final self-check (all boxes before final submission):**
- [ ] Project runs from a clean checkout; demo rehearsed.
- [ ] Four pillars located in code; three+ good practices present.
- [ ] Co-evaluation completed for peers and feedback received consolidated.
- [ ] Reflection (350-500 words) written and honest.
- [ ] Portfolio index complete; every link opens.
- [ ] Improvement plan has three concrete items.

---

## 7. Exit ticket

1. In one sentence, state the single most important thing you learned in this course and the RAA it maps to.
2. List the **three deliverables** in your portfolio you are most proud of and the pillar each evidences.
3. Write the **first action** from your improvement plan and when you will do it.

---

*End of Week 16 sessions. See `material/README.md` for readings and the downloadable PDF, and `optional-activity/README.md` for extra practice.*
