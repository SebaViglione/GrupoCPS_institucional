// ======================================
// ======================================
// AVIF COMPATIBILITY CHECK
// ======================================

(function checkAvifSupport() {
    const canvas = document.createElement('canvas');
    const avifSupported = canvas.toDataURL('image/avif')
        .indexOf('data:image/avif') === 0;
    
    if (avifSupported) {
        document.documentElement.classList.add('avif-supported');
        console.log('✅ AVIF supported by this browser');
    } else {
        document.documentElement.classList.add('avif-not-supported');
        console.log('⚠️  AVIF not supported, using WebP fallback');
    }
})();

// ======================================
// PAGE LOADER
// ======================================

document.addEventListener('DOMContentLoaded', async () => {
    const pageLoader = document.getElementById('pageLoader');
    const body = document.body;

    // Añadir clase loading al body para prevenir scroll
    body.classList.add('loading');

    try {
        // Crear array de promesas para todas las imágenes esenciales
        const imagePromises = [];

        // 1. Esperar a que cargue el logo del loader
        const loaderLogo = pageLoader.querySelector('.loader-logo img');
        if (loaderLogo && !loaderLogo.complete) {
            imagePromises.push(new Promise((resolve) => {
                loaderLogo.onload = resolve;
                loaderLogo.onerror = resolve; // Resolver incluso si falla
            }));
        }

        // 2. Precargar las imágenes del mosaico desde obras.json (usando thumbnails optimizados)
        // NOTA: Las imágenes del mosaico ahora se cargan bajo demanda con lazy loading
        // a través del archivo mosaic-optimized.js para mejorar el rendimiento
        // Solo cargamos 5 imágenes representativas en lugar de todas

        // 3. Esperar a todas las imágenes críticas del DOM (logo navbar, etc)
        const criticalImages = document.querySelectorAll('img[src*="Logo CPS"]');
        criticalImages.forEach(img => {
            if (!img.complete) {
                imagePromises.push(new Promise((resolve) => {
                    img.onload = resolve;
                    img.onerror = resolve;
                }));
            }
        });

        // Esperar a que todas las promesas se resuelvan o timeout de 5 segundos
        await Promise.race([
            Promise.all(imagePromises),
            new Promise(resolve => setTimeout(resolve, 5000)) // Timeout de 5 segundos máximo
        ]);

        // Pequeño delay adicional para suavizar la transición
        await new Promise(resolve => setTimeout(resolve, 300));

    } catch (error) {
        console.error('Error durante la carga:', error);
        // Continuar de todas formas
    }

    // Ocultar el loader con animación
    pageLoader.classList.add('hidden');
    body.classList.remove('loading');

    // Remover el loader del DOM después de la transición
    setTimeout(() => {
        pageLoader.style.display = 'none';
    }, 500);
});

// ======================================
// NAVIGATION
// ======================================

const navbar = document.getElementById('navbar');
const menuToggle = document.getElementById('menuToggle');
const navLinks = document.getElementById('navLinks');
const navLinkItems = document.querySelectorAll('.nav-link');

// Navbar scroll effect
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;

    if (currentScroll > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }

    lastScroll = currentScroll;
});
// Aplica carga diferida (lazy load) a todos los videos e imágenes para que solo se carguen cuando están cerca de entrar al viewport
document.querySelectorAll('img').forEach(media => {
    media.loading = 'lazy';
});


// Carga los logos del carrusel de clientes, usando cache local para evitar múltiples requests al servidor
async function loadClientsCarousel() {
    const cacheKey = "clientsCacheV2"; // Cambiar nombre para invalidar cache anterior
    const cached = localStorage.getItem(cacheKey);
    if (cached) {
        renderClientsCarousel(JSON.parse(cached), document.getElementById("clientsCarousel"));
        return;
    }

    // Si no hay cache, obtiene los datos desde el archivo JSON y los guarda en localStorage
    const res = await fetch("assets/data/clients.json");
    const data = await res.json();
    localStorage.setItem(cacheKey, JSON.stringify(data.clientes));
    renderClientsCarousel(data.clientes, document.getElementById("clientsCarousel"));
}

