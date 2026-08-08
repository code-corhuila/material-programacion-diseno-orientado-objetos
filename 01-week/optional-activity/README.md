# Week 01 — Optional Activity: "My Environment Works" + First Packaged Program

**Object-Oriented Programming and Design** · Unit 1 · Corte 1
Type: **optional** practice (formative; strengthens the environment and package skills from Session 2).
Delivery: **via GitHub** — **not** through Moodle.

> **Why optional and why GitHub?** This activity is not required to pass the week, but it is strongly recommended: it forces you to *prove* your toolchain works and to organize code into packages before Week 02 depends on it. You deliver through **a public GitHub repository** so you begin building the version-control and portfolio habits used all semester. Nothing is uploaded to Moodle for this task.

---

## 1. Problem statement

You have just configured your Java environment. Prove it — and show you can organize code into a **coherent package structure** — by building a tiny, correct program and publishing it on GitHub.

Model a very small slice of a university domain (reusing the Session 1 scenario). You will create **two classes in two packages**, make them collaborate, and print a short report to the console. No inheritance, no interfaces, no collections yet — just clean structure and a program that compiles and runs.

---

## 2. Requirements

### 2.1 Functional

1. Create a class **`Student`** in package `co.edu.corhuila.oop.week01.model` with:
   - private attributes `fullName` (String) and `studentId` (String);
   - a constructor that sets both;
   - a method `String describe()` returning e.g. `"Student #A00123 — Ana Gómez"`.
2. Create a class **`Course`** in package `co.edu.corhuila.oop.week01.model` with:
   - a private attribute `name` (String) and a constructor;
   - a method `String describe()`.
3. Create a class **`Main`** in package `co.edu.corhuila.oop.week01` with a `main` method that:
   - creates **one** `Student` object and **one** `Course` object;
   - sends each a `describe()` message and prints both results;
   - prints one extra line stating who is enrolled in which course.

### 2.2 Technical / structural

- The **directory structure must mirror the packages** exactly (see §4).
- **Naming conventions:** lowercase packages, `PascalCase` classes, `camelCase` methods/fields.
- Attributes are **private** (a first taste of encapsulation); access is only through methods.
- The program must **compile with `javac`** and **run with `java`** using the fully-qualified main-class name.
- Include a short **`README.md`** at the repository root (see §5).

### 2.3 Constraints

- **No IDE-only project files as the deliverable** — the code must compile from the command line. (You may still use an IDE to write it.)
- Do **not** commit compiled output; add a `.gitignore` that excludes `out/`, `*.class`, and IDE folders (`.idea/`, `.vscode/`, `bin/`).

---

## 3. Expected deliverable

A **public GitHub repository** named `oop-week01-<yourusername>` containing:

```
oop-week01-<yourusername>/
├── README.md                 # what it is + how to compile & run (see §5)
├── .gitignore                # excludes out/, *.class, IDE folders
└── src/
    └── co/edu/corhuila/oop/week01/
        ├── Main.java
        └── model/
            ├── Student.java
            └── Course.java
```

**Expected console output (example):**

```
Student #A00123 — Ana Gómez
Course: Object-Oriented Programming and Design
Ana Gómez is enrolled in Object-Oriented Programming and Design
```

---

## 4. Step-by-step: build, run, and submit via GitHub

### 4.1 Build and run locally

```bash
# from the repository root
javac -d out src/co/edu/corhuila/oop/week01/Main.java \
             src/co/edu/corhuila/oop/week01/model/Student.java \
             src/co/edu/corhuila/oop/week01/model/Course.java

java -cp out co.edu.corhuila.oop.week01.Main
```

Confirm the output matches §3 before you publish.

### 4.2 Publish to GitHub

1. Create a **new, public** repository on GitHub named `oop-week01-<yourusername>` (empty, no template).
2. In your project folder, initialize and push:

   ```bash
   git init
   git add .
   git commit -m "Week 01: first packaged Java program"
   git branch -M main
   git remote add origin https://github.com/<yourusername>/oop-week01-<yourusername>.git
   git push -u origin main
   ```

3. Open the repository in a browser and confirm the folder structure and `README.md` render correctly.
4. **Submit the repository URL** through the channel the instructor announces for GitHub links (e.g., a shared roster or the forum thread) — **not** as a Moodle file upload.

> **Note on submission mechanics:** publishing a public repository and sending its URL are actions you perform yourself. This guide does not push to any remote on your behalf.

---

## 5. Repository `README.md` — required content

Keep it short (about 10–15 lines):

- **Title** and one-sentence description.
- **How to compile and run** (the two commands from §4.1).
- **Expected output** (paste it).
- **What you learned** in one or two sentences (e.g., how packages map to folders).
- Your **name** and **student ID**.

---

## 6. Assessment criteria / rubric

Although optional, work is given formative feedback on the scale below (0.0–5.0). It reuses the course **Coding-workshop base rubric** ([`../../00-course/README.md`](../../00-course/README.md#72-base-rubric--coding-workshop--practical-deliverable)), adapted to Week 01's scope.

| Criterion | Weight | Excellent (5.0–4.5) | Satisfactory (4.4–3.5) | Minimal (3.4–3.0) | Insufficient (<3.0) |
|---|---|---|---|---|---|
| **Compiles & runs** | 30 % | Compiles with `javac` and runs with `java`; output matches spec exactly | Runs with a minor output deviation | Runs only from the IDE / needs fixes | Does not compile |
| **Package structure** | 25 % | Folders mirror packages perfectly; correct naming conventions throughout | One small mismatch | Packages present but inconsistent | No packages / flat structure |
| **OOP basics (encapsulation)** | 20 % | All fields private; interaction only via methods; objects collaborate cleanly | Mostly private; minor leak | Some public fields | Procedural code, no real objects |
| **GitHub delivery** | 15 % | Public repo, clean history, working `.gitignore`, clear `README.md` | Repo fine; README or `.gitignore` thin | Repo present but messy (committed `out/`/`.class`) | No repo / private / URL missing |
| **Code quality & docs** | 10 % | Readable, consistent, brief comments; helpful README | Generally clean | Readable but inconsistent | Hard to read; no README |

**Passing threshold:** 3.0. A submission that compiles, runs, uses correct packages, and is delivered as a clean public repo comfortably clears it.

---

## 7. Stretch goals (extra, ungraded)

For students who finish early:

1. Add a third package `...week01.report` with a `TranscriptPrinter` class whose method takes a `Student` and a `Course` and prints the enrollment line — moving the printing responsibility out of `Main`.
2. Add basic validation in a constructor (e.g., reject an empty `studentId`) — a preview of the encapsulation work in Corte 1.
3. Add a second `Course` and print both, hinting at why collections (Corte 3) will be useful.

---

## 8. Academic integrity

Write your own code. You may discuss ideas with peers, but the repository must be your own work; copied repositories are easy to detect through commit history and will be treated under the institutional integrity policy. Reusing the course's `HelloOOP`/`Course` examples as a *starting point* is fine and expected — extending them into the required structure is the point of the activity.

---

*Optional activity for Week 01, aligned to RAA 90_82759 (Corte 1). Delivery is by GitHub; no Moodle submission is required for this task.*
