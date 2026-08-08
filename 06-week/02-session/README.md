# Week 06 · Session 02 — Constructor chaining with `super()` and specializing behavior

> **Unit 2:** Design principles and modularity · **Assessment period:** Corte 2
> **RAA:** `90_82759`

---

## 1. Session objective

By the end of this session, the student will **use `super(...)` to invoke a parent constructor and
reuse inherited behavior**, initializing a multi-level hierarchy so that every object's inherited
fields hold the intended values, and will **specialize** behavior by extending — not replacing — parent
methods via `super.method()`, without duplicating parent code.

---

## 2. Timed agenda (110 min)

| Time | Activity |
|:---:|---|
| 0:00 – 0:08 | Recap of Session 01 + the "who initializes the parent?" question. |
| 0:08 – 0:35 | Theory: constructor chaining, `super(...)`, the implicit `super()`, initialization order. |
| 0:35 – 0:50 | Theory: `super.member` to reuse/extend behavior; `super()` vs `super.method()`. |
| 0:50 – 1:20 | Worked example: three-level `Person → Student → GraduateStudent` hierarchy. |
| 1:20 – 1:42 | Guided in-class practice: `Shape → Rectangle → Square`. |
| 1:42 – 1:50 | Wrap-up + exit ticket. |

---

## 3. Recap and the driving question (8 min)

Last session we set fields directly (`m.baseSalary = 4000;`). Real classes use **constructors**. But
we also learned that **constructors are not inherited**. So if a `Manager` object contains an
`Employee` part, and the code that knows how to initialize that part lives in `Employee`'s
constructor… **who calls it?**

The answer is `super(...)`: the child's constructor asks the parent's constructor to initialize the
inherited part first, then adds its own.

---

## 4. Theory notes

### 4.1 An object is built parent-first

A subclass object physically contains the fields declared by every ancestor. Java guarantees those
layers are initialized **top-down**: the parent's constructor runs to completion **before** the child's
constructor body begins. Conceptually:

```
new GraduateStudent(...)          Memory layout of ONE object
        │                         ┌───────────────────────────┐
        ▼                         │ Person part   (name, age)  │ ← initialized 1st
  Object()  runs                  ├───────────────────────────┤
  Person(...)  runs               │ Student part  (program)    │ ← initialized 2nd
  Student(...)  runs              ├───────────────────────────┤
  GraduateStudent(...) runs       │ GraduateStudent (advisor)  │ ← initialized 3rd
                                  └───────────────────────────┘
```

### 4.2 `super(...)` — calling the parent constructor

`super(arguments)` invokes a constructor of the direct parent. Two hard rules:

1. If present, `super(...)` **must be the very first statement** of the constructor. Nothing (except
   comments) may come before it.
2. It selects the parent constructor whose parameters match the arguments — just like overload
   resolution.

```java
class Person {
    protected String name;
    protected int age;
    Person(String name, int age) {      // no no-arg constructor here!
        this.name = name;
        this.age  = age;
    }
}

class Student extends Person {
    private String program;
    Student(String name, int age, String program) {
        super(name, age);       // ← must be first; initializes the Person part
        this.program = program; // ← then the Student part
    }
}
```

### 4.3 The implicit `super()` — and when it breaks

If you do **not** write `super(...)` as the first line, the compiler silently inserts a call to the
parent's **no-argument** constructor, `super()`.

```java
class Student extends Person {
    Student() {
        // compiler inserts an implicit: super();
    }
}
```

This works **only if the parent actually has a no-arg constructor**. In §4.2, `Person` declares a
constructor with parameters, so Java does **not** provide a default no-arg one. Therefore:

```java
class Student extends Person {
    Student() { }   // ❌ COMPILE ERROR:
                    // "There is no default constructor available in 'Person'"
}
```

**Fix:** call the existing parent constructor explicitly:

```java
class Student extends Person {
    Student() {
        super("Unknown", 0);   // ✅ explicit call satisfies Person
    }
}
```

> **Takeaway.** The implicit `super()` is a convenience, not a guarantee. The moment a parent defines
> any constructor with parameters (and no no-arg one), every child **must** call `super(...)` explicitly.

### 4.4 `super()` vs `super.method()` — two different tools

These look similar but do opposite-scope jobs:

| Form | Where it is used | What it does |
|---|---|---|
| `super(args);` | **First line** of a *constructor* only. | Runs the parent **constructor**. |
| `super.method(args)` | Anywhere inside an *instance method* of the child. | Calls the parent's **version** of that method. |
| `super.field` | Inside the child. | Reads the parent's field (rarely needed; useful when names collide). |

`super.method()` lets you **extend** parent behavior instead of throwing it away:

```java
class Person {
    String describe() { return name + ", age " + age; }
}
class Student extends Person {
    String program;
    @Override
    String describe() {
        // reuse the parent's work, then add to it — no duplication
        return super.describe() + ", studying " + program;
    }
}
```

Without `super.describe()`, we would have to re-type the `name + ", age " + age` logic — the very
duplication inheritance is meant to remove.

### 4.5 A note on `@Override`

When a child provides its own version of a method that already exists in the parent, that is
**overriding**. Annotating it with `@Override` asks the compiler to verify the signature really matches
a parent method — catching typos early. We use it here as good hygiene; full polymorphism is next
week's topic.

---

## 5. Fully worked example — a three-level hierarchy

