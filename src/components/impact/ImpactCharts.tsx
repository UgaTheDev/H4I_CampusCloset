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

export default function ImpactCharts() {
  const [impact, setImpact] = useState<Impact | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchImpact() {
      try {
        const res = await fetch("/api/impact");
        if (!res.ok) {
          throw new Error(`Impact API failed: ${res.status}`);
        }
        const json = await res.json();
        const stats = json?.data?._sum;

        if (!stats) {
          setImpact(null);
          return;
        }

        setImpact(stats); 
      } catch (err) {
        setImpact(null);
      } finally {
        setIsLoading(false);
      }
    }

    fetchImpact();
  }, []);

  if (isLoading) {
    return <div className="p-16 text-center font-body">Loading impact data...</div>;
  }

  if (!impact) {
    return <div className="p-16 text-center font-body">No data available.</div>;
  }

  const wasteLbs = Math.round((impact.wasteDivertedKg || 0) * 2.20462);
  const waterLiters = Math.round(impact.waterSavedL || 0);
  const carbonKg = Math.round((impact.carbonSavedKg || 0) * 2.20462);


  const roundToTwoSigFigs = (num: number) => Number(num.toPrecision(2));

  // Equivalency Calculations
  // 1 fully packed suitcase ≈ 40 lbs
  const rawSuitcases = wasteLbs / 40;
  // 1 person drinks ≈ 1000 Liters of water per year
  const rawWaterYears = waterLiters / 1000;
  // 1 tree absorbs ≈ 48 lbs of CO2 per year
  const rawTrees = carbonKg / 48;


  const normalize = (raw: number) => (raw <= 0 ? 0 : Math.max(1, roundToTwoSigFigs(raw)));
  const suitcases = normalize(rawSuitcases);
  const waterYears = normalize(rawWaterYears);
  const trees = normalize(rawTrees);

  return (
    <div className="w-full py-12 bg-transparent color-black">
      <div className="max-w-5xl mx-auto">

        {/* --- EQUIVALENCY SECTION --- */}
        <div className="pt-8 border-t border-gray-200 font-body">
          
          <h3 className="text-3xl mb-10 text-center text-black text-brand-text">
            What does that look like?
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            
            {/* Waste Equivalency */}
            <div className="bg-brand-stat-terra p-8 rounded-2xl border border-gray-200 shadow-sm flex flex-col items-center text-center transition-transform hover:-translate-y-1">
              <div className="text-5xl mb-4">🎒</div>
              <h4 className="text-xl font-bold mb-3 text-gray-800">{wasteLbs.toLocaleString()} lbs of waste</h4>
              <p className="text-gray-600 leading-relaxed text-sm">
                Equivalent to the weight of <span className="font-bold text-black">{suitcases.toLocaleString()}+ fully packed suitcases</span> kept out of landfills.
              </p>
            </div>

            {/* Water Equivalency */}
            <div className="bg-brand-faq-active p-8 rounded-2xl border border-gray-200 shadow-sm flex flex-col items-center text-center transition-transform hover:-translate-y-1">
              <div className="text-5xl mb-4">💧</div>
              <h4 className="text-xl font-bold mb-3 text-gray-800">{waterLiters.toLocaleString()} liters of water</h4>
              <p className="text-gray-600 leading-relaxed text-sm">
                Enough drinking water to sustain <span className="font-bold text-black">{waterYears.toLocaleString()}+ people</span> for an entire year.
              </p>
            </div>

            {/* Carbon Equivalency */}
            <div className="bg-brand-stat-green p-8 rounded-2xl border border-gray-200 shadow-sm flex flex-col items-center text-center transition-transform hover:-translate-y-1">
              <div className="text-5xl mb-4">🌱</div>
              <h4 className="text-xl font-bold mb-3 text-gray-800">{carbonKg.toLocaleString()} lbs of CO₂</h4>
              <p className="text-gray-600 leading-relaxed text-sm">
                Equivalent to the carbon absorbed by planting <span className="font-bold text-black">{trees.toLocaleString()}+ trees</span>.
              </p>
            </div>

          </div>
        </div>
        
      </div>
    </div>
  );
}
