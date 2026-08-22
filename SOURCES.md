# Sources — Repo Library

62 repos integrated into Ponytail Pro Max AGENTS.md. Each contributed patterns, rules, or reference material.

## 1. Competition Real (Candle Collection Log)
- **Repo**: `ferlin070/sbkmb4j8`
- **What it taught**: a11y is #1 score-killer. Error handling must be user-facing. Modular architecture + TypeScript strict + unit tests = Technical Craft 90. Byte budget is a hard constraint.
- **Score achieved**: Completeness 94, Problem Solving & Design 62, Technical Craft 90
- **Key lesson**: Missing aria-labels on star radios, no landmark regions, no modal focus management = P&D dropped from 88→62.

## 2. claude-code-templates
- **Repo**: `davila7/claude-code-templates`
- **URL**: https://github.com/davila7/claude-code-templates
- **What it contributed**: Agents (frontend-developer, component-reviewer, build-checker, command-expert, deployer, cli-ui-designer). Commands (test, lint). Rules (dashboard, CLI tool, cloudflare).
- **Key patterns**: Component-first thinking, terminal aesthetics, self-review before commit, build verification before push.

## 3. Camoufox
- **Repo**: `daijro/camoufox`
- **URL**: https://github.com/daijro/camoufox
- **What it contributed**: Security & fingerprint hardening, build & patch workflow, testing discipline, config validation.
- **Key patterns**: Sensitive logic in isolated scope not injectable JS. Source tree regenerated — persist as patches. Two test layers: binary + service. Config validated on load, fail fast.

## 4. i-have-adhd
- **Repo**: `ayghri/i-have-adhd`
- **URL**: https://github.com/ayghri/i-have-adhd
- **What it contributed**: 10 ADHD-friendly output rules + pre-send check + override conditions.
- **Key patterns**: Lead with next action. Number steps. Restate state every turn. Specific time estimates. No preamble/recap/pleasantries. Cap lists at 5.

## 5. TencentDB Agent Memory
- **Repo**: `TencentCloud/TencentDB-Agent-Memory`
- **URL**: https://github.com/TencentCloud/TencentDB-Agent-Memory
- **What it contributed**: Layered memory, symbolic compression, traceability, white-box debugging, recall strategy, session pipeline.
- **Key patterns**: Never flat-store — layer it (raw→summary→canvas). Symbolic memory = Mermaid not prose. Full traceability: symbol→index→raw text. Hybrid recall: BM25+vector+RRF.

## 6. Caveman
- **Repo**: `JuliusBrussee/caveman`
- **URL**: https://github.com/JuliusBrussee/caveman
- **What it contributed**: Output token compression (skill) + input token compression (proxy) + auto-clarity + boundaries.
- **Key patterns**: Drop articles/filler/hedging. Never invent abbreviations (zero token saved). Originals cached before lossy transform. Measure before compressing. Drop compression for security/ambiguity.

## 7. RTK (Rust Token Killer)
- **Repo**: `rtk-ai/rtk`
- **URL**: https://github.com/rtk-ai/rtk
- **What it contributed**: Shell output compression, per-command targets, failure recovery, context budget awareness.
- **Key patterns**: Smart filtering + grouping + truncation + dedup. Per-command: git→compact, test→failures only, lint→grouped by rule. On failure: save full output, show summary+pointer.

## 8. Headroom
- **Repo**: `headroomlabs-ai/headroom`
- **URL**: https://github.com/headroomlabs-ai/headroom
- **What it contributed**: Content-aware compression, reversible CCR, cache alignment, output token reduction, failure learning, cross-agent memory.
- **Key patterns**: Detect content type → route to right compressor. CCR: originals always cached. CacheAligner: never rewrite prompts. Output shaping: trim model write-back. Failure learning: mine sessions, consent-gated corrections.

