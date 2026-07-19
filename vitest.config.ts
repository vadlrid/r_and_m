import path from 'path';
import svgr from 'vite-plugin-svgr';
import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react(), svgr()],
  test: {
    environment: 'jsdom',
    setupFiles: './src/setupTests.ts',
    reporters: ['tree']
  },
  resolve: {
    alias: {
      '@components': path.resolve(__dirname, './src/components'),
      '@widgets': path.resolve(__dirname, './src/widgets'),
      '@shared': path.resolve(__dirname, './src/shared'),
      '@store': path.resolve(__dirname, './src/store'),
      '@styles': path.resolve(__dirname, './src/styles')
    }
  }
});
