import { prisma } from '@/lib/prisma'
import FaqList from '@/components/faq/FaqList'
import FaqContactForm from '@/components/faq/FaqContactForm'

export default async function FaqPage() {
  const items = await prisma.faqItem.findMany({
    orderBy: [{ displayOrder: 'asc' }, { createdAt: 'desc' }],
  })

  return (
    <>
      <section className="bg-brand-cream px-6 py-20 text-center md:px-12">
        <div className="mx-auto max-w-3xl">
          <h1 className="mb-4 font-display text-[56px] leading-tight text-brand-text md:text-[72px]">
            Frequently Asked Questions
          </h1>
          <p className="font-body text-[15px] leading-relaxed text-brand-text/80">
            Have questions about how Campus Closet works? Find everything you need to
            know about swapping, donating, and our mission to reduce waste.
          </p>
        </div>
      </section>

      <section className="bg-white px-6 py-16 md:px-12">
        <FaqList items={items} />
      </section>

      <section className="bg-brand-cream px-6 py-20 md:px-12">
        <div className="mx-auto mb-10 max-w-2xl text-center">
          <h2 className="mb-3 font-display text-[40px] text-brand-text md:text-[52px]">
            Still have questions?
          </h2>
          <p className="font-body text-[15px] text-brand-text/70">
            Can&apos;t find the answer you&apos;re looking for? Fill out the form below
            and our team will get back to you within 24 hours.
          </p>
        </div>
        <FaqContactForm />
      </section>
    </>
  )
}
