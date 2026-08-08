---
course: Programación y Diseño Orientado a Objetos
program: Ingeniería de Sistemas
term: 2026-B
week: 12
session: 1
corte: 3
unit: Unidad 3 · Robustez y bibliotecas
topic: Colecciones — el framework y List
eyebrow: Unidad 3 · Bibliotecas · Corte 3
lead: Los arreglos tienen tamaño fijo; el mundo real necesita colecciones que crezcan. El Java Collections Framework ofrece estructuras probadas y reutilizables, unificadas por interfaces. Empezamos por List (y ArrayList), la colección más usada, con genéricos y un vistazo a su costo.
objectives:
  - Ubicar List dentro del Java Collections Framework.
  - Usar ArrayList con genéricos y sus operaciones básicas.
  - Comparar ArrayList y LinkedList a grandes rasgos.
  - Recorrer listas y trabajar con listas de objetos.
---

## 1. El Java Collections Framework

> info: El **Collections Framework** es un conjunto de **interfaces** (contratos) e **implementaciones** para manejar grupos de objetos. Las tres familias principales: **List** (secuencia ordenada, admite duplicados), **Set** (sin duplicados) y **Map** (pares clave–valor). Todo vive en `java.util`.

```ascii
Collection
 ├── List  (orden, duplicados)      -> ArrayList, LinkedList
 └── Set   (sin duplicados)         -> HashSet, TreeSet
Map  (clave -> valor)               -> HashMap, TreeMap     (Map no es Collection)
```

## 2. List y genéricos

Una **List** es una secuencia **ordenada** que admite **duplicados** y acceso por índice. Se declara con **genéricos** (`<Tipo>`) para fijar el tipo de elementos.

```java
// tab: Crear y llenar
import java.util.ArrayList;
import java.util.List;

List<String> nombres = new ArrayList<>();
nombres.add("Ana");
nombres.add("Luis");
System.out.println(nombres.size());   // 2
```

> info: **Genéricos.** `List<String>` significa "lista **de** String". El compilador impide agregar otro tipo y evita casteos manuales → **seguridad de tipos**. Sin genéricos (`List` a secas) todo sería `Object` y propenso a errores.

> tip: Declara con la **interfaz** a la izquierda: `List<...> x = new ArrayList<>();`. Así puedes cambiar la implementación (a `LinkedList`) sin tocar el resto del código (bajo acoplamiento).

## 3. Operaciones y costo

| Operación | Método | ArrayList |
|---|---|---|
| Acceder por índice | `get(i)` | O(1) |
| Agregar al final | `add(x)` | O(1) amortizado |
| Insertar/eliminar en medio | `add(i,x)`/`remove(i)` | O(n) |
| Buscar por valor | `contains(x)`/`indexOf` | O(n) |
| Tamaño | `size()` | O(1) |

## 4. ArrayList vs LinkedList

| | ArrayList | LinkedList |
|---|---|---|
| Estructura interna | Arreglo dinámico | Nodos enlazados |
| Acceso por índice | **O(1)** | O(n) |
| Insertar/eliminar en extremos | Final O(1) | Ambos extremos O(1) |
| Uso típico | El **predeterminado** | Muchas inserciones/eliminaciones en extremos |

> info: En la práctica, **ArrayList es el predeterminado**: el acceso por índice O(1) y la localidad de memoria lo hacen más rápido en la mayoría de casos.

## 5. Recorrer y listas de objetos

```java
// tab: for-each
for (String n : nombres) System.out.println(n);
```
```java
// tab: Lista de objetos
List<Producto> carrito = new ArrayList<>();
carrito.add(new Producto("Café", 12000));
double total = 0;
for (Producto p : carrito) total += p.getPrecio();   // delega en cada objeto
```

## 6. Errores comunes

- Usar `List` sin genéricos (pierde seguridad de tipos).
- Modificar la lista **mientras** se recorre con for-each (lanza `ConcurrentModificationException`); usa un `Iterator` o `removeIf`.
- Confundir `size()` (colecciones) con `length` (arreglos).
- Elegir `LinkedList` "porque sí" cuando `ArrayList` rinde mejor.

## Autoevaluación

```quiz
Q: ¿Qué caracteriza a una List?
* Secuencia ordenada que admite duplicados y acceso por índice
- No admite elementos repetidos
- Guarda pares clave-valor
E: List es ordenada y admite duplicados; Set no duplica; Map es clave-valor.

Q: ¿Para qué sirven los genéricos en List<String>?
* Fijan el tipo de elementos y dan seguridad de tipos en compilación
- Aceleran la ejecución
- Hacen la lista inmutable
E: Los genéricos evitan mezclar tipos y castear manualmente.

Q: ¿Cuál es el costo de get(i) en un ArrayList?
* O(1) (acceso directo por índice)
- O(n)
- O(log n)
E: ArrayList accede por índice en tiempo constante.

Q: ¿Por qué declarar List<...> x = new ArrayList<>() (interfaz a la izquierda)?
* Permite cambiar la implementación sin tocar el resto del código
- Es obligatorio en Java
- Hace la lista más grande
E: Programar contra la interfaz reduce el acoplamiento.

Q: Modificar una lista mientras se recorre con for-each puede lanzar...
* ConcurrentModificationException
- NullPointerException
- ArrayIndexOutOfBoundsException
E: Para eliminar durante el recorrido usa Iterator.remove() o removeIf().

Q: ¿Cuál es la implementación de List predeterminada en la práctica?
* ArrayList
- LinkedList
- Vector
E: ArrayList es el predeterminado por su acceso O(1) y buen rendimiento general.
```

## Actividad de la semana (formativa)

Opcional y no evaluable. Versión ampliada con rúbrica en **optional-activity** (entrega por GitHub).

- Crea una `List<Producto>`, agrega varios, elimina uno con `removeIf`, recórrela y calcula el total. Explica por qué usaste `ArrayList`.
