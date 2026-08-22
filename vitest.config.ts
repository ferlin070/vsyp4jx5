import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    environment: 'jsdom',
    include: ['src/tests/**/*.test.ts'],
    globals: false,
    coverage: {
      reporter: ['text', 'html'],
      include: ['src/lib/**/*.ts'],
    },
  },
});
