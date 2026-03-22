/** Impact conversion factors for calculating environmental savings */
export const IMPACT_FACTORS = {
  CO2_PER_GARMENT_KG: 10,
  WATER_PER_GARMENT_L: 3000,
}

export const SITE_METADATA = {
  title: 'Campus Closet — BU Clothing Swap',
  description:
    'A sustainability-focused clothing swap initiative at Boston University, built by Hack4Impact BU.',
  url: process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000',
}
