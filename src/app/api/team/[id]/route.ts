import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { requireAdmin } from '@/lib/admin-guard'

type RouteContext = { params: Promise<{ id: string }> }

export async function GET(_request: Request, { params }: RouteContext) {
  const { id } = await params
  const member = await prisma.teamMember.findUnique({ where: { id } })
  if (!member) return NextResponse.json({ error: 'Not found' }, { status: 404 })
  return NextResponse.json({ data: member })
}

export async function PATCH(request: Request, { params }: RouteContext) {
  const guard = await requireAdmin()
  if (guard.error) return guard.error

  const { id } = await params
  const body = await request.json()
  const { name, role, bio, photoUrl, displayOrder } = body

  try {
    const member = await prisma.teamMember.update({
      where: { id },
      data: { name, role, bio, photoUrl, displayOrder },
    })
    return NextResponse.json({ data: member })
  } catch {
    return NextResponse.json({ error: 'Not found' }, { status: 404 })
  }
}

export async function DELETE(_request: Request, { params }: RouteContext) {
  const guard = await requireAdmin()
  if (guard.error) return guard.error

  const { id } = await params
  try {
    await prisma.teamMember.delete({ where: { id } })
    return NextResponse.json({ ok: true })
  } catch {
    return NextResponse.json({ error: 'Not found' }, { status: 404 })
  }
}
