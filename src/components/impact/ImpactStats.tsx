'use client';
import { useState, useEffect } from "react";

interface Impact {
  itemsReused: number;
  itemsDonated: number;
  attendance: number;
  wasteDivertedKg: number;
  waterSavedL: number;
  carbonSavedKg: number;
}

export default function ImpactStats() {
  const [impact, setImpact] = useState<Impact | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchImpact() {
      try {
        const res = await fetch("/api/impact");
        const json = await res.json();
        
        const stats = json?.data?._sum || json;
        setImpact(stats); 
      } catch (err) {
        console.error("Failed to fetch impact:", err);
      } finally {
        setIsLoading(false);
      }
    }

    fetchImpact();
  }, []);

  if (isLoading) {
    return <div className="p-16 text-center" style={{ fontFamily: 'Telegraf, sans-serif' }}>Loading impact data...</div>;
  }

  if (!impact) {
    return <div className="p-16 text-center" style={{ fontFamily: 'Telegraf, sans-serif' }}>No data available.</div>;
  }

  const itemsReused = impact.itemsReused || 0;
  const attendance = impact.attendance || 0;
  const wasteDiverted = impact.wasteDivertedKg || 0;

  return (
    <div className="w-full py-16 px-6 bg-white text-black">
      <div className="max-w-6xl mx-auto flex flex-col lg:flex-row gap-12 lg:gap-16 items-center">
        
        <div className="w-full lg:w-1/2">
          
          <div className="mb-10">
            <h1 style={{ fontFamily: '"Brasika Display", serif' }} className="text-5xl md:text-6xl text-black mb-6 tracking-tight">
              Why it Matters?
            </h1>
            <p style={{ fontFamily: 'Telegraf, sans-serif' }} className="text-lg text-gray-700 leading-relaxed">
              The fashion industry is one of the world&apos;s most polluting industries. Clothing swaps help BU students extend the life of garments, reduce waste, and make sustainable fashion more accessible on campus.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4 md:gap-6" style={{ fontFamily: 'Telegraf, sans-serif' }}>
            
            <div className="rounded-2xl p-6 flex flex-col justify-center" style={{ backgroundColor: '#F3F6F0' }}>
              <h2 className="text-3xl font-bold mb-1" style={{ color: '#526A4A' }}>
                {itemsReused.toLocaleString()}+
              </h2>
              <p className="text-gray-800 text-sm md:text-base font-medium">Clothing Items Swapped</p>
            </div>

            <div className="rounded-2xl p-6 flex flex-col justify-center" style={{ backgroundColor: '#FCF3F2' }}>
              <h2 className="text-3xl font-bold mb-1" style={{ color: '#C64F3C' }}>
                {attendance.toLocaleString()}+
              </h2>
              <p className="text-gray-800 text-sm md:text-base font-medium">Students participated</p>
            </div>

            <div className="rounded-2xl p-6 flex flex-col justify-center" style={{ backgroundColor: '#F4EFE6' }}>
              <h2 className="text-3xl font-bold mb-1" style={{ color: '#8F6642' }}>
                15+
              </h2>
              <p className="text-gray-800 text-sm md:text-base font-medium">Swap Events Hosted</p>
            </div>

            <div className="rounded-2xl p-6 flex flex-col justify-center" style={{ backgroundColor: '#E4DFEC' }}>
              <h2 className="text-3xl font-bold mb-1" style={{ color: '#736184' }}>
                {wasteDiverted.toLocaleString()} lbs
              </h2>
              <p className="text-gray-800 text-sm md:text-base font-medium">Waste Diverted</p>
            </div>

          </div>
        </div>

        <div className="w-full lg:w-1/2">
          {/* Replace 'src' with path to image */}
          <img 
            src="/swap-event.jpg" 
            alt="Students participating in a clothing swap event" 
            className="rounded-3xl w-full h-auto object-cover"
          />
        </div>

      </div>
    </div>
  );
}