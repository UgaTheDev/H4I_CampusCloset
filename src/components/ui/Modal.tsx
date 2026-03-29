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
      <div className="absolute inset-0 bg-black/50" onClick={onClose} aria-hidden />
      <div
        role="dialog"
        aria-modal
        aria-label={title}
        className={cn('relative z-10 w-full max-w-lg rounded-xl bg-white p-6 shadow-xl', className)}
      >
        {title && (
          <div className="mb-4 flex items-center justify-between">
            <h2 className="font-heading text-[20px] font-bold text-brand-text">{title}</h2>
            <button
              onClick={onClose}
              className="text-brand-text/50 hover:text-brand-text text-[24px] leading-none"
              aria-label="Close"
            >
              &times;
            </button>
          </div>
        )}
        {children}
      </div>
    </div>
  )
}
