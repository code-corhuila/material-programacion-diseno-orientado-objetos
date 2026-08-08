# Week 07 - Optional Activity

## Polymorphic Media Library (Dynamic Dispatch in Practice)

**Unit 2 - Design principles and modularity | Corte 2 | RAA 90_82759**

> **Optional and formative.** This activity is not required to pass the week, but completing
> it strengthens your grasp of overriding and dynamic dispatch and gives you feedback before
> the corte 2 assessment. **Submission is via GitHub, not Moodle.**

---

## 1. Problem statement

You will build a small **media library** that stores different kinds of media items —
books, audiobooks, movies, and podcast episodes — and processes them **polymorphically**.
All items share a common supertype, but each computes some values differently (for example,
how long it takes to consume the item, and how it should be displayed in a catalog line).

The whole point of the exercise: **the code that iterates over the library must not know or
test which concrete type each item is.** New media types must be addable without editing the
processing routines. If you find yourself writing `instanceof` or a `switch` on the type,
stop and move that logic into an overridden method.

---

## 2. Requirements

### 2.1 Domain model (the hierarchy)

Create an abstract supertype `MediaItem` with at least:

- Fields common to all media: `title` (String) and `contributor` (String — author, director, or host).
- An **abstract** method `int durationMinutes()` — each subtype computes its consumption time.
- An **overridable** method `String catalogLine()` with a sensible default that uses
  `durationMinutes()` (a *template method* that subclasses may extend via `super`).
- An **overridable** hook `String category()` returning a default like `"general"`.

Create **at least four** concrete subclasses, each **overriding** what it must, all using the
`@Override` annotation:

| Subclass | Extra fields | `durationMinutes()` rule (example) |
|----------|--------------|-------------------------------------|
| `Book` | `int pages` | pages read at ~2 minutes/page |
| `Audiobook` | `int narratedMinutes` | the narrated length directly |
| `Movie` | `int runtimeMinutes` | the runtime directly |
| `PodcastEpisode` | `int episodeMinutes`, `boolean hasAds` | episode length, +10% if it has ads |

(You may adjust the exact formulas, but each subtype must genuinely differ.)

### 2.2 Polymorphic processing routines

Write a class `MediaLibrary` holding a `List<MediaItem>` and these routines, **each with a
single loop and no type tests**:

1. `int totalDurationMinutes()` — sum of `durationMinutes()` across all items.
2. `void printCatalog()` — print `catalogLine()` for every item.
3. `List<MediaItem> longerThan(int minutes)` — filter by `durationMinutes()`.
4. `Map<String, Integer> minutesByCategory()` — group total minutes by `category()`.

### 2.3 Demonstrate dynamic dispatch and Open/Closed

- In a `main` method, populate the library with a mix of all four subtypes and call every
  routine.
- Add a **fifth** media type (e.g., `Documentary` or `Comic`) **without modifying any routine
  in `MediaLibrary` or the `MediaItem` base class** except to add the new item to the list.
  Note in your README that the routines were untouched.

### 2.4 Constraints (must hold)

