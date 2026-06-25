import { createRootRoute, createRoute, createRouter } from '@tanstack/react-router'
import { RootLayout } from '@/routes/root'
import { Home } from '@/routes/home'
import { StartupDetail } from '@/routes/startup'
import { About } from '@/routes/about'
import { NotFound } from '@/routes/not-found'

const rootRoute = createRootRoute({
  component: RootLayout,
  notFoundComponent: () => <NotFound />,
})

const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/',
  validateSearch: (search) => ({
    q: typeof search.q === 'string' ? search.q : undefined,
    tag: typeof search.tag === 'string' ? search.tag : undefined,
  }),
  component: Home,
})

const startupRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/startup/$id',
  component: StartupDetail,
})

const aboutRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/about',
  component: About,
})

const routeTree = rootRoute.addChildren([indexRoute, startupRoute, aboutRoute])

export const router = createRouter({
  routeTree,
  defaultPreload: 'intent',
  scrollRestoration: true,
  defaultNotFoundComponent: () => <NotFound />,
})
