import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center gap-4">
      <h1 className="font-display text-[48px] text-brand-brown">404</h1>
      <p className="font-body text-[16px] text-brand-text/60">
        This page doesn&apos;t exist.
      </p>
      <Link
        href="/"
        className="rounded-lg bg-brand-dark-olive px-6 py-3 font-heading font-bold text-white hover:opacity-90"
      >
        Back to Home
      </Link>
    </div>
  )
}
