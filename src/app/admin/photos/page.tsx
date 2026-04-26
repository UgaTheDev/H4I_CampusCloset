'use client'

import { useEffect, useState } from 'react'
import Button from '@/components/ui/Button'
import Card from '@/components/ui/Card'
import Input from '@/components/ui/Input'
import type { GalleryPhoto } from '@/types'

type Form = { url: string; caption: string; eventId: string }

const EMPTY: Form = { url: '', caption: '', eventId: '' }

type EventOption = { id: string; title: string }

export default function AdminPhotosPage() {
  const [photos, setPhotos] = useState<GalleryPhoto[]>([])
  const [events, setEvents] = useState<EventOption[]>([])
  const [loading, setLoading] = useState(true)
  const [form, setForm] = useState<Form>(EMPTY)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function load() {
    setLoading(true)
    const [photosRes, eventsRes] = await Promise.all([
      fetch('/api/photos'),
      fetch('/api/events'),
    ])
    const [photosJson, eventsJson] = await Promise.all([photosRes.json(), eventsRes.json()])
    setPhotos(photosJson.data ?? [])
    setEvents(eventsJson.data ?? [])
    setLoading(false)
  }

  useEffect(() => {
    load()
  }, [])

  async function handleCreate(e: React.FormEvent) {
    e.preventDefault()
    setSubmitting(true)
    setError(null)
    try {
      const res = await fetch('/api/photos', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          url: form.url,
          caption: form.caption || undefined,
          eventId: form.eventId || undefined,
        }),
      })
      if (!res.ok) throw new Error((await res.json()).error ?? 'Failed')
      setForm(EMPTY)
      await load()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to add photo')
    } finally {
      setSubmitting(false)
    }
  }

  async function handleDelete(id: string) {
    if (!confirm('Delete this photo?')) return
    await fetch(`/api/photos/${id}`, { method: 'DELETE' })
    await load()
  }

  return (
    <div className="mx-auto max-w-4xl">
      <h1 className="font-display text-[28px] text-brand-brown">Photo Gallery</h1>
      <p className="mt-2 font-body text-[14px] text-brand-text/60">
        Manage photos shown on the About page and landing gallery.{' '}
        <span className="text-brand-text/40">
          (Direct file upload coming soon — paste a hosted URL for now.)
        </span>
      </p>

      <Card className="mt-8 p-6">
        <h2 className="mb-4 font-heading text-[16px] font-bold text-brand-text">Add Photo</h2>
        <form onSubmit={handleCreate} className="flex flex-col gap-4">
          <Input
            label="Photo URL"
            placeholder="https://..."
            value={form.url}
            onChange={(e) => setForm({ ...form, url: e.target.value })}
            required
          />
          <Input
            label="Caption (optional)"
            value={form.caption}
            onChange={(e) => setForm({ ...form, caption: e.target.value })}
          />
          <div className="flex flex-col gap-1">
            <label className="font-body text-[14px] text-brand-text">Tag with event (optional)</label>
            <select
              value={form.eventId}
              onChange={(e) => setForm({ ...form, eventId: e.target.value })}
              className="rounded-md border border-gray-300 px-4 py-2.5 font-body text-[16px] text-brand-text"
            >
              <option value="">— None —</option>
              {events.map((ev) => (
                <option key={ev.id} value={ev.id}>
                  {ev.title}
                </option>
              ))}
            </select>
          </div>
          {error && <p className="font-body text-[13px] text-red-600">{error}</p>}
          <Button type="submit" variant="primary" disabled={submitting}>
            {submitting ? 'Adding...' : 'Add Photo'}
          </Button>
        </form>
      </Card>

      <h2 className="mb-4 mt-10 font-heading text-[16px] font-bold text-brand-text">
        Gallery ({photos.length})
      </h2>
      {loading ? (
        <p className="font-body text-[14px] text-brand-text/60">Loading...</p>
      ) : photos.length === 0 ? (
        <p className="font-body text-[14px] text-brand-text/60">No photos yet.</p>
      ) : (
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
          {photos.map((p) => (
            <Card key={p.id} className="overflow-hidden">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={p.url}
                alt={p.caption ?? 'Gallery photo'}
                className="aspect-square w-full object-cover"
              />
              <div className="p-3">
                {p.caption && (
                  <p className="mb-2 font-body text-[12px] text-brand-text/70 line-clamp-2">
                    {p.caption}
                  </p>
                )}
                <button
                  onClick={() => handleDelete(p.id)}
                  className="font-body text-[12px] text-red-600 hover:underline"
                >
                  Delete
                </button>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
