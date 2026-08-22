import { describe, it, expect, vi } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useLocalStorage, useAnnounce } from '../lib/hooks';

describe('hooks (React port)', () => {
  const isNum = (v: unknown): v is number => typeof v === 'number';

  it('hydrates from localStorage on mount', () => {
    localStorage.setItem('k', JSON.stringify([1, 2]));
    const { result } = renderHook(() => useLocalStorage<number>('k', isNum));
    act(() => {});
    expect(result.current.loading).toBe(false);
    expect(result.current.items).toEqual([1, 2]);
  });

  it('setItems persists via a ref so updaters never read stale state', () => {
    const { result } = renderHook(() => useLocalStorage<number>('k', isNum, []));
    act(() => {});
    act(() => result.current.setItems((prev) => [...prev, 1]));
    act(() => result.current.setItems((prev) => [...prev, 2]));
    expect(result.current.items).toEqual([1, 2]);
    expect(JSON.parse(localStorage.getItem('k') ?? '[]')).toEqual([1, 2]);
  });

  it('surface save errors and can dismiss them', () => {
    const { result } = renderHook(() => useLocalStorage<number>('k', isNum, []));
    const spy = vi.spyOn(Storage.prototype, 'setItem').mockImplementation(() => { throw new Error('QuotaExceededError'); });
    act(() => {});
    act(() => result.current.setItems((prev) => [...prev, 1]));
    expect(result.current.error).toBeTruthy();
    act(() => result.current.dismissError());
    expect(result.current.error).toBeNull();
    spy.mockRestore();
  });

  it('useAnnounce creates a visually-hidden live region and publishes', async () => {
    const { result } = renderHook(() => useAnnounce());
    act(() => result.current('Item ditambah.'));
    const live = document.querySelector('#a11y-live');
    expect(live?.getAttribute('aria-live')).toBe('polite');
    expect(live?.className).toContain('sr-only');
    await act(async () => {
      await new Promise((r) => setTimeout(r, 60));
    });
    expect(live?.textContent).toBe('Item ditambah.');
  });
});