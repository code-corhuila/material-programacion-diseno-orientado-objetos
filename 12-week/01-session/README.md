# Week 12 · Session 1 — Lists, Sets, and choosing the right collection

**Course:** Object-Oriented Programming and Design (2026-B) · **Unit 3** · **Corte 3**
**RAA:** 90_82759
**Prerequisites:** classes and objects, generics basics, `toString()`, interfaces.

---

## 1. Session objective

Students will **use `ArrayList` and `HashSet` to store and retrieve objects**, will
**iterate** over them effectively, and will be able to **select between a `List` and a
`Set`** for a stated requirement, justifying the choice by ordering, uniqueness, and access
pattern.

---

## 2. Timed agenda (110 minutes)

| Time | Segment | Activity |
|---|---|---|
| 0:00–0:10 | Hook & recap | Problem: "store 500 students and find one fast." Why arrays hurt. |
| 0:10–0:35 | Theory A | The Collections Framework: interfaces vs. implementations; the hierarchy. |
| 0:35–0:55 | Theory B | `List` / `ArrayList`: operations, iteration, complexity. |
| 0:55–1:15 | Theory C | `Set` / `HashSet`: uniqueness, `contains`, `equals`/`hashCode` intro. |
| 1:15–1:25 | Worked example | De-duplicating and reporting a list of course enrollments. |
| 1:25–1:45 | Guided practice | Students extend the example live. |
| 1:45–1:50 | Wrap-up & exit ticket | Decision drill + 3 quick questions. |

---

## 3. Theory notes

### 3.1 The problem with plain arrays

A Java array has a **fixed length** decided at creation. To model something that grows —
a shopping cart, a list of enrolled students, search results — you would have to:

- guess a capacity up front,
- track how many slots are actually used,
- allocate a bigger array and copy everything when you run out,
- shift elements manually when inserting or deleting in the middle.

That is repetitive, error-prone plumbing. The **Java Collections Framework (JCF)**, in the
`java.util` package, solves it once, correctly, and offers different data structures tuned
for different access patterns.

### 3.2 Interfaces vs. implementations — the central idea

The framework deliberately separates **what** a container does from **how** it does it.

- **Interfaces** describe the contract: `List`, `Set`, `Queue`, `Map`.
- **Implementations** are concrete classes: `ArrayList`, `LinkedList`, `HashSet`,
  `TreeSet`, `HashMap`, `TreeMap`.

Best practice (Effective Java, Item 64): **declare variables by the interface type** and
choose the implementation only at construction:

```java
List<String> names = new ArrayList<>();   // program to the interface
Set<String>  tags  = new HashSet<>();
```

If later you need predictable iteration order, you swap **one word** —
`new ArrayList<>()` → `new LinkedList<>()`, or `new HashSet<>()` →
`new LinkedHashSet<>()` — and the rest of the code is untouched. That is polymorphism
paying rent.

### 3.3 The collection hierarchy (text diagram)

```
              Iterable<E>
                  |
             Collection<E>
        ________|________________
       |            |            |
     List<E>      Set<E>      Queue<E>
       |            |
   ArrayList     HashSet
   LinkedList    LinkedHashSet
                 TreeSet   (via SortedSet/NavigableSet)


   Map<K,V>          <-- NOT a Collection, but part of the framework
      |
   HashMap
   LinkedHashMap
   TreeMap
```

Two things to notice:

1. `List`, `Set`, and `Queue` all extend `Collection`, so they share `add`, `remove`,
   `contains`, `size`, `isEmpty`, and iteration.
2. **`Map` is not a `Collection`.** It models *associations*, not a bag of elements, so it
   sits on its own branch. (We cover `Map` in Session 2.)

### 3.4 `List` and `ArrayList`

A **`List`** is an **ordered** collection (a *sequence*). It:

- keeps insertion order,
- allows **duplicates**,
- supports **positional access** by index (`get(i)`, `set(i, e)`, `add(i, e)`).

`ArrayList` is the default `List`, backed by a resizable array.

**Core operations:**

```java
List<String> cart = new ArrayList<>();

cart.add("Keyboard");        // append
cart.add("Mouse");
cart.add("Keyboard");        // duplicates are allowed

String first = cart.get(0);  // "Keyboard"  (index access)
cart.set(1, "Trackpad");     // replace at index 1
cart.remove("Keyboard");     // removes the FIRST matching element
int n = cart.size();         // number of elements
boolean has = cart.contains("Trackpad");  // true
```

**Iteration — three idioms:**

