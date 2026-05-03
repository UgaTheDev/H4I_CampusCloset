import React from 'react';
import Card from '@/components/ui/Card';
import { cn } from '@/lib/cn';

interface Event {
  id: string;
  title: string;
  type: string;
  date: Date;
  location: string;
  description: string;
  itemLimit: number;
  isPast: boolean;
}

interface EventCardProps {
  event: Event;
  colorIndex: number
}

export default function EventCard({ event, colorIndex }: EventCardProps) {
  const formattedDate = event.date.toLocaleString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });

  const colors = [
    "bg-brand-olive-light", "bg-brand-lavender-light", "bg-brand-tan-light"
  ]

  const chosenColor = colors[colorIndex % colors.length]

  
  return (
    <Card className="card-container flex flex-col overflow-hidden rounded-[20px] bg-white font-body shadow-xl">
      <div 
        className={cn("top-placeholder h-40 rounded-t-[20px]", chosenColor)}
      >
        {/* Placeholder background */}
      </div>

      <div className="p-6 flex flex-col text-black">
        <p className="text-sm font-bold text-brand-text">
          {formattedDate}
        </p>

        <h3 className="text-xl font-bold">
          {event.title}
        </h3>

        <p className="text-brand-text/70 text-sm">
          {event.description}
        </p>

        <div className="mt-auto pt-4 border-t border-gray-100 flex flex-col gap-2">
          <p className="flex items-center gap-2 text-brand-text/80 text-sm">
            <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
            </svg>
            <span className="leading-tight">{event.location}</span>
          </p>
        </div>
      </div>
    </Card>
  );
}
