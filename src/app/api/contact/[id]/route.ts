// TODO: requireAdmin() on all mutating handlers before wiring to Prisma
import { NextResponse } from 'next/server'
import { Prisma } from '@prisma/client'
import { prisma } from '@/lib/prisma'
import { createSupabaseServerClient } from '@/lib/supabase-server'

interface UpdateContactBody {
  status?: string
}

// Admin only — update a contact request (e.g. status change)
export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
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

    const { id } = await params
    const body = (await request.json()) as UpdateContactBody
    const { status } = body

    const validStatuses = ['new', 'responded', 'completed']
    if (!status || !validStatuses.includes(status)) {
      return NextResponse.json({ error: 'Invalid status value' }, { status: 400 })
    }

    const contactRequest = await prisma.contactRequest.update({
      where: { id },
      data: { status },
    })

    return NextResponse.json({ data: contactRequest })
  } catch (err) {
    if (err instanceof Prisma.PrismaClientKnownRequestError && err.code === 'P2025') {
      return NextResponse.json({ error: 'Contact request not found' }, { status: 404 })
    }
    return NextResponse.json({ error: 'Failed to update contact request' }, { status: 500 })
  }
}
