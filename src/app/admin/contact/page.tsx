'use client'

import { useCallback, useEffect, useMemo, useState } from 'react'
import Badge from '@/components/ui/Badge'
import Modal from '@/components/ui/Modal'
import Button from '@/components/ui/Button'
import { cn } from '@/lib/cn'

// ── Types ──────────────────────────────────────────────────

type ContactStatus = 'new' | 'responded' | 'completed'
type ContactType = 'general' | 'pickup' | 'dropoff'

interface ContactRequest {
  id: string
  name: string
  email: string
  message: string
  type: string
  status: string
  preferredLocation: string | null
  preferredDate: string | null
  preferredTime: string | null
  createdAt: string
  updatedAt: string
}

// ── Badge helpers ─────────────────────────────────────────

const STATUS_STYLES: Record<string, string> = {
  new:       'border border-brand-olive text-brand-olive bg-white',
  responded: 'bg-brand-blue-light text-brand-text',
  completed: 'bg-brand-olive-light text-brand-text',
}

const TYPE_STYLES: Record<string, string> = {
  general: '',
  pickup:  'bg-brand-olive-light text-brand-text',
  dropoff: 'bg-brand-tan-light text-brand-text',
}

function TypeBadge({ type }: { type: string }) {
  const label = type.charAt(0).toUpperCase() + type.slice(1)
  const extra = TYPE_STYLES[type] ?? ''
  return (
    <Badge className={cn('px-3 py-1 text-[12px]', extra || 'border border-black bg-white text-brand-text')}>
      {label}
    </Badge>
  )
}

function StatusBadge({ status }: { status: string }) {
  const label = status.charAt(0).toUpperCase() + status.slice(1)
  const extra = STATUS_STYLES[status] ?? 'border border-gray-300 text-brand-text'
  return (
    <Badge className={cn('px-3 py-1 text-[12px]', extra)}>
      {label}
    </Badge>
  )
}

// ── Formatting ────────────────────────────────────────────

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString('en-US', {
    month: 'short', day: 'numeric', year: 'numeric',
  })
}

// ── Page ──────────────────────────────────────────────────

