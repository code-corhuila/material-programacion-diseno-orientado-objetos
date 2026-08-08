# Week 01 — Introduction to OOP and the Java Development Environment (JDK, JVM, packages, IDE setup)

**Program:** Software Engineering / Systems Engineering
**Course:** Object-Oriented Programming and Design
**Academic period:** 2026-B
**Unit:** Unit 1 — Fundamentals of Object-Oriented Programming
**Week:** 01 (of the semester)
**Assessment period:** Corte 1 (First cut / First partial evaluation)
**Learning outcome (RAA):** 90_82759

---

## 1. Overview

Welcome to the first week of **Object-Oriented Programming and Design**. This course teaches you to think, model, and build software using the object-oriented paradigm — the dominant approach in modern professional software engineering (Java, C#, Kotlin, C++, Python, Swift, and many others).

Before we can write a single object, we need two things:

1. A **mental model**: understanding *why* object orientation exists, *what problem* it solves compared to procedural programming, and *where* it fits in the software life cycle.
2. A **working toolchain**: a correctly installed Java Development Kit (JDK), an understanding of how the Java Virtual Machine (JVM) runs our code, and an IDE configured to compile, run, and organize programs into packages.

By the end of this week you will have a functioning Java environment, you will have compiled and executed your first package-organized Java program from both the command line and an IDE, and you will be able to argue clearly how OOP changes the way we design software.

---

## 2. Learning outcome (RAA) and competencies addressed

### RAA 90_82759
The student **applies the fundamentals of the object-oriented paradigm and configures a professional development environment** to design, implement, and execute basic programs organized into a coherent structure, distinguishing object orientation from procedural programming within the software life cycle.

### Competencies addressed this week
- **Disciplinary (technical):** Understands the conceptual foundations of OOP and the execution model of the Java platform (JDK, JVM, bytecode, packages).
- **Instrumental:** Installs, configures, and verifies a professional Java toolchain (JDK + IDE) and uses it to compile and run programs.
- **Communicative / argumentative:** Constructs and defends a reasoned position about the value of OOP in an academic forum.
- **Self-management:** Follows a reproducible setup procedure, verifies results, and documents evidence of a working environment.

---

## 3. Objectives (measurable)

By the end of Week 01, the student will be able to:

1. **Explain** at least three concrete differences between the object-oriented and procedural paradigms, and locate OOP within the phases of the software life cycle (correctly identifying analysis, design, implementation, testing, and maintenance).
2. **Install and verify** a working Java environment, demonstrating that `java -version` and `javac -version` return a valid JDK (version 17 LTS or newer) and that an IDE (IntelliJ IDEA, Eclipse, NetBeans, or VS Code) runs a program successfully.
3. **Compile and run** a first Java program organized into a coherent package structure, from both the command line (`javac` / `java`) and the chosen IDE, producing correct console output.
4. **Describe** the roles of the JDK, JRE, JVM, and bytecode, and explain the "write once, run anywhere" (WORA) principle in their own words.
5. **Participate** in the opening forum with a substantive, evidence-based argument (minimum one original post plus one reply to a peer) about how OOP transforms the way we program.

---

## 4. Contents outline

| # | Topic | Where it is covered |
|---|-------|---------------------|
| 4.1 | What is a programming paradigm? Procedural vs. object-oriented | Session 01 |
| 4.2 | Core intuition of OOP: objects, classes, state, and behavior | Session 01 |
| 4.3 | The four pillars of OOP (preview): encapsulation, abstraction, inheritance, polymorphism | Session 01 |
| 4.4 | OOP and the software life cycle | Session 01 |
| 4.5 | The Java platform: JDK, JRE, JVM, and bytecode | Session 02 |
| 4.6 | "Write once, run anywhere" (WORA) and the compilation model | Session 02 |
| 4.7 | Installing and verifying the JDK; choosing and configuring an IDE | Session 02 |
| 4.8 | Packages: purpose, naming conventions, and directory structure | Session 02 |
| 4.9 | Compiling and running a first package-organized program (CLI + IDE) | Session 02 |

---

## 5. Session-by-session agenda

### Session 01 — The object-oriented paradigm and its role in the software life cycle
- The idea of a paradigm; procedural code and its limits at scale.
- Objects as units of *state + behavior*; the class-object relationship.
- Preview of the four pillars of OOP.
- Where OOP lives in the software life cycle.
- Worked example: modeling the same problem procedurally vs. with objects (pseudocode).
- Guided practice: identify objects, attributes, and responsibilities in a real-world scenario.
- Exit ticket.

> Detailed plan: [`01-session/README.md`](01-session/README.md)

### Session 02 — The Java development environment and your first package-organized program
- The Java platform: JDK vs. JRE vs. JVM; what bytecode is and why it matters.
- WORA and the compile-then-run model.
- Installing the JDK; verifying the installation; configuring an IDE.
- Packages: what they are, why they exist, naming conventions, and how they map to folders.
- Worked example: `Hello, OOP!` inside a package, compiled and run from the command line and the IDE.
- Guided practice: create, compile, and run your own package-organized program.
- Exit ticket.

> Detailed plan: [`02-session/README.md`](02-session/README.md)

---

## 6. Key-concepts glossary

| Term | Definition |
|------|------------|
| **Paradigm** | A style or way of structuring and reasoning about a program (e.g., procedural, object-oriented, functional). |
| **Procedural programming** | A paradigm that organizes a program as a sequence of procedures/functions operating on shared data. |
| **Object-oriented programming (OOP)** | A paradigm that organizes a program as a collection of interacting objects, each bundling data (state) and the operations on it (behavior). |
| **Object** | A concrete entity in a program that has state (attributes) and behavior (methods); a runtime instance of a class. |
| **Class** | A blueprint or template that defines the attributes and methods shared by all objects of a given type. |
| **State** | The current data held by an object (the values of its attributes). |
| **Behavior** | What an object can do — the methods it exposes. |
| **Encapsulation** | Bundling data and the code that operates on it, and restricting direct access to internal state. |
| **Abstraction** | Exposing only the essential features of an entity while hiding unnecessary detail. |
| **Inheritance** | A mechanism by which a class acquires attributes and behavior from another class. |
| **Polymorphism** | The ability for the same operation to behave differently depending on the object it acts on. |
| **JDK (Java Development Kit)** | The full toolkit for developing Java programs: compiler (`javac`), tools, libraries, and a JRE. |
| **JRE (Java Runtime Environment)** | The part needed to *run* Java programs: the JVM plus core libraries (bundled inside the JDK). |
| **JVM (Java Virtual Machine)** | The abstract machine that executes Java bytecode, isolating programs from the underlying hardware/OS. |
| **Bytecode** | Platform-independent intermediate instructions (`.class` files) produced by the Java compiler and executed by the JVM. |
| **WORA** | "Write once, run anywhere": compiled bytecode runs on any platform with a compatible JVM. |
| **Package** | A namespace that groups related classes, maps to a directory structure, and prevents naming collisions. |
| **IDE** | Integrated Development Environment: an application that combines editor, compiler integration, debugger, and project tools. |
| **LTS** | Long-Term Support: a JDK release supported for an extended period (e.g., Java 17, Java 21), recommended for learning and production. |

---

## 7. Achievement / self-check checklist

Use this checklist to confirm you have met the week's objectives. You should be able to tick **every** box before Week 02.

- [ ] I can state, in my own words, what a programming paradigm is.
- [ ] I can list at least three differences between procedural and object-oriented programming.
- [ ] I can identify objects, their attributes, and their responsibilities in a described scenario.
- [ ] I can name the four pillars of OOP and give a one-line description of each.
- [ ] I can explain where OOP contributes across the software life cycle phases.
- [ ] The command `java -version` returns a JDK 17+ (LTS) on my machine.
- [ ] The command `javac -version` returns a matching compiler version.
- [ ] I have installed and opened an IDE (IntelliJ IDEA / Eclipse / NetBeans / VS Code).
- [ ] I can explain the difference between the JDK, the JRE, and the JVM.
- [ ] I can explain what bytecode is and what "write once, run anywhere" means.
- [ ] I created a Java program inside a named package with a correct folder structure.
- [ ] I compiled and ran that program from the command line (`javac` + `java`).
- [ ] I compiled and ran that program from my IDE.
- [ ] I posted my opening-forum argument and replied to at least one classmate.

---

## 8. Resources index

- **Session 01 plan and theory:** [`01-session/README.md`](01-session/README.md)
- **Session 02 plan and theory:** [`02-session/README.md`](02-session/README.md)
- **Curated readings and downloadable material (PDF area):** [`material/README.md`](material/README.md)
- **Optional practice (submitted via GitHub):** [`optional-activity/README.md`](optional-activity/README.md)

### External references (open, authoritative)
- Oracle, *The Java™ Tutorials* — "Getting Started" and "Learning the Java Language." https://docs.oracle.com/javase/tutorial/
- Oracle, *Java Platform, Standard Edition Documentation* (current LTS). https://docs.oracle.com/en/java/javase/
- Eclipse Adoptium — Temurin OpenJDK downloads. https://adoptium.net/
- JetBrains IntelliJ IDEA documentation. https://www.jetbrains.com/help/idea/
- Horstmann, C. *Core Java, Volume I — Fundamentals* (latest edition), Pearson.
- Bloch, J. *Effective Java* (3rd ed.), Addison-Wesley (reference for later weeks).

---

## 9. How this week is assessed (Corte 1 context)

This week belongs to **Corte 1**. Evidence gathered this week that feeds the first-cut grade:

- **Environment verification** (screenshots of `java -version`, `javac -version`, and your program running in the IDE).
- **Opening-forum participation** (argumentation quality — see the forum rubric in the LMS).
- **In-class practice deliverables** from Sessions 01 and 02.
- The **optional activity** (extra credit / reinforcement) is submitted through GitHub — see [`optional-activity/README.md`](optional-activity/README.md).

> Note: the `material/` folder is a **download area for a course PDF**, not a submission box. Assignments that must be turned in are described in each activity's README and, where indicated, submitted via GitHub rather than Moodle.
