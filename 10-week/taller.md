#  Taller Práctico — Unidad 2  



##  Objetivo

Aplicar **herencia** y **sobrescritura de métodos** para modelar una jerarquía simple y comprender cómo se reutiliza y especializa el comportamiento en Java.

---

## Contexto del problema

En un sistema de mensajería se manejan diferentes tipos de **notificaciones**.  
Todas comparten la siguiente información:

- Destinatario  
- Mensaje  

Sin embargo, la forma de **enviar** la notificación cambia según el tipo:

- Email  
- SMS  

---

## Requisitos

###  Clase base `Notificacion`

Debe incluir:

- **Atributos:**
  - `destinatario`
  - `mensaje`

- **Constructor** para inicializar los atributos.

- **Método** `enviar()` que imprima un mensaje genérico, por ejemplo:  
  > `Enviando notificación...`

---

###  Clases hijas

Crear las siguientes clases que hereden de `Notificacion`:

- `NotificacionEmail`
- `NotificacionSMS`

Sobrescribir (`@Override`) el método `enviar()` en cada clase:

- **Email:**  
  > `Enviando EMAIL a <destinatario>: <mensaje>`

- **SMS:**  
  > `Enviando SMS a <destinatario>: <mensaje>`

---

###  Método `main`

- Crear un **arreglo o lista** con **4 notificaciones** mezcladas:
  - 2 de tipo Email
  - 2 de tipo SMS

- Recorrer la colección y llamar al método `enviar()` para evidenciar el **polimorfismo**.

---

##  Restricciones

- No usar **interfaces** ni **clases abstractas** en este taller.
- No usar **entrada por archivos**.

---

##  Entregables

- Código fuente en Java:
  - `Notificacion.java`
  - `NotificacionEmail.java`
  - `NotificacionSMS.java`
  - `App.java`

- Salida en consola que evidencie que el método `enviar()` se comporta de forma distinta según el objeto.

---

##  Criterios de evaluación 

- Uso correcto de **herencia**
- Implementación adecuada de `@Override`
- Recorrido de colección y ejecución de métodos  
  *(polimorfismo evidenciado)*
- Código ordenado y nombres claros
