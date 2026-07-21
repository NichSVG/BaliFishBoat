/**
 * UI-only display data for the redesign (REDESIGN-BLUEPRINT.md §15.2).
 * Pure presentation constants — no CMS/backend involvement.
 * Owner can edit these freely; nothing here affects pricing or booking logic.
 */

/** Per-trip card/hero imagery, mapped by package slug. */
export const TRIP_IMAGES: Record<string, string> = {
  "sharing-trip": "/images/gallery/happy-group.jpg",
  "sunset-trip": "/images/gallery/IMG-20260711-WA0019.jpg",
  "half-day-private": "/images/gallery/showing-off-catches.jpg",
  "three-quarter-day": "/images/gallery/many-fishes.jpg",
  "jigging-casting-6hr": "/images/gallery/fishing-equipment.jpg",
  "full-day": "/images/gallery/big-catch.jpg",
  "full-day-jigging-popping": "/images/gallery/big-catch-2.jpg",
};

export const TRIP_IMAGE_FALLBACK = "/images/gallery/big-catch.jpg";

/** Trip slugs flagged for editorial highlight chips. */
export const MOST_POPULAR_SLUG = "full-day";

/** Crew — names sourced from public guest reviews. Swap photos after shoot. */
export const SHOW_CREW = true;
export const CREW: { name: string; role: string; note: string; photo: string }[] = [
  {
    name: "Dedik",
    role: "Owner & Captain",
    note: "Owner of the 36ft GT 70 — born and raised on Bali waters.",
    photo: "/images/gallery/happy-group.jpg",
  },
  {
    name: "Warsan",
    role: "Captain & Guide",
    note: "Puts guests on Yellowfin Tuna — mentioned by name in guest reviews.",
    photo: "/images/gallery/showing-off-catches.jpg",
  },
  {
    name: "Lilong & Beton",
    role: "Deckhands",
    note: "Rigging, jigging and keeping lines in the water all trip long.",
    photo: "/images/gallery/fishing-equipment.jpg",
  },
];

/** Boat spec sheet — facts from charter data (max speed omitted pending owner confirmation). */
export const BOAT_SPECS: { icon: string; label: string; value: string }[] = [
  { icon: "Ruler", label: "Length", value: "36 ft" },
  { icon: "Users", label: "Capacity", value: "8 guests" },
  { icon: "Gauge", label: "Engines", value: "2× Yamaha 115HP" },
  { icon: "Calendar", label: "Year built", value: "2014" },
  { icon: "Ship", label: "Type", value: "GT 70 Cruiser" },
  { icon: "Waves", label: "Comfort", value: "Shaded seating" },
  { icon: "ShieldCheck", label: "Facilities", value: "Private toilet" },
  { icon: "Anchor", label: "Rig", value: "Trolling outriggers" },
];

/** Count-up stats — all from existing rating snapshot / boat facts. */
export const STATS: { value: number; decimals?: number; suffix: string; label: string }[] = [
  { value: 126, suffix: "+", label: "verified reviews" },
  { value: 4.4, decimals: 1, suffix: "★", label: "average rating" },
  { value: 36, suffix: " ft", label: "private yacht" },
  { value: 8, suffix: "", label: "guests max" },
];

/** Review rating distribution + sub-scores (from rating snapshot). */
export const RATING_DISTRIBUTION: { stars: number; count: number }[] = [
  { stars: 5, count: 82 },
  { stars: 4, count: 23 },
  { stars: 3, count: 14 },
  { stars: 2, count: 4 },
  { stars: 1, count: 1 },
];

export const RATING_SUBSCORES: { label: string; score: number }[] = [
  { label: "Captain & crew", score: 4.7 },
  { label: "Fishing experience", score: 4.4 },
  { label: "Boat & equipment", score: 4.2 },
];

export const FISHINGBOOKER_URL = "https://www.fishingbooker.com/charters/view/17292";

/** Country flag emoji by country name (for testimonial cards). */
export const COUNTRY_FLAGS: Record<string, string> = {
  "United States": "🇺🇸",
  Australia: "🇦🇺",
  "United Kingdom": "🇬🇧",
  China: "🇨🇳",
  Germany: "🇩🇪",
  France: "🇫🇷",
  Indonesia: "🇮🇩",
  Singapore: "🇸🇬",
};

/** Mobile bottom-bar price lookup (display mirror of public pricing). */
export const TRIP_BAR_INFO: Record<string, { price: number; hours: number }> = {
  "sharing-trip": { price: 200, hours: 4 },
  "sunset-trip": { price: 270, hours: 3 },
  "half-day-private": { price: 550, hours: 4 },
  "three-quarter-day": { price: 650, hours: 6 },
  "jigging-casting-6hr": { price: 650, hours: 6 },
  "full-day": { price: 750, hours: 8 },
  "full-day-jigging-popping": { price: 800, hours: 8 },
};

/** Announcement bar under header (set false to hide). */
export const SHOW_ANNOUNCEMENT = false;
