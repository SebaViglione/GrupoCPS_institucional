// ======================================
// OBRAS PAGE - Dynamic Loading
// ======================================

// Helper function to get translated field based on current language
function getObraField(obra, fieldName) {
    const lang = typeof getCurrentLanguage === 'function' ? getCurrentLanguage() : 'es';
    const translatedField = `${fieldName}_${lang}`;
    return obra[translatedField] || obra[fieldName];
}

// Helper function to get translated category name
function getCategoryName(categoria) {
    const categoryMap = {
        'salud': 'obrasPage.filter.health',
        'educacion': 'obrasPage.filter.education',
        'vivienda': 'obrasPage.filter.retail',
        'obras_publicas': 'obrasPage.filter.public',
        'corporativo': 'obrasPage.filter.corporate'
    };

    const translationKey = categoryMap[categoria];
    if (translationKey && typeof t === 'function') {
        return t(translationKey);
    }

    // Fallback: capitalize first letter and remove underscores
    return categoria.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
}

let obrasData = [];
let currentFilter = 'todas';
let currentStatus = 'todas';
let currentView = 'grid';
let imageIntervals = {};
let heroBackgroundInterval = null;
let displayedCount = 12; // Initial number of obras to display
const LOAD_MORE_COUNT = 12; // Number to load when clicking "Load More"

// Load obras from JSON
async function loadObras() {
    try {
        const response = await fetch('assets/data/obras.json');
        if (!response.ok) {
            throw new Error('Error al cargar las obras');
        }
        const data = await response.json();
        obrasData = data;
        setupHeroBackground();
        renderObras();
    } catch (error) {
        console.error('Error:', error);
        showError();
    }
}

// Helper function for AVIF srcset generation
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

// Setup Hero Background with rotating images
function setupHeroBackground() {
    // Collect all images from all obras
    const allImages = [];
    obrasData.forEach(obra => {
        if (obra.imagenes && obra.imagenes.length > 0) {
            obra.imagenes.forEach(img => {
                allImages.push(img);
            });
        }
    });

    if (allImages.length === 0) return;

    // Filter only high-quality images from obras-optimized/ (WebP format with good resolution)
    const highQualityImages = allImages.filter(img => {
        const lowercaseImg = img.toLowerCase();

        // Only use images from obras-optimized/ directory
        if (!lowercaseImg.includes('obras-optimized/')) {
            return false;
        }

        // Exclude common thumbnail patterns
        if (lowercaseImg.includes('thumb') ||
            lowercaseImg.includes('small') ||
            lowercaseImg.includes('preview')) {
            return false;
        }

        // Only use WebP images (these are the upscaled and optimized ones)
        return lowercaseImg.endsWith('.webp');
    });

    // Use filtered images, or fall back to all images if no high-quality ones found
    const imagesToUse = highQualityImages.length > 0 ? highQualityImages : allImages;

    console.log(`Hero: Usando ${imagesToUse.length} imágenes de alta calidad de obras-optimized/`);

    // Shuffle images randomly
    const shuffledImages = imagesToUse.sort(() => Math.random() - 0.5);

    // Take first 10 images for rotation (to avoid too many)
    const selectedImages = shuffledImages.slice(0, 10);

    const heroContainer = document.querySelector('.hero-background-images');
    if (!heroContainer) return;

    // Preload images to avoid pixelation during transitions
    const preloadedImages = [];
    let loadedCount = 0;

    selectedImages.forEach((imgSrc, index) => {
        const img = new Image();
        
        // Usar la función generateSrcset actualizada
        const srcsets = generateSrcset(imgSrc);
        
        // Verificar soporte AVIF
        const supportsAvif = document.createElement('canvas')
            .toDataURL('image/avif')
            .indexOf('data:image/avif') === 0;
        
        if (supportsAvif) {
            img.srcset = srcsets.avif;
        }
        img.src = `assets/images/${imgSrc}`;
        img.alt = 'Obra Grupo CPS';
        img.className = 'hero-bg-image';

        // Only add to DOM once loaded
        img.onload = () => {
            heroContainer.appendChild(img);
            preloadedImages.push(img);
            loadedCount++;

            // Activate first image with delay for smooth fade-in
            if (index === 0) {
                setTimeout(() => {
                    img.classList.add('active');
                }, 100); // Small delay to ensure CSS transition applies
            }

            // Start rotation only when all images are loaded
            if (loadedCount === selectedImages.length) {
                startHeroRotation();
            }
        };
    });

    function startHeroRotation() {
        let currentImageIndex = 0;
        const images = heroContainer.querySelectorAll('.hero-bg-image');

        console.log('Hero rotation starting with', images.length, 'images');

        if (images.length <= 1) {
            console.log('Not enough images for rotation');
            return;
        }

        heroBackgroundInterval = setInterval(() => {
            // Fade out current image
            images[currentImageIndex].classList.remove('active');

            // Move to next image
            currentImageIndex = (currentImageIndex + 1) % images.length;

            console.log('Switching to image', currentImageIndex);

            // Fade in next image
            images[currentImageIndex].classList.add('active');
        }, 3000); // Change every 3 seconds
    }
}

