# Week 01 · Session 1 — From procedures to objects

**Unit 1 — Fundamentals of OOP** · Corte 1 · Duration: **90 minutes**
Modality: theoretical-practical (concept + short in-class exercise)

---

## 1. Session objective

Explain how the **object-oriented paradigm differs from procedural programming** and describe its **role across the software life cycle**, so that by the end of the session the student can (a) contrast the two paradigms with at least three concrete points, (b) use the core OOP vocabulary correctly, and (c) draft an evidence-based argument for the opening forum.

This session is deliberately **language-agnostic in spirit** — we build the *mental model* first. Java syntax arrives in Session 2 once the environment is ready.

---

## 2. Timed agenda (90 min)

| Time | Segment | What happens |
|---|---|---|
| 0:00–0:10 | **Hook & framing** | A concrete problem ("model a bank account / a car / a student") shown two ways. Course expectations for the week. |
| 0:10–0:35 | **Theory A — Paradigms** | Imperative → procedural → object-oriented. Why paradigms exist and what each optimizes for. |
| 0:35–0:55 | **Theory B — The object model** | Object = state + behavior + identity; class as blueprint; message passing; the four pillars at a glance. |
| 0:55–1:05 | **Worked example** | The same "bank account" modeled procedurally vs. object-orientedly; reading the difference. |
| 1:05–1:25 | **Guided practice** | Students fill the procedural-vs-OOP comparison table and identify objects in a given scenario. |
| 1:25–1:30 | **Wrap-up & exit ticket** | Key takeaways; launch of the opening forum; exit ticket. |

---

## 3. Theory notes

### 3.1 What is a programming paradigm?

A **paradigm** is a *way of organizing a program and reasoning about computation*. It shapes the questions you ask when you design software:

- **Imperative** thinking asks: *"What steps, in what order, change the machine's state?"*
- **Procedural** thinking (a structured form of imperative) asks: *"Which reusable procedures/functions should I call, and what data do they operate on?"*
- **Object-oriented** thinking asks: *"Which entities exist in my problem, what does each know (state) and what can each do (behavior), and how do they collaborate?"*

No paradigm is universally "best." OOP became dominant for **large, evolving, team-built systems** because it aligns the structure of the code with the structure of the problem domain, which makes change cheaper.

### 3.2 The procedural style

In the procedural style, **data and the functions that act on it are separate**. Data structures are declared, and free functions read and modify them:

```
DATA (separate):                 FUNCTIONS (separate, act on the data):
  balance : number                 deposit(account, amount)
  owner   : text                    withdraw(account, amount)
                                     printStatement(account)
```

This works well for small programs. It scales poorly because:

- **No enforced boundary.** Any function anywhere can change `balance` directly, including setting it to an invalid value. There is no single guardian of the rule "balance must never go negative."
- **Data and rules drift apart.** The logic that protects the data lives far from the data itself, so a change in one is easily forgotten in the other.
- **Growth means sprawl.** Adding features multiplies the number of free functions and the ways they can interact, increasing coupling.

### 3.3 The object-oriented style

In OOP, **state and the behavior that governs it live together in an object**. An **object** has three characteristics:

1. **State** — the current values of its **attributes** (e.g., `balance = 250.0`).
2. **Behavior** — the **methods** it can perform (e.g., `deposit`, `withdraw`).
3. **Identity** — it is a distinct entity, even if another object holds identical values.

A **class** is the **blueprint**: it declares what attributes and methods every object of that type will have. Objects are **instances** created from the class.

```
   CLASS: BankAccount  (blueprint)              OBJECTS (instances at runtime)
   ┌───────────────────────────┐               ┌─────────────┐  ┌─────────────┐
   │ state:   balance, owner    │  create ──▶   │ balance=250 │  │ balance= 40 │
   │ behavior: deposit()        │               │ owner="Ana" │  │ owner="Beto"│
   │           withdraw()       │               └─────────────┘  └─────────────┘
   │           getBalance()     │                acc1 (identity)  acc2 (identity)
   └───────────────────────────┘
```

Objects collaborate by **sending messages** — asking one another to run a method. In Java a message is a method call: `acc1.deposit(100)`. The object decides how to respond; the caller does not touch `balance` directly.

### 3.4 The four pillars (preview)

These are developed in later weeks, but you need the names now:

| Pillar | One-line idea | Everyday analogy |
|---|---|---|
| **Abstraction** | Model only what matters for the problem; hide the rest. | A car's *pedals and wheel* — you drive without knowing the engine internals. |
| **Encapsulation** | Keep state private; expose a controlled interface that protects the rules. | An ATM: you use buttons; you cannot reach into the cash drawer. |
| **Inheritance** | Build a specialized class on top of a general one, reusing its members. | *SavingsAccount* **is a** *BankAccount* with extra interest behavior. |
| **Polymorphism** | The same message produces the right behavior for the actual object type. | "Make a sound" → a Dog barks, a Cat meows, same request. |

> Encapsulation is the pillar Week 01 leans on most: it is *the* answer to the "anyone can corrupt the data" weakness of the procedural style.

### 3.5 OOP across the software life cycle

The **software life cycle** is the sequence of activities a system goes through: **requirements/analysis → design → implementation → testing → deployment → maintenance/evolution**. OOP earns its place because it helps at *every* stage, not just coding:

- **Analysis.** The nouns of the problem ("account", "customer", "transaction") map naturally to candidate **classes**, and the verbs ("deposit", "transfer") map to **methods**. The model speaks the language of the domain.
- **Design.** Responsibilities are assigned to objects; relationships (has-a, is-a) are made explicit. The design can be sketched in UML class diagrams before any code exists.
- **Implementation.** Encapsulation localizes each rule inside its class, so code is written in cohesive units.
- **Testing.** Objects with clear interfaces are easier to test in isolation.
- **Maintenance & evolution — the biggest payoff.** In real projects, *maintenance dominates total cost.* Because encapsulation confines the effect of a change to a single class's interior, and inheritance/polymorphism let new variants be added without rewriting callers, object-oriented systems tend to **absorb change more cheaply**. This is the core reason the paradigm is preferred for long-lived software.

```
Requirements ─▶ Design ─▶ Implementation ─▶ Testing ─▶ Deployment ─▶ Maintenance
     │ nouns→classes  │ responsibilities │ cohesive    │ isolated    │ (largest cost)
     │ verbs →methods │ UML relations    │ units       │ objects     │ change is local
     └─────────────── OOP supports the whole cycle, not only coding ──────────────┘
```

---

## 4. Worked example — the same account, two ways

**Problem:** model a bank account so that the balance can never become negative. Below is *pseudocode* (Java arrives next session), chosen so we compare *thinking*, not syntax.

### 4.1 Procedural version

```text
// Data is exposed and separate from the rules
account = { balance: 0, owner: "Ana" }

function withdraw(account, amount):
    account.balance = account.balance - amount   // no rule enforced here!

// Anywhere in the program, someone can do:
account.balance = -9999          // nothing stops this
withdraw(account, 1000000)       // balance goes negative; rule violated
```

The rule "never negative" is *not guarded*. Every caller is trusted to behave, and any line can corrupt the data.

### 4.2 Object-oriented version

```text
class BankAccount:
    private balance = 0          // state is hidden
    private owner

    method deposit(amount):
        if amount > 0: balance = balance + amount

    method withdraw(amount):
        if amount > 0 and amount <= balance:      // the rule lives WITH the data
            balance = balance - amount
        else:
            reject the operation

    method getBalance(): return balance   // read-only view

// Usage — you can only interact through the safe interface:
acc = new BankAccount(owner="Ana")
acc.deposit(500)
acc.withdraw(1000000)   // rejected by the object; balance stays valid
// acc.balance = -9999  // IMPOSSIBLE: balance is private
```

**Reading the difference:**

| Aspect | Procedural | Object-oriented |
|---|---|---|
| Where does the "never negative" rule live? | In *hopefully every* caller | In one place, inside the class |
| Can outside code corrupt `balance`? | Yes, directly | No — it's private |
| What happens when the rule changes? | Hunt down every caller | Edit one method |
| What does the caller need to know? | The data layout | Only the method names (the interface) |

This single example is the miniature of the whole course: **OOP moves rules next to the data they protect and hides the rest.**

---

## 5. Guided in-class practice (20 min)

Work individually, then compare with a partner.

### Part A — Complete the comparison table (10 min)

Fill each cell for the two paradigms:

| Question | Procedural | Object-Oriented |
|---|---|---|
| Basic unit of organization? | *(function/procedure)* | |
| Where does data live relative to logic? | | |
| Who is responsible for keeping data valid? | | |
| How is code reused? | | |
| How does the design map to the problem domain? | | |
| Which scales better for large, changing systems, and why? | | |

### Part B — Find the objects (10 min)

Read this scenario:

> *"In a university, a **student** enrolls in **courses**. Each course is taught by a **professor** and has a **schedule**. A student can request an **enrollment certificate** that lists the courses they are currently taking."*

Do the following:

1. **Underline the nouns** — these are candidate classes/objects.
2. For **two** of your candidate classes, list **two attributes** (state) and **two methods** (behavior).
3. Identify **one relationship** between two classes and say whether it reads as *"has-a"* (composition) or *"is-a"* (inheritance).
4. In one sentence, name a **rule** one of your objects should protect (e.g., *"a student cannot enroll in the same course twice"*) and say **which object** should guard it.

*Expected outcome:* everyone leaves with a small, correct object model expressed in plain language — and the habit of turning **nouns → classes** and **verbs → methods**.

---

## 6. Opening forum — launched this session

**Prompt:** *"How does object-oriented programming transform the way we program, compared to the procedural style?"*

- **Initial post (by mid-week):** 150–250 words. Make a **claim** and support it with **at least one concrete example** (you may use the account example or your own). Reference **at least one course concept** (encapsulation, maintainability, life cycle, etc.).
- **Reply (by end of week):** respond substantively to **at least one peer** — extend, respectfully challenge, or add a counter-example. "I agree" is not enough.

Assessed with the course **Forum / participation** rubric: relevance & depth (40 %), use of course concepts (30 %), interaction with peers (20 %), clarity & correctness (10 %).

---

## 7. Wrap-up and exit ticket

**Three takeaways**

1. Procedural code keeps **data and logic apart**; OOP **bundles state with the behavior that governs it** into objects.
2. The vocabulary — **object, class, attribute, method, message** — plus the **four pillars** (abstraction, encapsulation, inheritance, polymorphism) is the shared language of the whole course.
3. OOP helps across the **entire life cycle**, and its biggest payoff is **cheaper maintenance** because change stays local.

**Exit ticket (hand in / post before you leave — 3 short answers):**

1. Give **one** concrete difference between procedural and OOP, in your own words.
2. Define **object** and **class**, and state how they relate.
3. Name the **one thing you most need clarified** before Session 2 (this steers the next session's start).

**Before Session 2:** confirm you have a laptop able to install a JDK and an IDE, and skim the [`material/README.md`](../material/README.md) "Getting Started" links so the install goes quickly.
