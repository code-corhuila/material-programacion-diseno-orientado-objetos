---
course: Programación y Diseño Orientado a Objetos
program: Ingeniería de Sistemas
term: 2026-B
week: 16
session: 2
corte: 3
unit: Unidad 3 · Robustez y bibliotecas
topic: Repaso final y hacia dónde seguir
eyebrow: Unidad 3 · Cierre del curso
lead: Última sesión del curso. Consolidamos lo aprendido con un repaso final y trazamos el camino hacia adelante: qué temas continúan de forma natural la POO y cómo seguir creciendo como desarrollador orientado a objetos.
objectives:
  - Consolidar los conceptos clave del curso.
  - Identificar los próximos temas que amplían la POO.
  - Adoptar hábitos para seguir aprendiendo con autonomía.
---

## 1. Lo esencial en una página

- Una **clase** es un molde; un **objeto** es una instancia con **identidad** y **estado**.
- **Encapsular** = atributos privados + métodos que preservan **invariantes**.
- **Herencia** para *es-un*; **composición** para *tiene-un* (prefiere composición).
- **Polimorfismo** = el mismo mensaje se resuelve según el tipo real en ejecución.
- **Interfaces** = contratos; programa **contra la interfaz**, no la implementación.
- **Excepciones** para errores; **colecciones** para agrupar; **archivos** para persistir.
- **Código limpio + SOLID** = sistemas que se mantienen y crecen sin romperse.

## 2. Hacia dónde seguir

La POO es la base. Los siguientes pasos naturales:

| Tema | Qué aporta | Conecta con |
|---|---|---|
| **Estructuras de datos** | Eficiencia (listas, pilas, árboles, grafos) | Colecciones (S12) |
| **Patrones de diseño** | Soluciones probadas a problemas recurrentes | Polimorfismo, interfaces |
| **Pruebas automatizadas (JUnit)** | Verificar comportamiento y refactorizar seguro | Refactor (S14) |
| **Genéricos avanzados** | Reutilización con seguridad de tipos | Colecciones, interfaces |
| **Bases de datos + JDBC** | Persistencia real (más allá de archivos) | Repositorio (S13) |
| **Frameworks (Spring)** | Aplicaciones profesionales | Inversión de dependencias (S14) |

> info: Muchos de estos temas **son POO aplicada**. Los patrones de diseño, por ejemplo, se apoyan por completo en polimorfismo, interfaces y composición: lo que aprendiste es la llave.

## 3. Hábitos para seguir creciendo

- **Lee código** de otros (proyectos open source) y pregúntate por qué está diseñado así.
- **Escribe pruebas**: te obligan a diseñar clases con buenas interfaces.
- **Refactoriza** con frecuencia; no dejes que los olores se acumulen.
- **Practica** con proyectos pequeños y completos, de punta a punta.
- Cuando dudes entre herencia y composición, **empieza por composición**.

> tip: El mejor ejercicio ahora es tomar tu **proyecto final** y ampliarlo: agrégale pruebas con JUnit, cámbiale la persistencia a una base de datos, o refactorízalo aplicando un patrón. Cada mejora afianza lo aprendido.

## 4. Repaso rápido

- ¿Qué relación (es-un / tiene-un) usarías para "un pedido tiene varias líneas"?
- ¿Por qué `equals` y `hashCode` van juntos?
- ¿Cuándo `Map` en vez de `List`?
- ¿Qué olor corrige reemplazar un `switch` por polimorfismo?

## Autoevaluación final

```quiz
Q: "Un pedido tiene varias líneas de pedido" se modela con...
* Composición (tiene-un)
- Herencia (es-un)
- Una interfaz vacía
E: Contener otras instancias es composición (tiene-un).

Q: Programar "contra la interfaz" significa...
* Depender de la abstracción, no de una implementación concreta
- No usar interfaces
- Copiar el código de la clase
E: Se depende del contrato (interfaz) para poder intercambiar implementaciones.

Q: ¿Qué tema es la continuación natural de las colecciones?
* Estructuras de datos (listas, pilas, árboles, grafos)
- El color de la consola
- Nada, la POO termina aquí
E: Las estructuras de datos profundizan y optimizan lo visto en colecciones.

Q: ¿Qué te permite refactorizar con seguridad?
* Tener pruebas automatizadas que verifican el comportamiento
- No verificar nada
- Borrar el historial
E: Las pruebas confirman que el comportamiento no cambió tras el refactor.

Q: Ante la duda entre herencia y composición, conviene...
* Empezar por composición
- Usar siempre herencia
- Evitar ambas
E: La composición es más flexible y suele ser la mejor primera opción.

Q: Los patrones de diseño se apoyan sobre todo en...
* Polimorfismo, interfaces y composición (POO aplicada)
- Números mágicos
- Variables globales
E: Los patrones son POO aplicada; usan los pilares que ya dominas.
```

## Actividad de la semana

Cierra tu proyecto y define **un próximo paso concreto** para seguir mejorándolo (pruebas, base de datos o un patrón). Comparte tu plan.
