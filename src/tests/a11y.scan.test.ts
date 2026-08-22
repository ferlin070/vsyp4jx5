/**
 * Real axe scan of the actual app DOM (not just patterns).
 *
 * Renders src/main.ts in jsdom, then runs axe-core against the real output.
 * This catches what the human reviewer runs: aria-labels, landmarks, contrast
 * rules, duplicate ids, dialog semantics. Zero violations required.
 *
 * Run: npm run test:a11y:scan
 */
import { describe, it, expect, beforeAll } from 'vitest';
import axe from 'axe-core';

let violations: axe.Result[] = [];

beforeAll(async () => {
  // jsdom does not load index.html — provide the document shell it would give.
  document.title = 'yarn-stash-tracker';
  document.documentElement.setAttribute('lang', 'en');
  document.body.innerHTML = '<div id="app"></div>';
  await import('../main');
  const results = await axe.run(document as unknown as HTMLElement, {
    resultTypes: ['violations'],
  });
  violations = results.violations;
});

describe('axe scan of the real app DOM', () => {
  it('has zero violations', () => {
    if (violations.length > 0) {
      const summary = violations.map((v) => ({
        id: v.id,
        impact: v.impact,
        help: v.help,
        targets: v.nodes.map((n) => n.target),
      }));
      console.error(JSON.stringify(summary, null, 2));
    }
    expect(violations).toHaveLength(0);
  });
});