'use client'

import { useEffect } from 'react'
import { cn } from '@/lib/cn'

interface ModalProps {
  open: boolean
  onClose: () => void
  title?: string
  className?: string
  children: React.ReactNode
}

export default function Modal({ open, onClose, title, className, children }: ModalProps) {
  useEffect(() => {
    if (!open) return
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', onKeyDown)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKeyDown)
      document.body.style.overflow = ''
    }
  }, [open, onClose])

  if (!open) return null

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center">
      <div className="absolute inset-0 bg-black/50" onClick={onClose} aria-hidden="true" />
      <div
        role="dialog"
        aria-modal
        aria-label={title}
        className={cn('relative z-10 w-full max-w-lg rounded-xl bg-white p-6 shadow-xl', className)}
      >
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-brand-text/50 hover:text-brand-text text-[24px] leading-none"
          aria-label="Close"
        >
          &times;
        </button>
        {title && (
          <h2 className="mb-4 font-heading text-[20px] font-bold text-brand-text pr-8">{title}</h2>
        )}
        {children}
      </div>
    </div>
  )
}