// Render obras to grid
function renderObras(append = false) {
    const grid = document.getElementById('obrasGrid');

    // Apply view class
    if (!append) {
        grid.className = 'obras-grid';
        if (currentView === 'list') {
            grid.classList.add('list-view');
        }
    }

    // Filter obras
    let filteredObras = obrasData.filter(obra => {
        const matchCategory = currentFilter === 'todas' || obra.categoria === currentFilter;
        const matchStatus = currentStatus === 'todas' || obra.estado === currentStatus;
        return matchCategory && matchStatus;
    });

    if (filteredObras.length === 0) {
        grid.innerHTML = `
            <div class="no-obras-message">
                <h3>No se encontraron obras</h3>
                <p>No hay obras que coincidan con los filtros seleccionados.</p>
            </div>
        `;
        return;
    }

    // Determine how many obras to display
    const obrasToDisplay = append ? filteredObras.length : Math.min(displayedCount, filteredObras.length);
    const obrasToRender = append ? filteredObras.slice(displayedCount - LOAD_MORE_COUNT, displayedCount) : filteredObras.slice(0, obrasToDisplay);

    // Generate HTML for obras
    const obrasHTML = obrasToRender.map((obra, index) => {
        const actualIndex = append ? displayedCount - LOAD_MORE_COUNT + index : index;
        return `
            <div class="obra-card" style="animation-delay: ${(actualIndex % LOAD_MORE_COUNT) * 0.1}s" data-obra-id="${obra.id}" onclick="openModal(${obra.id})">
                <div class="obra-image" data-images='${JSON.stringify(obra.imagenes || [])}' data-videos='${JSON.stringify(obra.videos || [])}'>
                    ${obra.imagenes && obra.imagenes.length > 0
                ? `<div class="obra-image-loader">
                                <div class="obra-spinner"></div>
                                <p>Cargando</p>
                            </div>
                            <picture class="obra-img-main">
                                <source data-srcset="${generateSrcset(obra.imagenes[0]).avif}" type="image/avif">
                                <source data-srcset="${generateSrcset(obra.imagenes[0]).webp}" type="image/webp">
                                <img class="lazy-load" 
                                     data-src="${generateSrcset(obra.imagenes[0]).fallback}"
                                     alt="${getObraField(obra, 'nombre')}"
                                     onerror="this.parentElement.innerHTML='<div class=\\'obra-placeholder\\'><svg xmlns=\\'http://www.w3.org/2000/svg\\' viewBox=\\'0 0 24 24\\' fill=\\'none\\' stroke=\\'currentColor\\' stroke-width=\\'2\\'><rect x=\\'3\\' y=\\'3\\' width=\\'18\\' height=\\'18\\' rx=\\'2\\' ry=\\'2\\'></rect><circle cx=\\'8.5\\' cy=\\'8.5\\' r=\\'1.5\\'></circle><polyline points=\\'21 15 16 10 5 21\\'></polyline></svg></div>'">
                            </picture>`
                : `<div class="obra-placeholder">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                    <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                                    <circle cx="8.5" cy="8.5" r="1.5"></circle>
                                    <polyline points="21 15 16 10 5 21"></polyline>
                                </svg>
                            </div>`
            }
                    ${((obra.imagenes && obra.imagenes.length > 1) || (obra.videos && obra.videos.length > 0))
                ? `<div class="obra-image-indicators">
                            ${obra.videos && obra.videos.length > 0 ? '<span class="indicator-dot"></span>' : ''}
                            ${obra.imagenes ? obra.imagenes.map((_, index) =>
                    `<span class="indicator-dot${index === 0 ? ' active' : ''}"></span>`
                ).join('') : ''}
                           </div>`
                : ''
            }
                    <span class="obra-status-badge status-${obra.estado.toLowerCase().replace(' ', '-')}">
                        ${obra.estado}
                    </span>
                </div>
                <div class="obra-content">
                    <div class="obra-header">
                        <span class="obra-categoria">${getCategoryName(obra.categoria)}</span>
                        <h3 class="obra-nombre">${getObraField(obra, 'nombre')}</h3>
                        <div class="obra-cliente">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                                <circle cx="12" cy="7" r="4"></circle>
                            </svg>
                            <span>${getObraField(obra, 'cliente')}</span>
                        </div>
                    </div>
                    <p class="obra-descripcion">${getObraField(obra, 'descripcion')}</p>
                    <div class="obra-details">
                        <div class="obra-detail-item">
                            <span class="detail-label">Ubicación</span>
                            <span class="detail-value">${getObraField(obra, 'ubicacion')}</span>
                        </div>
                        <div class="obra-detail-item">
                            <span class="detail-label">Superficie</span>
                            <span class="detail-value">${obra.superficie}</span>
                        </div>
                    </div>
                    <div class="obra-cta">
                        <button class="btn-ver-mas" onclick="openModal(${obra.id}); event.stopPropagation();">Ver Detalles</button>
                    </div>
                </div>
            </div>
        `;
    }).join('');

    if (append) {
        // Remove existing load more button if present
        const existingBtn = grid.querySelector('.load-more-container');
        if (existingBtn) existingBtn.remove();

        // Append new obras
        grid.insertAdjacentHTML('beforeend', obrasHTML);
    } else {
        grid.innerHTML = obrasHTML;
    }

    // Add "Load More" button if there are more obras to show
    if (obrasToDisplay < filteredObras.length) {
        const loadMoreHTML = `
            <div class="load-more-container">
                <button class="btn-load-more" onclick="loadMoreObras()">
                    <span data-i18n="obrasPage.loadMore">Cargar Más Obras</span>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <polyline points="6 9 12 15 18 9"></polyline>
                    </svg>
                </button>
                <p class="load-more-info">
                    <span data-i18n="obrasPage.showing">Mostrando</span> 
                    ${obrasToDisplay} 
                    <span data-i18n="obrasPage.of">de</span> 
                    ${filteredObras.length} 
                    <span data-i18n="obrasPage.projects">obras</span>
                </p>
            </div>
        `;
        grid.insertAdjacentHTML('beforeend', loadMoreHTML);

        // Apply translations to newly added elements
        if (typeof setLanguage === 'function') {
            const lang = typeof getCurrentLanguage === 'function' ? getCurrentLanguage() : 'es';
            grid.querySelectorAll('[data-i18n]').forEach(element => {
                const key = element.getAttribute('data-i18n');
                if (typeof t === 'function') {
                    element.textContent = t(key);
                }
            });
        }
    }

    // Setup image carousel on hover
    setupImageCarousel();

    // Setup lazy loading for images
    setupLazyLoading();
}

