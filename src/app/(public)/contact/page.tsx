import type { Metadata } from 'next'
import Card from '@/components/ui/Card'
import ContactForm from './ContactForm'

export const metadata: Metadata = {
  title: 'Contact | Campus Closet',
  description: 'Get in touch with BU Campus Closet',
}

export default function ContactPage() {
  return (
    <>
      {/* ── Hero ─────────────────────────────────────────── */}
      <section className="bg-brand-cream py-16">
        <div className="mx-auto max-w-[1440px] px-6 text-center lg:px-[104px]">
          <h1 className="font-display text-4xl md:text-5xl text-brand-text">Contact Us</h1>
          <p className="mx-auto mt-4 max-w-xl font-body text-brand-text/70">
            Have a question, want to schedule a pickup, or just want to say hi?
            We&apos;d love to hear from you.
          </p>
        </div>
      </section>

      {/* ── Contact info + form ──────────────────────────── */}
      <section className="bg-brand-cream pb-24 pt-8">
        <div className="mx-auto max-w-[1440px] px-6 lg:px-[104px]">
          <div className="mx-auto max-w-2xl">
            {/* Quick contact info */}
            <div className="mb-8 flex flex-wrap justify-center gap-8 text-center">
              <div>
                <p className="font-heading text-[14px] font-bold uppercase tracking-wide text-brand-text/50">
                  Email
                </p>
                <a
                  href="mailto:campuscloset@bu.edu"
                  className="mt-1 font-body text-[16px] text-brand-olive hover:underline"
                >
                  campuscloset@bu.edu
                </a>
              </div>
              <div>
                <p className="font-heading text-[14px] font-bold uppercase tracking-wide text-brand-text/50">
                  Instagram
                </p>
                <a
                  href="https://www.instagram.com/bucampuscloset/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-1 font-body text-[16px] text-brand-olive hover:underline"
                >
                  @bucampuscloset
                </a>
              </div>
            </div>

            {/* Form */}
            <Card variant="outlined" className="p-8">
              <h2 className="mb-6 font-heading text-[22px] font-bold text-brand-text">
                Send Us a Message
              </h2>
              <ContactForm />
            </Card>
          </div>
        </div>
      </section>
    </>
  )
}
