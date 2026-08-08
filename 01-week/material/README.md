# Week 01 — Study Material & Resources (Download Area)

**Course:** Object-Oriented Programming and Design · **Week:** 01 · **Unit:** 1 — Fundamentals of OOP
**Assessment period:** Corte 1 · **RAA:** 90_82759

> **About this folder:** This is a **download area** for the week's consolidated study material (a **PDF**). It is **not** a Moodle submission box — you do not turn anything in here. Use it to read, review, and prepare before and after class. Deliverables are described in the session READMEs and in the [optional activity](../optional-activity/README.md).

---

## 1. What to download

- **`week01-intro-oop-and-java-environment.pdf`** — the consolidated Week 01 reader. It gathers, in a single printable document: the OOP-vs-procedural theory, the four pillars, the Java platform (JDK/JVM/bytecode/WORA), package rules, and the fully worked `Hello, OOP!` example.

> If the PDF is not yet visible in your download area, use the session READMEs ([Session 01](../01-session/README.md), [Session 02](../02-session/README.md)) as the equivalent text; they contain the same material.

---

## 2. How to use this material

1. **Before Session 01:** read §3.1–§3.4 of the [Session 01 notes](../01-session/README.md) (paradigm, procedural limits, objects). Come with one real-world entity you would model as an object.
2. **Before Session 02:** skim §3.1–§3.6 of the [Session 02 notes](../02-session/README.md) (JDK/JVM/bytecode, packages) and, if possible, **install the JDK in advance** so class time is spent solving problems, not downloading.
3. **After the week:** use the [self-check checklist](../README.md#7-achievement--self-check-checklist) in the week guide; anything unticked points you to the exact section to re-read.

---

## 3. Curated readings (primary references)

Each entry includes a short summary so you can choose what to read first.

### 3.1 Oracle — *The Java™ Tutorials: Getting Started*
https://docs.oracle.com/javase/tutorial/getStarted/index.html
**Summary:** The canonical first walkthrough of writing, compiling, and running a Java program. Explains the compile-then-run model and the roles of `javac` and `java`. Read the "The 'Hello World!' Application" lesson.
**Focus on:** the compile/run cycle and what a `.class` file is.

### 3.2 Oracle — *The Java™ Tutorials: Learning the Java Language → Object-Oriented Programming Concepts*
https://docs.oracle.com/javase/tutorial/java/concepts/index.html
**Summary:** A concise, authoritative introduction to objects, classes, inheritance, interfaces, and packages — the vocabulary of the whole course.
**Focus on:** "What Is an Object?", "What Is a Class?", and "What Is a Package?".

### 3.3 Oracle — *The Java™ Tutorials: Packages*
https://docs.oracle.com/javase/tutorial/java/package/index.html
**Summary:** Explains why packages exist, naming conventions (reversed domain), and how package names map to directories. Directly supports Session 02's practice.
**Focus on:** "Creating and Using Packages" and "Naming a Package".

### 3.4 Eclipse Adoptium — Temurin (OpenJDK) downloads
https://adoptium.net/
**Summary:** Free, open-source, production-ready OpenJDK builds for Windows, macOS, and Linux. Choose an **LTS** release (17 or 21).
**Focus on:** picking the correct OS/architecture installer and enabling `JAVA_HOME`/`PATH` during setup.

### 3.5 Oracle — *Java Platform, Standard Edition Documentation* (current LTS)
https://docs.oracle.com/en/java/javase/
**Summary:** The full platform reference. Useful for looking up tools (`javac`, `java`, `jshell`) and the standard library API.
**Focus on:** the tool reference for `javac` and `java` command-line options.

---

## 4. Secondary / recommended books

| Reference | Why it helps this week | Chapters to read now |
|-----------|------------------------|----------------------|
| Horstmann, C. *Core Java, Vol. I — Fundamentals* (latest ed.), Pearson. | Clear, professional treatment of the Java platform and first programs. | "An Introduction to Java" and "The Java Programming Environment". |
| Deitel, P. & Deitel, H. *Java: How to Program*, Pearson. | Very beginner-friendly, with step-by-step compile/run. | Intro to computers, the Internet, and Java; Intro to Java applications. |
| Sierra, K. & Bates, B. *Head First Java*, O'Reilly. | Visual, intuitive introduction to OOP thinking. | "Breaking the Surface" and "A Trip to Objectville". |
| Bloch, J. *Effective Java* (3rd ed.), Addison-Wesley. | Professional best practices. | Reference for later weeks — bookmark it now. |

---

## 5. Short summary notes (one-page recap)

**Paradigm shift.** Procedural code separates data from the functions that act on it; OOP bundles state and behavior into objects. This makes large systems safer to change and easier to maintain.

**Objects and classes.** A class is a blueprint; an object is an instance built from it. Objects have *state* (attributes) and *behavior* (methods).

**Four pillars (A PIE).** Abstraction, Polymorphism, Inheritance, Encapsulation — the recurring themes of the whole course.

**OOP across the life cycle.** Object thinking starts in analysis (domain entities), shapes design (responsibilities and collaborations), guides implementation (classes), aids testing (isolation), and pays off most in maintenance (localized change).

**Java platform.**
- **JDK** = develop (contains compiler + JRE).
- **JRE** = run (contains JVM + libraries).
- **JVM** = executes **bytecode** and manages memory.
- **Bytecode** = platform-independent `.class` output of `javac`.
- **WORA** = one compiled artifact runs on any compatible JVM.

**Packages.** Namespaces that prevent collisions and organize code; they **map to folders**. Use CORHUILA's reversed domain prefix `co.edu.corhuila`.

**Commands to remember.**
```bash
java -version                 # verify runtime
javac -version                # verify compiler
javac -d out src/.../X.java   # compile into out/
java -cp out fully.qualified.X  # run by fully qualified class name
```

---

## 6. Related folders

- Week guide: [`../README.md`](../README.md)
- Session 01: [`../01-session/README.md`](../01-session/README.md)
- Session 02: [`../02-session/README.md`](../02-session/README.md)
- Optional activity (GitHub): [`../optional-activity/README.md`](../optional-activity/README.md)
