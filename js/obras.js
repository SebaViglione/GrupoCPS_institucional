// ======================================
// OBRAS PAGE - Dynamic Loading
// ======================================

let obrasData = [];
let currentFilter = 'todas';
let currentStatus = 'todas';
let currentView = 'grid';
let imageIntervals = {};
let heroBackgroundInterval = null;

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

    // Filter high-quality images (preferring JPG and WebP over PNG)
    // Also avoid thumbnail-sized images by checking filename patterns
    const highQualityImages = allImages.filter(img => {
        const lowercaseImg = img.toLowerCase();

        // Exclude common thumbnail patterns
        if (lowercaseImg.includes('thumb') ||
            lowercaseImg.includes('small') ||
            lowercaseImg.includes('preview')) {
            return false;
        }

        // Prefer webp and jpg over png (webp and jpg are usually better compressed)
        return lowercaseImg.endsWith('.webp') ||
               lowercaseImg.endsWith('.jpg') ||
               lowercaseImg.endsWith('.jpeg');
    });

    // Use filtered images, or fall back to all images if no high-quality ones found
    const imagesToUse = highQualityImages.length > 0 ? highQualityImages : allImages;

    // Shuffle images randomly
    const shuffledImages = imagesToUse.sort(() => Math.random() - 0.5);

    // Take first 10 images for rotation (to avoid too many)
    const selectedImages = shuffledImages.slice(0, 10);

    const heroContainer = document.querySelector('.hero-background-images');
    if (!heroContainer) return;

    // Preload images to avoid pixelation during transitions
    const preloadedImages = [];
    selectedImages.forEach((imgSrc, index) => {
        const img = new Image();
        img.src = `assets/images/${imgSrc}`;
        img.alt = 'Obra Grupo CPS';
        img.className = 'hero-bg-image';

        // Only add to DOM once loaded
        img.onload = () => {
            heroContainer.appendChild(img);
            preloadedImages.push(img);

            // Activate first image with delay for smooth fade-in
            if (index === 0) {
                setTimeout(() => {
                    img.classList.add('active');
                }, 100); // Small delay to ensure CSS transition applies
                startHeroRotation();
            }
        };
    });

    function startHeroRotation() {
        let currentImageIndex = 0;
        const images = heroContainer.querySelectorAll('.hero-bg-image');

        if (images.length <= 1) return;

        heroBackgroundInterval = setInterval(() => {
            // Fade out current image
            images[currentImageIndex].classList.remove('active');

            // Move to next image
            currentImageIndex = (currentImageIndex + 1) % images.length;

            // Fade in next image
            images[currentImageIndex].classList.add('active');
        }, 3000); // Change every 3 seconds
    }
}

