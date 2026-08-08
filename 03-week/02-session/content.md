---
course: Programación y Diseño Orientado a Objetos
program: Ingeniería de Sistemas
term: 2026-B
week: 3
session: 2
corte: 1
unit: Unidad 1 · Fundamentos de la POO
topic: Getters, setters y validación
eyebrow: Unidad 1 · Fundamentos · Corte 1
lead: Si los atributos son privados, ¿cómo se leen y modifican desde fuera? Con getters y setters: métodos públicos que dan acceso controlado y permiten validar antes de cambiar el estado.
objectives:
  - Implementar getters y setters para atributos privados.
  - Validar datos dentro de los setters.
  - Diseñar una clase completamente encapsulada.
---

## 1. Getters y setters

- **Getter:** método que **devuelve** el valor de un atributo. Convención: `getNombre()`.
- **Setter:** método que **asigna** un valor, normalmente con validación. Convención: `setNombre(...)`.

```java
// tab: Getter y setter
public class Persona {
    private String nombre;
    private int edad;

    public String getNombre() { return nombre; }
    public void setNombre(String nombre) { this.nombre = nombre; }

    public int getEdad() { return edad; }
    public void setEdad(int edad) {
        if (edad >= 0 && edad <= 120) this.edad = edad;   // validación
    }
}
```

## 2. El valor de validar

El setter es el **guardián** del atributo: rechaza valores inválidos y mantiene el objeto siempre en un estado correcto.

```java
// tab: Uso
Persona p = new Persona();
p.setEdad(30);    // OK
p.setEdad(-4);    // rechazado por la validación -> edad sigue válida
System.out.println(p.getEdad());  // 30
```

> tip: No todo atributo necesita setter. Si un dato no debe cambiar tras crearse (p. ej. un número de identificación), deja solo el getter: lo haces de **solo lectura**.

## 3. Clase totalmente encapsulada

```java
// tab: Cuenta encapsulada
public class Cuenta {
    private double saldo = 0;

    public double getSaldo() { return saldo; }

    public void consignar(double monto) {
        if (monto > 0) saldo += monto;
    }
    public boolean retirar(double monto) {
        if (monto > 0 && monto <= saldo) { saldo -= monto; return true; }
        return false;   // fondos insuficientes
    }
}
```

> warn: Un setter que solo hace `this.x = x` sin validar aporta poco. Su valor está en **proteger las reglas** del objeto.

## Autoevaluación

```quiz
Q: ¿Qué hace un getter?
* Devuelve el valor de un atributo privado
- Modifica el atributo
- Elimina el objeto
E: El getter da acceso de lectura al atributo; el setter asigna.

Q: ¿Dónde conviene poner la validación de datos?
* Dentro del setter (o del método que modifica)
- En el getter
- En ningún lado
E: El setter valida antes de asignar, manteniendo el objeto en estado válido.

Q: ¿Cómo se hace un atributo de solo lectura?
* Dando solo getter (sin setter)
- Marcándolo public
- Quitándole el tipo
E: Sin setter, el atributo no se puede cambiar desde fuera: solo lectura.
```

## Actividad de la semana (formativa)

Opcional y no evaluable. Versión ampliada con rúbrica en **optional-activity** (entrega por GitHub).

- Encapsula la clase `Cuenta`: atributos privados, getters, y `consignar`/`retirar` con validación.
