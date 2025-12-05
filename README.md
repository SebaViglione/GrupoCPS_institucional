# Grupo CPS - Sitio Web Institucional

Sitio web corporativo de Grupo CPS Uruguay, especialistas en carpintería de aluminio, vidriería y construcción.

## 📁 Estructura del Proyecto

```
/
├── public/               # Contenido público servido por el servidor web
│   ├── assets/           # Recursos estáticos
│   │   ├── css/          # Estilos CSS
│   │   ├── js/           # JavaScript
│   │   ├── images/       # Imágenes y logos
│   │   ├── videos/       # Videos del hero
│   │   └── data/         # JSON data (obras, clientes)
│   ├── php/              # Scripts PHP (contact form)
│   ├── index.html        # Página principal
│   ├── obras.html        # Portfolio de obras
│   ├── robots.txt        # SEO
│   └── sitemap.xml       # SEO
├── docker/               # Configuración Docker
│   ├── Dockerfile
│   └── docker-compose.yml
├── docs/                 # Documentación del proyecto
├── scripts/              # Scripts de utilidades (optimización, etc.)
├── .env.example          # Ejemplo de variables de entorno
├── composer.json         # Dependencias PHP
└── package.json          # Dependencias Node.js
```

## 🚀 Inicio Rápido

### Con Docker (Recomendado)

```bash
cd docker
UID=$(id -u) GID=$(id -g) docker compose up -d
```

El sitio estará disponible en: http://localhost:3000

### Sin Docker

Requiere un servidor web (Apache/Nginx) con PHP 8.2+

```bash
# Instalar dependencias PHP
composer install

# Servir desde la carpeta public/
php -S localhost:3000 -t public
```

## 🌐 Características

- ✅ **Multiidioma**: Español e Inglés con sistema de traducción dinámico
- ✅ **Responsive**: Optimizado para todos los dispositivos
- ✅ **SEO Optimizado**: Meta tags, sitemap, robots.txt
- ✅ **Performance**: Lazy loading, optimización de imágenes
- ✅ **Portfolio Dinámico**: Carga de obras desde JSON
- ✅ **Formulario de Contacto**: Con PHPMailer

## 🛠️ Desarrollo

### Estructura de Traducciones

El sistema de traducción está en `public/js/i18n.js`. Las traducciones se aplican automáticamente usando atributos `data-i18n`.

Ver `docs/TRADUCCION_DINAMICA.md` para más detalles.

### Agregar Nueva Obra

Editar `public/assets/data/obras.json` y agregar un nuevo objeto con:

```json
{
  "id": 999,
  "nombre": "Nombre de la obra",
  "nombre_en": "Project name",
  "descripcion": "Descripción en español",
  "descripcion_en": "Description in English",
  "categoria": "salud|educacion|vivienda|obras_publicas|corporativo",
  "estado": "Completada|En Progreso",
  "imagenes": ["obras-optimized/carpeta/imagen.webp"],
  "superficie": "1000 m²",
  "ubicacion": "Ciudad, Uruguay",
  "ubicacion_en": "City, Uruguay",
  "cliente": "Nombre del cliente",
  "cliente_en": "Client name"
}
```

### Scripts Útiles

- `scripts/optimize-images.js` - Optimizar imágenes de obras
- `scripts/upscale-images.js` - Aumentar resolución de imágenes
- `scripts/optimizar_videos.sh` - Comprimir videos

## 📝 Licencia

© 2025 Grupo CPS Uruguay. Todos los derechos reservados.
