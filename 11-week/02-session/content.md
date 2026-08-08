---
course: Programación y Diseño Orientado a Objetos
program: Ingeniería de Sistemas
term: 2026-B
week: 11
session: 2
corte: 3
unit: Unidad 3 · Robustez y bibliotecas
topic: Lanzar, propagar y crear excepciones
eyebrow: Unidad 3 · Robustez · Corte 3
lead: Manejar errores es la mitad; la otra es lanzarlos cuando el objeto detecta que se viola una regla, propagarlos a quien deba resolverlos y liberar recursos pase lo que pase. Con throw, throws, finally y excepciones propias, tu código comunica y protege sus invariantes con precisión.
objectives:
  - Lanzar excepciones con throw y propagarlas con throws.
  - Garantizar liberación de recursos con finally y try-with-resources.
  - Crear excepciones personalizadas con significado de dominio.
  - Aplicar buenas prácticas de manejo de errores.
---

## 1. Lanzar con throw

Cuando se viola una regla del negocio, **lanza** una excepción con `throw`. Encaja con el encapsulamiento: el objeto defiende su invariante.

```java
// tab: throw
public void retirar(double monto) {
    if (monto <= 0)      throw new IllegalArgumentException("El monto debe ser positivo");
    if (monto > saldo)   throw new IllegalStateException("Fondos insuficientes");
    saldo -= monto;
}
```

## 2. Propagar con throws

Si un método **no** maneja una excepción **verificada**, la **declara** con `throws` para que la resuelva quien lo llame.

```java
// tab: throws
public void leer(String ruta) throws IOException {   // no la manejo aquí; la propago
    // ... operación que puede lanzar IOException
}
```

> info: `throw` (lanza una instancia) es distinto de `throws` (declara, en la firma, qué excepciones verificadas puede propagar el método).

## 3. finally: liberar siempre

El bloque **finally** se ejecuta **siempre** (haya o no excepción, e incluso con `return`). Es el lugar clásico para liberar recursos.

```java
// tab: finally
try {
    // usar un recurso
} catch (Exception e) {
    System.out.println("Error: " + e.getMessage());
} finally {
    System.out.println("Se ejecuta siempre (limpieza).");
}
```

## 4. try-with-resources

Para recursos que deben cerrarse (archivos, conexiones), **try-with-resources** los cierra **automáticamente** al terminar el bloque. Más seguro y limpio que `finally` manual.

```java
// tab: try-with-resources
try (BufferedReader br = new BufferedReader(new FileReader("datos.txt"))) {
    System.out.println(br.readLine());
} catch (IOException e) {
    System.out.println("No se pudo leer: " + e.getMessage());
}   // br.close() se llama solo, aunque haya excepción
```

## 5. Excepciones personalizadas

Crea tus propias excepciones extendiendo `Exception` (verificada) o `RuntimeException` (no verificada). Comunican mejor el error y permiten manejarlo de forma específica.

```java
// tab: Excepción propia
public class SaldoInsuficienteException extends RuntimeException {
    public SaldoInsuficienteException(String msg) { super(msg); }
}
// uso:
if (monto > saldo) throw new SaldoInsuficienteException("Saldo actual: " + saldo);
```

> tip: Nombra la excepción por el problema (`SaldoInsuficienteException`) y hereda de `RuntimeException` para reglas de programación, o de `Exception` cuando quieras **obligar** a manejarla.

## 6. Buenas prácticas

- **No te tragues** las excepciones (nada de `catch {}` vacío).
- Lanza el **tipo más específico** y con un **mensaje útil**.
- Libera recursos con **try-with-resources** (no dejes archivos/conexiones abiertos).
- No uses excepciones para el **flujo normal**; son para lo excepcional.
- Captura donde **puedas hacer algo** al respecto; si no, propaga.

## Autoevaluación

```quiz
Q: ¿Qué hace la palabra clave throw?
* Lanza una excepción explícitamente
- Declara en la firma qué excepciones se propagan
- Captura una excepción
E: throw lanza una instancia; throws la declara en la firma para propagarla.

Q: ¿Cuándo se ejecuta el bloque finally?
* Siempre, haya o no excepción
- Solo si hay excepción
- Solo si NO hay excepción
E: finally se ejecuta siempre; ideal para liberar recursos.

Q: ¿Qué ventaja da try-with-resources?
* Cierra automáticamente el recurso al terminar, incluso si hay excepción
- Hace el archivo más pequeño
- Evita importar clases
E: try-with-resources libera el recurso solo, sin close() manual.

Q: Para crear una excepción propia se extiende...
* Exception (verificada) o RuntimeException (no verificada)
- Object directamente
- Una interfaz
E: Las excepciones personalizadas heredan de Exception o RuntimeException.

Q: ¿Cuál es una buena práctica de manejo de errores?
* Lanzar el tipo específico con mensaje útil y capturar donde puedas actuar
- Capturar todo con catch vacío
- Usar excepciones para el flujo normal
E: Especificidad, mensajes claros y capturar donde se pueda resolver.

Q: ¿Diferencia entre throw y throws?
* throw lanza una instancia; throws declara en la firma las excepciones que se propagan
- Son sinónimos
- throws lanza y throw declara
E: throw = lanzar; throws = declarar en la firma.
```

## Actividad de la semana (formativa)

Opcional y no evaluable. Versión ampliada con rúbrica en **optional-activity** (entrega por GitHub).

- Crea `SaldoInsuficienteException` y lánzala en `retirar` de una `Cuenta`; maneja entrada inválida con try/catch y usa `finally` para imprimir el saldo final siempre.
