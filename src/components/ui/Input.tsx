import { forwardRef } from 'react'
import { cn } from '@/lib/cn'

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
  icon?: React.ReactNode
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, icon, className, id, ...props }, ref) => {
    const inputId = id || (label ? label.toLowerCase().replace(/\s+/g, '-') : undefined)
    const errorId = error && inputId ? `${inputId}-error` : undefined

    return (
      <div className="flex flex-col gap-1">
        {label && (
          <label htmlFor={inputId} className="flex items-center gap-1.5 font-body text-[14px] text-brand-text">
            {icon}
            {label}
          </label>
        )}
        <input
          ref={ref}
          id={inputId}
          aria-invalid={error ? true : undefined}
          aria-describedby={errorId}
          className={cn(
            'w-full rounded-md border border-gray-300 px-4 py-2.5 font-body text-[16px] text-brand-text placeholder:text-gray-400 focus:border-brand-olive focus:outline-none focus:ring-1 focus:ring-brand-olive',
            error && 'border-brand-terra focus:border-brand-terra focus:ring-brand-terra',
            className,
          )}
          {...props}
        />
        {error && <p id={errorId} className="font-body text-[13px] text-brand-terra">{error}</p>}
      </div>
    )
  }
)

Input.displayName = 'Input'
export default Input
