document.addEventListener("DOMContentLoaded", function() {
    const nombreInput = document.getElementById("nombre");
    const movilInput = document.getElementById("movil");
    const guardarButton = document.getElementById("guardarBtn");
    const buscarButton = document.getElementById("buscarBtn");
    const eliminarButton = document.getElementById("eliminarBtn");
    const eliminarTodosButton = document.getElementById("eliminarTodoBtn");
    const contactosUL = document.getElementById("contactos");

    function guardarDatos() {
        const nombre = nombreInput.value.trim();
        const movil = movilInput.value.trim();

        if (nombre === "" || movil === "") {
            alert("Por favor ingrese nombre y móvil");
            return;
        }
        localStorage.setItem(nombre, movil);
        nombreInput.value = "";
        movilInput.value = "";
        actualizarDatos();
    }

    function buscarDatos() {
        const nombre = nombreInput.value.trim();
        const movilRecuperado = localStorage.getItem(nombre);

        if (movilRecuperado !== null) {
            movilInput.value = movilRecuperado;
        } else {
            alert("Contacto no encontrado");
            movilInput.value = "";
        }
    }

    function eliminarDatos() {
        const nombre = nombreInput.value.trim();
        if (nombre === "") {
            alert("Por favor, ingrese el nombre del contacto a eliminar");
            return;
        }
        if (localStorage.getItem(nombre) === null) {
            alert("El contacto " + nombre + " no existe para eliminar");
            return;
        }
        localStorage.removeItem(nombre);
        nombreInput.value = "";
        movilInput.value = "";
        actualizarDatos();
    }

    function eliminarTodo() {
        if (confirm("¿Estás seguro de que deseas eliminar todos los contactos?")) {
            localStorage.clear();
            actualizarDatos();
            nombreInput.value = "";
            movilInput.value = "";
        }
    }

    function actualizarDatos() {
        let registro = "";
        if (localStorage.length === 0) {
            registro = "<li>No existen contactos</li>";
        } else {
            for (let i = 0; i < localStorage.length; i++) {
                let key = localStorage.key(i);
                registro += '<li><span class="nom">' + key + '</span> ' +
                    '<span class="nom">' + localStorage.getItem(key) + '</span></li><br>';
            }
        }
        contactosUL.innerHTML = registro;
    }

    guardarButton.addEventListener("click", guardarDatos);
    buscarButton.addEventListener("click", buscarDatos);
    eliminarButton.addEventListener("click", eliminarDatos);
    eliminarTodosButton.addEventListener("click", eliminarTodo);

    actualizarDatos();
});
