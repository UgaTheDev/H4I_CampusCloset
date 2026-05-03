'use client'

import { useEffect, useRef } from 'react'
import { cn } from '@/lib/cn'

interface ModalProps {
  open: boolean
  onClose: () => void
  title?: string
  className?: string
  children: React.ReactNode
}

export default function Modal({ open, onClose, title, className, children }: ModalProps) {
  const dialogRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!open) return

    function handleEscape(e: KeyboardEvent) {
      if (e.key === 'Escape') onClose()
    }

    document.addEventListener('keydown', handleEscape)
    document.body.style.overflow = 'hidden'

    // Focus the dialog container on open for screen readers
    dialogRef.current?.focus()

    return () => {
      document.removeEventListener('keydown', handleEscape)
      document.body.style.overflow = ''
    }
  }, [open, onClose])

  if (!open) return null

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center">
      <div className="absolute inset-0 bg-black/50" onClick={onClose} aria-hidden="true" />
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal={true}
        aria-labelledby={title ? 'modal-title' : undefined}
        tabIndex={-1}
        className={cn('relative z-10 w-full max-w-lg rounded-xl bg-white p-6 shadow-xl outline-none', className)}
      >
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-brand-text/50 hover:text-brand-text text-[24px] leading-none"
          aria-label="Close"
        >
          &times;
        </button>
        {title && (
          <h2 id="modal-title" className="mb-4 font-heading text-[20px] font-bold text-brand-text pr-8">{title}</h2>
        )}
        {children}
      </div>
    </div>
  )
}
