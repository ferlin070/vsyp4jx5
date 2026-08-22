# Ponytail Pro Max 🐴⚡

> Battle-tested starter template for code competitions.
> Accessibility, testing, error handling, modular architecture — built-in from line 1.

[![CI](https://github.com/ferlin070/ponytail-pro-max/actions/workflows/ci.yml/badge.svg)](https://github.com/ferlin070/ponytail-pro-max/actions/workflows/ci.yml)

## What this gives you

Every time a competition brief lands, you waste 30+ minutes setting up:
TypeScript, Vitest, accessibility patterns, error handling, CSS tokens.
This template has all of that pre-wired. Clone it, build your app, ship.

## The 11 weapons

| File | What it does | Competition value |
|---|---|---|
| `lib/a11y.ts` | Focus trap, modal management, screen reader announcements | Fixes the #1 score-killer: missing accessibility |
| `lib/storage.ts` | Typed localStorage with error-safe load/save | "Errors silently swallowed" → never again |
| `lib/state.ts` | 1KB reactive state manager | State out of the DOM, testable |
| `lib/render.ts` | escapeHtml, formatDate, stars, debounce | XSS prevention + DRY helpers |
| `lib/validate.ts` | Composable validators (isString, isOneOf, validateObject) | Schema validation without a library |
| `lib/dom.ts` | $, $$, delegate, html builder | Less boilerplate, cleaner event wiring |
| `lib/seed.ts` | makeSeed, daysAgoISO starter data | Demo data in seconds |
| `lib/csv.ts` | toCsv, parseCsv | CSV import/export, no dependency |
| `lib/router.ts` | parseHash, navigate, createRouter | Multi-page apps from a hash router |
| `lib/chart.ts` | barChart, sparkline (SVG, a11y labels) | Charts without a chart library |
| `lib/i18n.ts` | createI18n (en/ms switch, persisted) | Localised apps for Malay briefs |
| `lib/style.css` | Design tokens, component primitives, a11y utilities | Consistent design, `.sr-only`, focus-visible |

## Quick start

```bash
# Clone into a new competition repo (degit strips git history)
npx degit ferlin070/ponytail-pro-max my-competition

cd my-competition
npm install
npm run dev       # start coding
```

Or clone with history (then remove the origin):

```bash
git clone https://github.com/ferlin070/ponytail-pro-max.git my-competition
cd my-competition
git remote remove origin
```

## Scripts

| Command | What |
|---|---|
| `npm run dev` | Vite dev server |
| `npm test` | Unit tests (Vitest + jsdom) |
| `npm run test:coverage` | Unit tests + v8 coverage thresholds |
| `npm run test:a11y` | Accessibility tests (axe patterns) |
| `npm run test:a11y:scan` | **Real axe-core scan of the built app DOM — 0 violations required** |
| `npm run typecheck` | Strict TypeScript check |
| `npm run build` | Type-check + production build |
| `npm run size` | Check if source is under the byte cap (pass yours: `npm run size -- 40`) |
| `npm run verify` | **All gates in one command** (template guard, typecheck, test, coverage, a11y, a11y scan, build, size, git status) — run before every push |
| `npm run init` | Scaffold a real app (replace demo, create module stubs, rename package) |
| `npm run scaffold "<brief>" [design] [count]` | **One command to a working app**: brief (PRD/DESIGN/domain+store) + seed + README header |
| `npm run brief "<text>"` | **Brief → scaffold**: PRD.md + DESIGN.md (picked by keyword) + real domain model (finance/ecommerce/task/library/booking/crm/fitness/generic) with unit tests. Detects Bahasa Melayu → Malay PRD (`--lang ms`) |
| `npm run seed` | Domain-aware starter data via `makeSeed` + DESIGN.md if missing |
| `npm run audit` | Self-score against the rubric (Completeness / P&D / Craft) — fix the ❌ rows |
| `npm run submit` | One-command submission pack: URL auto-detected (Netlify/GitHub Pages) or `SUBMIT_URL=https://…` → SUBMISSION.md (score, size, commits, checklist, screenshots) |
| `npm run e2e` | **Real-browser E2E**: builds, serves, drives Chromium (CRUD flow + axe on the live page) |
| `npm run demo` | Golden kitchen-sink demo page — every lib weapon working live |
| `npm run deploy` | Build + deploy: `[netlify\|vercel\|docker\|ssh\|github-pages]` — docker: `DOCKER_IMAGE=… npm run deploy -- docker`, ssh: `SSH_HOST=… SSH_DIR=/var/www/html npm run deploy -- ssh` |

## Workflow from a brief (90 minutes)

```bash
npx degit ferlin070/ponytail-pro-max my-app
cd my-app
npm install
npm run scaffold "Expense tracker in Malay with categories and CSV export"
#  → PRD.md checklist (Malay), DESIGN.md (fintech), types/schema/storage stubs,
#    schema.test.ts, seed data, README header — in one command
npm run dev           # build your app to the PRD checklist
npm run audit         # self-score → fix ❌ rows
npm run e2e           # real-browser flow + axe scan
npm run submit        # SUBMISSION.md pack (URL auto-detected or SUBMIT_URL=…)
npm run verify        # all gates
# push early, keep it verified; CI auto-deploys to Netlify if secrets are set
```

## Self-hosted deploy

The template ships with nginx config so you can host it anywhere:

```bash
# Docker (any VPS with Docker — run from the repo root)
DOCKER_IMAGE=ghcr.io/you/ponytail-app npm run deploy -- docker
docker run -p 8080:80 ghcr.io/you/ponytail-app

# Push the image to a registry so other machines can pull it
DOCKER_PUSH=1 npm run deploy -- docker

# SSH + nginx (rsync dist/ to a VPS; falls back to scp on Windows)
SSH_HOST=1.2.3.4 SSH_USER=root SSH_DIR=/var/www/html npm run deploy -- ssh
```

`nginx.conf` (repo root) serves the SPA with `try_files … /index.html` fallback, gzip, and long-lived asset caching. Copy it into your server's nginx site config.

## PWA / offline

`public/` ships a web manifest (`manifest.webmanifest`), an app icon (`icon.svg`), and a minimal service worker (`sw.js`). The SW caches the app shell on install, serves network-first with a cache fallback, and is registered automatically in `npm run init` scaffolds — install the app to the home screen and it works offline.

## Speed start (real app in one step)

```bash
npx degit ferlin070/ponytail-pro-max my-app
cd my-app
npm install
npm run scaffold "inventory log with barcode search"   # brief + domain + seed + README
npm run dev
```

Or two-step (choose your own design):

```bash
npm run brief "inventory log with barcode search" landing
npm run seed
npm run dev
```

`init` writes a clean CRUD skeleton already wired to the weapons, renames the
package, and arms the "template guard" so CI blocks pushing the untouched demo.

## CI gates

Three workflows run on every push to `main`:

| Workflow | Gates |
|---|---|
| `ci` | `npm run verify` (typecheck, test, coverage, axe, build, size, git clean) + `npm run audit -- --fail` |
| `lighthouse` | Real Lighthouse run against the built app — performance ≥ 50, accessibility ≥ 90, best-practices ≥ 80, seo ≥ 80 |
| `deploy-pages` | Builds and publishes `dist/` to GitHub Pages |

To enable the Pages deployment, open repo **Settings → Pages → Build and deployment → Source: "GitHub Actions"** once. The deployed URL (`https://<user>.github.io/<repo>/`) is auto-detected by `npm run submit`.
`scaffold` chains brief + seed + a README header into one command.

## React + Tailwind variant

Prefer React? `react-tailwind/` is the same guardrails ported to hooks —
React 19 + TypeScript strict + Tailwind CSS v4 + Testing Library (22 tests).
The 7 weapons map to `useLocalStorage`, `useAnnounce`, `Modal`/`useModal`,
plus the vanilla `validate`/`storage`/`format` libs.

```bash
cd react-tailwind
npm install
npm run dev       # demo CRUD showing every weapon together
npm test          # 22 tests
```

See `react-tailwind/README.md` for the weapon-to-hook mapping.

## Ready-made DESIGN.md blueprints

`designs/` ships 5 design systems you can copy into `DESIGN.md` and tell the
agent "build using DESIGN.md":

| File | Best for |
|---|---|
| `designs/fintech.md` | Money, budgets, expense trackers |
| `designs/minimal.md` | Editorial, tools, productivity (Notion/Linear feel) |
| `designs/dashboard.md` | Admin panels, stats, data tables |
| `designs/ecommerce.md` | Storefronts, catalogs |
| `designs/mobile-first.md` | Thumb-friendly app UIs |

## Competition checklist (paste into your PRD)

### Before you write any code
- [ ] Read brief 2× — list every requirement as a checklist
- [ ] Write PRD in a `.md` file (free, doesn't count toward size)
- [ ] Deploy empty app → get URL early

### During development
- [ ] Use **semantic landmarks**: `<header aria-label>`, `<main aria-label>`, `<section aria-label>`
- [ ] Every `<input>` has a `<label for="id">`
- [ ] Radio groups: each radio has `aria-label="N stars"`
- [ ] Modals: use `openModal()` from `lib/a11y.ts` (handles focus trap + restore)
- [ ] Storage: use `createStore()` from `lib/storage.ts` (handles errors)
- [ ] Loading state: show overlay during every async operation
- [ ] Error state: persistent banner (not just ephemeral toast)
- [ ] Empty state: friendly message when no data

### Before you submit
- [ ] `npm run typecheck` passes
- [ ] `npm test` passes (write tests for domain logic)
- [ ] `npm run build` succeeds
- [ ] `npm run size` is under the cap
- [ ] Run axe DevTools browser extension — 0 violations
- [ ] Tab through the app with keyboard only — everything works
- [ ] Commit early, keep it "verified"

## Architecture

```
src/
├── lib/           # The 7 weapons (reusable across competitions)
│   ├── a11y.ts    # Focus trap, modal mgmt, announce
│   ├── storage.ts # Typed localStorage, error-safe
│   ├── state.ts   # Reactive state (1KB)
│   ├── render.ts  # escapeHtml, formatDate, stars, debounce
│   ├── validate.ts# Composable validators
│   ├── dom.ts     # $, $$, delegate, html builder
│   └── style.css  # Design tokens + component primitives
├── tests/         # Tests for every lib module
├── main.ts        # Your app entry (demo shows the patterns)
└── index.html     # #app root + meta tags
```

## Scoring strategy

Based on real competition feedback:

| Category | What wins | What kills |
|---|---|---|
| **Completeness** | CRUD + persistence + edge cases + seed data | Errors silently swallowed, no loading states |
| **Problem Solving & Design** | Semantic landmarks, ARIA labels, focus management, responsive | Missing aria-labels, no focus trap in modals |
| **Technical Craft** | Modular files, TypeScript strict, unit tests, escapeHtml | Monolithic file, no types, no tests, XSS risk |

## Brief → pattern cheat-sheet

Told which patterns apply when a brief arrives. All rules are already active in `AGENTS.md`; this is the fast lookup. When a brief matches a row, the agent also fetches that source repo's live README for fresher patterns (see `AGENTS.md` → LIVE SOURCE CONSULTATION).

| Brief asks for... | Consult | Patterns |
|---|---|---|
| Any CRUD / dashboard / list app | Refine (#11), Vibe Kanban (#18) | Headless CRUD, provider pattern, mutation invalidation, Plan→Build→Ship |
| Anything with a UI | DESIGN.md (#19), Taste (#61), Impeccable (#62), Clone Wars (#9) | 9-section design system, 3 design dials, 23 commands, proven UX clones |
| React / Tailwind components | shadcn/ui (#47), React Bits (#44), Animate UI (#48), COSS (#42) | Copy-paste-own, variant matrix, animation-first |
| Animations | GSAP (#30), Motion Design (#32), Genjutsu (#33) | Interaction thesis first, scope+revert, reduced-motion |
| AI features / agents / RAG | Awesome LLM Apps (#13), LibreChat (#38) | Multi-agent teams, CRAG, memory, generative UI |
| Security brief | Camoufox (#3), CAI (#14), Strix (#15), PentAGI (#16), PentestGPT (#17), HackAgent (#58) | Kill-chain phases, PoC validation, guardrails |
| Data integration / sync / API | OpenConnector (#20), Firecrawl (#28) | Hash-based sync, event-driven, reverse proxy |
| Large existing codebase | CodeGraph (#21), Knip (#22) | `codegraph_explore`, dead-code elimination |
| Finance / trading | AutoHedge (#36), Vibe-Trading (#37) | Risk gate first, tested math, provenance |
| Anything | Competition Real (#1) | a11y is #1 score-killer. Commit early, push VERIFIED. |

## License

MIT — use it, win with it, share it.
