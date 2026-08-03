import { es, en, type Dictionary } from './dictionaries';

export const locales = ['es', 'en'] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = 'es';

const dictionaries: Record<Locale, Dictionary> = { es, en };

/** Diccionario tipado del idioma pedido: `const t = useTranslations(locale)`. */
export function useTranslations(locale: Locale): Dictionary {
  return dictionaries[locale];
}

/**
 * Convierte una ruta sin prefijo de idioma (p. ej. '/obras/') a la ruta
 * del locale pedido. ES es el default sin prefijo; EN vive bajo /en/.
 */
export function localePath(locale: Locale, pagePath: string): string {
  return locale === 'es' ? pagePath : `/en${pagePath}`;
}

export function alternateLocale(locale: Locale): Locale {
  return locale === 'es' ? 'en' : 'es';
}
