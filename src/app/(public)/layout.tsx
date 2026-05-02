import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'

export default function PublicLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-md focus:bg-brand-dark-olive focus:px-4 focus:py-2 focus:text-white"
      >
        Skip to content
      </a>
      <Navbar />
      <main id="main-content" className="flex-1">{children}</main>
      <Footer />
    </>
  )
}
