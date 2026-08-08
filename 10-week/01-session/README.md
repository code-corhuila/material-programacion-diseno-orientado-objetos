# Week 10 — Session 1: Exam Readiness Recap + Partial Exam (Corte 2)

**Course:** Object-Oriented Programming and Design — CORHUILA, 2026-B
**Unit:** Unit 2 — Design principles and modularity
**Session:** 1 of 2 · Duration: 120 minutes · Modality: In-class, closed assessment
**RAA:** `90_82759`

---

## 1. Session objective

Students will consolidate the core design toolkit of Unit 2 in a focused recap, then **design and implement a small, coherent object-oriented model under exam conditions**, and justify their inheritance-versus-composition decisions in writing. The session is summative: it produces the graded partial exam for Corte 2.

Concretely, by the end of the session each student will have submitted an exam with three parts — a class design (Part A), a working implementation (Part B), and a written justification (Part C) — assessed against the rubric in §7.

---

## 2. Timed agenda (120 minutes)

| Time | Segment | Activity |
|---|---|---|
| 0:00 – 0:10 | Settling & instructions | Attendance, exam rules, materials check, integrity reminder |
| 0:10 – 0:25 | Readiness recap | Rapid review of the five pillars and the is-a/has-a procedure (theory below) |
| 0:25 – 0:30 | Worked example walk-through | Instructor models the exam workflow on a sample prompt |
| 0:30 – 0:35 | Q&A on format | Clarify only *format*, not content |
| 0:35 – 1:50 | **Partial exam** | Individual, closed work — Parts A, B, C (75 min) |
| 1:50 – 2:00 | Submission & exit ticket | Upload/hand in, complete exit ticket |

> The recap (0:10–0:30) is intentionally brief. Its job is to *activate* prior knowledge, not to teach it for the first time. The theory notes below are the reference you should have internalized during Weeks 6–9.

---

## 3. Theory notes — the exam toolkit

### 3.1 The five pillars in one screen

**Inheritance (is-a).** A subclass extends a superclass and *is a* kind of it. Use it only when the subclass can honestly stand in for the superclass everywhere (see LSP). Inheritance gives you subtype polymorphism for free, but it is the tightest coupling in object-oriented design: the subclass depends on the superclass's implementation, not just its interface.

**Polymorphism.** One reference, many runtime forms. A variable typed as the supertype can hold any subtype, and a method call dispatches to the actual object's override at runtime.

```
Shape s = new Circle(3);   // static type Shape, dynamic type Circle
s.area();                  // dispatches to Circle.area() at runtime
```

**Abstraction.** Model the *essential*, hide the *incidental*. An abstract class captures shared state and partial behavior while leaving some methods unimplemented; an interface captures a pure capability contract.

**Interfaces.** A contract of *what*, silent on *how*. A class can implement many interfaces, which is how you compose orthogonal capabilities (`Comparable`, `Drawable`, `Serializable`) without forcing them into a single inheritance line.

**Composition (has-a).** A class holds other objects and delegates to them. It is looser than inheritance, changeable at runtime, and free of the fragile-base-class problem. The industry heuristic: **favor composition over inheritance** unless a genuine is-a relationship exists.

### 3.2 The decision procedure: inheritance vs. composition

Apply these tests, in order, to every candidate relationship:

```
1. The "is-a" test:
   Can you truthfully say "every B is an A"?
   NO  -> use composition (B has-a A).
   YES -> continue.

2. The Liskov (substitutability) test:
   Can a B be used anywhere an A is expected,
   without surprising the caller or breaking A's contract?
   NO  -> do NOT inherit; use composition or restructure.
   YES -> continue.

3. The "stable base" test:
   Is A's interface stable, and do you truly want B coupled
   to A's implementation details?
   NO  -> prefer composition (delegate to an A).
   YES -> inheritance is justified.
```

The classic trap is `Stack extends ArrayList`. A stack passes the naive is-a impulse ("a stack is a list of things") but fails Liskov: `ArrayList` lets callers insert at arbitrary positions, which violates the stack's LIFO contract. The correct design is `Stack has-a List` (composition).

### 3.3 From specification to model in five moves

Under exam pressure, extract a model methodically:

```
1. Underline the NOUNS  -> candidate classes / fields.
2. Underline the VERBS  -> candidate methods / responsibilities.
3. Group nouns that share behavior -> candidate abstract base or interface.
4. For each pair of classes, ask is-a or has-a -> draw the edges.
5. Name the one responsibility of each class in a single sentence.
   If you cannot, the class is doing too much (split it).
```

### 3.4 A minimal UML reading key (text form)