// Crea una función para evitar que se ejecute una función repetidamente en eventos muy frecuentes (como scroll)
function debounce(fn, delay = 100) {
    let timeout;
    return (...args) => {
        clearTimeout(timeout);
        timeout = setTimeout(() => fn(...args), delay);
    };
}

// Usa debounce para optimizar las funciones que se ejecutan al hacer scroll
window.addEventListener('scroll', debounce(() => {
    activateNavLink();
    revealOnScroll();
}, 100));


// Mobile menu toggle
menuToggle.addEventListener('click', () => {
    navLinks.classList.toggle('active');

    // Animate hamburger menu
    const spans = menuToggle.querySelectorAll('span');
    if (navLinks.classList.contains('active')) {
        spans[0].style.transform = 'rotate(45deg) translateY(8px)';
        spans[1].style.opacity = '0';
        spans[2].style.transform = 'rotate(-45deg) translateY(-8px)';
    } else {
        spans[0].style.transform = 'none';
        spans[1].style.opacity = '1';
        spans[2].style.transform = 'none';
    }
});

// Close mobile menu when clicking a link
navLinkItems.forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        const spans = menuToggle.querySelectorAll('span');
        spans[0].style.transform = 'none';
        spans[1].style.opacity = '1';
        spans[2].style.transform = 'none';
    });
});

// Active nav link on scroll
const sections = document.querySelectorAll('section[id]');

