document.addEventListener('DOMContentLoaded', function() {
    const secciones = document.querySelectorAll('.seccion');
    let indiceActual = 0;

    // mostrar la primera seccion inicialmente
    secciones[indiceActual].classList.add('activa');

    //  mostrar la siguiente seccion
    function mostrarSiguienteSeccion() {
        secciones[indiceActual].classList.remove('activa');
        indiceActual = (indiceActual + 1) % secciones.length;
        secciones[indiceActual].classList.add('activa');
    }

    // mostrar la sección anterior
    function mostrarSeccionAnterior() {
        secciones[indiceActual].classList.remove('activa');
        indiceActual = (indiceActual - 1 + secciones.length) % secciones.length;
        secciones[indiceActual].classList.add('activa');
    }

    // Cambiar de seccion automaticamente cada 2.5 segundos
    let intervalo = setInterval(mostrarSiguienteSeccion, 5000);

    // detener el cambio automatico y reiniciar el intervalo
    function reiniciarIntervalo() {
        clearInterval(intervalo);  
        intervalo = setInterval(mostrarSiguienteSeccion, 5000);  
    }

    // click en los botones de navegación
    document.getElementById('siguiente').addEventListener('click', () => {
        mostrarSiguienteSeccion();
        reiniciarIntervalo();  
    });

    document.getElementById('previo').addEventListener('click', () => {
        mostrarSeccionAnterior();
        reiniciarIntervalo(); 
    });
});
