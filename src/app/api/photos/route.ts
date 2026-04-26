import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { requireAdmin } from '@/lib/admin-guard'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const eventId = searchParams.get('eventId')

  const photos = await prisma.galleryPhoto.findMany({
    where: eventId ? { eventId } : undefined,
    orderBy: { createdAt: 'desc' },
  })
  return NextResponse.json({ data: photos })
}

// TODO: support direct file upload via Supabase Storage; for now accept a hosted URL
export async function POST(request: Request) {
  const guard = await requireAdmin()
  if (guard.error) return guard.error

  const body = await request.json()
  const { url, caption, eventId } = body

  if (!url) {
    return NextResponse.json({ error: 'url is required' }, { status: 400 })
  }

  const photo = await prisma.galleryPhoto.create({
    data: { url, caption, eventId },
  })
  return NextResponse.json({ data: photo }, { status: 201 })
}
