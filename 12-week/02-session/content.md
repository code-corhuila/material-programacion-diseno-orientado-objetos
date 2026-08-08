---
course: Programación y Diseño Orientado a Objetos
program: Ingeniería de Sistemas
term: 2026-B
week: 12
session: 2
corte: 3
unit: Unidad 3 · Robustez y bibliotecas
topic: Conjuntos y mapas (Set, HashMap)
eyebrow: Unidad 3 · Bibliotecas · Corte 3
lead: Cuando necesitas elementos únicos usas un Set; cuando necesitas buscar datos por una clave —un producto por su código, un usuario por su cédula— usas un Map. HashMap ofrece búsqueda casi instantánea y conecta directamente con el contrato equals/hashCode que estudiamos en el Corte 1.
objectives:
  - Usar Set para colecciones sin duplicados.
  - Usar Map/HashMap con pares clave-valor.
  - Recorrer un mapa y aplicar sus operaciones básicas.
  - Relacionar el buen funcionamiento del hash con equals/hashCode.
---

## 1. Set: elementos únicos

> info: **Set.** Colección que **no admite duplicados**. `HashSet` no garantiza orden (búsqueda O(1) promedio); `TreeSet` mantiene los elementos **ordenados** (O(log n)).

```java
// tab: HashSet
Set<String> etiquetas = new HashSet<>();
etiquetas.add("java"); etiquetas.add("poo"); etiquetas.add("java");  // duplicado ignorado
System.out.println(etiquetas.size());   // 2
```

> warn: Para que un `HashSet`/`HashMap` de **objetos propios** funcione (no duplique lo "igual"), la clase debe tener `equals` y `hashCode` coherentes (Corte 1, S4). Sin ellos, dos objetos con los mismos datos se consideran distintos.

## 2. Map: clave → valor

> info: **Map.** Estructura de pares **clave → valor**, con claves **únicas**. Ideal para buscar por un identificador. `Map` **no** es una `Collection`, pero pertenece al framework.

```java
// tab: HashMap
import java.util.HashMap;
import java.util.Map;

Map<String, Integer> edades = new HashMap<>();
edades.put("Ana", 20);        // clave "Ana" -> valor 20
edades.put("Luis", 31);
System.out.println(edades.get("Ana"));   // 20
```

## 3. Operaciones y costo

| Operación | Método | HashMap |
|---|---|---|
| Insertar/actualizar | `put(k, v)` | O(1) promedio |
| Obtener | `get(k)` | O(1) promedio |
| ¿Existe la clave? | `containsKey(k)` | O(1) promedio |
| Eliminar | `remove(k)` | O(1) promedio |
| Recorrer | `entrySet()` | O(n) |

> info: La búsqueda por clave en O(1) **promedio** es la gran ventaja del `HashMap` frente a recorrer una `List` (O(n)). Depende de un buen `hashCode`.

## 4. Recorrer un mapa

```java
// tab: entrySet
for (Map.Entry<String, Integer> e : edades.entrySet()) {
    System.out.println(e.getKey() + " -> " + e.getValue());
}
```

## 5. Mapas de objetos (caso típico)

```java
// tab: Inventario por código
Map<String, Producto> inventario = new HashMap<>();
inventario.put("P001", new Producto("Café", 12000));
Producto p = inventario.get("P001");        // búsqueda directa por código
if (inventario.containsKey("P999")) { /* ... */ }
```

> warn: `get(clave)` devuelve `null` si la clave no existe. Verifica con `containsKey` o usa `getOrDefault(clave, valorPorDefecto)`.

## 6. Elegir la colección adecuada

| Necesitas… | Usa |
|---|---|
| Secuencia ordenada, con duplicados, acceso por índice | `List` (ArrayList) |
| Elementos únicos, sin orden importante | `HashSet` |
| Elementos únicos y ordenados | `TreeSet` |
| Buscar por una clave | `HashMap` |
| Buscar por clave y mantener orden de claves | `TreeMap` |

> tip: Esta elección es una aplicación directa de "elegir según la operación dominante" (idea transversal): si buscas mucho por identificador → `Map`; si importa el orden y el índice → `List`.

## Autoevaluación

```quiz
Q: ¿Qué caracteriza a un Set?
* No admite elementos duplicados
- Guarda pares clave-valor
- Siempre mantiene el orden de inserción
E: Set no duplica; HashSet no ordena y TreeSet sí ordena.

Q: ¿Qué almacena un Map?
* Pares clave-valor, con claves únicas
- Solo valores en secuencia
- Solo claves ordenadas
E: El Map asocia cada clave única a un valor.

Q: ¿Cuál es la ventaja de HashMap para buscar por clave?
* Búsqueda en O(1) promedio
- Mantiene todo ordenado siempre
- Usa menos memoria que todo lo demás
E: HashMap busca por clave en tiempo casi constante.

Q: Para que un HashSet de objetos propios no duplique lo "igual", la clase debe...
* Tener equals y hashCode coherentes
- Ser abstracta
- No tener constructores
E: El hash depende de equals/hashCode; sin ellos, objetos iguales se ven distintos.

Q: get(clave) cuando la clave no existe devuelve...
* null (conviene verificar o usar getOrDefault)
- 0
- una excepción
E: Devuelve null; usa containsKey o getOrDefault para evitar sorpresas.

Q: Si la operación dominante es "buscar por identificador", conviene...
* Un Map (HashMap)
- Una List recorrida secuencialmente
- Un arreglo fijo
E: El Map da búsqueda O(1) por clave, ideal para buscar por identificador.
```

## Actividad de la semana (formativa)

Opcional y no evaluable. Versión ampliada con rúbrica en **optional-activity** (entrega por GitHub).

- Crea un `Map<String, Estudiante>` (código → estudiante), agrega varios, busca uno por código y recorre el mapa; explica por qué un `Map` supera a una `List` para esta búsqueda.
