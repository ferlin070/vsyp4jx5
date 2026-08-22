export interface LoadResult<T> {
  ok: boolean;
  data: T[];
  error?: string;
}

export interface SaveResult {
  ok: boolean;
  error?: string;
}

function isQuotaError(err: unknown): boolean {
  const name = err instanceof Error ? err.name : String((err as { name?: unknown })?.name ?? '');
  return name === 'QuotaExceededError';
}

export function loadStore<T>(key: string, validate: (v: unknown) => v is T): LoadResult<T> {
  let raw: string | null;
  try {
    raw = localStorage.getItem(key);
  } catch {
    return { ok: false, data: [], error: 'Storage unavailable.' };
  }

  if (raw === null) return { ok: true, data: [] };

  let parsed: unknown;
  try {
    parsed = JSON.parse(raw);
  } catch {
    return { ok: false, data: [], error: 'Stored data was corrupt.' };
  }

  if (!Array.isArray(parsed)) {
    return { ok: false, data: [], error: 'Unexpected data shape.' };
  }

  const valid = parsed.filter(validate);
  const dropped = parsed.length - valid.length;
  return {
    ok: true,
    data: valid,
    error: dropped > 0 ? `${dropped} invalid record(s) skipped.` : undefined,
  };
}

export function saveStore<T>(key: string, items: T[]): SaveResult {
  try {
    localStorage.setItem(key, JSON.stringify(items));
    return { ok: true };
  } catch (err) {
    return {
      ok: false,
      error: isQuotaError(err) ? 'Storage is full.' : 'Could not save.',
    };
  }
}

export function clearStore(key: string): SaveResult {
  try {
    localStorage.removeItem(key);
    return { ok: true };
  } catch {
    return { ok: false, error: 'Could not clear storage.' };
  }
}