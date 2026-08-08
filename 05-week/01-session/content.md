---
course: Programación y Diseño Orientado a Objetos
program: Ingeniería de Sistemas
term: 2026-B
week: 5
session: 1
corte: 1
unit: Unidad 1 · Fundamentos de la POO
topic: Síntesis integradora del Corte 1
eyebrow: Unidad 1 · Cierre de Corte 1
lead: Cerramos el primer corte integrando todo en una sola clase bien diseñada. Repasamos con rigor clases y objetos, encapsulamiento e invariantes, constructores y representación e igualdad, viendo cómo cada concepto se conecta con el siguiente hacia un diseño robusto.
objectives:
  - Integrar los conceptos del Corte 1 en una clase completa.
  - Relacionar encapsulamiento, invariantes, constructores e igualdad.
  - Diagnosticar y corregir errores típicos de diseño.
---

## 1. Mapa conceptual del Corte 1

```ascii
Clase (molde)  --new-->  Objeto (identidad + estado + comportamiento)
     |                         |
 encapsulamiento         constructor inicializa en estado VÁLIDO
 (private + invariantes)       |
     |                    toString (representar) + equals/hashCode (comparar)
     └──────────── todo protege las reglas del objeto ───────────┘
```

## 2. Repaso conectado

| Concepto | Idea clave | Semana |
|---|---|---|
| Clase / objeto | Molde vs. instancia (identidad, estado, comportamiento) | 1–2 |
| `this` | Referencia al objeto actual; resuelve ambigüedad | 2 |
| Referencias / aliasing | La variable guarda la dirección; `y=x` son alias | 2 |
| Encapsulamiento | `private` + interfaz controlada; protege **invariantes** | 3 |
| Constructores | Inicializan en estado válido; `this()`; validan | 4 |
| toString / equals / hashCode | Representar y comparar por contenido (con contrato) | 4 |

## 3. Clase modelo integradora

Reúne todo lo del corte en una clase bien diseñada:

```java
// tab: CuentaBancaria.java
import java.util.Objects;

public class CuentaBancaria {
    private final String numero;   // solo lectura (identidad de negocio)
    private double saldo;          // invariante: saldo >= 0

    public CuentaBancaria(String numero) { this(numero, 0); }
    public CuentaBancaria(String numero, double saldoInicial) {
        this.numero = numero;
        if (saldoInicial > 0) this.saldo = saldoInicial;   // valida
    }

    public double getSaldo() { return saldo; }
    public String getNumero() { return numero; }

    public void consignar(double m) { if (m > 0) saldo += m; }
    public boolean retirar(double m) {
        if (m > 0 && m <= saldo) { saldo -= m; return true; }
        return false;
    }
}
```
```java
// tab: Representación e igualdad
    @Override public String toString() {
        return "Cuenta{numero='" + numero + "', saldo=" + saldo + "}";
    }
    @Override public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        return Objects.equals(numero, ((CuentaBancaria) o).numero);  // igualdad por número
    }
    @Override public int hashCode() { return Objects.hash(numero); }
```

Observa cómo **cada pieza del corte** aparece: encapsulamiento (private), invariante (saldo≥0), constructores con `this()` y validación, solo-lectura (`final`), representación e igualdad por contenido.

## 4. Errores típicos (diagnóstico)

| Síntoma | Causa | Corrección |
|---|---|---|
| El atributo no cambia en el setter | Falta `this.` | `this.x = x;` |
| `new Clase()` no compila | Se definió solo el constructor parametrizado | Declarar también el vacío |
| Dos objetos "iguales" no lo son | No se sobrescribió `equals` | Implementar `equals` (+`hashCode`) |
| Objeto en estado inválido | Atributo `public` o setter sin validar | Encapsular + validar |
| Se pierden datos al "copiar" | Aliasing (`y = x`) | Crear `new` y copiar campos |

## Autoevaluación

```quiz
Q: ¿Qué protege el encapsulamiento en la clase modelo?
* La invariante saldo >= 0 (nadie puede dejarla negativa desde afuera)
- La velocidad del programa
- El nombre de la clase
E: Al ser saldo privado y modificarse solo por operaciones validadas, la invariante se garantiza.

Q: En la clase modelo, ¿por qué numero es final?
* Es la identidad de negocio: no debe cambiar tras crearse (solo lectura)
- Para que sea más rápido
- Para poder heredarlo
E: final lo hace de solo lectura; se fija en el constructor y no cambia.

Q: ¿Qué hace this(numero, 0) en el constructor de un argumento?
* Delega en el constructor completo para no duplicar inicialización
- Crea otra cuenta
- Llama a la superclase
E: this(...) encadena al otro constructor de la misma clase.

Q: Dos cuentas con el mismo número, ¿son equals?
* Sí, porque equals se definió por número
- No, nunca
- Solo si son el mismo objeto (==)
E: equals se sobrescribió por 'numero', así que igual número ⇒ equals true.

Q: El atributo no cambia dentro de setNombre(String nombre). ¿Causa probable?
* Falta this.: nombre = nombre se asigna a sí mismo
- La clase es abstracta
- Falta el main
E: Sin this., el parámetro se asigna a sí mismo; el atributo no cambia.
```

## Actividad de la semana (formativa)

Opcional y no evaluable. Versión ampliada con rúbrica en **optional-activity** (entrega por GitHub).

- Diseña una clase completa del dominio que prefieras que integre TODO el corte: encapsulamiento con invariante, dos constructores con `this()` y validación, un atributo `final` de solo lectura, y `toString`/`equals`/`hashCode`.
