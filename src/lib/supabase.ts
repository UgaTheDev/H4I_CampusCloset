import { createBrowserClient } from '@supabase/ssr'

// Browser client — uses document.cookie, singleton by default.
// Used in all client components ('use client').
export const supabase = createBrowserClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
)
