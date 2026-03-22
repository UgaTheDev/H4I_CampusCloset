import { createClient } from '@supabase/supabase-js'

// NOTE: Google OAuth must be enabled in Supabase Dashboard:
// Authentication > Providers > Google
// You need a Google Cloud OAuth client ID and secret configured there.

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL ?? ''
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? ''
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY ?? ''

// Browser client — safe to use in client components
export const supabase = createClient(supabaseUrl || 'https://placeholder.supabase.co', supabaseAnonKey || 'placeholder')

// Server client — uses service role key, only use in API routes / server components
export const supabaseAdmin = createClient(supabaseUrl || 'https://placeholder.supabase.co', supabaseServiceKey || 'placeholder')
