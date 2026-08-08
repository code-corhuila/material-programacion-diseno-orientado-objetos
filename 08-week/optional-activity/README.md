# Week 08 - Optional Activity: Design a Combined Type Hierarchy

**Course:** Object-Oriented Programming and Design (2026-B)
**Unit 2:** Design principles and modularity
**Topic:** Abstract classes and interfaces
**Assessment period:** Corte 2
**Submission channel:** **GitHub** (a public or instructor-invited repository) - **not
Moodle**
**Status:** Optional (formative practice; strengthens your corte 2 performance)

---

## 1. Purpose

This optional activity lets you prove, on a problem of realistic size, that you can
**choose and combine** abstraction mechanisms deliberately: an **interface** for a
contract, an **abstract class** for a shared skeleton, and **concrete classes** for the
specifics - then drive them with **polymorphic** client code. It directly exercises the
week's objectives and the corte 2 competencies.

---

## 2. Problem statement

You will model a small **payment-processing** subsystem for an online store.

> The store must accept several **payment methods** (credit card, PayPal-style wallet,
> bank transfer, ...). Every payment method can **authorize** an amount and **capture**
> it, and every one must produce a human-readable **receipt line**. All methods share
> common bookkeeping: a running `transactionCount` and a shared way to format the receipt.
> The store's checkout code must total and process a mixed list of payments **without
> knowing the concrete type** of any of them.
>
> Additionally, some - but not all - payment methods are **`Refundable`**: they can
> return money to the customer. Refundability is a **capability** that cuts across the
> family, so it must be modeled separately from the payment-method hierarchy itself.

Your job is to design and implement this subsystem using an interface, an abstract class,
and concrete classes, and to write a client that operates purely against the abstractions.

---

## 3. Requirements

Your solution **must** include all of the following.

### 3.1 An interface (the contract)
- Name it `PaymentMethod`.
- It must declare at least: `boolean authorize(double amount)` and
  `void capture(double amount)`.
- It must include **at least one `default` method**, e.g. `String receiptLine(double amount)`
  that produces a formatted string using the other methods or a description.

### 3.2 A separate capability interface
- Name it `Refundable`, declaring `void refund(double amount)`.
- It must be implemented by **some but not all** of your concrete classes, demonstrating
  that a capability is independent of the main family.

### 3.3 An abstract class (the skeleton)
- Name it `AbstractPaymentMethod` and have it `implements PaymentMethod`.
- It must hold **shared instance state** (at minimum an `int transactionCount`) - this is
  the member that *justifies* an abstract class instead of putting everything in the
  interface.
- It must provide **shared concrete behavior** (e.g. increment `transactionCount` on each
  capture, and a protected helper used by subclasses).
- It must declare **at least one abstract method** that each concrete class implements
  (e.g. `protected abstract String providerName()`).

### 3.4 At least three concrete classes
- For example `CreditCardPayment`, `WalletPayment`, `BankTransferPayment`.
- Each `extends AbstractPaymentMethod` and implements the abstract method(s).
- At least one (but not all) must also `implements Refundable`.

### 3.5 A polymorphic client
- A `Checkout` (or `Main`) class that builds a `List<PaymentMethod>` of mixed concrete
  types and processes them in a loop, **referencing only the `PaymentMethod` abstraction**.
- It must demonstrate **safe capability use**: detect `Refundable` items (e.g. via
  `instanceof`) and refund only those.
- No use of concrete types in the processing loop's variable declarations.

### 3.6 A UML sketch
- Include a text/ASCII or image UML class diagram in your README showing the interface,
  the abstract class, the concrete classes, and the `Refundable` capability, with the
  correct relationships (realization vs. generalization).

### 3.7 A short design rationale
- In your README, write **150-300 words** answering: *Why did you use an interface for
  `PaymentMethod`? Why an abstract class for the skeleton? Which exact member forced the
  abstract class rather than the interface? Why is `Refundable` a separate interface
  instead of a method on `PaymentMethod`?*

---

## 4. Expected deliverable

A **GitHub repository** containing:

