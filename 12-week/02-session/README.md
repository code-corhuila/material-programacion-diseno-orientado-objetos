# Week 12 · Session 2 — Maps and a HashMap-based inventory

**Course:** Object-Oriented Programming and Design (2026-B) · **Unit 3** · **Corte 3**
**RAA:** 90_82759
**Prerequisites:** Session 1 (`List`, `Set`, `equals`/`hashCode` introduction).

---

## 1. Session objective

Students will **use `HashMap` to store and retrieve objects by key**, **iterate** maps with
their view collections, and **implement a basic inventory** by encapsulating a
`HashMap<String, Product>` inside a class model that exposes safe operations. They will also
override `equals`/`hashCode` correctly so hash-based collections behave as intended.

---

## 2. Timed agenda (110 minutes)

| Time | Segment | Activity |
|---|---|---|
| 0:00–0:10 | Recap & bridge | From "is it present?" (`Set`) to "give me the one with this key" (`Map`). |
| 0:10–0:35 | Theory A | `Map`/`HashMap`: put, get, `getOrDefault`, `containsKey`, remove. |
| 0:35–0:50 | Theory B | Iterating maps: `keySet`, `values`, `entrySet`; `computeIfAbsent`, `merge`. |
| 0:50–1:05 | Theory C | `equals`/`hashCode` done right for a value object. |
| 1:05–1:30 | Worked example | Design and build the `Product` + `Inventory` model. |
| 1:30–1:50 | Guided practice | Extend the inventory (low-stock report, restock, total value). |
| 1:50–1:55 | Wrap-up & exit ticket | Recap + hand-off to the optional GitHub activity. |

---

## 3. Theory notes

### 3.1 What a `Map` is (and why it is not a `Collection`)

A **`Map<K, V>`** associates **unique keys** with **values**. Think of a dictionary: you
look up a *word* (key) to get its *definition* (value). A map answers a different question
than a `List` or `Set`:

- `List` — "what is at position *i*?"
- `Set` — "is element *x* present?"
- `Map` — "**what value is associated with key *k*?**"

Because it stores *pairs*, not single elements, `Map` is **not** a subtype of `Collection`.
Keys form a set (no duplicate keys); each key maps to exactly one value. `HashMap` is the
default implementation, backed by a hash table with **near-constant-time** `get` and `put`.

```
   Map<String, Product>
   ┌───────────┬──────────────────────────┐
   │   KEY     │          VALUE            │
   ├───────────┼──────────────────────────┤
   │ "P-100"   │ Product(P-100, Cable, 12) │
   │ "P-205"   │ Product(P-205, Mouse, 40) │
   │ "P-330"   │ Product(P-330, Webcam, 5) │
   └───────────┴──────────────────────────┘
        keySet()          values()
        \________ entrySet() = the pairs _______/
```

### 3.2 Core `HashMap` operations

```java
Map<String, Integer> stock = new HashMap<>();

stock.put("apple", 10);          // insert
stock.put("banana", 5);
stock.put("apple", 12);          // same key -> REPLACES the old value (now 12)

int apples  = stock.get("apple");            // 12
Integer none = stock.get("kiwi");            // null  (missing key)
int safe    = stock.getOrDefault("kiwi", 0); // 0     (default when absent)

boolean hasBanana = stock.containsKey("banana"); // true
stock.remove("banana");                          // delete the pair
int size = stock.size();                         // number of pairs
```

> **Pitfall:** `get` on a missing key returns `null`, not zero. Auto-unboxing a `null`
> `Integer` into an `int` throws `NullPointerException`. Prefer `getOrDefault` (or
> `containsKey` first) whenever a key might be absent.

### 3.3 Iterating a map — the three views

A `Map` exposes three **views**, each itself iterable:

```java
// (a) keys only
for (String key : stock.keySet()) {
    System.out.println(key);
}

// (b) values only
for (int qty : stock.values()) {
    System.out.println(qty);
}

// (c) key + value together — PREFERRED when you need both
for (Map.Entry<String, Integer> entry : stock.entrySet()) {
    System.out.println(entry.getKey() + " -> " + entry.getValue());
}
```

Use `entrySet()` when you need both key and value: it visits each pair once, whereas calling
`get(key)` inside a `keySet()` loop looks the value up a second time.

### 3.4 Higher-level methods that remove boilerplate

Modern `Map` methods make counting and grouping concise and correct:

```java
// Count word frequencies (classic "merge" idiom).
Map<String, Integer> counts = new HashMap<>();
for (String word : words) {
    counts.merge(word, 1, Integer::sum);   // if absent -> 1; else old + 1
}

// Group values into per-key lists (classic "computeIfAbsent" idiom).
Map<String, List<String>> byCategory = new HashMap<>();
for (Product p : products) {
    byCategory
        .computeIfAbsent(p.getCategory(), k -> new ArrayList<>())
        .add(p.getName());
}

// Insert only if the key is not already present.
stock.putIfAbsent("apple", 0);
```

