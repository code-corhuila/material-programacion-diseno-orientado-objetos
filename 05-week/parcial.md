#  Parcial Práctico — Unidad 1  

---

## Objetivo

Evaluar la capacidad del estudiante para **configurar y ejecutar un proyecto en Java** y **modelar una solución usando clases y objetos**, aplicando correctamente:

- Atributos  
- Métodos  
- Encapsulamiento  
- Constructores  
- Representación de objetos (`toString`)

---

## Contexto del caso  
### Sistema de Biblioteca Comunitaria

Una **biblioteca comunitaria** necesita un programa de **consola** para gestionar:

- Material bibliográfico (libros)
- Préstamos y devoluciones

 El sistema **NO usa base de datos**.  
Toda la información se mantiene **en memoria** durante la ejecución.

---

##  Requerimientos funcionales

### 3.1  Modelo orientado a objetos 

Se deben crear **como mínimo** las siguientes clases:

---

###  Clase `Libro`

####  Atributos privados

- `codigo` (`String`) — **único**
- `titulo` (`String`)
- `autor` (`String`)
- `anio` (`int`)
- `disponible` (`boolean`)

---

####  Constructores

- Constructor **completo** con todos los atributos
- Constructor **mínimo** (`codigo`, `titulo`, `autor`) que asigne valores por defecto  
  - Ejemplo:
    - `anio = 0`
    - `disponible = true`

---

####  Métodos

- **Getters y Setters** con validaciones básicas:
  - `codigo`, `titulo`, `autor` → no pueden ser `null` ni vacíos
  - `anio` → no puede ser negativo
- `prestar()`  
  - Cambia `disponible` a `false`
  - Si ya está prestado → **no permitir**
- `devolver()`  
  - Cambia `disponible` a `true`
- `toString()`  
  - Muestra el libro en **una sola línea**, clara y legible

---

### Clase `Biblioteca`

Encapsula una colección interna de libros, por ejemplo:

- `Libro[]`
- `ArrayList<Libro>`

---

####  Métodos

- `agregarLibro(Libro libro)`
  - Validar que **no se repita el código**
- `buscarPorCodigo(String codigo)`
- `listarLibros()` → todos
- `listarDisponibles()`
- `prestarLibro(String codigo)`
- `devolverLibro(String codigo)`

---

###  Clase `App` (main)

Aplicación de consola con **menú interactivo**:

1. Registrar libro  
2. Listar libros  
3. Listar disponibles  
4. Buscar por código  
5. Prestar libro  
6. Devolver libro  
7. Salir  

---

## 3.2  Reglas y validaciones 

-  No se permiten **códigos repetidos**
-  No se puede prestar:
  - Un libro que **no existe**
  - Un libro que **ya está prestado**
-  No se puede devolver:
  - Un libro que **no existe**
  - Un libro que **ya está disponible**
-  Las entradas inválidas deben manejarse con **mensajes claros**
  - El programa **NO debe caerse**

---

##  Requerimientos técnicos 

- Uso real de **POO**:
  - Atributos privados
  - Métodos públicos
  - Validaciones
- Usar **mínimo 2 constructores** en `Libro`
- Implementar `toString()` y usarlo al listar
- Estructura de paquetes recomendada:

```text
model      → Libro  
service    → Biblioteca  
app        → App  


```
## Entregables

-  **Proyecto Java completo**
  - Carpeta del proyecto o archivo `.zip`

-  **Evidencias de ejecución en consola** que muestren:
  - Registro de **2–3 libros**
  - Préstamo de **1 libro** y verificación del cambio de estado
  - Intento de prestar el mismo libro nuevamente (**el sistema debe bloquear la acción**)
  - Devolución del libro y **listado de libros disponibles**

---

##  Criterios de evaluación 

- Encapsulamiento y validaciones correctas 
- Uso correcto de constructores y métodos
- Menú funcional y flujo completo del sistema 
- Uso de `toString()` y salida clara en consola 
- Organización por clases, paquetes y limpieza del código 
