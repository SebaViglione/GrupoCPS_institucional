// Web Vitals Tracker para Grupo CPS
// Monitorea: CLS, FID, FCP, LCP, TTFB

// Función para enviar métricas a Google Analytics
function sendToGoogleAnalytics({ name, delta, id, value }) {
  // Verificar si gtag está disponible (Google Analytics)
  if (typeof gtag !== 'function') {
    console.log(`[Web Vitals] ${name}: ${Math.round(value)}ms (delta: ${Math.round(delta)}ms)`);
    return;
  }

  gtag('event', name, {
    event_category: 'Web Vitals',
    event_label: id,
    value: Math.round(delta), // Delta es el cambio desde la última medición
    non_interaction: true
  });
}

// Función para enviar métricas a console (para desarrollo)
function sendToConsole({ name, value, rating }) {
  const ratingColors = {
    good: '\x1b[32m', // Verde
    needsImprovement: '\x1b[33m', // Amarillo
    poor: '\x1b[31m' // Rojo
  };
  const reset = '\x1b[0m';

  console.log(
    `%c[Web Vitals] ${name}: ${Math.round(value)}ms`,
    `${ratingColors[rating]}background: #2199d5; color: white; padding: 4px 8px; border-radius: 4px;${reset}`,
    `Rating: ${rating}`
  );
}

// Cargar librería web-vitals
(async function loadWebVitals() {
  try {
    const webVitals = await import('https://unpkg.com/web-vitals@3.1.1/dist/web-vitals.iife.js');

    // Largest Contentful Paint (LCP)
    // Métrica de rendimiento que mide cuando el contenido principal más grande se ha renderizado
    webVitals.onLCP(sendToGoogleAnalytics);
    webVitals.onLCP(sendToConsole);

    // First Input Delay (FID)
    // Métrica de interactividad que mide el tiempo desde que el usuario hace clic hasta que el browser puede responder
    webVitals.onFID(sendToGoogleAnalytics);
    webVitals.onFID(sendToConsole);

    // Cumulative Layout Shift (CLS)
    // Métrica de estabilidad visual que mide cuánto se mueve el contenido inesperadamente
    webVitals.onCLS(sendToGoogleAnalytics);
    webVitals.onCLS(sendToConsole);

    // First Contentful Paint (FCP)
    // Métrica que mide cuando el primer contenido de texto o imagen se renderiza
    webVitals.onFCP(sendToGoogleAnalytics);
    webVitals.onFCP(sendToConsole);

    // Time to First Byte (TTFB)
    // Métrica que mide el tiempo hasta que el navegador recibe el primer byte del servidor
    webVitals.onTTFB(sendToGoogleAnalytics);
    webVitals.onTTFB(sendToConsole);

    console.log('%c✅ Web Vitals monitoring activado', 'color: #21d5b5; font-weight: bold;');

  } catch (error) {
    console.error('Error cargando web-vitals:', error);
  }
})();

// Exportar función manual para testing
if (typeof window !== 'undefined') {
  window.testWebVitals = async () => {
    console.log('🧪 Iniciando test manual de Web Vitals...');

    // Simular un clic para medir FID
    const testButton = document.createElement('button');
    testButton.textContent = 'Test FID';
    testButton.style.cssText = 'position:fixed;top:10px;right:10px;z-index:9999;background:#ef8a1e;color:white;border:none;padding:10px 20px;border-radius:5px;cursor:pointer;font-weight:bold;';
    testButton.onclick = () => {
      alert('Test de FID ejecutado. Revisa la consola para los resultados.');
      testButton.remove();
    };
    document.body.appendChild(testButton);

    console.log('Haz clic en el botón naranja para probar el FID');
    console.log('Las otras métricas (LCP, CLS, FCP, TTFB) se miden automáticamente al cargar la página.');
  };
}