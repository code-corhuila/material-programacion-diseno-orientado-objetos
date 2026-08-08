# Week 08 - Optional activity: Modeling a media library with abstraction

**Subject:** Object-Oriented Programming and Design | **Unit 2** | **Corte 2**
**Topic:** Abstract classes and interfaces
**Type:** Optional (bonus) - individual or pairs
**Submission:** **GitHub repository** (NOT Moodle)
**Estimated effort:** 3-5 hours

> This activity is **optional** and awards **bonus points** toward corte 2. It deepens the RAA
> (90_82759) evidence by asking you to design and justify a hierarchy that **combines an abstract
> class, interfaces, and concrete classes** on a fresh problem.

---

## 1. Problem statement

You are building the domain model for a **digital media library** (think of a small streaming/library
app). The library stores different kinds of media items and lets the user *play* them, some can be
*downloaded* for offline use, and some can be *rated*. The catalog must be easy to extend with new
media types **without modifying existing code**.

Your job is to model this with the abstraction tools from Week 08 and demonstrate the design with a
runnable program.

### The domain

- Every media item has a **title**, a **creator/author**, and a **duration in seconds** (shared
  state). Every item can report a `summary()` line (shared behavior). But how an item **describes
  itself in detail** depends on its type.
- Media types to implement (at least these three):
  - **`Song`** - has an album and a genre.
  - **`Podcast`** - has an episode number and a show name.
  - **`AudioBook`** - has a narrator and a chapter count.
- Capabilities that cut across types:
  - **`Playable`** - `play()` starts playback (all media are playable).
  - **`Downloadable`** - `download()` / `long sizeInBytes()` (only some items support offline).
  - **`Rateable`** - `rate(int stars)` / `double averageRating()` (only some items allow ratings).

Not every media type has every capability — that is the point. Choose sensible assignments and be
ready to justify them.

---

## 2. Requirements

Your solution **must** include:

1. **An abstract class** (e.g., `MediaItem`) that:
   - holds the shared state (`title`, `creator`, `durationSeconds`) via a constructor,
   - provides at least one **concrete** method that reuses an abstract one (Template Method style,
     e.g., `summary()` calling the abstract `details()`),
   - declares at least one **abstract** method (e.g., `String details()`).
   - It must be genuinely non-instantiable (demonstrate the compile error in your README, commented).

2. **At least two interfaces** from the capability list above (`Playable` is required; include at
   least one of `Downloadable` / `Rateable`). Each interface is a pure contract.
   - At least one interface must include a **default method** used by the program.
   - At least one interface must have **two independent implementers** to prove decoupling.

3. **At least three concrete classes** (`Song`, `Podcast`, `AudioBook`) that `extends MediaItem` and
   `implements` an appropriate mix of interfaces. At least one concrete class must implement **two or
   more** interfaces.

4. **A service/driver class** (e.g., `LibraryApp` with `main`) that:
   - stores items in a `List<MediaItem>`,
   - iterates polymorphically and prints each `summary()`,
   - uses `instanceof` (or pattern matching) to invoke capability methods only on items that have
     them (e.g., download all `Downloadable` items and sum their sizes),
   - depends on **abstract types and interfaces**, never on a concrete type inside its logic where a
     supertype would do.

5. **Correct use of `@Override`, encapsulation** (private fields, meaningful constructors), and
   **input validation** (e.g., negative duration or out-of-range star rating throws
   `IllegalArgumentException`).

6. **Extensibility proof:** add a **fourth** media type (e.g., `LiveStream`) **without editing any
   existing class**, and show that the driver still works. Describe this in your README as evidence of
   the Open/Closed Principle.

---

## 3. Expected deliverable

A **public GitHub repository** containing:

```
media-library/
├── src/
│   ├── MediaItem.java            (abstract class)
│   ├── Playable.java             (interface)
│   ├── Downloadable.java         (interface)
│   ├── Rateable.java             (interface, if used)
│   ├── Song.java                 (concrete)
│   ├── Podcast.java              (concrete)
│   ├── AudioBook.java            (concrete)
│   ├── LiveStream.java           (the extensibility proof)
│   └── LibraryApp.java           (driver with main)
├── docs/
│   └── design.md  (or a UML/text diagram image)
└── README.md
```

Your repository **README.md** must include:

