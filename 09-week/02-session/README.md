# Week 09 - Session 2: Inheritance vs. composition, and refactoring toward composition

**Subject:** Object-Oriented Programming and Design (2026-B)
**Unit 2:** Design principles and modularity
**Assessment period:** Corte 2

---

## 1. Session objective

At the end of this session the student will be able to **compare inheritance and composition** across concrete criteria, state and apply the **"favor composition over inheritance"** guideline, and **refactor** a design that misuses inheritance into one that uses composition + delegation while preserving behavior.

This maps to weekly objectives **2 and 3** (and prepares objective 5, the quiz).

---

## 2. Timed agenda (110 minutes)

| Time | Activity |
|---|---|
| 0:00 - 0:10 | Recap of Session 1 + a provocative "is a `Stack` an `ArrayList`?" question |
| 0:10 - 0:35 | Theory: the problems with inheritance (fragile base class, coupling, subclass explosion) |
| 0:35 - 0:50 | Theory: the "favor composition over inheritance" guideline — what it is and is not |
| 0:50 - 1:20 | Worked example: full before/after refactoring of a misused hierarchy |
| 1:20 - 1:45 | Guided in-class practice: refactor the `Stack extends ArrayList` design |
| 1:45 - 1:50 | Wrap-up and exit ticket |

---

## 3. Theory notes

### 3.1 Inheritance is powerful — and easy to misuse

Inheritance is genuinely useful: it expresses true "is-a" relationships and lets subclasses reuse and specialize a superclass. But it comes with structural costs that beginners rarely see until a codebase grows. Three recurring problems:

#### (a) The fragile base class problem
A subclass depends not just on the *interface* of its superclass but on its *implementation details*. A harmless-looking change to the superclass can silently break subclasses.

Classic illustration — a counting collection built by extending a list:

```java
// FRAGILE: subclass overrides methods and depends on how the base uses them
class CountingList<E> extends java.util.ArrayList<E> {
    private int addCount = 0;

    @Override public boolean add(E e) {
        addCount++;
        return super.add(e);
    }
    @Override public boolean addAll(java.util.Collection<? extends E> c) {
        addCount += c.size();
        return super.addAll(c);   // <-- BUG waiting to happen
    }
    public int getAddCount() { return addCount; }
}
```

If `ArrayList.addAll` internally calls `add` for each element (an implementation detail we cannot see and are not promised), then every added element is **counted twice**: once in our `addAll`, once again in our overridden `add`. The subclass broke because it relied on *how* the base was implemented, not on a contract. That is the fragile base class problem.

#### (b) Tight coupling to the superclass
A subclass inherits **everything** the superclass exposes — including methods that make no sense for it. If `Stack` extends `ArrayList`, a stack suddenly has `add(index, element)` and `remove(index)`, letting callers reach *into the middle* of a stack and violate LIFO. Inheritance forced the subclass to accept the whole surface area of the parent.

> The humorous framing (attributed to Joe Armstrong): *"You wanted a banana but you got a gorilla holding the banana — and the entire jungle."* Inheriting to reuse one method drags in the whole class.

#### (c) Subclass explosion
When variation happens along **more than one axis**, inheritance multiplies classes combinatorially.

```
   Coffee                    Want to vary: size (S/M/L) AND milk (none/soy/oat)?
   ├── SmallCoffee           Inheritance forces one class per combination:
   ├── MediumCoffee          SmallSoyCoffee, MediumOatCoffee, LargeNoMilkCoffee, ...
   └── LargeCoffee           -> 3 x 3 = 9 classes, and it grows multiplicatively.
```

Composition collapses this: a `Coffee` **has-a** `Size` and **has-a** `MilkOption`, and you assemble the combination you need at runtime.

#### (d) Fixed at compile time
Inherited behavior is chosen when you write `extends` and cannot change while the program runs. A composed object can be **swapped at runtime** (e.g., change a payment strategy on a live order). Composition buys runtime flexibility that inheritance cannot.

### 3.2 Side-by-side comparison

| Criterion | Inheritance ("is-a") | Composition ("has-a") |
|---|---|---|
| **Coupling** | High: subclass tied to superclass internals | Low: whole depends only on the part's public interface |
| **Flexibility at runtime** | None: fixed at compile time | High: parts can be swapped while running |
| **Encapsulation** | Weakened: subclass sees `protected` internals | Preserved: part stays behind a clean interface |
| **Behavior variation on multiple axes** | Class explosion | Mix-and-match objects |
| **Reuse granularity** | All-or-nothing (whole superclass) | Fine-grained (only the parts you need) |
| **Correct relationship** | True "is-a" | "has-a" / "uses-a" |
| **When it shines** | Stable, genuine specialization hierarchies; polymorphism over a real supertype | Almost everything else, especially where behavior changes or varies |

