// Dependency-free SVG charts. Returns markup strings — safe (numbers only).
export interface ChartOptions {
  width?: number;
  height?: number;
  color?: string;
  label?: string;
}

const clamp = (v: number, lo: number, hi: number) => Math.min(hi, Math.max(lo, v));

export function barChart(values: number[], opts: ChartOptions = {}): string {
  const width = opts.width ?? 320;
  const height = opts.height ?? 160;
  const color = opts.color ?? '#2563eb';
  const label = opts.label ?? 'Bar chart';
  const max = Math.max(...values, 1);
  const pad = 4;
  const count = Math.max(1, values.length);
  const barW = Math.max(2, (width - pad * (count + 1)) / count);
  const bars = values
    .map((v, i) => {
      const h = Math.max(1, (clamp(v, 0, max) / max) * (height - 12));
      const x = pad + i * (barW + pad);
      const y = height - h;
      return `<rect x="${x.toFixed(1)}" y="${y.toFixed(1)}" width="${barW.toFixed(1)}" height="${h.toFixed(1)}" fill="${color}"></rect>`;
    })
    .join('');
  return `<svg role="img" aria-label="${label}" viewBox="0 0 ${width} ${height}" width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg"><title>${label}</title>${bars}</svg>`;
}

export function sparkline(values: number[], opts: ChartOptions = {}): string {
  const width = opts.width ?? 160;
  const height = opts.height ?? 40;
  const color = opts.color ?? '#2563eb';
  const label = opts.label ?? 'Sparkline';
  if (values.length === 0) {
    return `<svg role="img" aria-label="${label}" width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg"></svg>`;
  }
  const min = Math.min(...values);
  const max = Math.max(...values);
  const span = Math.max(1, max - min);
  const stepX = width / Math.max(1, values.length - 1);
  const pts = values
    .map((v, i) => `${(i * stepX).toFixed(1)},${(height - 2 - ((v - min) / span) * (height - 4)).toFixed(1)}`)
    .join(' ');
  return `<svg role="img" aria-label="${label}" viewBox="0 0 ${width} ${height}" width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg"><title>${label}</title><polyline points="${pts}" fill="none" stroke="${color}" stroke-width="2" stroke-linecap="round"></polyline></svg>`;
}