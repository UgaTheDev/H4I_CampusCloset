// TODO: requireAdmin() on all mutating handlers before wiring to Prisma
import { NextResponse } from 'next/server'
import { Prisma } from '@prisma/client'
import { prisma } from '@/lib/prisma'

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

export async function POST() { return NextResponse.json({ message: 'created' }, { status: 201 }) }