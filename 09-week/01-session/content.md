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
lead: No todo se modela con herencia. Muchas veces un objeto se construye a partir de otros: un carro tiene un motor, un pedido tiene productos. Esa relación "tiene-un" es la composición, y suele ser más flexible que heredar.
objectives:
  - Explicar la relación "tiene-un" (composición).
  - Construir objetos que contienen otros objetos.
  - Decidir entre herencia y composición.
---

## 1. "tiene-un" vs "es-un"

- **Herencia (es-un):** `Perro` **es un** `Animal` → `extends`.
- **Composición (tiene-un):** `Carro` **tiene un** `Motor` → un atributo de otro tipo.

```java
// tab: Composición
public class Motor {
    private int caballos;
    public Motor(int c) { caballos = c; }
    public void encender() { System.out.println("Motor encendido (" + caballos + " HP)"); }
}
public class Carro {
    private Motor motor;                 // Carro TIENE un Motor
    public Carro(int hp) { motor = new Motor(hp); }
    public void arrancar() { motor.encender(); }   // delega en el motor
}
```

## 2. Delegación

En composición, el objeto contenedor **delega** trabajo en sus partes: `Carro.arrancar()` le pide al `Motor` que se encienda. Cada clase se ocupa de lo suyo.

```ascii
Carro
 └── motor: Motor   ── arrancar() delega en motor.encender()
```

## 3. ¿Herencia o composición?

| Pregunta | Respuesta correcta |
|---|---|
| ¿"A **es un** B"? | Herencia (`extends`) |
| ¿"A **tiene un** B"? | Composición (atributo) |

> tip: Principio de diseño muy usado: **"favorece la composición sobre la herencia"**. La composición es más flexible: puedes cambiar las partes sin romper jerarquías rígidas.

## 4. Ejemplo con varias partes

```java
// tab: Pedido tiene Productos
public class Pedido {
    private List<Producto> items = new ArrayList<>();
    public void agregar(Producto p) { items.add(p); }
    public double total() {
        double t = 0;
        for (Producto p : items) t += p.getPrecio();
        return t;
    }
}
```

> warn: Error clásico: forzar herencia donde no hay "es-un" (p. ej. `Carro extends Motor`). Un carro **no es** un motor; **tiene** uno. Usa composición.

## Autoevaluación

```quiz
Q: ¿Qué relación modela la composición?
* "tiene-un" (un objeto contiene a otro)
- "es-un"
- "hereda-de"
E: La composición es "tiene-un"; la herencia es "es-un".

Q: En composición, el objeto contenedor normalmente...
* Delega trabajo en los objetos que contiene
- Copia el código de sus partes
- No puede tener métodos
E: El contenedor delega en sus partes (p. ej. Carro delega en Motor).

Q: "Un Carro es un Motor" para modelar un carro con motor es...
* Incorrecto: debe ser composición (tiene-un)
- Correcto: usar herencia
- Indiferente
E: Un carro tiene un motor (composición), no es un motor (no herencia).
```

## Actividad de la semana (formativa)

Opcional y no evaluable. Versión ampliada con rúbrica en **optional-activity** (entrega por GitHub).

- Modela `Carro` con un `Motor` por composición y delega `arrancar()` en el motor.
