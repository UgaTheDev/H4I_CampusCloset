import EventCalendar from '@/components/events/EventCalendar'
import EventCard from '@/components/events/EventCard'
import SwapVsDrive from '@/components/events/SwapVsDrive'

// Events page — calendar, swap/drive explainer, past event photos
export default function EventsPage() {
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
    <EventCalendar/>
    <EventCard/>
    <SwapVsDrive/>
  </div>)


  // calendar thingy

  // upcoming swaps and drives: join us at our next clothing swap, with up to 3 upcoming events (eventcard)

  // clothing swap vs drive page general guidelines for all events

  // photos from past events 
}
