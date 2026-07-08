import { SITE_URL, SITE_NAME, SITE_DESCRIPTION } from "@/lib/constants";

export function generateLocalBusinessSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: SITE_NAME,
    description: SITE_DESCRIPTION,
    url: SITE_URL,
    address: {
      "@type": "PostalAddress",
      addressLocality: "Denpasar",
      addressRegion: "Bali",
      addressCountry: "ID",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: -8.72,
      longitude: 115.24,
    },
    areaServed: "Bali",
    priceRange: "$400 - $800 USD",
  };
}

export function generateTouristTripSchema(trip: {
  name: string;
  description: string;
  priceUsd: number;
  durationHours: number;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "TouristTrip",
    name: trip.name,
    description: trip.description,
    url: `${SITE_URL}/trips`,
    touristType: "Angler",
    offers: {
      "@type": "Offer",
      price: trip.priceUsd,
      priceCurrency: "USD",
    },
    provider: {
      "@type": "LocalBusiness",
      name: SITE_NAME,
    },
  };
}
