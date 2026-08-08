# Week 09 - Optional activity: Refactor a media library toward composition

**Subject:** Object-Oriented Programming and Design (2026-B)
**Unit 2:** Design principles and modularity
**Topic:** Composition and code modularization (component-oriented design)
**Assessment period:** Corte 2
**Type:** Optional (bonus points) — **submitted via GitHub, NOT Moodle**

> This activity is optional. It reinforces the week's objectives (model has-a with composition, compare with inheritance, refactor away from misused inheritance) and can earn bonus points toward corte 2. All submissions are made through **GitHub** as described in section 5.

---

## 1. Problem statement

A small team built a media library. To "save time", they made everything inherit from a base `MediaItem` **and** made `MediaLibrary` extend `ArrayList<MediaItem>`. The design now suffers from every problem we studied this week: a leaky API, fragile counting logic, and a subclass explosion looming as new media types and playback behaviors appear.

Your job is to **redesign the media library using composition and delegation**, keeping inheritance only where a genuine, stable "is-a" relationship exists.

### The starting (flawed) design

```java
// FLAWED starting point — you will refactor this
public class MediaLibrary extends java.util.ArrayList<MediaItem> {
    private int playCount = 0;
    // "reuses" ArrayList storage by extending it
    public void play(int index) {
        get(index).play();
        playCount++;
    }
    public int getPlayCount() { return playCount; }
}

public class MediaItem {
    protected String title;
    protected int seconds;
    public MediaItem(String title, int seconds) { this.title = title; this.seconds = seconds; }
    public void play() { System.out.println("Playing " + title); }
}

// Variation was handled by subclassing along TWO axes: media type AND transcoding.
// So the team started creating: HDVideoItem, SDVideoItem, PodcastAudioItem,
// HDVideoItemWithSubtitles, SDVideoItemWithSubtitles, ...  -> class explosion.
```

---

## 2. Requirements

1. **Fix the container.** `MediaLibrary` must **not** extend `ArrayList`. Use **composition**: hold a `List<MediaItem>` internally and expose only a sensible API (`add`, `play`, `size`, `getPlayCount`, and a way to read total duration). Do not re-expose the entire `List` interface.
2. **Model has-a correctly.** A `MediaItem` should **have-a**:
   - a `Duration` (or equivalent) — composition (owned by the item), and
   - a **playback behavior** component (e.g., a `Renderer` / `PlaybackStrategy` object) that is **swappable at runtime** (composition of an interface).
3. **Collapse the subclass explosion.** Replace the two-axis subclass tree (media type × transcoding/subtitles) with composition of small parts. New combinations must be creatable **without adding new subclasses**.
4. **Use delegation.** `MediaLibrary.play(i)` delegates to the item; the item delegates rendering to its playback component. Point to these delegations in your README.
5. **Preserve behavior + count correctly.** `getPlayCount()` must increment exactly once per `play`, with no double-counting (contrast this with the fragile inheritance version).
6. **Keep justified inheritance (if any).** If you keep any `extends`, justify in your README why it is a true, stable "is-a" relationship. It is acceptable to use **interfaces** for the swappable behaviors.
7. **Tests.** Provide a small `main` (or unit tests) demonstrating: adding items, playing them, swapping a playback behavior at runtime, correct play count, and total duration.

---

## 3. Expected deliverable

A GitHub repository (or a folder inside your course repo) containing:

```
week09-composition/
├── src/
│   ├── MediaLibrary.java
│   ├── MediaItem.java
│   ├── Duration.java
│   ├── PlaybackStrategy.java      (interface)
│   ├── <concrete strategies>.java (e.g., StandardPlayback, SubtitledPlayback)
│   └── Demo.java                  (main with the demonstration)
├── docs/
│   └── design.md                  (see section 4)
└── README.md                      (how to compile/run + your reflection)
```

You may use another OOP language (Python, C#, TypeScript) if your instructor approves — keep the same structure and concepts.

---

## 4. What to put in `docs/design.md`

- A **UML class diagram** (image or text/ASCII) showing composition (◆), aggregation (◇ if any), and inheritance (△) relationships.
- A short **before/after** comparison: what relationships were wrong before, and what they are now.
- Explicit answers to:
  - Where is composition used, and where (if anywhere) is inheritance still justified?
  - Which behavior is swappable at runtime, and how does composition enable that?
  - How did you eliminate the subclass explosion?
  - Where exactly does delegation happen (name the methods)?

---

## 5. How to submit (GitHub — not Moodle)

1. Create a **public** GitHub repository named `poo-week09-composition-<yourLastName>` (or add a `week09-composition/` folder to your existing course repo).
2. Commit your code with clear, incremental messages (e.g., `refactor: replace ArrayList inheritance with composition`).
3. Ensure the repo `README.md` explains how to **compile and run** your demo and includes your **name and student ID**.
4. Make sure `docs/design.md` (section 4) is committed.
5. **Submit the repository URL** through the channel your instructor designated for GitHub links (course GitHub Classroom assignment, or the shared submission sheet). **Do not upload to Moodle.**
6. Suggested deadline: end of Week 09 (confirm the exact date with your instructor).

> Tip: tag your final commit (e.g., `git tag week09-final && git push --tags`) so the graded state is unambiguous.

---

## 6. Assessment criteria / rubric (100 points)

| Criterion | Excellent (full) | Acceptable (partial) | Insufficient (0) | Pts |
|---|---|---|---|---|
| **Container uses composition** | `MediaLibrary` holds a `List`, exposes a clean minimal API, no `extends ArrayList` | Uses composition but leaks some list operations | Still extends a collection | 20 |
| **Correct has-a modeling** | `MediaItem` composes `Duration` and a playback behavior; ownership/lifecycle correct | Composition present but modeling imprecise | No composition | 20 |
| **Subclass explosion removed** | New type×behavior combos need no new subclasses | Partially collapsed | Class explosion remains | 15 |
| **Runtime swappable behavior** | Playback behavior is an injected/settable component, demonstrated at runtime | Swappable but not demonstrated | Behavior hard-coded | 15 |
| **Delegation used & explained** | Delegations identified in code and `design.md` | Present but not explained | Absent | 10 |
| **Correct counting / behavior preserved** | `getPlayCount()` exact; no double-count; demo proves it | Minor issues | Incorrect | 10 |
| **Design doc & UML** | Clear diagram + before/after + justified inheritance | Incomplete doc | Missing | 10 |

**Bonus (+5):** add a second swappable axis (e.g., a `TranscodeProfile` component) and show that combining it with any playback strategy still requires **no** new subclasses — the definitive proof that composition beat the explosion.

---

## 7. Self-check before you submit

- [ ] `MediaLibrary` does **not** extend any collection.
- [ ] I can point to at least two composition relationships in my code.
- [ ] I can swap a playback behavior at runtime in my demo.
- [ ] Adding a new media type or behavior does **not** force a new subclass.
- [ ] `getPlayCount()` never double-counts.
- [ ] `docs/design.md` has a UML diagram and answers all four questions.
- [ ] The repo README explains how to compile and run, and has my name + ID.
- [ ] I submitted the **GitHub URL** (not a Moodle upload).
