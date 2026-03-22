import { NextResponse } from 'next/server'
// GET (single), PUT (update), DELETE
export async function GET() { return NextResponse.json({ data: null }) }
export async function PUT() { return NextResponse.json({ message: 'updated' }) }
export async function DELETE() { return NextResponse.json({ message: 'deleted' }) }
