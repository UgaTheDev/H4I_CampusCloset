// TODO: requireAdmin() on all mutating handlers before wiring to Prisma
import { NextResponse } from 'next/server'
// PUT (update), DELETE
export async function PUT() { return NextResponse.json({ message: 'updated' }) }
export async function DELETE() { return NextResponse.json({ message: 'deleted' }) }
