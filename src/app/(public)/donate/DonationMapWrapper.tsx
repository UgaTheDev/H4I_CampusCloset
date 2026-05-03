'use client'

import dynamic from 'next/dynamic'

const DonationMap = dynamic(() => import('./DonationMap'), {
  ssr: false,
  loading: () => <div className="h-[400px] animate-pulse rounded-xl bg-gray-100" />,
})

export default function DonationMapWrapper() {
  return <DonationMap />
}
