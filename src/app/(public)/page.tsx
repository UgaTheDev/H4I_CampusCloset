import Hero from '@/components/landing/Hero'
import WhatIsCampusCloset from '@/components/landing/WhatIsCampusCloset'
import HowItWorks from '@/components/landing/HowItWorks'
import WhyItMatters from '@/components/landing/WhyItMatters'
import UpcomingEventsPreview from '@/components/landing/UpcomingEventsPreview'
import GetInvolved from '@/components/landing/GetInvolved'
import GalleryPreview from '@/components/landing/GalleryPreview'
import FaqPreview from '@/components/landing/FaqPreview'
import FooterCta from '@/components/landing/FooterCta'

export default function HomePage() {
  return (
    <>
      <Hero />
      <WhatIsCampusCloset />
      <HowItWorks />
      <WhyItMatters />
      <UpcomingEventsPreview />
      <GetInvolved />
      <GalleryPreview />
      <FaqPreview />
      <FooterCta />
    </>
  )
}
