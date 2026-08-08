---
course: Programación y Diseño Orientado a Objetos
program: Ingeniería de Sistemas
term: 2026-B
week: 14
corte: 3
unit: Unidad 3 · Robustez y bibliotecas
topic: Refactoriza aplicando buenas prácticas
eyebrow: Actividad opcional · Formativa · Entrega por GitHub
lead: Toma código que funciona pero está desordenado y déjalo limpio aplicando buenas prácticas y refactorizaciones seguras, sin cambiar su comportamiento. Actividad opcional de refuerzo.
objectives:
  - Detectar code smells en un código dado.
  - Aplicar extraer método, renombrar, introducir constante y polimorfismo.
  - Verificar que el comportamiento no cambió.
---

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

## 3. Cómo entregar

Entrega **por GitHub**. Repositorio: `poo-s14-refactor`.

```
poo-s14-refactor/
  README.md   -> antes/despues + olores corregidos + evidencia de salida
  src/         -> version refactorizada
```

1. Crea el repositorio público con ese nombre.
2. Sube el código y el README.
3. Comparte el enlace por el canal indicado por el docente.

## 4. Rúbrica de evaluación

| Criterio | Excelente (100%) | Aceptable (60%) | Por mejorar (0%) | Pts |
|---|---|---|---|---|
| Refactorizaciones (4+, incl. polimorfismo) | Aplicadas y correctas | 2–3 | Ninguna | 40 |
| Comportamiento preservado | Idéntico (evidenciado) | Con detalles | Cambió | 25 |
| Explicación antes/después | Clara por cada olor | Básica | Ausente | 20 |
| README y repositorio | Ordenado | Aceptable | Deficiente | 15 |

> Nota: actividad formativa y opcional (sin nota en Moodle). La guía unificada para entregar todas las actividades opcionales, válida para todas las materias, estará en el Manual de Entrega de Actividades Opcionales (próximamente).

## Descargar

[⬇ Descargar la guía en PDF (membrete oficial CORHUILA)](pdf/Actividad-Semana14.pdf)
