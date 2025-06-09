import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  server: {
    host: true
  },
  plugins: [react(),tailwindcss(),],
  base: '/poc-store-buddy-page/',
})
