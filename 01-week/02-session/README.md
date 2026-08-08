# Week 01 · Session 2 — Standing up the Java environment

**Unit 1 — Fundamentals of OOP** · Corte 1 · Duration: **90 minutes**
Modality: theoretical-practical (live coding + guided setup)

---

## 1. Session objective

**Install and configure a Java development environment** (a JDK with its JVM and one IDE), then **compile and run a first Java program organized into a coherent package structure** — from both the command line and the IDE. By the end, every student has a *verified, reproducible* toolchain and a running `HelloOOP` program that prints to the console, plus the ability to explain the JDK → bytecode → JVM pipeline.

---

## 2. Timed agenda (90 min)

| Time | Segment | What happens |
|---|---|---|
| 0:00–0:10 | **Recap & exit-ticket answers** | Address the "most-needed clarification" items from Session 1. |
| 0:10–0:30 | **Theory — Platform anatomy** | JDK vs JRE vs JVM; bytecode; the compile-and-run pipeline; "write once, run anywhere". |
| 0:30–0:45 | **Guided install & verify** | Install/confirm the JDK; `JAVA_HOME` / `PATH`; verify with `java -version`, `javac -version`. |
| 0:45–0:55 | **Theory — Packages** | Why packages exist; naming convention; directory ↔ package mapping. |
| 0:55–1:15 | **Worked example (live coding)** | Create `HelloOOP` inside a package; compile & run from the **command line**. |
| 1:15–1:25 | **Guided practice** | Reproduce and extend in the **IDE**; add a second class in a subpackage. |
| 1:25–1:30 | **Wrap-up & exit ticket** | Verification checklist; troubleshooting pointers; finish the forum. |

---

## 3. Theory notes

### 3.1 Platform anatomy: JDK, JRE, JVM

Beginners routinely confuse these three. Keep the containment relationship in mind:

```
┌──────────────────────────── JDK (Java Development Kit) ────────────────────────────┐
│  Tools to DEVELOP:  javac (compiler) · jar · javadoc · jshell · debugger · ...      │
│                                                                                     │
│   ┌──────────────────────── JRE (Java Runtime Environment) ───────────────────┐    │
│   │  Everything needed to RUN Java: core class libraries (java.lang, ...) +    │    │
│   │                                                                            │    │
│   │      ┌──────────────── JVM (Java Virtual Machine) ────────────────┐        │    │
│   │      │  Loads and EXECUTES bytecode (.class). The portability      │        │    │
│   │      │  layer: one JVM build per OS, same bytecode everywhere.      │        │    │
│   │      └─────────────────────────────────────────────────────────────┘        │    │
│   └────────────────────────────────────────────────────────────────────────────┘    │
└─────────────────────────────────────────────────────────────────────────────────────┘
```

- **JDK** — what a *developer* installs. It contains the compiler `javac` and the runtime.
- **JRE** — the subset needed only to *run* Java. (From Java 11 on, Oracle no longer ships a separate standalone JRE; installing the JDK gives you the runtime too. The concept still matters.)
- **JVM** — the abstract machine that actually executes your program's **bytecode**. There is a different JVM implementation for Windows, macOS, and Linux, but they all execute the *same* bytecode — that is the mechanism behind **"write once, run anywhere."**

> **Rule of thumb:** *If you only run Java apps, you need the JRE/JVM. If you write Java, you need the JDK.* This course needs the **JDK**.

### 3.2 The compile-and-run pipeline

Java is **compiled to bytecode, then interpreted/JIT-compiled by the JVM** — a two-step model that gives both portability and speed:

```
  Hello.java  ──(javac: compile)──▶  Hello.class  ──(java: JVM loads & runs)──▶  output
  human-readable                     bytecode                    native execution on
  source code                        (portable)                  THIS operating system
```

1. You write source in a `.java` file.
2. `javac` (the compiler, part of the JDK) turns it into **`.class` bytecode** — portable, not tied to any OS.
3. `java` launches the **JVM**, which loads the `.class`, verifies it, and executes it (with Just-In-Time compilation to native code for hot paths).

