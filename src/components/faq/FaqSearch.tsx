'use client'

import { useState } from 'react'
import Card from '@/components/ui/Card'
import Input from '@/components/ui/Input'
import Button from '@/components/ui/Button'

interface FaqSearchProps {
  onSearch: (query: string) => void
}

export default function FaqSearch({ onSearch }: FaqSearchProps) {
  const [value, setValue] = useState('')

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    onSearch(value.trim())
  }

  return (
    <Card className="mx-auto w-full max-w-2xl px-6 py-6 shadow-sm">
      <h2 className="mb-4 text-center font-heading text-[18px] font-bold text-brand-text">
        How can we help?
      </h2>
      <form onSubmit={handleSubmit} className="flex items-end gap-3">
        <div className="flex-1">
          <Input
            aria-label="Search FAQs"
            placeholder="Search for questions..."
            value={value}
            onChange={(e) => {
              setValue(e.target.value)
              onSearch(e.target.value.trim())
            }}
            className="h-[52px] w-full rounded-[10px] border border-gray-400 bg-gray-50 pl-12 pr-4 font-body text-[16px] text-brand-text/60 placeholder:text-brand-text/40 focus:outline-none focus:ring-1 focus:ring-brand-olive md:h-[62px] md:text-[20px]"
          />
        </div>
        <Button
          type="submit"
          variant="blue"
          className="h-[52px] shrink-0 rounded-[10px] px-6 font-body text-[16px] font-extrabold md:h-[62px] md:px-10 md:text-[24px]"
        >
          Search
        </Button>
      </form>
    </Card>
  )
}
