'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { supabase } from '@/lib/supabase'
import { signInWithGoogle } from '@/lib/auth'
import Button from '@/components/ui/Button'

export default function AdminLoginPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    // Check on mount
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session?.user) router.replace('/admin')
    })

    // Auto-redirect when session appears (e.g. after OAuth callback)
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session?.user) router.replace('/admin')
    })

    return () => subscription.unsubscribe()
  }, [router])

  async function handleSignIn() {
    setLoading(true)
    await signInWithGoogle()
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-brand-cream">
      <div className="w-full max-w-sm rounded-xl bg-white p-8 shadow-lg text-center">
        <Image
          src="/images/logo.png"
          alt="Campus Closet logo"
          width={64}
          height={64}
          className="mx-auto mb-4 h-16 w-16 object-cover"
        />
        <h1 className="mb-2 font-display text-[24px] text-brand-brown">Admin Portal</h1>
        <p className="mb-6 font-body text-[14px] text-brand-text/60">
          Sign in with your BU Google account
        </p>
        <Button
          variant="primary"
          fullWidth
          onClick={handleSignIn}
          disabled={loading}
        >
          {loading ? 'Redirecting…' : 'Sign in with Google'}
        </Button>
      </div>
    </div>
  )
}
