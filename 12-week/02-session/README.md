# Week 12 - Session 2: Maps (`HashMap`), choosing a collection, and building an inventory

> **Subject:** Object-Oriented Programming and Design (2026-B)
> **Unit 3 - Practical application of OOP in Java · Corte 3**
> **Estimated duration:** 2 hours (120 min)

---

## 1. Session objective

By the end of this session the student will be able to **associate keys with values using
a `HashMap`, choose the correct collection for a stated requirement, and implement a
working `Inventory` class that internally uses a `HashMap<String, Product>`** to add,
find, update, remove, and list products.

Concretely, the student will:

1. Use `HashMap` core operations: `put`, `get`, `getOrDefault`, `containsKey`, `remove`.
2. Iterate a map with `keySet()`, `values()`, and `entrySet()`.
3. Apply a decision rule to select `List` vs `Set` vs `Map` for real requirements.
4. Encapsulate a `HashMap` inside an `Inventory` class exposing a clean, safe API.

---

## 2. Timed agenda

| Time | Segment | Activity |
|------|---------|----------|
| 0:00 – 0:10 | Warm-up | Review exit ticket from Session 1; "look up by key" motivation |
| 0:10 – 0:35 | Theory | `Map`/`HashMap`: put/get/iterate |
| 0:35 – 0:50 | Decision framework | Choosing `List` vs `Set` vs `Map` |
| 0:50 – 1:20 | Worked example | Full `Inventory` class backed by `HashMap` |
| 1:20 – 1:50 | Guided practice | Students extend the inventory |
| 1:50 – 2:00 | Wrap-up | Exit ticket + bridge to optional activity |

---

## 3. Theory notes

### 3.1 The problem a `Map` solves

With a `List<Product>`, finding the product with code `"P003"` means scanning the list
element by element until you find it — `O(n)` work. For an inventory where you constantly
look things up **by code**, that is the wrong tool. A **`Map`** stores **key → value**
associations and finds a value **by its key almost instantly** (`O(1)` on average for
`HashMap`). Think of a phone book: you don't scan every entry, you jump straight to the
name.

```
   Map<String, Product>          key (String)     value (Product)
   +-------------------------+   ------------      ------------------------------
   | "P001" -> Product(...)  |   "P001"      ->    Keyboard, $45.00, qty 10
   | "P002" -> Product(...)  |   "P002"      ->    Mouse,    $25.50, qty 20
   | "P003" -> Product(...)  |   "P003"      ->    Monitor,  $180.00, qty 5
   +-------------------------+
        keys are unique              lookup by key is direct, not a scan
```

Rules of a `Map`:
- **Keys are unique.** `put` with an existing key **replaces** the old value (and returns it).
- **Values may repeat.** Two keys can map to equal values.
- A `Map` is **not** a `Collection`; you iterate it via its key set, value collection, or entry set.
- The **key type** must have sensible `equals()`/`hashCode()`. `String` and `Integer`
  already do; a custom class used as a key must override both (same rule as Session 1).

### 3.2 `HashMap` core operations

```java
Map<String, Product> byCode = new HashMap<>();

// put: insert or replace
byCode.put("P001", keyboard);
byCode.put("P002", mouse);
Product replaced = byCode.put("P001", keyboardV2); // returns the OLD value for P001

// get: retrieve by key (null if absent)
Product p = byCode.get("P002");          // the Mouse
Product missing = byCode.get("P999");    // null  -> beware NullPointerException

// getOrDefault: safe read with a fallback
int qty = byCode.getOrDefault("P999", null) == null ? 0 : byCode.get("P999").getQuantity();

// containsKey / containsValue
boolean exists = byCode.containsKey("P001");   // true

// remove by key (returns the removed value, or null)
Product removed = byCode.remove("P002");

// size
int count = byCode.size();
```

> **Trap:** `get` returns `null` when the key is absent. Always check `containsKey(...)`
> first, or use `getOrDefault(...)`, to avoid a `NullPointerException` down the line.

### 3.3 Iterating a `Map`

There are three views. `entrySet()` is the most efficient when you need both key and value.

```java
// (a) keySet — iterate keys, look up values as needed
for (String code : byCode.keySet()) {
    System.out.println(code + " -> " + byCode.get(code));
}

// (b) values — iterate values only (keys not needed)
for (Product p : byCode.values()) {
    System.out.println(p.getName());
}

// (c) entrySet — iterate key+value pairs together (preferred)
for (Map.Entry<String, Product> entry : byCode.entrySet()) {
    String code = entry.getKey();
    Product p   = entry.getValue();
    System.out.println(code + " => " + p.getName());
}

// (d) forEach + lambda
byCode.forEach((code, product) ->
    System.out.println(code + " : " + product.getName()));
```

