// TODO: requireAdmin() on all mutating handlers before wiring to Prisma
import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { createSupabaseServerClient } from '@/lib/supabase-server'

interface CreateContactBody {
  name: string
  email: string
  message: string
  type?: string
  preferredLocation?: string
  preferredDate?: string
  preferredTime?: string
}

// Admin only — list all contact requests
export async function GET() {
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

    const requests = await prisma.contactRequest.findMany({
      orderBy: { createdAt: 'desc' },
    })

    return NextResponse.json({ data: requests })
  } catch {
    return NextResponse.json({ error: 'Failed to fetch contact requests' }, { status: 500 })
  }
}

// Public — submit a contact/pickup/dropoff request
export async function POST(request: Request) {
  try {
    const body = (await request.json()) as CreateContactBody
    const { name, email, message, type, preferredLocation, preferredDate, preferredTime } = body

    const nameTrim = name?.trim()
    const emailTrim = email?.trim()
    const messageTrim = message?.trim()

    if (!nameTrim || !emailTrim || !messageTrim) {
      return NextResponse.json({ error: 'name, email, and message are required' }, { status: 400 })
    }

    const validTypes = ['general', 'pickup', 'dropoff']
    const resolvedType = type && validTypes.includes(type) ? type : 'general'

    const contactRequest = await prisma.contactRequest.create({
      data: {
        name: nameTrim,
        email: emailTrim,
        message: messageTrim,
        type: resolvedType,
        preferredLocation: preferredLocation?.trim() ?? null,
        preferredDate: preferredDate?.trim() ?? null,
        preferredTime: preferredTime?.trim() ?? null,
      },
    })

    return NextResponse.json({ data: contactRequest }, { status: 201 })
  } catch {
    return NextResponse.json({ error: 'Failed to submit contact request' }, { status: 500 })
  }
}
