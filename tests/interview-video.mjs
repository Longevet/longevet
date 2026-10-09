import { test } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import { createRequire } from 'node:module';
import ts from 'typescript';
import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';

test('La CSP permite el reproductor y la portada de YouTube, sin abrir todos los orígenes', async () => {
  const require = createRequire(import.meta.url);
  function load(path, started = false) {
    const { outputText } = ts.transpileModule(fs.readFileSync(path, 'utf8'), {
      compilerOptions: { module: ts.ModuleKind.CommonJS, jsx: ts.JsxEmit.ReactJSX, target: ts.ScriptTarget.ES2020 },
    });
    const compiled = { exports: {} };
    const customRequire = name => name === 'react' ? { ...React, useState: () => [started, () => {}] } : require(name);
    new Function('module', 'exports', 'require', outputText)(compiled, compiled.exports, customRequire);
    return compiled.exports;
  }
  const config = load('next.config.ts').default;
  const headers = (await config.headers())[0].headers;
  const policy = headers.find(header => header.key === 'Content-Security-Policy').value;
  const directives = Object.fromEntries(policy.split(';').map(directive => {
    const [name, ...origins] = directive.trim().split(/\s+/);
    return [name, origins];
  }));
  const props = { videoId: 'zs8bupVZSKQ', title: 'Entrevista Extra Tv' };
  const initial = renderToStaticMarkup(React.createElement(load('src/components/sections/interview-video.tsx').YoutubeVideo, props));
  assert.doesNotMatch(initial, /<iframe/);
  const thumbnail = new URL(initial.match(/<img[^>]+src="([^"]+)"/)[1]);
  assert.equal(thumbnail.pathname, '/vi/zs8bupVZSKQ/hqdefault.jpg');
  assert.ok(directives['img-src'].includes(thumbnail.origin));
  const started = renderToStaticMarkup(React.createElement(load('src/components/sections/interview-video.tsx', true).YoutubeVideo, props));
  const frame = new URL(started.match(/<iframe[^>]+src="([^"]+)"/)[1]);
  assert.ok(directives['frame-src'].includes(frame.origin));
  assert.deepEqual(directives['frame-src'], ['https://www.dailymotion.com', 'https://www.youtube-nocookie.com']);
  assert.deepEqual(directives['frame-ancestors'], ["'none'"]);
});

test('Si falla la miniatura, la portada conserva el título y permite reproducir sin reintentar la imagen', () => {
  const source = fs.readFileSync('src/components/sections/interview-video.tsx', 'utf8');
  const { outputText } = ts.transpileModule(source, {
    compilerOptions: { module: ts.ModuleKind.CommonJS, jsx: ts.JsxEmit.ReactJSX, target: ts.ScriptTarget.ES2020 },
  });
  const require = createRequire(import.meta.url);
  const states = [];
  let cursor = 0;
  const customRequire = name => name === 'react' ? {
    ...React,
    useState(initial) {
      const index = cursor++;
      if (!(index in states)) states[index] = initial;
      return [states[index], value => { states[index] = value; }];
    },
  } : require(name);
  const compiled = { exports: {} };
  new Function('module', 'exports', 'require', outputText)(compiled, compiled.exports, customRequire);
  const props = { videoId: 'zs8bupVZSKQ', title: 'Entrevista en Extra Tv' };
  function render() { cursor = 0; return compiled.exports.YoutubeVideo(props); }
  const first = render();
  const button = first.props.children;
  const img = React.Children.toArray(button.props.children).find(child => child.type === 'img');
  img.props.onError();
  const fallback = render();
  const html = renderToStaticMarkup(fallback);
  assert.doesNotMatch(html, /<img|<iframe/);
  assert.match(html, /Entrevista en Extra Tv/);
  assert.match(html, /Reproducir entrevista/);
  fallback.props.children.props.onClick();
  const playing = renderToStaticMarkup(render());
  assert.match(playing, /<iframe/);
  assert.match(playing, /youtube-nocookie.com\/embed\/zs8bupVZSKQ/);
});

test('La entrevista muestra una portada y no carga el reproductor antes de un clic', () => {
  const source = fs.readFileSync('src/components/sections/interview-video.tsx', 'utf8');
  const { outputText } = ts.transpileModule(source, {
    compilerOptions: { module: ts.ModuleKind.CommonJS, jsx: ts.JsxEmit.ReactJSX, target: ts.ScriptTarget.ES2020 },
  });
  const compiled = { exports: {} };
  new Function('module', 'exports', 'require', outputText)(compiled, compiled.exports, createRequire(import.meta.url));
  const html = renderToStaticMarkup(React.createElement(compiled.exports.InterviewVideo));
  assert.doesNotMatch(html, /<iframe|<video|<audio/);
  assert.match(html, /<button[^>]*aria-label="Reproducir entrevista/);
  assert.match(html, /thumbnail\/video\/x9u4q44/);
});
