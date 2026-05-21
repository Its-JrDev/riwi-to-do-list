# 📋 Plan de Trabajo y División de Roles: Reto "Workspace Inteligente + API REST"

Para resolver con éxito este reto de arquitectura híbrida, el trabajo se dividirá estratégicamente entre **2 desarrolladores**. Esta división permite trabajar en paralelo, reduce los conflictos de código (merge conflicts) y asegura que se cumplan estrictamente los requisitos de la fuente de verdad y persistencia.

---

## 👥 Asignación de Roles

* **Desarrollador A:** Capa de Datos, API REST y Conectividad (Back-End / Servicios).
* **Desarrollador B:** Interfaz de Usuario (DOM), Eventos y Gestión de Almacenamiento Local (Front-End / Local Storage).

---

## 🛠️ Desglose Detallado de Tareas

### 👤 Desarrollador A: Capa de Datos y Sincronización con el Servidor
Su objetivo es garantizar la persistencia global del negocio y aislar la lógica de comunicación con el servidor (`json-server`).

1. **Configuración del Entorno Mock (Backend)**
   * Crear el archivo `db.json` en la raíz con la estructura inicial de `todos` provista en el reto.
   * Levantar el servicio local mediante: `npx json-server db.json --port 3000`.
   * Validar los endpoints (`http://localhost:3000/todos`) usando herramientas como Postman, Thunder Client o cURL.

2. **Desarrollo del Módulo de API (`src/api.js`)**
   * Crear funciones asíncronas utilizando `fetch` y la sintaxis `async/await` para gestionar el CRUD completo:
     * `getTodos()`: Petición **GET** para traer todas las tareas.
     * `addTodo(title)`: Petición **POST** para guardar una nueva tarea (con `completed: false` por defecto).
     * `toggleTodoStatus(id, currentStatus)`: Petición **PATCH** para cambiar el estado de `completed`.
     * `deleteTodo(id)`: Petición **DELETE** para remover la tarea de forma permanente del servidor.
   * **Restricción Clave:** Ninguna de estas funciones debe interactuar con el DOM ni con los Storages del navegador; deben retornar datos puros (`Promises`).

---

### 👤 Desarrollador B: Interfaz de Usuario y Persistencia Local
Su objetivo es la maquetación estética de la aplicación, el ciclo de vida de los elementos en el navegador y el mantenimiento de las preferencias de sesión del usuario.

1. **Maquetación Base y Estilos (`index.html` y `styles.css`)**
   * Crear el contenedor principal, el formulario de inserción, la lista `<ul>` para las tareas, el buscador en tiempo real y los botones de filtro (*Todas*, *Pendientes*, *Completadas*).
   * Definir los estilos CSS del **Modo Oscuro** (añadiendo o removiendo una clase como `.dark-theme` al `body`).

2. **Módulo de Gestión de Almacenamiento (`src/storage.js`)**
   * **Modo Oscuro (Uso de `localStorage`):** Crear funciones para guardar y recuperar el estado estético preferido. Debe sobrevivir al cierre del navegador.
   * **Filtros y Búsqueda (Uso de `sessionStorage`):** Crear funciones para persistir el último botón de filtro seleccionado y el texto escrito en el buscador. Debe limpiarse si se cierra la pestaña.

3. **Lógica de Renderizado y Filtros combinados en el DOM**
   * Desarrollar la función `renderTodos(todosArray)` que limpie el listado actual e inserte dinámicamente las tareas.
   * Aplicar las reglas de filtrado secuencial (Primero filtrar por tipo de estado de `sessionStorage` y luego sub-filtrar por coincidencias con el input de búsqueda de `sessionStorage`) antes de pintar en pantalla.

---

## 🔄 Contrato de Integración (El punto de unión: `src/app.js`)

Para unir el trabajo de ambos desarrolladores de forma limpia, se utilizará un archivo coordinador (`app.js`). El flujo lógico e interactivo se estructurará de la siguiente manera:

### 1. Ciclo de Inicialización (Al cargar la página)
* **Paso 1 (Dev B):** Lee `localStorage` para aplicar o no el Modo Oscuro.
* **Paso 2 (Dev B):** Lee `sessionStorage` para restaurar visualmente el texto en el buscador y el botón de filtro que estaba activo.
* **Paso 3 (Dev A + Dev B):** Se invoca a `getTodos()` del Desarrollador A. Cuando la promesa se resuelve con el array de tareas del servidor, el Desarrollador B toma esos datos, ejecuta la función de filtrado con los valores recuperados del `sessionStorage` y renderiza el DOM.

### 2. Flujo de Operaciones e Impacto Arquitectónico

| Acción en la UI | Responsabilidad Dev B (UI) | Responsabilidad Dev A (API) | Sincronización Final |
| :--- | :--- | :--- | :--- |
| **Agregar Tarea** | Captura evento `submit`, valida que no esté vacío. | Envía el **POST** asíncrono con el título al servidor. | Al confirmar éxito, se refresca la lista llamando a `getTodos()` y se vuelve a renderizar. Se limpia el input. |
| **Escribir en Buscador** | Captura evento `input`, guarda el texto en `sessionStorage`. | *No interviene.* | Se ejecuta el filtrado local inmediato sobre el array en memoria y se actualiza el DOM (Sin peticiones HTTP extra). |
| **Cambiar Filtro** | Captura evento `click`, actualiza la clase activa y guarda el filtro en `sessionStorage`. | *No interviene.* | Se aplica el nuevo filtro localmente sobre los datos y se re-renderiza la UI. |
| **Marcar Completada** | Detecta el clic mediante delegación de eventos en la lista, obtiene el `id`. | Envía petición **PATCH** modificando únicamente la propiedad `completed`. | El servidor actualiza el archivo `db.json`, se actualiza el estado local y se re-renderiza el DOM. |
| **Eliminar Tarea** | Detecta el clic en el botón de borrar, obtiene el `id` del elemento. | Envía petición **DELETE** al endpoint específico. | Se remueve el elemento de la UI una vez el servidor confirma que fue eliminado con éxito. |

---

## 📅 Cronograma y Recomendaciones de Trabajo

1. **Sesión Inicial (30 min): Conexión previa.** Ambos deben acordar los nombres de los IDs que se usarán en el HTML y la firma de los métodos del objeto API (ej: saber que `api.getTodos()` devolverá una Promesa que resuelve a un Array).
2. **Desarrollo Autónomo (2 - 3 horas):** Cada desarrollador trabaja en sus módulos independientes (`api.js` y `storage.js`). El Desarrollador B puede usar datos falsos en un array provisional (*mock*) para probar sus filtros mientras el Desarrollador A termina el módulo de comunicación.
3. **Fase de Acoplamiento (1 hora):** Se construye el archivo `app.js` uniendo los eventos del DOM con las promesas de la API. Se valida que al recargar la página (`F5`), el filtro y la búsqueda se mantengan intactos gracias al `sessionStorage`, el tema visual gracias al `localStorage`, y las tareas se carguen actualizadas directamente desde el `db.json`.
