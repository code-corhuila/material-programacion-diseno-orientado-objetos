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
lead: El proyecto final integra todo el curso: modelas un sistema real aplicando los cuatro pilares de la POO, con manejo de errores, colecciones y persistencia. Esta sesión define qué construir y cómo.
objectives:
  - Definir el alcance del proyecto final.
  - Aplicar los pilares de la POO en un sistema completo.
  - Organizar el proyecto con buenas prácticas.
---

## 1. Objetivo del proyecto

Construir una aplicación de consola en Java que resuelva un problema real de gestión, aplicando **de forma integrada** lo aprendido en el semestre.

> info: No se evalúa solo que funcione, sino el **diseño orientado a objetos**: clases bien encapsuladas, uso correcto de herencia/interfaces/composición y código limpio.

## 2. Requisitos mínimos

- **Encapsulamiento:** atributos privados + validación.
- **Herencia o interfaces + polimorfismo:** una jerarquía o contrato usado polimórficamente.
- **Composición:** una clase que contenga a otras.
- **Colecciones:** `List` o `Map` para gestionar los datos.
- **Manejo de excepciones:** entradas y errores controlados.
- **Persistencia:** guardar/leer datos en un archivo.
- **CRUD** completo sobre la entidad principal.

## 3. Temas sugeridos

- Sistema de biblioteca (libros, préstamos, usuarios).
- Gestión de inventario de una tienda.
- Agenda médica / turnos.
- Gestor de estudiantes y calificaciones.
- Reproductor con playlists.

## 4. Rúbrica del proyecto

| Criterio | Excelente | Aceptable | Por mejorar | Pts |
|---|---|---|---|---|
| Pilares de POO aplicados | Todos, correctos | La mayoría | Pocos | 30 |
| Colecciones + excepciones | Correctos | Con detalles | Fallan | 20 |
| Persistencia (archivos) | Funciona | Parcial | Ausente | 15 |
| CRUD funcional | Completo | Parcial | Incompleto | 20 |
| Código limpio + README | Ordenado y claro | Aceptable | Deficiente | 15 |

> tip: Empieza por el **diseño**: dibuja las clases y sus relaciones (es-un, tiene-un, puede-hacer) antes de programar. Ahorra tiempo y mejora la nota de diseño.

## Autoevaluación

```quiz
Q: ¿Qué se evalúa especialmente en el proyecto?
* El diseño orientado a objetos (no solo que funcione)
- La cantidad de líneas
- El color de la consola
E: El foco es aplicar bien los conceptos de POO, no solo que compile.

Q: ¿Cuál NO es un requisito mínimo del proyecto?
* Interfaz gráfica 3D
- Encapsulamiento
- Manejo de excepciones
E: Es una app de consola; los requisitos son de diseño POO, no gráficos 3D.

Q: ¿Por dónde conviene empezar?
* Por el diseño de clases y sus relaciones
- Escribiendo el main sin pensar
- Por el README al final
E: Diseñar primero (clases y relaciones) guía una implementación limpia.
```

## Actividad de la semana

Avanza tu proyecto final aplicando el diseño y los requisitos. Entrega por **GitHub** (ver optional-activity).
