---
course: Programación y Diseño Orientado a Objetos
program: Ingeniería de Sistemas
term: 2026-B
week: 3
session: 1
corte: 1
unit: Unidad 1 · Fundamentos de la POO
topic: Encapsulamiento y ocultamiento de información
eyebrow: Unidad 1 · Fundamentos · Corte 1
lead: El encapsulamiento es el segundo pilar de la POO y, quizá, el más importante para la calidad del software. Consiste en ocultar el estado interno de un objeto y exponer solo una interfaz controlada, de modo que el objeto proteja sus propias reglas (invariantes). Esta sesión lo formaliza: qué es, por qué importa y cómo se logra en Java.
objectives:
  - Definir encapsulamiento y ocultamiento de información.
  - Explicar el concepto de invariante de una clase.
  - Aplicar los modificadores de acceso de Java con criterio.
  - Justificar por qué los atributos deben ser privados.
---

## 1. Definición

> info: **Encapsulamiento.** Principio por el cual un objeto **oculta su estado interno** y expone su funcionalidad únicamente a través de una **interfaz pública controlada** (sus métodos). El resto del programa interactúa con el objeto **sin conocer ni manipular** sus datos directamente.

Tiene dos caras:

- **Agrupar** en una misma unidad (la clase) los datos y las operaciones que los usan.
- **Ocultar** (information hiding) los detalles internos detrás de una interfaz estable.

> tip: Analogía: un cajero automático no te deja meter la mano a la caja de dinero. Te ofrece **botones** (interfaz) y controla internamente el efectivo (estado). Eso es encapsulamiento.

## 2. Invariantes: la razón de fondo

> info: **Invariante de clase.** Condición que **siempre** debe cumplirse para que un objeto sea válido. Ej.: en una `CuentaBancaria`, `saldo >= 0`; en una `Fecha`, `1 <= dia <= 31`.

El encapsulamiento existe para **proteger las invariantes**: si nadie externo puede tocar el estado directamente, el objeto puede **garantizar** que sus reglas nunca se violan.

## 3. El problema de los atributos públicos

Sin encapsulamiento, cualquiera puede dejar el objeto en un estado **inválido**, rompiendo su invariante:

```java
// tab: Sin encapsular (frágil)
public class Cuenta {
    public double saldo;   // expuesto
}
// ...
Cuenta c = new Cuenta();
c.saldo = -50000;          // ¡viola la invariante saldo >= 0! nadie lo impide
```

> warn: Atributos `public` = el estado queda a merced de cualquier parte del programa. Los errores resultantes son difíciles de rastrear porque **cualquiera** pudo corromper el dato.

## 4. La solución: private + interfaz pública

Se marcan los atributos **`private`** y se expone el comportamiento con métodos `public` que **hacen cumplir** las reglas.

```java
// tab: Encapsulado (robusto)
public class Cuenta {
    private double saldo = 0;                 // nadie fuera lo toca directo

    public double getSaldo() { return saldo; }

    public void consignar(double monto) {
        if (monto > 0) saldo += monto;        // protege la regla
    }
    public boolean retirar(double monto) {
        if (monto > 0 && monto <= saldo) { saldo -= monto; return true; }
        return false;                         // impide saldo negativo
    }
}
```

Aquí la invariante `saldo >= 0` **no se puede violar** desde afuera: el objeto la garantiza.

## 5. Modificadores de acceso en Java

| Modificador | Misma clase | Mismo paquete | Subclase (otro paquete) | Cualquiera |
|---|---|---|---|---|
| `private` | ✅ | ❌ | ❌ | ❌ |
| *(sin modificador)* | ✅ | ✅ | ❌ | ❌ |
| `protected` | ✅ | ✅ | ✅ | ❌ |
| `public` | ✅ | ✅ | ✅ | ✅ |

> tip: Regla de diseño: **atributos `private`; métodos `public`** solo los que forman la interfaz del objeto; `protected` para lo que las subclases realmente necesiten. Expón **comportamiento**, oculta **datos**.

## 6. Encapsular no es solo "poner private"

Encapsular bien implica **diseñar la interfaz**: qué operaciones ofrece el objeto y qué reglas garantiza. Una clase con atributos `private` pero con getters/setters que exponen todo sin validar está **encapsulada solo en apariencia**.

> info: Beneficios concretos: (1) las invariantes están protegidas; (2) puedes **cambiar la implementación interna** sin afectar a quien usa la clase (bajo acoplamiento); (3) el código es más fácil de depurar (el estado solo cambia por caminos controlados).

## 7. Errores comunes

- Declarar atributos `public` "por comodidad".
- Getters/setters que exponen y modifican todo **sin validar** (encapsulamiento aparente).
- Confundir encapsulamiento (proteger el estado) con abstracción (decidir qué modelar).
- Poner `private` a métodos que forman parte de la interfaz que otros necesitan.

## Autoevaluación

```quiz
Q: ¿Qué es el encapsulamiento?
* Ocultar el estado interno y exponer una interfaz pública controlada
- Hacer todos los atributos públicos
- Eliminar los métodos de la clase
E: Encapsular protege el estado y lo expone solo mediante métodos controlados.

Q: ¿Qué es una invariante de clase?
* Una condición que siempre debe cumplirse para que el objeto sea válido
- Un atributo que nunca se usa
- Un método sin cuerpo
E: La invariante (ej. saldo>=0) es la regla que el encapsulamiento protege.

Q: ¿Por qué es riesgoso un atributo public?
* Cualquier parte del programa puede dejar el objeto en estado inválido
- Ocupa más memoria
- No compila
E: public expone el estado y permite violar las invariantes sin control.

Q: Con private, ¿desde dónde se puede acceder a un atributo?
* Solo desde la misma clase
- Desde cualquier clase
- Desde el mismo paquete
E: private limita el acceso al interior de la clase.

Q: Una clase con atributos private pero setters que asignan todo sin validar está...
* Encapsulada solo en apariencia (no protege sus invariantes)
- Perfectamente encapsulada
- Sin encapsular en absoluto
E: Encapsular bien exige controlar/validar en la interfaz, no solo poner private.

Q: ¿Qué beneficio de diseño da el encapsulamiento?
* Permite cambiar la implementación interna sin afectar a quien usa la clase
- Hace el programa más rápido siempre
- Elimina la necesidad de métodos
E: Al ocultar el interior, se puede cambiar sin romper el código cliente (bajo acoplamiento).
```

## Actividad de la semana (formativa)

Opcional y no evaluable. Versión ampliada con rúbrica en **optional-activity** (entrega por GitHub).

- Toma una clase con atributos `public` y una invariante clara (ej. `Termostato` con `temperatura` entre 15 y 30). Encapsúlala y demuestra, con casos de prueba, que ya no se puede violar la invariante.
