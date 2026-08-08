# Week 01 — Introduction to OOP and the Java development environment (JDK, JVM, packages, IDE setup)

**Object-Oriented Programming and Design** · Course code **82759** · Semester **2026-B**
**Unit 1 — Fundamentals of Object-Oriented Programming**
**Assessment period: Corte 1 (weeks 1–5)** · Accompanied time this week: **3 h** (2 sessions) · Autonomous time: **6 h**

---

## 1. Where this week sits

This is the **opening week of the course and of Unit 1**. Its job is to build the two foundations everything else rests on:

1. **A mental model** — what the object-oriented paradigm *is*, how it differs from the procedural style most students already know, and why it matters across the software life cycle.
2. **A working toolchain** — a correctly installed and configured Java environment (JDK + JVM + an IDE) in which the student can compile, run, and organize a first program into packages.

By the end of the week each student should be able to open their machine, write a small Java program in a coherent package structure, compile it, run it, and explain — in the opening forum — *why* the object-oriented way of thinking changes how we build software. Nothing here is throwaway: the environment configured this week is the same one used for all 16 weeks, and the paradigm vocabulary introduced now (object, class, message, state, behavior) is reused in every later unit.

---

## 2. Subject Learning Outcome (RAA) and competencies addressed

| Code | Statement | How Week 01 contributes |
|---|---|---|
| **90_82759** (reported as **90_82759_01**, Corte 1) | The student **builds software solutions applying the principles of OOP**, using contemporary techniques, tools, and good practices, with criteria of quality, integration, and maintainability. | Week 01 establishes the *entry conditions* for the RAA: the conceptual frame of the paradigm and a reproducible development environment. Without a running toolchain and a correct mental model, none of the later "builds software solutions" evidence is possible. |

**Competencies exercised this week**

- **Conceptual (know):** distinguish the procedural and object-oriented paradigms; locate OOP in the software life cycle; define the core vocabulary of objects and classes.
- **Procedural (know-how):** install and configure a JDK and an IDE; create a package structure; compile and run a Java program from both the command line and the IDE.
- **Attitudinal (know-how-to-be):** argue a technical position with evidence in a forum; adopt from day one the habit of organized, reproducible project setup.

---

## 3. Weekly objectives (measurable)

By the end of Week 01 the student will be able to:

1. **Explain** how the object-oriented paradigm differs from procedural programming and describe its role across the software life cycle (analysis, design, implementation, maintenance), using at least three concrete points of contrast.
2. **Install and configure** a Java development environment — a JDK (with its JVM) and one IDE among IntelliJ IDEA, Eclipse, NetBeans, or VS Code — and verify it with `java -version` and `javac -version`.
3. **Compile and run** a first Java program organized into a coherent package structure, from both the command line (`javac` / `java`) and the IDE, producing the expected console output.
4. **Distinguish** JDK, JRE, JVM, bytecode, and the *"write once, run anywhere"* execution model, and explain the role of each in turning `.java` source into a running process.
5. **Participate** in the opening forum with a reasoned, evidence-based argument on how OOP transforms the way we program, and respond substantively to at least one peer.

---

## 4. Contents outline

```
Unit 1 · Week 01
│
├── Block A — The object-oriented mindset  (Session 1)
│   ├── Programming paradigms: imperative → procedural → object-oriented
│   ├── Procedural vs OOP: data + functions   vs   objects (state + behavior)
│   ├── Core vocabulary: object, class, attribute, method, message, state, identity
│   ├── The four pillars (preview): abstraction, encapsulation, inheritance, polymorphism
│   └── OOP across the software life cycle and why it aids maintainability
│
└── Block B — The Java toolchain  (Session 2)
    ├── Platform anatomy: JDK vs JRE vs JVM; bytecode; "write once, run anywhere"
    ├── Installing the JDK; PATH / JAVA_HOME; verifying the install
    ├── Choosing and configuring an IDE (IntelliJ / Eclipse / NetBeans / VS Code)
    ├── Packages: purpose, naming convention, directory ↔ package mapping
    └── First program: compile & run from CLI and IDE inside a package
```

---

## 5. Session-by-session agenda

| Session | Duration | Focus | Deliverable / evidence |
|---|---|---|---|
| **[Session 1](01-session/README.md)** | 90 min | **From procedures to objects.** The paradigm shift, the vocabulary, the four pillars at a glance, and OOP in the life cycle. Opening forum launched. | Completed comparison table (procedural vs OOP); initial forum post drafted. |
| **[Session 2](02-session/README.md)** | 90 min | **Standing up the Java environment.** JDK/JVM anatomy, install & verify, IDE setup, packages, and a first compile-and-run of `HelloOOP` inside a package. | A verified environment (`java -version` screenshot) and a running packaged `HelloOOP`. |

> Total accompanied time: **3 hours**. The **6 hours of autonomous work** are spent finishing the environment install if needed, completing the forum (initial post + one reply), and — optionally — the [optional GitHub activity](optional-activity/README.md).

---

## 6. Key-concepts glossary

