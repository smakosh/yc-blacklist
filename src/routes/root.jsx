import { Outlet } from '@tanstack/react-router'
import { Header } from '@/components/site/header'
import { Footer } from '@/components/site/footer'

export function RootLayout() {
  return (
    <div className="grain relative flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}
