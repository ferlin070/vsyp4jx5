import { defineConfig } from 'vitest/config';

// Coverage gate — same tests as `npm test`, plus a v8 coverage threshold.
// In generated apps this also counts src/schema.ts + src/seedData.ts (add tests).
export default defineConfig({
  test: {
    environment: 'jsdom',
    include: ['src/tests/**/*.test.ts'],
    globals: false,
    coverage: {
      reporter: ['text'],
      include: ['src/lib/**/*.ts', 'src/schema.ts', 'src/domain.ts', 'src/seedData.ts'],
      thresholds: {
        statements: 65,
        branches: 55,
        functions: 65,
        lines: 65,
      },
    },
  },
});