---
course: Programación y Diseño Orientado a Objetos
program: Ingeniería de Sistemas
term: 2026-B
week: 4
session: 2
corte: 1
unit: Unidad 1 · Fundamentos de la POO
topic: Representación e igualdad de objetos (toString, equals, hashCode)
eyebrow: Unidad 1 · Fundamentos · Corte 1
lead: Todo objeto en Java hereda de Object métodos como toString, equals y hashCode. Sus versiones por defecto rara vez sirven: imprimen direcciones de memoria y comparan por identidad, no por contenido. Sobrescribirlos correctamente —respetando sus contratos— es esencial para depurar, comparar y usar objetos en colecciones.
objectives:
  - Sobrescribir toString para una representación legible.
  - Distinguir == (identidad) de equals (contenido).
  - Implementar equals respetando su contrato.
  - Explicar por qué equals y hashCode van juntos.
---

## 1. toString: representación legible

Por defecto, imprimir un objeto muestra `Clase@hash` (ilegible). Sobrescribir **toString()** define su representación en texto; se invoca automáticamente al imprimir o concatenar.

```java
// tab: toString
public class Persona {
    private String nombre; private int edad;
    @Override
    public String toString() {
        return "Persona{nombre='" + nombre + "', edad=" + edad + "}";
    }
}
// System.out.println(p);  ->  Persona{nombre='Ana', edad=20}
```

> info: `@Override` le pide al compilador **verificar** que realmente estás redefiniendo un método heredado (aquí, de `Object`). Si te equivocas en la firma, marca error en lugar de crear un método nuevo por accidente.

## 2. == vs equals

| Operador/método | Compara | Para objetos |
|---|---|---|
| `==` | **identidad** (¿la misma referencia/objeto?) | rara vez lo que quieres |
| `equals()` | **contenido** (si se sobrescribe) | lo habitual para comparar valores |

```java
// tab: == vs equals
Persona a = new Persona("Ana", 20);
Persona b = new Persona("Ana", 20);
System.out.println(a == b);        // false: objetos distintos (identidad)
System.out.println(a.equals(b));   // true SOLO si sobrescribes equals por contenido
```

> warn: Comparar textos con `==` (`nombre == "Ana"`) es un error clásico: compara referencias. Para el **contenido** de un `String` usa siempre `.equals()`.

## 3. Sobrescribir equals correctamente

```java
// tab: equals
@Override
public boolean equals(Object o) {
    if (this == o) return true;                 // misma referencia
    if (o == null || getClass() != o.getClass()) return false;
    Persona otra = (Persona) o;                 // casting seguro
    return edad == otra.edad && java.util.Objects.equals(nombre, otra.nombre);
}
```

> info: **Contrato de equals** (debe cumplirse): **reflexivo** (`x.equals(x)`), **simétrico** (`x.equals(y)` ⇔ `y.equals(x)`), **transitivo**, **consistente** (mismo resultado si no cambia el estado) y `x.equals(null)` es `false`.

## 4. equals y hashCode van juntos

> warn: **Regla de oro:** si sobrescribes `equals`, **debes** sobrescribir `hashCode`. Contrato: si `a.equals(b)` es `true`, entonces `a.hashCode() == b.hashCode()`. Romperlo hace que los objetos se comporten mal en `HashMap`/`HashSet` (no se encuentran).

```java
// tab: hashCode
@Override
public int hashCode() {
    return java.util.Objects.hash(nombre, edad);   // usa los mismos campos que equals
}
```

`Objects.hash(...)` y `Objects.equals(...)` son utilidades que simplifican y evitan errores (incluido el manejo de `null`).

## 5. ¿Cuándo sobrescribirlos?

- **toString:** casi siempre (ayuda a depurar y registrar).
- **equals + hashCode:** cuando los objetos representan **valores** que se comparan o se guardan en colecciones basadas en hash (`HashSet`, claves de `HashMap`).

> tip: Muchos IDE generan `equals`/`hashCode`/`toString` correctos a partir de los atributos. Aun así, entiende el contrato: generar sin comprender lleva a bugs sutiles.

## Autoevaluación

```quiz
Q: ¿Para qué se sobrescribe toString()?
* Para dar al objeto una representación de texto legible
- Para compararlo con otro
- Para crearlo
E: toString define cómo se ve el objeto al imprimirlo o concatenarlo.

Q: ¿Qué compara == entre dos objetos?
* La identidad: si son la misma referencia/objeto
- El contenido de sus atributos
- Su tamaño en memoria
E: == compara referencias; el contenido se compara con equals.

Q: Si a y b son objetos distintos con los mismos datos, a.equals(b) es true...
* Solo si sobrescribes equals para comparar por contenido
- Siempre
- Nunca
E: Sin sobrescribir equals, se hereda el de Object (compara identidad) y da false.

Q: Si sobrescribes equals, ¿qué DEBES sobrescribir también?
* hashCode (por su contrato con equals)
- toString
- El constructor
E: equals y hashCode van juntos: objetos iguales deben tener el mismo hashCode.

Q: ¿Cómo se comparan dos String por su contenido?
* Con .equals()
- Con ==
- Con >
E: Los String se comparan por contenido con equals(), no con ==.

Q: ¿Qué propiedad NO exige el contrato de equals?
* Que sea más rápido que ==
- Reflexividad
- Simetría
E: El contrato exige reflexividad, simetría, transitividad y consistencia; no rendimiento.
```

## Actividad de la semana (formativa)

Opcional y no evaluable. Versión ampliada con rúbrica en **optional-activity** (entrega por GitHub).

- A tu clase `Producto`, agrégale `toString()`, y `equals`/`hashCode` por `codigo`. Demuestra con dos objetos de igual código que `equals` da `true` y que funcionan como clave en un `HashSet`.
