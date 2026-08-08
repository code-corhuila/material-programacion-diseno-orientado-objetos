---
course: Programación y Diseño Orientado a Objetos
program: Ingeniería de Sistemas
term: 2026-B
week: 4
session: 2
corte: 1
unit: Unidad 1 · Fundamentos de la POO
topic: Representación de objetos (toString y equals)
eyebrow: Unidad 1 · Fundamentos · Corte 1
lead: Cuando imprimes un objeto ves algo como Persona@1b6d. En esta sesión aprendes a darle una representación legible con toString y a comparar objetos correctamente con equals.
objectives:
  - Sobrescribir toString para una salida legible.
  - Entender por qué == no compara el contenido de los objetos.
  - Sobrescribir equals para comparar por contenido.
---

## 1. El problema de imprimir un objeto

Por defecto, imprimir un objeto muestra la clase y un código de memoria:

```java
// tab: Sin toString
Persona p = new Persona("Ana", 20);
System.out.println(p);   // Persona@1b6d3586  (ilegible)
```

## 2. Sobrescribir toString

`toString()` define **cómo se representa el objeto como texto**. Se invoca automáticamente al imprimir o concatenar.

```java
// tab: toString
@Override
public String toString() {
    return "Persona{nombre=" + nombre + ", edad=" + edad + "}";
}
// ahora:
System.out.println(p);   // Persona{nombre=Ana, edad=20}
```

> info: La anotación `@Override` le dice al compilador que estás **redefiniendo** un método heredado de `Object`. Si te equivocas en la firma, te avisa.

## 3. Comparar objetos: == vs equals

- `==` compara **referencias** (¿son el mismo objeto en memoria?).
- `equals()` debería comparar **contenido** (¿tienen los mismos datos?).

```java
// tab: == vs equals
Persona a = new Persona("Ana", 20);
Persona b = new Persona("Ana", 20);
System.out.println(a == b);        // false (objetos distintos)
System.out.println(a.equals(b));   // depende de cómo definas equals
```

## 4. Sobrescribir equals

```java
// tab: equals
@Override
public boolean equals(Object o) {
    if (this == o) return true;
    if (!(o instanceof Persona)) return false;
    Persona otra = (Persona) o;
    return edad == otra.edad && nombre.equals(otra.nombre);
}
```

> warn: Comparar textos con `==` (`nombre == "Ana"`) es un error clásico: compara referencias. Para el contenido de String usa siempre `.equals()`.

## Autoevaluación

```quiz
Q: ¿Para qué se sobrescribe toString?
* Para dar al objeto una representación de texto legible
- Para crear el objeto
- Para eliminarlo de memoria
E: toString define cómo se ve el objeto al imprimirlo o concatenarlo.

Q: ¿Qué compara el operador == entre dos objetos?
* Si son la misma referencia (mismo objeto en memoria)
- Si tienen el mismo contenido
- Su tamaño
E: == compara referencias; para el contenido se usa equals.

Q: ¿Cómo se comparan dos String por su contenido?
* Con .equals()
- Con ==
- Con >
E: Los String se comparan por contenido con equals(), no con ==.
```

## Actividad de la semana (formativa)

Opcional y no evaluable. Versión ampliada con rúbrica en **optional-activity** (entrega por GitHub).

- Agrega `toString()` a tu clase `Libro` y comprueba la diferencia al imprimirlo.
