# Week 16 - Course closure: consolidation, project presentations and reflective assessment

**Subject:** Object-Oriented Programming and Design
**Program period:** 2026-B
**Unit:** Unit 3 - Practical application of OOP in Java
**Week:** 16 (Corte 3 - final assessment period)
**Learning outcome (RAA):** 90_82759

---

## 1. Overview

Week 16 is the closing week of the course. There is **no new technical content** to introduce; instead, the week is designed to **consolidate** what students have built across the three units and to make their learning **visible and assessable**. The week revolves around three interlocking activities:

1. **Final project presentations**, where each team demonstrates that its Java application applies the four pillars of Object-Oriented Programming (abstraction, encapsulation, inheritance, polymorphism) together with sound design practices.
2. **Structured peer feedback (co-evaluation)**, where students assess one another's projects against a shared rubric, practising professional, evidence-based critique.
3. **Reflective assessment and portfolio compilation**, where each student looks back over the whole course, articulates what they have appropriated, and assembles a portfolio that traces every deliverable back to the subject learning outcome (RAA 90_82759).

This is an **assessment week (Corte 3)**. The grades collected here are summative: they certify the degree to which the learning outcome has been achieved. The pedagogical aim, however, is not merely to grade but to help students internalise a professional habit — *presenting, critiquing, and reflecting on software as engineers do in industry*.

---

## 2. Assessment period (Corte 3)

| Item | Detail |
|------|--------|
| Assessment period | Corte 3 (final third of the course) |
| Nature | Summative + formative (co-evaluation and self-assessment) |
| Weighting suggestion | Final project 60%, portfolio 20%, co-evaluation participation 10%, reflective essay 10% (adjust to institutional weighting) |
| Evidence collected | Project demo + repository, peer-feedback forms, portfolio document, reflective essay/exit tickets |
| Instruments | Presentation rubric, co-evaluation rubric, portfolio checklist, reflective-writing guide |

> **Note.** All rubrics in this week are criterion-referenced: a student can score highly regardless of how classmates perform. Co-evaluation contributes to the *formative* dimension and to a small participation grade; it does not by itself determine a classmate's project grade, which is decided by the instructor.

---

## 3. RAA and competencies addressed

**RAA 90_82759** — *The student designs and implements object-oriented solutions in Java, applying the four pillars of OOP and good design practices to solve well-defined problems, and communicates and evaluates those solutions with professional criteria.*

Competencies exercised this week:

- **Disciplinary / technical.** Demonstrate, on a working artefact, correct use of abstraction, encapsulation, inheritance and polymorphism; justify design decisions (class responsibilities, relationships, use of interfaces, exception handling).
- **Communicative.** Present a software solution clearly to a technical audience; defend design choices under questioning.
- **Evaluative / critical.** Apply a rubric to a peer's work; give and receive feedback that is specific, actionable and respectful.
- **Metacognitive.** Reflect on one's own learning trajectory, recognise gaps, and connect concrete deliverables to declared learning outcomes.
- **Ethical / professional.** Attribute sources, respect academic integrity, and document work honestly in a portfolio.

---

## 4. Weekly objectives (measurable)

By the end of Week 16, the student will be able to:

1. **Present** the final project in a 10-12 minute demonstration that explicitly identifies where each of the four OOP pillars appears in the code, achieving at least **"Proficient"** on every row of the presentation rubric.
2. **Provide** at least **two** structured written peer reviews using the co-evaluation rubric, each containing a minimum of one strength, one concrete improvement, and one clarifying question grounded in the observed artefact.
3. **Reflect**, in a 500-700 word essay, on personal learning across Units 1-3, naming at least **three** concepts appropriated and **one** persistent difficulty, with a plan to address it.
4. **Compile** a portfolio that maps **every** major deliverable of the course to RAA 90_82759, with a one-sentence justification per item, passing all rows of the portfolio checklist.
5. **Evaluate** the quality of a peer's software solution against defined criteria, distinguishing between surface style issues and substantive design problems in the feedback given.

---

## 5. Contents outline

1. **Consolidation of OOP.** A synthesising review of the four pillars and how they interrelate; the vocabulary of good design (cohesion, coupling, responsibility, SOLID at an introductory level).
2. **Technical communication.** How to structure a software demo; the "problem -> design -> code -> demo -> reflection" narrative; live-demo discipline and contingency.
3. **Peer review / co-evaluation.** What makes feedback useful; rubric-based assessment; separating the person from the work; giving and receiving critique.
4. **Reflective practice.** Metacognition in learning to program; evidence-based self-assessment; identifying transferable skills.
5. **Portfolio construction.** Purpose of a learning portfolio; traceability from deliverable to learning outcome; curating evidence.

---

## 6. Session-by-session agenda

The week is delivered in **two sessions**. Detailed plans live in the linked folders.

### [Session 1 — Final project presentations & co-evaluation](./01-session/README.md)
Teams present their final projects; the class conducts structured peer review against the co-evaluation rubric. Focus: demonstrating the four pillars on a real artefact and practising professional feedback.

