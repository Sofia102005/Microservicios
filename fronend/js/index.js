const table = document.getElementById('registrosTable');
const tableSprint = document.getElementById('SprinTable');

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
}

/////////////////////////////////////////////////////////
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
}
const cargarTablasprints = async () => {
    const sprints = await Sprints.getAllSprints();
    const contenedor = document.getElementById('contenedorSprints');
    contenedor.innerHTML = ''; // Limpiar para evitar duplicados

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

        // Crear secciones vacías para logros, impedimentos y compromisos
        const logros = document.createElement('div');
        logros.classList.add('seccion-retro');
        logros.innerHTML = `<p><strong>Logros:</strong></p><ul><li>Pendiente...</li></ul>`;

        const impedimentos = document.createElement('div');
        impedimentos.classList.add('seccion-retro');
        impedimentos.innerHTML = `<p><strong>Impedimentos:</strong></p><ul><li>Pendiente...</li></ul>`;

        const Comentarios = document.createElement('div');
        Comentarios.classList.add('seccion-retro');
        Comentarios.innerHTML = `<p><strong>Comentarios:</strong></p><ul><li>Pendiente...</li></ul>`;

        const acciones = document.createElement('div');
        acciones.classList.add('seccion-retro');
        acciones.innerHTML = `<p><strong>Acciones:</strong></p><ul><li>Pendiente...</li></ul>`;

        const botones = document.createElement('div');
        botones.classList.add('seccion-retro');
        botones.innerHTML = `
            <button class="retro-btn">Retrospectiva anterior</button>
            <button class="retro-btn abrirModalRetro">Nueva Retrospectiva</button>
        `;

        tarjeta.appendChild(h3nombre);
        tarjeta.appendChild(fechas);
        tarjeta.appendChild(logros);
        tarjeta.appendChild(impedimentos);
        tarjeta.appendChild(Comentarios);
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

// Guardar Sprint (esto solo imprime en consola, debes enviar al backend)
document.getElementById('formSprint').addEventListener('submit', async (e) => {
  e.preventDefault();
  const titulo = document.getElementById('Title').value;
  const inicio = document.getElementById('StartDate').value;
  const fin = document.getElementById('EndDate').value;

  const nuevoSprint = {
    nombre: titulo,
    fecha_inicio: inicio,
    fecha_fin: fin
  };

  // Aquí puedes hacer el POST al backend si ya tienes API
  console.log("Sprint guardado:", nuevoSprint);
  document.getElementById('modalSprint').classList.add('oculto');
});

document.addEventListener("click", (e) => {
    if (e.target.classList.contains("abrirModalRetro")) {
        const modalRetro = document.getElementById("modalRetro");
        modalRetro.classList.remove("oculto");
    }
});
document.getElementById('closeModalRetro').addEventListener('click', () => {
  document.getElementById('modalRetro').classList.add('oculto');
});
