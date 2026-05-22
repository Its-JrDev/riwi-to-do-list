
export function guardarTema(tema) {
  localStorage.setItem("tema", tema);
}

export function obtenerTema() {
  return localStorage.getItem("tema") || "light";
}



export function guardarFiltro(filtro) {
  sessionStorage.setItem("filtro", filtro);
}

export function obtenerFiltro() {
  return sessionStorage.getItem("filtro") || "todas";
}



export function guardarBusqueda(texto) {
  sessionStorage.setItem("busqueda", texto);
}

export function obtenerBusqueda() {
  return sessionStorage.getItem("busqueda") || "";
} 