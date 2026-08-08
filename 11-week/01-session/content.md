---
course: Programación y Diseño Orientado a Objetos
program: Ingeniería de Sistemas
term: 2026-B
week: 11
session: 1
corte: 3
unit: Unidad 3 · Robustez y bibliotecas
topic: Manejo de excepciones — try/catch
eyebrow: Unidad 3 · Robustez · Corte 3
lead: Los programas fallan: un archivo que no existe, un número mal escrito, una división por cero. Las excepciones son el mecanismo de Java para detectar y manejar esos errores sin que el programa se caiga abruptamente.
objectives:
  - Explicar qué es una excepción.
  - Manejar errores con try/catch.
  - Distinguir excepciones verificadas de no verificadas.
---

## 1. ¿Qué es una excepción?

Una **excepción** es un evento que interrumpe el flujo normal del programa cuando ocurre un error. Si no se maneja, el programa **termina** mostrando un mensaje de error (stack trace).

```java
// tab: Error no manejado
int[] a = {1, 2, 3};
System.out.println(a[5]);   // ArrayIndexOutOfBoundsException -> el programa se cae
```

> info: Excepciones comunes: `NullPointerException`, `ArrayIndexOutOfBoundsException`, `ArithmeticException` (división por cero), `NumberFormatException`.

## 2. try/catch

El bloque **try** contiene el código que **puede fallar**; **catch** captura y maneja la excepción.

```java
// tab: try/catch
try {
    int r = 10 / 0;                 // lanza ArithmeticException
    System.out.println(r);
} catch (ArithmeticException e) {
    System.out.println("No se puede dividir por cero.");
}
System.out.println("El programa continúa.");   // no se cae
```

## 3. Múltiples catch

Puedes manejar distintos tipos de error por separado:

```java
// tab: Varios catch
try {
    int n = Integer.parseInt(texto);   // NumberFormatException
    System.out.println(100 / n);       // ArithmeticException
} catch (NumberFormatException e) {
    System.out.println("Eso no es un número.");
} catch (ArithmeticException e) {
    System.out.println("No dividas por cero.");
}
```

## 4. Verificadas vs no verificadas

| Tipo | Ejemplos | ¿Obliga a manejarla? |
|---|---|---|
| **Verificadas** (checked) | `IOException`, `FileNotFoundException` | Sí (try/catch o throws) |
| **No verificadas** (unchecked) | `NullPointerException`, `ArithmeticException` | No, pero conviene |

> warn: Capturar y no hacer nada (`catch (Exception e) {}`) oculta errores y complica depurar. Al menos registra o informa el problema.

## Autoevaluación

```quiz
Q: ¿Qué es una excepción?
* Un evento que interrumpe el flujo por un error
- Un tipo de bucle
- Una clase abstracta
E: La excepción señala un error en ejecución; si no se maneja, termina el programa.

Q: ¿Qué bloque contiene el código que puede fallar?
* try
- catch
- finally
E: try contiene el código riesgoso; catch maneja la excepción.

Q: ¿Cuál es una excepción verificada (checked)?
* IOException
- NullPointerException
- ArithmeticException
E: IOException es verificada (obliga a manejarla); las otras son unchecked.
```

## Actividad de la semana (formativa)

Opcional y no evaluable. Versión ampliada con rúbrica en **optional-activity** (entrega por GitHub).

- Escribe un programa que pida un número y maneje con try/catch la entrada no numérica y la división por cero.
