import { cn } from '@/lib/cn'

const variants = {
  outline: 'border-2 border-black bg-white text-brand-text',
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
        'inline-flex items-center justify-center rounded-[30px] px-5 py-2.5 font-body text-[18px]',
        variants[variant],
        className,
      )}
    >
      {children}
    </span>
  )
}
