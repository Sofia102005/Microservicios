document.addEventListener('DOMContentLoaded', function () {
    const openBtn = document.querySelector('.Create');
    const modal = document.getElementById('modal');
    const closeBtn = document.getElementById('closeModal');
    const form = document.getElementById('retroForm');

    const logrosTextarea = document.getElementById("Logros");
    const impedimentosTextarea = document.getElementById("Impedimentos");
    const compromisosFinales = document.getElementById("compromisosFinales");
    const listaCompromisos = document.getElementById("listaCompromisos");

    if (!openBtn || !modal || !closeBtn || !form) {
        console.error("Uno o más elementos necesarios no se encontraron en el DOM.");
        return;
    }

    openBtn.addEventListener('click', () => {
        modal.style.display = 'flex';
    });

    closeBtn.addEventListener('click', () => {
        modal.style.display = 'none';
    });

    window.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.style.display = 'none';
        }
    });

    form.addEventListener('submit', function (e) {
        e.preventDefault();

        // Procesar logros
        const logrosFinales = document.getElementById("logrosFinales");
        const logrosLista = logrosTextarea.value
            .split('\n')
            .map(item => item.trim())
            .filter(item => item !== '');
        logrosFinales.value = JSON.stringify(logrosLista);

        // Procesar impedimentos
        const impedimentosFinales = document.getElementById("impedimentosFinales");
        const impedimentosLista = impedimentosTextarea.value
            .split('\n')
            .map(item => item.trim())
            .filter(item => item !== '');
        impedimentosFinales.value = JSON.stringify(impedimentosLista);

        // Procesar compromisos
        const items = listaCompromisos.querySelectorAll("li");
        const compromisos = Array.from(items).map(item => item.textContent.trim());
        compromisosFinales.value = JSON.stringify(compromisos);

        console.log({
            logros: logrosFinales.value,
            impedimentos: impedimentosFinales.value,
            compromisos: compromisosFinales.value
        });

        form.reset();
        listaCompromisos.innerHTML = '';
        modal.style.display = 'none';
    });
});