// Script para hacer upscale x2 de imágenes de obras
// Usa sharp para aumentar la resolución de las imágenes antes de optimizarlas
// Uso: node scripts/upscale-images.js

const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

// Directorios
const obrasDir = path.join(__dirname, '..', 'assets', 'images', 'obras');
const upscaledDir = path.join(__dirname, '..', 'assets', 'images', 'obras-upscaled');

// Extensiones de imagen soportadas
const imageExtensions = ['.jpg', '.jpeg', '.png', '.webp'];

// Configuración de upscale inteligente
const UPSCALE_CONFIG = {
    // Resoluciones objetivo para diferentes tipos de imagen
    targetResolution: {
        minWidth: 2400,    // Ancho mínimo deseado
        minHeight: 1600,   // Alto mínimo deseado
        maxWidth: 4000,    // Ancho máximo (para evitar imágenes demasiado grandes)
        maxHeight: 3000    // Alto máximo
    },
    kernel: 'lanczos3', // Algoritmo de interpolación de alta calidad
    format: 'png', // Formato de salida para mantener máxima calidad
    compressionLevel: 6, // Nivel de compresión PNG (0-9, 6 es buen balance)
    // Parámetros de mejora de calidad
    sharpen: {
        sigma: 1.5, // Suavidad del sharpening
        m1: 1.0,    // Umbral de detección de bordes
        m2: 0.5,    // Cantidad de sharpening
        x1: 3.0,    // Límite superior de sharpening
        y2: 10,     // Límite inferior de sharpening
        y3: 20      // Máximo sharpening
    },
    denoise: 5 // Reducción de ruido (1-1000, más bajo = menos agresivo)
};

/**
 * Calcula el factor de escala óptimo para una imagen
 */
function calculateOptimalScale(width, height) {
    const { minWidth, minHeight, maxWidth, maxHeight } = UPSCALE_CONFIG.targetResolution;

    // Si la imagen ya es muy grande, no hacer upscale
    if (width >= maxWidth || height >= maxHeight) {
        console.log(`  📏 Imagen muy grande (${width}x${height}), sin upscale necesario`);
        return 1;
    }

    // Si la imagen ya cumple con el mínimo, no hacer upscale
    if (width >= minWidth && height >= minHeight) {
        console.log(`  ✓ Imagen con buena resolución (${width}x${height}), sin upscale necesario`);
        return 1;
    }

    // Calcular factor necesario para alcanzar resolución mínima
    const scaleForWidth = minWidth / width;
    const scaleForHeight = minHeight / height;

    // Usar el factor menor para no exceder los límites
    let scaleFactor = Math.max(scaleForWidth, scaleForHeight);

    // Asegurar que no exceda los máximos
    const finalWidth = width * scaleFactor;
    const finalHeight = height * scaleFactor;

    if (finalWidth > maxWidth || finalHeight > maxHeight) {
        const maxScaleForWidth = maxWidth / width;
        const maxScaleForHeight = maxHeight / height;
        scaleFactor = Math.min(maxScaleForWidth, maxScaleForHeight);
    }

    // Redondear a valores prácticos (1, 1.5, 2, 2.5, 3)
    if (scaleFactor <= 1.25) return 1;
    if (scaleFactor <= 1.75) return 1.5;
    if (scaleFactor <= 2.25) return 2;
    if (scaleFactor <= 2.75) return 2.5;
    return 3;
}

console.log(`
\x1b[31m
         _____    __   __
        |_   _|   \\ \\ / /
          | |_   _ \\ V /   ______  __  __
          | | | | |/   \\  |______| \\ \\/ /
          | | |_| / /^\\ \\           >  <
          \\_/\\__,_\\/   \\/          /_/\\_\\

\x1b[0m
        \x1b[31mFecha actual: ${new Date().toLocaleString('es-UY', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit'
        })}\x1b[0m
        \x1b[31mDirectorio actual: ${process.cwd()}\x1b[0m


`);

console.log('🚀 Iniciando upscale de imágenes...\n');

// Crear directorio de salida si no existe
if (!fs.existsSync(upscaledDir)) {
    fs.mkdirSync(upscaledDir, { recursive: true });
    console.log(`📁 Directorio creado: ${upscaledDir}\n`);
}

/**
 * Realiza upscale inteligente de una imagen según su tamaño actual
 */
