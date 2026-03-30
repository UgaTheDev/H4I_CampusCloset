'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase'
import AdminSidebar from '@/components/layout/AdminSidebar'

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter()
  const [status, setStatus] = useState<'loading' | 'authorized' | 'denied'>('loading')

  useEffect(() => {
    async function checkAdmin() {
      const res = await fetch('/api/admin/check')
      if (res.status === 401) {
        router.replace('/admin/login')
      } else {
        setStatus(res.ok ? 'authorized' : 'denied')
      }
    }

    // Check on mount
    checkAdmin()

    // Re-check when auth state changes (sign-out, token refresh, session expiry)
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (!session) {
        setStatus('loading')
        router.replace('/admin/login')
        return
      }
      checkAdmin()
    })

    return () => subscription.unsubscribe()
  }, [router])

  if (status === 'loading') {
    return (
      <div className="flex min-h-screen items-center justify-center bg-brand-cream">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-brand-olive border-t-transparent" />
      </div>
    )
  }

  if (status === 'denied') {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-brand-cream gap-4">
        <h1 className="text-[24px] font-display text-brand-brown">Access Denied</h1>
        <p className="font-body text-[14px] text-brand-text/60">
          Your account is not authorized to access the admin portal.
        </p>
        <button
          onClick={async () => {
            await supabase.auth.signOut()
            router.replace('/admin/login')
          }}
          className="font-body text-[14px] text-brand-olive underline hover:text-brand-olive/80"
        >
          Sign in with a different account
        </button>
      </div>
    )
  }

  return (
    <div className="flex min-h-screen">
      <AdminSidebar />
      <main className="flex-1 overflow-y-auto bg-brand-cream p-8">{children}</main>
    </div>
  )
}
