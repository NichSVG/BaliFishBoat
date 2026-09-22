export interface Species {
  _id: string;
  name: string;
  slug: string;
  metaDescription?: string;
  scientificName?: string;
  summary?: string;
  body?: string;
  bestSeason?: string;
  whereFound?: string;
  bestBait?: string;
  techniques?: string[];
  averageSize?: string;
  recordSize?: string;
  difficulty?: "Beginner" | "Intermediate" | "Advanced";
  eatingQuality?: string;
  image?: { asset?: { url: string }; alt?: string };
  relatedSpecies?: { name: string; slug: string }[];
  order?: number;
}

export interface SpeciesPreview {
  name: string;
  slug: string;
  summary?: string;
  bestSeason?: string;
  difficulty?: string;
  image?: { asset?: { url: string }; alt?: string };
}

export interface Technique {
  _id: string;
  name: string;
  slug: string;
  metaDescription?: string;
  summary?: string;
  body?: string;
  bestFor?: string;
  skillLevel?: "Beginner" | "Intermediate" | "Advanced";
  equipmentNeeded?: string;
  bestSeason?: string;
  image?: { asset?: { url: string }; alt?: string };
  relatedSpecies?: { name: string; slug: string }[];
  order?: number;
}

export interface TechniquePreview {
  name: string;
  slug: string;
  summary?: string;
  skillLevel?: string;
  bestFor?: string;
  image?: { asset?: { url: string }; alt?: string };
}

export interface FishingLocation {
  _id: string;
  name: string;
  slug: string;
  metaDescription?: string;
  summary?: string;
  body?: string;
  region?: string;
  distanceFromHarbor?: string;
  bestSpecies?: { name: string; slug: string }[];
  bestSeason?: string;
  waterDepth?: string;
  boatAccess?: "Easy" | "Moderate" | "Difficult";
  image?: { asset?: { url: string }; alt?: string };
  mapUrl?: string;
  order?: number;
}

export interface FishingLocationPreview {
  name: string;
  slug: string;
  summary?: string;
  region?: string;
  bestSeason?: string;
  image?: { asset?: { url: string }; alt?: string };
}

export interface FishingReport {
  _id: string;
  title: string;
  slug: string;
  metaDescription?: string;
  reportDate: string;
  tripType?: string;
  body?: string;
  catches?: { species: string; count?: number; weight?: string; technique?: string }[];
  weather?: string;
  waterConditions?: string;
  waterTemp?: string;
  guestCount?: number;
  highlights?: string;
  photos?: { asset?: { url: string }; alt?: string }[];
  status?: string;
}

export interface FishingReportPreview {
  title: string;
  slug: string;
  reportDate: string;
  tripType?: string;
  catches?: { species: string; count?: number }[];
  highlights?: string;
}
