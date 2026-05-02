// TODO: requireAdmin() on all mutating handlers before wiring to Prisma
import { NextResponse } from 'next/server'
// GET (aggregated stats), POST (add entry)
export async function GET() { return NextResponse.json({ data: [] }) }
export async function POST() { return NextResponse.json({ message: 'created' }, { status: 201 }) }
