// Validaciones 
const validacionInputNombre = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]{3,25}$/;
const validacionInputEmail = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
const validacionInputComentarios = /^.{3,30}$/;

// leyenda de error
function mostrarMensajeError(input, msj) {
    let errorDiv = input.nextElementSibling;
    if (!errorDiv || errorDiv.tagName !== 'DIV') {
        errorDiv = document.createElement('div');
        input.insertAdjacentElement('afterend', errorDiv);
    }
    errorDiv.innerText = msj;
    errorDiv.style.color = 'red';
    input.style.borderColor = msj ? 'red' : 'initial';  
}

// Validación genérica 
function validarInput(input, regex, mensajeError) {
    if (!regex.test(input.value)) {
        mostrarMensajeError(input, mensajeError);
        return false;
    }
    mostrarMensajeError(input, '');
    return true;
}

// obtener los inputs
const nombreInput = document.querySelector('input[name="nombre"]');
const emailInput = document.querySelector('input[name="email"]');
const comentariosInput = document.querySelector('textarea[name="comentarios"]');

// validacion dinamica
nombreInput.addEventListener('input', function () {
    validarInput(this, validacionInputNombre, 'El nombre debe contener entre 3 y 25 caracteres y solo letras.');
});

emailInput.addEventListener('input', function () {
    validarInput(this, validacionInputEmail, 'Ingrese un e-mail válido.');
});

comentariosInput.addEventListener('input', function () {
    validarInput(this, validacionInputComentarios, 'Los comentarios deben tener entre 3 y 30 caracteres.');
});

// Validación completa  
document.querySelector('form').addEventListener('submit', function (e) {
    e.preventDefault();  

    // Validar campos obligatorios
    const nombreValido = validarInput(nombreInput, validacionInputNombre, 'Nombre es obligatorio*.');
    const emailValido = validarInput(emailInput, validacionInputEmail, 'E-mail es obligatorio*.');

    // Verificar que todos los campos obligatorios esten correctamente ingresados
    if (nombreValido && emailValido) {
     //  por ahora mensaje de alert
        alert("Formulario enviado correctamente.");
    }
});
