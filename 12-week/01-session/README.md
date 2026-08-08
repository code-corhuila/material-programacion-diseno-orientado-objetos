# Week 12 - Session 1: Lists and Sets (`ArrayList`, `HashSet`) and iteration

> **Subject:** Object-Oriented Programming and Design (2026-B)
> **Unit 3 - Practical application of OOP in Java · Corte 3**
> **Estimated duration:** 2 hours (120 min)

---

## 1. Session objective

By the end of this session the student will be able to **store groups of objects in an
`ArrayList`, guarantee uniqueness with a `HashSet`, iterate both safely, and explain why
`equals()` and `hashCode()` matter** — laying the foundation for the `Map`-based inventory
built in Session 2.

Concretely, the student will:

1. Create and manipulate a generic `List<T>` using `ArrayList`.
2. Create a generic `Set<T>` using `HashSet` and observe duplicate elimination.
3. Iterate collections with the enhanced for-loop and with an explicit `Iterator`.
4. Override `equals()` and `hashCode()` in a domain class and see the effect on a `HashSet`.

---

## 2. Timed agenda

| Time | Segment | Activity |
|------|---------|----------|
| 0:00 – 0:10 | Warm-up | Recap of arrays and their limits; the "many objects" problem |
| 0:10 – 0:35 | Theory | The Collections Framework map; `List`/`ArrayList` |
| 0:35 – 0:55 | Worked example | Building and iterating a list of `Product` objects |
| 0:55 – 1:20 | Theory + demo | `Set`/`HashSet`, `equals()`/`hashCode()` |
| 1:20 – 1:50 | Guided practice | Students code a de-duplicating registry |
| 1:50 – 2:00 | Wrap-up | Exit ticket + preview of Session 2 |

---

## 3. Theory notes

### 3.1 Why not just use arrays?

A Java array (`Product[] products = new Product[10];`) has a **fixed size** decided at
creation. If a store adds an eleventh product, you must create a bigger array and copy
everything. Arrays also give you almost no built-in behavior: no `add`, no `remove`, no
`contains`. You end up writing bookkeeping code by hand and getting it wrong.

The **Java Collections Framework (JCF)**, living in `java.util`, solves this with
resizable, feature-rich data structures. The three families you must master are:

```
                       Iterable
                          |
                     Collection                        Map  (separate hierarchy!)
                    /     |     \                        |
                 List    Set    Queue                 HashMap
                  |       |                            TreeMap
              ArrayList  HashSet                       LinkedHashMap
              LinkedList LinkedHashSet
                         TreeSet
```

Key mental model:

| Interface | One-line contract | "Think of it as..." |
|-----------|-------------------|---------------------|
| `List`  | Ordered, indexed, duplicates allowed | A numbered shopping list |
| `Set`   | No duplicates, no index | A bag of unique stickers |
| `Map`   | Key → value, keys unique | A dictionary / phone book |

> **Important:** `Map` is **not** a `Collection`. It sits in its own branch because it
> stores *pairs*, not single elements. We cover it fully in Session 2.

### 3.2 Generics in one paragraph

Collections are **generic**: you tell the compiler what type they hold using angle
brackets. `List<Product>` is "a list of `Product`". This gives **type safety** (the
compiler rejects `list.add("hello")` if the list holds `Product`) and removes the need for
manual casts when reading elements. Because collections store *objects*, primitives are
**autoboxed**: `List<Integer>` accepts `int` values, which Java wraps into `Integer`
automatically.

### 3.3 `List` and `ArrayList`

A `List` is an **ordered** sequence with **index-based** access (position `0` is the
first element) that **allows duplicates**. `ArrayList` is the default implementation,
backed internally by a resizable array — excellent for random access (`get(i)`) and for
appending to the end.

Essential operations:

```java
List<String> names = new ArrayList<>();   // program to the interface (List), not ArrayList
names.add("Ana");            // append -> ["Ana"]
names.add("Luis");           // append -> ["Ana", "Luis"]
names.add("Ana");            // duplicates allowed -> ["Ana", "Luis", "Ana"]

String first = names.get(0); // "Ana"     (index access)
names.set(1, "Luisa");       // replace   -> ["Ana", "Luisa", "Ana"]
int n = names.size();        // 3
boolean has = names.contains("Ana");  // true
int pos = names.indexOf("Luisa");     // 1
names.remove("Ana");         // removes FIRST occurrence -> ["Luisa", "Ana"]
names.remove(0);             // removes BY INDEX -> ["Ana"]
```

