const table = document.getElementById('registrosTable');
const tableSprint = document.getElementById('SprinTable');

function capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

class Registros {
    static async getAllRegistros() {
        try {
            const resp = await fetch('http://127.0.0.1:8000/api/registros');
            const bodyResp = await resp.json();
            return bodyResp.data;
        } catch (error) {
            console.error(error);
            return null;
        }
    }

    static async postNewRegistro(registro) {
        try {
            const resp = await fetch('http://127.0.0.1:8000/api/registro', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    sprint_id: registro.sprint_id,
                    categoria: registro.categoria,
                    descripcion: registro.descripcion,
                    cumplida: registro.cumplida,
                    fecha_revision: registro.fecha_revision,
                    created_at: "",
                    updated_at: ""
                })
            });
            const bodyResp = await resp.json();
            return bodyResp.data == 'Datos guardados';
        } catch (error) {
            console.error(error);
            return false;
        }
    }
}

class Sprints {
    static async getAllSprints() {
        try {
            const resp = await fetch('http://127.0.0.1:8000/api/sprints');
            const bodyResp = await resp.json();
            return bodyResp.data;
        } catch (error) {
            console.error(error);
            return null;
        }
    }

    static async postNewSprint(sprint) {
        try {
            const resp = await fetch('http://127.0.0.1:8000/api/sprint', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    nombre: sprint.nombre,
                    fecha_inicio: sprint.fecha_inicio,
                    fecha_fin: sprint.fecha_fin,
                    created_at: "",
                    updated_at: ""
                })
            });
            const bodyResp = await resp.json();
            return bodyResp.data == 'Datos guardados';
        } catch (error) {
            console.error(error);
            return false;
        }
    }

    static async updateSprint(id, sprint) {
        try {
            const resp = await fetch(`http://127.0.0.1:8000/api/sprint/${id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(sprint)
            });
            const bodyResp = await resp.json();
            return bodyResp.data == 'Datos actualizados';
        } catch (error) {
            console.error(error);
            return false;
        }
    }

    static async deleteSprint(id) {
        try {
            const resp = await fetch(`http://127.0.0.1:8000/api/sprint/${id}`, {
                method: 'DELETE'
            });
            const bodyResp = await resp.json();
            return bodyResp.data == 'Sprint eliminado';
        } catch (error) {
            console.error(error);
            return false;
        }
    }
}

const cargarTablasprints = async () => {
    const sprints = await Sprints.getAllSprints();
    const registros = await Registros.getAllRegistros();
    const contenedor = document.getElementById('contenedorSprints');
    contenedor.innerHTML = '';

    for (let item of sprints) {
        const tarjeta = document.createElement('div');
        tarjeta.classList.add('tarjeta-retro');

        const h3nombre = document.createElement('h3');
        h3nombre.textContent = `Título: ${item.nombre}`;

        const fechas = document.createElement('div');
        fechas.classList.add('seccion-retro', 'fechas-retro');

        const pInicio = document.createElement('p');
        pInicio.innerHTML = `<strong>Inicio:</strong> ${item.fecha_inicio}`;

        const pFin = document.createElement('p');
        pFin.innerHTML = `<strong>Fin:</strong> ${item.fecha_fin}`;

        fechas.appendChild(pInicio);
        fechas.appendChild(pFin);

        const registrosSprint = registros.filter(r => r.sprint_id === item.id);

        const crearSeccion = (titulo, categoria) => {
            const items = registrosSprint.filter(r => r.categoria.toLowerCase() === categoria.toLowerCase());
            return `<p><strong>${titulo}:</strong></p>` +
                (items.length > 0
                    ? `<ul>${items.map(i => `<li>${i.descripcion}</li>`).join('')}</ul>`
                    : '<ul><li>Pendiente...</li></ul>');
        };

        const logros = document.createElement('div');
        logros.classList.add('seccion-retro');
        logros.innerHTML = crearSeccion('Logros', 'logro');

        const impedimentos = document.createElement('div');
        impedimentos.classList.add('seccion-retro');
        impedimentos.innerHTML = crearSeccion('Impedimentos', 'impedimento');

        const comentarios = document.createElement('div');
        comentarios.classList.add('seccion-retro');
        comentarios.innerHTML = crearSeccion('Comentarios', 'comentario');

        const acciones = document.createElement('div');
        acciones.classList.add('seccion-retro');
        acciones.innerHTML = crearSeccion('Acciones', 'accion');

        const botones = document.createElement('div');
        botones.classList.add('seccion-retro');
        botones.innerHTML = `
            <button class="retro-btn btnEditarSprint" data-id="${item.id}" data-nombre="${item.nombre}" data-inicio="${item.fecha_inicio}" data-fin="${item.fecha_fin}">Editar Sprint</button>
            <br>
            <button class="retro-btn btnEliminarSprint" data-id="${item.id}">Eliminar Sprint</button>
            <br>
            <button class="retro-btn btnRetroAnterior" data-id="${item.id}">Retrospectiva anterior</button>
            <div class="retroAnteriorContainer" data-id="${item.id}"></div>
            <br>
            <button class="retro-btn abrirModalRetro" data-id="${item.id}">Nueva Retrospectiva</button>`;

        tarjeta.appendChild(h3nombre);
        tarjeta.appendChild(fechas);
        tarjeta.appendChild(logros);
        tarjeta.appendChild(impedimentos);
        tarjeta.appendChild(comentarios);
        tarjeta.appendChild(acciones);
        tarjeta.appendChild(botones);

        contenedor.appendChild(tarjeta);
    }
};

