'use client';
import { useState } from "react";
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

interface EventCalendarProps {
  events: Event[];
}

export default function EventCalendar({ events }: EventCalendarProps) {
  // 1. Add state to track the currently viewed date on the calendar
  const [currentDate, setCurrentDate] = useState(new Date());

  // 2. Filter events to only include those in the currently viewed month and year
  const currentMonthEvents = events.filter((event) => {
    return (
      event.date.getMonth() === currentDate.getMonth() &&
      event.date.getFullYear() === currentDate.getFullYear()
    );
  });

  // 3. Group ONLY the filtered events
  const groupedEvents = currentMonthEvents.reduce((acc: Record<string, Event[]>, event) => {
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

  // The calendar itself can take all events; it automatically only shows what's in view
  const calendarEvents = events.map((e) => ({
    title: e.title,
    start: e.date,
    end: e.date,
  }));

  // Helper to dynamically show the current month in the subtitle
  const currentMonthString = currentDate.toLocaleString('default', { month: 'long', year: 'numeric' });

  return (
    <div style={{ backgroundColor: "#ffffff", display: "flex", justifyContent: "space-between", padding: "40px" }}>
      
      <div style={{ width: "60%" }}>
        <h1 style={{ fontFamily: "Brasika Display", fontSize: "48px", marginBottom: "0px" }}>
          Calendar
        </h1>
        {/* Update subtitle to dynamically show the currently viewed month */}
        <p style={{ fontFamily: "Telegraf", marginBottom: "30px", color: "#666" }}>
          (Events for {currentMonthString})
        </p>

        {Object.keys(groupedEvents).length === 0 && (
          <p style={{ fontFamily: "Telegraf", color: "#888" }}>
            No events scheduled for this month.
          </p>
        )}

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

              <div style={{
                borderBottom: "1px solid #ccc",
                marginBottom: "10px"
              }} />

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
          // 4. Bind the calendar to our state variables
          date={currentDate}
          onNavigate={(newDate) => setCurrentDate(newDate)}
          style={{ height: "100%", fontFamily: "Telegraf" }}
        />
      </div>

    </div>
  );
}