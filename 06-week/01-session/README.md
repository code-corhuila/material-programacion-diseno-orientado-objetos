# Week 06 - Session 1

## "is-a", `extends`, and constructor chaining with `super()`

**Course:** Object-Oriented Programming and Design | **Unit 2** - Design principles and modularity
**Duration:** ~2 hours | **Assessment period:** Corte 2

---

## 1. Session objective

By the end of this session the student will be able to **model an "is-a" relationship** with single inheritance, declare a subclass using `extends`, and **use `super(...)` to invoke a parent constructor** so that a child object is fully and correctly initialized without duplicating the parent's setup code.

---

## 2. Timed agenda

| Time | Activity |
|---|---|
| 0:00 - 0:10 | Warm-up: the cost of duplicated code |
| 0:10 - 0:35 | Theory: "is-a" vs. "has-a", `extends`, what is inherited |
| 0:35 - 1:00 | Theory: the constructor chain and `super(...)` |
| 1:00 - 1:25 | Worked example: `Account` -> `SavingsAccount` |
| 1:25 - 1:50 | Guided practice: `Vehicle` -> `Car` |
| 1:50 - 2:00 | Wrap-up and exit ticket |

---

## 3. Warm-up (10 min) - Why we need inheritance

Consider two classes written independently by two students:

```java
class Dog {
    String name;
    int ageInYears;
    void eat()   { System.out.println(name + " is eating."); }
    void sleep() { System.out.println(name + " is sleeping."); }
    void bark()  { System.out.println(name + " says: Woof!"); }
}

class Cat {
    String name;
    int ageInYears;
    void eat()   { System.out.println(name + " is eating."); }
    void sleep() { System.out.println(name + " is sleeping."); }
    void meow()  { System.out.println(name + " says: Meow!"); }
}
```

**Discussion prompt:** How much of `Dog` and `Cat` is identical? What happens if we later add `weightInKg` and a `drink()` method to *every* animal? How many places must we edit?

The duplication (`name`, `ageInYears`, `eat()`, `sleep()`) is the problem inheritance solves. Both are **animals**; the shared parts belong in a common `Animal` parent.

---

## 4. Theory notes

### 4.1 The "is-a" relationship

Inheritance models specialization. We use it only when the sentence **"a child *is a kind of* parent"** is true:

- A `SavingsAccount` **is a** `BankAccount`. Correct.
- A `Car` **is a** `Vehicle`. Correct.
- A `Car` **is a** `Engine`? No - a car *has an* engine. That is composition ("has-a"), not inheritance.

> **Rule of thumb.** If you can say "X is-a Y", consider inheritance. If you can only say "X has-a Y", use a field (composition). Misusing inheritance for "has-a" produces fragile, confusing hierarchies.

### 4.2 Declaring a subclass with `extends`

```java
class Animal {              // superclass (parent / base)
    String name;
    int ageInYears;
    void eat()   { System.out.println(name + " is eating."); }
    void sleep() { System.out.println(name + " is sleeping."); }
}

class Dog extends Animal {  // subclass (child / derived)
    void bark() { System.out.println(name + " says: Woof!"); } // reuses inherited 'name'
}
```

The `extends` keyword wires `Dog` to `Animal`. A `Dog` object now automatically has `name`, `ageInYears`, `eat()`, and `sleep()` **without repeating a single line**.

Hierarchy sketch:

```
            +----------------+
            |     Animal     |   (superclass)
            +----------------+
            | - name         |
            | - ageInYears   |
            +----------------+
            | + eat()        |
            | + sleep()      |
            +----------------+
                    ^  extends
        +-----------+-----------+
        |                       |
+----------------+     +----------------+
|      Dog       |     |      Cat       |   (subclasses)
+----------------+     +----------------+
| + bark()       |     | + meow()       |
+----------------+     +----------------+
```

The arrow points **from child to parent** and reads "is-a".

### 4.3 What a subclass inherits - and what it does not

A subclass **inherits**:
- `public` and `protected` fields and methods of the superclass;
- package-private members **if** the subclass is in the same package.

A subclass **does not inherit**:
- **`private`** members - they exist inside every subclass object but are not directly accessible; you reach them through inherited `public`/`protected` getters/setters. Encapsulation is preserved even across inheritance.
- **Constructors** - constructors are not inherited. This is exactly why `super(...)` exists (Section 4.4).

