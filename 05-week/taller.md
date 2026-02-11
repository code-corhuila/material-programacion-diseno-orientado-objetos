# Taller Práctico — Unidad 1  
## Programación Orientada a Objetos (POO en Java)

---


## Objetivo

Construir un programa en **Java** que modele una entidad sencilla usando **clases, objetos y constructores**, permitiendo interactuar con varios objetos desde la consola.

---

## Contexto del problema

Una tienda de barrio necesita un programa simple para gestionar productos.  
Cada producto tiene los siguientes datos:

- Código  
- Nombre  
- Precio  

El sistema permitirá **registrar productos** y **mostrar su información**.

---

##  Requisitos

###  Clase `Producto`

Debe contener:

- **Atributos:**
  - `codigo`
  - `nombre`
  - `precio`

- **Constructor** que reciba los tres datos.

- **Método** `mostrarInfo()` que imprima la información del producto con un formato claro.

---

###  Método `main`

- Crear un **arreglo (array)** de tamaño **5** para almacenar productos.
- Mostrar un **menú** con las siguientes opciones:
  1. Agregar producto
  2. Listar productos
  3. Salir

---

###  Validaciones mínimas

- El **precio** debe ser mayor a `0`.
- No permitir agregar productos si el **array está lleno**.

---

##  Sugerencia de interacción (ejemplo)

- Agregar: `P-01`, **Arroz**, `4200`
- Agregar: `P-02`, **Aceite**, `9800`
- Listar → se muestran ambos productos registrados

---

##  Entregables

- Código fuente en Java:
  - `Producto.java`
  - `App.java`
- Captura o salida en consola donde se evidencie:
  - Registro de **2 productos**
  - Listado correcto de los productos

---

## Criterios de evaluación 

- Uso correcto de **clases, objetos y constructor**
- Menú funcional
- Validación básica del precio
- Salida clara y ordenada en consola
