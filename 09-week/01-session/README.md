# Week 09 - Session 1: Modeling "has-a" with composition and delegation

**Subject:** Object-Oriented Programming and Design (2026-B)
**Unit 2:** Design principles and modularity
**Assessment period:** Corte 2

---

## 1. Session objective

At the end of this session the student will be able to **model and implement a "has-a" relationship using composition**, distinguish composition from aggregation by lifecycle ownership, and use **delegation** to forward responsibilities from a whole object to its parts without leaking their internals.

This maps to weekly objectives **1 and 4**.

---

## 2. Timed agenda (110 minutes)

| Time | Activity |
|---|---|
| 0:00 - 0:10 | Warm-up: "list five things a `Car` *has*" — surfacing has-a intuition |
| 0:10 - 0:35 | Theory: object relationships (is-a / has-a / uses-a) and UML notation |
| 0:35 - 0:55 | Theory: composition vs. aggregation (lifecycle ownership) + delegation |
| 0:55 - 1:20 | Worked example: `Car` / `Engine` and `Playlist` / `Song` in code |
| 1:20 - 1:45 | Guided in-class practice (`DigitalWallet`) |
| 1:45 - 1:50 | Wrap-up and exit ticket |

---

## 3. Theory notes

### 3.1 Three ways objects relate

Object-oriented design gives us a small vocabulary for how one type relates to another. Getting the *relationship* right is more important than getting the syntax right, because the relationship drives the whole design.

| Relationship | Question it answers | Example | Language mechanism |
|---|---|---|---|
| **Generalization** | "**is-a**?" | A `Dog` **is an** `Animal` | Inheritance (`extends`) |
| **Composition / Aggregation** | "**has-a**?" | A `Car` **has an** `Engine` | A field/attribute holding another object |
| **Dependency** | "**uses-a**?" | A `Printer` **uses** a `Document` (passed to `print()`) | A method parameter / local variable |

> **Design rule of thumb:** before writing `extends`, say the relationship out loud. If "X is-a Y" sounds wrong but "X has-a Y" sounds right, you want composition, not inheritance.

### 3.2 Composition = whole owns its parts

**Composition** models a whole-part relationship where the **whole controls the lifecycle of its parts**. The parts do not exist independently of the whole; when the whole is destroyed, the parts go with it.

```
        Car  ◆────────>  Engine
       (whole)  "has-a"   (part)

   Filled diamond (◆) sits on the WHOLE side.
   Meaning: no Car, no Engine. The Engine is created and
   owned by the Car; nobody outside holds a reference to it.
```

Typical sign of composition in code: the whole **creates** its part internally (often in its constructor) and never hands out a raw reference to it.

### 3.3 Aggregation = whole references parts it does not own

**Aggregation** is a *weaker* has-a. The whole holds a reference to parts, but the parts can exist on their own and may be shared. When the whole disappears, the parts survive.

```
     University  ◇────────>  Professor
       (whole)   "has-a"      (part)

   Hollow diamond (◇) on the WHOLE side.
   Meaning: a Professor still exists if the University closes,
   and could belong to more than one department.
```

Typical sign of aggregation in code: the part is **passed in** from outside (constructor parameter or setter) rather than created internally.

| | Composition | Aggregation |
|---|---|---|
| UML diamond | Filled ◆ | Hollow ◇ |
| Lifecycle | Part dies with whole | Part outlives whole |
| Ownership | Exclusive | Shared / borrowed |
| Code smell | Part `new`-ed inside | Part injected from outside |

> In everyday conversation many developers say "composition" for both. For this course, when precision matters, use the lifecycle test: **"If I destroy the whole, must the part be destroyed too?"** Yes → composition. No → aggregation.

### 3.4 Delegation: the engine that makes composition useful

Composition by itself only says "object A holds object B". **Delegation** is what makes it powerful: when someone asks A to do something, A **forwards** ("delegates") the request to B, and B does the actual work.

```
   caller ──start()──> Car ──start()──> Engine
                        │  (delegates)      │
                        └── returns B's answer to caller
```

Delegation keeps A's public interface clean while reusing B's behavior — **without inheriting** from B. This is the core mechanic behind "favor composition over inheritance", which we study in Session 2.

**Encapsulation matters:** a well-designed whole delegates to its part but does **not** expose the part directly. Prefer `car.start()` over `car.getEngine().start()`. The second form ("train wreck") leaks the internal structure and couples callers to it.

---

## 4. Worked example (fully solved)

### 4.1 `Car` has-an `Engine` (composition + delegation)

We model a `Car` that owns its `Engine`. The car exposes `start()` and `stop()`, delegating to the engine. The engine is created inside the car and never handed out.

```java
// Engine.java — the PART
public class Engine {
    private final int horsepower;
    private boolean running = false;

    public Engine(int horsepower) {
        this.horsepower = horsepower;
    }

    public void start() {
        running = true;
        System.out.println("Engine (" + horsepower + " hp) started.");
    }

    public void stop() {
        running = false;
        System.out.println("Engine stopped.");
    }

    public boolean isRunning() {
        return running;
    }
}
```

```java
// Car.java — the WHOLE (composition: it creates and owns the Engine)
public class Car {
    private final String model;
    private final Engine engine;   // <-- the "has-a" relationship

    public Car(String model, int horsepower) {
        this.model = model;
        this.engine = new Engine(horsepower);  // created & owned internally
    }

    // Delegation: Car forwards start()/stop() to its Engine.
    public void start() {
        System.out.println(model + " turning the key...");
        engine.start();
    }

    public void stop() {
        engine.stop();
        System.out.println(model + " parked.");
    }

    public boolean isRunning() {
        return engine.isRunning();  // delegates the query too
    }
    // Note: there is NO getEngine(). The Engine stays encapsulated.
}
```

