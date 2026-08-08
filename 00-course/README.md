# Object-Oriented Programming and Design — Course Overview

**Corporación Universitaria del Huila (CORHUILA) · Faculty of Engineering**
**Semester 2026-B**

---

## 1. Course Identification

| Field | Detail |
|---|---|
| Faculty | Engineering |
| Academic program | Mechatronics Engineering |
| Academic activity | Object-Oriented Programming and Design (Programación Orientada a Objetos) |
| Course code | 82759 |
| Modality | On-campus (Presential) |
| Course type | Module — Theoretical-Practical |
| Credits | 3 |
| Academic work hours | Accompanied activity: 48 h · Autonomous activity: 96 h · **Total: 144 h** |
| Education level | Undergraduate (Pregrado) |
| Duration | 16 weeks, organized in 3 assessment periods ("cortes"): Corte 1 (weeks 1–5), Corte 2 (weeks 6–10), Corte 3 (weeks 11–16) |
| Instructor profile | Systems/electronics engineer or related field, with university-teaching experience and a master's degree in an IT area; strong theoretical-practical command of the subject. |
| Programming language / tooling | Java (JDK/JVM), IDE among IntelliJ IDEA / Eclipse / NetBeans / VS Code; static-analysis tools (Checkstyle, SonarLint). |

---

## 2. Justification

Object-Oriented Programming (OOP) is a cornerstone of modern software engineering because of its modular, reusable, and maintainable approach. This course strengthens the student's ability to model real-world problems through classes, objects, and their relationships, applying the four pillars of the paradigm — **abstraction, encapsulation, inheritance, and polymorphism**. Beyond syntax, it promotes contemporary good practices and tooling (version control discipline, code review, testing, static analysis, and refactoring) so that the code the student produces is correct, readable, scalable, and maintainable.

For Mechatronics Engineering students, OOP is the bridge between algorithmic thinking and the design of robust software components that later control, simulate, or interface with physical systems. Mastering the paradigm equips them to build well-structured applications and to collaborate effectively in engineering teams where software quality is a shared responsibility.

---

## 3. Objectives

### 3.1 General Objective
Develop the competencies required to design and implement software solutions under the object-oriented paradigm, applying good practices, design principles, and modern tools that favor the quality of both the product and the development process.

### 3.2 Specific Objectives
1. Understand the fundamentals of OOP and its role in the software life cycle.
2. Implement classes, objects, attributes, methods, and constructors in Java.
3. Apply inheritance, polymorphism, composition, abstraction, and interfaces to model coherent class hierarchies.
4. Integrate data structures (collections) and file handling into object-oriented applications.
5. Adopt good programming practices, testing, refactoring, and code documentation.

---

## 4. Subject Learning Outcome (RAA)

| Code | Statement |
|---|---|
| **90_82759** | The student **builds software solutions applying the principles of OOP**, using contemporary techniques, tools, and good practices, with criteria of **quality, integration, and maintainability**. |

This single institutional RAA is served progressively across the three cortes. Throughout this material it is referenced by the three reporting instances defined by the syllabus:

- **90_82759_01 (Corte 1)** — foundations and correct use of the OOP paradigm.
- **90_82759_01 (Corte 2)** — design principles, modularity, and hierarchy modeling.
- **90_82759_01 (Corte 3)** — practical application, robustness, persistence, and code quality.

---

## 5. Methodology

The course is **theoretical-practical**. Each 3-hour accompanied session pairs a conceptual explanation with hands-on coding, and is extended by 6 hours of autonomous work (forums, exercises, workshops, and quizzes). The dominant strategies are:

- **Live coding & guided practice** — the instructor models a concept in the IDE; students reproduce and extend it.
- **Problem-Based Learning (PBL)** — real, incremental scenarios drive the modeling of classes and hierarchies.
- **Workshops (talleres)** — deliberate practice tasks producing verifiable code artifacts.
- **Discussion forums** — conceptual reflection at the start of each unit.
- **Quizzes** — short, frequent checks of syntax and conceptual understanding.
- **Incremental project** — a single application (e.g., an inventory / management system) grows across the semester, absorbing each new concept: classes → encapsulation → inheritance/polymorphism → abstraction/interfaces → composition → exceptions → collections → file persistence → refactoring.

**Autonomous work (96 h)** is structured around the incremental project, reading of the reference bibliography, and preparation of workshop deliverables. Trello is used for tracking prior/posterior knowledge and personal progress, as indicated in the syllabus.

---

## 6. Assessment Plan Across the 3 Cortes

The institutional scale defines three assessment periods. A balanced weighting that reflects the increasing depth and workload of the course is suggested below. Within each corte the grade combines **auto-evaluation, co-evaluation, and hetero-evaluation**, as required by the CORHUILA formative model.

