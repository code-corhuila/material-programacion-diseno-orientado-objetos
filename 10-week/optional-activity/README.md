# Week 10 — Optional Activity: Redesign Challenge (GitHub Submission)

**Course:** Object-Oriented Programming and Design — CORHUILA, 2026-B
**Unit:** Unit 2 — Design principles and modularity
**Week:** 10 — Assessment Corte 2
**RAA:** `90_82759`
**Status:** Optional · Individual · Submitted via **GitHub** (not Moodle)

---

## 1. Why do this

The partial exam measures design under time pressure; this activity measures design done *well*, with room to iterate. It reinforces exactly the skills the RAA targets — coherent hierarchies, correct use of the five pillars, and justified inheritance-vs-composition decisions — while giving you a small portfolio piece and practice with a professional submission workflow (Git + GitHub). Completing it earns bonus recognition (see §7) and, more importantly, cements the Session 2 remediation habits.

---

## 2. Problem statement

You will take a deliberately **flawed** design and redesign it into a clean, modular one, then justify every structural decision.

> **Scenario — a Smart Home device platform.**
> A smart-home hub controls a growing set of devices: lights, thermostats, door locks, and cameras. The starter code (below) models this with a single deep inheritance tree and a God-class hub. It "works" but is rigid: adding a device that is both *switchable* and *recordable* (e.g., a camera with a night-light) is impossible without duplication, and the hub knows far too much.
>
> Your job: **redesign** the model so that device *capabilities* (switch on/off, set temperature, lock/unlock, record) are composable, the hub depends only on abstractions, and every relationship passes the is-a / has-a and Liskov tests.

### 2.1 Starter (flawed) code — the thing to fix

```java
// FLAWED starter — redesign this, do not merely patch it.

class Device {
    String name;
    boolean isOn;
    double temperature;      // meaningless for a door lock
    boolean isLocked;        // meaningless for a light
    void turnOn()  { isOn = true; }
    void turnOff() { isOn = false; }
    void setTemperature(double t) { temperature = t; }   // not all devices have this
    void lock()    { isLocked = true; }                  // not all devices have this
    void record()  { throw new UnsupportedOperationException(); } // refused bequest
}

class Light extends Device { }
class Thermostat extends Device { }
class DoorLock extends Device { }
class Camera extends Device {
    @Override void record() { /* actually records */ }
}

class SmartHub {
    Device[] devices;
    void turnEverythingOff() { /* loop */ }
    void saveConfigToDisk()  { /* persistence — wrong place */ }
    void renderDashboard()   { /* UI — wrong place */ }
    void sendPushAlert()     { /* notification — wrong place */ }
}
```

---

## 3. Requirements

Your redesign **must** satisfy all of the following. Each maps to a rubric line in §6.

1. **Capabilities as interfaces.** Model at least three capabilities as interfaces (e.g., `Switchable`, `TemperatureControllable`, `Lockable`, `Recordable`). A device implements only the capabilities it truly has — **no refused bequest**.
2. **Composable devices.** Demonstrate a device that combines two capabilities (e.g., a camera that is both `Switchable` and `Recordable`) without duplicating logic.
3. **Correct inheritance where it is genuine.** If you keep any inheritance, every edge must pass the is-a and Liskov tests. It is acceptable to use *no* class inheritance at all if composition serves better — justify whichever you choose.
4. **Single-responsibility hub.** The hub coordinates devices only. Persistence, UI/dashboard, and notifications must live in **separate** classes. The hub must depend on **abstractions** (capability interfaces), not concrete device classes (DIP).
5. **Polymorphism in action.** The hub must operate on a heterogeneous collection uniformly — e.g., "turn off everything switchable" iterates and dispatches polymorphically.
6. **Runnable demonstration.** A `main` (or test) that constructs several devices, registers them with the hub, and exercises each capability, producing observable output.
7. **Written justification.** A `DESIGN.md` explaining each structural decision (see §4).

---

## 4. Expected deliverable

A **public GitHub repository** containing:

```
oop-smart-home-redesign/
├── README.md            # how to build/run; one-paragraph summary of your approach
├── DESIGN.md            # the justification document (see below)
├── src/                 # your source code
│   └── ...              # capability interfaces, device classes, hub, separated concerns
└── (build file if used) # e.g., pom.xml / build.gradle / Makefile — optional
```

