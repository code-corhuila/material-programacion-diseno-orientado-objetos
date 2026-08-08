---
course: Programación y Diseño Orientado a Objetos
program: Ingeniería de Sistemas
term: 2026-B
week: 12
session: 2
corte: 3
unit: Unidad 3 · Robustez y bibliotecas
topic: Mapas (HashMap) y genéricos
eyebrow: Unidad 3 · Bibliotecas · Corte 3
lead: Cuando necesitas buscar datos por una clave —un producto por su código, un usuario por su cédula— la estructura ideal es el mapa. HashMap ofrece búsqueda casi instantánea por clave.
objectives:
  - Usar Map y HashMap con pares clave-valor.
  - Aplicar put, get, containsKey y remove.
  - Recorrer un mapa y aprovechar los genéricos.
---

## 1. Clave → valor

Un **Map** guarda pares **clave → valor**. Cada clave es única y lleva a un valor. Ideal para buscar por identificador.

```java
// tab: Crear un mapa
import java.util.HashMap;
import java.util.Map;

Map<String, Integer> edades = new HashMap<>();
edades.put("Ana", 20);      // clave "Ana" -> valor 20
edades.put("Luis", 31);
System.out.println(edades.get("Ana"));   // 20
```

> info: La búsqueda por clave en un HashMap es en promedio **O(1)** (casi inmediata), mucho más rápida que recorrer una lista buscando.

## 2. Operaciones básicas

| Operación | Qué hace |
|---|---|
| `put(k, v)` | Inserta o actualiza la clave k con valor v |
| `get(k)` | Devuelve el valor de k (o null) |
| `containsKey(k)` | ¿existe la clave? |
| `remove(k)` | Elimina el par de la clave k |
| `size()` | Cantidad de pares |

## 3. Recorrer un mapa

```java
// tab: Recorrer
for (Map.Entry<String, Integer> e : edades.entrySet()) {
    System.out.println(e.getKey() + " -> " + e.getValue());
}
```

## 4. Mapas de objetos

```java
// tab: Inventario por código
Map<String, Producto> inventario = new HashMap<>();
inventario.put("P001", new Producto("Café", 12000));
Producto p = inventario.get("P001");   // búsqueda directa por código
```

> warn: `get(clave)` devuelve `null` si la clave no existe. Verifica con `containsKey` o comprueba `null` antes de usar el valor.

## Autoevaluación

```quiz
Q: ¿Qué almacena un Map?
* Pares clave-valor, con claves únicas
- Solo valores en orden
- Solo claves
E: El Map asocia cada clave única a un valor.

Q: ¿Cuál es la ventaja de un HashMap para buscar por clave?
* Búsqueda en promedio O(1)
- Mantiene todo ordenado
- Usa menos memoria que todo
E: El HashMap busca por clave en tiempo casi constante, O(1) en promedio.

Q: Si haces get(clave) y la clave no existe, obtienes...
* null
- 0
- una excepción
E: get devuelve null cuando la clave no está; conviene verificar.
```

## Actividad de la semana (formativa)

Opcional y no evaluable. Versión ampliada con rúbrica en **optional-activity** (entrega por GitHub).

- Crea un `Map<String, Producto>` (código→producto), agrega varios y busca uno por su código.
