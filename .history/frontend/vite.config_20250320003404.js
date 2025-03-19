import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': 'http://localhost:5000'  // For local development
    }
  },
  preview: {
    host: "0.0.0.0",               // ✅ Required for Render
    port: 10000,                   // ✅ Port for Render deployment
    allowedHosts: ["curamind-1.onrender.com"]  // ✅ Fixes "Blocked request" error
  },
  build: {
    outDir: 'dist'
  },
  base: '/' // Important for proper routing on Render
});
