# GUÍA DE ACTIVIDAD PRÁCTICA

**Programación y Diseño Orientado a Objetos · Semana 11 · Programa robusto con manejo de excepciones**

| Programa | Ingeniería de Sistemas | Asignatura | Programación y Diseño Orientado a Objetos |
|---|---|---|---|
| Unidad | Unidad 3 · Robustez y bibliotecas | Semana / Corte | 11 · Corte 3 |
| Modalidad | Individual o en parejas | Periodo | 2026-B |
| Tipo | Formativa (opcional, sin nota) | Entrega | Repositorio en GitHub |

## Objetivos

- Manejar varios tipos de error con try/catch.
- Lanzar una excepción personalizada ante una regla violada.
- Usar finally o try-with-resources para la limpieza.

## 1. Enunciado

1. Crea `SaldoInsuficienteException extends RuntimeException`.
2. En una clase `Cuenta`, implementa `retirar(double)` que lance `IllegalArgumentException` si el monto ≤ 0 y `SaldoInsuficienteException` si supera el saldo.
3. En `Main`, pide montos al usuario en un bucle y maneja con try/catch: **entrada no numérica** (`NumberFormatException`) y **saldo insuficiente**.
4. Usa `finally` para imprimir **siempre** el saldo tras cada intento.
5. (Reto +) Registra las operaciones en un archivo con **try-with-resources**.

## 2. Requisitos

- Excepción personalizada creada y lanzada con mensaje útil.
- try/catch para al menos dos tipos de error, ordenados correctamente.
- `finally` (o try-with-resources) para limpieza/registro.
- Casos de prueba válidos e inválidos documentados.

## 3. Cómo entregar (por GitHub)

Las entregas se realizan en **tu fork del repositorio de la clase**, dentro de la carpeta de esta semana. Si nunca has usado GitHub, sigue el **[Manual de Entrega por GitHub](https://code-corhuila.github.io/ova-web/manuales/Manual-Entrega-GitHub.pdf)** paso a paso.

1. Haz **fork** del repositorio de la clase (enlace dado por el docente) y **clónalo**.
2. Coloca tu entrega en la carpeta **`11-week/`** correspondiente a esta semana.
3. Sube los cambios: `git add .` · `git commit -m "Entrega semana 11"` · `git push` (abre un *Pull Request* si el docente lo pide).
4. Verifica que tienes tu **repo de perfil** con el bloque **CONFIG** (`FULL_NAME` + `GITHUB_USER`); sin él, tus entregas no se detectan.

## 4. Rúbrica de evaluación

| Criterio | Excelente (100%) | Aceptable (60%) | Por mejorar (0%) | Pts |
|---|---|---|---|---|
| try/catch (2+ tipos, bien ordenados) | Correcto | Uno | Ausente | 30 |
| Excepción propia (throw + mensaje) | Correcta | Con detalles | Ausente | 30 |
| finally / try-with-resources | Correcto | Parcial | Ausente | 25 |
| Casos de prueba + README | Claros | Aceptables | Deficientes | 15 |

> Nota: actividad formativa y opcional (sin nota en Moodle). La guía unificada para entregar todas las actividades opcionales, válida para todas las materias, estará en el Manual de Entrega de Actividades Opcionales (próximamente).

