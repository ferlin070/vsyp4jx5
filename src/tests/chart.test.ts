import { describe, it, expect } from 'vitest';
import { barChart, sparkline } from '../lib/chart';

describe('chart', () => {
  it('barChart renders accessible svg with a bar per value', () => {
    const svg = barChart([10, 20], { label: 'Spending' });
    expect(svg).toContain('role="img"');
    expect(svg).toContain('<title>Spending</title>');
    expect(svg.match(/<rect/g)?.length).toBe(2);
  });

  it('barChart handles all-zero values', () => {
    const svg = barChart([0, 0]);
    expect(svg).toContain('</svg>');
  });

  it('sparkline renders a polyline and handles empty input', () => {
    const svg = sparkline([1, 3, 2]);
    expect(svg).toContain('<polyline');
    expect(sparkline([])).toContain('role="img"');
  });
});