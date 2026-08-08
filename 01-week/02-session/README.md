# Session 02 — The Java Development Environment and Your First Package-Organized Program

**Course:** Object-Oriented Programming and Design · **Week:** 01 · **Unit:** 1 — Fundamentals of OOP
**Assessment period:** Corte 1 · **RAA:** 90_82759
**Estimated duration:** 2 hours (120 minutes)

---

## 1. Session objective

Install and configure a working Java development environment (JDK/JVM plus an IDE), explain the roles of the JDK, JRE, JVM, and bytecode, and compile and run a first Java program organized into a coherent package structure — from both the command line and the IDE.

---

## 2. Timed agenda (120 min)

| Time | Segment | Activity |
|------|---------|----------|
| 0:00 – 0:10 | Warm-up | Recap of Session 01; today's goal: a running Java program. |
| 0:10 – 0:35 | Theory I | The Java platform: JDK vs. JRE vs. JVM; bytecode; the WORA principle. |
| 0:35 – 0:55 | Theory II | Packages: what/why, naming conventions, folder mapping. |
| 0:55 – 1:20 | Live demo | Install & verify the JDK; configure the IDE; anatomy of a Java file. |
| 1:20 – 1:30 | Break / Q&A | — |
| 1:30 – 1:55 | Guided practice | Each student compiles & runs a package-organized program (CLI + IDE). |
| 1:55 – 2:00 | Wrap-up | Exit ticket + environment-evidence reminder. |

---

## 3. Theory notes

### 3.1 The Java platform: JDK, JRE, JVM

These three acronyms are the source of most early confusion. Here is the clean mental model.

```
+-------------------------------------------------------------+
|                          JDK                                |
|  (everything you need to DEVELOP Java programs)             |
|                                                             |
|   javac (compiler)   javadoc   jar   jshell   debugger ...  |
|                                                             |
|   +-----------------------------------------------------+   |
|   |                      JRE                            |   |
|   |  (everything you need to RUN Java programs)         |   |
|   |                                                     |   |
|   |    +-------------------------+   core libraries     |   |
|   |    |          JVM            |   (java.lang, ...)   |   |
|   |    | executes bytecode,      |                     |   |
|   |    | manages memory (GC)     |                     |   |
|   |    +-------------------------+                     |   |
|   +-----------------------------------------------------+   |
+-------------------------------------------------------------+
```

- **JVM (Java Virtual Machine):** the abstract "computer" that actually executes your compiled program. It reads **bytecode**, translates it to native machine instructions for the current OS/CPU, and manages memory automatically (garbage collection). The JVM is what makes Java portable.
- **JRE (Java Runtime Environment):** the JVM plus the standard class libraries. It is enough to *run* a Java program but not to *compile* one. (In modern Java the JRE is delivered as part of the JDK rather than as a separate download.)
- **JDK (Java Development Kit):** the JRE plus development tools — most importantly the compiler `javac`. **This is what you install as a developer.**

> Rule of thumb: **To run** Java you need a JRE/JVM. **To develop** Java you install the **JDK** (which contains the rest).

### 3.2 What is bytecode, and why does it exist?

When you write Java source (`.java`), the compiler `javac` does **not** produce a native `.exe`. Instead it produces **bytecode** in `.class` files: a compact, platform-independent instruction set that the JVM understands.

```
   Hello.java   --[ javac (compile) ]-->   Hello.class   --[ java (JVM runs) ]-->  output
   (source)                                (bytecode)                              (behavior)
```

This two-step model (compile to bytecode, then run on a JVM) is the key to Java's portability.

### 3.3 "Write once, run anywhere" (WORA)

Because compiled bytecode targets the *JVM* — not a specific operating system or processor — the same `.class` file runs unchanged on Windows, macOS, or Linux, as long as each has a compatible JVM.

```
                       Hello.class  (one compiled artifact)
                              |
        +---------------------+---------------------+
        |                     |                     |
   JVM on Windows        JVM on macOS          JVM on Linux
        |                     |                     |
     runs OK               runs OK               runs OK
```

Contrast this with a language compiled straight to native code, where you typically recompile (or maintain separate builds) for each platform. WORA is why Java became dominant in enterprise, Android, and cross-platform back-ends.

### 3.4 Installing and verifying the JDK

**Recommended:** a Long-Term Support (LTS) release — **JDK 17** or **JDK 21**. LTS versions are stable and supported for years.

**Where to get it:**
- Eclipse Adoptium (Temurin OpenJDK) — https://adoptium.net/ (free, open source, cross-platform), or
- Oracle JDK — https://www.oracle.com/java/technologies/downloads/

