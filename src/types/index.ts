// Re-export Prisma-generated types for convenience
// After running `prisma generate`, you can import directly from @prisma/client
// These manual types are provided for components that need lighter type definitions

export type { TeamMember, FaqItem, GalleryPhoto, ContactRequest } from '@prisma/client'

export type EventType = 'swap' | 'drive' | 'meeting'

export type ContactRequestType = 'pickup' | 'dropoff' | 'general'

export type ContactRequestStatus = 'new' | 'responded' | 'completed'

export const FAQ_CATEGORIES = [
  'Participation',
  'Donations',
  'Events & Logistics',
  'Volunteering',
  'General',
] as const

export type FaqCategory = (typeof FAQ_CATEGORIES)[number]

export interface NavLink {
  label: string
  href: string
}

export interface AdminNavItem {
  label: string
  href: string
  icon: string
}
