import { cn } from '@/lib/cn'

const variants = {
  default: 'bg-white rounded-xl',
  outlined: 'bg-white rounded-xl border-2 border-black',
} as const

interface CardProps {
  variant?: keyof typeof variants
  className?: string
  children: React.ReactNode
}

export default function Card({ variant = 'default', className, children }: CardProps) {
  return (
    <div className={cn(variants[variant], className)}>
      {children}
    </div>
  )
}
