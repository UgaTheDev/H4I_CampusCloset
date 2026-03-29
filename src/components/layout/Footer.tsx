import Link from 'next/link'
import Image from 'next/image'
import { NAV_LINKS } from '@/lib/constants'

export default function Footer() {
  return (
    <footer className="bg-brand-brown text-white">
      <div className="mx-auto flex max-w-[1440px] flex-col gap-10 px-6 py-16 md:flex-row md:justify-between lg:px-[104px]">
        {/* Brand */}
        <div className="max-w-sm">
          <Link href="/" className="flex items-center gap-2">
            <Image
              src="/images/logo.png"
              alt="Campus Closet logo"
              width={48}
              height={48}
              className="h-12 w-12 object-cover brightness-0 invert"
            />
            <span className="font-display text-[28px] leading-none">
              Campus Closet
            </span>
          </Link>
          <p className="mt-4 font-body text-[16px] leading-relaxed text-white/80">
            A sustainability-focused clothing swap initiative at Boston
            University, built by Hack4Impact BU.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="font-body text-[18px] font-extrabold uppercase tracking-wide">
            Quick Links
          </h3>
          <ul className="mt-4 space-y-2">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="font-body text-[16px] text-white/80 transition-opacity hover:opacity-100"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact / Social */}
        <div>
          <h3 className="font-body text-[18px] font-extrabold uppercase tracking-wide">
            Connect
          </h3>
          <ul className="mt-4 space-y-2 font-body text-[16px] text-white/80">
            <li>
              <a
                href="https://www.instagram.com/bucampuscloset/"
                target="_blank"
                rel="noopener noreferrer"
                className="transition-opacity hover:opacity-100"
              >
                Instagram
              </a>
            </li>
            <li>
              <a
                href="mailto:campuscloset@bu.edu"
                className="transition-opacity hover:opacity-100"
              >
                campuscloset@bu.edu
              </a>
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/20">
        <div className="mx-auto max-w-[1440px] px-6 py-4 lg:px-[104px]">
          <p className="font-body text-[14px] text-white/50">
            &copy; {new Date().getFullYear()} Campus Closet &middot; Boston
            University &middot; Built by Hack4Impact BU
          </p>
        </div>
      </div>
    </footer>
  )
}
