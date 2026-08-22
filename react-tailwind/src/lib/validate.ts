export type Validator = (value: unknown) => boolean;

export const isString = (v: unknown): v is string => typeof v === 'string';
export const isNumber = (v: unknown): v is number => typeof v === 'number' && Number.isFinite(v);
export const isBoolean = (v: unknown): v is boolean => typeof v === 'boolean';

export function isOneOf<T extends string>(values: readonly T[]): (v: unknown) => v is T {
  return (v): v is T => typeof v === 'string' && (values as readonly string[]).includes(v);
}

export function isInRange(min: number, max: number): (v: unknown) => v is number {
  return (v): v is number => isNumber(v) && v >= min && v <= max;
}

export function trimRequired(v: unknown): string | null {
  if (!isString(v)) return null;
  const t = v.trim();
  return t.length > 0 ? t : null;
}

export function maxLength(max: number): (v: unknown) => boolean {
  return (v) => isString(v) && v.trim().length <= max;
}

export interface ValidationResult<T> {
  valid: boolean;
  data: Partial<T>;
  errors: string[];
}

export function validateObject<T extends Record<string, unknown>>(
  raw: unknown,
  schema: Partial<Record<keyof T, Validator>>,
): ValidationResult<T> {
  const data: Partial<T> = {};
  const errors: string[] = [];

  if (typeof raw !== 'object' || raw === null) {
    return { valid: false, data, errors: ['Invalid object.'] };
  }

  const obj = raw as Record<string, unknown>;
  for (const [field, validator] of Object.entries(schema)) {
    if (validator && !validator(obj[field])) {
      errors.push(field);
    } else if (validator) {
      (data as Record<string, unknown>)[field] = obj[field];
    }
  }

  return { valid: errors.length === 0, data, errors };
}