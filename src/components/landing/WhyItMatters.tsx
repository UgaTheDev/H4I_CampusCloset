import Image from 'next/image'
import { prisma } from '@/lib/prisma'
import { cn } from '@/lib/cn'

const KG_TO_LBS = 2.20462

function fmt(n: number) {
  return n >= 1000 ? `${(Math.floor(n / 100) * 100).toLocaleString()}+` : `${n}+`
}

export default async function WhyItMatters() {
  const [agg, swapCount] = await Promise.all([
    prisma.impactStats.aggregate({
      _sum: { itemsReused: true, attendance: true, wasteDivertedKg: true },
    }),
    prisma.event.count({ where: { type: 'swap' } }),
  ])

  const items = agg._sum.itemsReused ?? 0
  const attendance = agg._sum.attendance ?? 0
  const wasteLbs = Math.round((agg._sum.wasteDivertedKg ?? 0) * KG_TO_LBS)

  const stats = [
    { value: fmt(items), label: 'Clothing Items Swapped', color: 'text-brand-dark-olive' },
    { value: fmt(attendance), label: 'Students participated', color: 'text-brand-terra' },
    { value: `${swapCount}+`, label: 'Swap Events Hosted', color: 'text-brand-dark-olive' },
    { value: `${wasteLbs} lbs`, label: 'Waste Diverted', color: 'text-brand-terra' },
  ]

  return (
    <section className="bg-white px-6 py-20 md:px-12">
      <div className="mx-auto grid max-w-6xl items-center gap-12 md:grid-cols-2">
        {/* Left side — text + stats */}
        <div>
          <h2 className="mb-4 font-display text-[40px] text-brand-text md:text-[52px]">
            Why it Matters?
          </h2>
          <p className="mb-8 font-body text-[15px] leading-relaxed text-brand-text/70">
            The fashion industry is one of the world&apos;s most polluting
            industries. Clothing swaps help BU students extend the life of
            garments, reduce waste, and make sustainable fashion more
            accessible on campus.
          </p>

          <div className="grid grid-cols-2 gap-3">
            {stats.map((stat) => (
              <div
                key={stat.label}
                className="rounded-xl border border-gray-200 bg-brand-cream px-5 py-4"
              >
                <p className={cn('font-body text-[24px] font-extrabold', stat.color)}>
                  {stat.value}
                </p>
                <p className="font-body text-[13px] text-brand-text/70">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Right side — photo */}
        <div className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-gray-100">
          <Image
            src="/mission.png"
            alt="Campus Closet clothing swap event"
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover"
          />
        </div>
      </div>
    </section>
  )
}
