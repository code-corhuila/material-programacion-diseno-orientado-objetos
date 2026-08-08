# Week 06 · Session 01 — Foundations of inheritance: the "is-a" relationship and `extends`

> **Unit 2:** Design principles and modularity · **Assessment period:** Corte 2
> **RAA:** `90_82759`

---

## 1. Session objective

By the end of this session, the student will **model an "is-a" relationship between two classes using
single inheritance**, correctly using `extends` so that the child class inherits and reuses at least
two members of the parent, and will be able to explain why Java restricts a class to a single direct
superclass.

---

## 2. Timed agenda (110 min)

| Time | Activity |
|:---:|---|
| 0:00 – 0:10 | Warm-up: spot the duplicated code (motivation). |
| 0:10 – 0:35 | Theory: the "is-a" test, `extends`, the `Object` root, what is/ isn't inherited. |
| 0:35 – 0:50 | Theory: why single inheritance? The diamond problem. |
| 0:50 – 1:15 | Worked example: refactoring `Employee` / `Manager`. |
| 1:15 – 1:40 | Guided in-class practice: the `Vehicle` hierarchy. |
| 1:40 – 1:50 | Wrap-up + exit ticket. |

---

## 3. Warm-up — why we need inheritance (10 min)

Consider two classes written independently by two students:

```java
class SavingsAccount {
    String owner;
    double balance;
    void deposit(double amount)  { balance += amount; }
    void withdraw(double amount) { balance -= amount; }
    String summary() { return owner + ": " + balance; }
    double interestRate = 0.02;
}

class CheckingAccount {
    String owner;
    double balance;
    void deposit(double amount)  { balance += amount; }   // identical
    void withdraw(double amount) { balance -= amount; }   // identical
    String summary() { return owner + ": " + balance; }   // identical
    double overdraftLimit = 500.0;
}
```

Three methods and two fields are **copied verbatim**. If we later fix a bug in `withdraw` (say, to
forbid negative amounts), we must remember to fix it in **both** places. This is exactly the pain
inheritance removes.

**Discussion prompt (whole class):** What do these two classes have in common, and what is genuinely
different? Write the common part on the board — that common part *is* the future parent class.

---

## 4. Theory notes

### 4.1 The "is-a" relationship

Inheritance models an **"is-a"** relationship. Before writing `extends`, say the sentence out loud:

> A `SavingsAccount` **is a** `BankAccount`. ✅
> A `Manager` **is an** `Employee`. ✅
> A `Car` **is a** `Vehicle`. ✅

If the sentence sounds natural and is *always* true, inheritance is a candidate. If instead you find
yourself saying "**has a**", you want **composition**, not inheritance:

> A `Car` **has an** `Engine`. → the `Car` class holds an `Engine` field; it does **not** extend `Engine`.

> **Rule of thumb.** Use inheritance for **is-a**; use a field (composition) for **has-a**.
> "A car is an engine" is false, so `class Car extends Engine` is a design error even if it compiles.

### 4.2 `extends` and the shape of a hierarchy

The `extends` keyword declares that one class is a specialization of another:

```java
class BankAccount {              // parent / superclass / base class
    String owner;
    double balance;
    void deposit(double amount)  { balance += amount; }
    void withdraw(double amount) { balance -= amount; }
    String summary() { return owner + ": " + balance; }
}

class SavingsAccount extends BankAccount {   // child / subclass / derived class
    double interestRate = 0.02;              // adds new state
    void addInterest() {                     // adds new behavior…
        deposit(balance * interestRate);     // …reusing an inherited method
    }
}
```

`SavingsAccount` did not redeclare `owner`, `balance`, `deposit`, `withdraw`, or `summary` — it
**inherited** them. It only wrote what is *new*. This is the DRY principle in action.

```
        BankAccount            (owner, balance, deposit, withdraw, summary)
             ▲
             │  extends
             │
      SavingsAccount           (+ interestRate, + addInterest)
```

### 4.3 Every class extends `Object`

Even `BankAccount`, which has no `extends` clause, silently extends `java.lang.Object`. That is why
every object already has methods such as `toString()`, `equals(Object)`, and `hashCode()`. The full
picture is a **tree** with `Object` at the root:

```
                Object
               /   |   \
       BankAccount ...  String ...
            ▲
      SavingsAccount
```

### 4.4 What is inherited — and what is not

**Inherited by a subclass:**

- `public` and `protected` fields and methods of the parent.
- Package-private members, *if* the subclass is in the same package.

**NOT inherited:**

- **Constructors.** A subclass does not inherit constructors; it must define its own (Session 02).
- **`private` members' direct access.** A `private` field still *exists* inside the object, but the
  child cannot touch it by name — it must go through an inherited `public`/`protected` accessor.

```java
class BankAccount {
    private double balance;                 // exists in every SavingsAccount…
    protected double getBalance() { return balance; }   // …but reached only via this
}
class SavingsAccount extends BankAccount {
    void report() {
        // System.out.println(balance);     // ❌ compile error: balance is private to parent
        System.out.println(getBalance());   // ✅ inherited accessor
    }
}
```

### 4.5 Why only single inheritance? The diamond problem

Java allows a class to `extends` **exactly one** class. Suppose it did not, and both parents defined a
method with the same signature:

