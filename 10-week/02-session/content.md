---
course: Programación y Diseño Orientado a Objetos
program: Ingeniería de Sistemas
term: 2026-B
week: 10
session: 2
corte: 2
unit: Unidad 2 · Herencia y polimorfismo
topic: Práctica guiada tipo parcial (Corte 2)
eyebrow: Unidad 2 · Cierre de Corte 2
lead: Resolvemos juntos un ejercicio integrador de diseño que combina herencia, polimorfismo e interfaces, con el formato del parcial.
objectives:
  - Diseñar una jerarquía con polimorfismo.
  - Aplicar una interfaz a la solución.
  - Autoevaluar la preparación para el parcial.
---

## 1. Ejercicio guiado

**Enunciado:** modela figuras geométricas que calculan su área (polimorfismo) y que además son "dibujables" (interfaz).

**Paso 1 — clase abstracta:**

```java
// tab: Paso 1
public abstract class Figura {
    public abstract double area();
}
```

**Paso 2 — interfaz:**

```java
// tab: Paso 2
public interface Dibujable { void dibujar(); }
```

**Paso 3 — subclases:**

```java
// tab: Paso 3
public class Circulo extends Figura implements Dibujable {
    private double r;
    public Circulo(double r) { this.r = r; }
    @Override public double area() { return Math.PI * r * r; }
    @Override public void dibujar() { System.out.println("Dibujando círculo"); }
}
```

**Paso 4 — uso polimórfico:**

```java
// tab: Paso 4
Figura[] figuras = { new Circulo(2), new Rectangulo(3, 4) };
for (Figura f : figuras) System.out.println(f.area());
```

## 2. Lista de verificación

- [ ] Clase abstracta con método abstracto.
- [ ] Al menos una interfaz implementada.
- [ ] Sobrescritura con `@Override`.
- [ ] Uso polimórfico (arreglo de superclase).

## 3. Recomendaciones para el parcial

- Identifica primero las **relaciones**: ¿es-un (herencia)? ¿tiene-un (composición)? ¿puede-hacer (interfaz)?
- Marca todo lo sobrescrito con `@Override`.
- Prueba el polimorfismo con un arreglo de la superclase o interfaz.

> tip: Un buen diseño (relaciones correctas + polimorfismo) vale más que muchas líneas: demuestra que entiendes la POO.

## Autoevaluación

```quiz
Q: Si una clase debe calcular área (jerarquía) y además dibujarse (contrato), usas...
* extends (clase/abstracta) + implements (interfaz)
- Solo herencia
- Solo una interfaz
E: Puede heredar de una clase/abstracta y a la vez implementar interfaces.

Q: ¿Qué evidencia el polimorfismo en el ejercicio?
* Recorrer un arreglo de Figura y que cada una calcule su propia área
- Que todas las figuras tengan la misma área
- Que no haya subclases
E: Un arreglo de la superclase con objetos distintos que responden cada uno a su forma.

Q: Antes de codificar en el parcial conviene identificar...
* Las relaciones: es-un, tiene-un, puede-hacer
- El color de la consola
- La versión del sistema operativo
E: Definir las relaciones guía qué mecanismo de POO aplicar.
```

## Actividad de la semana (formativa)

Opcional y no evaluable. Versión ampliada con rúbrica en **optional-activity** (entrega por GitHub).

- Completa el ejercicio de figuras (abstracta + interfaz + polimorfismo) con 3 figuras.
