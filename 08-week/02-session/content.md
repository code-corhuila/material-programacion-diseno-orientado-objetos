---
course: Programación y Diseño Orientado a Objetos
program: Ingeniería de Sistemas
term: 2026-B
week: 8
session: 2
corte: 2
unit: Unidad 2 · Herencia y polimorfismo
topic: Interfaces en Java
eyebrow: Unidad 2 · Abstracción · Corte 2
lead: Las interfaces definen un contrato: qué debe saber hacer una clase, sin decir cómo. Permiten que clases no relacionadas compartan un mismo comportamiento y son clave en el diseño flexible.
objectives:
  - Declarar una interfaz y sus métodos.
  - Implementar interfaces con implements.
  - Distinguir interfaz de clase abstracta.
---

## 1. La interfaz como contrato

Una **interfaz** define **qué** métodos debe tener una clase, sin implementarlos. Es un contrato: "quien firme esto, debe saber hacer estas cosas".

```java
// tab: Interfaz
public interface Reproducible {
    void reproducir();   // sin cuerpo (contrato)
    void detener();
}
```

## 2. implements

Una clase se compromete a cumplir el contrato con **implements**, e implementa todos sus métodos.

```java
// tab: implements
public class Cancion implements Reproducible {
    @Override public void reproducir() { System.out.println("Sonando..."); }
    @Override public void detener()    { System.out.println("Detenida."); }
}
```

> info: Una clase puede **implementar varias interfaces** (`implements A, B, C`), pero solo puede **heredar de una** clase. Las interfaces resuelven la falta de herencia múltiple.

## 3. Polimorfismo por interfaz

Puedes usar la interfaz como tipo, igual que una superclase:

```java
// tab: Polimorfismo con interfaz
Reproducible r = new Cancion();
r.reproducir();
// Video, Podcast... también podrían implementar Reproducible
```

Clases **sin relación de herencia** (una `Cancion` y un `Video`) pueden compartir comportamiento vía la misma interfaz.

## 4. Interfaz vs clase abstracta

| | Interfaz | Clase abstracta |
|---|---|---|
| Se une con | `implements` | `extends` |
| ¿Cuántas a la vez? | Varias | Solo una |
| Estado (atributos) | Constantes | Atributos normales |
| Cuándo usar | Definir un contrato entre clases dispares | Compartir código + contrato en una familia |

> tip: Regla práctica: usa **interfaz** para "puede-hacer" (capacidad: Comparable, Reproducible); usa **clase abstracta** para "es-un" con código compartido.

## Autoevaluación

```quiz
Q: ¿Qué define una interfaz?
* Un contrato: qué métodos debe implementar la clase
- La implementación completa de los métodos
- Los atributos privados de una clase
E: La interfaz declara el contrato (qué), no el cómo.

Q: ¿Con qué palabra clave una clase cumple una interfaz?
* implements
- extends
- super
E: Las interfaces se cumplen con implements; las clases se heredan con extends.

Q: ¿Cuántas interfaces puede implementar una clase?
* Varias
- Solo una
- Ninguna
E: Una clase implementa varias interfaces (pero hereda de una sola clase).
```

## Actividad de la semana (formativa)

Opcional y no evaluable. Versión ampliada con rúbrica en **optional-activity** (entrega por GitHub).

- Define la interfaz `Reproducible` e impleméntala en `Cancion` y `Video`.
