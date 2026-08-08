---
course: Programación y Diseño Orientado a Objetos
program: Ingeniería de Sistemas
term: 2026-B
week: 15
session: 2
corte: 3
unit: Unidad 3 · Robustez y bibliotecas
topic: Entrega incremental y sustentación del proyecto
eyebrow: Unidad 3 · Cierre de Corte 3
lead: Un buen proyecto también se entrega y se presenta bien. Aprenderás a construir el proyecto de forma incremental con Git —commits pequeños y claros— y a sustentarlo enfocándote en las decisiones de diseño, no en leer código.
objectives:
  - Organizar la entrega incremental con control de versiones.
  - Preparar una sustentación centrada en decisiones de diseño.
  - Autoevaluar el proyecto con la rúbrica antes de entregar.
---

## 1. Entrega incremental con Git

No entregues todo al final: avanza en **incrementos**, con commits **frecuentes y descriptivos**. El historial cuenta la evolución del proyecto y facilita volver atrás.

```ascii
commit 1  modelo base (clases + encapsulamiento)
commit 2  herencia/interfaces + polimorfismo
commit 3  colecciones + CRUD
commit 4  excepciones + persistencia (repositorio)
commit 5  limpieza (refactor) + README final
```

> tip: Mensajes de commit en **imperativo y específicos** ("Agrega persistencia de productos", no "cambios"). Un commit = una unidad lógica de trabajo.

## 2. Cómo sustentar (enfoque)

En pocos minutos, prioriza **decisiones**, no líneas de código:

- El **problema** y las **clases** que lo modelan.
- Las **relaciones** elegidas (es-un / tiene-un / puede-hacer) y **por qué**.
- Una **demo** breve del CRUD, el manejo de errores y la persistencia.
- Qué **aprendiste** y qué mejorarías.

> tip: "Usé una `Map` aquí porque la operación dominante es buscar por código" comunica dominio; leer métodos en voz alta, no.

## 3. Checklist previo a la entrega

- [ ] Pilares de POO aplicados (encapsulamiento, herencia/interfaces, polimorfismo, abstracción).
- [ ] Composición donde corresponde.
- [ ] Colecciones (`List`/`Map`) y excepciones (incl. una propia).
- [ ] Persistencia en archivo, separada en repositorio.
- [ ] CRUD completo y probado (casos límite).
- [ ] Código limpio (nombres, DRY, sin números mágicos).
- [ ] README con problema, diseño, instrucciones y capturas.
- [ ] Commits claros e incrementales.

## 4. Autoevaluación con la rúbrica

Antes de entregar, **califícate con la rúbrica** de la sesión anterior. Si un criterio está flojo, aún tienes tiempo de reforzarlo. Autoevaluar cierra la brecha entre "lo hice" y "cumple los criterios".

## Autoevaluación

```quiz
Q: ¿Cómo conviene entregar el proyecto?
* De forma incremental, con commits pequeños, claros y frecuentes
- Todo en un único commit al final
- Sin control de versiones
E: La entrega incremental refleja el avance y facilita revertir.

Q: Al sustentar, ¿en qué te enfocas?
* En las decisiones de diseño y una demo breve
- En leer todo el código en voz alta
- En el tamaño de la fuente
E: Se valora explicar decisiones y mostrar el sistema funcionando.

Q: Un buen mensaje de commit es...
* Específico y en imperativo ("Agrega persistencia de productos")
- "cambios" o "varios"
- El más largo posible
E: Mensajes específicos comunican qué cambió y por qué.

Q: ¿Qué conviene hacer antes de entregar?
* Autoevaluarse con la rúbrica y reforzar lo flojo
- Nada, entregar y ya
- Borrar el historial de commits
E: Autoevaluar con la rúbrica permite mejorar antes de la entrega final.

Q: "Usé un Map porque la operación dominante es buscar por código" es un ejemplo de...
* Justificar una decisión de diseño (lo esperado al sustentar)
- Un comentario irrelevante
- Un error
E: Explicar el porqué de las decisiones es el corazón de una buena sustentación.
```

## Actividad de la semana

Consolida el proyecto y prepárate para sustentar. Entrega por **GitHub** (ver optional-activity).
