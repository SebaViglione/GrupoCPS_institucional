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
        // Hero Section
        hero: {
            title: "GRUPO CPS",
            subtitle: "Construyendo el futuro",
            description: "Líderes en carpintería de aluminio, vidriería y construcción en Uruguay",
            cta: "Ver Proyectos"
        },
        // About Section
        about: {
            title: "SOBRE NOSOTROS",
            subtitle: "Más de 10 años de experiencia",
            description: "Somos una empresa uruguaya especializada en carpintería de aluminio, vidriería y construcción. Con planta DVH propia, ofrecemos soluciones integrales para proyectos corporativos, residenciales e industriales."
        },
        // Services Section
        services: {
            title: "NUESTROS SERVICIOS",
            subtitle: "Soluciones integrales",
            carpentry: {
                title: "Carpintería de Aluminio",
                description: "Diseño y fabricación de aberturas, fachadas y cerramientos de aluminio de alta calidad."
            },
            glass: {
                title: "Vidriería y DVH",
                description: "Planta DVH propia. Doble vidriado hermético para máximo aislamiento térmico y acústico."
            },
            construction: {
                title: "Construcción",
                description: "Obras llave en mano. Proyectos corporativos, residenciales e industriales."
            }
        },
        // Projects Section
        projects: {
            title: "NUESTRAS OBRAS",
            subtitle: "Portfolio de Proyectos",
            location: "Uruguay",
            description: "Descubre los proyectos que hemos realizado con excelencia y dedicación",
            viewAll: "Ver Todas las Obras",
            viewDetails: "Ver Detalles",
            filters: {
                all: "Todas",
                residential: "Residencial",
                commercial: "Comercial",
                corporate: "Corporativo",
                industrial: "Industrial",
                hospitality: "Hotelería"
            },
            status: {
                completed: "Completada",
                inProgress: "En Progreso"
            },
            details: {
                client: "Cliente",
                location: "Ubicación",
                area: "Superficie",
                category: "Categoría",
                status: "Estado"
            }
        },
        // Contact Section
        contact: {
            title: "CONTACTO",
            subtitle: "Conversemos sobre tu proyecto",
            name: "Nombre",
            email: "Email",
            phone: "Teléfono",
            message: "Mensaje",
            send: "Enviar Mensaje",
            info: {
                address: "Dirección",
                phone: "Teléfono",
                email: "Email",
                hours: "Horarios"
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
        // Common
        common: {
            readMore: "Leer más",
            learnMore: "Conoce más",
            loading: "Cargando...",
            error: "Error al cargar",
            noResults: "No se encontraron resultados"
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
        // Hero Section
        hero: {
            title: "CPS GROUP",
            subtitle: "Building the future",
            description: "Leaders in aluminum carpentry, glasswork and construction in Uruguay",
            cta: "View Projects"
        },
        // About Section
        about: {
            title: "ABOUT US",
            subtitle: "Over 10 years of experience",
            description: "We are a Uruguayan company specializing in aluminum carpentry, glasswork and construction. With our own DVH plant, we offer comprehensive solutions for corporate, residential and industrial projects."
        },
        // Services Section
        services: {
            title: "OUR SERVICES",
            subtitle: "Comprehensive solutions",
            carpentry: {
                title: "Aluminum Carpentry",
                description: "Design and manufacturing of high-quality aluminum openings, facades and enclosures."
            },
            glass: {
                title: "Glasswork & DVH",
                description: "Own DVH plant. Double hermetic glazing for maximum thermal and acoustic insulation."
            },
            construction: {
                title: "Construction",
                description: "Turnkey projects. Corporate, residential and industrial developments."
            }
        },
        // Projects Section
        projects: {
            title: "OUR PROJECTS",
            subtitle: "Project Portfolio",
            location: "Uruguay",
            description: "Discover the projects we have completed with excellence and dedication",
            viewAll: "View All Projects",
            viewDetails: "View Details",
            filters: {
                all: "All",
                residential: "Residential",
                commercial: "Commercial",
                corporate: "Corporate",
                industrial: "Industrial",
                hospitality: "Hospitality"
            },
            status: {
                completed: "Completed",
                inProgress: "In Progress"
            },
            details: {
                client: "Client",
                location: "Location",
                area: "Area",
                category: "Category",
                status: "Status"
            }
        },
        // Contact Section
        contact: {
            title: "CONTACT",
            subtitle: "Let's talk about your project",
            name: "Name",
            email: "Email",
            phone: "Phone",
            message: "Message",
            send: "Send Message",
            info: {
                address: "Address",
                phone: "Phone",
                email: "Email",
                hours: "Business Hours"
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
        // Common
        common: {
            readMore: "Read more",
            learnMore: "Learn more",
            loading: "Loading...",
            error: "Error loading",
            noResults: "No results found"
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
