# Riwi To Do List

Una aplicación sencilla de lista de tareas con UI moderna, filtros, tema oscuro/claro y persistencia local en el frontend. El proyecto combina una interfaz estática en `frontend/` con un backend de simulación en `backend/` usando `json-server`.

## Estructura del repositorio

- `frontend/`
  - `index.html`: página principal de la aplicación.
  - `style.css`: estilos visuales.
  - `src/`: lógica del frontend, gestión de DOM y almacenamiento.
- `backend/`
  - `db.json`: datos mock de tareas.
  - `package.json`: configuración de `json-server`.
- `docs/`
  - `api-documentation.md`: documentación de la API y la arquitectura de datos.
  - `frontend-documentation.md`: documentación del frontend, flujo de UI y configuración de Vite.

## Características principales

- Agregar nuevas tareas.
- Marcar tareas como completadas.
- Eliminar tareas.
- Buscar tareas por texto.
- Filtrar tareas: todas / pendientes / completadas.
- Alternar tema claro / oscuro.

## Cómo ejecutar el proyecto

### Backend mock

1. Navega al directorio del backend:
   ```bash
   cd backend
   ```
2. Instala dependencias:
   ```bash
   npm install
   ```
3. Inicia el servidor mock:
   ```bash
   npm run server
   ```
4. La API quedará disponible en:
   ```
   http://localhost:3001/todos
   ```

### Frontend

El frontend usa Vite y también puede servirse como aplicación estática.
Puedes abrir `frontend/index.html` directamente en el navegador o servir el directorio `frontend/` con un servidor local.

> Nota: el frontend puede usar `import.meta.env.VITE_API_URL` desde `.env` para la URL de la API.

## Documentación adicional

- Revisa `docs/api-documentation.md` para la API y la arquitectura de datos.
- Revisa `docs/frontend-documentation.md` para la arquitectura del frontend, flujo de tareas y configuración de Vite.

## Notas de desarrollo

- El frontend se conecta a la API mock si el backend está activo.
- En el estado actual, la lista inicial de tareas también se define en el frontend.
- Si deseas extender la integración, revisa `docs/api-documentation.md` para comprender cómo funcionan los endpoints.

## Contribuidores

- Jose Romero
- Emmanuel Archibold

## Licencia

Este repositorio no incluye una licencia explícita. Añade una si deseas compartirlo con otras personas.
