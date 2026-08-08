# Week 12 - Collections and data structures: List, Map, Set and their implementations

**Program:** Object-Oriented Programming and Design
**Academic period:** 2026-B
**Unit:** Unit 3 - Practical application of OOP in Java
**Week:** 12 (Assessment period: **Corte 3**)
**Learning outcome (RAA):** 90_82759

---

## 1. Overview

By Week 12 you already know how to model a domain with classes, encapsulate state,
reuse code through inheritance, and depend on abstractions through interfaces and
polymorphism. The natural next question is: **once you have hundreds of objects, where do
you keep them, and how do you find the one you need?**

This week introduces the **Java Collections Framework (JCF)** — the standard library of
container types every professional Java developer uses daily. Instead of managing raw
arrays with manual resizing and index bookkeeping, you will learn to select and use the
three fundamental abstractions:

- **`List`** — an ordered sequence that allows duplicates (positional access).
- **`Set`** — a collection of unique elements (membership and de-duplication).
- **`Map`** — a dictionary of key → value associations (fast lookup by key).

You will also learn *why* the framework separates **interfaces** (the contract: `List`,
`Set`, `Map`) from **implementations** (the concrete class: `ArrayList`, `HashSet`,
`HashMap`), and how choosing the right one is a real design decision with measurable
performance consequences.

The week closes with a small but complete engineering deliverable: a **product inventory
backed by a `HashMap`**, which ties collections back to everything you learned about
classes, `equals`/`hashCode`, and clean design.

---

## 2. RAA and competencies addressed

**RAA 90_82759** — *Apply object-oriented programming principles in Java to build
structured, maintainable solutions to practical problems.*

This week contributes to the RAA through the following competencies:

| Competency | How it is developed this week |
|---|---|
| **Cognitive** — Understands the abstractions of the Collections Framework and their contracts | Theory on `List`/`Set`/`Map` semantics, ordering, uniqueness, and complexity |
| **Procedural** — Uses `ArrayList`, `HashSet`, and `HashMap` correctly to store and retrieve objects | Worked examples, guided practice, and the inventory exercise |
| **Analytical** — Selects the appropriate data structure for a stated requirement | Decision framework + "choose the collection" drills |
| **Attitudinal** — Writes clean, self-documenting, and testable data-management code | Rubric emphasis on naming, encapsulation, and `equals`/`hashCode` correctness |

---

## 3. Learning objectives (measurable)

By the end of Week 12, the student will be able to:

1. **Select** the appropriate collection (`List`, `Set`, or `Map`) for a given functional
   requirement, justifying the choice against at least three criteria (ordering,
   uniqueness, access pattern).
2. **Use** `ArrayList`, `HashSet`, and `HashMap` (with generics) to store, retrieve, update,
   and remove objects without compilation warnings.
3. **Iterate and manipulate** collections of objects effectively using the enhanced
   `for`, `Iterator`, and `Map` views (`keySet`, `values`, `entrySet`).
4. **Implement** a basic inventory using a `HashMap` of domain objects encapsulated inside
   a class model, exposing safe operations (add, find, update quantity, remove, total).
5. **Explain** the role of `equals()` and `hashCode()` in the correct behavior of
   hash-based collections, and override them consistently for a value object.

---

## 4. Contents outline

1. **Why collections?** — Limits of arrays; the framework's interface/implementation split.
2. **The `Collection` hierarchy** — `Iterable → Collection → {List, Set, Queue}` and the
   separate `Map` branch.
3. **`List` and `ArrayList`** — ordered, indexed, duplicates allowed; core operations and cost.
4. **`Set` and `HashSet`** — uniqueness, membership tests, de-duplication; `LinkedHashSet`
   and `TreeSet` as ordered variants.
5. **`Map` and `HashMap`** — key → value associations, lookup by key; `keySet`/`values`/
   `entrySet` views; `getOrDefault`, `putIfAbsent`, `computeIfAbsent`, `merge`.
6. **Generics with collections** — type safety, `<>` diamond, and why raw types are avoided.
7. **`equals` and `hashCode`** — the contract that makes `HashSet` and `HashMap` work.
8. **Choosing the right collection** — a practical decision framework.
9. **Case study** — an inventory system built on a `HashMap<String, Product>`.

---

## 5. Session-by-session agenda

### Session 1 — Lists, Sets, and choosing the right collection
- Motivation: arrays vs. collections; the interface/implementation idea.
- `List`/`ArrayList`: create, add, get, set, remove, iterate.
- `Set`/`HashSet`: uniqueness, `contains`, de-duplication; ordered variants.
- The role of `equals`/`hashCode` (introduction).
- Decision framework: List vs. Set.
- **Deliverable:** in-class exercises + exit ticket.

