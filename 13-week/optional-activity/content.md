---
course: Programación y Diseño Orientado a Objetos
program: Ingeniería de Sistemas
term: 2026-B
week: 13
corte: 3
unit: Unidad 3 · Robustez y bibliotecas
topic: Persistencia con archivos
eyebrow: Actividad opcional · Formativa · Entrega por GitHub
lead: Haz que tus datos sobrevivan al cierre del programa guardándolos en un archivo y recuperándolos. Actividad opcional de refuerzo.
objectives:
  - Escribir objetos en un archivo de texto (CSV).
  - Leer el archivo y reconstruir la información.
  - Manejar la IOException con try-with-resources.
---

## 1. Enunciado

1. Crea la clase `Contacto` (nombre, teléfono).
2. Guarda una lista de contactos en `contactos.csv` (una línea por contacto).
3. Lee el archivo y muestra los contactos en pantalla.
4. Maneja el caso de archivo inexistente con try/catch.

## 2. Requisitos

- Escritura y lectura de archivo.
- Uso de try-with-resources.
- Manejo de IOException.

## 3. Cómo entregar

Entrega **por GitHub**. Repositorio: `poo-s13-archivos`.

```
poo-s13-archivos/
  README.md   -> como ejecutar + ejemplo del CSV
  src/         -> Contacto.java, Main.java
```

1. Crea el repo público con ese nombre.
2. Sube el código y el README (incluye un `contactos.csv` de ejemplo).
3. Comparte el enlace por el canal indicado.

## 4. Rúbrica de evaluación

| Criterio | Excelente | Aceptable | Por mejorar | Pts |
|---|---|---|---|---|
| Escritura en archivo | Correcta | Con detalles | Falla | 30 |
| Lectura y reconstrucción | Correcta | Parcial | Falla | 30 |
| try-with-resources / IOException | Correcto | Parcial | Ausente | 25 |
| README y repositorio | Ordenado | Aceptable | Deficiente | 15 |

> Nota: actividad formativa y opcional (sin nota en Moodle). La guía unificada de entrega estará en el Manual de Entrega de Actividades Opcionales (próximamente).

## Descargar

[⬇ Descargar la guía en PDF (membrete oficial CORHUILA)](pdf/Actividad-Semana13.pdf)
