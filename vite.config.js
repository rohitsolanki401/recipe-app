// vite.config.js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  // This ensures esbuild runs the JSX loader on .jsx (and .js) files first:
  esbuild: {
    include: /\.[jt]sx?$/,
    loader: 'jsx'
  },
  plugins: [react()],
    optimizeDeps : {
    include : ['react-redux']
    },
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx']
  },
  server: {
    hmr: { overlay: false }
  }
})
