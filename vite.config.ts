import { defineConfig } from 'vite'
import { TanStackRouterVite } from '@tanstack/router-plugin/vite'
import viteReact from '@vitejs/plugin-react'
import viteTsConfigPaths from 'vite-tsconfig-paths'
import tailwindcss from '@tailwindcss/vite'

// La base est lue dans une variable d'env (BASE_PATH) — pratique pour GitHub Pages :
// le workflow GitHub Actions y injecte automatiquement /<repo-name>/ avant le build.
// En local : pas de variable -> base = '/'
export default defineConfig({
  base: process.env.BASE_PATH || '/',
  plugins: [
    viteTsConfigPaths({
      projects: ['./tsconfig.json'],
    }),
    tailwindcss(),
    TanStackRouterVite({
      target: 'react',
      autoCodeSplitting: true,
    }),
    viteReact(),
  ],
  build: {
    outDir: 'dist',
    emptyOutDir: true,
  },
})
