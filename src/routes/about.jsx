import { Link } from '@tanstack/react-router'
import {
  GitPullRequest,
  FileJson,
  ScrollText,
  Scale,
  ShieldCheck,
  ArrowRight,
} from 'lucide-react'
import { GithubIcon } from '@/components/site/icons'
import {
  VERDICTS,
  VERDICT_ORDER,
  REPO_URL,
  EDIT_DATA_URL,
  NEW_ISSUE_URL,
  CONTRIBUTING_URL,
} from '@/lib/data'

export function About() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-14 sm:px-6">
      <div className="flex items-center gap-3 text-[11px] font-bold uppercase tracking-[0.3em] text-primary/80">
        <ScrollText className="size-4" /> How it works
      </div>
      <h1 className="mt-5 font-display text-5xl uppercase leading-[0.95] tracking-wide text-foreground sm:text-6xl">
        A reference check the pitch deck won’t give you
      </h1>
      <p className="mt-6 text-pretty text-lg leading-relaxed text-muted-foreground">
        Y Combinator is the loudest endorsement in startups. This registry collects the quieter
        warnings: the unpaid invoices, the dark-pattern billing, the “mission” that meant 90-hour
        weeks. It’s open source, it lives in a single JSON file, and anyone can change it.
      </p>

      {/* verdicts */}
      <section className="mt-14">
        <h2 className="font-display text-3xl uppercase tracking-wide text-foreground">
          Three verdicts
        </h2>
        <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
          Every entry carries one or more of these. They keep the list useful whether you’re
          job-hunting, choosing a tool, or signing a contract.
        </p>
        <div className="mt-6 space-y-3">
          {VERDICT_ORDER.map((v) => (
            <div key={v} className="flex items-start gap-4 border border-border bg-card/40 p-4">
              <span className="mt-0.5 shrink-0 border border-destructive/40 bg-destructive/10 px-2 py-1 text-[10px] font-bold uppercase tracking-[0.15em] text-destructive">
                {VERDICTS[v].code}
              </span>
              <div>
                <div className="text-sm font-bold text-foreground">{VERDICTS[v].label}</div>
                <div className="text-sm text-muted-foreground">{VERDICTS[v].line}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* sourcing */}
      <section className="mt-14">
        <h2 className="flex items-center gap-2 font-display text-3xl uppercase tracking-wide text-foreground">
          <ShieldCheck className="size-6 text-primary" /> How entries are sourced
        </h2>
        <ul className="mt-5 space-y-3 text-sm leading-relaxed text-muted-foreground">
          {[
            'Every claim should link to something a stranger can check — a news report, a court filing, a Glassdoor pattern, an archived page, a public post.',
            'Opinions are labeled as opinions. Facts carry receipts. “Trust me” is not a source.',
            'Companies have a right of reply. Any entry can be challenged with a pull request or issue, and corrections win.',
            'Rows marked EXAMPLE are fictional and ship only to demonstrate the format.',
          ].map((t, i) => (
            <li key={i} className="flex gap-3">
              <span className="mt-2 size-1.5 shrink-0 rounded-full bg-primary" />
              {t}
            </li>
          ))}
        </ul>
      </section>

      {/* contribute */}
      <section className="mt-14">
        <h2 className="flex items-center gap-2 font-display text-3xl uppercase tracking-wide text-foreground">
          <GitPullRequest className="size-6 text-primary" /> Add a startup
        </h2>
        <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
          The whole database is one file:{' '}
          <a
            href={`${REPO_URL}/blob/main/data/startups.json`}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1 font-bold text-foreground underline decoration-dotted underline-offset-2"
          >
            <FileJson className="size-4" /> data/startups.json
          </a>
          . Two ways in:
        </p>

        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          <Step
            n="01"
            title="Open a guided issue"
            body="No Git required. Fill in a short form and a maintainer turns it into a pull request."
            href={NEW_ISSUE_URL}
            cta="Open the form"
          />
          <Step
            n="02"
            title="Edit the JSON directly"
            body="Comfortable with a PR? Add an object to the array, follow the schema, and submit."
            href={EDIT_DATA_URL}
            cta="Edit on GitHub"
          />
        </div>

        <div className="mt-6 rounded-sm border border-border bg-card/40 p-5">
          <div className="text-[11px] font-bold uppercase tracking-[0.2em] text-primary/80">
            Minimum viable entry
          </div>
          <pre className="mt-3 overflow-x-auto text-xs leading-relaxed text-muted-foreground">
{`{
  "id": "acme-co",
  "name": "Acme Co",
  "ycBatch": "W21",
  "website": "https://acme.example",
  "status": "active",
  "verdicts": ["work", "pay"],
  "severity": "high",
  "summary": "One sentence on why it's here.",
  "reasons": [
    {
      "claim": "What happened",
      "detail": "Context a stranger can verify.",
      "sources": ["https://link-to-proof"]
    }
  ],
  "tags": ["wage-theft"],
  "dateAdded": "2026-06-25",
  "submittedBy": "your-github-handle"
}`}
          </pre>
        </div>
      </section>

      {/* fairness */}
      <section className="mt-14 border-l-2 border-primary/50 pl-5">
        <h2 className="flex items-center gap-2 font-display text-2xl uppercase tracking-wide text-foreground">
          <Scale className="size-5 text-primary" /> Fair play
        </h2>
        <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
          This is a tool for warning people, not for harassment. No private individuals, no doxxing,
          no fabricated claims. The goal is a registry that founders themselves would call fair —
          even when it’s about them. Not affiliated with Y Combinator.
        </p>
      </section>

      <div className="mt-14 flex flex-wrap gap-3">
        <a
          href={CONTRIBUTING_URL}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-2 border border-primary bg-primary px-4 py-2.5 text-xs font-bold uppercase tracking-[0.12em] text-primary-foreground transition-all hover:bg-transparent hover:text-primary"
        >
          Read the full rules <ArrowRight className="size-4" />
        </a>
        <a
          href={REPO_URL}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-2 border border-border px-4 py-2.5 text-xs font-bold uppercase tracking-[0.12em] text-muted-foreground transition-colors hover:border-foreground hover:text-foreground"
        >
          <GithubIcon className="size-4" /> Star the repo
        </a>
        <Link
          to="/"
          className="inline-flex items-center gap-2 px-4 py-2.5 text-xs font-bold uppercase tracking-[0.12em] text-muted-foreground transition-colors hover:text-foreground"
        >
          Back to the wall
        </Link>
      </div>
    </div>
  )
}

function Step({ n, title, body, href, cta }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className="group flex flex-col border border-border bg-card/40 p-5 transition-all hover:-translate-y-0.5 hover:border-primary/50"
    >
      <span className="font-display text-3xl text-primary/60">{n}</span>
      <span className="mt-2 text-sm font-bold text-foreground">{title}</span>
      <span className="mt-1 flex-1 text-xs leading-relaxed text-muted-foreground">{body}</span>
      <span className="mt-4 inline-flex items-center gap-1 text-[11px] font-bold uppercase tracking-[0.12em] text-primary">
        {cta} <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-0.5" />
      </span>
    </a>
  )
}