Every class in Java that does not name a parent implicitly extends **`Object`**, the root of all class hierarchies. So the full chain for `Dog` is `Dog` -> `Animal` -> `Object`.

### 4.4 Constructors and the constructor chain

When you create a subclass object, **the parent part must be initialized before the child part**. Java enforces this by chaining constructors from the subclass up to `Object`.

Key rules:

1. The **first statement** of every constructor is a call to another constructor: either `super(...)` (a parent constructor) or `this(...)` (another constructor of the same class).
2. If you write neither, the compiler **inserts an implicit `super()`** - a call to the parent's **no-argument** constructor.
3. If the parent has **no** no-argument constructor (because you declared other constructors and none is parameterless), the implicit `super()` fails to compile. **You must then write `super(...)` explicitly** with the right arguments.

Initialization order for `new SavingsAccount(...)`:

```
new SavingsAccount(...)
        |
        v
 SavingsAccount ctor  --> super(...) --> BankAccount ctor --> super() --> Object ctor
                                                                              |
                        <-- returns, Object part ready ------------------------
        <-- BankAccount fields initialized --
   SavingsAccount fields initialized, object ready
```

The parent is fully built first, then control returns down the chain and the child finishes.

### 4.5 The `super(...)` call in practice

`super(arg1, arg2, ...)` calls the matching constructor of the **direct** superclass. Use it to **reuse the parent's initialization logic** instead of re-assigning inherited fields by hand:

```java
class BankAccount {
    protected String owner;
    protected double balance;

    BankAccount(String owner, double openingBalance) {
        this.owner = owner;
        this.balance = openingBalance;
    }
}

class SavingsAccount extends BankAccount {
    private double annualRate;

    SavingsAccount(String owner, double openingBalance, double annualRate) {
        super(owner, openingBalance); // reuse the parent's setup - no duplication
        this.annualRate = annualRate; // add only what is new
    }
}
```

Note how the child constructor sets **only** the new field `annualRate`; `owner` and `balance` are handled by the parent through `super(...)`. That is the essence of reuse without duplication.

---

## 5. Worked example (fully solved) - `Account` -> `SavingsAccount`

**Problem.** Model a bank that has generic accounts and specialized savings accounts. Every account has an owner and a balance, and can deposit and withdraw. A savings account additionally has an annual interest rate and can apply monthly interest. Do not duplicate the deposit/withdraw logic.

**Step 1 - Identify the relationship.** "A savings account **is a** bank account." -> inheritance.

**Step 2 - Put the common parts in the parent.**

```java
public class Account {
    protected String owner;
    protected double balance;

    public Account(String owner, double openingBalance) {
        this.owner = owner;
        this.balance = openingBalance;
    }

    public void deposit(double amount) {
        if (amount <= 0) {
            System.out.println("Deposit must be positive.");
            return;
        }
        balance += amount;
    }

    public void withdraw(double amount) {
        if (amount <= 0) {
            System.out.println("Withdrawal must be positive.");
            return;
        }
        if (amount > balance) {
            System.out.println("Insufficient funds.");
            return;
        }
        balance -= amount;
    }

    public double getBalance() {
        return balance;
    }
}
```

**Step 3 - Specialize in the child, reusing the parent via `super(...)`.**

```java
public class SavingsAccount extends Account {
    private double annualRate; // e.g. 0.06 means 6% per year

    public SavingsAccount(String owner, double openingBalance, double annualRate) {
        super(owner, openingBalance); // reuse parent constructor - owner & balance done here
        this.annualRate = annualRate;
    }

    // New behavior specific to savings accounts
    public void applyMonthlyInterest() {
        double monthly = balance * (annualRate / 12.0);
        deposit(monthly); // reuse inherited deposit() - no duplicated balance logic
    }
}
```

**Step 4 - Drive it from `main`.**

```java
public class Bank {
    public static void main(String[] args) {
        SavingsAccount s = new SavingsAccount("Ana", 1000.0, 0.06);
        s.deposit(500.0);          // inherited method
        s.applyMonthlyInterest();  // specialized method
        System.out.printf("Balance: %.2f%n", s.getBalance());
    }
}
```

**Expected output:**

```
Balance: 1507.50
```

**Trace of the result.** Opening balance `1000` + deposit `500` = `1500`. Monthly interest = `1500 * (0.06 / 12) = 1500 * 0.005 = 7.50`. New balance = `1507.50`.

