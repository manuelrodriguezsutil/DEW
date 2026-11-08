// Constructor de carpetas
let Carpeta = function (nombre, padre) {
    this.nombre = nombre;
    this.padre = padre;
    this.contenido = [];
    this.abierta = true;

    this.anadirContenido = function(item) {
        this.contenido.push(item);
    };

    this.eliminarItem = function(item) {
        for (let i = 0; i < this.contenido.length; i++) {
            if (item.nombre === this.contenido[i].nombre) {
                this.contenido.splice(i, 1);
                break;
            }
        }
    };

    this.existe = function(nombre) {
        return this.contenido.some(function (item) {
            return item.nombre.toLowerCase() === nombre.toLowerCase();
        });
    };

    this.estaVacia = function() {
        return this.contenido.length === 0;
    };

    this.obtenerRuta = function() {
        if (this.padre === null) return "/";
        let rutaPadre = this.padre.obtenerRuta();
        
        return (rutaPadre === "/" ? "" : rutaPadre) + "/" + this.nombre;
    };
}

// Constructor de archivos
let Archivo = function (nombre, padre) {
    this.nombre = nombre;
    this.padre = padre;
}

let raiz = new Carpeta("/", null);
// let documentos = new Carpeta("Documentos", raiz);
// raiz.anadirContenido(documentos);

// console.log(documentos.obtenerRuta());
// console.log(raiz.existe(documentos.nombre));

// Elementos HTML de la página 
const arbol = document.querySelector(".arbol");
const formularioCrear = document.querySelector("#formularioCrear");
const formularioBuscar = document.querySelector("#formularioBuscar");
const campoNombre = document.querySelector("#nombre");
const campoBuscar = document.querySelector("#buscar");
const botonLimpiar = document.querySelector("#limpiar");
const textoUbicacion = document.querySelector("#ubicacion");
const textoMensaje = document.querySelector("#mensaje");

// Estado de la página
let carpetaActual = raiz;
let textoFiltro = "";

// Función para mostrar mensajes de aviso y/o error
function mostrarMensaje(texto, esError) {
    textoMensaje.textContent = texto;
    
    let atributo;
    if (esError) {
        atributo = "error";
    } else {
        atributo = "correcto";
    }

    textoMensaje.setAttribute("class", atributo);
}

// Crea el <li> de un archivo o carpeta
// Si es una carpeta, también crea <li> para su contenido
function crearElementoArbol(item) {
    let elemento = document.createElement("li");
    let nombre = document.createElement("span");

    let esCarpeta = item.contenido !== undefined;

    if (esCarpeta) {
        nombre.className = "nombre carpeta";
    } else {
        nombre.className = "nombre archivo";
    }

    if (item === carpetaActual) {
        nombre.className += " seleccionada";
    }

    nombre.textContent = item.nombre;
    elemento.appendChild(nombre);

    if (esCarpeta) {
        nombre.addEventListener("click", function() {
            seleccionarCarpeta(item);
        });
    }

    if (esCarpeta && item.abierta) {
        let lista = document.createElement("ul");

        for (let contenido of item.contenido) {
            lista.appendChild(crearElementoArbol(contenido));
        }

        elemento.appendChild(lista);
    }

    return elemento;
}

// Vacía la lista y vuelve a pintar todo el árbol desde la raíz
function pintarArbol() {
    while (arbol.firstChild) {
        arbol.removeChild(arbol.firstChild);
    }

    arbol.appendChild(crearElementoArbol(raiz));

    textoUbicacion.textContent = "Ubicación actual: " + carpetaActual.obtenerRuta();
}

function seleccionarCarpeta(carpeta) {
    carpetaActual = carpeta;
    pintarArbol();
}

// Pintar por primera vez cuando se carga la página
pintarArbol();
