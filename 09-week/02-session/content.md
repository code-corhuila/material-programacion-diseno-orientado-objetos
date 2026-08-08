---
course: Programación y Diseño Orientado a Objetos
program: Ingeniería de Sistemas
term: 2026-B
week: 9
session: 2
corte: 2
unit: Unidad 2 · Herencia y polimorfismo
topic: Modularización — paquetes, cohesión y acoplamiento
eyebrow: Unidad 2 · Diseño · Corte 2
lead: Un proyecto real tiene decenas de clases. Organizarlas en paquetes y buscar alta cohesión con bajo acoplamiento es lo que mantiene el sistema entendible y fácil de cambiar. Son los criterios que separan un código que crece con orden de uno que se convierte en caos.
objectives:
  - Organizar clases en paquetes (package/import).
  - Definir cohesión y acoplamiento y evaluarlos.
  - Aplicar el principio de responsabilidad única.
  - Estructurar un proyecto en capas.
---

## 1. Paquetes (packages)

> info: **Paquete.** Espacio de nombres que agrupa clases relacionadas (como carpetas). Evita choques de nombres y ordena el proyecto. Se declara con `package` (primera línea) y se usa con `import`.

```java
// tab: package
package modelo;
public class Producto { /* ... */ }
```
```java
// tab: import
package app;
import modelo.Producto;
public class Main { /* usa Producto */ }
```

```ascii
src/
 ├── modelo/     -> Producto.java, Pedido.java        (datos del dominio)
 ├── servicio/   -> PedidoService.java                (lógica de negocio)
 └── app/        -> Main.java                          (punto de entrada)
```

## 2. Cohesión

> info: **Cohesión (alta = buena).** Grado en que los elementos de una clase/paquete están **enfocados en una sola responsabilidad** bien definida. Alta cohesión = la clase "hace una cosa y la hace bien".

- **Alta cohesión:** `PedidoService` solo gestiona pedidos.
- **Baja cohesión (mala):** una clase `Utils` que valida, imprime, guarda en archivo y calcula impuestos.

## 3. Acoplamiento

> info: **Acoplamiento (bajo = bueno).** Grado de **dependencia** entre clases/paquetes. Bajo acoplamiento = cambiar una clase **no obliga** a cambiar muchas otras.

| | Deseable | Señal de problema |
|---|---|---|
| Cohesión | **Alta** (una responsabilidad) | Clase que "hace de todo" |
| Acoplamiento | **Bajo** (pocas dependencias) | Cambiar una clase rompe varias |

> tip: Meta de diseño: **alta cohesión, bajo acoplamiento.** El encapsulamiento (S3) y las interfaces (S8) ayudan a **bajar el acoplamiento** (dependes del contrato, no de la implementación).

## 4. Responsabilidad única (SRP)

> info: **Principio de responsabilidad única.** Cada clase debe tener **una sola razón para cambiar**. Si una clase valida, calcula, imprime y persiste, tiene cuatro razones para cambiar: sepárala.

```ascii
Antes:  PedidoTodo  (valida + calcula + imprime + guarda)      <- baja cohesión
Después: Pedido (datos) · PedidoService (lógica) · PedidoReporte (salida) · PedidoRepo (persistencia)
```

## 5. Arquitectura en capas

Una organización común separa responsabilidades en **capas**:

- **modelo (dominio):** las entidades (`Producto`, `Pedido`).
- **servicio (lógica):** reglas de negocio (`PedidoService`).
- **app (presentación):** interacción/`Main`.

Las capas superiores dependen de las inferiores, no al revés → acoplamiento controlado y direccionado.

## 6. Errores comunes

- Clases "cajón de sastre" (`Utils`, `Helper`) con responsabilidades dispares (baja cohesión).
- Todo en un solo paquete/clase gigante.
- Dependencias cruzadas (A usa B y B usa A) → alto acoplamiento.
- Exponer detalles internos que aumentan el acoplamiento (rompe encapsulamiento).

## Autoevaluación

```quiz
Q: ¿Para qué sirve un paquete (package)?
* Agrupar clases relacionadas y evitar choques de nombres
- Ejecutar el programa más rápido
- Reemplazar a las clases
E: Los paquetes organizan clases relacionadas y separan espacios de nombres.

Q: ¿Qué es la cohesión?
* El grado en que una clase se enfoca en una sola responsabilidad
- La cantidad de dependencias entre clases
- El número de atributos
E: Alta cohesión = una responsabilidad clara por clase.

Q: ¿Qué busca un buen diseño modular?
* Alta cohesión y bajo acoplamiento
- Baja cohesión y alto acoplamiento
- Una sola clase gigante
E: Alta cohesión (foco) + bajo acoplamiento (pocas dependencias).

Q: El principio de responsabilidad única dice que una clase debe...
* Tener una sola razón para cambiar
- Contener todo el programa
- No tener métodos
E: SRP: cada clase con una única responsabilidad/razón de cambio.

Q: ¿Qué mecanismos ayudan a BAJAR el acoplamiento?
* Encapsulamiento e interfaces (depender del contrato, no de la implementación)
- Atributos públicos
- Herencia profunda
E: Ocultar detalles (encapsular) y programar contra interfaces reduce dependencias.

Q: Una clase Utils que valida, imprime, guarda y calcula impuestos tiene...
* Baja cohesión (múltiples responsabilidades)
- Alta cohesión
- Bajo acoplamiento garantizado
E: Mezclar responsabilidades dispares es baja cohesión; conviene separarla.
```

## Actividad de la semana (formativa)

Opcional y no evaluable. Versión ampliada con rúbrica en **optional-activity** (entrega por GitHub).

- Reorganiza un mini-proyecto en paquetes `modelo`, `servicio` y `app`, y explica en el README dónde mejoraste la cohesión y bajaste el acoplamiento.
