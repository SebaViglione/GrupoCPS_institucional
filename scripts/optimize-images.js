const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

// Configuración
const OBRAS_DIR = path.join(__dirname, '../assets/images/obras');
const OUTPUT_DIR = path.join(__dirname, '../assets/images/obras-optimized');
const IMAGE_EXTENSIONS = ['.jpg', '.jpeg', '.png', '.webp'];

// Configuración de optimización
const OPTIMIZATION_CONFIG = {
    // Para imágenes del hero (grandes)
    hero: {
        width: 1920,
        height: 1080,
        quality: 90,
        format: 'webp'
    },
    // Para imágenes de cards (medianas)
    card: {
        width: 800,
        height: 600,
        quality: 85,
        format: 'webp'
    }
};

// Crear directorio de salida si no existe
if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

// Función para optimizar una imagen
async function optimizeImage(inputPath, outputPath, config) {
    try {
        const image = sharp(inputPath);
        const metadata = await image.metadata();

        // Determinar si es horizontal o vertical
        const isLandscape = metadata.width > metadata.height;

        let processedImage = image;

        // Redimensionar manteniendo aspect ratio
        if (isLandscape) {
            processedImage = processedImage.resize(config.width, null, {
                fit: 'inside',
                withoutEnlargement: true
            });
        } else {
            processedImage = processedImage.resize(null, config.height, {
                fit: 'inside',
                withoutEnlargement: true
            });
        }

        // Aplicar sharpening para evitar pixelación
        processedImage = processedImage.sharpen();

        // Convertir a WebP con alta calidad
        await processedImage
            .webp({ quality: config.quality, effort: 6 })
            .toFile(outputPath);

        return true;
    } catch (error) {
        console.error(`Error optimizando ${inputPath}:`, error.message);
        return false;
    }
}

// Función para determinar el tipo de optimización
function getOptimizationConfig(filename) {
    // Si el nombre tiene 'hero' o es el primer archivo, usa config hero
    if (filename.includes('hero') || filename === '1.webp' || filename === '1.jpg') {
        return OPTIMIZATION_CONFIG.hero;
    }
    return OPTIMIZATION_CONFIG.card;
}

// Función principal
async function optimizeAllImages() {
    console.log('🚀 Iniciando optimización de imágenes...\n');

    const folders = fs.readdirSync(OBRAS_DIR, { withFileTypes: true })
        .filter(dirent => dirent.isDirectory())
        .map(dirent => dirent.name);

    let totalProcessed = 0;
    let totalFailed = 0;

    for (const folder of folders) {
        const folderPath = path.join(OBRAS_DIR, folder);
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

            const config = getOptimizationConfig(file);
            const success = await optimizeImage(inputPath, outputPath, config);

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
