// Referencias al DOM
const nombreInput = document.getElementById("nombre");
const movilInput = document.getElementById("movil");
const emailInput = document.getElementById("email");
const guardarBtn = document.getElementById("guardarBtn");
const buscarBtn = document.getElementById("buscarBtn");
const eliminarBtn = document.getElementById("eliminarBtn");
const eliminarTodoBtn = document.getElementById("eliminarTodoBtn");
const contactosLista = document.getElementById("contactos");

let modoEdicion = false;
let nombreOriginal = "";

// Utilidades
function obtenerContactos() {
  const contactos = localStorage.getItem("agendaContactos");
  return contactos ? JSON.parse(contactos) : [];
}

function guardarContactos(contactos) {
  localStorage.setItem("agendaContactos", JSON.stringify(contactos));
}

function mostrarContactos(contactos) {
  contactosLista.innerHTML = "";

  // Ordenar alfabéticamente
  contactos.sort((a, b) => a.nombre.localeCompare(b.nombre));

  contactos.forEach(contacto => {
    const li = document.createElement("li");
    li.innerHTML = `
      <span>${contacto.nombre}</span>
      <span>${contacto.movil}</span>
      <span>${contacto.email}</span>
      <button class="editarBtn">✏️</button>
    `;
    li.querySelector(".editarBtn").addEventListener("click", () => cargarEdicion(contacto));
    contactosLista.appendChild(li);
  });
}

function validarEmail(email) {
  const regex = /^[^@]+@[^@]+\.[a-z]{2,}$/i;
  return regex.test(email);
}

function validarCelular(movil) {
  return /^[0-9]{9}$/.test(movil); // Ejemplo para Perú (9 dígitos)
}

// Cargar datos para editar
function cargarEdicion(contacto) {
  nombreInput.value = contacto.nombre;
  movilInput.value = contacto.movil;
  emailInput.value = contacto.email;
  nombreOriginal = contacto.nombre;
  modoEdicion = true;
  guardarBtn.textContent = "Actualizar";
}

// Guardar o actualizar contacto
guardarBtn.addEventListener("click", () => {
  const nombre = nombreInput.value.trim();
  const movil = movilInput.value.trim();
  const email = emailInput.value.trim();

  if (!nombre || !movil || !email) {
    alert("Completa todos los campos.");
    return;
  }

  if (!validarEmail(email)) {
    alert("Email no válido.");
    return;
  }

  if (!validarCelular(movil)) {
    alert("Celular debe tener 9 dígitos numéricos.");
    return;
  }

  let contactos = obtenerContactos();

  if (modoEdicion) {
    // Actualizar
    const index = contactos.findIndex(c => c.nombre === nombreOriginal);
    if (index !== -1) {
      contactos[index] = { nombre, movil, email };
      guardarContactos(contactos);
      mostrarContactos(contactos);
      resetFormulario();
      alert("Contacto actualizado.");
    }
  } else {
    // Verificar duplicado
    const existe = contactos.some(c => c.nombre.toLowerCase() === nombre.toLowerCase());
    if (existe) {
      alert("Ya existe un contacto con ese nombre.");
      return;
    }

    // Guardar nuevo
    contactos.push({ nombre, movil, email });
    guardarContactos(contactos);
    mostrarContactos(contactos);
    resetFormulario();
  }
});

// Buscar por nombre parcial
buscarBtn.addEventListener("click", () => {
  const nombre = nombreInput.value.trim().toLowerCase();
  const contactos = obtenerContactos();
  const filtrados = contactos.filter(c => c.nombre.toLowerCase().includes(nombre));
  mostrarContactos(filtrados);

  if (filtrados.length === 0) {
    alert("No se encontraron coincidencias.");
  }
});

// Eliminar por nombre exacto
eliminarBtn.addEventListener("click", () => {
  const nombre = nombreInput.value.trim().toLowerCase();
  let contactos = obtenerContactos();
  const nuevos = contactos.filter(c => c.nombre.toLowerCase() !== nombre);

  if (contactos.length === nuevos.length) {
    alert("No se encontró ese contacto.");
    return;
  }

  guardarContactos(nuevos);
  mostrarContactos(nuevos);
  alert("Contacto eliminado.");
  resetFormulario();
});

// Eliminar todos
eliminarTodoBtn.addEventListener("click", () => {
  if (confirm("¿Eliminar todos los contactos?")) {
    localStorage.removeItem("agendaContactos");
    contactosLista.innerHTML = "";
    alert("Contactos eliminados.");
  }
});

// Resetear campos
function resetFormulario() {
  nombreInput.value = "";
  movilInput.value = "";
  emailInput.value = "";
  modoEdicion = false;
  guardarBtn.textContent = "Guardar";
}

// Cargar al iniciar
document.addEventListener("DOMContentLoaded", () => {
  const contactos = obtenerContactos();
  mostrarContactos(contactos);
});
