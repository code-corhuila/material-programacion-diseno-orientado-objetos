# Week 01 — Reading & Resource Material

**Object-Oriented Programming and Design** · Unit 1 · Corte 1
Curated readings and references for **Week 01 — Introduction to OOP and the Java development environment**.

> **What this folder is.** This is a **download area**. The consolidated weekly PDF and any reference files live here for students to **download and read**. It is **not** a Moodle submission box — you do not upload anything here. Graded work is the **forum** (in Moodle) and, optionally, the [GitHub activity](../optional-activity/README.md).

---

## 1. How to use this material

Read in this order for the smoothest week:

1. **Before Session 1** — skim §2.1 (conceptual) to arrive with the vocabulary.
2. **Before Session 2** — follow §2.2 (environment) so your install is ready or nearly ready.
3. **After both sessions** — use §2.3 to deepen and §4 to self-test.

Each entry has a **one-paragraph summary** and a **why-it-matters** note so you can decide how deeply to read. Prioritize the items marked **[Core]**; the rest are optional depth.

---

## 2. Curated reading list

### 2.1 The object-oriented mindset (conceptual)

**[Core] Oracle — *The Java Tutorials*: "Object-Oriented Programming Concepts."**
The official, free introduction to *object, class, inheritance, interface, and package*, written for newcomers.
*Summary:* defines an object as a bundle of **state** and **behavior**, a class as its blueprint, and walks through the vocabulary the whole course reuses.
*Why it matters:* it is the shortest authoritative source for the exact terms used in Session 1.

**[Core] Sommerville, I. — *Software Engineering* (9th ed.), Ch. 1–2.**
Frames the **software life cycle** and software-process models.
*Summary:* explains the stages (analysis → design → implementation → testing → evolution) and why **maintenance dominates cost** in real systems.
*Why it matters:* this is the evidence behind Session 1's central claim — that OOP's biggest payoff is *cheaper change* over a system's life.

**Deitel & Deitel — *Java: How to Program*, introductory chapters.**
A gentle, example-driven introduction to OOP thinking and the Java platform.
*Summary:* motivates objects with real-world analogies and introduces the platform (JDK/JVM) before the first program.
*Why it matters:* good second explanation if the Oracle tutorial feels terse.

### 2.2 The Java toolchain (environment)

**[Core] Oracle — *The Java Tutorials*: "Getting Started" ("Hello World!" lesson).**
Step-by-step first compile-and-run.
*Summary:* shows the `.java` → `javac` → `.class` → `java` pipeline exactly as demonstrated in Session 2, for Windows, macOS, and Linux.
*Why it matters:* the canonical reference if your `HelloOOP` won't compile or run.

**[Core] Adoptium (Eclipse Temurin) — JDK downloads & install guides.**
A free, widely used, production-grade OpenJDK build.
*Summary:* download an **LTS** JDK (e.g., 17 or 21) and follow the per-OS install notes, including setting `JAVA_HOME`/`PATH`.
*Why it matters:* this is the recommended way to get a working JDK for the course.

**IDE getting-started guides (pick the one you'll use):**
- **IntelliJ IDEA** — "Create your first Java application." *(recommended default)*
- **Eclipse** — "Java development user guide → Getting started."
- **Apache NetBeans** — "Java Quick Start Tutorial."
- **VS Code** — "Java in Visual Studio Code" (install the *Extension Pack for Java*).
*Why they matter:* each shows how to point the IDE at your JDK and run a program — the IDE half of Session 2.

**Oracle — "The Java Platform" / "How the Java Virtual Machine works" (overview articles).**
*Summary:* explains JDK vs JRE vs JVM, bytecode, and "write once, run anywhere."
*Why it matters:* backs up the platform-anatomy diagram in Session 2 §3.1.

### 2.3 Going deeper (optional)

**Bloch, J. — *Effective Java* (3rd ed.).**
The standard reference on writing *good* Java.
*Summary:* concise, opinionated "items" on best practices; not for cover-to-cover reading yet.
*Why it matters:* previews the quality bar the course builds toward; consult individual items as topics arise.

**Gamma, Helm, Johnson & Vlissides — *Design Patterns*.**
*Summary:* catalog of reusable object-oriented design solutions.
*Why it matters:* far ahead of Week 01, listed so you know where the paradigm leads; revisited in Cortes 2–3.

---

## 3. Quick-reference cheat sheet

**Vocabulary (Session 1)**

| Term | One-liner |
|---|---|
| Object | Runtime entity with identity + state + behavior |
| Class | Blueprint that defines an object's attributes and methods |
| Attribute / Method | State element / behavior operation |
| Message | A request to run a method (a method call) |
| Four pillars | Abstraction · Encapsulation · Inheritance · Polymorphism |

**Toolchain commands (Session 2)**

```bash
java -version         # check the runtime/JVM
javac -version        # check the compiler (proves you have the JDK)

# compile into ./out, preserving package folders
javac -d out src/co/edu/corhuila/oop/week01/HelloOOP.java

# run by FULLY-QUALIFIED class name (not a file path)
java -cp out co.edu.corhuila.oop.week01.HelloOOP
```

**Naming conventions**

| Element | Style | Example |
|---|---|---|
| Package | all lowercase, reverse-domain | `co.edu.corhuila.oop.week01` |
| Class | PascalCase | `BankAccount` |
| Method / variable | camelCase | `getBalance`, `totalAmount` |
| Constant | UPPER_SNAKE_CASE | `MAX_BALANCE` |

---

## 4. Self-test questions (ungraded)

Use these to check readiness before Week 02:

1. In one sentence each, distinguish **JDK**, **JRE**, and **JVM**.
2. What does `javac` produce, and what runs it?
3. Why is Java called *"write once, run anywhere"* — what makes that possible?
4. Give **three** concrete differences between procedural and object-oriented programming.
5. A class declares `package co.edu.corhuila.oop.week01.model;`. In which folder must its `.java` file live?
6. Why does encapsulation make maintenance cheaper than the procedural approach?
7. In `acc.deposit(100)`, which part is the **object**, which is the **message**, and which is the **argument**?

*(Answers are discussed at the start of Week 02; attempt them first.)*

---

## 5. Downloadable files in this folder

| File | Description |
|---|---|
| `week01-oop-intro.pdf` *(when published)* | Consolidated PDF of the Week 01 guide + both session notes, for offline reading. |
| This `README.md` | The resource index you are reading. |

> If the PDF is not yet present, the Markdown guides in [`../01-session/`](../01-session/README.md) and [`../02-session/`](../02-session/README.md) contain the same content.

---

*Reference list aligned with the course bibliography in [`../../00-course/README.md`](../../00-course/README.md). External links are stable official sources; prefer the LTS JDK and the current edition of each tutorial.*
