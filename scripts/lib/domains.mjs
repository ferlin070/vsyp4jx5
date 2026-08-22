#!/usr/bin/env node
/**
 * Shared domain templates for brief + seed. Each domain generates real,
 * typecheck-clean, unit-tested files (vanilla and React variants) so the
 * 90-minute clock starts with a working domain model, not empty stubs.
 *
 * All templates honour tsconfig strictness: noUncheckedIndexedAccess (?? on
 * array reads), noUnusedLocals/Parameters (no stray imports/params).
 */

const BASE_DOMAINS = {
  finance: {
    key: 'finance',
    kind: 'Expense',
    detect: /\b(money|expense|budget|wallet|finance|bank|spend|salary|income|bill|cost)\b|(belanja|perbelanjaan|belanjawan|dompet|kewangan|bayar|harga|simpanan|kategori)/,
    categories: ['Food', 'Bills', 'Transport', 'Shopping', 'Other'],
    names: ['Groceries', 'Rent', 'Coffee', 'Fuel', 'Internet', 'Movie night', 'Taxi', 'Lunch'],
    types: `// Domain types — the single source of truth for this app.
export interface Expense {
  id: string;
  title: string;
  amount: number;
  category: string;
  date: string; // YYYY-MM-DD
  createdAt: number;
}
`,
    schema: `// Pure domain logic for expenses. Side-effect free + unit-tested.
import type { Expense } from './types';

export const CATEGORIES = ['Food', 'Bills', 'Transport', 'Shopping', 'Other'] as const;

export function isExpense(v: unknown): v is Expense {
  if (typeof v !== 'object' || v === null) return false;
  const o = v as Record<string, unknown>;
  return (
    typeof o.id === 'string' &&
    typeof o.title === 'string' &&
    typeof o.amount === 'number' && o.amount >= 0 &&
    typeof o.category === 'string' &&
    typeof o.date === 'string' &&
    typeof o.createdAt === 'number'
  );
}

export function sumExpenses(items: Expense[]): number {
  return items.reduce((t, e) => t + e.amount, 0);
}

export function totalByCategory(items: Expense[], category: string): number {
  return items.filter((e) => e.category === category).reduce((t, e) => t + e.amount, 0);
}

export function countExpenses(items: Expense[]): number {
  return items.length;
}

export function formatCurrency(amount: number): string {
  return 'RM ' + amount.toFixed(2);
}
`,
    storage: `// Persistence for expenses — error-safe createStore + domain guard.
import { createStore } from './lib/storage';
import type { Expense } from './types';
import { isExpense } from './schema';

export const expenseStore = createStore<Expense>('app:expenses:v1', isExpense);
export type { Expense };
`,
    test: `import { describe, it, expect } from 'vitest';
import { isExpense, sumExpenses, totalByCategory, countExpenses, formatCurrency } from '../schema';
import type { Expense } from '../types';

const items: Expense[] = [
  { id: '1', title: 'Rent', amount: 1000, category: 'Bills', date: '2026-08-01', createdAt: 1 },
  { id: '2', title: 'Coffee', amount: 8.5, category: 'Food', date: '2026-08-02', createdAt: 2 },
  { id: '3', title: 'Fuel', amount: 60, category: 'Transport', date: '2026-08-03', createdAt: 3 },
];

describe('expenses', () => {
  it('validates records with the type guard', () => {
    for (const it of items) expect(isExpense(it)).toBe(true);
    expect(isExpense({ nope: 1 })).toBe(false);
  });

  it('sums, totals by category, counts', () => {
    expect(sumExpenses(items)).toBe(1068.5);
    expect(totalByCategory(items, 'Food')).toBe(8.5);
    expect(countExpenses(items)).toBe(3);
  });

  it('formats currency', () => {
    expect(formatCurrency(12.5)).toBe('RM 12.50');
  });
});
`,
    seed: (i, names, cats, daysAgoISO) => `({
    title: ${JSON.stringify(names)}[i % ${names.length}] ?? 'Item',
    amount: Math.round(((i + 1) * 13.7) * 100) / 100,
    category: ${JSON.stringify(cats)}[i % ${cats.length}] ?? 'Other',
    date: daysAgoISO(i),
  })`,
    rtypes: `// Domain types — the single source of truth for this app.
export interface Expense {
  id: string;
  title: string;
  amount: number;
  category: string;
  date: string; // YYYY-MM-DD
  createdAt: number;
}
`,
    rdomain: `// Pure domain logic for expenses. Side-effect free + unit-tested.
import type { Expense } from './types';

export function isExpense(v: unknown): v is Expense {
  if (typeof v !== 'object' || v === null) return false;
  const o = v as Record<string, unknown>;
  return (
    typeof o.id === 'string' &&
    typeof o.title === 'string' &&
    typeof o.amount === 'number' && o.amount >= 0 &&
    typeof o.category === 'string' &&
    typeof o.date === 'string' &&
    typeof o.createdAt === 'number'
  );
}

export function sumExpenses(items: Expense[]): number {
  return items.reduce((t, e) => t + e.amount, 0);
}

export function totalByCategory(items: Expense[], category: string): number {
  return items.filter((e) => e.category === category).reduce((t, e) => t + e.amount, 0);
}

export function formatCurrency(amount: number): string {
  return 'RM ' + amount.toFixed(2);
}
`,
    rstore: `// Persistence hook-in: export the type + guard for useLocalStorage.
export type { Expense as Item } from './types';
export { isExpense as isItem } from './domain';
`,
    rtest: `import { describe, it, expect } from 'vitest';
import { isExpense, sumExpenses, totalByCategory } from '../domain';
import type { Expense } from '../types';

const items: Expense[] = [
  { id: '1', title: 'Rent', amount: 1000, category: 'Bills', date: '2026-08-01', createdAt: 1 },
  { id: '2', title: 'Coffee', amount: 8.5, category: 'Food', date: '2026-08-02', createdAt: 2 },
];

describe('expenses', () => {
  it('validates records', () => {
    for (const it of items) expect(isExpense(it)).toBe(true);
  });
  it('totals', () => {
    expect(sumExpenses(items)).toBe(1008.5);
    expect(totalByCategory(items, 'Food')).toBe(8.5);
  });
});
`,
  },

  ecommerce: {
    key: 'ecommerce',
    kind: 'Product',
    detect: /\b(store|shop|ecommerce|product|cart|order|catalog|checkout|inventory|stock|price)\b|(kedai|produk|troli|pesanan|katalog|stok)/,
    categories: ['Food', 'Drinks', 'Household', 'Electronics', 'Other'],
    names: ['Bread', 'Milk', 'Rice 5kg', 'USB-C cable', 'Notebook', 'Shampoo', 'Coffee beans', 'Detergent'],
    types: `// Domain types — the single source of truth for this app.
export interface Product {
  id: string;
  name: string;
  price: number;
  stock: number;
  category: string;
  createdAt: number;
}
`,
    schema: `// Pure domain logic for products. Side-effect free + unit-tested.
import type { Product } from './types';

export const CATEGORIES = ['Food', 'Drinks', 'Household', 'Electronics', 'Other'] as const;

export function isProduct(v: unknown): v is Product {
  if (typeof v !== 'object' || v === null) return false;
  const o = v as Record<string, unknown>;
  return (
    typeof o.id === 'string' &&
    typeof o.name === 'string' &&
    typeof o.price === 'number' && o.price >= 0 &&
    typeof o.stock === 'number' && o.stock >= 0 &&
    typeof o.category === 'string' &&
    typeof o.createdAt === 'number'
  );
}

export function inventoryValue(items: Product[]): number {
  return items.reduce((t, p) => t + p.price * p.stock, 0);
}

export function lowStock(items: Product[], threshold = 5): Product[] {
  return items.filter((p) => p.stock < threshold);
}

export function formatPrice(amount: number): string {
  return 'RM ' + amount.toFixed(2);
}
`,
    storage: `// Persistence for products — error-safe createStore + domain guard.
import { createStore } from './lib/storage';
import type { Product } from './types';
import { isProduct } from './schema';

export const productStore = createStore<Product>('app:products:v1', isProduct);
export type { Product };
`,
    test: `import { describe, it, expect } from 'vitest';
import { isProduct, inventoryValue, lowStock, formatPrice } from '../schema';
import type { Product } from '../types';

const items: Product[] = [
  { id: '1', name: 'Bread', price: 3.5, stock: 12, category: 'Food', createdAt: 1 },
  { id: '2', name: 'Milk', price: 6, stock: 2, category: 'Food', createdAt: 2 },
  { id: '3', name: 'USB-C cable', price: 25, stock: 0, category: 'Electronics', createdAt: 3 },
];

describe('products', () => {
  it('validates records with the type guard', () => {
    for (const it of items) expect(isProduct(it)).toBe(true);
    expect(isProduct({ nope: 1 })).toBe(false);
  });

  it('values inventory and finds low stock', () => {
    expect(inventoryValue(items)).toBe(54);
    expect(lowStock(items).map((p) => p.name)).toEqual(['Milk', 'USB-C cable']);
  });

  it('formats price', () => {
    expect(formatPrice(12.5)).toBe('RM 12.50');
  });
});
`,
    seed: (i, names, cats) => `({
    name: ${JSON.stringify(names)}[i % ${names.length}] ?? 'Item',
    price: Math.round(((i + 1) * 4.75) * 100) / 100,
    stock: (i * 3) % 15,
    category: ${JSON.stringify(cats)}[i % ${cats.length}] ?? 'Other',
  })`,
    rtypes: `// Domain types — the single source of truth for this app.
export interface Product {
  id: string;
  name: string;
  price: number;
  stock: number;
  category: string;
  createdAt: number;
}
`,
    rdomain: `// Pure domain logic for products. Side-effect free + unit-tested.
import type { Product } from './types';

export function isProduct(v: unknown): v is Product {
  if (typeof v !== 'object' || v === null) return false;
  const o = v as Record<string, unknown>;
  return (
    typeof o.id === 'string' &&
    typeof o.name === 'string' &&
    typeof o.price === 'number' && o.price >= 0 &&
    typeof o.stock === 'number' && o.stock >= 0 &&
    typeof o.category === 'string' &&
    typeof o.createdAt === 'number'
  );
}

export function inventoryValue(items: Product[]): number {
  return items.reduce((t, p) => t + p.price * p.stock, 0);
}

export function lowStock(items: Product[], threshold = 5): Product[] {
  return items.filter((p) => p.stock < threshold);
}

export function formatPrice(amount: number): string {
  return 'RM ' + amount.toFixed(2);
}
`,
    rstore: `// Persistence hook-in: export the type + guard for useLocalStorage.
export type { Product as Item } from './types';
export { isProduct as isItem } from './domain';
`,
    rtest: `import { describe, it, expect } from 'vitest';
import { isProduct, inventoryValue, lowStock } from '../domain';
import type { Product } from '../types';

const items: Product[] = [
  { id: '1', name: 'Bread', price: 3.5, stock: 12, category: 'Food', createdAt: 1 },
  { id: '2', name: 'Milk', price: 6, stock: 2, category: 'Food', createdAt: 2 },
];

describe('products', () => {
  it('validates records', () => {
    for (const it of items) expect(isProduct(it)).toBe(true);
  });
  it('values inventory and finds low stock', () => {
    expect(inventoryValue(items)).toBe(54);
    expect(lowStock(items).map((p) => p.name)).toEqual(['Milk']);
  });
});
`,
  },

  task: {
    key: 'task',
    kind: 'Task',
    detect: /\b(task|todo|kanban|board|project|issue|sprint|reminder|note|plan)\b|(senarai|tugasan|projek|peringatan)/,
    names: ['Write report', 'Call client', 'Buy groceries', 'Fix bug #42', 'Plan sprint', 'Clean inbox', 'Review PR', 'Morning run'],
    types: `// Domain types — the single source of truth for this app.
export type Priority = 'low' | 'medium' | 'high';

export interface Task {
  id: string;
  title: string;
  done: boolean;
  priority: Priority;
  createdAt: number;
}
`,
    schema: `// Pure domain logic for tasks. Side-effect free + unit-tested.
import type { Task, Priority } from './types';

export const PRIORITIES: readonly Priority[] = ['low', 'medium', 'high'];

export function isTask(v: unknown): v is Task {
  if (typeof v !== 'object' || v === null) return false;
  const o = v as Record<string, unknown>;
  return (
    typeof o.id === 'string' &&
    typeof o.title === 'string' &&
    typeof o.done === 'boolean' &&
    PRIORITIES.includes(o.priority as Priority) &&
    typeof o.createdAt === 'number'
  );
}

export function openTasks(items: Task[]): Task[] {
  return items.filter((t) => !t.done);
}

export function doneCount(items: Task[]): number {
  return items.filter((t) => t.done).length;
}

export function byPriority(items: Task[], priority: Priority): Task[] {
  return items.filter((t) => t.priority === priority);
}
`,
    storage: `// Persistence for tasks — error-safe createStore + domain guard.
import { createStore } from './lib/storage';
import type { Task } from './types';
import { isTask } from './schema';

export const taskStore = createStore<Task>('app:tasks:v1', isTask);
export type { Task };
`,
    test: `import { describe, it, expect } from 'vitest';
import { isTask, openTasks, doneCount, byPriority } from '../schema';
import type { Task } from '../types';

const items: Task[] = [
  { id: '1', title: 'Fix bug', done: true, priority: 'high', createdAt: 1 },
  { id: '2', title: 'Write report', done: false, priority: 'high', createdAt: 2 },
  { id: '3', title: 'Clean inbox', done: false, priority: 'low', createdAt: 3 },
];

describe('tasks', () => {
  it('validates records', () => {
    for (const it of items) expect(isTask(it)).toBe(true);
    expect(isTask({ nope: 1 })).toBe(false);
  });

  it('counts open and done', () => {
    expect(openTasks(items).length).toBe(2);
    expect(doneCount(items)).toBe(1);
  });

  it('filters by priority', () => {
    expect(byPriority(items, 'high').length).toBe(2);
  });
});
`,
    seed: (i, names) => `({
    title: ${JSON.stringify(names)}[i % ${names.length}] ?? 'Item',
    done: i % 3 === 0,
    priority: (['low', 'medium', 'high'] as const)[i % 3] ?? 'medium',
  })`,
    rtypes: `// Domain types — the single source of truth for this app.
export type Priority = 'low' | 'medium' | 'high';

export interface Task {
  id: string;
  title: string;
  done: boolean;
  priority: Priority;
  createdAt: number;
}
`,
    rdomain: `// Pure domain logic for tasks. Side-effect free + unit-tested.
import type { Task, Priority } from './types';

export const PRIORITIES: readonly Priority[] = ['low', 'medium', 'high'];

export function isTask(v: unknown): v is Task {
  if (typeof v !== 'object' || v === null) return false;
  const o = v as Record<string, unknown>;
  return (
    typeof o.id === 'string' &&
    typeof o.title === 'string' &&
    typeof o.done === 'boolean' &&
    PRIORITIES.includes(o.priority as Priority) &&
    typeof o.createdAt === 'number'
  );
}

export function openTasks(items: Task[]): Task[] {
  return items.filter((t) => !t.done);
}

export function doneCount(items: Task[]): number {
  return items.filter((t) => t.done).length;
}
`,
    rstore: `// Persistence hook-in: export the type + guard for useLocalStorage.
export type { Task as Item } from './types';
export { isTask as isItem } from './domain';
`,
    rtest: `import { describe, it, expect } from 'vitest';
import { isTask, openTasks, doneCount } from '../domain';
import type { Task } from '../types';

const items: Task[] = [
  { id: '1', title: 'Fix bug', done: true, priority: 'high', createdAt: 1 },
  { id: '2', title: 'Write report', done: false, priority: 'high', createdAt: 2 },
];

describe('tasks', () => {
  it('validates records', () => {
    for (const it of items) expect(isTask(it)).toBe(true);
  });
  it('counts open and done', () => {
    expect(openTasks(items).length).toBe(1);
    expect(doneCount(items)).toBe(1);
  });
});
`,
  },

  booking: {
    key: 'booking',
    kind: 'Booking',
    detect: /\b(book|booking|booked|reserve|reservation|appointment|slot|schedule|hotel|flight|seat|venue)\b|(tempah|tempahan|janji|jadual|slot)/,
    categories: ['Room', 'Table', 'Class', 'Consultation', 'Vehicle'],
    names: ['Dinner table', 'Hotel room', 'Haircut', 'Dental check', 'Flight', 'Yoga class', 'Meeting room', 'Car service'],
    types: `// Domain types — the single source of truth for this app.
export type BookingStatus = 'confirmed' | 'pending' | 'cancelled';

export interface Booking {
  id: string;
  title: string;
  date: string; // YYYY-MM-DD
  time: string; // HH:mm
  guests: number;
  status: BookingStatus;
  createdAt: number;
}
`,
    schema: `// Pure domain logic for bookings. Side-effect free + unit-tested.
import type { Booking, BookingStatus } from './types';

export const STATUSES: readonly BookingStatus[] = ['confirmed', 'pending', 'cancelled'];

export function isBooking(v: unknown): v is Booking {
  if (typeof v !== 'object' || v === null) return false;
  const o = v as Record<string, unknown>;
  return (
    typeof o.id === 'string' &&
    typeof o.title === 'string' &&
    typeof o.date === 'string' &&
    typeof o.time === 'string' &&
    typeof o.guests === 'number' && o.guests >= 0 &&
    STATUSES.includes(o.status as BookingStatus) &&
    typeof o.createdAt === 'number'
  );
}

export function totalGuests(items: Booking[]): number {
  return items.reduce((t, b) => t + b.guests, 0);
}

export function confirmedBookings(items: Booking[]): number {
  return items.filter((b) => b.status === 'confirmed').length;
}

export function byStatus(items: Booking[], status: BookingStatus): Booking[] {
  return items.filter((b) => b.status === status);
}
`,
    storage: `// Persistence for bookings — error-safe createStore + domain guard.
import { createStore } from './lib/storage';
import type { Booking } from './types';
import { isBooking } from './schema';

export const bookingStore = createStore<Booking>('app:bookings:v1', isBooking);
export type { Booking };
`,
    test: `import { describe, it, expect } from 'vitest';
import { isBooking, totalGuests, confirmedBookings, byStatus } from '../schema';
import type { Booking } from '../types';

const items: Booking[] = [
  { id: '1', title: 'Dinner table', date: '2026-08-01', time: '19:30', guests: 4, status: 'confirmed', createdAt: 1 },
  { id: '2', title: 'Hotel room', date: '2026-08-02', time: '15:00', guests: 2, status: 'pending', createdAt: 2 },
  { id: '3', title: 'Meeting room', date: '2026-08-03', time: '10:00', guests: 8, status: 'cancelled', createdAt: 3 },
];

describe('bookings', () => {
  it('validates records with the type guard', () => {
    for (const it of items) expect(isBooking(it)).toBe(true);
    expect(isBooking({ nope: 1 })).toBe(false);
  });

  it('totals guests and counts by status', () => {
    expect(totalGuests(items)).toBe(14);
    expect(confirmedBookings(items)).toBe(1);
    expect(byStatus(items, 'pending').length).toBe(1);
  });
});
`,
    seed: (i, names, cats, daysAgoISO) => `({
    title: ${JSON.stringify(names)}[i % ${names.length}] ?? 'Item',
    date: daysAgoISO(i),
    time: (['09:00', '12:30', '15:00', '19:30'] as const)[i % 4] ?? '09:00',
    guests: (i % 6) + 1,
    status: (['confirmed', 'pending', 'cancelled'] as const)[i % 3] ?? 'pending',
  })`,
    rtypes: `// Domain types — the single source of truth for this app.
export type BookingStatus = 'confirmed' | 'pending' | 'cancelled';

export interface Booking {
  id: string;
  title: string;
  date: string; // YYYY-MM-DD
  time: string; // HH:mm
  guests: number;
  status: BookingStatus;
  createdAt: number;
}
`,
    rdomain: `// Pure domain logic for bookings. Side-effect free + unit-tested.
import type { Booking, BookingStatus } from './types';

export const STATUSES: readonly BookingStatus[] = ['confirmed', 'pending', 'cancelled'];

export function isBooking(v: unknown): v is Booking {
  if (typeof v !== 'object' || v === null) return false;
  const o = v as Record<string, unknown>;
  return (
    typeof o.id === 'string' &&
    typeof o.title === 'string' &&
    typeof o.date === 'string' &&
    typeof o.time === 'string' &&
    typeof o.guests === 'number' && o.guests >= 0 &&
    STATUSES.includes(o.status as BookingStatus) &&
    typeof o.createdAt === 'number'
  );
}

export function totalGuests(items: Booking[]): number {
  return items.reduce((t, b) => t + b.guests, 0);
}

export function confirmedBookings(items: Booking[]): number {
  return items.filter((b) => b.status === 'confirmed').length;
}
`,
    rstore: `// Persistence hook-in: export the type + guard for useLocalStorage.
export type { Booking as Item } from './types';
export { isBooking as isItem } from './domain';
`,
    rtest: `import { describe, it, expect } from 'vitest';
import { isBooking, totalGuests, confirmedBookings } from '../domain';
import type { Booking } from '../types';

const items: Booking[] = [
  { id: '1', title: 'Dinner table', date: '2026-08-01', time: '19:30', guests: 4, status: 'confirmed', createdAt: 1 },
  { id: '2', title: 'Hotel room', date: '2026-08-02', time: '15:00', guests: 2, status: 'pending', createdAt: 2 },
];

describe('bookings', () => {
  it('validates records', () => {
    for (const it of items) expect(isBooking(it)).toBe(true);
  });
  it('totals guests and counts confirmed', () => {
    expect(totalGuests(items)).toBe(6);
    expect(confirmedBookings(items)).toBe(1);
  });
});
`,
  },

  crm: {
    key: 'crm',
    kind: 'Contact',
    detect: /\b(crm|contact|lead|customer|client|prospect|deal|sales|relationship|email|phone)\b|(kenalan|pelanggan|prospek)/,
    categories: ['lead', 'active', 'closed'],
    names: ['Aisyah Rahman', 'John Tan', 'Siti Aminah', 'Raj Kumar', 'Mei Ling', 'Ahmad Faiz', 'Nurul Huda', 'Peter Wong'],
    types: `// Domain types — the single source of truth for this app.
export type ContactStatus = 'lead' | 'active' | 'closed';

export interface Contact {
  id: string;
  name: string;
  email: string;
  company: string;
  phone: string;
  status: ContactStatus;
  createdAt: number;
}
`,
    schema: `// Pure domain logic for contacts. Side-effect free + unit-tested.
import type { Contact, ContactStatus } from './types';

export const STATUSES: readonly ContactStatus[] = ['lead', 'active', 'closed'];

export function isContact(v: unknown): v is Contact {
  if (typeof v !== 'object' || v === null) return false;
  const o = v as Record<string, unknown>;
  return (
    typeof o.id === 'string' &&
    typeof o.name === 'string' &&
    typeof o.email === 'string' &&
    typeof o.company === 'string' &&
    typeof o.phone === 'string' &&
    STATUSES.includes(o.status as ContactStatus) &&
    typeof o.createdAt === 'number'
  );
}

export function activeContacts(items: Contact[]): number {
  return items.filter((c) => c.status === 'active').length;
}

export function countByStatus(items: Contact[], status: ContactStatus): number {
  return items.filter((c) => c.status === status).length;
}

export function byCompany(items: Contact[], company: string): Contact[] {
  return items.filter((c) => c.company.toLowerCase() === company.toLowerCase());
}

export function searchContacts(items: Contact[], query: string): Contact[] {
  const q = query.trim().toLowerCase();
  if (!q) return items;
  return items.filter((c) => c.name.toLowerCase().includes(q) || c.company.toLowerCase().includes(q));
}
`,
    storage: `// Persistence for contacts — error-safe createStore + domain guard.
import { createStore } from './lib/storage';
import type { Contact } from './types';
import { isContact } from './schema';

export const contactStore = createStore<Contact>('app:contacts:v1', isContact);
export type { Contact };
`,
    test: `import { describe, it, expect } from 'vitest';
import { isContact, activeContacts, countByStatus, byCompany, searchContacts } from '../schema';
import type { Contact } from '../types';

const items: Contact[] = [
  { id: '1', name: 'Aisyah Rahman', email: 'aisy@example.com', company: 'Pintar Sdn Bhd', phone: '+601234567', status: 'active', createdAt: 1 },
  { id: '2', name: 'John Tan', email: 'john@example.com', company: 'Maju Tech', phone: '+601111111', status: 'lead', createdAt: 2 },
  { id: '3', name: 'Raj Kumar', email: 'raj@example.com', company: 'Pintar Sdn Bhd', phone: '+602222222', status: 'closed', createdAt: 3 },
];

describe('contacts', () => {
  it('validates records with the type guard', () => {
    for (const it of items) expect(isContact(it)).toBe(true);
    expect(isContact({ nope: 1 })).toBe(false);
  });

  it('counts by status and filters by company', () => {
    expect(activeContacts(items)).toBe(1);
    expect(countByStatus(items, 'lead')).toBe(1);
    expect(byCompany(items, 'Pintar Sdn Bhd').length).toBe(2);
  });

  it('searches by name or company', () => {
    expect(searchContacts(items, 'raj').length).toBe(1);
  });
});
`,
    seed: (i, names) => `({
    name: ${JSON.stringify(names)}[i % ${names.length}] ?? 'Item',
    email: 'user' + i + '@example.com',
    company: (['Pintar Sdn Bhd', 'Maju Tech', 'Kreatif Studio'] as const)[i % 3] ?? 'Pintar Sdn Bhd',
    phone: '+6012' + String(100000 + i),
    status: (['lead', 'active', 'closed'] as const)[i % 3] ?? 'lead',
  })`,
    rtypes: `// Domain types — the single source of truth for this app.
export type ContactStatus = 'lead' | 'active' | 'closed';

export interface Contact {
  id: string;
  name: string;
  email: string;
  company: string;
  phone: string;
  status: ContactStatus;
  createdAt: number;
}
`,
    rdomain: `// Pure domain logic for contacts. Side-effect free + unit-tested.
import type { Contact, ContactStatus } from './types';

export const STATUSES: readonly ContactStatus[] = ['lead', 'active', 'closed'];

export function isContact(v: unknown): v is Contact {
  if (typeof v !== 'object' || v === null) return false;
  const o = v as Record<string, unknown>;
  return (
    typeof o.id === 'string' &&
    typeof o.name === 'string' &&
    typeof o.email === 'string' &&
    typeof o.company === 'string' &&
    typeof o.phone === 'string' &&
    STATUSES.includes(o.status as ContactStatus) &&
    typeof o.createdAt === 'number'
  );
}

export function activeContacts(items: Contact[]): number {
  return items.filter((c) => c.status === 'active').length;
}

export function countByStatus(items: Contact[], status: ContactStatus): number {
  return items.filter((c) => c.status === status).length;
}

export function byCompany(items: Contact[], company: string): Contact[] {
  return items.filter((c) => c.company.toLowerCase() === company.toLowerCase());
}
`,
    rstore: `// Persistence hook-in: export the type + guard for useLocalStorage.
export type { Contact as Item } from './types';
export { isContact as isItem } from './domain';
`,
    rtest: `import { describe, it, expect } from 'vitest';
import { isContact, activeContacts, countByStatus } from '../domain';
import type { Contact } from '../types';

const items: Contact[] = [
  { id: '1', name: 'Aisyah Rahman', email: 'aisy@example.com', company: 'Pintar Sdn Bhd', phone: '+601234567', status: 'active', createdAt: 1 },
  { id: '2', name: 'John Tan', email: 'john@example.com', company: 'Maju Tech', phone: '+601111111', status: 'lead', createdAt: 2 },
];

describe('contacts', () => {
  it('validates records', () => {
    for (const it of items) expect(isContact(it)).toBe(true);
  });
  it('counts by status', () => {
    expect(activeContacts(items)).toBe(1);
    expect(countByStatus(items, 'lead')).toBe(1);
  });
});
`,
  },

  fitness: {
    key: 'fitness',
    kind: 'Workout',
    detect: /\b(fitness|gym|workout|exercise|run|running|step|calorie|calories|weight|train|swim|cycle)\b|(senaman|larian|kalori|gim|berat)/,
    names: ['Morning run', 'HIIT', 'Yoga', 'Weight lifting', 'Cycling', 'Swimming', 'Core workout', 'Stretching'],
    types: `// Domain types — the single source of truth for this app.
export interface Workout {
  id: string;
  title: string;
  date: string; // YYYY-MM-DD
  duration: number; // minutes
  calories: number;
  done: boolean;
  createdAt: number;
}
`,
    schema: `// Pure domain logic for workouts. Side-effect free + unit-tested.
import type { Workout } from './types';

export function isWorkout(v: unknown): v is Workout {
  if (typeof v !== 'object' || v === null) return false;
  const o = v as Record<string, unknown>;
  return (
    typeof o.id === 'string' &&
    typeof o.title === 'string' &&
    typeof o.date === 'string' &&
    typeof o.duration === 'number' && o.duration >= 0 &&
    typeof o.calories === 'number' && o.calories >= 0 &&
    typeof o.done === 'boolean' &&
    typeof o.createdAt === 'number'
  );
}

export function totalDuration(items: Workout[]): number {
  return items.reduce((t, w) => t + w.duration, 0);
}

export function totalCalories(items: Workout[]): number {
  return items.reduce((t, w) => t + w.calories, 0);
}

export function completedCount(items: Workout[]): number {
  return items.filter((w) => w.done).length;
}
`,
    storage: `// Persistence for workouts — error-safe createStore + domain guard.
import { createStore } from './lib/storage';
import type { Workout } from './types';
import { isWorkout } from './schema';

export const workoutStore = createStore<Workout>('app:workouts:v1', isWorkout);
export type { Workout };
`,
    test: `import { describe, it, expect } from 'vitest';
import { isWorkout, totalDuration, totalCalories, completedCount } from '../schema';
import type { Workout } from '../types';

const items: Workout[] = [
  { id: '1', title: 'Morning run', date: '2026-08-01', duration: 30, calories: 300, done: true, createdAt: 1 },
  { id: '2', title: 'HIIT', date: '2026-08-02', duration: 20, calories: 250, done: false, createdAt: 2 },
  { id: '3', title: 'Yoga', date: '2026-08-03', duration: 45, calories: 180, done: true, createdAt: 3 },
];

describe('workouts', () => {
  it('validates records with the type guard', () => {
    for (const it of items) expect(isWorkout(it)).toBe(true);
    expect(isWorkout({ nope: 1 })).toBe(false);
  });

  it('totals duration and calories', () => {
    expect(totalDuration(items)).toBe(95);
    expect(totalCalories(items)).toBe(730);
  });

  it('counts completed', () => {
    expect(completedCount(items)).toBe(2);
  });
});
`,
    seed: (i, names, _cats, daysAgoISO) => `({
    title: ${JSON.stringify(names)}[i % ${names.length}] ?? 'Item',
    date: daysAgoISO(i),
    duration: ((i % 5) + 2) * 10,
    calories: ((i % 5) + 2) * 90,
    done: i % 2 === 0,
  })`,
    rtypes: `// Domain types — the single source of truth for this app.
export interface Workout {
  id: string;
  title: string;
  date: string; // YYYY-MM-DD
  duration: number; // minutes
  calories: number;
  done: boolean;
  createdAt: number;
}
`,
    rdomain: `// Pure domain logic for workouts. Side-effect free + unit-tested.
import type { Workout } from './types';

export function isWorkout(v: unknown): v is Workout {
  if (typeof v !== 'object' || v === null) return false;
  const o = v as Record<string, unknown>;
  return (
    typeof o.id === 'string' &&
    typeof o.title === 'string' &&
    typeof o.date === 'string' &&
    typeof o.duration === 'number' && o.duration >= 0 &&
    typeof o.calories === 'number' && o.calories >= 0 &&
    typeof o.done === 'boolean' &&
    typeof o.createdAt === 'number'
  );
}

export function totalDuration(items: Workout[]): number {
  return items.reduce((t, w) => t + w.duration, 0);
}

export function totalCalories(items: Workout[]): number {
  return items.reduce((t, w) => t + w.calories, 0);
}

export function completedCount(items: Workout[]): number {
  return items.filter((w) => w.done).length;
}
`,
    rstore: `// Persistence hook-in: export the type + guard for useLocalStorage.
export type { Workout as Item } from './types';
export { isWorkout as isItem } from './domain';
`,
    rtest: `import { describe, it, expect } from 'vitest';
import { isWorkout, totalDuration, totalCalories, completedCount } from '../domain';
import type { Workout } from '../types';

const items: Workout[] = [
  { id: '1', title: 'Morning run', date: '2026-08-01', duration: 30, calories: 300, done: true, createdAt: 1 },
  { id: '2', title: 'HIIT', date: '2026-08-02', duration: 20, calories: 250, done: false, createdAt: 2 },
];

describe('workouts', () => {
  it('validates records', () => {
    for (const it of items) expect(isWorkout(it)).toBe(true);
  });
  it('totals duration and calories', () => {
    expect(totalDuration(items)).toBe(50);
    expect(totalCalories(items)).toBe(550);
  });
  it('counts completed', () => {
    expect(completedCount(items)).toBe(1);
  });
});
`,
  },

  library: {
    key: 'library',
    kind: 'Media',
    detect: /\b(library|movie|film|music|album|media|video|read|watch|listen|novel)\b|(buku|media|filem|muzik|baca)/,
    categories: ['book', 'movie', 'music'],
    names: ['The Great Gatsby', 'Inception', 'Abbey Road', 'Dune', 'Interstellar', '1984', 'Thriller', 'Pride and Prejudice'],
    types: `// Domain types — the single source of truth for this app.
export type Medium = 'book' | 'movie' | 'music';

export interface Media {
  id: string;
  title: string;
  creator: string;
  medium: Medium;
  year: number;
  done: boolean; // finished/consumed
  createdAt: number;
}
`,
    schema: `// Pure domain logic for a media library. Side-effect free + unit-tested.
import type { Media, Medium } from './types';

export const MEDIUMS: readonly Medium[] = ['book', 'movie', 'music'];

export function isMedia(v: unknown): v is Media {
  if (typeof v !== 'object' || v === null) return false;
  const o = v as Record<string, unknown>;
  return (
    typeof o.id === 'string' &&
    typeof o.title === 'string' &&
    typeof o.creator === 'string' &&
    MEDIUMS.includes(o.medium as Medium) &&
    typeof o.year === 'number' &&
    typeof o.done === 'boolean' &&
    typeof o.createdAt === 'number'
  );
}

export function countByMedium(items: Media[], medium: Medium): number {
  return items.filter((m) => m.medium === medium).length;
}

export function unfinished(items: Media[]): Media[] {
  return items.filter((m) => !m.done);
}

export function searchMedia(items: Media[], query: string): Media[] {
  const q = query.trim().toLowerCase();
  if (!q) return items;
  return items.filter((m) => m.title.toLowerCase().includes(q) || m.creator.toLowerCase().includes(q));
}
`,
    storage: `// Persistence for media — error-safe createStore + domain guard.
import { createStore } from './lib/storage';
import type { Media } from './types';
import { isMedia } from './schema';

export const mediaStore = createStore<Media>('app:media:v1', isMedia);
export type { Media };
`,
    test: `import { describe, it, expect } from 'vitest';
import { isMedia, countByMedium, unfinished, searchMedia } from '../schema';
import type { Media } from '../types';

const items: Media[] = [
  { id: '1', title: 'The Great Gatsby', creator: 'F. Scott Fitzgerald', medium: 'book', year: 1925, done: true, createdAt: 1 },
  { id: '2', title: 'Inception', creator: 'Christopher Nolan', medium: 'movie', year: 2010, done: false, createdAt: 2 },
  { id: '3', title: 'Abbey Road', creator: 'The Beatles', medium: 'music', year: 1969, done: true, createdAt: 3 },
];

describe('media', () => {
  it('validates records with the type guard', () => {
    for (const it of items) expect(isMedia(it)).toBe(true);
    expect(isMedia({ nope: 1 })).toBe(false);
  });

  it('counts by medium and finds unfinished', () => {
    expect(countByMedium(items, 'book')).toBe(1);
    expect(unfinished(items).length).toBe(1);
  });

  it('searches by title or creator', () => {
    expect(searchMedia(items, 'nolan').length).toBe(1);
  });
});
`,
    seed: (i, names) => `({
    title: ${JSON.stringify(names)}[i % ${names.length}] ?? 'Item',
    creator: (['Various', 'Christopher Nolan', 'The Beatles', 'George Orwell'] as const)[i % 4] ?? 'Various',
    medium: (['book', 'movie', 'music'] as const)[i % 3] ?? 'book',
    year: 1950 + ((i * 7) % 75),
    done: i % 2 === 0,
  })`,
    rtypes: `// Domain types — the single source of truth for this app.
export type Medium = 'book' | 'movie' | 'music';

export interface Media {
  id: string;
  title: string;
  creator: string;
  medium: Medium;
  year: number;
  done: boolean; // finished/consumed
  createdAt: number;
}
`,
    rdomain: `// Pure domain logic for a media library. Side-effect free + unit-tested.
import type { Media, Medium } from './types';

export const MEDIUMS: readonly Medium[] = ['book', 'movie', 'music'];

export function isMedia(v: unknown): v is Media {
  if (typeof v !== 'object' || v === null) return false;
  const o = v as Record<string, unknown>;
  return (
    typeof o.id === 'string' &&
    typeof o.title === 'string' &&
    typeof o.creator === 'string' &&
    MEDIUMS.includes(o.medium as Medium) &&
    typeof o.year === 'number' &&
    typeof o.done === 'boolean' &&
    typeof o.createdAt === 'number'
  );
}

export function countByMedium(items: Media[], medium: Medium): number {
  return items.filter((m) => m.medium === medium).length;
}

export function unfinished(items: Media[]): Media[] {
  return items.filter((m) => !m.done);
}
`,
    rstore: `// Persistence hook-in: export the type + guard for useLocalStorage.
export type { Media as Item } from './types';
export { isMedia as isItem } from './domain';
`,
    rtest: `import { describe, it, expect } from 'vitest';
import { isMedia, countByMedium, unfinished } from '../domain';
import type { Media } from '../types';

const items: Media[] = [
  { id: '1', title: 'The Great Gatsby', creator: 'F. Scott Fitzgerald', medium: 'book', year: 1925, done: true, createdAt: 1 },
  { id: '2', title: 'Inception', creator: 'Christopher Nolan', medium: 'movie', year: 2010, done: false, createdAt: 2 },
];

describe('media', () => {
  it('validates records', () => {
    for (const it of items) expect(isMedia(it)).toBe(true);
  });
  it('counts by medium and finds unfinished', () => {
    expect(countByMedium(items, 'book')).toBe(1);
    expect(unfinished(items).length).toBe(1);
  });
});
`,
  },
};

