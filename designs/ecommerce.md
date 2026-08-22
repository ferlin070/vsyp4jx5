# DESIGN.md — E-commerce / Storefront

## 1. Theme & Atmosphere
Warm, inviting, product-forward. Light, spacious, high-trust. Imagery and prices lead.

## 2. Color Palette
| Token | Hex | Role |
|---|---|---|
| `--bg` | `#ffffff` | Background |
| `--surface` | `#fafafa` | Cards/filters |
| `--text` | `#111827` | Primary |
| `--text-soft` | `#6b7280` | Secondary |
| `--border` | `#e5e7eb` | Hairlines |
| `--primary` | `#f97316` | CTA (warm orange) |
| `--primary-hover` | `#ea580c` | Hover |
| `--danger` | `#dc2626` | Sale/error |

## 3. Typography
Display `1.5rem/700`, Product title `1rem/600`, Body `0.875rem/400`, Price `1rem/700`, Badge `0.6875rem/600 uppercase`. System stack.

## 4. Components
- Product card: image (4:3, `object-cover`), title, price, Add button. Hover: image zoom 1.03, card shadow.
- Price: bold, never grayed on white. Sale: strikethrough soft + red.
- Buttons `rounded-full px-5 py-2.5` for primary CTA.

## 5. Layout
Hero band (optional) → product grid `repeat(auto-fill, minmax(200px, 1fr))`. Filter sidebar on desktop, horizontal scroll chips on mobile. Max-width 1200px.

## 6. Depth
Cards `shadow-sm`, hover `shadow-md`. Hero uses soft gradient overlay.

## 7. Do's & Don'ts
- ✅ Prices always legible (contrast 4.5:1). ✅ Badges uppercase tiny.
- ❌ No nested cards. ❌ No pure-gray on white for prices. ❌ No busy background patterns.

## 8. Responsive
Mobile: 2-col product grid, filter chips horizontally scrollable. Touch 44px. Image aspect locked.

## 9. Agent Prompt
```
E-commerce: bg=#ffffff primary=#f97316 hover=#ea580c danger=#dc2626.
Prices bold, contrast >=4.5:1. Cards rounded-lg, hover shadow.
Grid auto-fill minmax(200px,1fr), max-width 1200px. Uppercase small badges.
System fonts, no external fonts. Image 4:3 object-cover.
```