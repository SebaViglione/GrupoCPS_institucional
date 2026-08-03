import { z } from 'astro/zod';
import type { ImageMetadata } from 'astro';
import rawObras from '../data/obras.json';
import type { Locale } from '../i18n';

export const CATEGORIAS = [
  'salud',
  'educacion',
  'vivienda',
  'obras_publicas',
  'corporativo',
  'instalaciones_electricas',
] as const;
export type Categoria = (typeof CATEGORIAS)[number];

export const ESTADOS = ['Completada', 'En Progreso'] as const;
export type Estado = (typeof ESTADOS)[number];

const obraSchema = z.object({
  id: z.number().int(),
  nombre: z.string().min(1),
  nombre_en: z.string().min(1),
  descripcion: z.string().min(1),
  descripcion_en: z.string().min(1),
  estado: z.enum(ESTADOS),
  cliente: z.string().min(1),
  cliente_en: z.string().min(1),
  ubicacion: z.string().min(1),
  ubicacion_en: z.string().min(1),
  categoria: z.enum(CATEGORIAS),
  superficie: z.string().min(1),
  imagenes: z.array(z.string()).min(1),
  videos: z.array(z.string()).optional(),
});

export type Obra = z.infer<typeof obraSchema>;

const parseResult = z.array(obraSchema).safeParse(rawObras);
if (!parseResult.success) {
  throw new Error(
    `src/data/obras.json inválido:\n${parseResult.error.issues
      .map((i) => `  - obras[${i.path.join('.')}]: ${i.message}`)
      .join('\n')}`
  );
}
export const obras: Obra[] = parseResult.data;

const imageModules = import.meta.glob<{ default: ImageMetadata }>(
  '../assets/obras/**/*.webp',
  { eager: true }
);

/** Resuelve un path relativo de obras.json (p. ej. 'hospital-cerro/1.webp') a su ImageMetadata. */
export function obraImage(relPath: string): ImageMetadata {
  const mod = imageModules[`../assets/obras/${relPath}`];
  if (!mod) {
    throw new Error(
      `obras.json referencia una imagen que no existe: src/assets/obras/${relPath}`
    );
  }
  return mod.default;
}

// Validación en build: cada imagen declarada debe existir en src/assets/obras/.
for (const obra of obras) {
  for (const img of obra.imagenes) obraImage(img);
}

/** Campos localizados de una obra según el idioma. */
export function localizedObra(obra: Obra, locale: Locale) {
  const en = locale === 'en';
  return {
    nombre: en ? obra.nombre_en : obra.nombre,
    descripcion: en ? obra.descripcion_en : obra.descripcion,
    cliente: en ? obra.cliente_en : obra.cliente,
    ubicacion: en ? obra.ubicacion_en : obra.ubicacion,
  };
}

/** Categorías con al menos una obra, en el orden canónico. Las vacías no generan filtro. */
export function categoriesWithObras(): Categoria[] {
  return CATEGORIAS.filter((c) => obras.some((o) => o.categoria === c));
}

/** 'Completada' -> 'completada', 'En Progreso' -> 'en-progreso' (para clases CSS). */
export function estadoSlug(estado: Estado): string {
  return estado.toLowerCase().replace(/\s+/g, '-');
}
