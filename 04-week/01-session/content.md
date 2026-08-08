---
course: Programación y Diseño Orientado a Objetos
program: Ingeniería de Sistemas
term: 2026-B
week: 4
session: 1
corte: 1
unit: Unidad 1 · Fundamentos de la POO
topic: Constructores e inicialización de objetos
eyebrow: Unidad 1 · Fundamentos · Corte 1
lead: Un objeto debe nacer en un estado válido. El constructor es el método especial que garantiza esa inicialización en el momento de la creación. Dominar los constructores —por defecto, parametrizados, sobrecargados y encadenados con this()— y el orden exacto de inicialización es clave para diseñar clases robustas.
objectives:
  - Definir qué es un constructor y cuándo se ejecuta.
  - Distinguir el constructor por defecto del parametrizado.
  - Sobrecargar constructores y encadenarlos con this().
  - Explicar el orden de inicialización de un objeto.
---

## 1. ¿Qué es un constructor?

> info: **Constructor.** Método especial que se ejecuta **automáticamente al crear el objeto** (con `new`) y cuyo fin es **inicializar su estado**. Tiene el **mismo nombre que la clase** y **no declara tipo de retorno** (ni `void`).

```java
// tab: Constructor parametrizado
public class Persona {
    private String nombre;
    private int edad;

    public Persona(String nombre, int edad) {   // constructor
        this.nombre = nombre;
        this.edad = edad;
    }
}
// uso:
Persona p = new Persona("Ana", 20);   // objeto ya inicializado y válido
```

> tip: Aprovecha el constructor para **validar** e imponer las invariantes desde el nacimiento del objeto (coherente con el encapsulamiento de la Semana 3): un objeto nunca debería existir en estado inválido.

## 2. El constructor por defecto

Si **no** defines ningún constructor, Java provee uno **implícito sin argumentos** que deja los atributos en su valor por defecto. Pero en cuanto defines **cualquier** constructor, ese implícito **desaparece**.

```java
// tab: Constructor por defecto explícito
public Persona() {
    this.nombre = "Sin nombre";
    this.edad = 0;
}
```

> warn: Error muy frecuente: defines `Persona(String, int)` y luego intentas `new Persona()` → **no compila**, porque el constructor sin argumentos ya no existe. Si lo necesitas, decláralo explícitamente.

## 3. Sobrecarga de constructores

Como cualquier método, los constructores se pueden **sobrecargar**: varios con distinta lista de parámetros, para ofrecer varias formas de crear el objeto.

```java
// tab: Varios constructores
public Persona() { }
public Persona(String nombre) { this.nombre = nombre; }
public Persona(String nombre, int edad) { this.nombre = nombre; this.edad = edad; }
```

## 4. Encadenar con this()

`this(...)` llama a **otro constructor de la misma clase**, evitando repetir código de inicialización. Debe ser la **primera instrucción**.

```java
// tab: this() (reutilizar)
public Persona() {
    this("Sin nombre", 0);          // delega en el constructor completo
}
public Persona(String nombre, int edad) {
    this.nombre = nombre;
    setEdad(edad);                  // incluso puede validar
}
```

> info: `this(...)` (llamar a otro constructor) es distinto de `this.atributo` (referir al objeto actual). Ambos usan `this`, pero con sintaxis y propósito diferentes.

## 5. Orden de inicialización de un objeto

Al ejecutar `new`, el objeto se inicializa en un orden preciso:

```ascii
1. Se reserva memoria; los atributos toman su valor por defecto (0/null/false)
2. Se aplican los inicializadores de los atributos (ej. private int x = 5;)
3. Se ejecuta el cuerpo del constructor
```

Por eso, cuando el cuerpo del constructor corre, los atributos ya tienen sus valores iniciales y pueden reasignarse con los parámetros.

## 6. Buenas prácticas

- Inicializa **todo** el estado necesario en el constructor (no dejes objetos a medio construir).
- **Valida** los parámetros en el constructor (o delega en setters validados).
- Usa `this(...)` para no duplicar lógica entre constructores.
- Si necesitas el constructor sin argumentos junto a uno parametrizado, **declara ambos**.

## Autoevaluación

```quiz
Q: ¿Cuándo se ejecuta un constructor?
* Automáticamente al crear el objeto con new
- Cada vez que se llama cualquier método
- Al finalizar el programa
E: El constructor se ejecuta una vez, en la creación del objeto.

Q: ¿Qué caracteriza a un constructor?
* Tiene el nombre de la clase y no declara tipo de retorno
- Se llama siempre main y retorna void
- Debe ser private
E: El constructor lleva el nombre de la clase y no tiene tipo de retorno.

Q: Defines Persona(String,int) y no el vacío. ¿Qué pasa con new Persona()?
* No compila: el constructor sin argumentos implícito ya no existe
- Funciona igual
- Crea el objeto con todo en null
E: Al definir un constructor, Java deja de generar el implícito sin argumentos.

Q: ¿Qué hace this(...) dentro de un constructor?
* Llama a otro constructor de la misma clase (debe ir primero)
- Crea un objeto nuevo
- Llama a la superclase
E: this(...) encadena a otro constructor de la clase para reutilizar inicialización.

Q: ¿En qué orden se inicializa un objeto?
* Valores por defecto → inicializadores de atributos → cuerpo del constructor
- Primero el cuerpo del constructor, luego los inicializadores de atributos
- En orden alfabético de los atributos
E: Primero defaults, luego los inicializadores de campo, y por último el cuerpo del constructor.

Q: ¿Dónde conviene validar los parámetros de creación?
* En el constructor (o delegando en setters validados)
- En ningún lado
- Solo en el método main
E: Validar en el constructor garantiza que el objeto nace en estado válido.
```

## Actividad de la semana (formativa)

Opcional y no evaluable. Versión ampliada con rúbrica en **optional-activity** (entrega por GitHub).

- Crea una clase `Producto` con dos constructores (uno vacío que delegue con `this()` en el completo) y validación de `precio >= 0` en la construcción.
