/** Impact conversion factors for calculating environmental savings */
export const IMPACT_FACTORS = {
  CO2_PER_GARMENT_KG: 10,
  WATER_PER_GARMENT_L: 3000,
};

export const NAV_LINKS = [
  { label: "Events", href: "/events" },
  { label: "Donation", href: "/donate" },
  { label: "About", href: "/about" },
  { label: "FAQ", href: "/faq" },
  { label: "Contact", href: "/contact" },
] as const;

export const SITE_METADATA = {
  title: "Campus Closet — BU Clothing Swap",
  description:
    "A sustainability-focused clothing swap initiative at Boston University.",
  url: process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000",
};
