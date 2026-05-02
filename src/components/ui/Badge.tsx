import { cn } from '@/lib/cn'

const variants = {
  outline: 'border border-black bg-white text-brand-text',
  filled: 'bg-brand-olive-light text-brand-text',
} as const

interface BadgeProps {
  variant?: keyof typeof variants
  className?: string
  children: React.ReactNode
}

export default function Badge({ variant = 'outline', className, children }: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-block rounded-full px-4 py-1.5 font-body text-[13px] font-medium',
        variants[variant],
        className,
      )}
    >
      {children}
    </span>
  )
}
