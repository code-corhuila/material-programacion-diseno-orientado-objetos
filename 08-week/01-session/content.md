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
lead: Algunas superclases representan conceptos generales que no deberían instanciarse: no existe "una Figura" a secas, sino círculos y rectángulos. Las clases abstractas modelan justamente eso —una base común parcial— y obligan a las subclases a completar el comportamiento que falta. Son la materialización del pilar de abstracción combinada con herencia.
objectives:
  - Definir clase y método abstracto y su motivación.
  - Explicar por qué una clase abstracta no se instancia.
  - Combinar métodos abstractos y concretos en una base común.
  - Distinguir clase abstracta de clase concreta.
---

## 1. Definición

> info: **Clase abstracta.** Clase que **no puede instanciarse** directamente (`new`) porque representa un concepto general/incompleto. Sirve como **base común** para subclases concretas y puede contener tanto métodos **abstractos** (sin cuerpo, obligatorios de implementar) como **concretos** (con cuerpo, heredables).

```java
// tab: Clase abstracta
public abstract class Figura {
    protected String color;
    public abstract double area();        // abstracto: sin cuerpo (contrato)
    public void describir() {             // concreto: comportamiento compartido
        System.out.println("Figura " + color + " con área " + area());
    }
}
```

- `new Figura()` → **error de compilación** (una figura genérica no tiene forma concreta).
- Sí es válido, por polimorfismo: `Figura f = new Circulo();`.

## 2. Métodos abstractos

> info: **Método abstracto.** Declara la firma pero **no** el cuerpo; obliga a cada subclase concreta a **implementarlo**. Define *qué* debe hacerse, delegando el *cómo* a la subclase.

```java
// tab: Implementar el abstracto
public class Circulo extends Figura {
    private double radio;
    public Circulo(double radio) { this.radio = radio; }
    @Override public double area() { return Math.PI * radio * radio; }
}
```

> warn: Si una subclase **no** implementa **todos** los métodos abstractos heredados, ella misma debe declararse `abstract` (queda incompleta). Si no, **no compila**.

## 3. Base común parcial (patrón plantilla)

El valor de una clase abstracta es combinar lo **común** (concreto, escrito una vez) con lo **variable** (abstracto, definido por cada subclase). El método `describir()` del ejemplo usa `area()` sin saber cómo se calcula: cada figura aporta su fórmula.

```ascii
Figura (abstracta)
 ├── describir()  [concreto, común]  ── usa area()
 └── area()       [abstracto]  ── lo define cada subclase
      ├── Circulo.area()  = π r²
      └── Rectangulo.area() = b·h
```

Esto es la esencia del **patrón método plantilla**: el algoritmo general vive en la base; los pasos variables, en las subclases.

## 4. Abstracta vs concreta

| | Clase abstracta | Clase concreta |
|---|---|---|
| ¿`new`? | No | Sí |
| ¿Métodos abstractos? | Puede tener | No |
| ¿Métodos con cuerpo? | Sí | Sí |
| Rol | Base común / contrato parcial | Implementación usable |
| Estado (atributos) | Sí | Sí |

> tip: Usa una clase abstracta cuando varias subclases **comparten estado y código** y además **deben** definir cada una su versión de ciertos métodos. Si solo necesitas un contrato sin estado ni código compartido, usa una **interfaz** (S2).

## 5. Errores comunes

- Intentar `new` sobre una clase abstracta.
- Olvidar implementar un método abstracto en la subclase (no compila o la vuelve abstracta).
- Hacer abstracta una clase que sí debería instanciarse (sobrediseño).
- Poner cuerpo a un método declarado `abstract` (contradicción).

## Autoevaluación

```quiz
Q: ¿Qué caracteriza a una clase abstracta?
* No puede instanciarse con new; sirve de base para subclases
- No puede tener atributos
- No puede tener métodos con cuerpo
E: Una clase abstracta no se instancia y puede mezclar métodos abstractos y concretos.

Q: Un método abstracto...
* Declara la firma sin cuerpo y obliga a implementarlo en las subclases concretas
- Tiene cuerpo y no se puede sobrescribir
- Es siempre privado
E: El método abstracto define el "qué"; cada subclase concreta aporta el "cómo".

Q: Si una subclase no implementa todos los métodos abstractos heredados...
* Debe declararse abstract también, o no compila
- Se ejecuta igual
- Se ignoran esos métodos
E: Debe implementarlos o volverse abstracta; si no, falla la compilación.

Q: ¿Es válido Figura f = new Circulo(); si Figura es abstracta?
* Sí: no instancias Figura, instancias Circulo y usas la referencia por polimorfismo
- No, nunca
- Solo si Circulo es abstracta
E: No se instancia la abstracta; se instancia la subclase concreta y se referencia como Figura.

Q: describir() (concreto) llama a area() (abstracto). Esto ilustra...
* El patrón método plantilla: algoritmo común en la base, pasos variables en subclases
- Sobrecarga
- Encapsulamiento
E: La base define el flujo usando pasos que las subclases concretan (template method).

Q: ¿Cuándo preferir clase abstracta sobre interfaz?
* Cuando hay estado y código compartido entre las subclases, además del contrato
- Cuando no hay nada en común
- Siempre
E: La clase abstracta aporta estado/código compartido; la interfaz, solo contrato.
```

## Actividad de la semana (formativa)

Opcional y no evaluable. Versión ampliada con rúbrica en **optional-activity** (entrega por GitHub).

- Convierte `Figura` en abstracta con `area()` abstracto y un `describir()` concreto que lo use; implementa dos subclases y demuestra que `new Figura()` no compila.
