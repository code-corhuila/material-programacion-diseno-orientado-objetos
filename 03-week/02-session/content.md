---
course: Programación y Diseño Orientado a Objetos
program: Ingeniería de Sistemas
term: 2026-B
week: 3
session: 2
corte: 1
unit: Unidad 1 · Fundamentos de la POO
topic: Getters, setters, validación e inmutabilidad
eyebrow: Unidad 1 · Fundamentos · Corte 1
lead: Si los atributos son privados, el acceso controlado se da mediante métodos: getters (leer) y setters (modificar, con validación). Pero un buen diseño no expone todo mecánicamente: decide qué es de solo lectura, qué se valida y qué conviene hacer inmutable. Esta sesión enseña a diseñar la interfaz de acceso con criterio.
objectives:
  - Implementar getters y setters siguiendo las convenciones de Java.
  - Validar datos en los setters para proteger las invariantes.
  - Diseñar atributos de solo lectura y clases inmutables.
  - Decidir cuándo NO exponer un setter.
---

## 1. Getters y setters

- **Getter:** método que **devuelve** el valor de un atributo. Convención: `getNombre()`; para `boolean`, `isActivo()`.
- **Setter:** método que **asigna** un valor, normalmente **con validación**. Convención: `setNombre(...)`.

```java
// tab: Accesores con validación
public class Persona {
    private String nombre;
    private int edad;

    public String getNombre() { return nombre; }
    public void setNombre(String nombre) {
        if (nombre != null && !nombre.isBlank()) this.nombre = nombre;
    }
    public int getEdad() { return edad; }
    public void setEdad(int edad) {
        if (edad >= 0 && edad <= 120) this.edad = edad;   // protege invariante
    }
}
```

## 2. El setter como guardián de la invariante

El valor real de un setter **no** es asignar, sino **validar antes de asignar**. Es el punto único por donde el estado cambia; ahí se hacen cumplir las reglas.

```java
// tab: Uso
Persona p = new Persona();
p.setEdad(30);    // aceptado
p.setEdad(-4);    // rechazado -> edad permanece válida
System.out.println(p.getEdad());   // 30
```

> warn: Un setter que solo hace `this.x = x` sin validar aporta poco más que un atributo público con pasos extra. Su valor está en **proteger las reglas** del objeto.

## 3. Atributos de solo lectura

Si un dato **no debe cambiar** tras crearse (ej. un número de identificación), expón **solo el getter** (sin setter). El valor se fija en el constructor (Semana 4).

```java
// tab: Solo lectura
public class Estudiante {
    private final String codigo;   // final: se asigna una vez
    public Estudiante(String codigo) { this.codigo = codigo; }
    public String getCodigo() { return codigo; }   // sin setter
}
```

> info: `final` en un atributo obliga a asignarlo **una sola vez** (en la declaración o el constructor) y prohíbe cambiarlo después. Refuerza el diseño de solo lectura.

## 4. Getters calculados

No todo getter devuelve un atributo tal cual: puede **calcular** un valor derivado, evitando almacenar datos redundantes.

```java
// tab: Getter calculado
public class Rectangulo {
    private double base, altura;
    public double getArea() { return base * altura; }   // no se guarda, se calcula
}
```

## 5. Inmutabilidad

Un objeto **inmutable** no cambia su estado tras crearse: todos sus atributos son `final` y no tiene setters. Ventajas: es seguro de compartir, no da sorpresas por aliasing y es fácil de razonar.

```java
// tab: Clase inmutable
public final class Punto {
    private final int x, y;
    public Punto(int x, int y) { this.x = x; this.y = y; }
    public int getX() { return x; }
    public int getY() { return y; }
    // sin setters: el punto nunca cambia
}
```

> info: `String` en Java es inmutable: por eso métodos como `toUpperCase()` devuelven un **nuevo** String en vez de modificar el original.

## 6. ¿Cuándo NO poner setter?

- Cuando el atributo es **de solo lectura** por diseño (identificadores, fechas de creación).
- Cuando el objeto es **inmutable**.
- Cuando el cambio debe ocurrir por una **operación de negocio** con nombre propio (mejor `retirar(monto)` que `setSaldo(...)`, que permitiría fijar cualquier saldo).

> tip: Prefiere métodos que expresen **operaciones del dominio** sobre setters genéricos. `cuenta.retirar(50)` comunica y valida; `cuenta.setSaldo(x)` rompe la invariante.

## 7. Errores comunes

- Generar getters/setters para **todo** de forma automática, sin pensar el diseño.
- Setters sin validación (encapsulamiento aparente).
- Exponer `setSaldo`/`setId` que permiten violar reglas o cambiar identificadores.
- Almacenar datos que podrían **calcularse** (redundancia que puede quedar inconsistente).

## Autoevaluación

```quiz
Q: ¿Cuál es el verdadero valor de un setter?
* Validar los datos antes de asignarlos, protegiendo la invariante
- Únicamente asignar el atributo
- Acelerar el programa
E: El setter valida y mantiene el objeto en estado válido; asignar sin validar aporta poco.

Q: ¿Cómo se hace un atributo de solo lectura?
* Exponiendo solo el getter (sin setter), típicamente con final
- Poniéndolo public
- Quitándole el tipo
E: Sin setter (y con final) el atributo no cambia tras asignarse.

Q: ¿Qué caracteriza a un objeto inmutable?
* No cambia su estado tras crearse (atributos final, sin setters)
- Tiene setters para todo
- No tiene atributos
E: Un objeto inmutable fija su estado en construcción y no lo cambia.

Q: ¿Qué es un getter calculado?
* Un método que deriva/computa el valor en vez de devolver un atributo almacenado
- Un setter con validación
- Un atributo público
E: getArea() calcula base*altura sin almacenar el área (evita redundancia).

Q: ¿Por qué preferir cuenta.retirar(50) sobre cuenta.setSaldo(x)?
* retirar valida y expresa una operación del dominio; setSaldo permitiría violar la invariante
- Son equivalentes
- setSaldo es más seguro
E: Operaciones con significado protegen las reglas; un setSaldo genérico las rompe.

Q: String en Java es inmutable; por eso toUpperCase()...
* Devuelve un nuevo String en vez de modificar el original
- Modifica el String original
- Da error
E: Al ser inmutable, los métodos de String devuelven nuevas instancias.
```

## Actividad de la semana (formativa)

Opcional y no evaluable. Versión ampliada con rúbrica en **optional-activity** (entrega por GitHub).

- Diseña una clase `CuentaBancaria` con `saldo` privado, `getSaldo()`, y operaciones de dominio `consignar`/`retirar` validadas (sin `setSaldo`). Añade un `id` de solo lectura (`final`). Prueba casos válidos e inválidos.
