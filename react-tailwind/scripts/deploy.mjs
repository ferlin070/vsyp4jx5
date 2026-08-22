#!/usr/bin/env node
/**
 * deploy — get a public URL early (competition workflow: deploy empty → URL first).
 *
 * Builds the app, then deploys with whichever target you pick:
 *   - netlify  (netlify.toml provided) → `npx netlify-cli deploy --prod --dir=dist`
 *   - vercel   (vercel.json provided)  → `npx vercel --prod`
 *   - docker   (self-hosted)           → build nginx image; push if DOCKER_PUSH=1
 *   - ssh      (self-hosted VPS)       → rsync (or scp) dist/ to SSH_HOST
 * If the CLI is missing, prints the manual path instead.
 *
 * Usage: node scripts/deploy.mjs [netlify|vercel|docker|ssh]
 *
 * docker: DOCKER_IMAGE=ghcr.io/you/app node scripts/deploy.mjs docker
 * ssh:    SSH_HOST=1.2.3.4 SSH_USER=root SSH_DIR=/var/www/html node scripts/deploy.mjs ssh
 */
import { spawnSync } from 'node:child_process';
import { existsSync } from 'node:fs';

const target = process.argv[2] ?? 'netlify';
const dist = 'dist';
// Windows resolves npm/npx as .cmd — shell:true makes spawnSync portable (Linux works either way).
const IS_WIN = process.platform === 'win32';
const shell = { stdio: 'inherit', shell: IS_WIN };
const run = (cmd, args, opts) => spawnSync(cmd, args, { ...shell, ...opts });

console.log(`  [deploy] Building production bundle...`);
const build = run('npm', ['run', 'build']);
if (build.status !== 0) {
  console.error('  [deploy] ❌ build failed.');
  process.exit(1);
}

if (!existsSync(dist)) {
  console.error(`  [deploy] ❌ no ${dist}/ directory after build.`);
  process.exit(1);
}

if (target === 'netlify') {
  const r = run('npx', ['netlify-cli', 'deploy', '--prod', '--dir=' + dist]);
  if (r.status !== 0) {
    console.log('\n  [deploy] Netlify CLI not ready. Either:');
    console.log('      npx netlify-cli login');
    console.log('      npx netlify-cli deploy --prod --dir=' + dist);
    console.log('  Or drag the ' + dist + '/ folder onto https://app.netlify.com/drop\n');
  }
} else if (target === 'vercel') {
  const r = run('npx', ['vercel', '--prod']);
  if (r.status !== 0) {
    console.log('\n  [deploy] Vercel CLI not ready. Run: npx vercel --prod\n');
  }
} else if (target === 'docker') {
  const image = process.env.DOCKER_IMAGE || 'ponytail-pro-max:latest';
  console.log(`  [deploy] docker build -t ${image} .`);
  const r = run('docker', ['build', '-t', image, '.']);
  if (r.status !== 0) {
    console.log('\n  [deploy] Docker not available. Install Docker, then re-run.\n');
    process.exit(1);
  }
  if (process.env.DOCKER_PUSH === '1') {
    const p = run('docker', ['push', image]);
    if (p.status !== 0) {
      console.log('\n  [deploy] docker push failed — log in first (docker login ghcr.io).\n');
      process.exit(1);
    }
    console.log(`  [deploy] ✅ pushed ${image}. Run it anywhere:\n      docker run -p 8080:80 ${image}`);
  } else {
    console.log(`  [deploy] ✅ image built. Run locally or on your VPS:\n      docker run -p 8080:80 ${image}`);
    console.log('  [deploy] Push to a registry with: DOCKER_PUSH=1 npm run deploy -- docker\n');
  }
} else if (target === 'ssh') {
  const host = process.env.SSH_HOST;
  const user = process.env.SSH_USER || 'root';
  const port = process.env.SSH_PORT || '22';
  const dir = process.env.SSH_DIR || '/var/www/html';
  if (!host) {
    console.error('  [deploy] ❌ SSH_HOST not set. Usage:');
    console.error('      SSH_HOST=1.2.3.4 SSH_USER=root SSH_DIR=/var/www/html npm run deploy -- ssh');
    process.exit(1);
  }
  const sshBase = `-o StrictHostKeyChecking=no -p ${port}` + (process.env.SSH_KEY ? ` -i ${process.env.SSH_KEY}` : '');
  const dest = `${user}@${host}:${dir}`;
  // prefer rsync (fast, resumable); fall back to scp (Windows OpenSSH)
  const hasRsync = run('rsync', ['--version'], { stdio: 'ignore' }).status === 0;
  const r = hasRsync
    ? run('rsync', ['-az', '--delete', '-e', `ssh ${sshBase}`, `${dist}/`, dest])
    : run('scp', [`-r`, ...sshBase.split(' '), `${dist}/*`, dest]);
  if (r.status !== 0) {
    console.log('\n  [deploy] rsync/scp failed. Check SSH_HOST, SSH_USER, SSH_KEY, network.\n');
    process.exit(1);
  }
  console.log(`  [deploy] ✅ uploaded to ${dest}. Point nginx at ${dir} (SPA fallback → /index.html).`);
  console.log('  [deploy] Tip: nginx config sample in nginx.conf at repo root.\n');
} else {
  console.error('  [deploy] Unknown target "' + target + '". Use netlify, vercel, docker or ssh.');
  process.exit(1);
}