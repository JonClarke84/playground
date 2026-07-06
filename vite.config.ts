/// <reference types="vitest/config" />
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['icon.svg'],
      // The Strudel music engine is a large lazy chunk; raise the precache
      // ceiling so it still works offline.
      workbox: {
        maximumFileSizeToCacheInBytes: 6 * 1024 * 1024,
        globPatterns: ['**/*.{js,css,html,svg,png,webp,ico}'],
      },
      manifest: {
        name: 'Playground',
        short_name: 'Playground',
        description: 'A playground of games',
        display: 'fullscreen',
        orientation: 'any',
        theme_color: '#140b2e',
        background_color: '#140b2e',
        icons: [{ src: 'icon.svg', sizes: 'any', type: 'image/svg+xml', purpose: 'any' }],
      },
    }),
  ],
  test: {
    environment: 'happy-dom',
  },
})
