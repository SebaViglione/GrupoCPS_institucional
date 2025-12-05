// Script para generar automáticamente las rutas de imágenes en obras.json
// Ejecutar con: node scripts/generate-obras-images.js

const fs = require('fs');
const path = require('path');

const obrasDir = path.join(__dirname, '..', 'assets', 'images', 'obras-optimized');
const obrasVideosDir = path.join(__dirname, '..', 'assets', 'images', 'obras');
const jsonPath = path.join(__dirname, '..', 'assets', 'data', 'obras.json');

// Extensiones de imagen y video permitidas
const imageExtensions = ['.jpg', '.jpeg', '.png', '.webp', '.gif', '.svg'];
const videoExtensions = ['.mp4', '.webm', '.mov'];

// Leer el JSON actual
const obrasData = JSON.parse(fs.readFileSync(jsonPath, 'utf8'));

// Función para obtener todas las imágenes y videos de una obra
function getMediaFromFolder(folderName) {
    const optimizedPath = path.join(obrasDir, folderName);
    const videosPath = path.join(obrasVideosDir, folderName);

    let imagenes = [];
    let videos = [];

    // Obtener imágenes de la carpeta optimized
    if (fs.existsSync(optimizedPath)) {
        const files = fs.readdirSync(optimizedPath);
        imagenes = files
            .filter(file => {
                const ext = path.extname(file).toLowerCase();
                return imageExtensions.includes(ext);
            })
            .sort()
            .map(file => `obras-optimized/${folderName}/${file}`);
    }

    // Obtener videos de la carpeta original (videos no se optimizan)
    if (fs.existsSync(videosPath)) {
        const files = fs.readdirSync(videosPath);
        videos = files
            .filter(file => {
                const ext = path.extname(file).toLowerCase();
                return videoExtensions.includes(ext);
            })
            .sort()
            .map(file => `obras/${folderName}/${file}`);
    }

    return { imagenes, videos };
}

// Mapeo de nombres de obras a nombres de carpetas
const obrasFolderMap = {
    'Hospital del Cerro': 'hospital-cerro',
    'Hospital El Filtro': 'hospital-filtro',
    'Congreso de Intendentes': 'congreso-intendentes',
    'Facultad de Enfermería UdelaR': 'facultad-enfermeria',
    'Centro de Realojos Piedras Blancas': 'realojos-piedrasblancas',
    'Círculo Católico - Policlínica': 'circulo-catolico',
    'Cárcel de Libertad': 'carcel-libertad',
    'The Garzón School (TGS)': 'garzon-school',
    'Colegio Aldeas': 'colegio-aldeas',
    'Vivo Life Cordón': 'vivo-life',
    'Avita Libertador': 'avita-libertador',
    'Uruguayan American School (UAS)': 'uas',
    'Proa Carrasco': 'proa-carrasco',
    'Sinergia Faro (ex Sheraton)': 'sinergia-faro',
    'MIDES - Fachada Institucional': 'mides',
    'Edificio Merville': 'merville',
    'Summum - World Trade Center': 'summum-wtc',
    'Hospital de Clínicas': 'hospital-clinicas',
    'Hospital Pasteur': 'hospital-pasteur',
    'ANTEL - Sede Cerrito': 'antel-cerrito',
    'Ministerio de Trabajo y Seguridad Social (MTSS)': 'mtss',
    'Banco de Seguros del Estado (BSE)': 'bse',
    'Nostrum Malvín Torre 2': 'nostrum-malvin',
    'Cooperativas de Vivienda': 'cooperativas',
    'INISA Academia': 'inisa',
    'Comisaría de Salinas': 'comisaria-salinas',
    'Hogar Horneros (INISA)': 'hogar-horneros',
    'Escuela Integral STILER': 'stiler-escuela-integral'
};

// Actualizar el JSON con las imágenes y videos encontrados
obrasData.forEach(obra => {
    const folderName = obrasFolderMap[obra.nombre];

    if (folderName) {
        const { imagenes, videos } = getMediaFromFolder(folderName);

        // SIEMPRE sobrescribir con las rutas encontradas SI existen
        if (imagenes.length > 0) {
            obra.imagenes = imagenes;
            console.log(`✓ ${obra.nombre}: ${imagenes.length} imágenes encontradas`);
        } else {
            // Si no hay imágenes en obras-optimized, reemplazar rutas antiguas
            if (obra.imagenes && obra.imagenes.length > 0) {
                obra.imagenes = obra.imagenes.map(img =>
                    img.replace(/^obras(-upscaled|-optimized)?\//, 'obras-optimized/')
                );
                console.log(`⚠ ${obra.nombre}: No se encontraron imágenes optimizadas, rutas actualizadas a obras-optimized/`);
            } else {
                console.log(`⚠ ${obra.nombre}: No se encontraron imágenes en la carpeta '${folderName}'`);
            }
        }

        if (videos.length > 0) {
            obra.videos = videos;
            console.log(`  📹 ${obra.nombre}: ${videos.length} videos encontrados`);
        }
    } else {
        console.log(`⚠ ${obra.nombre}: No tiene carpeta mapeada`);
    }
});

// Guardar el JSON actualizado
fs.writeFileSync(jsonPath, JSON.stringify(obrasData, null, 2), 'utf8');
console.log('\n✓ JSON actualizado correctamente en:', jsonPath);
