import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@components': path.resolve(__dirname, './src/components'),
    },
  },
  build: {
    minify: 'esbuild',
  },
  esbuild: {
    // Keep function names to allow runtime component name detection
    // This is needed for Sandbox to identify GOA components by their function names
    keepNames: true,
  },
})
