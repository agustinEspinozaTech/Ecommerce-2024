// Datos de productos 
const productos = {
    1: { imagen: "../assets/productos/zapatosdeportivos.png", nombre: "Zapatos Deportivos Running", descCorta: "Zapatos ligeros y cómodos, ideales para correr.", precio: "$50", marca: "SportMax" },
    2: { imagen: "../assets/productos/Silla.jpg", nombre: "Silla de Oficina Ergonómica", descCorta: "Silla ajustable con soporte lumbar.", precio: "$120", marca: "ComfortSeat" },
    3: { imagen: "../assets/productos/camisadeportiva.png", nombre: "Camiseta Deportiva", descCorta: "Camiseta de entrenamiento.", precio: "$25", marca: "Adidas" },
    4: { imagen: "../assets/productos/microondas.webp", nombre: "Microondas", descCorta: "Microondas con múltiples funciones y temporizador.", precio: "$80", marca: "ElectroHome" },
    5: { imagen: "../assets/productos/bloquejuego.webp", nombre: "Set de Bloques de Construcción", descCorta: "Juguete educativo con bloques para niños.", precio: "$25", marca: "Build&Play" },
    6: { imagen: "../assets/productos/ps5.webp", nombre: "PlayStation 5", descCorta: "Consola de videojuegos", precio: "$800", marca: "Sony" },
    7: { imagen: "../assets/productos/aspiradorarobot.jpg", nombre: "Aspiradora robot", descCorta: "Aspiradora eléctrica para el hogar.", precio: "$200", marca: "Samsung" },
    8: { imagen: "../assets/productos/ollas.jpeg", nombre: "Set de ollas", descCorta: "Seis ollas para cocina profesional.", precio: "$70", marca: "Hudson" },

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
    { texto: "Descuento especial en calzados.", imagen: "../assets/productos/zapatosdeportivos.png" },
    { texto: "Envío gratis en compras mayores a $50.", imagen: "../assets/productos/silla.jpg" },
    { texto: "Hasta 12 cuotas sin interés en toda la colección de ropa.", imagen: "../assets/productos/camisadeportiva.png" },
    { texto: "Rebajas imperdibles: 30% de descuento en electrodomésticos seleccionados.", imagen: "../assets/productos/microondas.webp" },
    { texto: "Compra hoy y paga en 6 cuotas sin interés en todos nuestros juguetes.", imagen: "../assets/productos/bloquejuego.webp" },
    { texto: "Hasta 6 cuotas sin interés en los últimos lanzamientos de videojuegos.", imagen: "../assets/productos/ps5.webp" },
    { texto: "Compra tu aspiradora en 12 cuotas sin interés, ¡limpieza sin esfuerzo!", imagen: "../assets/productos/aspiradorarobot.jpg" },
    { texto: "Hasta 40% de descuento en ollas de alta calidad, ¡solo por tiempo limitado!", imagen: "../assets/productos/ollas.jpeg" },
];

let indiceActual = 0;
const heroSection = document.querySelector("main > section:first-of-type .hero-content");

const textElement = document.createElement("h2");
textElement.id = "hero-texto";
textElement.textContent = anuncios[indiceActual].texto;

const imageElement = document.createElement("img");
imageElement.id = "hero-imagen";
imageElement.src = anuncios[indiceActual].imagen;  // Ruta de la primera imagen
imageElement.alt = "Anuncio";

// Inserta el elemento 
const buttonElement = heroSection.querySelector(".cta-button");
heroSection.insertBefore(textElement, buttonElement);

heroSection.insertBefore(imageElement, buttonElement);


// cambiar el anuncio
const cambiarAnuncio = () => {
    indiceActual = (indiceActual + 1) % anuncios.length;
    textElement.textContent = anuncios[indiceActual].texto;
    imageElement.src = anuncios[indiceActual].imagen;  // Actualiza la imagen
};


// Cambia de anuncio cada 3 segundos
setInterval(cambiarAnuncio, 3000);

// manejar errores de carga de imágenes
function handleImageError(event) {
    event.target.src = '../assets/nodisponible.png';
}

// Cargar productos almacenados 
document.addEventListener('DOMContentLoaded', function () {
    const contenedorProductos = document.querySelector('.product-grid');
    const productosGuardados = JSON.parse(localStorage.getItem('productos')) || [];

    // Contar el número de productos iniciales 
    const initialProductCards = contenedorProductos.querySelectorAll('.product-card');
    const initialProductCount = initialProductCards.length;

    // Agregar productos guardados en localStorage al DOM
    productosGuardados.forEach((producto) => {
        const productCard = document.createElement('div');
        productCard.classList.add('product-card');
        productCard.innerHTML = `
            <img src="${producto.imagen}" alt="${producto.nombre}" onerror="this.src='../assets/nodisponible.png'">
            <h4>${producto.nombre} <br>
            (${producto.categoria})</h4>
            <p>${producto.precio}</p>
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

// Cerrar el modal al hacer click en la 'x'
closeModal.addEventListener('click', () => {
    modal.style.display = "none";
});

// Cerrar el modal al hacer click fuera de él
window.addEventListener('click', (event) => {
    if (event.target === modal) {
        modal.style.display = "none";
    }
});

//puedo eliminar los productos creados
/*  localStorage.removeItem('productos');  */   