```java
// Demo.java
public class Demo {
    public static void main(String[] args) {
        Car car = new Car("Corolla", 132);
        car.start();
        System.out.println("Running? " + car.isRunning());
        car.stop();
    }
}
```

**Expected output:**
```
Corolla turning the key...
Engine (132 hp) started.
Running? true
Engine stopped.
Corolla parked.
```

**Why this is composition, not inheritance:** a car is *not* a kind of engine, so `class Car extends Engine` would be nonsense (a car would inherit `isRunning`, `horsepower`, etc., as if it *were* an engine). A car **has** an engine — the field models exactly that. And because the engine is created inside the car and dies with it, this is *composition*, not aggregation.

### 4.2 A contrast: `Playlist` has-many `Song` (aggregation)

Now a case where the parts are **shared** and **outlive** the whole. The same `Song` can appear in many playlists, so we *inject* songs rather than create them.

```java
import java.util.ArrayList;
import java.util.List;

public class Song {
    private final String title;
    private final int seconds;
    public Song(String title, int seconds) {
        this.title = title; this.seconds = seconds;
    }
    public int getSeconds() { return seconds; }
    public String getTitle() { return title; }
}

public class Playlist {
    private final String name;
    private final List<Song> songs = new ArrayList<>();  // references, not owns

    public Playlist(String name) { this.name = name; }

    public void add(Song song) { songs.add(song); }   // song comes from OUTSIDE

    // Delegation: total duration is computed by asking each Song.
    public int totalSeconds() {
        int total = 0;
        for (Song s : songs) total += s.getSeconds();  // delegates getSeconds()
        return total;
    }
}
```

```java
Song s = new Song("Clocks", 307);
Playlist workout = new Playlist("Workout");
Playlist focus   = new Playlist("Focus");
workout.add(s);
focus.add(s);   // SAME song shared by two playlists -> aggregation
```

**Key contrast:** deleting the `workout` playlist must *not* delete the `Song "Clocks"` — it still lives in `focus`. That shared, outliving lifecycle is the signature of **aggregation**. Contrast with the engine, which has no meaningful existence outside its car.

---

## 5. Guided in-class practice

### Problem: `DigitalWallet`

Model a `DigitalWallet` that **has-a** `Balance` and **has-many** `Card`s, then delegate operations.

**Requirements:**
1. Create a `Balance` class with `amount` (in cents) and methods `deposit(int cents)`, `withdraw(int cents)` (throw / reject if insufficient), and `getCents()`.
2. Create a `Card` class with `last4` (last four digits) and `network` (e.g., "VISA").
3. Create a `DigitalWallet` that:
   - **Composes** a `Balance` (create it inside the wallet — the balance has no life outside its wallet → composition).
   - **Aggregates** `Card`s via an `addCard(Card c)` method (cards are created outside and passed in → aggregation).
   - Delegates `pay(int cents)` to the balance's `withdraw`, and `topUp(int cents)` to the balance's `deposit`.
   - Exposes `balanceCents()` by delegating to the balance — but does **not** expose the `Balance` object itself.

**Guiding questions (discuss while coding):**
- Which relationship is composition and which is aggregation here? Justify by the lifecycle test.
- Why should `DigitalWallet` *not* have a `getBalance()` that returns the `Balance` object?
- Where does delegation happen in your code? Point to the exact lines.

**Reference solution sketch:**

```java
public class Balance {
    private int cents = 0;
    public void deposit(int c) {
        if (c <= 0) throw new IllegalArgumentException("deposit must be positive");
        cents += c;
    }
    public void withdraw(int c) {
        if (c > cents) throw new IllegalStateException("insufficient funds");
        cents -= c;
    }
    public int getCents() { return cents; }
}

public class Card {
    private final String last4;
    private final String network;
    public Card(String last4, String network) {
        this.last4 = last4; this.network = network;
    }
    public String describe() { return network + " ****" + last4; }
}

import java.util.ArrayList;
import java.util.List;

public class DigitalWallet {
    private final Balance balance = new Balance();   // COMPOSITION (owned)
    private final List<Card> cards = new ArrayList<>(); // AGGREGATION (injected)

    public void addCard(Card c) { cards.add(c); }     // card comes from outside

    public void topUp(int cents) { balance.deposit(cents); }  // delegation
    public void pay(int cents)   { balance.withdraw(cents); } // delegation
    public int balanceCents()    { return balance.getCents(); } // delegation
    // No getBalance(): Balance stays encapsulated.
}
```

**Stretch goal (if time permits):** add a `CashbackRule` object composed into the wallet so that each `pay()` credits a percentage back. Notice you can swap the cashback behavior by composing a *different* rule object — a preview of the flexibility argument in Session 2.

---

## 6. Wrap-up and exit ticket

### Wrap-up
- Composition and aggregation both model **has-a**; they differ in **who owns the lifecycle**.
- **Delegation** is how a whole reuses its parts' behavior *without inheritance*.
- Keep parts **encapsulated**: delegate through clean methods, don't hand out internal objects.

### Exit ticket (hand in a single index card or short text)
Answer briefly:
1. Give one real-world "has-a" pair from your own life that is **composition** and one that is **aggregation**, and justify each with the lifecycle test.
2. In the `Car`/`Engine` example, why is there no `getEngine()` method? What would break if we added one and callers used it?
3. In one sentence: what does "delegation" mean?

> Preview of Session 2: we will use everything from today to argue *why* composition is often preferable to inheritance — and refactor a real design that got it wrong.
