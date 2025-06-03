document.addEventListener('DOMContentLoaded', function () {
    const demoForm = document.getElementById('demoForm');
    const downloadSection = document.getElementById('downloadSection');
    const downloadLink = document.getElementById('downloadLink');
    
    // URL directa al .apk en Google Drive
    const downloadUrl = 'https://drive.google.com/uc?export=download&id=1SM22tm4byIJJ7DMOfOnpKwmKYRAB6AQD';
    
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

// Carrusel automático de screenshots
class ScreenshotCarousel {
    constructor() {
        this.currentSlide = 0;
        this.totalSlides = document.querySelectorAll('.carousel-slide').length;
        this.autoPlayInterval = null;
        this.autoPlayDelay = 8000; // 4 segundos
        this.isPlaying = true;
        this.isTransitioning = false;
        
        this.init();
    }
    
    init() {
        this.bindEvents();
        this.startAutoPlay();
        this.preloadImages();
    }
    
    bindEvents() {
        // Controles de navegación
        const prevBtn = document.getElementById('prevBtn');
        const nextBtn = document.getElementById('nextBtn');
        
        if (prevBtn) {
            prevBtn.addEventListener('click', () => {
                this.pauseAutoPlay();
                this.prevSlide();
                this.resumeAutoPlay();
            });
        }
        
        if (nextBtn) {
            nextBtn.addEventListener('click', () => {
                this.pauseAutoPlay();
                this.nextSlide();
                this.resumeAutoPlay();
            });
        }
        
        // Indicadores
        const indicators = document.querySelectorAll('.indicator');
        indicators.forEach((indicator, index) => {
            indicator.addEventListener('click', () => {
                this.pauseAutoPlay();
                this.goToSlide(index);
                this.resumeAutoPlay();
            });
        });
        
        // Pausar al hacer hover
        const carouselContainer = document.querySelector('.carousel-container');
        if (carouselContainer) {
            carouselContainer.addEventListener('mouseenter', () => {
                this.pauseAutoPlay();
            });
            
            carouselContainer.addEventListener('mouseleave', () => {
                this.resumeAutoPlay();
            });
        }
        
        // Soporte táctil para móviles
        this.bindTouchEvents();
        
        // Pausar cuando la pestaña no está visible
        document.addEventListener('visibilitychange', () => {
            if (document.hidden) {
                this.pauseAutoPlay();
            } else {
                this.resumeAutoPlay();
            }
        });
    }
    
    bindTouchEvents() {
        const track = document.getElementById('carouselTrack');
        if (!track) return;
        
        let startX = 0;
        let currentX = 0;
        let isDragging = false;
        
        track.addEventListener('touchstart', (e) => {
            startX = e.touches[0].clientX;
            isDragging = true;
            this.pauseAutoPlay();
        });
        
        track.addEventListener('touchmove', (e) => {
            if (!isDragging) return;
            currentX = e.touches[0].clientX;
        });
        
        track.addEventListener('touchend', () => {
            if (!isDragging) return;
            
            const diffX = startX - currentX;
            const threshold = 50;
            
            if (Math.abs(diffX) > threshold) {
                if (diffX > 0) {
                    this.nextSlide();
                } else {
                    this.prevSlide();
                }
            }
            
            isDragging = false;
            this.resumeAutoPlay();
        });
    }
    
    nextSlide() {
        this.currentSlide = (this.currentSlide + 1) % this.totalSlides;
        this.updateSlide();
    }
    
    prevSlide() {
        this.currentSlide = (this.currentSlide - 1 + this.totalSlides) % this.totalSlides;
        this.updateSlide();
    }
    
    goToSlide(index) {
        if (index >= 0 && index < this.totalSlides) {
            this.currentSlide = index;
            this.updateSlide();
        }
    }
    
    updateSlide() {
        if (this.isTransitioning) return;
        this.isTransitioning = true;
        const track = document.getElementById('carouselTrack');
        const slides = document.querySelectorAll('.carousel-slide');
        const indicators = document.querySelectorAll('.indicator');
        
        if (!track) return;
        
        // Actualizar posición del carrusel
        const translateX = -this.currentSlide * 100;
        track.style.transform = `translateX(${translateX}%)`;
        
        // Actualizar clases activas
        slides.forEach((slide, index) => {
            if (index === this.currentSlide) {
                slide.classList.add('active');
                // Trigger animation
                setTimeout(() => {
                    const caption = slide.querySelector('.slide-caption');
                    if (caption) {
                        caption.style.animation = 'none';
                        caption.offsetHeight; // Trigger reflow
                        caption.style.animation = 'fadeInUp 0.6s ease forwards';
                    }
                }, 100);
            } else {
                slide.classList.remove('active');
            }
        });
        
        // Actualizar indicadores
        indicators.forEach((indicator, index) => {
            if (index === this.currentSlide) {
                indicator.classList.add('active');
            } else {
                indicator.classList.remove('active');
            }
        });
        
        // Trigger slide animation effect
        this.triggerSlideEffect();
        setTimeout(() => {
            this.isTransitioning = false;
        }, 600); // Ajusta según la duración de tu animación
    }
    
    triggerSlideEffect() {
        const currentSlideElement = document.querySelectorAll('.carousel-slide')[this.currentSlide];
        if (currentSlideElement) {
            currentSlideElement.classList.add('active');
        }
    }
    
    startAutoPlay() {
        if (!this.isPlaying) return;
        
        this.autoPlayInterval = setInterval(() => {
            this.nextSlide();
        }, this.autoPlayDelay);
    }
    
    pauseAutoPlay() {
        if (this.autoPlayInterval) {
            clearInterval(this.autoPlayInterval);
            this.autoPlayInterval = null;
        }
    }
    
    resumeAutoPlay() {
        if (this.isPlaying && !this.autoPlayInterval) {
            setTimeout(() => {
                this.startAutoPlay();
            }, 1000); // Pequeña pausa antes de reanudar
        }
    }
    
    stopAutoPlay() {
        this.isPlaying = false;
        this.pauseAutoPlay();
    }
    
    preloadImages() {
        const images = document.querySelectorAll('.carousel-slide img');
        images.forEach(img => {
            const imageLoader = new Image();
            imageLoader.src = img.src;
        });
    }
    
    // Método para agregar slides dinámicamente
    addSlide(imageSrc, caption) {
        const track = document.getElementById('carouselTrack');
        const indicatorsContainer = document.querySelector('.carousel-indicators');
        
        if (!track || !indicatorsContainer) return;
        
        // Crear nuevo slide
        const newSlide = document.createElement('div');
        newSlide.className = 'carousel-slide';
        newSlide.innerHTML = `
            <div class="phone-mockup">
                <div class="phone-frame">
                    <div class="phone-screen">
                        <img src="${imageSrc}" alt="${caption}" />
                    </div>
                </div>
                <p class="slide-caption">${caption}</p>
            </div>
        `;
        
        // Crear nuevo indicador
        const newIndicator = document.createElement('button');
        newIndicator.className = 'indicator';
        newIndicator.dataset.slide = this.totalSlides;
        newIndicator.addEventListener('click', () => {
            this.pauseAutoPlay();
            this.goToSlide(this.totalSlides);
            this.resumeAutoPlay();
        });
        
        track.appendChild(newSlide);
        indicatorsContainer.appendChild(newIndicator);
        this.totalSlides++;
    }
}

// Inicializar el carrusel cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', () => {
    // Verificar si el carrusel existe en la página
    const carouselContainer = document.querySelector('.carousel-container');
    if (carouselContainer) {
        const carousel = new ScreenshotCarousel();
        
        // Hacer la instancia disponible globalmente si es necesario
        window.screenshotCarousel = carousel;
        
        // Agregar funcionalidad de teclado
        document.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowLeft') {
                carousel.pauseAutoPlay();
                carousel.prevSlide();
                carousel.resumeAutoPlay();
            } else if (e.key === 'ArrowRight') {
                carousel.pauseAutoPlay();
                carousel.nextSlide();
                carousel.resumeAutoPlay();
            } else if (e.key === ' ') {
                e.preventDefault();
                if (carousel.isPlaying) {
                    carousel.stopAutoPlay();
                } else {
                    carousel.isPlaying = true;
                    carousel.startAutoPlay();
                }
            }
        });
    }
});

// Funciones de utilidad para uso externo
window.CarouselUtils = {
    // Cambiar velocidad de autoplay
    setAutoPlaySpeed: (speed) => {
        if (window.screenshotCarousel) {
            window.screenshotCarousel.autoPlayDelay = speed;
            window.screenshotCarousel.pauseAutoPlay();
            window.screenshotCarousel.startAutoPlay();
        }
    },
    
    // Ir a slide específico
    goToSlide: (index) => {
        if (window.screenshotCarousel) {
            window.screenshotCarousel.goToSlide(index);
        }
    },
    
    // Pausar/reanudar
    toggleAutoPlay: () => {
        if (window.screenshotCarousel) {
            if (window.screenshotCarousel.isPlaying) {
                window.screenshotCarousel.stopAutoPlay();
            } else {
                window.screenshotCarousel.isPlaying = true;
                window.screenshotCarousel.startAutoPlay();
            }
        }
    }
};