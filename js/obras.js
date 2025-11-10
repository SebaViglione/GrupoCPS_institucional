// ======================================
// OBRAS PAGE - Dynamic Loading
// ======================================

let obrasData = [];
let currentFilter = 'todas';
let currentStatus = 'todas';
let currentView = 'grid';

// Load obras from JSON
async function loadObras() {
    try {
        const response = await fetch('assets/data/obras.json');
        if (!response.ok) {
            throw new Error('Error al cargar las obras');
        }
        const data = await response.json();
        obrasData = data.obras;
        renderObras();
    } catch (error) {
        console.error('Error:', error);
        showError();
    }
}

// Render obras to grid
function renderObras() {
    const grid = document.getElementById('obrasGrid');

    // Apply view class
    grid.className = 'obras-grid';
    if (currentView === 'list') {
        grid.classList.add('list-view');
    } else if (currentView === 'timeline') {
        grid.classList.add('timeline-view');
    }

    // Filter obras
    let filteredObras = obrasData.filter(obra => {
        const matchCategory = currentFilter === 'todas' || obra.categoria === currentFilter;
        const matchStatus = currentStatus === 'todas' || obra.estado === currentStatus;
        return matchCategory && matchStatus;
    });

    // Sort by date for timeline view
    if (currentView === 'timeline') {
        filteredObras = filteredObras.sort((a, b) => new Date(a.fechaInicio) - new Date(b.fechaInicio));
    }

    if (filteredObras.length === 0) {
        grid.innerHTML = `
            <div class="no-obras-message">
                <h3>No se encontraron obras</h3>
                <p>No hay obras que coincidan con los filtros seleccionados.</p>
            </div>
        `;
        return;
    }

    // Track years for timeline separators
    let lastYear = '';

    grid.innerHTML = filteredObras.map((obra, index) => {
        const obraYear = new Date(obra.fechaInicio).getFullYear();
        const showYearMarker = currentView === 'timeline' && obraYear !== lastYear;
        lastYear = obraYear;

        return `
            ${showYearMarker ? `<div class="timeline-year-marker">${obraYear}</div>` : ''}
            <div class="obra-card" style="animation-delay: ${index * 0.1}s" data-obra-id="${obra.id}" onclick="openModal(${obra.id})">
                <div class="obra-image">
                    ${obra.imagenes && obra.imagenes.length > 0
                        ? `<img src="assets/images/obras/${obra.imagenes[0]}"
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
                        <span class="obra-fecha-badge">${formatDate(obra.fechaInicio)}</span>
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
                        <div class="obra-detail-item">
                            <span class="detail-label">Inicio</span>
                            <span class="detail-value">${formatDate(obra.fechaInicio)}</span>
                        </div>
                        <div class="obra-detail-item">
                            <span class="detail-label">Fin</span>
                            <span class="detail-value">${obra.fechaFin ? formatDate(obra.fechaFin) : 'En curso'}</span>
                        </div>
                    </div>
                    <div class="obra-cta">
                        <button class="btn-ver-mas" onclick="openModal(${obra.id}); event.stopPropagation();">Ver Detalles</button>
                    </div>
                </div>
            </div>
        `;
    }).join('');
}

// Format date
function formatDate(dateString) {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    const options = { year: 'numeric', month: 'long' };
    return date.toLocaleDateString('es-ES', options);
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

    // Calculate duration
    let duration = '';
    if (obra.fechaInicio) {
        const start = new Date(obra.fechaInicio);
        const end = obra.fechaFin ? new Date(obra.fechaFin) : new Date();
        const months = Math.round((end - start) / (1000 * 60 * 60 * 24 * 30));
        duration = months > 0 ? `${months} ${months === 1 ? 'mes' : 'meses'}` : 'En inicio';
    }

    modalBody.innerHTML = `
        <div class="modal-header">
            <span class="modal-categoria">${obra.categoria}</span>
            <h2 class="modal-title">${obra.nombre}</h2>
            <div class="modal-cliente">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                    <circle cx="12" cy="7" r="4"></circle>
                </svg>
                <span>${obra.cliente}</span>
            </div>
        </div>

        ${obra.imagenes && obra.imagenes.length > 0
            ? `<div class="modal-images">
                ${obra.imagenes.map(img => `
                    <div class="modal-image">
                        <img src="assets/images/obras/${img}"
                             alt="${obra.nombre}"
                             onerror="this.parentElement.innerHTML='<div class=\\'obra-placeholder\\'><svg xmlns=\\'http://www.w3.org/2000/svg\\' viewBox=\\'0 0 24 24\\' fill=\\'none\\' stroke=\\'currentColor\\' stroke-width=\\'2\\'><rect x=\\'3\\' y=\\'3\\' width=\\'18\\' height=\\'18\\' rx=\\'2\\' ry=\\'2\\'></rect></svg></div>'">
                    </div>
                `).join('')}
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
                        <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                        <line x1="16" y1="2" x2="16" y2="6"></line>
                        <line x1="8" y1="2" x2="8" y2="6"></line>
                        <line x1="3" y1="10" x2="21" y2="10"></line>
                    </svg>
                    Fecha de Inicio
                </span>
                <span class="modal-detail-value">${formatDate(obra.fechaInicio)}</span>
            </div>
            <div class="modal-detail-item">
                <span class="modal-detail-label">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="width: 16px; height: 16px; display: inline-block; vertical-align: middle; margin-right: 0.5rem;">
                        <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                        <line x1="16" y1="2" x2="16" y2="6"></line>
                        <line x1="8" y1="2" x2="8" y2="6"></line>
                        <line x1="3" y1="10" x2="21" y2="10"></line>
                    </svg>
                    Fecha de Finalización
                </span>
                <span class="modal-detail-value">${obra.fechaFin ? formatDate(obra.fechaFin) : 'En curso'}</span>
            </div>
            ${duration ? `
            <div class="modal-detail-item">
                <span class="modal-detail-label">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="width: 16px; height: 16px; display: inline-block; vertical-align: middle; margin-right: 0.5rem;">
                        <circle cx="12" cy="12" r="10"></circle>
                        <polyline points="12 6 12 12 16 14"></polyline>
                    </svg>
                    Duración
                </span>
                <span class="modal-detail-value">${duration}</span>
            </div>` : ''}
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
