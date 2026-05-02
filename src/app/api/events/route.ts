// TODO: requireAdmin() on all mutating handlers before wiring to Prisma
import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { createSupabaseServerClient } from '@/lib/supabase-server'

interface CreateEvent {
    title: string
    type: string
    date: Date
    location: string
    description: string
    itemLimit: number
    isPast: boolean
}

// GET (list/filter), POST (create)
export async function GET() { 
    try {
        const events = await prisma.event.findMany({
        orderBy: { createdAt: 'desc' },
        where: { isPast: false }
        })
        return NextResponse.json({ data: events })
    } catch {
        return NextResponse.json({ error: 'Failed to fetch events' }, { status: 500 })
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

    const body = (await request.json()) as CreateEvent

    const { title, type, date, location, description, itemLimit, isPast } = body

    if (typeof title !== 'string' || title.trim() === '') {
      return NextResponse.json({ error: 'title must be a non-empty string' }, { status: 400 })
    }

    if (typeof type !== 'string' || type.trim() === '') {
      return NextResponse.json({ error: 'type must be a non-empty string' }, { status: 400 })
    }
    if (typeof location !== 'string' || location.trim() === '') {
      return NextResponse.json({ error: 'location must be a non-empty string' }, { status: 400 })
    }

    if (typeof description !== 'string' || description.trim() === '') {
      return NextResponse.json({ error: 'description must be a non-empty string' }, { status: 400 })
    }
    if (!Number.isFinite(itemLimit)) {
      return NextResponse.json({ error: 'itemLimit must be a finite number' }, { status: 400 })
    }

    const event = await prisma.event.create({
      data: {
        title,
        type,
        date,
        location,
        description,
        itemLimit,
        isPast
      },
    })

    return NextResponse.json({ data: event }, { status: 201 })
  } catch {
    return NextResponse.json({ error: 'Failed to create event' }, { status: 500 })
  }
}