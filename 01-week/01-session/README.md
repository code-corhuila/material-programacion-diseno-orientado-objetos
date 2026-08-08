# Session 01 — The Object-Oriented Paradigm and its Role in the Software Life Cycle

**Course:** Object-Oriented Programming and Design · **Week:** 01 · **Unit:** 1 — Fundamentals of OOP
**Assessment period:** Corte 1 · **RAA:** 90_82759
**Estimated duration:** 2 hours (120 minutes)

---

## 1. Session objective

Explain how the object-oriented paradigm differs from procedural programming, describe the core building blocks of OOP (objects, classes, state, behavior), preview the four pillars of the paradigm, and locate the contribution of OOP within the phases of the software life cycle.

By the end of this session the student will be able to look at a real-world scenario and identify candidate **objects**, their **attributes**, and their **responsibilities** — the first skill of object-oriented modeling.

---

## 2. Timed agenda (120 min)

| Time | Segment | Activity |
|------|---------|----------|
| 0:00 – 0:10 | Warm-up | Course framing, RAA, and the guiding question: *"Why did we invent objects?"* |
| 0:10 – 0:35 | Theory I | What is a paradigm? Procedural programming and its limits at scale. |
| 0:35 – 1:00 | Theory II | Objects = state + behavior; the class/object relationship; the four pillars (preview). |
| 1:00 – 1:15 | Worked example | Same problem modeled procedurally vs. with objects (pseudocode). |
| 1:15 – 1:25 | Break / Q&A | — |
| 1:25 – 1:55 | Guided practice | Object-finding workshop on a real scenario (in pairs). |
| 1:55 – 2:00 | Wrap-up | Exit ticket + preview of Session 02. |

---

## 3. Theory notes

### 3.1 What is a programming paradigm?

A **paradigm** is a fundamental *style* of building programs — a set of ideas about how to structure code and reason about it. It shapes the questions you ask when you design software.

- In a **procedural** paradigm the central question is: *"What are the steps (procedures) that transform the data?"* You decompose the problem into functions that call one another and operate on data that lives somewhere outside them.
- In an **object-oriented** paradigm the central question is: *"What are the things (objects) in my problem, what does each one know, and what can each one do?"* You decompose the problem into objects that hold their own data and expose behavior.

Neither paradigm is "wrong." Procedural thinking is excellent for small, linear scripts. OOP earns its keep as programs grow large, are maintained for years, and are worked on by teams.

### 3.2 Procedural programming and its limits at scale

In classic procedural code, **data and the functions that manipulate it are separate**. Consider a small bank simulation:

```
// Procedural style (pseudocode)
balance_alice = 1000
balance_bob   = 500

function deposit(account_balance, amount):
    return account_balance + amount

function withdraw(account_balance, amount):
    if amount <= account_balance:
        return account_balance - amount
    else:
        return account_balance   // silently fails

balance_alice = deposit(balance_alice, 200)
balance_bob   = withdraw(balance_bob, 700)
```

This works, but notice the pressure points that appear as the system grows:

1. **Nothing protects the data.** Any part of the program can write `balance_alice = -9999` directly. There is no guarantee the balance rules are respected.
2. **Data and logic drift apart.** The rule "you cannot withdraw more than you have" lives in one function, but the data lives elsewhere. Add a second developer and a new function, and the rule can easily be bypassed or duplicated.
3. **Naming explodes.** `balance_alice`, `balance_bob`, `balance_carol`… every new account is a new set of variables.
4. **Change ripples.** If accounts now need an owner name, a currency, and an interest rate, you touch many functions and many variables.

These are not bugs in the code — they are *structural* limits of separating data from behavior.

### 3.3 The object-oriented idea: state + behavior together

OOP's core move is simple and powerful: **bundle the data and the operations that belong to it into one unit — an object.**

```
// Object-oriented style (pseudocode)
object Account:
    private state:
        owner
        balance
    behavior:
        deposit(amount):
            balance = balance + amount
        withdraw(amount):
            if amount <= balance:
                balance = balance - amount
            else:
                raise Error("Insufficient funds")
        getBalance():
            return balance

alice = new Account(owner="Alice", balance=1000)
bob   = new Account(owner="Bob",   balance=500)

alice.deposit(200)
bob.withdraw(700)   // now this is controlled and can signal an error
```

