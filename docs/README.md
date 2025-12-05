# 🏗️ Grupo CPS - Sitio Web Institucional

[![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)
[![HTML5](https://img.shields.io/badge/HTML5-E34F26?logo=html5&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/HTML)
[![CSS3](https://img.shields.io/badge/CSS3-1572B6?logo=css3&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/CSS)
[![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?logo=javascript&logoColor=black)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)

> Sitio web corporativo de **Grupo CPS** - Líderes en construcción, carpintería en aluminio y vidriería en Uruguay.

---

## 📋 Tabla de Contenidos

- [Acerca del Proyecto](#-acerca-del-proyecto)
- [Características](#-características)
- [Tecnologías](#-tecnologías)
- [Instalación](#-instalación)
- [Estructura del Proyecto](#-estructura-del-proyecto)
- [Despliegue](#-despliegue)
- [Contacto](#-contacto)

---

## 🏢 Acerca del Proyecto

Sitio web institucional diseñado para **Grupo CPS**, empresa uruguaya con casi 10 años de experiencia en:

- 🪟 **Carpintería en Aluminio**
- 🔨 **Construcción Integral**
- 🏠 **Vidriería Profesional**
- 🏭 **Planta DVH Propia** (Doble Vidriado Hermético)

El sitio presenta un diseño moderno, responsive y optimizado para ofrecer una experiencia premium que refleja la calidad de los servicios de la empresa.

---

## ✨ Características

### 🎨 Diseño y UX
- ✅ Diseño responsive (mobile-first)
- ✅ Animaciones suaves y profesionales
- ✅ Hero section con video rotativo optimizado
- ✅ Efecto parallax en scroll
- ✅ Carrusel infinito de clientes con hover suave
- ✅ Navegación sticky con efecto blur

### ⚡ Performance
- ✅ Lazy loading de imágenes y videos
- ✅ Videos optimizados (720p/1080p según dispositivo)
- ✅ Precarga inteligente de recursos
- ✅ Caché de datos del carrusel
- ✅ Debounce en eventos de scroll
- ✅ Soporte para `prefers-reduced-motion`

### 📱 Funcionalidades
- ✅ Formulario de contacto con PHP backend
- ✅ Carga dinámica de logos de clientes
- ✅ Animaciones reveal on scroll
- ✅ Contador animado de estadísticas
- ✅ Menú hamburguesa en móvil

---

## 🛠️ Tecnologías

### Frontend
- **HTML5** - Estructura semántica
- **CSS3** - Diseño moderno con variables CSS
- **JavaScript (Vanilla)** - Sin frameworks, 100% nativo

### Backend
- **PHP 7.4+** - Envío de emails del formulario de contacto
- **PHPMailer** - Librería de correo electrónico

### DevOps
- **Docker** - Contenedorización del proyecto
- **Docker Compose** - Orquestación de servicios
- **Nginx** - Servidor web (en contenedor)

### Fuentes y Assets
- **Google Fonts** - Poppins, Montserrat
- **Font Awesome 6.6** - Iconografía
- **WebM/MP4** - Videos optimizados

---

## 🚀 Instalación

### Requisitos Previos
- Git
- Docker y Docker Compose (recomendado)
- O bien: PHP 7.4+, servidor web (Apache/Nginx)

### Opción 1: Con Docker (Recomendado)

```bash
# Clonar el repositorio
git clone https://github.com/SebaViglione/GrupoCPS_institucional.git
cd GrupoCPS_institucional

# Levantar el proyecto
docker-compose up -d

# Acceder a http://localhost:8080
```

### Opción 2: Servidor Local

```bash
# Clonar el repositorio
git clone https://github.com/SebaViglione/GrupoCPS_institucional.git
cd GrupoCPS_institucional

# Instalar dependencias de PHP
composer install

# Configurar servidor web apuntando a la raíz del proyecto
# O usar el servidor integrado de PHP:
php -S localhost:8000
```

### Configuración del Formulario de Contacto

1. Edita `php/send_mail.php`
2. Configura las credenciales SMTP:

```php
$mail->Host = 'smtp.tu-servidor.com';
$mail->Username = 'tu-email@dominio.com';
$mail->Password = 'tu-contraseña';
$mail->setFrom('noreply@grupocps.com.uy', 'Grupo CPS');
$mail->addAddress('ventas@grupocps.com.uy');
```

---

## 📁 Estructura del Proyecto

```
GrupoCPS_institucional/
├── assets/
│   ├── data/
│   │   └── clients.json          # Logos de clientes
│   ├── images/
│   │   ├── clients-logos/        # Logos de empresas
│   │   └── Logo CPS.png
│   └── videos/
│       └── optimizados/          # Videos hero (720p/1080p)
├── css/
│   └── styles.css                # Estilos principales
├── js/
│   └── main.js                   # JavaScript principal
├── php/
│   └── send_mail.php             # Backend del formulario
├── vendor/                       # Dependencias PHP (Composer)
├── index.html                    # Página principal
├── obras.html                    # Página de portfolio
├── docker-compose.yml            # Configuración Docker
├── Dockerfile                    # Imagen Docker personalizada
├── composer.json                 # Dependencias PHP
└── README.md                     # Este archivo
```

---

## 🌐 Despliegue

### Con Docker

```bash
# En el servidor
git clone https://github.com/SebaViglione/GrupoCPS_institucional.git
cd GrupoCPS_institucional
docker-compose up -d
```

---

## 📧 Contacto

**Grupo CPS**  
📞 [+598 097 901 857](https://wa.me/59897901857)  
📧 [ventas@grupocps.com.uy](mailto:ventas@grupocps.com.uy)  
🌐 [www.grupocps.com.uy](https://www.grupocps.com.uy)

---

## 📄 Licencia

Este proyecto es propiedad de **Grupo CPS Uruguay**. Todos los derechos reservados.

---

## 🙏 Agradecimientos

- Diseño y desarrollo por [Tu Nombre/Empresa]
- Optimización de videos con FFmpeg
- Iconos de [Font Awesome](https://fontawesome.com)
- Fuentes de [Google Fonts](https://fonts.google.com)

---

<div align="center">
  
**[⬆ Volver arriba](#-grupo-cps---sitio-web-institucional)**

Hecho con ❤️ en Uruguay 🇺🇾

</div>