```java
// (a) enhanced for-each — preferred when you only read
for (String item : cart) {
    System.out.println(item);
}

// (b) indexed loop — when you need the position
for (int i = 0; i < cart.size(); i++) {
    System.out.println(i + ": " + cart.get(i));
}

// (c) Iterator — when you must remove during traversal
Iterator<String> it = cart.iterator();
while (it.hasNext()) {
    if (it.next().isEmpty()) {
        it.remove();   // safe removal; cart.remove(...) inside a for-each throws
    }
}
```

> **Pitfall:** modifying a collection with its own `add`/`remove` *while* iterating it with
> a for-each loop throws `ConcurrentModificationException`. Use the `Iterator`'s `remove()`
> instead.

**Cost intuition (Big-O) for `ArrayList`:**

| Operation | Cost | Why |
|---|---|---|
| `get(i)` / `set(i)` | O(1) | direct array indexing |
| `add(e)` (append) | O(1) amortized | occasional resize/copy |
| `add(i, e)` / `remove(i)` middle | O(n) | must shift elements |
| `contains(e)` | O(n) | linear scan |

### 3.5 `Set` and `HashSet`

A **`Set`** models a collection with **no duplicates** — it mirrors the mathematical idea
of a set. Its headline operations are **membership** (`contains`) and **de-duplication**
(adding an element that already exists is a no-op that returns `false`).

`HashSet` is the default `Set`, backed by a hash table. Its `add`, `remove`, and
`contains` run in **near-constant O(1)** time on average — dramatically faster than a
`List`'s O(n) `contains` for large data.

```java
Set<String> tags = new HashSet<>();

boolean a = tags.add("java");    // true  — newly added
boolean b = tags.add("oop");     // true
boolean c = tags.add("java");    // false — already present, set unchanged

System.out.println(tags.size()); // 2
System.out.println(tags.contains("oop")); // true  (fast)
```

**`HashSet` gives no ordering guarantee.** If you need order, choose a different
implementation of the *same* `Set` interface:

| Implementation | Ordering | Notes |
|---|---|---|
| `HashSet` | none (unpredictable) | fastest; the default choice |
| `LinkedHashSet` | insertion order | remembers the order you added elements |
| `TreeSet` | sorted order | keeps elements sorted; O(log n) operations |

### 3.6 Why `equals` and `hashCode` matter (introduction)

`HashSet` (and `HashMap`) decide "have I seen this object before?" using **two** methods:

1. `hashCode()` chooses a bucket.
2. `equals()` compares candidates inside that bucket.

For `String` and the wrapper types (`Integer`, `Double`, …) these are already implemented,
so sets of strings "just work." But for **your own classes**, the default `equals`/`hashCode`
inherited from `Object` compare **memory identity**, not logical content. That means two
`Product` objects with the same code would be treated as different — breaking de-duplication.

```java
// Without overriding equals/hashCode, this set holds TWO "equal" products:
Set<Product> products = new HashSet<>();
products.add(new Product("P-100", "Cable"));
products.add(new Product("P-100", "Cable"));
System.out.println(products.size()); // 2  (probably not what you wanted!)
```

We fix this in Session 2 by overriding both methods consistently. For now, remember the
rule: **if you put your own objects in a `HashSet`/`HashMap`, override `equals` and
`hashCode` together.**

### 3.7 Choosing between `List` and `Set` — a decision framework

Ask three questions, in order:

```
1. Do duplicates carry meaning?
      YES  -> you need a List.
      NO   -> continue.

2. Do you need to look elements up by a key?
      YES  -> you need a Map (Session 2).
      NO   -> continue.

3. Do you mostly test membership / enforce uniqueness?
      YES  -> use a Set (HashSet by default).
      NO, and order/index matters -> use a List (ArrayList by default).
```

| Requirement (example) | Best fit | Why |
|---|---|---|
| Shopping cart lines (same item can repeat) | `List` | order + duplicates matter |
| Unique student IDs seen so far | `Set` | uniqueness, fast `contains` |
| "Has this email already registered?" | `Set` | membership test |
| Ranked search results | `List` | position is meaningful |
| Distinct tags on an article | `Set` | no duplicates by definition |

---

## 4. Fully worked example — enrollment de-duplication report

**Scenario.** A registration export contains one line per enrollment attempt. Because the
web form let students click twice, some names appear multiple times. We must produce:

1. the **total** number of raw entries (a `List`), and
2. the list of **distinct** students (a `Set`), sorted alphabetically for the report.

