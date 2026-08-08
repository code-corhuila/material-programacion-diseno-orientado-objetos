---
course: Programación y Diseño Orientado a Objetos
program: Ingeniería de Sistemas
term: 2026-B
week: 6
session: 2
corte: 2
unit: Unidad 2 · Herencia y polimorfismo
topic: super y jerarquías de clases
eyebrow: Unidad 2 · Herencia y polimorfismo · Corte 2
lead: Al heredar, la subclase suele necesitar apoyarse en la superclase: reutilizar su constructor y sus métodos. La palabra clave super hace justo eso, y con ella construimos jerarquías bien formadas.
objectives:
  - Usar super(...) para invocar el constructor de la superclase.
  - Usar super.metodo() para reutilizar comportamiento del padre.
  - Construir una jerarquía de varios niveles.
---

## 1. super en el constructor

Cuando creas una subclase, primero debe inicializarse la parte heredada. `super(...)` llama al **constructor de la superclase** y debe ir en la **primera línea**.

```java
// tab: super()
public class Animal {
    protected String nombre;
    public Animal(String nombre) { this.nombre = nombre; }
}
public class Perro extends Animal {
    private String raza;
    public Perro(String nombre, String raza) {
        super(nombre);        // inicializa la parte Animal
        this.raza = raza;     // luego lo propio
    }
}
```

> warn: Si la superclase solo tiene constructor con parámetros, la subclase **debe** llamar `super(...)`. Olvidarlo es un error de compilación frecuente.

## 2. super para reutilizar métodos

`super.metodo()` ejecuta la versión del **padre**, útil cuando la subclase amplía (no reemplaza del todo) el comportamiento.

```java
// tab: super.metodo()
public class Empleado {
    public String datos() { return "Empleado"; }
}
public class Gerente extends Empleado {
    @Override public String datos() {
        return super.datos() + " (Gerente)";   // reutiliza y amplía
    }
}
```

## 3. Jerarquías de varios niveles

La herencia puede encadenarse: `Vehiculo` → `Automovil` → `AutoElectrico`. Cada nivel añade especialización.

```ascii
Vehiculo
   |
Automovil
   |
AutoElectrico
```

> tip: Mantén las jerarquías **poco profundas** (2–3 niveles). Cadenas muy largas se vuelven difíciles de entender y mantener.

## 4. Object: la raíz de todo

En Java, toda clase hereda (implícitamente) de **Object**. Por eso todo objeto tiene `toString()`, `equals()` y `hashCode()` — que ya aprendiste a sobrescribir.

## Autoevaluación

```quiz
Q: ¿Qué hace super(...) en un constructor?
* Llama al constructor de la superclase
- Crea un objeto nuevo
- Llama al método main
E: super(...) invoca el constructor del padre; debe ir en la primera línea.

Q: ¿Para qué sirve super.metodo()?
* Ejecutar la versión del método definida en la superclase
- Borrar el método
- Crear un método nuevo
E: super.metodo() reutiliza el comportamiento del padre desde la subclase.

Q: ¿De qué clase heredan implícitamente todas las clases en Java?
* Object
- Main
- System
E: Toda clase hereda de Object, que aporta toString, equals y hashCode.
```

## Actividad de la semana (formativa)

Opcional y no evaluable. Versión ampliada con rúbrica en **optional-activity** (entrega por GitHub).

- Agrega constructores con `super(...)` a tu jerarquía Animal/Perro/Gato.
