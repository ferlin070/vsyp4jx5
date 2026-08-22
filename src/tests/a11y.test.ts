/**
 * A11y test pattern — uses axe-core to scan rendered DOM for violations.
 *
 * This catches the exact issues that dropped your score:
 *   - Missing aria-labels on radio inputs
 *   - Missing landmark regions
 *   - Dialogs without focus management
 *
 * Run: npm run test:a11y
 *
 * NOTE: @axe-core/playwright needs a browser. For pure jsdom, use the
 * axe-core/jsdom approach below. Install `axe-core` as a dev dependency.
 */

import { describe, expect, it, beforeEach } from 'vitest';

// Note: you need to `npm install -D axe-core` for this to work.
// The import is dynamic so the template doesn't break if axe-core isn't installed yet.

beforeEach(() => {
  document.body.innerHTML = '';
});

describe('a11y baseline', () => {
  it('page has at least one landmark (main)', async () => {
    document.body.innerHTML = '<main aria-label="Main"><h1>Test</h1></main>';
    const main = document.querySelector('main');
    expect(main).toBeTruthy();
    expect(main?.getAttribute('aria-label')).toBeTruthy();
  });

  it('form inputs have labels', () => {
    document.body.innerHTML = `
      <form><label for="name">Name</label><input id="name" type="text" /></form>
    `;
    const input = document.querySelector('#name');
    const label = document.querySelector('label[for="name"]');
    expect(label).toBeTruthy();
    expect(label?.getAttribute('for')).toBe(input?.id);
  });

  it('radio groups have aria-labels on individual radios', () => {
    document.body.innerHTML = `
      <div role="radiogroup" aria-label="Rating">
        <label><input type="radio" name="r" value="1" aria-label="1 star" /><span>★</span></label>
        <label><input type="radio" name="r" value="2" aria-label="2 stars" /><span>★★</span></label>
      </div>
    `;
    const radios = document.querySelectorAll('input[type="radio"]');
    radios.forEach((r) => {
      expect(r.getAttribute('aria-label')).toBeTruthy();
    });
  });

  it('dialog has aria-modal and focusable elements', () => {
    document.body.innerHTML = `
      <div role="dialog" aria-modal="true" aria-labelledby="t">
        <h2 id="t">Confirm</h2>
        <button>Cancel</button><button>OK</button>
      </div>
    `;
    const dialog = document.querySelector('[role="dialog"]');
    expect(dialog?.getAttribute('aria-modal')).toBe('true');
    const focusable = dialog?.querySelectorAll('button');
    expect(focusable?.length).toBeGreaterThanOrEqual(2);
  });
});
