import type { Categoria } from '../lib/obras';

/**
 * Imagen representativa de cada tile del mosaico de sectores en la landing
 * (path relativo dentro de src/assets/obras/). `null` = sin foto todavía:
 * el tile se renderiza con gradiente + ícono (caso instalaciones eléctricas).
 */
export const mosaicImages: Record<Categoria, string | null> = {
  salud: 'hospital-cerro/1.webp',
  educacion: 'facultad-enfermeria/1.webp',
  vivienda: 'proa-carrasco/1.webp',
  obras_publicas: 'congreso-intendentes/1.webp',
  corporativo: 'summum-wtc/1.webp',
  instalaciones_electricas: null,
};
