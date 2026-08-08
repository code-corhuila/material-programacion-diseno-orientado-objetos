---
course: Programación y Diseño Orientado a Objetos
program: Ingeniería de Sistemas
term: 2026-B
week: 1
session: 2
corte: 1
unit: Unidad 1 · Fundamentos de la POO
topic: Entorno de desarrollo en Java
eyebrow: Unidad 1 · Fundamentos · Corte 1
lead: Para programar en Java necesitas tres cosas: el JDK, un editor y saber compilar y ejecutar. En esta sesión montas tu entorno y escribes tu primer programa con una clase, para llegar listo a crear objetos la próxima semana.
objectives:
  - Instalar y reconocer el rol del JDK y un IDE.
  - Identificar la estructura mínima de un programa Java.
  - Compilar y ejecutar un programa desde cero.
  - Escribir tu primera clase con el método main.
---

## 1. Las herramientas: JDK e IDE

- **JDK (Java Development Kit):** incluye el compilador (`javac`) y la máquina virtual (`java`) para ejecutar. Sin JDK no puedes compilar.
- **IDE (entorno de desarrollo):** editor con ayudas (IntelliJ IDEA, Eclipse o VS Code + extensión de Java). Acelera escribir, compilar y depurar.

> info: El **JDK** es obligatorio; el **IDE** es comodidad. Se puede programar con un editor simple + terminal, pero un IDE te ahorra mucho tiempo.

## 2. Estructura mínima de un programa Java

Todo programa Java vive dentro de una **clase**. La ejecución empieza en el método `main`.

```java
// tab: HolaMundo.java
public class HolaMundo {
    public static void main(String[] args) {
        System.out.println("¡Hola, mundo POO!");
    }
}
```

Reglas clave:

- El **archivo** debe llamarse igual que la clase pública: `HolaMundo.java`.
- El punto de entrada es siempre `public static void main(String[] args)`.
- Cada instrucción termina en `;` y los bloques van entre `{ }`.

## 3. Compilar y ejecutar

Desde la terminal, en la carpeta del archivo:

```
// tab: Terminal
javac HolaMundo.java     # compila -> genera HolaMundo.class
java HolaMundo           # ejecuta (sin .class ni .java)
```

```ascii
HolaMundo.java  --(javac)-->  HolaMundo.class  --(java)-->  salida en pantalla
   (código)                     (bytecode)                   ¡Hola, mundo POO!
```

> warn: Error típico: ejecutar `java HolaMundo.java` o `java HolaMundo.class`. Lo correcto es `java HolaMundo` (solo el nombre de la clase).

## 4. Un primer objeto (adelanto)

Aún sin profundizar, así se ve crear un objeto — lo formalizamos en la Semana 2:

```java
// tab: Primer objeto
public class Main {
    public static void main(String[] args) {
        String saludo = new String("Hola");   // 'saludo' es un objeto String
        System.out.println(saludo.length());   // método del objeto -> 4
    }
}
```

> tip: En Java casi todo son objetos. Incluso el texto (`String`) es un objeto con métodos como `length()` o `toUpperCase()`.

## Autoevaluación

```quiz
Q: ¿Qué herramienta contiene el compilador de Java?
* El JDK
- El IDE
- El navegador
E: El JDK incluye javac (compilador) y java (ejecución). El IDE es solo comodidad.

Q: ¿Cuál es el punto de entrada de un programa Java?
* El método public static void main(String[] args)
- El primer método que aparezca
- El constructor de la clase
E: La ejecución siempre empieza en el método main.

Q: ¿Cómo se ejecuta la clase HolaMundo ya compilada?
* java HolaMundo
- java HolaMundo.class
- javac HolaMundo
E: Se ejecuta con "java" seguido del nombre de la clase, sin extensión.

Q: ¿Cómo debe llamarse el archivo de una clase pública HolaMundo?
* HolaMundo.java
- holamundo.java
- Main.java
E: El archivo debe coincidir exactamente con el nombre de la clase pública.
```

## Actividad de la semana (formativa)

Opcional y no evaluable. Versión ampliada con rúbrica en **optional-activity** (entrega por GitHub).

- Instala el JDK y un IDE, y ejecuta tu primer `HolaMundo`.
- Modifícalo para que imprima tu nombre y tu programa favorito.
