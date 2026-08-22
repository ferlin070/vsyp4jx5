#!/usr/bin/env node
/**
 * init (React variant) — turn the pristine react-tailwind template into a real
 * app scaffold. Replaces the demo App.tsx with a clean CRUD shell wired to
 * useLocalStorage + Modal + useAnnounce, creates domain stubs, renames the
 * package, updates the index.html title, and marks the repo as derived.
 *
 * Usage: node scripts/init.mjs [app-name]
 */
import { existsSync, readFileSync, writeFileSync, mkdirSync, rmSync } from 'node:fs';
import { join } from 'node:path';
import { spawnSync } from 'node:child_process';

const ROOT = process.cwd();
const name = process.argv[2] ?? 'my-app';

if (existsSync(join(ROOT, '.ponytail-ready'))) {
  console.log('  [init] Already scaffolded (.ponytail-ready exists). Nothing to do.');
  process.exit(0);
}

// Demo-specific tests reference the demo App internals — remove them, keep the
// lib tests (hooks/storage/modal) which test the reusable weapons.
for (const demoTest of ['src/tests/app.test.tsx', 'src/tests/validate.test.ts']) {
  const p = join(ROOT, demoTest);
  if (existsSync(p)) rmSync(p);
}

const pkgPath = join(ROOT, 'package.json');
const pkg = JSON.parse(readFileSync(pkgPath, 'utf8'));
pkg.name = name.replace(/[^a-z0-9-_]/gi, '').toLowerCase() || 'my-app';
writeFileSync(pkgPath, JSON.stringify(pkg, null, 2) + '\n');

// domain stubs (never overwrite existing)
mkdirSync(join(ROOT, 'src'), { recursive: true });
writeFileSync(join(ROOT, 'src/types.ts'), `// Domain types — the single source of truth for your app.\n`);
writeFileSync(join(ROOT, 'src/domain.ts'), `// Pure domain logic: validation, stats, formatting. Side-effect free + unit-tested.\n`);
writeFileSync(join(ROOT, 'src/store.ts'), `// Persistence: export your type guard, feed it to useLocalStorage from ./lib/hooks.\n`);

// fresh App.tsx (wires the weapons, empty CRUD shell)
writeFileSync(join(ROOT, 'src/App.tsx'), `import { useState } from 'react';
import { useLocalStorage, useAnnounce } from './lib/hooks';
import { Modal, useModal } from './lib/modal';

export interface Item {
  id: string;
  name: string;
  createdAt: number;
}

export function isItem(v: unknown): v is Item {
  if (typeof v !== 'object' || v === null) return false;
  const o = v as Record<string, unknown>;
  return typeof o.id === 'string' && typeof o.name === 'string' && typeof o.createdAt === 'number';
}

export function App() {
  const { items, loading, error, setItems, dismissError } = useLocalStorage<Item>('app:v1', isItem);
  const announce = useAnnounce();
  const [name, setName] = useState('');
  const confirm = useModal();
  const [pending, setPending] = useState<Item | null>(null);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const n = name.trim();
    if (!n) return;
    setItems((prev) => [{ id: crypto.randomUUID(), name: n, createdAt: Date.now() }, ...prev]);
    announce('Item added.');
    setName('');
  };

  const doDelete = () => {
    if (!pending) return;
    setItems((prev) => prev.filter((i) => i.id !== pending.id));
    announce('Item deleted.');
    confirm.close();
    setPending(null);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <span className="sr-only">Loading...</span>
      </div>
    );
  }

  return (
    <div className="min-h-screen max-w-3xl mx-auto px-4 py-6">
      <header aria-label="Page header" className="mb-6">
        <h1 className="text-2xl font-bold">{'${pkg.name}'}</h1>
      </header>

      {error && (
        <div role="alert" className="bg-danger/10 border border-danger/30 rounded-lg p-3 mb-4 flex justify-between">
          <span>{error}</span>
          <button onClick={dismissError} aria-label="Dismiss warning">x</button>
        </div>
      )}

      <main aria-label="Main content" className="bg-surface border border-border rounded-xl p-5">
        <form onSubmit={submit} aria-label="Add item" className="flex gap-2 mb-4">
          <div className="flex-1">
            <label htmlFor="name" className="text-text-soft text-xs">Name</label>
            <input id="name" value={name} onChange={(e) => setName(e.target.value)} className="w-full bg-surface-alt border border-border rounded-lg px-3 py-2" />
          </div>
          <button type="submit" className="bg-primary hover:bg-primary-hover text-white rounded-lg px-4 self-end">Add</button>
        </form>

        <ul aria-label="Items list" className="space-y-2">
          {items.map((i) => (
            <li key={i.id} className="flex justify-between gap-3 bg-surface-alt/50 rounded-lg p-3">
              <span className="text-sm">{i.name}</span>
              <button onClick={() => { setPending(i); confirm.open(); }} aria-label={'Delete ' + i.name} className="text-danger text-xs">Delete</button>
            </li>
          ))}
        </ul>
        {items.length === 0 && <p className="text-text-soft text-sm text-center py-6">Nothing yet. Add your first item.</p>}
      </main>

      <Modal isOpen={confirm.isOpen} onClose={confirm.close} labelledBy="confirm-title">
        <h2 id="confirm-title" className="font-semibold text-sm">Delete item?</h2>
        <p className="text-text-soft text-sm mt-1 mb-4">This can't be undone.</p>
        <div className="flex gap-2 justify-end">
          <button onClick={confirm.close} className="border border-border text-text-soft text-sm rounded-lg px-4 py-2">Cancel</button>
          <button onClick={doDelete} className="bg-danger hover:bg-danger-hover text-white text-sm rounded-lg px-4 py-2">Delete</button>
        </div>
      </Modal>
    </div>
  );
}
`);

// index.html title
const htmlPath = join(ROOT, 'index.html');
if (existsSync(htmlPath)) {
  writeFileSync(htmlPath, readFileSync(htmlPath, 'utf8').replace(/<title>.*?<\/title>/, `<title>${pkg.name}</title>`));
}

// derived marker
writeFileSync(join(ROOT, '.ponytail-ready'), '# Derived app scaffolded by react-tailwind/scripts/init.mjs\n');

console.log(`  [init] ✅ Scaffolded "${pkg.name}" (React).`);
console.log('  [init] Next:');
console.log('      1. Edit src/types.ts + src/domain.ts — your domain model');
console.log('      2. Edit src/store.ts — export isItem type guard');
console.log('      3. Fill src/App.tsx (form fields, list, events)');
console.log('      4. npm run verify  →  push');

spawnSync('npm', ['install', '--no-audit', '--no-fund'], { stdio: 'inherit', shell: process.platform === 'win32' });