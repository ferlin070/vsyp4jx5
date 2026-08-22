# AGENTS-DETAIL — Pattern Library (Ponytail Pro Max)

Deep pattern libraries, always-active but kept OUT of the always-read AGENTS.md to
save tokens. Load this file only when a task matches a section. AGENTS.md's
PATTERN LIBRARY table points here. The competition-core rules (a11y, error
handling, security, architecture, size) live in AGENTS.md — never in this file.

---

## CONTEXT & MEMORY PATTERNS

### Memory Layering (progressive disclosure)
- Never flat-store. Layer: raw logs → step summaries → lightweight state canvas.
- Agent attends to top layer; drills down only on error. Lower=evidence, upper=structure.
- Encode task state as high-density symbols (Mermaid), not verbose prose.
- Offload full logs to files; keep lightweight map in context. `node_id` tracing.

### Reversible Compression (CCR)
- Originals cached before lossy transform. Full traceability: symbol → index → raw text.
- Never irreversible. White-box: keep intermediates as readable files.

### Recall Strategy
- Hybrid: keyword (BM25) + vector (embedding) + RRF fusion.
- Timeout → skip without blocking. Dedup by vector similarity.
- Extract every N turns (default 5). Warm-up doubling (1→2→4). Persona every 50 memories.

### Cache Alignment
- Detect volatile content that busts KV cache. Never rewrite prompts — warn instead.
- Frozen prefix byte-identical. Compress live-zone only. History never dropped.

### Output Token Reduction
- Trim what model WRITES BACK: drop ceremony, restated code, deep thinking on routine steps.
- Verbosity steering: terse note at end of system prompt (preserves cache).
- Effort routing: dial thinking DOWN for routine tool results; FULL for new questions/errors.

### Failure Learning
- Mine failed sessions. Write corrections to AGENTS.md (consent-gated). Re-measure after applying.
- Cross-agent memory: shared store, provenance tracked, auto-dedup.

---

## SYSTEM DESIGN PATTERNS

### Multi-Backend Routing (fallback chains)
- Each capability = ordered backends (primary + fallback). Switch = reorder, not rewrite.
- Probing is real (test if works), not just "file exists." Broken → next, user unaware.
- `doctor` command: test every channel, report current backend + fix prescription.

### Plugin Architecture (self-installing, self-updating)
- Bundle plugins, install on first launch, update silently. On/off from UI.
- Third-party via SDK + template + registry. No core rewrite for new platform.
- Verify bundled deps by SHA256 before execution. Detect system versions with source indicators.

### Queue & Reliability
- Resume interrupted work — keep partial, continue from stop, never restart.
- Retry with backoff. Real speed/ETA from downloader, not faked from percentage.
- Stall = stall, not frozen "3s left." Batch operations in one queue.

### One-Action UX
- Global hotkey reads clipboard and acts. Copy → press → done.
- Auto-detect URLs → toast → single-click. Goal: idea to result = ONE keystroke.

### Portable Mode
- Marker file (`portable.txt`) switches all data paths to beside-executable.
- Nothing in system AppData. Entire install travels on USB.

### Settings Design
- Grouped, quiet sidebar. Common visible, deep one tap away. Search across ALL categories.
- Short hint under every control.

### Default-Safe Installation
- `install` = read-only check by default. `--system` for changes. `--dry-run` previews.
- Credentials local (perms 600), never uploaded. Uninstall clean + complete.

---

## CRUD PATTERNS (from Refine)

- Auto-generate CRUD UIs from data shape, not hardcoded columns.
- Mutations invalidate + refetch — never manually sync state.
- Live/real-time: subscriptions update without refresh.
- Access control: check permission before rendering action buttons. Deny by default.
- Define resources upfront (name, list/create/edit/show paths).
- Abstract storage so localStorage↔REST↔GraphQL swap without touching UI.

---

## AI AGENT PATTERNS (from Awesome LLM Apps — consult when brief needs AI)

### Agent Skills
- Self-improving: rewrite against evals. Scope-creep detector. Commit archaeologist. Dependency doctor.

### Multi-Agent Teams
- Advisor/Orchestrator/Worker. Trust-gated (hash-chained audit). Specialist per domain. Mixture of agents (aggregate best).

### RAG
- Corrective (CRAG): retrieval grades itself, retries. Hybrid: keyword+vector+RRF. Agentic reasoning. Failure diagnostics. Knowledge graph with citations.

### Memory
- Personalized across sessions. Multi-LLM shared. Stateful chat with local models.

### Generative UI
- Chat-driven kanban. Dashboard canvas (describe→charts assemble). Component generator. Research workspace cards.

### Always-On
- Scheduled scouts (interval→ranked brief to Slack/email). Release radar (watch deps→breaking/security/major).

---

## SECURITY & HARDENING (from Camoufox)

