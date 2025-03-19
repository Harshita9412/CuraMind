import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': 'http://localhost:5000'  // Keep this for local development
    }
  },
  build: {
    outDir: 'dist'
  },
  base: '/' // Important for proper routing on Render
});