| Method | Meaning |
|---|---|
| `getOrDefault(k, d)` | value for `k`, or `d` if absent |
| `putIfAbsent(k, v)` | set only if `k` has no value yet |
| `computeIfAbsent(k, f)` | if `k` absent, compute a value with `f` and store it; return the value |
| `merge(k, v, fn)` | if absent store `v`; else store `fn(old, v)` — perfect for counters |

### 3.5 `equals` and `hashCode` — the contract that makes maps work

A `HashMap` locates a key by:

1. calling `hashCode()` to pick a bucket, then
2. calling `equals()` to find the exact key inside that bucket.

If two objects are **`equals`**, they **must** return the **same `hashCode`**. Violating
this contract makes keys "disappear": you `put` with one object and `get(equalKey)` returns
`null`. For a **value object** (identity defined by its fields), override both together.

```java
import java.util.Objects;

public final class Product {
    private final String code;   // natural identity of a product
    private String name;
    private int quantity;

    public Product(String code, String name, int quantity) {
        this.code = Objects.requireNonNull(code, "code");
        this.name = name;
        this.quantity = quantity;
    }

    public String getCode()     { return code; }
    public String getName()     { return name; }
    public int getQuantity()    { return quantity; }
    public void setName(String name)        { this.name = name; }
    public void setQuantity(int quantity)   { this.quantity = quantity; }

    // Two products are the same product when they share the same code.
    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof Product)) return false;
        Product other = (Product) o;
        return code.equals(other.code);
    }

    @Override
    public int hashCode() {
        return Objects.hash(code);   // consistent with equals (same field)
    }

    @Override
    public String toString() {
        return String.format("Product{code=%s, name=%s, qty=%d}", code, name, quantity);
    }
}
```

> **Rules of thumb:** override `equals` and `hashCode` **together**, base both on the **same
> fields**, and prefer **immutable** identity fields (here, `code` is `final`). Changing a
> field that participates in `hashCode` *after* inserting the object into a hash-based
> collection corrupts it — so keep identity fields stable.

Note: when the **key** is a `String` (as in the inventory below), you rely on `String`'s
built-in `equals`/`hashCode`. You still override them on `Product` so it also behaves
correctly if ever placed in a `HashSet` or used as a key elsewhere.

---

## 4. Fully worked example — a `HashMap`-based inventory

**Requirement.** Build a small warehouse inventory that can:

- add a product (reject a duplicate code),
- find a product by its code,
- increase/decrease quantity (restock / sell), never going below zero,
- remove a product,
- list all products and compute how many distinct products are stored.

We **encapsulate** the `HashMap` inside an `Inventory` class so callers use meaningful
operations, not raw map calls — this is the object-oriented way to protect an invariant
(e.g., "quantity is never negative").

```java
import java.util.Collection;
import java.util.Collections;
import java.util.HashMap;
import java.util.Map;

public class Inventory {

    // The Map is PRIVATE: callers never touch it directly.
    private final Map<String, Product> products = new HashMap<>();

    /** Adds a new product. Returns false if the code already exists. */
    public boolean add(Product product) {
        if (products.containsKey(product.getCode())) {
            return false;                       // no silent overwrite
        }
        products.put(product.getCode(), product);
        return true;
    }

    /** Retrieves a product by code, or null if not found. */
    public Product findByCode(String code) {
        return products.get(code);
    }

    /** Increases the quantity of an existing product (restock). */
    public boolean restock(String code, int amount) {
        if (amount <= 0) return false;
        Product p = products.get(code);
        if (p == null) return false;
        p.setQuantity(p.getQuantity() + amount);
        return true;
    }

    /** Decreases quantity (a sale). Fails if there is not enough stock. */
    public boolean sell(String code, int amount) {
        if (amount <= 0) return false;
        Product p = products.get(code);
        if (p == null || p.getQuantity() < amount) {
            return false;                       // protects the invariant
        }
        p.setQuantity(p.getQuantity() - amount);
        return true;
    }

    /** Removes a product entirely. Returns the removed product, or null. */
    public Product remove(String code) {
        return products.remove(code);
    }

    /** Number of distinct products held. */
    public int distinctCount() {
        return products.size();
    }

    /** A read-only view of all products (defensive: callers can't mutate the map). */
    public Collection<Product> all() {
        return Collections.unmodifiableCollection(products.values());
    }

    /** Prints a formatted report. */
    public void printReport() {
        System.out.println("=== Inventory (" + distinctCount() + " products) ===");
        for (Map.Entry<String, Product> entry : products.entrySet()) {
            Product p = entry.getValue();
            System.out.printf("%-8s %-12s qty=%d%n",
                    entry.getKey(), p.getName(), p.getQuantity());
        }
    }
}
```

