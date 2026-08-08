# Week 03 - Reading material and resources (download area)

**Subject:** Object-Oriented Programming and Design | **Week:** 03 | **Unit:** 1 | **Corte:** 1
**Topic:** Attributes, methods, and encapsulation with access modifiers, getters and setters
**RAA:** 90_82759

---

> **About this area:** This is a **download area** for the week's supporting PDF and a curated list of references. It is **not** a Moodle submission box — you do not upload anything here. Download the PDF, read the curated sources, and use the summaries below to guide your study before and after class.

---

## 1. Week PDF (download)

- **File:** `week-03-encapsulation.pdf` *(place/download the compiled PDF in this folder)*
- **Contents:** a printable consolidation of Sessions 01 and 02 — the visibility table, the `Thermostat`, `BankAccount`, and `Product` examples, and the invariants/validation checklist.
- **Suggested use:** read it *before* Session 01 for a preview, and again *after* Session 02 as revision for Corte 1.

> If the PDF is not yet present in this folder, the same content is fully available in `../01-session/README.md` and `../02-session/README.md`.

---

## 2. Curated readings

The readings are ordered from most accessible to most advanced. You do **not** need to read all of them cover to cover; use the summaries to pick what closes *your* gaps.

### 2.1 Primary / essential

1. **Oracle — The Java Tutorials: "Controlling Access to Members of a Class."**
   - *What it is:* The official, concise explanation of `public`, `protected`, default, and `private`, including the exact access-level table.
   - *Why read it:* It is the authoritative source for the visibility rules used all week. Reproduce the table from memory afterwards.
   - *Read for:* Session 01.

2. **Oracle — The Java Tutorials: "Encapsulation" / "Declaring Member Variables."**
   - *What it is:* Short official notes on fields, initialization, and why to keep them private with accessor methods.
   - *Why read it:* Connects the mechanics (private fields) to the design goal (encapsulation).
   - *Read for:* Sessions 01-02.

### 2.2 Design-focused (recommended)

3. **Bloch, J. — *Effective Java* (3rd ed.), Item 15: "Minimize the accessibility of classes and members."**
   - *What it is:* A widely cited argument for making everything as private as possible.
   - *Key takeaway:* "Make each class or member as inaccessible as possible." Information hiding decouples components so they can be developed, tested, and changed in isolation.
   - *Read for:* Session 01 and the coupling discussion in Session 02.

4. **Bloch, J. — *Effective Java* (3rd ed.), Item 16: "In public classes, use accessor methods, not public fields."**
   - *What it is:* The definitive justification for getters/setters over public fields in public APIs.
   - *Key takeaway:* Public fields lock you into a representation forever; accessor methods let you change the internals without breaking clients — exactly the coupling argument from Session 02.
   - *Read for:* Session 02.

5. **Martin, R. C. — *Clean Code*, Chapter 6: "Objects and Data Structures."**
   - *What it is:* A nuanced discussion of when to hide data (objects) vs. when to expose it (data structures), and the "anemic object" anti-pattern.
   - *Key takeaway:* Do not reflexively add a getter and setter to every field; expose *behavior*, and let data hiding serve abstraction.
   - *Read for:* Session 02 (property-kind choices and anti-patterns).

### 2.3 Cross-language perspective (optional)

6. **Python docs — Classes ("Private Variables" section) / PEP 8 naming conventions.**
   - *What it is:* Explains the `_single_leading_underscore` (internal-use) and `__double_leading_underscore` (name-mangling) conventions.
   - *Key takeaway:* Python enforces encapsulation by *convention*, not by the compiler — the design intent is the same as Java's.
   - *Read for:* Session 01 cross-language note.

7. **Microsoft C# docs — "Properties" and "Access Modifiers."**
   - *What it is:* Shows C# properties (`{ get; set; }`) as syntactic sugar over getters/setters, plus `internal`.
   - *Key takeaway:* Modern languages give first-class support to the getter/setter pattern; the design principle is language-independent.
   - *Read for:* Session 01-02 cross-language note.

---

## 3. Quick-reference summaries

### Visibility cheat sheet (Java)

| Modifier | Same class | Same package | Subclass (other pkg) | Everywhere | Typical use |
|---|:---:|:---:|:---:|:---:|---|
| `private` | Yes | No | No | No | Attributes, internal helpers |
| *default* | Yes | Yes | No | No | Package-internal collaborators |
| `protected` | Yes | Yes | Yes | No | Members meant for subclasses |
| `public` | Yes | Yes | Yes | Yes | The intended interface |

### Getter/setter naming

- Getter: `getX()` — or `isX()` for `boolean`.
- Setter: `setX(value)` — with **validation inside**.
- Derived property: `getX()` that **computes** and stores nothing.

### Validation checklist for a class

- [ ] All attributes are `private` (or `protected` only if subclasses truly need them).
- [ ] The constructor rejects invalid input (born valid).
- [ ] Every setter validates before assigning (stays valid).
- [ ] Fields that should never change after construction are `final` with no setter.
- [ ] State that must obey a rule is changed only through guarded behavior methods (e.g., `deposit`/`withdraw`), not a raw setter.
- [ ] Invalid input fails fast with a clear exception message.

### One-line mantras

- "Private by default; public on purpose."
- "A setter is a gatekeeper, not an assignment."
- "Expose behavior, hide data."
- "Born valid, stay valid."

---

## 4. How this material maps to the objectives

| Objective (RAA 90_82759) | Best resource(s) |
|---|---|
| Apply `public`/`private`/`protected` | Oracle tutorial #1; cheat sheet §3 |
| Implement getters and setters safely | Bloch Item 16 (#4); §3 naming |
| Design a class that protects invariants | Session 02 notes; validation checklist §3 |
| Justify encapsulation reduces coupling | Bloch Item 15 (#3); Session 02 §6 |

---

## 5. Study plan suggestion (about 2.5 hours self-study)

1. (20 min) Read Oracle #1 and reproduce the visibility table from memory.
2. (30 min) Re-read `../01-session/README.md` and do Practice Part A/B.
3. (30 min) Read Bloch Items 15-16 summaries here; note the coupling argument.
4. (40 min) Re-read `../02-session/README.md` and do the `Product` refactor.
5. (20 min) Complete the self-check checklist in the week `README.md`.
6. (Optional) Start the GitHub activity in `../optional-activity/README.md`.

> **Note on citations:** Book page numbers vary by edition; cite the *Item number* for *Effective Java* and the *chapter* for *Clean Code*. Always link the official Oracle/Python/Microsoft pages rather than third-party mirrors.