Implementation choices (brief):
- **`HashMap`** — no ordering, fastest. The default.
- **`LinkedHashMap`** — preserves **insertion order** of keys.
- **`TreeMap`** — keeps keys **sorted**.

### 3.4 Choosing the right collection — a decision framework

Ask three questions about the requirement:

```
1. Do I need to look things up by a KEY (id, code, name)?
        YES -> use a Map (HashMap)
        NO  -> go to question 2

2. Must elements be UNIQUE (no duplicates allowed)?
        YES -> use a Set (HashSet)
        NO  -> go to question 3

3. Do I need ORDER / positional access / duplicates?
        YES -> use a List (ArrayList)
```

Worked judgments:

| Requirement | Best choice | Why |
|-------------|-------------|-----|
| "Keep the order in which orders arrive." | `List` (`ArrayList`) | Order matters; duplicates possible |
| "Store unique student emails." | `Set` (`HashSet`) | Uniqueness is the whole point |
| "Find a product instantly by its code." | `Map` (`HashMap`) | Key-based lookup |
| "Count how many times each word appears." | `Map<String,Integer>` | Word → count association |
| "A queue of print jobs, first in first out." | `Queue`/`LinkedList` | FIFO ordering |
| "A leaderboard sorted by score." | `TreeMap` / sorted `List` | Ordering by a comparable key |

### 3.5 Designing the `Inventory` class (encapsulation)

We do **not** expose the raw `HashMap`. Instead we wrap it in an `Inventory` class that
offers meaningful operations and protects invariants (e.g., quantities never go negative,
codes are unique). This is OOP: the data structure is an **implementation detail** hidden
behind a clean API.

```
+--------------------------------------------------+
|                   Inventory                      |
+--------------------------------------------------+
| - products : Map<String, Product>   (private)    |
+--------------------------------------------------+
| + addProduct(Product) : void                     |
| + removeProduct(String code) : boolean           |
| + findByCode(String code) : Optional<Product>    |
| + updateQuantity(String code, int delta) : void  |
| + totalValue() : double                          |
| + listAll() : List<Product>                      |
+--------------------------------------------------+
```

---

## 4. Fully worked example — a complete inventory

This example reuses the `Product` class from Session 1 (with `equals`/`hashCode` on
`code`). Here is a full, runnable `Inventory` plus a demo.

```java
import java.util.*;

public class Inventory {
    // Encapsulated: the outside world never touches the map directly.
    private final Map<String, Product> products = new HashMap<>();

    /** Adds a product. Rejects duplicates (same code) to protect the invariant. */
    public void addProduct(Product product) {
        Objects.requireNonNull(product, "product must not be null");
        if (products.containsKey(product.getCode())) {
            throw new IllegalArgumentException(
                "A product with code " + product.getCode() + " already exists");
        }
        products.put(product.getCode(), product);
    }

    /** Removes a product by code. Returns true if something was removed. */
    public boolean removeProduct(String code) {
        return products.remove(code) != null;
    }

    /** Finds a product by code; Optional avoids returning null. */
    public Optional<Product> findByCode(String code) {
        return Optional.ofNullable(products.get(code));
    }

    /** Adjusts stock by delta (positive = restock, negative = sale). */
    public void updateQuantity(String code, int delta) {
        Product p = products.get(code);
        if (p == null) {
            throw new NoSuchElementException("No product with code " + code);
        }
        int updated = p.getQuantity() + delta;
        if (updated < 0) {
            throw new IllegalArgumentException("Quantity cannot go below zero");
        }
        p.setQuantity(updated);
    }

    /** Total monetary value of all stock. */
    public double totalValue() {
        double total = 0.0;
        for (Product p : products.values()) {
            total += p.lineValue();
        }
        return total;
    }

    /** Returns a defensive copy so callers cannot mutate the internal map. */
    public List<Product> listAll() {
        return new ArrayList<>(products.values());
    }

    public int size() {
        return products.size();
    }
}
```

The `Product` class needs a small addition — a setter for quantity used by `updateQuantity`:

```java
public void setQuantity(int quantity) {
    if (quantity < 0) throw new IllegalArgumentException("quantity < 0");
    this.quantity = quantity;
}
```

**Driver / demo:**