Two ideas do the heavy lifting:

- **Object = state + behavior.** Each `Account` carries its own `balance` and knows how to `deposit` and `withdraw`. The rule about insufficient funds now lives *with* the data it protects.
- **The object controls access to its state.** `balance` is `private`; the only way to change it is through the object's own methods. This is **encapsulation**, and it is what fixes limit #1 above.

### 3.4 Classes and objects

- A **class** is a *blueprint*. It describes what every account has (attributes) and what every account can do (methods).
- An **object** is a concrete *instance* built from that blueprint, with its own values.

Analogy: a class is the architectural plan for a house; an object is an actual house built from that plan. From one plan you can build many houses, each with a different address and paint color, but all sharing the same structure.

```
        CLASS (blueprint)                 OBJECTS (instances)
     +---------------------+          +----------------------+
     |      Account        |          | alice : Account      |
     +---------------------+   new    |  owner   = "Alice"   |
     | - owner             | -------> |  balance = 1200      |
     | - balance           |          +----------------------+
     +---------------------+          +----------------------+
     | + deposit(amount)   |   new    | bob : Account        |
     | + withdraw(amount)  | -------> |  owner   = "Bob"     |
     | + getBalance()      |          |  balance = 500       |
     +---------------------+          +----------------------+
```

### 3.5 The four pillars of OOP (preview)

We will study each in depth in later weeks; here is the map so you can see where we are going.

| Pillar | One-line idea | In the `Account` example |
|--------|---------------|--------------------------|
| **Encapsulation** | Keep state private; expose controlled behavior. | `balance` is private; you change it only via `deposit`/`withdraw`. |
| **Abstraction** | Expose the essentials; hide the mechanism. | Users call `withdraw(amount)` without knowing how the balance is stored. |
| **Inheritance** | A class can reuse and extend another. | A `SavingsAccount` could inherit from `Account` and add interest. |
| **Polymorphism** | The same call behaves differently by type. | `account.applyMonthlyRules()` does different things for checking vs. savings. |

> Memory aid: **A PIE** — **A**bstraction, **P**olymorphism, **I**nheritance, **E**ncapsulation.

### 3.6 Procedural vs. object-oriented — side by side

| Aspect | Procedural | Object-oriented |
|--------|------------|-----------------|
| Unit of organization | Functions/procedures | Objects (and classes) |
| Data and behavior | Separate | Bundled together |
| Data protection | Weak (globals exposed) | Strong (encapsulation) |
| Primary question | "What steps transform the data?" | "What are the things and what do they do?" |
| Reuse mechanism | Copy functions / libraries | Inheritance, composition, polymorphism |
| Scales to large teams | Harder | Easier (clear boundaries) |
| Maps to real-world entities | Indirectly | Directly (objects = domain concepts) |

### 3.7 OOP and the software life cycle

The **software life cycle** is the sequence of phases a software product moves through, from idea to retirement. A common decomposition:

```
 Requirements → Analysis → Design → Implementation → Testing → Deployment → Maintenance
```

Object orientation contributes across these phases, not only in coding:

- **Analysis:** The domain is described in terms of *entities and their responsibilities* — which map almost directly to objects. Talking to a client about "Students," "Courses," and "Enrollments" already sketches your classes.
- **Design:** Object-oriented design produces class diagrams, defines responsibilities, and decides how objects collaborate. Good boundaries here reduce cost later.
- **Implementation:** Classes are written in a language such as Java. Encapsulation keeps modules independent.
- **Testing:** Well-encapsulated objects are easier to test in isolation (unit testing).
- **Maintenance:** This is where OOP pays off most. Because behavior lives with its data and interfaces hide internals, a change to how something works stays local and does not ripple across the whole codebase. Maintenance typically consumes the majority of a system's total cost over its life, so a paradigm that lowers the cost of change is enormously valuable.

**Key takeaway:** OOP is not just a coding trick — it is a way of *modeling the problem* that stays consistent from the first conversation with a client through years of maintenance.

---

## 4. Worked example — modeling a library, two ways

**Problem:** Model books in a small library. A book can be borrowed and returned; we must never lend a book that is already out.

### 4.1 Procedural sketch

