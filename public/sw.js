const CACHE_NAME = 'grupocps-v2';
const ASSETS_TO_CACHE = [
  '/',
  '/index.html',
  '/obras.html',
  '/css/styles.min.css',
  '/js/main.min.js',
  '/js/obras.min.js',
  '/js/i18n.min.js',
  '/js/web-vitals-tracker.js',
  '/assets/images/logos-optimized/logo-navbar.webp',
  '/assets/images/logos-optimized/favicon.webp'
];

// Instalación: Cachear recursos estáticos
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('📦 SW: Cacheando archivos estáticos');
        return cache.addAll(ASSETS_TO_CACHE);
      })
  );
  self.skipWaiting();
});

// Activación: Limpiar cachés antiguos
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cache) => {
          if (cache !== CACHE_NAME) {
            console.log('🗑️ SW: Borrando caché antiguo', cache);
            return caches.delete(cache);
          }
        })
      );
    })
  );
  self.clients.claim();
});

// Fetch: Estrategia Cache First para assets, Network First para navegación
self.addEventListener('fetch', (event) => {
  // Ignorar peticiones que no sean http/https (ej. chrome-extension)
  if (!event.request.url.startsWith('http')) return;

  // Estrategia para HTML (Navegación): Network First
  if (event.request.mode === 'navigate') {
    event.respondWith(
      fetch(event.request)
        .catch(() => {
          return caches.match(event.request)
            .then((response) => {
              if (response) return response;
              return caches.match('/index.html'); // Fallback a home
            });
        })
    );
    return;
  }

  // Estrategia para Assets (Imágenes, CSS, JS): Cache First
  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        // Si está en caché, devolverlo
        if (response) return response;

        // Si no, hacer fetch y cachear dinámicamente (opcional, con cuidado de no llenar el caché)
        return fetch(event.request).then((networkResponse) => {
          // Solo cachear respuestas válidas y de nuestro origen
          if (!networkResponse || networkResponse.status !== 200 || networkResponse.type !== 'basic') {
            return networkResponse;
          }

          // Clonar la respuesta para cachearla
          const responseToCache = networkResponse.clone();

          caches.open(CACHE_NAME)
            .then((cache) => {
              // No cachear videos grandes o datos dinámicos si no es necesario
              if (!event.request.url.match(/\.(mp4|webm)$/)) {
                 cache.put(event.request, responseToCache);
              }
            });

          return networkResponse;
        });
      })
  );
});