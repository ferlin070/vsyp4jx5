// i18n — tiny language switcher. Persists choice, safe fallbacks, no deps.

export interface Dict {
  [key: string]: string;
}

export type Lang = 'en' | 'ms';

const KEY = 'lang';

function readStored(fallback: Lang): Lang {
  try {
    const v = localStorage.getItem(KEY);
    if (v === 'en' || v === 'ms') return v;
  } catch {
    /* storage unavailable — use fallback */
  }
  return fallback;
}

export function createI18n(dicts: Record<Lang, Dict>, fallback: Lang = 'en') {
  let lang: Lang = readStored(fallback);

  return {
    get lang(): Lang {
      return lang;
    },
    set lang(l: Lang) {
      lang = l;
      try {
        localStorage.setItem(KEY, l);
      } catch {
        /* ignore write errors */
      }
    },
    t(key: string): string {
      const current = dicts[lang] ?? {};
      const base = dicts[fallback] ?? {};
      return current[key] ?? base[key] ?? key;
    },
  };
}