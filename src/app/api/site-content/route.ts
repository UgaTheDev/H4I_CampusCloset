import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { requireAdmin } from '@/lib/admin-guard'

// GET — list all site content entries
export async function GET() {
  try {
    const entries = await prisma.siteContent.findMany({ orderBy: { key: 'asc' } })
    return NextResponse.json({ data: entries })
  } catch {
    return NextResponse.json({ error: 'Failed to fetch site content' }, { status: 500 })
  }
}

// POST — create or update a site content entry (upsert by key)
export async function POST(request: Request) {
  try {
    const guard = await requireAdmin()
    if (guard.error) return guard.error

    const body = await request.json()
    const { key, value } = body

    if (!key || typeof key !== 'string') {
      return NextResponse.json({ error: 'key is required' }, { status: 400 })
    }
    if (value === undefined || value === null) {
      return NextResponse.json({ error: 'value is required' }, { status: 400 })
    }

    const entry = await prisma.siteContent.upsert({
      where: { key },
      update: { value: String(value) },
      create: { key, value: String(value) },
    })

    return NextResponse.json({ data: entry }, { status: 201 })
  } catch {
    return NextResponse.json({ error: 'Failed to save site content' }, { status: 500 })
  }
}
