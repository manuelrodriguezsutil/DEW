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

// objeto de tipo barco con sus posiciones y su tamaño
let Barco = function (tamano, posiciones) {
    this.tamano = tamano;
    this.posiciones = posiciones;
}

// variables del juego
let filas;
let columnas;
let matriz = [];
let barcos = [];

let tamanosBarcos;
let numeroMaximoBarcos;
let casillasPorTipo;
let maxTipoBarcos = [];

// let barcos = []; // array donde se guardan todos los objetos de barcos con tamaños y posiciones

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

// Guarda en localStorage los array de matriz y barcos
function guardarBarcos() {
    localStorage.setItem("matriz", JSON.stringify(matriz));
    localStorage.setItem("barcos", JSON.stringify(barcos));
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
            posiciones = [];

            for (let i = 0; i < tamano; i++) {
                let f = fila + i * incrementoFila(orientacion);
                let c = columna + i * incrementoColumna(orientacion);

                matriz[f][c] = tamano;
                posiciones.push([f, c]);
            }

            barcos.push(new Barco(tamano, posiciones)); // crear un nuevo objeto de tipo barco y guardarlo en su array

            colocado = true;
        } else {
            alert("Error: no hay espacio.");
        }
    }

    console.log("Barco colocado");
    console.log(matriz);
}

// función que recorre toda la matriz y busca si hay barcos o no
function todosTocados() {
    for (let i = 0; i < matriz.length; i++) {
        for (let j = 0; j < matriz[0].length; j++) {
            if (matriz[i][j] !== 0 && matriz[i][j] !== -1 && matriz[i][j] !== -2) {
                return false;
            }
        }
    }

    return true;
}

// Recorre el array de barcos y verifica que sus posiciones en la matriz no sean igual a cero
function barcoHundido(barco) {
    for (let i = 0; i < barco.posiciones.length; i++) {
        let posicion = barco.posiciones[i];
        let fila = posicion[0];
        let columna = posicion[1];

        if (matriz[fila][columna] !== 0 && matriz[fila][columna] !== -1 && matriz[fila][columna] !== -2) {
            return false;
        }
    }

    return true;
}

function tirarBombas(i, j) {
    // si no es agua
    if (matriz[i][j] !== 0) {
        matriz[i][j] = -1;
        guardarBarcos();

        let td = document.getElementById(`${i},${j}`);
        td.setAttribute("class", "barco-1");

        alert("¡Tocado!");

        // Verificar si todos los barcos están hundidos
        if (todosTocados()) {
            alert("¡Flota hundida!");
        }

        // verificar barcos individuales si están hundidos
        for (let barco = 0; barco < barcos.length; barco++) {
            let b = barcos[barco];

            for (let posicion = 0; posicion < b.posiciones.length; posicion++) {
                let p = b.posiciones[posicion];

                if (p[0] === i && p[1] === j) {
                    if (barcoHundido(b)) {
                        alert("¡Barco hundido!");
                    }

                    break;
                }
            }
        }

        return;
    }

    // si es agua
    matriz[i][j] = -2;
    let td = document.getElementById(`${i},${j}`);
    td.setAttribute("class", "barco-2");
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

    guardarBarcos();

    pintarTablero();
    ponerOnClick();
}

// restaurar la partida guardada o crear una nueva
let partidaGuardada = localStorage.getItem("matriz");

if (partidaGuardada) {
    matriz = JSON.parse(localStorage.getItem("matriz"));
    barcos = JSON.parse(localStorage.getItem("barcos"));

    filas = matriz.length;
    columnas = matriz[0].length;

    document.write("<h1>Batalla de Barcos</h1>");
    document.write("<br/><br/>");

    document.write("<div class='principal'>");

    document.write("<div class='tablero'>");

    pintarTablero();
    ponerOnClick();

    document.write("</div>");

    document.write("<br/>");
    document.write("<br/>");

    document.write("<div class='leyenda'>");
    document.write("<p style='color: red;'>ROJO: barco grande</p>");
    document.write("<p style='color: orange;'>NARANJA: barco mediano</p>");
    document.write("<p style='color: green;'>VERDE: barco pequeño</p>");
    document.write("</div>");

    document.write("</div>");

} else {
    // Preguntar al usuario por las dimensiones de la matriz
    filas = preguntarNumeroEnRango("Introduce el número de filas (4-10):", 4, 10);
    columnas = preguntarNumeroEnRango("Introduce el número de columnas (4-10):", 4, 10);

    matriz = crearMatriz(filas, columnas);

    tamanosBarcos = [1, 2, 3]; // 1: pequeño, 2: mediano, 3: grande

    numeroMaximoBarcos = Math.ceil((filas * columnas) / 3); // casillas totales de barco (1/3 del tablero)
    casillasPorTipo = numeroMaximoBarcos / tamanosBarcos.length; // 1/3 para cada tipo

    maxTipoBarcos = [];
    for (let i = 0; i < tamanosBarcos.length; i++) {
        maxTipoBarcos.push(Math.floor(casillasPorTipo / tamanosBarcos[i]));
    }

    console.log("Casillas de barco:", numeroMaximoBarcos);
    console.log("Barcos de cada tipo:", maxTipoBarcos);

    // pintar titulo de la página
    document.write("<h1>Batalla de Barcos</h1>");
    document.write("<br/><br/>");

    document.write("<div class='principal'>");

    document.write("<div class='tablero'>");

    preguntarYColocarTodosBarcos();

    document.write("</div>");

    document.write("<br/>");
    document.write("<br/>");

    document.write("<div class='leyenda'>");
    document.write("<p style='color: red;'>ROJO: barco grande</p>");
    document.write("<p style='color: orange;'>NARANJA: barco mediano</p>");
    document.write("<p style='color: green;'>VERDE: barco pequeño</p>");
    document.write("</div>");

    document.write("</div>");
}
