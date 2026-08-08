# Week 16 - Session 2: Reflective assessment & portfolio compilation

**Subject:** Object-Oriented Programming and Design - 2026-B
**Unit 3:** Practical application of OOP in Java · **Corte 3**
**RAA:** 90_82759
**Duration:** 2 hours (120 min)

---

## 1. Session objective

Students **reflect** on their learning across the three units and **compile a learning portfolio** that traces every major deliverable to RAA 90_82759. By the end of the session each student will have (a) a 500-700 word reflective essay and (b) a portfolio with a completed traceability matrix.

This maps to weekly objectives **3 and 4** and to the metacognitive and evaluative dimensions of RAA 90_82759.

---

## 2. Timed agenda

| Time | Block | Activity |
|------|-------|----------|
| 0:00-0:10 | Framing | What a learning portfolio is and why professionals keep one |
| 0:10-0:30 | Reflection workshop | Guided prompts + worked example of a strong reflection |
| 0:30-1:10 | Portfolio assembly | Build the deliverable list and the traceability matrix |
| 1:10-1:40 | Peer walkthrough | Pairs review each other's portfolios against the checklist |
| 1:40-2:00 | Course closure | Synthesis, forward look, final exit ticket |

---

## 3. Theory notes

### 3.1 Reflective practice: what and why

Reflection is the deliberate act of examining an experience to extract learning from it. In programming education it matters because much of the important learning is **tacit** — you can write a working `equals()` method long before you can explain *why* it belongs with `hashCode()`. Writing forces the tacit to become explicit, which is what makes knowledge transferable to the next problem.

A useful, lightweight structure is the **What? / So what? / Now what?** cycle:

```
   WHAT?            SO WHAT?                 NOW WHAT?
 (description)  -> (interpretation)     ->  (action / transfer)
 "I refactored     "I learned that a         "Next time I will
  a 200-line        God-class hides           design responsibilities
  class into 4      responsibilities and      before writing code,
  classes."         makes testing hard."      not after."
```

Weak reflection stops at *What?* ("I did the project, it was hard, I finished"). Strong reflection reaches *Now what?* — it names a change in how you will work.

### 3.2 Evidence-based self-assessment

Reflection is credible only when anchored to **evidence**. Instead of "I understand polymorphism now," a strong reflection says: "In `Checkout.process` I iterate over `PaymentMethod` references; this is where I finally understood that the *reference type* decides what compiles and the *object type* decides what runs." The evidence is a named artefact.

### 3.3 The learning portfolio and traceability

A **learning portfolio** is a curated, purposeful collection of work chosen to demonstrate achievement against outcomes. It is not a dump of every file; it is a *selected* and *annotated* set of evidence. The organising device is the **traceability matrix**, which answers one question for an external reader: *"Show me, deliverable by deliverable, that you achieved RAA 90_82759."*

```
   DELIVERABLE  --- evidences --->  RAA 90_82759
   (artefact)      (justification)   (learning outcome)
```

Traceability is a genuine professional skill: it mirrors how requirements are traced to code and tests in industry, and how competencies are evidenced in accreditation.

### 3.4 Anatomy of RAA 90_82759 (so students can map to it)

The outcome has four assessable strands. A good portfolio shows evidence for each:

| Strand of RAA 90_82759 | What evidences it |
|------------------------|-------------------|
| Designs object-oriented solutions | Class diagrams, design notes, responsibility decisions |
| Implements in Java with the four pillars | Working code where each pillar is located |
| Applies good design practices | Refactorings, naming, cohesion/coupling, error handling |
| Communicates and evaluates solutions | Presentation, README, peer reviews given/received |

---

## 4. Fully worked example

### 4.1 A strong reflective paragraph (annotated)

> "Early in Unit 2 I wrote an `Employee` class that held payroll logic, report formatting, and database access all at once **[What]**. During the project I split it into `Employee`, `PayrollCalculator`, and `EmployeeRepository`. Watching the tests become trivial to write once each class had a single responsibility taught me that *high cohesion is what makes code testable*, not a stylistic nicety **[So what]**. From now on I will sketch responsibilities before writing methods, and I will treat 'this class is hard to test' as a design smell rather than a testing problem **[Now what]**. Evidence: commit history of `payroll/` and the `PayrollCalculatorTest` class in my repository."

Why it scores well: it is specific, names artefacts, reaches *Now what?*, and connects a concrete experience to a design principle.

### 4.2 A completed traceability matrix (model)

