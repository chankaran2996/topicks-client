import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
  // Read the API port from server/.env so the proxy always matches the Express server.
  const serverEnv = loadEnv(mode, '../server', '');
  const apiTarget = `http://localhost:${serverEnv.PORT || 5000}`;

  return {
    plugins: [react()],
    server: {
      // In dev, /api calls go to the Express server.
      proxy: { '/api': apiTarget },
    },
    build: {
      chunkSizeWarningLimit: 1500,
    },
  };
});