// Load more obras function
function loadMoreObras() {
    displayedCount += LOAD_MORE_COUNT;
    renderObras(true);
}

// Setup lazy loading for images using Intersection Observer
function setupLazyLoading() {
    const lazyImages = document.querySelectorAll('.lazy-load');

    if (!lazyImages.length) return;

    // Configuración del Intersection Observer
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                const loader = img.previousElementSibling; // El spinner

                // Crear una nueva imagen para precargar
                const tempImg = new Image();

                tempImg.onload = () => {
                    // Una vez cargada, asignar el src a la imagen real
                    img.src = img.dataset.src;
                    img.classList.add('loaded');

                    // Ocultar el loader con transición suave
                    if (loader && loader.classList.contains('obra-image-loader')) {
                        loader.style.opacity = '0';
                        setTimeout(() => {
                            loader.style.display = 'none';
                        }, 300);
                    }
                };

                tempImg.onerror = () => {
                    // Si falla la carga, mostrar placeholder
                    if (loader && loader.classList.contains('obra-image-loader')) {
                        loader.innerHTML = `
                            <div class="obra-placeholder">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                    <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                                    <circle cx="8.5" cy="8.5" r="1.5"></circle>
                                    <polyline points="21 15 16 10 5 21"></polyline>
                                </svg>
                            </div>
                        `;
                    }
                    img.style.display = 'none';
                };

                // Iniciar la carga de la imagen
                tempImg.src = img.dataset.src;

                // Dejar de observar esta imagen
                observer.unobserve(img);
            }
        });
    }, {
        // Load images when they're closer to viewport for better performance
        rootMargin: '50px 0px',
        threshold: 0.01
    });

    // Observar todas las imágenes lazy
    lazyImages.forEach(img => {
        imageObserver.observe(img);
    });
}