const DOMAINS = BASE_DOMAINS;

const GENERIC = {
  key: 'generic',
  kind: 'Item',
  names: ['Alpha', 'Beta', 'Gamma', 'Delta', 'Epsilon', 'Zeta', 'Eta', 'Theta'],
  types: `// Domain types — the single source of truth for this app.
export interface Item {
  id: string;
  name: string;
  createdAt: number;
}
`,
  schema: `// Pure domain logic. Side-effect free + unit-tested.
import type { Item } from './types';

export function isItem(v: unknown): v is Item {
  if (typeof v !== 'object' || v === null) return false;
  const o = v as Record<string, unknown>;
  return typeof o.id === 'string' && typeof o.name === 'string' && typeof o.createdAt === 'number';
}

export function countItems(items: Item[]): number {
  return items.length;
}

export function search(items: Item[], query: string): Item[] {
  const q = query.trim().toLowerCase();
  if (!q) return items;
  return items.filter((i) => i.name.toLowerCase().includes(q));
}
`,
  storage: `// Persistence — error-safe createStore + domain guard.
import { createStore } from './lib/storage';
import type { Item } from './types';
import { isItem } from './schema';

export const itemStore = createStore<Item>('app:items:v1', isItem);
export type { Item };
`,
  test: `import { describe, it, expect } from 'vitest';
import { isItem, countItems, search } from '../schema';
import type { Item } from '../types';

const items: Item[] = [
  { id: '1', name: 'Milk', createdAt: 1 },
  { id: '2', name: 'Bread', createdAt: 2 },
];

describe('items', () => {
  it('validates records', () => {
    for (const it of items) expect(isItem(it)).toBe(true);
    expect(isItem({ nope: 1 })).toBe(false);
  });

  it('counts and searches', () => {
    expect(countItems(items)).toBe(2);
    expect(search(items, 'milk').length).toBe(1);
  });
});
`,
  seed: (i, names) => `({
    name: ${JSON.stringify(names)}[i % ${names.length}] ?? 'Item',
  })`,
  rtypes: `// Domain types — the single source of truth for this app.
export interface Item {
  id: string;
  name: string;
  createdAt: number;
}
`,
  rdomain: `// Pure domain logic. Side-effect free + unit-tested.
import type { Item } from './types';

export function isItem(v: unknown): v is Item {
  if (typeof v !== 'object' || v === null) return false;
  const o = v as Record<string, unknown>;
  return typeof o.id === 'string' && typeof o.name === 'string' && typeof o.createdAt === 'number';
}

export function countItems(items: Item[]): number {
  return items.length;
}

export function search(items: Item[], query: string): Item[] {
  const q = query.trim().toLowerCase();
  if (!q) return items;
  return items.filter((i) => i.name.toLowerCase().includes(q));
}
`,
  rstore: `// Persistence hook-in: export the type + guard for useLocalStorage.
export type { Item } from './types';
export { isItem } from './domain';
`,
  rtest: `import { describe, it, expect } from 'vitest';
import { isItem, countItems, search } from '../domain';
import type { Item } from '../types';

const items: Item[] = [
  { id: '1', name: 'Milk', createdAt: 1 },
  { id: '2', name: 'Bread', createdAt: 2 },
];

describe('items', () => {
  it('validates records', () => {
    for (const it of items) expect(isItem(it)).toBe(true);
  });
  it('counts and searches', () => {
    expect(countItems(items)).toBe(2);
    expect(search(items, 'milk').length).toBe(1);
  });
});
`,
};

