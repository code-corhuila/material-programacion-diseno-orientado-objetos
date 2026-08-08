---
course: Programación y Diseño Orientado a Objetos
program: Ingeniería de Sistemas
term: 2026-B
week: 6
session: 1
corte: 2
unit: Unidad 2 · Herencia y polimorfismo
topic: Herencia — extends y reutilización
eyebrow: Unidad 2 · Herencia y polimorfismo · Corte 2
lead: La herencia es el mecanismo por el cual una clase adquiere los atributos y el comportamiento de otra, estableciendo una relación jerárquica de generalización–especialización. Bien aplicada, elimina duplicación y modela con precisión el dominio; mal aplicada, produce jerarquías rígidas y frágiles. Esta sesión construye el concepto con rigor: qué es, cuándo procede, qué se hereda y cómo verificarlo en Java.
objectives:
  - Definir formalmente la herencia y la relación "es-un" (is-a).
  - Aplicar el criterio de sustitución para decidir si la herencia es correcta.
  - Determinar qué miembros se heredan según su modificador de acceso.
  - Implementar y verificar una jerarquía de clases en Java.
---

## 1. Definición y propósito

> info: **Herencia.** Relación entre dos clases en la que una **subclase** (o clase derivada) adquiere automáticamente los **atributos** y **métodos** de una **superclase** (o clase base) y puede, además, añadir miembros propios o especializar los heredados.

La herencia modela una relación de **generalización–especialización**: la superclase captura lo **general** (lo común a varias entidades) y cada subclase lo **específico**. Su propósito es doble:

- **Reutilización:** el código común vive una sola vez en la superclase.
- **Extensibilidad:** se añaden nuevas subclases sin modificar las existentes.

### 1.1 Terminología precisa

| Término | Sinónimos | Significado |
|---|---|---|
| Superclase | clase base, padre | Clase de la que se hereda |
| Subclase | clase derivada, hija | Clase que hereda |
| Generalización | — | Extraer lo común hacia arriba (a la superclase) |
| Especialización | — | Añadir/redefinir lo específico hacia abajo (en la subclase) |

## 2. El criterio "es-un" y la sustitución

La herencia solo es correcta cuando existe una relación **"es-un" (is-a)** genuina: *la subclase es un tipo de la superclase*.

> info: **Prueba de sustitución (informal, de Liskov).** Si en cualquier punto donde se espera un objeto de la superclase puedo poner un objeto de la subclase **sin romper el comportamiento esperado**, la herencia es válida. Si no, es incorrecta.

**Correcto:** `Perro es un Animal`, `Estudiante es una Persona`, `CuentaAhorros es una Cuenta`.

**Incorrecto (contraejemplos frecuentes):**

- `Carro extends Motor` — un carro **tiene** un motor, no **es** un motor. → composición.
- `Pila extends ArrayList` — una pila **no es** una lista de acceso libre; heredarla expondría operaciones que violan LIFO. → composición.

> warn: Heredar solo "para reutilizar código" sin relación es-un produce clases que exponen operaciones sin sentido y rompen la sustitución. Ante la duda, prefiere **composición** (Semana 9).

## 3. Sintaxis en Java: extends

Java admite **herencia simple** (una subclase extiende **una** superclase) con la palabra clave `extends`.

```java
// tab: Superclase
public class Animal {
    protected String nombre;
    protected int edad;

    public Animal(String nombre, int edad) {
        this.nombre = nombre;
        this.edad = edad;
    }
    public void comer() {
        System.out.println(nombre + " está comiendo.");
    }
    public void dormir() {
        System.out.println(nombre + " duerme.");
    }
}
```
```java
// tab: Subclases
public class Perro extends Animal {
    private String raza;
    public Perro(String nombre, int edad, String raza) {
        super(nombre, edad);      // inicializa la parte Animal (ver S2)
        this.raza = raza;
    }
    public void ladrar() {                       // miembro propio
        System.out.println(nombre + " (" + raza + ") dice: ¡Guau!");
    }
}

public class Gato extends Animal {
    public Gato(String nombre, int edad) { super(nombre, edad); }
    public void maullar() { System.out.println(nombre + " dice: ¡Miau!"); }
}
```
```java
// tab: Uso
Perro p = new Perro("Fido", 3, "Labrador");
p.comer();    // heredado de Animal
p.dormir();   // heredado de Animal
p.ladrar();   // propio de Perro

Gato g = new Gato("Luna", 2);
g.comer();    // heredado
g.maullar();  // propio
```

