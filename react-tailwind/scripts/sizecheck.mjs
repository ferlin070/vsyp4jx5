#!/usr/bin/env node
/**
 * Size checker — sums raw bytes of all source files and warns if over a limit.
 * Usage: node scripts/sizecheck.mjs [limit-in-kb]   (npm run size -- 40)
 * Default limit: 64 (KB) — the template's own floor with demo + tests + docs.
 * Competitors pass their competition cap explicitly, e.g. `npm run size -- 40`.
 *
 * Not counted: images, fonts, video, markdown (except root README),
 * lock files, deploy configs, node_modules, dist, scripts, .github.
 */

import { readdirSync, statSync } from 'node:fs';
import { join, extname } from 'node:path';

const ROOT = process.cwd();
const LIMIT_KB = Number(process.argv[2] ?? 64);
const LIMIT_BYTES = LIMIT_KB * 1024;

const SKIP_DIRS = new Set(['node_modules', 'dist', '.git', '.github', 'scripts', 'coverage', 'react-tailwind', 'designs']);
const SKIP_FILES = new Set(['package-lock.json', 'pnpm-lock.yaml', 'yarn.lock', 'vercel.json', 'netlify.toml']);
const SKIP_EXT = new Set([
  '.png', '.jpg', '.jpeg', '.gif', '.svg', '.ico',
  '.woff', '.woff2', '.ttf', '.otf',
  '.mp4', '.webm', '.webp',
  '.lock', '.md', // md is free except root README
]);
const COUNT_EXT = new Set(['.ts', '.tsx', '.js', '.jsx', '.css', '.html', '.json', '.vue', '.svelte']);

let total = 0;
const files = [];

function walk(dir) {
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    if (SKIP_DIRS.has(entry.name)) continue;
    const full = join(dir, entry.name);
    if (entry.isDirectory()) {
      walk(full);
    } else {
      if (SKIP_FILES.has(entry.name)) continue;
      const ext = extname(entry.name).toLowerCase();
      // Root README is counted, other .md files are free
      const isRootReadme = entry.name.toLowerCase() === 'readme.md' && dir === ROOT;
      if (!COUNT_EXT.has(ext) && !isRootReadme) continue;

      const size = statSync(full).size;
      total += size;
      files.push({ path: full.replace(ROOT + '/', ''), size });
    }
  }
}

walk(ROOT);

files.sort((a, b) => b.size - a.size);

console.log('\n📦 Source size report\n');
for (const f of files) {
  console.log(`  ${String(f.size).padStart(7)}  ${f.path}`);
}
console.log(`\n  ${'─'.repeat(40)}`);
console.log(`  ${String(total).padStart(7)}  TOTAL (${(total / 1024).toFixed(1)} KB)`);
console.log(`  ${String(LIMIT_BYTES).padStart(7)}  LIMIT (${LIMIT_KB} KB)`);
console.log(`  ${String(LIMIT_BYTES - total).padStart(7)}  ${total <= LIMIT_BYTES ? '✅ UNDER LIMIT' : '❌ OVER LIMIT'}`);

if (total > LIMIT_BYTES) {
  console.log('\n  ⚠️  Trim source files to get under the cap!\n');
  process.exit(1);
}
