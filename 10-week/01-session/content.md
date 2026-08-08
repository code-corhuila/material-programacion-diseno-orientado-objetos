---
course: Programación y Diseño Orientado a Objetos
program: Ingeniería de Sistemas
term: 2026-B
week: 10
session: 1
corte: 2
unit: Unidad 2 · Herencia y polimorfismo
topic: Síntesis integradora del Corte 2
eyebrow: Unidad 2 · Cierre de Corte 2
lead: Cerramos el segundo corte integrando sus mecanismos de diseño: herencia y sobrescritura, polimorfismo, abstracción (clases abstractas e interfaces) y composición. La clave no es solo conocerlos, sino saber cuál aplicar en cada relación del problema.
objectives:
  - Integrar los conceptos del Corte 2 en un diseño coherente.
  - Elegir el mecanismo correcto según la relación (es-un / tiene-un / puede-hacer).
  - Diagnosticar errores de diseño típicos del corte.
---

## 1. Mapa conceptual del Corte 2

```ascii
Herencia (es-un, extends, super)
      │  habilita
Sobrescritura (@Override) ──► Polimorfismo (enlace dinámico)
Abstracción:  Clase abstracta (familia + código común)  |  Interfaz (capacidad, puede-hacer)
Composición (tiene-un, delegación)  ── favorecida sobre la herencia
```

## 2. La decisión de diseño (lo esencial del corte)

| Relación en el problema | Mecanismo | Palabra clave |
|---|---|---|
| "A **es un** B" (y respeta sustitución) | Herencia | `extends` |
| "A **tiene un** B" | Composición | atributo de tipo B |
| "A **puede hacer** X" (capacidad) | Interfaz | `implements` |
| Familia con estado y código común + método obligatorio | Clase abstracta | `abstract` + `extends` |

> tip: "Favorece la composición sobre la herencia." Usa herencia solo ante un "es-un" genuino; para capacidades transversales, interfaces; para reutilizar partes, composición.

## 3. Diseño integrador (todo junto)

```java
// tab: Jerarquía + interfaz
public abstract class Empleado {                 // es-un (familia)
    protected String nombre;
    public Empleado(String n){ this.nombre = n; }
    public abstract double salario();            // cada tipo lo calcula
}
public interface Bonificable { double bono(); }  // puede-hacer (capacidad)

public class Gerente extends Empleado implements Bonificable {
    public Gerente(String n){ super(n); }
    @Override public double salario(){ return 5_000_000; }
    @Override public double bono(){ return 1_000_000; }
}
```
```java
// tab: Composición + polimorfismo
public class Nomina {                            // tiene-un (composición)
    private final List<Empleado> empleados = new ArrayList<>();
    public void agregar(Empleado e){ empleados.add(e); }
    public double totalPagar(){
        double t = 0;
        for (Empleado e : empleados) {           // polimorfismo
            t += e.salario();
            if (e instanceof Bonificable b) t += b.bono();   // capacidad
        }
        return t;
    }
}
```

Aquí conviven **los cuatro** mecanismos: herencia (`Empleado`), abstracción (abstracta + interfaz), polimorfismo (`e.salario()`), composición (`Nomina` tiene empleados).

## 4. Errores típicos del corte

| Síntoma | Causa | Corrección |
|---|---|---|
| Herencia sin sentido | Se usó `extends` sin "es-un" | Composición o interfaz |
| "Sobrescribí" pero no cambia | Se cambió la firma (fue overload) | Firma idéntica + `@Override` |
| `ClassCastException` | Downcasting sin verificar | `instanceof` antes de castear |
| `new Abstracta()` | Instanciar clase abstracta | Instanciar una subclase concreta |
| Método de interfaz faltante | No se implementó | Implementar todo el contrato |

## Autoevaluación

```quiz
Q: "Un Cliente tiene una Dirección" se modela con...
* Composición (atributo Direccion en Cliente)
- Herencia (Cliente extends Direccion)
- Una interfaz
E: "tiene-un" es composición; no hay relación "es-un".

Q: Para una capacidad que implementan clases sin relación entre sí, usas...
* Una interfaz
- Una clase abstracta como padre común
- Un método estático
E: La interfaz modela "puede-hacer" y la implementan clases dispares.

Q: El enlace dinámico del polimorfismo elige el método según...
* El tipo real del objeto en ejecución
- El tipo de la variable en compilación
- El orden de las clases
E: Se ejecuta la versión del objeto real (dynamic dispatch).

Q: En el ejemplo, if (e instanceof Bonificable b) sirve para...
* Ejecutar bono() solo en los empleados que tienen esa capacidad
- Crear un nuevo empleado
- Heredar de Bonificable
E: Se comprueba la capacidad (interfaz) antes de usar bono().

Q: ¿Cuál es la guía central de diseño del corte?
* Elegir el mecanismo según la relación: es-un/tiene-un/puede-hacer; favorecer composición
- Usar siempre herencia
- Evitar el polimorfismo
E: Cada relación tiene su mecanismo; la composición se favorece sobre la herencia.
```

## Actividad de la semana (formativa)

Opcional y no evaluable. Versión ampliada con rúbrica en **optional-activity** (entrega por GitHub).

- Diseña un mini-sistema que use, justificadamente, herencia, una interfaz y composición; marca en el README qué relación motivó cada decisión.
