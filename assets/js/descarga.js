document.addEventListener('DOMContentLoaded', function () {
    const demoForm = document.getElementById('demoForm');
    const downloadSection = document.getElementById('downloadSection');
    const downloadLink = document.getElementById('downloadLink');
    
    // URL corregida para descarga directa desde Google Drive
    // Asegúrate de que el archivo esté compartido públicamente
    const fileId = '1jweK_zkowO6rK_Di0g8ugoVWlgSTycly';
    const downloadUrl = `https://drive.google.com/uc?export=download&id=${fileId}`;
    
    // URL alternativa si la anterior no funciona
    const alternativeUrl = `https://drive.google.com/file/d/${fileId}/view?usp=sharing`;
    
    demoForm.addEventListener('submit', function (e) {
        e.preventDefault();
        
        // Obtener datos del formulario
        const email = document.getElementById('email').value.trim();
        const feedback = document.getElementById('feedback').value.trim();
        
        // Validar email básico
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!email || !emailRegex.test(email)) {
            alert('Por favor ingresa un correo electrónico válido');
            return;
        }
        
        // Mostrar cargando
        const submitButton = demoForm.querySelector('button[type="submit"]');
        const originalText = submitButton.innerHTML;
        submitButton.disabled = true;
        submitButton.innerHTML = 'Procesando...';
        
        // Crear FormData para FormSubmit
        const formData = new FormData();
        formData.append('email', email);
        formData.append('feedback', feedback || 'Sin comentarios');
        formData.append('_subject', 'Nuevo registro para demo - Productivity App');
        formData.append('_captcha', 'false');
        formData.append('_next', window.location.href); // Redirigir a la misma página
        
        // Enviar datos a FormSubmit
        fetch('https://formsubmit.co/ajax/lauracast142@gmail.com', {
            method: 'POST',
            body: formData,
            headers: {
                'Accept': 'application/json'
            }
        })
        .then(response => {
            console.log('Response status:', response.status);
            return response.json();
        })
        .then(data => {
            console.log('Registro exitoso:', data);
            
            // Ocultar formulario y mostrar descarga
            demoForm.style.display = 'none';
            downloadSection.style.display = 'block';
            
            // Configurar enlaces de descarga
            setupDownloadLinks();
            
            // Mostrar mensaje de éxito
            showSuccessMessage();
        })
        .catch(error => {
            console.error('Error al registrar:', error);
            
            // Aún así permitir la descarga (en caso de problemas con FormSubmit)
            console.log('Permitiendo descarga a pesar del error de registro');
            demoForm.style.display = 'none';
            downloadSection.style.display = 'block';
            setupDownloadLinks();
            
            // Restaurar botón por si el usuario quiere reintentar
            setTimeout(() => {
                submitButton.disabled = false;
                submitButton.innerHTML = originalText;
            }, 3000);
        });
    });
    
    function setupDownloadLinks() {
        // Configurar el enlace principal
        downloadLink.href = downloadUrl;
        downloadLink.target = '_blank';
        downloadLink.rel = 'noopener noreferrer';
        
        // Agregar evento click para manejar la descarga
        downloadLink.addEventListener('click', function(e) {
            e.preventDefault();
            handleDownload();
        });
        
        // Crear enlace alternativo
        createAlternativeDownloadOption();
    }
    
    function handleDownload() {
        // Mostrar mensaje de descarga
        const downloadMessage = document.createElement('div');
        downloadMessage.innerHTML = `
            <div style="
                background: #d4edda; 
                border: 1px solid #c3e6cb; 
                border-radius: 5px; 
                padding: 15px; 
                margin: 15px 0;
                color: #155724;
            ">
                <strong>🚀 ¡Iniciando descarga!</strong><br>
                Si la descarga no comienza automáticamente, 
                <a href="${alternativeUrl}" target="_blank" style="color: #155724; text-decoration: underline;">
                    haz clic aquí para descargar manualmente
                </a>
            </div>
        `;
        downloadSection.appendChild(downloadMessage);
        
        // Intentar descarga directa
        try {
            // Método 1: Crear enlace temporal
            const tempLink = document.createElement('a');
            tempLink.href = downloadUrl;
            tempLink.download = 'productivity-app.apk';
            tempLink.target = '_blank';
            tempLink.rel = 'noopener noreferrer';
            
            // Agregar al DOM brevemente
            document.body.appendChild(tempLink);
            tempLink.click();
            document.body.removeChild(tempLink);
            
            // Método 2: Abrir en nueva ventana como respaldo
            setTimeout(() => {
                window.open(downloadUrl, '_blank', 'noopener,noreferrer');
            }, 1000);
            
        } catch (error) {
            console.error('Error en descarga automática:', error);
            // Fallback: abrir enlace de Google Drive
            window.open(alternativeUrl, '_blank', 'noopener,noreferrer');
        }
    }
    
    function createAlternativeDownloadOption() {
        const alternativeDiv = document.createElement('div');
        alternativeDiv.innerHTML = `
            <div style="margin-top: 20px; padding: 15px; background: #f8f9fa; border-radius: 5px;">
                <h6>¿Problemas con la descarga?</h6>
                <p style="margin: 10px 0; font-size: 0.9rem;">Prueba estas opciones alternativas:</p>
                <div style="display: flex; gap: 10px; flex-wrap: wrap;">
                    <a href="${downloadUrl}" 
                       target="_blank" 
                       class="btn btn-sm btn-outline-primary"
                       style="text-decoration: none; padding: 8px 16px; border: 1px solid #007bff; color: #007bff; border-radius: 4px;">
                        Descarga directa
                    </a>
                    <a href="${alternativeUrl}" 
                       target="_blank" 
                       class="btn btn-sm btn-outline-secondary"
                       style="text-decoration: none; padding: 8px 16px; border: 1px solid #6c757d; color: #6c757d; border-radius: 4px;">
                        Abrir en Google Drive
                    </a>
                </div>
                <small style="color: #6c757d; margin-top: 10px; display: block;">
                    💡 Tip: Si usas móvil, es posible que necesites permitir descargas desde fuentes desconocidas en la configuración de tu dispositivo.
                </small>
            </div>
        `;
        downloadSection.appendChild(alternativeDiv);
    }
    
    function showSuccessMessage() {
        const successDiv = document.createElement('div');
        successDiv.innerHTML = `
            <div style="
                background: #d1ecf1; 
                border: 1px solid #bee5eb; 
                border-radius: 5px; 
                padding: 15px; 
                margin-bottom: 15px;
                color: #0c5460;
            ">
                <strong>✅ ¡Registro exitoso!</strong><br>
                Te hemos enviado un correo de confirmación. 
                Revisa tu bandeja de entrada (y spam, por si acaso).
            </div>
        `;
        downloadSection.insertBefore(successDiv, downloadSection.firstChild);
    }
});

// Función adicional para verificar si el archivo es accesible
function checkFileAvailability() {
    const fileId = '1jweK_zkowO6rK_Di0g8ugoVWlgSTycly';
    const checkUrl = `https://drive.google.com/uc?export=download&id=${fileId}`;
    
    fetch(checkUrl, { method: 'HEAD', mode: 'no-cors' })
        .then(() => {
            console.log('Archivo accesible ✅');
        })
        .catch((error) => {
            console.warn('Posible problema de acceso al archivo:', error);
        });
}

// Verificar disponibilidad del archivo al cargar la página
checkFileAvailability();