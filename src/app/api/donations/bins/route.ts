import { NextResponse } from 'next/server'
// GET (active bins), POST (create bin)
export async function GET() { return NextResponse.json({ data: [] }) }
export async function POST() { return NextResponse.json({ message: 'created' }, { status: 201 }) }
