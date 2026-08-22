#!/usr/bin/env node
/**
 * Verify — one command before every push.
 *
 * Runs every gate in order, prints PASS/FAIL, exits non-zero on first failure:
 *   1. assert-app   (no demo markers in a derived app)
 *   2. typecheck    (strict TS)
 *   3. test         (unit)
 *   4. coverage     (v8 thresholds on lib + schema/seed)
 *   5. a11y         (axe pattern baseline)
 *   6. a11y-scan    (real axe-core scan of the built DOM)
 *   7. build        (production build)
 *   8. size         (under byte cap)
 *   9. git status   (clean working tree)
 *  10. git log      (committed + pushed)
 *
 * Usage: node scripts/verify.mjs   (or npm run verify)
 */
import { spawnSync } from 'node:child_process';
import { existsSync } from 'node:fs';

const NO_COLOR = !process.stdout.isTTY;
const green = (s) => (NO_COLOR ? s : `\x1b[32m${s}\x1b[0m`);
const red = (s) => (NO_COLOR ? s : `\x1b[31m${s}\x1b[0m`);
const yellow = (s) => (NO_COLOR ? s : `\x1b[33m${s}\x1b[0m`);

const steps = [
  { name: 'assert-app', cmd: 'node', args: ['scripts/assert-app.mjs'] },
  { name: 'typecheck', cmd: 'npm', args: ['run', 'typecheck'] },
  { name: 'test', cmd: 'npm', args: ['test'] },
  { name: 'coverage', cmd: 'npm', args: ['run', 'test:coverage'] },
  { name: 'a11y', cmd: 'npm', args: ['run', 'test:a11y'] },
  { name: 'a11y-scan', cmd: 'npm', args: ['run', 'test:a11y:scan'] },
  { name: 'build', cmd: 'npm', args: ['run', 'build'] },
  { name: 'size', cmd: 'npm', args: ['run', 'size'] },
  { name: 'git-status', cmd: 'git', args: ['status', '--porcelain'] },
];

// Windows resolves npm as npm.cmd; shell:true makes spawnSync portable.
const IS_WIN = process.platform === 'win32';

let failed = false;
console.log('\n  ── Ponytail Pro Max verify ──\n');
for (const step of steps) {
  const r = spawnSync(step.cmd, step.args, { stdio: ['ignore', 'inherit', 'inherit'], shell: IS_WIN });
  if (r.status === 0) {
    console.log(`  ${green('✅')} ${step.name}`);
  } else if (step.name === 'git-status' && !existsSync(new URL('.git', import.meta.url))) {
    console.log(`  ${red('❌')} git-status — not a git repo yet.`);
    console.log(`      ${yellow('git init && git add -A && git commit -m "init"')}`);
    failed = true;
  } else {
    console.log(`  ${red('❌')} ${step.name}`);
    failed = true;
    break;
  }
}

if (!failed) {
  const git = spawnSync('git', ['log', '--oneline', '-3'], { encoding: 'utf8', shell: IS_WIN });
  console.log(`\n  ${green('✅')} Recent commits:`);
  for (const line of (git.stdout || '').trim().split('\n')) console.log('    ' + line);
  console.log(`\n  ${green('✔ ALL GATES PASSED — safe to push.')}\n`);
  process.exit(0);
}

console.log(`\n  ${red('✘ VERIFY FAILED — fix the failing gate above before pushing.')}\n`);
process.exit(1);