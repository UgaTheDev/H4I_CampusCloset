import Button from '@/components/ui/Button'

const actions = [
  {
    title: 'Attend a Swap',
    description:
      'Join our next clothing swap event and discover free, curated pieces from fellow students.',
    cta: 'See Events',
    href: '/events',
  },
  {
    title: 'Donate Clothes',
    description:
      'Drop off gently-used items at a campus bin or schedule a pickup — keep clothing in circulation.',
    cta: 'Learn How',
    href: '/donate',
  },
  {
    title: 'Join the Team',
    description:
      'Help organize events, manage donations, and grow Campus Closet across BU and beyond.',
    cta: 'Apply Now',
    href: '/about',
  },
]

export default function GetInvolved() {
  return (
    <section className="bg-brand-cream px-6 py-20 md:px-12">
      <div className="mx-auto max-w-6xl">
        <div className="mb-12 text-center">
          <h2 className="mb-3 font-display text-[40px] text-brand-text md:text-[52px]">
            How Can You Get Involved?
          </h2>
          <p className="mx-auto max-w-2xl font-body text-[15px] text-brand-text/70">
            There&apos;s a place for everyone in the Campus Closet community.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {actions.map((action) => (
            <div
              key={action.title}
              className="flex flex-col rounded-xl border border-gray-200 bg-white p-8"
            >
              <h3 className="mb-3 font-heading text-[20px] font-bold text-brand-text">
                {action.title}
              </h3>
              <p className="mb-6 flex-1 font-body text-[14px] leading-relaxed text-brand-text/70">
                {action.description}
              </p>
              <Button variant="primary" size="sm" href={action.href}>
                {action.cta}
              </Button>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
