'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase'
import AdminSidebar from '@/components/layout/AdminSidebar'

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter()
  const [status, setStatus] = useState<'loading' | 'authorized' | 'denied'>('loading')

  useEffect(() => {
    supabase.auth.getSession().then(async ({ data: { session } }) => {
      if (!session?.user?.email) {
        router.replace('/admin/login')
        return
      }

      // Check if user is in AdminUser table via API
      const res = await fetch(`/api/admin/check?email=${encodeURIComponent(session.user.email)}`)
      if (res.ok) {
        setStatus('authorized')
      } else {
        setStatus('denied')
      }
    })
  }, [router])

  if (status === 'loading') {
    return <div className="flex min-h-screen items-center justify-center">Loading...</div>
  }

  if (status === 'denied') {
    return (
      <div className="flex min-h-screen items-center justify-center bg-brand-cream">
        <div className="text-center">
          <h1 className="text-2xl font-display text-brand-brown">Access Denied</h1>
          <p className="mt-2 text-brand-brown/70">Your account is not authorized to access the admin portal.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="flex min-h-screen">
      <AdminSidebar />
      <div className="flex-1 p-8 bg-brand-cream">{children}</div>
    </div>
  )
}