// Setup image carousel on hover with video support
function setupImageCarousel() {
    const obraCards = document.querySelectorAll('.obra-card');

    obraCards.forEach(card => {
        const obraImage = card.querySelector('.obra-image');
        const imagesAttr = obraImage?.getAttribute('data-images');
        const videosAttr = obraImage?.getAttribute('data-videos');

        let images = [];
        let videos = [];

        try {
            images = JSON.parse(imagesAttr || '[]');
            videos = JSON.parse(videosAttr || '[]');
        } catch (e) {
            return;
        }

        // Skip if no media or only one image and no videos
        if ((images.length <= 1 && videos.length === 0) || (images.length === 0 && videos.length === 0)) {
            return;
        }

        const obraId = card.getAttribute('data-obra-id');
        const indicators = card.querySelectorAll('.indicator-dot');
        let currentIndex = 0;
        let videoPlayed = false;
        let currentVideoElement = null;

        // Add click handlers to indicator dots
        indicators.forEach((dot, dotIndex) => {
            dot.addEventListener('click', (e) => {
                e.stopPropagation(); // Prevent card click event

                // Clear any running interval
                if (imageIntervals[obraId]) {
                    clearInterval(imageIntervals[obraId]);
                    delete imageIntervals[obraId];
                }

                // Calculate which image to show (account for video offset)
                const offset = videos.length > 0 ? 1 : 0;
                const imageIndex = dotIndex - offset;

                // If it's a video dot (first dot when videos exist)
                if (videos.length > 0 && dotIndex === 0) {
                    // Play video
                    videoPlayed = false;
                    playVideo(videos[0]);
                    currentIndex = 0;
                } else if (imageIndex >= 0 && imageIndex < images.length) {
                    // Show the selected image with same transition as hover
                    const img = obraImage.querySelector('.obra-img-main');
                    if (img && img.style.display !== 'none') {
                        // Update current index
                        currentIndex = imageIndex;

                        // Update active dot
                        indicators.forEach(d => d.classList.remove('active'));
                        dot.classList.add('active');

                        // Stop any playing video
                        if (currentVideoElement) {
                            currentVideoElement.pause();
                            currentVideoElement.style.opacity = '0';
                            setTimeout(() => {
                                if (currentVideoElement) {
                                    currentVideoElement.remove();
                                    currentVideoElement = null;
                                }
                            }, 300);
                        }

                        // Preload next image before transition (same as hover carousel)
                        const preloadImg = new Image();
                        preloadImg.onload = () => {
                            // Fade out current image
                            img.style.opacity = '0';

                            // Change src and fade in after transition completes
                            setTimeout(() => {
                                img.src = preloadImg.src;
                                img.style.opacity = '1';
                            }, 300);
                        };
                        preloadImg.src = `assets/images/${images[imageIndex]}`;
                    }
                }
            });
        });

        card.addEventListener('mouseenter', async () => {
            // Clear any existing interval for this card
            if (imageIntervals[obraId]) {
                clearInterval(imageIntervals[obraId]);
            }

            videoPlayed = false;
            currentIndex = 0;

            // If there's a video, play it first
            if (videos.length > 0 && !videoPlayed) {
                // Activate first dot (video indicator)
                if (indicators.length > 0) {
                    indicators[0].classList.add('active');
                    if (indicators.length > 1) indicators[1].classList.remove('active');
                }
                await playVideo(videos[0]);
            }

            // After video ends (or if no video), start image carousel
            startImageCarousel();
        });

        card.addEventListener('mouseleave', () => {
            // Stop video if playing
            if (currentVideoElement) {
                currentVideoElement.pause();
                currentVideoElement.currentTime = 0; // Reset video to start
                currentVideoElement.style.opacity = '0';
                setTimeout(() => {
                    if (currentVideoElement) {
                        currentVideoElement.remove();
                        currentVideoElement = null;
                    }
                }, 300);
            }

            // Clear interval
            if (imageIntervals[obraId]) {
                clearInterval(imageIntervals[obraId]);
                delete imageIntervals[obraId];
            }

            videoPlayed = false;
            currentIndex = 0;

            // Reset indicators to first image
            if (indicators.length > 0) {
                const offset = videos.length > 0 ? 1 : 0;
                indicators.forEach((dot, index) => {
                    dot.classList.remove('active');
                    if (index === offset) dot.classList.add('active');
                });
            }

            // Reset to first image with smooth fade-in
            const img = obraImage.querySelector('.obra-img-main');
            if (img && images.length > 0 && img.src) {
                img.style.display = 'block';
                img.style.opacity = '0';

                // Wait for image to load before fading in
                const newImg = new Image();
                newImg.onload = () => {
                    img.src = `assets/images/${images[0]}`;
                    setTimeout(() => {
                        img.style.opacity = '1';
                    }, 50);
                };
                newImg.src = `assets/images/${images[0]}`;
            }
        });

        function playVideo(videoSrc) {
            return new Promise((resolve) => {
                const img = obraImage.querySelector('.obra-img-main');

                // Create video element first
                const video = document.createElement('video');
                video.src = `assets/images/${videoSrc}`;
                video.className = 'obra-video-preview';
                video.muted = true;
                video.playsInline = true;
                video.style.width = '100%';
                video.style.height = '100%';
                video.style.objectFit = 'cover';
                video.style.position = 'absolute';
                video.style.top = '0';
                video.style.left = '0';
                video.style.opacity = '0';
                video.style.transition = 'opacity 0.3s ease';

                obraImage.appendChild(video);
                currentVideoElement = video;

                // Crossfade: fade out image while fading in video
                setTimeout(() => {
                    if (img) {
                        img.style.opacity = '0';
                    }
                    video.style.opacity = '1';
                }, 50);

                // Hide image after crossfade completes
                setTimeout(() => {
                    if (img) {
                        img.style.display = 'none';
                    }
                }, 350);

                // Play video
                video.play().catch(() => {
                    // If play fails, just resolve
                    video.remove();
                    currentVideoElement = null;
                    videoPlayed = true;
                    if (img) {
                        img.style.display = 'block';
                        img.style.opacity = '1';
                    }
                    resolve();
                });

                // When video ends
                video.addEventListener('ended', () => {
                    // Prepare image for crossfade
                    if (img) {
                        img.style.display = 'block';
                        img.style.opacity = '0';

                        // Preload image before crossfade
                        const preloadImg = new Image();
                        preloadImg.onload = () => {
                            img.src = preloadImg.src;

                            // Crossfade: fade out video while fading in image
                            setTimeout(() => {
                                video.style.opacity = '0';
                                img.style.opacity = '1';
                            }, 50);

                            // Remove video after crossfade completes
                            setTimeout(() => {
                                video.remove();
                                currentVideoElement = null;
                                videoPlayed = true;
                                resolve();
                            }, 350);
                        };
                        preloadImg.src = img.src;
                    } else {
                        video.remove();
                        currentVideoElement = null;
                        videoPlayed = true;
                        resolve();
                    }
                });
            });
        }

        function startImageCarousel() {
            if (images.length <= 1) return;

            // Start cycling through images
            imageIntervals[obraId] = setInterval(() => {
                currentIndex = (currentIndex + 1) % images.length;
                const img = obraImage.querySelector('.obra-img-main');

                // Update indicator dots
                if (indicators.length > 0) {
                    const offset = videos.length > 0 ? 1 : 0; // Account for video dot
                    indicators.forEach((dot, index) => {
                        dot.classList.remove('active');
                        if (index === currentIndex + offset) {
                            dot.classList.add('active');
                        }
                    });
                }

                if (img && img.style.display !== 'none' && img.src) {
                    // Preload next image before transition
                    const preloadImg = new Image();
                    preloadImg.onload = () => {
                        // Fade out current image
                        img.style.opacity = '0';

                        // Change src and fade in after transition completes
                        setTimeout(() => {
                            img.src = preloadImg.src;
                            img.style.opacity = '1';
                        }, 300);
                    };
                    const srcsets = generateSrcset(`assets/images/${images[currentIndex]}`);
                    preloadImg.srcset = srcsets.avif;
                    preloadImg.onerror = () => {
                        preloadImg.srcset = srcsets.webp;
                        preloadImg.src = srcsets.fallback;
                    };
                    preloadImg.src = srcsets.fallback;
                }
            }, 2000);
        }
    });
}

