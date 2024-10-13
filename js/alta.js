document.addEventListener('DOMContentLoaded', function () {
    // obtener los input del formulario
    const nombreInput = document.getElementById('nombre');
    const precioInput = document.getElementById('precio');
    const stockInput = document.getElementById('stock');
    const marcaInput = document.getElementById('marca');
    const categoriaSelect = document.getElementById('categoria');  
    const descCortaInput = document.getElementById('descCorta');
    const descLargaInput = document.getElementById('descLarga');
    const envioInput = document.getElementById('envio');
    const edadDesdeInput = document.getElementById('edadDesde');
    const edadHastaInput = document.getElementById('edadHasta');
    const fotoInput = document.getElementById('foto');

    // Validaciones del formulario
    const validacionInputLetras = /^[\wáéíóúÁÉÍÓÚñÑ!@#\$%\^&\*\(\)\-_\+=\[\]{};:'",.<>\/?\\|`~\s]{3,25}$/;
    const validacionInputPrecio = /^(?!0\d)(\d{1,3}(\.\d{3})*|\d+)(,\d{2})?$/;
    const validacionInputStock = /^[1-9]\d*$/;
    const validacionInputEdad = /^(1[89]|[2-9]\d|1[0-4]\d|150)$/;
    const validacionInputMarca = /^(?!\s*$).{1,100}$/;
    const validacionInputDescCorta = /^[^\s][\s\S]{15,25}$/;
    const validacionInputDescLarga = /^[^\s][\s\S]{10,30}$/;
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

    // Validación genérica para campos
    function validarInput(input, regex, mensajeError) {
        if (!regex.test(input.value)) {
            mostrarMensajeError(input, mensajeError);
            return false;
        }
        mostrarMensajeError(input, '');
        return true;
    }

    // Validación dinámica en tiempo real para cada input
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
    descCortaInput.addEventListener('input', function () {
        validarInput(this, validacionInputDescCorta, 'Debe contener entre 15 y 25 caracteres.');
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
        e.preventDefault();  
        // Validar todos los campos obligatorios
        const nombreValido = validarInput(nombreInput, validacionInputLetras, 'Nombre es obligatorio*.');
        const precioValido = validarInput(precioInput, validacionInputPrecio, 'Precio es obligatorio*.');
        const stockValido = validarInput(stockInput, validacionInputStock, 'Stock es obligatorio*.');
        const validacionMarcaValida = validarInput(marcaInput, validacionInputMarca, 'Marca es obligatorio*.');
        
        // Validar categoria
        const categoriaValida = categoriaSelect.value !== "" ? true : (mostrarMensajeError(categoriaSelect, 'Debe seleccionar una categoría*'), false);

        const descCortaValida = validarInput(descCortaInput, validacionInputDescCorta, 'Categoría es obligatorio*.');
        const edadDesdeValido = validarInput(edadDesdeInput, validacionInputEdad, 'Edad es obligatorio*.');
        const edadHastaValido = validarInput(edadHastaInput, validacionInputEdad, 'Edad es obligatorio*.');
        const urlValida = validarInput(fotoInput, validacionInputURL, 'Debe ingresar una URL válida.');

        if (nombreValido &&
            precioValido &&
            stockValido &&
            edadDesdeValido &&
            edadHastaValido &&
            validacionMarcaValida &&
            categoriaValida &&
            urlValida &&
            descCortaValida) {
            // Crear el cuerpo del producto con la categoría seleccionada
            const nuevoProducto = {
                nombre: nombreInput.value,
                precio: `$${precioInput.value}`,
                stock: stockInput.value,
                marca: marcaInput.value,
                categoria: categoriaSelect.value,  
                descCorta: descCortaInput.value,
                descLarga: descLargaInput.value,
                envio: envioInput.checked ? 'Envío sin cargo' : 'Envío con cargo',
                edadDesde: edadDesdeInput.value,
                edadHasta: edadHastaInput.value,
                imagen: fotoInput.value
            };

            // Guardar el producto en localStorage
            let productos = JSON.parse(localStorage.getItem('productos')) || [];
            productos.push(nuevoProducto);
            localStorage.setItem('productos', JSON.stringify(productos));

            // Redirigir a la home al realizar click 
            window.location.href = '/html/index.html';
        }
    });
});
