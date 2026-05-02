const pillars = [
  {
    title: 'Free Clothing Swaps',
    description:
      'Bring what you no longer wear, take what you need — no money, no judgment, just swapping.',
  },
  {
    title: 'Sustainability First',
    description:
      'Every swapped garment keeps clothing out of landfills and reduces fast fashion demand.',
  },
  {
    title: 'Student Run',
    description:
      'A community of BU students organizing events, drives, and donations across campus.',
  },
]

export default function WhatIsCampusCloset() {
  return (
    <section className="bg-white px-6 py-20 md:px-12">
      <div className="mx-auto max-w-6xl">
        <div className="mb-12 text-center">
          <h2 className="mb-3 font-display text-[40px] text-brand-text md:text-[52px]">
            What is Campus Closet?
          </h2>
          <p className="mx-auto max-w-2xl font-body text-[15px] text-brand-text/70">
            A student-run sustainability initiative at Boston University promoting
            circular fashion through free, recurring clothing swaps.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {pillars.map((pillar) => (
            <div
              key={pillar.title}
              className="rounded-xl border border-gray-200 bg-brand-cream p-8 text-center"
            >
              <h3 className="mb-3 font-heading text-[18px] font-bold text-brand-text">
                {pillar.title}
              </h3>
              <p className="font-body text-[14px] leading-relaxed text-brand-text/70">
                {pillar.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
