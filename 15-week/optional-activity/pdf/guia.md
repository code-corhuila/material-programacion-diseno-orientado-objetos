# GUÍA DE ACTIVIDAD PRÁCTICA

**Programación y Diseño Orientado a Objetos · Semana 15 · Entrega del proyecto final**

| Programa | Ingeniería de Sistemas | Asignatura | Programación y Diseño Orientado a Objetos |
|---|---|---|---|
| Unidad | Unidad 3 · Robustez y bibliotecas | Semana / Corte | 15 · Corte 3 |
| Modalidad | Individual o en parejas | Periodo | 2026-B |
| Tipo | Formativa (opcional, sin nota) | Entrega | Repositorio en GitHub |

## Objetivos

- Integrar los pilares de POO en un sistema completo.
- Entregar el proyecto con estructura y documentación profesionales.
- Autoevaluar el trabajo con la rúbrica antes de compartirlo.

## 1. Enunciado

Construye una **aplicación de consola en Java** para un problema de gestión (biblioteca, inventario, agenda, estudiantes, playlist…) que integre **todo el curso**:

1. **Modelo** encapsulado con invariantes; usa **herencia/interfaces + polimorfismo** y **composición**.
2. **Colecciones** (`List`/`Map`) para gestionar los datos.
3. **CRUD** completo sobre la entidad principal.
4. **Excepciones** (validación y errores controlados; al menos una **propia**).
5. **Persistencia** en archivo, aislada en un **repositorio**.
6. **Buenas prácticas**: nombres claros, DRY, métodos cortos, sin números mágicos.

## 2. Requisitos

- Todos los pilares de POO aplicados y justificados.
- Colecciones + excepciones + persistencia + CRUD funcionando.
- Diseño por capas (modelo / servicio / persistencia / app).
- README completo y commits incrementales.

## 3. Cómo entregar

Entrega **por GitHub**. Repositorio: `poo-proyecto-final`.

```
poo-proyecto-final/
  README.md    -> problema, diseño (clases/relaciones), instrucciones, capturas
  src/
    modelo/       -> entidades del dominio
    servicio/     -> logica de negocio (CRUD, reglas)
    persistencia/ -> repositorio (guardar/cargar)
    app/          -> Main (consola)
  datos/         -> archivos de datos (ej. datos.csv)
```

1. Crea el repositorio público con ese nombre.
2. Sube el código organizado por capas y el README.
3. Realiza commits incrementales y claros durante el desarrollo.
4. Comparte el enlace por el canal indicado por el docente.

## 4. Rúbrica de evaluación

| Criterio | Excelente (100%) | Aceptable (60%) | Por mejorar (0%) | Pts |
|---|---|---|---|---|
| Pilares de POO | Todos, correctos y justificados | La mayoría | Pocos | 25 |
| Colecciones + excepciones | Correctos y pertinentes | Con detalles | Fallan | 20 |
| CRUD funcional | Completo y probado | Parcial | Incompleto | 20 |
| Persistencia (repositorio) | Funciona y está separada | Parcial | Ausente | 15 |
| Diseño (capas, cohesión/acoplamiento) | Claro y justificado | Aceptable | Débil | 10 |
| README + commits | Ordenado e incremental | Aceptable | Deficiente | 10 |

> tip: Antes de entregar, **autoevalúate con esta rúbrica**. Cualquier criterio flojo aún puedes reforzarlo. Un buen README y commits claros comunican profesionalismo.

> Nota: actividad formativa y opcional (sin nota en Moodle). La guía unificada para entregar todas las actividades opcionales, válida para todas las materias, estará en el Manual de Entrega de Actividades Opcionales (próximamente).

