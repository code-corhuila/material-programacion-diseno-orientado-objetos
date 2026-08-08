# Week 12 - Collections and data structures: List, Map, Set and their implementations

> **Subject:** Object-Oriented Programming and Design
> **Program period:** 2026-B
> **Unit:** Unit 3 - Practical application of OOP in Java
> **Assessment period:** Corte 3 (third grading cut)
> **Learning outcome (RAA):** `90_82759`

---

## 1. Overview

Up to this point in the course you have modeled the real world with **classes, objects,
attributes, and behavior**, and you have organized responsibilities with **encapsulation,
inheritance, and polymorphism**. But real programs rarely deal with a single object at a
time. A store has *many* products, a classroom has *many* students, a game has *many*
enemies on screen. This week we learn how Java lets us **store, organize, search, and
manipulate groups of objects** using the **Java Collections Framework (JCF)**.

By the end of the week you will be able to look at a requirement — "I need a list of
orders", "I need to guarantee there are no duplicate emails", "I need to look up a product
by its code instantly" — and confidently pick the *right* data structure (`List`, `Set`,
or `Map`) and its most common implementation (`ArrayList`, `HashSet`, `HashMap`).

This is a corte-3 week: the content here is directly assessable and feeds into the
practical inventory project that closes Unit 3.

---

## 2. RAA and competencies addressed

| Code | Description |
|------|-------------|
| **RAA `90_82759`** | The student applies object-oriented programming principles in Java to solve practical problems, selecting and using appropriate data structures to manage collections of objects. |

**Competencies developed this week**

- **Cognitive:** Distinguish the semantic contract of `List`, `Set`, and `Map` and reason about when each is appropriate.
- **Procedural:** Implement and manipulate `ArrayList`, `HashSet`, and `HashMap` in Java, including iteration, insertion, removal, and lookup.
- **Design:** Combine collections with custom classes to model non-trivial domains (e.g., an inventory), and understand the role of `equals()`/`hashCode()` in correct collection behavior.
- **Attitudinal:** Value code clarity and the reuse of standard library abstractions over reinventing data structures.

---

## 3. Learning objectives (measurable)

By the end of Week 12 the student will be able to:

1. **Select** the appropriate collection type (`List`, `Set`, or `Map`) for a given requirement, justifying the choice in terms of ordering, duplicates, and access pattern.
2. **Use** `ArrayList`, `HashSet`, and `HashMap` to store and retrieve objects, applying generics correctly (e.g., `List<Product>`, `Map<String, Product>`).
3. **Iterate and manipulate** collections of objects effectively using enhanced for-loops, iterators, and (introductory) Stream operations, without causing `ConcurrentModificationException`.
4. **Implement** a basic inventory as a class that internally uses a `HashMap` of objects, exposing safe operations (add, remove, find, update quantity, list all).
5. **Explain** the role of `equals()` and `hashCode()` in the correct functioning of hash-based collections and override them appropriately in a domain class.

---

## 4. Contents outline

1. **The Collections Framework at a glance**
   - Why collections exist; arrays vs. collections
   - The core interfaces: `Collection`, `List`, `Set`, `Map` (note: `Map` is *not* a `Collection`)
   - Generics recap: `<E>`, `<K,V>`, type safety, autoboxing
2. **`List` and `ArrayList`**
   - Ordered, indexed, allows duplicates
   - Core operations: `add`, `get`, `set`, `remove`, `size`, `contains`, `indexOf`
   - `ArrayList` vs `LinkedList` (brief)
3. **`Set` and `HashSet`**
   - Uniqueness, no positional access, unordered
   - The role of `equals()` and `hashCode()`
   - `HashSet` vs `LinkedHashSet` vs `TreeSet` (brief)
4. **`Map` and `HashMap`**
   - Key → value association, keys unique
   - Core operations: `put`, `get`, `getOrDefault`, `containsKey`, `remove`, `keySet`, `values`, `entrySet`
   - `HashMap` vs `TreeMap` vs `LinkedHashMap` (brief)
5. **Iteration and manipulation**
   - Enhanced for-loop, `Iterator`, `Iterator.remove()`
   - `forEach` + lambda; a first look at Streams (`filter`, `map`, `collect`)
   - Avoiding `ConcurrentModificationException`
6. **Applied design: the inventory model**
   - A `Product` class + an `Inventory` class backed by `HashMap<String, Product>`
   - Safe API design and defensive copying

