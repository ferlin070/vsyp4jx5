#!/usr/bin/env node
/**
 * scaffold — one command from blank clone to working app.
 * Runs: brief (PRD + DESIGN + domain model) → seed (realistic data) → README header.
 *
 * Usage: npm run scaffold "your brief" [design] [seed-count]
 * Example: npm run scaffold "Expense tracker with CSV export in Malay" fintech 8
 */
import { spawnSync } from 'node:child_process';
import { readFileSync, writeFileSync, existsSync } from 'node:fs';
import { join } from 'node:path';
import { detectByGuard, detectDomain } from './lib/domains.mjs';

const ROOT = process.cwd();
const raw = process.argv[2] ?? '';
const design = process.argv[3] ?? '';
const count = process.argv[4] ?? '8';

if (!raw.trim()) {
  console.error('  [scaffold] Usage: npm run scaffold "your brief" [design] [seed-count]');
  process.exit(1);
}

// Direct spawn (no shell): shell:true on Windows concatenates args without
// quoting, which splits multi-word briefs. `node` needs no shell anyway.
const run = (cmd, args) => {
  const r = spawnSync(cmd, args, { stdio: 'inherit' });
  if (r.status !== 0) process.exit(r.status ?? 1);
};

console.log(`\n  [scaffold] 1/3 brief: "${raw}"${design ? ' (design: ' + design + ')' : ''}`);
run('node', ['scripts/brief.mjs', raw, design].filter((a) => a !== ''));

console.log('\n  [scaffold] 2/3 seed data…');
run('node', ['scripts/seed.mjs', count]);

console.log('\n  [scaffold] 3/3 README header…');
const pkg = JSON.parse(readFileSync(join(ROOT, 'package.json'), 'utf8'));
const readmePath = join(ROOT, 'README.md');
if (existsSync(readmePath) && !readFileSync(readmePath, 'utf8').includes('<!-- app-scaffold -->')) {
  const schemaSrc = existsSync(join(ROOT, 'src/schema.ts'))
    ? readFileSync(join(ROOT, 'src/schema.ts'), 'utf8')
    : existsSync(join(ROOT, 'src/domain.ts')) ? readFileSync(join(ROOT, 'src/domain.ts'), 'utf8') : '';
  const briefText = existsSync(join(ROOT, 'PRD.md')) ? readFileSync(join(ROOT, 'PRD.md'), 'utf8') : raw;
  const domain = detectByGuard(schemaSrc) ?? detectDomain(briefText);
  const summary = raw.split(/[.!?]\s+/).find((s) => s.trim().length > 0) ?? raw;
  const header = `# ${pkg.name}

> ${summary.trim()}

<!-- app-scaffold -->
Brief: ${raw}
Domain: ${domain.key}
Design: ${design || 'auto'}
Commands: npm run dev · npm run audit · npm run verify · npm run submit · npm run deploy

---

`;
  writeFileSync(readmePath, header + readFileSync(readmePath, 'utf8'));
  console.log(`  [scaffold] ✅ README header written (domain: ${domain.key}).`);
}

console.log('\n  [scaffold] Done. Next:');
console.log('      1. npm run dev — build the app to the PRD checklist (PRD.md)');
console.log('      2. npm run audit — self-score, fix ❌ rows');
console.log('      3. npm run verify — all gates, then push');