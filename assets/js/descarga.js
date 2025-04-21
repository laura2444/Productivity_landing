document.addEventListener('DOMContentLoaded', function () {
    const demoForm = document.getElementById('demoForm');
    const downloadSection = document.getElementById('downloadSection');
    const downloadLink = document.getElementById('downloadLink');
    
    // URL directa al .apk en Google Drive
    const downloadUrl = 'https://drive.google.com/uc?export=download&id=1jweK_zkowO6rK_Di0g8ugoVWlgSTycly';
    
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
        
        // Crear un objeto FormData
        const formData = new FormData();
        formData.append('email', email);
        formData.append('feedback', feedback);
        formData.append('_subject', 'Nuevo registro para demo');
        formData.append('_captcha', 'false');  // Deshabilitar captcha
        
        // Mostrar cargando
        const submitButton = demoForm.querySelector('button[type="submit"]');
        const originalText = submitButton.innerHTML;
        submitButton.disabled = true;
        submitButton.innerHTML = 'Enviando...';
        
        // Enviar a FormSubmit
        fetch('https://formsubmit.co/ajax/lauracast142@gmail.com', {
            method: 'POST',
            body: formData,
            headers: {
                'Accept': 'application/json'
            }
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Error en la respuesta del servidor');
            }
            return response.json();
        })
        .then(data => {
            console.log('Éxito:', data);
            
            // Ocultar el formulario y mostrar la sección de descarga
            demoForm.style.display = 'none';
            downloadSection.style.display = 'block';
            
            // Configurar el enlace visible de descarga
            downloadLink.href = downloadUrl;
            downloadLink.download = 'app_debug.apk';
            
            // Iniciar descarga automática del APK
            setTimeout(() => {
                const tempLink = document.createElement('a');
                tempLink.href = downloadUrl;
                tempLink.download = 'app_debug.apk';
                document.body.appendChild(tempLink);
                tempLink.click();
                document.body.removeChild(tempLink);
            }, 500);
        })
        .catch(error => {
            console.error('Error:', error);
            alert('Hubo un problema al procesar tu registro. Por favor intenta nuevamente.');
            
            // Restaurar botón
            submitButton.disabled = false;
            submitButton.innerHTML = originalText;
        });
    });
});