```
        A  (greet())
       / \
      B   C          both override greet() differently
       \ /
        D            D extends B, C  ← which greet() does D get?  AMBIGUOUS
```

This ambiguity is the **diamond problem**. Java sidesteps it entirely for classes by permitting a
single parent, keeping the hierarchy an unambiguous tree. (Multiple *interface* inheritance is allowed
because interfaces traditionally carried no state and no implementation conflict — a topic for a later
unit.)

---

## 5. Fully worked example — refactoring `Employee` / `Manager`

**Problem.** A payroll module has two near-identical classes. Remove the duplication using inheritance.

### 5.1 Before (duplicated)

```java
class Employee {
    String name;
    double baseSalary;
    double monthlyPay() { return baseSalary; }
    String card() { return name + " — pay: " + monthlyPay(); }
}

class Manager {
    String name;                                   // duplicated
    double baseSalary;                             // duplicated
    double bonus;
    double monthlyPay() { return baseSalary + bonus; }
    String card() { return name + " — pay: " + monthlyPay(); }  // duplicated
}
```

### 5.2 Apply the "is-a" test

> A `Manager` **is an** `Employee`. ✅ — inheritance is justified.

### 5.3 After (inheritance)

```java
class Employee {
    String name;
    double baseSalary;
    double monthlyPay() { return baseSalary; }
    String card() { return name + " — pay: " + monthlyPay(); }
}

class Manager extends Employee {
    double bonus;                 // only the NEW field

    // Only the behavior that actually differs is written here.
    // (This redefinition of monthlyPay previews overriding, covered next session.)
    double monthlyPay() { return baseSalary + bonus; }
}
```

`Manager` no longer repeats `name`, `baseSalary`, or `card()`. Notice that `card()`, defined only in
`Employee`, still calls `monthlyPay()` — and for a `Manager` object it will use the manager's version.
That dynamic dispatch is the bridge to next week's polymorphism.

### 5.4 Driver and expected output

```java
public class Payroll {
    public static void main(String[] args) {
        Employee e = new Employee();
        e.name = "Ana";  e.baseSalary = 3000;

        Manager m = new Manager();
        m.name = "Beto"; m.baseSalary = 4000; m.bonus = 1500;

        System.out.println(e.card());
        System.out.println(m.card());   // card() is inherited; monthlyPay() is the Manager's
    }
}
```

**Expected output:**

```
Ana — pay: 3000.0
Beto — pay: 5500.0
```

**Why `5500.0`?** `card()` lives in `Employee`, but when it calls `monthlyPay()` on a `Manager`
object, Java runs the `Manager` version (`4000 + 1500`). We reused the parent's `card()` unchanged and
still got specialized behavior — zero duplication.

---

## 6. Guided in-class practice — the `Vehicle` hierarchy (25 min)

Work in pairs. Type as you go; compile after every step.

**Step 1 — Base class.** Create `Vehicle` with:

- fields `String brand;` and `int maxSpeed;`
- method `String describe()` returning `brand + " (max " + maxSpeed + " km/h)"`.

**Step 2 — Apply the test.** Confirm out loud: *"A `Motorcycle` **is a** `Vehicle`"* and
*"A `Truck` **is a** `Vehicle`."* Both pass.

**Step 3 — First subclass.** Create `Motorcycle extends Vehicle` that adds `boolean hasSidecar;` and a
method `String kind()` returning `"Motorcycle"`. Do **not** redeclare `brand` or `maxSpeed`.

**Step 4 — Second subclass.** Create `Truck extends Vehicle` that adds `double cargoTons;` and a method
`String kind()` returning `"Truck"`.

**Step 5 — Reuse.** In a `main`, create one `Motorcycle` and one `Truck`, set their fields, and print
`kind() + ": " + describe()` for each. Confirm `describe()` was written once yet works for both.

**Checkpoint questions:**

1. How many times did you write the `describe()` logic? (Expected: once.)
2. Could `Motorcycle` read a `private` field of `Vehicle` directly? Why or why not?
3. Draw the hierarchy tree, including `Object`.

**Expected shape of the answer:**

```
        Object
          ▲
       Vehicle        (brand, maxSpeed, describe)
        ▲    ▲
Motorcycle   Truck    (each adds its own state + kind())
```

---

## 7. Wrap-up (5 min)

- Inheritance models **is-a**; composition models **has-a**.
- `extends` gives a subclass the parent's non-private members for free — write only what is new.
- Constructors and direct `private` access are **not** inherited.
- Java uses **single** class inheritance to keep the hierarchy an unambiguous tree (diamond problem).

**Bridge to Session 02:** we ignored constructors today by setting fields directly. Real classes
initialize through constructors — and a child cannot initialize the parent's part alone. That is the
job of `super(...)`, which we tackle next.

---

## 8. Exit ticket (submit before leaving)

Answer briefly on paper or in the LMS:

1. Write one correct "is-a" sentence and one correct "has-a" sentence from any domain, and state which
   one justifies `extends`.
2. Given `class Sensor { protected int id; private int rawValue; }`, which of `id` and `rawValue` can a
   subclass access **by name**, and why?
3. In two sentences, explain the diamond problem and how single inheritance avoids it.
