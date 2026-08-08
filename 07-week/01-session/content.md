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
lead: La sobrescritura permite que una subclase redefina un método heredado para especializarlo. Es un mecanismo con reglas precisas —firma idéntica, visibilidad no reducida, anotación @Override— y es la base técnica que hace posible el polimorfismo de la siguiente sesión. Distinguirla de la sobrecarga es una de las claves conceptuales del corte.
objectives:
  - Sobrescribir un método heredado respetando sus reglas.
  - Diferenciar con precisión sobrescritura (override) de sobrecarga (overload).
  - Usar @Override y super.metodo() correctamente.
  - Reconocer cuándo impedir la sobrescritura con final.
---

## 1. Definición

> info: **Sobrescritura (override).** Redefinición, en una **subclase**, de un método heredado de la superclase, **con la misma firma**, para cambiar o especializar su comportamiento. Es la base del polimorfismo (S2).

```java
// tab: Override
public class Animal {
    public String sonido() { return "sonido genérico"; }
}
public class Perro extends Animal {
    @Override public String sonido() { return "Guau"; }   // redefine
}
public class Gato extends Animal {
    @Override public String sonido() { return "Miau"; }
}
```

## 2. Reglas de la sobrescritura

| Regla | Detalle |
|---|---|
| **Misma firma** | Igual nombre y **mismos parámetros** que el método del padre |
| **Tipo de retorno** | Igual, o un subtipo (retorno covariante) |
| **Visibilidad** | No puede **reducirse** (si el padre es `public`, la hija no puede hacerlo `private`) |
| **Excepciones** | No puede lanzar excepciones verificadas más amplias que el padre |

> warn: Si cambias los **parámetros** creyendo que sobrescribes, en realidad **sobrecargas** (creas un método nuevo) y el del padre sigue vigente. Este error silencioso es justo lo que `@Override` detecta.

## 3. @Override: red de seguridad

`@Override` es una anotación que pide al compilador **verificar** que el método realmente sobrescribe uno heredado. Si la firma no coincide, **falla la compilación** en vez de crear un método distinto por accidente.

```java
// tab: @Override protege
public class Perro extends Animal {
    @Override public String Sonido() { return "Guau"; }  // ERROR: 'Sonido' != 'sonido'
}
```

> tip: Usa **siempre** `@Override` al sobrescribir. Es documentación + verificación gratis.

## 4. Override vs Overload (no confundir)

| | Sobrescritura (override) | Sobrecarga (overload) |
|---|---|---|
| Dónde | Entre **superclase y subclase** | En la **misma** clase |
| Firma | **Misma** | **Distinta** (parámetros) |
| Se resuelve | En **ejecución** (tipo real del objeto) | En **compilación** (tipos de argumentos) |
| Propósito | Especializar comportamiento heredado | Ofrecer variantes de un método |

```java
// tab: Overload (misma clase)
int sumar(int a, int b) { return a + b; }
double sumar(double a, double b) { return a + b; }   // sobrecarga: distinta firma
```

## 5. Reutilizar con super.metodo()

La subclase puede **ampliar** (no reemplazar del todo) el comportamiento del padre invocándolo con `super.metodo()`.

```java
// tab: Ampliar
public class Empleado { public String ficha() { return "Empleado"; } }
public class Gerente extends Empleado {
    @Override public String ficha() { return super.ficha() + " | Gerente"; }
}
```

## 6. Impedir la sobrescritura: final

Un método `final` **no** puede sobrescribirse. Se usa para proteger comportamiento crítico o invariantes que las subclases no deben alterar.

```java
// tab: final
public class Cuenta {
    public final double getSaldo() { /* ... */ return 0; }  // las subclases no lo redefinen
}
```

## 7. Errores comunes

- Cambiar la firma y creer que se sobrescribe (en realidad se sobrecarga) → usar `@Override`.
- Reducir la visibilidad del método sobrescrito (no compila).
- Olvidar `super.metodo()` cuando se quiere **ampliar** en vez de reemplazar.
- Sobrescribir un método `final` (no compila).

## Autoevaluación

```quiz
Q: ¿Qué es sobrescribir un método?
* Redefinirlo en la subclase con la MISMA firma para especializarlo
- Crear otro con distintos parámetros en la misma clase
- Borrar el método del padre
E: Override = redefinir en la subclase con la misma firma (base del polimorfismo).

Q: ¿Para qué sirve @Override?
* Que el compilador verifique que realmente sobrescribes (evita errores de firma)
- Ejecutar el método más rápido
- Hacerlo privado
E: @Override valida la firma; si no coincide, falla la compilación.

Q: Override vs overload: la sobrecarga...
* Ocurre en la misma clase, con distinta lista de parámetros, y se resuelve en compilación
- Ocurre en la subclase con la misma firma y se resuelve en ejecución
- Es sinónimo de override
E: Overload = misma clase, distinta firma, resuelto en compilación.

Q: ¿Puede la subclase reducir la visibilidad de un método sobrescrito?
* No: no puede ser más restrictiva que la del padre
- Sí, siempre
- Solo si es static
E: La visibilidad no puede reducirse al sobrescribir (rompería la sustitución).

Q: ¿Qué hace super.ficha() dentro de un ficha() sobrescrito?
* Ejecuta la versión del padre para reutilizarla/ampliarla
- Crea un objeto de la superclase
- Llama al constructor
E: super.metodo() invoca la implementación de la superclase.

Q: ¿Qué implica declarar un método como final?
* No puede ser sobrescrito por las subclases
- No puede ser llamado
- Se ejecuta en compilación
E: final impide la sobrescritura del método.
```

## Actividad de la semana (formativa)

Opcional y no evaluable. Versión ampliada con rúbrica en **optional-activity** (entrega por GitHub).

- Crea `Animal` con `sonido()` y tres subclases que lo **sobrescriban** con `@Override`; añade una que **amplíe** una `descripcion()` con `super.metodo()`.
