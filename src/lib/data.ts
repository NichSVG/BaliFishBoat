import { client } from "@/sanity/client";
import type { Charter, TripPackage, Testimonial, ReviewThemes } from "@/types/charter";

// Trip Packages
const tripPackagesQuery = `*[_type == "tripPackage"] | order(priceUsd asc){
  "slug": slug.current,
  name,
  durationHours,
  startTime,
  bookingType,
  maxGuestsIncluded,
  priceUsd,
  includes,
  description
}`;

const tripPackageBySlugQuery = `*[_type == "tripPackage" && slug.current == $slug][0]{
  "slug": slug.current,
  name,
  durationHours,
  startTime,
  bookingType,
  maxGuestsIncluded,
  priceUsd,
  includes,
  description
}`;

// Charter
const charterQuery = `*[_type == "charter"][0]{
  name,
  tagline,
  location,
  ratingSnapshot,
  boat,
  includedAsStandard,
  targetSpecies,
  techniques
}`;

// Testimonials
const testimonialsQuery = `*[_type == "testimonial"] | order(_createdAt desc){
  name,
  country,
  rating,
  tripType,
  quote
}`;

export async function getTripPackages(): Promise<TripPackage[]> {
  return client.fetch(tripPackagesQuery);
}

export async function getTripPackageBySlug(slug: string): Promise<TripPackage | null> {
  return client.fetch(tripPackageBySlugQuery, { slug });
}

export async function getCharter(): Promise<
  (Charter & { boat: any; includedAsStandard: string[]; targetSpecies: string[]; techniques: string[] }) | null
> {
  return client.fetch(charterQuery);
}

export async function getTestimonials(): Promise<Testimonial[]> {
  return client.fetch(testimonialsQuery);
}

export function getReviewThemes(): ReviewThemes {
  return {
    friendlyCaptainPct: 96,
    goodBoatPct: 88,
    familyFriendlyPct: 84,
    greatExperiencePct: 83,
    recommendedPct: 86,
    caughtFishPct: 73,
  };
}
