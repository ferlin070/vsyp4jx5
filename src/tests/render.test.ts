import { describe, expect, it } from 'vitest';
import { escapeHtml, formatDate, stars, debounce } from '../lib/render';

describe('escapeHtml', () => {
  it('escapes all 5 dangerous characters', () => {
    expect(escapeHtml('<script>alert("x" & \'y\')</script>'))
      .toBe('&lt;script&gt;alert(&quot;x&quot; &amp; &#39;y&#39;)&lt;/script&gt;');
  });

  it('leaves safe text unchanged', () => {
    expect(escapeHtml('Hello World 123')).toBe('Hello World 123');
  });
});

describe('formatDate', () => {
  it('formats a known timestamp', () => {
    const d = new Date('2025-01-15T10:00:00Z');
    const result = formatDate(d.getTime());
    expect(result).toBeTruthy();
    expect(typeof result).toBe('string');
  });
});

describe('stars', () => {
  it('produces 5 star spans', () => {
    const html = stars(3);
    expect(html).toContain('star--filled');
    expect(html).toContain('star--empty');
    expect(html.match(/<span/g)?.length).toBeGreaterThanOrEqual(6); // 5 stars + outer
  });

  it('includes aria-label with rating', () => {
    expect(stars(4)).toContain('aria-label="4 out of 5"');
  });
});

describe('debounce', () => {
  it('delays the call', async () => {
    vi.useFakeTimers();
    const fn = vi.fn();
    const d = debounce(fn, 100);
    d();
    expect(fn).not.toHaveBeenCalled();
    vi.advanceTimersByTime(100);
    expect(fn).toHaveBeenCalled();
    vi.useRealTimers();
  });
});

import { vi } from 'vitest';
