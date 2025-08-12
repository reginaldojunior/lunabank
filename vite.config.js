import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
  ],
  server: {
    allowedHosts: [
      'pix-api-simulator-cc50fa0d09e3.herokuapp.com' // Libera o domínio externo
    ],
    host: true, // Permite receber conexões externas
    port: 5173 // ou a porta que você estiver usando
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
})