**`DESIGN.md` must contain:**
- A text or image UML sketch of your final model with labeled edges (inheritance / implements / composition).
- For **each** capability interface: one sentence on why it is an interface and not a subclass.
- For **at least two** relationships: an explicit is-a / has-a + Liskov justification (the Session 1 Part C style).
- One paragraph on the **trade-off** your design accepts (what it costs to gain the flexibility).
- A short "before → after" note: name at least two smells in the starter code and the refactoring move that removed each.

---

## 5. How to submit via GitHub (step by step)

> Submission is through **GitHub only**. Do **not** upload to Moodle. Post your repository URL where the instructor collects links (course channel / designated form), by the deadline announced in class.

```bash
# 1. Create the project locally
mkdir oop-smart-home-redesign && cd oop-smart-home-redesign
git init

# 2. Add your files (src/, README.md, DESIGN.md, ...)
#    ... write your code and docs ...

# 3. Commit with a clear message
git add .
git commit -m "Redesign smart-home model with composable capabilities"

# 4. Create a PUBLIC repository on github.com named:
#    oop-smart-home-redesign
#    (via the GitHub web UI: New repository -> Public)

# 5. Connect and push (replace <your-username>)
git remote add origin https://github.com/<your-username>/oop-smart-home-redesign.git
git branch -M main
git push -u origin main

# 6. Verify the repo is PUBLIC and the code is visible in the browser.
# 7. Submit the repository URL where the instructor indicated.
```

**Submission checklist:**

- [ ] Repository is **public** and the URL opens without login.
- [ ] `README.md` explains how to build/run and summarizes the approach.
- [ ] `DESIGN.md` contains the UML sketch and all required justifications.
- [ ] Code compiles and the demonstration runs.
- [ ] Commit history is meaningful (not a single "final" dump — small, described commits are rewarded).
- [ ] The repository URL is posted where the instructor collects it, before the deadline.

> **Academic integrity & privacy:** submit your own work. Do not put any personal data beyond your name in the repository. If you prefer not to make a repository public, tell the instructor in advance to arrange access to a private repository instead.

---

## 6. Assessment criteria / rubric

Scored out of 100. This is an **optional** activity; see §7 for how the score is applied.

| Criterion | Weight | Excellent (90–100%) | Acceptable (60–89%) | Insufficient (<60%) |
|---|---|---|---|---|
| **Capabilities as interfaces** | 20 | 3+ well-chosen interfaces; no refused bequest | Interfaces present but one is awkward | Capabilities crammed into a base class |
| **Composability** | 15 | A device cleanly combines 2+ capabilities | Combination works but with some duplication | No composed device demonstrated |
| **Correct is-a / Liskov** | 15 | Every edge passes both tests | One questionable edge | Inheritance misused / LSP broken |
| **SRP + DIP separation** | 15 | Hub is lean; persistence/UI/notifications separated; depends on abstractions | Mostly separated; one leak | God-class hub persists |
| **Polymorphism** | 10 | Heterogeneous collection handled uniformly and meaningfully | Present but forced | Absent |
| **Runnable demo** | 10 | Builds and runs; output clearly shows each capability | Runs with minor issues | Does not build |
| **DESIGN.md justification** | 15 | UML + per-decision reasoning + honest trade-off + before/after smells | Some justifications thin | Missing or superficial |

---

## 7. Recognition and how the score is applied

- This activity is **optional** and does **not** replace any part of the partial exam.
- A submission scoring **≥ 60%** earns bonus recognition toward the Corte 2 formative component, per the course grading policy announced by the instructor (typically applied as a small bonus, capped so the corte does not exceed its maximum).
- Beyond points, a strong `DESIGN.md` is portfolio-quality evidence of the RAA — bring it to code reviews and interviews.

---

## 8. Hints (use if stuck)

- Start from the **capabilities**, not the devices: list the verbs (on/off, set temperature, lock/unlock, record), each becomes an interface.
- A device is then "a thing that implements the capabilities it has." A `Camera` might implement `Switchable` + `Recordable`; a `Thermostat` implements `Switchable` + `TemperatureControllable`.
- The hub should hold `List<Switchable>`, `List<Recordable>`, etc., or a single `List<Device>` filtered by `instanceof`/pattern matching — either is fine if justified.
- Prefer **composition** for anything that is not a genuine is-a. If you find yourself writing an empty override or a `throw new UnsupportedOperationException()`, stop — that is a refused bequest telling you to use an interface instead.
- Keep the hub ignorant of concrete classes: it should never say `new Camera()`; devices are registered from outside (dependency injection).

---

*Related: [Week guide](../README.md) · [Session 1 (exam)](../01-session/README.md) · [Session 2 (remediation)](../02-session/README.md) · [Readings](../material/README.md).*