// Show error message
function showError() {
    const grid = document.getElementById('obrasGrid');
    grid.innerHTML = `
        <div class="no-obras-message">
            <h3>Error al cargar las obras</h3>
            <p>No se pudieron cargar las obras. Por favor, intenta nuevamente más tarde.</p>
        </div>
    `;
}

// Filter buttons functionality
function setupFilters() {
    // Category filters
    const categoryFilter = document.getElementById('categoryFilter');
    if (categoryFilter) {
        categoryFilter.addEventListener('change', (e) => {
            currentFilter = e.target.value;
            displayedCount = 12; // Reset to initial count when filter changes
            renderObras();
        });
    }

    // Status filters
    const statusFilter = document.getElementById('statusFilter');
    if (statusFilter) {
        statusFilter.addEventListener('change', (e) => {
            currentStatus = e.target.value;
            displayedCount = 12; // Reset to initial count when status changes
            renderObras();
        });
    }

    // View buttons
    const viewButtons = document.querySelectorAll('.view-btn');
    viewButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            viewButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            currentView = btn.dataset.view;
            renderObras();
        });
    });
}

// Open modal with obra details
function openModal(obraId) {
    const obra = obrasData.find(o => o.id === obraId);
    if (!obra) return;

    const modal = document.getElementById('obraModal');
    const modalBody = document.getElementById('modalBody');

    // Combine images and videos for carousel
    const mediaItems = [];

    if (obra.imagenes && obra.imagenes.length > 0) {
        obra.imagenes.forEach(img => {
            mediaItems.push({ type: 'image', src: img });
        });
    }

    if (obra.videos && obra.videos.length > 0) {
        obra.videos.forEach(video => {
            mediaItems.push({ type: 'video', src: video });
        });
    }

    modalBody.innerHTML = `
        <div class="modal-header">
            <span class="modal-categoria">${getCategoryName(obra.categoria)}</span>
            <h2 class="modal-title">${getObraField(obra, 'nombre')}</h2>
            <div class="modal-cliente">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="width: 16px; height: 16px;">
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                    <circle cx="12" cy="7" r="4"></circle>
                </svg>
                <span>${getObraField(obra, 'cliente')}</span>
            </div>
        </div>

        ${mediaItems.length > 0
            ? `<div class="modal-carousel-container">
                <div class="modal-carousel">
                    ${mediaItems.map((item, index) => `
                        <div class="modal-carousel-item ${index === 0 ? 'active' : ''}" data-index="${index}">
                            ${item.type === 'image'
                    ? `<picture>
                         <source srcset="${generateSrcset(`assets/images/${item.src}`).avif}" type="image/avif">
                         <source srcset="${generateSrcset(`assets/images/${item.src}`).webp}" type="image/webp">
                         <img src="${generateSrcset(`assets/images/${item.src}`).fallback}" 
                              alt="${getObraField(obra, 'nombre')}" 
                              loading="lazy" decoding="async">
                       </picture>`
                    : `<video controls preload="metadata" playsinline>
                                       <source src="assets/images/${item.src}" type="video/mp4">
                                       Tu navegador no soporta videos HTML5.
                                   </video>`
                }
                        </div>
                    `).join('')}
                </div>
                ${mediaItems.length > 1 ? `
                    <button class="modal-carousel-prev" onclick="modalCarouselNav(-1)">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <polyline points="15 18 9 12 15 6"></polyline>
                        </svg>
                    </button>
                    <button class="modal-carousel-next" onclick="modalCarouselNav(1)">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <polyline points="9 18 15 12 9 6"></polyline>
                        </svg>
                    </button>
                    <div class="modal-carousel-indicators">
                        ${mediaItems.map((_, index) => `
                            <span class="modal-carousel-dot ${index === 0 ? 'active' : ''}" 
                                  onclick="modalCarouselGoTo(${index})"></span>
                        `).join('')}
                    </div>
                ` : ''}
            </div>`
            : ''
        }

        <div class="modal-description">
            <h3 style="color: var(--white); margin-bottom: 1rem; font-size: 1.3rem;">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="width: 24px; height: 24px; display: inline-block; vertical-align: middle; margin-right: 0.5rem;">
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                    <polyline points="14 2 14 8 20 8"></polyline>
                    <line x1="16" y1="13" x2="8" y2="13"></line>
                    <line x1="16" y1="17" x2="8" y2="17"></line>
                    <polyline points="10 9 9 9 8 9"></polyline>
                </svg>
                Descripción del Proyecto
            </h3>
            <p>${getObraField(obra, 'descripcion')}</p>
        </div>

        <div class="modal-details-grid">
            <div class="modal-detail-item">
                <span class="modal-detail-label">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="width: 16px; height: 16px; display: inline-block; vertical-align: middle; margin-right: 0.5rem;">
                        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                        <polyline points="22 4 12 14.01 9 11.01"></polyline>
                    </svg>
                    Estado
                </span>
                <span class="modal-status-badge status-${obra.estado.toLowerCase().replace(' ', '-')}">
                    ${obra.estado}
                </span>
            </div>
            <div class="modal-detail-item">
                <span class="modal-detail-label">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="width: 16px; height: 16px; display: inline-block; vertical-align: middle; margin-right: 0.5rem;">
                        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                        <circle cx="12" cy="10" r="3"></circle>
                    </svg>
                    Ubicación
                </span>
                <span class="modal-detail-value">${getObraField(obra, 'ubicacion')}</span>
            </div>
            <div class="modal-detail-item">
                <span class="modal-detail-label">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="width: 16px; height: 16px; display: inline-block; vertical-align: middle; margin-right: 0.5rem;">
                        <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                        <polyline points="9 22 9 12 15 12 15 22"></polyline>
                    </svg>
                    Superficie
                </span>
                <span class="modal-detail-value">${obra.superficie}</span>
            </div>
            <div class="modal-detail-item">
                <span class="modal-detail-label">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="width: 16px; height: 16px; display: inline-block; vertical-align: middle; margin-right: 0.5rem;">
                        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                        <circle cx="12" cy="7" r="4"></circle>
                    </svg>
                    Cliente
                </span>
                <span class="modal-detail-value">${getObraField(obra, 'cliente')}</span>
            </div>
        </div>
    `;

    modal.classList.add('active');
    document.body.style.overflow = 'hidden';

    // Store current carousel index
    window.currentModalCarouselIndex = 0;
}

