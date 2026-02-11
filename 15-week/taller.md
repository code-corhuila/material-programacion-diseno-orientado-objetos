#  Taller Práctico — Unidad 3 (Aplicación práctica)



##  1. Objetivo

Usar colecciones (**List / Map**) y manejo de excepciones para construir un mini-sistema robusto, evitando caídas por entradas inválidas.

---

##  2. Contexto del problema

Un sistema simple de **registro de contactos** guarda:

- **Nombre** (único)
- **Teléfono**

El usuario podrá:

- Agregar contactos
- Buscar contactos
- Listar contactos
- Eliminar contactos

---

##  3. Requisitos

###  Estructura de datos

Usar un `HashMap<String, String>` para almacenar contactos:

- **Clave:** nombre
- **Valor:** teléfono

---

###  Menú en consola

El sistema debe mostrar un menú con las siguientes opciones:

1. Agregar contacto  
2. Buscar contacto por nombre  
3. Listar contactos  
4. Eliminar contacto  
5. Salir  

---

###  Validaciones y manejo de errores

El programa debe cumplir con las siguientes validaciones:

- Si el usuario ingresa una opción **no numérica** en el menú, manejar el error usando `try/catch`
- No permitir **nombres vacíos**
- Si el contacto ya existe:
  - Avisar al usuario
  - No sobrescribir el contacto **o** preguntar si desea reemplazarlo
- Si el usuario intenta **buscar o eliminar** un contacto que no existe:
  - Mostrar un mensaje claro
- Asegurar que el programa **no se caiga** por entradas inválidas

---

##  4. Recomendación técnica

- Leer entradas usando `Scanner`
- El menú debe repetirse hasta que el usuario elija la opción **“Salir”**
- El flujo del programa debe ser **estable**, incluso ante errores de entrada

---

##  5. Entregables

###  Código fuente

- Archivo principal `App.java`  
  **o**
- Código dividido en clases (opcional)

---

###  Evidencia en consola

Se debe mostrar evidencia de:

- Agregar **2 contactos**
- Buscar **1 contacto**
- Listar todos los contactos
- Intentar eliminar **un contacto inexistente**  
  *(el sistema debe manejar el caso correctamente)*

---

##  6. Criterios de evaluación 

- Uso correcto de `HashMap`
- Manejo adecuado de excepciones en la entrada del menú
- Validaciones básicas implementadas
- Flujo estable del programa (**sin caídas**)

---
