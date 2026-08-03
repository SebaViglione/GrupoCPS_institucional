# Scripts

- **`prep-obras.mjs`** (`npm run prep-obra [slug]`) — normaliza las fotos de obras en `src/assets/obras/`: convierte a WebP q88 y limita el ancho a 2000px. Sin argumento procesa todos los slugs; con slug, solo esa carpeta. Astro genera las variantes responsive (avif/webp) en build a partir de estas fuentes.
- **`make-og.mjs`** (`npm run make-og`) — regenera `public/og/preview.jpg` (1200x630) para las previews de redes/WhatsApp.
- **`encode-videos.sh`** (`npm run encode-videos`) — re-encodea los videos del hero desde `public/assets/videos/optimizados/Video<N>_1080p.mp4` a H.264 1080p/720p + AV1 webm + poster. Requiere ffmpeg con libx264 y libsvtav1. Los outputs usan sufijo `-v2` (cache inmutable en Netlify): si reemplazás un video con el mismo nombre, subí el sufijo de versión y actualizá la playlist en `src/components/landing/Hero.astro`.
