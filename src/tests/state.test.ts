import { describe, expect, it, vi } from 'vitest';
import { createState } from '../lib/state';

describe('state', () => {
  it('holds initial state', () => {
    const { getState } = createState({ count: 0, name: 'test' });
    expect(getState()).toEqual({ count: 0, name: 'test' });
  });

  it('updates state with partial object', () => {
    const { getState, setState } = createState({ count: 0, name: 'test' });
    setState({ count: 5 });
    expect(getState().count).toBe(5);
    expect(getState().name).toBe('test');
  });

  it('updates state with updater function', () => {
    const { getState, setState } = createState({ count: 5 });
    setState((prev) => ({ count: prev.count + 3 }));
    expect(getState().count).toBe(8);
  });

  it('notifies subscribers on change', () => {
    const { setState, subscribe } = createState({ count: 0 });
    const listener = vi.fn();
    subscribe(listener);
    setState({ count: 1 });
    expect(listener).toHaveBeenCalledWith({ count: 1 });
  });

  it('unsubscribe stops notifications', () => {
    const { setState, subscribe } = createState({ count: 0 });
    const listener = vi.fn();
    const unsub = subscribe(listener);
    unsub();
    setState({ count: 1 });
    expect(listener).not.toHaveBeenCalled();
  });

  it('does not mutate previous state (immutable)', () => {
    const { getState, setState } = createState({ items: [] as number[] });
    const first = getState();
    setState({ items: [1, 2] });
    expect(first.items).toEqual([]);
    expect(getState().items).toEqual([1, 2]);
  });
});
