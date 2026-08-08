---
course: Programación y Diseño Orientado a Objetos
program: Ingeniería de Sistemas
term: 2026-B
week: 13
session: 2
corte: 3
unit: Unidad 3 · Robustez y bibliotecas
topic: Escritura de archivos en Java
eyebrow: Unidad 3 · Persistencia · Corte 3
lead: Leer es la mitad; ahora aprendemos a guardar datos en disco. Con la escritura de archivos podrás persistir los objetos de tu programa y recuperarlos después.
objectives:
  - Escribir texto en un archivo.
  - Diferenciar sobrescribir de agregar (append).
  - Persistir datos de objetos en un archivo.
---

## 1. Escribir con BufferedWriter

```java
// tab: Escritura básica
import java.io.*;

try (BufferedWriter bw = new BufferedWriter(new FileWriter("salida.txt"))) {
    bw.write("Primera línea");
    bw.newLine();
    bw.write("Segunda línea");
} catch (IOException e) {
    System.out.println("Error al escribir: " + e.getMessage());
}
```

> info: `new FileWriter("salida.txt")` **sobrescribe** el archivo. Para **agregar** al final sin borrar, usa `new FileWriter("salida.txt", true)`.

## 2. Sobrescribir vs agregar (append)

| Modo | Constructor | Efecto |
|---|---|---|
| Sobrescribir | `new FileWriter(ruta)` | Borra el contenido previo |
| Agregar | `new FileWriter(ruta, true)` | Añade al final |

## 3. Persistir objetos

Puedes guardar el estado de tus objetos convirtiéndolos a texto (por ejemplo, separado por comas):

```java
// tab: Guardar objetos
try (BufferedWriter bw = new BufferedWriter(new FileWriter("productos.csv"))) {
    for (Producto p : lista) {
        bw.write(p.getNombre() + "," + p.getPrecio());
        bw.newLine();
    }
}
```

## 4. Alternativa moderna: Files.write

```java
// tab: Files.write
import java.nio.file.*;
import java.util.List;

List<String> lineas = List.of("Ana,20", "Luis,31");
Files.write(Path.of("personas.csv"), lineas);
```

> warn: Escribir con `FileWriter(ruta)` sin `true` **borra** lo que había. Si querías conservar los datos, usa el modo append.

## Autoevaluación

```quiz
Q: ¿Qué hace new FileWriter("a.txt") (sin segundo parámetro)?
* Sobrescribe el archivo (borra lo previo)
- Agrega al final
- Da error si el archivo existe
E: Por defecto sobrescribe; para agregar se pasa true como segundo parámetro.

Q: ¿Cómo se agrega texto al final sin borrar?
* new FileWriter(ruta, true)
- new FileWriter(ruta)
- new FileReader(ruta)
E: El segundo parámetro true activa el modo append (agregar).

Q: ¿Qué formato simple es común para persistir objetos en texto?
* CSV (valores separados por comas)
- Imágenes PNG
- Bytecode
E: El CSV (texto separado por comas) es un formato simple y legible para datos.
```

## Actividad de la semana (formativa)

Opcional y no evaluable. Versión ampliada con rúbrica en **optional-activity** (entrega por GitHub).

- Guarda una lista de productos en `productos.csv` y luego léela para mostrarla.
