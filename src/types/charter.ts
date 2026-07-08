export interface Charter {
  name: string;
  tagline: string;
  location: { area: string; region: string; mapUrl?: string };
  ratingSnapshot: { overall: number; reviewCount: number; asOf: string };
}

export interface Boat {
  name?: string;
  category: string;
  manufacturer: string;
  lengthFt: number;
  yearBuilt: number;
  capacityPersons: number;
  engine: string;
  amenities: string[];
}

export interface TripPackage {
  slug: string;
  name: string;
  durationHours: number;
  startTime: string;
  bookingType: "shared" | "private";
  maxGuestsIncluded: number;
  priceUsd: number;
  includes: string[];
  description: string;
}

export interface Testimonial {
  name: string;
  country?: string;
  rating: number;
  tripType: string;
  quote: string;
}

export interface ReviewThemes {
  friendlyCaptainPct: number;
  goodBoatPct: number;
  familyFriendlyPct: number;
  greatExperiencePct: number;
  recommendedPct: number;
  caughtFishPct: number;
}

export interface InquiryFormData {
  name: string;
  email: string;
  phone?: string;
  packageSlug: string;
  preferredDate: string;
  partySize: number;
  message?: string;
  honeypot?: string;
}
