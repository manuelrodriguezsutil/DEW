function preguntaNumero(pregunta) {
    let num = Number(prompt(pregunta));

    while (isNaN(num)) { // verificar que introduce siempre un número
        alert("Error: debes introducir un número entero.");
        num = Number(prompt(pregunta));
    }

    return num;
}

function preguntarOrientacion() {
    let orientacion = prompt("¿Horizontal (h) o vertical (v)?").toLowerCase();

    while (orientacion !== 'h' && orientacion !== 'v') { // verificar que introduce siempre h o v
        alert("Error. Debe ser 'h' o 'v'.");
        orientacion = prompt("¿Horizontal (h) o vertical (v)?").toLowerCase();
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
let filas = preguntaNumero("Introduce el número de filas:");
while (filas < 1 || filas > 10) {
    alert("Error: las filas debe ser entre 1 y 10");
    filas = preguntaNumero("Introduce el número de filas:");
}

let columnas = preguntaNumero("Introduce el número de columnas:");
while (columnas < 1 || columnas > 10) {
    alert("Error: las columnas deben ser entre 1 y 10");
    columnas = preguntaNumero("Introduce el número de columnas:");
}

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

// Comprueba que todas las casillas del barco están dentro y vacías
function cabeBarco(fila, columna, tamano, orientacion) {
    for (let i = 0; i < tamano; i++) {
        let f = fila;
        if (orientacion === "v") {
            f = fila + i
        }

        let c = columna;
        if (orientacion === "h") {
            c = columna + i;
        }

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
function colocarBarcos(tamano) {
    let colocado = false;

    while (!colocado) {
        let mapa = mapaTexto(); // obetener el mapa en texto

        // preguntar donde poner el barco
        let fila = preguntaNumero(`¿En qué fila quieres poner el barco de tamaño ${tamano}?\n` + mapa);
        let columna = preguntaNumero(`¿En qué columna quieres poner el barco de tamaño ${tamano}?\n` + mapa);

        // comprobar que la fila y la columna está dentro de la matriz
        if (fila >= matriz.length || fila < 0 || columna >= matriz[0].length || columna < 0) {
            alert("Error: posición incorrecta.");
            continue;
        }

        // El barco de 1 no necesita orientación, tiene orientacion horizontal por defecto
        let orientacion;
        if (tamano === 1) {
            orientacion = "h";
        } else {
            orientacion = preguntarOrientacion(); // prguntar orientacion si el barco es de 2 o 3
        }

        let cabe = cabeBarco(fila, columna, tamano, orientacion) // verificar que cabe el barco en la posicion
        if (cabe === true) { // si cabe, se añade a la matriz
            for (let i = 0; i < tamano; i++) {
                let f = fila;
                if (orientacion === "v") {
                    f = fila + i
                }

                let c = columna;
                if (orientacion === "h") {
                    c = columna + i;
                }

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
            document.write(`<td class="barco${matriz[i][j]}"></td>`); // pintar dependiendo del tipo de barco
        }
        document.write("</tr>");
    }

    document.write("</table>");
}

// preguntar donde colocar para todos los barcos
function jugar() {
    for (let i = 0; i < tamanosBarcos.length; i++) {
        for (let n = 0; n < maxTipoBarcos[i]; n++) {
            colocarBarcos(tamanosBarcos[i]);
        }
    }

    pintarTablero();
}

// pintar titulo de la página
document.write("<h1>Batalla</h1>");
document.write("<br/><br/>");

document.write("<div>");
jugar();
document.write("</div>");
