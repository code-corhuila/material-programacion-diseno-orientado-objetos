---
course: Programación y Diseño Orientado a Objetos
program: Ingeniería de Sistemas
term: 2026-B
week: 12
session: 1
corte: 3
unit: Unidad 3 · Robustez y bibliotecas
topic: Colecciones — List y ArrayList
eyebrow: Unidad 3 · Bibliotecas · Corte 3
lead: Los arreglos tienen tamaño fijo; en el mundo real casi siempre necesitamos colecciones que crezcan. El framework de colecciones de Java ofrece estructuras listas para usar, y la más común es ArrayList.
objectives:
  - Usar List y ArrayList para colecciones dinámicas.
  - Aplicar las operaciones básicas (add, get, remove, size).
  - Recorrer una lista con for-each.
---

## 1. Del arreglo a la colección

Un arreglo (`int[]`) tiene tamaño fijo. Una **List** crece y se encoge sola. Vive en `java.util`.

```java
// tab: Crear una lista
import java.util.ArrayList;
import java.util.List;

List<String> nombres = new ArrayList<>();
nombres.add("Ana");
nombres.add("Luis");
System.out.println(nombres.size());   // 2
```

> info: `List<String>` usa **genéricos**: entre `<>` indicas el tipo de elementos. Así la lista solo acepta `String` y evitas errores de tipo.

## 2. Operaciones básicas

| Operación | Qué hace |
|---|---|
| `add(x)` | Agrega al final |
| `get(i)` | Devuelve el elemento en la posición i |
| `set(i, x)` | Reemplaza el elemento en i |
| `remove(i)` | Elimina el elemento en i |
| `size()` | Cantidad de elementos |
| `contains(x)` | ¿está el elemento? |

```java
// tab: Usar la lista
nombres.set(0, "Ana María");
nombres.remove(1);
System.out.println(nombres.get(0));       // Ana María
System.out.println(nombres.contains("Luis")); // false
```

## 3. Recorrer con for-each

```java
// tab: for-each
for (String n : nombres) {
    System.out.println(n);
}
```

## 4. Listas de objetos

Las colecciones brillan con tus propias clases:

```java
// tab: Lista de objetos
List<Producto> carrito = new ArrayList<>();
carrito.add(new Producto("Café", 12000));
double total = 0;
for (Producto p : carrito) total += p.getPrecio();
```

> tip: Usa siempre el tipo de interfaz a la izquierda (`List<...> x = new ArrayList<>();`). Facilita cambiar la implementación después sin tocar el resto del código.

## Autoevaluación

```quiz
Q: ¿Qué ventaja tiene ArrayList sobre un arreglo?
* Crece y se encoge dinámicamente
- Acceso más rápido siempre
- No necesita import
E: La List es dinámica; el arreglo tiene tamaño fijo.

Q: ¿Para qué sirven los genéricos en List<String>?
* Indican el tipo de elementos y evitan errores de tipo
- Aceleran el programa
- Hacen la lista inmutable
E: Los genéricos fijan el tipo de elementos, dando seguridad de tipos.

Q: ¿Qué método devuelve la cantidad de elementos de una lista?
* size()
- length()
- count()
E: En colecciones se usa size(); length es de arreglos.
```

## Actividad de la semana (formativa)

Opcional y no evaluable. Versión ampliada con rúbrica en **optional-activity** (entrega por GitHub).

- Crea una `List<Producto>`, agrega varios, elimina uno y calcula el total.
