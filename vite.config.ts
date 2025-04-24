import { defineConfig } from 'vite'
import svgr from 'vite-plugin-svgr';
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), 
    svgr({ 
      svgrOptions: {
        icon: true, // Оптимизация для иконок
      },
    }),],
  resolve: {
    alias: {
      '@components': path.resolve(__dirname, './src/components'),
      '@components/*': path.resolve(__dirname, './src/components/*'),
      '@api': path.resolve(__dirname, './src/api'),
      '@assets': path.resolve(__dirname, './src/assets'),
      '@utils': path.resolve(__dirname, './src/utils'),
    },
  },
})
