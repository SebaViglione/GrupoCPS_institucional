// Internationalization (i18n) for Grupo CPS Website
// Supported languages: Spanish (es), English (en)

const translations = {
    es: {
        // Navigation
        nav: {
            home: "Inicio",
            projects: "Obras",
            services: "Servicios",
            about: "Nosotros",
            contact: "Contacto"
        },
        // Hero Section (index.html)
        hero: {
            title: "GRUPO CPS",
            subtitle: "Construyendo el futuro",
            description: "Líderes en carpintería de aluminio, vidriería y construcción en Uruguay",
            location: "Montevideo, Uruguay",
            cta: "Ver Proyectos",
            ctaSecondary: "Contactar",
            stats: {
                projects: "Proyectos",
                experience: "Años",
                clients: "Clientes"
            },
            scroll: "Desliza"
        },
        // About Section
        about: {
            tag: "Sobre Nosotros",
            title: "Construyendo el futuro de Uruguay",
            lead: "Somos una empresa uruguaya especializada en carpintería de aluminio, vidriería y construcción.",
            description: "Con planta DVH propia, ofrecemos soluciones integrales para proyectos corporativos, residenciales e industriales. Nuestro compromiso es entregar obras de la más alta calidad, cumpliendo con los plazos establecidos y superando las expectativas de nuestros clientes.",
            features: {
                quality: {
                    title: "Calidad Garantizada",
                    description: "Utilizamos materiales de primera línea y seguimos estrictos controles de calidad en cada proyecto."
                },
                experience: {
                    title: "Experiencia Comprobada",
                    description: "Más de una década de experiencia en proyectos de gran envergadura en todo Uruguay."
                },
                innovation: {
                    title: "Innovación Constante",
                    description: "Incorporamos las últimas tecnologías y técnicas constructivas para garantizar resultados superiores."
                }
            }
        },
        // Mosaic Section (Sectors)
        mosaic: {
            tag: "Sectores",
            title: "Especializados en múltiples industrias",
            description: "Adaptamos nuestras soluciones a las necesidades específicas de cada sector",
            sectors: {
                health: "Sector Salud",
                education: "Educación",
                corporate: "Corporativo",
                retail: "Viviendas",
                hospitality: "Obras Públicas"
            },
            cta: "Explorar Nuestras Obras"
        },
        // Clients Section
        clients: {
            tag: "Nuestros Clientes",
            title: "Confianza que construye relaciones",
            description: "Empresas e instituciones que han confiado en la calidad de nuestro trabajo",
            loading: "Cargando clientes..."
        },
        // Projects Section (index.html preview)
        projects: {
            tag: "Proyectos Destacados",
            title: "NUESTRAS OBRAS",
            subtitle: "Portfolio de Proyectos",
            location: "Uruguay",
            description: "Descubre los proyectos que hemos realizado con excelencia y dedicación",
            viewAll: "Ver Todas las Obras",
            viewDetails: "Ver Detalles",
            seeMore: "Ver más",
            filters: {
                all: "Todas",
                health: "Salud",
                education: "Educación",
                corporate: "Corporativo",
                retail: "Viviendas",
                hospitality: "Obras Públicas"
            },
            status: {
                completed: "Completada",
                inProgress: "En Progreso"
            },
            details: {
                client: "Cliente",
                location: "Ubicación",
                area: "Superficie",
                year: "Año",
                duration: "Duración",
                category: "Categoría",
                status: "Estado"
            },
            view: {
                grid: "Cuadrícula",
                list: "Lista"
            }
        },
        // Obras Page (obras.html)
        obrasPage: {
            hero: {
                tag: "Portfolio",
                title: "NUESTRAS OBRAS",
                location: "Uruguay",
                description: "Explora nuestro portafolio completo de proyectos realizados en todo Uruguay. Cada obra refleja nuestro compromiso con la excelencia y la innovación."
            },
            filter: {
                title: "Filtrar obras",
                view: "Vista:",
                category: "Categoría:",
                health: "Salud",
                education: "Educación",
                corporate: "Corporativo",
                retail: "Viviendas",
                hospitality: "Obras Públicas",
                filter: {
                    title: "Filtros",
                    all: "Todas las Categorías",
                    health: "Salud",
                    education: "Educación",
                    corporate: "Corporativo",
                    retail: "Viviendas",
                },
                status: "Estado:",
                allStatus: "Todos los Estados",
                completed: "Completadas",
                inProgress: "En Progreso"
            },
            noResults: {
                title: "No se encontraron obras",
                description: "No hay obras que coincidan con los filtros seleccionados. Prueba con otros criterios de búsqueda."
            },
            loading: "Cargando obras...",
            loadingImage: "Cargando imagen...",
            card: {
                viewMore: "Ver más detalles"
            },
            modal: {
                close: "Cerrar",
                client: "Cliente",
                location: "Ubicación",
                area: "Superficie",
                year: "Año",
                duration: "Duración",
                status: "Estado",
                category: "Categoría",
                description: "Descripción del proyecto",
                images: "Galería de imágenes",
                videos: "Videos del proyecto"
            },
            cta: {
                title: "¿Listo para comenzar tu proyecto?",
                description: "Contáctanos hoy y descubre cómo podemos hacer realidad tu visión",
                button: "Solicitar Presupuesto"
            },
            loadMore: "Cargar Más Obras",
            showing: "Mostrando",
            of: "de",
            projects: "obras"
        },
        // Contact Section
        contact: {
            tag: "Contacto",
            title: "Conversemos sobre tu proyecto",
            description: "Estamos aquí para responder tus consultas y ayudarte a hacer realidad tu proyecto",
            form: {
                name: "Nombre completo",
                email: "Correo electrónico",
                phone: "Teléfono",
                message: "Cuéntanos sobre tu proyecto",
                send: "Enviar Mensaje",
                sending: "Enviando...",
                success: "¡Mensaje enviado con éxito! Nos pondremos en contacto pronto.",
                error: "Hubo un error al enviar el mensaje. Por favor, intenta nuevamente."
            },
            info: {
                title: "Información de contacto",
                address: "Dirección",
                addressValue: "Montevideo, Uruguay",
                phone: "Teléfono",
                phoneValue: "+598 XXXX XXXX",
                email: "Email",
                emailValue: "contacto@grupocps.com.uy",
                hours: "Horarios de atención",
                hoursValue: "Lunes a Viernes: 8:00 - 18:00"
            }
        },
        // Footer
        footer: {
            description: "Líderes en carpintería de aluminio, vidriería y construcción en Uruguay",
            quickLinks: "Enlaces Rápidos",
            followUs: "Síguenos",
            rights: "Todos los derechos reservados",
            privacy: "Política de Privacidad",
            terms: "Términos y Condiciones"
        },
        // Common / Errors
        common: {
            readMore: "Leer más",
            learnMore: "Conoce más",
            loading: "Cargando...",
            loadingContent: "Cargando contenido...",
            error: "Error al cargar",
            noResults: "No se encontraron resultados",
            tryAgain: "Intentar nuevamente",
            close: "Cerrar",
            back: "Volver",
            next: "Siguiente",
            previous: "Anterior",
            viewMore: "Ver más",
            viewLess: "Ver menos"
        },
        // Error Messages
        errors: {
            network: "Error de conexión. Verifica tu conexión a internet.",
            notFound: "No se encontró el recurso solicitado.",
            serverError: "Error del servidor. Intenta nuevamente más tarde.",
            timeout: "La solicitud ha expirado. Por favor, intenta nuevamente.",
            loadImages: "Error al cargar las imágenes. Intenta recargar la página.",
            loadProjects: "Error al cargar los proyectos. Por favor, intenta nuevamente.",
            loadClients: "Error al cargar los clientes.",
            invalidData: "Los datos recibidos no son válidos.",
            formValidation: {
                required: "Este campo es obligatorio",
                invalidEmail: "Por favor, ingresa un email válido",
                invalidPhone: "Por favor, ingresa un teléfono válido",
                minLength: "El mensaje debe tener al menos 10 caracteres"
            }
        },
        // Page Loader
        loader: {
            loading: "Cargando",
            wait: "Espera un momento..."
        }
    },
    en: {
        // Navigation
        nav: {
            home: "Home",
            projects: "Projects",
            services: "Services",
            about: "About Us",
            contact: "Contact"
        },
        // Hero Section (index.html)
        hero: {
            title: "CPS GROUP",
            subtitle: "Building the future",
            description: "Leaders in aluminum carpentry, glasswork and construction in Uruguay",
            location: "Montevideo, Uruguay",
            cta: "View Projects",
            ctaSecondary: "Contact Us",
            stats: {
                projects: "Projects",
                experience: "Years",
                clients: "Clients"
            },
            scroll: "Scroll"
        },
        // About Section
        about: {
            tag: "About Us",
            title: "Building Uruguay's future",
            lead: "We are a Uruguayan company specializing in aluminum carpentry, glasswork and construction.",
            description: "With our own DVH plant, we offer comprehensive solutions for corporate, residential and industrial projects. Our commitment is to deliver the highest quality work, meeting deadlines and exceeding our clients' expectations.",
            features: {
                quality: {
                    title: "Guaranteed Quality",
                    description: "We use top-tier materials and follow strict quality controls in every project."
                },
                experience: {
                    title: "Proven Experience",
                    description: "Over a decade of experience in large-scale projects throughout Uruguay."
                },
                innovation: {
                    title: "Constant Innovation",
                    description: "We incorporate the latest technologies and construction techniques to ensure superior results."
                }
            }
        },
        // Mosaic Section (Sectors)
        mosaic: {
            tag: "Sectors",
            title: "Specialized in multiple industries",
            description: "We adapt our solutions to the specific needs of each sector",
            sectors: {
                health: "Health Sector",
                education: "Education",
                corporate: "Corporate",
                retail: "Residential",
                hospitality: "Public Works"
            },
            cta: "Explore Our Projects"
        },
        // Clients Section
        clients: {
            tag: "Our Clients",
            title: "Trust that builds relationships",
            description: "Companies and institutions that have trusted the quality of our work",
            loading: "Loading clients..."
        },
        // Projects Section (index.html preview)
        projects: {
            tag: "Featured Projects",
            title: "OUR PROJECTS",
            subtitle: "Project Portfolio",
            location: "Uruguay",
            description: "Discover the projects we have completed with excellence and dedication",
            viewAll: "View All Projects",
            viewDetails: "View Details",
            seeMore: "See more",
            filters: {
                all: "All",
                health: "Health",
                education: "Education",
                corporate: "Corporate",
                retail: "Residential",
                hospitality: "Public Works"
            },
            status: {
                completed: "Completed",
                inProgress: "In Progress"
            },
            details: {
                client: "Client",
                location: "Location",
                area: "Area",
                year: "Year",
                duration: "Duration",
                category: "Category",
                status: "Status"
            },
            view: {
                grid: "Grid",
                list: "List"
            }
        },
        // Obras Page (obras.html)
        obrasPage: {
            hero: {
                tag: "Portfolio",
                title: "OUR PROJECTS",
                location: "Uruguay",
                description: "Explore our complete portfolio of projects completed throughout Uruguay. Each project reflects our commitment to excellence and innovation."
            },
            filter: {
                title: "Filter projects",
                view: "View:",
                category: "Category:",
                health: "Health",
                education: "Education",
                corporate: "Corporate",
                retail: "Residential",
                hospitality: "Public Works",
                filter: {
                    title: "Filters",
                    category: "Category:",
                    status: "Status:",
                    all: "All Categories",
                    health: "Health",
                    education: "Education",
                },
                status: "Status:",
                corporate: "Corporate",
                retail: "Residential",
                hospitality: "Public Works",
                allStatus: "All Status",
                completed: "Completed",
                inProgress: "In Progress"
            },
            noResults: {
                title: "No projects found",
                description: "There are no projects matching the selected filters. Try different search criteria."
            },
            loading: "Loading projects...",
            loadingImage: "Loading image...",
            card: {
                viewMore: "View more details"
            },
            modal: {
                close: "Close",
                client: "Client",
                location: "Location",
                area: "Area",
                year: "Year",
                duration: "Duration",
                status: "Status",
                category: "Category",
                description: "Project description",
                images: "Image gallery",
                videos: "Project videos"
            },
            cta: {
                title: "Ready to start your project?",
                description: "Contact us today and discover how we can make your vision a reality",
                button: "Request a Quote"
            },
            loadMore: "Load More Projects",
            showing: "Showing",
            of: "of",
            projects: "projects"
        },
        // Contact Section
        contact: {
            tag: "Contact",
            title: "Let's talk about your project",
            description: "We are here to answer your questions and help you make your project a reality",
            form: {
                name: "Full name",
                email: "Email address",
                phone: "Phone",
                message: "Tell us about your project",
                send: "Send Message",
                sending: "Sending...",
                success: "Message sent successfully! We'll be in touch soon.",
                error: "There was an error sending the message. Please try again."
            },
            info: {
                title: "Contact information",
                address: "Address",
                addressValue: "Montevideo, Uruguay",
                phone: "Phone",
                phoneValue: "+598 XXXX XXXX",
                email: "Email",
                emailValue: "contact@grupocps.com.uy",
                hours: "Business hours",
                hoursValue: "Monday to Friday: 8:00 AM - 6:00 PM"
            }
        },
        // Footer
        footer: {
            description: "Leaders in aluminum carpentry, glasswork and construction in Uruguay",
            quickLinks: "Quick Links",
            followUs: "Follow Us",
            rights: "All rights reserved",
            privacy: "Privacy Policy",
            terms: "Terms & Conditions"
        },
        // Common / Errors
        common: {
            readMore: "Read more",
            learnMore: "Learn more",
            loading: "Loading...",
            loadingContent: "Loading content...",
            error: "Error loading",
            noResults: "No results found",
            tryAgain: "Try again",
            close: "Close",
            back: "Back",
            next: "Next",
            previous: "Previous",
            viewMore: "View more",
            viewLess: "View less"
        },
        // Error Messages
        errors: {
            network: "Connection error. Check your internet connection.",
            notFound: "The requested resource was not found.",
            serverError: "Server error. Please try again later.",
            timeout: "The request has timed out. Please try again.",
            loadImages: "Error loading images. Try refreshing the page.",
            loadProjects: "Error loading projects. Please try again.",
            loadClients: "Error loading clients.",
            invalidData: "The received data is invalid.",
            formValidation: {
                required: "This field is required",
                invalidEmail: "Please enter a valid email",
                invalidPhone: "Please enter a valid phone number",
                minLength: "The message must be at least 10 characters long"
            }
        },
        // Page Loader
        loader: {
            loading: "Loading",
            wait: "Please wait..."
        }
    }
};

