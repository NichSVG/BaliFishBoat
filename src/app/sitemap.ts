import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/constants";
import {
  getTripPackages, getBlogPosts, getSpeciesList,
  getTechniqueList, getLocationList, getFishingReportList,
} from "@/lib/data";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [trips, blogPosts, species, techniques, locations, reports] = await Promise.all([
    getTripPackages(), getBlogPosts(), getSpeciesList(),
    getTechniqueList(), getLocationList(), getFishingReportList(),
  ]);

  const tripPages = trips.map((t) => ({
    url: `${SITE_URL}/trips/${t.slug}`,
    lastModified: t._updatedAt ? new Date(t._updatedAt) : new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  const blogPages = blogPosts.map((p) => ({
    url: `${SITE_URL}/blog/${p.slug}`,
    lastModified: new Date(p.publishedAt),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  const speciesPages = species.map((s) => ({
    url: `${SITE_URL}/species/${s.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  const techniquePages = techniques.map((t) => ({
    url: `${SITE_URL}/techniques/${t.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  const locationPages = locations.map((l) => ({
    url: `${SITE_URL}/locations/${l.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  const reportPages = reports.map((r) => ({
    url: `${SITE_URL}/fishing-reports/${r.slug}`,
    lastModified: new Date(r.reportDate),
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  return [
    { url: SITE_URL, lastModified: new Date(), changeFrequency: "weekly", priority: 1 },
    { url: `${SITE_URL}/about`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
    { url: `${SITE_URL}/trips`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.9 },
    ...tripPages,
    { url: `${SITE_URL}/species`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    ...speciesPages,
    { url: `${SITE_URL}/techniques`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    ...techniquePages,
    { url: `${SITE_URL}/locations`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    ...locationPages,
    { url: `${SITE_URL}/fishing-reports`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.7 },
    ...reportPages,
    { url: `${SITE_URL}/gallery`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.6 },
    { url: `${SITE_URL}/blog`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.8 },
    ...blogPages,
    { url: `${SITE_URL}/contact`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
  ];
}
