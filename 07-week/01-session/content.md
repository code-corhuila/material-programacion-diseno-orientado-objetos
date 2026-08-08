---
course: Programación y Diseño Orientado a Objetos
program: Ingeniería de Sistemas
term: 2026-B
week: 7
session: 1
corte: 2
unit: Unidad 2 · Herencia y polimorfismo
topic: Sobrescritura de métodos (@Override)
eyebrow: Unidad 2 · Herencia y polimorfismo · Corte 2
lead: Una subclase puede redefinir un método heredado para que se comporte a su manera. Eso es la sobrescritura, y es el mecanismo que hace posible el polimorfismo que verás en la siguiente sesión.
objectives:
  - Sobrescribir un método heredado con @Override.
  - Distinguir sobrescritura (override) de sobrecarga (overload).
  - Reconocer las reglas de la sobrescritura.
---

## 1. ¿Qué es sobrescribir?

**Sobrescribir (override)** es redefinir en la subclase un método que ya existe en la superclase, con la **misma firma**, para cambiar su comportamiento.

```java
// tab: Override
public class Animal {
    public String sonido() { return "..."; }
}
public class Perro extends Animal {
    @Override
    public String sonido() { return "Guau"; }   // redefine el heredado
}
public class Gato extends Animal {
    @Override
    public String sonido() { return "Miau"; }
}
```

> info: `@Override` es una **anotación** que le pide al compilador verificar que realmente estás sobrescribiendo. Si te equivocas en la firma, marca error en vez de crear un método nuevo por accidente.

## 2. Override vs Overload

No confundas dos conceptos parecidos:

| | Sobrescritura (override) | Sobrecarga (overload) |
|---|---|---|
| Dónde | En una **subclase** | En la **misma** clase |
| Firma | **Misma** firma | **Distinta** (parámetros) |
| Objetivo | Cambiar el comportamiento heredado | Varias versiones de un método |

```java
// tab: Overload (misma clase)
int sumar(int a, int b) { return a + b; }
double sumar(double a, double b) { return a + b; }  // sobrecarga
```

## 3. Reglas de la sobrescritura

- Misma **firma** (nombre y parámetros) que el método del padre.
- No puede **reducir** la visibilidad (si el padre es `public`, la hija no puede hacerlo `private`).
- Puede usar `super.metodo()` para reutilizar la versión del padre.

> warn: Si cambias los parámetros creyendo que sobrescribes, en realidad **sobrecargas** y el método del padre sigue activo. `@Override` te protege de ese error.

## Autoevaluación

```quiz
Q: ¿Qué es sobrescribir un método?
* Redefinirlo en la subclase con la misma firma
- Crear otro con distintos parámetros
- Borrar el método del padre
E: Override redefine, en la subclase, un método heredado con la misma firma.

Q: ¿Para qué sirve la anotación @Override?
* Que el compilador verifique que realmente sobrescribes
- Ejecutar el método más rápido
- Hacerlo privado
E: @Override valida la firma y evita crear un método nuevo por error.

Q: Override vs overload: la sobrecarga (overload)...
* Ocurre en la misma clase con distintos parámetros
- Ocurre en la subclase con la misma firma
- Es lo mismo que override
E: Overload = misma clase, distinta firma; override = subclase, misma firma.
```

## Actividad de la semana (formativa)

Opcional y no evaluable. Versión ampliada con rúbrica en **optional-activity** (entrega por GitHub).

- Sobrescribe `sonido()` en varias subclases de `Animal` usando `@Override`.
