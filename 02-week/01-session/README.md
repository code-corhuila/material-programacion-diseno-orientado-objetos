# Week 02 · Session 1 — From blueprint to instance

> **Subject:** Object-Oriented Programming and Design (2026-B) · **Unit 1** · **Corte 1**
> **Topic:** Classes and objects in Java — definition, instantiation, and object state
> **RAA:** `90_82759`
> **Session duration:** 2 hours (120 minutes)

---

## 1. Session objective

By the end of this session the student will be able to **distinguish a class from an object** and **define a Java class** with attributes and methods that models a simple real-world entity, then **instantiate two independent objects** from it and confirm their states are separate.

Concretely, you will finish the session with a compiled `BankAccount` class and a driver program that creates two accounts and shows that depositing into one does not affect the other.

---

## 2. Timed agenda (120 min)

| Time | Segment | Activity |
|------|---------|----------|
| 0:00–0:10 | **Warm-up** | Quick recap of Week 01 + the "cookie cutter vs. cookie" question. |
| 0:10–0:35 | **Theory I** | Class vs. object; the blueprint metaphor; state and behavior. |
| 0:35–1:00 | **Theory II** | Anatomy of a Java class: fields, methods, `main`. Live coding of `BankAccount`. |
| 1:00–1:10 | **Break** | — |
| 1:10–1:20 | **Worked example** | Instructor traces two independent objects on the board. |
| 1:20–1:50 | **Guided practice** | Students build and run the `Car` class in pairs. |
| 1:50–2:00 | **Wrap-up** | Exit ticket + preview of Session 2. |

---

## 3. Theory notes

### 3.1 The core distinction: class vs. object

A **class** is a *blueprint*. It describes what every object of a certain kind will **have** (its attributes) and what it will be able to **do** (its methods). The class itself is not a thing you can deposit money into or drive down the street — it is a *definition*.

An **object** is a concrete **instance** created from that blueprint. It occupies memory while the program runs and holds *its own* values for the attributes described by the class.

> **Metaphor — the cookie cutter.** The cutter (class) defines the *shape* of every cookie. Each cookie (object) is a separate, edible thing. You can eat one cookie without touching the others, and you can decorate each differently. You cannot eat the cutter.

Other everyday examples of the same relationship:

| Class (blueprint) | Objects (instances) |
|-------------------|---------------------|
| `Car` | your red 2019 sedan; the taxi outside; a rental you booked |
| `Student` | Ana (ID 1001); Bruno (ID 1002); Carla (ID 1003) |
| `BankAccount` | account #5501 with $200; account #5502 with $0 |

The key insight: **one class, many objects, each with independent state.**

### 3.2 State and behavior

Every object combines two things:

- **State** — the current values of its attributes. A `BankAccount` object has a *balance*; a `Car` object has a *speed* and a *color*.
- **Behavior** — the operations it can perform, defined by its methods. A `BankAccount` can *deposit* and *withdraw*; a `Car` can *accelerate* and *brake*.

State answers *"what does this object know right now?"* Behavior answers *"what can this object do?"*

### 3.3 Anatomy of a Java class

```java
// File: BankAccount.java
public class BankAccount {          // class header: the blueprint's name

    // ----- Attributes (fields / instance variables): the STATE -----
    String owner;                   // who owns the account
    double balance;                 // how much money it holds
    String accountNumber;           // a unique identifier

    // ----- Methods: the BEHAVIOR -----
    void deposit(double amount) {    // change state: add money
        balance = balance + amount;
    }

    void withdraw(double amount) {   // change state: remove money
        if (amount <= balance) {
            balance = balance - amount;
        } else {
            System.out.println("Insufficient funds.");
        }
    }

    double getBalance() {            // read state: report the balance
        return balance;
    }
}
```

Reading this piece by piece:

```
public class BankAccount {
   |      |        |
   |      |        +--- class name (PascalCase, matches the file name)
   |      +------------ the 'class' keyword: "we are defining a blueprint"
   +------------------- access modifier (visible everywhere, for now)

   FIELDS  -> the data every BankAccount object will carry (its state)
   METHODS -> the actions every BankAccount object will be able to perform
}
```

**Naming conventions (follow these from day one):**
- Class names: **PascalCase** → `BankAccount`, `Car`, `Student`.
- Fields and methods: **camelCase** → `balance`, `accountNumber`, `getBalance`.
- The public class must live in a file with the **same name** → `BankAccount.java`.

### 3.4 Where does the program start? The `main` method

A class like `BankAccount` is only a definition. To *run* something, Java needs an entry point — the `main` method. It is conventional to place `main` in a separate driver/launcher class:

```java
// File: Bank.java
public class Bank {
    public static void main(String[] args) {
        // We will create BankAccount OBJECTS here.
    }
}
```

### 3.5 Creating objects and separate state (preview)

We instantiate objects with the `new` operator (covered in depth in Session 2). For now, notice how *two objects made from one class hold independent state*:

```java
public class Bank {
    public static void main(String[] args) {
        BankAccount a1 = new BankAccount();   // object #1
        BankAccount a2 = new BankAccount();   // object #2

        a1.owner = "Ana";
        a1.deposit(200.0);

        a2.owner = "Bruno";
        a2.deposit(50.0);

        System.out.println(a1.owner + ": " + a1.getBalance());  // Ana: 200.0
        System.out.println(a2.owner + ": " + a2.getBalance());  // Bruno: 50.0
    }
}
```

