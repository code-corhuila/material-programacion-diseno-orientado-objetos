# Week 09 - Session 1: Modeling "has-a" relationships with composition

**Subject:** Object-Oriented Programming and Design (2026-B)
**Unit 2 - Design principles and modularity | Corte 2**
**RAA:** 90_82759

---

## 1. Session objective

Model real-world *"has-a"* relationships using **composition** between objects, distinguishing
composition from association and aggregation, and implementing the relationship in code through
**delegation** and **constructor injection**.

At the end of the session the student produces a UML class diagram and working code for at least
one composed object.

---

## 2. Timed agenda (110 minutes)

| Time | Activity |
|------|----------|
| 0:00 – 0:10 | Warm-up: "Is a car a kind of engine, or does a car have an engine?" quick discussion. |
| 0:10 – 0:35 | Theory: association vs. aggregation vs. composition; UML notation; ownership & lifetime. |
| 0:35 – 0:55 | Theory: delegation and constructor injection; reading the worked example together. |
| 0:55 – 1:20 | Worked example walkthrough: the `Car` / `Engine` / `GPS` system. |
| 1:20 – 1:45 | Guided in-class practice: model and code a `Playlist` of `Song`s (aggregation) and an `Order` of `OrderLine`s (composition). |
| 1:45 – 1:55 | Wrap-up, common mistakes, exit ticket. |

---

## 3. Theory notes

### 3.1 Why relationships matter

An object rarely lives alone. Real systems are **networks of collaborating objects**. How we
wire those objects together determines whether our software is flexible or rigid, testable or
untestable. Object-oriented design gives us a vocabulary for these connections:

- **Dependency** – "uses temporarily"
- **Association** – "knows / is linked to"
- **Aggregation** – "has, but does not own"
- **Composition** – "owns; controls the lifetime of"

All four are *"has-a"-family* relationships (as opposed to inheritance, which is *"is-a"*). This
session focuses on **composition** and its close cousin **aggregation**, because they are the
building blocks of modular, component-oriented design.

### 3.2 The four relationships, precisely

#### Dependency (the weakest link)
One class uses another only *transiently* — as a method parameter, a return type, or a local
variable — without keeping a reference to it as a field.

```
class InvoicePrinter {
    void print(Invoice invoice) {   // depends on Invoice, but does not store it
        // ...
    }
}
```

UML: dashed arrow `- - ->`.

#### Association (a stored link between peers)
One object holds a reference to another, and both live independent lives. Neither creates nor
destroys the other.

```
class Doctor {
    private List<Patient> patients;   // the doctor knows patients
}
```

A patient exists with or without this doctor; a doctor exists with or without patients. UML:
solid line, optionally with multiplicities (`1`, `*`, `0..1`).

#### Aggregation (has-a, shared/independent parts)
A specialized association meaning "whole–part", but the **part can outlive the whole** and may
be shared by several wholes.

```
class Team {
    private List<Player> players;   // players exist before/after the team
}
```

If the `Team` object is garbage-collected, the `Player` objects are not necessarily gone — they
might belong to another team or to the league. UML: **hollow (white) diamond** on the whole's
side.

#### Composition (owns-a, exclusive parts bound in lifetime)
The strongest whole–part relationship. The **part's lifetime is controlled by the whole**: when
the whole is created it (typically) creates its parts, and when the whole is destroyed its parts
are destroyed too. Parts are **not shared**.

```
class House {
    private final List<Room> rooms = new ArrayList<>();  // rooms belong to THIS house
}
```

If you demolish the house, the rooms cease to exist. You cannot move room #3 into another house.
UML: **filled (black) diamond** on the whole's side.

### 3.3 The one question that decides aggregation vs. composition

> **"If the whole is destroyed, must the part be destroyed too?"**
>
> - **Yes, and the part is not shared** → composition (filled diamond).
> - **No, the part can live on / be shared** → aggregation (hollow diamond).

Ownership and **lifetime** — not the shape of the code — are what separate the two. Two classes
can both hold a `List<X>` field; whether it is aggregation or composition depends on the *meaning*
you assign to ownership.

### 3.4 UML cheat sheet (ASCII)

```
Dependency:    InvoicePrinter - - - - -> Invoice        (dashed arrow)

Association:   Doctor ─────────────── Patient           (solid line)
                     1              *

Aggregation:   Team ◇─────────────── Player             (hollow diamond on whole)
                    1              *

Composition:   House ◆─────────────── Room              (filled diamond on whole)
                     1              1..*
```

### 3.5 Composition in code: delegation

