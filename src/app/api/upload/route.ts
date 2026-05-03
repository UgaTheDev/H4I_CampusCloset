import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import { requireAdmin } from '@/lib/admin-guard'

export async function POST(request: Request) {
  try {
    const supabaseAdmin = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!,
    )

    const guard = await requireAdmin()
    if (guard.error) return guard.error

    const formData = await request.formData()
    const file = formData.get('file') as File | null

    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 })
    }

    const allowed = ['image/jpeg', 'image/png', 'image/webp', 'image/gif']
    if (!allowed.includes(file.type)) {
      return NextResponse.json({ error: 'File must be an image (jpg, png, webp, gif)' }, { status: 400 })
    }

    if (file.size > 5 * 1024 * 1024) {
      return NextResponse.json({ error: 'File must be under 5 MB' }, { status: 400 })
    }

    const MIME_TO_EXT: Record<string, string> = {
      'image/jpeg': 'jpg',
      'image/png': 'png',
      'image/webp': 'webp',
      'image/gif': 'gif',
    }
    const ext = MIME_TO_EXT[file.type] ?? 'jpg'
    const rawFolder = (formData.get('folder') as string) || 'team'
    const ALLOWED_FOLDERS = ['team', 'gallery'] as const
    const folder = (ALLOWED_FOLDERS as readonly string[]).includes(rawFolder) ? rawFolder : 'team'
    const filename = `${folder}/${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`

    const buffer = await file.arrayBuffer()
    const { error } = await supabaseAdmin.storage
      .from('photos')
      .upload(filename, buffer, { contentType: file.type, upsert: false })

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    const { data } = supabaseAdmin.storage.from('photos').getPublicUrl(filename)
    return NextResponse.json({ url: data.publicUrl }, { status: 201 })
  } catch {
    return NextResponse.json({ error: 'Failed to upload file' }, { status: 500 })
  }
}

export async function DELETE(request: Request) {
  try {
    const supabaseAdmin = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!,
    )

    const guard = await requireAdmin()
    if (guard.error) return guard.error

    const { url } = await request.json()
    if (!url) return NextResponse.json({ error: 'No url provided' }, { status: 400 })

    const baseUrl = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/photos/`
    if (!url.startsWith(baseUrl)) {
      return NextResponse.json({ error: 'Invalid url' }, { status: 400 })
    }

    const path = url.slice(baseUrl.length)
    const { error } = await supabaseAdmin.storage.from('photos').remove([path])
    if (error) return NextResponse.json({ error: error.message }, { status: 500 })
    return NextResponse.json({ ok: true })
  } catch {
    return NextResponse.json({ error: 'Failed to delete file' }, { status: 500 })
  }
}
