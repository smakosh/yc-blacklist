import { TriangleAlert } from 'lucide-react'
import { cn } from '@/lib/utils'

export function Marquee({ items, className, alert = false }) {
  const Row = () => (
    <div className="flex shrink-0 items-center">
      {items.map((t, i) => (
        <span key={i} className="flex items-center gap-3 px-5">
          <TriangleAlert className="size-3.5 shrink-0" />
          <span className="whitespace-nowrap text-[11px] font-bold uppercase tracking-[0.25em]">
            {t}
          </span>
        </span>
      ))}
    </div>
  )
  return (
    <div
      className={cn(
        'flex overflow-hidden border-y py-2',
        alert
          ? 'border-destructive/30 bg-destructive/10 text-destructive'
          : 'border-primary/30 bg-primary/10 text-primary',
        className,
      )}
    >
      <div className="flex marquee">
        <Row />
        <Row />
      </div>
    </div>
  )
}
