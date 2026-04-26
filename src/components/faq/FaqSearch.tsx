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
            placeholder="Search for questions..."
            value={value}
            onChange={(e) => {
              setValue(e.target.value)
              onSearch(e.target.value.trim())
            }}
          />
        </div>
        <Button type="submit" variant="primary" size="md" className="!rounded-md">
          Search
        </Button>
      </form>
    </Card>
  )
}
