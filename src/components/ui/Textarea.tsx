import { forwardRef } from 'react'
import { cn } from '@/lib/cn'

interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string
  error?: string
}

const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ label, error, className, id, rows = 4, ...props }, ref) => {
    const textareaId = id || (label ? label.toLowerCase().replace(/\s+/g, '-') : undefined)

    return (
      <div className="flex flex-col gap-1">
        {label && (
          <label htmlFor={textareaId} className="font-body text-[14px] text-brand-text">
            {label}
          </label>
        )}
        <textarea
          ref={ref}
          id={textareaId}
          rows={rows}
          className={cn(
            'w-full rounded-md border border-gray-300 px-4 py-2.5 font-body text-[16px] text-brand-text placeholder:text-gray-400 focus:border-brand-olive focus:outline-none focus:ring-1 focus:ring-brand-olive resize-none',
            error && 'border-red-500 focus:border-red-500 focus:ring-red-500',
            className,
          )}
          {...props}
        />
        {error && <p className="font-body text-[13px] text-red-500">{error}</p>}
      </div>
    )
  }
)

Textarea.displayName = 'Textarea'
export default Textarea
