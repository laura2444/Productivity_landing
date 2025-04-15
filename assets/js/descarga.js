document.addEventListener('DOMContentLoaded', function() {
    const demoForm = document.getElementById('demoForm');
    const downloadSection = document.getElementById('downloadSection');
    const downloadLink = document.getElementById('downloadLink');
    
    // URL de descarga (ajusta según tu necesidad)
    const downloadUrl = 'https://laura2444.github.io/Productivity_landing/assets/download/gumbal.jpg';
    
    demoForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Obtener datos del formulario
        const email = document.getElementById('email').value.trim();
        const feedback = document.getElementById('feedback').value.trim();
        
        // Validar email
        if (!email) {
            alert('Por favor ingresa un correo electrónico válido');
            return;
        }
        
        // Enviar datos al servidor (aquí puedes usar FormSubmit o tu backend)
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
                // Mostrar sección de descarga
                demoForm.style.display = 'none';
                downloadSection.style.display = 'block';
                
                // Configurar enlace de descarga
                downloadLink.href = downloadUrl;
                downloadLink.download = 'nombre_de_tu_app'; // Nombre del archivo
                
                // Opcional: Descarga automática
                // const tempLink = document.createElement('a');
                // tempLink.href = downloadUrl;
                // tempLink.download = 'nombre_de_tu_app';
                // tempLink.click();
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