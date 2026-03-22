'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase'
import { signInWithGoogle } from '@/lib/auth'

export default function AdminLoginPage() {
  const router = useRouter()

  useEffect(() => {
    // If already authenticated and admin, redirect to /admin
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session?.user) {
        router.replace('/admin')
      }
    })
  }, [router])

  return (
    <div className="flex min-h-screen items-center justify-center bg-brand-cream">
      <div className="text-center">
        <h1 className="mb-6 text-2xl font-display text-brand-brown">Campus Closet Admin</h1>
        <button
          onClick={() => signInWithGoogle()}
          className="rounded-lg bg-brand-olive px-6 py-3 text-white hover:bg-brand-olive/90"
        >
          Sign in with Google
        </button>
      </div>
    </div>
  )
}
