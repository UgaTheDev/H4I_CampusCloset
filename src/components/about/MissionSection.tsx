const pillars = [
  {
    title: 'Sustainability',
    description: 'Reducing textile waste on campus.',
  },
  {
    title: 'Community',
    description: 'Building connections through clothing.',
  },
  {
    title: 'Accessibility',
    description: 'Free clothing for all students.',
  },
]

export default function MissionSection() {
  return (
    <section className="bg-white px-6 py-20 md:px-12">
      <div className="mx-auto grid max-w-6xl items-center gap-10 md:grid-cols-2 md:gap-16">
        <div
          className="aspect-[6/5] overflow-hidden rounded-md bg-brand-tan-light"
          aria-label="Campus Closet community photo"
          role="img"
        />
        {/* TODO: replace placeholder with /public/images/about/mission.jpg once available */}

        <div>
          <p className="mb-4 font-body text-[13px] tracking-[0.18em] text-brand-text/70">
            [ OUR MISSION ]
          </p>
          <h2 className="mb-2 font-heading text-[34px] font-extrabold leading-tight text-brand-text md:text-[40px]">
            REDUCING CONSUMPTION
          </h2>
          <p className="mb-6 font-display text-[26px] italic text-brand-text md:text-[32px]">
            Expanding Access.
          </p>
          <p className="mb-8 font-body text-[15px] leading-relaxed text-brand-text/80">
            Campus Closet was founded on a simple belief: clothing should be shared,
            not wasted. As fast fashion fuels overconsumption and closets overflow,
            many students still struggle to access affordable options. We&apos;re
            working to break that cycle through free, circular clothing swaps that
            extend garment lifespans and reduce textile waste.
          </p>
          <p className="mb-10 font-body text-[15px] leading-relaxed text-brand-text/80">
            By making contribution the currency instead of cash, we strengthen both
            community and environmental responsibility. Now we&apos;re expanding
            beyond Boston University to partner with other campuses and
            organizations, growing access to sustainable, free clothing wherever
            it&apos;s needed.
          </p>

          <div className="grid grid-cols-3 gap-6">
            {pillars.map((pillar) => (
              <div key={pillar.title}>
                <h3 className="mb-1 font-heading text-[14px] font-bold text-brand-text">
                  {pillar.title}
                </h3>
                <p className="font-body text-[12px] leading-snug text-brand-text/70">
                  {pillar.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
