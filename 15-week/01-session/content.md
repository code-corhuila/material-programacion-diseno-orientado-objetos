---
course: Programación y Diseño Orientado a Objetos
program: Ingeniería de Sistemas
term: 2026-B
week: 15
session: 1
corte: 3
unit: Unidad 3 · Robustez y bibliotecas
topic: Proyecto final — diseño e implementación
eyebrow: Unidad 3 · Cierre de Corte 3
lead: El proyecto final integra todo el semestre: modelas un sistema real aplicando los cuatro pilares de la POO, con colecciones, manejo de excepciones, persistencia y buenas prácticas. Esta sesión define el alcance, el método de diseño y los criterios de calidad con los que se evaluará.
objectives:
  - Definir el alcance y los requisitos del proyecto final.
  - Diseñar el sistema (clases y relaciones) antes de implementar.
  - Integrar todos los conceptos del curso en una arquitectura por capas.
---

## 1. Objetivo

Construir una **aplicación de consola en Java** que resuelva un problema real de gestión, aplicando **de forma integrada** lo aprendido. No se evalúa solo que funcione, sino la **calidad del diseño orientado a objetos**.

## 2. Requisitos mínimos (checklist)

- [ ] **Encapsulamiento** con invariantes (atributos privados + validación).
- [ ] **Herencia o interfaces + polimorfismo** (una jerarquía o contrato usado polimórficamente).
- [ ] **Composición** (una clase que contiene a otras).
- [ ] **Colecciones** (`List`/`Map`) para gestionar los datos.
- [ ] **Manejo de excepciones** (entradas y errores controlados; alguna excepción propia).
- [ ] **Persistencia** en archivo (guardar/cargar; separada en un repositorio).
- [ ] **CRUD** completo sobre la entidad principal.
- [ ] **Buenas prácticas** (nombres, DRY, métodos cortos, sin números mágicos).

## 3. Diseño primero (método)

Antes de programar, **diseña**:

1. Identifica las **entidades** (clases) y sus **relaciones** (es-un / tiene-un / puede-hacer).
2. Define atributos (con invariantes) y comportamiento de cada clase.
3. Elige las **colecciones** según la operación dominante.
4. Organiza en **capas/paquetes**.

```ascii
Arquitectura sugerida (por capas)
 modelo/     -> entidades del dominio (encapsuladas)
 servicio/   -> lógica de negocio (CRUD, reglas)
 persistencia/ -> repositorio (guardar/cargar archivo)
 app/        -> Main (interacción por consola)
```

## 4. Temas sugeridos

- Sistema de biblioteca (libros, usuarios, préstamos).
- Gestión de inventario de una tienda.
- Agenda médica / turnos.
- Gestor de estudiantes y calificaciones.
- Reproductor con playlists.

## 5. Rúbrica del proyecto

| Criterio | Excelente | Aceptable | Por mejorar | Pts |
|---|---|---|---|---|
| Pilares de POO aplicados | Todos, correctos y justificados | La mayoría | Pocos | 25 |
| Colecciones + excepciones | Correctos y pertinentes | Con detalles | Fallan | 20 |
| Persistencia (archivos, repositorio) | Funciona y está separada | Parcial | Ausente | 15 |
| CRUD funcional | Completo y probado | Parcial | Incompleto | 20 |
| Diseño (capas, cohesión/acoplamiento) | Claro y justificado | Aceptable | Débil | 10 |
| Código limpio + README | Ordenado y documentado | Aceptable | Deficiente | 10 |

> tip: Empieza por el **diagrama de clases y relaciones**. Un buen diseño hace la implementación más simple y suma en la mayoría de los criterios de la rúbrica.

## Autoevaluación

```quiz
Q: ¿Qué se evalúa especialmente en el proyecto?
* La calidad del diseño orientado a objetos, no solo que funcione
- La cantidad de líneas
- El color de la consola
E: El foco es aplicar bien los conceptos de POO con buen diseño.

Q: ¿Cuál NO es un requisito mínimo del proyecto?
* Interfaz gráfica 3D
- Manejo de excepciones
- Persistencia en archivo
E: Es una app de consola; los requisitos son de diseño POO, no gráficos.

Q: ¿Por dónde conviene empezar?
* Por el diseño: clases, relaciones y capas, antes de codificar
- Escribiendo el main sin diseñar
- Por el README al final
E: Diseñar primero guía una implementación limpia y ordenada.

Q: ¿Qué separa la capa de persistencia?
* La lógica de guardar/cargar archivos, aislada del modelo (repositorio)
- La interfaz gráfica
- Los comentarios
E: La persistencia va en un repositorio, no mezclada con las entidades.

Q: Elegir List o Map en el proyecto debe basarse en...
* La operación dominante (buscar por clave → Map; índice/orden → List)
- El azar
- Usar siempre List
E: La colección se elige según la operación más frecuente del sistema.
```

## Actividad de la semana

Avanza tu proyecto final aplicando el diseño y los requisitos. Entrega por **GitHub** (ver optional-activity).
