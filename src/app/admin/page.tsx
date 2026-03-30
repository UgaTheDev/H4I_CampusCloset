'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'

export default function AdminDashboardPage() {
  const [email, setEmail] = useState<string | null>(null)

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setEmail(session?.user?.email ?? null)
    })
  }, [])

  return (
    <div>
      <h1 className="font-display text-[28px] text-brand-brown">Dashboard</h1>
      {email && (
        <p className="mt-2 font-body text-[14px] text-brand-text/60">
          Signed in as {email}
        </p>
      )}
      <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {[
          { label: 'Events', href: '/admin/events', desc: 'Manage upcoming and past events' },
          { label: 'Impact Data', href: '/admin/impact', desc: 'Log environmental impact stats' },
          { label: 'Donation Bins', href: '/admin/bins', desc: 'Manage bin locations on campus' },
          { label: 'Contact Inbox', href: '/admin/contact', desc: 'View and respond to messages' },
          { label: 'Team Members', href: '/admin/team', desc: 'Edit team bios and photos' },
          { label: 'FAQ', href: '/admin/faq', desc: 'Add and edit FAQ entries' },
          { label: 'Photo Gallery', href: '/admin/photos', desc: 'Upload and manage photos' },
        ].map((item) => (
          <a
            key={item.href}
            href={item.href}
            className="rounded-xl border border-gray-200 bg-white p-5 transition-shadow hover:shadow-md"
          >
            <h2 className="font-heading text-[16px] font-bold text-brand-text">{item.label}</h2>
            <p className="mt-1 font-body text-[13px] text-brand-text/60">{item.desc}</p>
          </a>
        ))}
      </div>
    </div>
  )
}