| Time | Activity |
|------|----------|
| 0:00-0:10 | Framing, ground rules for demos and feedback |
| 0:10-0:25 | Consolidation mini-review of the four pillars (worked example) |
| 0:25-1:25 | Project presentations (rotating; ~12 min each incl. Q&A) |
| 1:25-1:50 | Structured co-evaluation writing round |
| 1:50-2:00 | Wrap-up and exit ticket |

### [Session 2 — Reflective assessment & portfolio compilation](./02-session/README.md)
Students write their reflective essay, compile the portfolio, and map deliverables to RAA 90_82759. Focus: metacognition and traceability.

| Time | Activity |
|------|----------|
| 0:00-0:10 | Objectives; what a learning portfolio is and why it matters |
| 0:10-0:30 | Guided reflection workshop (prompts + worked example) |
| 0:30-1:10 | Portfolio assembly with the traceability matrix |
| 1:10-1:40 | Peer portfolio walkthrough (pairs) |
| 1:40-2:00 | Course closure, synthesis, and final exit ticket |

---

## 7. Key-concepts glossary

| Term | Definition |
|------|-----------|
| **Abstraction** | Modelling a concept by exposing only the features relevant to the problem and hiding incidental detail (e.g., an `abstract class Shape` declaring `area()` without saying how each shape computes it). |
| **Encapsulation** | Bundling state and the operations on it within a class and restricting direct access to internal state (private fields + public methods / getters-setters with invariants). |
| **Inheritance** | Deriving a new class from an existing one so it reuses and specialises behaviour (`class Circle extends Shape`). Models an "is-a" relationship. |
| **Polymorphism** | The ability to treat different types through a common interface so the same call runs different implementations at runtime (`for (Shape s : shapes) s.area();`). |
| **Cohesion** | The degree to which the elements of a class belong together and serve one clear responsibility. High cohesion is desirable. |
| **Coupling** | The degree of interdependence between classes. Low (loose) coupling is desirable because it eases change. |
| **Single Responsibility** | A class should have one reason to change (the first letter of SOLID). |
| **Interface (Java)** | A contract of method signatures a class promises to implement; a key mechanism for polymorphism and loose coupling. |
| **Co-evaluation** | Assessment of students by their peers against shared criteria; here, rubric-based review of projects. |
| **Reflective assessment** | Assessment in which the learner analyses their own learning process and evidence, not only the product. |
| **Learning portfolio** | A curated, purposeful collection of a learner's work that demonstrates achievement against outcomes. |
| **Traceability matrix** | A table linking each deliverable to the learning outcome(s) it evidences. |
| **Learning outcome (RAA)** | *Resultado de Aprendizaje* — an observable, assessable statement of what a student can do after instruction. |
| **Exit ticket** | A short end-of-session response used to check understanding and gather reflection. |

---

## 8. Achievement / self-check checklist

Tick each item before you consider the week complete.

**Project & presentation**
- [ ] My repository builds and runs from a clean clone (documented in the README).
- [ ] I can point to concrete code where **abstraction** appears and explain why.
- [ ] I can point to concrete code where **encapsulation** appears and explain why.
- [ ] I can point to concrete code where **inheritance** appears and explain why.
- [ ] I can point to concrete code where **polymorphism** appears and explain why.
- [ ] I have a contingency (screenshots / recording) in case the live demo fails.
- [ ] My presentation fits within the time limit and follows the required narrative.

**Co-evaluation**
- [ ] I submitted at least two peer reviews using the rubric.
- [ ] Each review contains a strength, a concrete improvement, and a question.
- [ ] My feedback is specific and refers to observed evidence, not opinion alone.

**Reflection & portfolio**
- [ ] My reflective essay is 500-700 words and names three appropriated concepts and one difficulty.
- [ ] My portfolio lists every major deliverable of the course.
- [ ] Each portfolio item is mapped to RAA 90_82759 with a one-sentence justification.
- [ ] My portfolio and repository links work for someone who is not me.

---

## 9. Resources index

| Resource | Location | Purpose |
|----------|----------|---------|
| Session 1 plan | [`./01-session/README.md`](./01-session/README.md) | Presentations & co-evaluation |
| Session 2 plan | [`./02-session/README.md`](./02-session/README.md) | Reflection & portfolio |
| Readings & downloads | [`./material/README.md`](./material/README.md) | Curated readings + PDF download area |
| Optional activity | [`./optional-activity/README.md`](./optional-activity/README.md) | Extra GitHub-submitted practice + rubric |

---

## 10. How this week is graded (summary)

- **Final project (presentation + repository):** graded by the instructor with the presentation rubric in Session 1.
- **Co-evaluation participation:** graded on completion and quality of the peer-review forms.
- **Reflective essay + portfolio:** graded with the portfolio checklist and reflective-writing guide in Session 2.
- **Optional activity:** additional, submitted via GitHub (see the optional-activity folder), for enrichment or grade recovery at the instructor's discretion.

> Academic integrity applies throughout: cite external code, libraries and ideas; the portfolio must document work you actually did.
