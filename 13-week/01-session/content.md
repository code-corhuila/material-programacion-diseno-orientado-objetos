---
course: Programación y Diseño Orientado a Objetos
program: Ingeniería de Sistemas
term: 2026-B
week: 13
session: 1
corte: 3
unit: Unidad 3 · Robustez y bibliotecas
topic: Lectura de archivos y flujos de E/S
eyebrow: Unidad 3 · Persistencia · Corte 3
lead: Hasta ahora los datos desaparecían al cerrar el programa. La persistencia en archivos permite conservarlos entre ejecuciones. Java modela la entrada/salida con flujos (streams); en esta sesión leemos archivos de texto de forma correcta y segura, manejando la IOException y cerrando siempre el recurso.
objectives:
  - Explicar la persistencia y el modelo de flujos de E/S.
  - Leer un archivo de texto línea por línea.
  - Manejar IOException y usar try-with-resources.
  - Conocer la API moderna Files (java.nio).
---

## 1. Persistencia y flujos

> info: La memoria del programa es **volátil**: al cerrarse, se pierde todo. Un **archivo** guarda los datos en disco (**persistencia**). Java modela la E/S con **flujos (streams)**: de **bytes** (`InputStream`/`OutputStream`, para binario) o de **caracteres** (`Reader`/`Writer`, para texto).

## 2. Leer texto con BufferedReader

`BufferedReader` lee texto de forma eficiente, línea por línea.

```java
// tab: Lectura clásica
import java.io.*;

BufferedReader br = new BufferedReader(new FileReader("datos.txt"));
String linea;
while ((linea = br.readLine()) != null) {   // null = fin de archivo
    System.out.println(linea);
}
br.close();   // hay que cerrarlo
```

> warn: Estas operaciones lanzan **`IOException`** (verificada): el compilador **obliga** a manejarla con try/catch o declararla con `throws`.

## 3. try-with-resources (recomendado)

Declara el recurso en el `try(...)` y Java lo **cierra automáticamente** al terminar, aunque ocurra una excepción. Evita fugas de recursos.

```java
// tab: try-with-resources
try (BufferedReader br = new BufferedReader(new FileReader("datos.txt"))) {
    String linea;
    while ((linea = br.readLine()) != null) {
        System.out.println(linea);
    }
} catch (FileNotFoundException e) {
    System.out.println("El archivo no existe.");
} catch (IOException e) {
    System.out.println("Error de lectura: " + e.getMessage());
}
```

> info: `FileNotFoundException` es subclase de `IOException`; por eso el `catch` específico va **antes** del general (Semana 11).

## 4. API moderna: java.nio.file.Files

Para archivos pequeños, `Files` es más cómoda y legible.

```java
// tab: Files.readAllLines
import java.nio.file.*;
import java.util.List;

List<String> lineas = Files.readAllLines(Path.of("datos.txt"));
for (String l : lineas) System.out.println(l);
```

## 5. Parsear al leer (de texto a objetos)

Al leer un CSV, se separa cada línea y se reconstruyen objetos:

```java
// tab: CSV -> objetos
for (String l : Files.readAllLines(Path.of("productos.csv"))) {
    String[] campos = l.split(",");                 // "Café,12000"
    Producto p = new Producto(campos[0], Double.parseDouble(campos[1]));
}
```

> warn: Al parsear, valida: líneas vacías, número de campos, y `NumberFormatException` en las conversiones. Un archivo real puede venir mal formado.

## 6. Errores comunes

- No manejar `IOException` (no compila si es verificada).
- Olvidar cerrar el recurso (usa **try-with-resources**).
- Asumir que el archivo existe (maneja `FileNotFoundException`).
- Parsear sin validar el formato de cada línea.

## Autoevaluación

```quiz
Q: ¿Qué ventaja da guardar datos en un archivo?
* La información persiste después de cerrar el programa
- El programa corre más rápido
- Evita usar clases
E: Los archivos dan persistencia; la memoria es volátil.

Q: ¿Qué excepción hay que manejar al leer archivos?
* IOException (verificada)
- NullPointerException
- ArithmeticException
E: Las operaciones de E/S lanzan IOException, que es verificada.

Q: ¿Qué ventaja tiene try-with-resources?
* Cierra el recurso automáticamente al terminar, incluso con excepción
- Hace el archivo más pequeño
- Evita importar clases
E: Cierra el recurso solo, evitando fugas.

Q: ¿Qué devuelve readLine() al llegar al final del archivo?
* null
- Una cadena vacía
- -1
E: readLine() devuelve null cuando ya no hay más líneas.

Q: FileNotFoundException respecto a IOException es...
* Una subclase (por eso su catch va antes del de IOException)
- Una superclase
- No relacionada
E: Es subclase de IOException; el catch específico va antes del general.

Q: Al parsear un CSV a objetos conviene...
* Validar líneas y capturar NumberFormatException en las conversiones
- Asumir que el formato siempre es correcto
- Ignorar los errores
E: Los archivos reales pueden venir mal formados; hay que validar.
```

## Actividad de la semana (formativa)

Opcional y no evaluable. Versión ampliada con rúbrica en **optional-activity** (entrega por GitHub).

- Lee un archivo `nombres.txt` y muestra cada línea numerada; maneja el caso "archivo no encontrado" con un mensaje claro (usa try-with-resources).
