import { describe, expect, it, vi, beforeEach } from 'vitest';
import { createStore } from '../lib/storage';

interface TestItem { id: string; name: string; }

const validate = (v: unknown): v is TestItem =>
  typeof v === 'object' && v !== null &&
  typeof (v as TestItem).id === 'string' &&
  typeof (v as TestItem).name === 'string';

beforeEach(() => localStorage.clear());

describe('storage', () => {
  it('round-trips save then load', () => {
    const s = createStore('test:v1', validate);
    s.save([{ id: '1', name: 'Foo' }]);
    const r = s.load();
    expect(r.ok).toBe(true);
    expect(r.data).toHaveLength(1);
    expect(r.data[0]?.name).toBe('Foo');
  });

  it('returns empty for first load', () => {
    const r = createStore('test:v2', validate).load();
    expect(r.ok).toBe(true);
    expect(r.data).toHaveLength(0);
  });

  it('drops invalid records without crashing', () => {
    localStorage.setItem('test:v3', JSON.stringify([{ id: '1', name: 'OK' }, { bad: true }, 'garbage']));
    const r = createStore('test:v3', validate).load();
    expect(r.ok).toBe(true);
    expect(r.data).toHaveLength(1);
    expect(r.error).toContain('invalid');
  });

  it('reports error on corrupt JSON', () => {
    localStorage.setItem('test:v4', '{not json');
    const r = createStore('test:v4', validate).load();
    expect(r.ok).toBe(false);
    expect(r.error).toBeTruthy();
  });

  it('reports error on non-array shape', () => {
    localStorage.setItem('test:v5', JSON.stringify({ not: 'array' }));
    const r = createStore('test:v5', validate).load();
    expect(r.ok).toBe(false);
  });

  it('surfaces quota error without throwing', () => {
    const spy = vi.spyOn(Storage.prototype, 'setItem').mockImplementation(() => {
      throw new DOMException('quota', 'QuotaExceededError');
    });
    const r = createStore('test:v6', validate).save([{ id: '1', name: 'X' }]);
    expect(r.ok).toBe(false);
    expect(r.error).toBeTruthy();
    spy.mockRestore();
  });

  it('surfaces security error on read without throwing', () => {
    const spy = vi.spyOn(Storage.prototype, 'getItem').mockImplementation(() => {
      throw new DOMException('denied', 'SecurityError');
    });
    const r = createStore('test:v7', validate).load();
    expect(r.ok).toBe(false);
    expect(r.error).toBeTruthy();
    spy.mockRestore();
  });
});
