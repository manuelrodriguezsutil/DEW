// A partir de la actividad anterior, crea un constructor para un numero de calles dado.
// Usar Array para textos o manejo de datos
// Cada calle construida tendrá sus atributos como en la Actividad 1.
// Cada calle tendrá sus métodos como funciones que pintan cada división.
// Se mostrará el objeto construido que el usuario elija en una nueva pestaña.

// 1) Sangrado y comentado correctamente. Nombres de variables en camelCase y significativos con comentarios, mensajes, menús y variables.
// 2) Utiliza al menos una página principal donde y tantas pestañas  como calles se quieran crear
// 3) Robustez y manejo de errores. 
// 4 )Optimización del código(Funciones modulares para cada tarea.).
// 5) Modularidad (Funciones modulares para cada tarea).
// 6) Uso de Arrays para la gestión de datos.
// 7) Uso de Objetos .
// 8) Uso de Constructores para declarar objetos.
// 9) Uso de hojas de estilo.
// 10) Tarea completa y original.

// Constructor del objeto
let Calle = function (numCarteles, numPuertas, numPrimeraPuerta, numEscaparates, colorSemaforo, horaReloj, numCoches) {
    // atributos de los objetos 
    this.numCarteles = numCarteles;
    this.numPuertas = numPuertas;
    this.numPrimeraPuerta = numPrimeraPuerta;
    this.numEscaparates = numEscaparates;
    this.colorSemaforo = colorSemaforo;
    this.horaReloj = horaReloj;
    this.numCoches = numCoches;

    // funciones para dibujar las diferentes partes
    this.dibujarCarteles = function (doc) {
        doc.write("<div>"); // abrir la división
        for (let i = 0; i < this.numCarteles; i++) {
            console.log(`Dibujando cartel: ${i}`)
            doc.write("<img src=imagenes/cartel.png alt='cartel' />"); // Imagen de los carteles 
        }
        doc.write("</div>");
    }

    this.dibujarPuertas = function (doc) {
        let numeroDePuerta = this.numPrimeraPuerta;

        doc.write("<div>");
        for (let i = 0; i < this.numPuertas; i++) {
            console.log(`Dibujando puerta: ${i}`)
            doc.write("<img src=imagenes/puerta.png alt='puerta' />"); // imagen de las puertas 
            doc.write(`<p>${numeroDePuerta}</p>`); // numero de las puertas 
            numeroDePuerta += 2; // incrementar el número de puertas por 2 
        }
        doc.write("</div>");
    }

    this.dibujarEscaparates = function (doc) {
        doc.write("<div>");
        for (let i = 0; i < this.numEscaparates; i++) {
            console.log(`Dibujando escaparates: ${i}`);
            doc.write("<img src='imagenes/escaparate.jpg' alt='escaparate' />"); // Imagen de los escaparates 
            doc.write("<img src='imagenes/oferta.png' alt='oferta' />"); // Imagen de las ofertas 
        }
        doc.write("</div>");
    }

    this.dibujarSemaforo = function (doc) {
        if (this.colorSemaforo == "rojo") {
            // semaforo en rojo
            doc.write("<img src='imagenes/semaforo_rojo.jpg' alt='semaforo rojo' />");
        } else if (this.colorSemaforo == "ambar") {
            // semaforo amarillo 
            doc.write("<img src='imagenes/semaforo_ambar.jpg' alt='semaforo ambar' />");
        } else if (this.colorSemaforo == "verde") {
            // semaforo verde 
            doc.write("<img src='imagenes/semaforo_verde.jpg' alt='semaforo verde' />");
        } else {
            alert("Color no permitido. Debe ser: rojo, verde o ambar.")
        }
    }

    this.dibujarReloj = function (doc) {
        // switch para las horas 
        switch (this.horaReloj) {
            default:
                doc.write(`<img src='imagenes/reloj-${this.horaReloj}.jpg' alt='reloj' />`);
        }
    }

    this.dibujarCoches = function (doc) {
        let coches = this.numCoches; // variable local para no cambiar el atributo del objeto

        doc.write("<div>");
        while (coches > 0) {
            doc.write("<img src='imagenes/coche.png' alt='coche' />"); // Imagen de los coches
            coches--;
        }
        doc.write("</div>");
    }

    // funcion de dibujar toda la calle para no tener que dibujar cada seccion a mano
    this.dibujar = function (doc) {
        this.dibujarCarteles(doc);
        this.dibujarPuertas(doc);
        this.dibujarEscaparates(doc);

        doc.write("<div>"); // Abrir la división aquí para poner el semaforo y el reloj en la misma división
        this.dibujarSemaforo(doc);
        this.dibujarReloj(doc);
        doc.write("</div>");

        this.dibujarCoches(doc);
    }
}

