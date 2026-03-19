# Sección: Estudio Arquitectónico — Grupo CPS
**Archivo:** `estudio.html` (o la ruta que uses en tu proyecto, ej: `/estudio`, `/arquitectura`)  
**Propósito:** Presentar el servicio integral de arquitectura de Grupo CPS, desde el anteproyecto hasta la llave en mano.

---

## Estructura general de la página

```
navbar
└── hero
└── intro (bajada del hero)
└── sección de servicios (cards)
└── sección CTA / ejemplo de proyecto (link a edificiogalicia.com.uy)
└── footer
```

---

## 1. Navbar

Reutilizar la navbar existente de grupocps.com.uy.  
Agregar ítem activo: **"Estudio"** o **"Arquitectura"**.

```html
<!-- Mismo nav que el resto del sitio -->
<!-- Marcar como activo el ítem correspondiente a esta sección -->
```

---

## 2. Hero

**Objetivo:** Captar la atención con una frase fuerte que posicione al estudio como integral y profesional.

| Campo | Contenido |
|---|---|
| **Tipo de fondo** | Video o imagen de alta calidad de un proyecto arquitectónico (render, planos, obra terminada). Overlay oscuro (~60% opacidad) igual al hero de grupocps.com.uy |
| **Etiqueta superior** | `ESTUDIO ARQUITECTÓNICO` (texto pequeño, uppercase, letra espaciada — igual al tratamiento de "Grupo CPS" en el hero principal) |
| **Título principal** | `De la idea a la llave en mano.` |
| **Subtítulo** | `Acompañamos cada etapa de tu proyecto: desde el primer boceto hasta la habilitación final.` |
| **CTA botón primario** | `Conocer nuestros servicios` → ancla a `#servicios` |
| **CTA botón secundario** | `Ver un proyecto real` → link a `https://edificiogalicia.com.uy` (abrir en nueva pestaña) |

**Notas de implementación:**
- Misma altura full-viewport (`100vh`) que el hero de la home.
- Animación de entrada: fade-in del texto igual al sitio actual.
- Si no hay video disponible aún, usar imagen de placeholder de alta calidad (render arquitectónico propio o libre de derechos).

---

## 3. Intro / Descripción del servicio

**Objetivo:** En 2-3 líneas, explicar qué diferencia al estudio de una simple constructora.

**Ubicación:** Debajo del hero, sección blanca o gris muy claro, centrada.

**Texto propuesto:**
> Nuestro estudio arquitectónico ofrece un servicio completo y coordinado. Nos ocupamos de cada etapa del proceso: desde el diseño y anteproyecto, la gestión de permisos ante la Intendencia, el proyecto ejecutivo, hasta la dirección y entrega final de obra.

**Formato:** Párrafo centrado, tipografía grande (22-26px), peso ligero. Ancho máximo ~700px. Sin columnas. Igual al tratamiento de párrafos destacados en el sitio actual.

---

## 4. Sección de Servicios (`id="servicios"`)

**Objetivo:** Mostrar los 6 servicios en cards visuales con ícono SVG, título y descripción breve.

**Layout:** Grilla de 3 columnas en desktop, 2 en tablet, 1 en mobile.  
**Estilo de cards:** Fondo oscuro (igual que el sitio — `#0a0a0a` o similar), borde sutil, esquinas ligeramente redondeadas, hover con borde iluminado o leve elevación.

---

### Card 1 — Asesoramiento inicial / Consultoría

**Ícono SVG sugerido:** Dos personas con un boceto o bombilla + diálogo

```svg
<!-- Ícono: conversación / consultoría -->
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="2">
  <circle cx="22" cy="20" r="8"/>
  <path d="M6 48c0-8.837 7.163-16 16-16h1"/>
  <rect x="30" y="28" width="28" height="20" rx="3"/>
  <path d="M38 48l-4 6 10-6"/>
  <line x1="36" y1="35" x2="52" y2="35"/>
  <line x1="36" y1="41" x2="48" y2="41"/>
</svg>
```

**Título:** `Asesoramiento inicial`  
**Descripción:** `Te acompañamos desde la primera idea. Analizamos tu terreno, necesidades y presupuesto para definir la viabilidad del proyecto antes de comprometer recursos.`

