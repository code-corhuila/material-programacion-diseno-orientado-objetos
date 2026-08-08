# GUÍA DE ACTIVIDAD PRÁCTICA

**Programación y Diseño Orientado a Objetos · Semana 1 · Entorno Java, primer programa y modelado de objetos**

| Programa | Ingeniería de Sistemas | Asignatura | Programación y Diseño Orientado a Objetos |
|---|---|---|---|
| Unidad | Unidad 1 · Fundamentos de la POO | Semana / Corte | 1 · Corte 1 |
| Modalidad | Individual o en parejas | Periodo | 2026-B |
| Tipo | Formativa (opcional, sin nota) | Entrega | Repositorio en GitHub |

## Objetivos

- Verificar la instalación del JDK y compilar/ejecutar desde la terminal.
- Escribir una primera clase con estado y comportamiento.
- Modelar un dominio identificando clases, atributos y métodos.

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

## 3. Cómo entregar

Entrega **por GitHub**. Repositorio: `poo-s01-entorno`.

```
poo-s01-entorno/
  README.md   -> capturas (java -version, ejecucion) + analisis de modelado
  src/         -> HolaMundo.java, Estudiante.java, Main.java
```

1. Crea el repositorio público con ese nombre.
2. Sube el código y el README con capturas y el análisis.
3. Comparte el enlace por el canal indicado por el docente.

## 4. Rúbrica de evaluación

| Criterio | Excelente (100%) | Aceptable (60%) | Por mejorar (0%) | Pts |
|---|---|---|---|---|
| Entorno + ejecución en terminal | Verificado con capturas (javac/java) | Solo IDE | No demostrado | 25 |
| Clase Estudiante (estado + comportamiento) | Correcta y clara | Con detalles | Falla | 25 |
| Dos objetos con estado propio | Correcto y evidenciado | Parcial | Ausente | 20 |
| Modelado + justificación de abstracción | 3 clases bien modeladas y justificadas | Básico | Ausente | 20 |
| README y repositorio | Ordenado y claro | Aceptable | Deficiente | 10 |

> Nota: actividad formativa y opcional (sin nota en Moodle). La guía unificada para entregar todas las actividades opcionales, válida para todas las materias, estará en el Manual de Entrega de Actividades Opcionales (próximamente).