> **Trap:** `remove(int)` removes by **index**; `remove(Object)` removes by **value**.
> With a `List<Integer>`, `list.remove(2)` deletes position 2, while
> `list.remove(Integer.valueOf(2))` deletes the value 2. Know which one you want.

`ArrayList` vs `LinkedList` (brief): both implement `List`. `ArrayList` wins for random
access and is the everyday default. `LinkedList` can be faster for frequent
insertions/removals at the front. Default to `ArrayList` unless you have a measured reason.

### 3.4 `Set` and `HashSet`

A `Set` models a mathematical set: **no duplicates**, and (for `HashSet`) **no guaranteed
order** and **no index access**. Adding an element that is already present simply has no
effect and `add` returns `false`.

```java
Set<String> emails = new HashSet<>();
emails.add("a@x.com");           // true  (added)
emails.add("b@x.com");           // true  (added)
boolean added = emails.add("a@x.com");  // false (already there, ignored)
System.out.println(emails.size());       // 2
System.out.println(emails.contains("b@x.com")); // true
```

Implementation choices (brief):
- **`HashSet`** — fastest, no ordering. The default.
- **`LinkedHashSet`** — preserves **insertion order**.
- **`TreeSet`** — keeps elements **sorted** (requires `Comparable` or a `Comparator`).

### 3.5 The critical detail: `equals()` and `hashCode()`

How does a `HashSet` know that two objects are "the same" and therefore a duplicate? It
uses two methods every object inherits from `Object`:

1. `hashCode()` returns an `int` used to pick a **bucket**.
2. `equals()` compares objects within that bucket for **logical equality**.

The default `Object.equals()` compares **references** (identity), so two *different*
`Product` instances with identical data are considered different. That is usually **not**
what we want. If you want two products with the same `code` to count as duplicates, you
must **override both methods** consistently:

> **The contract:** if `a.equals(b)` is `true`, then `a.hashCode() == b.hashCode()` must
> also be `true`. Break this and hash-based collections misbehave (duplicates leak in,
> lookups fail). Always override **both** together.

```java
@Override
public boolean equals(Object o) {
    if (this == o) return true;
    if (o == null || getClass() != o.getClass()) return false;
    Product other = (Product) o;
    return code.equals(other.code);   // identity based on the business key
}

@Override
public int hashCode() {
    return Objects.hash(code);        // consistent with equals
}
```

### 3.6 Iterating collections

Three ways you will use constantly:

```java
// (a) Enhanced for-loop — the everyday choice for read-only traversal
for (Product p : products) {
    System.out.println(p.getName());
}

// (b) Iterator — needed to REMOVE safely during traversal
Iterator<Product> it = products.iterator();
while (it.hasNext()) {
    Product p = it.next();
    if (p.getQuantity() == 0) {
        it.remove();          // safe removal
    }
}

// (c) forEach + lambda — concise for simple actions
products.forEach(p -> System.out.println(p.getName()));
```

> **`ConcurrentModificationException`:** if you call `products.remove(p)` *inside* an
> enhanced for-loop, Java throws this at runtime. To remove during iteration, use the
> `Iterator.remove()` shown above (or `removeIf(...)`).

```java
// Cleanest removal-by-condition:
products.removeIf(p -> p.getQuantity() == 0);
```

---

## 4. Fully worked example

**Problem.** Model a small catalog of products. Store them in a `List` (order matters, a
product may legitimately appear once but the list keeps insertion order), print the
catalog, compute total inventory value, then build a `Set` of unique category names.

