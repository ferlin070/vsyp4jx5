# DESIGN.md — Mobile-First / App

## 1. Theme & Atmosphere
Thumb-friendly, bright, tactile. Rounded surfaces, clear primary action, bottom-sheet friendly.

## 2. Color Palette
| Token | Hex | Role |
|---|---|---|
| `--bg` | `#f8fafc` | Canvas |
| `--surface` | `#ffffff` | Cards/sheets |
| `--text` | `#0f172a` | Primary |
| `--text-soft` | `#64748b` | Secondary |
| `--border` | `#e2e8f0` | Hairlines |
| `--primary` | `#0ea5e9` | CTA |
| `--primary-hover` | `#0284c7` | Hover |
| `--danger` | `#ef4444` | Destructive |

## 3. Typography
Large & legible on small screens: Display `1.75rem/700`, Heading `1.125rem/600`, Body `1rem/400` (min 16px to prevent iOS zoom), Caption `0.8125rem/500`.

## 4. Components
- Primary action: full-width bottom bar button (`h-12 rounded-xl primary`) — thumb zone.
- Cards `rounded-2xl surface border-hairline p-4`.
- Inputs `h-11 rounded-xl surface-alt` with 16px font.
- FAB for add where a list is the core view.

## 5. Layout
Single column. Content 16px gutters. Sticky bottom action bar. Max-width 480px centered on larger screens.

## 6. Depth
Cards `shadow-sm`. Bottom sheet `shadow-2xl` + rounded-t-3xl.

## 7. Do's & Don'ts
- ✅ Min 16px input font (no iOS zoom). ✅ 44-48px touch targets. ✅ Primary action thumb-reachable.
- ❌ No hover-only states (touch). ❌ No tiny text under 14px. ❌ No nested cards.

## 8. Responsive
Mobile-first core; ≥768px widens to two panels (list + detail) but never hides the primary action.

## 9. Agent Prompt
```
Mobile-first app: bg=#f8fafc primary=#0ea5e9 danger=#ef4444.
16px+ body (no iOS zoom), 48px touch targets, sticky bottom primary button.
Cards rounded-2xl, inputs h-11. Max-width 480px centered on desktop.
System fonts only. No hover-only interactions.
```