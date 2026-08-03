// Normaliza las imágenes de obras que consume astro:assets.
//
// Modo migración (si existe public/assets/images/obras-optimized/):
//   ingiere cada <slug>/N.webp hacia src/assets/obras/<slug>/N.webp
//   con máximo 2000px de ancho y WebP q88.
//
// Modo dueño (uso normal, `npm run prep-obra [slug]`):
//   normaliza in-place lo que haya en src/assets/obras/[slug]/ —
//   convierte a WebP q88 y baja a 2000px lo que sea más grande.
import { existsSync } from 'node:fs';
import { mkdir, readdir, rename, rm, stat } from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';

const MAX_WIDTH = 2000;
const QUALITY = 88;
const LEGACY_DIR = 'public/assets/images/obras-optimized';
const TARGET_DIR = 'src/assets/obras';
const IMAGE_EXT = /\.(webp|jpe?g|png|avif|tiff?)$/i;

async function processInto(srcPath, destPath) {
  const image = sharp(srcPath, { failOn: 'none' });
  const meta = await image.metadata();
  await mkdir(path.dirname(destPath), { recursive: true });
  await image
    .rotate() // respeta EXIF
    .resize({ width: MAX_WIDTH, withoutEnlargement: true })
    .webp({ quality: QUALITY, effort: 6, smartSubsample: true })
    .toFile(destPath);
  const before = (await stat(srcPath)).size;
  const after = (await stat(destPath)).size;
  console.log(
    `${srcPath} (${meta.width}x${meta.height}, ${(before / 1024).toFixed(0)}KB) -> ` +
      `${destPath} (${(after / 1024).toFixed(0)}KB)`
  );
}

async function listSlugs(baseDir, only) {
  const entries = await readdir(baseDir, { withFileTypes: true });
  return entries
    .filter((e) => e.isDirectory() && (!only || e.name === only))
    .map((e) => e.name);
}

const onlySlug = process.argv[2];

if (existsSync(LEGACY_DIR)) {
  console.log(`Modo migración: ${LEGACY_DIR} -> ${TARGET_DIR}`);
  for (const slug of await listSlugs(LEGACY_DIR, onlySlug)) {
    const files = (await readdir(path.join(LEGACY_DIR, slug))).filter((f) => IMAGE_EXT.test(f));
    for (const file of files) {
      const dest = path.join(TARGET_DIR, slug, file.replace(IMAGE_EXT, '.webp'));
      await processInto(path.join(LEGACY_DIR, slug, file), dest);
    }
  }
} else {
  console.log(`Modo normalización in-place: ${TARGET_DIR}`);
  for (const slug of await listSlugs(TARGET_DIR, onlySlug)) {
    const dir = path.join(TARGET_DIR, slug);
    const files = (await readdir(dir)).filter((f) => IMAGE_EXT.test(f));
    for (const file of files) {
      const srcPath = path.join(dir, file);
      const meta = await sharp(srcPath).metadata();
      const isWebp = /\.webp$/i.test(file);
      if (isWebp && (meta.width ?? 0) <= MAX_WIDTH) continue;
      const destPath = path.join(dir, file.replace(IMAGE_EXT, '.webp'));
      const tmpPath = destPath + '.tmp.webp';
      await processInto(srcPath, tmpPath);
      await rm(srcPath);
      await rename(tmpPath, destPath);
    }
  }
}
console.log('Listo.');
