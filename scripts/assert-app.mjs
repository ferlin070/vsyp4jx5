#!/usr/bin/env node
/**
 * Assert the app is a real product, not the untouched template.
 *
 * In the pristine template this check is skipped (the demo is expected).
 * Once `scripts/init.mjs` scaffolds a real app it writes `.ponytail-ready`,
 * and from then on this script FAILS the build if any demo markers remain.
 *
 * Usage: node scripts/assert-app.mjs
 * Exit 1 = demo markers found in a derived app (block the push).
 */
import { readdirSync, statSync, existsSync, readFileSync } from 'node:fs';
import { join, extname } from 'node:path';

const ROOT = process.cwd();
const MARKERS = ['DEMO APP', 'your-username', 'Ponytail Pro Max', 'TODO: replace'];
const SRC = ['ts', 'tsx', 'js', 'jsx', 'html'];

if (!existsSync(join(ROOT, '.ponytail-ready'))) {
  console.log('  [assert-app] Pristine template — demo guard skipped.');
  process.exit(0);
}

const hits = [];
function walk(dir) {
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    if (['node_modules', 'dist', '.git', 'designs'].includes(entry.name)) continue;
    const full = join(dir, entry.name);
    if (entry.isDirectory()) { walk(full); continue; }
    if (!SRC.includes(extname(entry.name).slice(1))) continue;
    const content = readFileSync(full, 'utf8');
    for (const marker of MARKERS) {
      if (content.includes(marker)) hits.push(`${full.replace(ROOT + '/', '')} contains "${marker}"`);
    }
  }
}
walk(join(ROOT, 'src'));
const html = join(ROOT, 'index.html');
if (existsSync(html) && readFileSync(html, 'utf8').includes('Ponytail Pro Max')) {
  hits.push('index.html title still says Ponytail Pro Max');
}

if (hits.length > 0) {
  console.error('\n  [assert-app] ❌ DEMO MARKERS FOUND — this looks like the untouched template.\n');
  for (const h of hits) console.error('    - ' + h);
  console.error('\n  Run `node scripts/init.mjs` to scaffold a real app, or replace the demo.\n');
  process.exit(1);
}
console.log('  [assert-app] ✅ No demo markers — this is a real app.');