// Datos de productos 
const productos = {
    1: { imagen: "../assets/zapato.jpg", nombre: "Producto 1", descCorta: "Descripción del Producto 1", precio: "$10", marca: "cualquier marca" },
    2: { imagen: "../assets/zapato.jpg", nombre: "Producto 2", descCorta: "Descripción del Producto 2", precio: "$20", marca: "cualquier marca" },
    3: { imagen: "../assets/zapato.jpg", nombre: "Producto 3", descCorta: "Descripción del Producto 3", precio: "$30", marca: "cualquier marca" },
    4: { imagen: "../assets/zapato.jpg", nombre: "Producto 4", descCorta: "Descripción del Producto 4", precio: "$40", marca: "cualquier marca" },
    5: { imagen: "../assets/zapato.jpg", nombre: "Producto 5", descCorta: "Descripción del Producto 5", precio: "$50", marca: "cualquier marca" },
    6: { imagen: "../assets/zapato.jpg", nombre: "Producto 6", descCorta: "Descripción del Producto 6", precio: "$60", marca: "cualquier marca" },
    7: { imagen: "../assets/zapato.jpg", nombre: "Producto 7", descCorta: "Descripción del Producto 7", precio: "$70", marca: "cualquier marca" },
    8: { imagen: "../assets/zapato.jpg", nombre: "Producto 8", descCorta: "Descripción del Producto 8", precio: "$80", marca: "cualquier marca" }
};

// obtener elementos del modal
const modal = document.getElementById('productModal');
const modalImg = document.getElementById('modal-image');
const modalTitle = document.getElementById('modal-title');
const modalDesc = document.getElementById('modal-description');
const modalPrice = document.getElementById('modal-price');
const modalMarca = document.getElementById('marca');
const closeModal = document.getElementsByClassName('close')[0];

/* Parte dinámica del main */
let anuncios = [
    { texto: "Descuento especial en zapatos" },
    { texto: "Envío gratis en compras mayores a $50" },
    { texto: "2x1 en ropa seleccionada" },
    { texto: "Cualquier cosa acá" },
    { texto: "Cualquier cosa acá2" },
    { texto: "Cualquier cosa acá3" },
    { texto: "Cualquier cosa acá4" },
];

let indiceActual = 0;
const heroSection = document.querySelector("main > section:first-of-type .hero-content");

const textElement = document.createElement("h2");
textElement.id = "hero-texto";
textElement.textContent = anuncios[indiceActual].texto;

// Inserta el elemento 
const buttonElement = heroSection.querySelector(".cta-button");
heroSection.insertBefore(textElement, buttonElement);

// cambiar el anuncio
const cambiarAnuncio = () => {
    indiceActual = (indiceActual + 1) % anuncios.length;
    textElement.textContent = anuncios[indiceActual].texto;
};

// Cambia de anuncio cada 2.5 segundos
setInterval(cambiarAnuncio, 2500);

// manejar errores de carga de imágenes
function handleImageError(event) {
    event.target.src = '../assets/nodisponible.png';
}

// Cargar productos almacenados en localStorage y asignar event listeners
document.addEventListener('DOMContentLoaded', function () {
    const contenedorProductos = document.querySelector('.product-grid');
    const productosGuardados = JSON.parse(localStorage.getItem('productos')) || [];

    // Contar el número de productos iniciales (asumiendo que ya están en el HTML)
    const initialProductCards = contenedorProductos.querySelectorAll('.product-card');
    const initialProductCount = initialProductCards.length;

    // Agregar productos guardados en localStorage al DOM
    productosGuardados.forEach((producto) => {
        const productCard = document.createElement('div');
        productCard.classList.add('product-card');
        productCard.innerHTML = `
            <img src="${producto.imagen}" alt="${producto.nombre}" onerror="this.src='../assets/nodisponible.png'">
            <h4>${producto.nombre}</h4>
            <p>${producto.descCorta}</p>
            <a href="#" class="buy-button">Ver detalles</a>
            <a href="#" class="cta-button">Comprar</a>
        `;

        contenedorProductos.appendChild(productCard);
    });

    // Asignar event listener al contenedor para manejar los clicks en  "Ver detalles"
    contenedorProductos.addEventListener('click', function (event) {
        if (event.target.classList.contains('buy-button')) {
            event.preventDefault();

            const productCard = event.target.closest('.product-card');
            const allProductCards = Array.from(contenedorProductos.querySelectorAll('.product-card'));
            const index = allProductCards.indexOf(productCard);

            if (index < initialProductCount) {
                // Producto inicial
                const producto = productos[index + 1]; 

                if (producto) {
                    modalImg.src = producto.imagen;
                    modalImg.onerror = handleImageError;
                    modalTitle.textContent = producto.nombre;
                    modalDesc.textContent = producto.descCorta;
                    modalPrice.textContent = producto.precio;
                    modalMarca.textContent = producto.marca;

                    modal.style.display = "block"; 
                } else {
                    console.error(`Producto inicial no encontrado para el índice ${index + 1}`);
                }
            } else {
                // Producto agregado desde localStorage
                const productoIndex = index - initialProductCount;
                const producto = productosGuardados[productoIndex];

                if (producto) {
                    modalImg.src = producto.imagen;
                    modalImg.onerror = handleImageError;
                    modalTitle.textContent = producto.nombre;
                    modalDesc.textContent = producto.descLarga || producto.descCorta;
                    modalPrice.textContent = producto.precio;
                    modalMarca.textContent = producto.marca;

                    modal.style.display = "block"; 
                } else {
                    console.error(`Producto guardado no encontrado para el índice ${productoIndex}`);
                }
            }
        }
    });
});

// Cerrar el modal al hacer clic en la 'x'
closeModal.addEventListener('click', () => {
    modal.style.display = "none";
});

// Cerrar el modal al hacer clic fuera de él
window.addEventListener('click', (event) => {
    if (event.target === modal) {
        modal.style.display = "none";
    }
});

//puedo eliminar los productos creados
/* localStorage.removeItem('productos'); */