| # | Deliverable | Unit | Where (link/path) | Maps to RAA 90_82759 because... |
|---|-------------|------|-------------------|--------------------------------|
| 1 | Bank-account exercise | U1 | `/u1/bank/` | Shows encapsulation: private balance guarded by deposit/withdraw invariants. |
| 2 | Shape hierarchy | U1 | `/u1/shapes/` | Shows abstraction + polymorphism via `abstract Shape.area()` and a mixed list. |
| 3 | Library-system assignment | U2 | `/u2/library/` | Shows inheritance and interface-based design (`Loanable`) with low coupling. |
| 4 | Refactoring lab | U2 | commit `a1b2c3d` | Shows good practice: God-class split into cohesive classes; tests added. |
| 5 | Final project (code) | U3 | `github.com/.../final` | Shows all four pillars in one working system; documented README. |
| 6 | Final presentation | U3 | `/portfolio/slides.pdf` | Communicates and defends the solution to a technical audience. |
| 7 | Peer reviews given | U3 | `/portfolio/reviews/` | Evidences evaluative competence: rubric-based critique of two projects. |
| 8 | Reflective essay | U3 | `/portfolio/reflection.md` | Metacognitive evidence of appropriation across the course. |

### 4.3 Recommended portfolio structure

```
portfolio/
├── README.md              # index + one-paragraph course summary
├── traceability.md        # the matrix above
├── reflection.md          # 500-700 word essay
├── deliverables/          # or links to repos, per unit
│   ├── u1/ u2/ u3/
├── reviews/               # peer reviews you WROTE
└── slides.pdf             # final presentation
```

---

## 5. Guided in-class practice

**Part A — Reflection workshop (0:10-0:30).** Students draft their essay from these prompts (aim 500-700 words total):

1. **Across the three units, name three OOP concepts you appropriated.** For each, give one artefact where you can see it and one sentence on how your understanding changed.
2. **Name one persistent difficulty.** What still feels shaky, and what specific step will you take to close the gap (a book chapter, an exercise, a mentor)?
3. **What transfers?** Name one habit or idea from this course you will carry into another course or a job.
4. **Feedback loop.** What did giving/receiving peer review in Session 1 teach you about your own work?

**Part B — Portfolio assembly (0:30-1:10).** Students build the folder structure, fill the traceability matrix (one row per deliverable, min. 6 rows spanning all three units), and write the portfolio `README.md` index.

**Part C — Peer walkthrough (1:10-1:40).** In pairs, each student opens their portfolio and their partner checks it against the checklist in section 6, giving one strength and one fix. Then swap.

**Facilitation tips:**
- Circulate and challenge vague reflections ("hard" -> *hard how?*).
- Insist every matrix row has a *because* clause; a link without justification is not traceability.
- Verify links open for someone who is not the author (a common failure).

---

## 6. Portfolio & reflection checklist (assessment instrument)

**Portfolio**
- [ ] Index README with a one-paragraph course summary.
- [ ] Traceability matrix with >= 6 rows spanning Units 1-3.
- [ ] Every row maps to RAA 90_82759 with a one-sentence justification.
- [ ] All links/paths open for an external reader.
- [ ] At least one artefact per OOP pillar is represented somewhere in the matrix.

**Reflective essay**
- [ ] 500-700 words.
- [ ] Names >= 3 appropriated concepts, each anchored to an artefact.
- [ ] Names >= 1 persistent difficulty with a concrete plan.
- [ ] Reaches "Now what?" — states a change in practice, not only description.

**Reflective-writing quality rubric (4/3/2/1):**

| Criterion | 4 Excellent | 3 Proficient | 2 Developing | 1 Beginning |
|-----------|-------------|--------------|--------------|-------------|
| Depth | Reaches "Now what?"; insight + transfer | Reaches "So what?"; some transfer | Mostly description | Description only |
| Evidence | Every claim tied to a named artefact | Most claims evidenced | Few claims evidenced | No evidence |
| Honesty | Names real difficulty + plan | Names difficulty | Vague difficulty | None |

---

## 7. Course closure & final exit ticket

**Synthesis (5 min):** Return to the four pillars and the design vocabulary; recap the arc from Unit 1 (single objects and encapsulation) through Unit 2 (relationships, inheritance, interfaces) to Unit 3 (applying it all in a real project). Emphasise that the durable outcome is the *reasoning habit*, not the syntax.

**Forward look:** Point to where these skills go next (data structures, design patterns, frameworks) and note that the portfolio is a living document they can keep extending.

**Final exit ticket (submit to close the course):**
1. In one sentence, how would you now define "good object-oriented design" to a first-year student?
2. Which single deliverable in your portfolio best evidences RAA 90_82759, and why?
3. What is your next concrete step to keep improving as a developer?
