import { Link } from '@tanstack/react-router'
import { Ban, Plus } from 'lucide-react'
import { GithubIcon } from '@/components/site/icons'
import { REPO_URL, NEW_ISSUE_URL } from '@/lib/data'

export function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-border/70 bg-background/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-6xl items-center gap-4 px-4 sm:px-6">
        <Link to="/" className="group flex items-center gap-2.5">
          <span className="grid size-8 place-items-center bg-primary text-primary-foreground transition-transform group-hover:rotate-[-6deg]">
            <Ban className="size-5" strokeWidth={2.5} />
          </span>
          <span className="font-display text-xl uppercase leading-none tracking-wider text-foreground">
            YC&nbsp;Blacklist
          </span>
        </Link>

        <nav className="ml-auto hidden items-center gap-6 text-xs font-bold uppercase tracking-[0.15em] text-muted-foreground sm:flex">
          <Link
            to="/"
            className="transition-colors hover:text-foreground [&.active]:text-primary"
            activeOptions={{ exact: true }}
          >
            Registry
          </Link>
          <Link
            to="/about"
            className="transition-colors hover:text-foreground [&.active]:text-primary"
          >
            How it works
          </Link>
          <a
            href={REPO_URL}
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-1.5 transition-colors hover:text-foreground"
          >
            <GithubIcon className="size-4" /> Source
          </a>
        </nav>

        <a
          href={NEW_ISSUE_URL}
          target="_blank"
          rel="noreferrer"
          className="ml-auto flex items-center gap-1.5 border border-primary bg-primary px-3 py-2 text-xs font-bold uppercase tracking-[0.12em] text-primary-foreground transition-all hover:bg-transparent hover:text-primary sm:ml-0"
        >
          <Plus className="size-4" strokeWidth={3} />
          <span className="hidden sm:inline">Report a startup</span>
          <span className="sm:hidden">Report</span>
        </a>
      </div>
    </header>
  )
}
