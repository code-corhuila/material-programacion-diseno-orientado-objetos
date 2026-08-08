---
course: Programación y Diseño Orientado a Objetos
program: Ingeniería de Sistemas
term: 2026-B
week: 9
session: 2
corte: 2
unit: Unidad 2 · Herencia y polimorfismo
topic: Modularización del código
eyebrow: Unidad 2 · Diseño · Corte 2
lead: Un proyecto real tiene decenas de clases. Organizarlas en paquetes y buscar alta cohesión con bajo acoplamiento es lo que mantiene el código entendible y fácil de cambiar.
objectives:
  - Organizar clases en paquetes (package/import).
  - Explicar cohesión y acoplamiento.
  - Aplicar responsabilidad única a las clases.
---

## 1. Paquetes (packages)

Un **paquete** agrupa clases relacionadas, como carpetas. Evita choques de nombres y ordena el proyecto.

```java
// tab: package e import
package modelo;                 // declara el paquete (1ra línea)
public class Producto { /* ... */ }
```
```java
// tab: usar otra clase
package app;
import modelo.Producto;         // importa la clase de otro paquete
public class Main { /* usa Producto */ }
```

```ascii
src/
 ├── modelo/    -> Producto.java, Pedido.java
 ├── servicio/  -> PedidoService.java
 └── app/       -> Main.java
```

## 2. Cohesión y acoplamiento

Dos medidas de un buen diseño modular:

- **Cohesión (alta = buena):** cada clase/paquete se ocupa de **una** cosa bien definida.
- **Acoplamiento (bajo = bueno):** las clases dependen **poco** unas de otras; cambiar una no obliga a cambiar muchas.

| | Deseable | Señal de problema |
|---|---|---|
| Cohesión | Alta (una responsabilidad) | Clase que "hace de todo" |
| Acoplamiento | Bajo (pocas dependencias) | Cambiar una clase rompe otras |

> tip: Meta de diseño: **alta cohesión, bajo acoplamiento**. Es la base de un código que crece sin volverse un caos.

## 3. Responsabilidad única

Cada clase debe tener **una sola razón para cambiar**. Si una clase valida, guarda en archivo y dibuja en pantalla, hace demasiado: sepárala.

```ascii
Antes:  PedidoTodo (valida + calcula + imprime + guarda)   <- baja cohesión
Después: Pedido (datos) · PedidoService (lógica) · PedidoReporte (salida)
```

> warn: Clases enormes que lo hacen todo son difíciles de probar y mantener. Divide por responsabilidades.

## Autoevaluación

```quiz
Q: ¿Para qué sirve un paquete (package)?
* Agrupar clases relacionadas y evitar choques de nombres
- Ejecutar el programa más rápido
- Reemplazar a las clases
E: Los paquetes organizan clases relacionadas, como carpetas.

Q: Un buen diseño modular busca...
* Alta cohesión y bajo acoplamiento
- Baja cohesión y alto acoplamiento
- Una sola clase gigante
E: Alta cohesión (una responsabilidad) + bajo acoplamiento (pocas dependencias).

Q: El principio de responsabilidad única dice que una clase debe...
* Tener una sola razón para cambiar
- Contener todo el programa
- No tener métodos
E: Cada clase se ocupa de una responsabilidad bien definida.
```

## Actividad de la semana (formativa)

Opcional y no evaluable. Versión ampliada con rúbrica en **optional-activity** (entrega por GitHub).

- Organiza un mini-proyecto en paquetes `modelo`, `servicio` y `app`.
