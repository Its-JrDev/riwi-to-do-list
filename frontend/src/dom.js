const lista = document.getElementById("lista-tareas");


export function renderTareas(tareas, onToggle, onEliminar) {
  lista.innerHTML = "";

  if (tareas.length === 0) {
    lista.innerHTML = '<li class="sin-tareas">No hay tareas 😴</li>';
    return;
  }

  tareas.forEach((tarea) => {
    const li = document.createElement("li");
    li.classList.add("tarea-item");

    if (tarea.completed) {
      li.classList.add("completada");
    }

    li.innerHTML = `
      <input type="checkbox" ${tarea.completed ? "checked" : ""} />
      <span>${tarea.title}</span>
      <button class="btn-eliminar">🗑️</button>
    `;

    li.querySelector("input").addEventListener("change", () => {
      onToggle(tarea.id, tarea.completed);
    });

    li.querySelector(".btn-eliminar").addEventListener("click", () => {
      onEliminar(tarea.id);
    });

    lista.appendChild(li);
  });
}


export function aplicarTema(tema) {
  if (tema === "dark") {
    document.body.classList.add("dark-theme");
  } else {
    document.body.classList.remove("dark-theme");
  }
}


export function marcarFiltroActivo(filtro) {
  document.querySelectorAll(".btn-filtro").forEach((btn) => {
    if (btn.dataset.filtro === filtro) {
      btn.classList.add("activo");
    } else {
      btn.classList.remove("activo");
    }
  });
}


export function filtrarTareas(tareas, filtro, busqueda) {
  let resultado = tareas;

  if (filtro === "pendientes") {
    resultado = resultado.filter((t) => !t.completed);
  } else if (filtro === "completadas") {
    resultado = resultado.filter((t) => t.completed);
  }

  if (busqueda.trim() !== "") {
    const termino = busqueda.toLowerCase();
    resultado = resultado.filter((t) =>
      t.title.toLowerCase().includes(termino)
    );
  }

  return resultado;
} 