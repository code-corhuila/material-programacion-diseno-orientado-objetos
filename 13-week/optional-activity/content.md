---
course: Programación y Diseño Orientado a Objetos
program: Ingeniería de Sistemas
term: 2026-B
week: 13
corte: 3
unit: Unidad 3 · Robustez y bibliotecas
topic: Persistencia de objetos con archivos
eyebrow: Actividad opcional · Formativa · Entrega por GitHub
lead: Haz que tus datos sobrevivan al cierre del programa: guárdalos en un archivo y recupéralos (round-trip), separando la E/S en una clase repositorio. Actividad opcional de refuerzo.
objectives:
  - Escribir objetos en un archivo CSV y leerlos de vuelta.
  - Manejar la IOException con try-with-resources.
  - Separar la persistencia del modelo (responsabilidad única).
---

## 1. Enunciado

1. Crea la clase `Contacto` (nombre, teléfono).
2. Crea `ContactoRepositorio` con `guardar(List<Contacto>, ruta)` y `cargar(ruta)` (CSV), usando **try-with-resources** y manejando `IOException`.
3. En `Main`: crea contactos, **guárdalos**, luego **cárgalos** en una nueva lista y muéstralos (demuestra el round-trip).
4. Maneja el caso de archivo inexistente al cargar (mensaje claro, lista vacía).
5. (Reto +) Agrega un contacto nuevo en modo **append** sin reescribir todo el archivo.

## 2. Requisitos

- Escritura y lectura CSV con round-trip verificado.
- try-with-resources + manejo de IOException.
- Persistencia separada en `ContactoRepositorio` (no en `Contacto` ni en `Main`).

## 3. Cómo entregar (por GitHub)

Las entregas se realizan en **tu fork del repositorio de la clase**, dentro de la carpeta de esta semana. Si nunca has usado GitHub, sigue el **[Manual de Entrega por GitHub](https://code-corhuila.github.io/ova-web/manuales/Manual-Entrega-GitHub.pdf)** paso a paso.

1. Haz **fork** del repositorio de la clase (enlace dado por el docente) y **clónalo**.
2. Coloca tu entrega en la carpeta **`13-week/`** correspondiente a esta semana.
3. Sube los cambios: `git add .` · `git commit -m "Entrega semana 13"` · `git push` (abre un *Pull Request* si el docente lo pide).
4. Verifica que tienes tu **repo de perfil** con el bloque **CONFIG** (`FULL_NAME` + `GITHUB_USER`); sin él, tus entregas no se detectan.

## 4. Rúbrica de evaluación

| Criterio | Excelente (100%) | Aceptable (60%) | Por mejorar (0%) | Pts |
|---|---|---|---|---|
| Escritura CSV | Correcta | Con detalles | Falla | 25 |
| Lectura + round-trip | Reconstruye bien | Parcial | Falla | 25 |
| try-with-resources / IOException | Correcto | Parcial | Ausente | 20 |
| Separación (repositorio) + README | Clara y justificada | Aceptable | Deficiente | 30 |

> Nota: actividad formativa y opcional (sin nota en Moodle). La guía unificada para entregar todas las actividades opcionales, válida para todas las materias, estará en el Manual de Entrega de Actividades Opcionales (próximamente).

## Descargar

[⬇ Descargar la guía en PDF (membrete oficial CORHUILA)](pdf/Actividad-Semana13.pdf)
