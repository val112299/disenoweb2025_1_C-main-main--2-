//Funcion para cargar el DOM
document.addEventListener("DOMContentLoaded", function() {
    const nombreImput = document.getElementById("nombre");
    const telefonoImput = document.getElementById("telefono");
    const guardarButton = document.getElementById("guardarBtn");
    const recuperarButton = document.getElementById("recuperarBtn");
    const listaUL = document.getElementById("lista");

    //funciones
    //guardar los datos
    function guardarDatos() {
        localStorage.nombre = nombreImput.value;
        localStorage.telefono = telefonoImput.value;
    }

    //recuperar los datos
    function recuperarDatos(){
    if (localStorage.nombre !== undefined && localStorage.telefono != undefined) {
        listaUL.innerHTML += "<li>" + localStorage.nombre + " - " + localStorage.telefono + "</li>";
    } else {
        listaUL.innerHTML = "<li>No hay datos guardados</li>";
    }
    }

    //Asignar los eventos a los botones
    guardarButton.addEventListener("click",guardarDatos);
    recuperarButton.addEventListener("click",recuperarDatos)
})