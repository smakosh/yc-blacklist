import { Info, ArrowUpRight } from 'lucide-react'
import { NEW_ISSUE_URL } from '@/lib/data'

export function SampleBanner() {
  return (
    <div className="border-b border-primary/20 bg-primary/[0.06]">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center gap-x-3 gap-y-1 px-4 py-2.5 text-[12px] text-primary/90 sm:px-6">
        <Info className="size-4 shrink-0" />
        <span className="font-bold uppercase tracking-[0.12em]">Seeded with samples</span>
        <span className="text-primary/70">
          Every current entry is a fictional “EXAMPLE” to show the format. Real, sourced reports
          arrive by pull request.
        </span>
        <a
          href={NEW_ISSUE_URL}
          target="_blank"
          rel="noreferrer"
          className="ml-auto flex items-center gap-1 font-bold underline decoration-dotted underline-offset-2 hover:text-primary"
        >
          Add the first real one <ArrowUpRight className="size-3.5" />
        </a>
      </div>
    </div>
  )
}
