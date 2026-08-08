---
course: Programación y Diseño Orientado a Objetos
program: Ingeniería de Sistemas
term: 2026-B
week: 1
session: 2
corte: 1
unit: Unidad 1 · Fundamentos de la POO
topic: Entorno de desarrollo y modelo de ejecución de Java
eyebrow: Unidad 1 · Fundamentos · Corte 1
lead: Programar en Java exige entender no solo la sintaxis, sino cómo se transforma y ejecuta el código. En esta sesión distinguimos JDK, JRE y JVM, comprendemos el modelo de compilación a bytecode que hace a Java portable, y montamos el entorno para escribir, compilar y ejecutar nuestro primer programa con rigor.
objectives:
  - Diferenciar JDK, JRE y JVM y su rol en el ciclo de vida del programa.
  - Explicar el modelo de compilación a bytecode y la portabilidad de Java.
  - Identificar la estructura mínima de un programa y el método main.
  - Compilar y ejecutar un programa desde la terminal.
---

## 1. JDK, JRE y JVM

Tres siglas que suelen confundirse, con roles precisos:

| Componente | Qué es | Contiene | ¿Para qué? |
|---|---|---|---|
| **JVM** (Java Virtual Machine) | Máquina virtual que **ejecuta** bytecode | — | Correr programas Java |
| **JRE** (Java Runtime Environment) | Entorno de **ejecución** | JVM + bibliotecas estándar | Solo ejecutar |
| **JDK** (Java Development Kit) | Kit de **desarrollo** | JRE + compilador `javac` + herramientas | Desarrollar y ejecutar |

> info: Relación de contención: **JDK ⊃ JRE ⊃ JVM**. Para *programar* necesitas el **JDK** (trae el compilador). Para solo *ejecutar*, bastaría el JRE.

## 2. El modelo de compilación: "compila una vez, ejecuta en cualquier parte"

Java no compila a código de máquina específico del sistema, sino a un formato intermedio, el **bytecode**, que la JVM interpreta/compila en cada plataforma.

```ascii
Programa.java  --javac-->  Programa.class   --java (JVM)-->  ejecución
  (código fuente)          (bytecode portable)               en Windows/Linux/Mac
```

> info: Ese bytecode portable es la clave del lema **"Write Once, Run Anywhere"**: el mismo `.class` corre en cualquier sistema que tenga una JVM, sin recompilar.

## 3. Herramientas: JDK e IDE

- **JDK:** obligatorio (compilador + JVM). Verifica con `java -version` y `javac -version`.
- **IDE** (IntelliJ IDEA, Eclipse, VS Code + extensión de Java): opcional pero recomendado; aporta autocompletado, depurador y detección de errores en vivo.

## 4. Estructura mínima de un programa

Todo programa Java vive dentro de una **clase**; la ejecución comienza en el método **main**.

```java
// tab: HolaMundo.java
public class HolaMundo {
    public static void main(String[] args) {
        System.out.println("¡Hola, mundo POO!");
    }
}
```

Reglas que el compilador exige:

- El **archivo** debe llamarse igual que la clase `public`: `HolaMundo.java`.
- El punto de entrada es exactamente `public static void main(String[] args)`.
- Cada sentencia termina en `;`; los bloques van entre `{ }`.

> info: **Anatomía de `main`:** `public` (accesible por la JVM), `static` (se invoca sin crear un objeto), `void` (no retorna nada), `String[] args` (argumentos de línea de comandos).

## 5. Compilar y ejecutar

```java
// tab: Terminal
javac HolaMundo.java     // compila -> genera HolaMundo.class (bytecode)
java HolaMundo           // ejecuta la clase (SIN .java ni .class)
```

> warn: Error frecuente: `java HolaMundo.java` o `java HolaMundo.class`. Lo correcto es `java HolaMundo` (solo el **nombre de la clase**). Otro típico: el nombre del archivo no coincide con el de la clase pública → no compila.

## 6. Organización: paquetes (introducción)

Los proyectos reales agrupan clases en **paquetes** (carpetas lógicas) para ordenarlas y evitar choques de nombres. Lo formalizaremos en la Semana 9; por ahora, basta reconocer la primera línea:

```java
// tab: package
package modelo;              // declara el paquete
public class Producto { }
```

## 7. Casi todo es un objeto

En Java, incluso el texto es un objeto: `String` tiene métodos.

```java
// tab: String como objeto
String saludo = "Hola";
System.out.println(saludo.length());        // 4
System.out.println(saludo.toUpperCase());   // HOLA
```

> tip: Esta idea ("casi todo es objeto") es coherente con la Sesión 1: los objetos combinan estado (el texto) y comportamiento (`length`, `toUpperCase`).

## Autoevaluación

```quiz
Q: ¿Qué componente contiene el compilador javac?
* El JDK
- El JRE
- La JVM
E: El JDK trae javac. JRE y JVM solo ejecutan.

Q: ¿A qué compila el compilador de Java?
* A bytecode (.class), que ejecuta la JVM
- A código de máquina específico del sistema
- A HTML
E: Java compila a bytecode portable; la JVM lo ejecuta en cada plataforma.

Q: ¿Qué hace posible el lema "Write Once, Run Anywhere"?
* El bytecode portable ejecutado por una JVM en cada sistema
- Que Java no use archivos
- Que el IDE traduzca el código
E: El mismo .class corre en cualquier sistema con JVM, sin recompilar.

Q: ¿Cómo se ejecuta la clase HolaMundo ya compilada?
* java HolaMundo
- java HolaMundo.class
- javac HolaMundo
E: Se ejecuta con java + el nombre de la clase, sin extensión.

Q: En public static void main(String[] args), ¿qué significa static?
* Que main se invoca sin necesidad de crear un objeto
- Que no cambia nunca de valor
- Que es privado
E: static permite a la JVM invocar main sin instanciar la clase.

Q: ¿Cuál es la relación de contención correcta?
* JDK ⊃ JRE ⊃ JVM
- JVM ⊃ JRE ⊃ JDK
- Son independientes
E: El JDK incluye el JRE, que incluye la JVM.
```

## Actividad de la semana (formativa)

Opcional y no evaluable. Versión ampliada con rúbrica en **optional-activity** (entrega por GitHub).

- Instala el JDK, verifica `java -version` y ejecuta tu primer `HolaMundo` desde la terminal (no solo desde el IDE), documentando cada paso con capturas.
