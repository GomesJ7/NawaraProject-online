import { Outlet, createRootRoute } from '@tanstack/react-router'

// Layout racine en mode SPA : pas de coque HTML/Scripts, c'est `index.html`
// qui fournit la structure du document.
export const Route = createRootRoute({
  component: RootLayout,
})

function RootLayout() {
  return <Outlet />
}
