#!/usr/bin/env node
/**
 * init — turn the pristine template into a real app scaffold.
 *
 * Replaces the demo `src/main.ts` with a clean CRUD skeleton that already
 * wires the 7 weapons (storage + state + render + a11y), creates the
 * `types`/`schema`/`storage` module stubs, renames the package, and marks
 * the repo as derived (so `assert-app` starts guarding for demo markers).
 *
 * Usage: node scripts/init.mjs [app-name]
 * Example: node scripts/init.mjs my-inventory-log
 */
import { existsSync, readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { join } from 'node:path';
import { spawnSync } from 'node:child_process';

const ROOT = process.cwd();
const name = process.argv[2] ?? 'my-app';

if (existsSync(join(ROOT, '.ponytail-ready'))) {
  console.log('  [init] Already scaffolded (.ponytail-ready exists). Nothing to do.');
  process.exit(0);
}

// 1. package.json name
const pkgPath = join(ROOT, 'package.json');
const pkg = JSON.parse(readFileSync(pkgPath, 'utf8'));
pkg.name = name.replace(/[^a-z0-9-_]/gi, '').toLowerCase() || 'my-app';
writeFileSync(pkgPath, JSON.stringify(pkg, null, 2) + '\n');

// 2. module stubs
mkdirSync(join(ROOT, 'src'), { recursive: true });
writeFileSync(join(ROOT, 'src/types.ts'), `// Domain types — the single source of truth for your app.\n`);
writeFileSync(join(ROOT, 'src/schema.ts'), `// Pure domain logic: validation, stats, formatting. Side-effect free + unit-tested.\n`);
writeFileSync(join(ROOT, 'src/storage.ts'), `// Persistence: createStore from ./lib/storage + your type guard.\n`);

// 3. fresh main.ts (wires the weapons, empty CRUD shell)
writeFileSync(join(ROOT, 'src/main.ts'), `/**
 * ${pkg.name} — app entry. Landmarks, aria labels, error handling, loading
 * state are pre-wired. Replace the placeholder logic below.
 */

import './lib/style.css';
import { createState } from './lib/state';
import { createStore } from './lib/storage';
import { escapeHtml } from './lib/render';
import { announce } from './lib/a11y';
import { $ } from './lib/dom';
import { isString } from './lib/validate';

interface Item {
  id: string;
  name: string;
  createdAt: number;
}

function isItem(v: unknown): v is Item {
  if (typeof v !== 'object' || v === null) return false;
  const o = v as Record<string, unknown>;
  return isString(o.id) && isString(o.name) && typeof o.createdAt === 'number';
}

const store = createStore<Item>('${pkg.name}:v1', isItem);
const { getState, setState } = createState({ items: [] as Item[], loading: false, error: null as string | null });
const root = $('#app');

function render(): void {
  if (!root) return;
  const { items, error } = getState();
  root.innerHTML = \`
    <div class="app">
      <header aria-label="Page header">
        <h1>${pkg.name}</h1>
      </header>
      <main aria-label="Main content">
        \${error ? \`<div class="error-banner" role="alert"><span>\${escapeHtml(error)}</span>
          <button class="error-banner__close" data-action="dismiss-error" aria-label="Dismiss">\\u00d7</button></div>\` : ''}
        <form id="add-form" aria-label="Add item">
          <div class="field">
            <label for="name">Name</label>
            <input id="name" name="name" type="text" required class="input" />
          </div>
          <button type="submit" class="btn btn--primary">Add</button>
        </form>
        <ul aria-label="Items list">
          \${items.map(i => \`<li>\${escapeHtml(i.name)}\` +
            \` <button class="btn btn--ghost btn--danger" data-action="delete" data-id="\${i.id}" aria-label="Delete \${escapeHtml(i.name)}">Delete</button></li>\`).join('')}
        </ul>
        \${items.length === 0 ? '<div class="empty">Nothing yet. Add your first item.</div>' : ''}
      </main>
    </div>\`;
}

function persist(): void {
  const r = store.save(getState().items);
  if (!r.ok) setState({ error: r.error ?? 'Save failed.' });
}

function boot(): void {
  if (!root) return;
  const result = store.load();
  setState({ items: result.data, loading: false });
  if (result.error) setState({ error: result.error });

  document.addEventListener('submit', (e) => {
    const form = e.target as HTMLElement;
    if (form.id !== 'add-form') return;
    e.preventDefault();
    const input = $('#name') as HTMLInputElement | null;
    const value = input?.value.trim();
    if (!value) return;
    const item: Item = { id: crypto.randomUUID(), name: value, createdAt: Date.now() };
    setState(s => ({ items: [item, ...s.items] }));
    persist(); announce('Item added.'); render();
    if (input) input.value = '';
  });

  document.addEventListener('click', (e) => {
    const target = (e.target as HTMLElement).closest('[data-action]') as HTMLElement | null;
    if (!target) return;
    const action = target.dataset.action;
    if (action === 'dismiss-error') { setState({ error: null }); render(); }
    else if (action === 'delete' && target.dataset.id) {
      setState(s => ({ items: s.items.filter(i => i.id !== target.dataset.id) }));
      persist(); announce('Item deleted.'); render();
    }
  });

  // offline PWA: register the service worker (progressive enhancement)
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/sw.js').catch(() => {});
  }

  render();
}

boot();
`);

// 4. index.html title (assert-app guards against the template title)
const htmlPath = join(ROOT, 'index.html');
if (existsSync(htmlPath)) {
  writeFileSync(
    htmlPath,
    readFileSync(htmlPath, 'utf8').replace(/<title>.*?<\/title>/, `<title>${pkg.name}</title>`),
  );
}

// 4b. axe scan harness hardcodes the template title — patch it too
const scanPath = join(ROOT, 'src/tests/a11y.scan.test.ts');
if (existsSync(scanPath)) {
  writeFileSync(
    scanPath,
    readFileSync(scanPath, 'utf8').replace(/document\.title = '[^']*';/, `document.title = '${pkg.name}';`),
  );
}

// 5. derived marker
writeFileSync(join(ROOT, '.ponytail-ready'), '# Derived app scaffolded by scripts/init.mjs\n');

console.log(`  [init] ✅ Scaffolded "${pkg.name}".`);
console.log('  [init] Next:');
console.log('      1. Edit src/types.ts  — your domain model');
console.log('      2. Edit src/schema.ts — pure domain logic + tests');
console.log('      3. Edit src/storage.ts — type guard + store');
console.log('      4. Fill src/main.ts render()/events');
console.log('      5. npm run verify  →  push');

// best-effort regenerate lockfile name (Windows resolves npm as npm.cmd — shell:true portable)
spawnSync('npm', ['install', '--no-audit', '--no-fund'], { stdio: 'inherit', shell: process.platform === 'win32' });