// Render obras to grid
function renderObras() {
    const grid = document.getElementById('obrasGrid');

    // Apply view class
    grid.className = 'obras-grid';
    if (currentView === 'list') {
        grid.classList.add('list-view');
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

    grid.innerHTML = filteredObras.map((obra, index) => {
        return `
            <div class="obra-card" style="animation-delay: ${index * 0.1}s" data-obra-id="${obra.id}" onclick="openModal(${obra.id})">
                <div class="obra-image" data-images='${JSON.stringify(obra.imagenes || [])}' data-videos='${JSON.stringify(obra.videos || [])}'>
                    ${obra.imagenes && obra.imagenes.length > 0
                        ? `<img class="obra-img-main" src="assets/images/${obra.imagenes[0]}"
                                alt="${obra.nombre}"
                                onerror="this.parentElement.innerHTML='<div class=\\'obra-placeholder\\'><svg xmlns=\\'http://www.w3.org/2000/svg\\' viewBox=\\'0 0 24 24\\' fill=\\'none\\' stroke=\\'currentColor\\' stroke-width=\\'2\\'><rect x=\\'3\\' y=\\'3\\' width=\\'18\\' height=\\'18\\' rx=\\'2\\' ry=\\'2\\'></rect><circle cx=\\'8.5\\' cy=\\'8.5\\' r=\\'1.5\\'></circle><polyline points=\\'21 15 16 10 5 21\\'></polyline></svg></div>'">`
                        : `<div class="obra-placeholder">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                    <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                                    <circle cx="8.5" cy="8.5" r="1.5"></circle>
                                    <polyline points="21 15 16 10 5 21"></polyline>
                                </svg>
                            </div>`
                    }
                    <span class="obra-status-badge status-${obra.estado.toLowerCase().replace(' ', '-')}">
                        ${obra.estado}
                    </span>
                </div>
                <div class="obra-content">
                    <div class="obra-header">
                        <span class="obra-categoria">${obra.categoria}</span>
                        <h3 class="obra-nombre">${obra.nombre}</h3>
                        <div class="obra-cliente">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                                <circle cx="12" cy="7" r="4"></circle>
                            </svg>
                            <span>${obra.cliente}</span>
                        </div>
                    </div>
                    <p class="obra-descripcion">${obra.descripcion}</p>
                    <div class="obra-details">
                        <div class="obra-detail-item">
                            <span class="detail-label">Ubicación</span>
                            <span class="detail-value">${obra.ubicacion}</span>
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

    // Setup image carousel on hover
    setupImageCarousel();
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
        let currentIndex = 0;
        let videoPlayed = false;
        let currentVideoElement = null;

        card.addEventListener('mouseenter', async () => {
            // Clear any existing interval for this card
            if (imageIntervals[obraId]) {
                clearInterval(imageIntervals[obraId]);
            }

            videoPlayed = false;
            currentIndex = 0;

            // If there's a video, play it first
            if (videos.length > 0 && !videoPlayed) {
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

            // Reset to first image with smooth fade-in
            const img = obraImage.querySelector('.obra-img-main');
            if (img && images.length > 0) {
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

                if (img && img.style.display !== 'none') {
                    // Fade out
                    img.style.opacity = '0';

                    // Change image and fade in
                    setTimeout(() => {
                        img.src = `assets/images/${images[currentIndex]}`;
                        img.style.opacity = '1';
                    }, 300);
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
    const filterButtons = document.querySelectorAll('.filter-btn');
    filterButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            filterButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            currentFilter = btn.dataset.filter;
            renderObras();
        });
    });

    // Status filters
    const statusButtons = document.querySelectorAll('.status-btn');
    statusButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            statusButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            currentStatus = btn.dataset.status;
            renderObras();
        });
    });

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

    modalBody.innerHTML = `
        <div class="modal-header">
            <span class="modal-categoria">${obra.categoria}</span>
            <h2 class="modal-title">${obra.nombre}</h2>
            <div class="modal-cliente">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="width: 16px; height: 16px;">
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                    <circle cx="12" cy="7" r="4"></circle>
                </svg>
                <span>${obra.cliente}</span>
            </div>
        </div>

        ${(obra.imagenes && obra.imagenes.length > 0) || (obra.videos && obra.videos.length > 0)
            ? `<div class="modal-images">
                ${obra.imagenes ? obra.imagenes.map(img => `
                    <div class="modal-image">
                        <img src="assets/images/${img}"
                             alt="${obra.nombre}"
                             onerror="this.parentElement.innerHTML='<div class=\\'obra-placeholder\\'><svg xmlns=\\'http://www.w3.org/2000/svg\\' viewBox=\\'0 0 24 24\\' fill=\\'none\\' stroke=\\'currentColor\\' stroke-width=\\'2\\'><rect x=\\'3\\' y=\\'3\\' width=\\'18\\' height=\\'18\\' rx=\\'2\\' ry=\\'2\\'></rect></svg></div>'">
                    </div>
                `).join('') : ''}
                ${obra.videos ? obra.videos.map(video => `
                    <div class="modal-video">
                        <video controls preload="metadata" playsinline>
                            <source src="assets/images/${video}" type="video/mp4">
                            Tu navegador no soporta videos HTML5.
                        </video>
                    </div>
                `).join('') : ''}
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
            <p>${obra.descripcion}</p>
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
                <span class="modal-detail-value">${obra.ubicacion}</span>
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
                <span class="modal-detail-value">${obra.cliente}</span>
            </div>
        </div>
    `;

    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
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
