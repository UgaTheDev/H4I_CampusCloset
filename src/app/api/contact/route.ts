import { NextResponse } from 'next/server'
// GET (list requests), POST (submit form)
export async function GET() { return NextResponse.json({ data: [] }) }
export async function POST() { return NextResponse.json({ message: 'created' }, { status: 201 }) }