Choose a **Long-Term Support (LTS)** JDK for the course (e.g., Java 17 or Java 21). LTS releases get long maintenance and are what most workplaces use.

### 3.3 Installing and verifying the JDK

1. **Install** a JDK build (e.g., Eclipse Temurin / Adoptium, Oracle JDK, or Amazon Corretto — any LTS is fine).
2. **`JAVA_HOME`** — set this environment variable to the JDK's install folder. Many tools locate the JDK through it.
3. **`PATH`** — ensure the JDK's `bin` directory is on `PATH` so the shell finds `java` and `javac`.
4. **Verify** in a fresh terminal:

```bash
java -version      # runtime version, e.g. openjdk version "21.0.x"
javac -version     # compiler version, e.g. javac 21.0.x
```

If **both** commands print a version, your toolchain works. If `javac` is missing but `java` works, you likely installed only a runtime, not the full JDK — reinstall the JDK. *(A screenshot of these two lines is this session's environment evidence.)*

### 3.4 Choosing and configuring an IDE

Any of the four course-approved IDEs is acceptable; pick one and configure it to use your installed JDK:

| IDE | Good fit for | Note |
|---|---|---|
| **IntelliJ IDEA** (Community) | Most students; excellent Java support out of the box | Recommended default; strong refactoring/inspection. |
| **Eclipse** | Traditional Java courses; plugin ecosystem | Set the JDK under *Preferences → Java → Installed JREs*. |
| **NetBeans** | All-in-one, Maven-friendly | Bundles many Java tools. |
| **VS Code** | Lightweight; multi-language users | Install the *Extension Pack for Java*; point it to your JDK. |

The IDE does **not** replace understanding the CLI — it *wraps* `javac`/`java`. We compile from the command line first precisely so the IDE stops being a black box.

### 3.5 Packages — organizing classes

A **package** is a **namespace** that groups related classes and prevents name clashes. It is declared as the first statement of a file:

```java
package co.edu.corhuila.oop.week01;
```

**Two rules that trip up beginners:**

1. **Directory ↔ package mapping.** The package name must match the folder path. A class in package `co.edu.corhuila.oop.week01` must live in `.../co/edu/corhuila/oop/week01/`.
2. **Naming convention.** Package names are **all lowercase**, using a reverse-domain style (`co.edu.corhuila...`) to guarantee global uniqueness. Class names use **PascalCase** (`BankAccount`); methods and variables use **camelCase** (`getBalance`).

```
project-root/
└── src/
    └── co/edu/corhuila/oop/week01/
        ├── HelloOOP.java        →  package co.edu.corhuila.oop.week01;
        └── model/
            └── Course.java      →  package co.edu.corhuila.oop.week01.model;
```

Packages are the first, simplest tool of *modularity* — a theme that runs through the whole course.

---

## 4. Worked example — `HelloOOP` in a package (live coding)

We build a minimal but *correctly structured* program and run it from the command line, then the IDE.

### 4.1 The source file

Create `src/co/edu/corhuila/oop/week01/HelloOOP.java`:

```java
package co.edu.corhuila.oop.week01;

/**
 * First Java program of the course, organized inside a package.
 * Demonstrates the compile-and-run pipeline and basic OOP structure.
 */
public class HelloOOP {

    public static void main(String[] args) {
        // 'System.out' is an object; 'println' is a message (method call) sent to it.
        System.out.println("Hello, Object-Oriented World!");
        System.out.println("Compiled by javac, executed by the JVM.");
    }
}
```

Note two OOP ideas already present: `System.out` is an **object**, and `println(...)` is a **message** sent to it. Even "hello world" is object interaction.

### 4.2 Compile and run from the command line

From the **project root** (the folder that contains `src/`):

```bash
# 1) Compile: -d out puts .class files in an 'out' folder, mirroring the package path
javac -d out src/co/edu/corhuila/oop/week01/HelloOOP.java

# 2) Run: -cp out sets the classpath; then the FULLY-QUALIFIED class name
java -cp out co.edu.corhuila.oop.week01.HelloOOP
```

**Expected output:**

```
Hello, Object-Oriented World!
Compiled by javac, executed by the JVM.
```

**What each part means:**

- `javac -d out ...` → compile, sending bytecode into `out/co/edu/corhuila/oop/week01/HelloOOP.class`.
- `java -cp out ...` → start the JVM, look for classes under `out`, and run the class **by its fully-qualified name** (package + class). You do **not** write `.class` or a file path here — you name the class.

**Common first errors (and the fix):**

| Symptom | Cause | Fix |
|---|---|---|
| `error: Could not find or load main class HelloOOP` | Ran with the short name, ignoring the package | Use the **fully-qualified** name: `co.edu.corhuila.oop.week01.HelloOOP`. |
| `'javac' is not recognized` | JDK `bin` not on `PATH` | Fix `PATH`/`JAVA_HOME`, open a new terminal. |
| `class ... is public, should be declared in a file named ...` | File name ≠ public class name | Name the file exactly `HelloOOP.java`. |
| Package/`.class` not found at run time | Classpath doesn't point at `out` | Include `-cp out`. |

### 4.3 The same program in the IDE

1. Create a new Java project; set the project SDK to your installed JDK.
2. Recreate the package `co.edu.corhuila.oop.week01` (the IDE builds the folders for you).
3. Add `HelloOOP` and press **Run**. The IDE runs the same `javac`/`java` steps under the hood and shows the console output.

Seeing identical output from CLI and IDE proves the IDE is *only automating* the pipeline you already understand.

---

## 5. Guided in-class practice (10–15 min)

Starting from `HelloOOP`:

1. **Add a second class in a subpackage.** Create `src/co/edu/corhuila/oop/week01/model/Course.java`:

   ```java
   package co.edu.corhuila.oop.week01.model;

   public class Course {
       private String name;

       public Course(String name) {
           this.name = name;
       }

       public String describe() {
           return "Course: " + name;
       }
   }
   ```

2. **Use it from `HelloOOP`** by importing it and creating an object:

   ```java
   import co.edu.corhuila.oop.week01.model.Course;
   // inside main:
   Course c = new Course("Object-Oriented Programming and Design");
   System.out.println(c.describe());
   ```

3. **Recompile both files and run.** Compile every source at once, then run the main class:

   ```bash
   javac -d out src/co/edu/corhuila/oop/week01/HelloOOP.java \
                src/co/edu/corhuila/oop/week01/model/Course.java
   java -cp out co.edu.corhuila.oop.week01.HelloOOP
   ```

   Expected additional line:

   ```
   Course: Object-Oriented Programming and Design
   ```

4. **Checkpoint questions:** Which line *creates an object*? Which line *sends a message*? Which folder holds `Course.class`, and why must its path match its package?

*Expected outcome:* a two-class, two-package program compiled and run successfully, reinforcing the directory ↔ package mapping and the object/message vocabulary from Session 1.

---

## 6. Wrap-up and exit ticket

**Three takeaways**

1. The pipeline is **`.java` → (javac) → `.class` bytecode → (JVM) → output**; the **JDK** gives you `javac`, the **JVM** runs the bytecode, and the same bytecode runs on any OS.
2. A **package** is a namespace whose name **must mirror the directory path**; lowercase package names, PascalCase classes, camelCase methods.
3. The **IDE automates** the exact `javac`/`java` steps you ran by hand — it is a convenience, not magic.

**Environment verification checklist (must all pass):**

- [ ] `java -version` and `javac -version` both print a version.
- [ ] `HelloOOP` compiles with `javac -d out ...` and runs with `java -cp out <fully.qualified.Name>`.
- [ ] The same program runs from my IDE with identical output.
- [ ] `Course` lives in the `.../model/` folder matching its package, and `HelloOOP` uses it.

**Exit ticket (post before you leave):**

1. Paste your `java -version` / `javac -version` output (or a screenshot) as environment evidence.
2. In one sentence, explain what `javac` produces and what `java` does with it.
3. State one thing that broke during setup and how you fixed it (or "nothing broke").

**Autonomous work (this week):** finish any pending install so every checkbox in the [week checklist](../README.md#7-achievement--self-check-checklist) is ticked; complete the **opening forum** (initial post + one reply); optionally attempt the [optional GitHub activity](../optional-activity/README.md).
