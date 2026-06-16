import path from 'path';
import { defineConfig } from 'vite';
import svgr from 'vite-plugin-svgr';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react(), svgr()],
  base: process.env.NODE_ENV === 'production' ? '/r_and_m/' : '/',
  resolve: {
    alias: {
      '@components': path.resolve(__dirname, './src/components'),
      '@widgets': path.resolve(__dirname, './src/widgets'),
      '@shared': path.resolve(__dirname, './src/shared')
    }
  }
});