```
title1 = "Clean Code";          available1 = true
title2 = "Effective Java";      available2 = true

function borrow(available_flag):
    if available_flag:
        return false   // now borrowed
    else:
        print("Already borrowed")
        return available_flag

available1 = borrow(available1)
```

Problems: the `title` and its `available` flag are two disconnected variables; nothing stops another part of the program from flipping `available1` by hand; adding a "borrower name" means adding yet another parallel variable per book.

### 4.2 Object-oriented sketch

```
class Book:
    private title
    private available = true
    private borrower  = none

    constructor(title):
        this.title = title

    method borrow(person):
        if not available:
            raise Error(title + " is already borrowed")
        available = false
        borrower  = person

    method returnBook():
        available = true
        borrower  = none

    method isAvailable():
        return available

cleanCode = new Book("Clean Code")
cleanCode.borrow("Ana")
cleanCode.borrow("Luis")   // -> Error: "Clean Code is already borrowed"
```

**What improved:**
- The book's data (`title`, `available`, `borrower`) and its rules live together.
- The invariant "no double borrowing" is enforced *inside* the object and cannot be bypassed.
- Adding a new attribute (e.g., due date) is a local change to one class, not a change to scattered variables.
- Each `Book` object is self-contained; a library becomes simply a *collection of Book objects*.

---

## 5. Guided in-class practice — the object-finding workshop

**Format:** pairs, 30 minutes. No coding required — this is a modeling exercise.

**Scenario:** A university wants a simple system to manage the loan of laptops to students from a computer lab.

> "Students can borrow a laptop for up to 4 hours. Each laptop has an asset tag, a brand, and a condition status (OK / needs repair). A student has an ID and a name. A loan records which student took which laptop, at what time, and when it is due back. A laptop that needs repair cannot be lent."

**Steps:**

1. **List the nouns.** Underline every noun in the scenario. Nouns are your *candidate objects/classes*.
2. **Select the real classes.** From the candidate list, decide which deserve to be classes (e.g., `Student`, `Laptop`, `Loan`). Discard nouns that are merely attributes.
3. **Assign attributes (state).** For each class, list what it *knows*. Example: `Laptop` knows `assetTag`, `brand`, `conditionStatus`.
4. **Assign responsibilities (behavior).** For each class, list what it *does*. Example: `Laptop` can `markForRepair()`, `isLendable()`. `Loan` can `computeDueTime()`, `isOverdue()`.
5. **Find one rule (invariant)** each object must protect. Example: "A `Laptop` that needs repair cannot be lent" — where does this rule belong?

**Deliverable (photo or text, part of Corte 1 evidence):** a small table per class:

| Class | Attributes (state) | Responsibilities (behavior) | Invariant it protects |
|-------|--------------------|-----------------------------|------------------------|
| Laptop | assetTag, brand, conditionStatus | markForRepair(), isLendable() | cannot be lent if needs repair |
| Student | id, name | … | … |
| Loan | student, laptop, startTime, dueTime | computeDueTime(), isOverdue() | dueTime is at most 4h after startTime |

**Discussion prompt:** Where did each business rule naturally "want" to live? Notice how objects pull the relevant rule toward the data it governs — that instinct *is* object-oriented thinking.

---

## 6. Wrap-up and exit ticket

### Summary
- A paradigm is a way of structuring and reasoning about programs.
- Procedural code separates data from behavior; this becomes fragile and hard to maintain at scale.
- OOP bundles state and behavior into objects; classes are blueprints, objects are instances.
- The four pillars are Encapsulation, Abstraction, Inheritance, Polymorphism (A PIE).
- OOP contributes across the whole software life cycle and especially lowers the cost of maintenance.
- Finding objects starts by looking for the *things* (nouns), their *state* (attributes), and their *behavior* (responsibilities).

### Exit ticket (answer in 3–4 sentences, submit before leaving)
1. In one sentence, what is the single most important difference between procedural and object-oriented programming?
2. Give one real-world entity from your own life, and list two attributes and two behaviors it would have as an object.
3. In which life-cycle phase do you think OOP saves the most money, and why?

### Looking ahead
Session 02 turns theory into a working machine: you will install the JDK, understand how the JVM runs your code, and compile and run your first Java program organized into a package — from both the command line and your IDE. Before class, skim the readings in [`../material/README.md`](../material/README.md).