---

### Card 2 — Anteproyecto

**Ícono SVG sugerido:** Lápiz sobre papel con esquema de planta

```svg
<!-- Ícono: planos / diseño -->
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="2">
  <rect x="8" y="8" width="48" height="48" rx="2"/>
  <line x1="8" y1="24" x2="56" y2="24"/>
  <line x1="24" y1="24" x2="24" y2="56"/>
  <path d="M32 36 L44 36 L44 48 L32 48 Z"/>
  <path d="M28 16 L36 16"/>
  <circle cx="16" cy="16" r="3"/>
</svg>
```

**Título:** `Anteproyecto`  
**Descripción:** `Desarrollamos la propuesta arquitectónica inicial: volumetría, distribución espacial, orientación y materialidad. Una visión clara de tu futuro proyecto antes de pasar al detalle.`

---

### Card 3 — Trámites y permisos en Intendencia

**Ícono SVG sugerido:** Sello / documento oficial

```svg
<!-- Ícono: trámite / permiso oficial -->
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="2">
  <rect x="12" y="8" width="40" height="48" rx="2"/>
  <line x1="20" y1="22" x2="44" y2="22"/>
  <line x1="20" y1="30" x2="44" y2="30"/>
  <line x1="20" y1="38" x2="34" y2="38"/>
  <circle cx="44" cy="46" r="10" fill="none"/>
  <path d="M38 46 L42 50 L50 42" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
```

**Título:** `Trámites y permisos`  
**Descripción:** `Gestionamos todos los expedientes ante la Intendencia de Montevideo y otros organismos. Permisos de construcción, certificados y habilitaciones, sin que tengas que preocuparte por la burocracia.`

---

### Card 4 — Proyecto ejecutivo

**Ícono SVG sugerido:** Plano técnico con cotas / regla

```svg
<!-- Ícono: plano técnico -->
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="2">
  <path d="M8 56 L8 16 L20 8 L56 8 L56 48 L44 56 Z"/>
  <path d="M8 16 L44 16 L44 56"/>
  <path d="M20 8 L20 16"/>
  <line x1="16" y1="28" x2="40" y2="28"/>
  <line x1="16" y1="36" x2="40" y2="36"/>
  <line x1="16" y1="44" x2="32" y2="44"/>
  <!-- cotas -->
  <line x1="16" y1="24" x2="16" y2="48"/>
  <line x1="14" y1="24" x2="18" y2="24"/>
  <line x1="14" y1="48" x2="18" y2="48"/>
</svg>
```

**Título:** `Proyecto ejecutivo`  
**Descripción:** `Elaboramos la documentación técnica completa: planos de arquitectura, estructura, instalaciones sanitarias y eléctricas. Todo lo necesario para que la obra se ejecute con precisión.`

---

### Card 5 — Dirección de obra

**Ícono SVG sugerido:** Casco + ojo / supervisión

```svg
<!-- Ícono: dirección de obra -->
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="2">
  <!-- casco -->
  <path d="M16 34 C16 22 48 22 48 34"/>
  <rect x="12" y="34" width="40" height="6" rx="1"/>
  <line x1="32" y1="22" x2="32" y2="14"/>
  <!-- ojo abajo -->
  <ellipse cx="32" cy="50" rx="12" ry="6"/>
  <circle cx="32" cy="50" r="3" fill="currentColor" stroke="none"/>
</svg>
```

**Título:** `Dirección de obra`  
**Descripción:** `Un arquitecto responsable supervisa la ejecución en campo, controla calidades, plazos y verifica que lo construido responda fielmente al proyecto. Tu tranquilidad durante toda la obra.`

---

### Card 6 — Llave en mano

**Ícono SVG sugerido:** Llave

```svg
<!-- Ícono: llave -->
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="2">
  <circle cx="22" cy="26" r="12"/>
  <circle cx="22" cy="26" r="5"/>
  <path d="M30 34 L52 56" stroke-linecap="round"/>
  <line x1="42" y1="46" x2="46" y2="50"/>
  <line x1="48" y1="50" x2="44" y2="54"/>
</svg>
```

