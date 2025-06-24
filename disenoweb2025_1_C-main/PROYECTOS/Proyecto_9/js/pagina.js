// Animación de los productos cuando se carga la página
document.addEventListener('DOMContentLoaded', function() {
    const productos = document.querySelectorAll('.product');
    productos.forEach((producto, index) => {
        setTimeout(() => {
            producto.style.opacity = 1;
            producto.style.transform = 'translateY(0)';
        }, 300 * index);
    });

    // Animación para el botón de búsqueda
    document.querySelector('button').addEventListener('click', function() {
        alert('Buscando productos...');
    });
});
