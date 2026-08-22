# DESIGN.md — Minimalist / Editorial

## 1. Theme & Atmosphere
Editorial calm (Notion/Linear feel). Generous whitespace, crisp structure, restrained palette. Content leads.

## 2. Color Palette
| Token | Hex | Role |
|---|---|---|
| `--bg` | `#fafaf9` | Light canvas |
| `--surface` | `#ffffff` | Cards |
| `--surface-alt` | `#f4f4f5` | Hover, muted fill |
| `--text` | `#18181b` | Primary |
| `--text-soft` | `#71717a` | Secondary |
| `--border` | `#e4e4e7` | Hairlines |
| `--accent` | `#18181b` | Accent (ink, not color) |

## 3. Typography
Display `1.5rem/700`, Heading `1.0625rem/600`, Body `0.9375rem/400` line-height 1.6, Caption `0.8125rem/500`. System sans, generous letter-spacing on headings.

## 4. Components
- Buttons: square (`rounded-md`), ghost outlines, ink hover.
- Cards: `rounded-md surface border hairline` — minimal shadow (use borders over shadows).
- Inputs: underline style, hairline border, focus = 2px ink ring.

## 5. Layout
Single narrow column (max 720px) reads like a document. Vertical rhythm 24px. List rows separated by hairlines, no card boxes.

## 6. Depth
Flat. Hairlines do the separation. Shadows near-zero.

## 7. Do's & Don'ts
- ✅ One accent (ink). ✅ Hairlines over shadows. ✅ 24px rhythm.
- ❌ No gradients. ❌ No rounded-full pills. ❌ No more than 2 font weights per component.

## 8. Responsive
Same single column all sizes. Density stays low. Touch 44px.

## 9. Agent Prompt
```
Minimalist editorial: bg=#fafaf9 text=#18181b hairline borders #e4e4e7.
Ink accent #18181b. Hairlines not shadows. Narrow 720px column, 24px rhythm.
System sans, headings 600 weight. No gradients, no pills, no color accents.
```