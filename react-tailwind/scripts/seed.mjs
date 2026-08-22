#!/usr/bin/env node
/**
 * seed (React variant) — realistic starter data for the current app.
 *
 * Writes DESIGN.md (from designs/, picked by keyword) if missing, and
 * src/seedData.ts + a self-validating test. Domain-aware (finance/ecommerce/
 * task/generic — detected from the brief or PRD text) so records match the
 * type guard in src/store.ts. Never overwrites existing files.
 *
 * Usage: node scripts/seed.mjs [count] [design-name]
 */
import { existsSync, readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { detectDomain, detectByGuard, seedDataTemplateReact, SEED_TEST } from './lib/domains.mjs';

const ROOT = process.cwd();
const count = Number(process.argv[2] ?? 8);
const designArg = process.argv[3] ?? '';

const DESIGNS = ['fintech.md', 'dashboard.md', 'ecommerce.md', 'mobile-first.md', 'minimal.md', 'landing.md', 'chat-ai.md', 'kanban.md', 'social.md', 'news.md'];
const designFile = designArg && !designArg.endsWith('.md')
  ? DESIGNS.find((d) => d.startsWith(designArg)) ?? 'minimal.md'
  : designArg || 'minimal.md';

if (!existsSync(join(ROOT, 'DESIGN.md'))) {
  const src = join(ROOT, 'designs', designFile);
  if (existsSync(src)) {
    writeFileSync(join(ROOT, 'DESIGN.md'), readFileSync(src, 'utf8'));
    console.log(`  [seed] ✅ DESIGN.md written (from designs/${designFile}).`);
  }
}

// Domain detection: ground truth = the guard already in src/domain.ts,
// fallback = brief/PRD text (word-boundary regexes, EN + MY keywords).
const domainSrc = existsSync(join(ROOT, 'src/domain.ts'))
  ? readFileSync(join(ROOT, 'src/domain.ts'), 'utf8')
  : '';
const briefText = existsSync(join(ROOT, 'PRD.md'))
  ? readFileSync(join(ROOT, 'PRD.md'), 'utf8')
  : existsSync(join(ROOT, 'DESIGN.md')) ? readFileSync(join(ROOT, 'DESIGN.md'), 'utf8') : '';
const domain = detectByGuard(domainSrc) ?? detectDomain(briefText);

const seedPath = join(ROOT, 'src/seedData.ts');
const testPath = join(ROOT, 'src/tests/seedData.test.ts');

if (!existsSync(seedPath)) {
  writeFileSync(seedPath, seedDataTemplateReact(domain, count));
  console.log(`  [seed] ✅ src/seedData.ts written (${count} records, ${domain.key}).`);
}

if (!existsSync(testPath)) {
  writeFileSync(testPath, SEED_TEST);
  console.log('  [seed] ✅ src/tests/seedData.test.ts written.');
}

console.log('\n  [seed] Next:');
console.log('      1. Review src/seedData.ts — tweak the inline title/name arrays + factory');
console.log('      2. Seed on first run: if (items.length === 0) setItems(seedItems())');
console.log('      3. npm run typecheck && npm test — domain + seed tests must pass');