**Driver / demo:**

```java
public class InventoryDemo {
    public static void main(String[] args) {
        Inventory inv = new Inventory();

        inv.add(new Product("P-100", "USB Cable", 12));
        inv.add(new Product("P-205", "Mouse",     40));
        inv.add(new Product("P-330", "Webcam",     5));

        // Duplicate code is rejected.
        boolean added = inv.add(new Product("P-100", "USB Cable v2", 99));
        System.out.println("Second P-100 added? " + added);   // false

        // Retrieve and mutate through safe operations.
        System.out.println("Lookup P-205: " + inv.findByCode("P-205"));
        inv.sell("P-330", 2);      // ok, 5 -> 3
        inv.sell("P-330", 10);     // rejected: not enough stock
        inv.restock("P-100", 8);   // 12 -> 20

        inv.printReport();
        System.out.println("Distinct products: " + inv.distinctCount());
    }
}
```

**Expected output (map order may vary — `HashMap` is unordered):**

```
Second P-100 added? false
Lookup P-205: Product{code=P-205, name=Mouse, qty=40}
=== Inventory (3 products) ===
P-100    USB Cable    qty=20
P-205    Mouse        qty=40
P-330    Webcam       qty=3
Distinct products: 3
```

**Design points to highlight in class:**

- The `Map` is `private final`; the invariant *"quantity ≥ 0"* is enforced by `sell`, not by
  hope. This is **encapsulation** protecting a rule.
- `add` uses `containsKey` to refuse silent overwrites — `put` alone would replace the
  existing product.
- `all()` returns an **unmodifiable** view, so callers can read but not corrupt the map.
- The public API speaks the domain language (`restock`, `sell`) rather than exposing `put`
  and `get`.

---

## 5. Guided in-class practice

Extend `Inventory`. Test each method from `InventoryDemo` as you go.

**Task 1 — Low-stock report.**
Add `List<Product> lowStock(int threshold)` returning every product whose quantity is at or
below `threshold`. Iterate with `values()`.

**Task 2 — Total units.**
Add `int totalUnits()` returning the sum of all quantities across the inventory.

**Task 3 — Rename safely.**
Add `boolean rename(String code, String newName)` that updates a product's name only if the
code exists. Return whether it succeeded.

**Task 4 — Group by first letter (stretch).**
Add `Map<Character, List<Product>> groupByInitial()` that buckets products by the first
letter of their name, using `computeIfAbsent`.

**Reference solution sketch (Tasks 1 & 2):**

```java
public List<Product> lowStock(int threshold) {
    List<Product> result = new ArrayList<>();
    for (Product p : products.values()) {
        if (p.getQuantity() <= threshold) {
            result.add(p);
        }
    }
    return result;
}

public int totalUnits() {
    int total = 0;
    for (Product p : products.values()) {
        total += p.getQuantity();
    }
    return total;
}
```

---

## 6. Wrap-up and exit ticket

**Key takeaways:**

- A `Map` answers "what value is associated with this key?"; `HashMap` does it in ~O(1).
- Guard missing keys with `getOrDefault`/`containsKey`; `get` returns `null` when absent.
- Iterate with `entrySet()` when you need both key and value; use `keySet`/`values`
  otherwise.
- `computeIfAbsent` and `merge` make grouping and counting concise and correct.
- Override `equals` and `hashCode` **together**, on the **same immutable fields**, so
  hash-based collections work.
- **Encapsulate** a collection inside a class to protect its invariants and expose a
  domain-oriented API.

**Exit ticket (5 minutes):**

1. Why does `Inventory.add` call `containsKey` before `put`? What would break if it didn't?
2. You store `Product` objects in a `HashSet` and two of them have the same `code` but you
   forgot to override `hashCode`. What goes wrong, and why?
3. Write the single line that returns the price/quantity for key `"P-205"`, or `0` if the
   key is missing (assume a `Map<String, Integer>`).

*Model answers:* (1) to refuse silent overwrites — without it, adding an existing code would
replace the stored product and its quantity. (2) the two products land in different buckets
(default `hashCode` uses identity), so the set stores both and treats them as distinct —
de-duplication fails. (3) `map.getOrDefault("P-205", 0);`

**Hand-off:** you are now ready for the graded enrichment task in
[`../optional-activity/README.md`](../optional-activity/README.md), submitted via **GitHub**.