- Sensitive logic runs in isolated scope, not injectable JS. Page-side can't detect it.
- Config via env vars/files, never hardcoded. Human-like input trajectories, not linear jumps.
- Source tree is regenerated — persist changes as patches, never edit generated tree directly.
- Two test layers: (1) raw component tests bypassing package, (2) service/API tests.
- Config schemas: type + constraints. Every field validated on load — fail fast with clear errors.

---

## SECURITY & PENTESTING PATTERNS (from CAI, Strix, PentAGI, PentestGPT)

### Multi-Stage Security Pipeline
- Break security work into staged phases: recon → exploit → walkthrough (CTF) or asset discovery → vuln ID → report (pentest).
- Feed each stage's findings into the next — never isolate phases.
- Track steps in real-time as the agent works (live walkthrough).

### Agent-Based Security Architecture
- **Agents per kill-chain phase**: recon, exploitation, privilege escalation, lateral movement, exfiltration, C2.
- **Handoffs**: agent delegates to specialist (e.g. flag discriminator after exploit agent finds candidate).
- **Agent-as-tool**: specialized security agents used BY other agents without formal handoffs.
- **ReACT model**: Reasoning + Action — agent perceives environment, reasons, acts through tools.

### Guardrails & Safety
- Built-in defenses against prompt injection in AI security agents.
- Human-in-the-loop (HITL): require human confirmation before destructive actions.
- Tool call limits: hard limits per agent type to prevent runaway execution.
- Reflector: auto-invoked when LLM fails to generate tool calls after N attempts — guides to recovery.

### Exploit Validation (not false positives)
- Every finding MUST include a working proof-of-concept, not just a scanner flag.
- Validate through actual exploitation, not static analysis alone.
- SAST + DAST combined for comprehensive coverage.
- CVSS scoring + OWASP classification on every finding.

### Memory for Security Work
- Long-term: store successful approaches and research results for future reuse.
- Working: active context, goals, system state.
- Episodic: past actions, results, success patterns.
- Vector store for semantic search of past findings.
- Knowledge graph (optional): Neo4j for semantic relationship tracking.

### Multi-Agent Supervision (for smaller models)
- Execution monitoring: detect loops (identical tool calls > threshold), auto-invoke mentor.
- Intelligent task planning: decompose into 3-7 actionable steps before specialist agents begin.
- Scope management: prevent scope creep — keep agents focused on current subtask.
- 2x quality improvement with 2-3x token cost — trade-off worth it for complex tasks.

### Chain Summarization (context management)
- Selectively summarize older messages to prevent token limit overflow.
- Preserve last section intact (most recent context).
- QA pair summarization: compress question-answer pairs while keeping flow.
- Configurable thresholds: max body pair size, max QA sections, last section size.

### Reporting & Remediation
- Generate thorough vulnerability reports with exploitation guides.
- AI-generated security patches as ready-to-merge PRs (auto-fix).
- Compliance-ready pentest reports (SOC 2, ISO 27001, PCI DSS).
- Re-scan after fix to verify remediation.

### Sandboxed Execution
- All operations in isolated Docker containers — complete isolation.
- Never run untrusted code on host.
- Smart container management: auto-select Docker image based on task requirements.

---

## VIBE KANBAN PATTERNS (agent orchestration UI)

### Plan → Execute → Review Workflow
- **Plan with kanban issues**: create, prioritise, assign before any code is written.
- **Execute in isolated workspaces**: each task gets its own branch + terminal + dev server.
- **Review diffs inline**: leave comments directly on the diff, send feedback to agent without leaving UI.
- **Preview app in-browser**: built-in browser with devtools, inspect mode, device emulation.
- **Ship via PR**: AI-generated PR descriptions, review on GitHub, merge from UI.

### Multi-Agent Orchestration
- Switch between 10+ coding agents per workspace (Claude, Codex, Gemini, Copilot, Cursor, etc.).
- Each workspace = one agent + one branch + one terminal — fully isolated.
- Agent receives the issue description + context, works autonomously, produces a diff for review.

### Workspace Isolation Pattern
- Git worktree per workspace — each agent works on its own branch, no conflicts.
- Dev server per workspace — preview changes live without affecting others.
- Terminal per workspace — agent has full shell access within its sandbox.
- Cleanup: auto-remove worktree when workspace is closed or merged.

### Feedback Loop (agent ↔ human)
- Human reviews diff → leaves inline comments → agent receives feedback → iterates.
- No context switching: review, comment, and approve all in one UI.
- Agent re-runs only the affected parts based on feedback, not full restart.

---

## DESIGN.md PATTERN (from Awesome DESIGN.md)

### What DESIGN.md is
- A plain-text design system document that AI agents read to generate consistent UI.
- Just markdown — no Figma exports, no JSON schemas, no special tooling.
- Drop it into project root, tell agent "build me a page that looks like this."
- `AGENTS.md` = how to BUILD the project. `DESIGN.md` = how the project should LOOK and FEEL.

