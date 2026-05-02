import React from 'react';

interface Event {
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
}

export default function EventCard({ event }: EventCardProps) {
  const formattedDate = event.date.toLocaleString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });

  
  return (
    <div 
      className="card-container flex flex-col overflow-hidden bg-white"
      style={{ 
        boxShadow: "1px 1px 1px 1px", 
        borderRadius: "20px", 
        fontFamily: "Telegraf, sans-serif"
      }}
    >
      <div 
        className="top-placeholder h-40 bg-gray-100" 
        style={{ borderRadius: "20px 20px 0 0" }}
      >
        {/* Placeholder background */}
      </div>

      <div className="content-area p-6 flex flex-col gap-4 text-black">
        <p className="text-sm font-bold text-gray-800">
          {formattedDate}
        </p>

        <h3 className="text-xl font-bold leading-tight">
          {event.title}
        </h3>

        <p className="text-gray-600 text-sm leading-relaxed">
          {event.description}
        </p>

        <div className="mt-auto pt-4 border-t border-gray-100 flex flex-col gap-2">
          <p className="flex items-center gap-2 text-gray-700 text-sm">
            <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
            </svg>
            <span className="leading-tight">{event.location}</span>
          </p>
        </div>
      </div>
    </div>
  );
}