import { NextResponse } from 'next/server'
import { Prisma } from '@prisma/client'
import { prisma } from '@/lib/prisma'
import { requireAdmin } from '@/lib/admin-guard'

type RouteContext = { params: Promise<{ id: string }> }

export async function GET(_request: Request, { params }: RouteContext) {
  try {
    const { id } = await params
    const stats = await prisma.impactStats.findUnique({ where: { id } })
    if (!stats) return NextResponse.json({ error: 'Not found' }, { status: 404 })
    return NextResponse.json({ data: stats })
  } catch {
    return NextResponse.json({ error: 'Failed to fetch impact stats' }, { status: 500 })
  }
}

export async function PATCH(request: Request, { params }: RouteContext) {
  const guard = await requireAdmin()
  if (guard.error) return guard.error

  const { id } = await params
  const body = await request.json()
  const { itemsReused, itemsDonated, attendance, wasteDivertedKg, waterSavedL, carbonSavedKg, eventId } = body

  try {
    const stats = await prisma.impactStats.update({
      where: { id },
      data: { itemsReused, itemsDonated, attendance, wasteDivertedKg, waterSavedL, carbonSavedKg, eventId },
    })
    return NextResponse.json({ data: stats })
  } catch (err) {
    if (err instanceof Prisma.PrismaClientKnownRequestError && err.code === 'P2025') {
      return NextResponse.json({ error: 'Not found' }, { status: 404 })
    }
    return NextResponse.json({ error: 'Failed to update impact stats' }, { status: 500 })
  }
}

export async function DELETE(_request: Request, { params }: RouteContext) {
  const guard = await requireAdmin()
  if (guard.error) return guard.error

  const { id } = await params
  try {
    await prisma.impactStats.delete({ where: { id } })
    return NextResponse.json({ ok: true })
  } catch (err) {
    if (err instanceof Prisma.PrismaClientKnownRequestError && err.code === 'P2025') {
      return NextResponse.json({ error: 'Not found' }, { status: 404 })
    }
    return NextResponse.json({ error: 'Failed to delete impact stats' }, { status: 500 })
  }
}
