import Badge from '@/components/ui/Badge'
import Button from '@/components/ui/Button'
import MissionSection from '@/components/about/MissionSection'
import TeamGrid from '@/components/about/TeamGrid'
import PhotoGallery from '@/components/about/PhotoGallery'
import AboutImpactStats from '@/components/about/AboutImpactStats'

export default function AboutPage() {
  return (
    <>
      <section className="bg-brand-cream px-6 pb-20 pt-16 text-center md:px-12">
        <div className="mx-auto max-w-4xl">
          <div className="mb-6 flex justify-center">
            <Badge variant="outline" className="border-2 rounded-[30px] px-16 py-2.5 text-[18px]">About Us</Badge>
          </div>
          <h1 className="mb-5 font-display text-[48px] leading-[1.05] text-brand-text md:text-[64px]">
            Campus Closet
          </h1>
          <p className="mx-auto max-w-3xl font-body text-[16px] leading-[1.4] text-brand-text/85 md:text-[20px] md:leading-[28px]">
            Est. 2021 | Our mission is to cultivate community and environmental
            responsibility through{' '}
            <span className="font-extrabold">free, sustainable, and circular</span>{' '}
            clothing consumption.
          </p>
        </div>
      </section>

      <div
        className="h-12 border-y-2 border-brand-brown bg-brand-olive-light"
        aria-hidden="true"
      />

      <MissionSection />

      <section className="bg-brand-cream px-6 py-20 md:px-12">
        <div className="mx-auto max-w-6xl">
          <div className="mb-10 text-center">
            <h2 className="mb-3 font-display text-[40px] text-brand-text md:text-[54px]">
              Our Impact
            </h2>
            <p className="font-body text-[20px] leading-[28px] text-brand-text">
              Since our launch, Campus Closet has made significant steps in promoting sustainable fashion.
            </p>
          </div>
          <AboutImpactStats />
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
