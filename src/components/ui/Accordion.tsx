'use client'

import { useState } from 'react'
import { cn } from '@/lib/cn'

interface AccordionItem {
  question: string
  answer: string
}

interface AccordionProps {
  items: AccordionItem[]
  allowMultiple?: boolean
  className?: string
}

export default function Accordion({ items, allowMultiple = false, className }: AccordionProps) {
  const [openIndices, setOpenIndices] = useState<Set<number>>(new Set())

  function toggle(index: number) {
    setOpenIndices((prev) => {
      const next = new Set(allowMultiple ? prev : [])
      prev.has(index) ? next.delete(index) : next.add(index)
      return next
    })
  }

  return (
    <div className={cn('flex flex-col gap-4', className)}>
      {items.map((item, i) => {
        const isOpen = openIndices.has(i)
        return (
          <div key={i} className="rounded-lg border border-gray-300 bg-white overflow-hidden">
            <button
              type="button"
              className="flex w-full items-center gap-3 px-5 py-4 text-left"
              onClick={() => toggle(i)}
              aria-expanded={isOpen}
            >
              <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-gray-400 text-[14px] font-bold leading-none">
                {isOpen ? '−' : '+'}
              </span>
              <span className="font-heading text-[16px] font-bold text-brand-text">
                {item.question}
              </span>
            </button>
            {isOpen && (
              <div className="px-5 pb-4 pl-14">
                <p className="font-body text-[14px] leading-relaxed text-brand-text/70">
                  {item.answer}
                </p>
              </div>
            )}
          </div>
        )
      })}
    </div>
  )
}
