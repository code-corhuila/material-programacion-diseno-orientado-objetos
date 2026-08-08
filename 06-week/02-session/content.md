---
course: Programación y Diseño Orientado a Objetos
program: Ingeniería de Sistemas
term: 2026-B
week: 6
session: 2
corte: 2
unit: Unidad 2 · Herencia y polimorfismo
topic: super, cadena de constructores y jerarquías
eyebrow: Unidad 2 · Herencia y polimorfismo · Corte 2
lead: Heredar no es copiar: la parte heredada de un objeto debe inicializarse correctamente antes de la parte propia. La palabra clave super gobierna esa colaboración entre subclase y superclase, tanto en la construcción como en la reutilización de comportamiento. Aquí formalizamos la cadena de constructores, el orden exacto de ejecución y el diseño de jerarquías sanas.
objectives:
  - Explicar y aplicar super(...) para la cadena de constructores.
  - Trazar el orden de ejecución al construir un objeto de una subclase.
  - Reutilizar y ampliar comportamiento con super.metodo().
  - Diseñar jerarquías correctas y usar final cuando corresponde.
---

## 1. Por qué existe super

Un objeto `Perro` **contiene** la parte `Animal` (sus atributos `nombre`, `edad`). Esa parte debe quedar **inicializada** antes de que la subclase configure lo suyo. `super(...)` invoca el **constructor de la superclase** para lograrlo.

> info: **Regla.** La llamada `super(argumentos)` debe ser la **primera instrucción** del constructor de la subclase. Si se omite, el compilador inserta una llamada implícita a `super()` (el constructor **sin argumentos** de la superclase).

## 2. La cadena de constructores

Construir una subclase dispara una **cadena**: cada constructor llama al de su superclase antes de ejecutar su propio cuerpo, hasta llegar a `Object`.

```java
// tab: Jerarquía
public class Animal {
    protected String nombre;
    public Animal(String nombre) {
        this.nombre = nombre;
        System.out.println("1) Constructor Animal");
    }
}
public class Perro extends Animal {
    private String raza;
    public Perro(String nombre, String raza) {
        super(nombre);          // 1º inicializa la parte Animal
        this.raza = raza;
        System.out.println("2) Constructor Perro");
    }
}
```
```java
// tab: Traza de ejecución
new Perro("Fido", "Labrador");
// Salida:
// 1) Constructor Animal   <- primero el padre
// 2) Constructor Perro    <- luego la subclase
```

El **orden es de arriba hacia abajo**: primero se completa la superclase, luego la subclase. Así, cuando el cuerpo de `Perro` se ejecuta, `nombre` ya es válido.

```ascii
new Perro(...)
   -> super(...) sube a Animal
        -> super() implícito sube a Object
             Object listo
        cuerpo de Animal se ejecuta   (1)
   cuerpo de Perro se ejecuta         (2)
```

> warn: Si la superclase **solo** define un constructor con parámetros, la subclase **está obligada** a llamar `super(...)` explícitamente. Omitirlo hace que el compilador intente `super()` (que no existe) → **error de compilación**. Es uno de los errores más frecuentes al introducir herencia.

## 3. super para reutilizar comportamiento

`super.metodo()` ejecuta la versión de la **superclase** desde la subclase. Es la base para **ampliar** (no reemplazar) comportamiento — se conecta con la sobrescritura de la Semana 7.

```java
// tab: Ampliar con super.metodo()
public class Empleado {
    protected String nombre;
    public Empleado(String nombre) { this.nombre = nombre; }
    public String ficha() { return "Empleado: " + nombre; }
}
public class Gerente extends Empleado {
    private String area;
    public Gerente(String nombre, String area) {
        super(nombre);
        this.area = area;
    }
    @Override
    public String ficha() {
        return super.ficha() + " | Gerente de " + area;  // reutiliza y amplía
    }
}
```

## 4. Jerarquías de varios niveles

La cadena funciona a cualquier profundidad: `Vehiculo → Automovil → AutoElectrico`. Cada nivel llama a su inmediato superior.

```ascii
Vehiculo
   ↑ super
Automovil
   ↑ super
AutoElectrico
```

> tip: Mantén las jerarquías **poco profundas (2–3 niveles)**. Cadenas largas acoplan fuertemente las clases y dificultan razonar sobre el orden de inicialización. Si necesitas más flexibilidad, combina con **composición**.

## 5. Object: la raíz común

Toda clase en Java hereda —directa o indirectamente— de **`java.lang.Object`**. De ahí provienen `toString()`, `equals()`, `hashCode()` (Semana 4). Por eso siempre existe un `super` al que subir, aunque no escribas `extends`.

## 6. Cerrar la herencia: final

A veces conviene **impedir** que una clase se herede o que un método se sobrescriba, por seguridad o diseño:

```java
// tab: final
public final class Constantes { }        // no se puede heredar
public class Cuenta {
    public final double getSaldo() { }    // no se puede sobrescribir
}
```

> info: `final` en una clase prohíbe subclases (ej. `String` es `final`); en un método prohíbe su sobrescritura. Es una decisión de diseño para proteger invariantes.

## 7. Errores comunes

- Olvidar `super(...)` cuando la superclase no tiene constructor sin argumentos.
- Poner `super(...)` **después** de otra instrucción (debe ser la primera).
- Asumir que el cuerpo de la subclase corre antes que el del padre (es al revés).
- Jerarquías demasiado profundas “por si acaso”.

## Autoevaluación

```quiz
Q: ¿Dónde debe ir la llamada super(...) en el constructor de la subclase?
* En la primera instrucción
- En la última instrucción
- En cualquier lugar
E: super(...) debe ser la primera instrucción del constructor de la subclase.

Q: Al hacer new Perro(...), ¿qué cuerpo de constructor se ejecuta primero?
* El de la superclase (Animal), luego el de la subclase
- El de la subclase, luego el de la superclase
- Solo el de la subclase
E: La cadena inicializa de arriba hacia abajo: primero la superclase, luego la subclase.

Q: Si la superclase solo tiene constructor con parámetros y la subclase no llama super(...), ¿qué pasa?
* Error de compilación (se intenta super() inexistente)
- Se ejecuta sin problema
- Se lanza una excepción en tiempo de ejecución
E: El compilador inserta super() implícito; si no existe, falla la compilación.

Q: ¿Qué hace super.ficha() dentro de un método sobrescrito?
* Ejecuta la versión de la superclase para reutilizar/ampliar su comportamiento
- Crea un nuevo objeto de la superclase
- Detiene el programa
E: super.metodo() invoca la implementación del padre desde la subclase.

Q: ¿De qué clase heredan, en última instancia, todas las clases de Java?
* Object
- Main
- System
E: Object es la raíz; aporta toString, equals y hashCode.

Q: ¿Qué efecto tiene declarar un método como final?
* No puede ser sobrescrito por las subclases
- No puede ser llamado
- Se ejecuta más rápido
E: final en un método impide su sobrescritura; en una clase, impide heredarla.
```

## Actividad de la semana (formativa)

Opcional y no evaluable. Versión ampliada con rúbrica en **optional-activity** (entrega por GitHub).

- Implementa la jerarquía `Empleado → Gerente/Desarrollador` con `super(...)` en los constructores y un método `ficha()` que use `super.ficha()` para ampliar la información; añade `System.out.println` para trazar el orden de construcción.
