---
course: Programación y Diseño Orientado a Objetos
program: Ingeniería de Sistemas
term: 2026-B
week: 10
session: 1
corte: 2
unit: Unidad 2 · Herencia y polimorfismo
topic: Repaso del Corte 2
eyebrow: Unidad 2 · Cierre de Corte 2
lead: Cerramos el segundo corte consolidando herencia, polimorfismo, abstracción (clases abstractas e interfaces) y composición. Repaso guiado para el parcial.
objectives:
  - Repasar los conceptos clave del Corte 2.
  - Distinguir herencia, polimorfismo, abstracción y composición.
  - Detectar cuándo usar cada mecanismo.
---

## 1. Mapa del Corte 2

```ascii
Semana 6   Herencia (extends, super)
Semana 7   Polimorfismo y sobreescritura (@Override)
Semana 8   Clases abstractas e interfaces
Semana 9   Composicion y modularizacion
Semana 10  Repaso + Parcial
```

## 2. Repaso exprés

- **Herencia (es-un):** `extends`, `super(...)`, reutilizar y especializar.
- **Sobrescritura:** `@Override` redefine un método heredado (misma firma).
- **Polimorfismo:** referencia de superclase/interfaz → cada objeto responde a su manera (enlace dinámico).
- **Abstracción:** clase `abstract` (base con método abstracto) e `interface` (contrato, `implements`).
- **Composición (tiene-un):** un objeto contiene a otros y delega.

| Mecanismo | Relación | Palabra clave |
|---|---|---|
| Herencia | es-un | extends |
| Interfaz | puede-hacer | implements |
| Composición | tiene-un | atributo de otro tipo |

## 3. Decisiones de diseño

- ¿"A es un B"? → herencia. ¿"A tiene un B"? → composición.
- ¿Contrato entre clases dispares? → interfaz.
- ¿Base común con código compartido + método obligatorio? → clase abstracta.

> tip: "Favorece la composición sobre la herencia": cuando dudes, la composición suele dar un diseño más flexible.

## 4. Errores comunes

- Forzar herencia sin relación "es-un".
- Creer que sobrescribes pero cambiar la firma (en realidad sobrecargas) — usa `@Override`.
- Instanciar una clase abstracta con `new`.
- Olvidar implementar métodos de la interfaz.

## Autoevaluación

```quiz
Q: "Un Cliente tiene una Dirección" se modela con...
* Composición (atributo Direccion en Cliente)
- Herencia (Cliente extends Direccion)
- Una interfaz
E: "tiene-un" es composición; no hay relación "es-un".

Q: Para un contrato que implementen clases sin relación entre sí, usas...
* Una interfaz
- Una clase abstracta como padre común
- Un método estático
E: La interfaz define un contrato que clases dispares pueden implementar.

Q: El enlace dinámico del polimorfismo elige el método según...
* El tipo real del objeto en ejecución
- El tipo de la variable en compilación
- El nombre del archivo
E: Se ejecuta la versión del objeto real (dynamic binding).
```

## Actividad de la semana (formativa)

Opcional y no evaluable. Versión ampliada con rúbrica en **optional-activity** (entrega por GitHub).

- Repasa diseñando un mini-sistema que use herencia, una interfaz y composición.
