import { defineConfig } from 'vitest/config';

// Real axe scan — renders the actual app (src/main.ts) and runs axe-core on it.
export default defineConfig({
  test: {
    environment: 'jsdom',
    include: ['src/tests/a11y.scan.test.ts'],
    fileParallelism: false,
  },
});