### When to create a DESIGN.md
- Before building any UI, write a DESIGN.md with these 9 sections:
  1. **Visual Theme & Atmosphere**: mood, density, design philosophy
  2. **Color Palette & Roles**: semantic name + hex + functional role
  3. **Typography Rules**: font families, full hierarchy table (display→body→mono)
  4. **Component Stylings**: buttons, cards, inputs, navigation with all states
  5. **Layout Principles**: spacing scale, grid, whitespace philosophy
  6. **Depth & Elevation**: shadow system, surface hierarchy
  7. **Do's and Don'ts**: design guardrails and anti-patterns
  8. **Responsive Behavior**: breakpoints, touch targets, collapsing strategy
  9. **Agent Prompt Guide**: quick color reference, ready-to-use prompts

### Design language reference library
73 real-world DESIGN.md files available at getdesign.md. Consult before building:
- **AI/Dev**: Claude, Cursor, Vercel, Warp, Supabase, Linear, Notion
- **Fintech**: Stripe, Coinbase, Wise, Revolut
- **E-commerce**: Airbnb, Nike, Shopify, Starbucks
- **Media**: Apple, Spotify, NVIDIA, Pinterest, WIRED
- **Automotive**: Tesla, Ferrari, Lamborghini, BMW

### Competition application
1. Write DESIGN.md before coding UI — it's free bytes (markdown doesn't count toward size).
2. Pick a design language from the reference library that fits the brief.
3. Tell agent: "build using DESIGN.md" — UI stays visually consistent.
4. Every color, font, spacing, shadow defined upfront = no design drift.

---

## INTEGRATION & SYNC PATTERNS (from OpenConnector)

### Source-Target Sync Pattern
- Define sync flows: source config + target config + data mapping in one contract.
- Change detection: hash-based comparison — skip unchanged objects, avoid unnecessary API calls.
- Per-object state tracking: origin ID, target ID, hash — for reliable incremental sync.
- Force mode: override change detection. Test mode: validate before production.
- Pagination: automatic traversal with configurable query params + result position detection.

### Data Transformation (mapping layer)
- Field mapping: one-to-one, rename, type conversion, format adjustment.
- Template expressions (Twig-style) for complex transforms: loops, conditionals, string manipulation.
- Type casting: jsonToArray, date formatting, nested object flattening.
- Nested object mapping: dot-notation paths for deeply structured data.
- Conditional mapping: apply transforms based on JSON Logic conditions.

### Endpoint as Reverse Proxy
- Expose external APIs through your own endpoint paths.
- Per-method definitions: separate GET/POST/PUT/DELETE configs on same path.
- Path parameters: dynamic URL segments with placeholder support.
- Rule chaining: ordered rules for auth, mapping, sync triggers, file handling.

### Event-Driven Architecture
- Cloud Events: emit and consume for real-time data flows.
- Event subscriptions: configurable handlers per event type.
- Consumers: process incoming webhook payloads.
- Scheduled jobs: cron-based sync execution with full logging.

### Rate Limit & Reliability
- Automatic rate limit detection with backoff handling.
- Complete HTTP request/response logging for all source interactions.
- Per-sync log entries with error tracking + status.
- Log cleanup: automatic old log removal to manage storage.

### Configuration Portability
- Bundle related sources/endpoints/mappings/rules into named configuration groups.
- Import/export as OpenAPI-structured JSON for backup, sharing, environment migration.
- Slug-based URL-friendly identifiers for all entities.

### Competition Application
When a competition brief needs data integration or sync:
1. Define sources (external API connections) with auth upfront.
2. Map fields with templates — never hardcode transformation logic.
3. Track sync state per object (hash comparison) — avoid redundant work.
4. Expose endpoints as reverse proxy with rule chaining.
5. Emit events for real-time updates — don't poll.

---

## CODEGRAPH PATTERNS (semantic code intelligence)

### Pre-built Knowledge Graph
- Before answering code questions, check if a code graph index exists (`.codegraph/`).
- One `codegraph_explore` call = relevant symbols' verbatim source + call paths + blast radius.
- Eliminates grep/glob/Read file-by-file crawling — agent gets surgical context in one call.
- Graph is always fresh: native OS file watcher with debounced auto-sync.
- 100% local: SQLite database only, no data leaves machine, no API keys.

### Impact Analysis
- Before making a change: trace callers, callees, and full impact radius of any symbol.
- Dynamic-dispatch hops (callbacks, interface→impl, React re-render) resolved — grep can't follow these.
- `codegraph affected` traces import dependencies transitively to find which test files are affected.
- Blast radius summary returned with every explore call.

