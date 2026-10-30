// objeto general para los atributos que tiene el juego
let mejorTiempo = null;
let mejorMovimientos = null;

let juego = {
    nombre: "jugador",
    torres: [[3, 2, 1], [], []],
    seleccionada: null,
    movimientos: 0,
    iniciado: false,
    segundos: 0,
    intervalo: null
};

let partidas = [];

// obtener los elemntos del html para poder modificarlos con javascript
let movimientosHTML = document.getElementById("movimientos");
let reloj = document.getElementById("tiempo");
let mensaje = document.getElementById("mensaje");
let input = document.getElementById("nombreJugador");

let nombreJugador = input.value;

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
        // permitir al usuario seleccionar solo si la torre tiene discos
        if (juego.torres[i].length > 0) {
            juego.seleccionada = i;
        }
    } else {
        let origen = juego.torres[juego.seleccionada]; // es la torre donde se encuentra el disco seleccionado (el click anterior, la primera parte del if)
        let destino = juego.torres[i]; // la torre seleccionada con el click de ahora
        let disco = origen[origen.length - 1]; // el disco que se quiere mover es el de arriba de la torre de origen
        let arriba = destino[destino.length - 1]; // se quiero mover a la parte de arriba de la torre destino (la última posición del array)

        // si no se hace click en la misma torre y la torre destino no tiene un disco menor en la posición de abajo
        if (i !== juego.seleccionada && (destino.length === 0 || arriba > disco)) {
            destino.push(origen.pop()); // se le añade el disco al array de la torre destino y se le quita a la torre de origen. 
            // Se puede hacer con un solo método de pop() que eliminar el último elemento de un array y lo devuelve
            juego.movimientos++; // se aumenta el número de movimientos + 1
        }

        // quitar la seleccion
        juego.seleccionada = null;
    }

    dibujar();
    comprobarTerminado();
    guardarPartida();
}

// comprueba que todos los discos están en la última torre
function comprobarTerminado() {
    if (juego.torres[2].length === 3) {
        juego.iniciado = false;
        clearInterval(juego.intervalo);
        mensaje.innerText = "¡Has ganado en " + juego.movimientos + " movimientos!";

        // COMPROBAR SI ES MOVIMIENTOS Y TIEMPO RECORD
        if (guardarRecord()) {
            mensaje.innerText += " ¡Nuevo récord!";
        }

        // guardar partida en array de partidas 
        partidas.push({
            nombre: juego.nombre,
            movimientos: juego.movimientos,
            segundos: juego.segundos
        });
    }
}

// convierte el tiempo de segundos totales del intervalo (tiempo de juego total) a minutos y segundos reales. 
function formatearTiempo() {
    let minutos = Math.floor(juego.segundos / 60);
    let segundos = juego.segundos % 60;

    return String(minutos) + ":" + String(segundos); // devuelve los número formateados en string
}

// empieza el cronómetro y pinta el tiempo en el html
function empezarCronometro() {
    clearInterval(juego.intervalo);
    juego.intervalo = setInterval(function () {
        juego.segundos++;
        reloj.textContent = formatearTiempo();
    }, 1000);
}

// reinicia todos los atributos del juego y reinicia el intervalo de tiempo
function reiniciar() {
    clearInterval(juego.intervalo);

    juego.torres = [[3, 2, 1], [], []];
    juego.seleccionada = null;
    juego.movimientos = 0;
    juego.segundos = 0;
    juego.iniciado = false;
    reloj.textContent = "00:00";
    mensaje.textContent = "";

    dibujar();
}

// empieza el juego
function jugar() {
    reiniciar();
    juego.nombre = input.value || "jugador";
    juego.iniciado = true;
    empezarCronometro();
}

function guardarPartida() {
    // Guardar el estado del juego en localStorage
    localStorage.setItem("juego", JSON.stringify(juego));
    localStorage.setItem("mejorTiempo", mejorTiempo);
    localStorage.setItem("mejorMovimientos", mejorMovimientos);
    localStorage.setItem("partidas", JSON.stringify(partidas));
}

function restaurarPartida() {
    // Recuperar el estado guardado
    if (localStorage.getItem("juego") === null) return; // si no hay nada guardado no se restaura

    juego = JSON.parse(localStorage.getItem("juego"));
    mejorTiempo = JSON.parse(localStorage.getItem("mejorTiempo"));
    mejorMovimientos = JSON.parse(localStorage.getItem("mejorMovimientos"));
    partidas = JSON.parse(localStorage.getItem("partidas"));

    reloj.textContent = formatearTiempo();

    // si la partida estaba a medias, el cronómetro sigue
    if (juego.iniciado) {
        empezarCronometro();
    }
}

function guardarRecord() {
    // Comprobar si el tiempo es mejor que el anterior
    let record = false;

    if (mejorTiempo === null || juego.segundos < mejorTiempo) {
        mejorTiempo = juego.segundos;
        record = true;
    }

    if (mejorMovimientos === null || juego.movimientos < mejorMovimientos) {
        mejorMovimientos = juego.movimientos;
        record = true;
    }

    return record;
}

// dibujar por primera vez 
restaurarPartida();
dibujar();