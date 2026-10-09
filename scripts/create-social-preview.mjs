import sharp from 'sharp';

const photo = await sharp('public/images/asset (1).png').resize(500, 630, { fit: 'cover', position: 'north' }).toBuffer();
const label = Buffer.from(`<svg width="1200" height="630" xmlns="http://www.w3.org/2000/svg">
  <rect width="700" height="630" fill="#faf7f2"/>
  <rect x="52" y="64" width="58" height="5" rx="2" fill="#237e73"/>
  <g font-family="Arial, sans-serif">
    <text x="52" y="113" font-size="24" font-weight="700" fill="#237e73" letter-spacing="3">LONGEVET</text>
    <text x="52" y="216" font-size="49" font-weight="700" fill="#0d3b66">Medicina geriátrica</text>
    <text x="52" y="276" font-size="49" font-weight="700" fill="#0d3b66">veterinaria en casa</text>
    <text x="52" y="362" font-size="28" font-weight="700" fill="#2e3d4d">Dra. Junibeth González Ramírez</text>
    <text x="52" y="412" font-size="26" fill="#4c5d6b">Cartago · San José, Costa Rica</text>
    <text x="52" y="523" font-size="24" font-weight="700" fill="#1f7a70">Atención a domicilio con cita</text>
    <text x="52" y="567" font-size="21" fill="#4c5d6b">Colegiada #002640</text>
  </g>
</svg>`);
await sharp({ create: { width: 1200, height: 630, channels: 3, background: '#faf7f2' } })
  .composite([{ input: photo, left: 700, top: 0 }, { input: label, left: 0, top: 0 }])
  .jpeg({ quality: 85, mozjpeg: true })
  .toFile('public/images/social-preview.jpg');
