// Diccionario bilingüe del sitio — todo el copy sale de acá en build.
// Fuente: legacy/js/i18n.js + copy hardcodeado en legacy/*.html.
// Regla: ante drift entre HTML legacy e i18n.js ES, gana el texto del HTML.

export const es = {
  common: {
    skipToContent: 'Saltar al contenido',
    viewDetails: 'Ver Detalles',
    loading: 'Cargando...',
    close: 'Cerrar',
    previous: 'Anterior',
    next: 'Siguiente',
  },
  nav: {
    inicio: 'Inicio',
    nosotros: 'Nosotros',
    obras: 'Obras',
    estudio: 'Estudio',
    contacto: 'Contacto',
  },
  hero: {
    subtitle: 'Construyendo el futuro',
    title: 'GRUPO CPS',
    location: 'Montevideo, Uruguay',
    description:
      'Líderes en carpintería de aluminio, vidriería, construcción e instalaciones eléctricas en Uruguay',
    stats: {
      years: { value: '10', label: 'Años' },
      aberturas: { value: '5000', label: 'Aberturas Colocadas' },
      clients: { value: '50', label: 'Clientes' },
    },
    ctaContact: 'Contactar',
    ctaAbout: 'Conoce más',
    scrollHint: 'Desliza',
  },
  about: {
    title: 'Más de 10 años construyendo el futuro de Uruguay',
    lead: 'Somos una empresa uruguaya especializada en carpintería de aluminio, vidriería, construcción e instalaciones eléctricas.',
    description:
      'Con planta DVH propia, ofrecemos soluciones integrales para proyectos corporativos, residenciales e industriales. Nuestro compromiso es entregar obras de la más alta calidad, cumpliendo con los plazos establecidos y superando las expectativas de nuestros clientes.',
    features: {
      calidad: {
        title: 'Calidad Garantizada',
        text: 'Utilizamos materiales de primera línea y seguimos estrictos controles de calidad en cada proyecto.',
      },
      experiencia: {
        title: 'Experiencia Comprobada',
        text: 'Más de una década de experiencia en proyectos de gran envergadura en todo Uruguay.',
      },
      innovacion: {
        title: 'Innovación Constante',
        text: 'Incorporamos las últimas tecnologías y técnicas constructivas para garantizar resultados superiores.',
      },
    },
  },
  categories: {
    salud: 'Salud',
    educacion: 'Educación',
    vivienda: 'Viviendas',
    obras_publicas: 'Obras Públicas',
    corporativo: 'Corporativo',
    instalaciones_electricas: 'Instalaciones Eléctricas',
  },
  mosaic: {
    title: 'Especializados en múltiples industrias',
    description: 'Adaptamos nuestras soluciones a las necesidades específicas de cada sector',
    cta: 'Explorar Nuestras Obras',
  },
  ecommerce: {
    title: '¿Necesitas electrodomésticos para tu casa o alguna obra?',
    description:
      'Descubre nuestra tienda online exclusiva con la línea completa de electrodomésticos ENXUTA. Equipa tus proyectos con electrodomésticos de la mejor calidad.',
    benefits: {
      delivery: 'Envíos a todo el país',
      warranty: 'Garantía oficial',
      brand: 'Catálogo completo',
    },
    cta: 'Visitar Tienda Online',
  },
  clients: {
    title: 'Confianza que construye relaciones',
    description: 'Empresas e instituciones que han confiado en la calidad de nuestro trabajo',
  },
  estudioPromo: {
    tag: 'Estudio Arquitectónico',
    title: '¿Tenés un proyecto en mente?',
    description:
      'Nuestro estudio arquitectónico te acompaña desde la primera idea hasta la llave en mano. Conocé los servicios que ofrecemos: asesoramiento, anteproyecto, trámites, proyecto ejecutivo, dirección de obra y más.',
    cta: 'Conocer nuestro estudio',
  },
  contact: {
    title: 'Conversemos sobre tu proyecto',
    description:
      'Estamos aquí para responder tus consultas y ayudarte a hacer realidad tu proyecto',
    info: {
      whatsapp: 'WhatsApp',
      email: 'Email',
      address: 'Dirección',
    },
    form: {
      name: 'Nombre completo',
      email: 'Correo electrónico',
      message: 'Cuéntanos sobre tu proyecto',
      submit: 'Enviar Mensaje',
      sending: 'Enviando...',
      success: '¡Mensaje enviado con éxito! Nos pondremos en contacto pronto.',
      error: 'Hubo un error al enviar el mensaje. Por favor, intenta nuevamente.',
      honeypotLabel: 'No completes este campo',
    },
  },
  footer: {
    description:
      'Líderes en carpintería de aluminio, vidriería, construcción e instalaciones eléctricas en Uruguay',
    quickLinks: 'Enlaces Rápidos',
    rights: 'Todos los derechos reservados',
  },
  obrasPage: {
    heroTitle: 'NUESTRAS OBRAS',
    heroDescription:
      'Explora nuestro portafolio completo de proyectos realizados en todo Uruguay. Cada obra refleja nuestro compromiso con la excelencia y la innovación.',
    filterCategoryLabel: 'Filtrar por categoría',
    filterStatusLabel: 'Filtrar por estado',
    filterAll: 'Todas las Categorías',
    statusAll: 'Todos los Estados',
    estados: {
      completada: 'Completada',
      en_progreso: 'En Progreso',
    },
    results: '{n} obras',
    resultsOne: '1 obra',
    noResultsTitle: 'No se encontraron obras',
    noResultsText:
      'No hay obras que coincidan con los filtros seleccionados. Prueba con otros criterios de búsqueda.',
    modal: {
      description: 'Descripción del proyecto',
      estado: 'Estado',
      ubicacion: 'Ubicación',
      superficie: 'Superficie',
      cliente: 'Cliente',
    },
  },
  estudio: {
    hero: {
      subtitle: 'ESTUDIO ARQUITECTÓNICO',
      title: 'De la idea a la llave en mano.',
      ctaPrimary: 'Nuestros servicios',
      ctaSecondary: 'Ver proyecto real',
    },
    servicios: {
      title: 'Un proceso integral',
    },
    steps: [
      {
        number: '01',
        title: 'Asesoramiento inicial',
        description:
          'Analizamos tu terreno, necesidades y presupuesto para definir la viabilidad del proyecto antes de comprometer recursos.',
      },
      {
        number: '02',
        title: 'Anteproyecto',
        description:
          'Propuesta arquitectónica inicial: volumetría, distribución espacial, orientación y materialidad.',
      },
      {
        number: '03',
        title: 'Trámites y permisos',
        description:
          'Gestionamos expedientes ante la Intendencia de Montevideo. Permisos de construcción, certificados y habilitaciones.',
      },
      {
        number: '04',
        title: 'Proyecto ejecutivo',
        description:
          'Documentación técnica completa: planos de arquitectura, estructura, instalaciones sanitarias y eléctricas.',
      },
      {
        number: '05',
        title: 'Dirección de obra',
        description:
          'Un arquitecto supervisa la ejecución en campo, controla calidades, plazos y fidelidad al proyecto.',
      },
      {
        number: '06',
        title: 'Llave en mano',
        description:
          'Tu proyecto termina cuando recibís las llaves de una obra terminada, habilitada y lista para usar.',
      },
    ],
    galicia: {
      tag: 'Caso Real',
      title: 'Edificio Galicia — De la idea al hormigón.',
      description:
        'Un ejemplo concreto de nuestro proceso integral: anteproyecto, gestión de permisos ante la Intendencia de Montevideo, proyecto ejecutivo y dirección de obra. 46 unidades habitacionales en Cordón.',
      cta: 'Ver el proyecto',
    },
  },
  seo: {
    landing: {
      title:
        'Grupo CPS Uruguay | Construcción y Carpintería de Aluminio - DVH, Fachadas, Vidriería',
      description:
        'Grupo CPS - Líderes en carpintería de aluminio, vidriería, construcción e instalaciones eléctricas en Uruguay. 10+ años de experiencia, planta DVH propia. Obras corporativas, residenciales e industriales.',
    },
    obras: {
      title: 'Nuestras Obras | Grupo CPS Uruguay',
      description:
        'Conoce las obras realizadas por Grupo CPS en Uruguay. Proyectos residenciales, comerciales e industriales con carpintería en aluminio y vidriería de calidad.',
    },
    estudio: {
      title: 'Estudio Arquitectónico | Grupo CPS Uruguay',
      description:
        'Servicio integral de arquitectura: anteproyecto, permisos, proyecto ejecutivo y dirección de obra. Grupo CPS, Montevideo, Uruguay.',
    },
    notFound: {
      title: 'Página no encontrada | Grupo CPS Uruguay',
      description: 'La página que estás buscando no existe o ha sido movida.',
    },
  },
  notFound: {
    code: '404',
    title: 'Página no encontrada',
    text: 'Lo sentimos, la página que estás buscando no existe o ha sido movida.',
    cta: 'Volver al Inicio',
  },
};

