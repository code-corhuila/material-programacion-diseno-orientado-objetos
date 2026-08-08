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
lead: La Programación Orientada a Objetos (POO) es la forma en que se construye el software profesional hoy. En vez de pensar en instrucciones sueltas, modelamos el mundo con "objetos" que tienen datos y comportamiento. Esta sesión te da el mapa completo del paradigma que usaremos todo el semestre en Java.
objectives:
  - Explicar qué es el paradigma orientado a objetos y por qué surgió.
  - Distinguir los conceptos de clase y objeto.
  - Reconocer los cuatro pilares de la POO.
  - Comparar el enfoque estructurado con el orientado a objetos.
---

## 1. ¿Qué es la POO?

La **Programación Orientada a Objetos** es un paradigma que organiza el software en torno a **objetos**: unidades que combinan **datos** (atributos) y **comportamiento** (métodos). En lugar de una lista de instrucciones que manipulan variables sueltas, modelamos entidades del problema (un estudiante, una cuenta, un vehículo) como objetos que colaboran entre sí.

> info: La idea central: el software se entiende mejor cuando **imita la estructura del problema real**. Si el negocio habla de "clientes" y "pedidos", tu código también.

## 2. Clase y objeto

Los dos conceptos base:

- **Clase:** el **molde** o plantilla. Define qué atributos y métodos tendrán los objetos. Ejemplo: la clase `Perro`.
- **Objeto:** una **instancia** concreta creada a partir de la clase, con sus propios valores. Ejemplo: `miPerro`, `otroPerro`.

```ascii
Clase Perro (molde)              Objetos (instancias)
+------------------+             miPerro:  nombre="Fido", edad=3
| nombre           |   ----->    otroPerro: nombre="Luna", edad=5
| edad             |
| ladrar()         |
+------------------+
```

> tip: Analogía: la **clase** es el plano de una casa; los **objetos** son las casas construidas con ese plano. Un plano, muchas casas.

## 3. Los cuatro pilares de la POO

| Pilar | Idea | Lo veremos en |
|---|---|---|
| **Abstracción** | Modelar solo lo relevante del problema | Semanas 2–4 |
| **Encapsulamiento** | Proteger los datos del objeto (private + getters/setters) | Semana 3 |
| **Herencia** | Reutilizar y especializar clases | Semana 6 |
| **Polimorfismo** | Un mismo método se comporta distinto según el objeto | Semana 7 |

Estos cuatro pilares son la columna vertebral del curso.

## 4. Estructurado vs. Orientado a Objetos

| Aspecto | Estructurado | Orientado a objetos |
|---|---|---|
| Unidad central | La función | El objeto |
| Datos y lógica | Separados | Juntos en el objeto |
| Reutilización | Copiar funciones | Herencia y composición |
| Escala | Se complica en proyectos grandes | Organiza mejor la complejidad |

> warn: La POO no reemplaza lo que aprendiste (secuencia, decisión, repetición): lo **organiza** dentro de los métodos de los objetos.

## 5. ¿Por qué Java?

Usaremos **Java** todo el semestre porque es **fuertemente orientado a objetos**, muy usado en la industria y obliga a declarar clases con claridad, lo que ayuda a aprender bien los conceptos.

## Autoevaluación

```quiz
Q: ¿Qué combina un objeto en la POO?
* Datos (atributos) y comportamiento (métodos)
- Solo datos
- Solo funciones sueltas
E: Un objeto une estado (atributos) y comportamiento (métodos) en una sola unidad.

Q: ¿Cuál es la relación correcta entre clase y objeto?
* La clase es el molde; el objeto es una instancia de la clase
- El objeto es el molde; la clase es la instancia
- Son sinónimos
E: La clase define la plantilla; el objeto es una instancia concreta con sus valores.

Q: ¿Cuál NO es uno de los cuatro pilares de la POO?
* Compilación
- Encapsulamiento
- Herencia
E: Los pilares son abstracción, encapsulamiento, herencia y polimorfismo.

Q: En POO, ¿dónde vive la lógica que opera sobre los datos de una entidad?
* En los métodos del propio objeto
- En funciones globales separadas
- En el sistema operativo
E: En POO, datos y comportamiento se mantienen juntos dentro del objeto.
```

## Actividad de la semana (formativa)

Opcional y no evaluable. Versión ampliada con rúbrica en **optional-activity** (entrega por GitHub).

- Identifica 3 entidades de un sistema real (p. ej. una tienda) y descríbelas como posibles clases con sus atributos y métodos.
