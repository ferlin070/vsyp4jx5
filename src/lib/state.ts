/**
 * Minimal reactive state manager — no dependencies, ~1KB.
 *
 * WHY THIS EXISTS:
 * Keeps app state out of the DOM and testable. Pure functions operate on
 * state; the view subscribes and re-renders when state changes.
 *
 * Usage:
 *   const [state, setState, subscribe] = createStore({ count: 0 });
 *   subscribe(newState => render(newState));
 *   setState({ count: state.count + 1 });
 */

export type Subscriber<T> = (state: T) => void;

export interface StateStore<T> {
  getState: () => T;
  setState: (partial: Partial<T> | ((prev: T) => Partial<T>)) => void;
  subscribe: (fn: Subscriber<T>) => () => void;
}

export function createState<T extends object>(initial: T): StateStore<T> {
  let state = { ...initial };
  const subs = new Set<Subscriber<T>>();

  return {
    getState: () => state,
    setState: (partial) => {
      const update = typeof partial === 'function' ? partial(state) : partial;
      state = { ...state, ...update };
      subs.forEach((fn) => fn(state));
    },
    subscribe: (fn) => {
      subs.add(fn);
      return () => subs.delete(fn);
    },
  };
}
