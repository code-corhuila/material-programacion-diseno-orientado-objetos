# Week 05 - Material (Download Area & Curated Readings)

> **Course:** Object-Oriented Programming and Design - 2026-B
> **Unit 1:** Fundamentals of Object-Oriented Programming
> **Week:** 05 - Assessment Corte 1
> **RAA:** 90_82759

---

## About this area

This is a **download area**. It gathers the readings, summary notes, and
reference material you need to (a) prepare for the Corte 1 partial exam and (b)
correct your errors afterward. The consolidated study guide for this week is
distributed here as a **downloadable PDF**.

> **This is NOT a submission box.** Do not upload anything here. Nothing on this
> page is turned in through Moodle. The partial exam is taken in class
> (Session 1), and the optional practice is submitted via **GitHub** (see the
> [optional activity](../optional-activity/README.md)).

---

## 1. Downloadable study guide (PDF)

| File | Description |
|------|-------------|
| `corte1-oop-study-guide.pdf` | Consolidated one-document review of all Corte 1 topics: the four pillars, worked examples, common errors, and a self-check. Print it or read it on-screen. |

> **How to download:** click the PDF in this folder / the Moodle resource block
> for Week 05. If the file is not yet posted, the same content is reproduced as
> the summary notes in §3 below — you lose nothing by reading it here.

---

## 2. Curated readings index

Ordered from lightest (concept refreshers) to deepest (reference texts). You do
**not** need to read all of them; use §4 to pick what matches your weak spots.

| # | Reading | Type | Focus | Priority |
|---|---------|------|-------|----------|
| R1 | Oracle Java Tutorials — *Classes and Objects* | Official docs | Classes, objects, fields, methods, `this` | Essential |
| R2 | Oracle Java Tutorials — *Providing Constructors for Your Classes* | Official docs | Constructors, overloading, default rules | Essential |
| R3 | Oracle Java Tutorials — *Controlling Access to Members of a Class* | Official docs | `private`/`protected`/`public`, encapsulation | Essential |
| R4 | *Head First Java* (Sierra & Bates), Ch. 2-4 | Book | Object thinking, state vs. behavior, constructors | Recommended |
| R5 | *Clean Code* (R. C. Martin), Ch. 6 "Objects and Data Structures" | Book | Why encapsulation matters in practice | Enrichment |
| R6 | Refactoring Guru — *Encapsulate Field* | Web article | Turning public fields into encapsulated ones | Recommended |
| R7 | Baeldung — *A Guide to Constructors in Java* | Web tutorial | Constructor chaining with `this()` | Recommended |

> Locate R1-R3 through the official Oracle "Java Tutorials → Learning the Java
> Language → Classes and Objects" trail. R4-R7 are widely available through the
> CORHUILA library and the authors'/publishers' sites. Always prefer the primary
> source over a random blog copy.

---

## 3. Summary notes (self-contained review)

These notes restate the exam-relevant content so you can revise without internet
access. They mirror the theory in the two session plans.

### 3.1 The four pillars of Corte 1

| Pillar | One-sentence essence | Exam signal |
|--------|----------------------|-------------|
| **Class & object** | A class is a blueprint; an object is a concrete instance created with `new`. | Can you tell them apart in a sentence? |
| **Encapsulation** | Private fields + public methods that guard invariants. | Are your fields `private`? Do setters validate? |
| **Constructor** | A special method that establishes a valid initial state. | Does construction route through validation? |
| **`this` & references** | `this` is the current object; object variables are references (aliasing!). | Do you predict aliasing correctly? |

### 3.2 Constructor rules cheat-sheet

```
1. If you declare NO constructor  -> compiler gives a free no-arg default.
2. If you declare ANY constructor -> the free default DISAPPEARS.
3. Want a no-arg constructor too? -> declare it explicitly.
4. Overloading = same name, different parameter lists.
5. this(...) inside a constructor chains to another constructor of the SAME class.
6. Route constructors through setters so validation lives in ONE place.
```

### 3.3 Encapsulation pattern to reproduce from memory

```java
public class Account {
    private double balance;                 // 1. private field

    public Account(double initial) {        // 2. constructor establishes state
        setBalance(initial);                //    ...via the setter
    }

    public double getBalance() {            // 3. controlled read
        return balance;
    }

    public void setBalance(double balance) {// 4. controlled write + invariant
        if (balance < 0) {
            throw new IllegalArgumentException("balance must be >= 0");
        }
        this.balance = balance;
    }
}
```

### 3.4 The reference-aliasing trap (memorize the picture)

```
   Account a = new Account(100);
   Account b = a;        // NOT a copy — same object, two names
   b.setBalance(500);
   // a.getBalance() == 500   (both point to one object)
```

To get an independent object you must create a **new** one, not assign the
reference.

### 3.5 The two error families (for Session 2)

| Family | Root cause | How to fix it |
|--------|-----------|---------------|
| **Conceptual** | Wrong mental model | Relearn: readings R1-R3, redraw diagrams, re-explain aloud |
| **Implementation** | Wrong syntax/logic | Practice, trace by hand, let the compiler teach you |

---

## 4. Study path by weak spot

Pick the row that matches where you feel least confident:

| If you struggle with... | Read | Then do |
|-------------------------|------|---------|
| Telling class vs. object apart | R1, §3.1 | Redraw the blueprint/instance diagram from memory |
| Encapsulation & access modifiers | R3, R6, §3.3 | Convert a public-field class into an encapsulated one |
| Constructors & defaults | R2, R7, §3.2 | Write a class with default + parameterized + chaining |
| `this` and aliasing | R1, §3.4 | Trace 3 aliasing snippets on paper, predict output |

---

## 5. Related pages

- [Week overview](../README.md)
- [Session 01 - Partial exam](../01-session/README.md)
- [Session 02 - Feedback & error analysis](../02-session/README.md)
- [Optional activity (GitHub submission)](../optional-activity/README.md)

---

## 6. Attribution & academic honesty

Cite any source you quote when you use these readings in the optional activity.
The readings are here to build understanding for a **closed** individual exam —
during the exam itself, no materials are permitted.
