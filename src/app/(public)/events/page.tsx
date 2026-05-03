import type { Metadata } from 'next'
import EventsPageClient from './EventsPageClient'

export const metadata: Metadata = {
  title: 'Events | Campus Closet',
  description: 'Find upcoming Campus Closet clothing swaps, donation drives, and campus events.',
}

export default function EventsPage() {
  return <EventsPageClient />
}