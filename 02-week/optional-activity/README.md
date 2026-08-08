# Week 02 — Optional Activity: Model a Real-World Entity

> **Subject:** Object-Oriented Programming and Design (2026-B) · **Unit 1** · **Corte 1**
> **Topic:** Classes and objects in Java — definition, instantiation, and object state
> **RAA:** `90_82759`
> **Type:** Optional (extra credit) · **Submission channel: GitHub — NOT Moodle**

---

## 1. Purpose

This optional activity lets you practice the whole Week 02 pipeline on an entity **you** choose: define a class, give it state and behavior, add a real constructor, instantiate several independent objects, mutate their state, and demonstrate that you understand references (including aliasing and `null`).

It is graded for **extra credit** and reinforces exactly the skills in the self-assessment checklist. Doing it well is excellent preparation for the Corte 1 evaluation.

---

## 2. Problem statement

Pick **one** real-world entity to model (choose something that clearly has both data and actions), for example:

- `LibraryBook` (title, author, available copies; borrow/return)
- `SmartphoneBattery` (level 0–100, charging?; charge/use)
- `Thermostat` (currentTemp, targetTemp; raise/lower/report)
- `PlayerCharacter` (name, health, score; takeDamage/heal/addScore)
- `Elevator` (currentFloor, doorsOpen?; goToFloor/openDoors/closeDoors)

Or propose your own entity (get a 10-second thumbs-up from the instructor). It must be different from the classes we built in class (`BankAccount`, `Car`, `Dog`, `Student`).

Your program must **tell a small story** through state changes — a short sequence of method calls that a reader can follow, ending with a printout of the final state of every object.

---

## 3. Requirements

Your submission **must** include all of the following:

1. **A model class** (e.g., `Thermostat.java`) with:
   - **at least 3 attributes** of at least two different types (e.g., a `String`, an `int`/`double`, and a `boolean`);
   - **at least 3 methods**, of which:
     - at least one **mutator** that changes state,
     - at least one **accessor**/reporter that reads or returns state,
     - at least one method that includes a **guard/validation** (e.g., clamping a value to a valid range, or refusing an invalid operation);
   - **a parameterized constructor** that uses `this` to initialize the fields.

2. **A driver class** with `main` that:
   - creates **at least 2 independent objects** (separate `new` calls);
   - performs **at least 5 method calls** that change and read state;
   - demonstrates **aliasing**: assign one object to a second reference (`b = a;`), mutate through one reference, and print through the other to show they see the same change;
   - demonstrates the **`null`** concept: either safely check for `null`, or include (in a **comment**) the exact line that would throw a `NullPointerException` and explain why. *(Do not leave a crashing line active in the final version.)*
   - prints the **final state** of every object.

3. **A `README.md`** in your repository containing:
   - a one-paragraph description of your entity and why you chose it;
   - a **state-trace table or diagram** (like the ones in Session 2) showing how one object's state evolves across your method calls;
   - the **expected output** of your program;
   - build/run instructions.

4. **Clean code:** PascalCase class names, camelCase members, meaningful names, and consistent indentation. No dead/commented-out experimental code except the single intentional `null` explanation.

---

## 4. Expected deliverable

A **public GitHub repository** (or a branch + Pull Request in a repo the instructor can access) containing:

```
oop-week02-optional/
├── README.md                 # description + state trace + expected output + how to run
└── src/
    ├── <YourEntity>.java      # the model class (with parameterized constructor)
    └── <YourDriver>.java      # the class with main()
```

The code must **compile and run** with a standard JDK (17+):

```bash
javac src/*.java -d out
java -cp out <YourDriver>
```

---

## 5. How to submit via GitHub (NOT Moodle)

> **Important:** There is no Moodle upload for this activity. Submission is the GitHub link only.

1. **Create the repository** on your GitHub account, named `oop-week02-optional` (public), and add a `README.md`.
2. **Clone and add your files:**
   ```bash
   git clone https://github.com/<your-username>/oop-week02-optional.git
   cd oop-week02-optional
   # add src/<YourEntity>.java, src/<YourDriver>.java, and complete README.md
   ```
