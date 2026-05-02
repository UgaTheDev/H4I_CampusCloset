const pillars = [
  {
    title: 'Free Clothing Swaps',
    description:
      'Exchange clothes with fellow students at no cost, sustainable fashion made easy.',
    bg: 'bg-brand-olive-light',
    iconBg: 'bg-brand-dark-olive',
    icon: (
      <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
      </svg>
    ),
  },
  {
    title: 'Sustainability First',
    description:
      'Keep clothing out of landfills by donating and swapping items on campus.',
    bg: 'bg-brand-lavender-light',
    iconBg: 'bg-brand-lavender',
    icon: (
      <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
  {
    title: 'Student-Run',
    description:
      'Built by students, for students\u2014creating a sustainable campus together.',
    bg: 'bg-brand-blue-light',
    iconBg: 'bg-brand-blue',
    icon: (
      <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
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
            Campus Closet is a sustainability initiative on campus, aiming to
            promote sustainable fashion and circular consumption through free
            clothing swaps on campus.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {pillars.map((pillar) => (
            <div
              key={pillar.title}
              className={`flex flex-col items-center rounded-2xl ${pillar.bg} p-10 text-center`}
            >
              <div
                className={`mb-6 flex h-14 w-14 items-center justify-center rounded-full ${pillar.iconBg}`}
              >
                {pillar.icon}
              </div>
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
