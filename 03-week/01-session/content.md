---
course: Programación y Diseño Orientado a Objetos
program: Ingeniería de Sistemas
term: 2026-B
week: 3
session: 1
corte: 1
unit: Unidad 1 · Fundamentos de la POO
topic: Encapsulamiento — proteger el estado
eyebrow: Unidad 1 · Fundamentos · Corte 1
lead: Un objeto no debería dejar que cualquiera cambie sus datos sin control. El encapsulamiento —uno de los cuatro pilares— oculta el estado interno y expone solo lo necesario, haciendo el código más seguro y mantenible.
objectives:
  - Explicar qué es el encapsulamiento y por qué importa.
  - Aplicar el modificador private a los atributos.
  - Reconocer los niveles de acceso en Java.
---

## 1. ¿Qué es el encapsulamiento?

**Encapsular** es ocultar los detalles internos de un objeto y controlar el acceso a su estado. Los atributos se marcan **privados** y el resto del programa interactúa solo a través de métodos públicos.

> info: Analogía: un cajero automático no te deja meter la mano a la caja. Te da una **interfaz** (botones) y controla internamente el dinero. Eso es encapsulamiento.

## 2. El problema de los atributos públicos

Sin encapsulamiento, cualquiera puede dejar el objeto en un estado inválido:

```java
// tab: Sin encapsular (riesgoso)
public class Cuenta {
    public double saldo;
}
// ...
Cuenta c = new Cuenta();
c.saldo = -5000;   // ¡saldo negativo! nadie lo impide
```

> warn: Atributos `public` = cualquiera modifica el estado sin reglas. Es la puerta a errores difíciles de rastrear.

## 3. La solución: private

Marcamos los atributos como **private**: solo el código dentro de la clase puede tocarlos directamente.

```java
// tab: Encapsulado
public class Cuenta {
    private double saldo;   // nadie fuera de la clase lo toca directo

    public void consignar(double monto) {
        if (monto > 0) saldo += monto;   // regla protegida
    }
}
```

## 4. Niveles de acceso en Java

| Modificador | Accesible desde |
|---|---|
| `private` | Solo la misma clase |
| (sin modificar) | Mismo paquete |
| `protected` | Mismo paquete + subclases |
| `public` | Cualquier clase |

> tip: Regla práctica: **atributos private, métodos públicos** los que forman la interfaz del objeto. Expón comportamiento, oculta datos.

## Autoevaluación

```quiz
Q: ¿Qué busca el encapsulamiento?
* Ocultar el estado interno y controlar su acceso
- Hacer todos los atributos públicos
- Eliminar los métodos
E: Encapsular protege el estado y lo expone solo mediante métodos controlados.

Q: ¿Qué modificador restringe el acceso a solo la misma clase?
* private
- public
- protected
E: private limita el acceso al interior de la clase.

Q: ¿Cuál es la buena práctica recomendada?
* Atributos private + métodos públicos como interfaz
- Todo public
- Todo private, sin métodos
E: Se ocultan los datos (private) y se expone comportamiento (métodos públicos).
```

## Actividad de la semana (formativa)

Opcional y no evaluable. Versión ampliada con rúbrica en **optional-activity** (entrega por GitHub).

- Toma tu clase `Libro` y vuelve sus atributos `private`. Observa qué deja de compilar.
