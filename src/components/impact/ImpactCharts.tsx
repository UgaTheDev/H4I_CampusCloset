'use client';
import { useState, useEffect } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell
} from "recharts";

interface Impact {
  itemsReused: number;
  itemsDonated: number;
  attendance: number;
  wasteDivertedKg: number;
  waterSavedL: number;
  carbonSavedKg: number;
}

export default function ImpactCharts() {
  const [impact, setImpact] = useState<Impact | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchImpact() {
      try {
        const res = await fetch("/api/impact");
        const json = await res.json();
        
        // Based on your backend code, Prisma aggregate returns data inside data._sum
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
    return <div className="p-16 text-center" style={{ fontFamily: 'Telegraf' }}>Loading impact data...</div>;
  }

  if (!impact) {
    return <div className="p-16 text-center" style={{ fontFamily: 'Telegraf' }}>No data available.</div>;
  }

  // Safe fallbacks in case the database returns null for sums
  const itemsReused = impact.itemsReused || 0;
  const attendance = impact.attendance || 0;
  const wasteDiverted = impact.wasteDivertedKg || 0;
  const waterSaved = impact.waterSavedL || 0;

  // Chart Data Preparation
  const operationalData = [
    { name: "Items Reused", value: itemsReused, color: "#DEE8D0" },
    { name: "Items Donated", value: impact.itemsDonated || 0, color: "#CED8E0" },
    { name: "Attendance", value: attendance, color: "#F9F0EE" },
  ];

  const environmentalData = [
    { name: "Waste Diverted (kg)", value: wasteDiverted, color: "#DEE8D0" },
    { name: "Carbon Saved (kg)", value: impact.carbonSavedKg || 0, color: "#CED8E0" },
  ];

  return (
    <div className="w-full py-16 px-6" style={{ backgroundColor: '#FCFBFA', color: '#1a1a1a' }}>
      <div className="max-w-5xl mx-auto">
        
        {/* Header section matching the image */}
        <div className="text-center mb-12">
          <h1 style={{ fontFamily: '"Brasika Display", serif' }} className="text-5xl md:text-6xl text-black">
            Our Impact
          </h1>
          <p style={{ fontFamily: 'Telegraf, sans-serif' }} className="text-lg md:text-xl text-gray-800">
            Since our launch, Campus Closet has made significant steps in promoting sustainable fashion.
          </p>
        </div>

        {/* --- CHARTS SECTION --- */}
        <div className="pt-10 border-t border-gray-200" style={{ fontFamily: 'Telegraf, sans-serif' }}>
          <h2 style={{ fontFamily: '"Brasika Display", serif' }} className="text-3xl mb-8 text-center text-black">
            Visualizing The Change
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            
            {/* Operational Chart */}
            <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
              <h3 className="text-xl font-bold mb-6 text-center text-gray-800">Community Engagement</h3>
              <div className="h-72">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={operationalData} margin={{ top: 20, right: 10, left: -20, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#eee" />
                    <XAxis dataKey="name" tick={{ fill: '#4b5563', fontSize: 12 }} axisLine={false} tickLine={false} />
                    <YAxis tick={{ fill: '#4b5563', fontSize: 12 }} axisLine={false} tickLine={false} />
                    <Tooltip cursor={{ fill: '#f9fafb' }} contentStyle={{ borderRadius: '12px', border: '1px solid #eee', boxShadow: '0 4px 6px rgba(0,0,0,0.05)' }} />
                    <Bar dataKey="value" radius={[6, 6, 0, 0]} maxBarSize={60}>
                      {operationalData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Environmental Chart */}
            <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
              <h3 className="text-xl font-bold mb-6 text-center text-gray-800">Environmental Savings</h3>
              <div className="h-72">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={environmentalData} margin={{ top: 20, right: 10, left: -20, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#eee" />
                    <XAxis dataKey="name" tick={{ fill: '#4b5563', fontSize: 12 }} axisLine={false} tickLine={false} />
                    <YAxis tick={{ fill: '#4b5563', fontSize: 12 }} axisLine={false} tickLine={false} />
                    <Tooltip cursor={{ fill: '#f9fafb' }} contentStyle={{ borderRadius: '12px', border: '1px solid #eee', boxShadow: '0 4px 6px rgba(0,0,0,0.05)' }} />
                    <Bar dataKey="value" radius={[6, 6, 0, 0]} maxBarSize={60}>
                      {environmentalData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

          </div>
        </div>
        
      </div>
    </div>
  );
}