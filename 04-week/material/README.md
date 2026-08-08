# Week 04 — Reading & Resource Materials (Download Area)

> Object-Oriented Programming and Design · 2026-B · Unit 1 · Corte 1
> Topic: **Constructors, constructor overloading, and object representation with `toString()`**

**This folder is a DOWNLOAD area.** Place the week's PDF here for students to **download and read**.
It is **not** a Moodle submission box — nothing is turned in through this folder. The graded quiz is
completed in the LMS, and the optional challenge is submitted via **GitHub** (see
[`../optional-activity/README.md`](../optional-activity/README.md)).

Suggested file to drop in this folder:

```
week04-constructors-and-toString.pdf
```

---

## 1. How to use this material

1. **Before Session 1:** skim §A (Constructors) below and reading R1. Come with one question.
2. **Between sessions:** read §B (Overloading & chaining) and §C (`toString()`); attempt the
   self-check questions.
3. **After Session 2:** use the "Quick reference card" (§E) while doing the quiz and the optional
   activity.

Estimated independent-study time: **90–120 minutes** (aligned with the course's autonomous-hours load).

---

## 2. Summary notes

### §A — Constructors

A **constructor** initializes an object at creation time. It shares the class's name, has **no return
type**, and runs automatically with `new`. If you declare no constructor, the compiler supplies an
implicit empty **default constructor**; declaring *any* constructor removes that gift, so add an
explicit no-argument constructor if you still need `new ClassName()`. Use **`this.field = field;`** to
assign a parameter to a same-named field (field shadowing), and validate arguments inside the
constructor (**fail-fast**) so invalid objects can never exist.

### §B — Constructor overloading & `this(...)` chaining

**Overloading** = several constructors with the same name but different **parameter lists**
(signatures = ordered parameter *types*; names and return type don't count). To avoid duplicated
setup code, keep one **primary constructor** with all the logic and have the others delegate to it
using **`this(...)`**, which must be the **first statement** of the delegating constructor.

### §C — Object representation with `toString()`

`toString()` is inherited from `java.lang.Object`; its default (`ClassName@hexhash`) is unhelpful.
**Override** it with `@Override` to return a readable string such as
`ClassName{field1=..., field2=...}`. It is invoked **automatically** by `println`, string
concatenation, `String.valueOf`, debuggers, and loggers. Keep it side-effect free and avoid leaking
sensitive data.

---

## 3. Curated readings

> Links point to authoritative, free sources. Titles are given so the material can be located even if
> a URL changes.

| # | Reading | Source | Why read it |
|:-:|---------|--------|-------------|
| **R1** | *The Java Tutorials* → "Providing Constructors for Your Classes" | Oracle (docs.oracle.com/javase/tutorial/java/javaOO/constructors.html) | Canonical, beginner-friendly explanation of constructors and the default constructor rule. |
| **R2** | *Java Language Specification* → §8.8 "Constructor Declarations" & §8.8.7 "Constructor Body / Explicit Constructor Invocations" | Oracle | The authoritative rules for `this(...)` and constructor bodies (reference, not light reading). |
| **R3** | `java.lang.Object.toString()` — API documentation | Oracle (docs.oracle.com/en/java/javase/17/docs/api) | Defines the inherited contract you are overriding. |
| **R4** | *Effective Java*, 3rd ed. — **Item 12: "Always override `toString`"** | Joshua Bloch (Addison-Wesley) | The definitive argument and best practices for meaningful representations. |
| **R5** | *Effective Java*, 3rd ed. — **Item 1** (static factory methods) & **Item 2** (builder) | Joshua Bloch | Context for *when* constructors are and aren't the best creation tool (telescoping constructors). |
| **R6** | "Objects, Classes, and Interfaces" trail — recap of encapsulation | Oracle Java Tutorials | Refresher connecting Week 4 to the private-fields work of Weeks 1–3. |

### Local companions in this repository

- Interactive OVA (SCORM) for Week 4: `../01-session/index.html` and
  `../01-session/builds/OVA-SEMANA4-SCORM.zip`.
- Session guides: [`../01-session/README.md`](../01-session/README.md) and
  [`../02-session/README.md`](../02-session/README.md).

---

## 4. Worked snippets to keep handy

**Parameterized constructor with validation**

```java
public Product(String name, double price) {
    if (name == null || name.isBlank())
        throw new IllegalArgumentException("name required");
    if (price < 0)
        throw new IllegalArgumentException("price must be >= 0");
    this.name = name;
    this.price = price;
}
```

**Overloading with `this(...)` chaining**

```java
public Product(String name) { this(name, 0.0); }   // delegates to the primary constructor
```

**Overridden `toString()`**

```java
@Override
public String toString() {
    return "Product{name='" + name + "', price=" + price + "}";
}
```

---

## 5. Self-check questions (answers included)

1. When does the compiler stop giving you a default constructor?
   <details><summary>Answer</summary>As soon as you declare any constructor yourself.</details>
2. Are `A(int x)` and `A(int y)` valid overloads?
   <details><summary>Answer</summary>No — same signature `(int)`; parameter names don't matter.</details>
3. Where must `this(...)` appear?
   <details><summary>Answer</summary>As the first statement of the constructor.</details>
4. What does `System.out.println(obj)` print if `toString()` is not overridden?
   <details><summary>Answer</summary>Something like `ClassName@1b6d3586` (class name + hex hashcode).</details>
5. Name two callers that invoke `toString()` automatically.
   <details><summary>Answer</summary>Any two of: `System.out.println`, string concatenation with `+`,
   `String.valueOf`, IDE debuggers, logging frameworks.</details>

---

## 6. Quick reference card (§E)

```
CONSTRUCTOR            same name as class · no return type · runs on `new`
DEFAULT (implicit)     free only if you declare NO constructor
this.field = field;    assign parameter to shadowed field
OVERLOAD               same name · different parameter list (types/count/order)
this(...)              call another constructor · MUST be first statement
@Override toString()   returns String · auto-called by println/concat/debugger
                       format tip:  ClassName{f1=..., f2=...}
```

---

*Instructor note:* export this file (plus the session guides) to a single **PDF** named
`week04-constructors-and-toString.pdf` and place it in this folder so students have an offline copy.
