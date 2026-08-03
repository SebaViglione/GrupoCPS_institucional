import { SITE } from './site';

// Portado del JSON-LD legacy con las correcciones de la auditoría:
// sin aggregateRating fabricado, sameAs a las cuentas reales,
// serviceType incluye instalaciones eléctricas, sin numberOfEmployees
// no verificable y sin SearchAction (el sitio no tiene buscador).

const LOGO_URL = `${SITE.url}/assets/images/logos-optimized/logo-navbar.webp`;

export const SERVICE_TYPES = [
  'Carpintería de Aluminio',
  'Vidriería',
  'Construcción',
  'Doble Vidriado Hermético (DVH)',
  'Fachadas Vidriadas',
  'Cerramientos',
  'Instalaciones Eléctricas',
] as const;

const postalAddress = {
  '@type': 'PostalAddress',
  streetAddress: SITE.address.street,
  addressLocality: SITE.address.city,
  addressRegion: 'Montevideo',
  addressCountry: SITE.address.country,
};

export function organizationJsonLd(description: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: SITE.legalName,
    alternateName: 'CPS Construction',
    url: SITE.url,
    logo: LOGO_URL,
    description,
    address: postalAddress,
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'Customer Service',
      email: SITE.email,
      telephone: SITE.phoneDisplay,
      availableLanguage: ['Spanish', 'English'],
    },
    sameAs: [SITE.instagram, SITE.linkedin],
    areaServed: { '@type': 'Country', name: 'Uruguay' },
    serviceType: [...SERVICE_TYPES],
    foundingDate: String(SITE.foundingYear),
  };
}

export function localBusinessJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    '@id': SITE.url,
    name: SITE.legalName,
    image: LOGO_URL,
    url: SITE.url,
    priceRange: '$$',
    telephone: SITE.phoneDisplay,
    email: SITE.email,
    address: postalAddress,
  };
}

export function webSiteJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: SITE.legalName,
    url: SITE.url,
    inLanguage: ['es-UY', 'en'],
  };
}

export function breadcrumbJsonLd(items: { name: string; url: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.name,
      item: item.url,
    })),
  };
}
