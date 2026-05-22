# 📘 Documentación del Frontend

Este documento describe la arquitectura, el flujo de datos y los comportamientos de la capa de presentación en `frontend/`.

## Estructura del frontend

- `frontend/index.html` — página principal que carga la aplicación.
- `frontend/style.css` — estilos globales y clases del tema claro/oscuro.
- `frontend/src/app.js` — inicialización, eventos de usuario y lógica de estado.
- `frontend/src/dom.js` — renderizado del listado, filtros y tema.
- `frontend/src/storage.js` — persistencia local con `localStorage` y `sessionStorage`.
- `frontend/vite.config.js` — configuración básica de Vite para leer variables de entorno desde la raíz.

## Flujo de la aplicación

1. `frontend/index.html` carga `frontend/src/app.js` como módulo.
2. En `app.js`, la aplicación inicializa:
   - tema guardado en `localStorage`
   - filtros y búsqueda guardados en `sessionStorage`
   - lista inicial de tareas en memoria
3. El renderizado de la lista se delega a `dom.js`.
4. Los cambios de UI se guardan localmente:
   - tema: `localStorage`
   - filtro y búsqueda: `sessionStorage`
5. No hay llamadas externas al backend en el estado actual del frontend.

## Interacciones principales

- Agregar tarea:
  - Se pulsa el botón `Agregar` o `Enter`
  - Se añade un nuevo objeto `tarea` en memoria
  - Se refresca la vista con `refrescarVista()`

- Marcar tarea como completada:
  - Cada checkbox llama a `onToggle(id, completadaActual)`
  - Se invierte el estado `completed` de la tarea correspondiente
  - Se vuelve a renderizar la lista

- Eliminar tarea:
  - Cada botón `🗑️` llama a `onEliminar(id)`
  - Se filtra la tarea eliminada del arreglo en memoria
  - Se vuelve a renderizar la lista

- Filtros:
  - `Todas`, `Pendientes`, `Completadas`
  - Se guarda la selección en `sessionStorage`
  - `filtrarTareas()` aplica la lógica de filtrado

- Búsqueda:
  - El campo de búsqueda actualiza la consulta en `sessionStorage`
  - También se aplica la búsqueda sobre el título de cada tarea

- Tema:
  - El botón de tema alterna entre `light` y `dark`
  - El estado se guarda en `localStorage`

## Variables de entorno y Vite

El proyecto frontend usa Vite como servidor de desarrollo. Vite carga las variables de entorno desde la raíz del proyecto gracias a `frontend/vite.config.js`.

- Archivo `.env` en la raíz:
  ```bash
  VITE_API_URL = "http://localhost:3001/todos"
  ```
- Uso recomendado en el frontend:
  ```js
  const API_URL = import.meta.env.VITE_API_URL;
  ```

> Actualmente la aplicación del frontend no consume la API, pero esta variable está lista para la integración con el backend.

## Cómo ejecutar el frontend

Desde la raíz del proyecto:

```bash
cd frontend
npm install
npm run dev
```

O desde la raíz general si ya instalaste dependencias y configuraste `concurrently`:

```bash
npm start
```

## Estado actual y próxima integración

- El frontend está preparado para leer `VITE_API_URL`.
- La lógica actual funciona con un arreglo local `tareas`.
- Para integrar el backend, hay que reemplazar la carga y mutaciones locales por llamadas HTTP a `API_URL`.
