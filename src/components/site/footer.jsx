import { Link } from '@tanstack/react-router'
import { Ban, Scale, GitPullRequest } from 'lucide-react'
import { GithubIcon } from '@/components/site/icons'
import { REPO_URL, NEW_ISSUE_URL, CONTRIBUTING_URL, EDIT_DATA_URL, updatedAt } from '@/lib/data'

export function Footer() {
  return (
    <footer className="relative mt-24 border-t border-border/70 bg-card/30">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-[1.4fr_1fr_1fr]">
        <div>
          <div className="flex items-center gap-2.5">
            <span className="grid size-7 place-items-center bg-primary text-primary-foreground">
              <Ban className="size-4" strokeWidth={2.5} />
            </span>
            <span className="font-display text-lg uppercase tracking-wider">YC Blacklist</span>
          </div>
          <p className="mt-4 max-w-sm text-sm leading-relaxed text-muted-foreground">
            An open, community-maintained registry of Y Combinator startups people warn against —
            as an employer, as a product, or as a vendor. Open source. Sourced. Editable by anyone.
          </p>
          <p className="mt-4 text-[11px] uppercase tracking-[0.15em] text-muted-foreground/70">
            Database last updated {updatedAt}
          </p>
        </div>

        <nav className="flex flex-col gap-3 text-sm">
          <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-primary/80">
            Registry
          </span>
          <Link to="/" className="text-muted-foreground transition-colors hover:text-foreground">
            Browse the wall
          </Link>
          <Link
            to="/about"
            className="text-muted-foreground transition-colors hover:text-foreground"
          >
            How it works
          </Link>
          <a
            href={`${REPO_URL}/blob/main/data/startups.json`}
            target="_blank"
            rel="noreferrer"
            className="text-muted-foreground transition-colors hover:text-foreground"
          >
            Raw JSON database
          </a>
        </nav>

        <nav className="flex flex-col gap-3 text-sm">
          <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-primary/80">
            Contribute
          </span>
          <a
            href={NEW_ISSUE_URL}
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-2 text-muted-foreground transition-colors hover:text-foreground"
          >
            <GitPullRequest className="size-4" /> Report a startup
          </a>
          <a
            href={EDIT_DATA_URL}
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-2 text-muted-foreground transition-colors hover:text-foreground"
          >
            <GitPullRequest className="size-4" /> Edit the JSON
          </a>
          <a
            href={CONTRIBUTING_URL}
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-2 text-muted-foreground transition-colors hover:text-foreground"
          >
            <Scale className="size-4" /> Contribution rules
          </a>
          <a
            href={REPO_URL}
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-2 text-muted-foreground transition-colors hover:text-foreground"
          >
            <GithubIcon className="size-4" /> GitHub
          </a>
        </nav>
      </div>

      <div className="border-t border-border/60">
        <div className="mx-auto max-w-6xl px-4 py-6 text-[11px] leading-relaxed text-muted-foreground/70 sm:px-6">
          <p>
            <strong className="text-muted-foreground">Disclaimer.</strong> Entries reflect the
            opinions and reported experiences of community contributors, not statements of fact by
            the maintainers. This project is <strong>not affiliated with, endorsed by, or
            connected to Y Combinator</strong>. Sample rows marked “EXAMPLE” are fictional and exist
            only to illustrate the format. If you believe an entry is inaccurate, open an issue or
            pull request to correct or remove it.
          </p>
          <p className="mt-3">
            Built in the open · Data licensed under{' '}
            <a
              href="https://creativecommons.org/publicdomain/zero/1.0/"
              target="_blank"
              rel="noreferrer"
              className="underline decoration-dotted underline-offset-2 hover:text-foreground"
            >
              CC0
            </a>{' '}
            · Code under MIT
          </p>
        </div>
      </div>
    </footer>
  )
}
