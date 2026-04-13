import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import svgr from 'vite-plugin-svgr'

export default defineConfig({
  plugins: [
    react(),
    svgr({
      svgrOptions: {
        // Keep viewBox, remove width/height so size is controlled via props
        svgoConfig: {
          plugins: [{ name: 'removeViewBox', active: false }],
        },
      },
    }),
  ],
})
