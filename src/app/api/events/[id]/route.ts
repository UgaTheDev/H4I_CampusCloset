// TODO: requireAdmin() on all mutating handlers before wiring to Prisma
import { NextResponse } from 'next/server'
import { Prisma } from '@prisma/client'
import { prisma } from '@/lib/prisma'
import { requireAdmin } from '@/lib/admin-guard'

interface UpdateEventBody {
  title?: string
  type?: string
  location?: string
  description?: string
  itemLimit?: number
  isPast?: boolean
}

// GET (single), PUT (update), DELETE
export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) { 
  try {
    const { id } = await params
    
    const event = await prisma.event.findUnique({
      where: { id },
    })

    if (!event) {
      return NextResponse.json({ error: 'Event not found' }, { status: 404 })
    }
    return NextResponse.json({ data: event })
  } catch (err) {
    return NextResponse.json({ error: 'Failed to get event' }, { status: 500 })
  }
}

export async function PUT(request: Request,
  { params }: { params: Promise<{ id: string }> }) { 
    try {
        const authResult = await requireAdmin()
        if (authResult.error) {
            return authResult.error
        }

        const { id } = await params
        const body = (await request.json()) as UpdateEventBody

        const { title, type, location, description, itemLimit, isPast } = body

        const event = await prisma.event.update({
            where: { id },
            data: { title, type, location, description, itemLimit, isPast },
        })

        return NextResponse.json({ data: event })

    } catch (err) {
    if (err instanceof Prisma.PrismaClientKnownRequestError && err.code === 'P2025') {
      return NextResponse.json({ error: 'Event not found' }, { status: 404 })
    }
    return NextResponse.json({ error: 'Failed to get event' }, { status: 500 })
  }
}

export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const authResult = await requireAdmin()
    if (authResult.error) return authResult.error

    const { id } = await params

    await prisma.event.delete({ where: { id } })

    return NextResponse.json({ message: 'Event deleted' })
  } catch (err) {
    if (err instanceof Prisma.PrismaClientKnownRequestError && err.code === 'P2025') {
      return NextResponse.json({ error: 'Event not found' }, { status: 404 })
    }
    return NextResponse.json({ error: 'Failed to delete event' }, { status: 500 })
  }
}