### Session 2 — Maps and a HashMap-based inventory
- `Map`/`HashMap`: put, get, `getOrDefault`, `containsKey`, remove.
- Iterating maps with `keySet`, `values`, `entrySet`.
- `computeIfAbsent`, `merge` for counting and grouping.
- Case study: designing and building a `Product` + `Inventory` model.
- **Deliverable:** working inventory + exit ticket; setup for the optional GitHub activity.

---

## 6. Key-concepts glossary

| Term | Definition |
|---|---|
| **Collections Framework (JCF)** | The standard Java library of container interfaces and implementations found in `java.util`. |
| **Interface (of a collection)** | The abstract contract describing *what* a collection does (`List`, `Set`, `Map`) without committing to *how*. |
| **Implementation** | A concrete class that realizes a collection interface (`ArrayList`, `HashSet`, `HashMap`). |
| **`List`** | An ordered collection (a sequence) that permits duplicate elements and positional (index) access. |
| **`ArrayList`** | A `List` backed by a resizable array; fast random access, fast append. |
| **`Set`** | A collection that contains no duplicate elements. |
| **`HashSet`** | A `Set` backed by a hash table; near-constant-time `add`/`contains`, no ordering guarantee. |
| **`Map`** | An object that maps unique keys to values; not a `Collection` but part of the framework. |
| **`HashMap`** | A `Map` backed by a hash table; near-constant-time `get`/`put`, no ordering guarantee. |
| **Key / Value** | In a `Map`, the identifier used for lookup (key) and the associated data (value). |
| **Entry** | A single key→value pair (`Map.Entry`). |
| **Generics** | Type parameters (e.g., `List<Product>`) that give collections compile-time type safety. |
| **`equals()`** | Method defining logical equality between two objects. |
| **`hashCode()`** | Method returning an `int` bucket hint used by hash-based collections; must be consistent with `equals`. |
| **Iterator** | An object that traverses a collection one element at a time and can safely remove during traversal. |
| **View** | A live collection backed by another structure (e.g., `map.keySet()`), reflecting changes both ways. |
| **Time complexity (Big-O)** | Notation describing how an operation's cost grows with the number of elements. |

---

## 7. Achievement / self-check checklist

Tick each item once you can do it **without looking at notes**:

- [ ] I can explain the difference between a collection *interface* and its *implementation*.
- [ ] I can declare and populate an `ArrayList<T>` and access elements by index.
- [ ] I can use a `HashSet<T>` to remove duplicates and test membership with `contains`.
- [ ] I can state, for a given requirement, whether a `List`, `Set`, or `Map` fits best — and why.
- [ ] I can create a `HashMap<K,V>`, put and get entries, and use `getOrDefault`.
- [ ] I can iterate a map with `entrySet()` and print each key and value.
- [ ] I can override `equals()` and `hashCode()` consistently for a value object.
- [ ] I can build a small `Inventory` class that stores `Product` objects in a `HashMap`.
- [ ] I can explain why using a raw type (`List` without `<>`) is discouraged.

---

## 8. Resources index

| Resource | Location | Purpose |
|---|---|---|
| Session 1 notes | [`01-session/README.md`](01-session/README.md) | Lists, Sets, and how to choose |
| Session 2 notes | [`02-session/README.md`](02-session/README.md) | Maps and the HashMap inventory |
| Reading & download area | [`material/README.md`](material/README.md) | Curated readings + PDF download |
| Optional activity | [`optional-activity/README.md`](optional-activity/README.md) | Extra practice submitted via GitHub |

### External references (authoritative)
- Oracle, *The Java Tutorials — Collections*: https://docs.oracle.com/javase/tutorial/collections/
- Oracle, *Java SE API — `java.util` package summary*: https://docs.oracle.com/en/java/javase/17/docs/api/java.base/java/util/package-summary.html
- Bloch, J. *Effective Java* (3rd ed.), Items 10–11 (`equals`/`hashCode`) and Item 64 (refer to objects by their interfaces).

---

## 9. Assessment note (Corte 3)

Week 12 belongs to the **third assessment period (corte 3)**. The in-class exit tickets are
formative (feedback only). The **optional GitHub activity** is a graded enrichment task; its
rubric is defined in [`optional-activity/README.md`](optional-activity/README.md). Bring a
laptop with JDK 17+ and an IDE (IntelliJ IDEA, Eclipse, or VS Code with the Java extension pack).
