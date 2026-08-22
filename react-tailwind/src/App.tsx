import { useState } from 'react';
import { useLocalStorage, useAnnounce } from './lib/hooks';
import { Modal, useModal } from './lib/modal';
import { formatCurrency } from './lib/format';

export const CATEGORIES = ['Makanan', 'Pengangkutan', 'Utiliti', 'Hiburan', 'Lain-lain'] as const;
export type Category = (typeof CATEGORIES)[number];

export interface Item {
  id: string;
  name: string;
  amount: number;
  category: Category;
  createdAt: number;
}

export function isItem(v: unknown): v is Item {
  if (typeof v !== 'object' || v === null) return false;
  const o = v as Record<string, unknown>;
  return (
    typeof o.id === 'string' && typeof o.name === 'string' &&
    typeof o.amount === 'number' && Number.isFinite(o.amount) &&
    typeof o.category === 'string' && (CATEGORIES as readonly string[]).includes(o.category) &&
    typeof o.createdAt === 'number'
  );
}

function AppShell() {
  const { items, loading, error, setItems, dismissError } = useLocalStorage<Item>('ponytail-react:v1', isItem);
  const announce = useAnnounce();
  const [name, setName] = useState('');
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState<Category>('Makanan');
  const [formError, setFormError] = useState('');
  const confirm = useModal();
  const [pendingDelete, setPendingDelete] = useState<Item | null>(null);
  const [editingId, setEditingId] = useState<string | null>(null);

  const editing = editingId ? items.find((i) => i.id === editingId) ?? null : null;

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const amt = Number(amount);
    if (!name.trim() || !Number.isFinite(amt) || amt <= 0) {
      setFormError('Nama dan jumlah yang sah diperlukan.');
      return;
    }
    setFormError('');
    const now = Date.now();
    if (editing) {
      setItems((prev) => prev.map((i) => (i.id === editing.id ? { ...i, name: name.trim(), amount: amt, category } : i)));
      announce('Item dikemas kini.');
    } else {
      setItems((prev) => [{ id: crypto.randomUUID(), name: name.trim(), amount: amt, category, createdAt: now }, ...prev]);
      announce('Item ditambah.');
    }
    setName(''); setAmount(''); setEditingId(null);
  };

  const requestDelete = (item: Item) => { setPendingDelete(item); confirm.open(); };
  const doDelete = () => {
    if (pendingDelete) {
      setItems((prev) => prev.filter((i) => i.id !== pendingDelete.id));
      announce('Item dipadam.');
    }
    confirm.close();
    setPendingDelete(null);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-surface-alt border-t-primary rounded-full animate-spin" aria-hidden="true" />
        <span className="sr-only">Memuatkan...</span>
      </div>
    );
  }

  return (
    <div className="min-h-screen max-w-3xl mx-auto px-4 py-6">
      <header aria-label="Header halaman" className="mb-6">
        <h1 className="text-2xl font-bold">Ponytail React</h1>
        <p className="text-text-soft text-sm mt-1">Demo CRUD — 7 senjata diport ke hooks</p>
      </header>

      {error && (
        <div role="alert" className="flex items-center justify-between gap-3 bg-danger/10 border border-danger/30 rounded-lg p-3 mb-4">
          <span className="text-danger text-sm">{error}</span>
          <button onClick={dismissError} aria-label="Tutup amaran" className="text-danger text-lg leading-none">×</button>
        </div>
      )}

      <main aria-label="Kandungan utama" className="grid grid-cols-1 md:grid-cols-[320px_1fr] gap-6">
        <section aria-label="Borang" className="bg-surface border border-border rounded-xl p-5 shadow-lg">
          <h2 className="font-semibold text-sm mb-3">{editing ? 'Edit Item' : 'Tambah Item'}</h2>
          {formError && <p role="alert" className="text-danger text-sm mb-2">{formError}</p>}
          <form onSubmit={submit} className="space-y-4" aria-label="Form item">
            <div>
              <label htmlFor="name" className="block text-text-soft text-xs font-medium mb-1">Nama</label>
              <input id="name" value={name} onChange={(e) => setName(e.target.value)}
                aria-label="Nama item" className="w-full bg-surface-alt border border-border rounded-lg px-3 py-2" />
            </div>
            <div>
              <label htmlFor="amount" className="block text-text-soft text-xs font-medium mb-1">Jumlah (RM)</label>
              <input id="amount" type="number" step="0.01" min="0.01" value={amount} onChange={(e) => setAmount(e.target.value)}
                aria-label="Jumlah dalam Ringgit" className="w-full bg-surface-alt border border-border rounded-lg px-3 py-2" />
            </div>
            <div>
              <label htmlFor="category" className="block text-text-soft text-xs font-medium mb-1">Kategori</label>
              <select id="category" value={category} onChange={(e) => setCategory(e.target.value as Category)}
                aria-label="Kategori item" className="w-full bg-surface-alt border border-border rounded-lg px-3 py-2">
                {CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
            <div className="flex gap-2">
              <button type="submit" className="flex-1 bg-primary hover:bg-primary-hover text-white font-medium text-sm rounded-lg px-4 py-2">
                {editing ? 'Simpan' : 'Tambah'}
              </button>
              {editing && (
                <button type="button" onClick={() => { setEditingId(null); setName(''); setAmount(''); }}
                  className="bg-transparent border border-border text-text-soft text-sm rounded-lg px-4 py-2">Batal</button>
              )}
            </div>
          </form>
        </section>

        <section aria-label="Senarai item" className="bg-surface border border-border rounded-xl p-5 shadow-lg">
          <h2 className="font-semibold text-sm mb-3">Item ({items.length})</h2>
          {items.length === 0 ? (
            <p className="text-text-soft text-sm py-8 text-center">Tiada item. Tambah satu untuk mula.</p>
          ) : (
            <ul aria-label="Senarai" className="space-y-2">
              {items.map((i) => (
                <li key={i.id} className="flex items-center justify-between gap-3 bg-surface-alt/50 rounded-lg p-3">
                  <div className="min-w-0">
                    <p className="font-medium text-sm truncate">{i.name}</p>
                    <p className="text-text-soft text-xs">{i.category}</p>
                  </div>
                  <span className="font-semibold text-sm" style={{ fontFamily: 'ui-monospace, monospace' }}>{formatCurrency(i.amount)}</span>
                  <div className="flex gap-1 shrink-0">
                    <button onClick={() => { setEditingId(i.id); setName(i.name); setAmount(String(i.amount)); setCategory(i.category); }}
                      aria-label={`Edit ${i.name}`} className="text-text-soft hover:text-primary text-xs px-2 py-1 rounded">Edit</button>
                    <button onClick={() => requestDelete(i)} aria-label={`Padam ${i.name}`}
                      className="text-text-soft hover:text-danger text-xs px-2 py-1 rounded">Padam</button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </section>
      </main>

      <Modal isOpen={confirm.isOpen} onClose={confirm.close} labelledBy="confirm-title">
        <h2 id="confirm-title" className="font-semibold text-sm">Padam item?</h2>
        <p className="text-text-soft text-sm mt-1 mb-4">
          {pendingDelete ? `"${pendingDelete.name}" — ${formatCurrency(pendingDelete.amount)}. Tindakan ini tidak boleh dibatalkan.` : ''}
        </p>
        <div className="flex gap-2 justify-end">
          <button onClick={confirm.close} className="bg-transparent border border-border text-text-soft text-sm rounded-lg px-4 py-2">Batal</button>
          <button onClick={doDelete} className="bg-danger hover:bg-danger-hover text-white text-sm font-medium rounded-lg px-4 py-2">Padam</button>
        </div>
      </Modal>
    </div>
  );
}

export function App() {
  return <AppShell />;
}