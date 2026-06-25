import { cn } from '@/lib/utils'

export function Stamp({ children = 'EXAMPLE', className }) {
  return (
    <span
      className={cn(
        'stamp pointer-events-none select-none px-2 py-0.5 text-[10px] font-extrabold uppercase tracking-[0.2em]',
        className,
      )}
    >
      {children}
    </span>
  )
}
