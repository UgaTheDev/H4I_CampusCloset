// TODO: requireAdmin() on all mutating handlers before wiring to Prisma
import { NextResponse } from 'next/server'
import { Prisma } from '@prisma/client'
import { prisma } from '@/lib/prisma'
import { createSupabaseServerClient } from '@/lib/supabase-server'

interface UpdateEventBody {
  title?: string
  type?: string
  location?: string
  description?: string
  itemLimit?: number
  isPast?: Boolean
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

// GET (single), PUT (update), DELETE
export async function GET(_request: Request,
    { params }: { params: Promise<{ id: string }> }) { 
    try {
        const { id } = await params
        
        const event = await prisma.event.findMany({
            where: { id },
        })

        return NextResponse.json({ data: event })
    } catch (err) {
    if (err instanceof Prisma.PrismaClientKnownRequestError && err.code === 'P2025') {
      return NextResponse.json({ error: 'Event not found' }, { status: 404 })
    }
    return NextResponse.json({ error: 'Failed to get bin' }, { status: 500 })
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

        const { title, type, location, description, itemLimit } = body

        const event = await prisma.event.update({
            where: { id },
            data: { title, type, location, description, itemLimit },
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