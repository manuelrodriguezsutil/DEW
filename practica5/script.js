// objeto general para los atributos que tiene el juego
let juego = {
    torres: [[3, 2, 1], [], []],
    seleccionada: null,
    movimientos: 0,
    iniciado: false,
    tiempo: {
        segundos: 0,
    },
    intervalo: null
};

// obtener los elemntos del html para poder modificarlos con javascript
let movimientosHTML = document.getElementById("movimientos")
let reloj = document.getElementById("tiempo")

document.getElementById("inicio").onclick = jugar;
document.getElementById("reiniciar").onclick = reiniciar;

// añadir funcion de onclick a cada torre
for (let i = 0; i < 3; i++) {
    document.getElementById("torre" + i).onclick = function () {
        pulsarTorre(i);
    }
}

function dibujar() {

    // primero se vacían todas las celdas de la torre para poder volver a pintar
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            let celda = document.getElementById("celda" + i + j);
            celda.innerHTML = "";
            celda.classList.remove("seleccionada");
        }
    }

    // pintar todos los discos de cada torre
    for (let i = 0; i < 3; i++) { // recorre las 3 torres
        for (let j = 0; j < juego.torres[i].length; j++) { // recorre las posibles posiciones de los discos en las torres
            // primero se busca la celda
            let celda = document.getElementById("celda" + i + (2 - j));
            // se crea una nueva división para el disco 
            // y se le añade el css correspondiente dependiendo de su posición i, j
            let disco = document.createElement("div");
            disco.className = "disco disco" + juego.torres[i][j];

            //añadir el disco a la celda que corresponde en la torre
            celda.appendChild(disco);
        }
    }

    // si no hay ninguna celda seleccionada, se puede seleccionar y pintar el css que muestra la seleccion 
    if (juego.seleccionada !== null) {
        let torre = juego.seleccionada;
        let posicion = 3 - juego.torres[torre].length;

        document.getElementById("celda" + torre + posicion).classList.add("seleccionada");
    }

    // pintar los movimientos en el HTML
    movimientosHTML.textContent = juego.movimientos;
}

function pulsarTorre(i) {
    if (!juego.iniciado) return;

    if (juego.seleccionada === null) {
        if (juego.torres[i].length > 0) {
            juego.seleccionada = i;
        }
    } else {
        let origen = juego.torres[juego.seleccionada];
        let destino = juego.torres[i];
        let disco = origen[origen.length - 1];
        let arriba = destino[destino.length - 1];

        if (i !== juego.seleccionada && (destino.length === 0 || arriba > disco)) {
            destino.push(origen.pop());
            juego.movimientos++;
        }

        juego.seleccionada = null;
    }

    dibujar();
    comprobarTerminado();
}

function comprobarTerminado() {
    if (juego.torres[2].length === 3) {
        juego.iniciado = false;
        clearInterval(juego.intervalo);
        alert("¡Has ganado en " + juego.movimientos + " movimientos!");
    }
}

function formatearTiempo() {
    let minutos = Math.floor(juego.tiempo.segundos / 60);
    let segundos = juego.tiempo.segundos % 60;

    return String(minutos) + ":" + String(segundos);
}

function empezarCronometro() {
    clearInterval(juego.intervalo);
    juego.intervalo = setInterval(function () {
        juego.segundos++;
        reloj.textContent = formatearTiempo();
    }, 1000);
}

function reiniciar() {
    clearInterval(juego.intervalo);

    juego.torres = [[3, 2, 1], [], []];
    juego.seleccionada = null;
    juego.movimientos = 0;
    juego.tiempo.segundos = 0;
    juego.iniciado = false;
    reloj.textContent = "00:00";

    dibujar();
}

function jugar() {
    reiniciar();
    juego.iniciado = true;
    empezarCronometro();
}

dibujar();