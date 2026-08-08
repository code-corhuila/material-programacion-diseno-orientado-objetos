# Week 12 — Reading & Resource Materials (Download Area)

**Course:** Object-Oriented Programming and Design (2026-B) · **Unit 3** · **Corte 3**
**Topic:** Collections and data structures — `List`, `Map`, `Set` and their implementations
**RAA:** 90_82759

> **This is a DOWNLOAD area, not a submission box.** Use it to obtain the week's PDF and
> the curated references below. There is **nothing to upload here**. The graded task is the
> optional activity, submitted via **GitHub** (see
> [`../optional-activity/README.md`](../optional-activity/README.md)).

---

## 1. How to use this material

1. **Download the week PDF** (link below) and skim it *before* Session 1 — arrive knowing
   what a `List`, `Set`, and `Map` are, at least by name.
2. Keep the **Oracle Java Tutorials — Collections** open while you code; it is the canonical
   reference.
3. After Session 2, read *Effective Java* Items 10, 11, and 64 to deepen the
   `equals`/`hashCode`/"program-to-interface" ideas.
4. Use the **quick-reference cheat sheet** (Section 4) during the optional activity.

---

## 2. Week PDF (download)

- **File:** `week12-collections-list-set-map.pdf`
- **Location:** place the PDF in **this folder** (`12-week/material/`) so it downloads
  alongside these notes.
- **Contents:** consolidated theory from both sessions — the collection hierarchy, `List`,
  `Set`, `Map`, `equals`/`hashCode`, the decision framework, and the inventory case study,
  formatted for printing.

*(If the PDF is not yet present, the same content is fully covered in the session READMEs
listed under "Internal materials" below.)*

---

## 3. Curated readings & resources

### 3.1 Primary references (authoritative)

| # | Resource | What it covers | Link |
|---|---|---|---|
| 1 | Oracle — *The Java Tutorials: Collections* | The framework's design, every core interface, and idioms | https://docs.oracle.com/javase/tutorial/collections/ |
| 2 | Oracle — *`java.util` package summary* (Java SE 17 API) | Full class/method reference for `ArrayList`, `HashSet`, `HashMap` | https://docs.oracle.com/en/java/javase/17/docs/api/java.base/java/util/package-summary.html |
| 3 | Oracle — *`Map` interface Javadoc* | The `Map` contract, views, and default methods (`merge`, `computeIfAbsent`) | https://docs.oracle.com/en/java/javase/17/docs/api/java.base/java/util/Map.html |

### 3.2 Recommended book chapters

| # | Source | Focus |
|---|---|---|
| 4 | Bloch, J. — *Effective Java* (3rd ed.), **Item 10** | Obey the general contract when overriding `equals` |
| 5 | Bloch, J. — *Effective Java* (3rd ed.), **Item 11** | Always override `hashCode` when you override `equals` |
| 6 | Bloch, J. — *Effective Java* (3rd ed.), **Item 64** | Refer to objects by their interfaces (program to the interface) |
| 7 | Deitel & Deitel — *Java How to Program*, ch. "Generic Collections" | Beginner-friendly walkthrough with runnable examples |

### 3.3 Practice & visualization

| # | Resource | Use |
|---|---|---|
| 8 | Baeldung — *Java Collections* guides | Short, task-focused how-tos (e.g., "iterate a Map") — search the specific topic |
| 9 | *VisuAlgo* (visualgo.net) | Visualize hash tables and how buckets/collisions work |

### 3.4 Internal materials (this week)

| Resource | Link |
|---|---|
| Week guide | [`../README.md`](../README.md) |
| Session 1 — Lists, Sets, choosing | [`../01-session/README.md`](../01-session/README.md) |
| Session 2 — Maps & inventory | [`../02-session/README.md`](../02-session/README.md) |
| Optional activity (GitHub) | [`../optional-activity/README.md`](../optional-activity/README.md) |

---

## 4. Quick-reference cheat sheet

### 4.1 Which collection?

```
duplicates matter?              -> List   (ArrayList)
uniqueness / "is it present?"   -> Set    (HashSet)
look up a value by a key?       -> Map    (HashMap)
need sorted order?              -> TreeSet / TreeMap
need insertion order preserved? -> LinkedHashSet / LinkedHashMap
```

### 4.2 Most-used operations

| Interface | Create | Add | Read | Remove |
|---|---|---|---|---|
| `List` | `new ArrayList<>()` | `add(e)`, `add(i,e)` | `get(i)`, `contains(e)` | `remove(i)`, `remove(e)` |
| `Set` | `new HashSet<>()` | `add(e)` | `contains(e)` | `remove(e)` |
| `Map` | `new HashMap<>()` | `put(k,v)`, `putIfAbsent` | `get(k)`, `getOrDefault(k,d)`, `containsKey(k)` | `remove(k)` |

### 4.3 Iteration idioms

```java
for (T e : list)            { ... }          // List / Set
for (T e : set)             { ... }
for (K k : map.keySet())    { ... }          // keys
for (V v : map.values())    { ... }          // values
for (Map.Entry<K,V> en : map.entrySet()) {   // pairs (preferred)
    K k = en.getKey(); V v = en.getValue();
}
```

### 4.4 Complexity at a glance (average case)

| Operation | `ArrayList` | `HashSet` | `HashMap` |
|---|---|---|---|
| add / put | O(1)* | O(1) | O(1) |
| get by index / key | O(1) / — | — | O(1) |
| contains / containsKey | O(n) | O(1) | O(1) |
| remove by value/key | O(n) | O(1) | O(1) |

\* amortized (occasional array resize).

---

## 5. Summary notes (one-paragraph digests)

- **Collections Framework.** A set of `java.util` interfaces (`List`, `Set`, `Map`) with
  multiple implementations. Program against the interface; pick the implementation at
  construction. This decouples your logic from the data structure and makes swaps trivial.

- **`List`/`ArrayList`.** Ordered, indexed, duplicates allowed. `get`/`set` are O(1);
  `contains` and middle insert/remove are O(n). The go-to sequence type.

- **`Set`/`HashSet`.** No duplicates; ~O(1) membership. Choose `LinkedHashSet` for insertion
  order or `TreeSet` for sorted order — all behind the one `Set` interface.

- **`Map`/`HashMap`.** Key→value lookup in ~O(1). Iterate via `entrySet`. Use
  `getOrDefault`, `computeIfAbsent`, and `merge` to avoid null-handling and counting
  boilerplate.

- **`equals`/`hashCode`.** The contract that makes hash-based collections correct: equal
  objects must share a hash code. Override both together on the same immutable fields.

- **Encapsulating collections.** Keep the container `private` inside a class and expose
  domain operations (`add`, `sell`, `restock`) so invariants are enforced in one place —
  exactly what the Week 12 inventory demonstrates.
