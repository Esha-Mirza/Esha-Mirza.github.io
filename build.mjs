/**
 * Production build.
 *
 * The site used to compile itself in the visitor's browser: React, ReactDOM and
 * the full Babel standalone transpiler came off a CDN, then Babel parsed and
 * transformed twelve JSX files at runtime while Tailwind's JIT compiler
 * generated the stylesheet in a fourteenth request. This script does all of that
 * ahead of time and emits two static files.
 *
 *   node build.mjs            build once into dist/
 *   node build.mjs --watch    rebuild on change
 */
import { createHash, randomUUID } from 'node:crypto';
import { createReadStream } from 'node:fs';
import { mkdir, readFile, rm, stat, writeFile } from 'node:fs/promises';
import { spawn } from 'node:child_process';
import { createServer } from 'node:http';
import path from 'node:path';
import process from 'node:process';

import * as esbuild from 'esbuild';

import { buildIconCss } from './scripts/build-icons.mjs';

const ROOT = process.cwd();
const OUT_DIR = path.join(ROOT, 'dist');
const WATCH = process.argv.includes('--watch');
const SERVE = process.argv.includes('--serve');
const PORT = Number(process.env.PORT) || 8080;

const shortHash = (contents) =>
  createHash('sha256').update(contents).digest('hex').slice(0, 10);

const kb = (bytes) => `${(bytes / 1024).toFixed(1)} kB`;

// Invokes the Tailwind CLI's JS entry point through the current Node binary,
// which avoids shelling out to npx (slower, and it needs a shell on Windows).
function runNode(scriptPath, args) {
  return new Promise((resolve, reject) => {
    const child = spawn(process.execPath, [scriptPath, ...args], { cwd: ROOT });
    let stderr = '';
    child.stderr.on('data', (chunk) => { stderr += chunk; });
    child.on('error', reject);
    child.on('close', (code) => {
      if (code === 0) resolve();
      else reject(new Error(`tailwindcss exited with ${code}
${stderr}`));
    });
  });
}

async function buildCss() {
  // Unique per invocation: a watch rebuild can overlap a manual `npm run build`,
  // and a shared temp filename lets one run delete the other's file mid-read.
  const rawPath = path.join(OUT_DIR, `.tailwind.${randomUUID().slice(0, 8)}.css`);

  // Tailwind scans src/ and emits only the utilities the components reference.
  await runNode(path.join(ROOT, 'node_modules', 'tailwindcss', 'lib', 'cli.js'), [
    '--input', 'src/styles/main.css',
    '--output', path.relative(ROOT, rawPath),
    '--minify',
  ]);

  try {
    const tailwind = await readFile(rawPath, 'utf8');
    const { css: icons, count } = await buildIconCss();

    // Icons first: they stand in for lucide.css, which the original page loaded
    // ahead of everything else. esbuild then minifies and merges the two sheets.
    const { code } = await esbuild.transform(`${icons}\n${tailwind}`, {
      loader: 'css',
      minify: true,
    });

    return { css: code, iconCount: count };
  } finally {
    await rm(rawPath, { force: true });
  }
}

async function buildJs() {
  const result = await esbuild.build({
    entryPoints: [path.join(ROOT, 'src', 'main.jsx')],
    bundle: true,
    minify: true,
    format: 'iife',
    // An IIFE rather than an ES module: it keeps the bundle loadable straight
    // from the filesystem, where `type="module"` would trip the CORS rules.
    target: ['es2020', 'chrome80', 'firefox78', 'safari15', 'edge88'],
    jsx: 'automatic',
    define: { 'process.env.NODE_ENV': '"production"' },
    legalComments: 'none',
    write: false,
    metafile: true,
  });

  return {
    js: result.outputFiles[0].text,
    metafile: result.metafile,
  };
}

async function buildHtml({ cssHash, jsHash }) {
  const template = await readFile(path.join(ROOT, 'src', 'index.html'), 'utf8');
  return template
    .replace('__CSS_HASH__', cssHash)
    .replace('__JS_HASH__', jsHash);
}

async function build() {
  const started = Date.now();
  await mkdir(OUT_DIR, { recursive: true });

  const [{ css, iconCount }, { js }] = await Promise.all([buildCss(), buildJs()]);

  const cssHash = shortHash(css);
  const jsHash = shortHash(js);

  await Promise.all([
    writeFile(path.join(OUT_DIR, 'styles.css'), css),
    writeFile(path.join(OUT_DIR, 'app.js'), js),
    buildHtml({ cssHash, jsHash }).then((html) =>
      writeFile(path.join(ROOT, 'index.html'), html)),
  ]);

  console.log(`built in ${Date.now() - started} ms`);
  console.log(`  dist/app.js     ${kb(Buffer.byteLength(js))}`);
  console.log(`  dist/styles.css ${kb(Buffer.byteLength(css))} (${iconCount} icons inlined)`);
}

const MIME = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.woff2': 'font/woff2',
  '.webp': 'image/webp',
  '.png': 'image/png',
  '.jpeg': 'image/jpeg',
  '.jpg': 'image/jpeg',
  '.svg': 'image/svg+xml',
  '.pdf': 'application/pdf',
  '.ico': 'image/x-icon',
};

// A minimal static server for local preview. GitHub Pages serves this same tree
// verbatim, so what you see here is what deploys.
function serve() {
  createServer(async (req, res) => {
    const requested = decodeURIComponent(new URL(req.url, `http://localhost`).pathname);
    const relative = requested === '/' ? 'index.html' : requested.replace(/^\/+/, '');
    const file = path.join(ROOT, relative);

    // Never serve anything outside the project directory.
    if (!file.startsWith(ROOT)) {
      res.writeHead(403).end('Forbidden');
      return;
    }

    try {
      const info = await stat(file);
      if (!info.isFile()) throw new Error('not a file');
      res.writeHead(200, {
        'Content-Type': MIME[path.extname(file).toLowerCase()] || 'application/octet-stream',
        'Content-Length': info.size,
        'Cache-Control': 'no-store',
      });
      createReadStream(file).pipe(res);
    } catch {
      res.writeHead(404, { 'Content-Type': 'text/plain' }).end('Not found');
    }
  }).listen(PORT, () => console.log(`serving http://localhost:${PORT}`));
}

await build();

if (WATCH) {
  const { watch } = await import('node:fs');
  let queued = null;
  let running = Promise.resolve();

  for (const dir of ['src', 'scripts']) {
    watch(path.join(ROOT, dir), { recursive: true }, () => {
      clearTimeout(queued);
      // Chain onto the previous build rather than starting one alongside it.
      queued = setTimeout(() => {
        running = running.then(() => build().catch((err) => console.error(err.message)));
      }, 120);
    });
  }
  console.log('watching src/ for changes...');
}

if (SERVE) serve();
