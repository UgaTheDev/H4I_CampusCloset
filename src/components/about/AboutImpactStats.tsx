import { prisma } from '@/lib/prisma'
import { cn } from '@/lib/cn'
import ImpactCharts from '@/components/impact/ImpactCharts'

const KG_TO_LBS = 2.20462

function fmt(n: number, unit?: string) {
  const rounded = n >= 1000 ? `${(Math.floor(n / 100) * 100).toLocaleString()}+` : `${n}+`
  return unit ? `${rounded} ${unit}` : rounded
}

export default async function AboutImpactStats() {
  const [agg, swapCount] = await Promise.all([
    prisma.impactStats.aggregate({
      _sum: { itemsReused: true, attendance: true, wasteDivertedKg: true, waterSavedL: true, carbonSavedKg: true },
    }).catch(() => ({ _sum: { itemsReused: 0, attendance: 0, wasteDivertedKg: 0, waterSavedL: 0, carbonSavedKg: 0 } })),
    prisma.event.count({ where: { type: 'swap' } }).catch(() => 0),
  ])

  const items = agg._sum.itemsReused ?? 0
  const attendance = agg._sum.attendance ?? 0
  const wasteLbs = Math.round((agg._sum.wasteDivertedKg ?? 0) * KG_TO_LBS)
  const carbonLbs = Math.round((agg._sum.carbonSavedKg ?? 0) * KG_TO_LBS)
  const waterSavedL = Math.round(agg._sum.waterSavedL ?? 0)

  const cards = [
    { value: fmt(items), label: 'Clothing Items Swapped', bgClass: 'bg-brand-stat-green', colorClass: 'text-brand-dark-olive' },
    { value: `${swapCount}+`, label: 'Swap Events Hosted', bgClass: 'bg-brand-stat-tan', colorClass: 'text-brand-brown-light' },
    { value: `${wasteLbs} lbs`, label: 'Waste Diverted', bgClass: 'bg-brand-stat-green', colorClass: 'text-brand-dark-olive' },
    { value: fmt(attendance), label: 'Students Participated', bgClass: 'bg-brand-stat-terra', colorClass: 'text-brand-terra' },
    { value: `${carbonLbs} lbs`, label: 'Carbon Saved', bgClass: 'bg-brand-stat-green', colorClass: 'text-brand-dark-olive' },
    { value: `${waterSavedL.toLocaleString()} liters`, label: 'Water Saved', bgClass: 'bg-brand-faq-active', colorClass: 'text-brand-blue' },
  ]

  return (
    <div className="w-full">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {cards.map((card) => (
          <div
            key={card.label}
            className={cn('overflow-hidden rounded-[15px] border-2 border-brand-text px-6 py-6', card.bgClass)}
          >
            <p className={cn('mb-1 font-body text-[28px] font-extrabold leading-[40px] md:text-[36px]', card.colorClass)}>
              {card.value}
            </p>
            <p className="font-body text-[14px] text-brand-text md:text-[16px]">
              {card.label}
            </p>
          </div>
        ))}
      </div>
      <ImpactCharts/>
    </div>
  )
}
