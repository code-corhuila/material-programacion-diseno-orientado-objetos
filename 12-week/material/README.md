# Week 12 - Material: Curated readings and resources

> **Subject:** Object-Oriented Programming and Design (2026-B)
> **Unit 3 - Practical application of OOP in Java · Corte 3**
> **Topic:** Collections and data structures — `List`, `Map`, `Set` and their implementations

---

## About this space

This is a **download area** for the supporting material of Week 12. The consolidated
reading (a **PDF** compiled from the sources below) is meant to be **downloaded and read**,
not uploaded or turned in here. This folder is **not** a Moodle submission box — there is
nothing to hand in on this page. Assessed work for the week is:

- the in-class exit tickets and practices in [Session 1](../01-session/README.md) and [Session 2](../02-session/README.md), and
- the optional challenge in [/optional-activity](../optional-activity/README.md), submitted via **GitHub**.

> **Downloadable PDF:** *"Java Collections — List, Set, Map: a practical guide (Week 12)."*
> Place/keep the PDF in this folder so students can download it directly. If the PDF is not
> yet present, the annotated summaries below stand alone as the reading.

---

## 1. Primary references (start here)

### 1.1 Oracle — *The Java Tutorials: Collections trail*
**What it is:** The official, free tutorial on the Collections Framework.
**Why read it:** It is the canonical explanation of the `Collection`, `List`, `Set`, and
`Map` interfaces and their standard implementations, with runnable examples.
**Read for this week:** the "Interfaces" section (`List`, `Set`, `Map`) and the
"Implementations" section (`ArrayList`, `HashSet`, `HashMap`).
**Summary note:** Establishes the mental model that you *program to the interface*
(`List<T> x = new ArrayList<>()`), which lets you swap implementations without changing
calling code. Reinforces exactly the interface-vs-implementation distinction used in both
sessions.

### 1.2 Oracle — *Java SE API documentation* (Javadoc)
**What it is:** The authoritative reference for each class's methods and contracts.
**Why read it:** When you are unsure what a method returns (e.g., does `Map.put` return the
old value? yes), the Javadoc is the source of truth.
**Read for this week:** `java.util.List`, `java.util.Set`, `java.util.Map`,
`java.util.ArrayList`, `java.util.HashSet`, `java.util.HashMap`, and `java.util.Iterator`.
**Summary note:** Pay special attention to the class-level notes on `HashMap` and `HashSet`
about *no ordering guarantee* and the requirement that keys/elements have consistent
`hashCode()`/`equals()`.

### 1.3 Joshua Bloch — *Effective Java* (3rd edition)
**What it is:** The classic best-practices book for professional Java.
**Why read it:** The items on `equals`/`hashCode` and on generics explain *why* the rules
from Session 1 exist, with subtle failure cases.
**Read for this week:** the items *"Obey the general contract when overriding equals"*,
*"Always override hashCode when you override equals"*, and the generics items on using
typed collections.
**Summary note:** The single most important takeaway: **override `equals` and `hashCode`
together**, based on the same fields, or hash-based collections silently misbehave.

---

## 2. Focused topic notes (quick summaries)

These condensed notes mirror the PDF's structure and can be used for last-minute review.

### 2.1 `List` / `ArrayList`
- Ordered, indexed (`get(i)`), allows duplicates.
- Backed by a resizable array; fast random access and append.
- Watch the `remove(int index)` vs `remove(Object)` ambiguity for `List<Integer>`.
- Default choice for "a sequence of things where order matters."

### 2.2 `Set` / `HashSet`
- No duplicates, no index, no ordering guarantee.
- Uniqueness is decided by `equals()` + `hashCode()`.
- `LinkedHashSet` preserves insertion order; `TreeSet` keeps elements sorted.
- Default choice for "a collection of unique things."

### 2.3 `Map` / `HashMap`
- Key → value; keys unique; near-`O(1)` lookup by key.
- `put` replaces and returns the old value; `get` returns `null` if absent.
- Iterate with `keySet()`, `values()`, or `entrySet()` (prefer `entrySet` for pairs).
- Key type must have correct `equals`/`hashCode` (`String`, `Integer` already do).
- Default choice for "look things up by an id/code."

### 2.4 Iteration and safety
- Enhanced for-loop for reading; `Iterator.remove()` or `removeIf(...)` for removing.
- Modifying a collection inside a for-each throws `ConcurrentModificationException`.
- A first look at Streams: `stream().filter(...).map(...).collect(...)`.

### 2.5 `equals()` / `hashCode()` contract
- If `a.equals(b)` then `a.hashCode() == b.hashCode()`.
- Base both on the same business key (e.g., a product `code`).
- Use `Objects.equals(...)` and `Objects.hash(...)` to implement them cleanly.

---

## 3. Practice and reference tools

- **Java Visualizer / pythontutor.com (Java mode):** step through code execution to *see*
  how elements enter a `HashSet` or `HashMap` bucket. Excellent for the `equals`/`hashCode`
  intuition.
- **Local JDK + any IDE (IntelliJ IDEA Community, Eclipse, or VS Code + Java pack):** the
  best way to run every example in the sessions. All code in Week 12 is plain `java.util`,
  no external libraries needed.
- **`jshell`** (bundled with the JDK): a REPL to experiment with one-liners such as
  `new HashSet<>(List.of(1,1,2,3)).size()` without writing a full class.

---

## 4. How to use this material

1. **Before Session 1:** skim reference 1.1 (Interfaces section) and topic notes 2.1–2.2.
2. **Before Session 2:** read topic note 2.3 and the `Map` Javadoc (1.2).
3. **For the corte-3 assessment:** review all of section 2 and be able to reproduce the
   `equals`/`hashCode` contract from memory (2.5).
4. **For the optional challenge:** keep the Javadoc (1.2) open as a reference and consult
   *Effective Java* (1.3) for clean API design of your inventory class.

---

## 5. Resource index (cross-links)

| Resource | Location |
|----------|----------|
| Week overview and glossary | [`../README.md`](../README.md) |
| Session 1 — Lists & Sets | [`../01-session/README.md`](../01-session/README.md) |
| Session 2 — Maps & Inventory | [`../02-session/README.md`](../02-session/README.md) |
| Optional GitHub challenge | [`../optional-activity/README.md`](../optional-activity/README.md) |

---

*Reading list curated for CORHUILA — Object-Oriented Programming and Design (2026-B), Unit 3, Week 12.*
