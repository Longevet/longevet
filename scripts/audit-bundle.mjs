import fs from 'node:fs';
import path from 'node:path';
import zlib from 'node:zlib';

const html = fs.readFileSync('.next/server/app/index.html', 'utf8');
const scripts = [...new Set([...html.matchAll(/<script[^>]+src="([^"]+)"/g)].map(match => match[1]))];
let total = 0;
for (const url of scripts) {
  const file = path.join('.next', url.replace(/^\/_next\//, ''));
  if (!fs.existsSync(file)) continue;
  const size = zlib.gzipSync(fs.readFileSync(file)).length;
  total += size;
  console.log(`${url}: ${(size / 1024).toFixed(1)} KiB gzip`);
}
console.log(`Scripts referenciados por inicio: ${(total / 1024).toFixed(1)} KiB gzip`);
console.log(`HTML de inicio: ${(Buffer.byteLength(html) / 1024).toFixed(1)} KiB sin compresión`);
console.log('Inventario de compilación; no mide tiempos de carga ni incluye recursos diferidos, imágenes o respuestas RSC.');
