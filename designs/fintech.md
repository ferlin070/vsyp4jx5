# DESIGN.md — Fintech / Money

## 1. Theme & Atmosphere
Calm, trustworthy, precise. Money clarity without corporate stiffness. Numbers are heroes.

## 2. Color Palette
| Token | Hex | Role |
|---|---|---|
| `--bg` | `#0b1220` | Background |
| `--surface` | `#111a2e` | Cards/panels |
| `--surface-alt` | `#1b2740` | Inputs, hover |
| `--text` | `#e2e8f0` | Primary text |
| `--text-soft` | `#8fa3bf` | Secondary |
| `--border` | `#22304a` | Dividers |
| `--accent` | `#10b981` | Positive/gain |
| `--danger` | `#ef4444` | Negative/loss |
| `--warning` | `#f59e0b` | Alerts |

## 3. Typography
- Display `1.875rem/700`, Heading `1.125rem/600`, Body `0.875rem/400`, Mono (numbers) `0.9rem/600`. System stack only.

## 4. Components
- Buttons `rounded-lg px-4 py-2 text-sm font-medium`, primary=accent.
- Cards `rounded-xl surface border border-border p-5`.
- Inputs `rounded-lg surface-alt border-border`, focus ring accent.
- Amounts always mono, right-aligned.

## 5. Layout
Mobile single column. Desktop: stats grid on top, chart+list below. Spacing 4px scale. Max-width 1024px.

## 6. Depth
Cards `shadow-lg`. Modals `shadow-2xl` + backdrop blur. Inputs flat.

## 7. Do's & Don'ts
- ✅ Currency prefix (RM/$) + thousand separators. ✅ Green/red semantic only.
- ❌ No rainbow category colors. ❌ No decorative emoji on money. ❌ No pure black.

## 8. Responsive
<640px single column; 640-1024px 2-col stats; >1024px grid. Touch targets 44px.

## 9. Agent Prompt
```
Fintech theme: bg=#0b1220 surface=#111a2e accent=#10b981 danger=#ef4444.
Monospace numbers with RM prefix. System fonts. Cards rounded-xl.
Mobile-first, desktop stats grid. No external fonts, no pure black.
```