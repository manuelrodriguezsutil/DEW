// ===================== PREGUNTAS =====================

function preguntaNumero(pregunta) {
    let num = Number(prompt(pregunta));

    while (!Number.isInteger(num)) {
        alert("Error: debes introducir un número entero.");
        num = Number(prompt(pregunta));
    }

    return num;
}

function preguntarOrientacion() {
    let orientacion = String(prompt("¿Horizontal (h) o vertical (v)?")).toLowerCase();

    while (orientacion !== 'h' && orientacion !== 'v') {
        alert("Error. Debe ser 'h' o 'v'.");
        orientacion = String(prompt("¿Horizontal (h) o vertical (v)?")).toLowerCase();
    }

    return orientacion;
}

// ===================== TABLERO =====================

function crearMatriz(filas, columnas) {
    let matriz = [];

    for (let i = 0; i < filas; i++) {
        matriz[i] = [];
        for (let j = 0; j < columnas; j++) {
            matriz[i][j] = 0;
        }
    }

    return matriz;
}

let filas = preguntaNumero("Introduce el número de filas:");
while (filas < 1) {
    alert("Error: tiene que haber al menos 1 fila.");
    filas = preguntaNumero("Introduce el número de filas:");
}

let columnas = preguntaNumero("Introduce el número de columnas:");
while (columnas < 1) {
    alert("Error: tiene que haber al menos 1 columna.");
    columnas = preguntaNumero("Introduce el número de columnas:");
}

let matriz = crearMatriz(filas, columnas);

let tamanosBarcos = [1, 2, 3];
// 1: pequeño
// 2: mediano
// 3: grande

let numeroMaximoBarcos = Math.ceil((filas * columnas) / 3); // casillas totales de barco (1/3 del tablero)
let casillasPorTipo = numeroMaximoBarcos / tamanosBarcos.length; // 1/3 para cada tipo

let maxTipoBarcos = [];
for (let i = 0; i < tamanosBarcos.length; i++) {
    maxTipoBarcos.push(Math.floor(casillasPorTipo / tamanosBarcos[i]));
}

console.log("Casillas de barco:", numeroMaximoBarcos);
console.log("Barcos de cada tipo:", maxTipoBarcos);

// ===================== COMPROBACIONES =====================

function espacioLibreEnCruz(fila, columna) {
    // arriba
    if (fila > 0 && matriz[fila - 1][columna] !== 0) {
        return false;
    }

    // abajo
    if (fila < matriz.length - 1 && matriz[fila + 1][columna] !== 0) {
        return false;
    }

    // izquierda
    if (columna > 0 && matriz[fila][columna - 1] !== 0) {
        return false;
    }

    // derecha
    if (columna < matriz[0].length - 1 && matriz[fila][columna + 1] !== 0) {
        return false;
    }

    return true;
}

// Comprueba que todas las casillas del barco están dentro, vacías y sin barcos al lado
function cabeBarco(fila, columna, tamano, orientacion) {
    for (let i = 0; i < tamano; i++) {
        let f = orientacion === "v" ? fila + i : fila;
        let c = orientacion === "h" ? columna + i : columna;

        if (f >= matriz.length || c >= matriz[0].length || matriz[f][c] !== 0 || !espacioLibreEnCruz(f, c)) {
            return false;
        }
    }
    return true;
}

// Devuelve el tablero en texto con las casillas donde puede empezar el barco
function textoPosicionesLibres(tamano) {
    let texto = "    ";
    for (let j = 0; j < matriz[0].length; j++) {
        texto += String(j).padStart(2) + " "; // números de columna
    }
    texto += "\n";

    for (let i = 0; i < matriz.length; i++) {
        texto += String(i).padStart(2) + "  "; // número de fila
        for (let j = 0; j < matriz[0].length; j++) {
            if (matriz[i][j] !== 0) {
                texto += " X ";
            } else if (cabeBarco(i, j, tamano, "h") || cabeBarco(i, j, tamano, "v")) {
                texto += " O ";
            } else {
                texto += " · ";
            }
        }
        texto += "\n";
    }

    texto += "\nX = barco   O = puedes empezar aquí   · = no cabe\n\n";
    return texto;
}

// ===================== COLOCAR =====================

function colocarBarcos(tamano) {
    let colocado = false;

    while (!colocado) {
        let mapa = textoPosicionesLibres(tamano);

        if (!mapa.includes(" O ")) {
            alert(`No queda sitio para el barco de tamaño ${tamano}.`);
            return false;
        }

        let fila = preguntaNumero(mapa + `¿En qué fila quieres poner el barco de tamaño ${tamano}?`);
        let columna = preguntaNumero(mapa + `¿En qué columna quieres poner el barco de tamaño ${tamano}?`);

        if (fila >= matriz.length || fila < 0 || columna >= matriz[0].length || columna < 0) {
            alert("Error: posición incorrecta.");
            continue;
        }

        // El barco de 1 no necesita orientación
        let orientacion = tamano === 1 ? "h" : preguntarOrientacion();

        if (cabeBarco(fila, columna, tamano, orientacion)) {
            for (let i = 0; i < tamano; i++) {
                let f = orientacion === "v" ? fila + i : fila;
                let c = orientacion === "h" ? columna + i : columna;
                matriz[f][c] = tamano;
            }
            colocado = true;
        } else {
            alert("Error: no hay espacio.");
        }
    }

    return true;
}

// ===================== PINTAR =====================

function pintarTablero() {
    let contenedor = document.getElementById("tablero");
    if (!contenedor) {
        contenedor = document.createElement("div");
        contenedor.id = "tablero";
        document.body.appendChild(contenedor);
    }

    let html = "<table><tr><th></th>";
    for (let j = 0; j < matriz[0].length; j++) {
        html += `<th>${j}</th>`; // números de columna
    }
    html += "</tr>";

    for (let i = 0; i < matriz.length; i++) {
        html += `<tr><th>${i}</th>`; // número de fila
        for (let j = 0; j < matriz[i].length; j++) {
            html += `<td class="barco${matriz[i][j]}"></td>`;
        }
        html += "</tr>";
    }

    html += "</table>";
    contenedor.innerHTML = html;
}

function pintarConsola() {
    console.table(matriz);
}

// ===================== JUEGO =====================

function colocarTodos() {
    for (let i = 0; i < tamanosBarcos.length; i++) {
        for (let n = 0; n < maxTipoBarcos[i]; n++) {
            let ok = colocarBarcos(tamanosBarcos[i]);
            pintarConsola();
            if (!ok) {
                break; // no cabe ninguno más de este tipo
            }
        }
    }
    pintarTablero();
}

colocarTodos();