| Term | Definition |
|---|---|
| **Paradigm** | A style of organizing a program and reasoning about computation (e.g., procedural, object-oriented, functional). |
| **Procedural programming** | Style in which a program is a sequence of procedures/functions operating on separately declared data. |
| **Object-Oriented Programming (OOP)** | Style in which a program is a set of interacting **objects** that bundle **state** (data) and **behavior** (operations). |
| **Object** | A runtime entity with **identity**, **state** (attribute values), and **behavior** (methods it can perform). |
| **Class** | The blueprint/template from which objects are created; defines the attributes and methods its objects will have. |
| **Attribute (field)** | A named data element that holds part of an object's state. |
| **Method** | A named operation (behavior) an object can perform, possibly changing its state or returning a value. |
| **Message** | A request for an object to perform one of its methods (in Java, a method call). |
| **Encapsulation** | Bundling state with the behavior that operates on it and hiding internal details behind a controlled interface. |
| **Abstraction** | Modeling only the features of a thing that matter for the problem, ignoring the rest. |
| **Inheritance** | Deriving a new class from an existing one, reusing and specializing its members. |
| **Polymorphism** | The ability for the same message to produce behavior appropriate to the receiving object's actual type. |
| **JDK** (Java Development Kit) | The full toolset to *develop* Java: compiler (`javac`), tools, and a bundled JRE. |
| **JRE** (Java Runtime Environment) | What is needed to *run* Java: the JVM plus core libraries. (Modern JDKs ship the runtime; a standalone JRE is no longer distributed separately from Java 11 onward.) |
| **JVM** (Java Virtual Machine) | The abstract machine that executes Java **bytecode**; the layer that makes Java portable across operating systems. |
| **Bytecode** | The intermediate, platform-independent instructions produced by `javac` (stored in `.class` files) and executed by the JVM. |
| **Package** | A namespace that groups related classes and maps to a directory path; declared with `package ...;` at the top of a file. |
| **Classpath** | The list of locations where the JVM/compiler looks for `.class` files and libraries. |
| **`PATH` / `JAVA_HOME`** | OS environment variables that let the shell find the JDK executables and let tools locate the JDK. |
| **"Write once, run anywhere"** | Java's portability promise: the same compiled bytecode runs on any platform that has a compatible JVM. |

---

## 7. Achievement / self-check checklist

Tick each item once you can do it **without help**:

- [ ] I can name at least **three concrete differences** between procedural and object-oriented programming.
- [ ] I can define, in my own words, **object, class, attribute, method, and message**.
- [ ] I can name the **four pillars** of OOP and give a one-line description of each.
- [ ] I can explain **why OOP tends to improve maintainability** across the software life cycle.
- [ ] I have a **working JDK**: `java -version` and `javac -version` both print a version.
- [ ] I can explain the difference between **JDK, JRE, and JVM**, and what **bytecode** is.
- [ ] I have an **IDE installed and configured** to use my JDK.
- [ ] I created a class inside a **package** and understand the **directory ↔ package** mapping.
- [ ] I **compiled and ran** a Java program from the **command line** and got the expected output.
- [ ] I **compiled and ran** the same program from the **IDE**.
- [ ] I posted my **initial forum argument** and **replied to at least one peer**.

> If any box is unchecked after Session 2, resolve it during autonomous time before Week 02 — later weeks assume a working environment.

---

## 8. Resources index

| Resource | Location | Purpose |
|---|---|---|
| Session 1 guide | [`01-session/README.md`](01-session/README.md) | Theory, worked example, and in-class practice for the OOP mindset. |
| Session 2 guide | [`02-session/README.md`](02-session/README.md) | Environment setup, packages, and first compile-and-run. |
| Readings & downloads | [`material/README.md`](material/README.md) | Curated reference index with short summaries; **download area for the week PDF**. |
| Optional activity | [`optional-activity/README.md`](optional-activity/README.md) | Extra practice delivered **via GitHub** (not Moodle), with rubric. |
| Interactive OVA (SCORM) | `00-pedagogical-agreements/ova-programacion-orientada-objetos/` | Interactive learning object embedded in Moodle. |
| Course overview | [`../00-course/README.md`](../00-course/README.md) | RAA, methodology, assessment plan, and base rubrics for the whole course. |

---

## 9. Bibliography for the week

**Core (internal, CORHUILA)**
- Sommerville, I. (2011). *Software Engineering* (9th ed.). Pearson. — Ch. 1–2 (software processes and the life cycle) frame *where* design activity like OOP sits.

**Complementary (external)**
- Deitel, P., & Deitel, H. *Java: How to Program.* — Introductory chapters on the Java platform, the JDK/JVM, and a first program.
- Oracle. *The Java™ Tutorials — Getting Started* and *Learning the Java Language: Object-Oriented Programming Concepts.* (official, free)
- Bloch, J. *Effective Java* (3rd ed.). — Consulted progressively; this week only as orientation to what "good Java" looks like.

*(Full annotations and links are in [`material/README.md`](material/README.md).)*

---

*Week 01 guide, Unit 1. Topic, RAA, objectives, and assessment period taken from the official CORHUILA syllabus (code 82759, 2026-B).*