| Corte | Weeks | Suggested weight | Focus | Key evidences |
|---|---|---|---|---|
| **Corte 1** | 1–5 | **30 %** | OOP foundations: environment, classes, objects, encapsulation, constructors | Class-design workshops, encapsulation quiz, Corte 1 partial exam |
| **Corte 2** | 6–10 | **30 %** | Design & modularity: inheritance, polymorphism, abstraction/interfaces, composition | Hierarchy-modeling workshop (PBL), inheritance-vs-composition quiz, Corte 2 partial exam |
| **Corte 3** | 11–16 | **40 %** | Applied OOP: exceptions, collections, file I/O, good practices & refactoring | Persistence workshop, refactoring quiz, incremental-project delivery, Corte 3 partial exam |

### 6.1 Internal composition of each corte (suggested)

| Component | Type | Weight within the corte |
|---|---|---|
| Partial exam (parcial) | Hetero-evaluation | 30 % |
| Workshops / PBL practical deliverables | Hetero-evaluation | 35 % |
| Quizzes and forums | Hetero-evaluation | 15 % |
| Co-evaluation (peer review of practical exercises) | Co-evaluation | 10 % |
| Auto-evaluation (self-assessment via Trello / reflection) | Auto-evaluation | 10 % |

### 6.2 Evidences by corte (from the syllabus)

- **Corte 1** — Practical workshops using the OOP paradigm; questionnaire on OOP concepts; PBL practical activity; self-assessment (prior/posterior knowledge via Trello); peer validation of practical exercises.
- **Corte 2** — Practical workshops; questionnaire on design principles and modularity; recorded video / oral explanation of concepts (self-assessment); peer feedback forum.
- **Corte 3** — Case studies and PBL project; questionnaire on applied concepts; project presentation; reflective forum; group evaluation.

---

## 7. Evaluation Instruments and Base Rubrics

### 7.1 Instruments
- **Partial exam (parcial):** mixed written + practical exam at the end of each corte (weeks 5, 10, 15).
- **Coding workshop:** an IDE-based deliverable with a specification checklist and automated compilation check.
- **Quiz:** 5–10 short conceptual/syntax items.
- **Forum participation:** conceptual reflection with a required initial post and one peer reply.
- **Incremental project:** cumulative application delivered and defended in Corte 3.
- **Self- and peer-assessment forms:** structured checklists aligned to the rubric criteria below.

### 7.2 Base rubric — Coding workshop / practical deliverable

| Criterion | Excellent (5.0–4.5) | Satisfactory (4.4–3.5) | Minimal (3.4–3.0) | Insufficient (<3.0) |
|---|---|---|---|---|
| **Correctness** — compiles and meets the specification | Fully meets all requirements; compiles and runs without errors | Meets most requirements; minor defects | Meets basic requirements; several defects | Does not compile or misses core requirements |
| **OOP design** — correct use of the paradigm | Appropriate abstraction, encapsulation and relationships; clear responsibilities | Mostly sound design; minor coupling issues | Basic modeling; weak encapsulation | Procedural code, no real OOP modeling |
| **Code quality** — readability, naming, style | Clean, consistent, self-documenting; passes static analysis | Generally clean; few style warnings | Readable but inconsistent | Hard to read; many style violations |
| **Robustness** — validation & error handling | Handles edge cases and errors gracefully | Handles common cases | Minimal validation | No validation; crashes on invalid input |
| **Documentation** — comments/Javadoc & delivery | Clear Javadoc and delivery notes | Adequate comments | Sparse comments | No documentation |

### 7.3 Base rubric — Partial exam (parcial)
- **Conceptual mastery (40 %):** precise, correct answers demonstrating understanding of the corte's concepts.
- **Practical problem-solving (40 %):** correct modeling/implementation of the posed problem in Java.
- **Justification & good practices (20 %):** reasoned design decisions and adherence to conventions.

### 7.4 Base rubric — Forum / participation
- **Relevance & depth (40 %)** · **Use of course concepts (30 %)** · **Interaction with peers (20 %)** · **Clarity & correctness of writing (10 %)**.

### 7.5 Grading scale
Undergraduate scale, 0.0–5.0; passing grade 3.0. Each corte is reported independently and the final grade is the weighted sum of the three cortes (see §6).

---

## 8. Bibliography

**Core (internal, CORHUILA):**
- Sommerville, I. (2011). *Software Engineering* (9th ed.). Pearson Education.

**Complementary (external):**
- Gamma, E., Helm, R., Johnson, R., & Vlissides, J. (2009). *Design Patterns*. Pearson Addison-Wesley.
- Babar, M. A. (2009). *Software Architecture Knowledge Management: Theory and Practice*. Springer.
- Piattini, M., & García, J. (2007). *Fábricas de software: experiencias, tecnologías y organización*. Ra-Ma.
- Clements, P., Bachmann, F., & Bass, L. (2011). *Documenting Software Architectures*. Pearson Education.

---

*Course overview prepared for the 2026-B semester, based on the official CORHUILA syllabus (code 82759). All units, weekly topics, the RAA, and objectives derive directly from that syllabus.*