## 4. Qué se hereda (reglas de acceso)

La subclase hereda **todos** los miembros de la superclase, pero **su accesibilidad** depende del modificador:

| Modificador en la superclase | ¿Heredado? | ¿Accesible directamente en la subclase? |
|---|---|---|
| `public` | Sí | Sí |
| `protected` | Sí | Sí (incluso en otro paquete) |
| *(sin modificador, package-private)* | Sí | Solo si están en el **mismo paquete** |
| `private` | Sí (existe en el objeto) | **No** — solo vía métodos heredados (getters) |

> info: Un atributo `private` de la superclase **forma parte** del objeto de la subclase (ocupa memoria, se inicializa), pero la subclase **no puede nombrarlo** directamente; lo manipula a través de métodos `public`/`protected` heredados. Esto **no** es una fuga del encapsulamiento: es encapsulamiento respetado.

> tip: Usa `protected` para lo que las subclases deban tocar directamente; usa `private` + métodos cuando quieras control total incluso frente a las subclases.

## 5. Ejemplo trabajado: eliminar duplicación

**Problema.** Tres clases repiten `nombre`, `edad`, `comer()` y `dormir()`:

```ascii
Perro { nombre, edad, comer(), dormir(), ladrar() }
Gato  { nombre, edad, comer(), dormir(), maullar() }
Vaca  { nombre, edad, comer(), dormir(), mugir() }
        └───────── repetido 3 veces ─────────┘
```

**Solución con herencia.** Lo común sube a `Animal`; cada subclase deja solo lo suyo:

```ascii
            Animal { nombre, edad, comer(), dormir() }
           /        |          \
        Perro      Gato        Vaca
       ladrar()  maullar()    mugir()
```

Un cambio en `comer()` ahora se hace **en un solo lugar** y beneficia a las tres subclases. Añadir `Caballo` cuesta solo su método propio.

## 6. Errores comunes

- Confundir **es-un** con **tiene-un** (herencia vs composición).
- Intentar acceder a un atributo `private` del padre desde la hija (no compila).
- Crear jerarquías profundas "por si acaso" (ver S2: manténlas de 2–3 niveles).
- Duplicar en la subclase un método que ya se hereda idéntico.

## Autoevaluación

```quiz
Q: ¿Qué relación debe existir para que la herencia sea correcta?
* Una relación "es-un" que respete la sustitución
- Cualquier necesidad de reutilizar código
- Una relación "tiene-un"
E: La herencia exige "es-un" verificable por sustitución; "tiene-un" es composición.

Q: Un atributo private de la superclase, en un objeto de la subclase...
* Existe y se inicializa, pero no es accesible directamente por nombre
- No existe en el objeto
- Es público para la subclase
E: private se hereda (ocupa memoria) pero solo se accede vía métodos heredados.

Q: ¿Cuál de estas herencias es INCORRECTA?
* class Pila extends ArrayList
- class Estudiante extends Persona
- class CuentaAhorros extends Cuenta
E: Una pila no "es" una lista de acceso libre; heredarla rompe LIFO. Usa composición.

Q: ¿Qué tipo de herencia admite Java entre clases?
* Simple: una subclase extiende exactamente una superclase
- Múltiple: varias superclases con extends
- No admite herencia
E: Java tiene herencia simple de clases (la múltiple se logra con interfaces).

Q: ¿Cuál es el beneficio central de generalizar lo común a la superclase?
* Un cambio en el código común se hace una sola vez y evita duplicación
- Hace el programa más rápido en ejecución
- Elimina la necesidad de objetos
E: Centralizar lo común elimina duplicación y facilita el mantenimiento.

Q: ¿Qué modificador conviene para un atributo que las subclases deben usar directamente?
* protected
- private
- Ninguno; siempre public
E: protected permite el acceso desde subclases sin exponerlo a todo el mundo.
```

## Actividad de la semana (formativa)

Opcional y no evaluable. Versión ampliada con rúbrica en **optional-activity** (entrega por GitHub).

- Diseña una jerarquía `Empleado → {Gerente, Desarrollador, Vendedor}`: identifica qué sube a la superclase (aplicando el criterio es-un) y qué queda en cada subclase, y justifícalo.