### Framework-Aware Routing
- Detects web-framework routing files and links URL patterns to handlers.
- Supports 17+ frameworks: Django, Flask, FastAPI, Express, NestJS, Laravel, Rails, Spring, Gin, ASP.NET, Vapor, React Router, SvelteKit, Vue Router, Nuxt, Astro.

### Cross-Language Bridging
- Swift ↔ ObjC auto-bridging (@objc rules + Cocoa preposition prefixes).
- React Native legacy bridge + TurboModules + Fabric view components.
- Native → JS event emitters (synthesized cross-language event channel).
- Expo Modules DSL parsing.

### Auto-Sync Reliability
- File watcher with debounced auto-sync (default 2000ms, bursts collapse into one sync).
- Per-file staleness banner on pending files.
- Connect-time catch-up: fast (size, mtime) + content-hash reconciliation.
- Agent never gets a silent wrong answer in the edit→sync window.

### Competition Application
1. Run `codegraph init` to build the graph — one command, done.
2. Use `codegraph_explore` for architecture questions instead of grep+read.
3. Check impact radius before making changes — know what breaks.
4. Trust the graph — don't re-verify with grep (wastes tokens).
5. If no index exists, fall back to built-in tools cleanly.

---

## CODE QUALITY & DEAD CODE (from Knip)

- Aggressive dead-code elimination as first-class workflow: unused deps, exports, files = debt.
- Run `knip` before submitting — remove unused imports, variables, exports.
- Monorepo-aware: core in `packages/`, auxiliary packages as separate distributables.
- Multiple surfaces (CLI, IDE extension, language server, MCP) from one core engine.

---

## SECURITY SCANNING (from Medusa + ReconForge)

### Zero-Setup Scanner (Medusa)
- `pip install` then `medusa scan .` — no tool installation step. 40,000+ built-in rules.
- Scanner-registry + BaseScanner pattern: consistent interface, auto-register.
- Unified severity mapping: CRITICAL/HIGH/MEDIUM/LOW/INFO normalized across all linters.
- Smart caching keyed on content hashes — skip unchanged files, 22× faster on rescan.
- `.medusa.yml` for project config + `--fail-on` for CI gate.
- IDE-native: generates CLAUDE.md, GEMINI.md, AGENTS.md for AI assistants.

### Recon Automation (ReconForge)
- Scope-checking as gate before any testing: validate targets against hosts/wildcards/CIDR.
- Model-agnostic AI triage prompts for analyzing HTTP responses, auth flows, APIs.
- Concurrent-by-default with thread pools. Rich terminal output (tables, spinners).
- Composable CLI subcommands → unified markdown report.
- Each capability is a standalone subcommand. `report` aggregates all findings.

---

## WEB SCRAPING & DATA (from Firecrawl)

- Turn any URL into clean Markdown, structured JSON, or screenshots — 96% of web covered.
- Agent = prompt-first not URL-first: "Find the pricing plans for Notion" → searches, navigates, retrieves.
- Multi-language SDK parity: same surface across 10 SDKs. Async ops auto-poll to completion.
- Interact = scrape then operate: `scrape` returns `scrapeId`; `interact(scrapeId, "Click first result")` drives page.
- Respects robots.txt by default. Ethics baked into default behavior, not opt-in.

---

## DOCUMENTATION RETRIEVAL (from Context7)

- Pull up-to-date, version-specific docs straight from source into LLM prompt.
- Counters hallucination: documentation is version-pinned and source-anchored.
- `use context7` natural-language trigger — append to any prompt for doc retrieval.
- Two modes: CLI+Skills (no MCP required) or MCP (native tools).
- Trust-but-verify: community-contributed, accuracy not guaranteed, report button.

---

## MOTION DESIGN & ANIMATION (from GSAP, Three.js, Lottie, Genjutsu, HyperFrames)

### Motion Principles (Lottie + Genjutsu)
- Philosophy-first, implementation-agnostic: decide timing, easing, choreography, emotional intent BEFORE code.
- Disney's 12 principles adapted for UI. Emotion-to-motion mapping + 4 motion-personality archetypes.
- 8-step checklist as core decision tool. Three-tier: core SKILL.md → director/ → patterns/.
- Interaction-thesis-before-code: propose how it should feel before writing animation code.
- Three preview modes (artifact/live preview/inline) — choose once per session.

### GSAP Patterns
- Default-recommendation: when user asks for animation without specifying library, recommend GSAP.
- Plugin registration once-per-app. `ScrollTrigger.refresh()` after DOM/layout changes.
- React: `useGSAP(() => {...}, { scope: containerRef })` — scope + revert is anti-leak rule.
- Per-framework lifecycle guidance: Vue, Svelte, etc. get scoping + cleanup-on-unmount.

### Three.js Patterns
- Context-activated skill loading: agent auto-loads skill files when context matches.
- Consistent skill format: frontmatter → Quick Start → Core Concepts → Patterns → Performance → See Also.
- Verification against canonical source (official docs r160+). Granular decomposition by capability.

