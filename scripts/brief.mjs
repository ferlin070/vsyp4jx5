#!/usr/bin/env node
/**
 * brief â€” brief to scaffold in one command.
 *
 * Writes PRD.md (requirements checklist), DESIGN.md (picked from designs/ by
 * keyword), and domain stubs (types/schema/storage + a test plan). If the repo
 * isn't scaffolded yet it also runs init.mjs (fresh CRUD shell, package name,
 * .ponytail-ready). Never overwrites files you already wrote.
 *
 * Usage: node scripts/brief.mjs "<your brief>" [design-name]
 * Example: node scripts/brief.mjs "Expense tracker in Malay with CSV export" fintech
 */
import { existsSync, readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { join } from 'node:path';
import { spawnSync } from 'node:child_process';

const ROOT = process.cwd();
const raw = process.argv[2] ?? '';
const designArg = process.argv[3] ?? '';
const name = process.env.npm_package_name ?? 'my-app';

if (!raw.trim()) {
  console.error('  [brief] Usage: npm run brief "your brief text" [design-name]');
  console.error('  [brief] Example: npm run brief "Expense tracker in Malay with CSV export" fintech');
  process.exit(1);
}

// ---- Malay detection (briefs in Bahasa Melayu get a Malay PRD) ----
const MALAY_WORDS = /\b(tidak|untuk|yang|saya|anda|kami|kita|dengan|daripada|perlu|boleh|menggunakan|senarai|harga|jumlah|padam|tambah|butang|aplikasi|laman|gambar)\b/i;
const lang = process.argv.includes('--lang')
  ? (process.argv[process.argv.indexOf('--lang') + 1] ?? 'auto')
  : 'auto';
const isMalay = lang === 'ms' || (lang === 'auto' && MALAY_WORDS.test(raw));

// ---- pick a design blueprint by keyword (EN + MY) ----
const DESIGNS = {
  fintech: 'fintech.md', dashboard: 'dashboard.md', ecommerce: 'ecommerce.md',
  mobile: 'mobile-first.md', minimal: 'minimal.md', landing: 'landing.md',
  chat: 'chat-ai.md', kanban: 'kanban.md', social: 'social.md', news: 'news.md',
};
function pickDesign(text) {
  const lower = text.toLowerCase();
  if (/(money|expense|budget|wallet|finance|bank|invest|pay|currency|cost|wang|belanja|perbelanjaan|belanjawan|dompet|kewangan|bayar|harga|simpanan)/.test(lower)) return DESIGNS.fintech;
  if (/(dashboard|admin|analytics|stat|chart|report|metric|monitor|table|papan|analitik|carta|laporan|statistik)/.test(lower)) return DESIGNS.dashboard;
  if (/(store|shop|ecommerce|product|cart|order|catalog|checkout|inventory|kedai|produk|troli|pesanan|katalog)/.test(lower)) return DESIGNS.ecommerce;
  if (/(app|mobile|ios|android|touch|swipe|phone|thumb|aplikasi|mudah alih|sentuh|telefon)/.test(lower)) return DESIGNS.mobile;
  if (/(landing|marketing|portfolio|about|homepage|hero|corporate|korporat|brosur)/.test(lower)) return DESIGNS.landing;
  if (/(chat|ai|assistant|bot|prompt|llm|agent|copilot)/.test(lower)) return DESIGNS.chat;
  if (/(kanban|board|project|sprint|trello|wip)/.test(lower)) return DESIGNS.kanban;
  if (/(social|feed|post|profile|follow|community|threads|komuniti)/.test(lower)) return DESIGNS.social;
  if (/(news|blog|article|editorial|magazine|artikel|berita)/.test(lower)) return DESIGNS.news;
  return DESIGNS.minimal;
}
const designFile = designArg ? (DESIGNS[designArg] ?? designArg) : pickDesign(raw);
const designSrc = join(ROOT, 'designs', designFile.endsWith('.md') ? designFile : designFile + '.md');

// ---- scaffold the shell first if needed ----
if (!existsSync(join(ROOT, '.ponytail-ready'))) {
  const r = spawnSync('node', ['scripts/init.mjs', name], { stdio: 'inherit', shell: process.platform === 'win32' });
  if (r.status !== 0) process.exit(1);
}

// ---- PRD.md ----
const sentences = raw.split(/(?<=[.!?])\s+/).map((s) => s.trim()).filter(Boolean);
const feature = (kw) => (new RegExp(kw, 'i').test(raw));
const featureKws = isMalay
  ? [
      ['auth / log masuk', 'auth|login|sign|account|akaun'],
      ['carian', 'search|filter|find|cari|tapis'],
      ['eksport', 'export|csv|json|pdf|muat turun'],
      ['tema', 'theme|dark|light|tema'],
      ['notifikasi', 'notif|alert|remind|peringatan'],
      ['perkongsian', 'share|link|social|kongsi'],
    ]
  : [
      ['auth / login', 'auth|login|sign|account'],
      ['search', 'search|filter|find'],
      ['export', 'export|csv|json|pdf'],
      ['theming', 'theme|dark|light'],
      ['notifications', 'notif|alert|remind'],
      ['sharing', 'share|link|social'],
    ];
const features = featureKws.filter(([label, kw]) => feature(kw)).map(([label]) => label);

const missingLine = isMalay
  ? '- [ ] (tulis semula keperluan dari brief sebagai item boleh semak)'
  : '- [ ] (rewrite brief requirements as checkable items)';
const noneFound = isMalay ? '- (tiada ciri jelas dikesan â€” senarai dari brief)' : '- (no clear features detected â€” list from brief)';

const prd = isMalay
  ? `# PRD â€” ${name}

## Brief
${raw}

## Senarai semak keperluan
${sentences.map((s) => `- [ ] ${s}`).join('\n') || missingLine}

## Ciri dikesan
${features.length ? features.map((f) => `- [ ] ${f}`).join('\n') : noneFound}

## Peraturan tidak boleh lepas (dari AGENTS.md)
- [ ] Landmark: header/main/section dengan aria-label
- [ ] Setiap input ada label (for= atau aria-label)
- [ ] Modal: fokus dikunci + pulih; Escape tutup
- [ ] .sr-only untuk teks tersembunyi; prefers-reduced-motion runtuhkan animasi
- [ ] Kendalian ralat: banner kekal role="alert", jangan telan ralat
- [ ] Penyimpanan: createStore selamat ralat; sahkan setiap rekod semasa muat
- [ ] escapeHtml sebelum innerHTML
- [ ] Data biji (src/lib/seed.ts â†’ makeSeed)
- [ ] Logik domain tulen + unit-tested
- [ ] Keadaan kosong + keadaan memuat

## Sebelum hantar
- [ ] npm run typecheck && npm test && npm run build
- [ ] npm run size di bawah had (lulus had anda: npm run size -- 40)
- [ ] npm run audit (skor sendiri)
- [ ] Imbasan axe: npm run test:a11y:scan â€” 0 pelanggaran
`
  : `# PRD â€” ${name}

## Brief
${raw}

## Requirements checklist
${sentences.map((s) => `- [ ] ${s}`).join('\n') || missingLine}

## Detected feature candidates
${features.length ? features.map((f) => `- [ ] ${f}`).join('\n') : noneFound}

## Non-negotiables (from AGENTS.md)
- [ ] Landmark regions: header/main/section with aria-label
- [ ] Every input has a label (for= or aria-label)
- [ ] Modal focus trap + restore; Escape closes
- [ ] .sr-only for hidden text; prefers-reduced-motion collapses animation
- [ ] Error handling: persistent role="alert" banner, never swallow
- [ ] Storage: error-safe createStore; validate every record on load
- [ ] escapeHtml before innerHTML
- [ ] Seed data present (src/lib/seed.ts â†’ makeSeed)
- [ ] Domain logic pure + unit-tested
- [ ] Empty state + loading state

## Before you submit
- [ ] npm run typecheck && npm test && npm run build
- [ ] npm run size under cap (pass your cap: npm run size -- 40)
- [ ] npm run audit (self-score)
- [ ] axe scan: npm run test:a11y:scan â€” 0 violations
`;

writeFileSync(join(ROOT, 'PRD.md'), prd);

// ---- DESIGN.md (never overwrite) ----
if (!existsSync(join(ROOT, 'DESIGN.md'))) {
  if (existsSync(designSrc)) {
    writeFileSync(join(ROOT, 'DESIGN.md'), readFileSync(designSrc, 'utf8'));
    console.log(`  [brief] âœ… DESIGN.md written (from designs/${designFile}).`);
  } else {
    console.log(`  [brief] âš ï¸ design file not found (${designFile}); DESIGN.md skipped.`);
  }
}

// ---- domain model: real, tested, typecheck-clean (from scripts/lib/domains.mjs) ----
import { detectDomain } from './lib/domains.mjs';

mkdirSync(join(ROOT, 'src'), { recursive: true });
const domain = detectDomain(raw);
const domainLabel = isMalay
  ? ({ finance: 'kewangan', ecommerce: 'e-dagang', task: 'tugas', booking: 'tempahan', crm: 'crm', fitness: 'kecergasan', library: 'perpustakaan', generic: 'generik' })[domain.key] ?? 'generik'
  : domain.key;

// overwrite the comment-only stubs init.mjs left behind; keep any real code you wrote
const writeDomain = (file, body) => {
  const p = join(ROOT, 'src', file);
  if (existsSync(p) && /\bexport\b/.test(readFileSync(p, 'utf8'))) return false;
  writeFileSync(p, body);
  return true;
};
const wroteTypes = writeDomain('types.ts', domain.types);
const wroteSchema = writeDomain('schema.ts', domain.schema);
const wroteStorage = writeDomain('storage.ts', domain.storage);
const wroteTest = writeDomain('tests/schema.test.ts', domain.test);

console.log(`  [brief] âœ… PRD.md written (${sentences.length} requirement lines, ${isMalay ? 'Bahasa Melayu' : 'English'}).`);
console.log(`  [brief] ðŸ§© Domain detected: ${domainLabel} â€” working model + tests generated.`);
for (const [f, did] of [['src/types.ts', wroteTypes], ['src/schema.ts', wroteSchema], ['src/storage.ts', wroteStorage], ['src/tests/schema.test.ts', wroteTest]]) {
  console.log(`  [brief] ${did ? 'âœ…' : 'â­  keep'} ${f}`);
}

const next = isMalay
  ? [
      `      1. Domain ${domainLabel} siap â€” semak src/types.ts + src/schema.ts`,
      '      2. Sambung createStore dalam src/storage.ts ke UI (src/main.ts)',
      '      3. Lengkapkan src/main.ts render()/events mengikut senarai semak',
      '      4. npm run seed   (data biji realistik)  â†’  npm run audit  â†’  npm run verify  â†’  push',
    ]
  : [
      `      1. Domain "${domainLabel}" scaffolded â€” review src/types.ts + src/schema.ts`,
      '      2. Wire the store from src/storage.ts into the UI (src/main.ts)',
      '      3. Fill src/main.ts render()/events to the checklist',
      '      4. npm run seed   (realistic seed data)  â†’  npm run audit  â†’  npm run verify  â†’  push',
    ];
console.log('\n  [brief] Next:');
for (const line of next) console.log(line);
