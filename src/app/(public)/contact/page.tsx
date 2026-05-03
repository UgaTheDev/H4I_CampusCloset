import type { Metadata } from 'next'
import Card from '@/components/ui/Card'
import ContactForm from './ContactForm'

export const metadata: Metadata = {
  title: 'Contact | Campus Closet',
  description: 'Get in touch with BU Campus Closet',
}

export default function ContactPage() {
  return (
    <section className="bg-brand-cream py-20 pb-28">
      <div className="mx-auto max-w-[1440px] px-6 lg:px-[104px]">
        <div className="mx-auto max-w-2xl">
          {/* Heading */}
          <div className="mb-10 text-center">
            <h1 className="font-display text-4xl md:text-5xl text-brand-text">
              Still have questions?
            </h1>
            <p className="mx-auto mt-4 max-w-lg font-body text-brand-text/70">
              Can&apos;t find the answer you&apos;re looking for? Fill out the form below and
              our team will get back to you within 24 hours.
            </p>
          </div>

          {/* Form card */}
          <Card className="shadow-sm border border-gray-200 p-8 md:p-10">
            <ContactForm />
          </Card>

          {/* Contact info — below form */}
          <div className="mt-8 flex flex-wrap justify-center gap-8 text-center">
            <div>
              <p className="font-heading text-[13px] font-bold uppercase tracking-wide text-brand-text/40">
                Email
              </p>
              <a
                href="mailto:campuscloset@bu.edu"
                className="mt-1 font-body text-[15px] text-brand-olive hover:underline"
              >
                campuscloset@bu.edu
              </a>
            </div>
            <div>
              <p className="font-heading text-[13px] font-bold uppercase tracking-wide text-brand-text/40">
                Instagram
              </p>
              <a
                href="https://www.instagram.com/bucampuscloset/"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-1 font-body text-[15px] text-brand-olive hover:underline"
              >
                @bucampuscloset
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
