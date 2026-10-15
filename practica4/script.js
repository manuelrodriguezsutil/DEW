function preguntarNumero(pregunta) {
    let respuesta = prompt(pregunta);

    // verificar que introduce siempre un número entero
    while (respuesta === null || respuesta.trim() === "" || !Number.isInteger(Number(respuesta))) {
        alert("Error: debes introducir un número entero.");
        respuesta = prompt(pregunta);
    }

    return Number(respuesta);
}

// Pregunta un número entero hasta que esté entre min y max
function preguntarNumeroEnRango(pregunta, min, max) {
    let num = preguntarNumero(pregunta);

    while (num < min || num > max) {
        alert(`Error: debe ser entre ${min} y ${max}.`);
        num = preguntarNumero(pregunta);
    }

    return num;
}

function preguntarOrientacion() {
    let orientacion = (prompt("¿Horizontal (h) o vertical (v)?") || "").trim().toLowerCase(); // si cancela, cadena vacía

    while (orientacion !== 'h' && orientacion !== 'v') { // verificar que introduce siempre h o v
        alert("Error. Debe ser 'h' o 'v'.");
        orientacion = (prompt("¿Horizontal (h) o vertical (v)?") || "").trim().toLowerCase();
    }

    return orientacion;
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

// Preguntar al usuario por las dimensiones de la matriz
let filas = preguntarNumeroEnRango("Introduce el número de filas (4-10):", 4, 10);
let columnas = preguntarNumeroEnRango("Introduce el número de columnas (4-10):", 4, 10);

let matriz = crearMatriz(filas, columnas);

let tamanosBarcos = [1, 2, 3]; // 1: pequeño, 2: mediano, 3: grande

let numeroMaximoBarcos = Math.ceil((filas * columnas) / 3); // casillas totales de barco (1/3 del tablero)
let casillasPorTipo = numeroMaximoBarcos / tamanosBarcos.length; // 1/3 para cada tipo

let maxTipoBarcos = [];
for (let i = 0; i < tamanosBarcos.length; i++) {
    maxTipoBarcos.push(Math.floor(casillasPorTipo / tamanosBarcos[i]));
}

console.log("Casillas de barco:", numeroMaximoBarcos);
console.log("Barcos de cada tipo:", maxTipoBarcos);

// Devuelve cuánto avanza la fila en cada casilla del barco (1 si es vertical)
function incrementoFila(orientacion) {
    if (orientacion === "v") {
        return 1;
    }
    return 0;
}

// Devuelve cuánto avanza la columna en cada casilla del barco (1 si es horizontal)
function incrementoColumna(orientacion) {
    if (orientacion === "h") {
        return 1;
    }
    return 0;
}

// Comprueba que todas las casillas del barco están dentro y vacías
function cabeBarco(fila, columna, tamano, orientacion) {
    for (let i = 0; i < tamano; i++) {
        let f = fila + i * incrementoFila(orientacion);
        let c = columna + i * incrementoColumna(orientacion);

        if (f >= matriz.length || c >= matriz[0].length || matriz[f][c] !== 0) {
            return false;
        }
    }
    return true;
}

// Devuelve la matriz en texto
function mapaTexto() {
    let texto = "";
    for (let i = 0; i < matriz.length; i++) {
        for (let j = 0; j < matriz[0].length; j++) {
            if (matriz[i][j] !== 0) {
                texto += " X ";
            } else {
                texto += " O ";
            }
        }
        texto += "\n";
    }

    texto += "X = barco, O = sitio libre\n\n";
    return texto;
}

// preguntar al usuario la fila y la columna y colocar los barcos si se puede
function colocarBarco(tamano) {
    let colocado = false;

    while (!colocado) {
        let mapa = mapaTexto(); // obetener el mapa en texto

        // preguntar donde poner el barco, siempre dentro de la matriz
        let fila = preguntarNumeroEnRango(`¿En qué fila quieres poner el barco de tamaño ${tamano}?\n` + mapa, 0, matriz.length - 1);
        let columna = preguntarNumeroEnRango(`¿En qué columna quieres poner el barco de tamaño ${tamano}?\n` + mapa, 0, matriz[0].length - 1);

        // El barco de 1 no necesita orientación, tiene orientacion horizontal por defecto
        let orientacion;
        if (tamano === 1) {
            orientacion = "h";
        } else {
            orientacion = preguntarOrientacion(); // prguntar orientacion si el barco es de 2 o 3
        }

        if (cabeBarco(fila, columna, tamano, orientacion)) { // si cabe, se añade a la matriz
            for (let i = 0; i < tamano; i++) {
                let f = fila + i * incrementoFila(orientacion);
                let c = columna + i * incrementoColumna(orientacion);

                matriz[f][c] = tamano;
            }
            colocado = true;
        } else {
            alert("Error: no hay espacio.");
        }
    }

    console.log("Barco colocado");
    console.log(matriz);
}

function tirarBombas(i, j) {
    // si no es agua
    if (matriz[i][j] !== 0) {
        matriz[i][j] = 0;
        let td = document.getElementById(`${i},${j}`);
        td.setAttribute("class", "tocado");
        alert("¡Tocado!");
        return;
    }

    // si es agua
    let td = document.getElementById(`${i},${j}`);
    td.setAttribute("class", "aguaTocada");
    alert("¡Agua!");
}

// pintar los barcos a partir de la matriz
function pintarTablero() {
    document.write("<table><tr>");
    document.write("<th></th>"); //primera celda vacía 

    // primera fila
    for (let j = 0; j < matriz[0].length; j++) {
        document.write(`<th>${j}</th>`); // pintar números de columna
    }
    document.write("</tr>");

    for (let i = 0; i < matriz.length; i++) {
        document.write(`<tr><th>${i}</th>`); // número de fila
        for (let j = 0; j < matriz[i].length; j++) {
            document.write(`<td class="barco${matriz[i][j]}" id="${i},${j}"></td>`); // pintar dependiendo del tipo de barco
        }
        document.write("</tr>");
    }

    document.write("</table>");
}

function ponerOnClick() {
    for (let i = 0; i < matriz.length; i++) {
        for (let j = 0; j < matriz[0].length; j++) {
            let td = document.getElementById(`${i},${j}`);

            td.onclick = function () {
                tirarBombas(i, j) // añade el atributo on click y le asigna la función de tirar bombas
            };
        }
    }
}

// preguntar donde colocar para todos los barcos, empezando por los grandes para que siempre quepan
function preguntarYColocarTodosBarcos() {
    for (let i = tamanosBarcos.length - 1; i >= 0; i--) {
        for (let n = 0; n < maxTipoBarcos[i]; n++) {
            colocarBarco(tamanosBarcos[i]);
        }
    }

    pintarTablero();
    ponerOnClick();
}

// pintar titulo de la página
document.write("<h1>Batalla de Barcos</h1>");
document.write("<br/><br/>");

document.write("<div>");
preguntarYColocarTodosBarcos();
document.write("</div>");