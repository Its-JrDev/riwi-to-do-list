# 📑 Documentación de la Capa de Datos y API REST (Desarrollador A)

Este directorio contiene la documentación técnica de la arquitectura de datos del backend, la configuración del Servidor Mock y las especificaciones del módulo de comunicación asíncrona (`src/api.js`).

Esta capa actúa como la **única fuente de verdad** de la aplicación. Aísla todos los efectos secundarios de la red, gestiona el estado persistente global y retorna estrictamente estructuras de datos puras (`Promises`) sin interactuar jamás con el DOM ni con los sistemas de almacenamiento del navegador (*storages*).

---

## 🚀 1. Configuración del Servidor Mock (`json-server`)

El backend utiliza `json-server` para emular una API REST completamente funcional de manera local. Modifica automáticamente un archivo JSON en el disco duro cada vez que recibe mutaciones de escritura (`POST`, `PATCH`, `DELETE`).

### Prerrequisitos
Asegúrate de tener instalado [Node.js](https://nodejs.org).

### Instalación y Ejecución
1. Desde la raíz del proyecto, instala las dependencias necesarias:
   ```bash
   npm install
   ```
2. Inicia el servidor local ejecutando el script personalizado:
   ```bash
   npm run server
   ```
   *La API estará disponible y escuchando en:* `http://localhost:3000/todos`

### Esquema de la Base de Datos (`db.json`)
La base de datos mock se inicializa con el siguiente plano estructural básico:
```json
{
  "todos": [
    {
      "id": "1",
      "title": "Configurar el entorno del proyecto",
      "completed": true
    },
    {
      "id": "2",
      "title": "Implementar filtros combinados en la UI",
      "completed": false
    }
  ]
}
```

---

## 🌐 2. Variables de Entorno (`.env`)

Para desacoplar las URLs del servidor de los scripts del cliente y asegurar un código limpio, el sistema depende de configuraciones de entorno. Según la arquitectura final elegida por el Desarrollador B, selecciona una de estas opciones:

* **Configuración con Vite (Recomendada):**
  * Variable en archivo `.env`: `VITE_API_URL=http://localhost:3000/todos`
  * Acceso en código: `import.meta.env.VITE_API_URL`
* **Configuración con JavaScript Nativo/Vanilla:**
  * Declaración directa al inicio del módulo: `const API_URL = 'http://localhost:3000/todos';`

---

## 🛠️ 3. Especificación del Módulo de API (`src/api.js`)

Todos los métodos de la API asíncrona se exportan como módulos independientes de ES (EcmaScript).

> ⚠️ **Restricción de Integración Obligatoria:** Cada función listada abajo lanza excepciones nativas de JavaScript si la respuesta del servidor no es exitosa (`!response.ok`). El Desarrollador B **debe** envolver todas las invocaciones dentro de bloques estructurales `try/catch` (o encadenar promesas con `.catch()`) a nivel de interfaz para manejar visualmente los estados de error.

### `getTodos()`
Obtiene la colección completa de tareas guardadas actualmente en el servidor.
* **Método HTTP:** `GET`
* **Argumentos:** Ninguno
* **Retorna:** `Promise<Array<Object>>`
* **Ejemplo de Respuesta Resuelta:**
  ```javascript
  [
    { "id": "1", "title": "Tarea A", "completed": false },
    { "id": "2", "title": "Tarea B", "completed": true }
  ]
  ```

### `addTodo(title)`
Envía una petición para guardar un nuevo registro de tarea. El servidor asigna la propiedad `completed: false` por defecto de forma automática.
* **Método HTTP:** `POST`
* **Argumentos:** 
  * `title` *(string)*: El texto descriptivo o título de la nueva tarea.
* **Retorna:** `Promise<Object>`
* **Ejemplo de Respuesta Resuelta:**
  ```javascript
  {
    "id": "3",
    "title": "Tarea C",
    "completed": false
  }
  ```

### `toggleTodoStatus(id, currentStatus)`
Realiza una actualización parcial de la estructura (*PATCH*), invirtiendo de manera segura el valor booleano de `completed` mediante una negación lógica (`!currentStatus`).
* **Método HTTP:** `PATCH`
* **Argumentos:**
  * `id` *(string|number)*: Identificador único del registro en la base de datos.
  * `currentStatus` *(boolean)*: Estado booleano actual leído desde el elemento checkbox del DOM.
* **Retorna:** `Promise<Object>` (El objeto completo modificado y devuelto por el servidor)
* **Ejemplo de Respuesta Resuelta:**
  ```javascript
  {
    "id": "1",
    "title": "Tarea A",
    "completed": true
  }
  ```

### `deleteTodo(id)`
Instruye al motor de la base de datos remota para eliminar permanentemente el registro especificado.
* **Método HTTP:** `DELETE`
* **Argumentos:**
  * `id` *(string|number)*: ID del elemento objetivo a borrar.
* **Retorna:** `Promise<boolean>` (Resuelve en `true` al confirmar el éxito de la operación)

---

## 🤝 4. Plantilla Rápida de Integración para el Desarrollador B

Este es un ejemplo genérico que demuestra cómo el desarrollador de UI (Dev B) debe enganchar los manejadores de eventos del navegador a las promesas de la API:

```javascript
import { getTodos } from './src/api.js';

// Carga en el ciclo de vida inicial de la página
async function initApp() {
    try {
        const datos = await getTodos();
        // El Dev B toma los datos puros y los inyecta en la interfaz:
        // renderTodos(datos);
    } catch (err) {
        // Renderizar un mensaje visual de error en el HTML
        console.error("Error de Integración en UI:", err.message);
    }
}
```
