import { Link } from '@tanstack/react-router'
import { ArrowUpRight, FileWarning, Link2 } from 'lucide-react'
import { cn } from '@/lib/utils'
import { SeverityBadge } from './severity-badge'
import { VerdictChips } from './verdict-chips'
import { Stamp } from './stamp'

export function StartupCard({ startup, index = 0 }) {
  const fileNo = String(index + 1).padStart(3, '0')
  const sources = (startup.reasons || []).reduce((n, r) => n + (r.sources?.length || 0), 0)

  return (
    <Link
      to="/startup/$id"
      params={{ id: startup.id }}
      className={cn(
        'group relative flex flex-col overflow-hidden border border-border bg-card/70 backdrop-blur-sm',
        'transition-all duration-300 hover:-translate-y-1 hover:border-primary/60',
        'hover:shadow-[0_0_0_1px_var(--primary),0_18px_40px_-20px_rgba(0,0,0,0.9)]',
      )}
    >
      {/* left severity rail */}
      <span
        className={cn(
          'absolute inset-y-0 left-0 w-1',
          startup.severity === 'high'
            ? 'bg-destructive'
            : startup.severity === 'medium'
              ? 'bg-primary'
              : 'bg-border',
        )}
      />

      {startup.example && (
        <div className="absolute right-3 top-3 z-10 opacity-80 transition-opacity group-hover:opacity-100">
          <Stamp>EXAMPLE</Stamp>
        </div>
      )}

      <div className="flex flex-1 flex-col gap-4 p-5 pl-6">
        {/* meta row */}
        <div className="flex items-center gap-2 text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
          <span className="text-primary/80">FILE&nbsp;{fileNo}</span>
          {startup.ycBatch && (
            <span className="border border-border px-1.5 py-0.5 text-foreground/80">
              YC&nbsp;{startup.ycBatch}
            </span>
          )}
          <span className="ml-auto">{startup.status}</span>
        </div>

        {/* name */}
        <div>
          <h3 className="font-display text-3xl uppercase leading-none tracking-wide text-foreground">
            {startup.name}
          </h3>
        </div>

        {/* verdicts */}
        <VerdictChips verdicts={startup.verdicts} />

        {/* summary */}
        <p className="text-sm leading-relaxed text-muted-foreground line-clamp-3">
          {startup.summary}
        </p>

        {/* tags */}
        {startup.tags?.length > 0 && (
          <div className="flex flex-wrap gap-1.5">
            {startup.tags.slice(0, 3).map((t) => (
              <span key={t} className="text-[11px] text-muted-foreground/80">
                #{t}
              </span>
            ))}
          </div>
        )}

        {/* footer */}
        <div className="mt-auto flex items-center gap-4 border-t border-border/60 pt-3 text-[11px] text-muted-foreground">
          <SeverityBadge level={startup.severity} />
          <span className="flex items-center gap-1">
            <FileWarning className="size-3.5" /> {startup.reasons?.length || 0}
          </span>
          <span className="flex items-center gap-1">
            <Link2 className="size-3.5" /> {sources}
          </span>
          <ArrowUpRight className="ml-auto size-4 text-muted-foreground transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-primary" />
        </div>
      </div>
    </Link>
  )
}
