import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig(({ command }) => ({
  plugins: [react()],
  build: {
    // 프로덕션 빌드 시 console 및 debugger 제거
    minify: 'esbuild',
    target: 'esnext',
    rollupOptions: {
      output: {
        // 번들 크기 최적화
        manualChunks: {
          vendor: ['react', 'react-dom'],
          ui: ['@mui/material', '@emotion/react', '@emotion/styled'],
          animation: ['framer-motion', 'gsap'],
        },
      },
    },
  },
  esbuild: {
    // 프로덕션 빌드에서 console.log, console.warn, debugger 제거
    drop: command === 'build' ? ['console', 'debugger'] : [],
  },
}))