**Install steps (high level):**
1. Download the installer for your OS and architecture (Windows x64, macOS arm64/x64, Linux).
2. Run the installer. On Windows, accept the option to set `JAVA_HOME` and add Java to `PATH` if offered.
3. Open a **new** terminal (so the updated `PATH` is loaded).

**Verify — this is mandatory evidence for Corte 1:**

```bash
java -version
javac -version
```

Expected output resembles (versions will vary):

```
openjdk version "21.0.3" 2024-04-16 LTS
OpenJDK Runtime Environment Temurin-21.0.3+9 (build 21.0.3+9-LTS)
OpenJDK 64-Bit Server VM Temurin-21.0.3+9 (build 21.0.3+9-LTS, mixed mode)

javac 21.0.3
```

> Troubleshooting: if `javac` is "not recognized," you installed a JRE-only package or `PATH`/`JAVA_HOME` is not set. Reinstall the **JDK** and ensure its `bin` directory is on your `PATH`. On Windows, check `System Properties → Environment Variables`; on macOS/Linux, check your shell profile (`~/.zshrc`, `~/.bashrc`).

### 3.5 Choosing and configuring an IDE

Any of the following is acceptable for this course. Pick one and learn it well.

| IDE | Notes |
|-----|-------|
| **IntelliJ IDEA** (Community) | Excellent Java support out of the box; recommended for beginners and pros. https://www.jetbrains.com/idea/ |
| **Eclipse** | Free, mature, widely used in academia. https://www.eclipseide.org/ |
| **NetBeans** | Apache project, beginner-friendly, strong for Java SE. https://netbeans.apache.org/ |
| **VS Code** | Lightweight; install the "Extension Pack for Java." Requires a separately installed JDK. https://code.visualstudio.com/docs/languages/java |

**Minimum configuration checklist inside your IDE:**
1. Point the IDE to your installed **JDK** (Project SDK / Java runtime).
2. Create a new **Java project**.
3. Confirm the IDE can create packages and run a `main` method (a green "Run" arrow).

### 3.6 Packages: what they are and why they exist

A **package** is a *namespace* that groups related classes. Packages solve three problems:

1. **Name collisions.** Two libraries can both define a `Date` class if each lives in its own package (`java.util.Date` vs. `java.sql.Date`).
2. **Organization.** Related classes live together (e.g., all "model" classes in one package, all "services" in another).
3. **Access control.** Packages participate in Java's visibility rules (package-private members are visible only within the same package).

**The critical rule for beginners:** in Java, **a package maps to a directory structure**. If a class declares `package co.edu.corhuila.oop.week01;`, its `.java` file must live in the folders `co/edu/corhuila/oop/week01/`.

```
Package name:  co.edu.corhuila.oop.week01
Folder path:   co/edu/corhuila/oop/week01/HelloOOP.java
                 └── dots become directory separators
```

**Naming conventions (industry standard):**
- All lowercase (`co.edu.corhuila.oop`, never `Co.Edu.Corhuila`).
- Use a reversed internet domain as the prefix to guarantee global uniqueness. CORHUILA's domain is `corhuila.edu.co`, so the reversed prefix is `co.edu.corhuila`.
- Add project/module segments after the prefix (`.oop.week01`).

### 3.7 Anatomy of a Java source file

```java
package co.edu.corhuila.oop.week01;   // 1) package declaration — MUST be the first statement

public class HelloOOP {               // 2) class; file name MUST be HelloOOP.java

    public static void main(String[] args) {   // 3) program entry point
        System.out.println("Hello, OOP! Environment is working.");  // 4) print to console
    }
}
```

Line-by-line:
1. **`package …;`** declares the namespace and must be the first non-comment line.
2. **`public class HelloOOP`** — a public class must live in a file of the *exact same name* (`HelloOOP.java`), case-sensitive.
3. **`public static void main(String[] args)`** is the entry point the JVM calls to start the program. Memorize this signature.
4. **`System.out.println(...)`** prints a line to standard output.

---

## 4. Worked example — `Hello, OOP!` inside a package, compiled and run two ways

We will build the file above and run it from **both** the command line and the IDE.

### 4.1 Create the folder structure and file

Create this layout (the folder path must match the package name):

```
week01-demo/
└── src/
    └── co/
        └── edu/
            └── corhuila/
                └── oop/
                    └── week01/
                        └── HelloOOP.java
```

Put the exact source from §3.7 into `HelloOOP.java`.

### 4.2 Compile and run from the command line

Open a terminal **in the `week01-demo` directory**.

**Compile** (the `-d` flag tells `javac` where to place the compiled `.class` files, recreating the package folders under `out/`):

