# Riwi To Do List

App de tareas con modo oscuro, filtros, búsqueda y persistencia via API.

## Estructura

```
to-do-list/
├── backend/           # API con json-server
│   ├── src/api.js
│   └── db.json
├── frontend/          # Interfaz de usuario
│   ├── index.html
│   ├── style.css
│   └── src/
│       ├── app.js
│       ├── dom.js
│       └── storage.js
└── docs/
    ├── api-documentation.md
    └── frontend-documentation.md
```

## Cómo ejecutar

**Opción 1 — Todo a la vez (recomendado):**

```bash
npm install
npm start:all
```

Esto levanta el backend (puerto 3001) y el frontend con Vite al mismo tiempo.

**Opción 2 — Por separado:**

Backend (API en `http://localhost:3001/todos`):

```bash
cd backend
npm install
npm run server
```

Frontend (interfaz con Vite):

```bash
cd frontend
npm install
npm run dev
```

## Funcionalidades

- Agregar, completar y eliminar tareas
- Buscar por texto
- Filtrar: todas / pendientes / completadas
- Cambiar entre tema claro y oscuro

## Documentación

En `docs/` hay documentación técnica de la API y del frontend.

## Autores

- Jose Romero
- Emmanuel Archibold
