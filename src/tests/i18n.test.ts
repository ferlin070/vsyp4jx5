import { describe, it, expect, beforeEach } from 'vitest';
import { createI18n } from '../lib/i18n';

const dicts = {
  en: { save: 'Save', delete: 'Delete' },
  ms: { save: 'Simpan', delete: 'Padam' },
};

beforeEach(() => {
  localStorage.clear();
});

describe('i18n', () => {
  it('translates known keys and falls back to the key itself', () => {
    const i18n = createI18n(dicts);
    expect(i18n.t('save')).toBe('Save');
    expect(i18n.t('nope')).toBe('nope');
  });

  it('switches language and persists across reloads', () => {
    const i18n = createI18n(dicts);
    i18n.lang = 'ms';
    expect(i18n.t('save')).toBe('Simpan');
    expect(i18n.t('delete')).toBe('Padam');
    const reloaded = createI18n(dicts);
    expect(reloaded.t('save')).toBe('Simpan');
  });

  it('falls back for keys missing in the current language', () => {
    const partial = { en: { hello: 'Hello' }, ms: { hello: 'Halo' } };
    const i18n = createI18n(partial);
    expect(i18n.t('save')).toBe('save');
    i18n.lang = 'ms';
    expect(i18n.t('hello')).toBe('Halo');
  });
});