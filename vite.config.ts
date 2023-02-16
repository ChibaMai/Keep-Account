import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

const port = 5173
const proxy_url = 'http://127.0.0.1:7001'
// 是否自动打开浏览器
const openBrowser = false

// https://vitejs.dev/config/
export default defineConfig({
  base: './',
  plugins: [react()],
  server: {
    origin: "*",
    port,
    open: openBrowser,
    proxy: {
      '/api': {
        target: proxy_url,
        changeOrigin: true,
      }
    }
  },
  resolve: {
    alias: {
      '@': '/src',
    },
  },
  css: {
    preprocessorOptions: {
      less: {
        javascriptEnabled: true,
        additionalData: '@import "/src/global.less";'
      },
    },
  },
})
