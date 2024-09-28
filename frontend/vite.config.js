import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig({

  server: {
    proxy: {
    '/backend' : {
      target : 'http://localhost:5000',
      secure: false,
    },
  },
},
  plugins: [react()],

  optimizeDeps: {
    include: ['regenerator-runtime/runtime']
  },
  build: {
    target: ['es2017'],
  }
  
})