function activateNavLink() {
    const scrollY = window.pageYOffset;

    sections.forEach(section => {
        const sectionHeight = section.offsetHeight;
        const sectionTop = section.offsetTop - 100;
        const sectionId = section.getAttribute('id');

        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            navLinkItems.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${sectionId}`) {
                    link.classList.add('active');
                }
            });
        }
    });
}

window.addEventListener('scroll', activateNavLink);

// ======================================
// HERO VIDEO ROTATION
// ======================================
document.addEventListener("DOMContentLoaded", () => {
    const heroVideo = document.getElementById("heroVideo");
    if (!heroVideo) return;

    const videos = [
        `assets/videos/optimizados/Video1_1080p.mp4`,
        `assets/videos/optimizados/Video2_1080p.mp4`,
        `assets/videos/optimizados/Video3_1080p.mp4`,
        `assets/videos/optimizados/Video4_1080p.mp4`,
        `assets/videos/optimizados/Video5_1080p.mp4`,
    ];

    const source = heroVideo.querySelector("source");
    let current = Math.floor(Math.random() * videos.length);

    function loadAndPlay(index) {
        heroVideo.classList.add("fade-out");

        setTimeout(() => {
            // Solo el primer video tiene preload="metadata"
            if (index === 0) {
                source.src = videos[index];
                heroVideo.load();
                heroVideo.oncanplay = () => {
                    heroVideo.classList.remove("fade-out");
                    heroVideo.play().catch(() => { });
                };
            } else {
                // Videos posteriores cargan con lazy loading
                const lazySource = document.createElement('source');
                lazySource.src = videos[index];
                lazySource.type = 'video/mp4';

                heroVideo.innerHTML = '';
                heroVideo.appendChild(lazySource);
                heroVideo.load();
                heroVideo.oncanplay = () => {
                    heroVideo.classList.remove("fade-out");
                    heroVideo.play().catch(() => { });
                };
            }
        }, 400);
    }

    loadAndPlay(current);

    heroVideo.addEventListener("ended", () => {
        current = (current + 1) % videos.length;
        loadAndPlay(current);
    });

    // Preload del siguiente video para transición fluida
    heroVideo.addEventListener("timeupdate", () => {
        if (heroVideo.duration - heroVideo.currentTime < 2) {
            const next = (current + 1) % videos.length;
            const link = document.createElement("link");
            link.rel = "preload";
            link.as = "video";
            link.href = videos[next];
            document.head.appendChild(link);
        }
    });

    // Solo reproducir si el hero es visible
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                heroVideo.play().catch(() => { });
            } else {
                heroVideo.pause();
            }
        });
    }, { threshold: 0.4 });

    observer.observe(heroVideo);
});


// ======================================
// SCROLL REVEAL ANIMATIONS
// ======================================

function revealOnScroll() {
    const reveals = document.querySelectorAll('.reveal');

    reveals.forEach(element => {
        const windowHeight = window.innerHeight;
        const elementTop = element.getBoundingClientRect().top;
        const revealPoint = 150;

        if (elementTop < windowHeight - revealPoint) {
            element.classList.add('active');
        }
    });
}

window.addEventListener('scroll', revealOnScroll);

// Add reveal class to elements
document.addEventListener('DOMContentLoaded', () => {
    const elementsToReveal = document.querySelectorAll(
        '.about-section, .feature-item, .client-card, .contact-info'
    );

    elementsToReveal.forEach(element => {
        element.classList.add('reveal');
    });

    // Initial check
    revealOnScroll();
});

// ======================================
// CLIENTS CAROUSEL - DYNAMIC LOADING WITH PRELOAD
// ======================================



// ======================================
// FORM VALIDATION
// ======================================

document.addEventListener('DOMContentLoaded', () => {
    const contactForm = document.getElementById('contactForm');
    if (!contactForm) return;

    const inputs = contactForm.querySelectorAll('input, textarea');

    inputs.forEach(input => {
        input.addEventListener('input', () => validateInput(input));
        input.addEventListener('blur', () => validateInput(input));
    });

    function validateInput(input) {
        const value = input.value.trim();
        let isValid = false;

        if (input.type === 'email') {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            isValid = emailRegex.test(value);
        } else {
            isValid = value.length > 0;
        }

        if (value.length === 0) {
            input.classList.remove('valid', 'invalid');
        } else if (isValid) {
            input.classList.add('valid');
            input.classList.remove('invalid');
        } else {
            input.classList.add('invalid');
            input.classList.remove('valid');
        }
    }
});

// ======================================
// CLIENTS CAROUSEL - DYNAMIC LOADING WITH PRELOAD
// ======================================



// Precargar todas las imágenes antes de renderizar
async function preloadAndRenderCarousel(clientes) {
    const carousel = document.getElementById('clientsCarousel');
    if (!carousel) return;

    // Mostrar loader mientras se cargan las imágenes
    carousel.innerHTML = '<div class="clients-loader"><div class="loader-spinner"></div></div>';

    // Precargar todas las imágenes con lazy loading
    const imagePromises = clientes.map(cliente => {
        return new Promise((resolve, reject) => {
            const img = new Image();
            img.loading = 'lazy'; // Añadir lazy loading
            img.onload = () => resolve({ cliente, success: true });
            img.onerror = () => resolve({ cliente, success: false }); // No rechazar, solo marcar como fallida
            // Actualizar ruta para usar el nuevo directorio
            img.src = `assets/images/${cliente.logo}`;
        });
    });

    // Esperar a que todas las imágenes se carguen
    const results = await Promise.all(imagePromises);

    // Filtrar solo las imágenes que se cargaron exitosamente
    const successfulClients = results.filter(r => r.success).map(r => r.cliente);

    // Renderizar el carrusel con las imágenes precargadas
    renderClientsCarousel(successfulClients, carousel);
}

function renderClientsCarousel(clientes, carousel) {
    if (!carousel || clientes.length === 0) return;

    // Crear los items de logo (ya precargados)
    const logosHTML = clientes.map(cliente => {
        // Si el JSON tiene una clase personalizada, la usamos
        const claseExtra = cliente.clase ? ` ${cliente.clase}` : '';
        // Añadir lazy loading y usar la ruta actualizada del JSON
        return `
        <div class="client-logo-item${claseExtra}">
            <img src="assets/images/${cliente.logo}"
                 alt="${cliente.nombre}"
                 title="${cliente.nombre}"
                 loading="lazy"
                 decoding="async">
        </div>
    `;
    }).join('');

    // Duplicar el contenido para crear el efecto infinito
    carousel.innerHTML = logosHTML + logosHTML;
}

// Cargar carrusel al cargar el DOM
document.addEventListener('DOMContentLoaded', () => {
    loadClientsCarousel();
});

// ======================================
// AVIF/WEBP RESPONSIVE IMAGES
// ======================================

function generateSrcset(imagePath, baseDir = 'obras-optimized') {
    const imageName = imagePath.split('/').pop();
    const imageNameWithoutExt = imageName.replace(/\.[^/.]+$/, '');
    const folderPath = imagePath.substring(0, imagePath.lastIndexOf('/'));
    const folderName = folderPath.substring(folderPath.lastIndexOf('/') + 1);
    
    // Solo tenemos versión 640w para AVIF (generada en el script simplificado)
    const avifSrcset = `assets/images/obras-avif/${folderName}/${imageNameWithoutExt}-640w.avif 640w`;
    
    // Para WebP, usamos la imagen original como única versión
    const webpSrcset = `assets/images/${baseDir}/${folderName}/${imageNameWithoutExt}.webp 1920w`;
    
    return {
        avif: avifSrcset,
        webp: webpSrcset,
        fallback: `assets/images/${baseDir}/${folderName}/${imageName}`
    };
}

function createPictureTag(imagePath, altText, loading = 'lazy') {
    const srcsets = generateSrcset(imagePath);
    
    return `
        <picture>
            <source srcset="${srcsets.avif}" type="image/avif">
            <source srcset="${srcsets.webp}" type="image/webp">
            <img src="${srcsets.fallback}" 
                 alt="${altText}" 
                 loading="${loading}"
                 decoding="async">
        </picture>
    `;
}

// ======================================
// SMOOTH SCROLL
// ======================================

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));

        if (target) {
            const offsetTop = target.offsetTop - 80; // Offset for fixed navbar

            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// ======================================
// COUNTER ANIMATION FOR STATS
// ======================================

function animateCounter(element, target, duration = 2000) {
    let start = 0;
    const increment = target / (duration / 16); // 60fps

    const timer = setInterval(() => {
        start += increment;
        if (start >= target) {
            element.textContent = target + '+';
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(start) + '+';
        }
    }, 16);
}

// Trigger counter animation when stats section is visible
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            // Animar todos los stat-number dentro de hero-stats
            const statNumbers = entry.target.querySelectorAll('.stat-number');
            statNumbers.forEach(statNumber => {
                const targetValue = parseInt(statNumber.textContent);
                animateCounter(statNumber, targetValue);
            });
            statsObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

const heroStats = document.querySelector('.hero-stats');
if (heroStats) {
    statsObserver.observe(heroStats);
}

// ======================================
// PARALLAX EFFECT ON HERO
// ======================================

window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const heroContent = document.querySelector('.hero-content');
    const heroVideo = document.querySelector('.hero-video');

    // Parallax effect removed to improve performance and fix console warnings
    /*
    if (scrolled < window.innerHeight) {
        requestAnimationFrame(() => {
            heroContent.style.transform = `translateY(${scrolled * 0.5}px)`;
            heroContent.style.opacity = 1 - (scrolled / 500);
            
            // Video parallax
            heroVideo.style.transform = `scale(${1 + scrolled * 0.0001})`;
        });
    }
    */
});

// ======================================
// CURSOR GLOW EFFECT (Optional - Premium touch)
// ======================================

// Uncomment this section if you want a cursor glow effect
/*
const cursorGlow = document.createElement('div');
cursorGlow.className = 'cursor-glow';
document.body.appendChild(cursorGlow);

document.addEventListener('mousemove', (e) => {
    cursorGlow.style.left = e.clientX + 'px';
    cursorGlow.style.top = e.clientY + 'px';
});

// Add this CSS to your styles.css if you enable this feature:
// .cursor-glow {
//     position: fixed;
//     width: 300px;
//     height: 300px;
//     background: radial-gradient(circle, rgba(239, 138, 30, 0.15) 0%, transparent 70%);
//     pointer-events: none;
//     transform: translate(-50%, -50%);
//     z-index: 9999;
//     transition: opacity 0.3s ease;
// }
*/

// ======================================
// LOADING ANIMATION
// ======================================

window.addEventListener('load', () => {
    document.body.classList.add('loaded');

    // Trigger initial animations
    setTimeout(() => {
        revealOnScroll();
    }, 100);
});

// ======================================
// PERFORMANCE OPTIMIZATION
// ======================================

// Reduce animation on low-end devices
if (navigator.hardwareConcurrency && navigator.hardwareConcurrency < 4) {
    document.documentElement.style.setProperty('--transition-fast', '0.1s');
    document.documentElement.style.setProperty('--transition-normal', '0.2s');
    document.documentElement.style.setProperty('--transition-slow', '0.3s');
}

// Disable animations if user prefers reduced motion
if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    document.querySelectorAll('*').forEach(element => {
        element.style.animation = 'none';
        element.style.transition = 'none';
    });
}

// ======================================
// MOSAICO SUPER SIMPLE - IMÁGENES FIJAS SIN JAVASCRIPT COMPLEJO
// ======================================

// Configuración DIRECTA de imágenes (sin fetch, sin lógica compleja)
const MOSAIC_IMAGES_DIRECT = {
    salud: 'assets/images/mosaic-thumbs/hospital-cerro/1.webp',
    educacion: 'assets/images/mosaic-thumbs/facultad-enfermeria/1.webp',
    vivienda: 'assets/images/mosaic-thumbs/realojos-piedrasblancas/1.webp',
    obras_publicas: 'assets/images/mosaic-thumbs/congreso-intendentes/1.webp',
    corporativo: 'assets/images/mosaic-thumbs/summum-wtc/1.webp'
};

// Colores de fallback por si las imágenes no cargan
const MOSAIC_FALLBACK_COLORS = {
    salud: 'rgba(33, 150, 243, 0.7)',
    educacion: 'rgba(76, 175, 80, 0.7)',
    vivienda: 'rgba(255, 152, 0, 0.7)',
    obras_publicas: 'rgba(156, 39, 176, 0.7)',
    corporativo: 'rgba(96, 125, 139, 0.7)'
};

// Función SUPER SIMPLE para cargar el mosaico
function setupMosaicSimple() {
    console.log('🎯 Configurando mosaico SUPER SIMPLE (sin slideshow)');
    
    document.querySelectorAll('.mosaic-item').forEach((item) => {
        const category = item.dataset.category;
        const bgElement = item.querySelector('.mosaic-bg');
        
        if (!bgElement) return;
        
        // Obtener la imagen DIRECTAMENTE de la configuración
        const imageUrl = MOSAIC_IMAGES_DIRECT[category];
        
        if (!imageUrl) {
            console.warn(`No hay imagen configurada para categoría: ${category}`);
            bgElement.style.backgroundColor = MOSAIC_FALLBACK_COLORS[category] || 'rgba(51, 51, 51, 0.7)';
            bgElement.style.opacity = '1';
            return;
        }
        
        // Cargar la imagen de manera SIMPLE
        const img = new Image();
        img.loading = 'lazy';
        img.src = imageUrl;
        
        img.onload = () => {
            bgElement.style.backgroundImage = `url(${imageUrl})`;
            bgElement.style.opacity = '1';
            console.log(`✅ Imagen cargada para ${category}: ${imageUrl}`);
        };
        
        img.onerror = () => {
            console.error(`❌ Error cargando imagen para ${category}: ${imageUrl}`);
            bgElement.style.backgroundColor = MOSAIC_FALLBACK_COLORS[category] || 'rgba(51, 51, 51, 0.7)';
            bgElement.style.opacity = '1';
        };
        
        // Agregar evento de click para redirigir
        item.addEventListener('click', () => {
            window.location.href = `obras.html?categoria=${category}`;
        });
        
        // Efecto hover simple
        item.addEventListener('mouseenter', () => {
            bgElement.style.transform = 'scale(1.05)';
        });
        
        item.addEventListener('mouseleave', () => {
            bgElement.style.transform = 'scale(1)';
        });
    });
    
    console.log('✅ Mosaico simple configurado: 5 imágenes FIJAS (sin rotación)');
}

// Inicializar cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', () => {
    console.log('🚀 DOM cargado - Iniciando mosaico simple');
    setupMosaicSimple();
});

// Medida de seguridad EXTREMA: Bloquear cualquier slideshow
window.addEventListener('load', () => {
    console.log('🛡️  Activando protección contra slideshow...');
    
    // Deshabilitar setInterval para delays largos (posibles slideshows)
    const originalSetInterval = window.setInterval;
    window.setInterval = function(callback, delay) {
        if (delay > 2000) { // Si el delay es mayor a 2 segundos
            console.warn('🚫 BLOQUEADO: setInterval con delay largo detectado:', delay, 'ms');
            // No ejecutar el callback
            return 0;
        }
        return originalSetInterval.call(this, callback, delay);
    };
    
    // También limpiar cualquier intervalo existente
    const maxIntervalId = 1000;
    for (let i = 0; i < maxIntervalId; i++) {
        clearInterval(i);
        clearTimeout(i);
    }
    
    console.log('✅ Protección activada - No habrá slideshow en el mosaico');
});

// ======================================
// CONSOLE MESSAGE (Optional)
// ======================================

console.log(
    '%c GRUPO CPS ',
    'background: #ef8a1e; color: white; font-size: 20px; font-weight: bold; padding: 10px;'
);
console.log(
    '%c Construcción y Aluminio | Uruguay ',
    'color: #ef8a1e; font-size: 14px;'
);

document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('contactForm');
    const responseEl = document.getElementById('formResponse');

    if (form) {
        form.addEventListener('submit', async (e) => {
            e.preventDefault();

            const formData = new FormData(form);
            responseEl.textContent = "Enviando...";
            responseEl.style.color = "#ef8a1e";

            try {
                // Convert FormData to URL encoded string for Netlify Forms
                const urlEncodedData = new URLSearchParams(formData).toString();

                const res = await fetch("/", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/x-www-form-urlencoded"
                    },
                    body: urlEncodedData
                });

                if (res.ok) {
                    responseEl.textContent = "✅ ¡Mensaje enviado con éxito! Nos pondremos en contacto pronto.";
                    responseEl.style.color = "#9be37b";
                    form.reset();
                } else {
                    responseEl.textContent = "❌ Error al enviar. Por favor, intenta nuevamente.";
                    responseEl.style.color = "#ff8b8b";
                }
            } catch (error) {
                console.error('Error:', error);
                responseEl.textContent = "Error de conexión. Intenta nuevamente.";
                responseEl.style.color = "#ff8b8b";
            }
        });
    }
});

document.addEventListener("DOMContentLoaded", () => {
    const carousel = document.querySelector(".clients-carousel");
    if (!carousel) return;

    // Configuración base - ajusta estos valores según prefieras
    let baseSpeed = 2;      // velocidad normal (px/frame)
    let hoverSpeed = 1;    // velocidad al hacer hover
    let targetSpeed = baseSpeed;
    let currentSpeed = baseSpeed;
    let position = 0;

    function animate() {
        // Transición suave con easing (como un auto frenando/acelerando)
        const diff = targetSpeed - currentSpeed;
        const easingFactor = 0.04; // Factor de suavizado (menor = más suave, mayor = más rápido)

        // Aplicar easing solo si hay diferencia significativa
        if (Math.abs(diff) > 0.001) {
            currentSpeed += diff * easingFactor;
        } else {
            currentSpeed = targetSpeed;
        }

        // Mover el carrusel
        position -= currentSpeed;

        // Reiniciar posición para bucle infinito sin cortes
        if (position <= -carousel.scrollWidth / 2) {
            position = 0;
        }

        carousel.style.transform = `translateX(${position}px)`;
        requestAnimationFrame(animate);
    }

    // Eventos de hover
    const wrapper = carousel.closest(".clients-carousel-wrapper");
    if (wrapper) {
        wrapper.addEventListener("mouseenter", () => {
            targetSpeed = hoverSpeed; // Reducir velocidad gradualmente
        });

        wrapper.addEventListener("mouseleave", () => {
            targetSpeed = baseSpeed; // Volver a velocidad normal gradualmente
        });
    }

    // Duplicar contenido para bucle infinito sin cortes
    carousel.innerHTML += carousel.innerHTML;

    // Iniciar animación
    animate();
});

// ======================================
// LANGUAGE SWITCHER (i18n)
// ======================================

document.addEventListener('DOMContentLoaded', () => {
    // Inicializar el idioma desde localStorage, URL o navegador
    if (typeof initLanguage === 'function') {
        initLanguage();
    }

    // Event listeners para los botones de idioma
    document.querySelectorAll('.lang-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const lang = e.target.getAttribute('data-lang');
            if (typeof setLanguage === 'function') {
                setLanguage(lang);
            }
        });
    });
});

// ======================================
// PWA & SERVICE WORKER REGISTRATION
// ======================================

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js')
      .then((registration) => {
        console.log('✅ SW registrado con alcance:', registration.scope);
      })
      .catch((error) => {
        console.error('❌ SW fallo al registrar:', error);
      });
  });
}

// ======================================
// INTELLIGENT PREFETCHING
// ======================================

// Prefetch de obras.js cuando el usuario hace hover en "Obras"
const obrasLink = document.querySelector('a[href*="obras.html"]');
if (obrasLink) {
  obrasLink.addEventListener('mouseenter', () => {
    // Prefetch de obras.js
    const obrasScript = document.createElement('link');
    obrasScript.rel = 'prefetch';
    obrasScript.href = 'js/obras.min.js';
    obrasScript.as = 'script';
    document.head.appendChild(obrasScript);

    // Prefetch de obras.html
    const obrasPage = document.createElement('link');
    obrasPage.rel = 'prefetch';
    obrasPage.href = 'obras.html';
    document.head.appendChild(obrasPage);
  }, { once: true }); // Solo prefetch una vez
}

// Prefetch de imágenes del mosaico cuando es visible
const mosaicObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      // Las imágenes del mosaico ya se cargan por el script existente
      // Prefetch adicional de imágenes de alta calidad
      fetch('assets/data/obras.json')
        .then(response => response.json())
        .then(obras => {
          const firstObras = obras.slice(0, 3); // Prefetch primeras 3 obras
          firstObras.forEach(obra => {
            if (obra.imagenes && obra.imagenes.length > 0) {
              obra.imagenes.slice(0, 2).forEach(imgPath => {
                const prefetchImg = document.createElement('link');
                prefetchImg.rel = 'prefetch';
                prefetchImg.href = `assets/images/${imgPath}`;
                document.head.appendChild(prefetchImg);
              });
            }
          });
        });
      mosaicObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });

const mosaicSection = document.querySelector('.sectors-mosaic');
if (mosaicSection) {
  mosaicObserver.observe(mosaicSection);
}