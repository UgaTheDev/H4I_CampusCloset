'use client'

import { useMemo, useState } from 'react'
import Accordion from '@/components/ui/Accordion'
import { cn } from '@/lib/cn'
import { FAQ_CATEGORIES } from '@/types'
import type { FaqItem } from '@/types'
import FaqSearch from './FaqSearch'

interface FaqListProps {
  items: FaqItem[]
}

export default function FaqList({ items }: FaqListProps) {
  const [activeCategory, setActiveCategory] = useState<string>(FAQ_CATEGORIES[0])
  const [query, setQuery] = useState('')

  const categories = useMemo(() => {
    const fromData = Array.from(new Set(items.map((i) => i.category)))
    const merged = [...FAQ_CATEGORIES, ...fromData.filter((c) => !FAQ_CATEGORIES.includes(c as never))]
    return merged
  }, [items])

  const filtered = useMemo(() => {
    const q = query.toLowerCase()
    return items
      .filter((item) => item.category === activeCategory)
      .filter((item) =>
        q.length === 0
          ? true
          : item.question.toLowerCase().includes(q) || item.answer.toLowerCase().includes(q),
      )
  }, [items, activeCategory, query])

  return (
    <div>
      <div className="mb-12">
        <FaqSearch onSearch={setQuery} />
      </div>

      <div className="mx-auto grid max-w-5xl gap-8 md:grid-cols-[200px_1fr]">
        <aside>
          <h3 className="mb-4 font-heading text-[15px] font-bold text-brand-text">Categories</h3>
          <ul className="flex flex-row flex-wrap gap-2 md:flex-col md:gap-1">
            {categories.map((category) => {
              const isActive = category === activeCategory
              return (
                <li key={category}>
                  <button
                    type="button"
                    onClick={() => setActiveCategory(category)}
                    className={cn(
                      'w-full rounded-md px-3 py-2 text-left font-body text-[14px] transition-colors',
                      isActive
                        ? 'bg-brand-olive-light font-medium text-brand-text'
                        : 'text-brand-text/70 hover:bg-gray-100',
                    )}
                  >
                    {category}
                  </button>
                </li>
              )
            })}
          </ul>
        </aside>

        <div>
          <h2 className="mb-6 font-heading text-[24px] font-bold text-brand-text">
            {activeCategory}
          </h2>
          {filtered.length > 0 ? (
            <Accordion items={filtered.map(({ question, answer }) => ({ question, answer }))} />
          ) : (
            <p className="font-body text-[14px] text-brand-text/60">
              {query
                ? `No questions matching "${query}" in this category.`
                : 'No questions in this category yet.'}
            </p>
          )}
        </div>
      </div>
    </div>
  )
}
