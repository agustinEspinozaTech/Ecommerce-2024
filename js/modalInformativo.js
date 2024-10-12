// Crear y agregar el modal informativo dinámicamente
document.addEventListener('DOMContentLoaded', function() {
    // Crear el contenedor del modal
    const modal = document.createElement('div');
    modal.id = 'infoModal';
    modal.className = 'modal';

    // Crear el contenido del modal
    modal.innerHTML = `
        <div class="modal-content">
            <span class="close">&times;</span>
            <h2>¡Funcionalidad en construcción!</h2>
            <img id="tool" src="../assets/tool.png" alt="Sitio en desarrollo">
            <p>La opción seleccionada se encuentra en desarrollo, por favor intentá más tarde.</p>
        </div>
    `;

    // Agregar el modal al body
    document.body.appendChild(modal);

    // Seleccionar elementos del modal para agregar funcionalidad
    const closeModal = modal.querySelector('.close');

    // Función para mostrar el modal
    function showModal() {
        modal.style.display = "block";
    }

    // Función para cerrar el modal
    function closeModalFunc() {
        modal.style.display = "none";
    }

    // Cerrar el modal al hacer clic en la 'x'
    closeModal.addEventListener('click', closeModalFunc);

    // Cerrar el modal al hacer clic fuera de él
    window.addEventListener('click', (event) => {
        if (event.target === modal) {
            closeModalFunc();
        }
    });

    // Mostrar el modal al hacer clic en "Comprar"
    const comprarButtons = document.querySelectorAll('.cta-button,  form');
    comprarButtons.forEach(button => {
        button.addEventListener('click', (event) => {
            event.preventDefault(); 
            showModal(); 
        });
    });
});
