// Re-export Prisma-generated types for convenience
// After running `prisma generate`, you can import directly from @prisma/client
// These manual types are provided for components that need lighter type definitions

export type EventType = 'swap' | 'drive' | 'meeting'

export type ContactRequestType = 'pickup' | 'dropoff' | 'general'

export type ContactRequestStatus = 'new' | 'responded' | 'completed'

export interface NavLink {
  label: string
  href: string
}

export interface AdminNavItem {
  label: string
  href: string
  icon: string
}
