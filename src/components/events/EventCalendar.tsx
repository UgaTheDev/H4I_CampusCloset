'use client';
import { useEffect, useState } from "react";

interface Event {
  title: string;
  type: string;
  date: Date;
  location: string;
  description: string;
  itemLimit: number;
  isPast: boolean;
}

export default function EventCalendar() {
  const [events, setEvents] = useState<Event[]>([]);

  useEffect(() => {
    async function fetchEvents() {
      try {
        const res = await fetch("/api/events");
        const events = await res.json();

        const parsed: Event[] = events.data.map((e: any) => ({
          ...e,
          date: new Date(e.date),
        }));
        console.log(parsed)
        setEvents(parsed);
      } catch (err) {
        console.error("Failed to fetch events:", err);
      }
    }

    fetchEvents();
  }, []);

  return (
    <div>
      {events.map((event, idx) => (
        <div key={idx}>
          <h3>{event.title}</h3>
          <p>{event.type}</p>
          <p>{event.date.toDateString()}</p>
          <p>{event.location}</p>
        </div>
      ))}
    </div>
  );
}