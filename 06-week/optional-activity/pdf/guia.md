# GUÍA DE ACTIVIDAD PRÁCTICA

**Programación y Diseño Orientado a Objetos · Semana 6 · Jerarquía de clases con herencia y super**

| Programa | Ingeniería de Sistemas | Asignatura | Programación y Diseño Orientado a Objetos |
|---|---|---|---|
| Unidad | Unidad 2 · Herencia y polimorfismo | Semana / Corte | 6 · Corte 2 |
| Modalidad | Individual o en parejas | Periodo | 2026-B |
| Tipo | Formativa (opcional, sin nota) | Entrega | Repositorio en GitHub |

## Objetivos

- Justificar una jerarquía con el criterio de sustitución (es-un).
- Implementar la cadena de constructores con super(...).
- Ampliar comportamiento heredado con super.metodo().
- Verificar el orden de construcción con una traza.

## 1. Contexto

Una empresa gestiona empleados de distintos tipos. Todos comparten datos y comportamiento comunes, pero cada tipo añade lo suyo. Es un caso natural de **generalización–especialización**.

## 2. Enunciado

1. **Diseño (antes de codificar).** Define la superclase `Empleado` (atributos comunes: `nombre`, `salarioBase`; método `ficha()`) y **al menos dos** subclases: `Gerente` (agrega `bono`) y `Desarrollador` (agrega `lenguaje`). En el README, **justifica con el criterio es-un** por qué cada subclase hereda de `Empleado`.
2. **Constructores encadenados.** Cada subclase debe usar `super(...)` para inicializar la parte `Empleado`. Agrega un `System.out.println` en cada constructor para **trazar el orden** de construcción.
3. **Ampliar comportamiento.** Sobrescribe `ficha()` en cada subclase usando `super.ficha()` para reutilizar la información base y añadir la específica.
4. **Cálculo propio.** Agrega `salarioTotal()`: en `Gerente` suma el bono; en `Desarrollador` es el salario base.
5. **Prueba.** En `main`, crea un objeto de cada subclase, imprime su `ficha()` y su `salarioTotal()`, y muestra la traza del orden de construcción.

## 3. Requisitos técnicos

- Uso correcto de `extends` y `super(...)` (primera instrucción).
- Al menos un método que use `super.metodo()`.
- Atributos con el acceso adecuado (`protected`/`private` justificado).
- README con: diagrama de la jerarquía, justificación es-un y la traza de construcción obtenida.

## 4. Reto opcional (+)

- Agrega un tercer nivel (`GerenteRegional extends Gerente`) y observa/traza la cadena de tres constructores.
- Marca algún método como `final` y explica por qué no debería sobrescribirse.

## 3. Cómo entregar (por GitHub)

Las entregas se realizan en **tu fork del repositorio de la clase**, dentro de la carpeta de esta semana. Si nunca has usado GitHub, sigue el **[Manual de Entrega por GitHub](https://code-corhuila.github.io/ova-web/manuales/Manual-Entrega-GitHub.pdf)** paso a paso.

1. Haz **fork** del repositorio de la clase (enlace dado por el docente) y **clónalo**.
2. Coloca tu entrega en la carpeta **`06-week/`** correspondiente a esta semana.
3. Sube los cambios: `git add .` · `git commit -m "Entrega semana 06"` · `git push` (abre un *Pull Request* si el docente lo pide).
4. Verifica que tienes tu **repo de perfil** con el bloque **CONFIG** (`FULL_NAME` + `GITHUB_USER`); sin él, tus entregas no se detectan.

## 6. Rúbrica de evaluación

| Criterio | Excelente (100%) | Aceptable (60%) | Por mejorar (0%) | Pts |
|---|---|---|---|---|
| Diseño y justificación es-un | Jerarquía correcta y bien justificada por sustitución | Justificación básica | Sin justificar o relación incorrecta | 25 |
| Cadena de constructores (super) | Correcta en todas las subclases + traza | Con detalles | Falla o ausente | 25 |
| Ampliar con super.metodo() | ficha() reutiliza y amplía correctamente | Parcial | Ausente | 20 |
| salarioTotal() y pruebas | Correctos y probados | Parciales | Fallan | 15 |
| Calidad de código y README | Ordenado, diagrama y traza claros | Aceptable | Deficiente | 15 |

> Nota: actividad formativa y opcional (sin nota en Moodle). La guía unificada para entregar todas las actividades opcionales, válida para todas las materias, estará en el Manual de Entrega de Actividades Opcionales (próximamente).

