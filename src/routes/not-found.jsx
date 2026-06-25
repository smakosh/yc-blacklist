import { Link } from '@tanstack/react-router'
import { FileX2, ArrowLeft } from 'lucide-react'

export function NotFound({ title = 'File not found', message = 'This page has been redacted or never existed.' }) {
  return (
    <div className="mx-auto flex min-h-[60vh] max-w-xl flex-col items-center justify-center px-4 py-24 text-center">
      <FileX2 className="size-14 text-primary/70" strokeWidth={1.5} />
      <h1 className="mt-6 font-display text-6xl uppercase tracking-wide text-foreground">404</h1>
      <p className="mt-2 text-lg font-bold uppercase tracking-[0.18em] text-primary/80">{title}</p>
      <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{message}</p>
      <Link
        to="/"
        className="mt-8 inline-flex items-center gap-2 border border-primary bg-primary px-4 py-2 text-xs font-bold uppercase tracking-[0.12em] text-primary-foreground transition-all hover:bg-transparent hover:text-primary"
      >
        <ArrowLeft className="size-4" /> Back to the registry
      </Link>
    </div>
  )
}
