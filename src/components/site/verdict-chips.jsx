import { cn } from '@/lib/utils'
import { VERDICTS, VERDICT_ORDER } from '@/lib/data'

export function VerdictChips({ verdicts = [], size = 'sm', className }) {
  return (
    <div className={cn('flex flex-wrap gap-1.5', className)}>
      {VERDICT_ORDER.filter((v) => verdicts.includes(v)).map((v) => (
        <span
          key={v}
          title={VERDICTS[v].label}
          className={cn(
            'inline-flex items-center border border-destructive/40 bg-destructive/10 font-bold uppercase tracking-[0.15em] text-destructive',
            size === 'sm' ? 'px-1.5 py-0.5 text-[10px]' : 'px-2.5 py-1 text-xs',
          )}
        >
          {VERDICTS[v].code}
        </span>
      ))}
    </div>
  )
}
