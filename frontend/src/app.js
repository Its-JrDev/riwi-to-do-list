import { renderTareas, aplicarTema, marcarFiltroActivo, filtrarTareas } from "./dom.js";
import {
  guardarTema, obtenerTema,
  guardarFiltro, obtenerFiltro,
  guardarBusqueda, obtenerBusqueda
} from "./storage.js";



let tareas = [];
let contadorId = 1;

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
  btnTema.textContent = temaGuardado === "dark" ? "☀️" : "🌙";

  
  buscador.value = obtenerBusqueda();

  try {
    
    tareas = [
      { id: "1", title: "Configurar la estructura híbrida", completed: true },
      { id: "2", title: "Sincronizar sessionStorage con los filtros del DOM", completed: false }
    ];
    contadorId = tareas.length + 1;

    refrescarVista();

  } catch (err) {
    console.error("Error al cargar:", err.message);
    document.getElementById("lista-tareas").innerHTML =
      '<li class="sin-tareas">⚠️ Error al cargar las tareas</li>';
  }
}

initApp();



btnAgregar.addEventListener("click", async () => {
  const titulo = inputTarea.value.trim();
  if (!titulo) return;

  try {
    
    tareas.push({ id: String(contadorId++), title: titulo, completed: false });
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
  btnTema.textContent = nuevo === "dark" ? "☀️" : "🌙";
});



async function onToggle(id, completadaActual) {
  try {
    
    const tarea = tareas.find((t) => t.id === id);
    if (tarea) tarea.completed = !completadaActual;
    refrescarVista();
  } catch (err) {
    console.error("Error al actualizar:", err.message);
  }
}

async function onEliminar(id) {
  try {
    
    tareas = tareas.filter((t) => t.id !== id);
    refrescarVista();
  } catch (err) {
    console.error("Error al eliminar:", err.message);
  }
} 