Composition on its own just means "holding a reference". It becomes powerful through
**delegation**: the whole object receives a request and *forwards* (delegates) part of the work
to a contained object.

```
class Car {
    private final Engine engine;          // composition: the car owns its engine

    void start() {
        engine.ignite();                  // delegation: forward the work to the engine
    }
}
```

The `Car` does not know *how* an engine ignites; it only knows *whom to ask*. This is the heart
of component-oriented design: **assemble behavior from parts and delegate to them**.

### 3.6 Where do the parts come from? Injection vs. internal creation

There are two ways for a whole to obtain its parts:

**(a) Internal instantiation** — the whole creates its own parts (typical for true composition
where the part cannot be shared):

```
class House {
    private final List<Room> rooms = new ArrayList<>();
    House(int roomCount) {
        for (int i = 0; i < roomCount; i++) rooms.add(new Room());  // house makes its rooms
    }
}
```

**(b) Constructor injection (dependency injection)** — the collaborator is passed in from the
outside:

```
class Car {
    private final Engine engine;
    Car(Engine engine) {            // the engine is injected
        this.engine = engine;
    }
}
```

Injection is the design lever that makes composition *flexible* and *testable*: because the
`Car` receives an `Engine`, we can hand it a real engine in production and a **fake/mock engine**
in a unit test. We will exploit this heavily in Session 2 and in the optional activity.

> **Rule of thumb:** use internal instantiation when the part is an exclusive, hidden
> implementation detail; use injection when you want to swap the part (for testing,
> configuration, or extension).

---

## 4. Fully worked example: a modular `Car`

### 4.1 Problem statement

Model a `Car` that has an `Engine` (composition — the engine belongs to this car) and can hold a
`GpsNavigator` (an *optional*, replaceable component, injected from outside). The car should be
able to `start()`, `stop()`, and `navigateTo(destination)` by **delegating** to its components.

### 4.2 UML class diagram (ASCII)

```
                 ┌───────────────────────────┐
                 │            Car            │
                 ├───────────────────────────┤
                 │ - engine : Engine         │
                 │ - navigator : GpsNavigator│
                 ├───────────────────────────┤
                 │ + start() : void          │
                 │ + stop() : void           │
                 │ + navigateTo(String):void │
                 └───────────────────────────┘
                    ◆                    ◇
                    │ 1                  │ 0..1
                    │                    │
        ┌───────────▼──────┐   ┌─────────▼──────────┐
        │      Engine      │   │    GpsNavigator    │
        ├──────────────────┤   ├────────────────────┤
        │ - running:boolean│   │ + route(String):.. │
        ├──────────────────┤   └────────────────────┘
        │ + ignite():void  │
        │ + shutOff():void │
        └──────────────────┘

  ◆ filled diamond = composition (Car OWNS its Engine)
  ◇ hollow diamond = aggregation  (Car USES a GpsNavigator that can be shared/replaced)
```

### 4.3 Implementation (Java)

```java
// ---------- Engine: an exclusive part, created by the Car ----------
public class Engine {
    private boolean running = false;

    public void ignite() {
        running = true;
        System.out.println("Engine: vroom, running.");
    }

    public void shutOff() {
        running = false;
        System.out.println("Engine: off.");
    }

    public boolean isRunning() {
        return running;
    }
}

// ---------- GpsNavigator: an optional, replaceable collaborator ----------
public class GpsNavigator {
    public String route(String destination) {
        return "Calculating route to " + destination + "...";
    }
}

// ---------- Car: composes an Engine and (optionally) a GpsNavigator ----------
public class Car {
    private final Engine engine;            // COMPOSITION: created & owned by the Car
    private final GpsNavigator navigator;   // AGGREGATION: injected, may be null/shared

    // Constructor injection for the optional navigator; internal creation for the engine.
    public Car(GpsNavigator navigator) {
        this.engine = new Engine();         // the car makes its own engine
        this.navigator = navigator;         // the navigator comes from outside
    }

    public void start() {
        engine.ignite();                    // DELEGATION
    }

    public void stop() {
        engine.shutOff();                   // DELEGATION
    }

    public void navigateTo(String destination) {
        if (navigator == null) {
            System.out.println("No GPS installed.");
            return;
        }
        System.out.println(navigator.route(destination));  // DELEGATION
    }
}

// ---------- Client code ----------
public class Demo {
    public static void main(String[] args) {
        Car car = new Car(new GpsNavigator());   // inject a navigator
        car.start();                              // Engine: vroom, running.
        car.navigateTo("CORHUILA campus");        // Calculating route to CORHUILA campus...
        car.stop();                               // Engine: off.
    }
}
```

### 4.4 What to notice

