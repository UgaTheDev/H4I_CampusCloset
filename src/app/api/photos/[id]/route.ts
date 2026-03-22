import { NextResponse } from 'next/server'
// DELETE
export async function DELETE() { return NextResponse.json({ message: 'deleted' }) }
