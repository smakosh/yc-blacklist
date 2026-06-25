import { useMemo, useState } from 'react'
import { useSearch } from '@tanstack/react-router'
import { Search, X, SlidersHorizontal, FilterX } from 'lucide-react'
import {
  startups,
  allTags,
  stats,
  filterStartups,
  VERDICTS,
  VERDICT_ORDER,
  updatedAt,
} from '@/lib/data'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Marquee } from '@/components/site/marquee'
import { Stamp } from '@/components/site/stamp'
import { SampleBanner } from '@/components/site/sample-banner'
import { StartupCard } from '@/components/site/startup-card'
import { cn } from '@/lib/utils'

export function Home() {
  const search = useSearch({ from: '/' })
  const [query, setQuery] = useState(search.q || '')
  const [verdicts, setVerdicts] = useState([])
  const [severity, setSeverity] = useState('all')
  const [tag, setTag] = useState(search.tag && allTags.includes(search.tag) ? search.tag : 'all')
  const [sort, setSort] = useState('severity')

  const filtered = useMemo(
    () => filterStartups(startups, { query, verdicts, severity, tag, sort }),
    [query, verdicts, severity, tag, sort],
  )

  const hasFilters = query || verdicts.length || severity !== 'all' || tag !== 'all'

  function toggleVerdict(v) {
    setVerdicts((cur) => (cur.includes(v) ? cur.filter((x) => x !== v) : [...cur, v]))
  }

  function clearAll() {
    setQuery('')
    setVerdicts([])
    setSeverity('all')
    setTag('all')
    setSort('severity')
  }

  return (
    <div>
      {stats.allExamples && <SampleBanner />}

      {/* ---------------- HERO ---------------- */}
      <section className="relative overflow-hidden border-b border-border">
        <div className="grid-paper pointer-events-none absolute inset-0 opacity-60" />
        <div className="pointer-events-none absolute -right-24 top-12 hidden rotate-[8deg] md:block">
          <div className="stamp px-6 py-3 text-2xl font-extrabold tracking-[0.2em]">
            DO NOT ENGAGE
          </div>
        </div>

        <div className="relative mx-auto max-w-6xl px-4 pb-12 pt-16 sm:px-6 sm:pt-24">
          <div className="flex items-center gap-3 text-[11px] font-bold uppercase tracking-[0.3em] text-primary/80">
            <span className="size-2 animate-pulse rounded-full bg-primary shadow-[0_0_10px_var(--primary)]" />
            YC Blacklist · open registry
          </div>

          <h1 className="mt-6 font-display text-6xl uppercase leading-[0.9] tracking-wide text-foreground sm:text-8xl">
            <span className="block animate-rise" style={{ animationDelay: '40ms' }}>
              Don’t <span className="text-primary">work for</span> them.
            </span>
            <span className="block animate-rise" style={{ animationDelay: '120ms' }}>
              Don’t <span className="text-primary">use</span> them.
            </span>
            <span className="block animate-rise" style={{ animationDelay: '200ms' }}>
              Don’t <span className="text-primary">pay</span> them.
            </span>
          </h1>

          <p
            className="mt-7 max-w-2xl text-pretty text-base leading-relaxed text-muted-foreground sm:text-lg animate-rise"
            style={{ animationDelay: '300ms' }}
          >
            YC vouches for these companies. This is the other side of the reference check — an open,
            community-run registry of Y Combinator startups people warn against. Every entry is
            sourced. Anyone can add one with a pull request.
          </p>

          {/* search */}
          <div
            className="relative mt-9 max-w-xl animate-rise"
            style={{ animationDelay: '360ms' }}
          >
            <Search className="pointer-events-none absolute left-4 top-1/2 size-5 -translate-y-1/2 text-muted-foreground" />
            <Input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search a company, batch, or tag…"
              className="h-14 border-border bg-card/60 pl-12 pr-12 text-base placeholder:text-muted-foreground/60 focus-visible:border-primary focus-visible:ring-primary/30"
            />
            {query && (
              <button
                onClick={() => setQuery('')}
                aria-label="Clear search"
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
              >
                <X className="size-5" />
              </button>
            )}
          </div>

          {/* stats */}
          <dl
            className="mt-10 grid max-w-2xl grid-cols-2 gap-px overflow-hidden border border-border bg-border sm:grid-cols-4 animate-rise"
            style={{ animationDelay: '440ms' }}
          >
            <Stat n={stats.companies} label="On file" />
            <Stat n={stats.reports} label="Documented reports" />
            <Stat n={stats.sources} label="Cited sources" />
            <Stat n="100%" label="Open source" />
          </dl>
        </div>

        <Marquee
          items={[
            'Wage theft',
            'Dark-pattern billing',
            'AI-washing',
            'Mass layoffs',
            'Data resold',
            'No refunds',
            'Permanent crunch',
            'Hard to cancel',
          ]}
        />
      </section>

      {/* ---------------- CONTROLS ---------------- */}
      <section className="mx-auto max-w-6xl px-4 pt-12 sm:px-6">
        <div className="flex flex-wrap items-center gap-2 text-[11px] font-bold uppercase tracking-[0.2em] text-muted-foreground">
          <SlidersHorizontal className="size-4 text-primary/80" />
          Filter the registry
        </div>

        {/* verdict toggles */}
        <div className="mt-4 grid gap-3 sm:grid-cols-3">
          {VERDICT_ORDER.map((v) => {
            const active = verdicts.includes(v)
            return (
              <button
                key={v}
                onClick={() => toggleVerdict(v)}
                aria-pressed={active}
                className={cn(
                  'group flex items-center justify-between border px-4 py-3 text-left transition-all',
                  active
                    ? 'border-destructive/60 bg-destructive/15 text-destructive'
                    : 'border-border bg-card/40 text-muted-foreground hover:border-foreground/40 hover:text-foreground',
                )}
              >
                <span>
                  <span className="block text-sm font-bold uppercase tracking-wide">
                    {VERDICTS[v].label}
                  </span>
                  <span className="block text-[11px] opacity-70">{VERDICTS[v].line}</span>
                </span>
                <span
                  className={cn(
                    'grid size-5 place-items-center border text-[10px] font-bold',
                    active ? 'border-destructive bg-destructive text-destructive-foreground' : 'border-border',
                  )}
                >
                  {active ? '✕' : ''}
                </span>
              </button>
            )
          })}
        </div>

        {/* secondary controls */}
        <div className="mt-4 flex flex-wrap items-center gap-3">
          <Select value={severity} onValueChange={setSeverity}>
            <SelectTrigger className="w-[150px] border-border bg-card/40">
              <SelectValue placeholder="Severity" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All severity</SelectItem>
              <SelectItem value="high">Severe</SelectItem>
              <SelectItem value="medium">Elevated</SelectItem>
              <SelectItem value="low">Caution</SelectItem>
            </SelectContent>
          </Select>

          <Select value={tag} onValueChange={setTag}>
            <SelectTrigger className="w-[160px] border-border bg-card/40">
              <SelectValue placeholder="Tag" />
            </SelectTrigger>
            <SelectContent className="max-h-72">
              <SelectItem value="all">All tags</SelectItem>
              {allTags.map((t) => (
                <SelectItem key={t} value={t}>
                  #{t}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={sort} onValueChange={setSort}>
            <SelectTrigger className="w-[160px] border-border bg-card/40">
              <SelectValue placeholder="Sort" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="severity">Most severe</SelectItem>
              <SelectItem value="newest">Newest</SelectItem>
              <SelectItem value="az">A–Z</SelectItem>
            </SelectContent>
          </Select>

          {hasFilters && (
            <button
              onClick={clearAll}
              className="inline-flex items-center gap-1.5 border border-border px-3 py-2 text-xs font-bold uppercase tracking-[0.12em] text-muted-foreground transition-colors hover:border-foreground hover:text-foreground"
            >
              <FilterX className="size-4" /> Clear
            </button>
          )}

          <span className="ml-auto text-xs uppercase tracking-[0.15em] text-muted-foreground">
            {filtered.length} / {startups.length} files
          </span>
        </div>
      </section>

      {/* ---------------- GRID ---------------- */}
      <section className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
        {filtered.length > 0 ? (
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((s, i) => (
              <StartupCard key={s.id} startup={s} index={startups.indexOf(s)} />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center border border-dashed border-border py-24 text-center">
            <Stamp className="text-base">NO MATCHES</Stamp>
            <p className="mt-5 max-w-sm text-sm leading-relaxed text-muted-foreground">
              Nothing on file matches those filters. Either they’re clean, or nobody has reported
              them yet.
            </p>
            <button
              onClick={clearAll}
              className="mt-6 inline-flex items-center gap-1.5 border border-primary px-4 py-2 text-xs font-bold uppercase tracking-[0.12em] text-primary transition-colors hover:bg-primary hover:text-primary-foreground"
            >
              Reset filters
            </button>
          </div>
        )}
      </section>

      <p className="mx-auto max-w-6xl px-4 pb-8 text-center text-[11px] uppercase tracking-[0.2em] text-muted-foreground/60 sm:px-6">
        Database last updated {updatedAt}
      </p>
    </div>
  )
}

function Stat({ n, label }) {
  return (
    <div className="bg-card px-4 py-5">
      <dt className="font-display text-4xl leading-none text-primary">{n}</dt>
      <dd className="mt-2 text-[11px] uppercase tracking-[0.15em] text-muted-foreground">
        {label}
      </dd>
    </div>
  )
}
