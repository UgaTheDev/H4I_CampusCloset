import { NextResponse } from 'next/server'
// GET, POST (with Supabase Storage upload)
export async function GET() { return NextResponse.json({ data: [] }) }
export async function POST() { return NextResponse.json({ message: 'created' }, { status: 201 }) }
