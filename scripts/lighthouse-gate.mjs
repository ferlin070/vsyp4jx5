#!/usr/bin/env node
// Lighthouse gate — reads a lighthouse JSON report and fails if any category
// score is below its floor. Usage: node scripts/lighthouse-gate.mjs report.json perf=0.5 a11y=0.9
import { readFileSync } from 'node:fs';

const [reportPath, ...pairs] = process.argv.slice(2);
if (!reportPath || pairs.length === 0) {
  console.error('  [lighthouse] Usage: node scripts/lighthouse-gate.mjs report.json category=floor …');
  process.exit(1);
}
const floors = Object.fromEntries(pairs.map((p) => p.split('=').map((v) => (/^\d/.test(v) ? Number(v) : v))));

const report = JSON.parse(readFileSync(reportPath, 'utf8'));
const categories = report.categories ?? {};
let ok = true;
for (const [key, cat] of Object.entries(categories)) {
  const score = Math.round((cat.score ?? 0) * 100);
  const floor = (floors[key] ?? 0) * 100;
  console.log(`  [lighthouse] ${key}: ${score}% (floor ${floor}%)`);
  if (score < floor) ok = false;
}
if (!ok) {
  console.error('  [lighthouse] ❌ category below floor.');
  process.exit(1);
}
console.log('  [lighthouse] ✅ all floors met.');