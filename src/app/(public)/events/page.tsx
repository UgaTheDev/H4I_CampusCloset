'use client';
import EventCalendar from '@/components/events/EventCalendar'
import EventCard from '@/components/events/EventCard'
import SwapVsDrive from '@/components/events/SwapVsDrive'

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

// Events page — calendar, swap/drive explainer, past event photos
export default function EventsPage() {
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
    <div className="text-center">
      <p style={{ fontFamily: 'Brasika Display', fontSize: 64 }}>Events</p>
      <p style={{ fontFamily: 'Telegraf', fontSize: 24}}>Find upcoming clothing swaps, donation drives, and more campus closet events!</p>
      <div
      style={{
        margin: "auto",
        backgroundColor: "#ffffff",
        width: "342.93px",
        height: "52.17px",
        gap: "10px",
        borderColor: "black",
        borderRadius: "30px",
        borderWidth: "2px",
        borderStyle: "solid",
        padding: "10px",
        opacity: 1,
      }}
      >
        <span>x+ events hosted this semester</span>
      </div>
    </div>
    <div
      style={{
        height: "50px",
        backgroundColor: "#C1CEBF",
        borderWidth: "2px 0px",
        borderStyle: "solid",
        borderColor: "#4D3A29",
      }}
    />
    <EventCalendar events={events}/>
    <h1 style={{ fontFamily: "Brasika Display", fontSize: "40px" }}>Upcoming Swaps and Drives</h1>
    <p style={{ fontFamily: "Telegraf" }}>Join us at our next clothing swap!</p>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
      {events.slice(0, 3).map((e, index) => (
        <EventCard key={index} event={e} />
      ))}
    </div>
    
    <SwapVsDrive/>
  </div>)


  // photos from past events 
}