---

## 5. Session-by-session agenda

| Session | Focus | Deliverable at the end |
|---------|-------|------------------------|
| **[Session 1](./01-session/README.md)** | Foundations: `List`/`ArrayList` and `Set`/`HashSet`, iteration, and `equals()`/`hashCode()` | Working code that stores and de-duplicates objects |
| **[Session 2](./02-session/README.md)** | `Map`/`HashMap`, choosing the right collection, and building an `Inventory` class | A functioning in-memory inventory backed by a `HashMap` |

Supporting spaces:

- **[/material](./material/README.md)** — curated readings and a downloadable PDF (download area, *not* a Moodle submission box).
- **[/optional-activity](./optional-activity/README.md)** — an optional graded-practice challenge submitted via **GitHub** (not Moodle).

---

## 6. Key-concepts glossary

| Term | Definition |
|------|------------|
| **Collection** | An object that groups multiple elements into a single unit. In Java, the root interface for lists/sets/queues (Maps are related but separate). |
| **Java Collections Framework (JCF)** | The standard set of interfaces and classes in `java.util` for storing and manipulating groups of objects. |
| **`List`** | An **ordered** collection that allows **duplicate** elements and provides **index-based** access. |
| **`ArrayList`** | The most common `List` implementation, backed by a resizable array. Fast random access, fast append. |
| **`Set`** | A collection that contains **no duplicate** elements. Models the mathematical notion of a set. |
| **`HashSet`** | The most common `Set` implementation, backed by a hash table. Fast add/contains, no ordering guarantee. |
| **`Map`** | An object that maps **keys to values**; each key is unique. Not a subtype of `Collection`. |
| **`HashMap`** | The most common `Map` implementation, backed by a hash table. Fast `put`/`get` by key. |
| **Generics** | Compile-time type parameters (e.g., `List<Product>`) that give type safety and remove the need for casts. |
| **`equals()`** | Method that defines logical equality between two objects. Essential for `contains`, sets, and map keys. |
| **`hashCode()`** | Method returning an integer used by hash-based collections to bucket objects. Must be consistent with `equals()`. |
| **Iterator** | An object that traverses a collection element by element and can safely remove during iteration. |
| **`ConcurrentModificationException`** | Runtime error thrown when a collection is structurally modified during a for-each iteration. |
| **Autoboxing** | Automatic conversion between primitives (`int`) and wrapper types (`Integer`) required because collections store objects. |
| **Entry** | A single key-value pair inside a `Map`, exposed via `Map.Entry<K,V>`. |

---

## 7. Achievement / self-check checklist

Tick each item honestly. If you cannot tick it, revisit the linked session before the corte-3 assessment.

- [ ] I can explain the difference between `List`, `Set`, and `Map` in one sentence each.
- [ ] I can declare a generic collection and add typed objects to it.
- [ ] I can iterate a `List` with an enhanced for-loop and with an `Iterator`.
- [ ] Given a requirement, I can justify choosing `ArrayList` vs `HashSet` vs `HashMap`.
- [ ] I can explain why duplicates disappear when I add them to a `HashSet`.
- [ ] I can override `equals()` and `hashCode()` so my objects behave correctly in sets and as map keys.
- [ ] I can store and retrieve objects by key using a `HashMap`.
- [ ] I can implement an `Inventory` class that hides a `HashMap` behind clean methods.
- [ ] I can remove elements during iteration without throwing `ConcurrentModificationException`.
- [ ] I can read a small program using `entrySet()` and predict its output.

---

## 8. Resources index

- **Session 1 notes and exercises** → [`./01-session/README.md`](./01-session/README.md)
- **Session 2 notes and exercises** → [`./02-session/README.md`](./02-session/README.md)
- **Curated readings + downloadable PDF** → [`./material/README.md`](./material/README.md)
- **Optional GitHub challenge + rubric** → [`./optional-activity/README.md`](./optional-activity/README.md)

**External references (see `/material` for annotated summaries):**

- Oracle, *The Java Tutorials — Collections trail*.
- Oracle, *Java SE API documentation* — `java.util.List`, `Set`, `Map`, `ArrayList`, `HashSet`, `HashMap`.
- Bloch, J. *Effective Java* (3rd ed.), Items on `equals`/`hashCode` and generics.

---

*Prepared for CORHUILA — Object-Oriented Programming and Design (2026-B), Unit 3, Week 12, Corte 3.*
