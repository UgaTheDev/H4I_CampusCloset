import { NextResponse } from 'next/server'
// PUT, DELETE
export async function PUT() { return NextResponse.json({ message: 'updated' }) }
export async function DELETE() { return NextResponse.json({ message: 'deleted' }) }
