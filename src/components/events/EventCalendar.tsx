'use client';
import { useEffect, useState } from "react";
import { Calendar, dateFnsLocalizer } from "react-big-calendar";

import { format, parse, startOfWeek, getDay } from "date-fns";
import { enUS } from "date-fns/locale/en-US";

interface Event {
  title: string;
  type: string;
  date: Date;
  location: string;
  description: string;
  itemLimit: number;
  isPast: boolean;
}
const locales = {
  "en-US": enUS,
};

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});

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

  const groupedEvents = events.reduce((acc: Record<string, Event[]>, event) => {
    const key = event.date.toDateString();
    if (!acc[key]) acc[key] = [];
    acc[key].push(event);
    return acc;
  }, {});

  function formatHeader(date: Date) {
  return date.toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
  });
}

function formatTime(date: Date) {
  return date.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
  });
}

const calendarEvents = events.map((e) => ({
  title: e.title,
  start: e.date,
  end: e.date, // same-day events
}));

  return (
  <div style={{ backgroundColor: "#ffffff", display: "flex", justifyContent: "space-between", padding: "40px" }}>
    
    <div style={{ width: "60%" }}>
      
      <h1 style={{ fontFamily: "Brasika Display", fontSize: "48px" }}>
        Calendar
      </h1>
      <p style={{ fontFamily: "Telegraf", marginBottom: "30px" }}>
        (February 1 through March 31)
      </p>

      {Object.entries(groupedEvents).map(([dateStr, dayEvents]) => {
        const date = new Date(dateStr);

        return (
          <div key={dateStr} style={{ marginBottom: "30px" }}>
            
            <h2 style={{
              fontFamily: "Telegraf",
              fontWeight: "800",
              fontSize: "20px",
              marginBottom: "10px"
            }}>
              {formatHeader(date)}
            </h2>

            {/* Divider */}
            <div style={{
              borderBottom: "1px solid #ccc",
              marginBottom: "10px"
            }} />

            {/* Events under date */}
            {dayEvents.map((event, idx) => (
              <div key={idx} style={{
                display: "flex",
                gap: "20px",
                marginBottom: "8px"
              }}>
                <span style={{ width: "80px", fontFamily: "Telegraf" }}>
                  {formatTime(event.date)}
                </span>
                <span style={{ fontFamily: "Telegraf" }}>
                  {event.title} ({event.location})
                </span>
              </div>
            ))}
          </div>
        );
      })}
    </div>

    <div
    style={{
      width: "35%",
      height: "500px",
      borderRadius: "12px",
      overflow: "hidden",
    }}
  >
    <Calendar
      localizer={localizer}
      events={calendarEvents}
      startAccessor="start"
      endAccessor="end"
      defaultView="month"
      views={["month"]}
      style={{ height: "100%" }}
    />
  </div>

  </div>
);
}