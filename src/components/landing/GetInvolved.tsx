import Button from '@/components/ui/Button'

const actions = [
  {
    title: 'Attend a Swap',
    description:
      'Exchange clothes with fellow students at no cost, sustainable fashion made easy.',
    cta: 'See Events',
    href: '/events',
    icon: (
      <svg className="h-6 w-6 text-brand-text/60" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
      </svg>
    ),
  },
  {
    title: 'Donate Clothes',
    description:
      'Keep clothing out of landfills by donating and swapping items on campus.',
    cta: 'Donate',
    href: '/donate',
    icon: (
      <svg className="h-6 w-6 text-brand-text/60" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
  {
    title: 'Join the Team',
    description:
      'Built by students, for students\u2014creating a sustainable campus together.',
    cta: 'Get Involved',
    href: '/about',
    icon: (
      <svg className="h-6 w-6 text-brand-text/60" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
  },
]

export default function GetInvolved() {
  return (
    <section className="bg-white px-6 py-20 md:px-12">
      <div className="mx-auto max-w-5xl">
        <div className="mb-12 text-center">
          <h2 className="mb-3 font-display text-[40px] text-brand-text md:text-[52px]">
            How Can You Get Involved?
          </h2>
          <p className="mx-auto max-w-2xl font-body text-[15px] text-brand-text/70">
            Campus Closet is a sustainability initiative on campus, aiming to
            promote sustainable fashion and circular consumption through free
            clothing swaps on campus.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {actions.map((action) => (
            <div
              key={action.title}
              className="flex flex-col items-center rounded-2xl border-2 border-brand-text bg-white p-8 text-center"
            >
              <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-gray-100">
                {action.icon}
              </div>
              <h3 className="mb-3 font-heading text-[18px] font-bold text-brand-text">
                {action.title}
              </h3>
              <p className="mb-6 flex-1 font-body text-[14px] leading-relaxed text-brand-text/70">
                {action.description}
              </p>
              <Button variant="dark" size="sm" href={action.href} className="w-full bg-brand-dark-olive">
                {action.cta}
              </Button>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
