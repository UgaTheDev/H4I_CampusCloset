// TODO: requireAdmin() on all mutating handlers before wiring to Prisma
import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { createSupabaseServerClient } from '@/lib/supabase-server'

interface UpdateBinBody {
  name?: string
  building?: string
  latitude?: number
  longitude?: number
  active?: boolean
}

async function requireAdmin(): Promise<{ error: NextResponse } | { error: null }> {
  const supabase = await createSupabaseServerClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user?.email) {
    return { error: NextResponse.json({ error: 'Not authenticated' }, { status: 401 }) }
  }

  const admin = await prisma.adminUser.findUnique({ where: { email: user.email } })
  if (!admin) {
    return { error: NextResponse.json({ error: 'Not admin' }, { status: 403 }) }
  }

  return { error: null }
}

// Admin only — update a bin
export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const authResult = await requireAdmin()
    if (authResult.error) return authResult.error

    const { id } = await params
    const body = (await request.json()) as UpdateBinBody

    const bin = await prisma.donationBin.update({
      where: { id },
      data: body,
    })

    return NextResponse.json({ data: bin })
  } catch {
    return NextResponse.json({ error: 'Failed to update bin' }, { status: 500 })
  }
}

// Admin only — delete a bin
export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const authResult = await requireAdmin()
    if (authResult.error) return authResult.error

    const { id } = await params

    await prisma.donationBin.delete({ where: { id } })

    return NextResponse.json({ message: 'Bin deleted' })
  } catch {
    return NextResponse.json({ error: 'Failed to delete bin' }, { status: 500 })
  }
}
