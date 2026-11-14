// Constructor de carpetas
let Carpeta = function (nombre, padre) {
    this.nombre = nombre;
    this.padre = padre;
    this.contenido = [];
    this.abierta = true;

    // Añade un archivo o carpeta dentro de esta carpeta
    this.anadirContenido = function (item) {
        this.contenido.push(item);
    };

    // Quita del contenido el elemento con el mismo nombre
    this.eliminarItem = function (item) {
        for (let i = 0; i < this.contenido.length; i++) {
            if (item.nombre === this.contenido[i].nombre) {
                this.contenido.splice(i, 1);
                break;
            }
        }
    };

    // Comprueba si ya hay algo con ese nombre
    this.existe = function (nombre) {
        return this.contenido.some(function (item) {
            return item.nombre.toLowerCase() === nombre.toLowerCase();
        });
    };

    // Una carpeta está vacía si no tiene ningún elemento dentro
    this.estaVacia = function () {
        return this.contenido.length === 0;
    };

    // Construye la ruta completa subiendo por los padres hasta la raíz
    this.obtenerRuta = function () {
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

// La raíz es la única carpeta sin padre
let raiz = new Carpeta("/", null);

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

    // Solo las carpetas tienen la propiedad "contenido"
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

    // La raíz no se puede borrar, así que no lleva "X"
    if (item !== raiz) {
        elemento.appendChild(crearBoton("X", "borrar", "Eliminar", () => borrarItem(item)));
    }

    elemento.appendChild(nombre);

    if (esCarpeta) {
        nombre.addEventListener("click", function () {
            seleccionarCarpeta(item);
        });

        elemento.appendChild(crearBoton("+", "anadir", "Añadir archivo o carpeta aquí", () => {
            seleccionarCarpeta(item);
            campoNombre.focus();
        }));
        elemento.appendChild(crearCasilla(item));
    }

    // Solo se pinta el contenido si la carpeta está abierta (y pasa el filtro)
    if (esCarpeta && item.abierta) {
        let lista = document.createElement("ul");

        for (let contenido of item.contenido.filter(item => aplicarFiltro(item))) {
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

// Marca una carpeta como la ubicación actual y repinta
function seleccionarCarpeta(carpeta) {
    carpetaActual = carpeta;
    pintarArbol();
}

// Archivo: "nombre.ext" (puede haber varios puntos, pero ninguno al principio ni al final)
function tieneExtension(nombre) {
    let regex = new RegExp("^[^./\\\\]+(\\.[^./\\\\]+)+$");
    return regex.test(nombre);
}

// Crea un archivo o carpeta en la ubicación actual al enviar el formulario
function crearItem(e) {
    e.preventDefault();

    let nombre = campoNombre.value.trim();

    // Validaciones: vacío, caracteres no permitidos y duplicados
    if (nombre === "" || /[\/\\]/.test(nombre)) {
        mostrarMensaje("Nombre no válido (vacío o con / \\)", true);
        return;
    }
    if (nombre.includes(".") && !tieneExtension(nombre)) {
        mostrarMensaje("Un archivo debe ser nombre.extensión; una carpeta no lleva puntos", true);
        return;
    }
    if (carpetaActual.existe(nombre)) {
        mostrarMensaje(`"${nombre}" ya existe en ${carpetaActual.obtenerRuta()}`, true);
        return;
    }

    // Si tiene extensión es un archivo, si no es una carpeta
    let item;
    if (tieneExtension(nombre)) {
        item = new Archivo(nombre, carpetaActual);
    } else {
        item = new Carpeta(nombre, carpetaActual);
    }

    carpetaActual.anadirContenido(item);
    carpetaActual.abierta = true;
    campoNombre.value = "";

    mostrarMensaje(`"${nombre}" creado en ${carpetaActual.obtenerRuta()}`, false);

    pintarArbol();
}

formularioCrear.addEventListener("submit", crearItem);

// Crea un <button> con su texto, clase, ayuda y la acción que hará al pulsarlo
function crearBoton(texto, clase, ayuda, accionAlPulsar) {
    let boton = document.createElement("button");

    boton.setAttribute("type", "button");
    boton.setAttribute("class", clase);
    boton.setAttribute("title", ayuda);

    boton.textContent = texto;

    boton.addEventListener("click", accionAlPulsar);

    return boton;
}

// Crea la casilla que abre o cierra una carpeta
function crearCasilla(carpeta) {
    let casilla = document.createElement("input");

    casilla.setAttribute("type", "checkbox");
    casilla.setAttribute("title", "Mostrar u ocultar el contenido");

    casilla.checked = carpeta.abierta;

    casilla.addEventListener("click", () => {
        carpeta.abierta = casilla.checked;
        pintarArbol();
    });

    return casilla;
}

// Elimina un archivo o carpeta vacía de su carpeta padre
function borrarItem(item) {
    let padre = item.padre;
    let indice = padre.contenido.indexOf(item);

    // No se puede borrar una carpeta que tenga contenido
    if (item.contenido !== undefined && !item.estaVacia()) {
        mostrarMensaje(`La carpeta "${item.nombre}" no está vacía`, true);
        return;
    }

    if (indice != -1) {
        padre.contenido.splice(indice, 1);
        // Si se borra la carpeta seleccionada, la ubicación vuelve al padre
        if (carpetaActual === item) {
            carpetaActual = padre;
        }
        mostrarMensaje(`"${item.nombre}" eliminado`, false);

        pintarArbol();
    }
}

// Un elemento se muestra si coincide su nombre o si algún descendiente coincide
function aplicarFiltro(item) {
    if (textoFiltro === "") {
        return true;
    }

    if (item.nombre.toLowerCase().includes(textoFiltro)) {
        return true;
    }

    return item.contenido !== undefined && item.contenido.some(aplicarFiltro);
}

// Devuelve los nombres de todos los elementos del árbol que coinciden con el filtro
function buscarCoincidencias(carpeta) {
    let nombres = [];

    for (let item of carpeta.contenido) {
        if (item.nombre.toLowerCase().includes(textoFiltro)) {
            nombres.push(item.nombre);
        }
        if (item.contenido !== undefined) {
            nombres = nombres.concat(buscarCoincidencias(item));
        }
    }

    return nombres;
}

// Teclado: al escribir se filtra el árbol
campoBuscar.addEventListener("keyup", function () {
    textoFiltro = campoBuscar.value.trim().toLowerCase();
    pintarArbol();
});

// Teclado: TAB autocompleta solo si hay una única coincidencia
campoBuscar.addEventListener("keydown", function (e) {
    if (e.key !== "Tab" || textoFiltro === "") {
        return;
    }

    let coincidencias = buscarCoincidencias(raiz);
    if (coincidencias.length === 1) {
        e.preventDefault();
        campoBuscar.value = coincidencias[0];
        textoFiltro = coincidencias[0].toLowerCase();
        pintarArbol();
    }
});

// Evita que Enter recargue la página
formularioBuscar.addEventListener("submit", function (e) {
    e.preventDefault();
});

// Botón limpiar: borra el texto de búsqueda y muestra todo el árbol
botonLimpiar.addEventListener("click", function () {
    campoBuscar.value = "";
    textoFiltro = "";
    pintarArbol();
});

// Pintar por primera vez cuando se carga la página
pintarArbol();