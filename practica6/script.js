let Carpeta = function (nombre, padre) {
    this.nombre = nombre;
    this.padre = padre;
    this.contenido = [];

    this.anadirContenido = function (item) {
        this.contenido.push(item);
    }

    this.eliminarItem = function (item) {
        for (let i = 0; i < this.contenido.length; i++) {
            if (item.nombre === this.contenido[i].nombre) {
                this.contenido.splice(i, 1);
            }
        }
    }
}

let Archivo = function (nombre, padre) {
    this.nombre = nombre;
    this.padre = padre;
}

let raiz = new Carpeta("/", null);
let carpetaActual = raiz;

let inputNombre = document.getElementById("nombre");
let botonCrear = document.getElementById("crear").onclick = crearItem;

function crearItem() {
    let regexp = new RegExp("\w+\.\w+");
    let nombre = inputNombre.value;

    let item;

    if (regexp.exec(nombre)) {
        item = new Archivo(nombre, carpetaActual);
    } else {
        item = new Carpeta(nombre, carpetaActual);
    }

    carpetaActual.anadirContenido(item);
}
