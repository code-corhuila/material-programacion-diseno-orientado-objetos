---
course: Programación y Diseño Orientado a Objetos
program: Ingeniería de Sistemas
term: 2026-B
week: 13
session: 1
corte: 3
unit: Unidad 3 · Robustez y bibliotecas
topic: Lectura de archivos en Java
eyebrow: Unidad 3 · Persistencia · Corte 3
lead: Hasta ahora los datos desaparecían al cerrar el programa. Leer y escribir archivos permite que la información persista. Empezamos por leer archivos de texto de forma segura.
objectives:
  - Leer un archivo de texto línea por línea.
  - Manejar la IOException que puede ocurrir.
  - Usar try-with-resources para cerrar el archivo automáticamente.
---

## 1. ¿Por qué archivos?

La memoria del programa es **volátil**: al cerrar, se pierde todo. Un **archivo** guarda los datos en disco para recuperarlos después. Es la forma más simple de **persistencia**.

## 2. Leer con BufferedReader

Una forma clásica y eficiente de leer texto línea por línea:

```java
// tab: Lectura clásica
import java.io.*;

BufferedReader br = new BufferedReader(new FileReader("datos.txt"));
String linea;
while ((linea = br.readLine()) != null) {
    System.out.println(linea);
}
br.close();   // ¡hay que cerrarlo!
```

> warn: Estas operaciones lanzan `IOException` (verificada): debes manejarla con try/catch o declararla con `throws`.

## 3. try-with-resources (recomendado)

Java cierra el archivo **automáticamente** si lo declaras en el `try(...)`. Más seguro y limpio:

```java
// tab: try-with-resources
try (BufferedReader br = new BufferedReader(new FileReader("datos.txt"))) {
    String linea;
    while ((linea = br.readLine()) != null) {
        System.out.println(linea);
    }
} catch (IOException e) {
    System.out.println("No se pudo leer el archivo: " + e.getMessage());
}
```

## 4. Alternativa moderna: Files

Para archivos pequeños, la API `java.nio.file` es muy cómoda:

```java
// tab: Files.readAllLines
import java.nio.file.*;
import java.util.List;

List<String> lineas = Files.readAllLines(Path.of("datos.txt"));
for (String l : lineas) System.out.println(l);
```

> tip: Usa `try-with-resources` siempre que abras un recurso (archivo, conexión). Te ahorra el `close()` manual y evita fugas de recursos aunque ocurra un error.

## Autoevaluación

```quiz
Q: ¿Qué ventaja da guardar datos en un archivo?
* La información persiste después de cerrar el programa
- El programa corre más rápido
- Se evita usar clases
E: Los archivos dan persistencia; la memoria es volátil.

Q: ¿Qué excepción hay que manejar al leer archivos?
* IOException (verificada)
- NullPointerException
- ArithmeticException
E: Las operaciones de E/S lanzan IOException, que es verificada.

Q: ¿Qué ventaja tiene try-with-resources?
* Cierra el recurso automáticamente al terminar
- Hace el archivo más pequeño
- Evita importar clases
E: try-with-resources cierra el recurso solo, aunque haya excepción.
```

## Actividad de la semana (formativa)

Opcional y no evaluable. Versión ampliada con rúbrica en **optional-activity** (entrega por GitHub).

- Lee un archivo `nombres.txt` y muestra cada línea numerada, manejando el caso "archivo no encontrado".
