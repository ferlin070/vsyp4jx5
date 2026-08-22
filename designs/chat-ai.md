# DESIGN.md — Chat / AI Assistant

## 1. Theme & Atmosphere
Focused, calm, conversational. The transcript is the hero; controls recede.

## 2. Color Palette
| Token | Hex | Role |
|---|---|---|
| `--bg` | `#0f172a` | Background |
| `--surface` | `#1e293b` | Bubble/panels |
| `--surface-alt` | `#334155` | Input, hover |
| `--text` | `#f1f5f9` | Messages |
| `--text-soft` | `#94a3b8` | Meta/time |
| `--user` | `#6366f1` | User bubble |
| `--assistant` | `#1e293b` | Assistant bubble |
| `--danger` | `#ef4444` | Error states |

## 3. Typography
Body `0.95rem/400` messages, Mono `0.8rem` for tokens/time, Heading `1rem/600`. System stack.

## 4. Components
- Messages: user right-aligned `rounded-2xl bg-user text-white p-3 max-w-[75%]`, assistant left `bg-assistant`.
- Composer: sticky bottom, `rounded-2xl surface-alt` input + send button `rounded-full bg-accent`.
- Typing indicator: 3 animated dots, `aria-live="polite"`.
- Error: `role="alert"` banner above composer, never silent.

## 5. Layout
Flex column: header (48px), transcript (flex-1, overflow-y-auto, max-w-2xl centered), composer pinned bottom. Spacing 8px between bubbles.

## 6. Depth
Composer `shadow-lg` top edge. Bubbles flat. Backdrop `#000/40` on modal.

## 7. Do's & Don'ts
- ✅ Every assistant message reachable by keyboard. ✅ Skeleton/typing for latency.
- ❌ No auto-scroll on user scroll-up. ❌ No flashing/full-screen loaders.
- ❌ No auto-playing audio.

## 8. Responsive
Single column always. Composer full-width on mobile, max-w-2xl on desktop. Touch targets 44px.

## 9. Agent Prompt
```
Chat theme: bg=#0f172a surface=#1e293b user=#6366f1 assistant=#1e293b.
Messages max-w-[75%], user right. Composer pinned bottom, rounded-2xl.
aria-live on typing indicator, role=alert on errors. System fonts.
```