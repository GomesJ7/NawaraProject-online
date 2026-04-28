import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createRouter, RouterProvider, createHashHistory } from '@tanstack/react-router'
import { routeTree } from './routeTree.gen'
import './styles.css'

// Hash history (URLs en /#/ et /#/faq) — la solution la plus robuste pour GitHub Pages
// car elle n'exige aucune redirection serveur. Si un jour tu déploies sur un vrai
// hébergeur (Vercel/Netlify/Hostinger), passe en `createBrowserHistory()` pour des
// URLs propres sans le #.
const router = createRouter({
  routeTree,
  history: createHashHistory(),
  scrollRestoration: true,
  defaultPreloadStaleTime: 0,
})

// Pour le typage TS du routeur
declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}

const rootEl = document.getElementById('root')!
createRoot(rootEl).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
