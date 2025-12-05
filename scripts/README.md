# 📂 Scripts de Procesamiento de Obras

Este directorio contiene todas las herramientas automatizadas utilizadas para procesar imágenes de obras y actualizar el archivo `obras.json` del sitio institucional de **Grupo CPS**.

Los scripts realizan cuatro tareas principales:

---

## 🔼 1. `upscale-images.js`
Aumenta la resolución de las imágenes originales ubicadas en `assets/images/obras/`.

### Funciones:
- Analiza cada imagen y calcula si necesita upscale.
- Aumenta la resolución usando interpolación Lanczos3.
- Reduce ruido, mejora contraste y nitidez.
- Exporta todo en **PNG de alta calidad**.
- Guarda las imágenes en `assets/images/obras-upscaled/`.

### Uso:
```bash
node scripts/upscale-images.js
```

---

## 🗜️ 2. `optimize-images.js`
Optimiza las imágenes upscaled convirtiéndolas a **WebP de alta calidad**, sin redimensionar.

### Funciones:
- Lee imágenes desde `obras-upscaled/` (o `obras/` si no existe).
- Convierte a WebP con calidad 95%.
- Reduce drásticamente el tamaño manteniendo nitidez.
- Exporta resultado a `assets/images/obras-optimized/`.

### Uso:
```bash
node scripts/optimize-images.js
```

---

## 🗂️ 3. `generate-obras-images.js`
Actualiza automáticamente el archivo `assets/data/obras.json` con todas las imágenes y videos reales que existen en el proyecto.

### Funciones:
- Escanea carpetas de obras optimizadas.
- Detecta imágenes (WebP, JPG, PNG).
- Detecta videos originales (MP4, WEBM, MOV).
- Sobrescribe las rutas antiguas del JSON.
- Mantiene orden alfabético y estructura limpia.

### Uso:
```bash
node scripts/generate-obras-images.js
```

---

## 🔄 4. `process-all-obras.js`
Ejecuta **todo el pipeline completo** en orden:

1. Upscale  
2. Optimización  
3. Actualización del JSON  

### Funciones:
- Automatización total del flujo.
- Logs en tiempo real.
- Detiene el proceso si detecta errores.

### Uso (recomendado):
```bash
node scripts/process-all-obras.js
```

---

# 📁 Flujo General de Trabajo

1. Colocar imágenes originales en  
   `assets/images/obras/<nombre-obra>/`.

2. Ejecutar el pipeline:
   ```bash
   node scripts/process-all-obras.js
   ```

3. Revisar resultados:
   - Imágenes mejoradas → `obras-upscaled/`
   - Imágenes optimizadas → `obras-optimized/`
   - JSON final → `assets/data/obras.json`

---

# ✔ Objetivo de estos scripts
Estos scripts permiten:

- Mantener calidad visual alta en la web  
- Reducir el peso de imágenes para acelerar carga  
- Evitar editar manualmente el JSON  
- Automatizar todo el manejo de obras nuevas o modificadas  
- Reducir errores humanos al mínimo  

Son herramientas internas esenciales para mantener actualizado y optimizado el módulo **Obras** del sitio institucional de Grupo CPS.