## 9. Clone Wars
- **Repo**: `GorvGoyl/Clone-Wars`
- **URL**: https://github.com/GorvGoyl/Clone-Wars
- **What it contributed**: UI/UX pattern reference library (100+ open-source clones).
- **Key patterns**: Before designing from scratch, check if a popular app already solved the UX. Categories: CRUD/dashboard, media/social, e-commerce, productivity, search.

## 10. Agent Reach
- **Repo**: `Panniantong/Agent-Reach`
- **URL**: https://github.com/Panniantong/Agent-Reach
- **What it contributed**: Multi-backend routing, default-safe installation, diagnostic command pattern, capability layer.
- **Key patterns**: Fallback chains (primary+backup, switch by reorder). Default read-only, --system for changes. Doctor command: test every channel, report current backend + fix. Don't wrap tools — select/install/diagnose/route.

## 11. Refine
- **Repo**: `refinedev/refine`
- **URL**: https://github.com/refinedev/refine
- **What it contributed**: Headless CRUD architecture, provider pattern, auto-gen UI, mutation invalidation.
- **Key patterns**: Decouple logic from UI/routing. Data/auth/access/i18n/router = swappable providers. Auto-generate list views from data shape. Mutations invalidate+refetch. Check permission before rendering action buttons.

## 12. OmniGet
- **Repo**: `tonhowtf/omniget`
- **URL**: https://github.com/tonhowtf/omniget
- **What it contributed**: Plugin architecture, queue reliability, portable mode, bundled deps, one-action UX, settings design.
- **Key patterns**: Plugins bundled, self-installing, self-updating. Resume interrupted work with backoff. SHA256 verify before execution. Global hotkey = one keystroke to result. Settings: grouped, searchable, hint under every control.

## 13. Awesome LLM Apps
- **Repo**: `Shubhamsaboo/awesome-llm-apps`
- **URL**: https://github.com/Shubhamsaboo/awesome-llm-apps
- **What it contributed**: 100+ AI agent templates — agent skills, multi-agent teams, RAG patterns, memory, generative UI, always-on agents.
- **Key patterns**: Self-improving skills. Advisor/Orchestrator/Worker teams. Corrective RAG (CRAG). Hybrid search+RRF. Chat-driven kanban. Scheduled scouts. Single-file starter: ship in 30 seconds.

## 14. CAI (Cybersecurity AI)
- **Repo**: `aliasrobotics/cai`
- **URL**: https://github.com/aliasrobotics/cai
- **What it contributed**: Agent-based security architecture, guardrails, kill-chain phases, ReACT model.
- **Key patterns**: Agents per kill-chain phase (recon, exploit, privesc, lateral, exfil, C2). Handoffs between agents. Agent-as-tool. Guardrails against prompt injection. Tool call limits per agent type.

## 15. Strix
- **Repo**: `usestrix/strix`
- **URL**: https://github.com/usestrix/strix
- **What it contributed**: Exploit validation, auto-fix PRs, compliance reporting, multi-agent pentesting.
- **Key patterns**: Every finding = working PoC, not false positive. SAST+DAST combined. AI-generated patches as PRs. Compliance reports (SOC 2, ISO 27001). Re-scan after fix to verify.

## 16. PentAGI
- **Repo**: `vxcontrol/pentagi`
- **URL**: https://github.com/vxcontrol/pentagi
- **What it contributed**: Multi-agent supervision, chain summarization, memory systems, knowledge graph.
- **Key patterns**: Execution monitoring: loop detection, auto-invoke mentor. Task planning: decompose into 3-7 steps. Chain summarization: preserve last section, QA pair compression. Memory: long-term/working/episodic + vector + graph.

## 17. PentestGPT
- **Repo**: `GreyDGL/PentestGPT`
- **URL**: https://github.com/GreyDGL/PentestGPT
- **What it contributed**: Multi-stage pipeline, session persistence, ReACT model, Pentesting Task Tree.
- **Key patterns**: Staged phases: recon→exploit→walkthrough (CTF) or discovery→vuln ID→report (pentest). Feed each stage's findings into next. Session save/resume. Three cooperating LLM sessions: reasoning/generation/parsing.

