# DESIGN.md — Kanban / Task Board

## 1. Theme & Atmosphere
Organized, fast, scannable. Columns breathe; cards carry density.

## 2. Color Palette
| Token | Hex | Role |
|---|---|---|
| `--bg` | `#f8fafc` | Background |
| `--surface` | `#ffffff` | Cards |
| `--surface-alt` | `#f1f5f9` | Column bg |
| `--text` | `#0f172a` | Text |
| `--text-soft` | `#64748b` | Meta |
| `--border` | `#e2e8f0` | Dividers |
| `--accent` | `#2563eb` | Primary |
| `--priority-high` | `#dc2626` | High chip |
| `--priority-low` | `#16a34a` | Low chip |

## 3. Typography
Card title `0.9rem/600`, meta `0.75rem/400`, column header `0.8rem/700 uppercase`. System stack.

## 4. Components
- Columns: `rounded-xl surface-alt p-3`, header with title + count badge, `min-h-[60vh]` drop zone.
- Cards: `rounded-lg surface border p-3 shadow-sm`, drag handle, priority chip, due date.
- Add card: inline input at column bottom, Enter to submit.
- Chips: `rounded-full px-2 py-0.5 text-xs` priority-colored.

## 5. Layout
Horizontal scroll columns: `grid auto-flow-col gap-4 overflow-x-auto`. Column width `clamp(260px, 28vw, 320px)`. Card spacing 8px.

## 6. Depth
Cards `shadow-sm`, raised on drag (`shadow-lg rotate-1`). Columns flat.

## 7. Do's & Don'ts
- ✅ Keyboard drop (Arrow keys + Enter). ✅ Visual drop indicator.
- ❌ No text-only priority (color + label). ❌ No infinite column height.

## 8. Responsive
<640px: columns stack vertically, full width. Touch targets 44px.

## 9. Agent Prompt
```
Kanban theme: bg=#f8fafc surface=#ffffff column=#f1f5f9 accent=#2563eb.
Columns auto-flow-col horizontal scroll, cards rounded-lg shadow-sm.
Priority chips color+label, keyboard accessible drag. System fonts.
```