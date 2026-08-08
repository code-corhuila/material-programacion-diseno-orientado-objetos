# Week 05 - Session 02: Feedback and Error Analysis

> **Course:** Object-Oriented Programming and Design - 2026-B
> **Unit 1:** Fundamentals of Object-Oriented Programming
> **Session type:** Feedback, guided correction, and metacognitive self-assessment
> **Duration:** 2 hours (120 min)
> **RAA:** 90_82759

---

## 1. Session objective

Interpret feedback from the Corte 1 partial exam to identify and correct
conceptual and implementation errors, and self-assess prior vs. posterior
knowledge of Corte 1 topics using **Trello**.

This session measures Objectives 3, 4, and 5 of the week.

---

## 2. Timed agenda

| Time | Segment | Activity |
|------|---------|----------|
| 0:00 - 0:10 | **Return & calibrate** | Hand back graded exams. Compare each student's Session-1 confidence exit ticket to their real score. |
| 0:10 - 0:35 | **Item-by-item review** | Instructor walks the exam; correct answers + why the distractors were wrong. |
| 0:35 - 0:55 | **Error taxonomy** | Classify the class's most common mistakes: conceptual vs. implementation. |
| 0:55 - 1:25 | **Guided correction (worked)** | Rewrite two common wrong answers into correct ones, with justification. Pair work. |
| 1:25 - 1:50 | **Trello self-assessment** | Build/update the KWL board: prior vs. posterior knowledge per topic. |
| 1:50 - 2:00 | **Wrap-up / exit ticket** | Commit to one corrective action for Corte 2. |

---

## 3. Theory notes: how to read feedback like an engineer

Feedback is only useful if you convert a *grade* into an *action*. The engineering
mindset: **every wrong answer is a diagnosable defect with a root cause.**

### 3.1 The error taxonomy

We classify each mistake into one of two families. This distinction drives the
correct remedy.

```
                        WHY WAS IT WRONG?
                               │
             ┌─────────────────┴─────────────────┐
             ▼                                     ▼
   CONCEPTUAL ERROR                      IMPLEMENTATION ERROR
   (wrong mental model)                  (wrong syntax / logic)
   ────────────────────                  ─────────────────────
   You misunderstood WHAT               You understood the idea
   the concept means.                   but coded it wrong.

   Examples:                            Examples:
   • "A class and an object             • Forgot `this.` so the
      are the same thing."                parameter shadowed the field.
   • "Encapsulation means               • Setter validated but never
      writing many methods."              assigned the value.
   • "The default constructor           • Off-by-one in a boundary
      always exists."                     check (`>` vs `>=`).

   REMEDY: relearn the concept          REMEDY: practice + careful
   (readings, redraw diagrams,          reading; trace code by hand;
   re-explain in your own words).       use the compiler as a tutor.
```

> **Key insight:** A conceptual error will keep producing new bugs until the
> mental model is fixed. An implementation error is usually a one-off slip. Spend
> your study time proportionally — conceptual gaps are the expensive ones.

### 3.2 The correction protocol

For each error you correct, produce a **three-part record**:

1. **What I wrote** (the wrong version).
2. **What is correct** (the fixed version).
3. **Why** (the underlying rule, in one sentence) + **type** (conceptual /
   implementation).

This turns a returned exam into a personal study document.

---

## 4. Fully worked example: turning wrong answers into learning

Below are two authentic, high-frequency mistakes from Corte 1 topics, each run
through the correction protocol.

### 4.1 Case A - the vanishing default constructor (conceptual)

**What the student wrote** (and expected to compile):

```java
public class Product {
    private String name;
    private double price;

    public Product(String name, double price) {  // only this constructor
        this.name = name;
        this.price = price;
    }
}

// elsewhere:
Product p = new Product();   // <-- COMPILE ERROR
```

**Correct version:**

```java
public class Product {
    private String name;
    private double price;

    public Product() {                    // explicitly declared no-arg constructor
        this("Unnamed", 0.0);           // chains to the parameterized one
    }

    public Product(String name, double price) {
        this.name = name;
        setPrice(price);
    }

    public void setPrice(double price) {
        if (price < 0) throw new IllegalArgumentException("price must be >= 0");
        this.price = price;
    }
}
```

**Why + type:** *Once you declare any constructor, the compiler stops providing a
free no-argument default; you must declare it yourself if you want it.* →
**Conceptual error** (wrong model of when defaults exist).

### 4.2 Case B - the setter that forgets to assign (implementation)

**What the student wrote:**

```java
public void setAge(int age) {
    if (age < 0) {
        throw new IllegalArgumentException("age must be >= 0");
    }
    age = age;          // BUG: assigns the parameter to itself; field never set
}
```