**Goal:** build `Person → Student → GraduateStudent`, initializing every layer through `super(...)`
chains and extending `describe()` at each level with `super.describe()`.

```java
class Person {
    protected String name;
    protected int age;

    Person(String name, int age) {
        this.name = name;
        this.age  = age;
        System.out.println("  [Person ctor] " + name);
    }

    String describe() {
        return name + " (age " + age + ")";
    }
}

class Student extends Person {
    protected String program;

    Student(String name, int age, String program) {
        super(name, age);              // initialize the Person layer first
        this.program = program;
        System.out.println("  [Student ctor] " + program);
    }

    @Override
    String describe() {
        return super.describe() + ", enrolled in " + program;   // reuse + extend
    }
}

class GraduateStudent extends Student {
    private String advisor;

    GraduateStudent(String name, int age, String program, String advisor) {
        super(name, age, program);     // initialize the Student (and thus Person) layers
        this.advisor = advisor;
        System.out.println("  [GraduateStudent ctor] advised by " + advisor);
    }

    @Override
    String describe() {
        return super.describe() + ", advised by " + advisor;    // reuse + extend again
    }
}

public class Campus {
    public static void main(String[] args) {
        System.out.println("Creating a GraduateStudent:");
        GraduateStudent g = new GraduateStudent("Lucia", 24, "Mechatronics", "Dr. Rojas");

        System.out.println("\nDescribe():");
        System.out.println(g.describe());
    }
}
```

### 5.1 Expected output

```
Creating a GraduateStudent:
  [Person ctor] Lucia
  [Student ctor] Mechatronics
  [GraduateStudent ctor] advised by Dr. Rojas

Describe():
Lucia (age 24), enrolled in Mechatronics, advised by Dr. Rojas
```

### 5.2 Reading the output

- **Constructor order.** Even though we called `new GraduateStudent(...)`, the first line printed is
  `[Person ctor]`. Each `super(...)` climbs up before its own body runs, so construction completes
  **top-down**: Person → Student → GraduateStudent.
- **No duplication in `describe()`.** Each level added exactly one clause and delegated the rest to
  `super.describe()`. The string `"Lucia (age 24)"` is produced by `Person` alone and reused twice.
- **Single point of change.** If the age format ever changes, we edit `Person.describe()` once and all
  three levels update.

### 5.3 Common error to recognize

If a student forgets `super(name, age, program)` in `GraduateStudent` and the parent `Student` has no
no-arg constructor, the compiler reports:

```
error: constructor Student in class Student cannot be applied to given types;
  required: String,int,String   found: no arguments
```

This is the implicit-`super()` rule from §4.3 firing three levels deep.

---

## 6. Guided in-class practice — `Shape → Rectangle → Square` (22 min)

Work in pairs; compile after each step.

**Step 1 — Base class `Shape`.**
- field `protected String color;`
- constructor `Shape(String color)` that assigns it.
- method `String describe()` returning `"A " + color + " shape"`.

**Step 2 — `Rectangle extends Shape`.**
- fields `protected double width, height;`
- constructor `Rectangle(String color, double width, double height)` — call `super(color)` **first**,
  then set width/height.
- method `double area()` returning `width * height`.
- override `describe()` to return `super.describe() + " (rectangle " + width + "x" + height + ")"`.

**Step 3 — `Square extends Rectangle`.**
- constructor `Square(String color, double side)` — call `super(color, side, side)`. (A square **is a**
  rectangle with equal sides; reuse, do not re-implement `area()`.)
- do **not** rewrite `area()`; it is inherited and already correct.

**Step 4 — Driver.**
```java
Square s = new Square("blue", 4);
System.out.println(s.describe());
System.out.println("area = " + s.area());
```

**Expected output:**
```
A blue shape (rectangle 4.0x4.0)
area = 16.0
```

**Checkpoint questions:**
1. How many times is `area()` implemented in the whole hierarchy? (Expected: **once**, in `Rectangle`.)
2. What happens if you remove `super(color, side, side)` from `Square`? Predict the compiler message,
   then verify.
3. Rewrite `Square`'s reasoning as an "is-a" sentence. Is inheritance justified here? Discuss the
   subtle geometry-vs-code debate ("is a Square really a Rectangle in code?") as a preview of
   inheritance's *limits*.

---

## 7. Wrap-up (8 min)

- Objects are built **parent-first**; each layer's constructor runs before the child's body.
- `super(...)` calls the parent constructor and **must be the first statement**.
- The compiler inserts an implicit `super()` only when a **no-arg** parent constructor exists.
- `super.method()` **reuses and extends** parent behavior with zero duplication.
- `super(...)` (constructor) and `super.method()` (parent behavior) are different tools — do not confuse
  them.

**Bridge to Week 07:** you have now seen methods redefined in subclasses (`describe()`) and marked with
`@Override`. Next week formalizes this as **method overriding and polymorphism** — how one reference
type can invoke many behaviors at runtime.

---

## 8. Exit ticket (submit before leaving)

1. Given `class A { A(int x) {} }` and `class B extends A { B() {} }`, does `B` compile? Explain in one
   sentence and give the fix.
2. Order these by the moment their constructor **body** starts running for `new C()`, where
   `C extends B` and `B extends A`: A, B, C.
3. Write a one-line `describe()` in a subclass that appends `" [verified]"` to the parent's description
   **without** re-typing the parent's text.
