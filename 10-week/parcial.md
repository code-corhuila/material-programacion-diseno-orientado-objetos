# Parcial Práctico — Unidad 2

**Principios de diseño y modularidad**

---

## Temas Evaluados

- Herencia
- Polimorfismo
- Clases Abstractas
- Interfaces
- Composición
- Sobreescritura

---

## 1. Objetivo

Evaluar la capacidad para diseñar un **sistema modular en Java** aplicando principios de programación orientada a objetos con **código organizado por responsabilidades**.

---

## 2. Contexto del Caso

### Sistema de Envíos y Tarifas

Una empresa de envíos necesita calcular el **costo final de despachos** según el tipo de envío y aplicar reglas adicionales como **seguro y descuentos**.

> **Nota:** El sistema debe ser **extensible**, permitiendo agregar nuevos tipos de envío **sin reescribir todo el código**.

---

## 3. Requerimientos Funcionales

### 3.1 Jerarquía de Clases

**Temas:** Herencia + Clases Abstractas + Override

#### A) Clase Abstracta `Envio`

**Atributos privados:**

- `codigo` (String, único)
- `pesoKg` (double)
- `distanciaKm` (double)

**Métodos requeridos:**

- Constructor
- Getters (y setters con validación si es necesario)

**Método abstracto:**

```java
double calcularCostoBase();
```

**Método concreto:**

```java
double calcularCostoTotal();
```

Este método debe:

1. Obtener el costo base
2. Sumar extras de forma polimórfica (ver interfaces)
3. Devolver el total final

#### Clases Hijas (mínimo 3)

Cada clase debe sobrescribir `calcularCostoBase()`:

- `EnvioEstandar`
- `EnvioExpress`
- `EnvioInternacional`

> Cada clase debe implementar su propia fórmula usando peso y distancia (fórmulas coherentes y documentadas)

---

### 3.2 Interfaces (Contratos) + Polimorfismo

#### B) Interface `Asegurable`

```java
double calcularSeguro();
```

Ejemplo: basado en costo base o un valor declarado

#### C) Interface `Descontable`

```java
double calcularDescuento();
```

Ejemplo: descuento si distancia > X, peso < Y, o por tipo de envío

**Requisitos:**

- Al menos 2 clases de envío deben implementar alguna interfaz (una o ambas)
- Uso de polimorfismo real:
  - **NO usar** `if` por tipo
  - **SÍ usar** contratos (interfaces) u override

---

### 3.3 Composición (Obligatoria)

#### D) Clase `Cliente`

**Atributos:**

- `id`
- `nombre`
- `tipo` (NORMAL, FRECUENTE, EMPRESA)

#### E) Clase `OrdenEnvio`

**Atributos:**

- `Cliente cliente` (composición)
- `Envio envio` (polimorfismo)
- `fecha` (String o LocalDate)

**Método:**

```java
double total();
```

Este método:

1. Delega en `envio.calcularCostoTotal()`
2. Puede aplicar reglas adicionales según el cliente (sin romper el diseño)

---

### 3.4 Modularización

#### Estructura de Paquetes Sugerida

```
model/
├── Cliente
└── OrdenEnvio

envios/
├── Envio
├── EnvioEstandar
├── EnvioExpress
└── EnvioInternacional

contracts/
├── Asegurable
└── Descontable

app/
└── App / Main
```

**Opcional:**

```
service/
└── Gestión de registros y listados
```

---

## 4. Menú de Consola (Obligatorio)

### Opciones Mínimas

1. **Registrar cliente**
2. **Crear envío**
   - Seleccionar tipo: estándar / express / internacional
3. **Crear orden**
   - Seleccionar cliente + envío
4. **Listar órdenes** con detalle del total
5. **Listar envíos** con costo base y total
6. **Salir**

---

## 5. Validaciones (Obligatorio)

- Peso y distancia > 0
- Código de envío único
- No crear orden si no existe cliente o envío

---

## 6. Entregables

### Proyecto Completo

**Evidencia requerida** (capturas o salida en consola):

1. Crear **2 clientes**
2. Crear **3 envíos** (de distintos tipos)
3. Crear **2 órdenes** con totales correctos
4. Listado final mostrando comportamiento polimórfico

---