**What this demonstrates:**
- `SavingsAccount` reused `owner`/`balance` initialization through `super(...)`.
- `applyMonthlyInterest()` reused the inherited `deposit()` instead of touching `balance` directly.
- Zero duplication of the deposit/withdraw rules.

---

## 6. Guided in-class practice (25 min) - `Vehicle` -> `Car`

Work in pairs. Build the hierarchy step by step; the instructor checks after each step.

**Requirements:**

1. Create a parent class `Vehicle` with:
   - `protected` fields `brand` (String) and `maxSpeed` (int);
   - a constructor `Vehicle(String brand, int maxSpeed)`;
   - a method `describe()` that prints `"<brand> reaches <maxSpeed> km/h"`.

2. Create a subclass `Car extends Vehicle` with:
   - an extra `private int numberOfDoors`;
   - a constructor `Car(String brand, int maxSpeed, int numberOfDoors)` that calls `super(brand, maxSpeed)` and then sets `numberOfDoors`;
   - a method `showDoors()` that prints `"This car has <numberOfDoors> doors"`.

3. In a `main`, create a `Car("Mazda", 200, 4)`, then call `describe()` and `showDoors()`.

**Checkpoints (the instructor verifies):**
- [ ] `super(brand, maxSpeed)` is the **first** statement of the `Car` constructor.
- [ ] `Car` does **not** re-declare `brand` or `maxSpeed`.
- [ ] `describe()` is inherited and works on a `Car` object without being rewritten.

**Reference solution (reveal only after attempting):**

```java
public class Vehicle {
    protected String brand;
    protected int maxSpeed;

    public Vehicle(String brand, int maxSpeed) {
        this.brand = brand;
        this.maxSpeed = maxSpeed;
    }

    public void describe() {
        System.out.println(brand + " reaches " + maxSpeed + " km/h");
    }
}

public class Car extends Vehicle {
    private int numberOfDoors;

    public Car(String brand, int maxSpeed, int numberOfDoors) {
        super(brand, maxSpeed);          // first statement
        this.numberOfDoors = numberOfDoors;
    }

    public void showDoors() {
        System.out.println("This car has " + numberOfDoors + " doors");
    }

    public static void main(String[] args) {
        Car c = new Car("Mazda", 200, 4);
        c.describe();   // inherited
        c.showDoors();  // specialized
    }
}
```

**Expected output:**

```
Mazda reaches 200 km/h
This car has 4 doors
```

**Stretch goal (if time allows):** Add a second subclass `Motorcycle extends Vehicle` with a `boolean hasSidecar`. Notice that `describe()` is reused by *both* children with no extra code.

---

## 7. Common mistakes to avoid

| Mistake | Symptom | Fix |
|---|---|---|
| Forgetting `super(...)` when the parent has no no-arg constructor | `error: constructor Vehicle in class Vehicle cannot be applied to given types` | Add `super(brand, maxSpeed)` as the first line. |
| Putting `super(...)` after another statement | `error: call to super must be first statement in constructor` | Move `super(...)` to the top. |
| Re-declaring inherited fields in the child | Hidden fields, confusing bugs | Delete the redundant declarations; the parent already owns them. |
| Making inherited fields `private` and then needing them in the child | Compile error accessing the field | Use `protected` for members meant for subclasses, or use getters. |

---

## 8. Wrap-up and exit ticket

**Summary.** Inheritance expresses "is-a"; `extends` wires child to parent; the child inherits public/protected members but not constructors; `super(...)` chains construction so the parent is initialized first and its setup logic is reused without duplication.

**Exit ticket (submit before leaving - 5 min).** Answer briefly:

1. Rewrite this line so it compiles, given that `Employee` only has the constructor `Employee(String name)`:
   ```java
   class Manager extends Employee {
       Manager(String name, int teamSize) {
           // ??? add the missing first line
           this.teamSize = teamSize;
       }
   }
   ```
2. In one sentence, why are constructors *not* inherited?
3. Give one example of an "is-a" pair and one example of a "has-a" pair from everyday software.

> Expected answer to (1): `super(name);` as the first statement. (2): because each class is responsible for initializing its own fields, so construction is delegated explicitly via `super(...)`. (3): open, e.g. `SavingsAccount is-a Account`; `Car has-a Engine`.
