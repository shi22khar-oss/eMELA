import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';

export default defineConfig({
  // Relative assets keep the same build portable across root domains and GitHub Pages.
  base: './',
  plugins: [react()],
  server: {
    host: '0.0.0.0',
    // Arena previews are served from sandbox-specific subdomains.
    allowedHosts: ['.e2b.app'],
  },
  preview: {
    host: '0.0.0.0',
    allowedHosts: ['.e2b.app'],
  },
  test: {
    environment: 'jsdom',
    setupFiles: './src/test/setup.ts',
    css: true,
  },
});
