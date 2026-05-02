import { prisma } from '@/lib/prisma'
import Button from '@/components/ui/Button'

const CARD_COLORS = [
  'bg-brand-olive-light',
  'bg-brand-lavender-light',
  'bg-brand-tan-light',
]

function formatDate(date: Date) {
  return date.toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  })
}

export default async function UpcomingEventsPreview() {
  const events = await prisma.event.findMany({
    where: { isPast: false },
    orderBy: { date: 'asc' },
    take: 3,
  })

  if (events.length === 0) return null

  return (
    <section className="bg-brand-cream px-6 py-20 md:px-12">
      <div className="mx-auto max-w-5xl text-center">
        <h2 className="mb-2 font-display text-[40px] text-brand-text md:text-[52px]">
          Upcoming Events
        </h2>
        <p className="mb-12 font-body text-[15px] text-brand-text/70">
          Join us at our next clothing swap
        </p>

        <div className="mb-10 grid gap-6 md:grid-cols-3">
          {events.map((event, i) => (
            <div
              key={event.id}
              className="overflow-hidden rounded-2xl border-2 border-brand-text bg-white text-left"
            >
              {/* Colored top section with calendar icon */}
              <div
                className={`flex h-40 items-center justify-center ${CARD_COLORS[i % CARD_COLORS.length]}`}
              >
                <svg
                  className="h-12 w-12 text-brand-text/30"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={1.5}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M8.25 15h7.5M8.25 12h7.5"
                  />
                </svg>
              </div>

              {/* Card content */}
              <div className="p-5">
                <p className="mb-1 font-body text-[12px] text-brand-text/50">
                  {formatDate(event.date)}
                </p>
                <h3 className="mb-2 font-heading text-[16px] font-bold text-brand-text">
                  {event.title}
                </h3>
                <p className="mb-3 font-body text-[13px] leading-relaxed text-brand-text/60 line-clamp-2">
                  {event.description}
                </p>
                <div className="flex items-center gap-1.5 text-brand-text/50">
                  <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                  </svg>
                  <span className="font-body text-[12px]">{event.location}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        <Button variant="dark" href="/events">
          View Full Calendar
        </Button>
      </div>
    </section>
  )
}