```java
import java.util.*;

class Product {
    private final String code;
    private final String name;
    private final String category;
    private double price;
    private int quantity;

    public Product(String code, String name, String category, double price, int quantity) {
        this.code = code;
        this.name = name;
        this.category = category;
        this.price = price;
        this.quantity = quantity;
    }

    public String getCode()     { return code; }
    public String getName()     { return name; }
    public String getCategory() { return category; }
    public double getPrice()    { return price; }
    public int getQuantity()    { return quantity; }

    public double lineValue() { return price * quantity; }

    @Override
    public String toString() {
        return String.format("%s - %-12s (%s) x%d @ $%.2f", code, name, category, quantity, price);
    }

    // Two products are "the same" when they share a code.
    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        return code.equals(((Product) o).code);
    }

    @Override
    public int hashCode() {
        return Objects.hash(code);
    }
}

public class CatalogDemo {
    public static void main(String[] args) {
        // 1. Store products in a List (ordered, indexed)
        List<Product> catalog = new ArrayList<>();
        catalog.add(new Product("P001", "Keyboard", "Peripherals", 45.00, 10));
        catalog.add(new Product("P002", "Mouse",    "Peripherals", 25.50, 20));
        catalog.add(new Product("P003", "Monitor",  "Displays",    180.00, 5));
        catalog.add(new Product("P004", "Cable",    "Peripherals", 5.00, 100));

        // 2. Iterate and print
        System.out.println("=== Catalog ===");
        for (Product p : catalog) {
            System.out.println(p);
        }

        // 3. Compute total value using an accumulator
        double total = 0.0;
        for (Product p : catalog) {
            total += p.lineValue();
        }
        System.out.printf("Total inventory value: $%.2f%n", total);

        // 4. Build a Set of unique categories (duplicates auto-removed)
        Set<String> categories = new HashSet<>();
        for (Product p : catalog) {
            categories.add(p.getCategory());
        }
        System.out.println("Distinct categories: " + categories);

        // 5. Demonstrate the Set contract with Product identity
        Set<Product> unique = new HashSet<>(catalog);
        unique.add(new Product("P001", "Keyboard (dup)", "Peripherals", 45.00, 3)); // same code P001
        System.out.println("Unique products by code: " + unique.size()); // 4, not 5
    }
}
```

**Expected output (order of the `Set` lines may vary):**

```
=== Catalog ===
P001 - Keyboard     (Peripherals) x10 @ $45.00
P002 - Mouse        (Peripherals) x20 @ $25.50
P003 - Monitor      (Displays) x5 @ $180.00
P004 - Cable        (Peripherals) x100 @ $5.00
Total inventory value: $1910.00
Distinct categories: [Displays, Peripherals]
Unique products by code: 4
```

**What to notice:**
- The `List` kept insertion order and allowed us to iterate and accumulate.
- The `HashSet<String>` collapsed three "Peripherals" strings into one entry.
- Because `Product` overrides `equals`/`hashCode` on `code`, adding a second `P001`
  did **not** grow the set — it stayed at 4. Remove those overrides and it becomes 5.

---

## 5. Guided in-class practice

**Goal:** build a small "student registry" that ignores duplicate enrollments.

Work in pairs. Create a class `Student` with fields `id` (String) and `name` (String),
plus a constructor, getters, and a `toString()`. Then, in a `main`:

1. Create a `List<Student>` and add five students — but deliberately add one student
   **twice** (same `id`). Print the list size (should be 5, duplicates allowed).
2. Create a `Set<Student>` from that list: `new HashSet<>(list)`. Print its size.
   - **Question:** why is it still 5 and not 4? *(Hint: you haven't overridden `equals`/`hashCode` yet.)*
3. Override `equals()` and `hashCode()` on `Student` based on `id`. Re-run.
   - Now the set size should drop to 4. Explain why in a code comment.
4. Iterate the `Set` with an enhanced for-loop and print each student.
5. Using an `Iterator`, remove any student whose `name` starts with `"A"`, then print the
   remaining set. (Do **not** use `set.remove()` inside a for-each — trigger and then fix
   the `ConcurrentModificationException` to feel the difference.)

**Checkpoints the instructor will look for:**
- Correct generic types (`List<Student>`, `Set<Student>`).
- `equals`/`hashCode` overridden *together* and based on the same field.
- Safe removal via `Iterator.remove()` (or `removeIf`).

**Stretch (optional):** replace step 5's `Iterator` with a single `set.removeIf(...)` call.

---

## 6. Wrap-up and exit ticket

**Summary.** Today you learned that collections replace hand-rolled arrays; that `List`
(via `ArrayList`) is ordered/indexed and allows duplicates; that `Set` (via `HashSet`)
enforces uniqueness using `equals()`/`hashCode()`; and that safe iteration uses the
enhanced for-loop for reading and `Iterator`/`removeIf` for removing.

**Exit ticket (submit before leaving — 5 short answers):**

1. In one sentence each, contrast `List` and `Set`.
2. What does `list.remove(1)` do on a `List<Integer>`, and how do you instead remove the *value* 1?
3. Why must `equals()` and `hashCode()` be overridden *together*?
4. Which loop/technique lets you remove elements during iteration without an exception?
5. Predict the output: adding `"x"` three times to a `HashSet<String>` — what is its final `size()`?

**Preview of Session 2:** we introduce `Map`/`HashMap` for instant key-based lookup and
use it to build a real `Inventory` class — the centerpiece of the corte-3 practical work.
