// TODO: requireAdmin() on all mutating handlers before wiring to Prisma
import { NextResponse } from 'next/server'
import { Prisma } from '@prisma/client'
import { prisma } from '@/lib/prisma'
import { createSupabaseServerClient } from '@/lib/supabase-server'

interface CreateImpact {
    itemsReused: number
    itemsDonated: number
    attendance: number
    wasteDivertedKg: number
    waterSavedL: number
    carbonSavedKg: number
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

// GET (aggregated stats), POST (add entry)
export async function GET() { 

    // event_id (FK, nullable), items_reused, items_donated, attendance, waste_diverted_kg, water_saved_l, carbon_saved_kg
    try {
        const event = await prisma.impactStats.aggregate({
            _sum: {
                itemsReused: true,
                itemsDonated: true,
                attendance: true,
                wasteDivertedKg: true,
                waterSavedL: true,
                carbonSavedKg: true
            }
        })

        return NextResponse.json({ data: event })
    } catch (err) {
    if (err instanceof Prisma.PrismaClientKnownRequestError && err.code === 'P2025') {
      return NextResponse.json({ error: 'Impact stats not found' }, { status: 404 })
    }
    return NextResponse.json({ error: 'Failed to get impact stats' }, { status: 500 })
  }
}

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

    const body = (await request.json()) as CreateImpact

    const { itemsReused, itemsDonated, attendance, wasteDivertedKg, waterSavedL } = body

    if (typeof itemsReused !== 'number' || !Number.isFinite(itemsReused)) {
      return NextResponse.json({ error: 'items reused must be a finite number' }, { status: 400 })
    }

    if (typeof itemsDonated !== 'number' || !Number.isFinite(itemsDonated)) {
      return NextResponse.json({ error: 'items reused must be a finite number' }, { status: 400 })
    }

    if (typeof attendance !== 'number' || !Number.isFinite(attendance)) {
      return NextResponse.json({ error: 'items reused must be a finite number' }, { status: 400 })
    }

    if (typeof wasteDivertedKg !== 'number' || !Number.isFinite(wasteDivertedKg)) {
      return NextResponse.json({ error: 'items reused must be a finite number' }, { status: 400 })
    }

    if (typeof waterSavedL !== 'number' || !Number.isFinite(waterSavedL)) {
      return NextResponse.json({ error: 'items reused must be a finite number' }, { status: 400 })
    }

    const impact = await prisma.impactStats.create({
      data: {
        itemsReused,
        itemsDonated,
        attendance,
        wasteDivertedKg,
        waterSavedL
      },
    })

    return NextResponse.json({ data: impact }, { status: 201 })
  } catch {
    return NextResponse.json({ error: 'Failed to create impact stats' }, { status: 500 })
  }
}