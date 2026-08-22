import { describe, expect, it } from 'vitest';
import { makeSeed, daysAgoISO } from '../lib/seed';

interface Seed { name: string; id: string; createdAt: number }
interface SeedV { v: number; id: string; createdAt: number }

describe('makeSeed', () => {
  it('generates count records with unique ids', () => {
    const items = makeSeed<Seed>(6, (i) => ({ name: `Item ${i}` }));
    expect(items).toHaveLength(6);
    const ids = new Set(items.map((i) => i.id));
    expect(ids.size).toBe(6);
  });

  it('stamps createdAt walking backwards (newest first)', () => {
    const items = makeSeed<SeedV>(4, (i) => ({ v: i }));
    expect(items[0]!.createdAt).toBeGreaterThan(items[1]!.createdAt);
    expect(items[1]!.createdAt).toBeGreaterThan(items[3]!.createdAt);
  });

  it('passes index into the factory', () => {
    const items = makeSeed<SeedV>(3, (i) => ({ v: i * 10 }));
    expect(items.map((i) => i.v)).toEqual([0, 10, 20]);
  });
});

describe('daysAgoISO', () => {
  it('returns YYYY-MM-DD', () => {
    expect(daysAgoISO(0)).toMatch(/^\d{4}-\d{2}-\d{2}$/);
  });
  it('0 is today', () => {
    const now = new Date();
    const y = now.getFullYear();
    const m = String(now.getMonth() + 1).padStart(2, '0');
    const d = String(now.getDate()).padStart(2, '0');
    expect(daysAgoISO(0)).toBe(`${y}-${m}-${d}`);
  });
});