- No `instanceof` and no `switch`/`if` on an object's type anywhere in the processing routines.
- Every override uses `@Override` (or your language's mandatory keyword).
- At least one subclass uses `super.catalogLine()` to **extend** the base behavior rather than
  fully replace it.
- Code compiles and runs with a single documented command.

### 2.5 Language

Java is recommended (matches the session examples), but **C#, C++, Kotlin, or Python are
accepted**. If you use Python, demonstrate the same idea via method overriding on a common
base class and note where duck typing changes the picture.

---

## 3. Expected deliverable

A **public GitHub repository** containing:

```
media-library/
├── src/                      # your source files
│   ├── MediaItem.(java|cs|py|...)
│   ├── Book.(...)
│   ├── Audiobook.(...)
│   ├── Movie.(...)
│   ├── PodcastEpisode.(...)
│   └── Main.(...)            # or an equivalent entry point
├── README.md                 # see required contents below
└── (build file if applicable: pom.xml / build.gradle / .csproj / none)
```

Your repository `README.md` **must** include:

1. **How to build and run** (exact commands).
2. **Sample output** (paste the console output of `main`).
3. A short section **"Where dynamic dispatch happens"** — point to the exact line(s) where a
   supertype reference calls an overridden method, and name the static type and the possible
   dynamic types.
4. A short section **"Proving Open/Closed"** — describe the fifth type you added and confirm
   which routines you did *not* have to change.

---

## 4. How to submit (via GitHub — NOT Moodle)

1. **Create a new public repository** on GitHub named `oop-week07-media-library`.
2. Initialize it locally and add your code:
   ```bash
   git init
   git add .
   git commit -m "Week 07: polymorphic media library"
   git branch -M main
   git remote add origin https://github.com/<your-username>/oop-week07-media-library.git
   git push -u origin main
   ```
3. **Commit hygiene:** make at least **three meaningful commits** (e.g., "add MediaItem base",
   "add subclasses with overrides", "add polymorphic routines + fifth type"). A single
   "final" commit loses points on the process criterion.
4. **Tag your submission:** create a tag so the graded state is unambiguous.
   ```bash
   git tag week07-submission
   git push origin week07-submission
   ```
5. **Submit the link:** paste the repository URL where the instructor indicated (course
   channel / shared sheet). **Do not upload a ZIP to Moodle** — the GitHub URL is the
   deliverable.

> **Deadline:** end of Week 07 (see the course calendar for the exact date/time of corte 2).
> **Academic integrity:** the work must be your own. You may discuss ideas, but code must be
> written by you; cite any snippet you adapted from documentation.

---

## 5. Assessment criteria / rubric (100 points)

| Criterion | Excellent (full) | Acceptable (partial) | Insufficient (0) | Pts |
|-----------|------------------|----------------------|------------------|-----|
| **Correct overriding** — valid overrides with `@Override`; at least one uses `super`. | All subtypes override correctly; `super` used to extend; compiles clean. (25) | Overrides work but `@Override`/`super` missing or misused. (12) | Overrides absent or broken. (0) | 25 |
| **Polymorphic processing** — routines use a single loop over the supertype, no type tests. | All four routines polymorphic; zero `instanceof`/type `switch`. (25) | Mostly polymorphic but 1-2 type tests remain. (12) | Type ladders drive behavior. (0) | 25 |
| **Dynamic dispatch explained** — README correctly identifies where dispatch occurs and the static vs. dynamic types. | Precise, correct explanation with line references. (15) | Present but vague or partly wrong. (7) | Missing or incorrect. (0) | 15 |
| **Open/Closed demonstrated** — a fifth type added without touching the routines. | Fifth type added; README confirms untouched routines. (15) | Fifth type added but some routine edited unnecessarily. (7) | Not demonstrated. (0) | 15 |
| **Build, run, and correctness** — compiles and runs with documented command; sample output included and plausible. | Runs first try; output pasted and correct. (10) | Runs with minor fixes; output partial. (5) | Does not compile/run. (0) | 10 |
| **Repository & process** — public repo, ≥3 meaningful commits, submission tag, clear README. | All present and clean. (10) | Repo present but weak history or missing tag. (5) | No usable repo. (0) | 10 |
| **Total** | | | | **100** |

**Passing this optional activity:** 60/100. **Distinction:** 85/100 with all constraints in §2.4 satisfied.

---

## 6. Self-check before you submit

- [ ] Every processing routine is a single loop with no `instanceof`/type `switch`.
- [ ] Every override carries `@Override` (or the mandatory keyword) and the code compiles.
- [ ] At least one override calls `super.catalogLine()`.
- [ ] A fifth media type was added and the routines were **not** modified.
- [ ] README explains where dynamic dispatch happens and includes sample output.
- [ ] Repo is public, has ≥3 meaningful commits, and the `week07-submission` tag is pushed.
- [ ] I submitted the **GitHub URL** (not a Moodle upload).

---

## 7. Extension ideas (for the curious — ungraded)

- Add a `Comparable<MediaItem>` ordering by `durationMinutes()` and sort the catalog
  polymorphically.
- Introduce an interface (e.g., `Downloadable`) implemented by only some subtypes and process
  those uniformly — a preview of Week 08.
- Replace one subtype's behavior with a *Strategy* object injected at construction, and
  discuss how it relates to overriding.
