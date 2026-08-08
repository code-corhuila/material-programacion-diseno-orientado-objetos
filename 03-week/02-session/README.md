# Session 02 - Getters, setters, validation, and full encapsulation

**Subject:** Object-Oriented Programming and Design | **Week:** 03 | **Unit:** 1 | **Corte:** 1
**RAA:** 90_82759

---

## 1. Session objective

By the end of this session the student will be able to **implement getters and setters that expose object state safely, place validation logic in setters and constructors to protect a class's invariants, and refactor a leaky class into a well-encapsulated one**, explaining how encapsulation reduces coupling and protects data integrity.

This session builds directly on Session 01: now that attributes are `private`, we design the controlled interface that lets the outside world interact with them.

---

## 2. Timed agenda (110 minutes)

| Time | Activity |
|---|---|
| 0:00 - 0:10 | Recap of Session 01; the problem: private data still needs to be read/changed |
| 0:10 - 0:30 | Theory: getters and setters, naming conventions, property kinds |
| 0:30 - 0:55 | Theory: invariants, validation, and failing fast |
| 0:55 - 1:20 | Worked example: a fully encapsulated `BankAccount` |
| 1:20 - 1:50 | Guided in-class practice: refactor a leaky `Product` class |
| 1:50 - 1:57 | Theory: how encapsulation reduces coupling |
| 1:57 - 2:00 | Wrap-up and exit ticket |

---

## 3. Theory notes

### 3.1 The problem getters and setters solve

After Session 01, our fields are `private`. That is safe, but useless on its own — a bank account whose balance can never be read or updated is pointless. We need **controlled openings** in the wall:

- A **getter (accessor)** returns the value of an attribute.
- A **setter (mutator)** changes the value of an attribute — *after checking that the new value is acceptable*.

The key insight: a setter is not a dumb assignment. It is a **gatekeeper**. This is what separates real encapsulation from "public fields with extra typing."

```
   Outside world                Class boundary               Private state
   -------------                --------------               -------------
   account.deposit(50) ---->  [ setter / method ]  ---->  balance += 50
                                     |  validate
   account.getBalance() <----  [ getter ]          <----  return balance

   account.balance = -999   X  BLOCKED (field is private)
```

### 3.2 Getters and setters: naming conventions

The widely used **JavaBeans** convention:

| Attribute | Getter | Setter |
|---|---|---|
| `String name` | `getName()` | `setName(String name)` |
| `double balance` | `getBalance()` | `setBalance(double balance)` |
| `boolean active` | `isActive()` (note: `is`, not `get`) | `setActive(boolean active)` |

```java
public class Person {
    private String name;

    public String getName() {          // accessor
        return name;
    }

    public void setName(String name) { // mutator
        this.name = name;              // 'this.name' = field, 'name' = parameter
    }
}
```

- `this.name` refers to the **field**; the bare `name` refers to the **parameter**. This disambiguation is why `this` appears.
- Boolean getters use `is` (`isActive`, `isPowerOn`) because it reads naturally: `if (account.isActive())`.

### 3.3 Property kinds: not everything needs both

Encapsulation is about *control*, not about mechanically generating a getter and setter for every field. Choose deliberately:

| Kind | Has getter? | Has setter? | Example |
|---|:---:|:---:|---|
| **Read/write** | Yes | Yes (validated) | `email` on a user |
| **Read-only** | Yes | No | `accountNumber` (assigned once, never changed) |
| **Write-only** | No | Yes | `password` (you set it, you never read it back) |
| **Derived / computed** | Yes (computes) | No | `getFullName()` from first + last name |

```java
// Read-only: no setter, value fixed in constructor.
public class BankAccount {
    private final String accountNumber;      // 'final' -> cannot change after construction
    public BankAccount(String accountNumber) {
        this.accountNumber = accountNumber;
    }
    public String getAccountNumber() { return accountNumber; }
    // (no setAccountNumber -> the number can never be reassigned)
}

// Derived: computed on demand, nothing stored.
public class Person {
    private String firstName;
    private String lastName;
    public String getFullName() {            // computed property
        return firstName + " " + lastName;
    }
}
```

> **Design tip:** A common anti-pattern is generating a public getter *and* setter for every field automatically. That produces an "anemic" class that is barely better than public fields. Only expose what the class's role actually requires.

### 3.4 Invariants: the rules that must always hold

An **invariant** is a condition that must be true for *every* valid state of an object, for its entire lifetime. Examples:

| Entity | Invariant |
|---|---|
| Bank account | `balance >= 0` (no overdraft allowed) |
| Person | `age >= 0` and `age <= 150` |
| Product | `price > 0` and `stock >= 0` |
| Email field | value matches an email pattern and is not null |

