---
course: Programación y Diseño Orientado a Objetos
program: Ingeniería de Sistemas
term: 2026-B
week: 8
session: 1
corte: 2
unit: Unidad 2 · Herencia y polimorfismo
topic: Clases abstractas
eyebrow: Unidad 2 · Abstracción · Corte 2
lead: A veces una superclase representa un concepto general que no debería instanciarse directamente: no existe "un Animal" a secas, sino perros y gatos. Las clases abstractas modelan eso y obligan a las subclases a completar el comportamiento.
objectives:
  - Explicar qué es una clase abstracta y cuándo usarla.
  - Declarar métodos abstractos que las subclases deben implementar.
  - Diferenciar clase abstracta de clase concreta.
---

## 1. ¿Qué es una clase abstracta?

Una **clase abstracta** representa un concepto general que **no se puede instanciar** directamente (`new`). Sirve como base común para subclases más concretas.

```java
// tab: Clase abstracta
public abstract class Figura {
    protected String color;
    public abstract double area();     // método abstracto: sin cuerpo
    public void describir() {          // método concreto: con cuerpo
        System.out.println("Figura " + color + " con área " + area());
    }
}
```

- `new Figura()` → **error**: una figura genérica no tiene forma concreta.
- Sí puedes: `Figura f = new Circulo();` (polimorfismo).

## 2. Métodos abstractos

Un **método abstracto** declara la firma pero **no** el cuerpo. Obliga a cada subclase a implementarlo.

```java
// tab: Implementar el abstracto
public class Circulo extends Figura {
    private double radio;
    public Circulo(double radio) { this.radio = radio; }
    @Override public double area() { return Math.PI * radio * radio; }
}
```

> warn: Si una subclase **no** implementa todos los métodos abstractos heredados, ella también debe declararse `abstract`. Si no, no compila.

## 3. Abstracta vs concreta

| | Clase abstracta | Clase concreta |
|---|---|---|
| ¿Se instancia con new? | No | Sí |
| ¿Puede tener métodos abstractos? | Sí | No |
| ¿Puede tener métodos con cuerpo? | Sí | Sí |
| Rol | Base común / contrato parcial | Implementación usable |

> tip: Usa una clase abstracta cuando varias subclases **comparten código** pero además **deben** definir cada una su versión de ciertos métodos.

## Autoevaluación

```quiz
Q: ¿Qué caracteriza a una clase abstracta?
* No se puede instanciar directamente con new
- No puede tener atributos
- No puede tener subclases
E: Una clase abstracta no se instancia; sirve de base para subclases.

Q: Un método abstracto...
* Declara la firma sin cuerpo y obliga a implementarlo en las subclases
- Tiene cuerpo y no se puede sobrescribir
- Es privado siempre
E: El método abstracto no tiene cuerpo; cada subclase concreta lo implementa.

Q: Si una subclase no implementa todos los métodos abstractos, ¿qué ocurre?
* Debe declararse abstract también, o no compila
- Se ejecuta igual
- Se ignoran los métodos
E: Debe implementarlos o ser abstracta; de lo contrario no compila.
```

## Actividad de la semana (formativa)

Opcional y no evaluable. Versión ampliada con rúbrica en **optional-activity** (entrega por GitHub).

- Convierte `Figura` en abstracta con `area()` abstracto y dos subclases que lo implementen.