```
   ┌───────────────┐
   │  «abstract»   │        ◁────── solid line, hollow triangle = inheritance (is-a)
   │    Shape      │        ······▷ dashed line, hollow triangle = implements interface
   ├───────────────┤        ◆────── filled diamond = composition (owns, has-a)
   │ + area(): dbl │        ◇────── hollow diamond = aggregation (references, has-a)
   └───────▲───────┘
           │  (Circle is-a Shape)
   ┌───────┴───────┐
   │    Circle     │
   └───────────────┘
```

---

## 4. Fully worked example (instructor walk-through)

This is the example the instructor demonstrates at 0:25. It mirrors the exam's shape so students know exactly what "good" looks like — but the graded prompt is different.

### 4.1 Sample prompt

> Model a small **notification system**. The system sends notifications through different channels: email and SMS. Every notification has a message and a timestamp, and can be *sent*. Some notifications are *urgent* and must also be able to *escalate* (re-send through a backup channel). An email notification additionally has a subject line. The system should be able to send a mixed list of notifications uniformly.

### 4.2 Part A — the design

Applying §3.3:

- **Nouns:** notification, channel, email, SMS, message, timestamp, subject → `Notification`, `EmailNotification`, `SmsNotification`, and a `Channel`.
- **Verbs:** send, escalate → `send()`, `escalate()`.
- **Shared behavior:** all notifications *can be sent* → an abstract base `Notification` with abstract `send()`.
- **Orthogonal capability:** *urgent* is not a kind of notification, it is a capability some notifications have → an **interface** `Escalatable`.
- **Channel:** a notification *uses* a channel; a channel is not a notification → **composition** (`Notification has-a Channel`).

```
        «interface»                     «abstract»
        Escalatable                     Notification ◆──────▷ Channel  (has-a)
        ├ escalate(): void              ├ - message: String
                                        ├ - timestamp: Instant
                                        ├ + send(): void   «abstract»
                                        └ + getMessage(): String
                 ▲                              ▲
                 │ implements                   │ is-a
                 │                     ┌─────────┴──────────┐
                 │                     │                    │
         EmailNotification ───────────┘             SmsNotification
         ├ - subject: String
         └ + send(): void  (override)
         (implements Escalatable)
```

Design decisions to note:
- `Escalatable` is an **interface**, not a subclass, because "urgent" cuts across channels — an urgent SMS and an urgent email are both escalatable, and forcing that into the inheritance line would duplicate it.
- `Channel` is **composed**, not inherited, because a notification *is not* a channel; it *uses* one. This also lets us swap channels at runtime.

### 4.3 Part B — the implementation (Java)

```java
import java.time.Instant;
import java.util.List;

// --- Composition target: the channel a notification uses ---
interface Channel {
    void transmit(String payload);
}

class EmailChannel implements Channel {
    public void transmit(String payload) {
        System.out.println("[EMAIL] " + payload);
    }
}

class SmsChannel implements Channel {
    public void transmit(String payload) {
        System.out.println("[SMS] " + payload);
    }
}

// --- Orthogonal capability as an interface ---
interface Escalatable {
    void escalate();
}

// --- Abstraction: shared state + partial behavior ---
abstract class Notification {
    private final String message;
    private final Instant timestamp;
    protected final Channel channel;          // composition: has-a Channel

    protected Notification(String message, Channel channel) {
        this.message = message;
        this.timestamp = Instant.now();
        this.channel = channel;
    }

    public String getMessage() { return message; }
    public Instant getTimestamp() { return timestamp; }

    public abstract void send();              // each subtype decides how
}

// --- Concrete subtype 1: adds a subject, is escalatable ---
class EmailNotification extends Notification implements Escalatable {
    private final String subject;
    private final Channel backupChannel;

    public EmailNotification(String subject, String message,
                             Channel primary, Channel backup) {
        super(message, primary);
        this.subject = subject;
        this.backupChannel = backup;
    }

    @Override
    public void send() {                       // polymorphic override
        channel.transmit(subject + " — " + getMessage());
    }

    @Override
    public void escalate() {                    // interface contract
        backupChannel.transmit("[ESCALATED] " + subject + " — " + getMessage());
    }
}

// --- Concrete subtype 2 ---
class SmsNotification extends Notification {
    public SmsNotification(String message, Channel channel) {
        super(message, channel);
    }

    @Override
    public void send() {                       // polymorphic override
        channel.transmit(getMessage());
    }
}

// --- Uniform handling via polymorphism ---
public class Demo {
    public static void main(String[] args) {
        List<Notification> outbox = List.of(
            new EmailNotification("Invoice", "Your invoice is ready",
                                  new EmailChannel(), new SmsChannel()),
            new SmsNotification("Your code is 4821", new SmsChannel())
        );

        for (Notification n : outbox) {
            n.send();                           // dynamic dispatch
            if (n instanceof Escalatable e) {   // capability check
                e.escalate();
            }
        }
    }
}
```

