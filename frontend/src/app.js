import { renderTareas, aplicarTema, marcarFiltroActivo, filtrarTareas } from "./dom.js";
import {
  guardarTema, obtenerTema,
  guardarFiltro, obtenerFiltro,
  guardarBusqueda, obtenerBusqueda
} from "./storage.js";
import { getTodos, addTodo, toggleTodoStatus, deleteTodo } from "../../backend/src/api.js";



let tareas = [];

const inputTarea = document.getElementById("input-tarea");
const btnAgregar = document.getElementById("btn-agregar");
const buscador   = document.getElementById("buscador");
const btnTema    = document.getElementById("btn-tema");
const btnsFiltro = document.querySelectorAll(".btn-filtro");

function refrescarVista() {
  const filtro    = obtenerFiltro();
  const busqueda  = obtenerBusqueda();
  const filtradas = filtrarTareas(tareas, filtro, busqueda);
  renderTareas(filtradas, onToggle, onEliminar);
  marcarFiltroActivo(filtro);
}



async function initApp() {

  
  const temaGuardado = obtenerTema();
  aplicarTema(temaGuardado);
  btnTema.innerHTML = temaGuardado === "dark"
    ? '<span class="material-symbols-outlined">light_mode</span>'
    : '<span class="material-symbols-outlined">dark_mode</span>';

  
  buscador.value = obtenerBusqueda();

  try {
    tareas = await getTodos();
    refrescarVista();

  } catch (err) {
    console.error("Error al cargar:", err.message);
    document.getElementById("lista-tareas").innerHTML =
      '<li class="sin-tareas"><span class="material-symbols-outlined">warning</span> Error al cargar las tareas</li>';
  }
}

initApp();



btnAgregar.addEventListener("click", async () => {
  const titulo = inputTarea.value.trim();
  if (!titulo) return;

  try {
    const nuevaTarea = await addTodo(titulo);
    tareas.push(nuevaTarea);
    inputTarea.value = "";
    refrescarVista();
  } catch (err) {
    console.error("Error al agregar:", err.message);
  }
});

inputTarea.addEventListener("keydown", (e) => {
  if (e.key === "Enter") btnAgregar.click();
});

buscador.addEventListener("input", () => {
  guardarBusqueda(buscador.value);
  refrescarVista();
});

btnsFiltro.forEach((btn) => {
  btn.addEventListener("click", () => {
    guardarFiltro(btn.dataset.filtro);
    refrescarVista();
  });
});

btnTema.addEventListener("click", () => {
  const actual = obtenerTema();
  const nuevo  = actual === "light" ? "dark" : "light";
  guardarTema(nuevo);
  aplicarTema(nuevo);
  btnTema.innerHTML = nuevo === "dark"
    ? '<span class="material-symbols-outlined">light_mode</span>'
    : '<span class="material-symbols-outlined">dark_mode</span>';
});



async function onToggle(id, completadaActual) {
  try {
    const tareaActualizada = await toggleTodoStatus(id, completadaActual);
    const index = tareas.findIndex((t) => t.id === id);
    if (index !== -1) tareas[index] = tareaActualizada;
    refrescarVista();
  } catch (err) {
    console.error("Error al actualizar:", err.message);
  }
}

async function onEliminar(id) {
  try {
    await deleteTodo(id);
    tareas = tareas.filter((t) => t.id !== id);
    refrescarVista();
  } catch (err) {
    console.error("Error al eliminar:", err.message);
  }
} 