// Current language (default: Spanish)
let currentLang = 'es';

// Get translation by key path (e.g., "nav.home")
function t(keyPath) {
    const keys = keyPath.split('.');
    let value = translations[currentLang];

    for (const key of keys) {
        if (value && typeof value === 'object') {
            value = value[key];
        } else {
            return keyPath; // Return key if not found
        }
    }

    return value || keyPath;
}

// Set language and update DOM
function setLanguage(lang) {
    if (!translations[lang]) {
        console.warn(`Language "${lang}" not supported. Falling back to Spanish.`);
        lang = 'es';
    }

    currentLang = lang;
    localStorage.setItem('preferredLanguage', lang);

    // Update HTML lang attribute
    document.documentElement.lang = lang;

    // Update all elements with data-i18n attribute
    document.querySelectorAll('[data-i18n]').forEach(element => {
        const key = element.getAttribute('data-i18n');
        const translation = t(key);

        if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
            element.placeholder = translation;
        } else {
            element.textContent = translation;
        }
    });

    // Update language selector active state
    document.querySelectorAll('.lang-btn').forEach(btn => {
        btn.classList.toggle('active', btn.getAttribute('data-lang') === lang);
    });

    // Trigger custom event for other scripts to react
    document.dispatchEvent(new CustomEvent('languageChanged', { detail: { lang } }));
}

// Get current language
function getCurrentLanguage() {
    return currentLang;
}

// Initialize language from URL, localStorage, or browser
function initLanguage() {
    // Check URL parameter
    const urlParams = new URLSearchParams(window.location.search);
    const urlLang = urlParams.get('lang');

    if (urlLang && translations[urlLang]) {
        setLanguage(urlLang);
        return;
    }

    // Check localStorage
    const savedLang = localStorage.getItem('preferredLanguage');
    if (savedLang && translations[savedLang]) {
        setLanguage(savedLang);
        return;
    }

    // Check browser language
    const browserLang = navigator.language.split('-')[0];
    if (translations[browserLang]) {
        setLanguage(browserLang);
        return;
    }

    // Default to Spanish
    setLanguage('es');
}

// Export functions
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { t, setLanguage, getCurrentLanguage, initLanguage };
}
