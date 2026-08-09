---
course: Programación y Diseño Orientado a Objetos
program: Ingeniería de Sistemas
term: 2026-B
week: 1
corte: 1
unit: Unidad 1 · Fundamentos de la POO
topic: Entorno Java, primer programa y modelado de objetos
eyebrow: Actividad opcional · Formativa · Entrega por GitHub
lead: Deja tu entorno listo, ejecuta tu primer programa desde la terminal (no solo desde el IDE) y da el primer paso de modelado orientado a objetos. Actividad opcional para arrancar con bases firmes.
objectives:
  - Verificar la instalación del JDK y compilar/ejecutar desde la terminal.
  - Escribir una primera clase con estado y comportamiento.
  - Modelar un dominio identificando clases, atributos y métodos.
---

## 1. Enunciado

**Parte A — Entorno y ejecución (obligatoria).**

1. Instala el **JDK** y verifica en terminal: `java -version` y `javac -version`.
2. Crea `HolaMundo.java`, **compílalo con `javac`** y **ejecútalo con `java`** desde la terminal (adjunta captura).

**Parte B — Primer objeto.**

3. Crea una clase `Estudiante` con atributos (`nombre`, `programa`, `semestre`) y un método `presentarse()` que imprima una frase con esos datos.
4. En una clase `Main`, crea **dos** objetos `Estudiante` distintos y llama a `presentarse()` en cada uno (observa que comparten clase pero tienen estado propio).

**Parte C — Modelado (análisis).**

5. Elige un dominio real (tienda, clínica, transporte). En el README, identifica **3 clases** con sus atributos y métodos, y explica qué **abstrajiste** (qué dejaste fuera por irrelevante) en cada una.

## 2. Requisitos

- Ejecución desde **terminal** demostrada con captura (no solo IDE).
- Nombre de archivo = nombre de la clase pública.
- Dos objetos `Estudiante` con estados distintos.
- Análisis de modelado con justificación de la abstracción.

## 3. Cómo entregar (por GitHub)

Las entregas se realizan en **tu fork del repositorio de la clase**, dentro de la carpeta de esta semana. Si nunca has usado GitHub, sigue el **[Manual de Entrega por GitHub](https://code-corhuila.github.io/ova-web/manuales/Manual-Entrega-GitHub.pdf)** paso a paso.

1. Haz **fork** del repositorio de la clase (enlace dado por el docente) y **clónalo**.
2. Coloca tu entrega en la carpeta **`01-week/`** correspondiente a esta semana.
3. Sube los cambios: `git add .` · `git commit -m "Entrega semana 01"` · `git push` (abre un *Pull Request* si el docente lo pide).
4. Verifica que tienes tu **repo de perfil** con el bloque **CONFIG** (`FULL_NAME` + `GITHUB_USER`); sin él, tus entregas no se detectan.

## 4. Rúbrica de evaluación

| Criterio | Excelente (100%) | Aceptable (60%) | Por mejorar (0%) | Pts |
|---|---|---|---|---|
| Entorno + ejecución en terminal | Verificado con capturas (javac/java) | Solo IDE | No demostrado | 25 |
| Clase Estudiante (estado + comportamiento) | Correcta y clara | Con detalles | Falla | 25 |
| Dos objetos con estado propio | Correcto y evidenciado | Parcial | Ausente | 20 |
| Modelado + justificación de abstracción | 3 clases bien modeladas y justificadas | Básico | Ausente | 20 |
| README y repositorio | Ordenado y claro | Aceptable | Deficiente | 10 |

> Nota: actividad formativa y opcional (sin nota en Moodle). La guía unificada para entregar todas las actividades opcionales, válida para todas las materias, estará en el Manual de Entrega de Actividades Opcionales (próximamente).

## Descargar

[⬇ Descargar la guía en PDF (membrete oficial CORHUILA)](pdf/Actividad-Semana01.pdf)
