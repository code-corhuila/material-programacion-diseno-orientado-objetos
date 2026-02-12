# Parcial Práctico — Unidad 3

**Aplicación práctica de POO**

---

## Temas Evaluados

- Excepciones
- Colecciones
- Archivos
- Buenas prácticas
- Refactorización

---

## 1. Objetivo

Evaluar la capacidad de construir una aplicación Java robusta usando:

- Manejo de excepciones
- Colecciones
- Lectura/escritura de archivos
- Buenas prácticas y refactorización

---

## 2. Contexto del Caso

### Gestor de Taller de Reparación de Instrumentos

Un taller de reparación necesita un sistema para registrar órdenes de reparación y persistirlas en archivo para no perder información al cerrar el programa.

---

## 3. Requerimientos Funcionales

### 3.1 Modelo (POO + Colecciones)

#### A) Clase `OrdenReparacion`

**Atributos privados:**

- `id` (String único, ej: OR-2026-0001)
- `cliente` (String)
- `instrumento` (String) (ej: guitarra, bajo, teclado)
- `descripcionFalla` (String)
- `estado` (enum: RECIBIDA, EN_PROCESO, LISTA, ENTREGADA)
- `costo` (double)

**Validaciones:**

- Strings no vacíos
- costo >= 0

**Métodos requeridos:**

- `toString()` claro

#### B) Clase `TallerService`

**Estructuras obligatorias:**

- `Map<String, OrdenReparacion>` para búsquedas por id
- `List<OrdenReparacion>` o consulta derivada para listados ordenados

**Métodos:**

- `registrarOrden(...)`
- `cambiarEstado(id, nuevoEstado)`
- `buscarPorId(id)`
- `listarPorEstado(estado)`
- `listarTodas()`
- `eliminarOrden(id)` (solo si estado=RECIBIDA)

---

### 3.2 Manejo de Excepciones (Obligatorio)

**Manejar correctamente:**

- Entrada inválida del menú (no numérica)
- ID no encontrado
- Errores de archivo (no existe, permisos, formato inválido)

**Excepciones personalizadas** (crear al menos 1):

- `OrdenNoEncontradaException`
- `DatosInvalidosException`

---

### 3.3 Persistencia en Archivos (Obligatorio)

**Comportamiento:**

- **Al iniciar:** cargar órdenes desde archivo
- **Al salir:** guardar todas las órdenes en archivo

**Formato permitido:**

- CSV simple o TXT con separador (recomendado)
- JSON manual (opcional, sin librerías externas)

**Requisitos:**

1. Si el archivo no existe, el programa debe iniciar con lista vacía (sin fallar)
2. Si una línea está corrupta, el programa debe:
   - Ignorarla con mensaje, o
   - Detener carga con error controlado (sin explotar)

---

### 3.4 Buenas Prácticas + Refactorización (Obligatorio)

**Aplicar mínimo 4 mejoras:**

- Renombrar variables/métodos con intención
- Extraer métodos (menú, lectura, validación, guardado)
- Reemplazar números mágicos por constantes
- Separar responsabilidades en paquetes (model/service/persistence/app)
- Reducir duplicación
- Validación centralizada

**Evidencia mínima:**

> Archivo `README.md` con lista de 4 refactors aplicados (antes/después explicado en 1-2 líneas cada uno)

---

## 4. Menú de Consola (Obligatorio)

### Opciones del Menú

1. Registrar orden
2. Cambiar estado
3. Buscar por id
4. Listar todas
5. Listar por estado
6. Eliminar orden (según regla)
7. Guardar manualmente (opcional)
8. Salir (guardando)

---

## 5. Entregables

### Archivos Requeridos

1. **Proyecto Java completo**
2. **Archivo de datos generado** (ej: `ordenes.csv`)
3. **README.md** que incluya:
   - Cómo ejecutar
   - Formato del archivo
   - 4 refactors aplicados

### Evidencia en Consola

Demostrar:

- Crear 2 órdenes
- Cambiar estado de una
- Listar por estado
- Cerrar y volver a abrir (debe cargar del archivo)

---


