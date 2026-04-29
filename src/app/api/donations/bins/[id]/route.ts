// TODO: requireAdmin() on all mutating handlers before wiring to Prisma
import { NextResponse } from 'next/server'
import { Prisma } from '@prisma/client'
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
    const { name, building, latitude, longitude, active } = body

    if (name !== undefined && (typeof name !== 'string' || name.trim() === '')) {
      return NextResponse.json({ error: 'name must be a non-empty string' }, { status: 400 })
    }
    if (building !== undefined && (typeof building !== 'string' || building.trim() === '')) {
      return NextResponse.json({ error: 'building must be a non-empty string' }, { status: 400 })
    }
    if (latitude !== undefined && !Number.isFinite(latitude)) {
      return NextResponse.json({ error: 'latitude must be a finite number' }, { status: 400 })
    }
    if (longitude !== undefined && !Number.isFinite(longitude)) {
      return NextResponse.json({ error: 'longitude must be a finite number' }, { status: 400 })
    }
    if (active !== undefined && typeof active !== 'boolean') {
      return NextResponse.json({ error: 'active must be a boolean' }, { status: 400 })
    }

    const bin = await prisma.donationBin.update({
      where: { id },
      data: { name, building, latitude, longitude, active },
    })

    return NextResponse.json({ data: bin })
  } catch (err) {
    if (err instanceof Prisma.PrismaClientKnownRequestError && err.code === 'P2025') {
      return NextResponse.json({ error: 'Bin not found' }, { status: 404 })
    }
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
  } catch (err) {
    if (err instanceof Prisma.PrismaClientKnownRequestError && err.code === 'P2025') {
      return NextResponse.json({ error: 'Bin not found' }, { status: 404 })
    }
    return NextResponse.json({ error: 'Failed to delete bin' }, { status: 500 })
  }
}