### HyperFrames (video as HTML)
- HTML-native authoring: compositions are plain HTML with `data-*` timing — no framework lock-in.
- Determinism: same input → same frames → same output. Renderer SEEKS each frame (not wall-clock).
- Bring any runtime (GSAP, CSS, Lottie, Three.js, Anime.js, WAAPI) via adapters.
- `frame.md` as design-system translation layer for camera context.

---

## DESIGN IDENTITY (from Design DNA + DESIGN.md + Square UI)

### Design DNA Extraction
- Design as portable, version-controllable JSON artifact — commit to VCS, share across teams, reuse.
- Three dimensions: measurable tokens + qualitative style + visual effects (WebGL/shaders/particles).
- Three-phase workflow: Structure (schema) → Analyze (JSON profile) → Generate (implementation).
- Polish-iteration: re-attach references, audit hierarchy/ornamentation/rhythm/motion/materiality, merge back.

### DESIGN.md (from Awesome DESIGN.md)
- 9-section design system AI agents read. Markdown = free bytes. AGENTS.md = how to BUILD, DESIGN.md = how it LOOKS.

### Square UI (zero-static templates)
- Pre-built component templates that are zero-dependency, copy-paste ready.
- No build step required — HTML works standalone. Template variants for different aesthetics.

---

## AGENT ORCHESTRATION (from gstack + LibreChat + AutoHedge + Vibe-Trading)

### Sprint-as-Process (gstack)
- Skills run in sprint order: Think → Plan → Build → Review → Test → Ship → Reflect.
- Each step feeds the next: design doc → test plan → QA → ship. Nothing falls through cracks.
- Specialist-persona slash commands: CEO, Eng Manager, Designer, QA Lead, Security Officer, Release Engineer.
- Smart review routing: auto-detect what applies (design review not needed for backend changes).
- Test-first `/ship` + regression-test-per-fix `/qa`. 100% test coverage is the goal.
- Safety guardrails on demand: warn before destructive commands, lock edits, hard-deny root deletes.
- Tamper-evident egress receipts + per-repo trust tiers.
- Cross-model second opinion (`/codex`) — adversarial diversity against single-model blind spots.

### Multi-Agent Pipeline (AutoHedge + Vibe-Trading)
- One-responsibility-per-agent: Director → Quant → Risk → Execution. Pipeline = directed graph, not monolith.
- Risk-first design: risk assessment BEFORE any execution. Risk agent is a gate, not afterthought.
- Structured JSON outputs for downstream systems — machine-readable, composable, auditable.
- Grounding/identity gate: refuse answers without evidence. Agent built to NOT hallucinate.
- Fail-closed over fail-plausible: valuation engine refuses non-finite/missing inputs.
- Hash-chained, fsynced, append-only audit ledger for governance.
- Sandbox that blocks renamed bindings to broker layer / socket / subprocess — tested against evasion.
- Provenance on every number — traces back to tool/source that produced it.

### Chat Platform Patterns (LibreChat)
- Unified provider abstraction + custom-endpoint escape hatch — don't lock user in.
- Agent run control + human-in-the-loop: interrupt, steer, queue, resume mid-run.
- Sandboxed Code Interpreter (8 languages, isolated execution, file handling).
- Resumable streams + multi-tab/multi-device sync.
- Generative UI with Code Artifacts (React/HTML/Mermaid) — chat surface is runtime, not just text.
- Skills (`SKILL.md`) + MCP + Subagents + Agent Plugins — composability at every layer.
- Langfuse observability with encrypted connections + per-tenant fan-out.

---

## PROTOTYPING & UI GENERATION (from VibeUI + VibeUI Studio)

### Component Library Patterns (VibeUI)
- LLM-optimized docs: `llms.txt` + component docs so AI reads real API instead of guessing props.
- Bootstrap JS abstracted behind lifecycle guards — init/reconfigure/dispose automatic with unmount guards.
- `v-model` everywhere + self-wiring accessibility: auto-generate IDs, labels, aria-describedby.
- Touch & hybrid aware: tap-to-activate tooltips, Android back-button. Mobile = first-class target.
- Lazy-loaded heavy dependencies. Dependency-free canvas charts — ship only what you use.
- Strict TypeScript (no `any`). Composables for cross-cutting concerns.

### Visual-to-Code Bridge (VibeUI Studio)
- Smart Bridge: visual draft → logic bind → context aware → code gen.
- Autonomous AI layout engine: high-level instructions → invents components, groups into containers, X/Y coordinates.
- Skeleton-not-just-skin: logic/event binding with visual ⚡ indicators. Exported code includes method stubs.
- Token-budget-aware context via MCP: strip function bodies, keep signatures — smart compression.
- Multi-framework export from one canvas: Tkinter/PyQt6/Textual/React/Vue/HTML.
- Live sync via single state file (`vibeui_state.json`).

