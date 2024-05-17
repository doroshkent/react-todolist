import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'node:path'
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
  },
  test: {
    environment: 'jsdom',
  },
  root: './',
  build: {
    chunkSizeWarningLimit: 2000, // Increase this value if necessary
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            return id.toString().split('node_modules/')[1].split('/')[0].toString()
          }
        },
      },
    },
  },
  resolve: {
    alias: {
      '@': '/src',
      app: path.resolve(__dirname, './src/app'),
      styles: path.resolve(__dirname, './src/styles'),
      common: path.resolve(__dirname, './src/common'),
      features: path.resolve(__dirname, './src/features'),
      widgets: path.resolve(__dirname, './src/widgets'),
      pages: path.resolve(__dirname, './src/pages'),
    },
  },
  base: './',
})
