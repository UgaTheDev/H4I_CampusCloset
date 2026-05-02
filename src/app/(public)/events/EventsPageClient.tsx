'use client'

import { useEffect, useState } from 'react'
import Badge from '@/components/ui/Badge'
import EventCalendar from '@/components/events/EventCalendar'
import EventCard from '@/components/events/EventCard'
import SwapVsDrive from '@/components/events/SwapVsDrive'

interface Event {
  id: string
  title: string
  type: string
  date: Date
  location: string
  description: string
  itemLimit: number
  isPast: boolean
}

type ApiEvent = Omit<Event, 'date'> & { date: string }

// Events page: calendar, swap/drive explainer, past event photos.
export default function EventsPageClient() {
  const [events, setEvents] = useState<Event[]>([])

  const upcomingEvents = events
    .filter((event) => event.date > new Date())
    .sort((a, b) => a.date.getTime() - b.date.getTime())

  useEffect(() => {
    async function fetchEvents() {
      try {
        const res = await fetch('/api/events')

        if (!res.ok) {
          console.error('Failed to fetch events: Response not OK', res.status)
          setEvents([])
          return
        }

        const events = await res.json()

        if (!events || !events.data || !Array.isArray(events.data)) {
          console.error('Failed to fetch events: Invalid data structure', events)
          setEvents([])
          return
        }

        const parsed: Event[] = events.data.map((e: ApiEvent) => ({
          ...e,
          date: new Date(e.date),
        }))
        setEvents(parsed)
      } catch (err) {
        console.error('Failed to fetch events:', err)
      }
    }

    fetchEvents()
  }, [])

  return (
    <div>
      <div className="m-[50px] text-center">
        <p className="font-display text-[64px]">Events</p>
        <p className="font-body text-[24px]">
          Find upcoming clothing swaps, donation drives, and more campus closet events!
        </p>
        <Badge className="mx-auto mt-2 flex h-[52.17px] w-[342.93px] items-center justify-center border-2 px-2.5 py-2.5 text-center">
          15+ events hosted this semester
        </Badge>
      </div>

      <div className="h-[50px] border-y-2 border-brand-brown bg-brand-olive-light" />

      <EventCalendar events={events} />

      <div className="mx-[50px] mt-[30px]">
        <div className="mb-6">
          <h1 className="font-display text-[40px]">Upcoming Swaps and Drives</h1>
          <p className="font-body">Join us at our next clothing swap!</p>
        </div>

        {upcomingEvents.length > 0 ? (
          <div className="mb-12 grid grid-cols-1 gap-6 md:grid-cols-3">
            {upcomingEvents.slice(0, 3).map((event, index) => (
              <EventCard key={event.id} event={event} colorIndex={index} />
            ))}
          </div>
        ) : (
          <p className="mb-12 font-body text-brand-text/60">
            No upcoming events - check back soon.
          </p>
        )}
      </div>

      <SwapVsDrive />
      <p className="m-10 text-center font-display text-5xl font-bold">
        Photos From Past Events
      </p>
    </div>
  )
}
