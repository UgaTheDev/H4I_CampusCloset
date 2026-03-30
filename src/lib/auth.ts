import { supabase } from './supabase'

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'

/** Initiate Google OAuth sign-in via Supabase */
export async function signInWithGoogle() {
  return supabase.auth.signInWithOAuth({
    provider: 'google',
    options: { redirectTo: `${SITE_URL}/auth/callback` },
  })
}

/** Sign out the current user */
export async function signOut() {
  return supabase.auth.signOut()
}