- **How to compile and run** (e.g., `javac src/*.java -d out` then `java -cp out LibraryApp`).
- The **expected console output** of your driver.
- A **text or UML class diagram** of your hierarchy (ASCII is fine; a picture is better).
- A **design justification (150-300 words)** answering:
  - Why is `MediaItem` an abstract class and not an interface?
  - Why are `Playable` / `Downloadable` / `Rateable` interfaces and not part of the base class?
  - Which class implements more than one interface, and why is that appropriate?
  - How does your fourth type demonstrate the Open/Closed Principle?

---

## 4. Submission instructions (GitHub, not Moodle)

1. Create a **new public repository** named `oop-week08-media-library` on your own GitHub account.
2. Commit your code with **clear, incremental commit messages** (at minimum: initial model, add
   interfaces, add concrete types, add extensibility proof, docs). A single "final commit" scores
   lower on the process criterion.
3. Ensure the project **compiles and runs** from a clean clone (test it: clone into a fresh folder
   and follow your own README).
4. Add a top-level `README.md` as described in Section 3.
5. **Submit by pasting your repository URL** where the instructor indicates (course channel /
   spreadsheet). Do **not** upload a ZIP to Moodle — the deliverable is the live GitHub repo, so its
   history and structure can be reviewed.
6. Deadline: end of Week 08 (see the course calendar for the exact date/time for corte 2 bonus work).

> Reminder: keep the repository **public** so it can be graded, and make sure your name(s) and student
> ID(s) appear in the README. If working in a pair, both names must be listed and both must have
> commits.

---

## 5. Assessment criteria / rubric (100 points; scaled to bonus)

| Criterion | Excellent (full) | Acceptable (partial) | Insufficient (0) | Pts |
|---|---|---|---|---|
| **Abstract class design** | Non-instantiable base with shared state + Template-Method concrete method reusing an abstract method. | Base class present but weak (little shared behavior, or trivial abstract method). | No abstract class or misuse. | 20 |
| **Interfaces as contracts** | ≥2 well-named interfaces; at least one default method; ≥1 interface with two independent implementers. | Interfaces present but no default method or only one implementer. | Interfaces missing or used as data holders. | 20 |
| **Concrete classes & correct implementation** | ≥3 concrete classes; at least one implements ≥2 interfaces; all abstract methods correctly overridden; compiles. | Minor gaps (e.g., only one interface per class) but compiles. | Does not compile or contracts unfulfilled. | 15 |
| **Polymorphic, decoupled driver** | Driver works on supertypes; capability checks used correctly; no needless concrete coupling. | Works but with unnecessary concrete dependencies or `instanceof` misuse. | Type-switch ladder / no polymorphism. | 15 |
| **Extensibility (OCP proof)** | Fourth type added with zero edits to existing classes; explained in README. | Fourth type added but required small edits elsewhere. | No extensibility demonstration. | 10 |
| **Encapsulation & validation** | Private fields, clean constructors, input validation with exceptions. | Mostly encapsulated, partial validation. | Public fields / no validation. | 5 |
| **Design justification** | Clear 150-300 word rationale answering all four prompts with correct vocabulary. | Present but shallow or misses a prompt. | Missing or incorrect. | 10 |
| **Repository & process** | Public repo, clear README with run steps + expected output + diagram, meaningful incremental commits. | Repo works but thin README or single commit. | Repo missing/private or unrunnable. | 5 |

**Total: 100 points.** Grading favors *correct modeling decisions and their justification* over sheer
volume of code. A small, clean, well-argued design beats a large, tangled one.

---

## 6. Hints and common pitfalls

- If you find yourself writing `if (item instanceof Song) ... else if (item instanceof Podcast) ...`
  to compute something every item can do, that behavior probably belongs as an **abstract method** on
  `MediaItem` instead.
- Do **not** put `download()` on `MediaItem` "just in case" — a `LiveStream` may not be downloadable.
  Capabilities that only *some* types have belong in **interfaces**.
- A `default` method is ideal for behavior derived from the contract (e.g., `Rateable` could default
  `boolean isHighlyRated()` to `averageRating() >= 4.0`).
- Prefer immutable shared state (`final` fields set in the constructor) where it makes sense.
- Test the "cannot instantiate" rule yourself: temporarily write `new MediaItem(...)`, read the
  compiler error, then delete it and quote the error in your design notes.