```bash
javac -d out src/co/edu/corhuila/oop/week01/HelloOOP.java
```

This produces:

```
out/
└── co/edu/corhuila/oop/week01/HelloOOP.class
```

**Run** (use the **fully qualified class name**, with dots — *not* the file path, and *not* `.class`):

```bash
java -cp out co.edu.corhuila.oop.week01.HelloOOP
```

Expected output:

```
Hello, OOP! Environment is working.
```

**Common mistakes and their fixes:**

| Symptom | Cause | Fix |
|---------|-------|-----|
| `error: Could not find or load main class HelloOOP` | You ran with the file path or omitted the package. | Use the fully qualified name: `co.edu.corhuila.oop.week01.HelloOOP`. |
| `class HelloOOP is public, should be declared in a file named HelloOOP.java` | File name ≠ public class name. | Rename the file to match exactly (case-sensitive). |
| `package co.edu... does not match` / class not found | Folder structure doesn't match the `package` line. | Make the directories mirror the package name. |
| `NoClassDefFoundError` with wrong package | Missing/wrong `-cp` (classpath). | Point `-cp` at the root of the compiled tree (`out`). |

### 4.3 Compile and run from the IDE

Using IntelliJ IDEA as the example (the flow is analogous in Eclipse/NetBeans/VS Code):

1. **File → New → Project → Java**, select your installed JDK as the Project SDK, and finish.
2. In the `src` folder, **right-click → New → Package** and type `co.edu.corhuila.oop.week01`. The IDE creates the nested folders for you.
3. **Right-click the package → New → Java Class**, name it `HelloOOP`, and paste the `main` method body.
4. Click the green **Run** arrow next to `main` (or press the run shortcut).
5. The **Run** tool window shows: `Hello, OOP! Environment is working.`

Notice that the IDE performs the same two steps under the hood — it calls the compiler and then launches the JVM — but hides the `javac`/`java` commands behind a button. Understanding the manual steps (§4.2) is what lets you debug when the button "just doesn't work."

---

## 5. Guided in-class practice — build, compile, and run your own

**Format:** individual, 25 minutes. This is Corte 1 evidence.

**Task:** Create a program that prints a short "about me + environment" banner, organized in your own package.

1. Choose a package name using CORHUILA's reversed-domain convention plus your identifier, e.g. `co.edu.corhuila.oop.week01.<yourlastname>`.
2. Create a class named `Environment` with a `main` method that prints, on separate lines:
   - Your full name.
   - The JDK version you installed (copy the string from `java -version`).
   - The IDE you chose.
   - One sentence: "The JVM runs bytecode, which is why Java is write-once-run-anywhere."
3. Create the matching folder structure by hand (do **not** let the IDE do it this first time — you must see the mapping).
4. **Compile and run from the command line** using `javac -d out ...` and `java -cp out <fully.qualified.Name>`.
5. **Then** open the same project in your IDE and run it there.

**Expected deliverable (evidence):**
- The `Environment.java` source.
- A screenshot of the terminal showing your compile + run and the correct output.
- A screenshot of the IDE running the same program.
- A screenshot of `java -version` and `javac -version`.

**Stretch goal (optional):** add a second class `Greeter` in the *same* package with a method `String greeting(String name)`, create a `Greeter` object in `main`, and print its result. This is your first taste of using objects — the whole point of the course.

---

## 6. Wrap-up and exit ticket

### Summary
- The **JDK** is what you install to develop; it contains the compiler and a **JRE**, which contains the **JVM**.
- `javac` compiles source to **bytecode** (`.class`); the **JVM** runs bytecode.
- **WORA:** one compiled artifact runs on any platform with a compatible JVM.
- A **package** is a namespace that maps to a folder structure; use CORHUILA's reversed domain `co.edu.corhuila` as the prefix.
- You can compile and run from the command line (`javac -d`, `java -cp`) and from the IDE — both do the same two steps.

### Exit ticket (submit before leaving)
1. In one sentence each, define JDK, JVM, and bytecode.
2. If a class declares `package co.edu.corhuila.oop.week01;`, in what folder must its file live?
3. What command runs a compiled class `App` in package `co.edu.corhuila.oop.week01` from an `out` directory? Write it exactly.

### Environment-evidence reminder (Corte 1)
Upload the four screenshots from §5 to the LMS as proof your environment works. Keep the project — you will extend it next week.

### Looking ahead
Week 02 introduces classes and objects in real Java code: constructors, fields, methods, and the `new` keyword. Reinforce this week with the [optional GitHub activity](../optional-activity/README.md) and the readings in [`../material/README.md`](../material/README.md).
