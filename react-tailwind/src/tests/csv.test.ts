import { describe, it, expect } from 'vitest';
import { toCsv, parseCsv } from '../lib/csv';

describe('csv', () => {
  it('round-trips simple records', () => {
    const rows = [{ name: 'Milk', price: 3.5 }, { name: 'Bread', price: 2 }];
    const csv = toCsv(rows);
    expect(csv).toBe('name,price\nMilk,3.5\nBread,2');
    expect(parseCsv(csv)).toEqual([{ name: 'Milk', price: '3.5' }, { name: 'Bread', price: '2' }]);
  });

  it('quotes fields with commas, quotes and newlines', () => {
    const csv = toCsv([{ note: 'a,b', quote: 'say "hi"', multi: 'line\nbreak' }]);
    expect(csv).toBe('note,quote,multi\n"a,b","say ""hi""","line\nbreak"');
  });

  it('handles empty input and blank lines', () => {
    expect(toCsv([])).toBe('');
    expect(parseCsv('')).toEqual([]);
    expect(parseCsv('a,b\n\n1,2')).toEqual([{ a: '1', b: '2' }]);
  });
});