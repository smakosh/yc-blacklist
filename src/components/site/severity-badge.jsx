import { cn } from '@/lib/utils'
import { SEVERITY } from '@/lib/data'

const styles = {
  high: 'border-destructive/50 bg-destructive/15 text-destructive',
  medium: 'border-primary/50 bg-primary/15 text-primary',
  low: 'border-border bg-muted text-muted-foreground',
}

export function SeverityBadge({ level, className }) {
  const s = SEVERITY[level] || SEVERITY.low
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 border px-2 py-0.5 text-[10px] font-bold uppercase tracking-[0.18em]',
        styles[level] || styles.low,
        className,
      )}
    >
      <span className="size-1.5 rounded-full bg-current shadow-[0_0_8px_currentColor]" />
      {s.label}
    </span>
  )
}
