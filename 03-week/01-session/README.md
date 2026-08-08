# Session 01 - Attributes, methods, and access modifiers: controlling visibility

**Subject:** Object-Oriented Programming and Design | **Week:** 03 | **Unit:** 1 | **Corte:** 1
**RAA:** 90_82759

---

## 1. Session objective

By the end of this session the student will be able to **declare attributes and methods inside a class and apply the access modifiers `public`, `private`, and `protected` to control their visibility**, correctly predicting whether a given access is legal or produces a compilation error.

This session lays the foundation for Session 02, where we use these modifiers to build fully encapsulated classes with validated getters and setters.

---

## 2. Timed agenda (110 minutes)

| Time | Activity |
|---|---|
| 0:00 - 0:10 | Warm-up & recap: class vs. object; what "state" and "behavior" mean |
| 0:10 - 0:35 | Theory: attributes and methods (declaration, instance members, signatures) |
| 0:35 - 1:00 | Theory: access modifiers and the visibility table |
| 1:00 - 1:20 | Worked example: the `Thermostat` class, member by member |
| 1:20 - 1:45 | Guided in-class practice: predict-the-error + write your own |
| 1:45 - 1:55 | Cross-language note (Python, C#) and common mistakes |
| 1:55 - 2:00 | Wrap-up and exit ticket |

---

## 3. Theory notes

### 3.1 State and behavior live inside the class

A class is a template that describes objects. Each object built from that template carries its own **state** and can perform **behavior**:

```
        +--------------------------------+
        |            CLASS               |
        |   (blueprint / template)       |
        +--------------------------------+
                     |
                     |  new
                     v
   +---------------------------------------------+
   |                 OBJECT                       |
   |                                             |
   |   STATE (attributes)      BEHAVIOR (methods)|
   |   -------------------      ------------------|
   |   currentTemp = 21        turnUp()          |
   |   targetTemp  = 23        turnDown()        |
   |   isOn        = true      getStatus()       |
   +---------------------------------------------+
```

### 3.2 Attributes (fields / instance variables)

An **attribute** is a variable declared inside the class body (not inside a method). It holds part of the object's state and each object gets its own copy.

```java
public class Thermostat {
    // --- attributes / fields ---
    private double currentTemperature;   // state: what it reads now
    private double targetTemperature;    // state: what we want
    private boolean powerOn;             // state: on or off
}
```

- **Instance attribute:** belongs to each object (`currentTemperature` above). Two thermostats can hold different temperatures.
- **Static (class) attribute:** shared by *all* objects of the class, declared with `static`. Example: a constant `MAX_TEMPERATURE`.

```java
public class Thermostat {
    public static final double MAX_TEMPERATURE = 35.0; // shared constant
    private double targetTemperature;                  // per-object
}
```

**Initialization** can happen at three moments:
1. At declaration: `private int count = 0;`
2. Inside the constructor: `this.count = initialCount;`
3. By default: numeric fields default to `0`, `boolean` to `false`, object references to `null` (in Java). Relying on defaults silently is a common source of bugs; prefer explicit initialization.

### 3.3 Methods

A **method** is a named block of behavior. Its **signature** is the name plus the parameter list; the return type declares what it gives back (`void` if nothing).

```java
public void turnUp() {                 // no parameters, returns nothing
    targetTemperature = targetTemperature + 1;
}

public double getTargetTemperature() { // no parameters, returns a double
    return targetTemperature;
}

public void setTargetTemperature(double newTarget) { // one parameter
    targetTemperature = newTarget;
}
```

Methods that *read* state are called **accessors** (getters); methods that *change* state are called **mutators** (setters). We study these in depth in Session 02; today we focus on **who is allowed to call them and touch the fields**.

### 3.4 Access modifiers: who can see what

An **access modifier** answers one question: *from where in the program can this member be reached?* Java gives four levels:

| Modifier | Same class | Same package | Subclass (other package) | Anywhere |
|---|:---:|:---:|:---:|:---:|
| `private` | Yes | No | No | No |
| *(default / package-private)* | Yes | Yes | No | No |
| `protected` | Yes | Yes | Yes | No |
| `public` | Yes | Yes | Yes | Yes |

Read the table from most restrictive (top) to most open (bottom). The rule of thumb:

> **Start with `private`. Open up only when you have a concrete reason.**

Visual mental model — concentric rings of trust:

```
   +-------------------------------------------------+
   |  public   (the whole world can call it)         |
   |   +-----------------------------------------+   |
   |   |  protected  (package + subclasses)      |   |
   |   |   +---------------------------------+   |   |
   |   |   |  default  (same package only)   |   |   |
   |   |   |   +-------------------------+   |   |   |
   |   |   |   |  private (this class)   |   |   |   |
   |   |   |   +-------------------------+   |   |   |
   |   |   +---------------------------------+   |   |
   |   +-----------------------------------------+   |
   +-------------------------------------------------+
```

- **`private`** — the safe default for attributes. Nothing outside the class can read or write the field directly, so the class keeps full control over its data.
- **default (no keyword)** — visible to other classes in the *same package*. Useful for helper classes that collaborate closely.
- **`protected`** — visible in the same package *and* to subclasses even in other packages. Used to let descendants reuse or override a member without exposing it to unrelated code. (Inheritance is studied later; today just recognize it.)
- **`public`** — visible everywhere. Reserved for the intended interface of the class (its public methods, constants).

### 3.5 Why not just make everything public?

Making fields `public` lets any code anywhere change them at any time, to any value:

```java
Thermostat t = new Thermostat();
t.currentTemperature = 9999;   // if public: nonsense value, no one stopped it
t.powerOn = true;              // but currentTemperature is garbage
```

With `private` fields, the outside world *cannot* do this. It must go through methods the class controls, and those methods can **validate** input (Session 02). This is the mechanical basis of encapsulation: **restricting direct access is what makes protection possible.**

---

## 4. Fully worked example: the `Thermostat` class

We build a small class member by member, explaining the modifier chosen for each.

```java
package home.climate;

public class Thermostat {

    // 1) A shared, immutable limit -> public because it is safe to read
    //    and useful to everyone; final so it can never change.
    public static final double MAX_TEMPERATURE = 35.0;
    public static final double MIN_TEMPERATURE = 5.0;

    // 2) Internal state -> private: the outside world must never poke it directly.
    private double targetTemperature;
    private boolean powerOn;

    // 3) A helper used only inside this class -> private.
    private boolean isWithinLimits(double value) {
        return value >= MIN_TEMPERATURE && value <= MAX_TEMPERATURE;
    }

    // 4) Constructor -> public: callers need to create thermostats.
    public Thermostat(double initialTarget) {
        this.powerOn = false;
        // We reuse the private helper to keep the object valid from birth.
        if (isWithinLimits(initialTarget)) {
            this.targetTemperature = initialTarget;
        } else {
            this.targetTemperature = MIN_TEMPERATURE;
        }
    }

    // 5) Behavior the user of the class is meant to call -> public interface.
    public void turnOn()  { this.powerOn = true;  }
    public void turnOff() { this.powerOn = false; }

    public double getTargetTemperature() {
        return targetTemperature;
    }

    public boolean isPowerOn() {   // boolean getter uses "is" by convention
        return powerOn;
    }
}
```

**Reading it as a client (another class):**

```java
package home.app;

import home.climate.Thermostat;

public class ControlPanel {
    public void demo() {
        Thermostat t = new Thermostat(22.0);

        t.turnOn();                         // OK: turnOn() is public
        double target = t.getTargetTemperature(); // OK: getter is public
        double limit  = Thermostat.MAX_TEMPERATURE; // OK: public static

        // t.targetTemperature = 40;        // COMPILE ERROR: field is private
        // t.isWithinLimits(50);            // COMPILE ERROR: helper is private
        // t.powerOn = false;               // COMPILE ERROR: field is private
    }
}
```

**Why each choice matters:**
- The `private` fields mean `ControlPanel` *cannot* set a nonsensical temperature — the class stays in charge.
- The `private` helper `isWithinLimits` is an implementation detail; keeping it private means we can change or delete it later without breaking any client.
- The `public` methods form the *contract* the rest of the program relies on.

---

## 5. Guided in-class practice

### Part A — Predict the error (pair work, 10 min)

Given the `Thermostat` class above, decide for each line: **compiles** or **compile error**, and *why*.

```java
Thermostat t = new Thermostat(20.0);
1)  t.turnOn();
2)  System.out.println(t.getTargetTemperature());
3)  t.targetTemperature = 25.0;
4)  System.out.println(t.powerOn);
5)  System.out.println(Thermostat.MIN_TEMPERATURE);
6)  t.isWithinLimits(20.0);
```

<details>
<summary>Answer key (reveal after attempting)</summary>

1. Compiles — `turnOn()` is `public`.
2. Compiles — `getTargetTemperature()` is `public`.
3. **Error** — `targetTemperature` is `private`; unreachable from another class.
4. **Error** — `powerOn` is `private`.
5. Compiles — `MIN_TEMPERATURE` is `public static`.
6. **Error** — `isWithinLimits` is `private`.
</details>

### Part B — Write your own (individual, 15 min)

Create a class `LibraryBook` with:

- A `private` attribute `title` (String) and a `private` attribute `available` (boolean).
- A `public static final` constant `MAX_LOAN_DAYS = 21`.
- A `private` helper method `logChange()` that prints a message (implementation detail).
- A `public` constructor that receives the title and sets `available = true`.
- `public` methods `borrow()` (sets `available = false` and calls `logChange()`), `returnBook()` (sets `available = true` and calls `logChange()`), and a `public` getter `isAvailable()`.

Then, in a separate `Main` class, write **two** lines that compile and **two** lines that would produce a compile error because of visibility, and comment why.

**Acceptance checklist:**
- [ ] All attributes are `private`.
- [ ] The constant is `public static final`.
- [ ] `logChange()` is `private`.
- [ ] The public methods form a coherent interface (borrow / return / query).
- [ ] The two intentional errors are correctly explained.

---

## 6. Cross-language note

The *principle* is universal; the *mechanism* differs:

- **Python** has no keyword-enforced access. Convention: a leading underscore `_balance` means "internal, please don't touch"; a double underscore `__balance` triggers name-mangling to discourage external access. Enforcement is by discipline, not the compiler.
- **C#** uses the same keywords (`public`, `private`, `protected`, plus `internal`) and adds first-class **properties** (`public double Balance { get; private set; }`) that combine field + accessor cleanly.
- **Java** enforces the four levels shown above at compile time.

Whatever the language, the design goal is identical: **keep data private, expose behavior.**

---

## 7. Common mistakes to avoid

- Declaring attributes `public` "to make testing easier" — this defeats encapsulation; test through the public interface instead.
- Confusing `private` (this class only) with `protected` (package + subclasses). They are not the same.
- Forgetting that Java's *default* (no modifier) is package-private, **not** public.
- Making helper methods `public` when only the class itself uses them, which enlarges the interface you must keep stable forever.

---

## 8. Wrap-up

**Key takeaways:**
1. Objects hold **state** (attributes) and **behavior** (methods).
2. Access modifiers control **visibility**: `private` < default < `protected` < `public`.
3. The safe default is **`private` for fields, `public` only for the intended interface**.
4. Restricting direct access is the *precondition* for the protection we build next session.

### Exit ticket (submit before leaving)

Answer on a card / in the LMS text box:

1. In one sentence each, define `private`, `protected`, and `public`.
2. Give one attribute from any real-world object that should be `private`, and say what could go wrong if it were `public`.
3. True or false, with a reason: "A `protected` member is visible from any class in the program."

> **Preview of Session 02:** Now that data is locked behind `private`, how do we let the outside world read and change it *safely*? Answer: **getters, setters, and validation** — coming next.
