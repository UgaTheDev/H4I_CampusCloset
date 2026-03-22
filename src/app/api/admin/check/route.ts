import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

/** GET /api/admin/check?email=... — Check if email is an admin */
export async function GET(req: NextRequest) {
  const email = req.nextUrl.searchParams.get('email')
  if (!email) return NextResponse.json({ error: 'Missing email' }, { status: 400 })

  const admin = await prisma.adminUser.findUnique({ where: { email } })
  if (!admin) return NextResponse.json({ error: 'Not admin' }, { status: 403 })

  return NextResponse.json({ ok: true })
}
