// TODO: requireAdmin() on all mutating handlers before wiring to Prisma
import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { createSupabaseServerClient } from '@/lib/supabase-server'

interface CreateBinBody {
  name: string
  building: string
  latitude: number
  longitude: number
  active?: boolean
}

// Public — fetch all bins (map uses this)
export async function GET() {
  try {
    const bins = await prisma.donationBin.findMany({
      orderBy: { createdAt: 'desc' },
    })
    return NextResponse.json({ data: bins })
  } catch {
    return NextResponse.json({ error: 'Failed to fetch bins' }, { status: 500 })
  }
}

// Admin only — create a new bin
export async function POST(request: Request) {
  try {
    const supabase = await createSupabaseServerClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user?.email) {
      return NextResponse.json({ error: 'Not authenticated' }, { status: 401 })
    }

    const admin = await prisma.adminUser.findUnique({ where: { email: user.email } })
    if (!admin) {
      return NextResponse.json({ error: 'Not admin' }, { status: 403 })
    }

    const body = (await request.json()) as CreateBinBody
    const { name, building, latitude, longitude, active } = body

    if (typeof name !== 'string' || name.trim() === '') {
      return NextResponse.json({ error: 'name must be a non-empty string' }, { status: 400 })
    }
    if (typeof building !== 'string' || building.trim() === '') {
      return NextResponse.json({ error: 'building must be a non-empty string' }, { status: 400 })
    }
    if (!Number.isFinite(latitude)) {
      return NextResponse.json({ error: 'latitude must be a finite number' }, { status: 400 })
    }
    if (!Number.isFinite(longitude)) {
      return NextResponse.json({ error: 'longitude must be a finite number' }, { status: 400 })
    }

    const bin = await prisma.donationBin.create({
      data: {
        name,
        building,
        latitude,
        longitude,
        active: active ?? true,
      },
    })

    return NextResponse.json({ data: bin }, { status: 201 })
  } catch {
    return NextResponse.json({ error: 'Failed to create bin' }, { status: 500 })
  }
}