**Correct version:**

```java
public void setAge(int age) {
    if (age < 0) {
        throw new IllegalArgumentException("age must be >= 0");
    }
    this.age = age;     // assigns the PARAMETER to the FIELD
}
```

**Why + type:** *Without `this.`, both sides refer to the local parameter, so the
field is never updated (field shadowing).* → **Implementation error** (correct
idea, wrong code).

> Notice how both fixes trace back to concepts from Session 1 §3.4 — the exam and
> the feedback are the same content seen from two directions.

---

## 5. Guided in-class practice

### 5.1 Pair correction (20 min)

Work with a partner. Each of you picks **two** errors from your own graded exam
(aim for one conceptual + one implementation). For each, fill this table:

| # | What I wrote | Correct version | Why (one sentence) | Type |
|---|--------------|-----------------|--------------------|------|
| 1 | | | | conceptual / impl |
| 2 | | | | conceptual / impl |

Then explain your corrections to your partner out loud. Teaching the fix is the
fastest way to lock in the concept.

### 5.2 Build the Trello self-assessment board (25 min)

We externalize prior vs. posterior knowledge using a **KWL** Trello board. This
directly fulfills Objective 4.

**Board setup:**

1. Create a Trello board named `OOP - Corte 1 - Self-Assessment - <YourName>`.
2. Create **four lists (columns):**

```
┌───────────────┐ ┌────────────────────┐ ┌──────────────────┐ ┌─────────────┐
│  TOPICS       │ │  BEFORE THE EXAM   │ │  AFTER FEEDBACK  │ │  ACTION     │
│  (backlog)    │ │  (prior: K)        │ │  (posterior: L)  │ │  (W→plan)   │
├───────────────┤ ├────────────────────┤ ├──────────────────┤ ├─────────────┤
│ • Classes &   │ │ move each topic    │ │ move it here once│ │ concrete    │
│   objects     │ │ card here and add  │ │ feedback changed │ │ next step   │
│ • Encapsulat. │ │ a 1-5 confidence   │ │ your understand- │ │ for Corte 2 │
│ • Constructors│ │ label (prior)      │ │ ing (posterior)  │ │             │
│ • The `this`  │ │                    │ │ + new 1-5 label  │ │             │
│   reference   │ │                    │ │                  │ │             │
│ • Reference   │ │                    │ │                  │ │             │
│   semantics   │ │                    │ │                  │ │             │
└───────────────┘ └────────────────────┘ └──────────────────┘ └─────────────┘
```

3. Create **one card per Corte 1 topic** (use the five above).
4. On each card, add:
   - A **label** with your **prior** confidence `1-5` (before the exam).
   - A checklist item: *"What I got wrong here"* (or "nothing").
   - A second **label** with your **posterior** confidence `1-5` (after feedback).
5. Move each card from **BEFORE** → **AFTER FEEDBACK** as you process it.
6. For any topic where posterior confidence is still `<= 3`, create a matching
   card in **ACTION** with a specific plan (e.g., "Redo the optional GitHub
   activity for constructors").

**What good looks like (example card):**

```
Card: "Constructors"
  Prior confidence:      ⭐⭐ (2/5)
  What I got wrong:      ✔ Assumed default constructor always exists
  Posterior confidence:  ⭐⭐⭐⭐ (4/5)
  → linked ACTION card:  "Re-read material/README §4 + code 2 examples"
```

Take a **screenshot** of your board — it is your session deliverable.

---

## 6. Deliverables

| Deliverable | Format | Purpose |
|-------------|--------|---------|
| Correction table (§5.1) | Two rows minimum, one per error, classified | Evidence of Objective 3 |
| Trello board screenshot | PNG/JPG showing prior + posterior + action | Evidence of Objective 4 |

---

## 7. Wrap-up / exit ticket

Answer on the exit slip:

1. **My most common error type was:** conceptual / implementation (circle one),
   because ________________________________________________.
2. **My biggest confidence jump (prior → posterior) was on the topic:** _______.
3. **My single corrective action for Corte 2 is:** ____________________________.

> **Bridge to Corte 2:** Corte 2 builds inheritance, polymorphism, and
> abstraction *on top of* these foundations. A shaky pillar here becomes a
> collapsing structure later — which is exactly why this feedback session exists.

---

## 8. Instructor notes (facilitation)

- Keep the calibration moment (0:00-0:10) blame-free; the point is
  self-awareness, not embarrassment. Overconfidence and underconfidence are both
  useful signals.
- When classifying errors as a group, tally them on the board. If a *conceptual*
  error dominates the class, re-teach that pillar for 5 minutes on the spot.
- Encourage students to keep the same Trello board through Corte 2 so growth is
  visible over the term.
