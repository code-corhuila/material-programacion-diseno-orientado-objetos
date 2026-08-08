# Week 01 — Optional Activity: "My Java Environment & First Objects" (Submit via GitHub)

**Course:** Object-Oriented Programming and Design · **Week:** 01 · **Unit:** 1 — Fundamentals of OOP
**Assessment period:** Corte 1 · **RAA:** 90_82759
**Type:** Optional (reinforcement / extra credit) · **Submission channel:** **GitHub (NOT Moodle)**

> This activity is optional but strongly recommended. It cements the two goals of Week 01: proving your environment works and taking your very first step from *procedural* to *object-oriented* code. You will also practice the professional habit of publishing code to a Git repository.

---

## 1. Problem statement

You will build a tiny, self-contained Java project that (a) reports on your working environment and (b) models a single real-world entity as an object — demonstrating the shift from "just printing" to "creating and using objects."

**Theme:** a **Student ID card**. Model a student as an object with state and behavior, create a couple of instances in `main`, and print a small report. The program must be organized into a proper package and must compile and run on any classmate's machine that has the JDK installed.

---

## 2. Requirements

### 2.1 Functional requirements
1. Create a package using CORHUILA's reversed-domain convention plus your identifier, for example:
   `co.edu.corhuila.oop.week01.<yourlastname>`
2. Create a class **`Student`** with:
   - **State (private fields):** `fullName` (String), `studentCode` (String), `program` (String), `enrolledCredits` (int).
   - **A constructor** that initializes all four fields.
   - **Behavior (methods):**
     - `String getFullName()`, `String getStudentCode()`, `String getProgram()`, `int getEnrolledCredits()` — accessors.
     - `boolean isFullTime()` — returns `true` if `enrolledCredits >= 12`.
     - `String idCard()` — returns a formatted one-line summary, e.g. `"[C001] Ana Pérez — Software Engineering — 15 cr (Full-time)"`.
3. Create a class **`App`** (with `main`) in the same package that:
   - Creates **at least two** `Student` objects with different data.
   - Prints each student's `idCard()`.
   - Prints a final line with how many of them are full-time.
4. The program must run correctly from the command line **and** produce identical output in your IDE.

### 2.2 Encapsulation requirement (this is the learning point)
- All `Student` fields must be **`private`**. The only way to read them from `App` is through the accessor methods. Do **not** make fields public. This is your first hands-on encapsulation.

### 2.3 Non-functional / project requirements
- **JDK 17+ (LTS).** State the version you used in the README.
- **No external libraries** — plain Java only.
- **Correct package/folder mapping** (folders must mirror the package name).
- **A `.gitignore`** that excludes compiled output (`out/`, `*.class`, IDE folders like `.idea/`, `.vscode/`, `bin/`).
- **A repository `README.md`** (see deliverable below).

---

## 3. Expected deliverable

A **public GitHub repository** named `oop-week01-<yourlastname>` containing:

```
oop-week01-<yourlastname>/
├── README.md            # how to compile & run, JDK version, screenshot(s)
├── .gitignore
└── src/
    └── co/edu/corhuila/oop/week01/<yourlastname>/
        ├── Student.java
        └── App.java
```

The repository **README.md** must include:
1. Your full name and student code.
2. The JDK version (`java -version` output) and the IDE you used.
3. Exact commands to compile and run from the command line.
4. At least one screenshot of the program running (terminal or IDE).
5. One short paragraph (3–5 sentences) answering: *"How is this version more object-oriented than simply printing four `System.out.println` lines?"*

**Example of expected program output:**
```
[C001] Ana Pérez — Software Engineering — 15 cr (Full-time)
[C002] Luis Gómez — Systems Engineering — 9 cr (Part-time)
Full-time students: 1
```

---

## 4. How to submit via GitHub (step by step)

> We use **GitHub, not Moodle**, for this activity. If you do not have an account yet, create a free one at https://github.com. Do **not** put passwords or tokens in your code or commits.

1. **Create the repository** on GitHub named `oop-week01-<yourlastname>`, set to **Public**, and initialize with a README.
2. **Clone it** locally:
   ```bash
   git clone https://github.com/<your-username>/oop-week01-<yourlastname>.git
   cd oop-week01-<yourlastname>
   ```
3. **Add your project** files (the `src/...` tree, `.gitignore`, and the completed `README.md`).
4. **Compile and run** to confirm everything works before committing:
   ```bash
   javac -d out src/co/edu/corhuila/oop/week01/<yourlastname>/*.java
   java -cp out co.edu.corhuila.oop.week01.<yourlastname>.App
   ```
5. **Commit and push** with clear messages:
   ```bash
   git add .
   git commit -m "Week 01: Student object + environment report"
   git push origin main
   ```
6. **Submit the link.** Paste the URL of your repository (e.g. `https://github.com/<your-username>/oop-week01-<yourlastname>`) into the Week 01 "Optional activity link" field in the LMS. **Only the link is submitted** — the code itself lives on GitHub.

> Deadline: end of Corte 1 (see the LMS calendar). Late-but-working submissions are still worth doing for the learning value.

---

## 5. Assessment criteria / rubric

Total: **100 points** (applied as reinforcement/extra credit per the course grading policy).

| Criterion | Excellent (full) | Acceptable (partial) | Missing (0) | Max pts |
|-----------|------------------|----------------------|-------------|---------|
| **Compiles & runs** | Compiles with no errors/warnings and runs from CLI producing correct output. | Runs only in the IDE, or has minor warnings. | Does not compile. | 25 |
| **Encapsulation** | All fields private; state accessed only via methods. | Some fields exposed but mostly correct. | Public fields / no encapsulation. | 20 |
| **Correct package & structure** | Package name follows `co.edu.corhuila...`; folders mirror it exactly. | Minor naming/structure issues. | Wrong or no package. | 15 |
| **Object modeling** | `Student` has meaningful state + behavior; `isFullTime()` and `idCard()` correct; ≥2 objects created and used. | Class present but logic incomplete. | No real object usage. | 20 |
| **Repository quality** | Clear README (run instructions, JDK version, screenshot, reflection); working `.gitignore`; clean commit history. | README incomplete or `.gitignore` missing. | No README / not usable. | 15 |
| **Reflection paragraph** | Insightful explanation of why the code is object-oriented. | Superficial. | Missing. | 5 |

**Bonus (up to +5):** add a third class (e.g., `Course`) and have `Student` reference it, or add a `toString()` override — a preview of Week 02.

---

## 6. Academic integrity

You may discuss ideas with classmates, but the code and the reflection must be **your own**. Copy-pasted repositories will receive zero. Attribute any snippet you adapt from the official Java tutorials in your README.

---

## 7. Related folders

- Week guide: [`../README.md`](../README.md)
- Session 01 (theory): [`../01-session/README.md`](../01-session/README.md)
- Session 02 (environment + first program): [`../02-session/README.md`](../02-session/README.md)
- Study material (PDF download area): [`../material/README.md`](../material/README.md)
