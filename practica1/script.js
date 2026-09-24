// division 1: carteles 

let numCarteles = Number(prompt("¿Cuántos carteles quieres?"));

document.write("<div>");
for (let i = 0; i < numCarteles; i++) {
    console.log(`Dibujando cartel: ${i}`)
    document.write("<img src=imagenes/cartel.png alt='cartel' />"); // Imagen de los carteles 
}
document.write("</div>");

// division 2: puertas y numeros

let numPuertas = Number(prompt("¿Cuántas puertas quieres?"));
let numPrimeraPuerta = Number(prompt("¿Cuál es el número de la primera puerta?"));

document.write("<div>");
for (let i = 0; i < numPuertas; i++) {
    console.log(`Dibujando puerta: ${i}`)
    document.write("<img src=imagenes/puerta.png alt='puerta' />"); // imagen de las puertas 
    document.write(`<p>${numPrimeraPuerta}</p>`); // numero de las puertas 
    numPrimeraPuerta += 2;
}
document.write("</div>");

// division 3: escaparates

let numEscaparates = Number(prompt("¿Cuántos escaparates quieres?"));

document.write("<div>");
for (let i = 0; i < numEscaparates; i++) {
    console.log(`Dibujando escaparates: ${i}`);
    document.write("<img src='imagenes/escaparate.jpg' alt='escaparate' />"); // Imagen de los escaparates 
    document.write("<img src='imagenes/oferta.png' alt='oferta' />"); // Imagen de las ofertas 
}
document.write("</div>");

// division 4: semaforo y reloj

let colorSemaforo = prompt("¿De qué color quieres el semáforo?");
colorSemaforo = colorSemaforo.toLowerCase();

let horaReloj = prompt("¿Qué hora quieres que tenga el reloj (1-12)?");
horaReloj = Number(horaReloj);

// Si pone un valor no permitido, volver a preguntar
while (colorSemaforo != "rojo" && colorSemaforo != "ambar" && colorSemaforo != "verde") {
    alert("Color no permitido. Debe ser: rojo, verde o ambar.")

    colorSemaforo = prompt("¿De qué color quieres el semáforo?");
    colorSemaforo = colorSemaforo.toLowerCase();
}

document.write("<div>");
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

// La hora deben estar entre 1 y 12. Si no, vuelve a preguntar
while(horaReloj > 12 || horaReloj < 1) {
    alert("Debe ser una hora entre 1-12")
    horaReloj = Number(prompt("¿Qué hora quieres que tenga el reloj (1-12)?"));
}

switch(horaReloj) {
    default:
        document.write(`<img src='imagenes/reloj-${horaReloj}.jpg' alt='reloj' />`);
}
document.write("</div>");

// division 5: coches 

let numCoches = prompt("¿Cuántos coches quieres?");
numCoches = Number(numCoches)

document.write("<div>");
while (numCoches > 0) {
    document.write("<img src='imagenes/coche.png' alt='coche' />"); // Imagen de los coches
    numCoches--; 
}
document.write("</div>");
