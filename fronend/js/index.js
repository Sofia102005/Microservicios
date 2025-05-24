document.addEventListener("DOMContentLoaded", () => {
  const createButton = document.querySelector('.Create');
  const formContainer = document.getElementById('formContainer');
  const form = formContainer.querySelector('form');

  createButton.addEventListener('click', () => {
    formContainer.style.display = formContainer.style.display === 'none' ? 'block' : 'none';
  });

  form.addEventListener('submit', (e) => {
    e.preventDefault(); // Quita esta línea si quieres que el formulario se envíe normalmente
    formContainer.style.display = 'none';

    // Opcional: Limpia los campos del formulario
    form.reset();

    // Si deseas enviar el formulario normalmente, elimina `e.preventDefault();`
    // y mueve `formContainer.style.display = 'none';` a un evento "onsubmit" en el servidor
  });
});