### 3.3 The guideline: "favor composition over inheritance"

**Statement.** *When both inheritance and composition could solve a problem, prefer composition unless there is a genuine, stable "is-a" relationship that benefits from polymorphism.*

**What it means:**
- Default to assembling behavior from parts and delegating.
- Reach for inheritance deliberately, when the "is-a" test truly holds and you want polymorphic substitution (Liskov).

**What it does NOT mean:**
- It does **not** ban inheritance. Inheritance is the right tool for real hierarchies (e.g., `Shape` → `Circle`, `Square`; exception hierarchies; framework extension points).
- It does **not** mean "composition is always better." It means "prefer composition *when in doubt* or *when both fit*."

**Warning signs you are misusing inheritance:**
1. The subclass **overrides most** of the parent's methods (you're rejecting, not reusing).
2. You inherited to get **one** method but dragged in a whole class.
3. "Is-a" only sounds right if you squint; "has-a" is the honest description.
4. You feel the need to **hide** inherited methods (throw `UnsupportedOperationException`, override to no-op).
5. Adding a new variation forces a **combinatorial** set of new subclasses.

If you see these, refactor toward composition.

### 3.4 The refactoring recipe (inheritance → composition)

```
1. Identify the behavior you were reusing from the superclass.
2. Create a FIELD holding an instance of what was the superclass
   (or, better, an interface it implements).
3. In the former subclass, DELEGATE the needed methods to that field.
4. Expose ONLY the methods that make sense — drop the rest.
5. Verify external behavior is unchanged (same inputs -> same outputs).
```

This is the "wrap, don't extend" move: instead of *being* the base class, **hold one** and forward selected calls to it.

---

## 4. Worked example (fully solved): refactoring a misused hierarchy

### 4.1 The problem design (inheritance misuse)

A team modeled a `Stack` by extending `ArrayList` to "get the storage for free".

```java
// BEFORE — WRONG: a Stack is NOT an ArrayList
public class Stack<E> extends java.util.ArrayList<E> {
    public void push(E item) { add(item); }
    public E pop() { return remove(size() - 1); }
    public E peek() { return get(size() - 1); }
}
```

