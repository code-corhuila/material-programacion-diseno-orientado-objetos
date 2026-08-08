# Week 15 - Materials and Curated Readings (Download Area)

> **Course:** Object-Oriented Programming and Design (2026-B)
> **Unit 3 - Practical application of OOP in Java** - Week 15, Corte 3
> **RAA:** `90_82759`

This is a **download area**. The consolidated study guide for Week 15 is provided here as a **PDF for download** - it is *not* a Moodle submission box and nothing is turned in on this page. Use it to review before the partial exam (Session 1) and the project defense (Session 2).

> **How to use this page:** download the PDF, then follow the curated readings below in order. Each entry includes a short summary so you can decide what to study first based on your Session 1 exit-ticket gaps.

---

## 1. Primary download

| Item | Format | Suggested use |
|------|--------|---------------|
| **Week 15 Consolidation Study Guide** | PDF | One-stop review of exceptions + collections + persistence integration, plus the exam-strategy and defense checklists. |

*(Place the PDF file in this folder for download. The content mirrors and condenses the two session guides.)*

---

## 2. Curated readings index with summary notes

### 2.1 Exceptions

**R1 - Oracle Java Tutorials: "Exceptions" trail.**
*Summary:* The canonical walkthrough of `try`/`catch`/`finally`, the checked/unchecked distinction, chained exceptions, and `try`-with-resources. Focus on the sections "Catching and Handling Exceptions" and "The try-with-resources Statement."
*Why it matters this week:* Items 1-3 and 5 of the partial exam all hinge on correct exception handling and cause chaining.

**R2 - Bloch, *Effective Java* (3rd ed.), exception items.**
*Summary:* Practical rules: use exceptions only for exceptional conditions; favor standard exceptions; throw exceptions appropriate to the abstraction (exception translation); document all thrown exceptions; do not ignore exceptions.
*Why it matters:* The "throw exceptions appropriate to the abstraction" rule is exactly the layer-crossing translation pattern assessed in the defense rubric.

### 2.2 Collections and generics

**R3 - Oracle Java Tutorials: "Collections" trail.**
*Summary:* Interfaces (`List`, `Set`, `Map`, `Queue`, `Deque`), implementations and their performance trade-offs, iteration, and ordering. Pair with the "Generics" trail for type-safe usage.
*Why it matters:* Exam Item 4 asks you to justify a collection choice; the defense probes whether your choice was deliberate.

**R4 - Oracle Java Tutorials: "Generics" trail.**
*Summary:* Type parameters, bounded types, wildcards, and why raw types are unsafe. Read at least "Generic Types" and "Type Erasure" at a conceptual level.
*Why it matters:* Raw types are an automatic quality deduction in the rubric.

### 2.3 File persistence

**R5 - Oracle Java Tutorials: "Basic I/O" trail (java.nio.file / java.io).**
*Summary:* Reading and writing text with buffered streams, `Files`/`Path` helpers, and resource management. Contrast human-readable formats with object serialization.
*Why it matters:* Exam Item 5 asks you to write a CSV repository with proper resource handling.

**R6 - The DAO / Repository pattern (design pattern references).**
*Summary:* Isolating data access behind an interface so the domain does not depend on storage details; enables swapping file for database without touching business logic.
*Why it matters:* This is the backbone of the integration architecture graded in Session 2.

### 2.4 Quality and design

**R7 - Martin, *Clean Code*.**
*Summary:* Meaningful names, small single-purpose functions, comments as a last resort, and a catalog of code smells.
*Why it matters:* Directly feeds the code-quality dimension (20%) of the project rubric.

**R8 - SOLID principles (overview articles / *Agile Software Development* by Martin).**
*Summary:* Single responsibility, Open/closed, Liskov substitution, Interface segregation, Dependency inversion - with small examples.
*Why it matters:* You must name at least one SOLID principle you applied during the defense.

---

## 3. Quick-reference cheat sheet (condensed)

**Exceptions**
- Checked = compiler-enforced, recoverable. Unchecked = bugs.
- Prefer `try`-with-resources over `finally { close(); }`.
- Translate low-level to domain exceptions and **chain the cause**.
- Never leave an empty `catch`.

**Collections**
- Program to the interface; always use generics.
- `ArrayList` (random access) / `LinkedList`,`ArrayDeque` (ends) / `HashSet` (unique) / `LinkedHashSet` (unique+order) / `TreeSet` (sorted) / `HashMap` (lookup) / `TreeMap` (sorted keys).
- Override `equals` and `hashCode` together for hash-based structures.

**Persistence**
- File I/O lives only in the repository/DAO layer.
- Decide the lifecycle for missing/corrupt/locked files explicitly.
- Human-readable (CSV/JSON) for inspectability; serialization for compactness (but brittle).

**Design**
- Layers: model / persistence / service / UI.
- Say it as: decision -> principle -> benefit -> trade-off.

---

## 4. Study path suggestion

1. Skim the **PDF study guide** end to end (20 min).
2. Target your Session 1 exit-ticket weak spot: exceptions (R1, R2), collections (R3, R4), or persistence (R5, R6).
3. Re-read the two session worked examples and re-implement them from a blank file without looking.
4. Rehearse three design-decision statements for your project using the R7/R8 vocabulary.

---

*Return to the [week guide](../README.md).*
