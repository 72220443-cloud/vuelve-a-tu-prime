
const formulario = document.getElementById("recoleccionForm");
const campos = formulario.querySelectorAll("input[required], select[required]");
const progressFill = document.getElementById("progressFill");
const progressText = document.getElementById("progressText");
const toast = document.getElementById("toast");

const numeroEmpresa = "519XXXXXXXX";

const fecha = document.getElementById("fecha");
const hoy = new Date();
const fechaLocal = new Date(hoy.getTime() - hoy.getTimezoneOffset() * 60000)
    .toISOString().split("T")[0];

fecha.min = fechaLocal;

function actualizarProgreso() {
    let completados = 0;

    campos.forEach(campo => {
        if (campo.value.trim() !== "") {
            completados++;
        }
    });

    const porcentaje = Math.round((completados / campos.length) * 100);

    progressFill.style.width = porcentaje + "%";
    progressText.textContent = porcentaje + "%";
}

campos.forEach(campo => {
    campo.addEventListener("input", actualizarProgreso);
    campo.addEventListener("change", actualizarProgreso);
});

formulario.addEventListener("submit", function(event) {
    event.preventDefault();

    if (!formulario.reportValidity()) {
        return;
    }

    const nombre = document.getElementById("nombre").value.trim();
    const celular = document.getElementById("celular").value.trim();
    const tipo = document.getElementById("tipo").value;
    const distrito = document.getElementById("distrito").value;
    const direccion = document.getElementById("direccion").value.trim();
    const cantidad = document.getElementById("cantidad").value;
    const fechaRecojo = document.getElementById("fecha").value;
    const observaciones = document.getElementById("observaciones").value.trim();

    if (!/^\d{9}$/.test(celular)) {
        alert("Ingresa un número de celular válido de 9 dígitos.");
        return;
    }

    if (Number(cantidad) < 1 || !Number.isInteger(Number(cantidad))) {
        alert("Ingresa una cantidad válida de llantas.");
        return;
    }

    if (fechaRecojo < fechaLocal) {
        alert("Selecciona una fecha válida.");
        return;
    }

    const mensaje = `¡Hola! 👋 Quisiera solicitar sus servicios de recolección de llantas usadas.

📋 *DATOS DE SOLICITUD*

👤 Nombre: ${nombre}
📱 Celular: ${celular}
🏢 Tipo de cliente: ${tipo}
📍 Distrito: ${distrito}
🗺️ Dirección de recojo: ${direccion}
♻️ Cantidad de llantas: ${cantidad}
📅 Fecha preferida: ${fechaRecojo}
📝 Observaciones: ${observaciones || "Sin observaciones"}

Estoy interesado/a en coordinar la recolección de mis neumáticos usados.

¡Muchas gracias!`;

    const enlace = `https://wa.me/${numeroEmpresa}?text=${encodeURIComponent(mensaje)}`;

    toast.classList.add("show");

    setTimeout(() => {
        window.open(enlace, "_blank");
        toast.classList.remove("show");
    }, 900);
});
