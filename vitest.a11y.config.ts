import { defineConfig } from 'vitest/config';

// A11y test config — runs the a11y baseline suite (landmarks, labels, dialogs).
export default defineConfig({
  test: {
    environment: 'jsdom',
    include: ['src/tests/a11y.test.ts'],
  },
});