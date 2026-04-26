import Image from 'next/image'
import { prisma } from '@/lib/prisma'
import { cn } from '@/lib/cn'

const ROTATIONS = ['-rotate-2', 'rotate-1', '-rotate-1', 'rotate-2']

export default async function TeamGrid() {
  const members = await prisma.teamMember.findMany({
    orderBy: [{ displayOrder: 'asc' }, { createdAt: 'desc' }],
  })

  const slots = members.length > 0 ? members : Array.from({ length: 12 }, (_, i) => null)

  return (
    <section className="bg-white px-6 py-20 md:px-12">
      <div className="mx-auto max-w-6xl">
        <div className="mb-12 text-center">
          <h2 className="mb-3 font-display text-[40px] text-brand-text md:text-[52px]">
            Meet the E-Board
          </h2>
          <p className="font-body text-[15px] text-brand-text/70">
            A dedicated team of students passionate about sustainability, fashion, and community.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 md:grid-cols-4">
          {slots.map((member, i) => (
            <div
              key={member?.id ?? i}
              className={cn(
                'aspect-[4/5] overflow-hidden rounded-sm bg-white shadow-md transition-transform',
                ROTATIONS[i % ROTATIONS.length],
              )}
            >
              {member?.photoUrl ? (
                <div className="relative h-full w-full">
                  <Image
                    src={member.photoUrl}
                    alt={member.name}
                    fill
                    sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, 25vw"
                    className="object-cover"
                  />
                  <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent p-3">
                    <p className="font-heading text-[13px] font-bold text-white">
                      {member.name}
                    </p>
                    <p className="font-body text-[11px] text-white/90">{member.role}</p>
                  </div>
                </div>
              ) : (
                <div className="h-full w-full bg-gray-100" />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
