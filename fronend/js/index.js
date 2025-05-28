const table = document.getElementById('registrosTable')

class Registros {
    static async getAllRegistros() {
        try {
            const resp = await fetch('http://127.0.0.1:8000/api/registros');
            const bodyResp = await resp.json();
            return bodyResp.data;
        }catch(error){ 
            console.error(error);
            return null;
        }
    }
}

const cargarTabla = async () => {
    const registros = await Registros.getAllRegistros();
    const tbody = table.getElementsByTagName('tbody')[0];
    tbody.innerHTML = '';
    for (let item of registros) {
        const tdSprint_Id = document.createElement('td');
        tdSprint_Id.textContent = item.sprint_id;

        const tdCategoria = document.createElement('td');
        tdCategoria.textContent = item.categoria;

        const tdDescripcion = document.createElement('td');
        tdDescripcion.textContent = item.descripcion;

        const tdCumplida = document.createElement('td');
        tdCumplida.textContent = item.cumplida;

        const tdFecha_revision = document.createElement('td');
        tdFecha_revision.textContent = item.fecha_revision;

        const tdCreated_at = document.createElement('td');
        tdCreated_at.textContent = item.created_at;
        
        const tdUpdated_at = document.createElement('td');
        tdUpdated_at.textContent = item.updated_at;

        const editarBtn = document.createElement('button');
        editarBtn.textContent = 'Editar';

        const eliminarBtn = document.createElement('button');
        eliminarBtn.textContent = 'Eliminar';

        const tdBotones = document.createElement('td');
        tdBotones.appendChild(editarBtn);
        tdBotones.appendChild(eliminarBtn);

        const tr = document.createElement('tr');
        tr.appendChild(tdSprint_Id);
        tr.appendChild(tdCategoria);
        tr.appendChild(tdDescripcion);
        tr.appendChild(tdCumplida);
        tr.appendChild(tdFecha_revision);
        tr.appendChild(tdCreated_at);
        tr.appendChild(tdUpdated_at);
        tr.appendChild(tdBotones);

        tbody.appendChild(tr);
    }
}

cargarTabla();

//////////////////////////////////////////////////

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

        // Crear resumen solo con botones
        const resumenHTML = `
            <h2>Retrospectiva guardada</h2>
            <p><strong>Título:</strong> ${titulo}</p>
            <p><strong>Fecha Inicio:</strong> ${fechaInicio}</p>
            <p><strong>Fecha Fin:</strong> ${fechaFin}</p>

            <div style="margin-top: 20px;">
                <button id="btnNuevaRetrospectiva" style="margin-right: 10px;">Nueva Retrospectiva</button>
                <button id="btnVerRetrospectiva">Ver Retrospectiva</button>
            </div>
        `;

        contenidoResumen.innerHTML = resumenHTML;
        modalResumen.style.display = 'flex';

        // Botón para abrir nuevo modal de creación
        document.getElementById('btnNuevaRetrospectiva').addEventListener('click', () => {
            modalResumen.style.display = 'none';
            modal.style.display = 'flex'; // Abrir modal para nueva retrospectiva
        });

        // Botón para ver retrospectiva (aquí puedes implementar lo que desees)
        document.getElementById('btnVerRetrospectiva').addEventListener('click', () => {
            alert('Aquí puedes implementar la función para ver retrospectivas guardadas.');
        });

        // Limpiar formulario y listas
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
