═══════════════════════════════════════════════════════════════
  OVA - PROGRAMACIÓN ORIENTADA A OBJETOS
  Corporación Universitaria del Huila - CORHUILA
═══════════════════════════════════════════════════════════════

INFORMACIÓN GENERAL
-------------------
Materia:      Programación Orientada a Objetos
Programa:     Ingeniería Mecatrónica
Semestre:     I
Créditos:     9
Modalidad:    Presencial
Horas:        144 h (48 acompañamiento + 96 autónomo)
Periodo:      I
Semanas:      16


CÓMO ABRIR LA OVA
-----------------
1. Asegúrate de tener un navegador web moderno (Chrome, Firefox, Edge)
2. Abre el archivo "index.html" con doble clic
3. Navega por las pestañas principales: Inicio, Justificación, Objetivos,
   Ruta, Evaluación y Recursos
4. Tu progreso se guarda automáticamente en el navegador


ESTRUCTURA DE ARCHIVOS
-----------------------
ova-programacion-orientada-a-objetos/
├── index.html           ← Archivo principal (EDITADO)
├── imsmanifest.xml      ← Manifiesto SCORM (EDITADO)
├── package.json
├── README.txt           ← Este archivo
└── src/
    ├── css/
    │   └── styles.css   (sin cambios)
    ├── img/
    │   ├── icons/       (sin cambios)
    │   └── patterns/    (sin cambios)
    └── js/
        ├── app.js       ← Lógica principal (EDITADO - solo storage keys)
        └── lib/
            └── tiny.js  (sin cambios)


ARCHIVOS EDITADOS (según protocolo PROMPT)
-------------------------------------------
✓ index.html
  - Meta description actualizada
  - Título actualizado
  - Pill (Periodo I)
  - Hero title y lead
  - Metadata del curso (créditos, horas)
  - Justificación: contexto y relevancia
  - RAA (Resultado de Aprendizaje)
  - Objetivos (general y específicos)
  - window.__COURSE_DATA__:
    * meta: curso, código, créditos, horas, periodo
    * raa: RAA de Programación Orientada a Objetos
    * sessions: 16 semanas con contenido de POO
    * evaluation: adaptada a desarrollo orientado a objetos
    * quiz: 5 preguntas sobre POO

✓ src/js/app.js
  - Comentario del header actualizado
  - TAB_STORAGE_KEY: "ova_programacion_poo_tab_v2"
  - STORAGE_KEYS.progress: "ova_programacion_poo_progress_v2"
  - STORAGE_KEYS.quiz: "ova_programacion_poo_quiz_v2"
  (NO se cambió lógica, solo claves de localStorage)

✓ imsmanifest.xml
  - <title> actualizado a "OVA · Programación Orientada a Objetos · CORHUILA"


ARCHIVOS SIN CAMBIOS (según protocolo PROMPT)
----------------------------------------------
✓ src/css/styles.css      - Estilos idénticos al OVA ejemplo
✓ src/js/lib/tiny.js      - Biblioteca de helpers sin modificar
✓ src/img/**              - Todas las imágenes conservadas
✓ package.json            - Configuración original
✓ Estructura de carpetas  - Idéntica al ejemplo


CONTENIDO DE LAS 16 SEMANAS
----------------------------
UNIDAD 1 – Fundamentos de la Programación Orientada a Objetos (Semanas 1–4)
1. Introducción a la POO y entorno de desarrollo en Java (FORO)
2. Clases y objetos en Java (TALLER)
3. Atributos, métodos y encapsulamiento (TALLER)
4. Constructores y representación de objetos (QUIZ)
5. Evaluación Corte 1

UNIDAD 2 – Principios de diseño y modularidad (Semanas 5–8)
6. Herencia en Java (FORO)
7. Polimorfismo y sobreescritura de métodos (TALLER)
8. Clases abstractas e interfaces (TALLER)
9. Composición y modularización del código (QUIZ)
10. Evaluación Corte 2

UNIDAD 3 – Aplicación práctica de la POO en Java (Semanas 9–16)
11. Manejo de errores y excepciones (FORO)
12. Colecciones y estructuras de datos (TALLER)
13. Lectura y escritura de archivos en Java (TALLER)
14. Buenas prácticas y refactorización en Java (QUIZ)
15. Evaluación Corte 3
16. Retroalimentación y cierre del curso


PATRÓN DE ACTIVIDADES POR CORTE:
→ Foro, Taller, Taller, Quiz, Parcial


RESULTADO DE APRENDIZAJE (RAA)
-------------------------------
Construye soluciones de software aplicando los principios de la
Programación Orientada a Objetos, utilizando técnicas, herramientas
y buenas prácticas contemporáneas con criterios de calidad,
integración y mantenibilidad.


EVALUACIÓN POR CORTES
----------------------
Primer corte:  30%
Segundo corte: 30%
Tercer corte:  40%


CHECKLIST DE VERIFICACIÓN
--------------------------
□ El archivo index.html abre correctamente
□ Las 6 pestañas funcionan correctamente
□ El acordeón de la Ruta muestra 16 semanas
□ El patrón Foro→Taller→Taller→Quiz→Parcial se cumple
□ El quiz tiene preguntas de Programación Orientada a Objetos
□ El progreso se guarda correctamente
□ No hay errores en consola
□ El diseño es idéntico al OVA ejemplo


GENERADO POR
------------
Prompt: promt-acuerdos.md (PROMPT MAESTRO V2 Anti-Desviación)
Fecha: Febrero 2026
Basado en: ova_ejemplo
Adaptado para: Programación Orientada a Objetos


═══════════════════════════════════════════════════════════════
Para soporte o dudas, contactar al docente a cargo de la materia
═══════════════════════════════════════════════════════════════