Expected output:

```
[EMAIL] Invoice — Your invoice is ready
[SMS] [ESCALATED] Invoice — Your invoice is ready
[SMS] Your code is 4821
```

### 4.4 Part C — the written justification (model answer)

> **Inheritance for `EmailNotification`/`SmsNotification` extends `Notification`:** every email *is a* notification and every SMS *is a* notification; both honor the `send()` contract without surprising callers, so the Liskov test passes. Inheritance here buys us uniform iteration over `List<Notification>`.
>
> **Composition for `Channel`:** a notification *is not* a channel — it *uses* one, so this is a has-a relationship. Composition also lets me inject a different channel (or a backup) at runtime, which inheritance could not do cleanly.
>
> **Interface for `Escalatable`:** escalation is an optional capability that cuts across notification types, so modeling it as a subclass would either force non-urgent notifications to inherit an empty `escalate()` (refused bequest) or duplicate the hierarchy. An interface keeps the capability orthogonal.

This is the standard of reasoning the exam's Part C rewards: each decision names the *test* it passed and the *benefit* it bought.

---

## 5. Guided in-class practice (pre-exam warm-up, 0:25–0:30)

Do this quickly, together, out loud. It is **not** graded — it primes the exam.

> **Micro-prompt:** "Model a media library that holds `Song`s and `Podcast`s. Both can be *played* and have a duration. Only podcasts have episodes. The library plays a mixed playlist uniformly."

On the board, in 5 minutes, produce only Part A:
1. Nouns/verbs → classes and methods.
2. Is there a shared abstraction? (Yes: an abstract `Playable` base or interface with `play()` and `duration()`.)
3. Is `Episode` an is-a or has-a of `Podcast`? (Has-a — a podcast *contains* episodes → composition.)
4. Would you make `Playable` an interface or an abstract class, and why? (Interface if there is no shared state to inherit; abstract class if duration storage is shared.)

The instructor confirms one correct sketch, then the exam begins.

---

## 6. The partial exam (0:35–1:50)

**Conditions:** individual, closed notes unless otherwise announced, 75 minutes. One graded prompt (distributed at exam time) with three parts:

- **Part A — Design (35%).** Produce a class model (UML-style sketch or precise text) for the given specification: classes, key fields/methods, and the relationship edges (inheritance, interface, composition). Label each edge.
- **Part B — Implementation (35%).** Implement the model in the course language. Must include **at least one abstract class or interface, one polymorphic override, and one composition relationship**, and must compile/run against the provided expectation.
- **Part C — Justification (20%).** In prose, justify two relationship choices (at least one inheritance and one composition), each citing the is-a/has-a and Liskov reasoning.

**Time-budgeting guidance (announce at 0:30):**

```
Part A design      ~25 min   (get the shape right first)
Part B implement   ~35 min   (code the shape you designed)
Part C justify     ~10 min   (write while the design is fresh)
Review buffer      ~ 5 min
```

**Integrity:** all work is individual. Cite nothing you cannot explain. The rubric rewards a *coherent, well-argued* small model over a large, tangled one.

---

## 7. Exam rubric (Part A + B + C)

| Criterion | Excellent (full) | Acceptable (partial) | Insufficient (none) |
|---|---|---|---|
| **A. Coherent hierarchy** | 4+ types, correct edges labeled, no cycles, SRP respected | Mostly correct, one mislabeled edge or one overloaded class | Wrong or missing relationships; God class |
| **A. is-a/has-a correctness** | Every edge passes the correct test | One questionable edge | Inheritance used where composition was required |
| **B. Uses required constructs** | Abstract/interface + override + composition all present and correct | One construct missing or misused | Two or more missing |
| **B. Compiles & behaves** | Runs and matches expected behavior | Minor runtime/logic error | Does not compile |
| **B. Polymorphism** | Dynamic dispatch used meaningfully | Present but forced | Absent |
| **C. Justification quality** | Names the test + the benefit for each decision | States a choice without full reasoning | Missing or incorrect |

---

## 8. Wrap-up and exit ticket (1:50–2:00)

Submit the exam, then answer on the exit ticket (one index card or the LMS form):

1. Which part (A, B, or C) consumed the most time, and why?
2. Name **one** design decision you are confident about and **one** you are unsure about.
3. In one sentence: when would you *never* use inheritance?

> The exit ticket is not graded for correctness. It seeds Session 2: the instructor uses your "unsure" answers to target the feedback session at the class's real difficulties.

---

*Next: [Session 2 — Feedback and guided remediation](../02-session/README.md).*
