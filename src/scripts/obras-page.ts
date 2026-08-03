// Interactividad de la página de Obras: filtros con URL, modal <dialog>,
// hover-carousel de cards y rotación del fondo del hero.
// Reemplaza a legacy/js/obras.js: el HTML ya viene renderizado en build,
// acá solo se togglean clases y atributos.

const grid = document.getElementById('obrasGrid');
const categoryFilter = document.getElementById('categoryFilter') as HTMLSelectElement | null;
const statusFilter = document.getElementById('statusFilter') as HTMLSelectElement | null;
const counter = document.querySelector<HTMLElement>('.obras-count');
const noResults = document.getElementById('noResults');
const cards = grid ? Array.from(grid.querySelectorAll<HTMLElement>('.obra-card')) : [];

/* ======================================
   FILTROS
   ====================================== */

/** 'Completada' -> 'completada', 'En Progreso' -> 'en-progreso' (mismo slug que build). */
function estadoValueToSlug(value: string): string {
  return value.toLowerCase().replace(/\s+/g, '-');
}

function applyFilters(): void {
  const categoria = categoryFilter?.value ?? 'todas';
  const estadoValue = statusFilter?.value ?? 'todas';
  const estado = estadoValue === 'todas' ? 'todas' : estadoValueToSlug(estadoValue);
  let visibles = 0;

  for (const card of cards) {
    const visible =
      (categoria === 'todas' || card.dataset.categoria === categoria) &&
      (estado === 'todas' || card.dataset.estado === estado);
    card.classList.toggle('hidden', !visible);
    if (visible) visibles++;
  }

  if (counter) {
    const template =
      visibles === 1
        ? (counter.dataset.resultsOne ?? counter.dataset.resultsTemplate ?? '{n}')
        : (counter.dataset.resultsTemplate ?? '{n}');
    counter.textContent = template.replace('{n}', String(visibles));
  }
  if (noResults) noResults.hidden = visibles > 0;
}

function syncUrl(): void {
  const params = new URLSearchParams(window.location.search);
  const filters = [
    ['categoria', categoryFilter],
    ['estado', statusFilter],
  ] as const;
  for (const [key, select] of filters) {
    if (select && select.value !== 'todas') params.set(key, select.value);
    else params.delete(key);
  }
  const query = params.toString();
  history.replaceState(null, '', query ? `${location.pathname}?${query}` : location.pathname);
}

/** Presetea el select solo si el valor de la URL matchea una opción existente. */
function presetFromUrl(select: HTMLSelectElement | null, value: string | null): void {
  if (!select || !value) return;
  if (Array.from(select.options).some((option) => option.value === value)) {
    select.value = value;
  }
}

const initialParams = new URLSearchParams(window.location.search);
presetFromUrl(categoryFilter, initialParams.get('categoria'));
presetFromUrl(statusFilter, initialParams.get('estado'));
applyFilters();

categoryFilter?.addEventListener('change', () => {
  applyFilters();
  syncUrl();
});
statusFilter?.addEventListener('change', () => {
  applyFilters();
  syncUrl();
});

/* ======================================
   MODAL
   ====================================== */

const modal = document.getElementById('obraModal') as HTMLDialogElement | null;
const modalBody = modal?.querySelector<HTMLElement>('.modal-body') ?? null;
let modalTrigger: HTMLElement | null = null;

function goToSlide(index: number): void {
  if (!modal || !modalBody) return;
  const items = Array.from(modalBody.querySelectorAll<HTMLElement>('.modal-carousel-item'));
  if (items.length === 0) return;
  const dots = Array.from(modalBody.querySelectorAll<HTMLElement>('.modal-carousel-dot'));
  const current = Number(modal.dataset.index ?? '0');
  const next = ((index % items.length) + items.length) % items.length;

  items[current]?.classList.remove('active');
  dots[current]?.classList.remove('active');
  items[next]?.classList.add('active');
  dots[next]?.classList.add('active');
  modal.dataset.index = String(next);
}

// Apertura por delegación en el grid (botones .js-open-modal).
grid?.addEventListener('click', (event) => {
  const button = (event.target as Element).closest<HTMLElement>('.js-open-modal');
  if (!button || !modal || !modalBody) return;
  const card = button.closest<HTMLElement>('.obra-card');
  const template = card ? document.getElementById(`obra-tpl-${card.dataset.obraId}`) : null;
  if (!(template instanceof HTMLTemplateElement)) return;

  modalBody.replaceChildren(template.content.cloneNode(true));
  // El h2 del template lleva clase (ids no duplicables); el clon único recibe el id.
  modalBody.querySelector('.modal-title')?.setAttribute('id', 'modalTitle');
  modal.dataset.index = '0';
  modalTrigger = button;
  modal.showModal();
  document.body.style.overflow = 'hidden';
});

