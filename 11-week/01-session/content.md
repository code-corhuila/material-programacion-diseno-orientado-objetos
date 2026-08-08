---
course: Programación y Diseño Orientado a Objetos
program: Ingeniería de Sistemas
term: 2026-B
week: 11
session: 1
corte: 3
unit: Unidad 3 · Robustez y bibliotecas
topic: Manejo de excepciones — try/catch y la jerarquía Throwable
eyebrow: Unidad 3 · Robustez · Corte 3
lead: Los programas robustos anticipan el error: un archivo que no existe, una entrada mal formada, una división por cero. En Java, esos eventos se modelan como excepciones —objetos de una jerarquía bien definida— y se manejan con try/catch para que el programa reaccione en vez de caerse. Esta sesión formaliza el modelo de excepciones.
objectives:
  - Explicar qué es una excepción y la jerarquía Throwable.
  - Distinguir excepciones verificadas de no verificadas.
  - Manejar errores con try/catch y múltiples catch.
  - Interpretar un stack trace.
---

## 1. ¿Qué es una excepción?

> info: **Excepción.** Objeto que representa un **evento anómalo** que interrumpe el flujo normal del programa. Cuando ocurre, se "lanza" (throw); si nadie la "captura" (catch), el programa **termina** mostrando un *stack trace*.

```java
// tab: Error no manejado
int[] a = {1, 2, 3};
System.out.println(a[5]);   // lanza ArrayIndexOutOfBoundsException -> el programa se cae
```

## 2. La jerarquía Throwable

Todas las excepciones descienden de **`Throwable`**:

```ascii
Throwable
 ├── Error            (fallos graves de la JVM: OutOfMemoryError… NO se manejan)
 └── Exception
      ├── (verificadas / checked)     IOException, SQLException…
      └── RuntimeException            (no verificadas / unchecked)
             ├── NullPointerException
             ├── ArrayIndexOutOfBoundsException
             ├── ArithmeticException
             └── NumberFormatException
```

> info: **Verificadas (checked):** el compilador **obliga** a manejarlas o declararlas (`throws`). **No verificadas (unchecked, RuntimeException):** no obliga, pues suelen ser errores de programación evitables. **Error:** fallos del entorno; no se capturan.

## 3. try / catch

El bloque **try** contiene el código que puede fallar; **catch** captura y maneja la excepción del tipo indicado.

```java
// tab: try/catch
try {
    int r = 10 / 0;                    // ArithmeticException
    System.out.println(r);
} catch (ArithmeticException e) {
    System.out.println("No se puede dividir por cero: " + e.getMessage());
}
System.out.println("El programa continúa.");   // no se cae
```

## 4. Múltiples catch y jerarquía

Puedes manejar distintos tipos por separado. **Ordena de específico a general**: un `catch` de una superclase captura también a sus subclases.

```java
// tab: Varios catch
try {
    int n = Integer.parseInt(texto);   // NumberFormatException
    System.out.println(100 / n);       // ArithmeticException
} catch (NumberFormatException e) {
    System.out.println("Eso no es un número.");
} catch (ArithmeticException e) {
    System.out.println("No dividas por cero.");
} catch (Exception e) {                // red general al final
    System.out.println("Error inesperado: " + e.getMessage());
}
```

> warn: Si pones `catch (Exception e)` **antes** que uno más específico, el específico queda **inalcanzable** y no compila. Del más específico al más general.

## 5. El stack trace

Cuando una excepción no se maneja, la JVM imprime el **stack trace**: el tipo de excepción, el mensaje y la **pila de llamadas** que llevó al error (archivo y línea). Es la primera pista para depurar: **léelo de arriba hacia abajo**.

```ascii
Exception in thread "main" java.lang.ArithmeticException: / by zero
    at Calculadora.dividir(Calculadora.java:12)   <- dónde ocurrió
    at Main.main(Main.java:5)                      <- quién lo llamó
```

## 6. Errores comunes

- **Tragarse** la excepción: `catch (Exception e) {}` vacío oculta el error y complica depurar.
- Capturar `Exception`/`Throwable` de forma demasiado amplia sin necesidad.
- Ordenar los `catch` de general a específico (no compila).
- Usar excepciones para el **flujo normal** (son para lo excepcional, no para un `if`).

## Autoevaluación

```quiz
Q: ¿Qué es una excepción?
* Un objeto que representa un evento anómalo que interrumpe el flujo normal
- Un tipo de bucle
- Una clase abstracta obligatoria
E: La excepción señala un error; si no se maneja, termina el programa.

Q: ¿Cuál es una excepción verificada (checked)?
* IOException
- NullPointerException
- ArithmeticException
E: IOException es verificada (obliga a manejarla); las otras son unchecked.

Q: ¿En qué orden deben ir los catch?
* De lo más específico a lo más general
- De lo más general a lo más específico
- El orden no importa
E: Un catch general antes de uno específico deja al específico inalcanzable (no compila).

Q: ¿Qué información da el stack trace?
* Tipo de excepción, mensaje y la pila de llamadas (archivo y línea)
- El uso de memoria total
- La versión de Java únicamente
E: El stack trace muestra qué ocurrió y la cadena de llamadas hasta el error.

Q: ¿Por qué es mala práctica un catch vacío?
* Se "traga" el error, lo oculta y dificulta la depuración
- Hace el programa más lento
- No compila
E: Capturar sin hacer nada esconde el problema; al menos registra o informa.

Q: Las RuntimeException (unchecked)...
* No obligan a manejarse; suelen indicar errores de programación evitables
- Obligan siempre a try/catch
- Son fallos de la JVM que no se capturan
E: Las unchecked no obligan a manejo; los Error sí son fallos del entorno no capturables.
```

## Actividad de la semana (formativa)

Opcional y no evaluable. Versión ampliada con rúbrica en **optional-activity** (entrega por GitHub).

- Escribe un programa que lea un número y maneje con try/catch la entrada no numérica (`NumberFormatException`) y la división por cero (`ArithmeticException`), mostrando mensajes claros y continuando la ejecución.
