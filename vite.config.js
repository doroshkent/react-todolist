import { defineConfig } from 'vite'
import reactRefresh from '@vitejs/plugin-react-refresh'
// https://vitejs.dev/config/
const path = require('path')
export default defineConfig({
  plugins: [reactRefresh()],
  server: {
    port: 3000,
  },
  test: {
    deps: {
      interopDefault: false,
    },
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