Depositing into `a1` did **not** change `a2`. Two cookies, one cutter.

**Memory picture (conceptual):**

```
   Stack (variables)            Heap (objects)
  +-------------+              +---------------------+
  |  a1  ●------+------------> | BankAccount         |
  +-------------+              |  owner   = "Ana"    |
  |  a2  ●------+---------+    |  balance = 200.0    |
  +-------------+         |    +---------------------+
                         |
                         +--> | BankAccount         |
                              |  owner   = "Bruno"  |
                              |  balance = 50.0     |
                              +---------------------+
```

---

## 4. Fully worked example: the `Car` class

**Goal:** model a car that has a color, a make, and a current speed, and that can accelerate and brake.

### Step 1 — Identify state and behavior
- **State:** `make` (text), `color` (text), `speed` (number, starts at 0).
- **Behavior:** `accelerate(delta)`, `brake(delta)`, `describe()`.

### Step 2 — Write the class

```java
// File: Car.java
public class Car {
    // State
    String make;
    String color;
    int speed;   // km/h; defaults to 0

    // Behavior
    void accelerate(int delta) {
        speed = speed + delta;
    }

    void brake(int delta) {
        speed = speed - delta;
        if (speed < 0) {
            speed = 0;   // a car cannot have negative speed
        }
    }

    void describe() {
        System.out.println(color + " " + make + " going " + speed + " km/h");
    }
}
```

### Step 3 — Write the driver

```java
// File: Garage.java
public class Garage {
    public static void main(String[] args) {
        Car myCar = new Car();
        myCar.make = "Mazda";
        myCar.color = "red";

        myCar.accelerate(60);   // speed: 0 -> 60
        myCar.describe();       // red Mazda going 60 km/h

        myCar.brake(20);        // speed: 60 -> 40
        myCar.describe();       // red Mazda going 40 km/h

        myCar.brake(100);       // speed would be -60, clamped to 0
        myCar.describe();       // red Mazda going 0 km/h
    }
}
```

### Step 4 — Compile and run

```bash
javac Car.java Garage.java
java Garage
```

**Expected output:**
```
red Mazda going 60 km/h
red Mazda going 40 km/h
red Mazda going 0 km/h
```

### Step 5 — Trace the state
| Statement | `speed` before | `speed` after |
|-----------|---------------|---------------|
| `accelerate(60)` | 0 | 60 |
| `brake(20)` | 60 | 40 |
| `brake(100)` | 40 | 0 (clamped) |

Notice the `brake` method *protects* the object's state from becoming invalid — an early taste of why we control access to state (Week 03).

---

## 5. Guided in-class practice (pairs, ~30 min)

**Task:** Build a `Dog` class and a driver that creates two dogs.

**Requirements:**
1. `Dog` has three attributes: `name` (String), `breed` (String), `energy` (int, think of it as 0–100).
2. `Dog` has three methods:
   - `bark()` → prints `<name> says: Woof!`
   - `play(int minutes)` → reduces `energy` by `minutes` (do not let it go below 0).
   - `rest(int minutes)` → increases `energy` by `minutes` (do not let it exceed 100).
3. In a `Kennel` driver, create **two** `Dog` objects with different names/breeds and starting energy `50`.
4. Make one dog play for 30 minutes and the other rest for 30 minutes, then bark each.
5. Print both dogs' energy to prove their states are **independent**.

**Checkpoints (raise your hand when you hit each):**
- [ ] Both files compile with no errors.
- [ ] `play` and `rest` correctly clamp energy to the `[0, 100]` range.
- [ ] The two dogs show different energy values at the end (e.g., 20 and 80).

**Starter skeleton:**
```java
public class Dog {
    String name;
    String breed;
    int energy;

    void bark() {
        // TODO
    }
    void play(int minutes) {
        // TODO: reduce energy, clamp at 0
    }
    void rest(int minutes) {
        // TODO: increase energy, clamp at 100
    }
}
```

---

## 6. Common mistakes to avoid

| Mistake | Symptom | Fix |
|---------|---------|-----|
| File name ≠ public class name | `class Car is public, should be declared in a file named Car.java` | Rename the file to match the class. |
| Forgetting `new` | `variable might not have been initialized` / `NullPointerException` | Objects must be created with `new` before use (Session 2). |
| Calling a method without `objectName.` | `cannot find symbol` | Instance methods are called *on an object*: `myCar.brake(10)`. |
| Confusing state with behavior | Putting logic in fields or data in methods | Fields = data (nouns); methods = actions (verbs). |

---

## 7. Wrap-up and exit ticket

**Summary:** A class is a blueprint describing attributes (state) and methods (behavior). An object is a concrete instance with its own state. We defined `BankAccount` and `Car`, created independent objects, and watched their state change through method calls.

**Exit ticket (hand in one paragraph or a screenshot before you leave):**
1. In your own words, what is the difference between the `Car` class and a `Car` object? *(1–2 sentences.)*
2. Paste the final `energy` values of your two `Dog` objects and explain in one line why they differ.
3. One thing that is still unclear to you about classes and objects.

**Preview of Session 2:** What does `new` *really* do? What is a reference, and what happens when two variables point to the same object? We will also write proper constructors.
