import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import { configDefaults } from 'vitest/config';

export default defineConfig(({ mode }) => {
  // Load env variables based on the current mode (e.g., development)
  const env = loadEnv(mode, process.cwd());

  return {
    plugins: [react(), tailwindcss()],
    define: {
      'process.env': env,
    },
    server: {
      port: 5173,
    },
    test: {
      environment: 'jsdom',
      setupFiles: './vitest.setup.js',
      exclude: [...configDefaults.exclude, 'e2e/**']
    }
  };
});