cargarTablasprints();

document.getElementById('btnAbrirModalSprint').addEventListener('click', () => {
    document.getElementById('modalSprint').classList.remove('oculto');
});

document.getElementById('closeModalSprint').addEventListener('click', () => {
    document.getElementById('modalSprint').classList.add('oculto');
});

document.getElementById('formSprint').addEventListener('submit', async (e) => {
    e.preventDefault();
    const titulo = document.getElementById('Title').value;
    const inicio = document.getElementById('StartDate').value;
    const fin = document.getElementById('EndDate').value;

    const nuevoSprint = { nombre: titulo, fecha_inicio: inicio, fecha_fin: fin };

    const exito = await Sprints.postNewSprint(nuevoSprint);

    if (exito) {
        alert("Sprint guardado exitosamente");
        document.getElementById('modalSprint').classList.add('oculto');
        document.getElementById('formSprint').reset();
        cargarTablasprints();
    } else {
        alert("Hubo un error al guardar el sprint.");
    }
});

let sprintSeleccionadoId = null;

document.addEventListener("click", async (e) => {
    if (e.target.classList.contains("abrirModalRetro")) {
        sprintSeleccionadoId = e.target.getAttribute("data-id");
        document.getElementById("modalRetro").classList.remove("oculto");
    }

    if (e.target.classList.contains("btnEditarSprint")) {
        const id = e.target.getAttribute("data-id");
        const nombre = e.target.getAttribute("data-nombre");
        const inicio = e.target.getAttribute("data-inicio");
        const fin = e.target.getAttribute("data-fin");

        document.getElementById("Title").value = nombre;
        document.getElementById("StartDate").value = inicio;
        document.getElementById("EndDate").value = fin;

        document.getElementById("modalSprint").classList.remove("oculto");

        const form = document.getElementById("formSprint");
        form.onsubmit = async (ev) => {
            ev.preventDefault();
            const updatedSprint = {
                nombre: document.getElementById("Title").value,
                fecha_inicio: document.getElementById("StartDate").value,
                fecha_fin: document.getElementById("EndDate").value
            };
            const actualizado = await Sprints.updateSprint(id, updatedSprint);
            if (actualizado) {
                alert("Sprint actualizado");
                document.getElementById("modalSprint").classList.add("oculto");
                form.reset();
                cargarTablasprints();
            } else {
                alert("Error al actualizar");
            }
            form.onsubmit = null;
        };
    }

    if (e.target.classList.contains("btnEliminarSprint")) {
        const id = e.target.getAttribute("data-id");
        if (confirm("¿Estás seguro de eliminar este sprint? Esta acción no se puede deshacer.")) {
            const eliminado = await Sprints.deleteSprint(id);
            if (eliminado) {
                alert("Sprint eliminado");
                cargarTablasprints();
            } else {
                alert("Error al eliminar el sprint");
            }
        }
    }
});

document.getElementById('closeModalRetro').addEventListener('click', () => {
    document.getElementById('modalRetro').classList.add('oculto');
});

function agregarItem(categoria) {
    const input = document.getElementById(`input${capitalize(categoria)}`);
    const lista = document.getElementById(`lista${capitalize(categoria)}`);
    const texto = input.value.trim();

    if (!lista) {
        console.error(`No se encontró el elemento con ID lista${capitalize(categoria)}`);
        return;
    }

    if (texto) {
        const li = document.createElement("li");

        if (categoria === "accion") {
            const checkbox = document.createElement("input");
            checkbox.type = "checkbox";
            checkbox.classList.add("checkboxCumplida");

            const span = document.createElement("span");
            span.textContent = texto;

            li.appendChild(checkbox);
            li.appendChild(span);
        } else {
            li.textContent = texto;
        }

        lista.appendChild(li);
        input.value = "";
    }
}

document.getElementById("btnGuardarRetro").addEventListener("click", async () => {
    const fechaRevision = document.getElementById("fechaRevision").value;

    if (!fechaRevision) {
        alert("Debes seleccionar una fecha de revisión.");
        return;
    }

    if (!sprintSeleccionadoId) {
        alert("No se ha seleccionado un sprint.");
        return;
    }

    const categorias = ["logro", "impedimento", "comentario", "accion"];
    let exito = true;

    for (let cat of categorias) {
        const lista = document.querySelectorAll(`#lista${capitalize(cat)} li`);
        for (let li of lista) {
            const descripcion = li.textContent || li.querySelector("span")?.textContent || "";
            let cumplida = false;

            if (cat === "accion") {
                const checkbox = li.querySelector("input[type='checkbox']");
                cumplida = checkbox?.checked || false;
            }

            const nuevoRegistro = {
                sprint_id: parseInt(sprintSeleccionadoId),
                categoria: cat,
                descripcion: descripcion,
                cumplida: cumplida,
                fecha_revision: fechaRevision
            };

            const guardado = await Registros.postNewRegistro(nuevoRegistro);
            if (!guardado) {
                exito = false;
            }
        }
    }

    if (exito) {
        alert("Retrospectiva guardada exitosamente.");
        document.getElementById("modalRetro").classList.add("oculto");
        cargarTablasprints();
    } else {
        alert("Ocurrió un error al guardar la retrospectiva.");
    }
});
