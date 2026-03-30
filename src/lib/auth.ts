import { supabase } from './supabase'
import { prisma } from './prisma'

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'

/** Initiate Google OAuth sign-in via Supabase, redirecting to /admin on success */
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

/** Get the current user from the Supabase session, or null */
export async function getCurrentUser() {
  const { data: { session } } = await supabase.auth.getSession()
  return session?.user ?? null
}

/** Check if the given email exists in the AdminUser table */
export async function requireAdmin(email: string): Promise<boolean> {
  const admin = await prisma.adminUser.findUnique({
    where: { email },
  })
  return !!admin
}