```
oop-week08-payments/
├── README.md              # UML sketch + design rationale + how to run + sample output
├── src/
│   ├── PaymentMethod.java
│   ├── Refundable.java
│   ├── AbstractPaymentMethod.java
│   ├── CreditCardPayment.java
│   ├── WalletPayment.java
│   ├── BankTransferPayment.java
│   └── Checkout.java       # or Main.java (the polymorphic client)
└── (optional) screenshot of the program output
```

Requirements for the deliverable:
- The code **must compile and run**. Include the exact commands to build and run it in the
  README (e.g. `javac src/*.java -d out` then `java -cp out Checkout`).
- Paste the **actual program output** into the README under a "Sample run" heading.
- Commit history should show your own incremental work (small, meaningful commits are
  preferred over one giant commit).

---

## 5. How to submit via GitHub

1. **Create a repository** named `oop-week08-payments` on your GitHub account.
   (Make it public, or private with the instructor invited as a collaborator - confirm the
   instructor's GitHub username in class.)
2. **Add your code and README** following the structure above.
3. **Commit and push** your work:
   ```bash
   git init
   git add .
   git commit -m "Week 08: payment hierarchy with interface + abstract class + concrete classes"
   git branch -M main
   git remote add origin https://github.com/<your-username>/oop-week08-payments.git
   git push -u origin main
   ```
4. **Submit the repository URL** through the channel announced in class (course forum or
   direct message to the instructor). Do **not** submit through Moodle for this activity.
5. **Deadline:** as announced for corte 2. Late pushes are visible in the commit history,
   so push on time.

> **Academic-integrity reminder.** The work must be your own. You may discuss ideas with
> classmates, but the code and the design rationale must be written by you. Cite any
> external snippet you adapt.

---

## 6. Assessment criteria / rubric (100 points)

| # | Criterion | What we look for | Points |
|---|---|---|---|
| 1 | **Interface design (contract)** | `PaymentMethod` is a clean contract with the required methods and a working `default` method. | 15 |
| 2 | **Capability interface** | `Refundable` exists, is separate, and is implemented by some (not all) classes. | 10 |
| 3 | **Abstract class (skeleton)** | `AbstractPaymentMethod` holds shared **state**, provides shared behavior, and declares an abstract method; the choice of abstract class is justified. | 20 |
| 4 | **Concrete classes** | At least three correct concrete classes; abstract method(s) implemented; correct use of `extends`/`implements`. | 15 |
| 5 | **Polymorphic client** | `Checkout` references only the abstraction; safe capability handling for `Refundable`; no concrete types in the loop. | 15 |
| 6 | **Correctness (compiles & runs)** | Program builds and runs; sample output included and matches the code. | 10 |
| 7 | **UML diagram** | Diagram present with correct realization vs. generalization relationships. | 5 |
| 8 | **Design rationale** | 150-300 words; correctly explains *why* each mechanism was chosen and which member forced the abstract class. | 5 |
| 9 | **Repository quality** | Clear README, run instructions, meaningful commit history. | 5 |
| | **Total** | | **100** |

### Grade bands
- **90-100 (Excellent):** all mechanisms used correctly and idiomatically; rationale
  shows genuine design judgment; client is fully decoupled.
- **75-89 (Good):** all required pieces present; minor coupling or rationale gaps.
- **60-74 (Acceptable):** compiles and covers the basics but misuses one mechanism (e.g.
  puts avoidable logic in the interface, or references concrete types in the client).
- **Below 60:** missing a required building block, does not compile, or no rationale.

---

## 7. Hints and self-check before you submit

- [ ] Does my `Checkout` loop declare its variable as `PaymentMethod`, never as a concrete
      type?
- [ ] Is there a member that *could not* live in the interface (instance state)? That is
      what makes the abstract class necessary - name it in the rationale.
- [ ] Is `Refundable` implemented by only some classes, and handled with `instanceof` (or
      pattern matching) in the client?
- [ ] Does the program compile and run with the commands in my README?
- [ ] Did I paste the real output, not an imagined one?
- [ ] Is my UML diagram using the right arrows (dashed/realization for interfaces, solid/
      generalization for the abstract superclass)?

---

## 8. Related course files

- [Week guide](../README.md)
- [Session 1 - Abstract classes](../01-session/README.md)
- [Session 2 - Interfaces and combining abstractions](../02-session/README.md)
- [Materials and downloads](../material/README.md)
