// CSV serialization — import/export records without a library.
// RFC-4180-ish: quoted fields, escaped quotes, commas and newlines inside quotes.
export type CsvRow = Record<string, string>;

function esc(v: unknown): string {
  const s = v == null ? '' : String(v);
  return /[",\n]/.test(s) ? '"' + s.replace(/"/g, '""') + '"' : s;
}

export function toCsv(records: Record<string, unknown>[]): string {
  if (records.length === 0) return '';
  const keys = Object.keys(records[0] ?? {});
  const lines = [keys.map(esc).join(',')];
  for (const r of records) lines.push(keys.map((k) => esc(r[k])).join(','));
  return lines.join('\n');
}

export function parseCsv(text: string): CsvRow[] {
  const rows: string[][] = [];
  const chars = [...text];
  let row: string[] = [];
  let field = '';
  let inQuotes = false;
  let i = 0;
  const n = chars.length;
  while (i < n) {
    const ch = chars[i] ?? '';
    if (inQuotes) {
      if (ch === '"') {
        if ((chars[i + 1] ?? '') === '"') {
          field += '"';
          i += 2;
          continue;
        }
        inQuotes = false;
      } else {
        field += ch;
      }
    } else if (ch === '"') {
      inQuotes = true;
    } else if (ch === '\r') {
      // CRLF: skip carriage return, let the \n branch finish the row
    } else if (ch === ',') {
      row.push(field);
      field = '';
    } else if (ch === '\n') {
      row.push(field);
      field = '';
      if (row.some((c) => c !== '')) rows.push(row);
      row = [];
    } else {
      field += ch;
    }
    i += 1;
  }
  if (field !== '' || row.length > 0) {
    row.push(field);
    if (row.some((c) => c !== '')) rows.push(row);
  }
  const header = rows.shift() ?? [];
  return rows.map((vals) => {
    const rec: CsvRow = {};
    for (let j = 0; j < header.length; j += 1) rec[header[j] ?? 'col' + j] = vals[j] ?? '';
    return rec;
  });
}