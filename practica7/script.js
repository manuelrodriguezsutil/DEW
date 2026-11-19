const patrones = {
    nombre: /^[A-ZÁÉÍÓÚÑ][a-záéíóúñ]+( [A-ZÁÉÍÓÚÑ][a-záéíóúñ]+)*$/, // Uno o más nombres con mayúscula inicial
    apellidos: /^[A-ZÁÉÍÓÚÑ][a-záéíóúñ]+( [A-ZÁÉÍÓÚÑ][a-záéíóúñ]+)?$/, // Uno o dos apellidos con mayúscula inicial
    dni: /^(\d{8}|[XYZ]\d{7})[A-Z]$/i, // DNI (8 números + letra) o NIE (X/Y/Z + 7 números + letra)
    fechaNacimiento: /^(0[1-9]|[12]\d|3[01])\/(0[1-9]|1[0-2])\/\d{4}$/, // DD/MM/AAAA
    codigoPostal: /^(0[1-9]|[1-4]\d|5[0-2])\d{3}$/, // 01000 a 52999
    email: /^[\w.-]+@[\w.-]+\.[a-z]{2,}$/i, // usuario@dominio.ext
    telefonoFijo: /^(\+34)?[89]\d{8}$/, // 9 dígitos que empiezan por 8 o 9
    telefonoMovil: /^(\+34)?[67]\d{8}$/, // 9 dígitos que empiezan por 6 o 7
    iban: /^ES\d{2}( ?\d{4}){5}$/i, // ES + 22 dígitos
    tarjetaCredito: /^\d{4}( ?\d{4}){3}$/, // 16 dígitos
    password: /^(?=.*[a-z])(?=.*\d)(?=.*[^a-z\d\s])\S{12,}$/i, // 12 o más caracteres con letra, número y carácter especial

    // Método que comprueba el valor del campo con su patrón. Devuelve true o false
    comprobar(campo) {
        // passwordRepetida no usa regex, solo comprueba que sea igual que la contraseña
        if (campo.name === "passwordRepetida") {
            return (
                campo.value !== "" &&
                campo.value === document.querySelector("#password").value
            );
        }

        return this[campo.name].test(campo.value);
    },
};

// objeto donde se guardarán los datos del formulario.
let datos = {};

const inputs = document.querySelectorAll("input"); // todos los inputs del formulario
inputs.forEach((input) => {
    input.addEventListener("keyup", (e) => {
        // Al pulsar Tab solo cambiamos de campo, no se valida
        if (e.key === "Tab") {
            return;
        }

        validate(e.target);
    });
});

// Botones de guardar y recuperar
document.querySelector("#botonGuardar").addEventListener("click", (e) => {
    e.preventDefault();
    guardar();
});

document.querySelector("#botonRecuperar").addEventListener("click", (e) => {
    e.preventDefault();
    recuperar();
});

// Quitar que se recargue la página al hacer submit
document.querySelector("#formulario").addEventListener("submit", (e) => {
    e.preventDefault();
});

function validate(campo) {
    const aviso = document.querySelector("#" + campo.id + " + .aviso"); // seleccionar el aviso del campo

    if (patrones.comprobar(campo)) {
        campo.className = "";
        aviso.className = "aviso";
        return true;
    } else {
        campo.className = "invalido";
        aviso.className = "aviso visible";
        return false;
    }
}

function validarTodo() {
    inputs.forEach((input) => {
        if (!validate(input)) {
            return false;
        }
    });

    inputs.forEach((input) => {
        input.className = "valido";
    });

    return true;
}

function guardar() {
    if (!validarTodo()) {
        mostrarMensaje("Hay campos incorrectos, revisa los que están marcados en rojo.", "error");
        return;
    }

    inputs.forEach((input) => {
        datos[input.name] = input.value;
    });

    sessionStorage.setItem("datos", JSON.stringify(datos));
    mostrarMensaje("Datos guardados correctamente.");
}

function recuperar() {
    let datosGuardados = sessionStorage.getItem("datos");
    if (datosGuardados === null) {
        mostrarMensaje("No hay datos guardados.");
        return;
    }

    inputs.forEach((input) => {
        if (datos[input.name]) {
            input.value = datos[input.name];
        } else {
            input.value = "";
        }
    });
}

function mostrarMensaje(texto, tipo = "exito") {
    let mensaje = document.querySelector("#mensajeEstado");
    mensaje.textContent = texto;
    mensaje.className = "mensaje " + tipo;
}