# Scripts de Automatización - Grupo CPS

## optimize-images.js

Este script optimiza automáticamente todas las imágenes de las obras, convirtiendo a WebP de alta calidad y eliminando la pixelación.

### Instalación

Primero instala Sharp (librería de procesamiento de imágenes):

```bash
npm install sharp
```

### Uso

```bash
node scripts/optimize-images.js
```

### Características

- ✅ Convierte todas las imágenes a WebP de alta calidad (85-90%)
- ✅ Redimensiona automáticamente a tamaños óptimos para web
- ✅ Aplica sharpening para evitar pixelación
- ✅ Mantiene aspect ratio original
- ✅ Reduce tamaño de archivo significativamente
- ✅ Procesa JPG, PNG, WebP originales
- ✅ Crea carpeta separada para revisar antes de reemplazar

### Tamaños de optimización

- **Hero/Primera imagen**: 1920x1080px @ 90% calidad
- **Cards/Resto**: 800x600px @ 85% calidad

### Proceso

1. Ejecuta el script
2. Revisa las imágenes optimizadas en `assets/images/obras-optimized/`
3. Si te gustan, reemplaza la carpeta `obras/` con `obras-optimized/`
4. Ejecuta `generate-obras-images.js` para actualizar el JSON

### Resultado esperado

- Imágenes nítidas sin pixelación
- 40-70% de reducción en tamaño de archivo
- Carga más rápida de la página
- Mejor calidad visual

---

## generate-obras-images.js

Este script escanea automáticamente la carpeta `assets/images/obras/` y actualiza el archivo `obras.json` con todas las imágenes y videos encontrados.

### Uso

```bash
node scripts/generate-obras-images.js
```

### Características

- ✅ Detecta automáticamente todas las imágenes (jpg, jpeg, png, webp, gif, svg)
- ✅ Detecta automáticamente todos los videos (mp4, webm, mov)
- ✅ No necesitas especificar extensiones manualmente
- ✅ Ordena las imágenes y videos alfabéticamente
- ✅ Actualiza el JSON automáticamente
- ✅ Muestra un reporte de qué obras tienen imágenes/videos

### Agregar imágenes/videos a una obra

1. Coloca las imágenes o videos en la carpeta correspondiente:
   ```
   assets/images/obras/nombre-de-la-obra/
   ```

2. Ejecuta el script:
   ```bash
   node scripts/generate-obras-images.js
   ```

3. Las imágenes y videos se agregarán automáticamente al JSON

### Formatos soportados

**Imágenes:**
- JPG/JPEG
- PNG
- WebP
- GIF
- SVG

**Videos:**
- MP4 (recomendado)
- WebM
- MOV

### Convenciones de nombres

Las carpetas deben seguir este formato:
- Minúsculas
- Palabras separadas por guiones
- Sin espacios ni caracteres especiales

Ejemplos:
- ✅ `hospital-cerro`
- ✅ `garzon-school`
- ✅ `antel-cerrito`
- ❌ `Hospital Cerro`
- ❌ `hospital_cerro`

### Ventajas de este enfoque

1. **Automatización**: No necesitas editar el JSON manualmente
2. **Flexibilidad**: Acepta cualquier formato de imagen
3. **Escalabilidad**: Fácil agregar nuevas obras o imágenes
4. **Mantenibilidad**: Menos propenso a errores humanos
5. **Performance**: El navegador carga cualquier formato sin problemas
