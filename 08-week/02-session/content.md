---
course: Programación y Diseño Orientado a Objetos
program: Ingeniería de Sistemas
term: 2026-B
week: 8
session: 2
corte: 2
unit: Unidad 2 · Herencia y polimorfismo
topic: Interfaces en Java
eyebrow: Unidad 2 · Abstracción · Corte 2
lead: Una interfaz define un contrato: qué debe saber hacer una clase, sin decir cómo. Permite que clases sin relación de herencia compartan una misma capacidad y es la herramienta con la que Java resuelve la ausencia de herencia múltiple. Es central en el diseño flexible y desacoplado.
objectives:
  - Declarar una interfaz y sus métodos (contrato).
  - Implementar una o varias interfaces con implements.
  - Usar métodos default y su motivación.
  - Decidir entre interfaz y clase abstracta con criterio.
---

## 1. La interfaz como contrato

> info: **Interfaz.** Tipo que define un **contrato**: un conjunto de métodos (sin implementación) que una clase se compromete a proveer. Expresa una **capacidad** ("puede-hacer"), no una identidad ("es-un").

```java
// tab: Interfaz
public interface Reproducible {
    void reproducir();   // implícitamente public y abstracto
    void detener();
}
```

## 2. implements

Una clase cumple el contrato con **implements** e implementa todos sus métodos.

```java
// tab: implements
public class Cancion implements Reproducible {
    @Override public void reproducir() { System.out.println("Sonando..."); }
    @Override public void detener()    { System.out.println("Detenida."); }
}
```

## 3. Herencia múltiple de tipo

Una clase **hereda de una sola** superclase, pero puede **implementar varias** interfaces. Así Java logra la flexibilidad de la herencia múltiple sin sus ambigüedades.

```java
// tab: Varias interfaces
public class Video implements Reproducible, Descargable, Compartible {
    // implementa los métodos de las tres
}
```

## 4. Polimorfismo por interfaz

La interfaz sirve como **tipo**: clases **sin relación de herencia** pueden tratarse de manera uniforme si comparten la interfaz.

```java
// tab: Polimorfismo por interfaz
Reproducible[] items = { new Cancion(), new Video(), new Podcast() };
for (Reproducible r : items) r.reproducir();   // cada uno a su manera
```

## 5. Métodos default (Java 8+)

Una interfaz puede aportar métodos `default` **con cuerpo**, para evolucionar el contrato sin romper las clases que ya lo implementan.

```java
// tab: default
public interface Reproducible {
    void reproducir();
    default void reproducirDosVeces() {   // implementación por defecto
        reproducir(); reproducir();
    }
}
```

> info: Las interfaces también pueden declarar **constantes** (`public static final` implícito) y métodos `static`. Lo que **no** tienen es estado mutable (atributos de instancia).

## 6. Interfaz vs clase abstracta

| | Interfaz | Clase abstracta |
|---|---|---|
| Se une con | `implements` | `extends` |
| ¿Cuántas a la vez? | Varias | Solo una |
| Estado (atributos de instancia) | No | Sí |
| Métodos con cuerpo | `default`/`static` | Sí (normales) |
| Expresa | "puede-hacer" (capacidad) | "es-un" (con código compartido) |

> tip: Regla práctica: **interfaz** para una **capacidad** que clases dispares pueden tener (`Comparable`, `Reproducible`, `Serializable`); **clase abstracta** para una **familia** con estado y código compartido. A menudo se combinan (una clase extiende una abstracta e implementa interfaces).

## 7. Errores comunes

- Olvidar implementar algún método de la interfaz (no compila).
- Intentar poner atributos de instancia con estado en una interfaz.
- Usar herencia (`extends`) cuando lo correcto era una capacidad (`implements`).
- Duplicar como interfaz algo que necesitaba estado compartido (debía ser abstracta).

## Autoevaluación

```quiz
Q: ¿Qué define una interfaz?
* Un contrato: qué métodos debe implementar la clase, sin el cómo
- La implementación completa de los métodos
- Los atributos privados de una clase
E: La interfaz declara el contrato (capacidad), no la implementación.

Q: ¿Con qué palabra clave una clase cumple una interfaz?
* implements
- extends
- super
E: Las interfaces se cumplen con implements; las clases se heredan con extends.

Q: ¿Cuántas interfaces puede implementar una clase?
* Varias (así Java suple la herencia múltiple)
- Solo una
- Ninguna
E: Una clase implementa varias interfaces, aunque herede de una sola clase.

Q: ¿Para qué sirve un método default en una interfaz?
* Aportar una implementación por defecto y evolucionar el contrato sin romper implementaciones
- Declarar atributos mutables
- Impedir implementar la interfaz
E: default permite añadir comportamiento a la interfaz sin obligar a reescribir las clases.

Q: ¿Cuál relación expresa mejor una interfaz?
* "puede-hacer" (una capacidad)
- "es-un" con código compartido
- "tiene-un"
E: La interfaz modela capacidades; la clase abstracta, familias "es-un" con código común.

Q: ¿Qué NO puede tener una interfaz?
* Estado mutable (atributos de instancia)
- Constantes
- Métodos abstractos
E: Las interfaces no tienen estado de instancia; sí constantes y métodos (abstractos/default/static).
```

## Actividad de la semana (formativa)

Opcional y no evaluable. Versión ampliada con rúbrica en **optional-activity** (entrega por GitHub).

- Define la interfaz `Reproducible` (con un método `default`) e impleméntala en `Cancion` y `Video`; procésalos polimórficamente por la interfaz.
