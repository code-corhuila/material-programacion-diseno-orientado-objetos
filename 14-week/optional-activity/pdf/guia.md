# GUÍA DE ACTIVIDAD PRÁCTICA

**Programación y Diseño Orientado a Objetos · Semana 14 · Refactoriza aplicando buenas prácticas**

| Programa | Ingeniería de Sistemas | Asignatura | Programación y Diseño Orientado a Objetos |
|---|---|---|---|
| Unidad | Unidad 3 · Robustez y bibliotecas | Semana / Corte | 14 · Corte 3 |
| Modalidad | Individual o en parejas | Periodo | 2026-B |
| Tipo | Formativa (opcional, sin nota) | Entrega | Repositorio en GitHub |

## Objetivos

- Detectar code smells en un código dado.
- Aplicar extraer método, renombrar, introducir constante y polimorfismo.
- Verificar que el comportamiento no cambió.

## 1. Enunciado

1. Parte de un programa con **olores**: nombres pobres, números mágicos, un método largo y un `switch` por tipo (créalo o usa uno tuyo). Guarda su salida original.
2. Aplica al menos **cuatro** refactorizaciones:
   - Renombrar (nombres que comunican).
   - Introducir constante (eliminar números mágicos).
   - Extraer método (dividir el método largo).
   - Reemplazar el `switch` por **polimorfismo**.
3. Verifica que la **salida es idéntica** a la original (misma entrada → misma salida).
4. Documenta en el README el "antes y después" y qué olor corrigió cada refactor.

## 2. Requisitos

- Al menos 4 refactorizaciones aplicadas, incluida la de polimorfismo.
- Comportamiento preservado (evidencia: salida antes = después).
- README con el antes/después.

## 3. Cómo entregar (por GitHub)

Las entregas se realizan en **tu fork del repositorio de la clase**, dentro de la carpeta de esta semana. Si nunca has usado GitHub, sigue el **[Manual de Entrega por GitHub](https://code-corhuila.github.io/ova-web/manuales/Manual-Entrega-GitHub.pdf)** paso a paso.

1. Haz **fork** del repositorio de la clase (enlace dado por el docente) y **clónalo**.
2. Coloca tu entrega en la carpeta **`14-week/`** correspondiente a esta semana.
3. Sube los cambios: `git add .` · `git commit -m "Entrega semana 14"` · `git push` (abre un *Pull Request* si el docente lo pide).
4. Verifica que tienes tu **repo de perfil** con el bloque **CONFIG** (`FULL_NAME` + `GITHUB_USER`); sin él, tus entregas no se detectan.

## 4. Rúbrica de evaluación

| Criterio | Excelente (100%) | Aceptable (60%) | Por mejorar (0%) | Pts |
|---|---|---|---|---|
| Refactorizaciones (4+, incl. polimorfismo) | Aplicadas y correctas | 2–3 | Ninguna | 40 |
| Comportamiento preservado | Idéntico (evidenciado) | Con detalles | Cambió | 25 |
| Explicación antes/después | Clara por cada olor | Básica | Ausente | 20 |
| README y repositorio | Ordenado | Aceptable | Deficiente | 15 |

> Nota: actividad formativa y opcional (sin nota en Moodle). La guía unificada para entregar todas las actividades opcionales, válida para todas las materias, estará en el Manual de Entrega de Actividades Opcionales (próximamente).

