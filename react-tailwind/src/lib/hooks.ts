import { useState, useEffect, useCallback, useRef } from 'react';
import { loadStore, saveStore } from './storage';

export interface UseLocalStorageResult<T> {
  items: T[];
  loading: boolean;
  error: string | null;
  setItems: (updater: (prev: T[]) => T[]) => void;
  dismissError: () => void;
}

export function useLocalStorage<T>(
  key: string,
  validate: (v: unknown) => v is T,
  initial: T[] = [],
): UseLocalStorageResult<T> {
  const [items, setItemsState] = useState<T[]>(initial);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const ref = useRef<T[]>(initial);

  useEffect(() => {
    const result = loadStore(key, validate);
    ref.current = result.data;
    setItemsState(result.data);
    if (result.error) setError(result.error);
    setLoading(false);
  }, [key, validate]);

  const setItems = useCallback((updater: (prev: T[]) => T[]) => {
    const next = updater(ref.current);
    ref.current = next;
    setItemsState(next);
    const result = saveStore(key, next);
    if (!result.ok) setError(result.error ?? 'Save failed.');
    else setError(null);
  }, [key]);

  const dismissError = useCallback(() => setError(null), []);

  return { items, loading, error, setItems, dismissError };
}

export function useAnnounce(): (message: string, assertive?: boolean) => void {
  return useCallback((message: string, assertive = false) => {
    let live = document.querySelector<HTMLElement>('#a11y-live');
    if (!live) {
      live = document.createElement('div');
      live.id = 'a11y-live';
      live.setAttribute('aria-live', assertive ? 'assertive' : 'polite');
      live.setAttribute('aria-atomic', 'true');
      live.className = 'sr-only';
      document.body.appendChild(live);
    }
    live.textContent = '';
    window.setTimeout(() => {
      if (live) live.textContent = message;
    }, 50);
  }, []);
}