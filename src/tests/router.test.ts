import { describe, it, expect } from 'vitest';
import { parseHash, navigate } from '../lib/router';

describe('router', () => {
  it('parses paths and query params', () => {
    expect(parseHash('#/items/5?page=2')).toEqual({ path: '/items/5', params: { page: '2' } });
    expect(parseHash('')).toEqual({ path: '/', params: {} });
    expect(parseHash('#/')).toEqual({ path: '/', params: {} });
    expect(parseHash('#/books')).toEqual({ path: '/books', params: {} });
  });

  it('navigate updates the hash', () => {
    navigate('/settings');
    expect(window.location.hash).toBe('#/settings');
  });
});