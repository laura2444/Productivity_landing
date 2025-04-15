
const input = document.getElementById('nombre');
const boton = document.getElementById('descargar');

input.addEventListener('input', () => {
    boton.disabled = input.value.trim() === "";
});

boton.addEventListener('click', () => {
    // Solo descarga si el input tiene texto válido
    const nombre = input.value.trim();
    if (nombre !== "") {
        // Crea un enlace temporal para descargar el archivo
        const enlace = document.createElement('a');
        enlace.href = 'https://laura2444.github.io/Productivity_landing/assets/download/gumbal.jpg'; // Ajusta esta ruta
        enlace.download = 'gumbal';     // Nombre del archivo descargado
        enlace.click();
    }
});