```java
import java.util.ArrayList;
import java.util.List;
import java.util.Set;
import java.util.TreeSet;

public class EnrollmentReport {

    public static void main(String[] args) {
        // 1) Raw entries as they arrived — duplicates are meaningful data here.
        List<String> rawEntries = new ArrayList<>();
        rawEntries.add("Ana Ruiz");
        rawEntries.add("Carlos Pérez");
        rawEntries.add("Ana Ruiz");        // duplicate click
        rawEntries.add("Diana Gómez");
        rawEntries.add("Carlos Pérez");    // duplicate click

        System.out.println("Raw enrollment attempts: " + rawEntries.size()); // 5

        // 2) Distinct students. TreeSet keeps them sorted automatically.
        Set<String> distinctStudents = new TreeSet<>(rawEntries);
        System.out.println("Distinct students: " + distinctStudents.size()); // 3

        // 3) Print the clean, sorted roster.
        System.out.println("\n--- Official roster ---");
        int position = 1;
        for (String student : distinctStudents) {
            System.out.println((position++) + ". " + student);
        }

        // 4) How many duplicate clicks did we absorb?
        int duplicates = rawEntries.size() - distinctStudents.size();
        System.out.println("\nDuplicate submissions removed: " + duplicates); // 2
    }
}
```

**Expected output:**

```
Raw enrollment attempts: 5
Distinct students: 3

--- Official roster ---
1. Ana Ruiz
2. Carlos Pérez
3. Diana Gómez

Duplicate submissions removed: 2
```

**What to notice:**

- We used a **`List`** where duplicates were *real data* (attempts), and a **`Set`** where
  duplicates were *noise* (distinct people).
- Passing a collection to the `TreeSet(Collection)` constructor is a one-line
  de-duplicate-and-sort idiom.
- The variables are typed by the **interface** (`List`, `Set`) — only the constructor names
  the implementation.

---

## 5. Guided in-class practice

Work in pairs. Start from the worked example and extend it. Commit nothing yet — this is
formative practice.

**Task 1 — Membership check.**
Add a `Set<String> blockedStudents` containing `"Carlos Pérez"`. Before printing the
roster, skip any student who is blocked, and print how many were filtered out.

**Task 2 — Two `Set` implementations, one interface.**
Change `distinctStudents` from `TreeSet` to `LinkedHashSet` and re-run. Explain in one
sentence how the output order changed and why. Then switch back to `TreeSet`.

**Task 3 — Safe removal with an `Iterator`.**
Given a `List<String> pending` of task names, remove every entry that starts with `"DONE:"`
using an `Iterator` and its `remove()` method. Explain why a for-each loop would fail here.

**Stretch (optional).**
Write a method `List<String> topN(List<String> items, int n)` that returns the first `n`
items (or all of them if the list is smaller). Decide what your method does when `n` is
negative and document that decision.

**Reference solution sketch for Task 1:**

```java
Set<String> blocked = new HashSet<>();
blocked.add("Carlos Pérez");

int filtered = 0;
for (String student : distinctStudents) {
    if (blocked.contains(student)) {   // O(1) membership test
        filtered++;
        continue;
    }
    System.out.println(student);
}
System.out.println("Filtered (blocked): " + filtered);
```

---

## 6. Wrap-up and exit ticket

**Key takeaways:**

- The Collections Framework separates **interfaces** (`List`, `Set`) from
  **implementations** (`ArrayList`, `HashSet`); program to the interface.
- Use a **`List`** when order or duplicates matter; use a **`Set`** for uniqueness and fast
  membership tests.
- `ArrayList.get(i)` is O(1); `ArrayList.contains(e)` is O(n); `HashSet.contains(e)` is
  ~O(1).
- Iterate with for-each to read; use an `Iterator` to remove during traversal.
- For **your own classes** in a `Set`, override `equals` and `hashCode` (Session 2).

**Exit ticket (submit on paper or the LMS discussion, 5 minutes):**

1. A feature must store the **distinct hashtags** used in a post. Which collection do you
   choose, and which one *concrete* implementation, and why?
2. Explain in one sentence why `ArrayList.contains` gets slower with more elements but
   `HashSet.contains` does not.
3. What exception can you get by calling `list.remove(x)` inside a `for (String x : list)`
   loop, and how do you avoid it?

*Model answers:* (1) a `Set`; `HashSet` if order is irrelevant, `LinkedHashSet` if you want
to preserve the order they appeared. (2) `ArrayList` scans element by element (O(n)) while
`HashSet` jumps straight to a bucket via `hashCode` (~O(1)). (3)
`ConcurrentModificationException`; use `Iterator.remove()` instead.