// Funciones para pedir los atributos al usuario 
function pedirNumero(mensaje) {
    let num = Number(prompt(mensaje)); // convierte a entero la string introducida, si no se puede, devuelve un NaN

    while (isNaN(num)) { // verificar que el numero introducido es un numero
        alert("Error: debes introducir un número.");
        num = Number(prompt(mensaje));
    }

    return num;
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

    // la hora debe ser un número válido
    while (isNaN(hora)) {
        alert("Error: debes introducir un número entre 1-12");
        hora = Number(prompt("¿Qué hora quieres que tenga el reloj (1-12)?"));
    }

    // La hora debe estar entre 1 y 12. Si no, vuelve a preguntar
    while (hora > 12 || hora < 1) {
        alert("Error: debes introducir un número entre 1-12");
        hora = Number(prompt("¿Qué hora quieres que tenga el reloj (1-12)?"));
    }
    return hora;
}

function pedirNumeroCalles() {
    let numCalle = Number(prompt("¿Cuántas calles quieres?"));

    while (isNaN(numCalle)) {
        alert("Error: debes introducir un número.");
        numCalle = Number(prompt("¿Cuántas calles quieres?"));
    }

    return numCalle;
}

// Pedir número de calles
let numCalles = pedirNumeroCalles();

// Array de calles 
let calles = [];

// Crear todas las calles
for (let i = 0; i < numCalles; i++) {
    alert(`Creando calle ${i + 1}`);

    // Pedir los atributos 
    let numCarteles = pedirNumero("¿Cuántos carteles quieres?");
    let numPuertas = pedirNumero("¿Cuántas puertas quieres?");
    let numPrimeraPuerta = pedirNumero("¿Cuál es el número de la primera puerta?");
    let numEscaparates = pedirNumero("¿Cuántos escaparates quieres?");
    let colorSemaforo = pedirColorSemaforo();
    let horaReloj = pedirHoraReloj();
    let numCoches = pedirNumero("¿Cuántos coches quieres?");

    // Crear la nueva calle 
    let calle = new Calle(
        numCarteles,
        numPuertas,
        numPrimeraPuerta,
        numEscaparates,
        colorSemaforo,
        horaReloj,
        numCoches
    );

    // Añadir la calle al array
    calles.push(calle);
}

// Dibujar las calles en ventanas nuevas
for (let i = 0; i < numCalles; i++) {
    let ventana = window.open("", "_blank") // crear nueva ventana vacía

    // Añadir el html a la nueva ventana
    ventana.document.write(`
        <!DOCTYPE html>
        <html lang="en">

        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Document</title>
            <link rel="stylesheet" href="estilos.css">
        </head>

        <body>
            <h1>Calle ${i + 1}</h1>
    `);

    // Dibujar la calle
    calles[i].dibujar(ventana.document)

    // cerrar el html de la ventana
    ventana.document.write(`
        </body>
        </html>
    `);

    // cerrar el documento de la ventana para que no se pueda escribir más 
    ventana.document.close();
}