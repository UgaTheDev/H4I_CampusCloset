import { prisma } from '@/lib/prisma'

const KG_TO_LBS = 2.20462

function fmt(n: number, unit?: string) {
  const rounded = n >= 1000 ? `${(Math.floor(n / 100) * 100).toLocaleString()}+` : `${n}+`
  return unit ? `${rounded} ${unit}` : rounded
}

export default async function AboutImpactStats() {
  const [agg, swapCount] = await Promise.all([
    prisma.impactStats.aggregate({
      _sum: { itemsReused: true, attendance: true, wasteDivertedKg: true },
    }),
    prisma.event.count({ where: { type: 'swap' } }),
  ])

  const items = agg._sum.itemsReused ?? 0
  const attendance = agg._sum.attendance ?? 0
  const wasteLbs = Math.round((agg._sum.wasteDivertedKg ?? 0) * KG_TO_LBS)

  const cards = [
    { value: fmt(items), label: 'Clothing Items Swapped', bgClass: 'bg-brand-stat-green', colorClass: 'text-brand-dark-olive' },
    { value: `${swapCount}+`, label: 'Swap Events Hosted', bgClass: 'bg-brand-stat-tan', colorClass: 'text-brand-brown-light' },
    { value: `${wasteLbs} lbs`, label: 'Waste Diverted', bgClass: 'bg-brand-stat-green', colorClass: 'text-brand-dark-olive' },
    { value: fmt(attendance), label: 'Students Participated', bgClass: 'bg-brand-stat-terra', colorClass: 'text-brand-terra' },
  ]

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
      {cards.map((card) => (
        <div
          key={card.label}
          className={`overflow-hidden rounded-[15px] border-2 border-brand-text px-6 py-6 ${card.bgClass}`}
        >
          <p className={`mb-1 font-body text-[28px] font-extrabold leading-[40px] md:text-[36px] ${card.colorClass}`}>
            {card.value}
          </p>
          <p className="font-body text-[14px] text-brand-text md:text-[16px]">
            {card.label}
          </p>
        </div>
      ))}
    </div>
  )
}