**Why this is broken:**
- A `Stack` is **not** an `ArrayList` (fails the honest "is-a" test — it's "has-a storage").
- Callers can bypass LIFO: `stack.add(0, x)`, `stack.remove(2)`, `stack.get(1)` are all inherited and public. The stack's core invariant (only the top is accessible) is unenforceable.
- It inherited the *entire* `ArrayList` surface just to reuse dynamic storage — the gorilla/jungle problem.

### 4.2 The refactored design (composition + delegation)

```java
// AFTER — RIGHT: a Stack HAS-A list it uses for storage
import java.util.ArrayList;
import java.util.List;
import java.util.NoSuchElementException;

public class Stack<E> {
    private final List<E> items = new ArrayList<>();  // composition (owned)

    public void push(E item) {
        items.add(item);                 // delegation
    }

    public E pop() {
        if (isEmpty()) throw new NoSuchElementException("stack is empty");
        return items.remove(items.size() - 1);   // delegation
    }

    public E peek() {
        if (isEmpty()) throw new NoSuchElementException("stack is empty");
        return items.get(items.size() - 1);       // delegation
    }

    public boolean isEmpty() { return items.isEmpty(); }  // delegation

    public int size() { return items.size(); }            // delegation
    // Only push/pop/peek/isEmpty/size are exposed.
    // add(index,...), remove(index), get(index) are NOT part of the API.
}
```

**What improved:**
- **Encapsulation restored:** callers can only `push`, `pop`, `peek`, `isEmpty`, `size`. LIFO is now enforceable.
- **Coupling reduced:** `Stack` depends on the `List` interface, not on `ArrayList` internals. We could swap `ArrayList` for `LinkedList` without touching callers.
- **Honest model:** the field literally says "a Stack has a list of items."
- **No fragile base class:** we no longer override anything or depend on how `ArrayList` implements its methods.

**Behavior preservation check** (same operations, same results):

```java
Stack<String> s = new Stack<>();
s.push("a"); s.push("b"); s.push("c");
System.out.println(s.peek()); // c
System.out.println(s.pop());  // c
System.out.println(s.pop());  // b
System.out.println(s.size()); // 1
```
Both versions produce `c`, `c`, `b`, `1` — external behavior is preserved, which is the definition of a successful refactoring.

### 4.3 A second, multi-axis example: coffee options

**Before (subclass explosion):** `SmallSoyLatte`, `LargeOatLatte`, ... one class per combination.

**After (composition):**

```java
interface MilkOption { String label(); double surcharge(); }
class NoMilk  implements MilkOption { public String label(){return "no milk";} public double surcharge(){return 0.0;} }
class SoyMilk implements MilkOption { public String label(){return "soy";}     public double surcharge(){return 0.5;} }
class OatMilk implements MilkOption { public String label(){return "oat";}     public double surcharge(){return 0.6;} }

enum Size { SMALL(2.0), MEDIUM(2.5), LARGE(3.0);
    final double base; Size(double b){ this.base = b; } }

class Coffee {
    private final Size size;            // has-a
    private final MilkOption milk;      // has-a  (swappable at runtime)
    Coffee(Size size, MilkOption milk){ this.size = size; this.milk = milk; }
    double price(){ return size.base + milk.surcharge(); }        // delegation
    String describe(){ return size + " coffee with " + milk.label(); }
}
```

```java
Coffee order = new Coffee(Size.LARGE, new OatMilk());
System.out.println(order.describe() + " = $" + order.price()); // LARGE coffee with oat = $3.6
```

Nine (and growing) subclasses became **one** class plus a handful of small, reusable parts. New milk types or sizes are added *without* multiplying classes.

---

## 5. Guided in-class practice

### Task: refactor `AuditableAccount extends HashMap`

You are given this design that (mis)uses inheritance to track how many times keys were written:

```java
// GIVEN (misused inheritance) — refactor this
public class AuditableAccount<K,V> extends java.util.HashMap<K,V> {
    private int writeCount = 0;
    @Override public V put(K key, V value) {
        writeCount++;
        return super.put(key, value);
    }
    @Override public void putAll(java.util.Map<? extends K, ? extends V> m) {
        writeCount += m.size();
        super.putAll(m);   // may double-count if putAll calls put internally
    }
    public int getWriteCount() { return writeCount; }
}
```

**Requirements:**
1. Identify **two** concrete problems with the given design (name the fragile base class risk explicitly and the coupling/leaky-API problem).
2. Refactor it to **composition + delegation**: hold a `Map<K,V>` field instead of extending `HashMap`.
3. Expose only the operations you actually need (`put`, `get`, `getWriteCount`, and `size`). Do **not** re-expose the entire `Map` interface.
4. Ensure `getWriteCount()` counts each write exactly once (verify the `putAll` case does not double-count).
5. Write a 3-line test proving external behavior (write counting) is correct.

**Reference solution:**

```java
import java.util.HashMap;
import java.util.Map;

public class AuditableAccount<K, V> {
    private final Map<K, V> data = new HashMap<>();  // composition
    private int writeCount = 0;

    public V put(K key, V value) {         // delegation + our own counting
        writeCount++;
        return data.put(key, value);
    }

    public void putAll(Map<? extends K, ? extends V> m) {
        for (Map.Entry<? extends K, ? extends V> e : m.entrySet()) {
            put(e.getKey(), e.getValue());  // reuse our put -> counts exactly once each
        }
    }

    public V get(K key)       { return data.get(key); } // delegation
    public int size()         { return data.size(); }   // delegation
    public int getWriteCount(){ return writeCount; }
}
```

```java
// Test
AuditableAccount<String,Integer> a = new AuditableAccount<>();
a.put("x", 1);
a.putAll(java.util.Map.of("y", 2, "z", 3));
System.out.println(a.getWriteCount()); // 3  (never double-counted)
```

**Discussion prompts:**
- Why does routing `putAll` through our own `put` eliminate the double-counting risk that plagued the inheritance version?
- What API surface did we *remove* by not extending `HashMap`, and why is that an improvement?

---

## 6. Wrap-up and exit ticket

### Wrap-up
- Inheritance's costs: **fragile base class**, **tight coupling**, **subclass explosion**, **compile-time rigidity**.
- **"Favor composition over inheritance"** is a heuristic: prefer composition when both fit; keep inheritance for genuine, stable "is-a" hierarchies.
- The refactoring move is **"wrap, don't extend"**: hold the former superclass as a field and **delegate**.

### Exit ticket
1. State the "favor composition over inheritance" guideline in your own words, and give one situation where inheritance is still the right choice.
2. Name **two** warning signs that inheritance is being misused.
3. For the `Stack` refactoring: name one thing callers could do in the *before* version that they **cannot** do in the *after* version — and why that is an improvement.

> Next: complete the corte-2 quiz distinguishing inheritance from composition (weekly objective 5). Review `../material/README.md` before attempting it.
