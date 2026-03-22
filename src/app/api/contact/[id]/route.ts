import { NextResponse } from 'next/server'
// PUT (update status)
export async function PUT() { return NextResponse.json({ message: 'updated' }) }
