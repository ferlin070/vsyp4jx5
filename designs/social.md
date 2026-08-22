# DESIGN.md — Social Feed

## 1. Theme & Atmosphere
Warm, human, lively. Content first; actions quiet until needed.

## 2. Color Palette
| Token | Hex | Role |
|---|---|---|
| `--bg` | `#fafaf9` | Background |
| `--surface` | `#ffffff` | Post cards |
| `--text` | `#1c1917` | Text |
| `--text-soft` | `#78716c` | Meta |
| `--border` | `#e7e5e4` | Dividers |
| `--accent` | `#d97706` | Likes/active |
| `--link` | `#2563eb` | Links |

## 3. Typography
Post body `0.95rem/400`, username `0.9rem/700`, meta `0.75rem/400`. System stack.

## 4. Components
- Post card: avatar + username + time, body, optional media block, action row (Like/Reply/Share as icon buttons with `aria-label`).
- Composer: textarea + char count + submit; `role="status"` for success.
- Empty feed: centered illustration + "Follow someone to see posts".
- Like toggle: animates, announces via live region.

## 5. Layout
Single centered column max-w-2xl. Post padding `p-4`, gap 12px. Avatar `rounded-full 40px`.

## 6. Depth
Cards flat with hairline border. Composer sticky at top with `shadow-sm`.

## 7. Do's & Don'ts
- ✅ All icon buttons have aria-labels. ✅ Threaded replies indent.
- ❌ No autoplay media. ❌ No infinite scroll without a load-more button fallback.
- ❌ No bare "liked" state without visual change.

## 8. Responsive
Single column always. Action row wraps at <480px. Touch targets 44px.

## 9. Agent Prompt
```
Social theme: bg=#fafaf9 surface=#ffffff accent=#d97706 text=#1c1917.
Feed max-w-2xl centered, posts rounded with hairline border, p-4.
Icon buttons with aria-label, live region for likes. System fonts.
```