An object is **valid** when all its invariants hold. The job of encapsulation is to make it **impossible** to create or leave an object in an invalid state.

### 3.5 Validation and failing fast

Validation is the act of **rejecting unacceptable values before they are stored**. There are two lines of defense, and a well-designed class uses both:

1. **Constructors** — an object must be *born valid*.
2. **Setters** — an object must *stay valid* through every change.

```java
public void setAge(int age) {
    if (age < 0 || age > 150) {
        throw new IllegalArgumentException("Age must be between 0 and 150, got: " + age);
    }
    this.age = age;
}
```

**Fail fast:** detect the bad value *immediately* and report it clearly (here, by throwing an exception). The alternative — silently clamping, ignoring, or storing garbage — hides bugs and corrupts data downstream.

> **Why put validation in the setter and not in the caller?** Because there may be *many* callers. If validation lives in the calling code, every caller must remember to do it, and every caller can get it wrong. Put it in the setter **once**, and the rule is enforced for everyone, forever. This is the DRY principle applied to data integrity.

---

## 4. Fully worked example: a well-encapsulated `BankAccount`

This example brings together every concept: private state, read-only vs. read/write properties, constructor validation, setter-free mutation through meaningful behavior, and invariant protection.

```java
package banking;

public class BankAccount {

    // --- Invariants this class guarantees ---
    //   I1: balance >= 0 at all times
    //   I2: accountNumber is set once and never changes
    //   I3: ownerName is never null or blank

    private final String accountNumber;  // read-only after construction
    private String ownerName;            // read/write, but validated
    private double balance;              // never set directly from outside

    // Constructor: the object is born valid or not born at all.
    public BankAccount(String accountNumber, String ownerName, double openingBalance) {
        if (accountNumber == null || accountNumber.isBlank()) {
            throw new IllegalArgumentException("Account number is required.");
        }
        if (openingBalance < 0) {
            throw new IllegalArgumentException("Opening balance cannot be negative.");
        }
        this.accountNumber = accountNumber;
        setOwnerName(ownerName);     // reuse the validated setter -> no duplicated rules
        this.balance = openingBalance;
    }

    // Read-only property: getter, no setter.
    public String getAccountNumber() {
        return accountNumber;
    }

    // Read/write property with validation.
    public String getOwnerName() {
        return ownerName;
    }
    public void setOwnerName(String ownerName) {
        if (ownerName == null || ownerName.isBlank()) {
            throw new IllegalArgumentException("Owner name cannot be empty.");
        }
        this.ownerName = ownerName;
    }

    // Balance is exposed for READING only...
    public double getBalance() {
        return balance;
    }

    // ...and CHANGED only through meaningful, guarded behavior.
    public void deposit(double amount) {
        if (amount <= 0) {
            throw new IllegalArgumentException("Deposit must be positive.");
        }
        balance += amount;                 // I1 preserved: adding to a non-negative balance
    }

    public void withdraw(double amount) {
        if (amount <= 0) {
            throw new IllegalArgumentException("Withdrawal must be positive.");
        }
        if (amount > balance) {
            throw new IllegalStateException("Insufficient funds. Balance: " + balance);
        }
        balance -= amount;                 // I1 preserved: we checked amount <= balance
    }
}
```

**Client code — the class defends itself:**

```java
BankAccount acc = new BankAccount("CH-001", "Ana Torres", 100.0);

acc.deposit(50);                 // balance -> 150
acc.withdraw(30);                // balance -> 120
System.out.println(acc.getBalance()); // 120.0

// acc.balance = 1_000_000;      // COMPILE ERROR: balance is private
// acc.withdraw(999);            // RUNTIME: IllegalStateException, funds protected
// new BankAccount("", "X", 0);  // RUNTIME: IllegalArgumentException, born-invalid prevented
```

**What makes this class well encapsulated:**
- There is **no** `setBalance()`. Balance changes only via `deposit`/`withdraw`, which enforce invariant `I1` (`balance >= 0`). A raw setter would let a caller write any number and destroy the invariant.
- The constructor **reuses** `setOwnerName`, so the "name not blank" rule exists in exactly one place.
- `accountNumber` is `final` with a getter and no setter — a genuine read-only property.
- Every mutation path *fails fast* with a descriptive exception.

---

## 5. Guided in-class practice: refactor a leaky class

You are given this **poorly encapsulated** class. Refactor it into a well-encapsulated one.

### Starting point (broken)

```java
public class Product {
    public String name;     // anyone can set to null or ""
    public double price;    // anyone can set to a negative number
    public int stock;       // anyone can set below zero
}
```

Client code today can do this — all of it dangerous:

```java
Product p = new Product();
p.price = -50;      // negative price: invariant violated
p.stock = -3;       // negative stock: invariant violated
p.name = null;      // no name at all
```

### Your task (30 min, individual or pairs)

Refactor `Product` so that:

1. All three fields are `private`.
2. Invariants are enforced:
   - `name` is never null or blank.
   - `price` is strictly greater than 0.
   - `stock` is never negative.
3. Provide a **constructor** that validates all three inputs (born valid).
4. Provide **validated setters** for `name` and `price`.
5. Instead of a raw `setStock`, provide behavior methods `addStock(int qty)` and `removeStock(int qty)` that keep `stock >= 0` and reject non-positive quantities.
6. Provide getters for all three.
7. Add one **derived** getter `getInventoryValue()` returning `price * stock`.

### Reference solution (reveal after attempting)

<details>
<summary>Show one acceptable solution</summary>

```java
public class Product {
    private String name;
    private double price;
    private int stock;

    public Product(String name, double price, int stock) {
        setName(name);            // reuse validation
        setPrice(price);          // reuse validation
        if (stock < 0) {
            throw new IllegalArgumentException("Initial stock cannot be negative.");
        }
        this.stock = stock;
    }

    public String getName() { return name; }
    public void setName(String name) {
        if (name == null || name.isBlank()) {
            throw new IllegalArgumentException("Name cannot be empty.");
        }
        this.name = name;
    }

    public double getPrice() { return price; }
    public void setPrice(double price) {
        if (price <= 0) {
            throw new IllegalArgumentException("Price must be positive.");
        }
        this.price = price;
    }

    public int getStock() { return stock; }

    public void addStock(int qty) {
        if (qty <= 0) throw new IllegalArgumentException("Quantity must be positive.");
        stock += qty;
    }

    public void removeStock(int qty) {
        if (qty <= 0) throw new IllegalArgumentException("Quantity must be positive.");
        if (qty > stock) throw new IllegalStateException("Not enough stock.");
        stock -= qty;
    }

    // Derived / computed property.
    public double getInventoryValue() {
        return price * stock;
    }
}
```
</details>

### Acceptance checklist
- [ ] No `public` fields remain.
- [ ] Constructor rejects invalid input.
- [ ] Setters for `name` and `price` validate.
- [ ] Stock is changed only through `addStock` / `removeStock`, never below 0.
- [ ] `getInventoryValue()` computes rather than stores.
- [ ] You can demonstrate one client line that now throws instead of corrupting state.

---

## 6. Theory: how encapsulation reduces coupling

**Coupling** is how much one class depends on another's internal details. High coupling makes change expensive: touch one class and many others break.

Consider the leaky `Product`. Suppose 20 places in the program read `p.price`. Now the business decides prices must be stored in **cents (int)** for accuracy instead of a `double`. With public fields, all 20 places break and must be edited.

With encapsulation, only the *inside* of `Product` changes:

```java
private int priceInCents;                 // internal representation changed

public double getPrice() {                // public interface unchanged
    return priceInCents / 100.0;
}
public void setPrice(double price) {
    if (price <= 0) throw new IllegalArgumentException("Price must be positive.");
    this.priceInCents = (int) Math.round(price * 100);
}
```

The 20 client sites still call `getPrice()` / `setPrice()` and never notice. This is the payoff:

> **Encapsulation lets a class change its internal implementation without breaking its clients**, because clients depend only on the stable public interface — not on the private data. That is exactly what "low coupling" means, and it is why encapsulation is one of the pillars of maintainable software.

```
   Without encapsulation           With encapsulation
   ---------------------           ------------------
   client --> p.price             client --> getPrice()
   client --> p.price                          |
   client --> p.price               [ public interface : STABLE ]
       (all break if                            |
        the field changes)         [ private data : free to change ]
```

---

## 7. Wrap-up

**Key takeaways:**
1. Getters read state; setters change state **after validating** it.
2. Not every field needs both — choose read-only, write-only, read/write, or derived deliberately.
3. Invariants must be enforced in **both** the constructor (born valid) and setters/behavior (stay valid).
4. **Fail fast** with clear exceptions instead of storing bad data.
5. Encapsulation reduces **coupling**: the public interface stays stable while the internals are free to change.

### Exit ticket (submit before leaving)

1. Give one attribute that should be **read-only** and explain why it needs no setter.
2. Write (in pseudocode or Java) a validated setter for a `percentage` field whose invariant is `0 <= percentage <= 100`.
3. In one or two sentences: why is putting validation in the setter better than putting it in every caller?

> **Next step:** Apply all of this in the optional GitHub activity (`../optional-activity/README.md`), where you design a fully encapsulated class from scratch and defend its invariants.