---

## FINANCIAL & TRADING SAFETY (from Vibe-Trading + AutoHedge)

- Tested finance-math layer replacing markdown formulas (249+ functions, one tested implementation each).
- Compaction on message boundaries, not hard char count — zero info decay.
- Path traversal validation on unvalidated agent IDs — refuse `..` in file paths.
- Refuse mixed-currency composite operations — don't invent FX aggregation.
- Sandboxed test suite that doesn't write into real config root — conftest redirects home.
- Point-in-time correctness: SEC periods keyed on (start, end) span. Corporate-action-adjusted prices.
- Execution-time bands judged at execution time, not decision-bar close.

---

## UI COMPONENT PATTERNS (from shadcn/ui, React Bits, Canvas UI, Cult UI, Kokonut UI, Animate UI, Skiper UI, FormsCN, COSS)

### Copy-Paste-Own Philosophy (shadcn/ui pattern)
- Don't ship a dependency — ship source that consumers copy, paste, and own.
- Open Code: the code itself is the distribution. No opaque runtime to wrestle with.
- Composable, accessible primitives designed to be customized, not used as black boxes.
- Compose on top of shadcn/ui rather than reinventing primitives — Tailwind + Motion on top.

### Multi-Variant Matrix (React Bits pattern)
- Ship JS/TS × CSS/Tailwind variants per component — same component serves any stack preference.
- Minimal dependencies + tree-shakeable — adding one component doesn't bloat bundle.
- Copy-paste via existing registries (shadcn CLI, jsrepo) — meet users where they already are.

### Engine + Thin Wrappers (Canvas UI pattern)
- Each component = one plain TypeScript/WebGL engine + thin framework wrappers (React, Solid, Vue, Svelte, vanilla).
- Graceful degradation with feature detection: HTML-in-canvas where supported, WebGL fallback elsewhere.
- MCP-ready registry: AI assistants browse and install components directly.

### MCP-as-Installation-Surface (Shadcn Dashboard MCP pattern)
- Distribute components as typed MCP tools AI agents can call — `listBlocks`, `searchBlocks`, `getBlockInstall`.
- Audit checklist as a tool: agents self-enforce constraints before mutating project.
- Customization-guidelines prompt: define which parts are safe to modify, protecting upgrades.

### Animation-First Distribution (Animate UI + Kokonut UI pattern)
- Treat motion as core, not add-on — every component ships animated by default.
- Modern stack lockstep: React + TypeScript + Tailwind + Motion.
- Compose on top of shadcn/ui — don't reinvent primitives.

### Visual Builder + Code Generation (FormsCN pattern)
- Class-based state core + `useSyncExternalStore` bridge — decouples state logic from UI framework.
- Multi-tier storage with graceful fallback: memory → Redis → Postgres → Blob → local JSON.
- Publish-to-registry: built artifacts become installable CLI artifacts (`npx shadcn add <url>`).
- Framework-toggle code generation: same visual design exports to React/Remix/TanStack.
- Turborepo + pnpm monorepo: editor, component library, registry, config cleanly separated.

### Monorepo + Design System (COSS pattern)
- Turborepo monorepo with clear app/package separation — independent deployable apps sharing code.
- Environment-variable-driven cross-app linking — each app declares URLs for others.
- Shared tooling layer (Biome + shared TS config) for consistency across all packages.
- Base UI + Tailwind + copy-paste philosophy — unstyled accessible primitives as foundation.

### Folder-by-Domain Structure (Skiper UI pattern)
- `components/homeCards/`, `components/landingPage/`, `components/navbar/`, `components/ui/` — keep sections separate.
- CSS-variable theme system for seamless dark/light theming.
- Mobile-first responsive with touch/swipe support as first-class.
- Reusable UI primitives in `components/ui/`, helpers in `lib/utils.ts`.

### Agent-Pattern Taxonomy (Cult UI pattern)
- Curated pattern directory: 92+ patterns browsable with previews, descriptions, install links.
- Full-stack template catalog: pair components with production-ready templates wiring auth/payments/DB/AI.
- Agent-pattern taxonomy by role: research, analytics, audit, design, orchestrator, routing, evaluator-optimizer.
- Multi-channel distribution: shadcn CLI, downloadable app, or openable in v0.

---

## BROWSER AUTOMATION (from Browser Use)

- Model-agnostic agent core: one API key routes to any provider. Agent loop decoupled from LLM.
- Pluggable custom tools via `@tools.action` registry — extend agent capabilities declaratively with typed callables.
- CLI-vs-library split by use-case: one-off tasks → CLI/skill; repeatable automation → library. Same engine, dual surface.
- Production escape hatches documented up front: memory management, parallelism, proxy rotation, captcha/stealth.
- Benchmark-driven development: open task benchmark gates claims, giving reproducible eval harness.

