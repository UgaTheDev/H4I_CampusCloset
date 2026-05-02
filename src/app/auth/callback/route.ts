import { createSupabaseServerClient } from '@/lib/supabase-server'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const code = searchParams.get('code')
  const error = searchParams.get('error')

  if (error) {
    return NextResponse.redirect(
      new URL(`/admin/login?error=${encodeURIComponent(error)}`, req.url),
    )
  }

  if (code) {
    const supabase = await createSupabaseServerClient()
    const { error: exchangeError } = await supabase.auth.exchangeCodeForSession(code)
    if (exchangeError) {
      return NextResponse.redirect(new URL('/admin/login?error=auth_failed', req.url))
    }
  }

  return NextResponse.redirect(new URL('/admin', req.url))
}
