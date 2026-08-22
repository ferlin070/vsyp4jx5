#!/usr/bin/env node
/**
 * Verify gate for the React variant.
 * Usage: node scripts/verify.mjs [limit-kb]   (npm run verify)
 */
import { spawnSync } from 'node:child_process';
import { existsSync } from 'node:fs';
import { join } from 'node:path';

const ROOT = process.cwd();
// Windows resolves npm as npm.cmd — shell:true makes spawnSync portable (proven pattern from root verify).
const IS_WIN = process.platform === 'win32';

const steps = [
  { name: 'typecheck', cmd: 'npm', args: ['run', 'typecheck'] },
  { name: 'test', cmd: 'npm', args: ['test'] },
  { name: 'build', cmd: 'npm', args: ['run', 'build'] },
  { name: 'size', cmd: 'npm', args: ['run', 'size'] },
];

let failed = false;
console.log('\n  ── Ponytail React verify ──\n');
if (!existsSync(join(ROOT, '.ponytail-ready'))) {
  console.log('  [assert-app] Pristine React template — demo guard skipped.');
} else {
  const a = spawnSync('node', ['scripts/assert-app.mjs'], { stdio: 'inherit', shell: IS_WIN });
  if (a.status === 0) console.log('  [assert-app] ✅');
  else failed = true;
}

for (const step of steps) {
  const r = spawnSync(step.cmd, step.args, { stdio: ['ignore', 'inherit', 'inherit'], shell: IS_WIN });
  if (r.status === 0) {
    console.log(`  ✅ ${step.name}`);
  } else {
    console.log(`  ❌ ${step.name}`);
    failed = true;
    break;
  }
}

if (!failed) {
  console.log('\n  ✔ ALL GATES PASSED — safe to push.\n');
  process.exit(0);
}
console.log('\n  ✘ VERIFY FAILED — fix the failing gate above before pushing.\n');
process.exit(1);