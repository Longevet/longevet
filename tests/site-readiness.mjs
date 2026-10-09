import { test } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { createRequire } from 'node:module';
import ts from 'typescript';
import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { NextRequest } from 'next/server.js';

const require = createRequire(import.meta.url);
const cache = new Map();
function loadTs(filename) {
  const absolute = path.resolve(filename);
  if (cache.has(absolute)) return cache.get(absolute).exports;
  const compiled = { exports: {} };
  cache.set(absolute, compiled);
  const { outputText } = ts.transpileModule(fs.readFileSync(absolute, 'utf8'), {
    compilerOptions: { module: ts.ModuleKind.CommonJS, jsx: ts.JsxEmit.ReactJSX, target: ts.ScriptTarget.ES2020 },
  });
  const resolve = name => {
    if (!name.startsWith('@/')) return require(name);
    const base = path.resolve('src', name.slice(2));
    const local = [base + '.ts', base + '.tsx'].find(file => fs.existsSync(file));
    assert.ok(local, `Módulo local inexistente: ${name}`);
    return loadTs(local);
  };
  new Function('module', 'exports', 'require', outputText)(compiled, compiled.exports, resolve);
  return compiled.exports;
}

test('El HTML inicial conserva el mensaje principal y una vía de contacto sin animación invisible', () => {
  const { Hero } = loadTs('src/components/sections/hero.tsx');
  const html = renderToStaticMarkup(React.createElement(Hero));
  assert.match(html, /<h1[^>]*id="titulo-inicio"/);
  assert.match(html, /Agendar por WhatsApp/);
  assert.match(html, /href="https:\/\/wa.me\/50671399239/);
  assert.doesNotMatch(html, /opacity:\s*0(?:[;"\s])|visibility:\s*hidden/);
  assert.match(html, /loading="eager"/);
  assert.match(html, /fetchPriority="high"/);
  for (const [, source] of html.matchAll(/<img[^>]+src="([^"]+)"/g)) {
    const url = new URL(source.replaceAll('&amp;', '&'), 'https://example.test');
    const image = url.pathname === '/_next/image' ? url.searchParams.get('url') : url.pathname;
    assert.ok(fs.existsSync(path.join('public', decodeURIComponent(image))), `Imagen inexistente: ${image}`);
  }
});

test('El mantenimiento está apagado por defecto y devuelve 503 sin caché al activarse', () => {
  const { proxy, config } = loadTs('src/proxy.ts');
  const previous = process.env.MAINTENANCE_MODE;
  try {
    delete process.env.MAINTENANCE_MODE;
    const request = new NextRequest('https://example.test/?utm_source=prueba');
    assert.equal(proxy(request).headers.get('x-middleware-next'), '1');
    process.env.MAINTENANCE_MODE = 'true';
    const response = proxy(request);
    assert.equal(response.status, 503);
    assert.equal(response.headers.get('cache-control'), 'no-store');
    assert.equal(response.headers.get('retry-after'), '3600');
    assert.equal(response.headers.get('x-robots-tag'), 'noindex, nofollow');
    assert.equal(response.headers.get('x-middleware-rewrite'), 'https://example.test/mantenimiento');
    assert.deepEqual(config.matcher, ['/', '/privacidad', '/terminos']);
  } finally {
    if (previous === undefined) delete process.env.MAINTENANCE_MODE;
    else process.env.MAINTENANCE_MODE = previous;
  }
});

test('Sin JavaScript el formulario no puede enviar datos personales por un GET nativo', () => {
  const { default: Booking } = loadTs('src/components/booking/booking-section.tsx');
  const html = renderToStaticMarkup(React.createElement(Booking));
  assert.match(html, /<fieldset disabled=""/);
  assert.match(html, /<noscript>/);
  assert.match(html, /href="https:\/\/wa.me\/50671399239/);
  assert.doesNotMatch(html, /<iframe|<input[^>]+value="[^"\s]+"/);
});

test('Todos los enlaces internos de inicio apuntan a secciones existentes y los videos no se cargan solos', () => {
  const { default: Home } = loadTs('src/app/page.tsx');
  const html = renderToStaticMarkup(React.createElement(Home));
  const ids = new Set([...html.matchAll(/\bid="([^"]+)"/g)].map(match => match[1]));
  for (const [, id] of html.matchAll(/href="#([^"]+)"/g)) assert.ok(ids.has(id), `Ancla inexistente: #${id}`);
  assert.doesNotMatch(html, /<iframe/);
  assert.equal([...html.matchAll(/<h1\b/g)].length, 1);
});

test('El optimizador solo acepta imágenes locales de la carpeta publicada y tamaños pequeños de móvil', () => {
  const { default: config } = loadTs('next.config.ts');
  assert.deepEqual(config.images.localPatterns, [{ pathname: '/images/**', search: '' }]);
  assert.ok(config.images.deviceSizes.includes(320));
  assert.ok(config.images.deviceSizes.includes(480));
  assert.ok(config.images.formats.includes('image/webp'));
  assert.equal(config.images.dangerouslyAllowSVG, undefined);
  assert.equal(config.images.remotePatterns, undefined);
});
