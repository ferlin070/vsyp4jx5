import { describe, it, expect } from 'vitest';
import { loadStore, saveStore, clearStore } from '../lib/storage';

describe('storage lib (React port)', () => {
  const isNum = (v: unknown): v is number => typeof v === 'number';

  it('round-trips data through localStorage', () => {
    expect(saveStore('k', [1, 2, 3]).ok).toBe(true);
    const r = loadStore('k', isNum);
    expect(r.ok).toBe(true);
    expect(r.data).toEqual([1, 2, 3]);
  });

  it('returns empty on missing key', () => {
    expect(loadStore('nope', isNum).data).toEqual([]);
  });

  it('skips invalid records', () => {
    localStorage.setItem('bad', JSON.stringify([1, 'x', 3]));
    const r = loadStore('bad', isNum);
    expect(r.data).toEqual([1, 3]);
    expect(r.error).toContain('1 invalid');
  });

  it('recovers from corrupt JSON', () => {
    localStorage.setItem('corrupt', '{oops');
    const r = loadStore('corrupt', isNum);
    expect(r.ok).toBe(false);
    expect(r.error).toContain('corrupt');
  });

  it('clears a key', () => {
    saveStore('k', [1]);
    expect(clearStore('k').ok).toBe(true);
    expect(loadStore('k', isNum).data).toEqual([]);
  });
});