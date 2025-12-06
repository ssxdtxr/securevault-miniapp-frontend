import { Outlet, createRootRoute } from '@tanstack/react-router'
import { NotFound } from '../pages/404'

export const Route = createRootRoute({
  component: RootComponent,
  pendingComponent: () => <div>Loading...</div>,
  notFoundComponent: () => <NotFound />,
})

function RootComponent() {
  return (
    <main className="w-screen h-screen overflow-hidden p-4 flex items-center justify-center">
      <Outlet />
    </main>
  )
}
