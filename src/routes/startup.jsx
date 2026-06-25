import { Link, useParams } from '@tanstack/react-router'
import {
  ArrowLeft,
  ExternalLink,
  Globe,
  CalendarDays,
  UserRound,
  GitPullRequest,
  ShieldAlert,
  Link2,
} from 'lucide-react'
import {
  getStartup,
  startups,
  VERDICTS,
  VERDICT_ORDER,
  EDIT_DATA_URL,
  NEW_ISSUE_URL,
} from '@/lib/data'
import { SeverityBadge } from '@/components/site/severity-badge'
import { Stamp } from '@/components/site/stamp'
import { NotFound } from '@/routes/not-found'

export function StartupDetail() {
  const { id } = useParams({ from: '/startup/$id' })
  const startup = getStartup(id)

  if (!startup) {
    return <NotFound title="No such file" message={`No dossier exists for “${id}”.`} />
  }

  const index = startups.findIndex((s) => s.id === id)
  const fileNo = String(index + 1).padStart(3, '0')

  return (
    <article className="relative">
      {/* hazard band */}
      <div className="hazard-tape h-2 w-full opacity-80" />

      <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
        <Link
          to="/"
          className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-[0.15em] text-muted-foreground transition-colors hover:text-primary"
        >
          <ArrowLeft className="size-4" /> Back to registry
        </Link>

        {/* header */}
        <header className="mt-8 border-b border-border pb-8">
          <div className="flex flex-wrap items-center gap-2 text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
            <span className="text-primary/80">FILE&nbsp;{fileNo}</span>
            {startup.ycBatch && (
              <span className="border border-border px-1.5 py-0.5 text-foreground/80">
                YC&nbsp;{startup.ycBatch}
              </span>
            )}
            <span className="border border-border px-1.5 py-0.5">{startup.status}</span>
            {startup.example && <Stamp className="ml-1">EXAMPLE</Stamp>}
          </div>

          <h1 className="mt-4 font-display text-5xl uppercase leading-[0.95] tracking-wide text-foreground sm:text-7xl">
            {startup.name}
          </h1>

          <p className="mt-5 max-w-2xl text-pretty text-lg leading-relaxed text-muted-foreground">
            {startup.summary}
          </p>

          <div className="mt-6 flex flex-wrap items-center gap-3">
            <SeverityBadge level={startup.severity} />
            {startup.website && (
              <a
                href={startup.website}
                target="_blank"
                rel="noreferrer nofollow"
                className="inline-flex items-center gap-1.5 border border-border px-2.5 py-1 text-xs text-muted-foreground transition-colors hover:border-primary/50 hover:text-foreground"
              >
                <Globe className="size-3.5" /> Website <ExternalLink className="size-3" />
              </a>
            )}
          </div>
        </header>

        {/* verdicts */}
        <section className="mt-8">
          <SectionLabel>The verdict</SectionLabel>
          <div className="mt-4 grid gap-3 sm:grid-cols-3">
            {VERDICT_ORDER.map((v) => {
              const active = startup.verdicts?.includes(v)
              return (
                <div
                  key={v}
                  className={
                    'border p-4 ' +
                    (active
                      ? 'border-destructive/50 bg-destructive/10 text-destructive'
                      : 'border-border/60 bg-card/30 text-muted-foreground/50')
                  }
                >
                  <div className="text-[10px] font-bold uppercase tracking-[0.18em]">
                    {active ? VERDICTS[v].code : 'cleared'}
                  </div>
                  <div className="mt-1 text-sm font-semibold text-foreground/90">
                    {VERDICTS[v].label}
                  </div>
                  <div className="mt-0.5 text-xs opacity-80">{VERDICTS[v].line}</div>
                </div>
              )
            })}
          </div>
        </section>

        {/* reasons */}
        <section className="mt-10">
          <SectionLabel>
            <ShieldAlert className="size-4" /> The case against
          </SectionLabel>
          <ol className="mt-5 space-y-5">
            {startup.reasons?.map((r, i) => (
              <li key={i} className="relative border border-border bg-card/40 p-5 pl-6">
                <span className="absolute inset-y-0 left-0 w-1 bg-primary/70" />
                <div className="flex items-baseline gap-3">
                  <span className="font-display text-2xl leading-none text-primary/70">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <h3 className="text-base font-bold text-foreground">{r.claim}</h3>
                </div>
                {r.detail && (
                  <p className="mt-2 pl-9 text-sm leading-relaxed text-muted-foreground">
                    {r.detail}
                  </p>
                )}
                {r.sources?.length > 0 && (
                  <div className="mt-3 flex flex-wrap gap-2 pl-9">
                    {r.sources.map((src, j) => (
                      <a
                        key={j}
                        href={src}
                        target="_blank"
                        rel="noreferrer nofollow"
                        className="inline-flex items-center gap-1 border border-border px-2 py-0.5 text-[11px] text-muted-foreground transition-colors hover:border-primary/50 hover:text-foreground"
                      >
                        <Link2 className="size-3" /> Source {j + 1}
                      </a>
                    ))}
                  </div>
                )}
              </li>
            ))}
          </ol>
        </section>

        {/* tags + meta */}
        <section className="mt-10 grid gap-6 sm:grid-cols-2">
          <div>
            <SectionLabel>Tags</SectionLabel>
            <div className="mt-3 flex flex-wrap gap-2">
              {startup.tags?.length ? (
                startup.tags.map((t) => (
                  <Link
                    key={t}
                    to="/"
                    search={{ tag: t }}
                    className="border border-border px-2 py-1 text-xs text-muted-foreground transition-colors hover:border-primary/50 hover:text-foreground"
                  >
                    #{t}
                  </Link>
                ))
              ) : (
                <span className="text-sm text-muted-foreground/60">—</span>
              )}
            </div>
          </div>
          <div className="space-y-2 text-xs text-muted-foreground">
            <SectionLabel>Filed</SectionLabel>
            <div className="mt-3 flex items-center gap-2">
              <CalendarDays className="size-4" /> Added {startup.dateAdded}
            </div>
            {startup.submittedBy && (
              <div className="flex items-center gap-2">
                <UserRound className="size-4" /> Submitted by {startup.submittedBy}
              </div>
            )}
          </div>
        </section>

        {/* dispute / correct */}
        <section className="mt-12 border border-border bg-card/40 p-6">
          <h2 className="font-display text-2xl uppercase tracking-wide text-foreground">
            Something off?
          </h2>
          <p className="mt-2 max-w-xl text-sm leading-relaxed text-muted-foreground">
            This registry is only as good as its sources. If you can correct, strengthen, or
            disprove this entry — or you represent {startup.name} and want to respond — do it in the
            open.
          </p>
          <div className="mt-5 flex flex-wrap gap-3">
            <a
              href={EDIT_DATA_URL}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 border border-primary bg-primary px-4 py-2 text-xs font-bold uppercase tracking-[0.12em] text-primary-foreground transition-all hover:bg-transparent hover:text-primary"
            >
              <GitPullRequest className="size-4" /> Edit this entry
            </a>
            <a
              href={NEW_ISSUE_URL}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 border border-border px-4 py-2 text-xs font-bold uppercase tracking-[0.12em] text-muted-foreground transition-colors hover:border-foreground hover:text-foreground"
            >
              Dispute via issue
            </a>
          </div>
        </section>
      </div>
    </article>
  )
}

function SectionLabel({ children }) {
  return (
    <h2 className="flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-[0.25em] text-primary/80">
      {children}
    </h2>
  )
}
