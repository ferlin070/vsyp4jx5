# Ponytail React — React + TypeScript + Tailwind variant

The **7 Ponytail Pro Max weapons**, ported to React hooks. Same guardrails, zero ceremony.

| Vanilla weapon | React port | Location |
| --- | --- | --- |
| `state.ts` (pub/sub) | `useLocalStorage` (ref-backed commit) | `src/lib/hooks.ts` |
| `storage.ts` | `storage.ts` (same error-safe API) | `src/lib/storage.ts` |
| `validate.ts` | `validate.ts` (same guards) | `src/lib/validate.ts` |
| `format.ts` | `format.ts` (escape/date/currency/debounce) | `src/lib/format.ts` |
| `dom.ts` (announce) | `useAnnounce` (live region) | `src/lib/hooks.ts` |
| `render.ts` | n/a (JSX replaces it) | — |
| `modal.ts` | `Modal` + `useModal` (focus trap, Escape, restore) | `src/lib/modal.tsx` |

## Stack
- React 19 + TypeScript (strict, `noUncheckedIndexedAccess`)
- Vite 5 + Tailwind CSS v4 (theme tokens in `src/index.css`)
- Vitest + Testing Library (22 tests)

## Commands
```bash
npm install
npm run dev          # start dev server
npm test             # 22 tests
npm run typecheck    # strict TS
npm run build        # tsc + vite build
npm run size         # check source bytes against the cap (pass yours: npm run size -- 40)
npm run init my-app  # scaffold a real app (replaces demo, domain stubs, .ponytail-ready)
npm run verify       # all gates in one command
npm run deploy       # build + deploy to Netlify/Vercel/Docker/SSH
```

## Starting a new React app
```bash
npx degit ferlin070/ponytail-pro-max my-app
cd my-app/react-tailwind
npm install
npm run init my-app   # replaces the demo with a CRUD shell wired to the hooks
npm run dev
```
`init` writes domain stubs (`types.ts`/`domain.ts`/`store.ts`), a fresh `App.tsx`,
renames the package, and arms the demo guard (`assert-app` in verify).

## The demo (`src/App.tsx`)
A full CRUD app proving every weapon together:
- persistence via `useLocalStorage` — saves through a ref, never inside a state updater
- dismissible error banner for storage failures (`role="alert"`)
- delete guarded by a focus-trapped `Modal` with confirmation
- screen-reader announcements via `useAnnounce` live region
- validation reuse of the vanilla `validate.ts` guards

Swap the `Item` schema and you have a new app. This exact pattern shipped as a
real product app and scored 90+ in review.

## Adding a React app from this variant
1. Delete the demo: replace `src/App.tsx` + `src/main.tsx`.
2. Define your own schema + `is*` validator, feed it to `useLocalStorage`.
3. Wrap risky deletes/forms in `Modal` + `useModal`.
4. Announce every mutation. Keep `prefers-reduced-motion` block in `index.css`.
5. Never call `setState` inside an updater. Use a ref + explicit commit like `useLocalStorage`.