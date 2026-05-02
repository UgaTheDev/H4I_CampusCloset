import { prisma } from '@/lib/prisma'

export default async function PhotoGallery() {
  const photos = await prisma.galleryPhoto.findMany({
    orderBy: [{ displayOrder: 'asc' }, { createdAt: 'desc' }],
    take: 12,
  }).catch(() => [])

  if (photos.length === 0) return null

  return (
    <section className="bg-brand-cream px-6 py-20 md:px-12">
      <div className="mx-auto max-w-6xl">
        <div className="mb-10 text-center">
          <h2 className="mb-3 font-display text-[40px] text-brand-text md:text-[48px]">
            See Us in Action
          </h2>
          <p className="font-body text-[15px] text-brand-text/70">
            Moments from past swaps, drives, and community events.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
          {photos.map((photo) => (
            <div
              key={photo.id}
              className="relative aspect-square overflow-hidden rounded-md bg-gray-100"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={photo.url}
                alt={photo.caption ?? 'Campus Closet event photo'}
                className="h-full w-full object-cover transition-transform hover:scale-105"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