```java
public class InventoryDemo {
    public static void main(String[] args) {
        Inventory inv = new Inventory();

        inv.addProduct(new Product("P001", "Keyboard", "Peripherals", 45.00, 10));
        inv.addProduct(new Product("P002", "Mouse",    "Peripherals", 25.50, 20));
        inv.addProduct(new Product("P003", "Monitor",  "Displays",    180.00, 5));

        // Lookup by key (fast, direct)
        inv.findByCode("P003")
           .ifPresent(p -> System.out.println("Found: " + p));

        // A sale of 3 monitors
        inv.updateQuantity("P003", -3);      // 5 -> 2
        // A restock of 15 mice
        inv.updateQuantity("P002", 15);      // 20 -> 35

        // Attempt an invalid removal amount (caught)
        try {
            inv.updateQuantity("P001", -50); // would go negative
        } catch (IllegalArgumentException e) {
            System.out.println("Rejected: " + e.getMessage());
        }

        // Remove a product
        boolean removed = inv.removeProduct("P001");
        System.out.println("Removed P001? " + removed);

        // List everything
        System.out.println("=== Current inventory ===");
        for (Product p : inv.listAll()) {
            System.out.println(p);
        }
        System.out.printf("Products: %d | Total value: $%.2f%n",
                          inv.size(), inv.totalValue());
    }
}
```

**Expected output (list order may vary — `HashMap` is unordered):**

```
Found: P003 - Monitor      (Displays) x5 @ $180.00
Rejected: Quantity cannot go below zero
Removed P001? true
=== Current inventory ===
P002 - Mouse        (Peripherals) x35 @ $25.50
P003 - Monitor      (Displays) x2 @ $180.00
Products: 2 | Total value: $1252.50
```

**What to notice:**
- The map key is the product `code`; lookups (`findByCode`) are direct, not scans.
- `updateQuantity` enforces the "no negative stock" invariant — the map alone could not.
- `listAll()` returns a **defensive copy**, so a caller cannot corrupt the internal map.
- `Optional<Product>` communicates "maybe absent" without returning a dangerous `null`.

---

## 5. Guided in-class practice

**Goal:** extend the `Inventory` class with reporting features that exercise map iteration.

Starting from the worked example, add and test these methods:

1. **`Map<String, Integer> countByCategory()`** — returns how many *distinct products*
   exist per category. Iterate `products.values()` and accumulate into a `HashMap`
   using `merge` or `getOrDefault`:
   ```java
   result.merge(p.getCategory(), 1, Integer::sum);
   ```
2. **`List<Product> lowStock(int threshold)`** — returns all products whose quantity is
   below `threshold`, using an enhanced for-loop over `products.values()`.
3. **`Optional<Product> mostValuable()`** — returns the product with the highest
   `lineValue()`. Iterate and track the running maximum.
4. **`boolean restock(String code, int amount)`** — a thin, safe wrapper over
   `updateQuantity` that returns `false` if the code does not exist instead of throwing.

**Test harness:** in a `main`, populate the inventory with at least five products across
three categories, then print the results of each new method. Verify:
- `countByCategory()` sums to the total product count.
- `lowStock(5)` includes only the products you expect.
- `mostValuable()` returns the correct product (compute by hand to check).

**Checkpoints the instructor will look for:**
- The internal `Map` stays `private`; new methods do not leak it.
- Correct use of `entrySet()`/`values()` for iteration.
- No `NullPointerException` from `get` on a missing key.

**Stretch (optional):** rewrite `lowStock` and `mostValuable` using Streams:
```java
products.values().stream()
        .filter(p -> p.getQuantity() < threshold)
        .collect(Collectors.toList());
```

---

## 6. Wrap-up and exit ticket

**Summary.** A `Map` associates unique keys with values and enables near-instant lookup by
key — the right structure whenever you retrieve things by an id or code. You iterate maps
with `keySet`, `values`, or (preferably) `entrySet`. You applied a three-question
framework to pick `List` vs `Set` vs `Map`, and you built an `Inventory` class that hides a
`HashMap` behind a clean, invariant-protecting API — the exact pattern used in the
corte-3 practical work.

**Exit ticket (submit before leaving — 5 short answers):**

1. What does `map.put(key, value)` return when `key` already exists?
2. Why is `HashMap` a better fit than `List` for "find a product by code"?
3. Name the three ways to iterate a `Map` and say which one gives you both key and value.
4. Why does `Inventory` return `Optional<Product>` (or a copy) instead of exposing its map?
5. Choose the collection for: "store the set of unique tags on an article." Justify in one line.

**Bridge to the optional activity.** The [optional GitHub challenge](../optional-activity/README.md)
asks you to grow this inventory into a small command-line application with a menu, more
robust validation, and unit-testable methods — submitted via GitHub (not Moodle). The
curated readings in [/material](../material/README.md) support both the challenge and the
corte-3 assessment.
