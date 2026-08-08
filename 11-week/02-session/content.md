---
course: Programación y Diseño Orientado a Objetos
program: Ingeniería de Sistemas
term: 2026-B
week: 11
session: 2
corte: 3
unit: Unidad 3 · Robustez y bibliotecas
topic: throw, finally y excepciones propias
eyebrow: Unidad 3 · Robustez · Corte 3
lead: Además de capturar errores, un buen diseño los lanza cuando algo viola sus reglas y libera recursos pase lo que pase. En esta sesión aprendes a lanzar, propagar y crear tus propias excepciones.
objectives:
  - Lanzar excepciones con throw y propagarlas con throws.
  - Usar finally para liberar recursos.
  - Crear excepciones personalizadas.
---

## 1. Lanzar con throw

Tú también puedes **lanzar** una excepción cuando se viola una regla del negocio:

```java
// tab: throw
public void retirar(double monto) {
    if (monto > saldo) {
        throw new IllegalArgumentException("Fondos insuficientes");
    }
    saldo -= monto;
}
```

## 2. Propagar con throws

Si un método no maneja una excepción verificada, la **declara** con `throws` para que la maneje quien lo llame:

```java
// tab: throws
public void leerArchivo(String ruta) throws IOException {
    // ... operación que puede lanzar IOException
}
```

## 3. finally

El bloque **finally** se ejecuta **siempre** (haya o no excepción). Ideal para liberar recursos (cerrar archivos, conexiones).

```java
// tab: finally
try {
    // usar un recurso
} catch (Exception e) {
    System.out.println("Error: " + e.getMessage());
} finally {
    System.out.println("Esto se ejecuta siempre.");   // limpieza
}
```

## 4. Excepciones personalizadas

Puedes crear tus propias excepciones extendiendo `Exception` (verificada) o `RuntimeException` (no verificada):

```java
// tab: Excepción propia
public class SaldoInsuficienteException extends RuntimeException {
    public SaldoInsuficienteException(String msg) { super(msg); }
}
// uso:
if (monto > saldo) throw new SaldoInsuficienteException("Saldo: " + saldo);
```

> tip: Una excepción propia con buen nombre (`SaldoInsuficienteException`) comunica el error mejor que un genérico y permite manejarlo específicamente.

## Autoevaluación

```quiz
Q: ¿Qué hace la palabra clave throw?
* Lanza una excepción explícitamente
- Captura una excepción
- Declara un método
E: throw lanza una excepción; throws la declara para propagarla.

Q: ¿Cuándo se ejecuta el bloque finally?
* Siempre, haya o no excepción
- Solo si hay excepción
- Solo si no hay excepción
E: finally se ejecuta siempre; sirve para liberar recursos.

Q: Para crear una excepción propia, se extiende...
* Exception o RuntimeException
- Object directamente
- Una interfaz
E: Las excepciones personalizadas heredan de Exception o RuntimeException.
```

## Actividad de la semana (formativa)

Opcional y no evaluable. Versión ampliada con rúbrica en **optional-activity** (entrega por GitHub).

- Crea `SaldoInsuficienteException` y lánzala en el método `retirar` de una cuenta.
