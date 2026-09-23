import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    host: true, // Listen on all network interfaces
    allowedHosts: [
      'marylouise-undemonstrative-maira.ngrok-free.dev',
      '.ngrok-free.dev',
      '.ngrok.io',
      'localhost',
    ],
    proxy: {
      '/api': {
        target: 'http://localhost:5000',
        changeOrigin: true,
      },
    },
  },
})
