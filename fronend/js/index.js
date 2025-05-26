let logros = [];
let impedimentos = [];
let compromisos = [];

document.addEventListener('DOMContentLoaded', function () {
    const openBtn = document.querySelector('.Create');
    const modal = document.getElementById('modal');
    const closeBtn = document.getElementById('closeModal');
    const form = document.getElementById('retroForm');

    const listaLogros = document.getElementById("listaLogros");
    const listaImpedimentos = document.getElementById("listaImpedimentos");
    const listaCompromisos = document.getElementById("listaCompromisos");
    const btnGuardar = document.getElementById("btnGuardar");

    const modalResumen = document.getElementById("modalResumen");
    const contenidoResumen = document.getElementById("contenidoResumen");
    const cerrarResumen = document.getElementById("cerrarResumen");

    openBtn.addEventListener('click', () => {
        modal.style.display = 'flex';
    });

    closeBtn.addEventListener('click', () => {
        modal.style.display = 'none';
    });

    window.addEventListener('click', (e) => {
        if (e.target === modal) modal.style.display = 'none';
        if (e.target === modalResumen) modalResumen.style.display = 'none';
    });

    cerrarResumen.addEventListener('click', () => {
        modalResumen.style.display = 'none';
    });

    btnGuardar.addEventListener('click', function () {
        const titulo = document.getElementById("Title").value.trim();
        const fechaInicio = document.getElementById("StartDate").value;
        const fechaFin = document.getElementById("EndDate").value;

        const resumenHTML = `
            <h2>Resumen de Retrospectiva</h2>
            <p><strong>Título:</strong> ${titulo}</p>
            <p><strong>Fecha Inicio:</strong> ${fechaInicio}</p>
            <p><strong>Fecha Fin:</strong> ${fechaFin}</p>

            <h3>Logros</h3>
            <ul>${logros.map(l => `<li>${l}</li>`).join('')}</ul>

            <h3>Impedimentos</h3>
            <ul>${impedimentos.map(i => `<li>${i}</li>`).join('')}</ul>

            <h3>Compromisos</h3>
            <ul>${compromisos.map(c => `<li>${c}</li>`).join('')}</ul>
        `;

        contenidoResumen.innerHTML = resumenHTML;
        modalResumen.style.display = 'flex';

        // Limpiar datos
        form.reset();
        listaLogros.innerHTML = '';
        listaImpedimentos.innerHTML = '';
        listaCompromisos.innerHTML = '';
        logros = [];
        impedimentos = [];
        compromisos = [];
    });
});

// Funciones para agregar elementos
function agregarLogro() {
    const input = document.getElementById("nuevoLogro");
    const texto = input.value.trim();
    if (texto !== '') {
        logros.push(texto);
        const li = document.createElement("li");
        li.textContent = texto;
        document.getElementById("listaLogros").appendChild(li);
        input.value = '';
    }
}

function agregarImpedimento() {
    const input = document.getElementById("nuevoImpedimento");
    const texto = input.value.trim();
    if (texto !== '') {
        impedimentos.push(texto);
        const li = document.createElement("li");
        li.textContent = texto;
        document.getElementById("listaImpedimentos").appendChild(li);
        input.value = '';
    }
}

function agregarCompromiso() {
    const input = document.getElementById("nuevoCompromiso");
    const texto = input.value.trim();
    if (texto !== '') {
        compromisos.push(texto);
        const li = document.createElement("li");
        li.textContent = texto;
        document.getElementById("listaCompromisos").appendChild(li);
        input.value = '';
    }
}
