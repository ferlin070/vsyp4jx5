# Peta Rajah Aliran — Ponytail Pro Max

Bagaimana repo ini berfungsi dari *brief* hingga *submit + deploy*. Dua versi:
[Mermaid](#mermaid-versi-githubmermaidlive) dan [ASCII](#ascii-versi-terminal).

## Mermaid (versi GitHub/mermaid.live)

````markdown
```mermaid
flowchart TD
    B["Brief teks<br/><i>npm run brief \"...\"</i>"] --> DETECT

    subgraph BRIEF["npm run brief — terjemah brief ke scaffold"]
        DETECT{"Langkah 1-3"} --> LANG["Daftar bahasa:<br/>Malay? → PRD.md Bahasa Melayu<br/>English → PRD.md English"]
        LANG --> DESIGN["Pilih design by keyword:<br/>wang/belanja→fintech, kedai→ecommerce,<br/>kanban→kanban, chat→chat-ai... → DESIGN.md"]
        DESIGN --> DOMAIN{"Daftar domain<br/>dari guard schema.ts"}
        DOMAIN -->|finance| F["types.ts + schema.ts + storage.ts<br/>+ tests — isExpense, sumExpenses..."]
        DOMAIN -->|ecommerce| P["types.ts + schema.ts + storage.ts<br/>+ tests — isProduct, inventoryValue..."]
        DOMAIN -->|task| T["types.ts + schema.ts + storage.ts<br/>+ tests — isTask, openTasks..."]
        DOMAIN -->|generic| G["types.ts + schema.ts + storage.ts<br/>+ tests — isItem, search..."]
    end

    B -. "repo baru? .ponytail-ready tiada" .-> INIT["npm run init<br/>shell CRUD + landmark HTML + a11y"]
    INIT --> F

    F & P & T & G --> SEED["npm run seed 6<br/>seedData.ts + seedData.test.ts<br/>(data mesti lulus guard sendiri)"]
    SEED --> DEV["npm run dev — bina app<br/>kepada senarai semak PRD"]

    subgraph GATES["Gates pra-hantar (npm run verify = 8 gate serentak)"]
        DEV --> A1["audit — skor Completeness/P&S/Craft<br/>fix baris ❌"]
        A1 --> A2["e2e — Chromium real browser<br/>CRUD + axe 0 violation + screenshot"]
        A2 --> A3["typecheck strict"]
        A3 --> A4["unit tests"]
        A4 --> A5["build (tsc && vite)"]
        A5 --> A6["size ≤ 64KB (sizecheck)"]
        A6 --> A7["git status bersih"]
    end

    A7 --> PUSH["git push → CI (ci.yml):<br/>verify + audit --fail → badge ✅"]
    PUSH --> SUBMIT["npm run submit<br/>SUBMISSION.md (skor + screenshot + checklist)"]

    PUSH --> DEPLOY["npm run deploy"]
    DEPLOY --> D1["netlify / vercel"]
    DEPLOY --> D2["docker — imej nginx (Dockerfile)"]
    DEPLOY --> D3["ssh — rsync dist/ ke VPS"]
```
````

## ASCII (versi terminal)

```
 Brief ──► npm run brief
              │
              ├─ bahasa? ──► PRD.md (BM / EN)
              ├─ kata kunci? ──► DESIGN.md (fintech/ecommerce/kanban/chat…)
              ├─ guard dalam schema? ──► types.ts + schema.ts + storage.ts + tests
              │        (finance | ecommerce | task | generic — semua strict-clean)
              └─ repo baru? ──► npm run init (shell CRUD + a11y)

 seedData.ts ──► npm run seed ──► dev ──► bina app ke senarai semak PRD

 Gates:  audit → e2e(axe) → typecheck → test → build → size → git-status
                                      │  (npm run verify = semua sekali)
                                      ▼
                               git push ──► CI (verify + audit --fail)
                                      │        │
                                      │        └─ badge ✅ di README
                                      ├─► npm run submit → SUBMISSION.md
                                      └─► npm run deploy → netlify | vercel | docker | ssh
```

## Nota aliran

- **brief** dijalankan sekali sahaja; `npm run seed` + `npm run dev` boleh diulang sekerap perlu.
- **verify** ialah pintu keluar — jika mana-mana gate gagal, jangan push.
- **deploy** boleh berlaku awal (workflow perlumbaan: deploy kosong → URL awal), bukan hanya di akhir.
- **CI (ci.yml)** menguatkuasakan verify + audit `--fail` pada setiap push; badge hijau = semua gate lulus di GitHub.