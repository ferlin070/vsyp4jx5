import { describe, it, expect } from 'vitest';
import { CATEGORIES } from '../App';
import { validateObject, isInRange, maxLength, trimRequired } from '../lib/validate';

describe('validate lib (React port)', () => {
  it('validates an item object against the schema', () => {
    const result = validateObject(
      { name: ' Nasi ', amount: 12.5, category: 'Makanan' },
      { name: (v) => trimRequired(v) !== null, amount: isInRange(0.01, 1_000_000), category: (v) => (CATEGORIES as readonly string[]).includes(v as string) },
    );
    expect(result.valid).toBe(true);
  });

  it('reports invalid fields', () => {
    const result = validateObject(
      { name: '  ', amount: -5, category: 'Pakaian' },
      { name: (v) => trimRequired(v) !== null, amount: isInRange(0.01, 1_000_000), category: (v) => (CATEGORIES as readonly string[]).includes(v as string) },
    );
    expect(result.valid).toBe(false);
    expect(result.errors).toContain('amount');
  });

  it('maxLength caps input', () => {
    expect(maxLength(5)('short')).toBe(true);
    expect(maxLength(5)('too long here')).toBe(false);
  });
});