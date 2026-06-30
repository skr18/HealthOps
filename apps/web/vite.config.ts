import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import path from 'path';

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
  //delete this server after we complete the api -gateway part
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  server: {
  proxy: {
    "/api/v1/auth": {
      target: "http://localhost:3001",
      changeOrigin: true,
    },

    "/api/v1/doctors": {
      target: "http://localhost:3002",
      changeOrigin: true,
    },
  },
}
});