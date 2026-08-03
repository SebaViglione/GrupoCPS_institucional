// Genera public/og/preview.jpg (1200x630) para og:image / twitter:image.
// Foto de obra + overlay oscuro + marca. Se corre una vez y se commitea.
import { mkdir } from 'node:fs/promises';
import sharp from 'sharp';

const W = 1200;
const H = 630;
const PHOTO = 'src/assets/obras/summum-wtc/1.webp';
const OUT = 'public/og/preview.jpg';

const overlay = Buffer.from(`
<svg width="${W}" height="${H}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="shade" x1="0" y1="1" x2="0" y2="0">
      <stop offset="0" stop-color="#0a0a0a" stop-opacity="0.92"/>
      <stop offset="0.55" stop-color="#0d0f12" stop-opacity="0.55"/>
      <stop offset="1" stop-color="#0d0f12" stop-opacity="0.25"/>
    </linearGradient>
  </defs>
  <rect width="${W}" height="${H}" fill="url(#shade)"/>
  <rect x="72" y="380" width="120" height="8" fill="#2199d5"/>
  <text x="72" y="470" font-family="DejaVu Sans, Arial, sans-serif" font-size="84" font-weight="bold" fill="#ffffff">GRUPO CPS</text>
  <text x="74" y="530" font-family="DejaVu Sans, Arial, sans-serif" font-size="30" fill="#d7d7db">Construcción · Aluminio · Vidriería · Instalaciones Eléctricas</text>
  <text x="74" y="576" font-family="DejaVu Sans, Arial, sans-serif" font-size="26" fill="#8a9aa4">grupocps.com.uy</text>
</svg>`);

await mkdir('public/og', { recursive: true });
await sharp(PHOTO)
  .resize(W, H, { fit: 'cover', position: 'entropy' })
  .composite([{ input: overlay }])
  .jpeg({ quality: 82, mozjpeg: true })
  .toFile(OUT);

const { size } = await import('node:fs').then((fs) => fs.statSync(OUT));
console.log(`OK ${OUT} (${(size / 1024).toFixed(0)}KB)`);
