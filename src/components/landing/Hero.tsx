import Badge from '@/components/ui/Badge'
import Button from '@/components/ui/Button'
import { getContentMap } from '@/lib/site-content'

export default async function Hero() {
  const content = await getContentMap({
    'hero.badge': 'STUDENT-RUN INITIATIVE',
    'hero.headline': 'The community *for sustainable* fashion at BU',
    'hero.subtitle': 'Swap, donate, and discover clothing while reducing fast fashion and building a better campus.',
  })

  // Parse headline: text wrapped in *asterisks* becomes italic olive
  const headlineParts = content['hero.headline'].split(/(\*[^*]+\*)/)

  return (
    <section className="relative overflow-hidden bg-brand-cream">
      <div
        className="absolute inset-0 opacity-[0.08]"
        style={{
          backgroundImage:
            'linear-gradient(to right, #222 1px, transparent 1px), linear-gradient(to bottom, #222 1px, transparent 1px)',
          backgroundSize: '21px 21px',
        }}
      />

      <div className="relative mx-auto max-w-[1440px] px-6 py-24 text-center md:px-[104px] md:py-32">
        <div className="mb-8 flex justify-center">
          <Badge variant="outline">{content['hero.badge']}</Badge>
        </div>

        <h1 className="mx-auto max-w-4xl font-display text-[48px] leading-[1.05] text-brand-text md:text-[80px]">
          {headlineParts.map((part, i) =>
            part.startsWith('*') && part.endsWith('*') ? (
              <span key={i} className="font-display italic text-brand-olive">
                {part.slice(1, -1)}
              </span>
            ) : (
              <span key={i}>{part}</span>
            ),
          )}
        </h1>

        <p className="mx-auto mt-6 max-w-xl font-body text-[16px] leading-relaxed text-brand-text/70 md:text-[18px]">
          {content['hero.subtitle']}
        </p>

        <div className="mt-10 flex flex-wrap justify-center gap-4">
          <Button variant="dark" href="/events">
            View Upcoming Events
          </Button>
          <Button variant="secondary" href="/donate">
            Donate Clothes &hearts;
          </Button>
        </div>
      </div>

      <div className="h-9 w-full border-y-2 border-brand-brown bg-brand-olive-light" />
    </section>
  )
}
