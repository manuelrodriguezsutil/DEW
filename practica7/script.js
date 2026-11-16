let camposFormulario = {
    nombre: '',
    apellidos: '',
    dni: '',
    fechaNacimiento: '',
    codigoPostal: '',
    email: '',
    telefonoFijo: '',
    telefonoMovil: '',
    iban: '',
    tarjetaCredito: '',
    password: '',
    passwordRepetida: '',
};

const patrones = {
    nombre: /^[A-Z][A-Za-z\ ]+$/i,
    apellidos: /^[A-Z][A-Za-z]+\ [A-Z][A-Za-z]+$/i,
    dni: /^[x]*\d{8}[a-z]$/i,
    fechaNacimiento: '',
    codigoPostal: '',
    email: '',
    telefonoFijo: '',
    telefonoMovil: '',
    iban: '',
    tarjetaCredito: '',
    password: '',
    passwordRepetida: '',
};

const inputs = document.querySelectorAll("input");
const botonGuardar = document.querySelector("#botonGuardar");
botonGuardar.onclick = (e) => {
    e.preventDefault();
    guardar();
}

inputs.forEach((input) => {
    input.addEventListener("keyup", (e) => {
        validate(e.target, patrones[e.target.attributes.name.value]);
    });
});

function validate(campo, regex) {
    if (regex.test(campo.value)) {
        campo.className = 'valido';
    } else {
        campo.className = 'invalido';
    }
}

function guardar() { }