3. **Commit with clear messages:**
   ```bash
   git add .
   git commit -m "Week 02 optional: model <YourEntity> with constructor, aliasing demo, and state trace"
   git push origin main
   ```
4. **Submit the link.** Send the instructor the repository URL by the channel announced in class (e.g., the course discussion thread). If you use a Pull Request instead, share the **PR URL** and make sure the instructor account has access.
5. **Deadline:** end of Week 02 (see the course calendar). Late optional work may receive reduced extra credit.

> **Academic integrity:** Submit your own work. You may discuss ideas with peers, but the entity choice, code, and README must be yours. Cite any external snippet you adapt.

---

## 6. Assessment criteria / rubric (100 points → extra credit)

| Criterion | Excellent (full) | Acceptable (partial) | Missing (0) | Pts |
|-----------|------------------|----------------------|-------------|-----|
| **Class design** — ≥3 attributes (2+ types), ≥3 methods, correct constructor with `this` | All present, well-named, models the entity clearly | Present but weak naming or a missing method type | Class does not meet minimums | **25** |
| **Instantiation & independent state** — ≥2 objects via separate `new`, independent state shown | Clearly demonstrated with output | Objects created but independence not shown | Only one object / not shown | **15** |
| **Aliasing demonstration** — `b = a;` then mutate/observe through different references | Correctly shown and explained in README | Shown in code but not explained | Absent or incorrect | **15** |
| **`null` / NPE understanding** — safe check or commented explanation | Accurate explanation of what is `null` and why NPE occurs | Mentioned but vague | Absent or wrong | **10** |
| **State trace** — table/diagram of state across ≥5 calls in README | Accurate, matches program output | Present but incomplete/inaccurate | Missing | **15** |
| **Correctness** — compiles and runs; output matches README | Compiles, runs, output matches | Compiles with minor mismatch | Does not compile | **10** |
| **Code quality & README clarity** — conventions, readability, clear instructions | Clean, conventional, clear | Some issues | Poor/unreadable | **10** |
| **Total** | | | | **100** |

**Grade bands (for extra-credit weighting):** 90–100 Excellent · 75–89 Good · 60–74 Satisfactory · <60 Revise and resubmit if time allows.

---

## 7. Starter template (optional)

```java
// src/Thermostat.java
public class Thermostat {
    String room;
    double currentTemp;
    double targetTemp;
    boolean heating;

    public Thermostat(String room, double currentTemp, double targetTemp) {
        this.room = room;
        this.currentTemp = currentTemp;
        this.targetTemp = targetTemp;
        this.heating = false;
    }

    void raiseTarget(double delta) {
        targetTemp = targetTemp + delta;
        if (targetTemp > 30.0) targetTemp = 30.0;   // guard/validation
        heating = currentTemp < targetTemp;
    }

    void tick() {                         // simulate one step toward the target
        if (currentTemp < targetTemp) currentTemp += 0.5;
        else if (currentTemp > targetTemp) currentTemp -= 0.5;
        heating = currentTemp < targetTemp;
    }

    void report() {
        System.out.println(room + ": " + currentTemp + "C -> target "
                           + targetTemp + "C, heating=" + heating);
    }
}
```

```java
// src/Home.java
public class Home {
    public static void main(String[] args) {
        Thermostat living = new Thermostat("Living", 18.0, 21.0);   // object 1
        Thermostat bedroom = new Thermostat("Bedroom", 19.0, 20.0); // object 2

        living.raiseTarget(2.0);
        living.tick();
        living.report();

        Thermostat alias = living;   // aliasing: same object as 'living'
        alias.tick();                // mutate through the alias ...
        living.report();             // ... visible through 'living'

        bedroom.report();            // independent object, unaffected

        // Thermostat off = null; off.report(); // <- would throw NullPointerException:
        //   'off' points to no object, so there is nothing to call report() on.
    }
}
```

Replace the entity with your own choice, expand the story, and complete your README's state-trace table.

---

## 8. Related material

- Sessions: [`../01-session/README.md`](../01-session/README.md) · [`../02-session/README.md`](../02-session/README.md)
- Reading pack: [`../material/README.md`](../material/README.md)
- Week guide: [`../README.md`](../README.md)
