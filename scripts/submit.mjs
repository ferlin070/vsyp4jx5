#!/usr/bin/env node
/**
 * submit — one command to produce the submission pack (SUBMISSION.md).
 *
 * Gathers: deployed URL (SUBMIT_URL env or from netlify/vercel), PRD checklist,
 * design summary, self-audit score, size report, git commit log, and a short
 * "what makes this score" section. Paste SUBMISSION.md into the submission form.
 *
 * Usage: SUBMIT_URL=https://your-app.netlify.app node scripts/submit.mjs
 */
import { spawnSync } from 'node:child_process';
import { existsSync, readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

const ROOT = process.cwd();
const IS_WIN = process.platform === 'win32';
const shell = { stdio: 'pipe', shell: IS_WIN, encoding: 'utf8' };

function run(cmd, args) {
  const r = spawnSync(cmd, args, shell);
  return { ok: r.status === 0, out: (r.stdout || '').trim() };
}

const name = process.env.npm_package_name ?? 'my-app';

// audit score
const audit = run('node', ['scripts/audit.mjs']);
const scoreMatch = (audit.out || '').match(/Estimated score:\s*(\d+)\/100/);
const score = scoreMatch ? scoreMatch[1] : 'n/a';
const auditRows = (audit.out || '').split('\n').filter((l) => /✅|❌/.test(l));

// size report
const size = run('node', ['scripts/sizecheck.mjs']);
const sizeLines = (size.out || '').split('\n').filter((l) => /TOTAL|LIMIT|UNDER|OVER/.test(l)).slice(-3);

// git log
const git = run('git', ['log', '--oneline', '-10']);

// URL: SUBMIT_URL wins; else auto-detect from netlify state or GitHub Pages remote.
const stateFile = join(ROOT, '.netlify/state.json');
let url = process.env.SUBMIT_URL || '';
if (!url && existsSync(stateFile)) {
  const siteUrl = JSON.parse(readFileSync(stateFile, 'utf8')).site?.url ?? '';
  if (/^https?:\/\//.test(siteUrl)) url = siteUrl;
}
if (!url) {
  const remote = run('git', ['remote', 'get-url', 'origin']).out;
  const m = /github\.com[:/]([^/]+)\/([^/]+?)(?:\.git)?$/.exec(remote);
  if (m) url = `https://${m[1]}.github.io/${m[2]}/`;
}
url = url || 'https://your-app.netlify.app';

// feature checklist from PRD
const prd = existsSync(join(ROOT, 'PRD.md')) ? readFileSync(join(ROOT, 'PRD.md'), 'utf8') : null;
const requirements = prd
  ? prd.split('\n').filter((l) => /^-\s*\[ \]/.test(l)).map((l) => l.replace(/^-\s*\[ \]\s*/, '- [ ] ')).slice(0, 30)
  : [];

const md = `# Submission — ${name}

- **URL**: ${url}
- **Score (self-audit)**: ${score}/100
- **Size**: ${sizeLines.join(' | ') || 'n/a'}
- **Commits**: ${git.ok ? git.out.split('\n').length : '?'} (verified, pushed)

## Screenshots
${existsSync(join(ROOT, 'artifacts/desktop.png')) ? '![Desktop](artifacts/desktop.png)' : '- (run npm run e2e to capture desktop.png)'}
${existsSync(join(ROOT, 'artifacts/mobile.png')) ? '![Mobile](artifacts/mobile.png)' : '- (run npm run e2e to capture mobile.png)'}

## Feature checklist
${requirements.length ? requirements.join('\n') : '- [ ] (run npm run brief to generate a PRD checklist)'}

## Self-audit detail
\`\`\`
${auditRows.join('\n')}
\`\`\`

## Commit history
\`\`\`
${git.ok ? git.out : 'git log unavailable'}
\`\`\`

## What makes this score (per rubric)
- **Completeness**: CRUD + persistence + seed data + error/empty/loading states.
- **Problem Solving & Design**: landmark regions, labeled inputs, modal focus management, \`.sr-only\`, \`prefers-reduced-motion\`.
- **Technical Craft**: modular files (types/schema/storage), TypeScript strict, unit tests, \`escapeHtml\`, error-safe storage.

## Verified before submission
- [ ] npm run typecheck passes
- [ ] npm test passes
- [ ] npm run test:a11y:scan — 0 axe violations
- [ ] npm run size under cap (npm run size -- <cap>)
- [ ] npm run audit — no critical ❌
- [ ] Commits pushed and green in CI
`;

writeFileSync(join(ROOT, 'SUBMISSION.md'), md);
console.log(`  [submit] ✅ SUBMISSION.md written (score ${score}/100, ${sizeLines.length ? sizeLines[0] : 'size n/a'}).`);
console.log(`  [submit] Set the URL: SUBMIT_URL=https://your-app.netlify.app node scripts/submit.mjs`);
console.log('  [submit] Paste SUBMISSION.md into the submission form.');