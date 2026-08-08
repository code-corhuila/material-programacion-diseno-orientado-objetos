---
course: Programación y Diseño Orientado a Objetos
program: Ingeniería de Sistemas
term: 2026-B
week: 1
session: 1
corte: 1
unit: Unidad 1 · Fundamentos de la POO
topic: Introducción a la Programación Orientada a Objetos
eyebrow: Unidad 1 · Fundamentos · Corte 1
lead: La Programación Orientada a Objetos (POO) es el paradigma dominante en el desarrollo de software profesional. En lugar de organizar el programa como una secuencia de instrucciones que operan sobre datos sueltos, la POO lo estructura en torno a objetos que combinan estado y comportamiento y colaboran entre sí. Esta sesión construye el marco conceptual completo —con definiciones precisas— que sostendrá todo el semestre en Java.
objectives:
  - Distinguir el paradigma orientado a objetos del estructurado con criterio técnico.
  - Definir con precisión objeto, clase, estado, comportamiento e identidad.
  - Enunciar y ejemplificar los cuatro pilares de la POO.
  - Justificar la elección de la POO (y de Java) para modelar un dominio.
---

## 1. Paradigmas de programación

Un **paradigma** es una forma de estructurar y razonar sobre un programa.

- **Programación estructurada:** el programa es un conjunto de **procedimientos** (funciones) que operan sobre **datos separados**. La unidad de organización es la función.
- **Programación orientada a objetos:** el programa es un conjunto de **objetos** que **encapsulan datos y las operaciones que actúan sobre ellos**. La unidad de organización es el objeto.

> info: La POO **no reemplaza** la lógica estructurada (secuencia, decisión, repetición): la **contiene y organiza** dentro de los métodos de los objetos. Se sigue programando con `if`, `for`, etc., pero agrupados por responsabilidad.

## 2. Objeto: identidad, estado y comportamiento

> info: **Objeto.** Entidad de software que posee tres características: **identidad** (existe y es distinguible de los demás, aunque sus datos sean iguales), **estado** (los valores de sus atributos en un momento dado) y **comportamiento** (lo que puede hacer: sus métodos).

Ejemplo conceptual — dos cuentas bancarias:

| | Cuenta A | Cuenta B |
|---|---|---|
| Identidad | objeto #1 | objeto #2 (distinto aunque tenga el mismo saldo) |
| Estado | titular="Ana", saldo=100 | titular="Ana", saldo=100 |
| Comportamiento | consignar(), retirar() | consignar(), retirar() |

Aunque A y B tengan **el mismo estado**, son objetos **distintos** (distinta identidad).

## 3. Clase: el molde

> info: **Clase.** Plantilla que define qué **atributos** (estado) y qué **métodos** (comportamiento) tendrán los objetos de ese tipo. Un objeto es una **instancia** de una clase.

```ascii
Clase Perro (molde/plano)          Objetos (instancias)
+--------------------+             fido : nombre="Fido", edad=3
| nombre : String    |  --new-->   luna : nombre="Luna", edad=5
| edad   : int       |             (misma clase, estados distintos,
| ladrar()           |              identidades distintas)
+--------------------+
```

> tip: Analogía precisa: la **clase** es el plano arquitectónico; los **objetos** son las casas construidas con ese plano. Un plano, muchas casas independientes.

## 4. Los cuatro pilares de la POO

| Pilar | Definición | Se estudia en |
|---|---|---|
| **Abstracción** | Representar en la clase **solo** los atributos y operaciones relevantes del problema, ocultando el detalle irrelevante | Semanas 2–4, 8 |
| **Encapsulamiento** | Ocultar el estado interno y exponerlo únicamente mediante una interfaz controlada (atributos `private` + métodos) | Semana 3 |
| **Herencia** | Derivar una clase de otra para reutilizar y especializar (relación "es-un") | Semana 6 |
| **Polimorfismo** | Que una misma operación se comporte según el tipo real del objeto | Semana 7 |

> info: **Abstracción vs. encapsulamiento** (se confunden): la *abstracción* decide **qué** modelar (el diseño); el *encapsulamiento* **protege** ese modelo controlando el acceso (el mecanismo). Son complementarios.

## 5. Contexto y ejemplo integrador

La POO nació con **Simula** (años 60) y se popularizó con **Smalltalk** y luego **C++/Java**. Su motivación: **gestionar la complejidad** de sistemas grandes acercando el código a la estructura del problema real.

**Ejemplo — modelar una biblioteca.** El dominio habla de *libros*, *usuarios* y *préstamos*; el código los refleja como clases:

```ascii
Libro   { titulo, autor, disponible;  prestar(), devolver() }
Usuario { nombre, id;                 solicitar(libro) }
Prestamo{ libro, usuario, fecha;      estaVencido() }
```

Cuando el código "habla el idioma del negocio", es más fácil de entender, mantener y extender.

## 6. ¿Por qué Java?

Usaremos **Java** todo el semestre porque:

- Es **fuertemente orientado a objetos**: casi todo se modela con clases.
- Es de **tipado estático**: el compilador detecta muchos errores antes de ejecutar.
- Tiene enorme presencia en la **industria** (backend, Android, sistemas empresariales).
- Obliga a declarar clases con claridad, lo que **refuerza el aprendizaje** de los conceptos.

## 7. Errores conceptuales frecuentes

- Creer que "objeto" = "variable". Un objeto tiene identidad, estado **y** comportamiento.
- Pensar que la POO elimina la lógica estructurada (la organiza, no la elimina).
- Confundir **clase** (molde) con **objeto** (instancia).
- Tratar la POO como "poner todo en una clase gigante": eso es estructurado disfrazado.

## Autoevaluación

```quiz
Q: ¿Cuál es la unidad central de organización en la POO?
* El objeto (que combina estado y comportamiento)
- La función suelta
- La variable global
E: En POO el programa se organiza en objetos que unen datos y operaciones.

Q: Dos objetos con exactamente el mismo estado (mismos valores)...
* Siguen siendo objetos distintos: tienen identidad propia
- Son el mismo objeto
- No pueden existir
E: La identidad distingue a los objetos aunque su estado sea idéntico.

Q: ¿Qué relación hay entre clase y objeto?
* La clase es el molde; el objeto es una instancia de la clase
- El objeto es el molde; la clase es la instancia
- Son exactamente lo mismo
E: La clase define la plantilla; el objeto es una instancia concreta con identidad.

Q: ¿Cuál pareja de conceptos se complementan como "qué modelar" y "cómo protegerlo"?
* Abstracción (qué) y encapsulamiento (cómo se protege)
- Herencia y polimorfismo
- Compilación y ejecución
E: La abstracción decide qué modelar; el encapsulamiento protege ese modelo.

Q: ¿Cuál NO es un pilar de la POO?
* Recursión
- Encapsulamiento
- Polimorfismo
E: Los pilares son abstracción, encapsulamiento, herencia y polimorfismo.

Q: ¿Por qué la POO ayuda a gestionar la complejidad?
* Acerca la estructura del código a la del problema real
- Elimina la necesidad de algoritmos
- Hace innecesarias las pruebas
E: Modelar el dominio con objetos hace el sistema más comprensible y mantenible.
```

## Actividad de la semana (formativa)

Opcional y no evaluable. Versión ampliada con rúbrica en **optional-activity** (entrega por GitHub).

- Elige un dominio real (tienda, clínica, transporte). Identifica 3 clases candidatas con sus atributos y métodos, y para cada una argumenta qué **abstrajiste** (qué dejaste fuera por irrelevante).
