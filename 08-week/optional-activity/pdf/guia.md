# GUÍA DE ACTIVIDAD PRÁCTICA

**Programación y Diseño Orientado a Objetos · Semana 8 · Abstracción con clases abstractas e interfaces**

| Programa | Ingeniería de Sistemas | Asignatura | Programación y Diseño Orientado a Objetos |
|---|---|---|---|
| Unidad | Unidad 2 · Herencia y polimorfismo | Semana / Corte | 8 · Corte 2 |
| Modalidad | Individual o en parejas | Periodo | 2026-B |
| Tipo | Formativa (opcional, sin nota) | Entrega | Repositorio en GitHub |

## Objetivos

- Definir una clase abstracta con método abstracto y método concreto.
- Definir e implementar una interfaz (capacidad).
- Usar polimorfismo por superclase y por interfaz en el mismo programa.

## 1. Enunciado

1. Clase abstracta `Figura` con `area()` **abstracto** y `describir()` **concreto** que use `area()`.
2. Subclases `Circulo`, `Rectangulo`, `Triangulo` que implementen `area()`.
3. Interfaz `Dibujable` con `dibujar()`, implementada por las tres figuras.
4. En `Main`:
   - Recorre un `Figura[]` mostrando `describir()` (polimorfismo por **superclase**).
   - Recorre un `Dibujable[]` invocando `dibujar()` (polimorfismo por **interfaz**).
5. Verifica que `new Figura()` **no compila** (coméntalo y explica por qué).

## 2. Requisitos

- Clase abstracta con método abstracto implementado en subclases.
- Interfaz implementada por las figuras.
- Uso polimórfico por superclase **y** por interfaz.
- Explicación de por qué no se puede instanciar la abstracta.

## 3. Cómo entregar (por GitHub)

Las entregas se realizan en **tu fork del repositorio de la clase**, dentro de la carpeta de esta semana. Si nunca has usado GitHub, sigue el **[Manual de Entrega por GitHub](https://code-corhuila.github.io/ova-web/manuales/Manual-Entrega-GitHub.pdf)** paso a paso.

1. Haz **fork** del repositorio de la clase (enlace dado por el docente) y **clónalo**.
2. Coloca tu entrega en la carpeta **`08-week/`** correspondiente a esta semana.
3. Sube los cambios: `git add .` · `git commit -m "Entrega semana 08"` · `git push` (abre un *Pull Request* si el docente lo pide).
4. Verifica que tienes tu **repo de perfil** con el bloque **CONFIG** (`FULL_NAME` + `GITHUB_USER`); sin él, tus entregas no se detectan.

## 4. Rúbrica de evaluación

| Criterio | Excelente (100%) | Aceptable (60%) | Por mejorar (0%) | Pts |
|---|---|---|---|---|
| Clase abstracta + método abstracto | Correcta | Con detalles | Falla | 25 |
| Interfaz + implements | Correcta | Con detalles | Falla | 25 |
| Polimorfismo (superclase e interfaz) | Ambos correctos | Uno | Ausente | 30 |
| README (abstracta vs interfaz + no-instanciable) | Claro | Básico | Ausente | 20 |

> Nota: actividad formativa y opcional (sin nota en Moodle). La guía unificada para entregar todas las actividades opcionales, válida para todas las materias, estará en el Manual de Entrega de Actividades Opcionales (próximamente).