// Modal carousel navigation
let currentModalCarouselIndex = 0;

function modalCarouselNav(direction) {
    const items = document.querySelectorAll('.modal-carousel-item');
    const dots = document.querySelectorAll('.modal-carousel-dot');

    if (items.length === 0) return;

    // Remove active class from current item
    items[currentModalCarouselIndex].classList.remove('active');
    dots[currentModalCarouselIndex].classList.remove('active');

    // Calculate new index
    currentModalCarouselIndex += direction;

    // Wrap around
    if (currentModalCarouselIndex >= items.length) {
        currentModalCarouselIndex = 0;
    } else if (currentModalCarouselIndex < 0) {
        currentModalCarouselIndex = items.length - 1;
    }

    // Add active class to new item
    items[currentModalCarouselIndex].classList.add('active');
    dots[currentModalCarouselIndex].classList.add('active');
}

function modalCarouselGoTo(index) {
    const items = document.querySelectorAll('.modal-carousel-item');
    const dots = document.querySelectorAll('.modal-carousel-dot');

    if (items.length === 0 || index < 0 || index >= items.length) return;

    // Remove active class from current item
    items[currentModalCarouselIndex].classList.remove('active');
    dots[currentModalCarouselIndex].classList.remove('active');

    // Set new index
    currentModalCarouselIndex = index;

    // Add active class to new item
    items[currentModalCarouselIndex].classList.add('active');
    dots[currentModalCarouselIndex].classList.add('active');
}

// Close modal
function closeModal() {
    const modal = document.getElementById('obraModal');
    modal.classList.remove('active');
    document.body.style.overflow = 'auto';
}

// Setup modal close handlers
function setupModal() {
    const modal = document.getElementById('obraModal');
    const closeBtn = document.getElementById('modalClose');

    closeBtn.addEventListener('click', closeModal);

    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeModal();
        }
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.classList.contains('active')) {
            closeModal();
        }
    });
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    loadObras();
    setupFilters();
    setupModal();
});

// Listen for language changes
document.addEventListener('languageChanged', () => {
    renderObras();
});
