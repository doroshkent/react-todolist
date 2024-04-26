import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import circleDependency from 'vite-plugin-circular-dependency'
// https://vitejs.dev/config/
const path = require('path')
export default defineConfig({
  plugins: [react(), circleDependency()],
  server: {
    port: 3000,
  },
  test: {
    environment: 'jsdom',
  },
  root: './',
  build: { outDir: 'build', emptyOutDir: true },
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
})
