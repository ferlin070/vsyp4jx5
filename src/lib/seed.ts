/**
 * Seed data helper — every competition app needs realistic starter data.
 *
 * Usage:
 *   const seeds = makeSeed<Item>(6, (i) => ({
 *     name: NAMES[i % NAMES.length],
 *     value: (i + 1) * 100,
 *   }));
 */

function uid(): string {
  if (typeof crypto !== 'undefined' && 'randomUUID' in crypto) return crypto.randomUUID();
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0;
    return (c === 'x' ? r : (r & 0x3) | 0x8).toString(16);
  });
}

/** Days ago as an ISO date string (YYYY-MM-DD), same as a UI date input. */
export function daysAgoISO(n: number): string {
  const d = new Date();
  d.setDate(d.getDate() - n);
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${y}-${m}-${day}`;
}

/**
 * Generate `count` records. Each record gets a unique id and a createdAt that
 * walks backwards (newest first). The factory returns the app-specific fields.
 */
export function makeSeed<T extends { id: string; createdAt: number }>(
  count: number,
  factory: (index: number) => Omit<T, 'id' | 'createdAt'>,
): T[] {
  const now = Date.now();
  return Array.from({ length: count }, (_, i) => ({
    ...factory(i),
    id: uid(),
    createdAt: now - i * 86_400_000, // 1 day apart
  })) as T[];
}