'use client'

import { useState } from 'react'
import Button from '@/components/ui/Button'
import Input from '@/components/ui/Input'
import Textarea from '@/components/ui/Textarea'
import { cn } from '@/lib/cn'

type ContactType = 'general' | 'pickup' | 'dropoff'

interface FormState {
  name: string
  email: string
  type: ContactType
  message: string
  preferredLocation: string
  preferredDate: string
  preferredTime: string
}

const INITIAL: FormState = {
  name: '',
  email: '',
  type: 'general',
  message: '',
  preferredLocation: '',
  preferredDate: '',
  preferredTime: '',
}

const TYPE_OPTIONS: { value: ContactType; label: string }[] = [
  { value: 'general', label: 'General Inquiry' },
  { value: 'pickup',  label: 'Pickup Request'  },
  { value: 'dropoff', label: 'Dropoff Question' },
]

function PersonIcon() {
  return (
    <svg className="h-4 w-4 text-brand-text/40" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
    </svg>
  )
}

function EnvelopeIcon() {
  return (
    <svg className="h-4 w-4 text-brand-text/40" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
    </svg>
  )
}

export default function ContactForm() {
  const [form, setForm] = useState<FormState>(INITIAL)
  const [submitting, setSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState<string | null>(null)

  function setField<K extends keyof FormState>(field: K, value: FormState[K]) {
    setForm((prev) => ({ ...prev, [field]: value }))
  }

  function handleChange(field: keyof FormState) {
    return (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
      setField(field, e.target.value as FormState[typeof field])
  }

  const showSchedulingFields = form.type === 'pickup' || form.type === 'dropoff'

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError(null)

    if (!form.name.trim() || !form.email.trim() || !form.message.trim()) {
      setError('Name, email, and message are required.')
      return
    }

    setSubmitting(true)

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          type: form.type,
          message: form.message,
          preferredLocation: form.preferredLocation || undefined,
          preferredDate: form.preferredDate || undefined,
          preferredTime: form.preferredTime || undefined,
        }),
      })

      if (!res.ok) {
        const json = (await res.json()) as { error?: string }
        throw new Error(json.error ?? 'Submission failed')
      }

      setSubmitted(true)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong. Please try again.')
    } finally {
      setSubmitting(false)
    }
  }

  if (submitted) {
    return (
      <div className="py-8 text-center">
        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-brand-olive-light">
          <svg className="h-8 w-8 text-brand-olive" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h3 className="font-heading text-[20px] font-bold text-brand-text">Message Sent!</h3>
        <p className="mt-2 font-body text-[16px] text-brand-text/70">
          Thanks for reaching out. We&apos;ll get back to you as soon as possible.
        </p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      {/* Row 1 — Name + Email */}
      <div className="grid gap-4 md:grid-cols-2">
        <Input
          label="Name"
          icon={<PersonIcon />}
          placeholder="Your name"
          value={form.name}
          onChange={handleChange('name')}
          required
        />
        <Input
          label="Email"
          icon={<EnvelopeIcon />}
          type="email"
          placeholder="your@email.com"
          value={form.email}
          onChange={handleChange('email')}
          required
        />
      </div>

      {/* Subject select */}
      <div className="flex flex-col gap-1">
        <label htmlFor="contact-type" className="font-body text-[14px] text-brand-text">
          Subject
        </label>
        <select
          id="contact-type"
          value={form.type}
          onChange={handleChange('type')}
          className={cn(
            'w-full rounded-md border border-gray-300 px-4 py-2.5 font-body text-[16px] text-brand-text bg-white',
            'focus:border-brand-olive focus:outline-none focus:ring-1 focus:ring-brand-olive',
          )}
        >
          {TYPE_OPTIONS.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      </div>

      {/* Conditional scheduling fields */}
      {showSchedulingFields && (
        <>
          <Input
            label="Preferred Location"
            placeholder="e.g. Warren Towers lobby, Bay State Rd dorm"
            value={form.preferredLocation}
            onChange={handleChange('preferredLocation')}
          />
          <div className="grid gap-4 md:grid-cols-2">
            <Input
              label="Preferred Date"
              type="date"
              value={form.preferredDate}
              onChange={handleChange('preferredDate')}
            />
            <Input
              label="Preferred Time"
              type="time"
              value={form.preferredTime}
              onChange={handleChange('preferredTime')}
            />
          </div>
        </>
      )}

      {/* Message */}
      <Textarea
        label="Message"
        placeholder="How can we help?"
        value={form.message}
        onChange={handleChange('message')}
        rows={5}
        required
      />

      {error && (
        <p className="font-body text-[14px] text-red-500">{error}</p>
      )}

      <Button
        type="submit"
        fullWidth
        variant="primary"
        disabled={submitting}
        className="mt-2"
      >
        {submitting ? 'Sending…' : 'Send Message'}
      </Button>
    </form>
  )
}
