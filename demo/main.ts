import { openModal, announce } from '../src/lib/a11y';
import { $, delegate, html } from '../src/lib/dom';
import { escapeHtml, formatDate, stars, debounce } from '../src/lib/render';
import { createState } from '../src/lib/state';
import { createStore } from '../src/lib/storage';
import { isString, isOneOf, validateObject } from '../src/lib/validate';
import { makeSeed } from '../src/lib/seed';
import { createI18n } from '../src/lib/i18n';

// ---- i18n: persisted language switch ----
const i18n = createI18n({
  en: { hello: 'Hello', switchLang: 'Switch to BM', langLabel: 'en' },
  ms: { hello: 'Halo', switchLang: 'Tukar ke EN', langLabel: 'ms' },
});
const $hello = $('#i18n-hello')!;
const $langToggle = $('#lang-toggle')!;
const $langOut = $('#lang-out')!;
function renderLang() {
  $hello.textContent = i18n.t('hello') + ' — sahabat!';
  $langToggle.textContent = i18n.t('switchLang');
  $langOut.textContent = i18n.t('langLabel');
}
delegate('click', '#lang-toggle', () => {
  i18n.lang = i18n.lang === 'en' ? 'ms' : 'en';
  renderLang();
});
renderLang();

// ---- createStore: typed, error-safe CRUD + persistence ----
interface Item { id: string; name: string; createdAt: number; }
function isItem(v: unknown): v is Item {
  if (typeof v !== 'object' || v === null) return false;
  const o = v as Record<string, unknown>;
  return typeof o.id === 'string' && typeof o.name === 'string' && typeof o.createdAt === 'number';
}
const store = createStore<Item>('demo:golden', isItem);

function renderList() {
  const list = $('#items')!;
  list.innerHTML = '';
  const data = store.load().data;
  if (data.length === 0) {
    list.appendChild(html('div', '<li><span class="badge">Empty — add an item or hit Seed.</span></li>'));
    return;
  }
  for (const it of data) {
    const li = html('div', `<li><span>${escapeHtml(it.name)}</span><span class="badge">${formatDate(it.createdAt)}</span></li>`);
    list.appendChild(li);
  }
}
renderList();

delegate('submit', '#add-form', (_, e) => {
  e.preventDefault();
  const input = $('#item-name') as HTMLInputElement;
  const name = input.value.trim();
  if (!name) return;
  const r = store.save([{ id: crypto.randomUUID(), name, createdAt: Date.now() }, ...store.load().data]);
  showError(r.ok ? '' : r.error);
  if (r.ok) {
    input.value = '';
    renderList();
    announce('Item added.');
  }
});

delegate('click', '#seed', () => {
  const seeds = makeSeed<Item>(5, (i) => ({ name: ['Groceries', 'Rent', 'Coffee', 'Fuel', 'Savings'][i % 5] ?? 'Item' }));
  const r = store.save(seeds);
  showError(r.ok ? '' : r.error);
  if (r.ok) { location.reload(); }
});

delegate('click', '#clear', () => {
  const r = store.clear();
  showError(r.ok ? '' : r.error);
  if (r.ok) { location.reload(); }
});

function showError(msg: string) {
  const banner = $('#error-banner')!;
  banner.textContent = msg;
  banner.hidden = !msg;
}

// ---- createState: reactive UI ----
const counter = createState({ n: 0 });
const $count = $('#count')!;
counter.subscribe(({ n }) => { $count.textContent = String(n); });
delegate('click', '#inc', () => counter.setState((s) => ({ n: s.n + 1 })));
delegate('click', '#dec', () => counter.setState((s) => ({ n: Math.max(0, s.n - 1) })));

// ---- modal + focus trap ----
let closeModal: (() => void) | null = null;
delegate('click', '#open-modal', (_, e) => {
  const modal = $('#modal')!;
  modal.hidden = false;
  modal.setAttribute('aria-hidden', 'false');
  closeModal = openModal(modal, e.target as HTMLElement);
});
function hideModal() {
  const modal = $('#modal')!;
  modal.hidden = true;
  modal.setAttribute('aria-hidden', 'true');
  closeModal?.();
  closeModal = null;
}
delegate('click', '[data-modal-close]', hideModal);
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && !$('#modal')!.hidden) hideModal();
});

// ---- render helpers ----
$('#date')!.textContent = formatDate(Date.now());
$('#stars')!.innerHTML = stars(4);
const dOut = $('#debounce-out')!;
const onInput = debounce((v: string) => { dOut.textContent = escapeHtml(v) || '—'; }, 300);
delegate('input', '#debounce-input', (el) => onInput((el as HTMLInputElement).value));
$('#safe')!.innerHTML = escapeHtml('<script>alert("xss")</script>');

// ---- validators ----
const size = isOneOf(['S', 'M', 'L']);
const v = validateObject({ name: 'Demo', size: 'M' }, { name: isString, size });
$('#validators')!.textContent = v.valid ? 'valid ✓' : `invalid: ${v.errors.join(', ')}`;

// ---- announce ----
delegate('click', '#announce-btn', () => announce('You pressed announce.'));