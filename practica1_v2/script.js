// Funciones para las preguntas

function pedirNumero(mensaje) {
    return Number(prompt(mensaje));
}

function pedirColorSemaforo() {
    let color = prompt("¿De qué color quieres el semáforo?").toLowerCase();

    // Si pone un valor no permitido, volver a preguntar
    while (color != "rojo" && color != "ambar" && color != "verde") {
        alert("Color no permitido. Debe ser: rojo, verde o ambar.")
        color = prompt("¿De qué color quieres el semáforo?").toLowerCase();
    }
    return color;
}

function pedirHoraReloj() {
    let hora = Number(prompt("¿Qué hora quieres que tenga el reloj (1-12)?"));

    // La hora debe estar entre 1 y 12. Si no, vuelve a preguntar
    while (hora > 12 || hora < 1) {
        alert("Debe ser una hora entre 1-12")
        hora = Number(prompt("¿Qué hora quieres que tenga el reloj (1-12)?"));
    }
    return hora;
}

// Funciones para dibujar 

// division 1: carteles

function dibujarCarteles(numCarteles) {
    document.write("<div>");
    for (let i = 0; i < numCarteles; i++) {
        console.log(`Dibujando cartel: ${i}`)
        document.write("<img src=imagenes/cartel.png alt='cartel' />"); // Imagen de los carteles 
    }
    document.write("</div>");
}

// division 2: puertas y numeros

function dibujarPuertas(numPuertas, numPrimeraPuerta) {
    document.write("<div>");
    for (let i = 0; i < numPuertas; i++) {
        console.log(`Dibujando puerta: ${i}`)
        document.write("<img src=imagenes/puerta.png alt='puerta' />"); // imagen de las puertas 
        document.write(`<p>${numPrimeraPuerta}</p>`); // numero de las puertas 
        numPrimeraPuerta += 2;
    }
    document.write("</div>");
}

// division 3: escaparates

function dibujarEscaparates(numEscaparates) {
    document.write("<div>");
    for (let i = 0; i < numEscaparates; i++) {
        console.log(`Dibujando escaparates: ${i}`);
        document.write("<img src='imagenes/escaparate.jpg' alt='escaparate' />"); // Imagen de los escaparates 
        document.write("<img src='imagenes/oferta.png' alt='oferta' />"); // Imagen de las ofertas 
    }
    document.write("</div>");
}

// division 4: semaforo y reloj

function dibujarSemaforo(colorSemaforo) {
    if (colorSemaforo == "rojo") {
        // semaforo en rojo
        document.write("<img src='imagenes/semaforo_rojo.jpg' alt='semaforo rojo' />");
    } else if (colorSemaforo == "ambar") {
        // semaforo amarillo 
        document.write("<img src='imagenes/semaforo_ambar.jpg' alt='semaforo ambar' />");
    } else if (colorSemaforo == "verde") {
        // semaforo verde 
        document.write("<img src='imagenes/semaforo_verde.jpg' alt='semaforo verde' />");
    } else {
        alert("Color no permitido. Debe ser: rojo, verde o ambar.")
    }
}

function dibujarReloj(horaReloj) {
    switch(horaReloj) {
        default:
            document.write(`<img src='imagenes/reloj-${horaReloj}.jpg' alt='reloj' />`);
    }
}

function dibujarSemaforoYReloj(colorSemaforo, horaReloj) {
    document.write("<div>");
    dibujarSemaforo(colorSemaforo);
    dibujarReloj(horaReloj);
    document.write("</div>");
}

// division 5: coches 

function dibujarCoches(numCoches) {
    document.write("<div>");
    while (numCoches > 0) {
        document.write("<img src='imagenes/coche.png' alt='coche' />"); // Imagen de los coches
        numCoches--; 
    }
    document.write("</div>");
}

// Programa principal 

let numCarteles = pedirNumero("¿Cuántos carteles quieres?");
dibujarCarteles(numCarteles);

let numPuertas = pedirNumero("¿Cuántas puertas quieres?");
let numPrimeraPuerta = pedirNumero("¿Cuál es el número de la primera puerta?");
dibujarPuertas(numPuertas, numPrimeraPuerta);

let numEscaparates = pedirNumero("¿Cuántos escaparates quieres?");
dibujarEscaparates(numEscaparates);

let colorSemaforo = pedirColorSemaforo();
let horaReloj = pedirHoraReloj();
dibujarSemaforoYReloj(colorSemaforo, horaReloj);

let numCoches = pedirNumero("¿Cuántos coches quieres?");
dibujarCoches(numCoches);
