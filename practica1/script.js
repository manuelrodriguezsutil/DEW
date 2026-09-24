// division 1: carteles 

var numCarteles = prompt("¿Cuántos carteles quieres?");

document.write("<div>");
for (let i = 0; i < numCarteles; i++) {
    console.log(`Dibujando cartel: ${i}`)
    document.write("<img src=imagenes/cartel.png alt='cartel' />"); // Imagen de los carteles 
}
document.write("</div>");

// division 2: puertas y numeros

var numPuertas = prompt("¿Cuántas puertas quieres?");
var numPrimeraPuerta = prompt("¿Cuál es el número de la primera puerta?");

document.write("<div>");
for (let i = 0; i < numPuertas; i++) {
    console.log(`Dibujando puerta: ${i}`)
    document.write("<img src=imagenes/puerta.png alt='puerta' />"); // imagen de las puertas 
    document.write(`<p>${numPrimeraPuerta}</p>`); // numero de las puertas 
    numPrimeraPuerta++;
}
document.write("</div>");

// division 3: escaparates

var numEscaparates = prompt("¿Cuántos escaparates quieres?")

document.write("<div>");
for (let i = 0; i < numEscaparates; i++) {
    console.log(`Dibujando escaparates: ${i}`);
    document.write("<img src='imagenes/escaparate.jpg' alt='escaparate' />"); // Imagen de los escaparates 
}
document.write("</div>");

// division 4: semaforo y reloj

var colorSemaforo = prompt("¿De qué color quieres el semáforo?");
var horaReloj = prompt("¿Qué hora quieres que tenga el reloj (1-12)?");
horaReloj = Number(horaReloj);

document.write("<div>");
if (colorSemaforo.toLowerCase() == "rojo") {
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

switch(horaReloj) {
    case 1:
        // hora 1
        document.write("<img src='imagenes/reloj-1.jpg' alt='reloj' />");
        break;
    case 2: 
        // hora 2
        document.write("<img src='imagenes/reloj-2.jpg' alt='reloj' />");
        break; 
    case 3: 
        // hora 3
        document.write("<img src='imagenes/reloj-3.jpg' alt='reloj' />");
        break;
    case 4:
        // hora 4
        document.write("<img src='imagenes/reloj-4.jpg' alt='reloj' />");
        break;
    case 5: 
        // hora 5
        document.write("<img src='imagenes/reloj-5.jpg' alt='reloj' />");
        break; 
    case 6: 
        // hora 6
        document.write("<img src='imagenes/reloj-6.jpg' alt='reloj' />");
        break;
    case 7:
        // hora 7
        document.write("<img src='imagenes/reloj-7.jpg' alt='reloj' />");
        break;
    case 8: 
        // hora 8
        document.write("<img src='imagenes/reloj-8.jpg' alt='reloj' />");
        break; 
    case 9: 
        // hora 9
        document.write("<img src='imagenes/reloj-9.jpg' alt='reloj' />");
        break;
    case 10:
        // hora 10
        document.write("<img src='imagenes/reloj-10.jpg' alt='reloj' />");
        break;
    case 11:
        // hora 11 
        document.write("<img src='imagenes/reloj-11.jpg' alt='reloj' />");
        break;
    case 12:
        // hora 12
        document.write("<img src='imagenes/reloj-12.jpg' alt='reloj' />");
        break;
    default:
        alert("Debe ser una hora entre 1-12")
}
document.write("</div>");

// division 5: coches 

var numCoches = prompt("¿Cuántos coches quieres?");
numCoches = Number(numCoches)

document.write("<div>");
while (numCoches > 0) {
    document.write("<img src='imagenes/coche.png' alt='coche' />"); // Imagen de los coches
    numCoches--; 
}
document.write("</div>");
