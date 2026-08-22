# DESIGN.md — Dashboard / Admin

## 1. Theme & Atmosphere
High information density, professional, legible at a glance. Dark UI, status dots, data-first hierarchy.

## 2. Color Palette
| Token | Hex | Role |
|---|---|---|
| `--bg` | `#0f172a` | App background |
| `--surface` | `#1e293b` | Panels |
| `--surface-alt` | `#334155` | Inputs/hover |
| `--text` | `#f1f5f9` | Primary |
| `--text-soft` | `#94a3b8` | Secondary |
| `--border` | `#334155` | Dividers |
| `--primary` | `#3b82f6` | Brand/CTA |
| `--ok` | `#22c55e` | Green status |
| `--warn` | `#f59e0b` | Amber status |
| `--bad` | `#ef4444` | Red status |

## 3. Typography
Compact: Display `1.25rem/700`, Card title `0.875rem/600`, Body `0.8125rem/400`, Data `0.875rem/600` mono. Tight line-height 1.4.

## 4. Components
- Stat card: label (uppercase, 11px, soft) + value (mono, 1.25rem, bold).
- Status dot: 8px circle with `--ok/--warn/--bad` + `aria-label`.
- Buttons `rounded-md px-3 py-1.5 text-xs`. Table rows `h-10` with hover.

## 5. Layout
Sidebar (or top bar on mobile) + content grid. CSS Grid `repeat(auto-fit, minmax(240px, 1fr))` for stat cards. Dense but 12px gaps.

## 6. Depth
Panels `shadow-md`. No nesting of cards inside cards — use dividers instead.

## 7. Do's & Don'ts
- ✅ Status dots always color+label (never color alone). ✅ Uppercase micro-labels.
- ✅ Skeleton loaders over spinners.
- ❌ No card-in-card nesting. ❌ No pure black. ❌ No decorative gradients.

## 8. Responsive
<768px: sidebar collapses to top nav, grid becomes 1-col. Data table scrolls horizontally. Touch 44px.

## 9. Agent Prompt
```
Dashboard dark: bg=#0f172a surface=#1e293b primary=#3b82f6.
Status dots ok=#22c55e warn=#f59e0b bad=#ef4444 (always labeled).
Uppercase 11px micro-labels, mono data values. auto-fit grid, 12px gaps.
Skeletons not spinners. No nested cards, no pure black.
```