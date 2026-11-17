import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    // In dev, /api calls go to the Express server.
    proxy: { '/api': 'http://localhost:5000' },
  },
  build: {
    chunkSizeWarningLimit: 1500,
  },
});
