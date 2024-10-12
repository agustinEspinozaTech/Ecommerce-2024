document.addEventListener('DOMContentLoaded', function () {
    // obtener los input del formulario
    const nombreInput = document.getElementById('nombre');
    const precioInput = document.getElementById('precio');
    const stockInput = document.getElementById('stock');
    const marcaInput = document.getElementById('marca');
    const categoriaInput = document.getElementById('categoria');
    const descCortaInput = document.getElementById('descCorta');
    const descLargaInput = document.getElementById('descLarga');
    const envioInput = document.getElementById('envio');
    const edadDesdeInput = document.getElementById('edadDesde');
    const edadHastaInput = document.getElementById('edadHasta');
    const fotoInput = document.getElementById('foto'); // Ahora es un input de tipo 'url'

    // Validaciones del formulario
    const validacionInputLetras = /^[\wáéíóúÁÉÍÓÚñÑ!@#\$%\^&\*\(\)\-_\+=\[\]{};:'",.<>\/?\\|`~]{3,25}$/;
    const validacionInputPrecio = /^(?!0\d)(\d{1,3}(\.\d{3})*|\d+)(,\d{2})?$/;
    const validacionInputStock = /^[1-9]\d*$/;
    const validacionInputEdad = /^(1[89]|[2-9]\d|1[0-4]\d|150)$/;
    const validacionInputMarca = /^(?!\s*$).{1,100}$/;
    const validacionInputCategoria = /^(?!\s)(?!.*\s{2,})(?!.*\s$).{1,100}$/;
    const validacionInputDescCorta = /^[^\s][\s\S]{0,9}$/;
    const validacionInputDescLarga = /^[^\s][\s\S]{0,19}$/;
    const validacionInputURL = /^(ftp|http|https):\/\/[^ "]+$/;

    // Mensaje de error
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

    //  validación genérica para campos
    function validarInput(input, regex, mensajeError) {
        if (!regex.test(input.value)) {
            mostrarMensajeError(input, mensajeError);
            return false;
        }
        mostrarMensajeError(input, '');
        return true;
    }

    // validación dinámica en tiempo real para cada input
    nombreInput.addEventListener('input', function () {
        validarInput(this, validacionInputLetras, 'El formato es inválido.');
    });
    precioInput.addEventListener('input', function () {
        validarInput(this, validacionInputPrecio, 'El formato es inválido.');
    });
    stockInput.addEventListener('input', function () {
        validarInput(this, validacionInputStock, 'Debe ser un número entero positivo.');
    });
    marcaInput.addEventListener('input', function () {
        validarInput(this, validacionInputMarca, 'Formato inválido.');
    });
    categoriaInput.addEventListener('input', function () {
        validarInput(this, validacionInputCategoria, 'Formato inválido.');
    });
    descCortaInput.addEventListener('input', function () {
        validarInput(this, validacionInputDescCorta, 'No debe contener más de 10 caracteres.');
    });
    descLargaInput.addEventListener('input', function () {
        validarInput(this, validacionInputDescLarga, 'No debe contener más de 20 caracteres.');
    });
    edadDesdeInput.addEventListener('input', function () {
        validarInput(this, validacionInputEdad, 'Debe ser mayor de 18 años.');
    });
    edadHastaInput.addEventListener('input', function () {
        validarInput(this, validacionInputEdad, 'La edad debe estar entre 18 y 150 años.');
    });
    fotoInput.addEventListener('input', function () {
        validarInput(this, validacionInputURL, 'Debe ingresar una URL válida.');
    });

    // Validación completa al enviar el formulario
    document.querySelector('form').addEventListener('submit', function (e) {
        e.preventDefault();  // Evitar que la página se recargue

        // Validar todos los campos al enviar
        const nombreValido = validarInput(nombreInput, validacionInputLetras, 'Campo nombre es obligatorio*.');
        const precioValido = validarInput(precioInput, validacionInputPrecio, 'Campo precio es obligatorio*.');
        const stockValido = validarInput(stockInput, validacionInputStock, 'Campo stock es obligatorio*.');
        const validacionMarcaValida = validarInput(marcaInput, validacionInputMarca, 'Campo marca es obligatorio*.');
        const validacionCategoriaValida = validarInput(categoriaInput, validacionInputCategoria, 'Campo categoría es obligatorio*.');
        const descCortaValida = validarInput(descCortaInput, validacionInputDescCorta, 'Campo categoría es obligatorio*.');
        const edadDesdeValido = validarInput(edadDesdeInput, validacionInputEdad, 'Campo edad es obligatorio*.');
        const edadHastaValido = validarInput(edadHastaInput, validacionInputEdad, 'Campo edad es obligatorio*.');
        const urlValida = validarInput(fotoInput, validacionInputURL, 'Debe ingresar una URL válida.');

        if (nombreValido &&
            precioValido &&
            stockValido &&
            edadDesdeValido &&
            edadHastaValido &&
            validacionMarcaValida &&
            validacionCategoriaValida &&
            urlValida &&
            descCortaValida) {
            // Obtener la URL de la imagen ingresada
            const imagen = fotoInput.value;

            // Crear el cuerpo del producto
            const nuevoProducto = {
                nombre: nombreInput.value,
                precio: `$${precioInput.value}`,
                stock: stockInput.value,
                marca: marcaInput.value,
                categoria: categoriaInput.value,
                descCorta: descCortaInput.value,
                descLarga: descLargaInput.value,
                envio: envioInput.checked ? 'Envío sin cargo' : 'Envío con cargo',
                edadDesde: edadDesdeInput.value,
                edadHasta: edadHastaInput.value,
                imagen: imagen
            };

            // Guardar el producto en localStorage
            let productos = JSON.parse(localStorage.getItem('productos')) || [];
            productos.push(nuevoProducto);
            localStorage.setItem('productos', JSON.stringify(productos));

            // Redirigir a la home
            window.location.href = '/html/index.html';
        }
    });
});
