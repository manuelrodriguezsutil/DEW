function preguntaNumero(pregunta) {
    let num = Number(prompt(pregunta));

    while (isNaN(num)) {
        alert("Error: debes introducir un número.");
        num = Number(prompt(pregunta));
    }

    return num;
}

function preguntarOrientacion() {
    let orientacion = prompt("¿Horizontal (h) o vertical (v)?");

    while (orientacion.toLowerCase() !== 'h' && orientacion.toLowerCase() !== 'v') {
        alert("Error. Debe ser 'h' o 'v'.");
        orientacion = prompt("¿Horizontal (h) o vertical (v)?");
    }

    return orientacion.toLowerCase();
}

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

let filas = preguntaNumero("Introduce el número de filas:"); // Preguntar por filas 
let columnas = preguntaNumero("Introduce el número de columnas:"); // Preguntar por columnas

let matriz = crearMatriz(filas, columnas); // crear la matriz con los parámetros introducidos
let tamanosBarcos = [1, 2, 3];
// 1: pequeño
// 2: mediano
// 3: grande

let numeroMaximoBarcos = Math.ceil((filas * columnas) / 3); // casillas totales de barco
let casillasPorTipo = numeroMaximoBarcos / tamanosBarcos.length; // 1/3 para cada tipo

let maxTipoBarcos = [];
for (let i = 0; i < tamanosBarcos.length; i++) {
    maxTipoBarcos.push(Math.floor(casillasPorTipo / tamanosBarcos[i]));
}

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

function colocarBarcos(tamano) {
    let colocado = false;

    while (!colocado) {
        let fila = preguntaNumero(`¿En qué fila quieres poner el barco de tamaño ${tamano}?`);
        let columna = preguntaNumero(`En qué columna quieres poner el barco de tamaño ${tamano}?`);

        if (fila >= matriz.length || fila < 0 || columna >= matriz[0].length || columna < 0) {
            alert("Error: posición incorrecta");
            continue;
        }

        if (tamano === 1) {
            if (matriz[fila][columna] === 0) {
                matriz[fila][columna] = tamanosBarcos[0];
                colocado = true;
            } else {
                alert("Error: esa casilla está ocupada.");
            }
        } else if (tamano === 2) {

            let orientacion = preguntarOrientacion();

            if (orientacion === "h") {

                if (columna + 1 < matriz[0].length && matriz[fila][columna] === 0 && matriz[fila][columna + 1] === 0 && espacioLibreEnCruz(fila, columna) && espacioLibreEnCruz(fila, columna + 1)) {
                    matriz[fila][columna] = 2;
                    matriz[fila][columna + 1] = 2;
                    colocado = true;
                } else {
                    alert("Error: no hay espacio.");
                }

            } else if (orientacion === "v") {

                if (fila + 1 < matriz.length && matriz[fila][columna] === 0 && matriz[fila + 1][columna] === 0 && espacioLibreEnCruz(fila, columna) && espacioLibreEnCruz(fila + 1, columna)) {
                    matriz[fila][columna] = 2;
                    matriz[fila + 1][columna] = 2;
                    colocado = true;
                } else {
                    alert("Error: no hay espacio.");
                }
            }
        } else if (tamano === 3) {
            let orientacion = preguntarOrientacion();

            if (orientacion === "h") {

                if (columna + 2 < matriz[0].length && matriz[fila][columna] === 0 && matriz[fila][columna + 1] === 0 && matriz[fila][columna + 2] === 0 && espacioLibreEnCruz(fila, columna) && espacioLibreEnCruz(fila, columna + 1) && espacioLibreEnCruz(fila, columna + 2)) {
                    matriz[fila][columna] = 3;
                    matriz[fila][columna + 1] = 3;
                    matriz[fila][columna + 2] = 3;
                    colocado = true;
                } else {
                    alert("Error: no hay espacio.");
                }

            } else if (orientacion === "v") {

                if (fila + 2 < matriz.length && matriz[fila][columna] === 0 && matriz[fila + 1][columna] === 0 && matriz[fila + 2][columna] === 0 && espacioLibreEnCruz(fila, columna) && espacioLibreEnCruz(fila + 1, columna) && espacioLibreEnCruz(fila + 2, columna)) {
                    matriz[fila][columna] = 3;
                    matriz[fila + 1][columna] = 3;
                    matriz[fila + 2][columna] = 3;
                    colocado = true;
                } else {
                    alert("Error: no hay espacio.");
                }
            }
        }
    }
}

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

function colocarTodos() {
    for (let i = 0; i < tamanosBarcos.length; i++) {
        for (let n = 0; n < maxTipoBarcos[i]; n++) {
            colocarBarcos(tamanosBarcos[i]);
            pintarConsola();
        }
    }
    pintarTablero();
}

colocarTodos();