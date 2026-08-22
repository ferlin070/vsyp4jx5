import { describe, expect, it } from 'vitest';
import {
  isString, isNumber, isBoolean, isOneOf, isInRange, trimRequired, maxLength, validateObject,
} from '../lib/validate';

describe('validators', () => {
  it('isString / isNumber / isBoolean', () => {
    expect(isString('x')).toBe(true);
    expect(isString(5)).toBe(false);
    expect(isNumber(5)).toBe(true);
    expect(isNumber(NaN)).toBe(false);
    expect(isBoolean(true)).toBe(true);
  });

  it('isOneOf', () => {
    const check = isOneOf(['a', 'b'] as const);
    expect(check('a')).toBe(true);
    expect(check('c')).toBe(false);
    expect(check(5)).toBe(false);
  });

  it('isInRange', () => {
    const check = isInRange(1, 5);
    expect(check(3)).toBe(true);
    expect(check(0)).toBe(false);
    expect(check(6)).toBe(false);
    expect(check('3')).toBe(false);
  });

  it('trimRequired', () => {
    expect(trimRequired('  hi  ')).toBe('hi');
    expect(trimRequired('   ')).toBeNull();
    expect(trimRequired(5)).toBeNull();
  });

  it('maxLength', () => {
    const check = maxLength(10);
    expect(check('short')).toBe(true);
    expect(check('x'.repeat(11))).toBe(false);
  });

  it('validateObject returns errors for bad fields', () => {
    const result = validateObject<{ name: string; age: number }>(
      { name: 5, age: 'old' },
      { name: isString, age: isNumber },
    );
    expect(result.valid).toBe(false);
    expect(result.errors).toContain('name');
    expect(result.errors).toContain('age');
  });

  it('validateObject passes for valid data', () => {
    const result = validateObject<{ name: string; age: number }>(
      { name: 'Alice', age: 30 },
      { name: isString, age: isNumber },
    );
    expect(result.valid).toBe(true);
    expect(result.errors).toHaveLength(0);
  });
});