**Título:** `Llave en mano`  
**Descripción:** `Coordinamos el proceso completo hasta la entrega final. Tu proyecto termina cuando vos recibís las llaves de una obra terminada, habilitada y lista para habitar o usar.`

---

### Notas de diseño para las cards

- **Color de íconos:** Usar el color de acento del sitio. En grupocps.com.uy se infiere un acento claro (blanco o dorado/arena) sobre fondo oscuro. Si tienen definido un color de marca, aplicarlo aquí.
- **Tamaño del ícono:** 48×48px dentro de la card.
- **Orden sugerido:** Respetar el flujo lógico del proceso (asesoramiento → anteproyecto → permisos → proyecto ejecutivo → dirección → llave en mano).
- **Hover:** Borde iluminado con el color de acento, o leve elevación con `box-shadow`.

---

## 5. Sección CTA — Proyecto real de referencia

**Objetivo:** Dar credibilidad mostrando un proyecto concreto que recorrió todo el proceso.

**Layout:** Fondo oscuro, imagen a la izquierda (render o foto del Edificio Galicia), texto a la derecha. En mobile: texto arriba, imagen abajo (o solo texto con botón).

| Campo | Contenido |
|---|---|
| **Etiqueta** | `CASO REAL` |
| **Título** | `Edificio Galicia — De la idea al hormigón.` |
| **Descripción** | `Un ejemplo concreto de nuestro proceso integral: anteproyecto, gestión de permisos ante la Intendencia de Montevideo, proyecto ejecutivo y dirección de obra. 46 unidades habitacionales en Cordón.` |
| **Botón** | `Ver el proyecto →` → `https://edificiogalicia.com.uy` (abrir en nueva pestaña, `target="_blank" rel="noopener"`) |

---

## 6. Footer

Reutilizar el footer existente del sitio (grupocps.com.uy).  
Verificar que el ítem **"Estudio"** o **"Arquitectura"** esté correctamente linkeado en el footer también.

---

## Paleta y tipografía (coherencia con el sitio)

Basado en grupocps.com.uy:

| Variable | Valor |
|---|---|
| **Fondo principal** | `#0a0a0a` o `#111111` (negro profundo) |
| **Fondo secundario** | `#1a1a1a` o `#1c1c1c` (para cards) |
| **Texto principal** | `#ffffff` |
| **Texto secundario** | `#aaaaaa` o `#999999` |
| **Acento** | A confirmar con el equipo — usar el mismo color de acento que el botón "Contactar" del sitio principal |
| **Borde** | `rgba(255,255,255,0.08)` |
| **Tipografía** | Verificar en el CSS del sitio actual. Si no está definida, sugerencia: `'Barlow'` o `'DM Sans'` para cuerpo, `'Barlow Condensed'` o `'Oswald'` para títulos (Google Fonts, gratuitas) |

---

## Notas de implementación

1. **Consistencia visual:** Esta página debe sentirse como una sección más del sitio de Grupo CPS, no como un micrositio separado. Reusar variables CSS, componentes de nav y footer del proyecto existente.

2. **Link externo al Edificio Galicia:** El link `https://edificiogalicia.com.uy` debe abrir siempre en nueva pestaña (`target="_blank"`).

3. **Responsividad:** Las 6 cards deben colapsar correctamente en mobile (1 columna). Verificar que los íconos SVG no se corten.

4. **Accesibilidad:** Los íconos SVG deben tener `aria-hidden="true"` si son decorativos (el texto de la card ya los describe). Usar `alt=""` si se implementan como `<img>`.

5. **SEO básico:**
   - `<title>Estudio Arquitectónico | Grupo CPS Uruguay</title>`
   - `<meta name="description" content="Servicio integral de arquitectura: anteproyecto, permisos, proyecto ejecutivo y dirección de obra. Grupo CPS, Montevideo, Uruguay.">`
   - La sección de servicios puede usar `<article>` o `<section>` con encabezados `<h3>` para cada card.

6. **Performance:** Los íconos SVG inline son preferibles a archivos externos para evitar requests adicionales. Incluirlos directamente en el HTML.
