# Week 09 - Optional activity: "Refactor the game characters to composition"

**Subject:** Object-Oriented Programming and Design (2026-B)
**Unit 2 - Design principles and modularity | Corte 2**
**Topic:** Composition and code modularization (component-oriented design)
**RAA:** 90_82759
**Type:** Optional practice (bonus + formative feedback)
**Submission channel:** **GitHub** (a repository link) — **NOT Moodle**

---

> This activity is **optional**. It gives you bonus credit toward Corte 2 and, more importantly,
> real practice with the skill the quiz measures: replacing inappropriate inheritance with
> composition. You will submit a **link to a GitHub repository** (see §5), not a Moodle upload.

---

## 1. Context / problem statement

A small game studio built its character system with inheritance. It started simple:

```java
class Character {
    protected String name;
    protected int health;
    void attack()  { System.out.println(name + " swings a sword.");   }
    void defend()  { System.out.println(name + " raises a shield.");  }
    void heal()    { System.out.println(name + " casts a heal spell."); }
}

class Warrior extends Character { /* uses sword attack, shield defend */ }

class Mage extends Character {
    @Override void attack() { System.out.println(name + " throws a fireball."); }
    @Override void defend() { throw new UnsupportedOperationException("Mages have no shield."); }
    // heal() inherited — fine
}

class Archer extends Character {
    @Override void attack() { System.out.println(name + " shoots an arrow."); }
    @Override void defend() { throw new UnsupportedOperationException("Archers dodge, no shield."); }
    @Override void heal()   { throw new UnsupportedOperationException("Archers can't heal."); }
}
```

The design is now painful:

- Several subclasses **throw exceptions** for abilities they don't have → **Liskov Substitution
  Principle violations** (client code that calls `defend()` on any `Character` can crash).
- Adding a **"Paladin" who attacks with a sword AND can heal**, or a **"Battlemage" who throws
  fireballs AND raises a shield**, would require yet more subclasses or copy-pasted overrides —
  a **combinatorial explosion**.
- Behaviors can't change at **runtime** (a warrior who picks up a magic staff can't start
  throwing fireballs without becoming a different class).

Your job is to **refactor this design to composition**, so that a character's abilities are
**pluggable components** that can be mixed freely and swapped at runtime.

---

## 2. Requirements

### Functional requirements
1. Model the three varying abilities as **components behind interfaces**:
   - `AttackBehavior` with implementations `SwordAttack`, `FireballAttack`, `ArrowAttack`.
   - `DefendBehavior` with implementations `ShieldDefend`, `DodgeDefend`, `NoDefend`.
   - `HealBehavior` with implementations `SpellHeal`, `NoHeal`.
2. Create a single, **non-abstract** `Character` class that **has-a** each behavior (composition)
   and **delegates** `attack()`, `defend()`, `heal()` to them. No exceptions for "missing"
   abilities — use a *null-object* style implementation (`NoDefend`, `NoHeal`) instead.
3. Inject the behaviors through the **constructor** (dependency injection).
4. Provide setter(s) so at least one behavior can be **changed at runtime** (e.g.,
   `character.setAttackBehavior(new FireballAttack())`).
5. Demonstrate, in a `main`/demo, at least:
   - a `Warrior`-style character (sword + shield + no heal),
   - a `Mage`-style character (fireball + dodge + spell heal),
   - a **new combination impossible in the old design** (e.g., a Paladin: sword + shield + spell
     heal) created **without adding any new subclass**,
   - a **runtime behavior swap** (a character that changes its attack mid-demo).

### Non-functional / quality requirements
- No behavior class may throw `UnsupportedOperationException`.
- The `Character` class must not expose its internal behavior objects directly in a way that
  breaks encapsulation (delegation only).
