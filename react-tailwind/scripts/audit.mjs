#!/usr/bin/env node
/**
 * audit (React variant) — self-score against the competition rubric.
 * Same heuristic checks as the root variant, tuned for React + Tailwind.
 *
 * Usage: node scripts/audit.mjs [limit-kb]   (npm run audit)
 * Exit code is always 0 unless --fail is passed.
 */
import { readdirSync, statSync, readFileSync, existsSync } from 'node:fs';
import { join } from 'node:path';

const ROOT = process.cwd();
const FAIL = process.argv.includes('--fail');

function readAll(dir) {
  const out = [];
  function walk(d) {
    for (const e of readdirSync(d, { withFileTypes: true })) {
      if (['node_modules', 'dist', '.git', 'designs'].includes(e.name)) continue;
      const full = join(d, e.name);
      if (e.isDirectory()) walk(full);
      else if (/\.(ts|tsx|js|jsx|html)$/.test(e.name)) out.push(readFileSync(full, 'utf8'));
    }
  }
  walk(dir);
  return out.join('\n');
}

const src = readAll(join(ROOT, 'src'));
const lower = src.toLowerCase();

// ---- Completeness ----
const c = [];
c.push(['Add flow', /submit|onSubmit|handleAdd|setItems\(/, src]);
c.push(['Edit flow', /edit|update|handleEdit|setEditing/, src]);
c.push(['Delete flow', /delete|remove|handleDelete/, src]);
c.push(['Persistence', /localStorage|createStore|useLocalStorage/, src]);
c.push(['Seed data', /makeSeed|seedItems|seedData/, src]);
c.push(['Error handling', /role="alert"|error-banner/, src]);
c.push(['Empty state', /nothing yet|empty|no items|tiada item|belum ada/i, src]);
c.push(['Loading state', /loading|spinner|memuat/, src]);
const completeness = Math.round(c.filter(([, ok]) => ok).length / c.length * 100);

// ---- P&S Design ----
const d = [];
d.push(['Landmark regions', /<header aria-label|<main aria-label|<section aria-label/, src]);
d.push(['Input labels', /<label[^>]*for=|<label[^>]*htmlFor=|aria-label=/, src]);
d.push(['Modal focus mgmt', /trapFocus|openModal|focus\(\)|useModal|Modal/, src]);
d.push(['sr-only utility', /sr-only|\.sr-only/, src]);
d.push(['Reduced motion', /prefers-reduced-motion/, src]);
d.push(['Real buttons', /<button/, src]);
const design = Math.round(d.filter(([, ok]) => ok).length / d.length * 100);

// ---- Technical Craft ----
const t = [];
const tsconfig = existsSync(join(ROOT, 'tsconfig.json')) ? readFileSync(join(ROOT, 'tsconfig.json'), 'utf8') : '';
const modular = ['types.ts', 'domain.ts', 'store.ts'].filter((f) => existsSync(join(ROOT, 'src', f))).length >= 2;
t.push(['TypeScript strict', /"strict"\s*:\s*true/.test(tsconfig)]);
t.push(['Modular files (types/domain/store)', modular]);
t.push(['Unit tests present', /describe\(|it\(|test\(/.test(src)]);
t.push(['No raw innerHTML (JSX escapes by default)', !/\binnerHTML\s*=/.test(src)]);
t.push(['No leftover console.log/debugger', !/\bconsole\.log\b|\bdebugger\b/.test(src)]);
const craft = Math.round(t.filter(([, ok]) => ok).length / t.length * 100);

// ---- byte cap ----
const cap = Number(process.argv[2] ?? 64);
const SKIP_FILES = new Set(['package-lock.json', 'pnpm-lock.yaml', 'yarn.lock', 'vercel.json', 'netlify.toml']);
let total = 0;
function bytes(d) {
  for (const e of readdirSync(d, { withFileTypes: true })) {
    if (['node_modules', 'dist', '.git', 'designs'].includes(e.name)) continue;
    const full = join(d, e.name);
    if (e.isDirectory()) bytes(full);
    else if (SKIP_FILES.has(e.name)) continue;
    else if (/\.(ts|tsx|js|jsx|json)$/.test(e.name) || e.name === 'index.html' || e.name === 'README.md') total += statSync(full).size;
  }
}
bytes(ROOT);
const underCap = total <= cap * 1024;

console.log('\n  ── Ponytail React self-audit ──');
console.log(`  Completeness   ${String(completeness).padStart(3)}/100`);
for (const [label, ok] of c) console.log(`    ${ok ? '✅' : '❌'} ${label}`);
console.log(`  P&S Design     ${String(design).padStart(3)}/100`);
for (const [label, ok] of d) console.log(`    ${ok ? '✅' : '❌'} ${label}`);
console.log(`  Technical Craft ${String(craft).padStart(3)}/100`);
for (const [label, ok] of t) console.log(`    ${ok ? '✅' : '❌'} ${label}`);
console.log(`  Size           ${total} bytes / ${cap * 1024} (${underCap ? '✅' : '❌'})`);
const avg = Math.round((completeness + design + craft) / 3);
console.log(`\n  Estimated score: ${avg}/100 — focus on the ❌ rows above.`);

if (FAIL && (completeness < 60 || design < 60 || craft < 60 || !underCap)) {
  console.log('  ✘ AUDIT FAILED (--fail)');
  process.exit(1);
}
console.log('  (advisory — exit 0. Use --fail to gate CI.)');