export default function AdminContactPage() {
  const [requests, setRequests] = useState<ContactRequest[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [selected, setSelected] = useState<ContactRequest | null>(null)
  const [updatingId, setUpdatingId] = useState<string | null>(null)
  const [sortField, setSortField] = useState<keyof ContactRequest>('createdAt')
  const [sortDir, setSortDir] = useState<'asc' | 'desc'>('desc')

  const sortedRequests = useMemo(() => {
    return [...requests].sort((a, b) => {
      const av = a[sortField] ?? ''
      const bv = b[sortField] ?? ''
      const cmp = String(av).localeCompare(String(bv))
      return sortDir === 'asc' ? cmp : -cmp
    })
  }, [requests, sortField, sortDir])

  function toggleSort(field: keyof ContactRequest) {
    if (field === sortField) {
      setSortDir((d) => (d === 'asc' ? 'desc' : 'asc'))
    } else {
      setSortField(field)
      setSortDir('asc')
    }
  }

  const fetchRequests = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const res = await fetch('/api/contact')
      if (!res.ok) {
        const msg = res.status === 401 ? 'Not authenticated'
          : res.status === 403 ? 'Not authorized'
          : `Failed to load requests (${res.status})`
        setError(msg)
        return
      }
      const json = (await res.json()) as { data: ContactRequest[] }
      setRequests(json.data ?? [])
    } catch {
      setError('Failed to load requests')
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => { fetchRequests() }, [fetchRequests])

  // ── Status update ─────────────────────────────────────

  async function updateStatus(id: string, status: ContactStatus) {
    setError(null)
    setUpdatingId(id)
    try {
      const res = await fetch(`/api/contact/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status }),
      })
      if (!res.ok) {
        setError(`Failed to update status (${res.status})`)
        return
      }

      setRequests((prev) =>
        prev.map((r) => (r.id === id ? { ...r, status } : r))
      )
      if (selected?.id === id) {
        setSelected((prev) => prev ? { ...prev, status } : prev)
      }
    } catch {
      setError('Failed to update status')
    } finally {
      setUpdatingId(null)
    }
  }

  // ── Render ─────────────────────────────────────────────

  return (
    <div>
      {/* Header */}
      <div className="mb-6">
        <h1 className="font-display text-[28px] text-brand-text">Contact Inbox</h1>
        <p className="mt-1 font-body text-[14px] text-brand-text/60">
          View and manage incoming contact and pickup requests
        </p>
      </div>

      {/* Table */}
      {loading ? (
        <div className="flex items-center justify-center py-16">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-brand-olive border-t-transparent" />
        </div>
      ) : error ? (
        <div className="rounded-xl border border-red-200 bg-red-50 py-16 text-center">
          <p className="font-body text-[15px] text-red-600">{error}</p>
        </div>
      ) : requests.length === 0 ? (
        <div className="rounded-xl border border-dashed border-gray-300 py-16 text-center">
          <p className="font-body text-[15px] text-brand-text/50">No messages yet.</p>
        </div>
      ) : (
        <div className="overflow-hidden rounded-xl border border-gray-200 bg-white">
          <table className="w-full text-left">
            <thead className="border-b border-gray-200 bg-gray-50">
              <tr>
                {([
                  { label: 'Name',    field: 'name'      },
                  { label: 'Email',   field: 'email'     },
                  { label: 'Type',    field: 'type'      },
                  { label: 'Status',  field: 'status'    },
                  { label: 'Date',    field: 'createdAt' },
                ] as { label: string; field: keyof ContactRequest }[]).map(({ label, field }) => (
                  <th
                    key={field}
                    aria-sort={sortField === field ? (sortDir === 'asc' ? 'ascending' : 'descending') : 'none'}
                    className="px-4 py-3"
                  >
                    <button
                      onClick={() => toggleSort(field)}
                      className="flex items-center gap-1 font-heading text-[13px] font-bold uppercase tracking-wide text-brand-text/50 hover:text-brand-text"
                    >
                      {label}
                      <span aria-hidden="true" className="text-[10px]">
                        {sortField === field ? (sortDir === 'asc' ? '▲' : '▼') : '⇅'}
                      </span>
                    </button>
                  </th>
                ))}
                <th className="px-4 py-3 font-heading text-[13px] font-bold uppercase tracking-wide text-brand-text/50">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {sortedRequests.map((req) => (
                <tr key={req.id} className="hover:bg-gray-50">
                  <td className="px-4 py-3 font-body text-[14px] font-medium text-brand-text">
                    {req.name}
                  </td>
                  <td className="px-4 py-3 font-body text-[14px] text-brand-text/70">
                    <a href={`mailto:${req.email}`} className="hover:underline">
                      {req.email}
                    </a>
                  </td>
                  <td className="px-4 py-3">
                    <TypeBadge type={req.type} />
                  </td>
                  <td className="px-4 py-3">
                    <StatusBadge status={req.status} />
                  </td>
                  <td className="px-4 py-3 font-body text-[13px] text-brand-text/50">
                    {formatDate(req.createdAt)}
                  </td>
                  <td className="px-4 py-3">
                    <button
                      onClick={() => setSelected(req)}
                      className="font-body text-[13px] text-brand-olive hover:underline"
                    >
                      View
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Detail modal */}
      <Modal
        open={selected !== null}
        onClose={() => setSelected(null)}
        title={selected?.name ?? ''}
        className="max-w-lg"
      >
        {selected && (
          <div className="flex flex-col gap-4">
            {/* Meta row */}
            <div className="flex flex-wrap items-center gap-2">
              <TypeBadge type={selected.type} />
              <StatusBadge status={selected.status} />
              <span className="font-body text-[13px] text-brand-text/40">
                {formatDate(selected.createdAt)}
              </span>
            </div>

            {/* Contact info */}
            <div>
              <p className="font-heading text-[12px] font-bold uppercase tracking-wide text-brand-text/40">Email</p>
              <a href={`mailto:${selected.email}`} className="font-body text-[14px] text-brand-olive hover:underline">
                {selected.email}
              </a>
            </div>

            {/* Message */}
            <div>
              <p className="font-heading text-[12px] font-bold uppercase tracking-wide text-brand-text/40">Message</p>
              <p className="mt-1 font-body text-[14px] text-brand-text leading-relaxed whitespace-pre-wrap">
                {selected.message}
              </p>
            </div>

            {/* Scheduling details (pickup / dropoff) */}
            {(selected.preferredLocation || selected.preferredDate || selected.preferredTime) && (
              <div className="rounded-lg bg-brand-tan-light p-4">
                <p className="mb-2 font-heading text-[12px] font-bold uppercase tracking-wide text-brand-text/50">
                  Scheduling Details
                </p>
                {selected.preferredLocation && (
                  <p className="font-body text-[14px] text-brand-text">
                    <span className="font-medium">Location:</span> {selected.preferredLocation}
                  </p>
                )}
                {selected.preferredDate && (
                  <p className="font-body text-[14px] text-brand-text">
                    <span className="font-medium">Date:</span> {selected.preferredDate}
                  </p>
                )}
                {selected.preferredTime && (
                  <p className="font-body text-[14px] text-brand-text">
                    <span className="font-medium">Time:</span> {selected.preferredTime}
                  </p>
                )}
              </div>
            )}

            {/* Status update buttons */}
            <div>
              <p className="mb-2 font-heading text-[12px] font-bold uppercase tracking-wide text-brand-text/40">
                Update Status
              </p>
              <div className="flex flex-wrap gap-2">
                {(['new', 'responded', 'completed'] as ContactStatus[]).map((s) => (
                  <button
                    key={s}
                    disabled={selected.status === s || updatingId === selected.id}
                    onClick={() => updateStatus(selected.id, s)}
                    className={cn(
                      'rounded-full px-4 py-1.5 font-body text-[13px] font-medium transition-opacity',
                      selected.status === s
                        ? 'cursor-default opacity-100 ring-2 ring-brand-olive ring-offset-1'
                        : 'opacity-60 hover:opacity-100',
                      STATUS_STYLES[s] ?? 'border border-gray-300',
                    )}
                  >
                    {s.charAt(0).toUpperCase() + s.slice(1)}
                  </button>
                ))}
              </div>
            </div>

            <div className="mt-2 flex justify-end">
              <Button variant="secondary" size="sm" onClick={() => setSelected(null)}>
                Close
              </Button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  )
}