export type Dictionary = typeof es;

export const en: Dictionary = {
  common: {
    skipToContent: 'Skip to content',
    viewDetails: 'View Details',
    loading: 'Loading...',
    close: 'Close',
    previous: 'Previous',
    next: 'Next',
  },
  nav: {
    inicio: 'Home',
    nosotros: 'About Us',
    obras: 'Projects',
    estudio: 'Studio',
    contacto: 'Contact',
  },
  hero: {
    subtitle: 'Building the future',
    title: 'GRUPO CPS',
    location: 'Montevideo, Uruguay',
    description:
      'Leaders in aluminum carpentry, glasswork, construction and electrical installations in Uruguay',
    stats: {
      years: { value: '10', label: 'Years' },
      aberturas: { value: '5000', label: 'Openings Installed' },
      clients: { value: '50', label: 'Clients' },
    },
    ctaContact: 'Contact Us',
    ctaAbout: 'Learn more',
    scrollHint: 'Scroll',
  },
  about: {
    title: "Over 10 years building Uruguay's future",
    lead: 'We are a Uruguayan company specializing in aluminum carpentry, glasswork, construction and electrical installations.',
    description:
      "With our own DVH plant, we offer comprehensive solutions for corporate, residential and industrial projects. Our commitment is to deliver the highest quality work, meeting deadlines and exceeding our clients' expectations.",
    features: {
      calidad: {
        title: 'Guaranteed Quality',
        text: 'We use top-tier materials and follow strict quality controls in every project.',
      },
      experiencia: {
        title: 'Proven Experience',
        text: 'Over a decade of experience in large-scale projects throughout Uruguay.',
      },
      innovacion: {
        title: 'Constant Innovation',
        text: 'We incorporate the latest technologies and construction techniques to ensure superior results.',
      },
    },
  },
  categories: {
    salud: 'Health',
    educacion: 'Education',
    vivienda: 'Residential',
    obras_publicas: 'Public Works',
    corporativo: 'Corporate',
    instalaciones_electricas: 'Electrical Installations',
  },
  mosaic: {
    title: 'Specialized in multiple industries',
    description: 'We adapt our solutions to the specific needs of each sector',
    cta: 'Explore Our Projects',
  },
  ecommerce: {
    title: 'Need appliances for your home or your next project?',
    description:
      'Discover our exclusive online store featuring the complete line of ENXUTA appliances. Equip your projects with the highest quality appliances.',
    benefits: {
      delivery: 'Nationwide shipping',
      warranty: 'Official warranty',
      brand: 'Complete catalog',
    },
    cta: 'Visit Online Store',
  },
  clients: {
    title: 'Trust that builds relationships',
    description: 'Companies and institutions that have trusted the quality of our work',
  },
  estudioPromo: {
    tag: 'Architecture Studio',
    title: 'Have a project in mind?',
    description:
      'Our architecture studio supports you from the first idea to turnkey delivery. Discover the services we offer: consulting, concept design, permits, construction documentation, construction supervision and more.',
    cta: 'Discover our studio',
  },
  contact: {
    title: "Let's talk about your project",
    description:
      'We are here to answer your questions and help you make your project a reality',
    info: {
      whatsapp: 'WhatsApp',
      email: 'Email',
      address: 'Address',
    },
    form: {
      name: 'Full name',
      email: 'Email address',
      message: 'Tell us about your project',
      submit: 'Send Message',
      sending: 'Sending...',
      success: "Message sent successfully! We'll be in touch soon.",
      error: 'There was an error sending the message. Please try again.',
      honeypotLabel: 'Do not fill in this field',
    },
  },
  footer: {
    description:
      'Leaders in aluminum carpentry, glasswork, construction and electrical installations in Uruguay',
    quickLinks: 'Quick Links',
    rights: 'All rights reserved',
  },
  obrasPage: {
    heroTitle: 'OUR PROJECTS',
    heroDescription:
      'Explore our complete portfolio of projects completed throughout Uruguay. Each project reflects our commitment to excellence and innovation.',
    filterCategoryLabel: 'Filter by category',
    filterStatusLabel: 'Filter by status',
    filterAll: 'All Categories',
    statusAll: 'All Status',
    estados: {
      completada: 'Completed',
      en_progreso: 'In Progress',
    },
    results: '{n} projects',
    resultsOne: '1 project',
    noResultsTitle: 'No projects found',
    noResultsText:
      'There are no projects matching the selected filters. Try different search criteria.',
    modal: {
      description: 'Project description',
      estado: 'Status',
      ubicacion: 'Location',
      superficie: 'Area',
      cliente: 'Client',
    },
  },
  estudio: {
    hero: {
      subtitle: 'ARCHITECTURE STUDIO',
      title: 'From idea to turnkey delivery.',
      ctaPrimary: 'Our services',
      ctaSecondary: 'View real project',
    },
    servicios: {
      title: 'An integrated process',
    },
    steps: [
      {
        number: '01',
        title: 'Initial consulting',
        description:
          'We analyze your site, needs and budget to define project feasibility before committing resources.',
      },
      {
        number: '02',
        title: 'Concept design',
        description:
          'Initial architectural proposal: volume, spatial layout, orientation and materiality.',
      },
      {
        number: '03',
        title: 'Permits and approvals',
        description:
          'We manage filings with the Municipality of Montevideo, including building permits, certificates and approvals.',
      },
      {
        number: '04',
        title: 'Construction documentation',
        description:
          'Complete technical documentation: architectural, structural, plumbing and electrical drawings.',
      },
      {
        number: '05',
        title: 'Construction supervision',
        description:
          'An architect supervises on-site execution, controlling quality, timelines and fidelity to the design.',
      },
      {
        number: '06',
        title: 'Turnkey delivery',
        description:
          'Your project is complete when you receive the keys to a finished, approved space ready to use.',
      },
    ],
    galicia: {
      tag: 'Real Case',
      title: 'Edificio Galicia — From idea to concrete.',
      description:
        'A concrete example of our integrated process: concept design, permit management with the Municipality of Montevideo, construction documentation and construction supervision. 46 residential units in Cordón.',
      cta: 'View project',
    },
  },
  seo: {
    landing: {
      title: 'Grupo CPS Uruguay | Construction and Aluminum Carpentry - DVH, Facades, Glasswork',
      description:
        'Grupo CPS - Leaders in aluminum carpentry, glasswork, construction and electrical installations in Uruguay. 10+ years of experience with our own DVH plant. Corporate, residential and industrial projects.',
    },
    obras: {
      title: 'Our Projects | Grupo CPS Uruguay',
      description:
        'Discover the projects completed by Grupo CPS in Uruguay. Residential, commercial and industrial projects with quality aluminum carpentry and glasswork.',
    },
    estudio: {
      title: 'Architecture Studio | Grupo CPS Uruguay',
      description:
        'Integrated architecture service: concept design, permits, construction documentation and construction supervision. Grupo CPS, Montevideo, Uruguay.',
    },
    notFound: {
      title: 'Page not found | Grupo CPS Uruguay',
      description: 'The page you are looking for does not exist or has been moved.',
    },
  },
  notFound: {
    code: '404',
    title: 'Page not found',
    text: 'Sorry, the page you are looking for does not exist or has been moved.',
    cta: 'Back to Home',
  },
};
