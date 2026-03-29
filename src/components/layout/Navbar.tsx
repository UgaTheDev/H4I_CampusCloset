'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useState } from 'react'

const NAV_LINKS = [
  { label: 'Events', href: '/events' },
  { label: 'Donation', href: '/donate' },
  { label: 'About', href: '/about' },
  { label: 'FAQ', href: '/faq' },
  { label: 'Contact', href: '/contact' },
]

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <nav className="sticky top-0 z-50 bg-white border-b-2 border-black">
      <div className="mx-auto flex h-[83px] max-w-[1440px] items-center justify-between px-6 lg:px-[104px]">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <Image
            src="/images/logo.png"
            alt="Campus Closet logo"
            width={82}
            height={82}
            className="h-[82px] w-[82px] object-cover"
            priority
          />
          <span className="font-display text-[36px] leading-none text-brand-text">
            Campus Closet
          </span>
        </Link>

        {/* Desktop nav links */}
        <div className="hidden items-center gap-[35px] font-body text-[24px] text-brand-text md:flex">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="transition-opacity hover:opacity-70"
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Mobile hamburger */}
        <button
          className="flex flex-col gap-1.5 md:hidden"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          <span className={`block h-0.5 w-6 bg-brand-text transition-transform ${mobileOpen ? 'translate-y-2 rotate-45' : ''}`} />
          <span className={`block h-0.5 w-6 bg-brand-text transition-opacity ${mobileOpen ? 'opacity-0' : ''}`} />
          <span className={`block h-0.5 w-6 bg-brand-text transition-transform ${mobileOpen ? '-translate-y-2 -rotate-45' : ''}`} />
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="border-t border-black bg-white px-6 pb-6 md:hidden">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="block py-3 font-body text-[20px] text-brand-text"
              onClick={() => setMobileOpen(false)}
            >
              {link.label}
            </Link>
          ))}
        </div>
      )}
    </nav>
  )
}