// Cierre (botón y click en ::backdrop) + carousel por delegación. Esc: nativo.
modal?.addEventListener('click', (event) => {
  const target = event.target as Element;
  if (target.closest('.modal-close')) {
    modal.close();
    return;
  }
  if (target.closest('.modal-carousel-prev')) {
    goToSlide(Number(modal.dataset.index ?? '0') - 1);
    return;
  }
  if (target.closest('.modal-carousel-next')) {
    goToSlide(Number(modal.dataset.index ?? '0') + 1);
    return;
  }
  const dot = target.closest<HTMLElement>('.modal-carousel-dot');
  if (dot) {
    goToSlide(Number(dot.dataset.index ?? '0'));
    return;
  }
  // Click fuera del contenido: el target es el propio dialog (::backdrop).
  if (event.target === modal) modal.close();
});

modal?.addEventListener('close', () => {
  modalBody?.replaceChildren();
  document.body.style.overflow = '';
  modalTrigger?.focus();
  modalTrigger = null;
});

/* ======================================
   HOVER-CAROUSEL DE CARDS
   ====================================== */

const hoverIntervals = new Map<HTMLElement, number>();

if (window.matchMedia('(hover: hover)').matches) {
  for (const card of cards) {
    const box = card.querySelector<HTMLElement>('.obra-image');
    const img = box?.querySelector('img') ?? null;
    if (!box || !img) continue;

    let images: string[] = [];
    try {
      images = JSON.parse(box.dataset.images ?? '[]') as string[];
    } catch {
      continue;
    }
    if (images.length <= 1) continue;

    const sources = Array.from(box.querySelectorAll('source'));
    const original = {
      src: img.getAttribute('src') ?? '',
      srcset: img.getAttribute('srcset'),
      sourceSrcsets: sources.map((s) => s.getAttribute('srcset')),
    };
    let index = 0;

    const stop = (): void => {
      const id = hoverIntervals.get(card);
      if (id !== undefined) {
        window.clearInterval(id);
        hoverIntervals.delete(card);
      }
      index = 0;
      // Restaurar la selección responsive original.
      sources.forEach((s, i) => {
        const srcset = original.sourceSrcsets[i];
        if (srcset) s.setAttribute('srcset', srcset);
      });
      if (original.srcset) img.setAttribute('srcset', original.srcset);
      img.src = original.src;
    };

    card.addEventListener('pointerenter', () => {
      if (hoverIntervals.has(card)) return;
      // Neutralizar los <source> del <picture> para que el src del <img>
      // mande durante el ciclo (con srcset activos el cambio no se vería).
      sources.forEach((s) => s.removeAttribute('srcset'));
      img.removeAttribute('srcset');
      index = 0;
      const id = window.setInterval(() => {
        index = (index + 1) % images.length;
        img.src = images[index];
      }, 2000);
      hoverIntervals.set(card, id);
    });

    card.addEventListener('pointerleave', stop);
  }
}

/* ======================================
   HERO: ROTACIÓN DE FONDO
   ====================================== */

let heroInterval: number | undefined;

function setupHeroRotation(): void {
  const container = document.querySelector<HTMLElement>('.hero-background-images');
  if (!container) return;

  let urls: string[] = [];
  try {
    urls = JSON.parse(container.dataset.rotate ?? '[]') as string[];
  } catch {
    return;
  }
  if (urls.length === 0) return;
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  const start = (): void => {
    const base = container.querySelector<HTMLElement>('.hero-bg-image');
    if (!base) return;
    const layers: HTMLElement[] = [base];
    let pending = urls.length;

    const maybeRotate = (): void => {
      pending--;
      if (pending > 0 || layers.length <= 1) return;
      let current = 0;
      heroInterval = window.setInterval(() => {
        layers[current].classList.remove('active');
        current = (current + 1) % layers.length;
        layers[current].classList.add('active');
      }, 7000);
    };

    for (const url of urls) {
      const img = new Image();
      img.className = 'hero-bg-image';
      img.alt = '';
      img.decoding = 'async';
      img.addEventListener(
        'load',
        () => {
          container.appendChild(img);
          layers.push(img);
          maybeRotate();
        },
        { once: true }
      );
      img.addEventListener('error', maybeRotate, { once: true });
      img.src = url;
    }
  };

  // Precarga recién post window load para no competir con el LCP.
  if (document.readyState === 'complete') start();
  else window.addEventListener('load', start, { once: true });
}

setupHeroRotation();

window.addEventListener(
  'pagehide',
  () => {
    for (const id of hoverIntervals.values()) window.clearInterval(id);
    hoverIntervals.clear();
    if (heroInterval !== undefined) window.clearInterval(heroInterval);
  },
  { passive: true }
);

export {};
