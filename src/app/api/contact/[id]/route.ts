// TODO: requireAdmin() on all mutating handlers before wiring to Prisma
import { NextResponse } from 'next/server'
// PUT (update status)
export async function PUT() { return NextResponse.json({ message: 'updated' }) }
