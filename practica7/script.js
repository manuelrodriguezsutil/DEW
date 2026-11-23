const patrones = {
    // Uno o más nombres, cada uno con mayúscula inicial (Ej. Juan Carlos)
    nombre: /^[A-ZÁÉÍÓÚÑ][a-záéíóúüñ]+( [A-ZÁÉÍÓÚÑ][a-záéíóúüñ]+)*$/,

    // Uno o dos apellidos con mayúscula inicial separados por un espacio
    apellidos: /^[A-ZÁÉÍÓÚÑ][a-záéíóúüñ]+( [A-ZÁÉÍÓÚÑ][a-záéíóúüñ]+)?$/,

    // DNI (8 números) o NIE (X/Y/Z + 7 números) + una de las 23 letras válidas
    dni: /^(\d{8}|[XYZ]\d{7})[TRWAGMYFPDXBNJZSQVHLCKE]$/i,

    // DD/MM/AAAA con años entre 1900 y 2099 (validarFecha comprueba que el día exista)
    fechaNacimiento: /^(0[1-9]|[12]\d|3[01])\/(0[1-9]|1[0-2])\/(19|20)\d{2}$/,

    // Código postal español: 01000 a 52999
    codigoPostal: /^(0[1-9]|[1-4]\d|5[0-2])\d{3}$/,

    // usuario@dominio.ext (admite subdominios y el signo + en el usuario)
    email: /^[\w.+-]+@[a-z\d-]+(\.[a-z\d-]+)*\.[a-z]{2,}$/i,

    // +34 opcional (con o sin espacio) + 9 dígitos empezando por 8 o 9
    telefonoFijo: /^(\+34 ?)?[89]\d{8}$/,

    // +34 opcional (con o sin espacio) + 9 dígitos empezando por 6 o 7
    telefonoMovil: /^(\+34 ?)?[67]\d{8}$/,

    // ES + 22 dígitos. ( ?) y \1 obligan a usar el mismo separador en todos los bloques
    iban: /^ES\d{2}( ?)\d{4}(\1\d{4}){4}$/i,

    // 16 dígitos juntos o en 4 bloques de 4 separados por espacios (mismo criterio que el IBAN)
    tarjetaCredito: /^\d{4}( ?)\d{4}(\1\d{4}){2}$/,

    // 12 o más caracteres sin espacios con al menos una letra, un número y un carácter especial
    password: /^(?=.*[a-z])(?=.*\d)(?=.*[^a-z\d\s])\S{12,}$/i,

    // Comprueba que la fecha exista y que no sea posterior a hoy
    validarFecha(texto) {
        // Separar el texto por las barras
        const partes = texto.split("/");
        const dia = parseInt(partes[0]);
        const mes = parseInt(partes[1]);
        const anio = parseInt(partes[2]);

        // Crear la fecha (los meses van de 0 a 11, por eso se resta 1)
        const fecha = new Date(anio, mes - 1, dia);

        if (fecha.getDate() !== dia) {
            return false;
        }

        // La fecha de nacimiento no puede ser posterior a hoy
        const hoy = new Date();
        if (fecha > hoy) {
            return false;
        }

        return true;
    },

    // Comprueba el valor de un campo con su patrón. Devuelve true o false
    comprobar(campo) {
        // La repetición no usa regex solo se comprueba si coincide con la contraseña anterior
        if (campo.name === "passwordRepetida") {
            return campo.value !== "" && campo.value === campoPassword.value;
        }

        if (campo.name === "fechaNacimiento") {
            return this.fechaNacimiento.test(campo.value) && this.validarFecha(campo.value);
        }

        return this[campo.name].test(campo.value);
    },
};

let datos = {}; // objeto donde se guardan los datos del formulario

const inputs = document.querySelectorAll("#formulario input");
const campoPassword = document.querySelector("#password");
const campoPasswordRepetida = document.querySelector("#passwordRepetida");
const mensajeEstado = document.querySelector("#mensajeEstado");

// Teclas ignoradas para la validación
const teclasNavegacion = ["Tab", "Shift"];

// validar cada campo mientras se escribe
inputs.forEach((input) => {
    input.addEventListener("keyup", (evento) => {
        if (teclasNavegacion.includes(evento.key)) {
            return;
        }

        validar(evento.target);

        // Si cambia la contraseña y ya se había escrito la repetición, se vuelve a comprobar
        if (evento.target === campoPassword && campoPasswordRepetida.value !== "") {
            validar(campoPasswordRepetida);
        }
    });
});


document.querySelector("#botonGuardar").addEventListener("click", (evento) => {
    evento.preventDefault();
    guardar();
});

document.querySelector("#botonRecuperar").addEventListener("click", (evento) => {
    evento.preventDefault();
    recuperar();
});

document.querySelector("#formulario").addEventListener("submit", (evento) => {
    evento.preventDefault();
});

// Si es incorrecto lo pone en rojo y muestra su aviso. Devuelve true o false
function validar(campo) {
    const aviso = document.querySelector(`#${campo.id} + .aviso`);
    const esValido = patrones.comprobar(campo);

    campo.classList.toggle("invalido", !esValido);
    campo.classList.remove("valido"); // el verde solo aparece cuando TODO el formulario es correcto
    aviso.classList.toggle("visible", !esValido);

    return esValido;
}

// Valida todos los campos (sin parar en el primero que falle, para marcar todos los errores).
// Solo si todos son correctos se ponen en verde
function validarTodo() {
    let todoValido = true;

    // Recorrer todos los campos y validarlos uno a uno
    inputs.forEach((input) => {
        if (!validar(input)) {
            todoValido = false; 
        }
    });

    // Si todos los campos son correctos, se ponen en verde
    if (todoValido) {
        inputs.forEach((input) => {
            input.classList.add("valido");
        });
    }

    return todoValido;
}

// Si todo es correcto, copia los valores al objeto datos y lo guarda como JSON en sessionStorage
function guardar() {
    if (!validarTodo()) {
        mostrarMensaje("Hay campos incorrectos, revisa los que están marcados en rojo.", "error");
        return;
    }

    inputs.forEach((input) => {
        datos[input.name] = input.value;
    });

    try {
        sessionStorage.setItem("datos", JSON.stringify(datos));
        mostrarMensaje("Datos guardados correctamente.");
    } catch (error) {
        mostrarMensaje("No se han podido guardar los datos en el navegador.", "error");
    }
}

// Recupera los datos de sessionStorage, los muestra en sus campos y los valida de nuevo
function recuperar() {
    let datosRecuperados;

    // JSON.parse falla si el texto guardado está dañado o se ha modificado a mano
    try {
        datosRecuperados = JSON.parse(sessionStorage.getItem("datos"));
    } catch (error) {
        mostrarMensaje("Los datos guardados están dañados y no se pueden leer.", "error");
        return;
    }

    // getItem devuelve null si no hay nada guardado
    if (datosRecuperados === null) {
        mostrarMensaje("No hay datos guardados en esta sesión.", "error");
        return;
    }

    datos = datosRecuperados;

    // Rellenar cada campo con su dato, si falta alguno se deja vacío
    inputs.forEach((input) => {
        input.value = datos[input.name] ?? "";
    });

    // Validar otra vez ya que los datos pueden faltar o haberse alterado en sessionStorage
    if (validarTodo()) {
        mostrarMensaje("Datos recuperados correctamente.");
    } else {
        mostrarMensaje("Algunos datos recuperados no son válidos, revisa los campos en rojo.", "error");
    }
}

function mostrarMensaje(texto, tipo = "exito") {
    mensajeEstado.textContent = texto;
    mensajeEstado.className = `mensaje ${tipo}`;
}