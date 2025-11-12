// Script global para procesar todas las obras
// Ejecuta optimize-images.js primero y luego generate-obras-images.js
// Uso: node scripts/process-all-obras.js

const { spawn } = require('child_process');
const path = require('path');

console.log('\n🚀 Iniciando procesamiento completo de obras...\n');

// Función para ejecutar un script de Node.js
function runScript(scriptPath, scriptName) {
    return new Promise((resolve, reject) => {
        console.log(`\n📦 Ejecutando ${scriptName}...\n`);

        const process = spawn('node', [scriptPath], {
            stdio: 'inherit', // Muestra la salida en tiempo real
            shell: true
        });

        process.on('close', (code) => {
            if (code !== 0) {
                reject(new Error(`${scriptName} finalizó con código de error ${code}`));
            } else {
                console.log(`\n✅ ${scriptName} completado exitosamente\n`);
                resolve();
            }
        });

        process.on('error', (err) => {
            reject(new Error(`Error al ejecutar ${scriptName}: ${err.message}`));
        });
    });
}

// Ejecutar scripts secuencialmente
async function processAll() {
    try {
        // Paso 1: Optimizar imágenes
        await runScript(
            path.join(__dirname, 'optimize-images.js'),
            'optimize-images.js'
        );

        // Paso 2: Generar JSON con rutas actualizadas
        await runScript(
            path.join(__dirname, 'generate-obras-images.js'),
            'generate-obras-images.js'
        );

        console.log('\n🎉 ¡Procesamiento completo finalizado con éxito!\n');
        console.log('📋 Resumen:');
        console.log('  ✓ Imágenes optimizadas a WebP');
        console.log('  ✓ JSON actualizado con rutas correctas');
        console.log('  ✓ Videos registrados');
        console.log('\n💡 Siguiente paso: Revisa las imágenes en assets/images/obras-optimized/\n');

    } catch (error) {
        console.error('\n❌ Error durante el procesamiento:', error.message);
        process.exit(1);
    }
}

// Iniciar procesamiento
processAll();
