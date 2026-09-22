import { client, freshClient } from "@/sanity/client";
import type {
  Charter, TripPackage, Testimonial, ReviewThemes,
  BlogPost, BlogPostPreview,
} from "@/types/charter";
import type {
  Species, SpeciesPreview,
  Technique, TechniquePreview,
  FishingLocation, FishingLocationPreview,
  FishingReport, FishingReportPreview,
} from "@/types/content";

// Trip Packages
const tripPackagesQuery = `*[_type == "tripPackage"] | order(priceUsd asc){
  "slug": slug.current,
  name,
  durationHours,
  startTime,
  bookingType,
  maxGuestsIncluded,
  minGuests,
  extraGuestPriceUsd,
  priceUsd,
  pricingUnit,
  includes,
  description,
  _updatedAt
}`;

const tripPackageBySlugQuery = `*[_type == "tripPackage" && slug.current == $slug][0]{
  "slug": slug.current,
  name,
  durationHours,
  startTime,
  bookingType,
  maxGuestsIncluded,
  minGuests,
  extraGuestPriceUsd,
  priceUsd,
  pricingUnit,
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

// Blog Posts
const blogPostsQuery = `*[_type == "blogPost" && status == "published"] | order(publishedAt desc){
  "slug": slug.current,
  title,
  metaDescription,
  primaryKeyword,
  publishedAt
}`;

const blogPostBySlugQuery = `*[_type == "blogPost" && slug.current == $slug && status == "published"][0]{
  "slug": slug.current,
  title,
  metaDescription,
  primaryKeyword,
  secondaryKeywords,
  publishedAt,
  body,
  internalLinks
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

export async function getBlogPosts(): Promise<BlogPostPreview[]> {
  return freshClient.fetch(blogPostsQuery);
}

export async function getBlogPostBySlug(slug: string): Promise<BlogPost | null> {
  return freshClient.fetch(blogPostBySlugQuery, { slug });
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

// ─── Species ────────────────────────────────────────────────
const speciesListQuery = `*[_type == "species"] | order(order asc){
  name, slug, summary, bestSeason, difficulty,
  image{ asset->{url}, alt }
}`;

const speciesBySlugQuery = `*[_type == "species" && slug.current == $slug][0]{
  _id, name, slug, metaDescription, scientificName, summary, body,
  bestSeason, whereFound, bestBait, techniques, averageSize, recordSize,
  difficulty, eatingQuality, image{ asset->{url}, alt },
  relatedSpecies[]->{ name, slug },
  order
}`;

export async function getSpeciesList(): Promise<SpeciesPreview[]> {
  return client.fetch(speciesListQuery);
}

export async function getSpeciesBySlug(slug: string): Promise<Species | null> {
  return client.fetch(speciesBySlugQuery, { slug });
}

// ─── Techniques ─────────────────────────────────────────────
const techniqueListQuery = `*[_type == "technique"] | order(order asc){
  name, slug, summary, skillLevel, bestFor,
  image{ asset->{url}, alt }
}`;

const techniqueBySlugQuery = `*[_type == "technique" && slug.current == $slug][0]{
  _id, name, slug, metaDescription, summary, body,
  bestFor, skillLevel, equipmentNeeded, bestSeason,
  image{ asset->{url}, alt },
  relatedSpecies[]->{ name, slug },
  order
}`;

export async function getTechniqueList(): Promise<TechniquePreview[]> {
  return client.fetch(techniqueListQuery);
}

export async function getTechniqueBySlug(slug: string): Promise<Technique | null> {
  return client.fetch(techniqueBySlugQuery, { slug });
}

// ─── Locations ──────────────────────────────────────────────
const locationListQuery = `*[_type == "fishingLocation"] | order(order asc){
  name, slug, summary, region, bestSeason,
  image{ asset->{url}, alt }
}`;

const locationBySlugQuery = `*[_type == "fishingLocation" && slug.current == $slug][0]{
  _id, name, slug, metaDescription, summary, body,
  region, distanceFromHarbor, bestSeason, waterDepth, boatAccess,
  bestSpecies[]->{ name, slug },
  image{ asset->{url}, alt },
  mapUrl, order
}`;

export async function getLocationList(): Promise<FishingLocationPreview[]> {
  return client.fetch(locationListQuery);
}

export async function getLocationBySlug(slug: string): Promise<FishingLocation | null> {
  return client.fetch(locationBySlugQuery, { slug });
}

// ─── Fishing Reports ────────────────────────────────────────
const fishingReportListQuery = `*[_type == "fishingReport" && status == "published"] | order(reportDate desc){
  title, slug, reportDate, tripType, highlights,
  catches[]{ species, count }
}`;

const fishingReportBySlugQuery = `*[_type == "fishingReport" && slug.current == $slug && status == "published"][0]{
  _id, title, slug, metaDescription, reportDate, tripType, body,
  catches[]{ species, count, weight, technique },
  weather, waterConditions, waterTemp, guestCount, highlights,
  photos[]{ asset->{url}, alt }
}`;

export async function getFishingReportList(): Promise<FishingReportPreview[]> {
  return freshClient.fetch(fishingReportListQuery);
}

export async function getFishingReportBySlug(slug: string): Promise<FishingReport | null> {
  return freshClient.fetch(fishingReportBySlugQuery, { slug });
}
