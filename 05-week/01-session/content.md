---
course: Programación y Diseño Orientado a Objetos
program: Ingeniería de Sistemas
term: 2026-B
week: 5
session: 1
corte: 1
unit: Unidad 1 · Fundamentos de la POO
topic: Repaso del Corte 1
eyebrow: Unidad 1 · Cierre de Corte 1
lead: Cerramos el primer corte consolidando los fundamentos de la POO en Java: clases, objetos, encapsulamiento y constructores. Repaso guiado para llegar seguro al parcial.
objectives:
  - Repasar los conceptos clave del Corte 1.
  - Integrar clase, encapsulamiento, constructores y toString.
  - Detectar errores comunes.
---

## 1. Mapa del Corte 1

```ascii
Semana 1  Introduccion a POO + entorno Java
Semana 2  Clases y objetos (new, this)
Semana 3  Encapsulamiento (private, getters/setters, validacion)
Semana 4  Constructores + toString/equals
Semana 5  Repaso + Parcial
```

## 2. Repaso exprés

- **Clase vs objeto:** la clase es el molde; el objeto, la instancia (`new`).
- **Pilares vistos:** abstracción y **encapsulamiento** (atributos `private` + métodos públicos).
- **Constructores:** inicializan el objeto; se pueden sobrecargar y reutilizar con `this()`.
- **Representación:** `toString()` para texto legible; `equals()` para comparar por contenido; `==` compara referencias.

## 3. Clase modelo (todo junto)

```java
// tab: Persona completa
public class Persona {
    private String nombre;
    private int edad;

    public Persona() { this("Sin nombre", 0); }
    public Persona(String nombre, int edad) {
        this.nombre = nombre; setEdad(edad);
    }
    public String getNombre() { return nombre; }
    public int getEdad() { return edad; }
    public void setEdad(int edad) { if (edad >= 0 && edad <= 120) this.edad = edad; }

    @Override public String toString() {
        return "Persona{nombre=" + nombre + ", edad=" + edad + "}";
    }
}
```

## 4. Errores comunes a evitar

- Atributos `public` en vez de `private`.
- Olvidar `this` cuando el parámetro se llama igual que el atributo.
- Definir constructor parametrizado y usar `new Clase()` sin declarar el vacío.
- Comparar String con `==` en lugar de `.equals()`.

> warn: En el parcial se evalúa el diseño de la clase (encapsulamiento, constructores, validación), no solo que "compile".

## Autoevaluación

```quiz
Q: ¿Qué modificador deben tener los atributos para estar encapsulados?
* private
- public
- static
E: Encapsular = atributos private + acceso por métodos.

Q: ¿Qué hace this() dentro de un constructor?
* Llama a otro constructor de la misma clase
- Crea un nuevo objeto
- Imprime el objeto
E: this(...) reutiliza otro constructor de la clase para no repetir código.

Q: Para comparar dos objetos por su contenido se usa...
* equals()
- ==
- toString()
E: equals() compara contenido (si se sobrescribe); == compara referencias.
```

## Actividad de la semana (formativa)

Opcional y no evaluable. Versión ampliada con rúbrica en **optional-activity** (entrega por GitHub).

- Repasa creando una clase completa (encapsulada, con constructores y toString) del dominio que prefieras.
