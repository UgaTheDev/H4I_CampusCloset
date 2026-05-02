import Button from '@/components/ui/Button'

export default function FooterCta() {
  return (
    <section className="bg-brand-cream px-6 py-20 text-center md:px-12">
      <div className="mx-auto max-w-3xl">
        <h2 className="mb-4 font-display text-[40px] text-brand-text md:text-[52px]">
          Ready to Make a Difference?
        </h2>
        <p className="mb-10 font-body text-[15px] text-brand-text/70">
          Join hundreds of BU Students in building a more sustainable campus
          through fashion
        </p>

        <div className="flex flex-wrap justify-center gap-4">
          <Button variant="dark" href="/events" className="bg-brand-dark-olive">
            See Our Events
          </Button>
          <Button variant="dark" href="/donate">
            Donate Clothes
          </Button>
          <Button variant="dark" href="/contact" className="bg-brand-dark-olive">
            Contact Us
          </Button>
        </div>
      </div>

      {/* Brown block */}
      <div className="mx-auto mt-16 h-64 max-w-5xl rounded-t-2xl bg-brand-brown" />
    </section>
  )
}