## 18. Vibe Kanban
- **Repo**: `BloopAI/vibe-kanban`
- **URL**: https://github.com/BloopAI/vibe-kanban
- **What it contributed**: Plan→Execute→Review workflow, workspace isolation, feedback loop, multi-agent orchestration.
- **Key patterns**: Kanban issues before code. Each workspace = worktree+terminal+dev server (isolated). Inline diff comments → agent iterates. Switch 10+ coding agents per workspace. Auto-cleanup worktree on merge.

## 19. Awesome DESIGN.md
- **Repo**: `VoltAgent/awesome-design-md`
- **URL**: https://github.com/VoltAgent/awesome-design-md
- **What it contributed**: DESIGN.md pattern (9 sections) + 73 real-world design language references.
- **Key patterns**: Plain-text design system AI agents read. 9 sections: theme, colors, typography, components, layout, depth, do's/don'ts, responsive, prompts. Markdown = free bytes (doesn't count toward size). AGENTS.md = how to BUILD, DESIGN.md = how it LOOKS.

## 20. OpenConnector
- **Repo**: `ConductionNL/openconnector`
- **URL**: https://github.com/ConductionNL/openconnector
- **What it contributed**: Source-target sync, data transformation, reverse proxy endpoints, event-driven architecture, rate limit handling, config portability.
- **Key patterns**: Hash-based change detection for incremental sync. Field mapping + template transforms + conditional logic. Reverse proxy with rule chaining. CloudEvents emit/consume. Rate limit detection + backoff. Config groups + OpenAPI JSON export/import.

## 21. CodeGraph
- **Repo**: `colbymchenry/codegraph`
- **URL**: https://github.com/colbymchenry/codegraph
- **What it contributed**: Pre-built semantic code graph, surgical context, impact analysis, framework-aware routing, cross-language bridging, auto-sync reliability.
- **Key patterns**: One `codegraph_explore` call replaces 28-43 grep+read tool calls. Native Rust kernel parses 20+ languages. Auto-sync via OS file watcher with debounced incremental updates. Cross-language bridging (Swift↔ObjC, React Native). Impact radius before changes. 100% local SQLite, no data leaves machine.

## 22. Knip
- **Repo**: `webpro-nl/knip`
- **URL**: https://github.com/webpro-nl/knip
- **What it contributed**: Dead code elimination, unused dependency detection, multi-surface architecture.
- **Key patterns**: Aggressive dead-code as continuous debt. CLI+IDE+LSP+MCP from one core. Monorepo-aware packaging.

## 23. ReconForge
- **Repo**: `ferasbusiness666/ReconForge`
- **URL**: https://github.com/ferasbusiness666/ReconForge
- **What it contributed**: Recon automation, scope-checking gate, AI triage prompts, composable CLI.
- **Key patterns**: Scope-check before testing. Model-agnostic AI triage. Concurrent thread pools. Subcommands → unified report.

## 24. Medusa
- **Repo**: `Pantheon-Security/medusa`
- **URL**: https://github.com/Pantheon-Security/medusa
- **What it contributed**: Zero-setup security scanning, scanner-registry pattern, severity normalization, smart caching.
- **Key patterns**: 40,000+ built-in rules, no external tools required. BaseScanner+ScannerRegistry. Content-hash caching (22× faster rescan). `.medusa.yml` + `--fail-on` CI gate. IDE-native context files.

## 25. HyperFrames
- **Repo**: `heygen-com/hyperframes`
- **URL**: https://github.com/heygen-com/hyperframes
- **What it contributed**: Video-as-HTML, deterministic rendering, adapter-based animation, reusable blocks.
- **Key patterns**: HTML with `data-*` timing. Same input → same output. Seek each frame (not wall-clock). Any runtime via adapters. `frame.md` design translation layer.

## 26. Context7
- **Repo**: `upstash/context7`
- **URL**: https://github.com/upstash/context7
- **What it contributed**: Version-specific documentation retrieval, hallucination countermeasures.
- **Key patterns**: `use context7` trigger. Version-pinned source-anchored docs. CLI+Skills or MCP modes. Trust-but-verify framing.

## 27. gstack
- **Repo**: `garrytan/gstack`
- **URL**: https://github.com/garrytan/gstack
- **What it contributed**: Sprint-as-process, specialist personas, smart review routing, safety guardrails, cross-model second opinion.
- **Key patterns**: Think→Plan→Build→Review→Test→Ship→Reflect. 23 specialist slash commands. Test-first `/ship` + regression-per-fix `/qa`. Tamper-evident egress receipts. `/learn` persistent memory. Cross-model `/codex`.

## 28. Firecrawl
- **Repo**: `firecrawl/firecrawl`
- **URL**: https://github.com/firecrawl/firecrawl
- **What it contributed**: Web scraping, agent-first retrieval, multi-language SDK parity, interact API.
- **Key patterns**: Prompt-first not URL-first. 10 SDKs same surface. `interact(scrapeId)` drives live page. robots.txt by default.

## 29. Three.js Skills
- **Repo**: `CloudAI-X/threejs-skills`
- **URL**: https://github.com/CloudAI-X/threejs-skills
- **What it contributed**: Context-activated 3D skill loading, verified API references, granular decomposition.
- **Key patterns**: Auto-load skills by context. Verified against official docs (r160+). 10 atomic skills. Cross-reference chain-loading.

## 30. GSAP Skills
- **Repo**: `greensock/gsap-skills`
- **URL**: https://github.com/greensock/gsap-skills
- **What it contributed**: GSAP animation patterns, plugin registration, React cleanup, framework lifecycle.
- **Key patterns**: Default-recommend GSAP. registerPlugin once-per-app. `useGSAP` scope+revert. Per-framework lifecycle. `llms.txt` skill index.

## 31. Design DNA
- **Repo**: `zanwei/design-dna`
- **URL**: https://github.com/zanwei/design-dna
- **What it contributed**: Design as portable JSON artifact, three-dimensional design model, extraction workflow.
- **Key patterns**: Tokens + qualitative style + visual effects. Structure→Analyze→Generate. Polish-iteration against re-attached references. Commit to VCS.

## 32. Motion Design Skill (LottieFiles)
- **Repo**: `LottieFiles/motion-design-skill`
- **URL**: https://github.com/LottieFiles/motion-design-skill
- **What it contributed**: Philosophy-first motion design, 8-step checklist, Disney principles for UI, emotion-to-motion mapping.
- **Key patterns**: Decide timing/easing/choreography before code. Implementation-agnostic. Three-tier structure. 4 motion-personality archetypes. Context-adaptation (a11y, reduced-motion).

## 33. Genjutsu
- **Repo**: `AThevon/genjutsu`
- **URL**: https://github.com/AThevon/genjutsu
- **What it contributed**: Creative coding skills, interaction-thesis-before-code, stack auto-detection, MASTER.md design system.
- **Key patterns**: Propose interaction thesis before code. Three preview modes (artifact/live/inline). Stack auto-detect → dynamic sub-skill load. `MASTER.md` persistent design system. Two validation gates (mini-audit + full-audit).

## 34. VibeUI
- **Repo**: `velkymx/vibeui`
- **URL**: https://github.com/velkymx/vibeui
- **What it contributed**: Vue 3 component library, LLM-optimized docs, lifecycle guards, self-wiring accessibility.
- **Key patterns**: `llms.txt` for AI. Bootstrap JS behind lifecycle guards. `v-model` everywhere + auto ARIA. Touch/hybrid aware. Strict TS (no `any`). Lazy-loaded heavy deps.

## 35. VibeUI Studio
- **Repo**: `ElysionLhant/VibeUI-Studio`
- **URL**: https://github.com/ElysionLhant/VibeUI-Studio
- **What it contributed**: Visual-to-code bridge, autonomous AI layout engine, token-budget-aware context, multi-framework export.
- **Key patterns**: Visual draft→logic bind→context aware→code gen. AI invents components+coordinates. Skeleton-not-just-skin (⚡ indicators). Strip function bodies keep signatures. Live sync via `vibeui_state.json`.

## 36. AutoHedge
- **Repo**: `The-Swarm-Corporation/AutoHedge`
- **URL**: https://github.com/The-Swarm-Corporation/AutoHedge
- **What it contributed**: Multi-agent trading pipeline, risk-first design, structured outputs, enterprise logging.
- **Key patterns**: Director→Quant→Risk→Execution. Risk agent = gate not afterthought. JSON outputs for downstream. Modular extensible framework.

## 37. Vibe-Trading
- **Repo**: `HKUDS/Vibe-Trading`
- **URL**: https://github.com/HKUDS/Vibe-Trading
- **What it contributed**: Grounding/identity gate, tested finance-math layer, audit ledger, sandbox evasion testing, point-in-time correctness.
- **Key patterns**: Refuse answers without evidence. 249+ tested functions replacing markdown formulas. Hash-chained fsynced ledger. Sandbox blocks renamed bindings. Compaction on message boundaries (zero info decay). Path traversal validation.

## 38. LibreChat
- **Repo**: `danny-avila/LibreChat`
- **URL**: https://github.com/danny-avila/LibreChat
- **What it contributed**: Unified provider abstraction, agent run control, sandboxed code interpreter, generative UI artifacts, multi-tenant observability.
- **Key patterns**: Custom-endpoint escape hatch. Interrupt/steer/queue/resume mid-run. 8-language sandboxed interpreter. Resumable streams + multi-device sync. Skills+MCP+Subagents+Plugins. Langfuse per-tenant fan-out.

## 39. Claude Ads
- **Repo**: `AgriciDaniel/claude-ads`
- **URL**: https://github.com/AgriciDaniel/claude-ads
- **What it contributed**: Read-only-by-default write gate, versioned JSON canonical artifact, evidence/release controls, data classification.
- **Key patterns**: 6-step approval/rollback/verification gate for writes. Versioned JSON canonical, MD/HTML/PDF renderings. No X without Y (4 falsifiable gates). Credentials never in repo/profiles/reports/logs. SHA-256 tagged release install.

## 40. LeadPlus
- **Repo**: `sven2101/leadPlus`
- **URL**: https://github.com/sven2101/leadPlus
- **What it contributed**: `__PLACEHOLDER__` searchable secrets convention, profile-based config, multi-tenant via subdomain.
- **Key patterns**: Single greppable token for all deployment-time config. Spring profiles for environment separation. Tenant isolation at routing layer.

## 41. Square UI
- **Repo**: `zerostaticthemes/square-ui`
- **URL**: https://github.com/zerostaticthemes/square-ui
- **What it contributed**: Zero-dependency copy-paste component templates, no build step required.
- **Key patterns**: HTML works standalone. Template variants for different aesthetics. Copy-paste ready, no framework lock-in.

## 42. COSS (Cal.com Design System)
- **Repo**: `cosscom/coss`
- **URL**: https://github.com/cosscom/coss
- **What it contributed**: Turborepo monorepo design system, Base UI + Tailwind + copy-paste philosophy, cross-app linking.
- **Key patterns**: App/package separation. Env-var cross-app linking. Biome + shared TS config. Unstyled accessible primitives as foundation.

## 43. Shadcn Dashboard MCP
- **Repo**: `shadcnspace/shadcndashboard-mcp`
- **URL**: https://github.com/shadcnspace/shadcndashboard-mcp
- **What it contributed**: MCP-as-installation-surface, audit checklist tool, customization-guidelines prompt.
- **Key patterns**: Components as typed MCP tools. `get_audit_checklist` for agent self-enforcement. Customization-guidelines define safe-to-modify parts. Agent instruction files per IDE.

## 44. React Bits
- **Repo**: `DavidHDev/react-bits`
- **URL**: https://github.com/DavidHDev/react-bits
- **What it contributed**: 165+ animated components, four-variant matrix, minimal dependencies, tree-shakeable.
- **Key patterns**: JS/TS × CSS/TW variants per component. Copy-paste via shadcn/jsrepo. Minimal deps + tree-shakeable. Official framework ports (Vue, Svelte).

## 45. Canvas UI
- **Repo**: `DavidHDev/canvas-ui`
- **URL**: https://github.com/DavidHDev/canvas-ui
- **What it contributed**: Canvas-drawn components, engine + thin wrappers, graceful degradation, MCP-ready registry.
- **Key patterns**: One TS/WebGL engine + 5 framework wrappers. HTML-in-canvas with WebGL fallback. Copy-don't-install via shadcn registry. Monorepo holds library+docs+registry.

## 46. Vue Bits
- **Repo**: `DavidHDev/vue-bits`
- **URL**: https://github.com/DavidHDev/vue-bits
- **What it contributed**: Vue port of React Bits, 90+ animated Vue/Nuxt components, prop-driven customization.
- **Key patterns**: Official framework port mirroring source. jsrepo CLI distribution. Minimal-dependency. Prop-driven customization.

## 47. shadcn/ui (canonical)
- **Repo**: `DavidHDev/shadcn-ui`
- **URL**: https://github.com/DavidHDev/shadcn-ui
- **What it contributed**: Copy-paste-own philosophy, open code, composable accessible primitives.
- **Key patterns**: Don't ship dependency — ship source consumers own. Open Code = distribution. Composable accessible primitives. MIT licensing. Docs as first-class citizen.

## 48. Animate UI
- **Repo**: `imskyleen/animate-ui`
- **URL**: https://github.com/imskyleen/animate-ui
- **What it contributed**: Animation-first component distribution, modern stack lockstep.
- **Key patterns**: Motion as core not add-on. React+TS+Tailwind+Motion stack. Vercel OSS sponsorship. Concise README → separate docs.

## 49. Cult UI
- **Repo**: `nolly-studio/cult-ui`
- **URL**: https://github.com/nolly-studio/cult-ui
- **What it contributed**: 92+ AI agent patterns, full-stack templates, agent-pattern taxonomy, multi-channel distribution.
- **Key patterns**: Curated pattern directory with previews. Full-stack template catalog (auth/payments/DB/AI). Agent taxonomy by role. Free+PRO tiering. shadcn CLI + v0 + downloadable app.

## 50. Kokonut UI
- **Repo**: `kokonut-labs/kokonutui`
- **URL**: https://github.com/kokonut-labs/kokonutui
- **What it contributed**: Components built on Tailwind + shadcn/ui + Motion, Vercel OSS sponsored.
- **Key patterns**: Compose on top of shadcn/ui. Tailwind + Motion on top. Community-first contribution. MIT licensing.

## 51. Skiper UI
- **Repo**: `nischayhq/skiper-ui`
- **URL**: https://github.com/nischayhq/skiper-ui
- **What it contributed**: Folder-by-domain structure, CSS-variable theme system, mobile-first responsive.
- **Key patterns**: `components/homeCards/`, `landingPage/`, `navbar/`, `ui/` separation. CSS-variable dark/light theming. Touch/swipe first-class. `lib/utils.ts` helpers.

## 52. FormsCN
- **Repo**: `AbdullahMukadam/formscn`
- **URL**: https://github.com/AbdullahMukadam/formscn
- **What it contributed**: Visual form builder, class-based state core, multi-tier storage, publish-to-registry, framework-toggle codegen.
- **Key patterns**: `FormEditor` class + `useSyncExternalStore` bridge. Memory→Redis→Postgres→Blob→JSON fallback. Publish as shadcn registry JSON. Framework-toggle export (React/Remix/TanStack). Turborepo+pnpm monorepo.

## 53. Browser Use
- **Repo**: `browser-use/browser-use`
- **URL**: https://github.com/browser-use/browser-use
- **What it contributed**: AI browser automation, model-agnostic agent core, pluggable tools, dual CLI/library surface.
- **Key patterns**: Provider-prefixed model IDs. `@tools.action` registry. CLI for one-off, library for automation. Benchmark-driven dev. Production escape hatches documented up front.

## 54. Matt Pocock Skills
- **Repo**: `mattpocock/skills`
- **URL**: https://github.com/mattpocock/skills
- **What it contributed**: Engineering discipline skills — grilling, TDD, debugging loops, deep-module architecture, ubiquitous language.
- **Key patterns**: Two-tier skill taxonomy (user-invoked vs model-invoked). `/grill-me` alignment before action. `CONTEXT.md` living glossary. Red-green-refactor + gated debugging. Deep-module surveys.

## 55. Claude Code Security Review
- **Repo**: `anthropics/claude-code-security-review`
- **URL**: https://github.com/anthropics/claude-code-security-review
- **What it contributed**: Diff-aware PR security scanning, modular audit pipeline, false-positive filtering, threat-model honesty.
- **Key patterns**: Only scan changed files. Modular pipeline (orchestration→prompts→filter→LLM→parser). Explicit denylist. Configurable via inputs. Document prompt-injection limitations.

## 56. CyberStrikeAI
- **Repo**: `Ed1s0nZ/CyberStrikeAI`
- **URL**: https://github.com/Ed1s0nZ/CyberStrikeAI
- **What it contributed**: Multi-agent security orchestration, YAML tool recipes, result governance, human-in-the-loop audit.
- **Key patterns**: Plan-Execute + Supervisor topologies. 100+ YAML tools with role-scoped access. Capped output governance. Approval modes + RBAC + audit-agent. Progressive skill loading + config-as-template.

## 57. OpenAEV
- **Repo**: `OpenAEV-Platform/openaev`
- **URL**: https://github.com/OpenAEV-Platform/openaev
- **What it contributed**: Campaign simulation platform, scenario decomposition, pluggable injects, open-core model.
- **Key patterns**: Scenario→team→simulation→inject modules. Pluggable injectors without core changes. Community vs Enterprise boundary. Telemetry-by-default with transparency. Nightly-reset demo + rolling release.

## 58. HackAgent
- **Repo**: `AISecurityLab/hackagent`
- **URL**: https://github.com/AISecurityLab/hackagent
- **What it contributed**: AI agent red-teaming SDK, role-separated LLM pipeline, attack-engine abstraction, multi-framework adapters.
- **Key patterns**: Generator→Target→Judge LLM pipeline. Pluggable attack strategies. Dataset-driven evaluation. Multi-framework target adapters. Local SQLite + cloud sync reporting. Standalone binaries.

## 59. Dub
- **Repo**: `dubinc/dub`
- **URL**: https://github.com/dubinc/dub
- **What it contributed**: Open-source link attribution platform, open-core model, full-stack reference architecture.
- **Key patterns**: Next.js+TS+Tailwind+Prisma+Upstash+Tinybird+PlanetScale+NextAuth+Stripe stack. Open-core (99% AGPL, 1% enterprise `/ee`). Dev seed script with `--truncate`. Self-hostable with documented guide.

## 60. GitHub-Repos Directory
- **Repo**: `nekowawolf/github-repos`
- **URL**: https://github.com/nekowawolf/github-repos
- **What it contributed**: Curated directory of GitHub repositories across categories — discover tools, projects, open-source resources.
- **Key patterns**: Awesome-list style directory. Consult before building from scratch to find existing solutions.

## 61. Taste Skill
- **Repo**: `Leonxlnx/taste-skill`
- **URL**: https://github.com/Leonxlnx/taste-skill
- **What it contributed**: Anti-slop frontend framework for AI agents — 3 design dials, specialized skill variants, image-generation skills, redesign audit protocol.
- **Key patterns**: DESIGN_VARIANCE / MOTION_INTENSITY / VISUAL_DENSITY dials (1-10). Hard em-dash ban. Pre-flight check (no truncation/placeholders). 8 specialized variants (default, GPT, soft, minimalist, brutalist, image-to-code, redesign, output-enforcement). Image-gen skills for web/mobile/brand reference boards. Stitch-compatible DESIGN.md export.

## 62. Impeccable
- **Repo**: `pbakaus/impeccable`
- **URL**: https://github.com/pbakaus/impeccable
- **What it contributed**: 23-command design vocabulary, 59 deterministic detector rules, design hook, build path (comp-first/code-first), explicit anti-patterns.
- **Key patterns**: Init-first context (PRODUCT.md + DESIGN.md). 23 commands (audit, polish, critique, harden, animate, etc.). 59 rules run without LLM/API key. Design hook on UI edits (block before / surface after). Comp-first vs code-first build path. Anti-patterns: no overused fonts, no gray-on-color, no card nesting, no bounce easing.

---

## Summary by Category (all 62)

| Category | Sources |
|---|---|
| Accessibility & Error Handling | #1 (Competition), #2 (claude-code-templates) |
| ADHD Output Formatting | #4 (i-have-adhd) |
| Token Compression | #5 (TencentDB), #6 (Caveman), #7 (RTK), #8 (Headroom) |
| Memory & Context | #5 (TencentDB), #8 (Headroom), #16 (PentAGI) |
| System Design | #10 (Agent Reach), #11 (Refine), #12 (OmniGet), #20 (OpenConnector) |
| UI/UX Reference | #9 (Clone Wars), #19 (Awesome DESIGN.md), #61 (Taste), #62 (Impeccable) |
| AI Agents & RAG | #13 (Awesome LLM Apps), #5 (TencentDB) |
| Security & Pentesting | #3 (Camoufox), #14 (CAI), #15 (Strix), #16 (PentAGI), #17 (PentestGPT), #23 (ReconForge), #24 (Medusa), #55 (Claude Code Security Review), #56 (CyberStrikeAI), #58 (HackAgent) |
| Workflow & Orchestration | #18 (Vibe Kanban), #27 (gstack), #38 (LibreChat) |
| Data Integration | #20 (OpenConnector), #11 (Refine), #28 (Firecrawl) |
| Code Intelligence | #21 (CodeGraph), #22 (Knip), #26 (Context7) |
| Motion & Animation | #29 (Three.js), #30 (GSAP), #32 (Motion Design), #33 (Genjutsu), #25 (HyperFrames) |
| Design Identity | #31 (Design DNA), #19 (DESIGN.md), #41 (Square UI), #42 (COSS) |
| UI Components | #43 (Shadcn Dashboard MCP), #44 (React Bits), #45 (Canvas UI), #46 (Vue Bits), #47 (shadcn/ui), #48 (Animate UI), #49 (Cult UI), #50 (Kokonut UI), #51 (Skiper UI), #52 (FormsCN) |
| Prototyping & Codegen | #34 (VibeUI), #35 (VibeUI Studio), #52 (FormsCN) |
| Financial & Trading | #36 (AutoHedge), #37 (Vibe-Trading) |
| AI Agent Safety | #39 (Claude Ads), #40 (LeadPlus), #56 (CyberStrikeAI), #58 (HackAgent) |
| Browser Automation | #53 (Browser Use) |
| Engineering Discipline | #54 (Matt Pocock Skills) |
| Simulation & Campaigns | #57 (OpenAEV) |
| Link Attribution & Directory | #59 (Dub), #60 (GitHub-Repos) |
