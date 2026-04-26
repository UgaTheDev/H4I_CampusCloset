import { NextResponse } from 'next/server'
import { createSupabaseServerClient } from './supabase-server'
import { prisma } from './prisma'

export async function requireAdmin() {
  const supabase = await createSupabaseServerClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user?.email) {
    return {
      error: NextResponse.json({ error: 'Not authenticated' }, { status: 401 }),
    }
  }

  const admin = await prisma.adminUser.findUnique({ where: { email: user.email } })
  if (!admin) {
    return { error: NextResponse.json({ error: 'Not admin' }, { status: 403 }) }
  }

  return { user }
}
