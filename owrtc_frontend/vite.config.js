import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import baseURL from './src/ApiBaseUrl/baseUrl'

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    port: 3000,
    open: true,
    proxy: {
      '/employee_Api': {
        target: baseURL,
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/employee_Api/, '/employee_Api'),
      },
      '/assignment_Api': {
        target: baseURL,
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/assignment_Api/, '/assignment_Api'),
      },
    },
  },
  base: '/owrtcFrontend/',
  plugins: [react()],
})