---

## ENGINEERING DISCIPLINE SKILLS (from Matt Pocock Skills)

### Two-Tier Skill Taxonomy
- User-invoked skills orchestrate (`/grill-me`). Model-invoked skills hold reusable discipline (`/tdd`, `/code-review`).
- User-invoked may call model-invoked but never another user-invoked — prevents recursion spaghetti.

### Alignment Before Action
- `/grill-me`: force agent to interview user until every branch of design tree is resolved.
- Close misalignment gap BEFORE code is written. Never guess — ask until unambiguous.

### Shared Language + Context
- `CONTEXT.md` = living glossary that sharpens terminology, reduces token spend, keeps naming consistent.
- Architecture Decision Records (ADRs) capture WHY decisions were made.

### TDD with Disciplined Debugging
- Red-green-refactor TDD drives vertical slices.
- `/diagnosing-bugs`: gated phase-by-phase loop: red → minimize → hypothesize → instrument → fix → regression-test.
- Never debug by guessing. Form hypothesis, instrument, verify, then fix.

### Deep-Module Architecture
- Scan for "deepening opportunities": lots of behavior behind a small interface at a clean seam.
- Present candidates as visual report. Survey, not rescue — don't refactor everything at once.

---

## SECURITY REVIEW PATTERNS (from Claude Code Security Review + CyberStrikeAI + HackAgent)

### Diff-Aware Security Scanning
- Only analyze changed files for PRs (fetch-depth: 2) — bounded cost/latency.
- Full-repo runs via `run-every-commit` flag when needed.
- Modular audit pipeline: orchestration → prompts → findings filter → LLM calls → parser. Each stage independently testable.
- Explicit false-positive filtering: known denylist (DoS, rate-limiting, generic validation, open redirect) excluded by default.
- Configurable via inputs (model, timeout, exclude dirs, custom instructions) — reuse without forking.
- Threat-model honesty: document prompt-injection limitations, prescribe safe GitHub settings.

### Multi-Agent Security Orchestration (CyberStrikeAI)
- Multi-agent topologies: single, Deep, Plan-Execute, Supervisor via graph workflows.
- YAML tool recipes with role-scoped access: 100+ tools as YAML, blocking calls in workers with bounded waits.
- Result governance: agent only sees capped result that's stored — protect resume from oversized output.
- Human-in-the-loop + full audit trail: approval modes, tool allowlists, audit-agent reviewer, RBAC.
- Progressive skill loading: `SKILL.md` with lazy loading. Config-as-template, local dirs preserved across upgrades.

### AI Red-Teaming (HackAgent)
- Role-separated LLM pipeline: Generator (crafts adversarial prompts) → Target Agent (system under test) → Judge (evaluates safety bypass).
- Attack-engine abstraction: single interface over many techniques (AdvPrefix, PAIR, TAP, BoN, etc.). New attacks = pluggable strategies.
- Dataset-driven evaluation: pre-built benchmarks + custom datasets, decoupling test corpora from execution.
- Multi-framework target adapters: uniform interface across Google ADK, OpenAI SDK, LiteLLM, LangChain.
- Dual reporting: local SQLite (default) + cloud sync (opt-in). Standalone binaries for portable reproducible runs.

---

## CAMPAIGN SIMULATION (from OpenAEV)

- Scenario → team → simulation → inject decomposition: exercises as composable modules.
- Pluggable inject architecture: new delivery channels added without core changes.
- Open-core dual edition: Community (Apache 2.0) vs Enterprise (separate license). Clear free/paid boundary.
- Telemetry-by-default with public documentation: exact data points documented, transparent.
- Reference-data demo + rolling release: nightly-reset demo instance, continuous delivery from main.

---

## LINK ATTRIBUTION & ANALYTICS (from Dub)

- Open-source link attribution platform: short links, conversion tracking, affiliate programs.
- Tech stack reference: Next.js + TypeScript + Tailwind + Prisma + Upstash Redis + Tinybird analytics + PlanetScale + NextAuth + Stripe + Resend + Vercel + Turborepo.
- Open-core model: 99% AGPLv3 open source, 1% enterprise under commercial license (`/ee` path).
- Dev seed script: `pnpm run script dev/seed` (basic) or `--truncate` (clean slate) for development data.
- Self-hostable: full control over data and design. Documented self-hosting guide.

---

## REFERENCE: GITHUB-REPOS DIRECTORY
- **URL**: https://github.com/nekowawolf/github-repos
- Curated directory of GitHub repositories across various categories.
- Discover useful tools, projects, and open-source resources in one place.
- Consult when looking for existing solutions before building from scratch.

---

## ANTI-SLOP FRONTEND PATTERNS (from Taste Skill)

