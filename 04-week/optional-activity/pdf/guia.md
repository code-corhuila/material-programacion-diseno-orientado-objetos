# GUÍA DE ACTIVIDAD PRÁCTICA

**Programación y Diseño Orientado a Objetos · Semana 4 · Clase con constructores, toString e igualdad**

| Programa | Ingeniería de Sistemas | Asignatura | Programación y Diseño Orientado a Objetos |
|---|---|---|---|
| Unidad | Unidad 1 · Fundamentos de la POO | Semana / Corte | 4 · Corte 1 |
| Modalidad | Individual o en parejas | Periodo | 2026-B |
| Tipo | Formativa (opcional, sin nota) | Entrega | Repositorio en GitHub |

## Objetivos

- Definir constructores (por defecto y parametrizado) con this() y validación.
- Sobrescribir toString.
- Implementar equals y hashCode respetando su contrato.

## 1. Enunciado

1. Crea la clase `Producto` con atributos privados: `codigo` (solo lectura, `final`), `nombre`, `precio`, `stock`.
2. **Constructores:** uno completo (con validación `precio >= 0`, `stock >= 0`) y uno que reciba solo `codigo` y `nombre` y **delegue con `this()`** en el completo (precio y stock en 0).
3. `toString()` con `@Override` para una salida legible.
4. `equals`/`hashCode` **por `codigo`** (dos productos con el mismo código son "iguales").
5. En `Main`: crea productos, imprímelos, compara dos con el mismo código (`equals` → `true`) y agrégalos a un `HashSet<Producto>` para evidenciar que **no se duplican**.

## 2. Requisitos

- Encapsulamiento + `final` en `codigo`.
- `this()` entre constructores + validación.
- `equals` y `hashCode` coherentes (mismos campos), con `@Override`.
- Prueba con `HashSet`.

## 3. Cómo entregar (por GitHub)

Las entregas se realizan en **tu fork del repositorio de la clase**, dentro de la carpeta de esta semana. Si nunca has usado GitHub, sigue el **[Manual de Entrega por GitHub](https://code-corhuila.github.io/ova-web/manuales/Manual-Entrega-GitHub.pdf)** paso a paso.

1. Haz **fork** del repositorio de la clase (enlace dado por el docente) y **clónalo**.
2. Coloca tu entrega en la carpeta **`04-week/`** correspondiente a esta semana.
3. Sube los cambios: `git add .` · `git commit -m "Entrega semana 04"` · `git push` (abre un *Pull Request* si el docente lo pide).
4. Verifica que tienes tu **repo de perfil** con el bloque **CONFIG** (`FULL_NAME` + `GITHUB_USER`); sin él, tus entregas no se detectan.

## 4. Rúbrica de evaluación

| Criterio | Excelente (100%) | Aceptable (60%) | Por mejorar (0%) | Pts |
|---|---|---|---|---|
| Constructores (this() + validación) | Correctos | Con detalles | Fallan | 25 |
| Encapsulamiento + codigo final | Correcto | Parcial | Ausente | 20 |
| toString | Claro y con @Override | Con detalles | Ausente | 15 |
| equals + hashCode (contrato) | Coherentes y probados con HashSet | Uno o sin probar | Incorrectos | 30 |
| README y repositorio | Ordenado | Aceptable | Deficiente | 10 |

> Nota: actividad formativa y opcional (sin nota en Moodle). La guía unificada para entregar todas las actividades opcionales, válida para todas las materias, estará en el Manual de Entrega de Actividades Opcionales (próximamente).

