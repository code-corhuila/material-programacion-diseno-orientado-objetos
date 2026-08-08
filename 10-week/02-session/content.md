---
course: Programación y Diseño Orientado a Objetos
program: Ingeniería de Sistemas
term: 2026-B
week: 10
session: 2
corte: 2
unit: Unidad 2 · Herencia y polimorfismo
topic: Práctica guiada tipo parcial (Corte 2)
eyebrow: Unidad 2 · Cierre de Corte 2
lead: Resolvemos, con el formato del parcial, un ejercicio de diseño que integra herencia, abstracción, interfaces, polimorfismo y composición. El objetivo es fijar un método: identificar relaciones, elegir el mecanismo y verificar.
objectives:
  - Aplicar un método para diseñar con los mecanismos del Corte 2.
  - Combinar jerarquía, interfaz, polimorfismo y composición en un caso.
  - Autoevaluar la preparación para el parcial.
---

## 1. Método (identificar relaciones → elegir mecanismo)

1. Lista las entidades y sus **relaciones**: ¿es-un? ¿tiene-un? ¿puede-hacer?
2. Traduce cada relación al mecanismo (herencia / composición / interfaz / abstracta).
3. Sobrescribe lo que varíe (`@Override`), procesa por la superclase/interfaz (polimorfismo).
4. Verifica con casos y con la sustitución.

## 2. Enunciado guiado

> **Enunciado.** Modela una biblioteca de **medios** reproducibles. Hay `Cancion` y `Video`; ambos son medios (tienen duración) y son *reproducibles*. Una `Playlist` contiene medios y calcula la duración total.

**Paso 1 — abstracción (familia):**

```java
// tab: Paso 1
public abstract class Medio {          // es-un: familia con código común
    protected String titulo;
    public Medio(String t){ titulo = t; }
    public abstract int duracion();    // cada tipo la define (segundos)
    public String getTitulo(){ return titulo; }
}
```

**Paso 2 — capacidad (interfaz):**

```java
// tab: Paso 2
public interface Reproducible { void reproducir(); }   // puede-hacer
```

**Paso 3 — subclases (herencia + interfaz + sobrescritura):**

```java
// tab: Paso 3
public class Cancion extends Medio implements Reproducible {
    private int seg;
    public Cancion(String t, int seg){ super(t); this.seg = seg; }
    @Override public int duracion(){ return seg; }
    @Override public void reproducir(){ System.out.println("♪ " + titulo); }
}
```

**Paso 4 — composición + polimorfismo:**

```java
// tab: Paso 4
public class Playlist {                 // tiene-un: contiene medios
    private final List<Medio> medios = new ArrayList<>();
    public void agregar(Medio m){ medios.add(m); }
    public int duracionTotal(){
        int t = 0;
        for (Medio m : medios) t += m.duracion();   // polimorfismo
        return t;
    }
}
```

## 3. Errores más penalizados

- Usar herencia donde era composición (una Playlist **no es** un Medio; **tiene** medios).
- Cambiar la firma creyendo sobrescribir (usar `@Override`).
- Instanciar `new Medio()` (es abstracta).
- No implementar todo el contrato de la interfaz.

> tip: En el parcial, dibuja primero las relaciones (es-un/tiene-un/puede-hacer). El diseño correcto vale más que la cantidad de código.

## 4. Lista de verificación

- [ ] Clase abstracta con método abstracto implementado en subclases.
- [ ] Al menos una interfaz implementada (capacidad).
- [ ] Sobrescritura con `@Override`.
- [ ] Composición donde corresponde (Playlist tiene Medios).
- [ ] Uso polimórfico (recorrer `List<Medio>`).

## Autoevaluación

```quiz
Q: ¿Playlist debe heredar de Medio?
* No: una Playlist TIENE medios (composición), no ES un medio
- Sí, con extends
- Solo si implementa Reproducible
E: La relación es "tiene-un" → composición, no herencia.

Q: ¿Por qué Medio es abstracta?
* Representa una familia general que no se instancia; cada tipo define su duración
- Para que sea más rápida
- Para no usar interfaces
E: Un "medio" genérico no existe; se instancian Cancion/Video (subclases concretas).

Q: duracionTotal() suma m.duracion() recorriendo List<Medio>. Esto es...
* Polimorfismo: cada medio aporta su propia duración
- Sobrecarga
- Encapsulamiento
E: El enlace dinámico llama la duracion() del tipo real de cada medio.

Q: Reproducible en el diseño representa...
* Una capacidad ("puede-hacer") implementada por las clases de medio
- La superclase de Medio
- Un atributo
E: La interfaz modela la capacidad de reproducirse.

Q: ¿Qué conviene hacer primero al resolver el ejercicio?
* Identificar las relaciones (es-un/tiene-un/puede-hacer) y elegir el mecanismo
- Escribir el main sin diseñar
- Copiar un ejercicio anterior
E: Modelar las relaciones guía qué mecanismo de POO aplicar.
```

## Actividad de la semana (formativa)

Opcional y no evaluable. Versión ampliada con rúbrica en **optional-activity** (entrega por GitHub).

- Completa el sistema de `Medio`/`Playlist` (con `Video`), reproduce polimórficamente e informa la duración total.
