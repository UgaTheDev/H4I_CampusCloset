import { NextResponse } from 'next/server'
import { Prisma } from '@prisma/client'
import { prisma } from '@/lib/prisma'
import { requireAdmin } from '@/lib/admin-guard'

interface UpdateBinBody {
  name?: string
  building?: string
  latitude?: number
  longitude?: number
  active?: boolean
}

// Admin only — update a bin
export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const guard = await requireAdmin()
    if (guard.error) return guard.error

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
    const guard = await requireAdmin()
    if (guard.error) return guard.error

    const { id } = await params

    await prisma.donationBin.delete({ where: { id } })

    return NextResponse.json({ ok: true })
  } catch (err) {
    if (err instanceof Prisma.PrismaClientKnownRequestError && err.code === 'P2025') {
      return NextResponse.json({ error: 'Bin not found' }, { status: 404 })
    }
    return NextResponse.json({ error: 'Failed to delete bin' }, { status: 500 })
  }
}
