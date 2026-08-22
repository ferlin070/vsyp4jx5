/**
 * yarn-stash-tracker — app entry. Landmarks, aria labels, error handling, loading
 * state are pre-wired. Replace the placeholder logic below.
 */

import './lib/style.css';
import { createState } from './lib/state';
import { createStore } from './lib/storage';
import { escapeHtml } from './lib/render';
import { announce } from './lib/a11y';
import { $ } from './lib/dom';
import { isString } from './lib/validate';

interface Item {
  id: string;
  name: string;
  createdAt: number;
}

function isItem(v: unknown): v is Item {
  if (typeof v !== 'object' || v === null) return false;
  const o = v as Record<string, unknown>;
  return isString(o.id) && isString(o.name) && typeof o.createdAt === 'number';
}

const store = createStore<Item>('yarn-stash-tracker:v1', isItem);
const { getState, setState } = createState({ items: [] as Item[], loading: false, error: null as string | null });
const root = $('#app');

function render(): void {
  if (!root) return;
  const { items, error } = getState();
  root.innerHTML = `
    <div class="app">
      <header aria-label="Page header">
        <h1>yarn-stash-tracker</h1>
      </header>
      <main aria-label="Main content">
        ${error ? `<div class="error-banner" role="alert"><span>${escapeHtml(error)}</span>
          <button class="error-banner__close" data-action="dismiss-error" aria-label="Dismiss">\u00d7</button></div>` : ''}
        <form id="add-form" aria-label="Add item">
          <div class="field">
            <label for="name">Name</label>
            <input id="name" name="name" type="text" required class="input" />
          </div>
          <button type="submit" class="btn btn--primary">Add</button>
        </form>
        <ul aria-label="Items list">
          ${items.map(i => `<li>${escapeHtml(i.name)}` +
            ` <button class="btn btn--ghost btn--danger" data-action="delete" data-id="${i.id}" aria-label="Delete ${escapeHtml(i.name)}">Delete</button></li>`).join('')}
        </ul>
        ${items.length === 0 ? '<div class="empty">Nothing yet. Add your first item.</div>' : ''}
      </main>
    </div>`;
}

function persist(): void {
  const r = store.save(getState().items);
  if (!r.ok) setState({ error: r.error ?? 'Save failed.' });
}

function boot(): void {
  if (!root) return;
  const result = store.load();
  setState({ items: result.data, loading: false });
  if (result.error) setState({ error: result.error });

  document.addEventListener('submit', (e) => {
    const form = e.target as HTMLElement;
    if (form.id !== 'add-form') return;
    e.preventDefault();
    const input = $('#name') as HTMLInputElement | null;
    const value = input?.value.trim();
    if (!value) return;
    const item: Item = { id: crypto.randomUUID(), name: value, createdAt: Date.now() };
    setState(s => ({ items: [item, ...s.items] }));
    persist(); announce('Item added.'); render();
    if (input) input.value = '';
  });

  document.addEventListener('click', (e) => {
    const target = (e.target as HTMLElement).closest('[data-action]') as HTMLElement | null;
    if (!target) return;
    const action = target.dataset.action;
    if (action === 'dismiss-error') { setState({ error: null }); render(); }
    else if (action === 'delete' && target.dataset.id) {
      setState(s => ({ items: s.items.filter(i => i.id !== target.dataset.id) }));
      persist(); announce('Item deleted.'); render();
    }
  });

  // offline PWA: register the service worker (progressive enhancement)
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/sw.js').catch(() => {});
  }

  render();
}

boot();
