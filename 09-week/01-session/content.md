---
course: Programación y Diseño Orientado a Objetos
program: Ingeniería de Sistemas
term: 2026-B
week: 9
session: 1
corte: 2
unit: Unidad 2 · Herencia y polimorfismo
topic: Composición — la relación "tiene-un"
eyebrow: Unidad 2 · Diseño · Corte 2
lead: No todo se modela con herencia. Muchas veces un objeto se construye a partir de otros: un carro tiene un motor, un pedido tiene productos. Esa relación "tiene-un" es la composición, y suele producir diseños más flexibles y robustos que la herencia. Aquí la formalizamos y aprendemos el principio "favorece la composición sobre la herencia".
objectives:
  - Definir la composición (relación "tiene-un") y la delegación.
  - Distinguir composición de agregación por el ciclo de vida.
  - Aplicar el principio "composición sobre herencia".
  - Decidir entre herencia y composición con criterio.
---

## 1. "tiene-un" vs "es-un"

> info: **Composición.** Relación en la que un objeto (el **todo**) contiene a otros objetos (sus **partes**) como atributos, y les **delega** parte de su comportamiento. Modela la relación **"tiene-un"**.

- **Herencia (es-un):** `Perro` **es un** `Animal` → `extends`.
- **Composición (tiene-un):** `Carro` **tiene un** `Motor` → un atributo de tipo `Motor`.

```java
// tab: Composición
public class Motor {
    private int caballos;
    public Motor(int c) { caballos = c; }
    public void encender() { System.out.println("Motor encendido (" + caballos + " HP)"); }
}
public class Carro {
    private final Motor motor;                  // Carro TIENE un Motor
    public Carro(int hp) { motor = new Motor(hp); }
    public void arrancar() { motor.encender(); }   // DELEGA en el motor
}
```

## 2. Delegación

> info: **Delegación.** El objeto contenedor no hace el trabajo él mismo: se lo **pide a la parte** que lo sabe hacer. `Carro.arrancar()` delega en `Motor.encender()`. Cada clase mantiene **una** responsabilidad.

## 3. Composición vs agregación

Ambas son "tiene-un", pero se distinguen por el **ciclo de vida** de las partes:

| | Composición (fuerte) | Agregación (débil) |
|---|---|---|
| Ciclo de vida | La parte **vive y muere** con el todo | La parte existe **independiente** del todo |
| Ejemplo | Casa **tiene** Habitaciones | Universidad **tiene** Estudiantes |
| Creación | El todo suele crear sus partes (`new` interno) | Las partes se pasan desde afuera |

```ascii
Composición:  Casa ◆──── Habitacion   (si se destruye la casa, la habitación no tiene sentido)
Agregación:   Curso ◇──── Estudiante   (el estudiante existe aunque el curso termine)
```

## 4. Composición sobre herencia

> info: **Principio de diseño.** "**Favorece la composición sobre la herencia**." La composición es más flexible: puedes cambiar o intercambiar las partes en tiempo de ejecución y evitas jerarquías rígidas y frágiles.

**Contraejemplo de herencia mal usada:** `class Carro extends Motor` — un carro **no es** un motor. Con composición (`Carro tiene Motor`) el diseño es correcto y puedes cambiar el motor sin tocar la jerarquía.

## 5. Ejemplo con varias partes

```java
// tab: Pedido tiene Productos
public class Pedido {
    private final List<Producto> items = new ArrayList<>();
    public void agregar(Producto p) { items.add(p); }
    public double total() {
        double t = 0;
        for (Producto p : items) t += p.getPrecio();   // delega el precio a cada producto
        return t;
    }
}
```

Un `Pedido` **tiene** productos y **delega** en ellos el cálculo de su precio.

## 6. ¿Herencia o composición? (decisión)

| Pregunta | Respuesta |
|---|---|
| ¿"A **es un** B" y respeta sustitución? | Herencia (`extends`) |
| ¿"A **tiene un** B"? | Composición (atributo) |
| ¿Necesito intercambiar la parte en ejecución? | Composición |
| ¿Comparten estado/código de una familia? | Herencia/abstracta |

## 7. Errores comunes

- Forzar herencia sin relación "es-un" (`Carro extends Motor`).
- No delegar: duplicar en el contenedor la lógica que ya sabe hacer la parte.
- Confundir composición (parte dependiente) con agregación (parte independiente).
- Jerarquías profundas donde una composición sencilla bastaría.

## Autoevaluación

```quiz
Q: ¿Qué relación modela la composición?
* "tiene-un" (un objeto contiene a otros como partes)
- "es-un"
- "hereda-de"
E: La composición es "tiene-un"; la herencia es "es-un".

Q: ¿Qué es la delegación?
* El contenedor le pide el trabajo a la parte que sabe hacerlo
- Copiar el código de la parte en el contenedor
- Heredar de la parte
E: El todo delega comportamiento en sus partes (Carro delega en Motor).

Q: Composición vs agregación se distinguen por...
* El ciclo de vida de las partes (dependiente vs independiente del todo)
- El nombre de las clases
- La cantidad de atributos
E: En composición la parte vive/muere con el todo; en agregación es independiente.

Q: "Carro extends Motor" para un carro con motor es...
* Incorrecto: debe ser composición (Carro tiene Motor)
- Correcto: usar herencia
- Indiferente
E: Un carro tiene un motor (composición), no es un motor.

Q: ¿Qué dice el principio de diseño mencionado?
* Favorece la composición sobre la herencia (más flexible)
- Usa siempre herencia
- Evita los objetos
E: La composición suele dar diseños más flexibles y menos frágiles.

Q: Universidad y sus Estudiantes es un ejemplo de...
* Agregación (los estudiantes existen independientemente)
- Composición fuerte
- Herencia
E: La parte (estudiante) existe fuera del todo (universidad): agregación.
```

## Actividad de la semana (formativa)

Opcional y no evaluable. Versión ampliada con rúbrica en **optional-activity** (entrega por GitHub).

- Modela `Computador` por **composición** (tiene `CPU`, `RAM`, `Disco`) y delega en las partes un método `encender()`/`especificaciones()`. Justifica por qué NO usaste herencia.
