import Button from '@/components/ui/Button'
import { getContentMap } from '@/lib/site-content'

export default async function FooterCta() {
  const content = await getContentMap({
    'cta.heading': 'Ready to Make a Difference?',
    'cta.body': 'Join hundreds of BU Students in building a more sustainable campus through fashion',
  })

  return (
    <section className="bg-brand-cream px-6 py-20 text-center md:px-12">
      <div className="mx-auto max-w-3xl">
        <h2 className="mb-4 font-display text-[40px] text-brand-text md:text-[52px]">
          {content['cta.heading']}
        </h2>
        <p className="mb-10 font-body text-[15px] text-brand-text/70">
          {content['cta.body']}
        </p>

        <div className="flex flex-wrap justify-center gap-4">
          <Button variant="primary" href="/events">See Our Events</Button>
          <Button variant="primary" href="/donate">Donate Clothes</Button>
          <Button variant="primary" href="/contact">Contact Us</Button>
        </div>
      </div>
    </section>
  )
}
