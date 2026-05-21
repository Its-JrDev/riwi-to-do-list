const API_URL = import.meta.env.VITE_API_URL;



export async function getTodos() {
    try {
        const response = await fetch(API_URL);
        if (!response.ok) {
            throw new Error('Error al obtener las tareas')
        }
        return await response.json();
    }   catch (error) {
        console.error('Error: ', error)
        throw error
    } 
}



export async function addTodo(title) {
    try {
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                title: title,
                completed: false
            })
        });

        if (!response.ok) {
            throw new Error('Error al guardar la tarea');
        }
        return await response.json();
    } catch (error) {
        console.error('Error: ', error)
        throw error
    }
}



export async function toggleTodoStatus(id, currentStatus) {
    try {
        const response = await fetch(`${API_URL}/${id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                completed: !currentStatus
            })
        });

        if (!response.ok) {
            throw new Error('Error al cambiar el estado de la tarea')
        }
        return await response.json();
    } catch (error) {
        console.error('Error: ', error)
        throw error
    }
}



export async function deleteTodo(id) {
    try {
        const response = await fetch(`${API_URL}/${id}`, {
            method: 'DELETE'
        });
        if (!response.ok) {
            throw new Error('Error al eliminar la tarea')
        }
        return true
    } catch (error) {
        console.error('Error: ', error)
        throw error
    }
}