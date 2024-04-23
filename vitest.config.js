import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    globals: true,
    environment: 'jsdom',
  },
  root: '.', 
  coverage: {
    reporter: ['text', 'json', 'html'],
  },
  watch: true,
  clearMocks: true,
});