1. **The `Car` never exposes its `Engine`.** Clients call `car.start()`, not
   `car.getEngine().ignite()`. Delegation keeps the internals hidden (encapsulation).
2. **The engine is composition, the navigator is aggregation.** The engine is born and dies with
   the car; the navigator is handed in and could be shared or swapped.
3. **Injection enables substitution.** Because the navigator is injected, we could pass a
   `FakeNavigator` in a test, or a `PremiumNavigator` subclass in production, *without changing
   the `Car` class*.
4. **This is already component-oriented design.** The `Car` is an *assembly* of small,
   single-responsibility parts, not a monolith.

---

## 5. Guided in-class practice

Work in pairs. You will model and implement two systems: one aggregation, one composition.

### Part A — Aggregation: `Playlist` of `Song`s
A `Playlist` contains `Song`s, but songs exist independently and can appear in many playlists.

**Tasks:**
1. Draw the UML with the correct diamond (hollow → aggregation).
2. Implement `Song` (fields: `title`, `artist`) and `Playlist` (a `List<Song>`, plus
   `add(Song)`, `totalCount()`, and `play()` that delegates by printing each song).
3. Create two playlists that **share** the same `Song` object to prove the part outlives/serves
   multiple wholes.

**Skeleton:**
```java
public class Song {
    private final String title;
    private final String artist;
    // constructor + getters
    public String describe() { return title + " — " + artist; }
}

public class Playlist {
    private final String name;
    private final List<Song> songs = new ArrayList<>();
    public Playlist(String name) { this.name = name; }
    public void add(Song song) { songs.add(song); }        // aggregation: song comes from outside
    public int totalCount() { return songs.size(); }
    public void play() {
        for (Song s : songs) System.out.println("Now playing: " + s.describe());
    }
}
```

### Part B — Composition: `Order` with `OrderLine`s
An `Order` is composed of `OrderLine`s. A line has no meaning outside its order and must not be
shared; if the order is deleted, its lines disappear.

**Tasks:**
1. Draw the UML with the correct diamond (filled → composition).
2. Implement `OrderLine` (fields: `product`, `quantity`, `unitPrice`; method `subtotal()`).
3. Implement `Order` so that it **creates its own lines internally** via
   `addLine(String product, int qty, double price)` (do *not* accept a pre-built `OrderLine`
   from outside — that is what makes it composition here).
4. Add `total()` that **delegates** to each line's `subtotal()` and sums them.

**Skeleton:**
```java
public class OrderLine {
    private final String product;
    private final int quantity;
    private final double unitPrice;
    OrderLine(String product, int quantity, double unitPrice) { /* ... */ }
    public double subtotal() { return quantity * unitPrice; }
}

public class Order {
    private final List<OrderLine> lines = new ArrayList<>();
    public void addLine(String product, int qty, double price) {
        lines.add(new OrderLine(product, qty, price));   // COMPOSITION: order builds its own lines
    }
    public double total() {
        double sum = 0;
        for (OrderLine line : lines) sum += line.subtotal();   // DELEGATION
        return sum;
    }
}
```

**Discussion questions (answer in your notes):**
- Why is `Playlist`/`Song` aggregation but `Order`/`OrderLine` composition?
- What would change if two orders needed to share the same line? (Hint: it would no longer be
  composition.)
- Where did you use delegation?

---

## 6. Common mistakes to avoid

- **Confusing the code shape with the relationship.** A `List<X>` field can be either aggregation
  or composition — the *meaning of ownership* decides, not the syntax.
- **Exposing internal parts.** Returning the internal `Engine`/`OrderLine` breaks encapsulation.
  Prefer delegating methods.
- **Calling it composition when parts are shared or injected from outside and survive the whole.**
  That is aggregation.
- **Forgetting `final` on owned parts** when the reference should never change after construction.

---

## 7. Wrap-up and exit ticket

### Key takeaways
- Composition and aggregation are both "has-a"; the difference is **ownership and lifetime**.
- **Delegation** is how a composed object gets work done — it forwards requests to its parts.
- **Constructor injection** makes components swappable and testable.
- Assembling small parts (component-oriented design) is the modular alternative to inheritance,
  which we will contrast in Session 2.

### Exit ticket (hand in before leaving — 5 minutes)
Answer briefly:

1. In one sentence, distinguish **aggregation** from **composition** using the word "lifetime".
2. Give one real-world example of each (not from this document).
3. In the `Car` example, which relationship is the `Engine` and which is the `GpsNavigator`, and
   why?
4. Write one line of code that shows **delegation**.

> Bring your `Order`/`Playlist` code to Session 2 — we will refactor a related design.