- Include at least **two automated tests** (JUnit or your language's equivalent) proving:
  (a) delegation works (the right behavior is invoked), and
  (b) LSP is preserved (any character can be used wherever a `Character` is expected without
  throwing).
- A `README.md` in your repo explaining the design (see deliverable).

> Language: **Java** is recommended (matches the course), but Python, C#, or TypeScript are
> accepted as long as the design maps cleanly to the same concepts.

---

## 3. Suggested design (UML, ASCII)

```
                         ┌──────────────────────────────┐
                         │           Character          │
                         ├──────────────────────────────┤
                         │ - name : String              │
                         │ - attack  : AttackBehavior   │◆── has-a
                         │ - defend  : DefendBehavior   │◆── has-a
                         │ - heal    : HealBehavior     │◆── has-a
                         ├──────────────────────────────┤
                         │ + attack() / defend() / heal()│  (delegate)
                         │ + setAttackBehavior(...)      │  (runtime swap)
                         └──────────────────────────────┘
             ┌──────────────┼───────────────┬────────────────┐
   «interface»           «interface»     «interface»
  AttackBehavior        DefendBehavior   HealBehavior
   ▲   ▲   ▲              ▲    ▲   ▲        ▲      ▲
   │   │   │              │    │   │        │      │
SwordA FireA ArrowA   Shield Dodge No    SpellHeal NoHeal
```

---

## 4. Expected deliverable

A **public GitHub repository** containing:

```
oop-week09-composition/
├── src/                     # your source code (behaviors, Character, demo)
├── test/                    # at least two automated tests
└── README.md                # design explanation (see below)
```

Your repository `README.md` must include:
1. A short description of the original problem and *why* the old inheritance design was flawed
   (name the specific smells: LSP violations, combinatorial explosion, no runtime change).
2. Your new UML (ASCII is fine) and a one-paragraph justification of "favor composition over
   inheritance" as applied here.
3. How to **build and run** the demo and the tests.
4. A short reflection (3–5 sentences): what became easier, and one trade-off you accepted
   (e.g., more small classes).

---

## 5. How to submit (via GitHub, not Moodle)

1. Create a **new public repository** named `oop-week09-composition` (or fork the course starter
   repo if one is provided).
2. Commit your work with clear, incremental messages, e.g.:
   ```
   git init
   git add .
   git commit -m "Refactor character abilities to composition (behaviors + delegation)"
   git branch -M main
   git remote add origin https://github.com/<your-username>/oop-week09-composition.git
   git push -u origin main
   ```
3. Make sure the repository is **public** (or that your instructor's GitHub user is added as a
   collaborator if you keep it private).
4. **Submit the repository URL** through the channel your instructor indicated for GitHub links
   (the class GitHub Classroom assignment, a shared spreadsheet, or by message). Do **not** upload
   a ZIP to Moodle for this activity.
5. Deadline: end of Week 09 (see the course calendar for the exact date/time). Late but complete
   submissions still receive formative feedback.

> **Academic integrity:** the design and code must be your own (or your declared pair's). You may
> discuss ideas, but copied repositories will not receive credit. Cite any reference you adapted.

---

## 6. Assessment criteria / rubric (100 points)

| Criterion | Excellent (full) | Acceptable (partial) | Insufficient (0) | Pts |
|-----------|------------------|----------------------|------------------|-----|
| **Correct use of composition & delegation** | `Character` has-a each behavior and delegates cleanly; no inheritance for the varying abilities. | Composition present but some delegation is awkward or leaks internals. | Still relies on inheritance / overriding for abilities. | 25 |
| **LSP restored (no exceptions)** | Null-object behaviors (`NoDefend`, `NoHeal`) used; no `UnsupportedOperationException`; any character substitutable. | Mostly fixed but one place still throws or special-cases. | LSP still violated (throws for missing abilities). | 20 |
| **Dependency injection & runtime swap** | Behaviors injected via constructor; at least one behavior swappable at runtime and demonstrated. | Injection present but no runtime swap demonstrated. | Behaviors hard-coded internally. | 15 |
| **New combination without new subclass** | Demonstrates a mix (e.g., Paladin) impossible in the old design, with no new subclass. | Attempts it but requires an unnecessary subclass. | Not demonstrated. | 10 |
| **Automated tests** | ≥2 meaningful tests: delegation + LSP/no-throw, all passing. | 1 test, or tests are shallow. | No tests. | 15 |
| **Documentation & justification (README)** | Clear problem analysis, UML, "favor composition" justification, run steps, reflection. | Present but incomplete or vague. | Missing or trivial. | 10 |
| **Code quality & Git hygiene** | Readable code, good names, sensible commits, public repo builds/runs. | Minor issues (naming, one large commit). | Does not build / not accessible. | 5 |
| | | | **Total** | **100** |

**Bonus (+5):** add a third attack or defend behavior *without modifying any existing class*
(demonstrating the Open/Closed benefit of composition).

---

## 7. Hints

- Start from the interfaces, then write the `NoDefend`/`NoHeal` **null objects** — they are the
  key to killing the LSP violations.
- Keep `Character` tiny: constructor stores the three behaviors; `attack()/defend()/heal()` are
  one-liners that delegate.
- For the runtime-swap test, assert behavior *before and after* calling the setter.
- Re-read [Session 2 §4](../02-session/README.md) — this activity is the `Penguin`/`Duck`
  refactoring at a slightly larger scale.
