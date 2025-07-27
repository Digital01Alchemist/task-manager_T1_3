import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': resolve(__dirname, './src'),
      '@entities': resolve(__dirname, './src/entities'),
      '@features': resolve(__dirname, './src/features'),
    },
  },
  // Настройка для GitHub Pages
  base: process.env.NODE_ENV === 'production' ? '/task-manager_T1_2/' : '/',
})
