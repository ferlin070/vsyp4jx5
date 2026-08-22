# DESIGN.md — News / Editorial

## 1. Theme & Atmosphere
Serif authority, restrained palette. Hierarchy does the shouting; color stays quiet.

## 2. Color Palette
| Token | Hex | Role |
|---|---|---|
| `--bg` | `#ffffff` | Background |
| `--surface` | `#f5f5f4` | Cards |
| `--text` | `#1c1917` | Body |
| `--text-soft` | `#57534e` | Meta/byline |
| `--border` | `#e7e5e4` | Rules |
| `--accent` | `#b91c1c` | Breaking/links |
| `--tag` | `#fef2f2` | Tag chips |

## 3. Typography
Display `clamp(1.5rem,4vw,2.5rem)/800` serif (Georgia), Body `1rem/400` serif, Meta `0.75rem/400` sans. Headlines `serif 700`.

## 4. Components
- Masthead: serif title centered, date + section nav in hairline rules.
- Article card: section tag + headline + dek + byline + time, image optional.
- Lead story: full-width at top, larger display.
- Article body: `max-w-[65ch] mx-auto`, first-paragraph drop cap optional.

## 5. Layout
Lead story full-width; below `grid auto-fit minmax(280px,1fr)`. Section hairlines `1px border`. Spacing 24px.

## 6. Depth
Cards flat, hairline borders only. No shadows, no glass.

## 7. Do's & Don'ts
- ✅ Real hierarchy: lead > featured > list. ✅ Serif for reading, sans for meta.
- ❌ No dark mode as default. ❌ No autoplay video. ❌ No pure black body (use `#1c1917`).

## 8. Responsive
Lead stacks at <640px. Grid auto-fits. Reading width `65ch`. Touch targets 44px.

## 9. Agent Prompt
```
Editorial theme: bg=#ffffff text=#1c1917 accent=#b91c1c.
Serif (Georgia) for headlines+body, sans for meta. Lead story full-width.
Grid auto-fit 280px for cards. Hairline borders, no shadows, no dark default.
```