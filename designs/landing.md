# DESIGN.md — Landing / Marketing

## 1. Theme & Atmosphere
Bold, confident, conversion-driven. One clear message above the fold. Whitespace is a weapon.

## 2. Color Palette
| Token | Hex | Role |
|---|---|---|
| `--bg` | `#ffffff` | Background |
| `--ink` | `#0f172a` | Headlines/CTAs |
| `--text-soft` | `#64748b` | Body copy |
| `--accent` | `#4f46e5` | Primary CTA |
| `--accent-hover` | `#4338ca` | CTA hover |
| `--border` | `#e2e8f0` | Hairlines |

## 3. Typography
Display `clamp(2rem, 6vw, 3.5rem)/800`, Heading `1.25rem/700`, Body `1rem/400`, Mono labels `0.75rem/600`. System stack.

## 4. Components
- Hero: centered headline + one-line subcopy + primary CTA `rounded-full px-8 py-3`.
- Feature cards: `rounded-2xl border p-6`, icon + title + 1-line copy.
- Nav: sticky, hairline bottom border, logo left, CTA right.
- Footer: 3 columns of links, muted.

## 5. Layout
Centered column max-w-3xl for hero. Features: `grid auto-fit minmax(240px,1fr)`. Section padding `clamp(3rem,8vw,6rem)`.

## 6. Depth
CTAs `shadow-lg`. Cards flat with border. Hero text on bg, no glass.

## 7. Do's & Don'ts
- ✅ One CTA per viewport. ✅ Real product value in the headline.
- ❌ No carousels. ❌ No lorem ipsum. ❌ No pure-black-on-white body (use ink).

## 8. Responsive
Stack hero at <640px, shrink display to 2rem. Grid auto-fits. Touch targets 44px.

## 9. Agent Prompt
```
Landing theme: bg=#ffffff ink=#0f172a accent=#4f46e5.
Hero headline clamp(2rem,6vw,3.5rem) 800. One CTA per screen.
System fonts. No carousels, no lorem ipsum. Sticky nav with hairline border.
```