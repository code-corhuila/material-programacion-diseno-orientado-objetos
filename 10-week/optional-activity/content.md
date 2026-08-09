---
course: Programación y Diseño Orientado a Objetos
program: Ingeniería de Sistemas
term: 2026-B
week: 10
corte: 2
unit: Unidad 2 · Herencia y polimorfismo
topic: Mini-sistema integrador del Corte 2
eyebrow: Actividad opcional · Repaso · Entrega por GitHub
lead: Demuestra que dominas el Corte 2 diseñando un mini-sistema que combine, justificadamente, herencia, abstracción, interfaces, polimorfismo y composición. Actividad opcional de preparación para el parcial.
objectives:
  - Integrar todos los mecanismos del Corte 2 en un diseño coherente.
  - Elegir cada mecanismo según la relación del problema.
  - Verificar el comportamiento polimórfico.
---

## 1. Enunciado

Diseña e implementa un mini-sistema de **medios reproducibles** (o un dominio equivalente):

1. Clase **abstracta** `Medio` con `duracion()` abstracto y algún método concreto común.
2. Subclases `Cancion` y `Video` que implementen `duracion()` (**herencia + sobrescritura**).
3. Interfaz `Reproducible` (`reproducir()`) implementada por ambas (**capacidad**).
4. Clase `Playlist` que **tenga** una lista de `Medio` (**composición**) y calcule `duracionTotal()` y `reproducirTodo()` (**polimorfismo**).
5. `Main` que arme una playlist con varios medios, la reproduzca e informe la duración total.

## 2. Requisitos

- Herencia + abstracción + interfaz + polimorfismo + composición, todos presentes y **justificados** en el README (qué relación motivó cada uno).
- Uso polimórfico real (recorrer `List<Medio>`).
- `@Override` donde corresponde.

## 3. Cómo entregar (por GitHub)

Las entregas se realizan en **tu fork del repositorio de la clase**, dentro de la carpeta de esta semana. Si nunca has usado GitHub, sigue el **[Manual de Entrega por GitHub](https://code-corhuila.github.io/ova-web/manuales/Manual-Entrega-GitHub.pdf)** paso a paso.

1. Haz **fork** del repositorio de la clase (enlace dado por el docente) y **clónalo**.
2. Coloca tu entrega en la carpeta **`10-week/`** correspondiente a esta semana.
3. Sube los cambios: `git add .` · `git commit -m "Entrega semana 10"` · `git push` (abre un *Pull Request* si el docente lo pide).
4. Verifica que tienes tu **repo de perfil** con el bloque **CONFIG** (`FULL_NAME` + `GITHUB_USER`); sin él, tus entregas no se detectan.

## 4. Rúbrica de evaluación

| Criterio | Excelente (100%) | Aceptable (60%) | Por mejorar (0%) | Pts |
|---|---|---|---|---|
| Herencia + abstracción | Correctas y justificadas | Con detalles | Fallan | 25 |
| Interfaz (capacidad) | Correcta | Parcial | Ausente | 15 |
| Composición (Playlist) | Correcta | Parcial | Falla | 25 |
| Polimorfismo (recorrido) | Correcto | Con detalles | Ausente | 20 |
| README (relaciones justificadas) | Claro y completo | Básico | Ausente | 15 |

> Nota: actividad formativa y opcional (sin nota en Moodle). La guía unificada para entregar todas las actividades opcionales, válida para todas las materias, estará en el Manual de Entrega de Actividades Opcionales (próximamente).

## Descargar

[⬇ Descargar la guía en PDF (membrete oficial CORHUILA)](pdf/Actividad-Semana10.pdf)