const ORDER = ['finance', 'ecommerce', 'task', 'library', 'booking', 'crm', 'fitness'];
const GUARD_TO_KEY = { isExpense: 'finance', isProduct: 'ecommerce', isTask: 'task', isBooking: 'booking', isContact: 'crm', isWorkout: 'fitness', isMedia: 'library', isItem: 'generic' };

export function detectDomain(text) {
  const lower = text.toLowerCase();
  for (const key of ORDER) {
    if (DOMAINS[key].detect.test(lower)) return DOMAINS[key];
  }
  return GENERIC;
}

/** Prefer the domain already compiled into src/schema.ts (ground truth). */
export function detectByGuard(schemaSrc) {
  const m = /export function (is[A-Za-z]+)\(/.exec(schemaSrc || '');
  const key = m ? GUARD_TO_KEY[m[1]] : undefined;
  return key ? DOMAINS[key] ?? GENERIC : null;
}

/** seedData.ts body for a domain (vanilla variant). */
export function seedDataTemplate(domain, count) {
  const kind = domain.kind;
  const names = domain.names ?? GENERIC.names;
  const cats = domain.categories ?? [];
  const factory = domain.seed ?? GENERIC.seed;
  const guard = `is${kind}`;
  const body = factory('i', names, cats, 'daysAgoISO');
  const dateImport = body.includes('daysAgoISO') ? ', daysAgoISO' : '';
  return `// Starter data for this app. Edit freely — fields must match the guard in src/storage.ts.
import { makeSeed${dateImport} } from './lib/seed';
import { ${guard} } from './schema';
import type { ${kind} } from './types';

export type SeedItem = ${kind};

export { ${guard} as isSeedItem };

export function seedItems(count: number = ${count}): SeedItem[] {
  return makeSeed<SeedItem>(count, (i) => ${body});
}
`;
}

/** seedData.ts body for a domain (React variant). */
export function seedDataTemplateReact(domain, count) {
  const kind = domain.kind;
  const names = domain.names ?? GENERIC.names;
  const cats = domain.categories ?? [];
  const factory = domain.seed ?? GENERIC.seed;
  const guard = `is${kind}`;
  const body = factory('i', 'NAMES', 'CATEGORIES', 'daysAgoISO');
  const dateImport = body.includes('daysAgoISO') ? ', daysAgoISO' : '';
  return `// Starter data for this app. Edit freely — fields must match the guard in src/store.ts.
import { makeSeed${dateImport} } from './lib/seed';
import { ${guard} } from './domain';
import type { ${kind} } from './types';

export type SeedItem = ${kind};

export { ${guard} as isSeedItem };

export function seedItems(count: number = ${count}): SeedItem[] {
  return makeSeed<SeedItem>(count, (i) => ${body});
}
`;
}

export const SEED_TEST = `// Seed data test — every record validates against its own guard.
import { describe, it, expect } from 'vitest';
import { seedItems, isSeedItem } from '../seedData';

describe('seed data', () => {
  it('generates the requested count with unique ids', () => {
    const items = seedItems(6);
    expect(items).toHaveLength(6);
    expect(new Set(items.map((i) => i.id)).size).toBe(6);
  });

  it('every record passes its own type guard', () => {
    for (const item of seedItems(10)) expect(isSeedItem(item)).toBe(true);
  });
});
`;

export { GENERIC };