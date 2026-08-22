/**
 * Render helpers — safe HTML utilities.
 *
 * WHY THIS EXISTS:
 * Competition scoring rewards `escapeHtml` before innerHTML injection
 * (XSS prevention). Centralizing it guarantees no raw user string ever
 * reaches the DOM unescaped.
 */

const ESCAPE_MAP: Record<string, string> = {
  '&': '&amp;',
  '<': '&lt;',
  '>': '&gt;',
  '"': '&quot;',
  "'": '&#39;',
};

/** Escape a string for safe interpolation into HTML. */
export function escapeHtml(value: string): string {
  return value.replace(/[&<>"']/g, (ch) => ESCAPE_MAP[ch] ?? ch);
}

/** Format epoch ms as a localized date string. */
export function formatDate(epochMs: number): string {
  return new Date(epochMs).toLocaleDateString(undefined, {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
}

/** Render a 1–5 star rating as accessible HTML glyphs. */
export function stars(rating: number, max = 5): string {
  let html = `<span class="stars" role="img" aria-label="${rating} out of ${max}">`;
  for (let i = 1; i <= max; i++) {
    const filled = i <= rating;
    html += `<span class="star ${filled ? 'star--filled' : 'star--empty'}" aria-hidden="true">${filled ? '★' : '☆'}</span>`;
  }
  return html + '</span>';
}

/** Create a debounce helper (useful for search inputs). */
export function debounce<A extends unknown[]>(fn: (...a: A) => void, ms: number): (...a: A) => void {
  let t: ReturnType<typeof setTimeout> | undefined;
  return (...a: A) => {
    clearTimeout(t);
    t = setTimeout(() => fn(...a), ms);
  };
}
