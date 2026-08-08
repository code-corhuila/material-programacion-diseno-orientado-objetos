---
course: Programación y Diseño Orientado a Objetos
program: Ingeniería de Sistemas
term: 2026-B
week: 5
session: 2
corte: 1
unit: Unidad 1 · Fundamentos de la POO
topic: Práctica guiada tipo parcial
eyebrow: Unidad 1 · Cierre de Corte 1
lead: Segunda sesión del cierre: resolvemos juntos un ejercicio con el formato del parcial, para que llegues con la técnica clara y confianza.
objectives:
  - Resolver un ejercicio integrador con el formato del parcial.
  - Aplicar encapsulamiento, constructores y validación en un caso.
  - Autoevaluar la preparación.
---

## 1. Ejercicio guiado

**Enunciado:** modela una clase `CuentaBancaria` encapsulada, con constructor, consignar/retirar validados y `toString()`.

**Paso 1 — atributos y constructor:**

```java
// tab: Paso 1
public class CuentaBancaria {
    private String titular;
    private double saldo;
    public CuentaBancaria(String titular) {
        this.titular = titular;
        this.saldo = 0;
    }
}
```

**Paso 2 — operaciones con validación:**

```java
// tab: Paso 2
public void consignar(double m) { if (m > 0) saldo += m; }
public boolean retirar(double m) {
    if (m > 0 && m <= saldo) { saldo -= m; return true; }
    return false;
}
public double getSaldo() { return saldo; }
```

**Paso 3 — representación:**

```java
// tab: Paso 3
@Override public String toString() {
    return titular + " -> saldo: " + saldo;
}
```

## 2. Lista de verificación del ejercicio

- [ ] Atributos privados.
- [ ] Constructor que inicializa el estado.
- [ ] Validación en consignar y retirar.
- [ ] `toString()` legible.
- [ ] Casos de prueba (válidos e inválidos).

## 3. Recomendaciones para el parcial

- Lee el enunciado y **identifica la clase, sus atributos y su comportamiento** antes de codificar.
- Encapsula desde el inicio; valida en los métodos que cambian el estado.
- Prueba con casos límite (monto negativo, retiro mayor al saldo).

> tip: Un diseño limpio (privado + validado + toString) suele valer más puntos que muchas líneas sin estructura.

## Autoevaluación

```quiz
Q: En retirar(m), ¿qué condición evita dejar el saldo negativo?
* m > 0 && m <= saldo
- m > saldo
- m != 0
E: Solo se retira si el monto es positivo y no supera el saldo disponible.

Q: ¿Qué conviene hacer antes de codificar en el parcial?
* Identificar la clase, sus atributos y su comportamiento
- Escribir el main primero sin pensar
- Copiar código al azar
E: Diseñar primero (clase, estado, comportamiento) guía una solución limpia.

Q: ¿Qué caso límite deberías probar en una cuenta?
* Retirar más que el saldo
- Solo consignaciones válidas
- Nada, si compila basta
E: Los casos límite (retiro > saldo, monto negativo) validan la robustez.
```

## Actividad de la semana (formativa)

Opcional y no evaluable. Versión ampliada con rúbrica en **optional-activity** (entrega por GitHub).

- Resuelve el ejercicio de `CuentaBancaria` completo y agrega casos de prueba.
