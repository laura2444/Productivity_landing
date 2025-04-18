document.addEventListener('DOMContentLoaded', function () {
    const demoForm = document.getElementById('demoForm');
    const downloadSection = document.getElementById('downloadSection');
    const downloadLink = document.getElementById('downloadLink');

    // URL directa al .apk en Google Drive
    const downloadUrl = 'https://drive.google.com/uc?export=download&id=1VmiTr9PWuMNuy4uCsc1dkobxjZ5cxAWr';

    demoForm.addEventListener('submit', function (e) {
        e.preventDefault();

        // Obtener datos del formulario
        const email = document.getElementById('email').value.trim();
        const feedback = document.getElementById('feedback').value.trim();

        // Validar email
        if (!email) {
            alert('Por favor ingresa un correo electrónico válido');
            return;
        }

        // Enviar datos al servidor
        fetch('https://formsubmit.co/lauratati321@gmail.com', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email: email,
                feedback: feedback,
                _subject: 'Nuevo registro para demo',
                _template: 'table'
            })
        })
            .then(response => {
                if (response.ok) {
                    // Ocultar el formulario y mostrar la sección de descarga
                    demoForm.style.display = 'none';
                    downloadSection.style.display = 'block';

                    // Configurar el enlace visible de descarga (opcional)
                    downloadLink.href = downloadUrl;
                    downloadLink.download = 'app_debug.apk';

                    // 🔽 Descargar automáticamente el APK
                    const tempLink = document.createElement('a');
                    tempLink.href = downloadUrl;
                    tempLink.download = 'app_debug.apk';
                    document.body.appendChild(tempLink);
                    tempLink.click();
                    document.body.removeChild(tempLink);

                } else {
                    throw new Error('Error al enviar el formulario');
                }
            })
            .catch(error => {
                console.error('Error:', error);
                alert('Hubo un problema al procesar tu registro. Por favor intenta nuevamente.');
            });
    });
});