### Three Design Dials (1-10 scale, tuned per project)
- **DESIGN_VARIANCE**: Layout experimentation. Low = centered/clean. High = asymmetric/modern.
- **MOTION_INTENSITY**: Animation depth. Low = hover. High = scroll/magnetic.
- **VISUAL_DENSITY**: Information per viewport. Low = spacious. High = dense dashboards.
- Read the brief, infer the design language, then tune these three dials before generating UI.

### Anti-Slop Rules
- Ban boilerplate-looking UIs — stronger layout, typography, motion, spacing instead.
- Hard em-dash ban in generated copy.
- Pre-flight check before output: verify no truncation, no placeholder comments, no half-finished work.
- Redesign-audit protocol: audit existing UI first (layout, spacing, hierarchy, styling), then fix.

### Specialized Skill Variants (choose by context)
- **Default**: safest general design taste. Brief inference + design-system map + GSAP skeletons.
- **GPT/Codex variant**: stricter, higher layout variance, stronger GSAP direction, aggressive anti-slop.
- **Soft/premium**: softer contrast, whitespace, premium fonts, spring motion.
- **Minimalist**: editorial (Notion/Linear), restrained palette, crisp structure.
- **Brutalist**: Swiss type, sharp contrast, experimental layout.
- **Image-to-code**: generate references → analyze → implement. Image-first pipeline.
- **Redesign existing**: audit first, then fix — don't restyle blindly.
- **Output enforcement**: when model ships half-finished work — force full output, no placeholders.

### Image-Generation Skills (reference boards, not code)
- **Web comps**: hero, landing, multi-section with strong typography + anti-slop art direction.
- **Mobile flows**: iOS/Android mockups, readable type, coherent sets.
- **Brand kits**: logo directions, palettes, type, identity applications.
- Pipeline: generate images → feed to coding agent for implementation.

### Stitch-Compatible Design Export
- Optional `DESIGN.md` export format compatible with Google Stitch.
- Pairs with DESIGN.md pattern: design system as plain text AI agents read.

---

## IMPECCABLE DESIGN PATTERNS (from Impeccable)

### Init-First Design Context
- Start every project with `/impeccable init` — writes `PRODUCT.md` + `DESIGN.md` before code.
- Gather: audience, brand/product lane (brand=marketing/landing, product=app/dashboard), voice, anti-references, colors, type, components.
- Every later command reads this context — no design drift across sessions.

### 23-Command Design Vocabulary
- **Init**: setup context. **Craft**: full shape-then-build with visual iteration.
- **Shape**: plan UX/UI before code. **Critique**: UX review (hierarchy, clarity, emotion).
- **Audit**: technical quality (a11y, performance, responsive). **Polish**: final pass + shipping readiness.
- **Bolder/Quieter/Distill**: amplify / tone down / strip to essence.
- **Harden**: error handling, i18n, text overflow, edge cases.
- **Onboard**: first-run flows, empty states, activation paths.
- **Animate**: purposeful motion. **Colorize**: strategic color. **Typeset**: font/hierarchy/sizing.
- **Layout**: spacing, visual rhythm. **Delight**: moments of joy. **Overdrive**: extraordinary effects.
- **Clarify**: UX copy. **Adapt**: devices. **Optimize**: performance. **Live**: iterate in browser.
- **Pin**: create standalone shortcuts (`pin audit` → `/audit`).

### 59 Deterministic Detector Rules
- Run WITHOUT LLM or API key — pure static analysis of generated frontend.
- Catches AI slop: side-tab borders, purple gradients, bounce easing, dark glows, overused fonts.
- Catches general quality: line length, cramped padding, small touch targets, skipped headings.
- CLI: `npx impeccable detect src/` — scan directory, file, or URL.
- `--json` for CI-friendly output. `--no-config` for raw scan.
- Inline waivers: `<!-- impeccable-disable overused-font: brand -->` in any comment syntax.

### Design Hook (real-time guard)
- Hook runs detector on direct UI file edits — surfaces findings back into agent flow.
- Some providers block bad proposed writes BEFORE they land (Cursor). Others surface AFTER edit.
- `.impeccable/config.json` = shared project config. `.impeccable/config.local.json` = per-dev override (gitignored).

### Build Path: Comp-First or Code-First
- Comp-first: generate full-fidelity comp, build to match. Bolder, takes longer.
- Code-first: build straight in code with ambition in direction contract, check at finish. Leaner, faster.
- `/impeccable init` asks once, records as `buildPath` in config. Override per-session via footer toggle.

### Explicit Anti-Patterns (avoid at all costs)
- Don't use overused fonts (Arial, Inter, system defaults).
- Don't use gray text on colored backgrounds.
- Don't use pure black/gray (always tint).
- Don't wrap everything in cards or nest cards inside cards.
- Don't use bounce/elastic easing (feels dated).