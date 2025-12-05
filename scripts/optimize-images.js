const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

// Configuración
const OBRAS_DIR = path.join(__dirname, '../assets/images/obras-upscaled'); // Leer de obras-upscaled
const FALLBACK_DIR = path.join(__dirname, '../assets/images/obras'); // Fallback si no existe upscaled
const OUTPUT_DIR = path.join(__dirname, '../assets/images/obras-optimized');
const IMAGE_EXTENSIONS = ['.jpg', '.jpeg', '.png', '.webp'];

// Ya no redimensionamos - solo convertimos a WebP manteniendo resolución original

// Crear directorio de salida si no existe
if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

// Función para optimizar una imagen (SOLO FORMATO, SIN REDIMENSIONAR)
async function optimizeImage(inputPath, outputPath) {
    try {
        const image = sharp(inputPath);
        const metadata = await image.metadata();

        // NO REDIMENSIONAR - mantener resolución original del upscale
        // Solo convertir a WebP con alta calidad y optimización
        await image
            .webp({
                quality: 95,  // Calidad muy alta para preservar detalles del upscale
                effort: 6,    // Máximo esfuerzo de compresión
                lossless: false,
                nearLossless: false,
                smartSubsample: true  // Mejor compresión sin pérdida visible
            })
            .toFile(outputPath);

        console.log(`  ✓ ${metadata.width}x${metadata.height} → WebP (${Math.round(metadata.width * metadata.height / 1000000)}MP)`);
        return true;
    } catch (error) {
        console.error(`Error optimizando ${inputPath}:`, error.message);
        return false;
    }
}

// Ya no se necesita configuración por tipo (hero/card)
// Todas las imágenes mantienen su resolución original

// Función principal
async function optimizeAllImages() {
    console.log('🚀 Iniciando optimización de imágenes...\n');

    // Usar directorio upscaled si existe, sino usar obras original
    const sourceDir = fs.existsSync(OBRAS_DIR) ? OBRAS_DIR : FALLBACK_DIR;
    console.log(`📂 Leyendo imágenes desde: ${sourceDir}\n`);

    const folders = fs.readdirSync(sourceDir, { withFileTypes: true })
        .filter(dirent => dirent.isDirectory())
        .map(dirent => dirent.name);

    let totalProcessed = 0;
    let totalFailed = 0;

    for (const folder of folders) {
        const folderPath = path.join(sourceDir, folder);
        const outputFolderPath = path.join(OUTPUT_DIR, folder);

        // Crear carpeta de salida
        if (!fs.existsSync(outputFolderPath)) {
            fs.mkdirSync(outputFolderPath, { recursive: true });
        }

        const files = fs.readdirSync(folderPath);
        const imageFiles = files.filter(file =>
            IMAGE_EXTENSIONS.includes(path.extname(file).toLowerCase())
        );

        if (imageFiles.length === 0) continue;

        console.log(`📁 Procesando: ${folder} (${imageFiles.length} imágenes)`);

        for (const file of imageFiles) {
            const inputPath = path.join(folderPath, file);
            const outputFilename = path.basename(file, path.extname(file)) + '.webp';
            const outputPath = path.join(outputFolderPath, outputFilename);

            const success = await optimizeImage(inputPath, outputPath);

            if (success) {
                totalProcessed++;
                const inputSize = fs.statSync(inputPath).size;
                const outputSize = fs.statSync(outputPath).size;
                const reduction = ((1 - outputSize / inputSize) * 100).toFixed(1);

                console.log(`  ✅ ${file} → ${outputFilename} (${reduction}% reducción)`);
            } else {
                totalFailed++;
                console.log(`  ❌ ${file} - FALLÓ`);
            }
        }

        console.log('');
    }

    console.log('═══════════════════════════════════════════');
    console.log(`✨ Optimización completada!`);
    console.log(`📊 Total procesadas: ${totalProcessed}`);
    console.log(`❌ Fallidas: ${totalFailed}`);
    console.log(`📂 Ubicación: ${OUTPUT_DIR}`);
    console.log('═══════════════════════════════════════════');
    console.log('\n📝 SIGUIENTE PASO:');
    console.log('1. Revisa las imágenes en "assets/images/obras-optimized/"');
    console.log('2. Si te gustan, reemplaza la carpeta "obras/" con "obras-optimized/"');
    console.log('3. O mantén ambas carpetas y actualiza las rutas en el JSON\n');
}

// Ejecutar
optimizeAllImages().catch(console.error);
