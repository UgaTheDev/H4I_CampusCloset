import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { requireAdmin } from '@/lib/admin-guard'

export async function GET() {
  const members = await prisma.teamMember.findMany({
    orderBy: [{ displayOrder: 'asc' }, { createdAt: 'desc' }],
  })
  return NextResponse.json({ data: members })
}

export async function POST(request: Request) {
  const guard = await requireAdmin()
  if (guard.error) return guard.error

  const body = await request.json()
  const { name, role, bio, photoUrl, displayOrder } = body

  if (!name || !role) {
    return NextResponse.json({ error: 'name and role are required' }, { status: 400 })
  }

  const member = await prisma.teamMember.create({
    data: { name, role, bio, photoUrl, displayOrder: displayOrder ?? 0 },
  })
  return NextResponse.json({ data: member }, { status: 201 })
}
