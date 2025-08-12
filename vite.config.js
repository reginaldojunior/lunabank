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
      'thin-cougar-95.telebit.io', // Libera o domínio externo
      'e82ace00a9e3.ngrok-free.app' // Libera o domínio externo
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
