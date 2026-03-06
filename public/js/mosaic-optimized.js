// ======================================
// MOSAICO OPTIMIZADO - Carga solo 5 imágenes representativas
// ======================================

// Configuración de imágenes representativas por categoría
const MOSAIC_CONFIG = {
    salud: {
        obraId: 1, // Hospital del Cerro
        imageIndex: 0 // Primera imagen de la obra
    },
    educacion: {
        obraId: 4, // Facultad de Enfermería UdelaR
        imageIndex: 0
    },
    vivienda: {
        obraId: 5, // Centro de Realojos Piedras Blancas
        imageIndex: 0
    },
    obras_publicas: {
        obraId: 3, // Congreso de Intendentes
        imageIndex: 0
    },
    corporativo: {
        obraId: 17, // Summum - World Trade Center
        imageIndex: 0
    }
};

// Cache de obras para no cargar múltiples veces
let obrasCache = null;
let mosaicImagesLoaded = false;

/**
 * Carga las obras desde el JSON
 */
async function loadObrasData() {
    if (obrasCache) return obrasCache;
    
    try {
        const response = await fetch('assets/data/obras.json');
        if (!response.ok) throw new Error('Error al cargar las obras');
        obrasCache = await response.json();
        return obrasCache;
    } catch (error) {
        console.error('Error cargando obras para el mosaico:', error);
        return [];
    }
}

/**
 * Obtiene la imagen optimizada para el mosaico
 */
function getMosaicImagePath(obra, imageIndex = 0) {
    if (!obra || !obra.imagenes || obra.imagenes.length === 0) {
        return null;
    }
    
    const originalImage = obra.imagenes[imageIndex];
    if (!originalImage) return null;
    
    // Convertir ruta de imagen optimizada a thumbnail para mosaico
    // obras-optimized/... -> mosaic-thumbs/...
    return originalImage.replace('obras-optimized/', 'mosaic-thumbs/');
}

/**
 * Configura las imágenes del mosaico
 */
async function setupMosaicImages() {
    if (mosaicImagesLoaded) return;
    
    const obras = await loadObrasData();
    if (obras.length === 0) return;
    
    const imagePromises = [];
    
    // Configurar cada elemento del mosaico
    Object.entries(MOSAIC_CONFIG).forEach(([category, config]) => {
        const obra = obras.find(o => o.id === config.obraId);
        if (!obra) {
            console.warn(`No se encontró obra para categoría ${category} con ID ${config.obraId}`);
            return;
        }
        
        const imagePath = getMosaicImagePath(obra, config.imageIndex);
        if (!imagePath) {
            console.warn(`No se encontró imagen para obra ${obra.nombre}`);
            return;
        }
        
        // Encontrar el elemento del mosaico correspondiente
        const mosaicItem = document.querySelector(`.mosaic-item[data-category="${category}"]`);
        if (!mosaicItem) return;
        
        const mosaicBg = mosaicItem.querySelector('.mosaic-bg[data-image]');
        if (!mosaicBg) return;
        
        // Crear promesa para cargar la imagen
        const imagePromise = new Promise((resolve) => {
            const img = new Image();
            img.loading = 'lazy';
            img.src = `assets/images/${imagePath}`;
            img.alt = obra.nombre;
            
            img.onload = () => {
                mosaicBg.style.backgroundImage = `url('${img.src}')`;
                mosaicBg.classList.add('loaded');
                resolve();
            };
            
            img.onerror = () => {
                console.error(`Error cargando imagen para mosaico ${category}: ${imagePath}`);
                // Usar un color de fondo de respaldo
                mosaicBg.style.backgroundColor = getCategoryColor(category);
                mosaicBg.classList.add('loaded');
                resolve();
            };
        });
        
        imagePromises.push(imagePromise);
        
        // Agregar evento de click para redirigir a la página de obras con filtro
        mosaicItem.addEventListener('click', () => {
            window.location.href = `obras.html?categoria=${category}`;
        });
        
        // Efectos de hover
        mosaicItem.addEventListener('mouseenter', () => {
            mosaicBg.style.transform = 'scale(1.05)';
        });
        
        mosaicItem.addEventListener('mouseleave', () => {
            mosaicBg.style.transform = 'scale(1)';
        });
    });
    
    // Esperar a que todas las imágenes se carguen
    await Promise.all(imagePromises);
    mosaicImagesLoaded = true;
    console.log('✅ Mosaico optimizado cargado: 5 imágenes representativas');
}

/**
 * Obtiene un color de fondo para cada categoría (fallback)
 */
function getCategoryColor(category) {
    const colors = {
        salud: 'rgba(33, 150, 243, 0.7)',
        educacion: 'rgba(76, 175, 80, 0.7)',
        vivienda: 'rgba(255, 152, 0, 0.7)',
        obras_publicas: 'rgba(156, 39, 176, 0.7)',
        corporativo: 'rgba(96, 125, 139, 0.7)'
    };
    return colors[category] || 'rgba(51, 51, 51, 0.7)';
}

/**
 * Precarga las imágenes del mosaico (opcional, para mejor UX)
 */
function preloadMosaicImages() {
    // Precargar solo las 5 imágenes necesarias
    Object.values(MOSAIC_CONFIG).forEach(config => {
        const img = new Image();
        // Usar una imagen placeholder pequeña primero
        img.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgdmlld0JveD0iMCAwIDEwMCAxMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHJlY3Qgd2lkdGg9IjEwMCIgaGVpZ2h0PSIxMDAiIGZpbGw9IiMxQzFGMjQiLz48L3N2Zz4=';
    });
}

/**
 * Inicializa el mosaico cuando el DOM está listo
 */
function initMosaic() {
    const mosaicSection = document.querySelector('.sectors-mosaic');
    if (!mosaicSection) return;
    
    // Precargar imágenes mínimas
    preloadMosaicImages();
    
    // Usar Intersection Observer para cargar imágenes solo cuando son visibles
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                setupMosaicImages();
                observer.unobserve(entry.target);
            }
        });
    }, { 
        threshold: 0.1,
        rootMargin: '50px' // Cargar un poco antes de que sea visible
    });
    
    observer.observe(mosaicSection);
    
    // También cargar si el usuario ya está en la sección
    const rect = mosaicSection.getBoundingClientRect();
    if (rect.top < window.innerHeight && rect.bottom > 0) {
        setupMosaicImages();
    }
}

// Inicializar cuando el DOM esté listo
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initMosaic);
} else {
    initMosaic();
}

// Exportar para uso en otros archivos si es necesario
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { setupMosaicImages, initMosaic };
}