async function upscaleImage(inputPath, outputPath) {
    try {
        // Obtener metadatos de la imagen original
        const metadata = await sharp(inputPath).metadata();

        // Calcular factor de escala óptimo
        const scaleFactor = calculateOptimalScale(metadata.width, metadata.height);

        const newWidth = Math.round(metadata.width * scaleFactor);
        const newHeight = Math.round(metadata.height * scaleFactor);

        // Si no necesita upscale (factor = 1), solo optimizar
        if (scaleFactor === 1) {
            await sharp(inputPath)
                // Solo aplicar mejoras sin redimensionar
                .median(UPSCALE_CONFIG.denoise)
                .sharpen(UPSCALE_CONFIG.sharpen)
                .png({
                    compressionLevel: UPSCALE_CONFIG.compressionLevel,
                    quality: 100,
                    palette: false
                })
                .toFile(outputPath);
        } else {
            // Pipeline de procesamiento con upscale
            console.log(`  🔼 Upscale x${scaleFactor}: ${metadata.width}x${metadata.height} → ${newWidth}x${newHeight}`);

            await sharp(inputPath)
                // Paso 1: Reducir ruido de la imagen original
                .median(UPSCALE_CONFIG.denoise)
                // Paso 2: Upscale con interpolación de alta calidad
                .resize(newWidth, newHeight, {
                    kernel: UPSCALE_CONFIG.kernel,
                    fit: 'fill'
                })
                // Paso 3: Aplicar sharpening inteligente para recuperar detalles
                .sharpen(UPSCALE_CONFIG.sharpen)
                // Paso 4: Ajuste sutil de contraste para mejorar definición
                .linear(1.05, -(128 * 0.05))
                // Paso 5: Normalizar para evitar clipping
                .normalize()
                // Guardar en PNG con máxima calidad
                .png({
                    compressionLevel: UPSCALE_CONFIG.compressionLevel,
                    quality: 100,
                    palette: false
                })
                .toFile(outputPath);
        }

        return {
            success: true,
            originalSize: `${metadata.width}x${metadata.height}`,
            newSize: `${newWidth}x${newHeight}`,
            scaleFactor: scaleFactor
        };
    } catch (error) {
        return {
            success: false,
            error: error.message
        };
    }
}

/**
 * Procesa todas las imágenes de una carpeta de obra
 */
async function processObraFolder(folderName) {
    const sourcePath = path.join(obrasDir, folderName);
    const destPath = path.join(upscaledDir, folderName);

    // Verificar que la carpeta fuente existe
    if (!fs.existsSync(sourcePath)) {
        return null;
    }

    // Crear carpeta de destino si no existe
    if (!fs.existsSync(destPath)) {
        fs.mkdirSync(destPath, { recursive: true });
    }

    // Leer todos los archivos
    const files = fs.readdirSync(sourcePath);
    const imageFiles = files.filter(file => {
        const ext = path.extname(file).toLowerCase();
        return imageExtensions.includes(ext);
    });

    if (imageFiles.length === 0) {
        return null;
    }

    const results = {
        folderName,
        processed: 0,
        failed: 0,
        images: []
    };

    // Procesar cada imagen
    for (const file of imageFiles) {
        const inputPath = path.join(sourcePath, file);
        const outputFileName = path.parse(file).name + '.png'; // Convertir todo a PNG
        const outputPath = path.join(destPath, outputFileName);

        // Verificar si ya existe la imagen upscaled
        if (fs.existsSync(outputPath)) {
            console.log(`  ⏭️  ${file} ya existe (omitiendo)`);
            continue;
        }

        console.log(`  🔄 Procesando ${file}...`);
        const result = await upscaleImage(inputPath, outputPath);

        if (result.success) {
            results.processed++;
            results.images.push({
                name: file,
                originalSize: result.originalSize,
                newSize: result.newSize
            });
            console.log(`  ✅ ${file}: ${result.originalSize} → ${result.newSize}`);
        } else {
            results.failed++;
            console.log(`  ❌ Error en ${file}: ${result.error}`);
        }
    }

    return results;
}

/**
 * Función principal
 */
async function main() {
    try {
        // Verificar que el directorio de obras existe
        if (!fs.existsSync(obrasDir)) {
            console.error(`❌ Error: No se encontró el directorio ${obrasDir}`);
            process.exit(1);
        }

        // Leer todas las carpetas en obras/
        const folders = fs.readdirSync(obrasDir).filter(item => {
            const itemPath = path.join(obrasDir, item);
            return fs.statSync(itemPath).isDirectory();
        });

        if (folders.length === 0) {
            console.log('⚠️  No se encontraron carpetas en assets/images/obras/');
            process.exit(0);
        }

        console.log(`📂 Se encontraron ${folders.length} carpetas de obras\n`);

        let totalProcessed = 0;
        let totalFailed = 0;
        const processedFolders = [];

        // Procesar cada carpeta
        for (const folder of folders) {
            console.log(`\n📁 Procesando carpeta: ${folder}`);
            const result = await processObraFolder(folder);

            if (result) {
                totalProcessed += result.processed;
                totalFailed += result.failed;
                processedFolders.push(result);

                if (result.processed > 0) {
                    console.log(`✓ ${folder}: ${result.processed} imágenes upscaled`);
                }
            } else {
                console.log(`⚠ ${folder}: No se encontraron imágenes`);
            }
        }

        // Resumen final
        console.log('\n' + '='.repeat(60));
        console.log('\n📊 RESUMEN DEL UPSCALE\n');
        console.log(`✅ Total de imágenes procesadas: ${totalProcessed}`);
        console.log(`❌ Total de errores: ${totalFailed}`);
        console.log(`📁 Carpetas procesadas: ${processedFolders.length}`);
        console.log(`\n💾 Imágenes upscaled guardadas en: ${upscaledDir}`);
        console.log('\n' + '='.repeat(60));

        console.log('\n💡 Siguiente paso: Ejecutar optimize-images.js para optimizar las imágenes upscaled\n');

    } catch (error) {
        console.error('\n❌ Error fatal:', error.message);
        console.error(error.stack);
        process.exit(1);
    }
}

// Ejecutar
main();
