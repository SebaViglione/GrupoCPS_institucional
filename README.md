# Grupo CPS — Sitio Web Institucional

Sitio corporativo de Grupo CPS Uruguay (carpintería de aluminio, vidriería, construcción e instalaciones eléctricas), construido con [Astro 5](https://astro.build) y desplegado en Netlify.

## Stack

- **Astro 5** — sitio 100% estático, bilingüe (ES en `/`, EN en `/en/`)
- **astro:assets** — las imágenes de obras generan avif/webp responsive en build
- **Netlify** — build `npm run build`, publica `dist/`; formulario de contacto con Netlify Forms
- Sin frameworks de JS: los scripts de cliente son vanilla TS bundleado por Astro

## Estructura

```
src/
├── pages/            # Rutas: index, obras, estudio, 404 + en/{index,obras,estudio}
├── page-templates/   # Cuerpo de cada página, parametrizado por idioma
├── components/       # Navbar, Footer, SEO, Icon + landing/ + obras/
├── layouts/          # Base.astro (head, navbar, footer, tema)
├── i18n/             # dictionaries.ts (ES/EN tipados) + helpers
├── data/             # obras.json, clients.json, mosaic.ts
├── lib/              # obras.ts (schema + validación), jsonld.ts, site.ts
├── assets/           # Imágenes fuente (obras/, estudio/, clients/, ecommerce/)
└── styles/           # tokens.css, global.css + css por página
public/               # Passthrough: videos, favicons, robots, manifest, og
scripts/              # prep-obras, make-og, encode-videos
```

## Desarrollo

```bash
npm install
npm run dev       # http://localhost:4321
npm run build     # genera dist/
npm run check     # typecheck (astro check)
```

## Cómo agregar una obra

1. **Fotos**: crear `src/assets/obras/<slug>/` (slug en kebab-case, p. ej. `torre-nueva`) con las fotos numeradas `1.webp`, `2.webp`… Si son muy pesadas o no son webp, correr `npm run prep-obra <slug>` (las convierte a webp ≤2000px).
2. **Datos**: agregar un objeto al final de `src/data/obras.json`:
   - `id`: el siguiente entero libre
   - `categoria`: uno de `salud`, `educacion`, `vivienda`, `obras_publicas`, `corporativo`, `instalaciones_electricas`
   - `estado`: `"Completada"` o `"En Progreso"` (exacto)
   - `nombre/descripcion/cliente/ubicacion` y sus variantes `_en` (obligatorias)
   - `superficie`: p. ej. `"2500 m²"`
   - `imagenes`: `["<slug>/1.webp", "<slug>/2.webp"]`
3. **Validar**: `npm run build` — si falta un campo o una imagen no existe, el build falla con un mensaje claro.
4. **Publicar**: commit → push → revisar el Deploy Preview del PR → merge a `main` (deploy automático).

Notas:
- La **primera obra de una categoría nueva** hace aparecer sola la opción en el filtro de `/obras/`.
- La foto del tile del mosaico en la landing se elige en `src/data/mosaic.ts` (para `instalaciones_electricas` está en `null` → el tile muestra gradiente + ícono hasta que haya foto).

## Editar textos

Todo el copy vive en `src/i18n/dictionaries.ts`. ES y EN son obligatorios — TypeScript falla el build si falta una clave en EN. Los datos de contacto/redes están en `src/lib/site.ts`.

## Agregar un logo de cliente

1. Archivo webp/svg en `src/assets/clients/<categoria>/`.
2. Entrada en `src/data/clients.json` con `nombre` y `logo` (path relativo dentro de `clients/`).

## Videos del hero

Los videos servidos viven en `public/assets/videos/` (`video{N}-v2.mp4/webm` + posters). Para regenerarlos desde nuevas fuentes: colocar los originales en `public/assets/videos/optimizados/` como `Video<N>_1080p.mp4` y correr `npm run encode-videos` (requiere ffmpeg con libx264 y libsvtav1). La playlist del hero se define en el script del componente Hero.

## Deploy

Netlify buildea automáticamente:
- Push a cualquier branch con PR → **Deploy Preview** (URL temporal)
- Merge a `main` → producción (grupocps.com.uy)

Los redirects 301 de las URLs viejas (`/obras.html` → `/obras/`, `?lang=en` → `/en/`) y los headers de cache están en `netlify.toml`.
