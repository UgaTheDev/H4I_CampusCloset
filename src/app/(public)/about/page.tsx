import type { Metadata } from 'next'
import Badge from '@/components/ui/Badge'

export const revalidate = 60

export const metadata: Metadata = {
  title: 'About | Campus Closet',
  description:
    'Learn about Campus Closet — our mission, impact, and the team behind BU\'s sustainability-focused clothing swap initiative.',
}
import Button from '@/components/ui/Button'
import MissionSection from '@/components/about/MissionSection'
import TeamGrid from '@/components/about/TeamGrid'
import PhotoGallery from '@/components/about/PhotoGallery'
import ImpactStats from '@/components/impact/ImpactStats'

export default function AboutPage() {
  return (
    <>
      <section className="bg-brand-cream px-6 py-20 text-center md:px-12">
        <div className="mx-auto max-w-3xl">
          <div className="mb-6 flex justify-center">
            <Badge variant="outline">About Us</Badge>
          </div>
          <h1 className="mb-4 font-display text-[56px] leading-tight text-brand-text md:text-[80px]">
            Campus Closet
          </h1>
          <p className="font-body text-[15px] leading-relaxed text-brand-text/80">
            Est. 2021 | Our mission is to cultivate community and environmental
            responsibility through{' '}
            <span className="font-bold">free, sustainable, and circular</span>{' '}
            clothing consumption.
          </p>
        </div>
      </section>

      <MissionSection />

      <section className="bg-brand-cream px-6 py-20 md:px-12">
        <div className="mx-auto max-w-5xl">
          <div className="mb-10 text-center">
            <h2 className="mb-3 font-display text-[40px] text-brand-text md:text-[52px]">
              Our Impact
            </h2>
            <p className="font-body text-[15px] text-brand-text/70">
              Since our launch, Campus Closet has made significant steps in promoting sustainable fashion.
            </p>
          </div>
          <ImpactStats />
        </div>
      </section>

      <TeamGrid />

      <section className="bg-brand-olive px-6 py-20 text-center md:px-12">
        <div className="mx-auto max-w-3xl">
          <h2 className="mb-4 font-display text-[40px] text-white md:text-[48px]">
            Want to join the team?
          </h2>
          <p className="mb-8 font-body text-[15px] leading-relaxed text-white/85">
            We&apos;re always looking for passionate students to help organize swaps,
            run drives, and grow the Campus Closet community. Applications open each
            semester.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button variant="secondary" href="/contact">
              Get in Touch
            </Button>
            <Button variant="dark" href="/events">
              See Our Events
            </Button>
          </div>
        </div>
      </section>

      <PhotoGallery />
    </>
  )
}
