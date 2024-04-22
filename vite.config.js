import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

const ProxyTo = process.env.PROXY_TO || 'http://localhost:3000'
console.log(`Proxy to: ${ProxyTo}`)

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  server: {
    port: 8080,
    proxy: {
      '/vue-app-env': {
        target: ProxyTo,
        changeOrigin: true,
        secure: true
      },
      '/api': {
        target: ProxyTo,
        changeOrigin: true,
        secure: true
      }
    }
  },
})
