---
course: Programación y Diseño Orientado a Objetos
program: Ingeniería de Sistemas
term: 2026-B
week: 13
session: 2
corte: 3
unit: Unidad 3 · Robustez y bibliotecas
topic: Escritura y persistencia de objetos
eyebrow: Unidad 3 · Persistencia · Corte 3
lead: Leer es la mitad; ahora guardamos datos en disco para recuperarlos después. Aprenderás a escribir texto, a distinguir sobrescribir de agregar, y a persistir el estado de tus objetos en un formato legible como CSV, cerrando el ciclo leer–escribir.
objectives:
  - Escribir texto en un archivo con BufferedWriter.
  - Diferenciar sobrescribir de agregar (append).
  - Persistir objetos a CSV y recuperarlos (round-trip).
  - Aplicar try-with-resources en la escritura.
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

## 2. Sobrescribir vs agregar (append)

| Modo | Constructor | Efecto |
|---|---|---|
| Sobrescribir | `new FileWriter(ruta)` | **Borra** el contenido previo |
| Agregar | `new FileWriter(ruta, true)` | **Añade** al final |

> warn: `new FileWriter("a.txt")` (sin `true`) **borra** lo que había. Si querías conservar los datos, pasa `true` como segundo argumento (modo append). Es un error de datos difícil de deshacer.

## 3. API moderna: Files.write

```java
// tab: Files.write
import java.nio.file.*;
import java.util.List;

List<String> lineas = List.of("Ana,20", "Luis,31");
Files.write(Path.of("personas.csv"), lineas);                       // sobrescribe
Files.write(Path.of("personas.csv"), List.of("Zoe,22"),
            StandardOpenOption.APPEND);                            // agrega
```

## 4. Persistir objetos (CSV) y round-trip

Guardar el estado de objetos convirtiéndolos a texto, y luego reconstruirlos al leer:

```java
// tab: Guardar objetos
try (BufferedWriter bw = new BufferedWriter(new FileWriter("productos.csv"))) {
    for (Producto p : lista) {
        bw.write(p.getNombre() + "," + p.getPrecio());
        bw.newLine();
    }
}
```
```java
// tab: Recuperar (round-trip)
List<Producto> recuperados = new ArrayList<>();
for (String l : Files.readAllLines(Path.of("productos.csv"))) {
    String[] c = l.split(",");
    recuperados.add(new Producto(c[0], Double.parseDouble(c[1])));
}
```

> info: **CSV** (valores separados por comas) es un formato simple, legible y portable para persistir datos tabulares. Para objetos complejos existen alternativas (serialización, JSON con librerías), fuera del alcance del curso.

## 5. Buena práctica: separar la persistencia

Aplica responsabilidad única (Semana 9): la lógica de leer/escribir archivos vive en una clase aparte (un "repositorio"), no mezclada con el modelo.

```ascii
Producto (modelo)  ·  ProductoRepositorio (guardar/cargar)  ·  Main (usa ambos)
```

## 6. Errores comunes

- Sobrescribir sin querer (olvidar el `true` del modo append).
- No cerrar el `Writer` (usa try-with-resources; si no, los datos pueden no vaciarse a disco).
- Mezclar la persistencia con el modelo (baja cohesión).
- No manejar `IOException`.

## Autoevaluación

```quiz
Q: ¿Qué hace new FileWriter("a.txt") sin segundo parámetro?
* Sobrescribe el archivo (borra lo previo)
- Agrega al final
- Da error si el archivo existe
E: Por defecto sobrescribe; para agregar se pasa true.

Q: ¿Cómo se agrega al final sin borrar?
* new FileWriter(ruta, true) o Files.write(..., StandardOpenOption.APPEND)
- new FileWriter(ruta)
- new FileReader(ruta)
E: El modo append conserva el contenido y añade al final.

Q: ¿Qué formato simple y legible se usa para persistir datos tabulares?
* CSV (valores separados por comas)
- Imágenes PNG
- Bytecode
E: El CSV es simple, legible y portable para datos tabulares.

Q: "Round-trip" de persistencia significa...
* Guardar objetos a archivo y luego reconstruirlos al leer
- Ejecutar el programa dos veces
- Borrar el archivo
E: Es el ciclo escribir → leer → reconstruir los objetos.

Q: ¿Por qué separar la persistencia en una clase repositorio?
* Responsabilidad única: no mezclar E/S con el modelo (mayor cohesión)
- Para que corra más rápido
- Es obligatorio en Java
E: Separar responsabilidades mejora la cohesión y el mantenimiento.

Q: Si no cierras el Writer (sin try-with-resources)...
* Los datos pueden no vaciarse a disco (buffer sin flush) y quedar recursos abiertos
- No pasa nada
- El archivo se duplica
E: Cerrar (o try-with-resources) asegura el flush y libera el recurso.
```

## Actividad de la semana (formativa)

Opcional y no evaluable. Versión ampliada con rúbrica en **optional-activity** (entrega por GitHub).

- Guarda una lista de productos en `productos.csv` y luego léela para reconstruir los objetos (round-trip). Separa la E/S en una clase `ProductoRepositorio`.
