import type { Metadata } from 'next'
import EventsPageClient from './EventsPageClient'
import SwapVsDrive from '@/components/events/SwapVsDrive'

export const revalidate = 60

export const metadata: Metadata = {
  title: 'Events | Campus Closet',
  description: 'Find upcoming Campus Closet clothing swaps, donation drives, and campus events.',
}

export default function EventsPage() {
  return (
    <>
      <EventsPageClient />
      <SwapVsDrive />
      <h2 className="m-10 text-center font-display text-5xl font-bold">
        Photos From Past Events
      </h2>
    </>
  )
}